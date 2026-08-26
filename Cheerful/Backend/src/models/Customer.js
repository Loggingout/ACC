// Customer.js — unified account model for both customers and admin/staff logins
const mongoose = require('mongoose');
const { USER_ROLES } = require('../constants/userRoles');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    avatar: { type: String, trim: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
