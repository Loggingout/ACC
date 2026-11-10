const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'catering-management-test';

const CateringRequest = require('../src/models/CateringRequest');
const Customer = require('../src/models/Customer');
let request;

CateringRequest.findOneAndUpdate = async (filter, update) => {
  if (!request || request._id !== filter._id || filter.status.$nin.includes(request.status)) return null;
  request.status = update.status;
  return { ...request };
};
CateringRequest.findById = async (id) => request && request._id === id ? request : null;
CateringRequest.findByIdAndDelete = async (id) => {
  if (!request || request._id !== id) return null;
  const deleted = request;
  request = null;
  return deleted;
};
Customer.findById = (id) => ({ select: async () => ({ role: id === 'admin' ? 'admin' : 'customer' }) });

const app = require('../src/app');
let server;
let url;

test.before(async () => {
  server = await new Promise((resolve) => {
    const listener = app.listen(0, () => resolve(listener));
  });
  url = `http://127.0.0.1:${server.address().port}/api/catering/request1`;
});

test.beforeEach(() => {
  request = { _id: 'request1', status: 'new' };
});

test.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));

function headers(role) {
  return {
    Authorization: `Bearer ${jwt.sign({ sub: role }, process.env.JWT_SECRET)}`,
    'Content-Type': 'application/json',
  };
}

function changeStatus(status) {
  return fetch(`${url}/status`, { method: 'PATCH', headers: headers('admin'), body: JSON.stringify({ status }) });
}

for (const status of ['confirmed', 'declined']) {
  test(`${status} requests cannot be changed`, async () => {
    assert.equal((await changeStatus(status)).status, 200);
    assert.equal((await changeStatus('new')).status, 409);
    assert.equal(request.status, status);
  });
}

test('only admins may delete requests', async () => {
  assert.equal((await fetch(url, { method: 'DELETE' })).status, 401);
  assert.equal((await fetch(url, { method: 'DELETE', headers: headers('customer') })).status, 403);
  assert.equal((await fetch(url, { method: 'DELETE', headers: headers('admin') })).status, 200);
  assert.equal((await fetch(url, { method: 'DELETE', headers: headers('admin') })).status, 404);
  assert.equal((await changeStatus('contacted')).status, 404);
});