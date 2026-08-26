// currency.js — formats a plain number as a USD price string (e.g. 5 -> "$5.00")
export function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}
