import { useState } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Plus, Play, Pause, Trash2, ChevronRight, Zap, GitBranch } from 'lucide-react';
import Card from '../common/Card';

const initialWorkflows = [
  {
    id: 1,
    name: 'New Lead Processing',
    status: 'active',
    trigger: 'New lead added to database',
    steps: ['Research AI analyzes company', 'Sales AI prepares draft', 'CEO AI reviews', 'User approves', 'Email sent'],
    lastRun: '2 min ago',
  },
  {
    id: 2,
    name: 'Weekly Competitor Analysis',
    status: 'active',
    trigger: 'Every Monday 9:00 AM',
    steps: ['Research AI scans competitors', 'Marketing AI updates report', 'CEO AI sends summary'],
    lastRun: '1 day ago',
  },
  {
    id: 3,
    name: 'Content Publication Workflow',
    status: 'paused',
    trigger: 'Content draft ready',
    steps: ['Marketing AI creates draft', 'CEO AI reviews', 'User approves publication', 'Developer AI deploys'],
    lastRun: '3 days ago',
  },
  {
    id: 4,
    name: 'Monthly Financial Review',
    status: 'active',
    trigger: 'Every 1st of month',
    steps: ['Finance AI aggregates data', 'Operations AI verifies', 'CEO AI reviews', 'Report sent to Owner'],
    lastRun: '5 days ago',
  },
];

export default function AutomationEngine() {
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [showBuilder, setShowBuilder] = useState(false);

  const toggleWorkflow = (id) => {
    setWorkflows(prev => prev.map(w =>
      w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w
    ));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold">Automation Engine</h1>
              <p className="text-surface-400 mt-1">Create and manage automated workflows</p>
            </div>
          </div>
          <button onClick={() => setShowBuilder(!showBuilder)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> New Workflow
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><Zap size={20} className="text-emerald-400 mb-2" /><p className="text-2xl font-bold">{workflows.filter(w => w.status === 'active').length}</p><p className="text-sm text-surface-400">Active Workflows</p></Card>
        <Card><Pause size={20} className="text-amber-400 mb-2" /><p className="text-2xl font-bold">{workflows.filter(w => w.status === 'paused').length}</p><p className="text-sm text-surface-400">Paused</p></Card>
        <Card><GitBranch size={20} className="text-accent-400 mb-2" /><p className="text-2xl font-bold">24</p><p className="text-sm text-surface-400">Total Runs Today</p></Card>
      </div>

      {showBuilder && (
        <Card className="border border-accent-500/30">
          <h3 className="font-semibold mb-4">Create Workflow</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-surface-400 mb-1">Workflow Name</label>
              <input type="text" placeholder="e.g., New Client Onboarding" className="input-field" />
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-1">Trigger Event</label>
              <select className="input-field">
                <option>New lead added to database</option>
                <option>Content draft ready</option>
                <option>Schedule (cron)</option>
                <option>Webhook received</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-1">Workflow Steps</label>
              <div className="space-y-2">
                {['Research AI analyzes company', 'Sales AI prepares draft', 'CEO AI reviews', 'User approves'].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-surface-800/50">
                    <span className="w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 text-xs flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm text-surface-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn-primary w-full">Create Workflow</button>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {workflows.map((wf, i) => (
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${wf.status === 'active' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                  {wf.status === 'active' ? <Zap size={20} className="text-emerald-400" /> : <Pause size={20} className="text-amber-400" />}
                </div>
                <div>
                  <h3 className="font-semibold">{wf.name}</h3>
                  <p className="text-xs text-surface-400">Trigger: {wf.trigger}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge ${wf.status === 'active' ? 'badge-green' : 'badge-yellow'}`}>{wf.status}</span>
                <button onClick={() => toggleWorkflow(wf.id)} className="btn-ghost p-1.5">
                  {wf.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="btn-ghost p-1.5 text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {wf.steps.map((step, j) => (
                <div key={j} className="flex items-center gap-2 shrink-0">
                  <div className="px-3 py-1.5 rounded-lg bg-surface-800/50 text-xs text-surface-300 whitespace-nowrap">{step}</div>
                  {j < wf.steps.length - 1 && <ChevronRight size={14} className="text-surface-500" />}
                </div>
              ))}
            </div>

            <p className="text-xs text-surface-500 mt-3">Last run: {wf.lastRun}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
