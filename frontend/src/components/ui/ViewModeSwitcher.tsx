import React from 'react';
import { User, Sparkles, Brain, Apple } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const ViewModeSwitcher: React.FC = () => {
  const viewMode = useAnatomyStore((s) => s.viewMode);
  const setViewMode = useAnatomyStore((s) => s.setViewMode);
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  const isVi = language === 'vi';

  return (
    <div
      role="tablist"
      aria-label="Chế độ xem giải phẫu"
      className={`inline-flex items-center p-0.5 rounded-lg border shadow-sm select-none transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-300'
          : 'bg-[#ede3d5] border-[#dfd4c4] text-[#28231d]'
      }`}
    >
      <button
        role="tab"
        aria-selected={viewMode === 'full-body'}
        onClick={() => setViewMode('full-body')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
          viewMode === 'full-body'
            ? 'bg-amber-600 text-white shadow-sm'
            : 'hover:text-amber-600 dark:hover:text-amber-400 opacity-75 hover:opacity-100'
        }`}
        title="Mô hình giải phẫu toàn cơ thể người 3D"
      >
        <User className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{isVi ? 'Toàn thân' : 'Full Body'}</span>
      </button>

      <button
        role="tab"
        aria-selected={viewMode === 'digestive'}
        onClick={() => setViewMode('digestive')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
          viewMode === 'digestive'
            ? 'bg-amber-600 text-white shadow-sm'
            : 'hover:text-amber-600 dark:hover:text-amber-400 opacity-75 hover:opacity-100'
        }`}
        title="Phòng thí nghiệm Hệ Tiêu Hóa 3D tương tác (Z-Anatomy CC BY-SA 4.0)"
      >
        <Apple className="w-3.5 h-3.5 text-amber-300" />
        <span className="hidden sm:inline">{isVi ? 'Hệ Tiêu Hóa' : 'Digestive'}</span>
      </button>

      <button
        role="tab"
        aria-selected={viewMode === 'dental-neuro'}
        onClick={() => setViewMode('dental-neuro')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none ${
          viewMode === 'dental-neuro'
            ? 'bg-rose-600 text-white shadow-sm'
            : 'hover:text-rose-500 dark:hover:text-rose-400 opacity-75 hover:opacity-100'
        }`}
        title="Phòng thí nghiệm Giải phẫu Thần kinh Đầu — Cổ — Hàm Mặt & Răng Hàm Mặt"
      >
        <Brain className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{isVi ? 'Sọ Mặt & RHM' : 'Craniofacial'}</span>
      </button>

      <button
        role="tab"
        aria-selected={viewMode === 'specimen'}
        onClick={() => setViewMode('specimen')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
          viewMode === 'specimen'
            ? 'bg-amber-600 text-white shadow-sm'
            : 'hover:text-amber-600 dark:hover:text-amber-400 opacity-75 hover:opacity-100'
        }`}
        title="Tiêu bản chuyên sâu 59 cơ quan giải phẫu"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{isVi ? 'Tiêu bản sâu' : 'Specimens'}</span>
      </button>
    </div>
  );
};
