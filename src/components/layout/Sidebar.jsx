import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bot, Target, BarChart3, Users, Search,
  Code2, Settings, Shield, Database, Workflow, Briefcase,
  ChevronLeft, ChevronRight, GraduationCap, Receipt, Megaphone, Sliders,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/ceo', icon: Target, label: 'CEO' },
  { to: '/marketing', icon: Megaphone, label: 'Marketing' },
  { to: '/sales', icon: Users, label: 'Sales' },
  { to: '/research', icon: Search, label: 'Research' },
  { to: '/developer', icon: Code2, label: 'Developer' },
  { to: '/operations', icon: Workflow, label: 'Operations' },
  { to: '/finance', icon: Receipt, label: 'Finance' },
  { to: '/hr', icon: GraduationCap, label: 'HR' },
  { to: '/tasks', icon: BarChart3, label: 'Tasks' },
  { to: '/approvals', icon: Shield, label: 'Approvals' },
  { to: '/knowledge', icon: Database, label: 'Knowledge' },
  { to: '/automation', icon: Workflow, label: 'Automation' },
  { to: '/admin', icon: Sliders, label: 'Admin' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, toggle }) {
  const [hovered, setHovered] = useState(false);
  const isExpanded = !collapsed || hovered;

  return (
    <motion.aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ width: isExpanded ? 240 : 72 }}
      className="h-screen fixed left-0 top-0 z-40 glass border-r border-glass-border flex flex-col overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-glass-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center shrink-0">
          <Bot size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-bold text-lg whitespace-nowrap gradient-text"
            >
              AI Company OS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30'
                  : 'text-surface-400 hover:text-white hover:bg-glass-light border border-transparent'
              }`
            }
          >
            <Icon size={20} className="shrink-0" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={toggle}
        className="flex items-center justify-center h-12 border-t border-glass-border text-surface-400 hover:text-white transition-colors shrink-0"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </motion.aside>
  );
}
