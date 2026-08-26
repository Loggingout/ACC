// controller.js — auth HTTP handlers
const authService = require('./service');
const { ok } = require('../../utils/response');

async function login(req, res, next) {
  try {
    const { user, token } = await authService.login(req.body);
    ok(res, { user, token });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  ok(res, { user: req.user });
}

module.exports = { login, me };
