import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bot, ArrowLeft, Mail, Building, Calendar, Shield } from 'lucide-react';

export default function UserProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then(r => r.json())
      .then(d => { if (d.user) setData(d); else setError(d.message); })
      .catch(e => setError(e.message));
  }, [id]);

  if (error) return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="text-center">
        <Bot size={48} className="text-surface-600 mx-auto mb-4" />
        <p className="text-surface-400">{error}</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full" />
    </div>
  );

  const { user } = data;
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-surface-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to login
        </Link>
        <div className="bg-surface-900 rounded-2xl border border-surface-800 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-accent-500/20 to-purple-600/20" />
          <div className="px-6 pb-6 -mt-12">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg">
              {user.avatar}
            </div>
            <h1 className="text-xl font-bold text-white mb-1">{user.name}</h1>
            <div className="space-y-2 text-sm text-surface-400">
              <div className="flex items-center gap-2"><Mail size={14} /><span>{user.email}</span></div>
              {user.organization && (
                <div className="flex items-center gap-2"><Building size={14} /><span>{user.organization.name || 'No org'}</span></div>
              )}
              <div className="flex items-center gap-2"><Shield size={14} /><span className="capitalize">{user.role}</span></div>
              <div className="flex items-center gap-2"><Calendar size={14} /><span>Joined {new Date(user.createdAt).toLocaleDateString()}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-surface-800">
              <p className="text-xs text-surface-500">Profile URL</p>
              <p className="text-sm text-accent-400 truncate">{data.url}</p>
            </div>
            <Link to="/login" className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-medium transition-colors text-sm">
              <Bot size={16} /> Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
