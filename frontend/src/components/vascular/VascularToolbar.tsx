import React, { useState, useRef, useEffect } from 'react';
import {
  RotateCcw,
  Focus,
  Eye,
  EyeOff,
  Layers,
  Compass,
  Tag,
  ChevronUp
} from 'lucide-react';
import { useVascularStore } from '../../stores/useVascularStore';

export interface VascularToolbarProps {
  onSetCameraAngle: (angle: 'front' | 'back' | 'left' | 'right' | 'top') => void;
}

export const VascularToolbar: React.FC<VascularToolbarProps> = ({ onSetCameraAngle }) => {
  const {
    isolatedView,
    toggleIsolatedView,
    xrayMode,
    toggleXrayMode,
    showLabels,
    toggleLabels,
    resetView,
    triggerCameraFocus,
    typeFilter,
    setTypeFilter
  } = useVascularStore();

  const [showAnglesMenu, setShowAnglesMenu] = useState(false);
  const anglesMenuRef = useRef<HTMLDivElement>(null);

  // Close angles menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (anglesMenuRef.current && !anglesMenuRef.current.contains(e.target as Node)) {
        setShowAnglesMenu(false);
      }
    };
    if (showAnglesMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAnglesMenu]);

  return (
    <div
      data-ui="vascular-floating-toolbar"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto"
    >
      {/* Angles Popup Menu */}
      {showAnglesMenu && (
        <div
          ref={anglesMenuRef}
          className="mb-1 p-1.5 bg-slate-900/95 border border-slate-800 rounded-lg shadow-xl backdrop-blur-md flex items-center gap-1 text-xs"
        >
          <button
            onClick={() => {
              onSetCameraAngle('front');
              setShowAnglesMenu(false);
            }}
            className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-medium transition-colors"
          >
            Mặt Trước
          </button>
          <button
            onClick={() => {
              onSetCameraAngle('back');
              setShowAnglesMenu(false);
            }}
            className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-medium transition-colors"
          >
            Mặt Sau
          </button>
          <button
            onClick={() => {
              onSetCameraAngle('left');
              setShowAnglesMenu(false);
            }}
            className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-medium transition-colors"
          >
            Bên Trái
          </button>
          <button
            onClick={() => {
              onSetCameraAngle('right');
              setShowAnglesMenu(false);
            }}
            className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-medium transition-colors"
          >
            Bên Phải
          </button>
          <button
            onClick={() => {
              onSetCameraAngle('top');
              setShowAnglesMenu(false);
            }}
            className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded font-medium transition-colors"
          >
            Nhìn Trên
          </button>
        </div>
      )}

      {/* Main Floating Bar */}
      <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 bg-slate-900/95 border border-slate-800/90 rounded-lg shadow-xl backdrop-blur-md text-xs">
        {/* Reset */}
        <button
          onClick={resetView}
          className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          title="Đặt lại góc nhìn tổng quan"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Đặt lại</span>
        </button>

        {/* Focus / Fit */}
        <button
          onClick={triggerCameraFocus}
          className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          title="Định vị camera vào cấu trúc đang chọn"
        >
          <Focus className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Tiêu cự</span>
        </button>

        <div className="h-4 w-px bg-slate-800" />

        {/* Angles Selector */}
        <button
          onClick={() => setShowAnglesMenu(!showAnglesMenu)}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
            showAnglesMenu ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Chọn góc nhìn chuẩn giải phẫu"
        >
          <Compass className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Góc nhìn</span>
          <ChevronUp className="w-3 h-3 opacity-60" />
        </button>

        <div className="h-4 w-px bg-slate-800" />

        {/* Isolate Mode */}
        <button
          onClick={toggleIsolatedView}
          className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition-colors ${
            isolatedView
              ? 'bg-amber-600 text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Chế độ cô lập: chỉ hiện mạch máu đang chọn"
        >
          {isolatedView ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 opacity-70" />}
          <span className="hidden sm:inline">Cô lập</span>
        </button>

        {/* X-Ray Mode */}
        <button
          onClick={toggleXrayMode}
          className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition-colors ${
            xrayMode
              ? 'bg-cyan-600 text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Chế độ X-Ray nhìn thấu toàn bộ hệ mạch"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">X-Ray</span>
        </button>

        {/* 3D Labels Toggle */}
        <button
          onClick={toggleLabels}
          className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition-colors ${
            showLabels
              ? 'bg-slate-800 text-amber-300 font-semibold border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="Bật/Tắt nhãn tên giải phẫu trên mô hình"
        >
          <Tag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nhãn 3D</span>
        </button>

        <div className="h-4 w-px bg-slate-800" />

        {/* Type Filter Pills (Artery / Vein / Heart) */}
        <div className="flex items-center gap-0.5 bg-slate-950/80 p-0.5 rounded border border-slate-800/80">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              typeFilter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setTypeFilter('artery')}
            className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              typeFilter === 'artery' ? 'bg-red-600 text-white' : 'text-red-400 hover:text-red-300'
            }`}
            title="Chỉ lọc các Động mạch"
          >
            ĐM
          </button>
          <button
            onClick={() => setTypeFilter('vein')}
            className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              typeFilter === 'vein' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-blue-300'
            }`}
            title="Chỉ lọc các Tĩnh mạch & Xoang"
          >
            TM
          </button>
        </div>
      </div>
    </div>
  );
};
