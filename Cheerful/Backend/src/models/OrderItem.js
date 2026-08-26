// OrderItem.js — embedded line-item sub-schema used within Order.items
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    subCategory: { type: String, trim: true },
    size: { type: String, trim: true },
    milk: { type: String, trim: true },
    sugar: { type: String, trim: true },
    flavor: { type: String, trim: true },
    temperature: { type: String, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

module.exports = orderItemSchema;
