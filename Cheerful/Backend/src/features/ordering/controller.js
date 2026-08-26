// controller.js — ordering HTTP handlers
const service = require('./service');
const { ok, created } = require('../../utils/response');

async function createOrder(req, res, next) {
  try {
    created(res, await service.createOrder(req.body));
  } catch (err) {
    next(err);
  }
}

async function listOrders(req, res, next) {
  try {
    ok(res, await service.listOrders());
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    ok(res, await service.updateStatus(req.params.id, req.body.status));
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, listOrders, updateStatus };
