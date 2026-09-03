import React from 'react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const GenderSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const gender = useAnatomyStore((s) => s.gender);
  const setGender = useAnatomyStore((s) => s.setGender);
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  const isVi = language === 'vi';

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border shadow-sm select-none transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-300'
          : 'bg-[#ede3d5] border-[#dfd4c4] text-[#28231d]'
      }`}
    >
      <button
        onClick={() => setGender('male')}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
          gender === 'male'
            ? 'bg-sky-600 text-white shadow-md'
            : 'hover:text-sky-600 dark:hover:text-sky-400 opacity-75 hover:opacity-100'
        }`}
        title="Giải phẫu học Cơ thể Nam (Male Anatomy)"
      >
        <span className="text-sm">♂</span>
        {!compact && <span>{isVi ? 'Nam' : 'Male'}</span>}
      </button>

      <button
        onClick={() => setGender('female')}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
          gender === 'female'
            ? 'bg-rose-600 text-white shadow-md'
            : 'hover:text-rose-600 dark:hover:text-rose-400 opacity-75 hover:opacity-100'
        }`}
        title="Giải phẫu học Cơ thể Nữ (Female Anatomy)"
      >
        <span className="text-sm">♀</span>
        {!compact && <span>{isVi ? 'Nữ' : 'Female'}</span>}
      </button>
    </div>
  );
};
