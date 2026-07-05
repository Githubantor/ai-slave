import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, BookOpen, GitBranch, Server, Shield, Box, Globe, FileText } from 'lucide-react';
import Card from '../common/Card';

export default function DeveloperWorkspace() {
  const [activeTab, setActiveTab] = useState('projects');
  const tabs = [
    { id: 'projects', label: 'Projects', icon: Box },
    { id: 'apis', label: 'APIs', icon: Server },
    { id: 'docs', label: 'Documentation', icon: BookOpen },
    { id: 'deploy', label: 'Deployments', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Developer Workspace</h1>
        <p className="text-surface-400 mt-1">Build, deploy, and manage technical infrastructure</p>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30'
                : 'glass text-surface-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><Code2 size={20} className="text-blue-400 mb-2" /><p className="text-2xl font-bold">12</p><p className="text-sm text-surface-400">Active Projects</p></Card>
        <Card><Server size={20} className="text-emerald-400 mb-2" /><p className="text-2xl font-bold">24</p><p className="text-sm text-surface-400">API Endpoints</p></Card>
        <Card><GitBranch size={20} className="text-amber-400 mb-2" /><p className="text-2xl font-bold">156</p><p className="text-sm text-surface-400">Deployments</p></Card>
        <Card><Shield size={20} className="text-purple-400 mb-2" /><p className="text-2xl font-bold">100%</p><p className="text-sm text-surface-400">Uptime</p></Card>
      </div>

      {activeTab === 'projects' && (
        <Card>
          <h3 className="font-semibold mb-4">Current Projects</h3>
          {[
            { name: 'CRM Integration API', status: 'In Progress', progress: 65 },
            { name: 'AI Analytics Dashboard', status: 'Planning', progress: 20 },
            { name: 'Automation Engine v2', status: 'Review', progress: 85 },
            { name: 'Knowledge Base System', status: 'Completed', progress: 100 },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface-800/50 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{p.name}</span>
                <span className={`badge ${p.status === 'Completed' ? 'badge-green' : p.status === 'In Progress' ? 'badge-blue' : p.status === 'Planning' ? 'badge-yellow' : 'badge-purple'}`}>{p.status}</span>
              </div>
              <div className="h-1.5 bg-surface-700 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} className="h-full bg-gradient-to-r from-accent-500 to-purple-500 rounded-full" />
              </div>
            </div>
          ))}
        </Card>
      )}

      {activeTab === 'apis' && (
        <Card>
          <h3 className="font-semibold mb-4">API Architecture</h3>
          <p className="text-surface-400 text-sm mb-4">API endpoints and integration points managed by Developer AI.</p>
          {['User Management API', 'Task Management API', 'AI Agent API', 'Analytics API'].map((api, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors">
              <Server size={16} className="text-accent-400" />
              <span className="text-sm text-surface-200 flex-1">{api}</span>
              <span className="badge-green">Active</span>
            </div>
          ))}
        </Card>
      )}

      {activeTab === 'docs' && (
        <Card>
          <h3 className="font-semibold mb-4">Documentation</h3>
          {['API v2 Integration Guide', 'System Architecture Overview', 'Deployment Runbook', 'Developer Setup Guide'].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors">
              <FileText size={16} className="text-surface-400" />
              <span className="text-sm text-surface-200 flex-1">{doc}</span>
              <span className="badge-blue">View</span>
            </div>
          ))}
        </Card>
      )}

      {activeTab === 'deploy' && (
        <Card>
          <h3 className="font-semibold mb-4">Deployment Pipeline</h3>
          <p className="text-surface-400 text-sm">Continuous deployment pipeline. All deployments require approval before going live.</p>
        </Card>
      )}
    </div>
  );
}
