// Review.js — a customer testimonial shown on the Reviews page
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    source: { type: String, default: 'Website', trim: true },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
