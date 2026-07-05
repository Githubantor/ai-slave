import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Target, ChevronRight, CheckCircle, Clock, AlertCircle, Users, BarChart3, Plus, Mail, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const suggestions = [
  'Grow my AI business revenue by 50%',
  'Launch a new SaaS product in Q3',
  'Build enterprise client pipeline',
  'Develop comprehensive marketing strategy',
  'Research competitor landscape and opportunities',
];

export default function CEOPage() {
  const { ceoAnalysis, runCeoAnalysis, createNewTask } = useApp();
  const [input, setInput] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [task, setTask] = useState({ title: '', description: '', clientEmail: '', clientName: '', priority: 'medium' });

  const handleSubmit = () => {
    if (!input.trim()) return;
    runCeoAnalysis(input);
  };

  const handleCreateTask = async () => {
    if (!task.title.trim()) return;
    await createNewTask(task);
    setTask({ title: '', description: '', clientEmail: '', clientName: '', priority: 'medium' });
    setShowTaskForm(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">CEO Command Center</h1>
        <p className="text-surface-400 mt-1">Define your business objective and let the CEO AI orchestrate execution</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Target size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold">What's your business objective?</h2>
            <p className="text-xs text-surface-400">CEO AI will analyze, plan, and delegate to departments</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="e.g., Help me grow my AI business..."
            className="input-field flex-1"
          />
          <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
            <Send size={16} /> Analyze
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => { setInput(s); }}
              className="px-3 py-1.5 rounded-lg bg-glass-light text-xs text-surface-300 hover:text-white hover:bg-accent-500/20 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Plus size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold">Direct Task Assignment</h2>
              <p className="text-xs text-surface-400">Create a task and notify the client via email</p>
            </div>
          </div>
          <button onClick={() => setShowTaskForm(!showTaskForm)} className="btn-primary text-sm">
            {showTaskForm ? 'Cancel' : 'New Task'}
          </button>
        </div>

        <AnimatePresence>
          {showTaskForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="space-y-3 pt-4 border-t border-surface-800">
                <input value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} placeholder="Task title *" className="input-field" />
                <textarea value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} placeholder="Task description (optional)" className="input-field min-h-[80px]" />
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                    <input value={task.clientName} onChange={e => setTask({ ...task, clientName: e.target.value })} placeholder="Client name" className="input-field pl-10" />
                  </div>
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                    <input value={task.clientEmail} onChange={e => setTask({ ...task, clientEmail: e.target.value })} placeholder="Client email" className="input-field pl-10" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })} className="input-field">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical</option>
                  </select>
                  <select value={task.department || ''} onChange={e => setTask({ ...task, department: e.target.value })} className="input-field">
                    <option value="">Select department</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Research">Research</option>
                    <option value="Developer">Developer</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <button onClick={handleCreateTask} className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send size={16} /> Create Task & Notify Client
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {ceoAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-semibold">CEO Analysis Complete</h2>
                  <p className="text-xs text-surface-400">{ceoAnalysis.timeline}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20 mb-4">
                <p className="text-sm text-surface-200">{ceoAnalysis.summary}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {ceoAnalysis.departments.map((dept, i) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={16} className="text-accent-400" />
                      <h3 className="font-semibold text-sm">{dept.name} Department</h3>
                    </div>
                    <div className="space-y-2">
                      {dept.tasks.map((task, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-surface-300">
                          <ChevronRight size={12} className="text-surface-500 shrink-0" />
                          <span className="flex-1">{task.title}</span>
                          <span className={`badge ${
                            task.priority === 'high' ? 'badge-red' : 'badge-yellow'
                          }`}>{task.priority}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 size={20} className="text-accent-400" />
                <h2 className="font-semibold">Execution Flow</h2>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-4">
                {['Objective Received', 'CEO Analysis', 'Delegation', 'Department Execution', 'Review', 'Results'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 shrink-0">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap ${
                      i < 2 ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30' :
                      i === 2 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-surface-800 text-surface-400'
                    }`}>
                      {i < 2 ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {step}
                    </div>
                    {i < 5 && <ChevronRight size={16} className="text-surface-600" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
