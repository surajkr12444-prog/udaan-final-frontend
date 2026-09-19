import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { API_URL } from './api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  authProvider?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  loginWithGoogleCredential: (credential: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = 'udaan_token';
const USER_KEY = 'udaan_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(Boolean(token));

  const commitSession = (nextToken: string, nextUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  useEffect(() => {
    if (!token || !API_URL) {
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.success) throw new Error('Session expired');
        setUser(data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function loginWithGoogleCredential(credential: string) {
    if (!API_URL) throw new Error('VITE_API_URL is not configured');
    const response = await fetch(`${API_URL}/api/auth/google`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success || !data?.token) throw new Error(data?.message || 'Google sign-in failed');
    commitSession(data.token, data.user);
  }

  async function loginWithEmail(email: string, password: string) {
    if (!API_URL) throw new Error('VITE_API_URL is not configured');
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success || !data?.token) throw new Error(data?.message || 'Login failed');
    commitSession(data.token, data.user);
  }

  async function signupWithEmail(name: string, email: string, password: string) {
    if (!API_URL) throw new Error('VITE_API_URL is not configured');
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success || !data?.token) throw new Error(data?.message || 'Sign up failed');
    commitSession(data.token, data.user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ user, token, loading, loginWithGoogleCredential, loginWithEmail, signupWithEmail, logout }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function getStoredToken() { return localStorage.getItem(TOKEN_KEY); }
