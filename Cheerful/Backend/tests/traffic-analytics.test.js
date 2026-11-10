const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('node:crypto');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'traffic-test-secret';
process.env.ANALYTICS_ALLOWED_ORIGINS = 'https://www.acheerfulcup.com,https://preview.github.dev';

const PageVisit = require('../src/models/PageVisit');
const Customer = require('../src/models/Customer');
let lastWrite;
PageVisit.updateOne = async (...args) => { lastWrite = args; };
PageVisit.aggregate = async () => [{
  sessions: [{ count: 2 }],
  dailyVisitors: [{ _id: '2026-11-10', visitors: 1 }],
  pages: [{ _id: '/', visits: 2, averageDurationMs: 1550 }],
}];
Customer.findById = (id) => ({ select: async () => ({ role: id === 'admin' ? 'admin' : 'customer' }) });

const app = express();
app.use(express.json(), require('../src/features/analytics/routes'));
app.use((error, req, res, next) => res.status(error.statusCode || 500).json({ error: error.message }));
let server;
let base;

test.before(async () => {
  server = await new Promise((resolve) => {
    const listener = app.listen(0, () => resolve(listener));
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));

const visit = { visitId: randomUUID(), sessionId: randomUUID(), visitorId: randomUUID(), path: '/', durationMs: 5000 };
function sendVisit(origin, body = visit) {
  return fetch(`${base}/visits`, { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}
function auth(role) {
  return { Authorization: `Bearer ${jwt.sign({ sub: role }, process.env.JWT_SECRET)}` };
}

test('only approved production origins can send valid anonymous visits', async () => {
  assert.equal((await sendVisit('https://preview.github.dev')).status, 403);
  assert.equal((await sendVisit('http://localhost:5173')).status, 403);
  assert.equal((await sendVisit('https://www.acheerfulcup.com', { ...visit, path: '/?email=private' })).status, 400);
  assert.equal((await sendVisit('https://www.acheerfulcup.com', { ...visit, durationMs: 1800001 })).status, 400);
  assert.equal((await sendVisit('https://www.acheerfulcup.com')).status, 204);
  assert.deepEqual(lastWrite[0], { visitId: visit.visitId });
  assert.equal(lastWrite[1].$max.durationMs, 5000);
  assert.equal(lastWrite[2].upsert, true);
});

test('traffic aggregates are available only to admins', async () => {
  assert.equal((await fetch(`${base}/traffic`)).status, 401);
  assert.equal((await fetch(`${base}/traffic`, { headers: auth('customer') })).status, 403);
  const response = await fetch(`${base}/traffic`, { headers: auth('admin') });
  assert.equal(response.status, 200);
  const { data } = await response.json();
  assert.equal(data.sessions, 2);
  assert.deepEqual(data.dailyVisitors, [{ date: '2026-11-10', visitors: 1 }]);
  assert.deepEqual(data.pages, [{ path: '/', visits: 2, averageDurationMs: 1550 }]);
});