const { GoogleGenAI } = require('@google/genai');

class AIService {
  constructor() {
    this.defaultModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    this.candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.8-flash'];
  }

  getClient(apiKey) {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
  }

  async generateContentWithFallback(client, { model, contents, systemInstruction, responseMimeType }) {
    const modelsToTry = [];
    if (model && !modelsToTry.includes(model)) modelsToTry.push(model);
    for (const cm of this.candidateModels) {
      if (!modelsToTry.includes(cm)) modelsToTry.push(cm);
    }

    let lastError = null;
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
          const cleaned = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
          return JSON.parse(cleaned);
        }
        return rawText;
      } catch (err) {
        lastError = err;
        console.warn(`Model ${m} failed, trying next candidate:`, err.message);
      }
    }
    throw lastError || new Error('All model candidates failed');
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

    if (client) {
      try {
        return await this.generateContentWithFallback(client, {
          model,
          contents: userPrompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json'
        });
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local pedagogical generator:', err.message);
      }
    }

    // High quality local fallback if no API key or network error
    return this.getLocalMistakeExplanation({ question, userAnswer, correctAnswer, language, hint });
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
   * 3. AI ROLEPLAY & VOICE CHAT WITH INSTANT FEEDBACK
   */
  async chatRoleplay({ scenario, messages = [], userMessage, language = 'zh', apiKey, model = this.defaultModel }) {
    const client = this.getClient(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung' : 'Tiếng Anh';

    const systemPrompt = `Bạn đang tham gia bài tập nhập vai hội thoại ngôn ngữ ${langName} với người học.
Tình huống: "${scenario.title} - ${scenario.description}".
Bạn đóng vai: "${scenario.role || 'Người bản xứ'}".
Nhiệm vụ:
1. Trả lời người học một cách tự nhiên như người bản xứ theo đúng ngữ cảnh tình huống.
2. Cung cấp phiên âm (${language === 'zh' ? 'Pinyin' : 'IPA'}) và bản dịch tiếng Việt cho câu bạn nói.
3. Đánh giá câu nói của người dùng:
   - Câu nói đã tự nhiên chưa?
   - Có lỗi ngữ pháp/từ vựng nào không?
   - Đề xuất câu nói chuẩn bản xứ hơn (Native polish).
4. Gợi ý 1 câu trả lời tiếp theo (Hint) để người học có thể nói tiếp nếu bị bí.

BẮT BUỘC TRẢ VỀ JSON HỢP LỆ THEO SCHEMA:
{
  "replyText": "Câu thoại tiếp theo của bạn bằng ngôn ngữ đích",
  "phonetic": "Phiên âm Pinyin hoặc IPA",
  "translation": "Dịch nghĩa câu thoại sang tiếng Việt",
  "userFeedback": {
    "isNatural": true/false,
    "rating": "Xuất sắc" | "Tốt" | "Cần cải thiện",
    "grammarCritique": "Nhận xét ngữ pháp hoặc từ vựng trong câu của người học",
    "betterAlternative": "Cách diễn đạt tự nhiên hơn của người bản xứ"
  },
  "hintForUser": "Gợi ý câu người học có thể nói tiếp theo (kèm phiên âm & dịch)"
}`;

    const formattedHistory = messages.map(m => `${m.role === 'bot' ? 'Bạn' : 'Người học'}: ${m.text}`).join('\n');
    const prompt = `Lịch sử hội thoại:\n${formattedHistory}\n\nNgười học vừa nói: "${userMessage}"\nHãy nhập vai và đưa ra phản hồi theo định dạng JSON chuẩn.`;

    if (client) {
      try {
        return await this.generateContentWithFallback(client, {
          model,
          contents: prompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json'
        });
      } catch (err) {
        console.warn('Gemini roleplay failed, using local dialogue generator:', err.message);
      }
    }

    return this.getLocalRoleplayResponse(userMessage, scenario, language);
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

    if (client) {
      try {
        return await this.generateContentWithFallback(client, {
          model,
          contents: userPrompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json'
        });
      } catch (err) {
        console.warn('Gemini writing review failed, using local evaluation:', err.message);
      }
    }

    return this.getLocalWritingReview(text, prompt, level, language);
  }

  /**
   * 5. DYNAMIC READING PASSAGE GENERATION & QUIZ
   */
  async generateReading({ words = [], topic = 'Đời sống hàng ngày', level = 'HSK2', language = 'zh', apiKey, model = this.defaultModel }) {
    const client = this.getClient(apiKey);
    const langName = language === 'zh' ? 'Tiếng Trung' : 'Tiếng Anh';

    const systemPrompt = `Bạn là Tác giả sách giáo khoa ngôn ngữ ${langName}.
Nhiệm vụ: Sáng tác một đoạn văn / câu chuyện ngắn hấp dẫn theo chủ đề "${topic}" ở cấp độ ${level}, lồng ghép chính xác các từ vựng chỉ định: ${words.join(', ')}.
Kèm theo 3 câu hỏi trắc nghiệm đọc hiểu (Comprehension Questions) để kiểm tra người học.

TRẢ VỀ JSON THEO SCHEMA CHUẨN:
{
  "title": "Tiêu đề bài đọc",
  "level": "${level}",
  "topic": "${topic}",
  "targetWords": ${JSON.stringify(words)},
  "content": "Đoạn văn hoàn chỉnh (khoảng 80-150 từ)",
  "pinyin": "${language === 'zh' ? 'Toàn bộ phiên âm Pinyin của đoạn văn có dấu cách chuẩn' : ''}",
  "vietnameseTranslation": "Bản dịch nghĩa trọn vẹn của bài đọc sang tiếng Việt",
  "vocabularyList": [
    {
      "word": "Từ vựng",
      "phonetic": "Pinyin/IPA",
      "meaning": "Nghĩa tiếng Việt"
    }
  ],
  "quiz": [
    {
      "question": "Câu hỏi đọc hiểu bằng tiếng Việt",
      "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
      "correctIndex": 0,
      "explanation": "Giải thích chi tiết dẫn chứng trong bài đọc"
    }
  ]
}`;

    const prompt = `Hãy tạo một bài đọc ${langName} cấp độ ${level} chủ đề "${topic}", tích hợp các từ vựng: ${words.join(', ')}.`;

    if (client) {
      try {
        return await this.generateContentWithFallback(client, {
          model,
          contents: prompt,
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json'
        });
      } catch (err) {
        console.warn('Gemini reading generator failed, using local reading sample:', err.message);
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

  getLocalReadingPassage(words, topic, level, language) {
    if (language === 'zh') {
      const vocabList = words.length > 0 ? words : ['你好', '朋友', '学校', '学习'];
      return {
        title: `周末的一天 (Một ngày cuối tuần)`,
        level: level,
        topic: topic,
        targetWords: vocabList,
        content: `今天是星期六。阳光明媚，小明去学校看望他的老朋友。他们一起在图书馆里学习汉语，还喝了中国绿茶。小明说：“学习虽然很辛苦，但是和朋友在一起非常快乐。” 他们度过了充实美好的一天。`,
        pinyin: `Jīntiān shì xīngqīliù. Yángguāng míngmèi, Xiǎomíng qù xuéxiào kànwàng tā de lǎo péngyou. Tāmen yìqǐ zài túshūguǎn lǐ xuéxí Hànyǔ, hái hē le Zhōngguó lǜchá. Xiǎomíng shuō: “Xuéxí suīrán hěn xīnkǔ, dànshì hé péngyou zài yìqǐ fēicháng kuàilè.” Tāmen dùguò le chōngshí měihǎo de yì tiān.`,
        vietnameseTranslation: `Hôm nay là thứ bảy. Ánh nắng rực rỡ, Tiểu Minh đến trường thăm người bạn cũ của mình. Họ cùng nhau học tiếng Trung trong thư viện và còn uống trà xanh Trung Quốc. Tiểu Minh nói: "Học tập tuy vất vả nhưng được ở cùng bạn bè thì vô cùng vui vẻ." Họ đã trải qua một ngày thật trọn vẹn và tốt đẹp.`,
        vocabularyList: vocabList.map(w => ({ word: w, phonetic: 'Pinyin', meaning: 'Từ vựng trọng tâm trong bài' })),
        quiz: [
          {
            question: 'Tiểu Minh đã đến đâu để gặp bạn của mình?',
            options: ['Đến trường học (学校)', 'Đến sân bay (机场)', 'Đến bệnh viện (医院)', 'Đến công viên (公园)'],
            correctIndex: 0,
            explanation: 'Dẫn chứng trong câu: "小明去学校看望他的老朋友" (Tiểu Minh đến trường thăm người bạn cũ).'
          },
          {
            question: 'Họ đã uống thức uống gì trong thư viện?',
            options: ['Trà xanh Trung Quốc (中国绿茶)', 'Cà phê đen (黑咖啡)', 'Nước ép hoa quả (果汁)', 'Trà sữa (奶茶)'],
            correctIndex: 0,
            explanation: 'Dẫn chứng trong bài: "还喝了中国绿茶" (còn uống trà xanh Trung Quốc).'
          },
          {
            question: 'Tiểu Minh cảm thấy thế nào khi học tập cùng bạn bè?',
            options: ['Rất vui vẻ (非常快乐)', 'Rất buồn chán (很无聊)', 'Rất tức giận (很生气)', 'Rất mệt mỏi (很累)'],
            correctIndex: 0,
            explanation: 'Dẫn chứng: "但是和朋友在一起非常快乐" (nhưng ở cùng bạn bè thì rất vui vẻ).'
          }
        ]
      };
    } else {
      const vocabList = words.length > 0 ? words : ['friend', 'student', 'coffee', 'opportunity'];
      return {
        title: 'A Productive Weekend at the Central Cafe',
        level: level,
        topic: topic,
        targetWords: vocabList,
        content: `Saturday morning was bright and crisp. Alex, an enthusiastic medical student, met his childhood friend at a bustling local cafe. While sipping freshly brewed coffee, they discussed an exciting internship opportunity coming up next semester. "Consistent practice always opens doors," Alex remarked with a warm smile.`,
        pinyin: '',
        vietnameseTranslation: `Sáng thứ bảy trời trong lành và se lạnh. Alex, một sinh viên y khoa nhiệt huyết, đã gặp người bạn thời thơ ấu tại một quán cà phê địa phương nhộn nhịp. Trong lúc nhâm nhi tách cà phê mới pha, họ thảo luận về một cơ hội thực tập thú vị sắp diễn ra vào học kỳ tới. "Luyện tập kiên trì luôn mở ra những cánh cửa," Alex nhận xét với một nụ cười ấm áp.`,
        vocabularyList: vocabList.map(w => ({ word: w, phonetic: '/.../', meaning: 'Key vocabulary word' })),
        quiz: [
          {
            question: 'What is Alex\'s occupation in the passage?',
            options: ['A medical student', 'A coffee barista', 'A hotel manager', 'An English pilot'],
            correctIndex: 0,
            explanation: 'Evidence: "Alex, an enthusiastic medical student..."'
          },
          {
            question: 'What were they discussing at the cafe?',
            options: ['An internship opportunity', 'Buying a new car', 'Booking a flight ticket', 'A soccer match'],
            correctIndex: 0,
            explanation: 'Evidence: "...they discussed an exciting internship opportunity coming up next semester."'
          },
          {
            question: 'Where did the two friends meet?',
            options: ['At a bustling local cafe', 'At a hospital', 'At the airport', 'At the library'],
            correctIndex: 0,
            explanation: 'Evidence: "...met his childhood friend at a bustling local cafe."'
          }
        ]
      };
    }
  }
}

module.exports = new AIService();
