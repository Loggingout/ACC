// CateringRequest.js — a submission from the "Request for Us to Cater" form
const mongoose = require('mongoose');

const cateringRequestSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true },
    businessEmail: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'declined'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CateringRequest', cateringRequestSchema);
