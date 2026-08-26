// routes.js — auth endpoints. No public registration route: admins are created via
// `npm run seed:admin` (scripts/createAdmin.js) to avoid an open admin sign-up endpoint.
const { Router } = require('express');
const { z } = require('zod');
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { requireAuth } = require('../../middleware/auth');
const { authLimiter } = require('../../middleware/rateLimiter');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), controller.login);
router.get('/me', requireAuth, controller.me);

module.exports = router;
