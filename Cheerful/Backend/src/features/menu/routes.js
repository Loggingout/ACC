// routes.js — public menu browsing + admin-only product/category management
const { Router } = require('express');
const { z } = require('zod');
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { requireAuth, requireAdmin } = require('../../middleware/auth');
const { upload } = require('../../middleware/upload');

const categorySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  sortOrder: z.number().optional(),
});

// Multipart form uploads send every field as a string, so numbers/booleans/JSON
// fields are coerced/parsed here to support both JSON and multipart requests.
const parseIfString = (val) => {
  if (typeof val !== 'string') return val;
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
};

// z.coerce.boolean() treats any non-empty string (including "false") as true,
// so multipart form booleans need to be parsed explicitly instead.
const parseBoolIfString = (val) => {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return val;
};

const productSchema = z.object({
  name: z.string().min(1),
  categorySlug: z.string().min(1),
  subCategory: z.string().optional(),
  description: z.string().optional(),
  prices: z.preprocess(parseIfString, z.record(z.string(), z.number()).optional()),
  price: z.coerce.number().optional(),
  milkOptions: z.preprocess(parseIfString, z.array(z.string()).optional()),
  sugarOptions: z.preprocess(parseIfString, z.array(z.string()).optional()),
  flavorOptions: z.preprocess(parseIfString, z.array(z.string()).optional()),
  temperatureOptions: z.preprocess(parseIfString, z.array(z.string()).optional()),
  condiments: z.preprocess(parseIfString, z.array(z.string()).optional()),
  type: z.string().optional(),
  seasonal: z.preprocess(parseBoolIfString, z.boolean().optional()),
  limitedTime: z.preprocess(parseBoolIfString, z.boolean().optional()),
  availability: z.string().optional(),
  sortOrder: z.coerce.number().optional(),
  active: z.preprocess(parseBoolIfString, z.boolean().optional()),
});

// fields that make sense to apply in bulk across every product in a category at once
const bulkUpdateSchema = z.object({
  milkOptions: z.array(z.string()).optional(),
  sugarOptions: z.array(z.string()).optional(),
  flavorOptions: z.array(z.string()).optional(),
  temperatureOptions: z.array(z.string()).optional(),
  condiments: z.array(z.string()).optional(),
  seasonal: z.boolean().optional(),
  limitedTime: z.boolean().optional(),
  active: z.boolean().optional(),
});

const router = Router();

// Public
router.get('/categories', controller.getCategories);
router.get('/categories/:slug/products', controller.getProductsByCategory);
router.get('/products/:id', controller.getProduct);

// Admin
router.get('/admin/products', requireAuth, requireAdmin, controller.getAllProductsForAdmin);
router.post('/categories', requireAuth, requireAdmin, validate(categorySchema), controller.createCategory);
router.patch('/categories/:slug', requireAuth, requireAdmin, validate(categorySchema.partial()), controller.updateCategory);
router.delete('/categories/:slug', requireAuth, requireAdmin, controller.deleteCategory);
router.post(
  '/products',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  validate(productSchema),
  controller.createProduct
);
router.patch(
  '/products/:id',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  validate(productSchema.partial()),
  controller.updateProduct
);
router.delete('/products/:id', requireAuth, requireAdmin, controller.deleteProduct);
router.patch(
  '/categories/:slug/products/bulk',
  requireAuth,
  requireAdmin,
  validate(bulkUpdateSchema),
  controller.bulkUpdateCategoryProducts
);

module.exports = router;
