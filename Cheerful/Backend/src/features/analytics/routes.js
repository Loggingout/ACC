// routes.js — admin dashboard analytics
const { Router } = require('express');
const controller = require('./controller');
const { requireAuth, requireAdmin } = require('../../middleware/auth');

const router = Router();

router.get('/dashboard', requireAuth, requireAdmin, controller.getDashboardStats);

module.exports = router;
