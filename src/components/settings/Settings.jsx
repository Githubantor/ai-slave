import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Key, Webhook, Globe } from 'lucide-react';
import Card from '../common/Card';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'integrations', label: 'Integrations', icon: Webhook },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <SettingsIcon size={24} className="text-accent-400" />
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-surface-400 mt-1">Configure your AI Company OS</p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30' : 'glass text-surface-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-400 to-purple-500 flex items-center justify-center text-2xl font-bold">AF</div>
              <div>
                <h3 className="font-lg font-semibold">Alex Founder</h3>
                <p className="text-sm text-surface-400">alex@aicompany.com</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-surface-400 mb-1">Full Name</label>
                <input type="text" defaultValue="Alex Founder" className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-surface-400 mb-1">Email</label>
                <input type="email" defaultValue="alex@aicompany.com" className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-surface-400 mb-1">Organization</label>
                <input type="text" defaultValue="AI Innovations Inc" className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-surface-400 mb-1">Role</label>
                <input type="text" defaultValue="Founder & CEO" className="input-field" />
              </div>
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {[
              { label: 'Task reminders', desc: 'Get notified when tasks need attention', enabled: true },
              { label: 'Approval requests', desc: 'When AI employees need your approval', enabled: true },
              { label: 'Daily summaries', desc: 'End of day overview of all activities', enabled: true },
              { label: 'Email notifications', desc: 'Send notifications via email', enabled: false },
              { label: 'System alerts', desc: 'Important system notifications', enabled: true },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-glass-light">
                <div>
                  <p className="text-sm text-surface-200">{n.label}</p>
                  <p className="text-xs text-surface-400">{n.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={n.enabled} className="sr-only peer" />
                  <div className="w-9 h-5 bg-surface-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-600"></div>
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-surface-400 mb-1">Current Password</label>
              <input type="password" className="input-field" />
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-1">New Password</label>
              <input type="password" className="input-field" />
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-1">Confirm Password</label>
              <input type="password" className="input-field" />
            </div>
            <button className="btn-primary">Update Password</button>
            <div className="pt-4 border-t border-glass-border">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-800/50">
                <div>
                  <p className="text-sm text-surface-200">Two-Factor Authentication</p>
                  <p className="text-xs text-surface-400">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-surface-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-surface-400 mb-2">Theme</label>
              <div className="flex gap-3">
                {['Dark', 'Light', 'System'].map(t => (
                  <button key={t} className={`px-4 py-2 rounded-xl text-sm ${t === 'Dark' ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30' : 'glass text-surface-400 hover:text-white'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-2">Accent Color</label>
              <div className="flex gap-3">
                {['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(c => (
                  <button key={c} className={`w-8 h-8 rounded-xl ${c === '#6366f1' ? 'ring-2 ring-white ring-offset-2 ring-offset-surface-900' : ''}`} style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-800/50">
              <div>
                <p className="text-sm text-surface-200">Production API Key</p>
                <p className="text-xs text-surface-400 font-mono">sk-prod-••••••••••••••••</p>
              </div>
              <button className="btn-secondary text-xs">Rotate</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-800/50">
              <div>
                <p className="text-sm text-surface-200">Staging API Key</p>
                <p className="text-xs text-surface-400 font-mono">sk-staging-••••••••••••••</p>
              </div>
              <button className="btn-secondary text-xs">Rotate</button>
            </div>
            <button className="btn-secondary">Generate New Key</button>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-4">
            {[
              { name: 'OpenAI', status: 'Connected', icon: 'brain' },
              { name: 'Gmail', status: 'Disconnected', icon: 'mail' },
              { name: 'Google Calendar', status: 'Disconnected', icon: 'calendar' },
              { name: 'Slack', status: 'Connected', icon: 'message-square' },
              { name: 'HubSpot', status: 'Disconnected', icon: 'users' },
              { name: 'Salesforce', status: 'Disconnected', icon: 'briefcase' },
            ].map((int, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-glass-light transition-colors">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-surface-400" />
                  <span className="text-sm text-surface-200">{int.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${int.status === 'Connected' ? 'badge-green' : 'badge-gray'}`}>{int.status}</span>
                  <button className="btn-ghost text-xs">Configure</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
