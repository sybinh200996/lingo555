// AI Client Service communicating with /api/ai endpoints and managing API Key

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
    const res = await fetch('/api/ai/verify-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-gemini-api-key': key || this.getApiKey(),
        'x-gemini-model': model || this.getModel()
      }
    });
    return res.json();
  }

  async explainMistake({ question, userAnswer, correctAnswer, language, hint }) {
    const res = await fetch('/api/ai/explain-mistake', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ question, userAnswer, correctAnswer, language, hint })
    });
    return res.json();
  }

  async askTutor({ query, currentContext, language, history }) {
    const res = await fetch('/api/ai/ask-tutor', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ query, currentContext, language, history })
    });
    return res.json();
  }

  async chatRoleplay({ scenario, messages, userMessage, language }) {
    const res = await fetch('/api/ai/chat-roleplay', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ scenario, messages, userMessage, language })
    });
    return res.json();
  }

  async reviewWriting({ prompt, text, level, language }) {
    const res = await fetch('/api/ai/review-writing', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ prompt, text, level, language })
    });
    return res.json();
  }

  async generateReading({ words, topic, level, language }) {
    const res = await fetch('/api/ai/generate-reading', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ words, topic, level, language })
    });
    return res.json();
  }
}

export const ai = new AIClient();
