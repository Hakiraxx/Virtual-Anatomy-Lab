import React, { useState } from 'react';
import {
  RotateCcw,
  Compass,
  Eye,
  EyeOff,
  Sparkles,
  Maximize2,
  Tag,
  Activity,
  Layers,
  ChevronDown,
  Search
} from 'lucide-react';
import { useDigestiveStore, DigestiveCameraPreset } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

interface DigestiveToolbarProps {
  showLabels: boolean;
  onToggleLabels: () => void;
  onFitView?: () => void;
}

export const DigestiveToolbar: React.FC<DigestiveToolbarProps> = ({
  showLabels,
  onToggleLabels,
  onFitView
}) => {
  const selectedOrganId = useDigestiveStore((s) => s.selectedOrganId);
  const isolatedView = useDigestiveStore((s) => s.isolatedView);
  const toggleIsolatedView = useDigestiveStore((s) => s.toggleIsolatedView);
  const xrayMode = useDigestiveStore((s) => s.xrayMode);
  const toggleXrayMode = useDigestiveStore((s) => s.toggleXrayMode);
  const cameraPreset = useDigestiveStore((s) => s.cameraPreset);
  const setCameraPreset = useDigestiveStore((s) => s.setCameraPreset);
  const resetView = useDigestiveStore((s) => s.resetView);
  const visibleLayers = useDigestiveStore((s) => s.visibleLayers);
  const toggleLayer = useDigestiveStore((s) => s.toggleLayer);

  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  const [showAnglesMenu, setShowAnglesMenu] = useState(false);
  const [showLayersMenu, setShowLayersMenu] = useState(false);

  // Anatomical camera angle presets
  const angles: Array<{
    id: DigestiveCameraPreset;
    labelVi: string;
    subVi: string;
  }> = [
    { id: 'overview', labelVi: 'Trước (Anterior)', subVi: 'Mặt trước trực diện' },
    { id: 'posterior', labelVi: 'Sau (Posterior)', subVi: 'Mặt sau & Cột sống' },
    { id: 'hepatobiliary', labelVi: 'Nghiêng Phải (Right)', subVi: 'Quan sát Gan & Mật' },
    { id: 'gastroduodenal', labelVi: 'Thượng Vị (Epigastric)', subVi: 'Dạ dày & Tá tràng' },
    { id: 'pancreas', labelVi: 'Sau Phúc Mạc (Retroperitoneal)', subVi: 'Khối Tụy & Mạch' },
    { id: 'colorectal', labelVi: 'Hạ Vị (Pelvic)', subVi: 'Khung Đại tràng' }
  ];

  return (
    <div
      data-ui="bottom-toolbar"
      className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-auto max-w-[96vw] pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* 1. Pop-up Panel: Anatomical View Angles */}
      {showAnglesMenu && (
        <div
          className={`flex items-center gap-1.5 p-2 rounded-2xl border shadow-2xl backdrop-blur-xl animate-fade-in ${
            isDark
              ? 'bg-slate-950/95 border-slate-800 text-slate-200'
              : 'bg-white/95 border-[#e7ded3] text-slate-800'
          }`}
        >
          {angles.map((ang) => (
            <button
              key={ang.id}
              onClick={() => {
                setCameraPreset(ang.id);
                setShowAnglesMenu(false);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                cameraPreset === ang.id
                  ? 'bg-amber-600 text-white font-bold'
                  : 'hover:bg-amber-500/10 hover:text-amber-500 text-slate-600 dark:text-slate-300'
              }`}
            >
              {ang.labelVi}
            </button>
          ))}
        </div>
      )}

      {/* 2. Pop-up Panel: Quick Layer Visibility Toggles */}
      {showLayersMenu && (
        <div
          className={`flex flex-col gap-1.5 p-3 rounded-2xl border shadow-2xl backdrop-blur-xl animate-fade-in text-xs w-64 ${
            isDark
              ? 'bg-slate-950/95 border-slate-800 text-slate-200'
              : 'bg-white/95 border-[#e7ded3] text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-inherit font-semibold text-[11px] uppercase tracking-wider text-slate-400">
            <span>Lớp giải phẫu 3D</span>
            <button
              onClick={() => setShowLayersMenu(false)}
              className="text-slate-400 hover:text-current px-1 font-bold"
            >
              ✕
            </button>
          </div>

          <label className="flex items-center justify-between cursor-pointer py-1">
            <span>Ống tiêu hóa chính</span>
            <input
              type="checkbox"
              checked={visibleLayers.giTract}
              onChange={() => toggleLayer('giTract')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span>Gan & Đường mật</span>
            <input
              type="checkbox"
              checked={visibleLayers.hepatobiliary}
              onChange={() => toggleLayer('hepatobiliary')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span>Tụy & Ống tụy</span>
            <input
              type="checkbox"
              checked={visibleLayers.pancreas}
              onChange={() => toggleLayer('pancreas')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span>Mạch máu tạng</span>
            <input
              type="checkbox"
              checked={visibleLayers.vasculature}
              onChange={() => toggleLayer('vasculature')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span>Phúc mạc & Mạc nối</span>
            <input
              type="checkbox"
              checked={visibleLayers.peritoneum}
              onChange={() => toggleLayer('peritoneum')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>
        </div>
      )}

      {/* 3. Main Floating Pill Toolbar */}
      <div
        className={`rounded-full border backdrop-blur-md shadow-2xl px-2.5 py-1.5 flex items-center gap-1.5 transition-colors duration-200 ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-200'
            : 'bg-white/90 border-[#e7ded3] text-slate-800'
        }`}
      >
        {/* Reset Camera View */}
        <button
          onClick={resetView}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer text-slate-500 hover:text-current"
          title="Đặt lại toàn bộ góc nhìn và lựa chọn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Fit to View */}
        {onFitView && (
          <button
            onClick={onFitView}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer text-slate-500 hover:text-current"
            title="Căn vừa khung hình (Fit to View)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5" />

        {/* Anatomical Camera Angles Selector */}
        <button
          onClick={() => {
            setShowAnglesMenu(!showAnglesMenu);
            setShowLayersMenu(false);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition cursor-pointer ${
            showAnglesMenu
              ? 'bg-amber-600 border-amber-500 text-white font-bold'
              : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
          }`}
          title="Chọn hướng quan sát giải phẫu chuẩn"
        >
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Góc nhìn</span>
          <ChevronDown className="w-2.5 h-2.5 opacity-60" />
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5" />

        {/* Focus vs Isolate Toggle */}
        <div className="flex items-center p-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-inherit">
          <button
            onClick={() => {
              if (isolatedView) toggleIsolatedView();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition cursor-pointer ${
              !isolatedView
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-500 hover:text-current'
            }`}
            title="Quan sát giải phẫu toàn thể"
          >
            <Search className="w-3 h-3" />
            <span className="hidden sm:inline">Toàn thể</span>
          </button>
          <button
            onClick={() => {
              if (!isolatedView && selectedOrganId) toggleIsolatedView();
            }}
            disabled={!selectedOrganId}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition ${
              !selectedOrganId
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : isolatedView
                ? 'bg-amber-600 text-white font-bold shadow-sm cursor-pointer'
                : 'text-slate-500 hover:text-current cursor-pointer'
            }`}
            title="Cô lập quan sát riêng cơ quan đang chọn"
          >
            <Eye className="w-3 h-3" />
            <span>Cô lập</span>
          </button>
        </div>

        {/* X-Ray Mode */}
        <button
          onClick={toggleXrayMode}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition cursor-pointer ${
            xrayMode
              ? 'bg-sky-600 border-sky-400 text-white font-bold shadow-sm'
              : 'border-transparent text-slate-500 hover:text-current'
          }`}
          title="Chế độ xuyên thấu mô mềm X-Ray"
        >
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span>X-Ray</span>
        </button>

        {/* 3D Anatomical Pin Labels Toggle */}
        <button
          onClick={onToggleLabels}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition cursor-pointer ${
            showLabels
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-current'
          }`}
          title="Bật / Tắt nhãn định danh các cơ quan"
        >
          <Tag className="w-3 h-3" />
          <span className="hidden sm:inline">Nhãn 3D</span>
        </button>

        {/* Layers Popdown Trigger */}
        <button
          onClick={() => {
            setShowLayersMenu(!showLayersMenu);
            setShowAnglesMenu(false);
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] border transition cursor-pointer ${
            showLayersMenu
              ? 'bg-amber-600 border-amber-500 text-white font-bold'
              : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 hover:text-current'
          }`}
          title="Mở menu quản lý lớp giải phẫu"
        >
          <Layers className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden md:inline">Lớp</span>
          <ChevronDown className="w-2.5 h-2.5 opacity-60" />
        </button>
      </div>
    </div>
  );
};
