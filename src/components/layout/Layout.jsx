import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ActivityFeed from './ActivityFeed';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: collapsed ? 72 : 240 }}
      >
        <Header />
        <div className="flex-1 flex">
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
          <aside className="w-80 shrink-0 border-l border-glass-border p-4 hidden xl:block overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Live Activity</h3>
            </div>
            <ActivityFeed />
          </aside>
        </div>
      </div>
    </div>
  );
}
