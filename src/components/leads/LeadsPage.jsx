import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Building, Mail, Phone, Star, Briefcase, MapPin, RefreshCw, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Card from '../common/Card';

export default function LeadsPage() {
  const { leads, researchLeads, loading } = useApp();
  const [industry, setIndustry] = useState('');
  const [researching, setResearching] = useState(false);

  const handleResearch = async () => {
    setResearching(true);
    await researchLeads(industry);
    setResearching(false);
  };

  const list = leads || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Lead Research</h1>
        <p className="text-surface-400 mt-1">AI-powered research to find businesses without websites</p>
      </motion.div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Search size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold">Research New Leads</h2>
            <p className="text-xs text-surface-400">Research AI will scan for businesses without an online presence</p>
          </div>
        </div>
        <div className="flex gap-3">
          <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="Industry (e.g., Restaurant, Salon, Plumber)... or leave blank for random" className="input-field flex-1" onKeyDown={e => e.key === 'Enter' && handleResearch()} />
          <button onClick={handleResearch} disabled={researching} className="btn-primary flex items-center gap-2">
            {researching ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
            {researching ? 'Researching...' : 'Research'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><p className="text-2xl font-bold">{list.length}</p><p className="text-sm text-surface-400">Total Leads</p></Card>
        <Card><p className="text-2xl font-bold text-emerald-400">{list.filter(l => l.score >= 70).length}</p><p className="text-sm text-surface-400">Hot Leads</p></Card>
        <Card><p className="text-2xl font-bold text-amber-400">{list.filter(l => l.score >= 40 && l.score < 70).length}</p><p className="text-sm text-surface-400">Warm Leads</p></Card>
        <Card><p className="text-2xl font-bold text-surface-400">{list.filter(l => l.score < 40).length}</p><p className="text-sm text-surface-400">Cold Leads</p></Card>
      </div>

      {list.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Company</th>
                  <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Contact</th>
                  <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Industry</th>
                  <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Website</th>
                  <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Score</th>
                  <th className="text-left p-4 text-xs text-surface-400 font-medium uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((lead, i) => (
                  <motion.tr key={lead._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-glass-border hover:bg-glass-light transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-surface-400" />
                        <span className="text-sm text-surface-200">{lead.company}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-surface-200">{lead.contactName}</div>
                      <div className="text-xs text-surface-400">{lead.email}</div>
                    </td>
                    <td className="p-4"><span className="badge-blue text-xs">{lead.industry}</span></td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Globe size={14} className="text-red-400" />
                        <span className="text-xs text-red-400">No website</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${lead.score}%` }}
                            className={`h-full rounded-full ${lead.score >= 70 ? 'bg-emerald-500' : lead.score >= 40 ? 'bg-amber-500' : 'bg-surface-500'}`} />
                        </div>
                        <span className="text-xs text-surface-400">{lead.score}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`badge ${lead.status === 'cold' ? 'badge-gray' : lead.status === 'warm' ? 'badge-yellow' : 'badge-green'}`}>
                        {lead.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {list.length === 0 && !loading && (
        <div className="glass-card p-12 text-center">
          <Search size={48} className="text-surface-600 mx-auto mb-4" />
          <p className="text-surface-400 text-lg mb-2">No leads yet</p>
          <p className="text-surface-500 text-sm">Research businesses without websites to find new clients</p>
        </div>
      )}
    </div>
  );
}
