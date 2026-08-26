// createAdmin.js — one-off CLI script to create the first admin account.
// Usage: npm run seed:admin  (reads ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from .env)
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env = require('../src/config/env');
const Customer = require('../src/models/Customer');
const { USER_ROLES } = require('../src/constants/userRoles');

async function run() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before running this script.');
    process.exit(1);
  }

  await mongoose.connect(env.mongoUri);

  const existing = await Customer.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`An account with ${email} already exists (role: ${existing.role}).`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await Customer.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: USER_ROLES.ADMIN,
  });

  console.log(`Admin account created for ${email}.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
