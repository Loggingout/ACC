// controller.js — customer profile HTTP handlers
const service = require('./service');
const { ok, created } = require('../../utils/response');
const { uploadBufferToCloudinary } = require('../../middleware/upload');

async function getMe(req, res, next) {
  try {
    const user = await service.getProfile(req.user._id);
    ok(res, user);
  } catch (err) {
    next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    const avatar = req.file ? (await uploadBufferToCloudinary(req.file.buffer)).secure_url : undefined;
    const user = await service.updateProfile(req.user._id, { ...req.body, ...(avatar ? { avatar } : {}) });
    ok(res, user);
  } catch (err) {
    next(err);
  }
}

async function createAdmin(req, res, next) {
  try {
    created(res, await service.createAdmin(req.body));
  } catch (err) {
    next(err);
  }
}

module.exports = { getMe, updateMe, createAdmin };
