// AI Client Service communicating with /api/ai endpoints, managing API Key & Safe JSON Parsing

export const safeParseAIJson = (rawText, fallbackData = null) => {
  if (!rawText) return fallbackData;
  if (typeof rawText === 'object') return rawText;
  try {
    const cleaned = String(rawText)
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('AI JSON Parse Error:', err);
    try {
      const firstBrace = rawText.indexOf('{');
      const firstBracket = rawText.indexOf('[');
      let startIdx = -1;
      let endIdx = -1;

      if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
        startIdx = firstBrace;
        endIdx = rawText.lastIndexOf('}');
      } else if (firstBracket !== -1) {
        startIdx = firstBracket;
        endIdx = rawText.lastIndexOf(']');
      }

      if (startIdx !== -1 && endIdx > startIdx) {
        const sub = rawText.substring(startIdx, endIdx + 1);
        return JSON.parse(sub);
      }
    } catch (subErr) {
      console.error('AI JSON Substring Parse Error:', subErr);
    }
    return fallbackData;
  }
};

class AIClient {
  constructor() {
    this.storageKey = 'lingo555_gemini_api_key';
    this.modelStorageKey = 'lingo555_gemini_model';
  }

  getApiKey() {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(this.storageKey) || localStorage.getItem('lingoflow_gemini_api_key') || '';
  }

  setApiKey(key) {
    if (typeof window === 'undefined') return;
    if (key) {
      localStorage.setItem(this.storageKey, key.trim());
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }

  getModel() {
    if (typeof window === 'undefined') return 'gemini-3.5-flash-lite';
    const stored = localStorage.getItem(this.modelStorageKey);
    if (!stored || stored === 'gemini-2.5-flash') return 'gemini-3.5-flash-lite';
    return stored;
  }

  setModel(model) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.modelStorageKey, model);
  }

  async getStatus() {
    try {
      const res = await fetch('/api/ai/status');
      if (!res.ok) return { active: false, hasServerKey: false };
      return await res.json();
    } catch (e) {
      return { active: false, hasServerKey: false };
    }
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const key = this.getApiKey();
    if (key) {
      headers['x-gemini-api-key'] = key;
    }
    headers['x-gemini-model'] = this.getModel();
    return headers;
  }

  async verifyKey(key, model) {
    try {
      const res = await fetch('/api/ai/verify-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': key || this.getApiKey(),
          'x-gemini-model': model || this.getModel()
        }
      });
      return await res.json();
    } catch (err) {
      return { valid: false, message: 'Lỗi mạng hoặc không thể kết nối tới máy chủ AI: ' + err.message };
    }
  }

  async explainMistake({ question, userAnswer, correctAnswer, language, hint }) {
    try {
      const res = await fetch('/api/ai/explain-mistake', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ question, userAnswer, correctAnswer, language, hint })
      });
      return await res.json();
    } catch (err) {
      console.warn('explainMistake fetch error:', err);
      return { success: false, error: err.message };
    }
  }

  async askTutor({ query, currentContext, language, history }) {
    try {
      const res = await fetch('/api/ai/ask-tutor', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ query, currentContext, language, history })
      });
      return await res.json();
    } catch (err) {
      console.warn('askTutor fetch error:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Real-Time Server-Sent Events (SSE) Streaming for Floating AI Tutor
   * Streams response tokens word-by-word with ultra-low latency (<0.3s)
   */
  async askTutorStream({ query, currentContext, language, history, onChunk, onDone, onError }) {
    try {
      const response = await fetch('/api/ai/ask-tutor-stream', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ query, currentContext, language, history })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data:')) {
            const jsonStr = trimmed.replace(/^data:\s*/, '').trim();
            if (jsonStr) {
              try {
                const parsed = JSON.parse(jsonStr);
                if (parsed.text && onChunk) {
                  onChunk(parsed.text);
                }
                if (parsed.done && onDone) {
                  onDone();
                }
                if (parsed.error && onError) {
                  onError(parsed.error);
                }
              } catch (parseErr) {
                // Ignore transient json chunk boundary errors
              }
            }
          }
        }
      }

      if (onDone) onDone();
    } catch (err) {
      console.warn('askTutorStream error:', err);
      if (onError) onError(err.message);
    }
  }

  async chatRoleplay({ scenario, messages, userMessage, language }) {
    try {
      // Retain up to 10 most recent conversation history items
      const recentMessages = (messages || []).slice(-10);
      const res = await fetch('/api/ai/chat-roleplay', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ scenario, messages: recentMessages, userMessage, language })
      });
      return await res.json();
    } catch (err) {
      console.warn('chatRoleplay fetch error:', err);
      return { success: false, error: err.message };
    }
  }

  async reviewWriting({ prompt, text, level, language }) {
    try {
      const res = await fetch('/api/ai/review-writing', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ prompt, text, level, language })
      });
      return await res.json();
    } catch (err) {
      console.warn('reviewWriting fetch error:', err);
      return { success: false, error: err.message };
    }
  }

  async generateReading({ words, topic, level, language }) {
    try {
      const res = await fetch('/api/ai/generate-reading', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ words, topic, level, language })
      });
      return await res.json();
    } catch (err) {
      console.warn('generateReading fetch error:', err);
      return { success: false, error: err.message };
    }
  }

  async generateLessonVariation({ words, level, language, currentExercises }) {
    try {
      const res = await fetch('/api/ai/generate-lesson-variation', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ words, level, language, currentExercises })
      });
      return await res.json();
    } catch (err) {
      console.warn('generateLessonVariation fetch error:', err);
      return { success: false, error: err.message };
    }
  }
}

export const ai = new AIClient();
