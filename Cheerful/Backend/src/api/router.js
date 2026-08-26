// router.js — mounts every feature's routes under /api
const { Router } = require('express');
const health = require('./health');
const authRoutes = require('../features/auth/routes');
const customerRoutes = require('../features/customers/routes');
const menuRoutes = require('../features/menu/routes');
const reviewRoutes = require('../features/reviews/routes');
const cateringRoutes = require('../features/catering/routes');
const bannerRoutes = require('../features/banners/routes');
const orderingRoutes = require('../features/ordering/routes');
const checkoutRoutes = require('../features/checkout/routes');
const inventoryRoutes = require('../features/inventory/routes');
const analyticsRoutes = require('../features/analytics/routes');
const productRoutes = require('../features/products/routes');

const router = Router();

router.use('/health', health);
router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/menu', menuRoutes);
router.use('/reviews', reviewRoutes);
router.use('/catering', cateringRoutes);
router.use('/banners', bannerRoutes);
router.use('/orders', orderingRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/products', productRoutes);

module.exports = router;
