import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, BookOpen, BarChart3, FileText, Lightbulb } from 'lucide-react';
import Card from '../common/Card';

export default function ResearchWorkspace() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Research Workspace</h1>
        <p className="text-surface-400 mt-1">Market analysis, competitor research, and opportunity discovery</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <FileText size={20} className="text-blue-400 mb-2" />
          <p className="text-2xl font-bold">56</p>
          <p className="text-sm text-surface-400">Reports Generated</p>
        </Card>
        <Card>
          <TrendingUp size={20} className="text-emerald-400 mb-2" />
          <p className="text-2xl font-bold">23</p>
          <p className="text-sm text-surface-400">Trends Tracked</p>
        </Card>
        <Card>
          <Target size={20} className="text-amber-400 mb-2" />
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-surface-400">Opportunities Found</p>
        </Card>
        <Card>
          <Search size={20} className="text-purple-400 mb-2" />
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-surface-400">Competitors Monitored</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Recent Reports</h3>
          {['AI Market Trends 2024', 'Competitor SWOT Analysis', 'Q3 Opportunity Report', 'Industry Landscape Review'].map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors">
              <FileText size={16} className="text-surface-400" />
              <span className="text-sm text-surface-200 flex-1">{r}</span>
              <span className="badge-blue text-xs">PDF</span>
            </div>
          ))}
        </Card>
        <Card>
          <h3 className="font-semibold mb-4">SWOT Analysis</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs font-semibold text-emerald-400 mb-1">Strengths</p>
              <p className="text-xs text-surface-300">AI-first approach, automation, 24/7 operation</p>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-xs font-semibold text-red-400 mb-1">Weaknesses</p>
              <p className="text-xs text-surface-300">New market, brand awareness, trust building</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs font-semibold text-blue-400 mb-1">Opportunities</p>
              <p className="text-xs text-surface-300">Growing AI adoption, SMB market, automation demand</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs font-semibold text-amber-400 mb-1">Threats</p>
              <p className="text-xs text-surface-300">Big tech incumbents, rapid market changes</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Industry Trends</h3>
        {['AI Agents replacing B2B SaaS workflows', 'Rise of vertical AI solutions', 'Autonomous business operations', 'Multi-modal AI for enterprise'].map((t, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors">
            <Lightbulb size={16} className="text-amber-400" />
            <span className="text-sm text-surface-200">{t}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
