// controller.js — analytics HTTP handlers
const service = require('./service');
const { ok } = require('../../utils/response');

async function recordPageVisit(req, res, next) {
  try {
    await service.recordPageVisit(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function getTrafficStats(req, res, next) {
  try {
    ok(res, await service.getTrafficStats());
  } catch (err) {
    next(err);
  }
}

async function getDashboardStats(req, res, next) {
  try {
    ok(res, await service.getDashboardStats());
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboardStats, recordPageVisit, getTrafficStats };
