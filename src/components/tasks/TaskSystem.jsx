import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, AlertCircle, Play, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Card from '../common/Card';

const statusIcons = { completed: CheckCircle, running: Play, planning: Clock, pending: AlertCircle, cancelled: RotateCcw, waiting_approval: Clock };
const statusColors = {
  completed: 'text-emerald-400 bg-emerald-500/10', running: 'text-blue-400 bg-blue-500/10',
  planning: 'text-amber-400 bg-amber-500/10', pending: 'text-surface-400 bg-surface-500/10',
  cancelled: 'text-red-400 bg-red-500/10', waiting_approval: 'text-purple-400 bg-purple-500/10',
};

export default function TaskSystem() {
  const { tasks, updateTaskStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const list = tasks || [];
  const filtered = list
    .filter(t => filter === 'all' || t.status === filter)
    .filter(t => (t.title || '').toLowerCase().includes(search.toLowerCase()));

  const filters = ['all', 'pending', 'planning', 'running', 'waiting_approval', 'completed', 'cancelled'];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Task System</h1>
        <p className="text-surface-400 mt-1">Track and manage all AI employee tasks</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${filter === f ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30' : 'glass text-surface-400 hover:text-white'}`}>
              {f === 'all' ? 'All' : f.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><p className="text-2xl font-bold">{list.length}</p><p className="text-sm text-surface-400">Total Tasks</p></Card>
        <Card><p className="text-2xl font-bold text-emerald-400">{list.filter(t => t.status === 'completed').length}</p><p className="text-sm text-surface-400">Completed</p></Card>
        <Card><p className="text-2xl font-bold text-blue-400">{list.filter(t => t.status === 'running').length}</p><p className="text-sm text-surface-400">In Progress</p></Card>
        <Card><p className="text-2xl font-bold text-amber-400">{list.filter(t => t.status === 'pending' || t.status === 'planning').length}</p><p className="text-sm text-surface-400">Pending</p></Card>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Task</th>
                <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Department</th>
                <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Priority</th>
                <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Assignee</th>
                <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Status</th>
                <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Progress</th>
                <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task, i) => {
                const StatusIcon = statusIcons[task.status] || Clock;
                return (
                  <motion.tr key={task._id || task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-glass-border hover:bg-glass-light transition-colors">
                    <td className="p-4"><p className="text-sm text-surface-200">{task.title}</p></td>
                    <td className="p-4"><span className="badge-blue text-xs">{task.department}</span></td>
                    <td className="p-4">
                      <span className={`badge ${task.priority === 'high' || task.priority === 'critical' ? 'badge-red' : task.priority === 'medium' ? 'badge-yellow' : 'badge-gray'}`}>{task.priority}</span>
                    </td>
                    <td className="p-4"><span className="text-sm text-surface-300">{task.assigneeName || task.assignee?.name || '—'}</span></td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon size={14} className={statusColors[task.status]?.split(' ')[0] || 'text-surface-400'} />
                        <span className={`text-xs ${statusColors[task.status]?.split(' ')[0] || 'text-surface-400'}`}>
                          {task.status?.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-surface-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress || 0}%` }}
                            className="h-full bg-gradient-to-r from-accent-500 to-emerald-500 rounded-full" />
                        </div>
                        <span className="text-xs text-surface-400">{task.progress || 0}%</span>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-xs text-surface-400">{task.deadline ? new Date(task.deadline).toLocaleDateString() : '—'}</span></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
