const mongoose = require('mongoose');

const pageVisitSchema = new mongoose.Schema({
  visitId: { type: String, required: true, unique: true },
  sessionId: { type: String, required: true },
  visitorId: { type: String, required: true },
  path: { type: String, required: true },
  durationMs: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now, expires: '365d' },
});

module.exports = mongoose.model('PageVisit', pageVisitSchema);