import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Import initial dataset directly from frontend data source
import { INITIAL_TENDERS } from '../../src/data/tenders.js';
import { CONSTRUCTION_AGENTS } from '../../src/data/agents.js';

class DataStore {
  constructor() {
    this.data = {
      tenders: [],
      agents: [],
      alerts: [],
      auditLogs: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure tenders and agents exist
        if (!this.data.tenders || this.data.tenders.length === 0) {
          this.data.tenders = INITIAL_TENDERS;
        }
        if (!this.data.agents || this.data.agents.length === 0) {
          this.data.agents = CONSTRUCTION_AGENTS;
        }
      } else {
        this.data = {
          tenders: INITIAL_TENDERS,
          agents: CONSTRUCTION_AGENTS,
          alerts: [],
          auditLogs: [
            { id: 'LOG-INIT', type: 'SYS_INIT', msg: 'TENDER GATE Enterprise Backend initialized with seed dataset', time: new Date().toISOString() }
          ]
        };
        this.save();
      }
    } catch (err) {
      console.error('[DataStore] Error loading db.json, falling back to in-memory seeds:', err);
      this.data = {
        tenders: INITIAL_TENDERS,
        agents: CONSTRUCTION_AGENTS,
        alerts: [],
        auditLogs: []
      };
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DataStore] Error writing to db.json:', err);
    }
  }

  // Tenders
  getTenders(filters = {}) {
    let result = [...this.data.tenders];

    if (filters.category && filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }
    if (filters.province && filters.province !== 'all') {
      result = result.filter(t => t.province === filters.province);
    }
    if (filters.pecCategory && filters.pecCategory !== 'all') {
      result = result.filter(t => t.pecCategory === filters.pecCategory);
    }
    if (filters.agency && filters.agency !== 'all') {
      result = result.filter(t => t.agencyCode === filters.agency || t.agency === filters.agency);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      const terms = q.split(/\s+/).filter(Boolean);
      result = result.filter(t => {
        const corpus = [
          t.title,
          t.shortDescription,
          t.refNo,
          t.ppraRef,
          t.agency,
          t.locationFull,
          t.category,
          t.pecCategory,
          ...(t.pecCodesRequired || [])
        ].join(' ').toLowerCase();
        return terms.every(term => corpus.includes(term));
      });
    }

    if (filters.sortBy === 'value-high') {
      result.sort((a, b) => (b.estimatedValuePKR || 0) - (a.estimatedValuePKR || 0));
    } else if (filters.sortBy === 'value-low') {
      result.sort((a, b) => (a.estimatedValuePKR || 0) - (b.estimatedValuePKR || 0));
    } else if (filters.sortBy === 'closing-soon') {
      result.sort((a, b) => new Date(a.closingDate) - new Date(b.closingDate));
    } else {
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    return result;
  }

  getTenderById(id) {
    return this.data.tenders.find(t => t.id === id || t.refNo === id);
  }

  addTender(newTender) {
    // Generate unique ID if missing
    if (!newTender.id) {
      newTender.id = `TND-PK-2026-${String(this.data.tenders.length + 1).padStart(3, '0')}`;
    }
    this.data.tenders.unshift(newTender);
    this.save();
    return newTender;
  }

  deleteTender(id) {
    const initialLen = this.data.tenders.length;
    this.data.tenders = this.data.tenders.filter(t => t.id !== id);
    if (this.data.tenders.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Agents
  getAgents() {
    return this.data.agents;
  }

  updateAgent(id, updates) {
    const agent = this.data.agents.find(a => a.id === id);
    if (agent) {
      Object.assign(agent, updates);
      this.save();
      return agent;
    }
    return null;
  }

  // Alerts
  addAlertSubscription(sub) {
    const alertEntry = {
      id: `ALT-${Date.now()}`,
      ...sub,
      subscribedAt: new Date().toISOString()
    };
    this.data.alerts.push(alertEntry);
    this.save();
    return alertEntry;
  }

  // Analytics Aggregation
  getAnalytics() {
    const tenders = this.data.tenders;
    const totalCount = tenders.length;
    const totalValue = tenders.reduce((sum, t) => sum + (t.estimatedValuePKR || 0), 0);
    const totalValueBillion = (totalValue / 1000000000).toFixed(2);

    // Provincial Breakdown
    const provinceCount = {};
    const agencyCount = {};
    const pecCount = {};

    tenders.forEach(t => {
      provinceCount[t.province] = (provinceCount[t.province] || 0) + 1;
      agencyCount[t.agency] = (agencyCount[t.agency] || 0) + 1;
      pecCount[t.pecCategory] = (pecCount[t.pecCategory] || 0) + 1;
    });

    return {
      totalCount,
      totalValuePKR: totalValue,
      totalValueBillion,
      portalsMonitored: 24,
      autonomousAgentsOnline: 8,
      provinceDistribution: provinceCount,
      agencyDistribution: agencyCount,
      pecDistribution: pecCount,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const db = new DataStore();
