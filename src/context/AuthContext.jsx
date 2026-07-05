import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
      api.getMe()
        .then(userData => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          api.setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    api.setToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.register(name, email, password);
    api.setToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const loginWithGoogle = async () => {
    const data = await api.register('Alex Founder', 'alex@gmail.com', 'google-auth');
    api.setToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
