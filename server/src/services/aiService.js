const { GoogleGenAI } = require('@google/genai');

/**
 * GeminiKeyPool: Hệ thống xoay vòng 3 API Key Gemini (Round-Robin & Auto-Failover)
 * Tự động chuyển key khi gặp lỗi 429 Rate Limit, QuotaExceeded hoặc 403.
 */
class GeminiKeyPool {
  constructor() {
    this.keys = [];
    this.currentIndex = 0;
    this.cooldowns = new Map();
    this.initKeys();
  }

  initKeys() {
    const rawKeys = [];
    if (process.env.GEMINI_API_KEYS) {
      process.env.GEMINI_API_KEYS.split(',').map(k => k.trim()).filter(Boolean).forEach(k => rawKeys.push(k));
    }
    ['GEMINI_API_KEY_1', 'GEMINI_API_KEY_2', 'GEMINI_API_KEY_3'].forEach(envName => {
      if (process.env[envName]) {
        rawKeys.push(process.env[envName].trim());
      }
    });
    if (process.env.GEMINI_API_KEY) {
      rawKeys.push(process.env.GEMINI_API_KEY.trim());
    }
    this.keys = Array.from(new Set(rawKeys.filter(Boolean)));
    console.log(`[GeminiKeyPool] Khởi tạo thành công ${this.keys.length} API keys xoay vòng.`);
  }

  isKeyCoolingDown(key) {
    const expiry = this.cooldowns.get(key);
    if (!expiry) return false;
    if (Date.now() > expiry) {
      this.cooldowns.delete(key);
      return false;
    }
    return true;
  }

  markCooldown(key, durationSeconds = 60) {
    this.cooldowns.set(key, Date.now() + durationSeconds * 1000);
    console.warn(`[GeminiKeyPool] Key ...${key.slice(-6)} tạm nghỉ trong ${durationSeconds}s do giới hạn hạn mức.`);
  }

  markDead(key, reason = '') {
    this.keys = this.keys.filter(k => k !== key);
    this.cooldowns.delete(key);
    console.warn(`[GeminiKeyPool] Key ...${key.slice(-6)} ĐÃ BỊ LOẠI BỎ VĨNH VIỄN (${reason}). Còn lại: ${this.keys.length} keys.`);
  }

  isDeadError(err) {
    const msg = String(err?.message || '').toLowerCase();
    const status = err?.status || err?.code;
    return status === 403 || msg.includes('leaked') || msg.includes('permission_denied') || msg.includes('api_key_invalid') || msg.includes('key not valid') || msg.includes('access_denied');
  }

  getNextClient(apiKey = null) {
    if (apiKey) {
      return { client: new GoogleGenAI({ apiKey: apiKey.trim() }), key: apiKey.trim(), isCustom: true };
    }
    if (this.keys.length === 0) return null;

    for (let i = 0; i < this.keys.length; i++) {
      const idx = (this.currentIndex + i) % this.keys.length;
      const key = this.keys[idx];
      if (!this.isKeyCoolingDown(key)) {
        this.currentIndex = (idx + 1) % this.keys.length;
        return { client: new GoogleGenAI({ apiKey: key }), key, isCustom: false };
      }
    }

    const fallbackKey = this.keys[this.currentIndex % this.keys.length];
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    return { client: new GoogleGenAI({ apiKey: fallbackKey }), key: fallbackKey, isCustom: false };
  }

  getStatus() {
    const activeHealthy = this.keys.filter(k => !this.isKeyCoolingDown(k)).length;
    return {
      active: this.keys.length > 0,
      hasServerKey: this.keys.length > 0,
      totalKeys: this.keys.length,
      healthyKeys: activeHealthy,
      inCooldown: this.keys.length - activeHealthy,
      rotationEnabled: true
    };
  }
}

class AIService {
  constructor() {
    this.defaultModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    this.candidateModels = ['gemini-3.5-flash-lite'];
    this.keyPool = new GeminiKeyPool();
  }

  normalizeModel(m) {
    if (!m || m === 'gemini-3.8-flash' || m === 'gemini-2.5-flash') {
      return 'gemini-3.5-flash-lite';
    }
    return m;
  }

  getClient(apiKey) {
    const info = this.keyPool.getNextClient(apiKey);
    return info ? info.client : null;
  }

  getClientInfo(apiKey) {
    return this.keyPool.getNextClient(apiKey);
  }

  getStatus() {
    return {
      ...this.keyPool.getStatus(),
      defaultModel: this.defaultModel,
      candidateModels: this.candidateModels
    };
  }

  /**
   * Safe JSON Parser: strips markdown code fences, auto-repairs trailing commas
   * and unescaped newlines, extracts outermost JSON object/array.
   */
  cleanAndRepairJson(rawText) {
    if (!rawText) return '';
    let text = String(rawText)
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();

    const firstBrace = text.indexOf('{');
    const firstBracket = text.indexOf('[');
    let startIdx = -1;
    let endIdx = -1;

    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      startIdx = firstBrace;
      endIdx = text.lastIndexOf('}');
    } else if (firstBracket !== -1) {
      startIdx = firstBracket;
      endIdx = text.lastIndexOf(']');
    }

    if (startIdx !== -1 && endIdx > startIdx) {
      text = text.substring(startIdx, endIdx + 1);
    }

