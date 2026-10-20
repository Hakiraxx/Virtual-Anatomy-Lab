import React from 'react';
import {
  Search,
  BookOpen,
  HelpCircle,
  Layers,
  BarChart3,
  User as UserIcon,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useAuthStore } from '../../stores/useAuthStore';

export const Navbar: React.FC = () => {
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const { user, logout } = useAuthStore();

  return (
    <header className="h-14 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-white font-serif">
              MedAnatomy 3D
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
              Medical EdTech
            </span>
          </div>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            Learn Anatomy by Exploring the Human Body
          </p>
        </div>
      </div>

      {/* Central Quick Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setActiveModal('search')}
          className="w-full h-9 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 rounded-xl px-3 flex items-center justify-between text-xs text-slate-400 transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span>Tìm kiếm cơ quan, cấu trúc, thuật ngữ Latin…</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Action Navigation Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile Search Button */}
        <button
          onClick={() => setActiveModal('search')}
          className="md:hidden p-2 text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition"
          title="Tìm kiếm giải phẫu"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Lessons */}
        <button
          onClick={() => setActiveModal('lessons')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Bài học</span>
        </button>

        {/* Quiz */}
        <button
          onClick={() => setActiveModal('quiz')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-emerald-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Kiểm tra</span>
        </button>

        {/* Flashcards */}
        <button
          onClick={() => setActiveModal('flashcards')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-amber-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Flashcards</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => setActiveModal('dashboard')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-purple-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition"
        >
          <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Tiến độ</span>
        </button>

        {/* User Profile / Auth */}
        {user ? (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <button
              onClick={() => setActiveModal('dashboard')}
              className="flex items-center gap-2 text-left"
              title={user.name}
            >
              <div className="w-7 h-7 rounded-full bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <div className="text-xs font-medium text-slate-200 truncate max-w-[110px]">
                  {user.name}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">
                  {user.role}
                </div>
              </div>
            </button>
            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
              title="Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveModal('auth')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </button>
        )}
      </div>
    </header>
  );
};
