import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { dashboardStats as mockStats, agents as mockAgents, tasks as mockTasks, approvals as mockApprovals, activityLog as mockActivity } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [activity, setActivity] = useState([]);
  const [agents, setAgents] = useState([]);
  const [goals, setGoals] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Marketing AI generated a new report', read: false, time: '2m ago' },
    { id: 2, message: 'Sales AI prepared outreach draft awaiting approval', read: false, time: '5m ago' },
    { id: 3, message: 'CEO AI completed Q3 strategy analysis', read: true, time: '1h ago' },
  ]);
  const [ceoAnalysis, setCeoAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendAvailable, setBackendAvailable] = useState(true);

  const loadMockData = useCallback(() => {
    setDashboardStats(mockStats);
    setAgents(mockAgents);
    setTasks(mockTasks);
    setApprovals(mockApprovals);
    setActivity(mockActivity);
    setBackendAvailable(false);
    setLoading(false);
  }, []);

  const refreshDashboard = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const health = await fetch('/api/health', { signal: controller.signal });
      clearTimeout(timeout);
      if (!health.ok) throw new Error('Backend unavailable');
    } catch {
      console.warn('Backend unreachable, using mock data');
      loadMockData();
      return;
    }

    try {
      const [statsData, agentsData, tasksData, approvalsData, activityData, goalsData] = await Promise.all([
        api.getDashboard(),
        api.getAgents(),
        api.getTasks(),
        api.getApprovals(),
        api.getActivity(20),
        api.getGoals(),
      ]);
      setDashboardStats(statsData);
      setAgents(agentsData);
      setTasks(tasksData);
      setApprovals(approvalsData);
      setActivity(Array.isArray(activityData) ? activityData : []);
      setGoals(goalsData);
      setBackendAvailable(true);
    } catch (err) {
      console.warn('API fetch failed, using mock data:', err.message);
      loadMockData();
    } finally {
      setLoading(false);
    }
  }, [loadMockData]);

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const addActivity = async (entry) => {
    if (backendAvailable) {
      try {
        const created = await api.createActivity(entry);
        setActivity(prev => [created, ...prev]);
        return;
      } catch { /* fallback to local */ }
    }
    setActivity(prev => [{ id: Date.now(), ...entry, createdAt: new Date().toISOString() }, ...prev]);
  };

  const addNotification = (message) => {
    setNotifications(prev => [{ id: Date.now(), message, read: false, time: 'just now' }, ...prev]);
  };

  const approveRequest = async (id) => {
    if (backendAvailable) {
      try {
        await api.approveRequest(id);
        setApprovals(prev => prev.filter(a => (a._id || a.id) !== id));
        addNotification('Approval request was approved');
        return;
      } catch { /* fallback */ }
    }
    setApprovals(prev => prev.filter(a => (a._id || a.id) !== id));
    addNotification('Approval request was approved');
  };

  const rejectRequest = async (id) => {
    if (backendAvailable) {
      try {
        await api.rejectRequest(id);
        setApprovals(prev => prev.filter(a => (a._id || a.id) !== id));
        addNotification('Approval request was rejected');
        return;
      } catch { /* fallback */ }
    }
    setApprovals(prev => prev.filter(a => (a._id || a.id) !== id));
    addNotification('Approval request was rejected');
  };

  const createNewTask = async (taskData) => {
    if (backendAvailable) {
      try {
        const created = await api.createTask(taskData);
        setTasks(prev => [created, ...prev]);
        return created;
      } catch { /* fallback */ }
    }
    const local = { id: Date.now(), ...taskData, status: 'pending', progress: 0, createdAt: new Date().toISOString() };
    setTasks(prev => [local, ...prev]);
    return local;
  };

  const updateTaskStatus = (id, status) => {
    setTasks(prev => prev.map(t => (t._id || t.id) === id ? { ...t, status } : t));
    if (backendAvailable) {
      api.updateTask(id, { status }).catch(() => {});
    }
  };

  const runCeoAnalysis = async (objective) => {
    const departments = [];
    const obj = objective.toLowerCase();
    if (obj.includes('market') || obj.includes('research')) departments.push('Research');
    if (obj.includes('grow') || obj.includes('revenue') || obj.includes('client')) departments.push('Sales', 'Marketing');
    if (obj.includes('product') || obj.includes('build') || obj.includes('saas')) departments.push('Developer');
    if (obj.includes('efficien') || obj.includes('operation')) departments.push('Operations');
    if (obj.includes('financ') || obj.includes('budget') || obj.includes('cost')) departments.push('Finance');
    if (departments.length === 0) departments.push('Marketing', 'Sales', 'Research', 'Developer', 'Operations');

    const analysis = {
      objective,
      summary: `CEO AI analyzed your objective. This requires coordination across ${departments.length} departments.`,
      departments: departments.map(d => ({
        name: d,
        tasks: [
          { title: `Research ${d} strategy for objective`, priority: 'high' },
          { title: `Execute ${d} action plan`, priority: 'high' },
          { title: `Report ${d} findings`, priority: 'medium' },
        ],
      })),
      timeline: '2-4 weeks for initial results',
      status: 'analyzed',
    };

    if (backendAvailable) {
      try {
        const result = await api.analyzeGoal(objective);
        setCeoAnalysis(result);
        await refreshDashboard();
        return result;
      } catch { /* fallback */ }
    }

    setCeoAnalysis(analysis);
    addActivity({ agent: 'CEO AI', action: 'completed analysis', detail: `Strategic analysis for: ${objective}`, time: 'just now', icon: 'target' });
    return analysis;
  };

  return (
    <AppContext.Provider value={{
      tasks, approvals, activity, agents, goals, dashboardStats, notifications,
      ceoAnalysis, loading, backendAvailable,
      setApprovals, addActivity, addNotification, approveRequest, rejectRequest,
      updateTaskStatus, runCeoAnalysis, setCeoAnalysis, refreshDashboard, createNewTask,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
