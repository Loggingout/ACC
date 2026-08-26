// errorHandler.js — centralized error handler, keeps stack traces out of responses
const env = require('../config/env');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err instanceof AppError ? err.statusCode : err.statusCode || 500;
  const message = statusCode >= 500 ? 'Internal server error' : err.message;

  if (statusCode >= 500) {
    logger.error(err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(err.details ? { details: err.details } : {}),
    ...(env.nodeEnv === 'development' && statusCode >= 500 ? { stack: err.stack } : {}),
  });
}

module.exports = errorHandler;
