// Inventory.js — placeholder schema, not yet wired to any feature logic
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantityOnHand: { type: Number, default: 0 },
    reorderThreshold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);
