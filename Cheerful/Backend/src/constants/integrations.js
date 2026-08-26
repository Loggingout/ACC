// integrations.js — provider identifiers for payment/ordering integrations.
// None are wired up yet — a provider hasn't been chosen (see src/config/square.js, src/config/stripe.js).
const INTEGRATIONS = Object.freeze({
  SQUARE: 'square',
  STRIPE: 'stripe',
  DOORDASH: 'doordash',
  UBEREATS: 'ubereats',
  GRUBHUB: 'grubhub',
});

module.exports = { INTEGRATIONS };
