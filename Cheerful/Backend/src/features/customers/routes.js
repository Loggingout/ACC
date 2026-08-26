// routes.js — authenticated profile endpoints
const { Router } = require('express');
const { z } = require('zod');
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { requireAuth, requireAdmin } = require('../../middleware/auth');
const { upload } = require('../../middleware/upload');

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  password: z.string().min(8).optional(),
});

const createAdminSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const router = Router();

router.get('/me', requireAuth, controller.getMe);
router.patch('/me', requireAuth, upload.single('avatar'), validate(updateSchema), controller.updateMe);
router.post('/admins', requireAuth, requireAdmin, validate(createAdminSchema), controller.createAdmin);

module.exports = router;
