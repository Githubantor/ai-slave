import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('admin@aicompany.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.1),transparent_50%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center mb-4">
              <Bot size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">AI Company OS</h1>
            <p className="text-surface-400 text-sm mt-1">Sign in to your workspace</p>
          </div>
          {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-surface-400 mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="input-field pl-10" required />
              </div>
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="input-field pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-white">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-surface-600 bg-surface-800" />
                <span className="text-xs text-surface-400">Remember me</span>
              </label>
              <button type="button" className="text-xs text-accent-400 hover:text-accent-300">Forgot password?</button>
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full">{isLoading ? 'Signing in...' : 'Sign In'}</button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-glass-border" /></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs text-surface-400 bg-surface-900">or continue with</span></div>
          </div>
          <button onClick={() => { loginWithGoogle(); navigate('/'); }} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 glass glass-hover rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className="text-sm">Continue with Google</span>
          </button>
          <p className="text-center text-xs text-surface-400 mt-6">
            Don't have an account? <button onClick={() => navigate('/register')} className="text-accent-400 hover:text-accent-300">Create one</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.1),transparent_50%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center mb-4">
              <Bot size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Create Account</h1>
            <p className="text-surface-400 text-sm mt-1">Start your AI Company OS journey</p>
          </div>
          {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">{error}</div>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs text-surface-400 mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Alex Founder" className="input-field" required />
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="input-field pl-10" required />
              </div>
            </div>
            <div>
              <label className="block text-xs text-surface-400 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" className="input-field pl-10" required />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full">{isLoading ? 'Creating account...' : 'Create Account'}</button>
          </form>
          <p className="text-center text-xs text-surface-400 mt-6">
            Already have an account? <button onClick={() => navigate('/login')} className="text-accent-400 hover:text-accent-300">Sign in</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
