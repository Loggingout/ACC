// controller.js — catering HTTP handlers
const service = require('./service');
const { ok, created } = require('../../utils/response');

async function createRequest(req, res, next) {
  try {
    created(res, await service.createRequest(req.body));
  } catch (err) {
    next(err);
  }
}

async function getRequests(req, res, next) {
  try {
    ok(res, await service.listRequests());
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

module.exports = { createRequest, getRequests, updateStatus };
