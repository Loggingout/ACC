// routes.js — TODO: build out once a payment/ordering provider is chosen.
// Returns 501 so the frontend can detect "not implemented yet" cleanly.
const { Router } = require('express');

const router = Router();

router.all('*', (req, res) => {
  res.status(501).json({ success: false, error: 'Checkout is not implemented yet.' });
});

module.exports = router;
