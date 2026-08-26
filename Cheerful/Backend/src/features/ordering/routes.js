// routes.js — guest order placement (public) + admin order management
const { Router } = require('express');
const { z } = require('zod');
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { requireAuth, requireAdmin } = require('../../middleware/auth');
const { ORDER_STATUS } = require('../../constants/orderStatus');

const orderItemSchema = z.object({
  productId: z.string().nullish(),
  name: z.string().min(1),
  image: z.string().nullish(),
  subCategory: z.string().nullish(),
  size: z.string().nullish(),
  milk: z.string().nullish(),
  sugar: z.string().nullish(),
  flavor: z.string().nullish(),
  temperature: z.string().nullish(),
  quantity: z.coerce.number().int().min(1),
  unitPrice: z.coerce.number().min(0),
});

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  customerEmail: z.string().email().nullish().or(z.literal('')),
  paymentMethod: z.enum(['pay_in_store', 'square_link']).optional(),
  items: z.array(orderItemSchema).min(1),
});

const statusSchema = z.object({
  status: z.enum(Object.values(ORDER_STATUS)),
});

const router = Router();

router.post('/', validate(createOrderSchema), controller.createOrder);
router.get('/', requireAuth, requireAdmin, controller.listOrders);
router.patch('/:id/status', requireAuth, requireAdmin, validate(statusSchema), controller.updateStatus);

module.exports = router;
