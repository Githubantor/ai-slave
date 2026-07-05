import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Target, ChevronRight, CheckCircle, Clock, AlertCircle, Users, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const suggestions = [
  'Grow my AI business revenue by 50%',
  'Launch a new SaaS product in Q3',
  'Build enterprise client pipeline',
  'Develop comprehensive marketing strategy',
  'Research competitor landscape and opportunities',
];

export default function CEOPage() {
  const { ceoObjective, ceoAnalysis, setCeoObjective, runCeoAnalysis } = useApp();
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    runCeoAnalysis(input);
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
