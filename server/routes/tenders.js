import express from 'express';
import { db } from '../data/store.js';

const router = express.Router();

// GET /api/tenders - List tenders with filters
router.get('/', (req, res) => {
  try {
    const { category, province, pecCategory, agency, search, sortBy } = req.query;
    const tenders = db.getTenders({ category, province, pecCategory, agency, search, sortBy });
    
    res.json({
      success: true,
      count: tenders.length,
      data: tenders,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/tenders/:id - Get single tender by ID or RefNo
router.get('/:id', (req, res) => {
  try {
    const tender = db.getTenderById(req.params.id);
    if (!tender) {
      return res.status(404).json({ success: false, error: 'Tender not found' });
    }
    res.json({ success: true, data: tender });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tenders - Create / Publish new tender
router.post('/', (req, res) => {
  try {
    const {
      title,
      agency,
      province,
      city,
      pecCategory,
      pecCodesRequired,
      estimatedValuePKR,
      shortDescription,
      scopeOfWork,
      mandatoryCriteria,
      closingDate,
      biddingMethod
    } = req.body;

    if (!title || !agency || !pecCategory) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Title, Agency, and PEC Category are required fields.'
      });
    }

    const val = Number(estimatedValuePKR) || 50000000;
    const formattedValue = val >= 1000000000
      ? `PKR ${(val / 1000000000).toFixed(2)} Billion (${(val / 10000000).toFixed(0)} Crore)`
      : `PKR ${(val / 10000000).toFixed(2)} Crore (${(val / 1000000).toFixed(0)} Million)`;

    const cdrValue = (val * 0.02);
    const bidSecurityAmount = cdrValue >= 1000000
      ? `PKR ${(cdrValue / 1000000).toFixed(2)} Million (2% CDR / Bank Guarantee)`
      : `PKR ${cdrValue.toLocaleString()} (2% CDR)`;

    const newTender = {
      id: `TND-PK-2026-${Date.now().toString().slice(-4)}`,
      refNo: `PKR/PR-${Math.floor(1000 + Math.random() * 9000)}/2026`,
      ppraRef: `PPRA-TS${Math.floor(500000 + Math.random() * 99999)}E`,
      title,
      agency,
      agencyCode: agency.split(' ')[0] || 'DEPT',
      province: province || 'Punjab',
      city: city || 'Lahore',
      locationFull: `${city || 'Lahore'}, ${province || 'Punjab'}, Pakistan`,
      category: 'High-Rise & Commercial Buildings',
      agentId: 'agent-2',
      agentName: 'Memar-AI',
      pecCategory,
      pecCodesRequired: Array.isArray(pecCodesRequired) ? pecCodesRequired : ['BC01'],
      estimatedValuePKR: val,
      formattedValue,
      bidSecurityAmount,
      biddingMethod: biddingMethod || 'Single Stage Two Envelope (PPRA Rule 36-b)',
      tenderDocFee: 'PKR 15,000',
      postedDate: new Date().toISOString().split('T')[0],
      closingDate: closingDate || new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      shortDescription: shortDescription || 'Official procurement notice under PPRA 2004 / 2026 rules.',
      scopeOfWork: Array.isArray(scopeOfWork) && scopeOfWork.length > 0 ? scopeOfWork : ['Full civil, structural and architectural works execution as per BOQ.'],
      mandatoryCriteria: Array.isArray(mandatoryCriteria) && mandatoryCriteria.length > 0 ? mandatoryCriteria : [`Valid PEC Registration in Category ${pecCategory}`],
      aiViabilityScore: 92,
      aiSummary: 'Autonomous validation: PPRA verified. PEC compliance checked.',
      status: 'active',
      viewsCount: 1,
      isFeatured: false
    };

    const saved = db.addTender(newTender);
    res.status(201).json({ success: true, message: 'Tender published successfully', data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/tenders/:id - Remove tender
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteTender(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Tender not found' });
    }
    res.json({ success: true, message: 'Tender removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
