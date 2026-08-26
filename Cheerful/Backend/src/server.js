// server.js — connects to MongoDB, then starts the HTTP server
const app = require('./app');
const env = require('./config/env');
const connectDatabase = require('./config/database');
const logger = require('./utils/logger');

async function start() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      logger.info(`API listening on http://localhost:${env.port}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
