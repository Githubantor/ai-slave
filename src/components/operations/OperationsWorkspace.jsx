import { motion } from 'framer-motion';
import { Workflow, Clock, CheckCircle, Activity, Kanban, ListTodo } from 'lucide-react';
import Card from '../common/Card';

const statuses = [
  { label: 'To Do', count: 8, color: 'bg-surface-600' },
  { label: 'In Progress', count: 12, color: 'bg-blue-500' },
  { label: 'Review', count: 5, color: 'bg-amber-500' },
  { label: 'Done', count: 23, color: 'bg-emerald-500' },
];

export default function OperationsWorkspace() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Operations Workspace</h1>
        <p className="text-surface-400 mt-1">Track projects, manage workflows, and monitor deadlines</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><Activity size={20} className="text-blue-400 mb-2" /><p className="text-2xl font-bold">48</p><p className="text-sm text-surface-400">Total Tasks</p></Card>
        <Card><CheckCircle size={20} className="text-emerald-400 mb-2" /><p className="text-2xl font-bold">23</p><p className="text-sm text-surface-400">Completed</p></Card>
        <Card><Clock size={20} className="text-amber-400 mb-2" /><p className="text-2xl font-bold">7</p><p className="text-sm text-surface-400">Overdue</p></Card>
        <Card><Workflow size={20} className="text-purple-400 mb-2" /><p className="text-2xl font-bold">12</p><p className="text-sm text-surface-400">Active Workflows</p></Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Kanban Board</h3>
        <div className="grid grid-cols-4 gap-4">
          {statuses.map(status => (
            <div key={status.label} className="p-4 rounded-xl bg-surface-800/50">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span className="text-sm font-medium">{status.label}</span>
                <span className="text-xs text-surface-400 ml-auto">{status.count}</span>
              </div>
              <div className="space-y-2">
                {Array.from({ length: Math.min(status.count, 3) }).map((_, i) => (
                  <div key={i} className="p-2 rounded-lg bg-surface-800 border border-glass-border">
                    <p className="text-xs text-surface-300 truncate">
                      {status.label === 'To Do' && ['Design new workflow', 'Update SOPs', 'Review deadlines'][i]}
                      {status.label === 'In Progress' && ['Building automation', 'Optimizing tasks', 'Setting up pipeline'][i]}
                      {status.label === 'Review' && ['Workflow audit', 'Performance check', 'Timeline review'][i]}
                      {status.label === 'Done' && ['Q2 planning', 'Process docs', 'Template creation'][i]}
                    </p>
                  </div>
                ))}
                {status.count > 3 && <p className="text-xs text-surface-500 text-center">+{status.count - 3} more</p>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4">Project Timeline</h3>
        {[
          { name: 'Q3 Growth Strategy', deadline: 'Jul 30', progress: 65 },
          { name: 'SaaS Product Launch', deadline: 'Oct 15', progress: 40 },
          { name: 'Marketing Campaign', deadline: 'Aug 1', progress: 80 },
          { name: 'Infrastructure Upgrade', deadline: 'Jul 20', progress: 90 },
        ].map((project, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-glass-light transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-surface-200">{project.name}</span>
                <span className="text-xs text-surface-400">{project.deadline}</span>
              </div>
              <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  className="h-full bg-gradient-to-r from-accent-500 to-emerald-500 rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
