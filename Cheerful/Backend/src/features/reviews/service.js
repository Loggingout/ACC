// service.js — customer reviews/testimonials
const Review = require('../../models/Review');
const { AppError } = require('../../utils/errors');

async function listReviews() {
  return Review.find({ approved: true }).sort({ createdAt: -1 });
}

async function createReview(data) {
  return Review.create({ ...data, source: 'Website' });
}

async function deleteReview(id) {
  const review = await Review.findByIdAndDelete(id);
  if (!review) throw AppError.notFound('Review not found');
}

module.exports = { listReviews, createReview, deleteReview };
