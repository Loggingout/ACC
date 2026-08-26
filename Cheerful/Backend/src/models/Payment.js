// Payment.js — placeholder schema, not yet wired to any feature logic (see src/features/checkout)
const mongoose = require('mongoose');
const { PAYMENT_STATUS } = require('../constants/paymentStatus');

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    provider: { type: String, trim: true },
    providerReference: { type: String, trim: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.PENDING },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
