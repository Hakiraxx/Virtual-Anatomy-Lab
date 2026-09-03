import React, { useState } from 'react';
import {
  Layers,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Activity,
  Heart,
  Wind,
  Zap,
  Utensils,
  Bone,
  Droplets,
  Sparkles,
  Shield,
  Users
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

const iconMap: Record<string, React.ReactNode> = {
  cardiovascular: <Heart className="w-3.5 h-3.5" />,
  respiratory: <Wind className="w-3.5 h-3.5" />,
  nervous: <Zap className="w-3.5 h-3.5" />,
  digestive: <Utensils className="w-3.5 h-3.5" />,
  skeletal: <Bone className="w-3.5 h-3.5" />,
  muscular: <Activity className="w-3.5 h-3.5" />,
  urinary: <Droplets className="w-3.5 h-3.5" />,
  endocrine: <Sparkles className="w-3.5 h-3.5" />,
  lymphatic: <Shield className="w-3.5 h-3.5" />,
  reproductive: <Users className="w-3.5 h-3.5" />,
  integumentary: <Layers className="w-3.5 h-3.5" />
};

export const SidebarSystems: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const systems = useAnatomyStore((s) => s.systems);
  const systemVisibility = useAnatomyStore((s) => s.systemVisibility);
  const toggleSystemVisibility = useAnatomyStore((s) => s.toggleSystemVisibility);
  const setAllSystemsVisibility = useAnatomyStore((s) => s.setAllSystemsVisibility);
  const layerDepth = useAnatomyStore((s) => s.layerDepth);
  const setLayerDepth = useAnatomyStore((s) => s.setLayerDepth);
  const transparency = useAnatomyStore((s) => s.transparency);
  const setTransparency = useAnatomyStore((s) => s.setTransparency);

  if (isCollapsed) {
    return (
      <div className="absolute top-16 left-3 z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2.5 bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-cyan-400 rounded-xl backdrop-blur-md shadow-xl transition"
          title="Mở bảng hệ cơ quan"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <aside className="absolute top-16 left-3 bottom-16 w-72 bg-slate-950/85 border border-slate-800/80 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col z-20 select-none overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Hệ Cơ Quan (Systems)
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAllSystemsVisibility(true)}
            className="p-1 text-[11px] text-slate-400 hover:text-cyan-300 rounded hover:bg-slate-800"
            title="Hiện tất cả"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setAllSystemsVisibility(false)}
            className="p-1 text-[11px] text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800"
            title="Ẩn tất cả"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 ml-1"
            title="Thu gọn"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Layer Depth & Transparency Sliders */}
      <div className="p-3 bg-slate-900/50 border-b border-slate-800/70 space-y-3">
        {/* Depth Slider */}
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-cyan-400" /> Độ sâu giải phẫu (Depth)
            </span>
            <span className="font-mono text-cyan-400">{Math.round(layerDepth * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={layerDepth}
            onChange={(e) => setLayerDepth(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[9px] text-slate-500 mt-0.5 font-mono">
            <span>Da / Nông</span>
            <span>Cơ / Xương</span>
            <span>Nội tạng sâu</span>
          </div>
        </div>

        {/* Transparency Slider */}
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-300 font-medium">Độ trong suốt (Transparency)</span>
            <span className="font-mono text-cyan-400">{transparency}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={transparency}
            onChange={(e) => setTransparency(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      {/* Systems List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {systems.map((system) => {
          const isVisible = systemVisibility[system.id] !== false;
          return (
            <div
              key={system.id}
              onClick={() => toggleSystemVisibility(system.id)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer transition-all border ${
                isVisible
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-cyan-500/30'
                  : 'bg-slate-950/40 border-transparent opacity-45 hover:opacity-70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: `${system.color}33`, color: system.color }}
                >
                  {iconMap[system.id] || <Activity className="w-3.5 h-3.5" />}
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-slate-200 truncate">
                    {system.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {system.nameEn}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => {}} // Handled by container click
                  className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
