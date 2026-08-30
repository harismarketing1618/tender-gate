import express from 'express';
import { db } from '../data/store.js';

const router = express.Router();

// GET /api/analytics - Summary metrics for pipeline, agencies, and provinces
router.get('/', (req, res) => {
  try {
    const analytics = db.getAnalytics();
    res.json({
      success: true,
      data: analytics
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
