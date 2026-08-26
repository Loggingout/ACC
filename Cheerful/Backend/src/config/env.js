// env.js — loads and validates required environment variables
require('dotenv').config();

const required = ['MONGODB_URI', 'JWT_SECRET'];

function getEnv() {
  const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 4000,
    // comma-separated list of allowed frontend origins (dev + Vercel + custom domain)
    clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
  };

  if (env.nodeEnv !== 'test') {
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  return env;
}

module.exports = getEnv();
