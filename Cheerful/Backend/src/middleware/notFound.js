// notFound.js — catch-all for unmatched API routes
const { AppError } = require('../utils/errors');

function notFound(req, res, next) {
  next(AppError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

module.exports = notFound;
