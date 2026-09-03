import { create } from 'zustand';
import { User } from '../types/anatomy';
import { api, getAuthToken, setAuthToken, removeAuthToken } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: getAuthToken(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.login(email, password);
      setAuthToken(data.token);
      set({ user: data.user, token: data.token, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Đăng nhập thất bại', isLoading: false });
      throw err;
    }
  },

  register: async (email, password, name, role) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.register(email, password, name, role);
      setAuthToken(data.token);
      set({ user: data.user, token: data.token, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Đăng ký thất bại', isLoading: false });
      throw err;
    }
  },

  logout: () => {
    removeAuthToken();
    set({ user: null, token: null, error: null });
  },

  checkAuth: async () => {
    const token = getAuthToken();
    if (!token) return;
    try {
      const data = await api.getMe();
      set({ user: data.user });
    } catch {
      removeAuthToken();
      set({ user: null, token: null });
    }
  },

  clearError: () => set({ error: null })
}));
