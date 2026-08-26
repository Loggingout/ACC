// Order.js — a guest or signed-in customer's placed order (pay-in-store for now)
const mongoose = require('mongoose');
const { ORDER_STATUS } = require('../constants/orderStatus');
const orderItemSchema = require('./OrderItem');

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    customerEmail: { type: String, trim: true, lowercase: true },
    items: { type: [orderItemSchema], required: true },
    status: { type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.PENDING },
    paymentMethod: { type: String, enum: ['pay_in_store'], default: 'pay_in_store' },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
