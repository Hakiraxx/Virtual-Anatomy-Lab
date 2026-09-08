import React, { useState } from 'react';
import {
  Compass,
  BrainCircuit,
  BookOpen,
  Repeat2,
  NotebookPen,
  Search,
  Globe,
  MonitorPlay,
  Sun,
  Moon,
  ChevronDown,
  PanelLeftOpen,
  Menu,
  X
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useAuthStore } from '../../stores/useAuthStore';

import { GenderSwitcher } from '../ui/GenderSwitcher';
import { ViewModeSwitcher } from '../ui/ViewModeSwitcher';

export const AtelierTopBar: React.FC = () => {
  const language = useAnatomyStore((s) => s.language);
  const setLanguage = useAnatomyStore((s) => s.setLanguage);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const setAtelierTheme = useAnatomyStore((s) => s.setAtelierTheme);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const viewMode = useAnatomyStore((s) => s.viewMode);
  const isTreeOpen = useAnatomyStore((s) => s.isTreeOpen);
  const toggleTreeOpen = useAnatomyStore((s) => s.toggleTreeOpen);
  const { user } = useAuthStore();

  const [showMobileNav, setShowMobileNav] = useState(false);

  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setAtelierTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header
      data-ui="top-header"
      className={`h-16 px-3 sm:px-4 lg:px-6 flex items-center justify-between border-b select-none transition-colors duration-200 z-30 ${
        isDark
          ? 'bg-[#0f141c] border-slate-800 text-slate-100'
          : 'bg-[#f7f0e7] border-[#e7ded3] text-[#28231d]'
      }`}
    >
      {/* Brand & Wordmark + Mobile Sidebar Trigger */}
      <div className="flex items-center gap-2 sm:gap-3">
        {viewMode === 'full-body' && (
          <button
            onClick={toggleTreeOpen}
            className="lg:hidden p-2 rounded-xl text-amber-700 dark:text-amber-400 hover:bg-black/5 dark:hover:bg-white/5 border border-[#e7ded3] dark:border-slate-800 cursor-pointer transition min-w-[38px] min-h-[38px] flex items-center justify-center"
            title="Mở cây giải phẫu"
            aria-label="Mở cây giải phẫu"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => setActiveModal(null)}
          className="text-left flex flex-col group cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-current whitespace-nowrap">
              MedAnatomy
            </span>
            <sup className="text-amber-600 font-serif text-xs font-normal">✦</sup>
          </div>
          <em className="hidden sm:inline text-[11px] not-italic text-slate-500 dark:text-slate-400 font-serif -mt-0.5">
            {isVi ? 'Biết vị trí, biết bệnh học' : 'Know the place, know the disease'}
          </em>
        </button>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="hidden xl:flex items-center gap-1">
        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
            isDark
              ? 'bg-slate-800 text-white'
              : 'bg-[#ede3d5] text-[#28231d] shadow-sm font-semibold'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#c05a4e]" />
          <span>{isVi ? 'Khám phá' : 'Explore'}</span>
        </button>

        <button
          onClick={() => setActiveModal('dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-80 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5 text-slate-400" />
          <span>{isVi ? 'Hệ cơ quan' : 'Systems'}</span>
        </button>

        <button
          onClick={() => setActiveModal('lessons')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-80 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>{isVi ? 'Bài học' : 'Lessons'}</span>
        </button>

        <button
          onClick={() => setActiveModal('flashcards')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-80 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          <Repeat2 className="w-3.5 h-3.5 text-slate-400" />
          <span>{isVi ? 'Ôn tập' : 'Revision'}</span>
        </button>

        <button
          onClick={() => setActiveModal('notes')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-80 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          <NotebookPen className="w-3.5 h-3.5 text-slate-400" />
          <span>{isVi ? 'Ghi chú' : 'Notes'}</span>
        </button>
      </nav>

      {/* Center ViewMode & Gender Switcher Controls */}
      <div className="flex items-center gap-2">
        <ViewModeSwitcher />
        <GenderSwitcher />
      </div>

      {/* Center Search Trigger */}
      <div className="flex-1 max-w-xs mx-4 hidden xl:block">
        <button
          onClick={() => setActiveModal('search')}
          className={`w-full h-8 px-3 rounded-full flex items-center justify-between text-xs border transition ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-400'
              : 'bg-[#ede3d5]/70 border-[#e3d7c7] text-slate-600 hover:border-amber-600/40'
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">
              {isVi ? 'Tìm kiếm cơ quan, bệnh lý…' : 'Search organs, topics…'}
            </span>
          </div>
          <kbd className="text-[10px] font-mono px-1 rounded bg-black/5 dark:bg-white/10 text-slate-500">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Tools & Language Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Compact Search Trigger for screens < xl */}
        <button
          onClick={() => setActiveModal('search')}
          className="xl:hidden p-2 rounded-full border border-[#e7ded3] dark:border-slate-700 text-slate-500 hover:text-amber-600 hover:bg-black/5 dark:hover:bg-white/5 transition min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
          title="Tìm kiếm cơ quan (Ctrl+K)"
          aria-label="Tìm kiếm"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Language Selector */}
        <div
          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer min-h-[36px] ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-200'
              : 'bg-[#ede3d5]/60 border-[#e3d7c7] text-slate-800'
          }`}
          onClick={() => setLanguage(isVi ? 'en' : 'vi')}
          title="Đổi ngôn ngữ"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">{isVi ? 'Tiếng Việt' : 'English'}</span>
          <span className="sm:hidden">{isVi ? 'VI' : 'EN'}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>

        {/* Dark / Light Atelier Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full border transition min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
              : 'bg-[#ede3d5]/60 border-[#e3d7c7] text-slate-700 hover:bg-[#e4d6c4]'
          }`}
          title={isDark ? 'Chế độ phòng trưng bày (Light)' : 'Chế độ tối (Dark)'}
          aria-label="Đổi giao diện Sáng / Tối"
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Lecture / Quiz Mode */}
        <button
          onClick={() => setActiveModal('quiz')}
          className={`p-2 rounded-full border transition hidden sm:flex min-w-[36px] min-h-[36px] items-center justify-center cursor-pointer ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-300'
              : 'bg-[#ede3d5]/60 border-[#e3d7c7] text-slate-700 hover:bg-[#e4d6c4]'
          }`}
          title="Chế độ kiểm tra y khoa"
          aria-label="Kiểm tra y khoa"
        >
          <MonitorPlay className="w-3.5 h-3.5" />
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => setActiveModal(user ? 'dashboard' : 'auth')}
          className="flex items-center gap-1 pl-0.5 cursor-pointer min-h-[36px]"
          title="Tài khoản học tập"
          aria-label="Tài khoản"
        >
          <div className="w-7 h-7 rounded-full bg-[#c05a4e] text-white font-bold text-xs flex items-center justify-center shadow-sm">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'MA'}
          </div>
          <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
        </button>

        {/* Mobile / Tablet Extra Navigation Drawer Toggle */}
        <button
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="xl:hidden p-2 rounded-xl text-slate-500 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 border border-inherit min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
          title="Menu tài nguyên"
          aria-label="Menu tài nguyên"
        >
          {showMobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile / Tablet Resources Navigation Overlay */}
      {showMobileNav && (
        <div
          className={`xl:hidden absolute top-16 left-0 right-0 p-4 border-b shadow-2xl backdrop-blur-xl z-40 space-y-2 animate-fade-in ${
            isDark
              ? 'bg-[#0f141c]/95 border-slate-800 text-slate-100'
              : 'bg-[#f7f0e7]/95 border-[#e7ded3] text-[#28231d]'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium">
            <button
              onClick={() => {
                setActiveModal(null);
                setShowMobileNav(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-inherit hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#c05a4e]" />
              <span>{isVi ? 'Khám phá' : 'Explore'}</span>
            </button>
            <button
              onClick={() => {
                setActiveModal('dashboard');
                setShowMobileNav(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-inherit hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4 text-amber-500" />
              <span>{isVi ? 'Hệ cơ quan' : 'Systems'}</span>
            </button>
            <button
              onClick={() => {
                setActiveModal('lessons');
                setShowMobileNav(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-inherit hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span>{isVi ? 'Bài học' : 'Lessons'}</span>
            </button>
            <button
              onClick={() => {
                setActiveModal('flashcards');
                setShowMobileNav(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-inherit hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
            >
              <Repeat2 className="w-4 h-4 text-emerald-500" />
              <span>{isVi ? 'Ôn tập' : 'Revision'}</span>
            </button>
            <button
              onClick={() => {
                setActiveModal('notes');
                setShowMobileNav(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-inherit hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
            >
              <NotebookPen className="w-4 h-4 text-purple-500" />
              <span>{isVi ? 'Ghi chú' : 'Notes'}</span>
            </button>
            <button
              onClick={() => {
                setActiveModal('quiz');
                setShowMobileNav(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-inherit hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
            >
              <MonitorPlay className="w-4 h-4 text-rose-500" />
              <span>{isVi ? 'Kiểm tra' : 'Quiz'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
