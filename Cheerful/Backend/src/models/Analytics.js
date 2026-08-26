// Analytics.js — placeholder schema, not yet wired to any feature logic
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    metric: { type: String, required: true, trim: true },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
