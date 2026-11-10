const test = require('node:test');
const assert = require('node:assert/strict');

process.env.NODE_ENV = 'test';

const Order = require('../src/models/Order');
const mailService = require('../src/mail/mail.service');
Order.create = async (data) => data;
mailService.sendOrderNotifications = async () => {};

const { createOrder } = require('../src/features/ordering/service');
const items = [{ name: 'Coffee', unitPrice: 3.99, quantity: 2 }];

test('pay-in-store orders have no online fee and retain sales tax', async () => {
  const order = await createOrder({ items, paymentMethod: 'pay_in_store' });
  assert.equal(order.itemSubtotal, 7.98);
  assert.equal(order.salesTax, 0.68);
  assert.equal(order.onlineOrderFee, 0);
  assert.equal(order.total, 8.66);
});

test('Square orders include the online fee', async () => {
  const order = await createOrder({ items, paymentMethod: 'square_link' });
  assert.equal(order.salesTax, 0.68);
  assert.equal(order.onlineOrderFee, 1.65);
  assert.equal(order.total, 10.31);
});

test('orders without a payment method default to no online fee', async () => {
  const order = await createOrder({ items });
  assert.equal(order.onlineOrderFee, 0);
  assert.equal(order.total, 8.66);
});