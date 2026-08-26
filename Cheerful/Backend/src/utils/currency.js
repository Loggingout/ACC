// currency.js — helpers for formatting/parsing money values stored as numbers
function formatUSD(amount) {
  if (amount == null) return null;
  return `$${Number(amount).toFixed(2)}`;
}

module.exports = { formatUSD };
