// service.js — aggregated stats for the admin dashboard
const Order = require('../../models/Order');
const Review = require('../../models/Review');
const CateringRequest = require('../../models/CateringRequest');

async function getDashboardStats() {
  const orders = await Order.find();
  const onlineOrderTotal = orders.reduce((sum, o) => sum + o.total, 0);

  const paymentBreakdown = {};
  for (const order of orders) {
    paymentBreakdown[order.paymentMethod] = (paymentBreakdown[order.paymentMethod] || 0) + order.total;
  }

  const totalReviews = await Review.countDocuments();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newReviews = await Review.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

  const totalCateringRequests = await CateringRequest.countDocuments();
  const confirmedCateringRequests = await CateringRequest.countDocuments({ status: 'confirmed' });
  const cateringConversionRate = totalCateringRequests
    ? (confirmedCateringRequests / totalCateringRequests) * 100
    : 0;

  const itemTotals = new Map();
  for (const order of orders) {
    for (const item of order.items) {
      itemTotals.set(item.name, (itemTotals.get(item.name) || 0) + item.quantity);
    }
  }
  let highestItem = null;
  let lowestItem = null;
  for (const [name, quantity] of itemTotals.entries()) {
    if (!highestItem || quantity > highestItem.quantity) highestItem = { name, quantity };
    if (!lowestItem || quantity < lowestItem.quantity) lowestItem = { name, quantity };
  }

  return {
    onlineOrderTotal,
    paymentBreakdown,
    totalReviews,
    newReviews,
    totalCateringRequests,
    confirmedCateringRequests,
    cateringConversionRate,
    highestItem,
    lowestItem,
  };
}

module.exports = { getDashboardStats };