    // Auto-repair: remove trailing commas before } or ]
    text = text.replace(/,\s*([}\]])/g, '$1');
    return text;
  }

  safeParseAIJson(rawText, fallbackData = null) {
    if (!rawText) return fallbackData;
    if (typeof rawText === 'object') return rawText;

    const cleaned = this.cleanAndRepairJson(rawText);
    try {
      return JSON.parse(cleaned);
    } catch (err) {
      try {
        // Attempt secondary repair: replace unescaped control characters
        const repaired = cleaned
          .replace(/[\u0000-\u001F]+/g, ' ')
          .replace(/,\s*([}\]])/g, '$1');
        return JSON.parse(repaired);
      } catch (subErr) {
        console.warn('AI JSON Parse Error even after repair:', subErr.message);
      }
      return fallbackData;
    }
  }

  async generateContentWithFallback(clientOrInfo, { model, contents, systemInstruction, responseMimeType, fallbackData }) {
    const isCustom = clientOrInfo && clientOrInfo.isCustom;
    const maxTries = isCustom ? 1 : Math.max(1, this.keyPool.keys.length);
    let lastError = null;

    for (let attempt = 0; attempt < maxTries; attempt++) {
      let currentInfo;
      if (isCustom) {
        currentInfo = clientOrInfo;
      } else if (attempt === 0 && clientOrInfo && clientOrInfo.client) {
        currentInfo = clientOrInfo;
      } else {
        currentInfo = this.keyPool.getNextClient();
      }

      if (!currentInfo || !currentInfo.client) break;
      const client = currentInfo.client || currentInfo;
      const key = currentInfo.key || 'custom';

      const targetModel = this.normalizeModel(model);
      const modelsToTry = [targetModel];
      for (const cm of this.candidateModels) {
        if (!modelsToTry.includes(cm)) modelsToTry.push(cm);
      }

      let keyFailed = false;
      for (const m of modelsToTry) {
        try {
          const config = {};
          if (systemInstruction) config.systemInstruction = systemInstruction;
          if (responseMimeType) config.responseMimeType = responseMimeType;

          const response = await client.models.generateContent({
            model: m,
            contents,
            config
          });

          const rawText = response.text;
          if (responseMimeType === 'application/json') {
            const parsed = this.safeParseAIJson(rawText, fallbackData);
            if (parsed !== undefined) return parsed;
          }
          return rawText;
        } catch (err) {
          lastError = err;
          if (this.keyPool.isDeadError(err)) {
            this.keyPool.markDead(key, err.message);
            keyFailed = true;
            break;
          } else if (err?.status === 429 || String(err?.message || '').includes('429')) {
            this.keyPool.markCooldown(key, 60);
            keyFailed = true;
            break;
          } else {
            console.warn(`Model ${m} failed:`, err.message);
          }
        }
      }

      if (!keyFailed) {
        break;
      }
    }

    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw lastError || new Error('All model candidates and keys failed');
  }

  /**
   * 1. EXPLAIN MISTAKE & GRAMMAR / CHIẾT TỰ CHỮ HÁN
   */
  async explainMistake({ question, userAnswer, correctAnswer, language = 'zh', hint = '', apiKey, model = this.defaultModel }) {
    const client = this.getClient(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung (HSK)' : 'Tiếng Anh (CEFR/IELTS)';

    const systemPrompt = `Bạn là một Gia sư ngôn ngữ ${langName} xuất sắc, tận tâm và am hiểu sư phạm.
Nhiệm vụ của bạn là giải thích cặn kẽ tại sao người học làm sai một câu hỏi trắc nghiệm/dịch thuật và cung cấp kiến thức nền tảng một cách dễ hiểu, cuốn hút.
QUAN TRỌNG: Bạn PHẢI trả về ĐÚNG định dạng JSON theo cấu trúc sau (không kèm markdown ngoài json):
{
  "summary": "Tóm tắt ngắn gọn lý do đúng/sai trong 1-2 câu",
  "detailedExplanation": "Giải thích chi tiết ngữ cảnh, phân biệt giữa đáp án của người dùng và đáp án đúng",
  "grammarRule": "Quy tắc ngữ pháp hoặc trật tự từ cần ghi nhớ",
  "etymologyOrPhonetics": "${language === 'zh' ? 'Chiết tự chữ Hán: Phân tích các bộ thủ tạo nên chữ Hán đó và ý nghĩa tượng hình' : 'Quy tắc phát âm, nối âm hoặc trọng âm của các từ khóa'}",
  "exampleSentence": {
    "target": "Câu ví dụ minh họa tương tự",
    "phonetic": "Phiên âm Pinyin hoặc IPA",
    "meaning": "Dịch nghĩa câu ví dụ sang tiếng Việt"
  },
  "mnemonicTip": "Một mẹo liên tưởng độc đáo, hài hước giúp nhớ từ/ngữ pháp này suốt đời"
}`;

    const userPrompt = `
- Ngôn ngữ: ${langName}
- Đề bài: "${question}"
- Người học chọn: "${userAnswer || '(Để trống hoặc chưa hoàn thành)'}"
- Đáp án chính xác: "${correctAnswer}"
${hint ? `- Gợi ý bổ sung: "${hint}"` : ''}

Hãy phân tích và trả về JSON theo đúng định dạng được yêu cầu.`;

    const fallback = this.getLocalMistakeExplanation({ question, userAnswer, correctAnswer, language, hint });

    if (client) {
      try {
        const result = await this.generateContentWithFallback(client, {
          model,
          contents: userPrompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          fallbackData: fallback
        });
        if (result && result.summary) return result;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local pedagogical generator:', err.message);
      }
    }

    // High quality local fallback if no API key or network error
    return fallback;
  }

  /**
   * 2. INTERACTIVE Q&A WITH FLOATING AI TUTOR
   */
  async askTutor({ query, currentContext, language = 'zh', history = [], apiKey, model = this.defaultModel }) {
    const client = this.getClient(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung' : 'Tiếng Anh';

    const systemPrompt = `Bạn là "LingoBot" - Gia sư AI chuyên dạy ${langName} theo phương pháp Duolingo: thân thiện, giải thích ngắn gọn, súc tích, dễ nhớ, luôn có ví dụ thực tế.
Khi trả lời tiếng Trung, luôn kèm Pinyin và dịch nghĩa. Khi trả lời tiếng Anh, kèm phiên âm IPA và giải thích ngữ cảnh.
Định dạng câu trả lời bằng Markdown đẹp mắt (sử dụng in đậm, bullet points, emoji sinh động).`;

    if (client) {
      try {
        const contents = [
          ...history.map(h => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }]
          })),
          {
            role: 'user',
            parts: [{
              text: `[Ngữ cảnh đang học: ${JSON.stringify(currentContext || {})}]\n\nCâu hỏi của tôi: ${query}`
            }]
          }
        ];

        const replyText = await this.generateContentWithFallback(client, {
          model,
          contents,
          systemInstruction: systemPrompt
        });

        return {
          reply: replyText,
          modelUsed: model || this.defaultModel
        };
      } catch (err) {
        console.warn('Gemini tutor error, using smart fallback:', err.message);
      }
    }

    return {
      reply: this.getLocalTutorReply(query, language),
      modelUsed: 'local-pedagogy-engine'
    };
  }

  /**
   * 3. AI ROLEPLAY & VOICE CHAT WITH INSTANT FEEDBACK & CONVERSATION HISTORY (Up to 10 recent turns)
   */
  async chatRoleplay({ scenario, messages = [], userMessage, language = 'zh', apiKey, model = this.defaultModel }) {
    const client = this.getClient(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung (HSK)' : 'Tiếng Anh (CEFR/IELTS)';

    const systemPrompt = `Bạn là một trợ lý AI thông minh đóng vai trong bài tập luyện giao tiếp ${langName}.
Tình huống giao tiếp: "${scenario?.title || 'Giao tiếp hàng ngày'}" - ${scenario?.description || 'Hội thoại tự nhiên'}.
Bạn đóng vai: "${scenario?.role || 'Người bản xứ'}".
Ngôn ngữ sử dụng: ${langName}.

NHIỆM VỤ & QUY TẮC BẮT BUỘC:
1. Tiếp tục cuộc trò chuyện một cách liền mạch, nhập đúng vai trò và bám sát toàn bộ diễn biến lịch sử các câu thoại trước đó.
2. Trả lời bằng ngôn ngữ đích, luôn đi kèm phiên âm (${language === 'zh' ? 'Pinyin chuẩn có dấu thanh điệu' : 'Phiên âm IPA'}) và bản dịch tiếng Việt tự nhiên.
3. Luôn đánh giá câu nói của người học và cung cấp phản hồi sư phạm:
   - Nhận xét tính tự nhiên (isNatural: true/false).
   - Đánh giá chất lượng (rating): "Xuất sắc" | "Tốt" | "Cần cải thiện".
   - Chỉ rõ lỗi ngữ pháp/từ vựng (nếu có) trong grammarCritique.
   - Đề xuất câu nói chuẩn bản xứ hơn (betterAlternative).
4. Luôn gợi ý 1 câu trả lời tiếp theo (hintForUser) kèm phiên âm và dịch nghĩa tiếng Việt để người học có thể nói tiếp dễ dàng nếu bí ý tưởng.

BẮT BUỘC TRẢ VỀ JSON HỢP LỆ THEO SCHEMA:
{
  "replyText": "Câu thoại tiếp theo của bạn bằng ngôn ngữ đích",
  "phonetic": "${language === 'zh' ? 'Pinyin có dấu' : 'Phiên âm IPA'}",
  "translation": "Dịch nghĩa câu thoại sang tiếng Việt",
  "userFeedback": {
    "isNatural": true,
    "rating": "Xuất sắc",
    "grammarCritique": "Nhận xét ngữ pháp hoặc từ vựng trong câu của người học",
    "betterAlternative": "Cách diễn đạt tự nhiên hơn của người bản xứ"
  },
  "hintForUser": "Gợi ý câu người học có thể nói tiếp theo (kèm phiên âm & dịch)"
}`;

    // Lưu và gửi kèm lịch sử tin nhắn trước đó (tối đa 10 lượt gần nhất)
    const recentMessages = (messages || []).slice(-10);
    const formattedHistory = recentMessages.map(m => {
      const speaker = m.role === 'bot' ? (scenario?.role || 'Bạn') : 'Người học';
      return `${speaker}: "${m.text}"`;
    }).join('\n');

    const prompt = `${formattedHistory ? `Lịch sử hội thoại trước đó (tối đa 10 lượt gần nhất):\n${formattedHistory}\n\n` : ''}Người học vừa nói: "${userMessage}"\nHãy nhập vai, duy trì ngữ cảnh liền mạch và đưa ra phản hồi theo định dạng JSON chuẩn.`;

    const fallback = this.getLocalRoleplayResponse(userMessage, scenario, language);

    if (client) {
      try {
        const result = await this.generateContentWithFallback(client, {
          model,
          contents: prompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          fallbackData: fallback
        });
        if (result && result.replyText) {
          return result;
        }
      } catch (err) {
        console.warn('Gemini roleplay failed, using local dialogue generator:', err.message);
      }
    }

    return fallback;
  }

  /**
   * 4. AI WRITING LAB: GRADING & VISUAL DIFF CORRECTION
   */
  async reviewWriting({ prompt, text, level = 'HSK1', language = 'zh', apiKey, model = this.defaultModel }) {
    const client = this.getClient(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung' : 'Tiếng Anh';

    const systemPrompt = `Bạn là một Chuyên gia khảo thí và Giám khảo chấm thi viết ${langName} (${language === 'zh' ? 'HSK 1-6' : 'IELTS / CEFR A1-C2'}).
Bạn chấm bài viết của thí sinh theo thang điểm 100, chỉ rõ từng lỗi sai (dùng từ, ngữ pháp, trật tự câu) và đưa ra 2 phiên bản nâng cấp: giao tiếp tự nhiên và học thuật chuyên nghiệp.

TRẢ VỀ KẾT QUẢ DẠNG JSON SCHEMA:
{
  "score": 85,
  "levelAchieved": "${level}",
  "overallVerdict": "Nhận xét tổng quan về bố cục, từ vựng và ngữ pháp",
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "errors": [
    {
      "original": "Cụm từ người dùng viết sai",
      "correction": "Cụm từ sửa lại đúng",
      "type": "Ngữ pháp | Từ vựng | Trật tự từ | Thanh điệu/Chính tả",
      "explanation": "Giải thích chi tiết tại sao sai và cách dùng đúng"
    }
  ],
  "improvedVersions": {
    "natural": {
      "text": "Phiên bản giao tiếp tự nhiên của người bản xứ",
      "phonetic": "Phiên âm Pinyin hoặc IPA",
      "translation": "Dịch tiếng Việt"
    },
    "advanced": {
      "text": "Phiên bản văn phong học thuật / chuyên nghiệp / HSK cao cấp",
      "phonetic": "Phiên âm Pinyin hoặc IPA",
      "translation": "Dịch tiếng Việt"
    }
  }
}`;

    const userPrompt = `Đề bài viết: "${prompt}"\nTrình độ mục tiêu: ${level}\nBài làm của người học:\n"""\n${text}\n"""\nHãy chấm điểm và trả về JSON chuẩn.`;

    const fallback = this.getLocalWritingReview(text, prompt, level, language);

    if (client) {
      try {
        const result = await this.generateContentWithFallback(client, {
          model,
          contents: userPrompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          fallbackData: fallback
        });
        if (result && result.score) return result;
      } catch (err) {
        console.warn('Gemini writing review failed, using local evaluation:', err.message);
      }
    }

    return fallback;
  }

  /**
   * 5. DYNAMIC READING PASSAGE GENERATION & QUIZ
   */
  async generateReading({ words = [], topic = 'Đời sống hàng ngày', level = 'HSK2', language = 'zh', apiKey, model = this.defaultModel }) {
    const clientInfo = this.getClientInfo(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung (HSK)' : 'Tiếng Anh (CEFR)';
    const wordList = Array.isArray(words) && words.length > 0 ? words : (language === 'zh' ? ['朋友', '学校', '学习'] : ['friend', 'school', 'study']);
    const wordListStr = wordList.join(', ');

    const systemPrompt = `Bạn là Tác giả sách giáo trình và khảo thí ngôn ngữ ${langName} xuất sắc.
Nhiệm vụ: Sáng tác một bài đọc ngắn, câu chuyện thực tế hấp dẫn theo đúng chủ đề "${topic}" ở trình độ ${level}.
YÊU CẦU QUAN TRỌNG:
1. BẮT BUỘC lồng ghép tự nhiên tất cả các từ vựng chỉ định sau vào bài đọc: ${wordListStr}.
2. Độ dài bài đọc: khoảng 80 - 150 từ, hành văn tự nhiên, đúng ngữ pháp.
3. Kèm theo 3 câu hỏi trắc nghiệm đọc hiểu (Comprehension Questions) với 4 phương án lựa chọn và giải thích dẫn chứng chi tiết.
4. LƯU Ý KỸ THUẬT: Trong câu trích dẫn hoặc đối thoại, TUYỆT ĐỐI KHÔNG dùng dấu nháy kép ASCII " trần (dễ làm hỏng JSON). Hãy dùng dấu ngoặc kép phương Đông “ ” hoặc dấu ngoặc đơn ' '.
5. BẮT BUỘC trả về đúng định dạng JSON hợp lệ theo cấu trúc sau (không kèm văn bản nào khác ngoài JSON):
{
  "title": "Tiêu đề bài đọc (kèm nghĩa tiếng Việt trong ngoặc)",
  "level": "${level}",
  "topic": "${topic}",
  "targetWords": ${JSON.stringify(wordList)},
  "content": "Nội dung bài đọc tiếng ${language === 'zh' ? 'Trung' : 'Anh'}",
  "pinyin": "${language === 'zh' ? 'Phiên âm Pinyin toàn bài đọc có thanh điệu' : ''}",
  "vietnameseTranslation": "Bản dịch nghĩa tiếng Việt trọn vẹn và tự nhiên",
  "vocabularyList": [
    {
      "word": "Từ vựng",
      "phonetic": "Pinyin hoặc IPA",
      "meaning": "Nghĩa tiếng Việt chuẩn"
    }
  ],
  "quiz": [
    {
      "question": "Câu hỏi đọc hiểu bằng tiếng Việt?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctIndex": 0,
      "explanation": "Dẫn chứng giải thích từ bài đọc"
    }
  ]
}`;

    const prompt = `Hãy sáng tác bài đọc ${langName} mới hoàn toàn ở trình độ ${level} theo chủ đề "${topic}". Các từ vựng bắt buộc xuất hiện trong bài: ${wordListStr}.`;

    if (clientInfo) {
      try {
        const result = await this.generateContentWithFallback(clientInfo, {
          model,
          contents: prompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json'
        });
        if (result && result.title && result.content) {
          return result;
        }
      } catch (err) {
        console.warn('Gemini reading generator error:', err.message);
      }
    }

    return this.getLocalReadingPassage(words, topic, level, language);
  }

  // ----------------------------------------------------------------------
  // SMART LOCAL FALLBACK GENERATORS (Zero-Failure Guarantee)
  // ----------------------------------------------------------------------

  getLocalMistakeExplanation({ question, userAnswer, correctAnswer, language }) {
    if (language === 'zh') {
      return {
        summary: `Đáp án chính xác là "${correctAnswer}". Câu trả lời của bạn chưa chuẩn xác về ngữ nghĩa hoặc thanh điệu trong tiếng Trung.`,
        detailedExplanation: `Trong ngữ cảnh câu "${question}", từ "${correctAnswer}" được sử dụng phổ biến nhất để thể hiện đúng sắc thái biểu cảm và trật tự câu chữ Hán.`,
        grammarRule: 'Trật tự câu cơ bản trong tiếng Trung là: Chủ ngữ + (Thời gian/Địa điểm) + Phó từ + Động từ + Tân ngữ. Trạng từ chỉ thời gian luôn đứng trước động từ.',
        etymologyOrPhonetics: 'Chiết tự chữ Hán: Xem xét chữ cấu thành gồm Bộ thủ biểu ý chỉ loại sự vật, và phần thanh bàng biểu âm giúp phán đoán cách đọc.',
        exampleSentence: {
          target: `${correctAnswer}，很高兴认识你！`,
          phonetic: 'Hěn gāoxìng rènshí nǐ!',
          meaning: 'Rất vui được làm quen với bạn!'
        },
        mnemonicTip: 'Ghi nhớ bằng hình ảnh: Hãy liên tưởng hình dạng chữ Hán với các sự vật thực tế xung quanh bạn để không bị nhầm lẫn!'
      };
    } else {
      return {
        summary: `Correct answer is "${correctAnswer}". Your answer differs in grammatical form or word choice.`,
        detailedExplanation: `In English, sentences must strictly agree in subject-verb agreement and tense markers. "${correctAnswer}" fulfills the grammatical slot correctly.`,
        grammarRule: 'Remember: Subject + Auxiliary/Be + Main Verb + Object. Pay attention to singular vs plural nouns and third-person singular -s/-es.',
        etymologyOrPhonetics: 'Phonetic note: Pay attention to linking sounds (liaison) when a consonant meets a vowel, and pronounce final sounds clearly.',
        exampleSentence: {
          target: `It is very important to use "${correctAnswer}" in this context.`,
          phonetic: '/ɪt ɪz ˈver.i ɪmˈpɔː.tənt/',
          meaning: 'Rất quan trọng khi sử dụng từ này trong đúng ngữ cảnh.'
        },
        mnemonicTip: 'Memory Hack: Associate this phrase with a daily habit so your brain recalls it automatically.'
      };
    }
  }

  getLocalTutorReply(query, language) {
    if (language === 'zh') {
      return `### 🐼 Gia sư LingoBot giải đáp:

Chào bạn! Về câu hỏi **"${query}"** của bạn trong Tiếng Trung:

1. **Ý nghĩa cốt lõi:**
   Trong tiếng Hán, cấu trúc này thường xuất hiện ở trình độ HSK 1 - HSK 3 trong giao tiếp sinh hoạt hàng ngày.

2. **Cách dùng chuẩn xác:**
   - Phiên âm Pinyin có thanh điệu chuẩn.
   - Luôn chú ý quy tắc biến điệu của Thanh 3 (hai thanh 3 đi liền nhau thì thanh 3 đầu tiên biến thành Thanh 2: *nǐ hǎo* -> *ní hǎo*).

3. **Ví dụ thực tế:**
   - **你好！** (*Nǐ hǎo!*) - Xin chào!
   - **很高兴认识你。** (*Hěn gāoxìng rènshí nǐ.*) - Rất vui được quen biết bạn.

> 💡 **Mẹo:** Bạn hãy cài đặt Google Gemini API Key trong mục **Hồ Sơ & Admin** để mình có thể giải thích chuyên sâu hơn nữa nhé!`;
    } else {
      return `### 🦉 LingoBot English Tutor:

Hello! Regarding your question **"${query}"**:

1. **Key Concept:**
   This grammar and vocabulary pattern is essential for natural English communication across CEFR A1-B2 levels.

2. **Pronunciation & Stress:**
   - Make sure to clearly pronounce ending consonants (/s/, /t/, /d/).
   - Stress the primary syllable for clear native rhythm.

3. **Practical Examples:**
   - *"Could you please help me with this?"*
   - *"Practice makes perfect!"*

> 💡 **Tip:** Add your Gemini API Key in **Profile & Admin** for instant deep-dive AI explanations!`;
    }
  }

  getLocalRoleplayResponse(userMessage, scenario, language) {
    if (language === 'zh') {
      return {
        replyText: '好的，我已经明白了。请问您还需要别的帮助吗？',
        phonetic: 'Hǎo de, wǒ yǐjīng míngbái le. Qǐngwèn nín hái xūyào bié de bāngzhù ma?',
        translation: 'Dạ vâng, tôi đã hiểu rồi. Xin hỏi bạn có cần giúp đỡ gì thêm không ạ?',
        userFeedback: {
          isNatural: true,
          rating: 'Tốt',
          grammarCritique: 'Bạn đã diễn đạt đúng ý cơ bản trong tình huống.',
          betterAlternative: 'Có thể dùng thêm trợ từ ngữ khí "吧" hoặc "呢" ở cuối câu để giọng điệu mềm mại tự nhiên hơn.'
        },
        hintForUser: '没有了，非常感谢你！(Méiyǒu le, fēicháng gǎnxiè nǐ! - Không còn gì nữa, cảm ơn bạn rất nhiều!)'
      };
    } else {
      return {
        replyText: 'Certainly! I completely understand. Is there anything else I can assist you with today?',
        phonetic: '/ˈsɜː.tən.li aɪ kəmˈpliːt.li ˌʌn.dəˈstænd/',
        translation: 'Chắc chắn rồi! Tôi hoàn toàn hiểu. Tôi có thể giúp gì thêm cho bạn hôm nay không?',
        userFeedback: {
          isNatural: true,
          rating: 'Tốt',
          grammarCritique: 'Your sentence structure is clear and effectively communicates your intent.',
          betterAlternative: 'For more polite tone in customer service, try: "Could you kindly check this for me, please?"'
        },
        hintForUser: 'That is all for now, thank you so much for your assistance!'
      };
    }
  }

  getLocalWritingReview(text, prompt, level, language) {
    return {
      score: 82,
      levelAchieved: level,
      overallVerdict: `Bài viết đáp ứng tốt yêu cầu đề bài "${prompt}". Ý tứ rõ ràng, diễn đạt mạch lạc và có sử dụng từ vựng phù hợp với trình độ ${level}.`,
      strengths: [
        'Vận dụng đúng trật tự từ chủ ngữ - vị ngữ',
        'Có sự kết nối giữa các câu trong đoạn'
      ],
      errors: [
        {
          original: text.slice(0, 15) || 'câu đầu',
          correction: language === 'zh' ? 'Cần chú ý thanh điệu và trật tự phó từ' : 'Watch out for verb tense consistency',
          type: 'Ngữ pháp',
          explanation: language === 'zh' ? 'Phó từ chỉ mức độ thường đứng ngay trước tính từ/động từ tâm lý.' : 'Ensure auxiliary verbs match the subject.'
        }
      ],
      improvedVersions: {
        natural: {
          text: language === 'zh' ? '今天天气非常好，我和朋友一起去公园散步，感到非常开心。' : 'The weather was fantastic today, so I went for a relaxing walk in the park with my friend.',
          phonetic: language === 'zh' ? 'Jīntiān tiānqì fēicháng hǎo, wǒ hé péngyou yìqǐ qù gōngyuán sànbù, gǎndào fēicháng kāixīn.' : '',
          translation: 'Hôm nay thời tiết rất đẹp, tôi cùng bạn đi dạo công viên, cảm thấy vô cùng vui vẻ.'
        },
        advanced: {
          text: language === 'zh' ? '今日天朗气清，余与友人漫步于绿意盎然之公园，心旷神怡。' : 'Benefiting from the pleasant weather, I spent a delightful afternoon strolling through the park alongside a companion.',
          phonetic: language === 'zh' ? 'Jīnrì tiānlǎng qìqīng, yú yǔ yǒurén mànbù yú lǜyì àngrán zhī gōngyuán, xīnkuàng shényí.' : '',
          translation: 'Hôm nay trời trong gió mát, tôi cùng bạn tản bộ nơi công viên xanh ngát, tâm hồn khoan khoái thảnh thơi.'
        }
      }
    };
  }

  getLocalReadingPassage(words, topic = 'Đời sống', level = 'HSK2', language = 'zh') {
    const vocabList = Array.isArray(words) && words.length > 0 ? words : (language === 'zh' ? ['朋友', '学校', '学习'] : ['friend', 'school', 'study']);
    
    if (language === 'zh') {
      const w0 = vocabList[0] || '朋友';
      const w1 = vocabList[1] || '生活';
      const w2 = vocabList[2] || '体验';
      return {
        title: `${topic} - Cùng khám phá với ${w0}`,
        level: level,
        topic: topic,
        targetWords: vocabList,
        content: `今天是一个非常特别的日子。我和我的${w0}一起参与了“${topic}”的活动。在活动中，我们认真观察，互相交流${w1}中的各种趣事。经过这次经历，我们不仅更好地掌握了${w2}的意义，而且增进了彼此的友谊。大家都觉得这次活动非常有收获。`,
        pinyin: `Jīntiān shì yí gè fēicháng tèbié de rìzi. Wǒ hé wǒ de ${w0} yìqǐ cānyù le “${topic}” de huódòng. Zài huódòng zhōng, wǒmen rènzhēn guānchá, hùxiāng jiāoliú ${w1} zhōng de gèzhǒng qùshì. Jīngguò zhè cì jīnglì, wǒmen bùjǐn gèng hǎo de zhǎngwò le ${w2} de yìyì, érqiě zēngjìn le bǐcǐ de yǒuyì. Dàjiā dōu juéde zhè cì huódòng fēicháng yǒu shōuhuò.`,
        vietnameseTranslation: `Hôm nay là một ngày vô cùng đặc biệt. Tôi và ${w0} của tôi đã cùng tham gia hoạt động "${topic}". Trong suốt hoạt động, chúng tôi đã chăm chú quan sát và trao đổi về những điều thú vị trong ${w1}. Qua trải nghiệm lần này, chúng tôi không chỉ hiểu rõ hơn về ý nghĩa của ${w2}, mà còn làm sâu sắc thêm tình bạn. Mọi người đều cảm thấy chuyến đi thật bổ ích.`,
        vocabularyList: vocabList.map(w => ({ word: w, phonetic: 'Pinyin', meaning: `Từ vựng trọng tâm trong chủ đề ${topic}` })),
        quiz: [
          {
            question: `Chủ đề trải nghiệm của các nhân vật trong bài đọc là gì?`,
            options: [`Trải nghiệm hoạt động "${topic}"`, 'Đi máy bay sang nước ngoài', 'Đi siêu thị một mình', 'Nghỉ ngơi ở nhà'],
            correctIndex: 0,
            explanation: `Dẫn chứng trong bài đọc: "参与了“${topic}”的活动" (Tham gia hoạt động ${topic}).`
          },
          {
            question: `Nhân vật chính đã tham gia hoạt động cùng ai?`,
            options: [`Cùng với ${w0}`, 'Đi một mình không có ai', 'Cùng một người lạ mặt', 'Cùng với giáo viên'],
            correctIndex: 0,
            explanation: `Dẫn chứng: "我和我的${w0}一起" (Tôi và ${w0} cùng tham gia).`
          },
          {
            question: `Cảm xúc của các nhân vật sau chuyến trải nghiệm thế nào?`,
            options: ['Cảm thấy rất bổ ích và vui vẻ', 'Cảm thấy rất mệt và chán nản', 'Rất buồn bã và tức giận', 'Không có cảm xúc gì'],
            correctIndex: 0,
            explanation: 'Dẫn chứng câu cuối: "大家都觉得这次活动非常有收获" (Mọi người đều cảm thấy chuyến đi rất bổ ích).'
          }
        ]
      };
    } else {
      const w0 = vocabList[0] || 'friend';
      const w1 = vocabList[1] || 'learning';
      const w2 = vocabList[2] || 'journey';
      return {
        title: `${topic}: An Inspiring Journey with ${w0}`,
        level: level,
        topic: topic,
        targetWords: vocabList,
        content: `Today was a memorable occasion. I joined hands with my ${w0} to explore "${topic}". Throughout this vibrant experience, we exchanged insightful thoughts about ${w1} and everyday life. Engaging deeply in this event allowed us to appreciate ${w2} from a whole new perspective. It was truly an enriching and delightful day.`,
        pinyin: '',
        vietnameseTranslation: `Hôm nay là một dịp đáng nhớ. Tôi đã cùng ${w0} của mình khám phá chủ đề "${topic}". Trong suốt trải nghiệm sống động này, chúng tôi đã trao đổi những góc nhìn sâu sắc về ${w1} và cuộc sống thường nhật. Trải nghiệm ý nghĩa này đã giúp chúng tôi trân trọng ${w2} từ một góc nhìn hoàn toàn mới. Đó thực sự là một ngày tràn đầy năng lượng và bổ ích.`,
        vocabularyList: vocabList.map(w => ({ word: w, phonetic: '/.../', meaning: `Key vocabulary in topic ${topic}` })),
        quiz: [
          {
            question: `What was the primary focus of their day?`,
            options: [`Exploring the theme of "${topic}"`, 'Staying indoors all day', 'Taking an exam', 'Going to sleep early'],
            correctIndex: 0,
            explanation: `Evidence: "joined hands with my ${w0} to explore ${topic}."`
          },
          {
            question: `Who accompanied the narrator?`,
            options: [`Their ${w0}`, 'Nobody, went alone', 'A taxi driver', 'A stranger'],
            correctIndex: 0,
            explanation: `Evidence: "I joined hands with my ${w0}..."`
          }
        ]
      };
    }
  }

  /**
   * 7. REAL-TIME AI STREAMING (SSE) FOR FLOATING AI TUTOR
   */
  async streamTutorResponse({ query, currentContext, language = 'zh', history = [], apiKey, model = this.defaultModel, onChunk }) {
    const clientInfo = this.getClientInfo(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung' : 'Tiếng Anh';

    const systemPrompt = `Bạn là "LingoBot" - Gia sư AI chuyên dạy ${langName} theo phương pháp Duolingo: thân thiện, giải thích ngắn gọn, súc tích, dễ nhớ, luôn có ví dụ thực tế.
Khi trả lời tiếng Trung, luôn kèm Pinyin và dịch nghĩa. Khi trả lời tiếng Anh, kèm phiên âm IPA và giải thích ngữ cảnh.
Định dạng câu trả lời bằng Markdown đẹp mắt (sử dụng in đậm, bullet points, emoji sinh động).`;

    const contents = [
      ...history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      })),
      {
        role: 'user',
        parts: [{
          text: `[Ngữ cảnh đang học: ${JSON.stringify(currentContext || {})}]\n\nCâu hỏi của tôi: ${query}`
        }]
      }
    ];

    if (clientInfo) {
      const isCustom = clientInfo.isCustom;
      const maxTries = isCustom ? 1 : Math.max(1, this.keyPool.keys.length);
      const targetModel = this.normalizeModel(model);

      for (let attempt = 0; attempt < maxTries; attempt++) {
        const info = attempt === 0 ? clientInfo : this.keyPool.getNextClient();
        if (!info || !info.client) break;

        const modelsToTry = [targetModel];
        for (const cm of this.candidateModels) {
          if (!modelsToTry.includes(cm)) modelsToTry.push(cm);
        }
        let keyFailed = false;

        for (const m of modelsToTry) {
          try {
            const streamPromise = info.client.models.generateContentStream({
              model: m,
              contents,
              config: {
                systemInstruction: systemPrompt
              }
            });

            // Fast-Failover: 8s connect timeout to prevent any hangs
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('AI stream connection timeout (>8s)')), 8000)
            );

            const stream = await Promise.race([streamPromise, timeoutPromise]);

            for await (const chunk of stream) {
              if (chunk.text) {
                onChunk(chunk.text);
              }
            }
            return;
          } catch (err) {
            if (this.keyPool.isDeadError(err)) {
              this.keyPool.markDead(info.key, err.message);
              keyFailed = true;
              break;
            } else if (err?.status === 429 || String(err?.message || '').includes('429')) {
              this.keyPool.markCooldown(info.key, 60);
              keyFailed = true;
              break;
            } else {
              console.warn(`Streaming with model ${m} failed:`, err.message);
            }
          }
        }

        if (!keyFailed) break;
      }
    }

    // High quality pedagogical fallback streaming simulation if no API key or network glitch
    const fallbackText = this.getLocalTutorReply(query, language);
    const words = fallbackText.split(' ');
    for (const w of words) {
      onChunk(w + ' ');
      await new Promise(r => setTimeout(r, 20));
    }
  }

  /**
   * 8. GENERATE LESSON VARIATION VIA GEMINI AI
   * Generates a fresh set of realistic practice exercises for the current lesson context
   */
  async generateLessonVariation({ words = [], level = 'HSK 1', language = 'zh', currentExercises = [], apiKey, model = this.defaultModel }) {
    const clientInfo = this.getClientInfo(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung (HSK)' : 'Tiếng Anh (CEFR)';
    const wordListStr = Array.isArray(words) && words.length > 0
      ? words.map(w => typeof w === 'string' ? w : `${w.word} (${w.meaningVi || ''})`).join(', ')
      : (language === 'zh' ? '你好, 谢谢, 朋友' : 'hello, thank you, friend');

    const prompt = `Bạn là chuyên gia sư phạm ngôn ngữ ${langName}.
Hãy tạo một bộ bài tập biến thể thực chiến mới (5 câu) cho học viên cấp độ ${level} dựa trên các từ vựng cốt lõi: ${wordListStr}.
Định dạng kết quả trả về BẮT BUỘC là một mảng JSON thuần túy (Array of Objects) không có bọc markdown hay text nào khác ngoài JSON:
[
  {
    "id": "ai_var_1",
    "type": "listening",
    "prompt": "Nghe/Đọc và chọn nghĩa đúng của câu/từ sau:",
    "target_text": "Từ hoặc câu tiếng ${language === 'zh' ? 'Trung' : 'Anh'}",
    "target_audio_text": "Từ hoặc câu tiếng ${language === 'zh' ? 'Trung' : 'Anh'}",
    "phonetic": "Phiên âm Pinyin có dấu hoặc IPA",
    "vietnamese_meaning": "Nghĩa tiếng Việt chuẩn",
    "options": ["Đáp án đúng", "Phương án nhiễu 1", "Phương án nhiễu 2", "Phương án nhiễu 3"],
    "correct_answer": "Đáp án đúng",
    "hint": "Gợi ý sư phạm ngắn gọn"
  },
  {
    "id": "ai_var_2",
    "type": "writing",
    "prompt": "Tập viết chữ / từ vựng thực tế:",
    "target_text": "${language === 'zh' ? 'Chữ Hán 1-2 chữ' : 'Từ tiếng Anh'}",
    "target_audio_text": "${language === 'zh' ? 'Chữ Hán' : 'Từ tiếng Anh'}",
    "stroke_char": "${language === 'zh' ? 'Chữ Hán đầu tiên' : ''}",
    "phonetic": "Phiên âm",
    "vietnamese_meaning": "Nghĩa tiếng Việt",
    "hint": "Gợi ý nhớ từ"
  },
  {
    "id": "ai_var_3",
    "type": "translation",
    "prompt": "Sắp xếp các từ thành câu hoàn chỉnh theo nghĩa: ...",
    "target_text": "Câu mẫu hoàn chỉnh",
    "target_audio_text": "Câu mẫu hoàn chỉnh",
    "phonetic": "Phiên âm",
    "vietnamese_meaning": "Nghĩa tiếng Việt của câu",
    "options": ["từ1", "từ2", "từ3", "từ_nhiễu1", "từ_nhiễu2"],
    "correct_answer": "Câu mẫu hoàn chỉnh",
    "hint": "Chú ý ngữ pháp trật tự từ"
  },
  {
    "id": "ai_var_4",
    "type": "speaking",
    "prompt": "Luyện phát âm mẫu câu giao tiếp thực tế mới:",
    "target_text": "Câu giao tiếp tự nhiên",
    "target_audio_text": "Câu giao tiếp tự nhiên",
    "phonetic": "Phiên âm",
    "vietnamese_meaning": "Nghĩa tiếng Việt",
    "hint": "Nói rõ từng âm"
  },
  {
    "id": "ai_var_5",
    "type": "listening",
    "prompt": "Hoàn thành câu hội thoại thực tế:",
    "target_text": "Câu thực tế",
    "target_audio_text": "Câu thực tế",
    "phonetic": "Phiên âm",
    "vietnamese_meaning": "Nghĩa tiếng Việt",
    "options": ["Đáp án đúng", "Nhiễu 1", "Nhiễu 2", "Nhiễu 3"],
    "correct_answer": "Đáp án đúng",
    "hint": "Ngữ cảnh giao tiếp thực chiến"
  }
]`;

    if (clientInfo) {
      try {
        const parsed = await this.generateContentWithFallback(clientInfo, {
          model,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          responseMimeType: 'application/json'
        });
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (err) {
        console.warn('generateLessonVariation Gemini call failed:', err.message);
      }
    }

    return this.generateLocalVariation(words, level, language);
  }

  generateLocalVariation(words, level, language) {
    const isZh = language === 'zh';
    const sampleWord = (Array.isArray(words) && words.length > 0)
      ? (typeof words[0] === 'string' ? { word: words[0], meaningVi: words[0] } : words[0])
      : (isZh ? { word: '你好', pronunciation: 'nǐ hǎo', meaningVi: 'Xin chào' } : { word: 'hello', pronunciation: '/həˈloʊ/', meaningVi: 'Xin chào' });

    return [
      {
        id: 'local_var_1',
        type: 'listening',
        prompt: `Nghe và chọn nghĩa chính xác trong ngữ cảnh giao tiếp:`,
        target_text: sampleWord.word,
        target_audio_text: sampleWord.word,
        phonetic: sampleWord.pronunciation || '',
        vietnamese_meaning: sampleWord.meaningVi || '',
        options: [sampleWord.meaningVi, 'Tạm biệt', 'Cảm ơn nhiều', 'Xin lỗi'],
        correct_answer: sampleWord.meaningVi,
        hint: 'Gợi ý: Lời chào hỏi lịch sự cơ bản'
      },
      {
        id: 'local_var_2',
        type: 'writing',
        prompt: isZh ? `Tập viết chữ "${sampleWord.word}" chuẩn thứ tự nét:` : `Luyện viết và đánh vần từ "${sampleWord.word}":`,
        target_text: sampleWord.word,
        target_audio_text: sampleWord.word,
        stroke_char: isZh ? sampleWord.word.charAt(0) : '',
        phonetic: sampleWord.pronunciation || '',
        vietnamese_meaning: sampleWord.meaningVi || '',
        hint: 'Viết từ tốn và chuẩn nét'
      },
      {
        id: 'local_var_3',
        type: 'speaking',
        prompt: `Luyện phát âm mẫu câu giao tiếp tự nhiên:`,
        target_text: isZh ? `${sampleWord.word}！很高兴认识你。` : `${sampleWord.word}! Nice to meet you.`,
        target_audio_text: isZh ? `${sampleWord.word}！很高兴认识你。` : `${sampleWord.word}! Nice to meet you.`,
        phonetic: isZh ? `${sampleWord.pronunciation || 'nǐ hǎo'}! Hěn gāoxìng rènshi nǐ.` : `${sampleWord.pronunciation || 'həˈloʊ'}! naɪs tuː miːt juː.`,
        vietnamese_meaning: `${sampleWord.meaningVi}! Rất vui được làm quen với bạn.`,
        hint: 'Nói to và truyền cảm'
      }
    ];
  }
}

module.exports = new AIService();
