// service.js — catering request submissions
const CateringRequest = require('../../models/CateringRequest');
const { AppError } = require('../../utils/errors');

async function createRequest(data) {
  return CateringRequest.create(data);
}

async function listRequests() {
  return CateringRequest.find().sort({ createdAt: -1 });
}

async function updateStatus(id, status) {
  const request = await CateringRequest.findByIdAndUpdate(id, { status }, { new: true });
  if (!request) throw AppError.notFound('Catering request not found');
  return request;
}

module.exports = { createRequest, listRequests, updateStatus };
