import express from 'express';
import { db } from '../data/store.js';

const router = express.Router();

// POST /api/alerts/subscribe - Register user for tender alerts
router.post('/subscribe', (req, res) => {
  try {
    const { email, phone, category, pecCategory, province } = req.body;
    
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Either email or WhatsApp phone number is required.'
      });
    }

    const subscription = db.addAlertSubscription({
      email,
      phone,
      category: category || 'all',
      pecCategory: pecCategory || 'all',
      province: province || 'all'
    });

    res.status(201).json({
      success: true,
      message: 'Subscribed to Pakistan Tender Alerts successfully!',
      data: subscription
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
