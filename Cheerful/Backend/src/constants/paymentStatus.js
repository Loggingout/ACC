// paymentStatus.js — reserved for the checkout feature (see src/features/checkout)
const PAYMENT_STATUS = Object.freeze({
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
});

module.exports = { PAYMENT_STATUS };
