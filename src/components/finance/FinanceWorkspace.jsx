import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3, Receipt, Calculator } from 'lucide-react';
import Card from '../common/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 34000 },
  { month: 'Mar', revenue: 48000, expenses: 31000 },
  { month: 'Apr', revenue: 61000, expenses: 36000 },
  { month: 'May', revenue: 72000, expenses: 38000 },
  { month: 'Jun', revenue: 85000, expenses: 42000 },
];

const budgetData = [
  { name: 'Operations', value: 35, fill: '#6366f1' },
  { name: 'Marketing', value: 25, fill: '#10b981' },
  { name: 'Development', value: 20, fill: '#f59e0b' },
  { name: 'Sales', value: 12, fill: '#ef4444' },
  { name: 'Other', value: 8, fill: '#8b5cf6' },
];

export default function FinanceWorkspace() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Finance Workspace</h1>
        <p className="text-surface-400 mt-1">Budget planning, forecasts, and financial metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><DollarSign size={20} className="text-emerald-400 mb-2" /><p className="text-2xl font-bold">$363K</p><p className="text-sm text-surface-400">Total Revenue YTD</p></Card>
        <Card><TrendingUp size={20} className="text-green-400 mb-2" /><p className="text-2xl font-bold">+32%</p><p className="text-sm text-surface-400">Revenue Growth</p></Card>
        <Card><Receipt size={20} className="text-red-400 mb-2" /><p className="text-2xl font-bold">$213K</p><p className="text-sm text-surface-400">Total Expenses</p></Card>
        <Card><Calculator size={20} className="text-accent-400 mb-2" /><p className="text-2xl font-bold">$150K</p><p className="text-sm text-surface-400">Net Profit</p></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#rev)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#exp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" barSize={20} data={budgetData}>
              <RadialBar dataKey="value" cornerRadius={8} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4">ROI Reports</h3>
        {[
          { campaign: 'Q2 Marketing Campaign', investment: '$25,000', return: '$68,000', roi: '272%' },
          { campaign: 'Sales Development', investment: '$15,000', return: '$42,000', roi: '280%' },
          { campaign: 'Product Launch', investment: '$50,000', return: '$95,000', roi: '190%' },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-glass-light transition-colors">
            <div>
              <p className="text-sm text-surface-200">{r.campaign}</p>
              <p className="text-xs text-surface-400">Investment: {r.investment} • Return: {r.return}</p>
            </div>
            <span className="badge-green text-sm">{r.roi}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
