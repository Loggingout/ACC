// routes.js — public list/submit, admin-only delete
const { Router } = require('express');
const { z } = require('zod');
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { requireAuth, requireAdmin } = require('../../middleware/auth');

const reviewSchema = z.object({
  author: z.string().min(1).max(100),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(1).max(1000),
});

const router = Router();

router.get('/', controller.getReviews);
router.post('/', validate(reviewSchema), controller.createReview);
router.delete('/:id', requireAuth, requireAdmin, controller.deleteReview);

module.exports = router;
