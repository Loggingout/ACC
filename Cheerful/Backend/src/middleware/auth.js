// auth.js — JWT verification + role gate for admin-only routes
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { AppError } = require('../utils/errors');
const Customer = require('../models/Customer');

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      throw AppError.unauthorized('Missing authentication token');
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const user = await Customer.findById(payload.sub).select('-passwordHash');

    if (!user) {
      throw AppError.unauthorized('User no longer exists');
    }

    req.user = user;
    next();
  } catch {
    next(AppError.unauthorized('Invalid or expired token'));
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return next(AppError.forbidden('Admin access required'));
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
