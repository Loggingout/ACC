// dates.js — small date helpers shared across features
function isFutureDate(date) {
  return new Date(date).getTime() > Date.now();
}

module.exports = { isFutureDate };
