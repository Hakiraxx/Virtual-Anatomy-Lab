import React from 'react';
import { Brain, Sparkles, Activity, Scissors, Layers } from 'lucide-react';
import { useDentalNeuroStore, SpecimenMode } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';

const ToothIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C7.5 2 4 4.5 4 8c0 4.5 2 8 3 13 1 1 2.5 1 3.5 0l1.5-3 1.5 3c1 1 2.5 1 3.5 0 1-5 3-8.5 3-13 0-3.5-3.5-6-8-6z" />
  </svg>
);

export const DentalSpecimenSwitcher: React.FC = () => {
  const activeSpecimenMode = useDentalNeuroStore((s) => s.activeSpecimenMode);
  const setActiveSpecimenMode = useDentalNeuroStore((s) => s.setActiveSpecimenMode);
  const selectedToothFdi = useDentalNeuroStore((s) => s.selectedToothFdi);
  const wisdomToothId = useDentalNeuroStore((s) => s.wisdomToothId);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const modes: Array<{
    id: SpecimenMode;
    labelVi: string;
    subVi: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'general',
      labelVi: 'Tổng Thể Sọ Mặt',
      subVi: 'Xương & Nền Sọ',
      icon: <Brain className="w-3.5 h-3.5" />,
      badge: 'Nền Sọ'
    },
    {
      id: 'cranial_nerves',
      labelVi: 'Thần Kinh Sọ',
      subVi: 'CN V, VII & Dây TK',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      badge: 'Dây TK'
    },
    {
      id: 'tooth_specimen',
      labelVi: 'Tiêu Bản Răng FDI',
      subVi: `Men • Ngà • Tủy (R.${selectedToothFdi})`,
      icon: <ToothIcon className="w-3.5 h-3.5" />,
      badge: 'Nội Nha'
    },
    {
      id: 'tmj_specimen',
      labelVi: 'Khớp TDH & Cơ Nhai',
      subVi: 'Động Học & TMD',
      icon: <Activity className="w-3.5 h-3.5" />,
      badge: 'Đĩa Khớp'
    },
    {
      id: 'wisdom_surgery',
      labelVi: 'Phẫu Thuật Răng Khôn',
      subVi: `Winter & IAN (R.${wisdomToothId.replace('tooth_', '')})`,
      icon: <Scissors className="w-3.5 h-3.5" />,
      badge: 'Tiểu Phẫu'
    }
  ];

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md shadow-lg transition overflow-x-auto max-w-full scrollbar-none flex-nowrap ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-white/90 border-[#e7ded3] text-slate-800'
      }`}
    >
      {modes.map((m) => {
        const isActive = activeSpecimenMode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setActiveSpecimenMode(m.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex-shrink-0 relative ${
              isActive
                ? 'bg-amber-600 text-white font-bold shadow-md scale-[1.02]'
                : isDark
                ? 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                : 'hover:bg-[#ede3d5]/70 text-slate-600 hover:text-[#28231d]'
            }`}
          >
            <div className={isActive ? 'text-white' : 'text-amber-500'}>{m.icon}</div>
            <div className="text-left flex flex-col leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-semibold whitespace-nowrap">{m.labelVi}</span>
                {m.badge && (
                  <span
                    className={`text-[8px] font-mono px-1 py-0.2 rounded uppercase font-bold whitespace-nowrap ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {m.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-mono hidden sm:inline truncate max-w-[120px] ${
                  isActive ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {m.subVi}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
