require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { seedDatabase } = require('./db/seedData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure upload temp directory exists
const uploadDir = path.join(__dirname, '../data/uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Auto-seed starter data on start
seedDatabase();

// Route handlers
app.use('/api', require('./routes/lessons'));
app.use('/api/dictionary', require('./routes/dictionary'));
app.use('/api/srs', require('./routes/srs'));
app.use('/api/user', require('./routes/user'));
app.use('/api/dialogues', require('./routes/dialogues'));
app.use('/api/importer', require('./routes/importer'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    name: 'Lingo555 Multilingual Gamified Learning Engine',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Lingo555 Server running on http://localhost:${PORT}`);
});
