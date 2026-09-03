import React, { useState } from 'react';
import { User, X, Lock, Mail, UserPlus, LogIn, Check, AlertCircle } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useAuthStore } from '../../stores/useAuthStore';

export const AuthModal: React.FC = () => {
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const { login, register, error, clearError, isLoading } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'TEACHER'>('STUDENT');

  if (activeModal !== 'auth') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, name, role);
      }
      setActiveModal(null);
    } catch {
      // Error handled by store
    }
  };

  const fillDemo = (demoType: 'student' | 'teacher') => {
    if (demoType === 'student') {
      setEmail('student@medanatomy.edu.vn');
      setPassword('medical2026');
    } else {
      setEmail('teacher@medanatomy.edu.vn');
      setPassword('medical2026');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                {mode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Tạo Tài Khoản Học Tập'}
              </h2>
              <div className="text-[11px] text-slate-400">
                Truy cập hồ sơ ghi chú, tiến độ và đánh giá giải phẫu
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 text-xs font-semibold bg-slate-950/40">
          <button
            onClick={() => {
              setMode('login');
              clearError();
            }}
            className={`flex-1 py-3 text-center transition border-b-2 ${
              mode === 'login'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              setMode('register');
              clearError();
            }}
            className={`flex-1 py-3 text-center transition border-b-2 ${
              mode === 'register'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Họ và tên</label>
              <input
                type="text"
                required
                placeholder="Bs. Nguyễn Văn A..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email trường Y</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@medanatomy.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Vai trò</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('STUDENT')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                    role === 'STUDENT'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Sinh viên Y khoa
                </button>
                <button
                  type="button"
                  onClick={() => setRole('TEACHER')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                    role === 'TEACHER'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Giảng viên bộ môn
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition disabled:opacity-50"
          >
            {isLoading
              ? 'Đang xử lý...'
              : mode === 'login'
              ? 'Đăng nhập ngay'
              : 'Tạo tài khoản mới'}
          </button>

          {/* Quick Demo Credentials */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 text-center mb-2 font-medium">
              Hoặc thử nghiệm nhanh với tài khoản mẫu:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('student')}
                className="py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-cyan-300 font-medium transition"
              >
                Sinh viên mẫu (Y4)
              </button>
              <button
                type="button"
                onClick={() => fillDemo('teacher')}
                className="py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-purple-300 font-medium transition"
              >
                Giảng viên mẫu (PGS)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
