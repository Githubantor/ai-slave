import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Clock, Shield, AlertTriangle, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { useState } from 'react';

export default function ApprovalSystem() {
  const { approvals, approveRequest, rejectRequest } = useApp();
  const [selected, setSelected] = useState(null);
  const pending = (approvals || []).filter(a => a.status === 'pending');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-amber-400" />
          <div>
            <h1 className="text-2xl font-bold">Approval Requests</h1>
            <p className="text-surface-400 mt-1">Review and authorize AI employee actions</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><p className="text-2xl font-bold text-amber-400">{pending.length}</p><p className="text-sm text-surface-400">Pending Review</p></Card>
        <Card><p className="text-2xl font-bold text-emerald-400">{(approvals || []).filter(a => a.status === 'approved').length}</p><p className="text-sm text-surface-400">Approved</p></Card>
        <Card><p className="text-2xl font-bold text-red-400">{(approvals || []).filter(a => a.status === 'rejected').length}</p><p className="text-sm text-surface-400">Rejected</p></Card>
      </div>

      {pending.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-surface-400">
            <Check size={48} className="mb-4 text-emerald-400" />
            <p className="text-lg font-medium">All caught up!</p>
            <p className="text-sm">No pending approval requests</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {pending.map((req, i) => (
              <motion.div key={req._id || req.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 100 }}
                transition={{ delay: i * 0.05 }} layout className="glass-card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${req.priority === 'high' || req.priority === 'critical' ? 'bg-red-500/20' : 'bg-amber-500/20'}`}>
                      <AlertTriangle size={20} className={req.priority === 'high' || req.priority === 'critical' ? 'text-red-400' : 'text-amber-400'} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{req.title}</h3>
                      <p className="text-xs text-surface-400">by {req.agent} • {req.department}</p>
                    </div>
                  </div>
                  <span className={`badge ${req.priority === 'high' || req.priority === 'critical' ? 'badge-red' : 'badge-yellow'}`}>{req.priority}</span>
                </div>
                <p className="text-sm text-surface-300 mb-4">{req.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-surface-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'recent'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelected(req)} className="btn-ghost text-xs flex items-center gap-1"><Eye size={14} /> View</button>
                    <button onClick={() => rejectRequest(req._id || req.id)} className="btn-ghost text-xs text-red-400 flex items-center gap-1"><X size={14} /> Reject</button>
                    <button onClick={() => approveRequest(req._id || req.id)} className="btn-success text-xs flex items-center gap-1 py-1.5 px-3"><Check size={14} /> Approve</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Request Details" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-800/50">
              <AlertTriangle size={20} className="text-amber-400" />
              <div>
                <p className="text-sm font-medium">{selected.title}</p>
                <p className="text-xs text-surface-400">{selected.agent} • {selected.department}</p>
              </div>
            </div>
            <p className="text-sm text-surface-300">{selected.description}</p>
            <div className="flex gap-3">
              <button onClick={() => { rejectRequest(selected._id || selected.id); setSelected(null); }} className="btn-secondary flex-1 flex items-center justify-center gap-2"><X size={16} /> Reject</button>
              <button onClick={() => { approveRequest(selected._id || selected.id); setSelected(null); }} className="btn-primary flex-1 flex items-center justify-center gap-2"><Check size={16} /> Approve</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
