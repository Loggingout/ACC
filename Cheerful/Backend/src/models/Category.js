// Category.js — a menu category (Coffee, Lunch, Fridge Items, ...)
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
