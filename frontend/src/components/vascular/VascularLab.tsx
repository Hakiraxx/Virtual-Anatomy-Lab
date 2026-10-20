import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Heart,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  X
} from 'lucide-react';
import { Vascular3DStage } from './Vascular3DStage';
import { VascularTree } from './VascularTree';
import { VascularInfoPanel } from './VascularInfoPanel';
import { VascularSectionSwitcher } from './VascularSectionSwitcher';
import { useVascularStore } from '../../stores/useVascularStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const VascularLab: React.FC = () => {
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const isVi = language === 'vi';

  const {
    selectedVesselId,
    sidebarWidth,
    panelWidth,
    setSidebarWidth,
    setPanelWidth
  } = useVascularStore();

  // Desktop sidebars toggle state
  const [isTreeOpen, setIsTreeOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') return window.innerWidth >= 1200;
    return true;
  });
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') return window.innerWidth >= 1440;
    return true;
  });

  // Responsive state
  const [isCompact, setIsCompact] = useState<boolean>(() => {
    if (typeof window !== 'undefined') return window.innerWidth < 1200;
    return false;
  });

  // Mobile drawer open state
  const [mobileDrawer, setMobileDrawer] = useState<'none' | 'tree' | 'info'>('none');

  useEffect(() => {
    const handleResize = () => {
      const compact = window.innerWidth < 1200;
      setIsCompact(compact);
      if (compact) {
        setIsTreeOpen(false);
        setIsInfoOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync initial vessel from URL if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('vessel') || params.get('structure');
      if (v) {
        useVascularStore.getState().selectVessel(v);
      }
    }
  }, []);

  // Drag handler for Left Tree Splitter
  const handleTreeSplitterPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const delta = moveEvt.clientX - startX;
      setSidebarWidth(startWidth + delta);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Drag handler for Right Info Splitter
  const handleInfoSplitterPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelWidth;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const delta = startX - moveEvt.clientX;
      setPanelWidth(startWidth + delta);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div
      data-ui="vascular-lab-master"
      className={`w-full h-[calc(100dvh-64px)] min-h-[500px] flex flex-col overflow-hidden select-none transition-colors ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#faf6f0] text-slate-800'
      }`}
    >
      {/* 1. SUB-HEADER BAR (Row 2): Module Title, Medical Citation & Quick Toggles */}
      <div
        className={`flex items-center justify-between px-3 sm:px-4 py-2 border-b flex-shrink-0 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-[#e2d6c6]'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30 flex-shrink-0">
            <Heart className="w-4 h-4 animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-tight text-slate-100 uppercase truncate">
                {isVi ? 'Phòng Thí Nghiệm Giải Phẫu Hệ Mạch Máu 3D' : '3D Vascular Anatomy Lab'}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex-shrink-0">
                100 Chi Tiết (TA2)
              </span>
            </div>

            <div className="text-[10px] text-slate-400 truncate hidden sm:block">
              {isVi
                ? 'Mô hình Z-Anatomy CC BY-SA 4.0 • 676 mesh mạch máu thực tế • Chuẩn Terminologia Anatomica'
                : 'Z-Anatomy CC BY-SA 4.0 • 676 Segmented Meshes • Terminologia Anatomica 2'}
            </div>
          </div>
        </div>

        {/* Action Controls Right */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Toggle Tree Sidebar */}
          <button
            onClick={() => {
              if (isCompact) {
                setMobileDrawer(mobileDrawer === 'tree' ? 'none' : 'tree');
              } else {
                setIsTreeOpen(!isTreeOpen);
              }
            }}
            className={`p-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              (isCompact ? mobileDrawer === 'tree' : isTreeOpen)
                ? 'bg-amber-600/20 text-amber-400 border-amber-500/30'
                : 'text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
            }`}
            title="Đóng / Mở cây danh mục mạch máu"
          >
            {isTreeOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          {/* Toggle Info Panel */}
          <button
            onClick={() => {
              if (isCompact) {
                setMobileDrawer(mobileDrawer === 'info' ? 'none' : 'info');
              } else {
                setIsInfoOpen(!isInfoOpen);
              }
            }}
            className={`p-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              (isCompact ? mobileDrawer === 'info' : isInfoOpen)
                ? 'bg-amber-600/20 text-amber-400 border-amber-500/30'
                : 'text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
            }`}
            title="Đóng / Mở bảng thông tin hồ sơ y khoa"
          >
            {isInfoOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. SECTION SWITCHER STRIP (Row 3): 10 Vascular Regions */}
      <VascularSectionSwitcher />

      {/* 3. MAIN WORKSPACE (3 Columns with Resizable Splitters) */}
      <main className="relative flex-1 w-full flex overflow-hidden">
        {/* Left Tree Column (Desktop) */}
        {!isCompact && isTreeOpen && (
          <div
            style={{ width: `${sidebarWidth}px` }}
            className="h-full flex-shrink-0 flex"
          >
            <div className="flex-1 h-full overflow-hidden">
              <VascularTree />
            </div>

            {/* Drag Splitter Handle */}
            <div
              onPointerDown={handleTreeSplitterPointerDown}
              className="w-1.5 h-full cursor-col-resize hover:bg-amber-500/50 active:bg-amber-500 transition-colors bg-slate-800/60 flex-shrink-0"
              title="Kéo sang trái/phải để điều chỉnh độ rộng cây phân cấp"
            />
          </div>
        )}

        {/* Center 3D Viewport Column */}
        <div className="relative flex-1 h-full min-w-0 overflow-hidden flex flex-col">
          <Vascular3DStage />
        </div>

        {/* Right Info Column (Desktop) */}
        {!isCompact && isInfoOpen && (
          <div
            style={{ width: `${panelWidth}px` }}
            className="h-full flex-shrink-0 flex"
          >
            {/* Drag Splitter Handle */}
            <div
              onPointerDown={handleInfoSplitterPointerDown}
              className="w-1.5 h-full cursor-col-resize hover:bg-amber-500/50 active:bg-amber-500 transition-colors bg-slate-800/60 flex-shrink-0"
              title="Kéo sang trái/phải để điều chỉnh độ rộng bảng thông tin"
            />

            <div className="flex-1 h-full overflow-hidden">
              <VascularInfoPanel />
            </div>
          </div>
        )}

        {/* Mobile / Tablet Drawer Modals */}
        {isCompact && mobileDrawer !== 'none' && (
          <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm">
            <div
              className="relative w-full max-w-[360px] h-full shadow-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: isDark ? '#0b0f19' : '#faf6f0' }}
            >
              {/* Close Button Header */}
              <div className="flex items-center justify-between p-2 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400">
                  {mobileDrawer === 'tree' ? 'Danh mục 100 Mạch Máu' : 'Hồ Sơ Mạch Máu'}
                </span>
                <button
                  onClick={() => setMobileDrawer('none')}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                {mobileDrawer === 'tree' ? <VascularTree /> : <VascularInfoPanel />}
              </div>
            </div>

            {/* Backdrop click to close */}
            <div
              className="flex-1 h-full cursor-pointer"
              onClick={() => setMobileDrawer('none')}
            />
          </div>
        )}
      </main>
    </div>
  );
};
