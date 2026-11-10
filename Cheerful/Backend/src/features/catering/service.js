// service.js — catering request submissions
const CateringRequest = require('../../models/CateringRequest');
const { AppError } = require('../../utils/errors');
const mailService = require('../../mail/mail.service');

async function createRequest(data) {
  const request = await CateringRequest.create(data);
  try {
    await mailService.sendCateringNotifications(request);
  } catch (error) {
    console.error('Failed to send catering notifications:', error.message);
  }
  return request;
}

async function listRequests() {
  return CateringRequest.find().sort({ createdAt: -1 });
}

async function updateStatus(id, status) {
  const request = await CateringRequest.findOneAndUpdate(
    { _id: id, status: { $nin: ['confirmed', 'declined'] } },
    { status },
    { new: true }
  );
  if (!request) {
    const existing = await CateringRequest.findById(id);
    if (!existing) throw AppError.notFound('Catering request not found');
    throw AppError.conflict('Confirmed or declined catering requests cannot be changed');
  }
  return request;
}

async function deleteRequest(id) {
  const request = await CateringRequest.findByIdAndDelete(id);
  if (!request) throw AppError.notFound('Catering request not found');
  return request;
}

module.exports = { createRequest, listRequests, updateStatus, deleteRequest };
