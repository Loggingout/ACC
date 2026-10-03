// service.js — guest order placement (pay-in-store) + admin management
const Order = require('../../models/Order');
const { AppError } = require('../../utils/errors');
const mailService = require('../../mail/mail.service');

async function createOrder(data) {
  const total = data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const order = await Order.create({ ...data, total });
  await mailService.sendOrderNotifications(order);
  return order;
}

async function listOrders() {
  return Order.find().sort({ createdAt: -1 });
}

async function updateStatus(id, status) {
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) throw AppError.notFound('Order not found');
  return order;
}

async function deleteOrder(id) {
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw AppError.notFound('Order not found');
}

module.exports = { createOrder, listOrders, updateStatus, deleteOrder };
