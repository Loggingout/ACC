// routes.js — TODO: build out when inventory tracking is prioritized.
// Returns 501 so the frontend can detect "not implemented yet" cleanly.
const { Router } = require('express');

const router = Router();

router.all('*', (req, res) => {
  res.status(501).json({ success: false, error: 'Inventory management is not implemented yet.' });
});

module.exports = router;
