// service.js — guest order placement (pay-in-store) + admin management
const Order = require('../../models/Order');
const { AppError } = require('../../utils/errors');

async function createOrder(data) {
  const total = data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return Order.create({ ...data, total });
}

async function listOrders() {
  return Order.find().sort({ createdAt: -1 });
}

async function updateStatus(id, status) {
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) throw AppError.notFound('Order not found');
  return order;
}

module.exports = { createOrder, listOrders, updateStatus };
