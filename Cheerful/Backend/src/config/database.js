// database.js — MongoDB connection via Mongoose
const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

async function connectDatabase() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
  logger.info(`MongoDB connected: ${mongoose.connection.host}`);
  return mongoose.connection;
}

module.exports = connectDatabase;
