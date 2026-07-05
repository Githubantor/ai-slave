import { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Lightbulb, TrendingUp, Users, Calendar, PenLine, BarChart3, FileText, ChevronRight } from 'lucide-react';
import { marketingData } from '../../data/mockData';
import Card from '../common/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', content: 12, engagement: 8 },
  { month: 'Feb', content: 15, engagement: 11 },
  { month: 'Mar', content: 18, engagement: 14 },
  { month: 'Apr', content: 22, engagement: 17 },
  { month: 'May', content: 25, engagement: 20 },
  { month: 'Jun', content: 30, engagement: 24 },
];

export default function MarketingWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'content', label: 'Content Planner', icon: PenLine },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'competitors', label: 'Competitors', icon: TrendingUp },
    { id: 'ideas', label: 'Idea Vault', icon: Lightbulb },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Marketing Workspace</h1>
          <p className="text-surface-400 mt-1">Manage content, campaigns, and market presence</p>
        </div>
      </div>

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

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <FileText size={20} className="text-accent-400 mb-2" />
              <p className="text-2xl font-bold">142</p>
              <p className="text-sm text-surface-400">Content Created</p>
            </Card>
            <Card>
              <Users size={20} className="text-emerald-400 mb-2" />
              <p className="text-2xl font-bold">12.4K</p>
              <p className="text-sm text-surface-400">Total Reach</p>
            </Card>
            <Card>
              <TrendingUp size={20} className="text-amber-400 mb-2" />
              <p className="text-2xl font-bold">94%</p>
              <p className="text-sm text-surface-400">Engagement Rate</p>
            </Card>
          </div>
          <Card>
            <h3 className="font-semibold mb-4">Content Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Bar dataKey="content" fill="#6366f1" radius={[4,4,0,0]} name="Content Pieces" />
                <Bar dataKey="engagement" fill="#10b981" radius={[4,4,0,0]} name="Engagements" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 'ideas' && (
        <Card>
          <h3 className="font-semibold mb-4">Content Ideas</h3>
          <div className="space-y-3">
            {marketingData.contentIdeas.map((idea, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors">
                <Lightbulb size={18} className="text-amber-400 shrink-0" />
                <span className="text-sm text-surface-200">{idea}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'competitors' && (
        <Card>
          <h3 className="font-semibold mb-4">Competitor Analysis</h3>
          <div className="space-y-3">
            {marketingData.competitors.map((comp, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface-800/50">
                <h4 className="font-medium mb-2">{comp.name}</h4>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-400">Strength: {comp.strength}</span>
                  <span className="text-red-400">Weakness: {comp.weakness}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'campaigns' && (
        <Card>
          <h3 className="font-semibold mb-4">Campaign Plans</h3>
          <div className="space-y-3">
            {marketingData.campaigns.map((camp, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                <div>
                  <h4 className="font-medium text-sm">{camp.name}</h4>
                  <p className="text-xs text-surface-400">Budget: {camp.budget} • ROI: {camp.roi}</p>
                </div>
                <span className={`badge ${camp.status === 'running' ? 'badge-green' : 'badge-yellow'}`}>{camp.status}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'content' && (
        <Card>
          <h3 className="font-semibold mb-4">Content Planner</h3>
          <p className="text-surface-400 text-sm">Plan and schedule your content calendar here. AI-generated blog posts, scripts, and social media content will appear here.</p>
        </Card>
      )}

      {activeTab === 'calendar' && (
        <Card>
          <h3 className="font-semibold mb-4">Content Calendar</h3>
          <p className="text-surface-400 text-sm">View your content schedule. Marketing AI will populate this with AI-generated content drafts.</p>
        </Card>
      )}
    </div>
  );
}
