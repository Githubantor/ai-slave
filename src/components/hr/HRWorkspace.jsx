import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, FileText, Plus, Star, Target } from 'lucide-react';
import Card from '../common/Card';

export default function HRWorkspace() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">HR Workspace</h1>
        <p className="text-surface-400 mt-1">Knowledge management, SOPs, and team organization</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><GraduationCap size={20} className="text-blue-400 mb-2" /><p className="text-2xl font-bold">8</p><p className="text-sm text-surface-400">AI Employees</p></Card>
        <Card><BookOpen size={20} className="text-emerald-400 mb-2" /><p className="text-2xl font-bold">24</p><p className="text-sm text-surface-400">SOP Documents</p></Card>
        <Card><Star size={20} className="text-amber-400 mb-2" /><p className="text-2xl font-bold">92%</p><p className="text-sm text-surface-400">Avg Performance</p></Card>
        <Card><Users size={20} className="text-purple-400 mb-2" /><p className="text-2xl font-bold">4</p><p className="text-sm text-surface-400">Departments</p></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Knowledge Base</h3>
          {['Company Overview & Mission', 'Product Documentation v2', 'Brand Guidelines 2024', 'Employee Onboarding', 'Security Policies'].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors">
              <FileText size={16} className="text-surface-400" />
              <span className="text-sm text-surface-200 flex-1">{doc}</span>
              <span className="text-xs text-surface-400">v2.3</span>
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">SOP Manager</h3>
          {['Incident Response Protocol', 'Deployment Approval Process', 'Client Onboarding Workflow', 'Data Handling Guidelines', 'Communication Standards'].map((sop, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors">
              <Target size={16} className="text-accent-400" />
              <span className="text-sm text-surface-200 flex-1">{sop}</span>
              <span className="badge-green">Active</span>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Star size={20} className="text-amber-400" />
          <h3 className="font-semibold">AI Employee Performance</h3>
        </div>
        {[
          { name: 'Developer AI', score: 97, role: 'CTO' },
          { name: 'CEO AI', score: 96, role: 'CEO' },
          { name: 'Research AI', score: 94, role: 'Head of Research' },
          { name: 'Marketing AI', score: 92, role: 'CMO' },
          { name: 'Finance AI', score: 91, role: 'CFO' },
        ].map((emp, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-glass-light transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-surface-200">{emp.name}</span>
                <span className="text-xs text-surface-400">{emp.role}</span>
              </div>
              <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${emp.score}%` }}
                  className="h-full bg-gradient-to-r from-accent-500 to-emerald-500 rounded-full"
                />
              </div>
            </div>
            <span className="text-sm font-mono text-accent-400">{emp.score}%</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
