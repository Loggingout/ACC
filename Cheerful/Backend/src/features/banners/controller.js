// controller.js — banner HTTP handlers
const service = require('./service');
const { ok, created, noContent } = require('../../utils/response');

async function getBanners(req, res, next) {
  try {
    ok(res, await service.listBanners());
  } catch (err) {
    next(err);
  }
}

async function getActiveBanners(req, res, next) {
  try {
    ok(res, await service.listActiveBanners());
  } catch (err) {
    next(err);
  }
}

async function createBanner(req, res, next) {
  try {
    created(res, await service.createBanner(req.body));
  } catch (err) {
    next(err);
  }
}

async function updateBanner(req, res, next) {
  try {
    ok(res, await service.updateBanner(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}

async function deleteBanner(req, res, next) {
  try {
    await service.deleteBanner(req.params.id);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

module.exports = { getBanners, getActiveBanners, createBanner, updateBanner, deleteBanner };
