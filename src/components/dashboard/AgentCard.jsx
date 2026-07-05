import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Circle } from 'lucide-react';

const statusColors = { online: 'text-emerald-400', busy: 'text-amber-400', offline: 'text-red-400' };
const routeMap = {
  'ceo': '/ceo', 'marketing': '/marketing', 'sales': '/sales', 'research': '/research',
  'developer': '/developer', 'operations': '/operations', 'finance': '/finance', 'hr': '/hr',
  'ceo ai': '/ceo', 'marketing ai': '/marketing', 'sales ai': '/sales', 'research ai': '/research',
  'developer ai': '/developer', 'operations ai': '/operations', 'finance ai': '/finance', 'hr ai': '/hr',
};

const getRoute = (name) => {
  const key = name?.toLowerCase() || '';
  return routeMap[key] || `/${key.split(' ')[0]}`;
};

export default function AgentCard({ agent, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card p-5 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color || 'from-accent-500 to-purple-500'} flex items-center justify-center text-lg font-bold`}>
            {agent.avatar || agent.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-xs text-surface-400">{agent.role}</p>
          </div>
        </div>
        <Circle size={10} className={`${statusColors[agent.status] || statusColors.online} fill-current`} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-surface-400">Current Task</span>
          <span className="text-surface-200 text-right max-w-[180px] truncate">{agent.currentTask || 'Idle'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-surface-400">Completed</span>
          <span className="text-emerald-400 font-medium">{agent.completedTasks || 0} tasks</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-surface-400">Performance</span>
          <span className="text-accent-400 font-medium">{agent.performanceScore || 90}%</span>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-surface-400 mb-1">
            <span>Performance</span>
            <span>{agent.performanceScore || 90}%</span>
          </div>
          <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${agent.performanceScore || 90}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full bg-gradient-to-r ${agent.color || 'from-accent-500 to-purple-500'}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-glass-border">
        <p className="text-xs text-surface-400 mb-2">Recent Activity</p>
        <div className="space-y-1.5">
          {(agent.recentActivity || []).slice(0, 2).map((act, i) => (
            <p key={i} className="text-xs text-surface-300 truncate">{act.action || act}</p>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate(getRoute(agent.name))}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl glass glass-hover text-sm"
      >
        <ExternalLink size={14} /> View Workspace
      </button>
    </motion.div>
  );
}
