// API Client Service connecting React frontend to Express + SQLite backend
// Provides real-time synchronization with automatic fallback for static deployments

const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Check if Express + SQLite backend is alive
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/status`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        return { isConnected: true, data };
      }
    } catch (e) {
      // Backend not running / offline
    }
    return { isConnected: false, data: null };
  },

  // Documents
  async getDocuments() {
    try {
      const res = await fetch(`${API_BASE}/documents`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch failed, falling back to cached documents.');
    }
    return null;
  },

  async createDocument(docData) {
    try {
      const res = await fetch(`${API_BASE}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.document;
      }
    } catch (e) {
      console.warn('API createDocument failed, using local fallback.');
    }
    return null;
  },

  async deleteDocument(id) {
    try {
      const res = await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch (e) {
      console.warn('API deleteDocument failed, using local fallback.');
    }
    return false;
  },

  // Student Requests
  async getStudentRequests() {
    try {
      const res = await fetch(`${API_BASE}/requests`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch requests failed, falling back to cache.');
    }
    return null;
  },

  async createStudentRequest(reqData) {
    try {
      const res = await fetch(`${API_BASE}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.request;
      }
    } catch (e) {
      console.warn('API createStudentRequest failed, using local fallback.');
    }
    return null;
  },

  async updateRequestStatus(id, status, extraData = {}) {
    try {
      const res = await fetch(`${API_BASE}/requests/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, ...extraData })
      });
      return res.ok;
    } catch (e) {
      console.warn('API updateRequestStatus failed, using local fallback.');
    }
    return false;
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch categories failed, falling back to cache.');
    }
    return null;
  }
};
