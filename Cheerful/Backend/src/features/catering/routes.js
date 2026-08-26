// routes.js — public submission, admin-only list/status updates
const { Router } = require('express');
const { z } = require('zod');
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { requireAuth, requireAdmin } = require('../../middleware/auth');

const requestSchema = z.object({
  businessName: z.string().min(1).max(200),
  businessEmail: z.string().email(),
  name: z.string().min(1).max(200),
  phoneNumber: z.string().min(1).max(30),
  location: z.string().min(1).max(300),
  description: z.string().min(1).max(2000),
});

const statusSchema = z.object({
  status: z.enum(['new', 'contacted', 'confirmed', 'declined']),
});

const router = Router();

router.post('/', validate(requestSchema), controller.createRequest);
router.get('/', requireAuth, requireAdmin, controller.getRequests);
router.patch('/:id/status', requireAuth, requireAdmin, validate(statusSchema), controller.updateStatus);

module.exports = router;
