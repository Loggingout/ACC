// routes.js — product CRUD lives in src/features/menu (Product model is shared).
// This module is reserved for admin-specific product tooling (e.g. bulk import/export)
// if that need arises; nothing to expose yet.
const { Router } = require('express');

const router = Router();

router.all('*', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Use /api/menu for product management. This endpoint is reserved for future tooling.',
  });
});

module.exports = router;
