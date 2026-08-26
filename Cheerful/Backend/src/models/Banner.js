// Banner.js — site-wide announcement/maintenance/service-status banners
const mongoose = require('mongoose');
const { BANNER_TYPES } = require('../constants/bannerTypes');

const bannerSchema = new mongoose.Schema(
  {
    type: { type: String, enum: Object.values(BANNER_TYPES), required: true },
    message: { type: String, required: true, trim: true },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
