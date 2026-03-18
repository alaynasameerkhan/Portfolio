/* =============================================
   MODEL: Skill
   File: models/Skill.js
   ============================================= */

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
