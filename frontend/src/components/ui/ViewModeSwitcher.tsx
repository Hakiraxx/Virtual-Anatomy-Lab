import React from 'react';
import { User, Sparkles } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const ViewModeSwitcher: React.FC = () => {
  const viewMode = useAnatomyStore((s) => s.viewMode);
  const setViewMode = useAnatomyStore((s) => s.setViewMode);
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  const isVi = language === 'vi';

  return (
    <div
      className={`hidden sm:inline-flex items-center p-0.5 rounded-full border shadow-sm select-none transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-300'
          : 'bg-[#ede3d5] border-[#dfd4c4] text-[#28231d]'
      }`}
    >
      <button
        onClick={() => setViewMode('full-body')}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
          viewMode === 'full-body'
            ? 'bg-amber-600 text-white shadow-md'
            : 'hover:text-amber-600 dark:hover:text-amber-400 opacity-75 hover:opacity-100'
        }`}
        title="Mô hình giải phẫu toàn cơ thể người 3D"
      >
        <User className="w-3.5 h-3.5" />
        <span>{isVi ? 'Toàn thân' : 'Full Body'}</span>
      </button>

      <button
        onClick={() => setViewMode('specimen')}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
          viewMode === 'specimen'
            ? 'bg-amber-600 text-white shadow-md'
            : 'hover:text-amber-600 dark:hover:text-amber-400 opacity-75 hover:opacity-100'
        }`}
        title="Tiêu bản chuyên sâu 59 cơ quan giải phẫu"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{isVi ? 'Tiêu bản sâu' : 'Specimens'}</span>
      </button>
    </div>
  );
};
