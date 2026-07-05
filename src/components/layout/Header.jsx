import { Bell, Search, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { notifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 glass border-b border-glass-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 bg-surface-800/50 border border-glass-border rounded-xl text-sm text-white placeholder-surface-400 focus:outline-none focus:border-accent-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl hover:bg-glass-light transition-colors"
          >
            <Bell size={20} className="text-surface-300" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 rounded-full text-[10px] flex items-center justify-center font-bold">
                {unread}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute right-0 top-full mt-2 w-80 glass-card p-4 max-h-96 overflow-y-auto"
              >
                <h3 className="text-sm font-semibold mb-3">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-surface-400 text-sm">No notifications</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`flex items-start gap-3 p-2 rounded-lg ${n.read ? '' : 'bg-accent-500/10'}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${n.read ? 'bg-surface-500' : 'bg-accent-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-surface-200">{n.message}</p>
                        <p className="text-xs text-surface-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-glass-light transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-purple-500 flex items-center justify-center text-xs font-bold">
              {user?.avatar || 'AF'}
            </div>
          </button>
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute right-0 top-full mt-2 w-56 glass-card p-4"
              >
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-glass-border">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-purple-500 flex items-center justify-center font-bold">
                    {user?.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-surface-400">{user?.email}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-glass-light text-sm text-surface-300 transition-colors">
                  <User size={16} /> Profile
                </button>
                <button onClick={logout} className="flex items-center gap-2 w-full px-2 py-2 rounded-lg hover:bg-glass-light text-sm text-red-400 transition-colors">
                  <LogOut size={16} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
