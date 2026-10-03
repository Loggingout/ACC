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

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [reviewsByRating, newReviews] = await Promise.all([
    Review.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
    ]),
    Review.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
  ]);

  const reviewRatingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const group of reviewsByRating) {
    reviewRatingBreakdown[group._id] = group.count;
  }
  const totalReviews = Object.values(reviewRatingBreakdown).reduce((sum, count) => sum + count, 0);
  const averageReviewRating = totalReviews
    ? Object.entries(reviewRatingBreakdown).reduce(
      (sum, [rating, count]) => sum + Number(rating) * count,
      0
    ) / totalReviews
    : 0;

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
    averageReviewRating,
    reviewRatingBreakdown,
    totalCateringRequests,
    confirmedCateringRequests,
    cateringConversionRate,
    highestItem,
    lowestItem,
  };
}

module.exports = { getDashboardStats };
