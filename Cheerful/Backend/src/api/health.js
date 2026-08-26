// health.js — simple liveness check
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: { status: 'ok', uptime: process.uptime() } });
});

module.exports = router;
