const API_URL = '/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...options.headers,
      },
      ...options,
    };
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    const res = await fetch(`${API_URL}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  }

  login(email, password) {
    return this.request('/auth/login', { method: 'POST', body: { email, password } });
  }

  register(name, email, password) {
    return this.request('/auth/register', { method: 'POST', body: { name, email, password } });
  }

  getMe() {
    return this.request('/auth/me');
  }

  getDashboard() {
    return this.request('/dashboard/stats');
  }

  getAgents() {
    return this.request('/agents');
  }

  getAgent(id) {
    return this.request(`/agents/${id}`);
  }

  updateAgent(id, data) {
    return this.request(`/agents/${id}`, { method: 'PATCH', body: data });
  }

  getGoals() {
    return this.request('/goals');
  }

  createGoal(data) {
    return this.request('/goals', { method: 'POST', body: data });
  }

  analyzeGoal(objective) {
    return this.request('/goals/analyze', { method: 'POST', body: { objective } });
  }

  updateGoal(id, data) {
    return this.request(`/goals/${id}`, { method: 'PATCH', body: data });
  }

  deleteGoal(id) {
    return this.request(`/goals/${id}`, { method: 'DELETE' });
  }

  getTasks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/tasks${query ? `?${query}` : ''}`);
  }

  getTaskStats() {
    return this.request('/tasks/stats');
  }

  createTask(data) {
    return this.request('/tasks', { method: 'POST', body: data });
  }

  updateTask(id, data) {
    return this.request(`/tasks/${id}`, { method: 'PATCH', body: data });
  }

  deleteTask(id) {
    return this.request(`/tasks/${id}`, { method: 'DELETE' });
  }

  getApprovals(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/approvals${query ? `?${query}` : ''}`);
  }

  createApproval(data) {
    return this.request('/approvals', { method: 'POST', body: data });
  }

  approveRequest(id) {
    return this.request(`/approvals/${id}/approve`, { method: 'PATCH' });
  }

  rejectRequest(id) {
    return this.request(`/approvals/${id}/reject`, { method: 'PATCH' });
  }

  getActivity(limit = 50) {
    return this.request(`/activity?limit=${limit}`);
  }

  createActivity(data) {
    return this.request('/activity', { method: 'POST', body: data });
  }

  getDocuments() {
    return this.request('/knowledge');
  }

  createDocument(data) {
    return this.request('/knowledge', { method: 'POST', body: data });
  }

  deleteDocument(id) {
    return this.request(`/knowledge/${id}`, { method: 'DELETE' });
  }

  getLeads() {
    return this.request('/leads');
  }

  researchLeads(industry) {
    return this.request('/leads/research', { method: 'POST', body: { industry } });
  }
}

export default new ApiService();
