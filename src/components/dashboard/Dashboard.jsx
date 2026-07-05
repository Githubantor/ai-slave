import { motion } from 'framer-motion';
import {
  Bot, Activity, CheckCircle, Target, FileText, Users,
  Pen, Briefcase, Wifi
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import StatCard from './StatCard';
import AgentCard from './AgentCard';
import { useApp } from '../../context/AppContext';

const weeklyData = [
  { day: 'Mon', tasks: 12, completed: 8 },
  { day: 'Tue', tasks: 15, completed: 11 },
  { day: 'Wed', tasks: 18, completed: 14 },
  { day: 'Thu', tasks: 14, completed: 10 },
  { day: 'Fri', tasks: 20, completed: 16 },
  { day: 'Sat', tasks: 10, completed: 7 },
  { day: 'Sun', tasks: 8, completed: 6 },
];

const monthlyData = [
  { month: 'Jan', productivity: 72, efficiency: 68 },
  { month: 'Feb', productivity: 78, efficiency: 73 },
  { month: 'Mar', productivity: 85, efficiency: 79 },
  { month: 'Apr', productivity: 82, efficiency: 76 },
  { month: 'May', productivity: 88, efficiency: 82 },
  { month: 'Jun', productivity: 92, efficiency: 87 },
];

export default function Dashboard() {
  const { dashboardStats, agents } = useApp();

  const stats = dashboardStats ? [
    { icon: Bot, label: 'AI Employees', value: dashboardStats.totalEmployees || 0, color: 'from-purple-500 to-pink-500' },
    { icon: Activity, label: 'Active Tasks', value: dashboardStats.activeTasks || 0, color: 'from-blue-500 to-cyan-500' },
    { icon: CheckCircle, label: 'Completed Tasks', value: dashboardStats.completedTasks || 0, color: 'from-emerald-500 to-teal-500' },
    { icon: Target, label: 'Goals Running', value: dashboardStats.goalsRunning || 0, color: 'from-rose-500 to-orange-500' },
    { icon: FileText, label: 'Reports Generated', value: dashboardStats.reportsGenerated || 0, color: 'from-amber-500 to-yellow-500' },
    { icon: Users, label: 'Leads Researched', value: dashboardStats.leadsResearched || 0, color: 'from-sky-500 to-indigo-500' },
    { icon: Pen, label: 'Content Created', value: dashboardStats.contentCreated || 0, color: 'from-violet-500 to-purple-500' },
    { icon: Briefcase, label: 'Projects Running', value: dashboardStats.projectsRunning || 0, color: 'from-green-500 to-emerald-500' },
    { icon: Wifi, label: 'System Status', value: dashboardStats.systemStatus || 'Optimal', color: 'from-teal-500 to-cyan-500' },
  ] : [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-surface-400 mt-1">Overview of your AI Company OS operations</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="font-semibold mb-4">Weekly Task Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} labelStyle={{ color: '#fff' }} />
              <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} name="Tasks Created" />
              <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Tasks Completed" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-semibold mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} labelStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="productivity" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} name="Productivity" />
              <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="Efficiency" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-xl font-bold mb-4">AI Employees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(agents || []).map((agent, i) => (
            <AgentCard key={agent._id || agent.id} agent={agent} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
