const test = require('node:test');
const assert = require('node:assert/strict');

process.env.NODE_ENV = 'test';
process.env.ADMIN_EMAIL = 'owner@example.com';

const transporter = require('../src/mail/transporter');
const Customer = require('../src/models/Customer');
const CateringRequest = require('../src/models/CateringRequest');
const sent = [];

transporter.sendEmail = async (email) => {
  sent.push(email);
};
Customer.find = () => ({
  select: () => ({ lean: async () => [{ email: 'admin@example.com' }, { email: 'owner@example.com' }] }),
});

const mail = require('../src/mail/mail.service');
const service = require('../src/features/catering/service');

const request = {
  businessName: 'Acme <script>',
  businessEmail: 'client@example.com',
  name: 'Alex',
  phoneNumber: '5551234567',
  location: '123 Main St',
  description: 'Company event',
  eventDate: '2027-01-20',
  eventTime: '14:30',
  hoursNeeded: 2,
};

test('sends a receipt and deduplicated admin alerts with escaped details', async () => {
  await mail.sendCateringNotifications(request);
  assert.deepEqual(sent.map((email) => email.to), ['client@example.com', 'admin@example.com', 'owner@example.com']);
  assert.match(sent[0].text, /within 2-4 hours/);
  assert.match(sent[1].html, /Acme &lt;script&gt;/);
  assert.match(sent[1].text, /2027-01-20/);
});

test('returns the saved request even when notification delivery fails', async () => {
  CateringRequest.create = async () => request;
  mail.sendCateringNotifications = async () => { throw new Error('delivery failed'); };
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.equal(await service.createRequest(request), request);
  } finally {
    console.error = originalError;
  }
});

test('does not send notifications when saving fails', async () => {
  CateringRequest.create = async () => { throw new Error('save failed'); };
  let notified = false;
  mail.sendCateringNotifications = async () => { notified = true; };
  await assert.rejects(service.createRequest(request), /save failed/);
  assert.equal(notified, false);
});