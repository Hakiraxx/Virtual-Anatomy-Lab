import React, { useState } from 'react';
import {
  Search,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  RotateCcw,
  Maximize2,
  ScanLine,
  Sliders,
  Compass,
  Gauge,
  HelpCircle,
  Scissors
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const SmartFocusToolbar: React.FC = () => {
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const focusMode = useAnatomyStore((s) => s.focusMode);
  const setFocusMode = useAnatomyStore((s) => s.setFocusMode);
  const isIsolated = useAnatomyStore((s) => s.isIsolated);
  const setIsIsolated = useAnatomyStore((s) => s.setIsIsolated);
  const explodeFactor = useAnatomyStore((s) => s.explodeFactor);
  const setExplodeFactor = useAnatomyStore((s) => s.setExplodeFactor);
  const autoRotate = useAnatomyStore((s) => s.autoRotate);
  const toggleAutoRotate = useAnatomyStore((s) => s.toggleAutoRotate);
  const autoRotateSpeed = useAnatomyStore((s) => s.autoRotateSpeed);
  const setAutoRotateSpeed = useAnatomyStore((s) => s.setAutoRotateSpeed);
  const cameraAnglePreset = useAnatomyStore((s) => s.cameraAnglePreset);
  const setCameraAnglePreset = useAnatomyStore((s) => s.setCameraAnglePreset);
  const showHotspots = useAnatomyStore((s) => s.showHotspots);
  const toggleShowHotspots = useAnatomyStore((s) => s.toggleShowHotspots);
  const crossSection = useAnatomyStore((s) => s.crossSection);
  const setCrossSection = useAnatomyStore((s) => s.setCrossSection);
  const isLayersActive = useAnatomyStore((s) => s.isLayersActive);
  const toggleLayers = useAnatomyStore((s) => s.toggleLayers);
  const selectedStructureId = useAnatomyStore((s) => s.selectedStructureId);
  const viewMode = useAnatomyStore((s) => s.viewMode);

  const [showAnglesMenu, setShowAnglesMenu] = useState(false);
  const [showExplodeSlider, setShowExplodeSlider] = useState(false);
  const [showSectionControls, setShowSectionControls] = useState(false);

  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  const angles = [
    { id: 'anterior', labelVi: 'Nhìn trước (Anterior)', labelEn: 'Anterior' },
    { id: 'posterior', labelVi: 'Nhìn sau (Posterior)', labelEn: 'Posterior' },
    { id: 'superior', labelVi: 'Nhìn trên (Superior)', labelEn: 'Superior' },
    { id: 'inferior', labelVi: 'Nhìn dưới (Inferior)', labelEn: 'Inferior' },
    { id: 'left', labelVi: 'Nhìn trái (Left lateral)', labelEn: 'Left lateral' },
    { id: 'right', labelVi: 'Nhìn phải (Right lateral)', labelEn: 'Right lateral' }
  ];

  return (
    <div className="absolute bottom-3 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-auto max-w-[95vw]">
      {/* 1. Pop-up Panel: Exploded View Slider */}
      {showExplodeSlider && (
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-2xl border shadow-xl backdrop-blur-md animate-fade-in ${
            isDark
              ? 'bg-slate-900/95 border-slate-800 text-slate-200'
              : 'bg-white/95 border-[#e7ded3] text-slate-800'
          }`}
        >
          <span className="text-xs font-serif font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
            {isVi ? 'Bung lớp giải phẫu (Explode)' : 'Exploded View'}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={explodeFactor}
            onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
            className="w-36 sm:w-48 accent-amber-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono font-bold w-10 text-right">
            {Math.round(explodeFactor * 100)}%
          </span>
          {explodeFactor > 0 && (
            <button
              onClick={() => setExplodeFactor(0)}
              className="text-[11px] text-slate-400 hover:text-amber-500 underline ml-1 cursor-pointer"
            >
              {isVi ? 'Đóng lại' : 'Reset'}
            </button>
          )}
        </div>
      )}

      {/* 2. Pop-up Panel: Cross-Section 3D Sliders */}
      {showSectionControls && (
        <div
          className={`flex flex-col gap-2 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md animate-fade-in text-xs ${
            isDark
              ? 'bg-slate-900/95 border-slate-800 text-slate-200'
              : 'bg-white/95 border-[#e7ded3] text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between font-serif font-bold text-amber-600 dark:text-amber-400">
            <span>{isVi ? 'Mặt cắt giải phẫu 3 chiều' : '3D Cross-section Planes'}</span>
            <button
              onClick={() => setCrossSection({ enabled: !crossSection.enabled })}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition ${
                crossSection.enabled ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
              }`}
            >
              {crossSection.enabled ? (isVi ? 'ĐANG BẬT' : 'ON') : (isVi ? 'TẮT' : 'OFF')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 font-mono">Trục X (Mặt phẳng đứng dọc)</span>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.05"
                value={crossSection.x}
                onChange={(e) => setCrossSection({ x: parseFloat(e.target.value), enabled: true })}
                className="w-24 accent-amber-600 h-1 cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 font-mono">Trục Y (Mặt phẳng nằm ngang)</span>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.05"
                value={crossSection.y}
                onChange={(e) => setCrossSection({ y: parseFloat(e.target.value), enabled: true })}
                className="w-24 accent-amber-600 h-1 cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 font-mono">Trục Z (Mặt phẳng đứng ngang)</span>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.05"
                value={crossSection.z}
                onChange={(e) => setCrossSection({ z: parseFloat(e.target.value), enabled: true })}
                className="w-24 accent-amber-600 h-1 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Pop-up Panel: Anatomical View Angles */}
      {showAnglesMenu && (
        <div
          className={`flex items-center gap-1.5 p-2 rounded-2xl border shadow-xl backdrop-blur-md animate-fade-in ${
            isDark
              ? 'bg-slate-900/95 border-slate-800 text-slate-200'
              : 'bg-white/95 border-[#e7ded3] text-slate-800'
          }`}
        >
          {angles.map((ang) => (
            <button
              key={ang.id}
              onClick={() => {
                setCameraAnglePreset(ang.id as any);
                setShowAnglesMenu(false);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                cameraAnglePreset === ang.id
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'hover:bg-amber-500/10 hover:text-amber-500'
              }`}
            >
              {isVi ? ang.labelVi : ang.labelEn}
            </button>
          ))}
        </div>
      )}

      {/* 4. Main Smart Focus Toolbar */}
      <div
        className={`flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full border shadow-2xl backdrop-blur-md text-xs font-medium transition overflow-x-auto max-w-[94vw] scrollbar-none flex-nowrap ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-200'
            : 'bg-white/90 border-[#e7ded3] text-slate-800'
        }`}
      >
        {/* Tiêu điểm (Focus) vs Tách biệt (Isolate) Mode Toggle */}
        <div className="flex items-center p-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-inherit">
          <button
            onClick={() => setIsIsolated(false)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition cursor-pointer ${
              !isIsolated
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-500 hover:text-current'
            }`}
            title="Tập trung vào cơ quan nhưng vẫn giữ mờ môi trường xung quanh"
          >
            <Search className="w-3 h-3" />
            <span>{isVi ? 'Tiêu điểm' : 'Focus'}</span>
          </button>
          <button
            onClick={() => setIsIsolated(true)}
            disabled={!selectedStructureId}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition ${
              !selectedStructureId
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : isIsolated
                ? 'bg-amber-600 text-white font-bold shadow-sm cursor-pointer'
                : 'text-slate-500 hover:text-current cursor-pointer'
            }`}
            title={
              selectedStructureId
                ? (isVi ? 'Chỉ hiển thị duy nhất cơ quan đang chọn' : 'Isolate selected structure')
                : (isVi ? 'Chọn một cơ quan để bật chế độ tách biệt' : 'Select a structure to isolate')
            }
          >
            <Eye className="w-3 h-3" />
            <span>{isVi ? 'Tách biệt' : 'Isolate'}</span>
          </button>
        </div>

        {/* Dim vs Hide Surroundings (Only when in Focus mode) */}
        {!isIsolated && (
          <button
            onClick={() => setFocusMode(focusMode === 'dim' ? 'hide' : 'dim')}
            className={`px-2.5 py-1 rounded-full text-[11px] border transition cursor-pointer ${
              focusMode === 'hide'
                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                : 'border-transparent text-slate-500 hover:text-current'
            }`}
            title={focusMode === 'dim' ? 'Làm mờ xung quanh (15%)' : 'Ẩn hoàn toàn xung quanh (0%)'}
          >
            {focusMode === 'dim' ? (isVi ? 'Làm mờ' : 'Dim') : (isVi ? 'Ẩn quanh' : 'Hide')}
          </button>
        )}

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5" />

        {/* BÓC TÁCH LỚP (LAYERS) BUTTON - EXACT MATCH TO IMAGE 2 */}
        <button
          onClick={toggleLayers}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition cursor-pointer ${
            isLayersActive
              ? 'bg-[#c05a4e] text-white font-bold shadow-md'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
          }`}
          title="Bóc tách từng lớp giải phẫu / Sợi cơ & Mạch máu vi thể (Layers)"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isVi ? 'Bóc tách lớp' : 'Layers'}</span>
        </button>

        {/* Bung lớp (Explode) Trigger */}
        <button
          onClick={() => {
            if (viewMode === 'full-body' && !selectedStructureId) return;
            setShowExplodeSlider(!showExplodeSlider);
            setShowAnglesMenu(false);
            setShowSectionControls(false);
          }}
          disabled={viewMode === 'full-body' && !selectedStructureId}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition ${
            viewMode === 'full-body' && !selectedStructureId
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : explodeFactor > 0 || showExplodeSlider
              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 cursor-pointer'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 cursor-pointer'
          }`}
          title={
            viewMode === 'full-body' && !selectedStructureId
              ? (isVi ? 'Chọn một cơ quan để bung tách cấu trúc con' : 'Select an organ to explode sub-structures')
              : (isVi ? 'Bung tách các cấu trúc con ra ngoài' : 'Explode sub-structures')
          }
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isVi ? 'Bung lớp' : 'Explode'}</span>
          {explodeFactor > 0 && <span className="font-mono text-[10px]">({Math.round(explodeFactor * 100)}%)</span>}
        </button>

        {/* Mặt cắt 3D (Section) Trigger */}
        <button
          onClick={() => {
            setShowSectionControls(!showSectionControls);
            setShowExplodeSlider(false);
            setShowAnglesMenu(false);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition cursor-pointer ${
            crossSection.enabled || showSectionControls
              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
          }`}
          title="Cắt lát 3 chiều"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isVi ? 'Mặt cắt' : 'Section'}</span>
        </button>

        {/* Góc nhìn y khoa chuẩn (Anatomical Angles) */}
        <button
          onClick={() => {
            setShowAnglesMenu(!showAnglesMenu);
            setShowExplodeSlider(false);
            setShowSectionControls(false);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition cursor-pointer ${
            showAnglesMenu
              ? 'bg-amber-500/20 text-amber-500'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
          }`}
          title="Các góc nhìn giải phẫu kinh điển (Trước, Sau, Trên, Dưới, Trái, Phải)"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isVi ? 'Góc nhìn' : 'Angles'}</span>
        </button>

        {/* 3D Pins Nhãn Mốc Giải Phẫu */}
        <button
          onClick={toggleShowHotspots}
          className={`p-1.5 rounded-full transition cursor-pointer ${
            showHotspots
              ? 'text-amber-500 bg-amber-500/15'
              : 'text-slate-400 hover:text-current'
          }`}
          title={showHotspots ? 'Ẩn các điểm mốc giải phẫu' : 'Hiện các điểm mốc giải phẫu'}
        >
          {showHotspots ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5" />

        {/* Tự xoay quanh tâm vật thể */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={toggleAutoRotate}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition cursor-pointer ${
              autoRotate
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-500'
            }`}
            title="Tự động xoay 360 độ quanh tiêu bản"
          >
            <RotateCcw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isVi ? 'Tự xoay' : 'Rotate'}</span>
          </button>

          {autoRotate && (
            <button
              onClick={() => {
                const nextSpeed =
                  autoRotateSpeed === 'slow'
                    ? 'normal'
                    : autoRotateSpeed === 'normal'
                    ? 'fast'
                    : 'slow';
                setAutoRotateSpeed(nextSpeed);
              }}
              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/10 dark:bg-white/10 uppercase cursor-pointer"
              title="Tốc độ tự xoay"
            >
              {autoRotateSpeed}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
