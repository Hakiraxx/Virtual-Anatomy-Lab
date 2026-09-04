import React, { useState } from 'react';
import {
  Search,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  RotateCcw,
  Compass,
  Scissors,
  Activity,
  Skull,
  Zap,
  ChevronDown
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const DentalNeuroToolbar: React.FC = () => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const isRadiographicView = useDentalNeuroStore((s) => s.isRadiographicView);
  const toggleRadiographicView = useDentalNeuroStore((s) => s.toggleRadiographicView);
  const isMandibularCanalMode = useDentalNeuroStore((s) => s.isMandibularCanalMode);
  const toggleMandibularCanalMode = useDentalNeuroStore((s) => s.toggleMandibularCanalMode);
  const clippingPlane = useDentalNeuroStore((s) => s.clippingPlane);
  const setClippingPlane = useDentalNeuroStore((s) => s.setClippingPlane);
  const resetAll = useDentalNeuroStore((s) => s.resetAll);
  const setCameraTarget = useDentalNeuroStore((s) => s.setCameraTarget);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const [showAnglesMenu, setShowAnglesMenu] = useState(false);
  const [showSectionControls, setShowSectionControls] = useState(false);
  const [isIsolated, setIsIsolated] = useState(false);

  // Anatomical camera angle presets focused on Craniofacial Root
  const angles = [
    {
      id: 'anterior',
      labelVi: 'Trước (Anterior)',
      position: [0.0, 1.33, 0.48] as [number, number, number],
      lookAt: [0.0, 1.33, 0.17] as [number, number, number]
    },
    {
      id: 'posterior',
      labelVi: 'Sau (Posterior)',
      position: [0.0, 1.33, -0.14] as [number, number, number],
      lookAt: [0.0, 1.33, 0.17] as [number, number, number]
    },
    {
      id: 'left',
      labelVi: 'Nghiêng Trái (Left)',
      position: [-0.31, 1.33, 0.17] as [number, number, number],
      lookAt: [0.0, 1.33, 0.17] as [number, number, number]
    },
    {
      id: 'right',
      labelVi: 'Nghiêng Phải (Right)',
      position: [0.31, 1.33, 0.17] as [number, number, number],
      lookAt: [0.0, 1.33, 0.17] as [number, number, number]
    },
    {
      id: 'superior',
      labelVi: 'Nền Sọ Trong (Superior)',
      position: [0.0, 1.64, 0.17] as [number, number, number],
      lookAt: [0.0, 1.33, 0.17] as [number, number, number]
    },
    {
      id: 'inferior',
      labelVi: 'Nền Sọ Ngoài (Inferior)',
      position: [0.0, 1.02, 0.17] as [number, number, number],
      lookAt: [0.0, 1.33, 0.17] as [number, number, number]
    }
  ];

  const handleAngleSelect = (a: typeof angles[0]) => {
    setCameraTarget(a.position, a.lookAt, 0.32);
    setShowAnglesMenu(false);
  };

  // Quick structure presets
  const quickFilters = [
    { label: 'CN V', id: 'cn_5' },
    { label: 'V1', id: 'cn_5_v1' },
    { label: 'V2', id: 'cn_5_v2' },
    { label: 'V3', id: 'cn_5_v3' },
    { label: 'IAN (Răng Dưới)', id: 'nerve_ian' },
    { label: 'CN VII (Mặt)', id: 'cn_7' },
    { label: 'Lỗ Cằm', id: 'mental_foramen' },
    { label: 'Lỗ Hàm Dưới', id: 'mandibular_foramen' }
  ];

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-auto max-w-[95vw]">
      {/* 1. Pop-up Panel: 3D Cross-Section Sliders */}
      {showSectionControls && (
        <div
          className={`flex flex-col gap-2.5 p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl animate-fade-in text-xs w-80 ${
            isDark
              ? 'bg-slate-950/90 border-slate-800 text-slate-200'
              : 'bg-white/95 border-[#e7ded3] text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between font-serif font-bold text-amber-600 dark:text-amber-400">
            <div className="flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" />
              <span>Mặt cắt sọ mặt 3 chiều</span>
            </div>
            <button
              onClick={() => setClippingPlane({ enabled: !clippingPlane.enabled })}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition ${
                clippingPlane.enabled
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {clippingPlane.enabled ? 'ĐANG BẬT' : 'TẮT'}
            </button>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Mặt phẳng đứng dọc (Sagittal - X)</span>
                <span>{clippingPlane.axis === 'x' ? clippingPlane.offset.toFixed(2) : '0.00'}</span>
              </div>
              <input
                type="range"
                min="-0.15"
                max="0.15"
                step="0.005"
                value={clippingPlane.axis === 'x' ? clippingPlane.offset : 0}
                onChange={(e) =>
                  setClippingPlane({
                    axis: 'x',
                    offset: parseFloat(e.target.value),
                    enabled: true
                  })
                }
                className="w-full accent-amber-600 h-1 cursor-pointer bg-slate-700 rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Mặt phẳng nằm ngang (Axial - Y)</span>
                <span>{clippingPlane.axis === 'y' ? clippingPlane.offset.toFixed(2) : '1.34'}</span>
              </div>
              <input
                type="range"
                min="1.20"
                max="1.50"
                step="0.005"
                value={clippingPlane.axis === 'y' ? clippingPlane.offset : 1.34}
                onChange={(e) =>
                  setClippingPlane({
                    axis: 'y',
                    offset: parseFloat(e.target.value),
                    enabled: true
                  })
                }
                className="w-full accent-amber-600 h-1 cursor-pointer bg-slate-700 rounded"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Mặt phẳng đứng ngang (Coronal - Z)</span>
                <span>{clippingPlane.axis === 'z' ? clippingPlane.offset.toFixed(2) : '0.17'}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.30"
                step="0.005"
                value={clippingPlane.axis === 'z' ? clippingPlane.offset : 0.17}
                onChange={(e) =>
                  setClippingPlane({
                    axis: 'z',
                    offset: parseFloat(e.target.value),
                    enabled: true
                  })
                }
                className="w-full accent-amber-600 h-1 cursor-pointer bg-slate-700 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Pop-up Panel: Anatomical View Angles */}
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
              onClick={() => handleAngleSelect(ang)}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer hover:bg-amber-500/10 hover:text-amber-500"
            >
              {ang.labelVi}
            </button>
          ))}
        </div>
      )}

      {/* 3. Secondary Quick Filter Strip */}
      <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800/80 backdrop-blur-md text-[11px] shadow-lg">
        <span className="text-[10px] font-mono uppercase text-amber-500 font-bold mr-1">
          Lối tắt:
        </span>
        {quickFilters.map((qf) => (
          <button
            key={qf.id}
            onClick={() => selectAnatomy(qf.id)}
            className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
              selectedAnatomyId === qf.id
                ? 'bg-amber-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {qf.label}
          </button>
        ))}
      </div>

      {/* 4. Main Shared-Token Bottom Toolbar */}
      <nav
        className={`flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full border shadow-2xl backdrop-blur-md text-xs font-medium transition overflow-x-auto max-w-[94vw] scrollbar-none flex-nowrap ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-200'
            : 'bg-white/90 border-[#e7ded3] text-slate-800'
        }`}
      >
        {/* Tiêu điểm (Focus) vs Tách biệt (Isolate) */}
        <div className="flex items-center p-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-inherit">
          <button
            onClick={() => setIsIsolated(false)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition cursor-pointer ${
              !isIsolated
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-500 hover:text-current'
            }`}
            title="Tập trung vào giải phẫu nhưng vẫn giữ mờ môi trường xung quanh"
          >
            <Search className="w-3 h-3" />
            <span>Tiêu điểm</span>
          </button>
          <button
            onClick={() => setIsIsolated(true)}
            disabled={!selectedAnatomyId}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition ${
              !selectedAnatomyId
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : isIsolated
                ? 'bg-amber-600 text-white font-bold shadow-sm cursor-pointer'
                : 'text-slate-500 hover:text-current cursor-pointer'
            }`}
            title="Chỉ hiển thị cấu trúc đang chọn"
          >
            <Eye className="w-3 h-3" />
            <span>Tách biệt</span>
          </button>
        </div>

        {/* Ống hàm dưới Mode (Isolated Mandible & IAN) */}
        <button
          onClick={toggleMandibularCanalMode}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition cursor-pointer ${
            isMandibularCanalMode
              ? 'bg-rose-600 border-rose-500 text-white font-bold shadow-sm animate-pulse'
              : 'border-transparent text-slate-500 hover:text-current'
          }`}
          title="Cô lập Xương hàm dưới, Ống răng dưới và Thần kinh IAN"
        >
          <Activity className="w-3 h-3 text-rose-400" />
          <span>Ống hàm dưới</span>
        </button>

        {/* Radiographic X-Ray */}
        <button
          onClick={toggleRadiographicView}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition cursor-pointer ${
            isRadiographicView
              ? 'bg-sky-600 border-sky-500 text-white font-bold shadow-sm'
              : 'border-transparent text-slate-500 hover:text-current'
          }`}
          title="Chế độ xuyên thấu xương Radiographic / X-Ray"
        >
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span>X-Ray</span>
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5" />

        {/* Mặt cắt giải phẫu 3D (Cross-section) */}
        <button
          onClick={() => {
            setShowSectionControls(!showSectionControls);
            setShowAnglesMenu(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition cursor-pointer ${
            clippingPlane.enabled || showSectionControls
              ? 'bg-[#c05a4e] text-white font-bold shadow-md'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
          }`}
          title="Cắt lớp 3 chiều (Sagittal, Axial, Coronal)"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Mặt cắt</span>
        </button>

        {/* Góc nhìn (Angles) */}
        <button
          onClick={() => {
            setShowAnglesMenu(!showAnglesMenu);
            setShowSectionControls(false);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition cursor-pointer ${
            showAnglesMenu
              ? 'bg-amber-600 text-white font-bold shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>Góc nhìn</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Đặt lại góc nhìn (Reset) */}
        <button
          onClick={resetAll}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-current transition cursor-pointer"
          title="Khôi phục góc nhìn ban đầu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </nav>
    </div>
  );
};
