/* =============================================
   MODEL: Certification
   File: models/Certification.js
   ============================================= */

const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    issuer: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    badge: {
      type: String,
      default: 'CERT'
    },
    year: {
      type: Number
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);
