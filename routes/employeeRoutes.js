const express = require('express');
const router = express.Router();
const employeeOnly = require('../middleware/employeeOnly');
const Payment = require('../models/Payment');

// 🔐 Get all unverified payments (employee-only)
router.get('/unverified', employeeOnly, async (req, res) => {
  try {
    const payments = await Payment.find({ verified: false });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments', error: err.message });
  }
});

module.exports = router;
