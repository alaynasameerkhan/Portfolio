/* =============================================
   ALAYNA SAMEER KHAN — Portfolio Backend
   Server Entry Point (server.js)
   ============================================= */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const skillRoutes  = require('./routes/skills');
const certRoutes   = require('./routes/certifications');
const projectRoutes = require('./routes/projects');

const app = express();

// --- Middleware ---
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// --- Routes ---
app.use('/api/skills',         skillRoutes);
app.use('/api/certifications', certRoutes);
app.use('/api/projects',       projectRoutes);

// --- Health Check ---
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Alayna Portfolio API is running',
    endpoints: {
      skills:         'GET  /api/skills',
      certifications: 'GET  /api/certifications',
      projects:       'GET  /api/projects',
      addProject:     'POST /api/projects',
      addSkill:       'POST /api/skills',
      addCert:        'POST /api/certifications'
    }
  });
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// --- Connect to MongoDB & Start Server ---
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
