// orderStatus.js — reserved for the ordering feature (see src/features/ordering)
const ORDER_STATUS = Object.freeze({
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
});

module.exports = { ORDER_STATUS };
