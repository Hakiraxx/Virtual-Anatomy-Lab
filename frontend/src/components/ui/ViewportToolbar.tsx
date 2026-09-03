import React, { useState } from 'react';
import {
  RotateCcw,
  Compass,
  Ruler,
  Scissors,
  Tag,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const ViewportToolbar: React.FC = () => {
  const setCameraPreset = useAnatomyStore((s) => s.setCameraPreset);
  const activeTool = useAnatomyStore((s) => s.activeTool);
  const setActiveTool = useAnatomyStore((s) => s.setActiveTool);
  const showLabels = useAnatomyStore((s) => s.showLabels);
  const toggleLabels = useAnatomyStore((s) => s.toggleLabels);
  const crossSection = useAnatomyStore((s) => s.crossSection);
  const setCrossSection = useAnatomyStore((s) => s.setCrossSection);
  const clearMeasurement = useAnatomyStore((s) => s.clearMeasurement);

  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showSlicePanel, setShowSlicePanel] = useState(false);

  return (
    <>
      {/* Slicing Controls Popup (When Slice Tool Active or Toggled) */}
      {showSlicePanel && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-rose-500/40 p-4 rounded-2xl backdrop-blur-xl shadow-2xl z-30 w-80 select-none animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <Scissors className="w-4 h-4" />
              <span>Mặt Cắt Giải Phẫu (Cross Section)</span>
            </div>
            <button
              onClick={() => {
                setCrossSection({ x: 0, y: 0, z: 0 });
              }}
              className="text-[10px] text-slate-400 hover:text-rose-300"
            >
              Đặt lại
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Sagittal Plane (X) */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Mặt cắt đứng dọc (Sagittal - X)</span>
                <span className="font-mono text-rose-400">{crossSection.x.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.05"
                value={crossSection.x}
                onChange={(e) => setCrossSection({ x: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>

            {/* Axial Plane (Y) */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Mặt cắt ngang (Axial - Y)</span>
                <span className="font-mono text-rose-400">{crossSection.y.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="2.5"
                step="0.05"
                value={crossSection.y}
                onChange={(e) => setCrossSection({ y: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>

            {/* Coronal Plane (Z) */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Mặt cắt đứng ngang (Coronal - Z)</span>
                <span className="font-mono text-rose-400">{crossSection.z.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.05"
                value={crossSection.z}
                onChange={(e) => setCrossSection({ z: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Camera Preset Popup */}
      {showViewMenu && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-slate-800 p-2 rounded-2xl backdrop-blur-xl shadow-2xl z-30 grid grid-cols-3 gap-1.5 text-xs w-72 select-none">
          {[
            { id: 'front', label: 'Trước (Front)' },
            { id: 'back', label: 'Sau (Back)' },
            { id: 'left', label: 'Trái (Left)' },
            { id: 'right', label: 'Phải (Right)' },
            { id: 'top', label: 'Đỉnh (Top)' },
            { id: 'bottom', label: 'Dưới (Bottom)' }
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setCameraPreset(v.id);
                setShowViewMenu(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/50 text-slate-200 text-center font-medium transition"
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Bottom Toolbar */}
      <nav className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/85 border border-slate-800/90 px-3 py-1.5 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-1.5 z-20 select-none">
        {/* Reset Camera */}
        <button
          onClick={() => setCameraPreset('reset')}
          className="p-2 text-slate-300 hover:text-cyan-400 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
          title="Đặt lại góc nhìn"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* View Angles Popup Trigger */}
        <button
          onClick={() => setShowViewMenu(!showViewMenu)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
            showViewMenu
              ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/30'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Góc nhìn</span>
          <ChevronUp className="w-3 h-3" />
        </button>

        <div className="w-px h-5 bg-slate-800 my-auto mx-1" />

        {/* Tool: Inspect */}
        <button
          onClick={() => {
            setActiveTool('inspect');
            setShowSlicePanel(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
            activeTool === 'inspect'
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Khám phá</span>
        </button>

        {/* Tool: Measure */}
        <button
          onClick={() => {
            if (activeTool === 'measure') {
              setActiveTool('inspect');
              clearMeasurement();
            } else {
              setActiveTool('measure');
              setShowSlicePanel(false);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
            activeTool === 'measure'
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Ruler className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Thước đo 3D</span>
        </button>

        {/* Tool: Cross-Section Slicing */}
        <button
          onClick={() => {
            const next = !showSlicePanel;
            setShowSlicePanel(next);
            setActiveTool(next ? 'slice' : 'inspect');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
            activeTool === 'slice' || showSlicePanel
              ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-sm shadow-rose-500/20'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Scissors className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden sm:inline">Mặt cắt</span>
        </button>

        {/* Toggle 3D Labels */}
        <button
          onClick={toggleLabels}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
            showLabels
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
          title="Bật/tắt nhãn chú thích 3D"
        >
          <Tag className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Nhãn 3D</span>
        </button>
      </nav>
    </>
  );
};
