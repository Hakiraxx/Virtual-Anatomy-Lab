import React from 'react';
import {
  Layers,
  Heart,
  Brain,
  Shield,
  Activity,
  Wind,
  Disc,
  Filter,
  Flame,
  Zap
} from 'lucide-react';
import { useVascularStore } from '../../stores/useVascularStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { VascularRegion, VASCULAR_REGIONS } from '../../data/vascularSystemData';

export const VascularSectionSwitcher: React.FC = () => {
  const activeRegion = useVascularStore((s) => s.activeRegion);
  const setActiveRegion = useVascularStore((s) => s.setActiveRegion);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  const items: Array<{
    id: VascularRegion | 'all';
    labelVi: string;
    count: number;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      id: 'all',
      labelVi: 'Tất cả 100 chi tiết',
      count: 100,
      icon: <Layers className="w-3.5 h-3.5" />,
      color: '#f59e0b'
    },
    {
      id: 'aorta_great_vessels',
      labelVi: 'ĐM Chủ & Mạch Lớn',
      count: 8,
      icon: <Flame className="w-3.5 h-3.5" />,
      color: '#ef4444'
    },
    {
      id: 'coronary',
      labelVi: 'Tuần Hoàn Vành & Tim',
      count: 10,
      icon: <Heart className="w-3.5 h-3.5" />,
      color: '#f97316'
    },
    {
      id: 'carotid_head_neck',
      labelVi: 'Hệ Cảnh & Đầu Cổ',
      count: 11,
      icon: <Activity className="w-3.5 h-3.5" />,
      color: '#eab308'
    },
    {
      id: 'cerebral_circle_willis',
      labelVi: 'Vòng Não Willis',
      count: 11,
      icon: <Brain className="w-3.5 h-3.5" />,
      color: '#84cc16'
    },
    {
      id: 'dural_sinuses',
      labelVi: 'Xoang Màng Cứng',
      count: 8,
      icon: <Shield className="w-3.5 h-3.5" />,
      color: '#06b6d4'
    },
    {
      id: 'upper_limb',
      labelVi: 'Mạch Chi Trên',
      count: 12,
      icon: <Zap className="w-3.5 h-3.5" />,
      color: '#3b82f6'
    },
    {
      id: 'thoracic_pulmonary',
      labelVi: 'Lồng Ngực & Phổi',
      count: 8,
      icon: <Wind className="w-3.5 h-3.5" />,
      color: '#6366f1'
    },
    {
      id: 'abdominal_digestive',
      labelVi: 'Tạng Bụng & Hệ Cửa',
      count: 14,
      icon: <Disc className="w-3.5 h-3.5" />,
      color: '#a855f7'
    },
    {
      id: 'renal_retroperitoneal',
      labelVi: 'Mạch Thận & Sau PM',
      count: 8,
      icon: <Filter className="w-3.5 h-3.5" />,
      color: '#ec4899'
    },
    {
      id: 'pelvic_lower_limb',
      labelVi: 'Mạch Chậu & Chi Dưới',
      count: 10,
      icon: <Activity className="w-3.5 h-3.5" />,
      color: '#f43f5e'
    }
  ];

  return (
    <div
      role="tablist"
      aria-label="Phân vùng hệ mạch máu"
      className={`flex items-center gap-1 px-2 py-1.5 border-b overflow-x-auto max-w-full scrollbar-none flex-nowrap ${
        isDark
          ? 'bg-slate-950/95 border-slate-800 text-slate-300'
          : 'bg-[#f4ebe1] border-[#e2d6c6] text-slate-800'
      }`}
    >
      {items.map((item) => {
        const isActive = activeRegion === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveRegion(item.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
              isActive
                ? 'bg-amber-600 text-white shadow-sm'
                : 'hover:bg-slate-800/60 dark:hover:bg-slate-800/60 hover:text-white opacity-80 hover:opacity-100'
            }`}
          >
            <span style={{ color: isActive ? '#ffffff' : item.color }}>{item.icon}</span>
            <span className="whitespace-nowrap">{item.labelVi}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-mono ${
                isActive ? 'bg-amber-700/80 text-amber-100' : 'bg-slate-800/80 text-slate-400'
              }`}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
