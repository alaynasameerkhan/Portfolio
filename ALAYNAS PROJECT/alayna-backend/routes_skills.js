/* =============================================
   ROUTES: Skills
   File: routes/skills.js
   ============================================= */

const express = require('express');
const router  = express.Router();
const Skill   = require('../models/Skill');

// GET all skills (sorted by order)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new skill
router.post('/', async (req, res) => {
  try {
    const { icon, name, description, order } = req.body;
    if (!icon || !name || !description) {
      return res.status(400).json({ success: false, error: 'icon, name, and description are required' });
    }
    const skill = await Skill.create({ icon, name, description, order });
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
