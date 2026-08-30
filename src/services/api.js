// Client-side API Service connecting React Frontend to TENDER GATE Express Backend

const API_BASE = '/api';

export const apiClient = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (err) {
      console.warn('[API] Backend offline, using local state fallback');
      return null;
    }
  },

  // Tenders
  async fetchTenders(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.province && filters.province !== 'all') params.append('province', filters.province);
      if (filters.pecCategory && filters.pecCategory !== 'all') params.append('pecCategory', filters.pecCategory);
      if (filters.agency && filters.agency !== 'all') params.append('agency', filters.agency);
      if (filters.search) params.append('search', filters.search);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const res = await fetch(`${API_BASE}/tenders?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('[API] Failed to fetch tenders from backend:', err);
      return null;
    }
  },

  async createTender(tenderData) {
    try {
      const res = await fetch(`${API_BASE}/tenders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenderData)
      });
      return await res.json();
    } catch (err) {
      console.warn('[API] Failed to create tender on backend:', err);
      return null;
    }
  },

  // Agents
  async fetchAgents() {
    try {
      const res = await fetch(`${API_BASE}/agents`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('[API] Failed to fetch agents from backend:', err);
      return null;
    }
  },

  async triggerCrawl(agentId = null) {
    try {
      const res = await fetch(`${API_BASE}/agents/crawl`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId })
      });
      return await res.json();
    } catch (err) {
      console.warn('[API] Failed to trigger crawl on backend:', err);
      return null;
    }
  },

  // Analytics
  async fetchAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn('[API] Failed to fetch analytics from backend:', err);
      return null;
    }
  },

  // Alerts
  async subscribeAlerts(alertData) {
    try {
      const res = await fetch(`${API_BASE}/alerts/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData)
      });
      return await res.json();
    } catch (err) {
      console.warn('[API] Failed to subscribe alerts on backend:', err);
      return null;
    }
  }
};
