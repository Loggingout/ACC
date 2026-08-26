// service.js — banner CRUD + public active-banner lookup
const Banner = require('../../models/Banner');
const { AppError } = require('../../utils/errors');

async function listBanners() {
  return Banner.find().sort({ createdAt: -1 });
}

async function listActiveBanners() {
  return Banner.find({ active: true }).sort({ createdAt: -1 });
}

async function createBanner(data) {
  return Banner.create(data);
}

async function updateBanner(id, data) {
  const banner = await Banner.findByIdAndUpdate(id, data, { new: true });
  if (!banner) throw AppError.notFound('Banner not found');
  return banner;
}

async function deleteBanner(id) {
  const banner = await Banner.findByIdAndDelete(id);
  if (!banner) throw AppError.notFound('Banner not found');
}

module.exports = { listBanners, listActiveBanners, createBanner, updateBanner, deleteBanner };
