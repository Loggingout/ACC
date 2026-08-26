// routes.js — public active-banner lookup + admin banner management
const { Router } = require('express');
const { z } = require('zod');
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { requireAuth, requireAdmin } = require('../../middleware/auth');
const { BANNER_TYPES } = require('../../constants/bannerTypes');

const bannerSchema = z.object({
  type: z.enum(Object.values(BANNER_TYPES)),
  message: z.string().min(1),
  active: z.coerce.boolean().optional(),
});

const router = Router();

// Public
router.get('/active', controller.getActiveBanners);

// Admin
router.get('/', requireAuth, requireAdmin, controller.getBanners);
router.post('/', requireAuth, requireAdmin, validate(bannerSchema), controller.createBanner);
router.patch('/:id', requireAuth, requireAdmin, validate(bannerSchema.partial()), controller.updateBanner);
router.delete('/:id', requireAuth, requireAdmin, controller.deleteBanner);

module.exports = router;
