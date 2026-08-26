// service.js — customer profile management
const bcrypt = require('bcryptjs');
const Customer = require('../../models/Customer');
const { AppError } = require('../../utils/errors');
const { USER_ROLES } = require('../../constants/userRoles');

async function getProfile(id) {
  const user = await Customer.findById(id);
  if (!user) throw AppError.notFound('User not found');
  return user;
}

async function updateProfile(id, { name, email, phone, password, avatar }) {
  const update = {};
  if (name) update.name = name;
  if (phone) update.phone = phone;
  if (avatar) update.avatar = avatar;
  if (password) update.passwordHash = await bcrypt.hash(password, 12);

  if (email) {
    const existing = await Customer.findOne({ email: email.toLowerCase(), _id: { $ne: id } });
    if (existing) throw AppError.conflict('That email is already in use.');
    update.email = email.toLowerCase();
  }

  const user = await Customer.findByIdAndUpdate(id, update, { new: true });
  if (!user) throw AppError.notFound('User not found');
  return user;
}

async function createAdmin({ name, email, password }) {
  const existing = await Customer.findOne({ email: email.toLowerCase() });
  if (existing) throw AppError.conflict('That email is already in use.');

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await Customer.create({ name, email: email.toLowerCase(), passwordHash, role: USER_ROLES.ADMIN });
  const safeUser = user.toObject();
  delete safeUser.passwordHash;
  return safeUser;
}

module.exports = { getProfile, updateProfile, createAdmin };
