// controller.js — reviews HTTP handlers
const service = require('./service');
const { ok, created, noContent } = require('../../utils/response');

async function getReviews(req, res, next) {
  try {
    ok(res, await service.listReviews());
  } catch (err) {
    next(err);
  }
}

async function createReview(req, res, next) {
  try {
    created(res, await service.createReview(req.body));
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req, res, next) {
  try {
    await service.deleteReview(req.params.id);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

module.exports = { getReviews, createReview, deleteReview };
