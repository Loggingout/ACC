// controller.js — analytics HTTP handlers
const service = require('./service');
const { ok } = require('../../utils/response');

async function getDashboardStats(req, res, next) {
  try {
    ok(res, await service.getDashboardStats());
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboardStats };
