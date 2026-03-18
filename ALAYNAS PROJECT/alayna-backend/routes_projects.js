/* =============================================
   ROUTES: Projects
   File: routes/projects.js
   ============================================= */

const express = require('express');
const router  = express.Router();
const Project = require('../models/Project');

// GET all projects (featured first, then by order)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new project
router.post('/', async (req, res) => {
  try {
    const { title, description, tags, githubUrl, liveUrl, featured, order } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'title and description are required' });
    }
    const project = await Project.create({ title, description, tags, githubUrl, liveUrl, featured, order });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
