import React from 'react';
import { Eye, EyeOff, Sliders, Layers } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { DISSECTION_LAYERS } from '../../data/anatomyHierarchy';

export const LayerController: React.FC = () => {
  const layerVisibility = useAnatomyStore((s) => s.layerVisibility);
  const layerOpacity = useAnatomyStore((s) => s.layerOpacity);
  const setLayerVisibility = useAnatomyStore((s) => s.setLayerVisibility);
  const setLayerOpacity = useAnatomyStore((s) => s.setLayerOpacity);
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  const isVi = language === 'vi';

  const toggleAll = (visible: boolean) => {
    DISSECTION_LAYERS.forEach((l) => setLayerVisibility(l.index, visible));
  };

  return (
    <div
      className={`p-3 rounded-2xl border shadow-xl backdrop-blur-md text-xs select-none transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-200'
          : 'bg-white/95 border-[#e7ded3] text-slate-800'
      }`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-inherit mb-2">
        <div className="flex items-center gap-1.5 font-serif font-bold text-amber-600 dark:text-amber-400">
          <Layers className="w-4 h-4" />
          <span>{isVi ? '8 Lớp Phẫu Tích Giải Phẫu' : '8 Dissection Layers'}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <button
            onClick={() => toggleAll(true)}
            className="px-2 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-current cursor-pointer"
          >
            {isVi ? 'Hiện hết' : 'Show all'}
          </button>
          <span>·</span>
          <button
            onClick={() => toggleAll(false)}
            className="px-2 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-current cursor-pointer"
          >
            {isVi ? 'Ẩn hết' : 'Hide all'}
          </button>
        </div>
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {DISSECTION_LAYERS.map((layer) => {
          const isVisible = layerVisibility[layer.index] ?? true;
          const opacity = layerOpacity[layer.index] ?? 1.0;

          return (
            <div
              key={layer.id}
              className={`p-2 rounded-xl border transition-all ${
                isVisible
                  ? isDark
                    ? 'bg-slate-800/50 border-slate-700/70'
                    : 'bg-[#faf6f0] border-[#e7ded3]'
                  : 'opacity-50 border-transparent hover:opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[11px] truncate">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e) => setLayerVisibility(layer.index, e.target.checked)}
                    className="w-3.5 h-3.5 accent-amber-600 rounded cursor-pointer"
                  />
                  <span className="truncate">{isVi ? layer.nameVi : layer.nameEn}</span>
                </label>

                <button
                  onClick={() => setLayerVisibility(layer.index, !isVisible)}
                  className="p-1 rounded text-slate-400 hover:text-current cursor-pointer"
                  title={isVisible ? 'Ẩn lớp' : 'Hiện lớp'}
                >
                  {isVisible ? <Eye className="w-3.5 h-3.5 text-amber-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Opacity Slider */}
              {isVisible && (
                <div className="flex items-center gap-2 mt-1.5 pt-1 border-t border-black/5 dark:border-white/5">
                  <Sliders className="w-3 h-3 text-slate-400" />
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setLayerOpacity(layer.index, parseFloat(e.target.value))}
                    className="w-full h-1 accent-amber-600 bg-slate-200 dark:bg-slate-700 rounded cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                    {Math.round(opacity * 100)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
