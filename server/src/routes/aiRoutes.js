const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Middleware to extract API key & model from headers or body
const extractAiParams = (req, res, next) => {
  req.apiKey = req.headers['x-gemini-api-key'] || (req.body && req.body.apiKey) || process.env.GEMINI_API_KEY;
  req.model = req.headers['x-gemini-model'] || (req.body && req.body.model) || process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  next();
};

router.use(extractAiParams);

// GET /api/ai/status - Returns configuration and model status
router.get('/status', (req, res) => {
  const hasServerKey = !!process.env.GEMINI_API_KEY;
  const currentModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  res.json({
    active: hasServerKey,
    hasServerKey,
    currentModel,
    defaultProvider: process.env.DEFAULT_AI_PROVIDER || 'auto',
    availableModels: [
      { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash Lite', desc: 'Siêu tốc, độ trễ thấp nhất (Khuyên Dùng)' },
      { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', desc: 'Chuyên sâu, năng lực sư phạm học thuật' }
    ]
  });
});

// 1. POST /api/ai/explain-mistake
router.post('/explain-mistake', async (req, res) => {
  try {
    const { question, userAnswer, correctAnswer, language, hint } = req.body;
    const result = await aiService.explainMistake({
      question,
      userAnswer,
      correctAnswer,
      language: language || 'zh',
      hint,
      apiKey: req.apiKey,
      model: req.model
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. POST /api/ai/ask-tutor
router.post('/ask-tutor', async (req, res) => {
  try {
    const { query, currentContext, language, history } = req.body;
    if (!query) return res.status(400).json({ error: 'Missing query' });

    const result = await aiService.askTutor({
      query,
      currentContext,
      language: language || 'zh',
      history: history || [],
      apiKey: req.apiKey,
      model: req.model
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2b. POST /api/ai/ask-tutor-stream (Server-Sent Events Real-Time Streaming)
router.post('/ask-tutor-stream', async (req, res) => {
  const { query, currentContext, language, history } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  // Setup SSE headers
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Disable Nginx response proxy buffering
  if (res.flushHeaders) res.flushHeaders();

  try {
    await aiService.streamTutorResponse({
      query,
      currentContext,
      language: language || 'zh',
      history: history || [],
      apiKey: req.apiKey,
      model: req.model,
      onChunk: (chunkText) => {
        res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
      }
    });
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error('SSE Stream Error:', err.message);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

// 3. POST /api/ai/chat-roleplay
router.post('/chat-roleplay', async (req, res) => {
  try {
    const { scenario, messages, userMessage, language } = req.body;
    if (!userMessage) return res.status(400).json({ error: 'Missing userMessage' });

    const result = await aiService.chatRoleplay({
      scenario: scenario || { title: 'Giao tiếp hàng ngày', description: 'Trò chuyện tự nhiên' },
      messages: messages || [],
      userMessage,
      language: language || 'zh',
      apiKey: req.apiKey,
      model: req.model
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. POST /api/ai/review-writing
router.post('/review-writing', async (req, res) => {
  try {
    const { prompt, level, language } = req.body;
    const text = req.body.text || req.body.essay || req.body.content;
    if (!text) return res.status(400).json({ error: 'Missing writing text' });

    const result = await aiService.reviewWriting({
      prompt: prompt || 'Bài viết tự do',
      text,
      level: level || 'HSK1',
      language: language || 'zh',
      apiKey: req.apiKey,
      model: req.model
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. POST /api/ai/generate-reading
router.post('/generate-reading', async (req, res) => {
  try {
    const { words, topic, level, language } = req.body;
    const result = await aiService.generateReading({
      words: words || [],
      topic: topic || 'Đời sống & Giao lưu văn hóa',
      level: level || 'HSK2',
      language: language || 'zh',
      apiKey: req.apiKey,
      model: req.model
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. POST /api/ai/verify-key
router.post('/verify-key', async (req, res) => {
  try {
    const key = req.apiKey;
    if (!key) {
      return res.json({ valid: false, message: 'Chưa cung cấp API Key' });
    }
    const client = aiService.getClient(key);
    const testModel = req.model || process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    const testRes = await client.models.generateContent({
      model: testModel,
      contents: 'Ping: Reply with "PONG"'
    });
    res.json({ valid: true, model: testModel, reply: testRes.text });
  } catch (err) {
    res.json({ valid: false, message: err.message });
  }
});

// 7. POST /api/ai/generate-lesson-variation
router.post('/generate-lesson-variation', async (req, res) => {
  try {
    const { words, level, language, currentExercises } = req.body;
    const result = await aiService.generateLessonVariation({
      words: words || [],
      level: level || 'HSK 1',
      language: language || 'zh',
      currentExercises: currentExercises || [],
      apiKey: req.apiKey,
      model: req.model
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
