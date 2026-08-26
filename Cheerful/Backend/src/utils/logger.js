// logger.js — minimal leveled console logger with timestamps
function log(level, ...args) {
  const timestamp = new Date().toISOString();
  console[level === 'error' ? 'error' : 'log'](`[${timestamp}] [${level.toUpperCase()}]`, ...args);
}

module.exports = {
  info: (...args) => log('info', ...args),
  warn: (...args) => log('warn', ...args),
  error: (...args) => log('error', ...args),
};
