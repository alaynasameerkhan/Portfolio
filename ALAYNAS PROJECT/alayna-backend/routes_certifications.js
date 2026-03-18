/* =============================================
   ROUTES: Certifications
   File: routes/certifications.js
   ============================================= */

const express       = require('express');
const router        = express.Router();
const Certification = require('../models/Certification');

// GET all certifications
router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single certification by ID
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ success: false, error: 'Certification not found' });
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new certification
router.post('/', async (req, res) => {
  try {
    const { issuer, name, badge, year, order } = req.body;
    if (!issuer || !name) {
      return res.status(400).json({ success: false, error: 'issuer and name are required' });
    }
    const cert = await Certification.create({ issuer, name, badge, year, order });
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update certification
router.put('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!cert) return res.status(404).json({ success: false, error: 'Certification not found' });
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE certification
router.delete('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, error: 'Certification not found' });
    res.json({ success: true, message: 'Certification deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
