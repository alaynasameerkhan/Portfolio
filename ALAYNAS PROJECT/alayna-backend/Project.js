/* =============================================
   MODEL: Project
   File: models/Project.js
   ============================================= */

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      trim: true,
      default: ''
    },
    liveUrl: {
      type: String,
      trim: true,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
