// routes.js — admin dashboard analytics
const { Router } = require('express');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');
const controller = require('./controller');
const { requireAuth, requireAdmin } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { AppError } = require('../../utils/errors');

const allowedOrigins = (process.env.ANALYTICS_ALLOWED_ORIGINS || 'https://www.acheerfulcup.com,https://acheerfulcup.com')
	.split(',').map((origin) => origin.trim()).filter(Boolean);
const visitSchema = z.object({
	visitId: z.string().uuid(),
	sessionId: z.string().uuid(),
	visitorId: z.string().uuid(),
	path: z.enum(['/', '/menu', '/menu/:slug', '/catering-page', '/catering-request', '/review-page', '/cart', '/checkout']),
	durationMs: z.number().int().min(0).max(1800000),
});
const visitLimiter = rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false });

function requireProductionOrigin(req, res, next) {
	let origin = req.get('origin');
	if (!origin && req.get('referer')) {
		try { origin = new URL(req.get('referer')).origin; } catch { origin = ''; }
	}
	try {
		const url = new URL(origin);
		if (url.protocol !== 'https:' || url.hostname === 'localhost' || url.hostname.endsWith('.github.dev') || url.hostname.endsWith('.githubpreview.dev') || !allowedOrigins.includes(url.origin)) {
			return next(AppError.forbidden('Analytics origin not allowed'));
		}
	} catch {
		return next(AppError.forbidden('Analytics origin not allowed'));
	}
	next();
}

const router = Router();

router.get('/dashboard', requireAuth, requireAdmin, controller.getDashboardStats);
router.get('/traffic', requireAuth, requireAdmin, controller.getTrafficStats);
router.post('/visits', visitLimiter, requireProductionOrigin, validate(visitSchema), controller.recordPageVisit);

module.exports = router;
