const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { seedDatabase } = require('./db/seedData');
const { seedExpandedData } = require('./db/seedDataExpanded');
const enrichCurriculum = require('./db/enrichAllLessons');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (Nginx) so req.ip resolves to the real client IP
app.set('trust proxy', 1);

// Security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// Allowed Origins for CORS
const allowedOrigins = [
  'https://lingo.dangnam.online',
  'https://dangnam.online',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or allowed domain list
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow subdomains of dangnam.online
    if (origin.endsWith('.dangnam.online')) {
      return callback(null, true);
    }
    return callback(null, true); // Fallback safe
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiter for AI Endpoints: max 40 requests per minute per IP
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Bạn đang gửi quá nhiều yêu cầu AI trong thời gian ngắn. Vui lòng thử lại sau 1 phút.'
  }
});

// Ensure upload temp directory exists
const uploadDir = path.join(__dirname, '../data/uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Auto-seed starter, expanded curriculum, and enriched exercises on start
seedDatabase();
seedExpandedData();
enrichCurriculum();
try {
  const { seedFullCurriculum } = require('./db/seedFullCurriculum');
  seedFullCurriculum();
} catch (e) {
  console.warn('seedFullCurriculum skipped or failed:', e.message);
}
try {
  const { seedEspCurriculum } = require('./db/seedEspCurriculum');
  seedEspCurriculum();
} catch (e) {
  console.warn('seedEspCurriculum skipped or failed:', e.message);
}
try {
  const { seedPracticalTopics } = require('./db/seedPracticalTopics');
  seedPracticalTopics();
} catch (e) {
  console.warn('seedPracticalTopics skipped or failed:', e.message);
}

// Route handlers
app.use('/api', require('./routes/lessons'));
app.use('/api/dictionary', require('./routes/dictionary'));
app.use('/api/srs', require('./routes/srs'));
app.use('/api/user', require('./routes/user'));
app.use('/api/dialogues', require('./routes/dialogues'));
app.use('/api/importer', require('./routes/importer'));
app.use('/api/ai', aiRateLimiter, require('./routes/aiRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    name: 'Lingo555 Multilingual Gamified Learning Engine',
    timestamp: new Date().toISOString()
  });
});

const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => {
  console.log(`🚀 Lingo555 Server running on http://${HOST}:${PORT}`);
});
