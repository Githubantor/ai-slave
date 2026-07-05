import { motion } from 'framer-motion';
import { Users, TrendingUp, Mail, PhoneCall, BarChart3, Target, Shield } from 'lucide-react';
import { salesData } from '../../data/mockData';
import Card from '../common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const pipelineData = salesData.pipeline.map(p => ({ name: p.stage, value: parseInt(p.value.replace(/[$,]/g, '')) }));
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function SalesWorkspace() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Sales Workspace</h1>
        <p className="text-surface-400 mt-1">Manage leads, pipeline, and outreach</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Users size={20} className="text-blue-400 mb-2" />
          <p className="text-2xl font-bold">{salesData.leads.length}</p>
          <p className="text-sm text-surface-400">Active Leads</p>
        </Card>
        <Card>
          <Target size={20} className="text-emerald-400 mb-2" />
          <p className="text-2xl font-bold">{salesData.leads.filter(l => l.score >= 80).length}</p>
          <p className="text-sm text-surface-400">Hot Leads</p>
        </Card>
        <Card>
          <BarChart3 size={20} className="text-amber-400 mb-2" />
          <p className="text-2xl font-bold">$565K</p>
          <p className="text-sm text-surface-400">Pipeline Value</p>
        </Card>
        <Card>
          <Mail size={20} className="text-purple-400 mb-2" />
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-surface-400">Drafts Pending Approval</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Lead Database</h3>
          <div className="space-y-2">
            {salesData.leads.map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-glass-light transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium">{lead.company}</p>
                  <p className="text-xs text-surface-400">{lead.contact} • {lead.industry}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${lead.status === 'hot' ? 'badge-red' : lead.status === 'warm' ? 'badge-yellow' : 'badge-gray'}`}>
                    {lead.status}
                  </span>
                  <span className="text-sm font-mono text-accent-400">{lead.score}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Pipeline Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pipelineData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                {pipelineData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="border border-amber-500/20 bg-amber-500/5">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-amber-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-400">Approval Required</p>
            <p className="text-xs text-surface-400">All outbound messages require your approval before being sent. No automatic outreach without approval.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
