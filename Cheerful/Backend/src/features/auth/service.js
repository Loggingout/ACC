// service.js — auth business logic: login + token issuance
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../../config/env');
const Customer = require('../../models/Customer');
const { AppError } = require('../../utils/errors');

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

async function login({ email, password }) {
  const user = await Customer.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  if (!user) {
    throw AppError.unauthorized('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw AppError.unauthorized('Invalid email or password');
  }

  const token = signToken(user);
  const safeUser = user.toObject();
  delete safeUser.passwordHash;

  return { user: safeUser, token };
}

module.exports = { login, signToken };
