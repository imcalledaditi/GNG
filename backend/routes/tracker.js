const express = require('express');
const router = express.Router();
const WaterTracker = require('../models/WaterTracker');
const HealthMetrics = require('../models/HealthMetrics');

// Water
router.post('/water', async (req, res) => {
  const { userId, amount } = req.body;
  const entry = new WaterTracker({ userId, amount });
  await entry.save();
  res.json(entry);
});

// Health
router.post('/health', async (req, res) => {
  const { userId, height, weight } = req.body;
  const entry = new HealthMetrics({ userId, height, weight });
  await entry.save();
  res.json(entry);
});

module.exports = router;
