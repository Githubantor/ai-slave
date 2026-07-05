import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import CEOPage from './components/ceo/CEOPage';
import MarketingWorkspace from './components/marketing/MarketingWorkspace';
import SalesWorkspace from './components/sales/SalesWorkspace';
import ResearchWorkspace from './components/research/ResearchWorkspace';
import DeveloperWorkspace from './components/developer/DeveloperWorkspace';
import OperationsWorkspace from './components/operations/OperationsWorkspace';
import FinanceWorkspace from './components/finance/FinanceWorkspace';
import HRWorkspace from './components/hr/HRWorkspace';
import TaskSystem from './components/tasks/TaskSystem';
import ApprovalSystem from './components/approvals/ApprovalSystem';
import KnowledgeBase from './components/knowledge/KnowledgeBase';
import AutomationEngine from './components/automation/AutomationEngine';
import LeadsPage from './components/leads/LeadsPage';
import AdminPanel from './components/admin/AdminPanel';
import Settings from './components/settings/Settings';
import { LoginPage, RegisterPage } from './components/auth/AuthPages';
import UserProfile from './components/user/UserProfile';
import { Bot } from 'lucide-react';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center animate-pulse">
          <Bot size={32} className="text-white" />
        </div>
        <p className="text-surface-400 text-sm">Loading AI Company OS...</p>
      </div>
    </div>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <PublicRoutes />;

  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="ceo" element={<CEOPage />} />
          <Route path="marketing" element={<MarketingWorkspace />} />
          <Route path="sales" element={<SalesWorkspace />} />
          <Route path="research" element={<ResearchWorkspace />} />
          <Route path="developer" element={<DeveloperWorkspace />} />
          <Route path="operations" element={<OperationsWorkspace />} />
          <Route path="finance" element={<FinanceWorkspace />} />
          <Route path="hr" element={<HRWorkspace />} />
          <Route path="tasks" element={<TaskSystem />} />
          <Route path="approvals" element={<ApprovalSystem />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="automation" element={<AutomationEngine />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
