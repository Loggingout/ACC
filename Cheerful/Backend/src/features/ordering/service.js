// service.js — guest order placement (pay-in-store) + admin management
const Order = require('../../models/Order');
const { AppError } = require('../../utils/errors');
const mailService = require('../../mail/mail.service');
const {
  ONLINE_ORDER_FEE_CENTS,
  taxInclusiveUnitPriceCents,
} = require('../../constants/orderPricing');

async function createOrder(data) {
  const itemSubtotalCents = data.items.reduce(
    (sum, item) => sum + Math.round(item.unitPrice * 100) * item.quantity,
    0
  );
  const onlineOrderFeeCents = data.items.length ? ONLINE_ORDER_FEE_CENTS : 0;
  const taxInclusiveItemsCents = data.items.reduce(
    (sum, item) => sum + taxInclusiveUnitPriceCents(item.unitPrice) * item.quantity,
    0
  );
  const salesTaxCents = taxInclusiveItemsCents - itemSubtotalCents;
  const totalCents = taxInclusiveItemsCents + onlineOrderFeeCents;
  const order = await Order.create({
    ...data,
    itemSubtotal: itemSubtotalCents / 100,
    onlineOrderFee: onlineOrderFeeCents / 100,
    salesTax: salesTaxCents / 100,
    total: totalCents / 100,
  });
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
