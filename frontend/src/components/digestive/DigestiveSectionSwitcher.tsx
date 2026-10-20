import React from 'react';
import { Layers, Sparkles, HeartPulse, Compass, Activity, GitFork, Stethoscope } from 'lucide-react';
import { useDigestiveStore, DigestiveCameraPreset } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const DigestiveSectionSwitcher: React.FC = () => {
  const cameraPreset = useDigestiveStore((s) => s.cameraPreset);
  const setCameraPreset = useDigestiveStore((s) => s.setCameraPreset);
  const selectOrgan = useDigestiveStore((s) => s.selectOrgan);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  const sections: Array<{
    id: DigestiveCameraPreset;
    defaultOrganId: string | null;
    labelVi: string;
    subVi: string;
    icon: React.ReactNode;
    badge: string;
  }> = [
    {
      id: 'overview',
      defaultOrganId: null,
      labelVi: 'Toàn Cảnh Hệ Tiêu Hóa',
      subVi: 'Toàn bộ ống tiêu hóa & tạng',
      icon: <Layers className="w-3.5 h-3.5" />,
      badge: 'Tổng Thể'
    },
    {
      id: 'oral',
      defaultOrganId: 'tongue',
      labelVi: 'Miệng & Tuyến Nước Bọt',
      subVi: 'Lưỡi • Mang tai • Dưới hàm',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      badge: 'Miệng'
    },
    {
      id: 'gastroduodenal',
      defaultOrganId: 'stomach',
      labelVi: 'Dạ Dày & Tá Tràng',
      subVi: 'Tâm vị • Môn vị • Tá tràng',
      icon: <HeartPulse className="w-3.5 h-3.5" />,
      badge: 'Thượng Vị'
    },
    {
      id: 'hepatobiliary',
      defaultOrganId: 'liver',
      labelVi: 'Gan & 8 Phân Thùy Couinaud',
      subVi: 'Túi mật • Ống mật chủ • Cửa',
      icon: <Compass className="w-3.5 h-3.5" />,
      badge: 'Gan - Mật'
    },
    {
      id: 'pancreas',
      defaultOrganId: 'pancreas',
      labelVi: 'Tụy & Ống Tụy Wirsung',
      subVi: 'Đầu • Thân • Đuôi tụy',
      icon: <Activity className="w-3.5 h-3.5" />,
      badge: 'Nội - Ngoại Tiết'
    },
    {
      id: 'small_bowel',
      defaultOrganId: 'small_intestine',
      labelVi: 'Ruột Non & Hỗng - Hồi Tràng',
      subVi: 'Mạc treo ruột & Nhu động',
      icon: <GitFork className="w-3.5 h-3.5" />,
      badge: 'Hấp Thu'
    },
    {
      id: 'colorectal',
      defaultOrganId: 'large_intestine',
      labelVi: 'Đại Tràng & Ruột Thừa',
      subVi: 'Manh tràng • McBurney • Trực tràng',
      icon: <Stethoscope className="w-3.5 h-3.5" />,
      badge: 'Đại - Trực Tràng'
    }
  ];

  const handleSelect = (sec: typeof sections[0]) => {
    setCameraPreset(sec.id);
    if (sec.defaultOrganId) {
      selectOrgan(sec.defaultOrganId);
    } else {
      selectOrgan(null);
    }
  };

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md shadow-lg transition overflow-x-auto max-w-full scrollbar-none flex-nowrap ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-white/90 border-[#e7ded3] text-slate-800'
      }`}
    >
      {sections.map((s) => {
        const isActive = cameraPreset === s.id;
        return (
          <button
            key={s.id}
            onClick={() => handleSelect(s)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex-shrink-0 relative ${
              isActive
                ? 'bg-amber-600 text-white font-bold shadow-md scale-[1.02]'
                : isDark
                ? 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                : 'hover:bg-[#ede3d5]/70 text-slate-600 hover:text-[#28231d]'
            }`}
          >
            <div className={isActive ? 'text-white' : 'text-amber-500'}>{s.icon}</div>
            <div className="text-left flex flex-col leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-semibold whitespace-nowrap">{s.labelVi}</span>
                {s.badge && (
                  <span
                    className={`text-[8px] font-mono px-1 py-0.2 rounded uppercase font-bold whitespace-nowrap ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isDark
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {s.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-sans truncate ${
                  isActive ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {s.subVi}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
