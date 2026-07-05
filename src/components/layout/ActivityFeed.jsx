import { motion } from 'framer-motion';
import { FileText, Search, Target, Book, Mail, TrendingUp, CheckCircle, File } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const iconMap = {
  'file-text': FileText, 'search': Search, 'target': Target, 'book': Book,
  'mail': Mail, 'trending-up': TrendingUp, 'check-circle': CheckCircle, 'file': File,
};

export default function ActivityFeed() {
  const { activity } = useApp();

  return (
    <div className="space-y-3">
      {(activity || []).slice(0, 8).map((entry, i) => {
        const Icon = iconMap[entry.icon] || FileText;
        return (
          <motion.div
            key={entry._id || entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-glass-light transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-accent-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium text-white">{entry.agent}</span>
                {' '}
                <span className="text-surface-300">{entry.action}</span>
              </p>
              <p className="text-xs text-surface-400 mt-0.5 truncate">{entry.detail}</p>
              <p className="text-xs text-surface-500 mt-0.5">{entry.time || entry.createdAt ? new Date(entry.createdAt || Date.now()).toLocaleTimeString() : 'recent'}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
