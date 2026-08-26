// logger.js — morgan HTTP request logging, format depends on environment
const morgan = require('morgan');
const env = require('../config/env');

module.exports = morgan(env.nodeEnv === 'production' ? 'combined' : 'dev');
