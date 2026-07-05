import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, Bot, BarChart3, Activity, CreditCard, Flag, Shield } from 'lucide-react';
import Card from '../common/Card';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('overview');
  const sections = [
    { id: 'overview', label: 'System Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'agents', label: 'AI Agents', icon: Bot },
    { id: 'logs', label: 'System Logs', icon: Activity },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'features', label: 'Feature Flags', icon: Flag },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-surface-400 mt-1">System administration and configuration</p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              activeSection === s.id ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30' : 'glass text-surface-400 hover:text-white'
            }`}
          >
            <s.icon size={16} />
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><Users size={20} className="text-blue-400 mb-2" /><p className="text-2xl font-bold">1</p><p className="text-sm text-surface-400">Active Users</p></Card>
          <Card><Bot size={20} className="text-purple-400 mb-2" /><p className="text-2xl font-bold">8</p><p className="text-sm text-surface-400">AI Agents</p></Card>
          <Card><Activity size={20} className="text-emerald-400 mb-2" /><p className="text-2xl font-bold">99.9%</p><p className="text-sm text-surface-400">Uptime</p></Card>
          <Card><Settings size={20} className="text-amber-400 mb-2" /><p className="text-2xl font-bold">24</p><p className="text-sm text-surface-400">API Calls/min</p></Card>
        </div>
      )}

      {activeSection === 'agents' && (
        <Card>
          <h3 className="font-semibold mb-4">AI Agent Management</h3>
          {['CEO AI', 'Marketing AI', 'Sales AI', 'Research AI', 'Developer AI', 'Operations AI', 'Finance AI', 'HR AI'].map((agent, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-glass-light transition-colors">
              <div className="flex items-center gap-3">
                <Bot size={16} className="text-accent-400" />
                <span className="text-sm text-surface-200">{agent}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge-green">Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-surface-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-600"></div>
                </label>
              </div>
            </div>
          ))}
        </Card>
      )}

      {activeSection === 'features' && (
        <Card>
          <h3 className="font-semibold mb-4">Feature Flags</h3>
          {[
            { name: 'AI Content Generation', enabled: true },
            { name: 'Automated Research', enabled: true },
            { name: 'Email Outreach', enabled: false },
            { name: 'Social Media Posting', enabled: false },
            { name: 'External API Integration', enabled: true },
          ].map((f, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-glass-light transition-colors">
              <span className="text-sm text-surface-200">{f.name}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={f.enabled} className="sr-only peer" />
                <div className="w-9 h-5 bg-surface-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-600"></div>
              </label>
            </div>
          ))}
        </Card>
      )}

      {(activeSection === 'users' || activeSection === 'logs' || activeSection === 'billing') && (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-surface-400">
            <Settings size={48} className="mb-4" />
            <p className="text-lg font-medium">{sections.find(s => s.id === activeSection)?.label}</p>
            <p className="text-sm">Admin controls for this section will be available in the full version.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
