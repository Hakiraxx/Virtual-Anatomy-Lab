import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Layers,
  Search,
  RotateCcw,
  Tag,
  HeartPulse,
  Compass,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  FileText,
  Activity,
  ChevronDown
} from 'lucide-react';
import { Digestive3DStage, CameraFocusTrigger } from './Digestive3DStage';
import { DigestiveTree } from './DigestiveTree';
import { DigestiveInfoPanel } from './DigestiveInfoPanel';
import { DigestiveToolbar } from './DigestiveToolbar';
import { DigestiveSectionSwitcher } from './DigestiveSectionSwitcher';
import { AnatomyInfoCard } from '../ui/AnatomyInfoCard';
import {
  DIGESTIVE_STRUCTURE_LIST,
  DIGESTIVE_SYSTEM_DATA,
  DigestiveOrganData
} from '../../data/digestiveSystemData';
import { useDigestiveStore, DigestiveCameraPreset } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const DigestiveLab: React.FC = () => {
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const setViewMode = useAnatomyStore((s) => s.setViewMode);
  const isVi = language === 'vi';

  // Store bindings
  const selectedOrganId = useDigestiveStore((s) => s.selectedOrganId);
  const selectOrgan = useDigestiveStore((s) => s.selectOrgan);
  const visibleLayers = useDigestiveStore((s) => s.visibleLayers);
  const toggleLayer = useDigestiveStore((s) => s.toggleLayer);
  const cameraPreset = useDigestiveStore((s) => s.cameraPreset);
  const setCameraPreset = useDigestiveStore((s) => s.setCameraPreset);
  const resetView = useDigestiveStore((s) => s.resetView);

  // Local UI state
  const [showLabels, setShowLabels] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDepthMenuOpen, setIsDepthMenuOpen] = useState(false);
  const [focusTrigger, setFocusTrigger] = useState<CameraFocusTrigger | null>(null);

  // Resizable sidebar widths with localStorage persistence
  const [treeWidth, setTreeWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('digestive_tree_width');
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val) && val >= 220 && val <= 540) return val;
      }
    }
    return 320;
  });

  const [infoWidth, setInfoWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('digestive_info_width');
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val) && val >= 280 && val <= 640) return val;
      }
    }
    return 360;
  });

  // Responsive breakpoint: isCompact covers Mobile (< 768px) and Tablet / iPad (< 1200px)
  const [isCompact, setIsCompact] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1200;
    }
    return false;
  });

  const [isDraggingTree, setIsDraggingTree] = useState(false);
  const [isDraggingInfo, setIsDraggingInfo] = useState(false);

  // Sidebars open state:
  // Desktop (>= 1200px): tree defaults to open
  // Tablet/Mobile (< 1200px): both default to false for 100% canvas viewport
  const [isTreeOpen, setIsTreeOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1200;
    }
    return true;
  });
  // Right info panel: closed by default (Compact by Default)
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isCompactDismissed, setIsCompactDismissed] = useState<boolean>(false);

  // Responsive layout watcher
  useEffect(() => {
    const handleResize = () => {
      const compact = window.innerWidth < 1200;
      setIsCompact(compact);
      if (compact) {
        setIsTreeOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset compact dismissal when selection changes
  useEffect(() => {
    setIsCompactDismissed(false);
  }, [selectedOrganId]);

  // Drag handler for Left Tree Splitter
  const handleTreeSplitterPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDraggingTree(true);
    const startX = e.clientX;
    const startWidth = treeWidth;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const delta = moveEvt.clientX - startX;
      const nextWidth = Math.min(540, Math.max(220, startWidth + delta));
      setTreeWidth(nextWidth);
    };

    const onPointerUp = () => {
      setIsDraggingTree(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      setTreeWidth((w) => {
        localStorage.setItem('digestive_tree_width', String(w));
        return w;
      });
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Drag handler for Right Info Splitter
  const handleInfoSplitterPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDraggingInfo(true);
    const startX = e.clientX;
    const startWidth = infoWidth;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const delta = startX - moveEvt.clientX;
      const nextWidth = Math.min(640, Math.max(280, startWidth + delta));
      setInfoWidth(nextWidth);
    };

    const onPointerUp = () => {
      setIsDraggingInfo(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      setInfoWidth((w) => {
        localStorage.setItem('digestive_info_width', String(w));
        return w;
      });
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // URL query param parser & sync
  const hasParsedUrlOnMount = useRef(false);
  useEffect(() => {
    const parseUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const organParam = params.get('organ') || params.get('structure');
      const sectionParam = params.get('section');

      if (organParam) {
        const clean = organParam.toLowerCase().trim();
        if (DIGESTIVE_SYSTEM_DATA[clean]) {
          selectOrgan(clean);
        }
      }

      if (sectionParam) {
        setCameraPreset(sectionParam as DigestiveCameraPreset);
      }

      hasParsedUrlOnMount.current = true;
    };

    parseUrlParams();
    window.addEventListener('popstate', parseUrlParams);
    return () => window.removeEventListener('popstate', parseUrlParams);
  }, [selectOrgan, setCameraPreset]);

  // Sync active organ with URL
  const isFirstSyncRef = useRef(true);
  useEffect(() => {
    if (isFirstSyncRef.current) {
      isFirstSyncRef.current = false;
      return;
    }

    const currentParams = new URLSearchParams(window.location.search);
    const currentOrgan = currentParams.get('organ') || currentParams.get('structure');

    if (currentOrgan === selectedOrganId) return;

    const url = new URL(window.location.href);
    if (selectedOrganId) {
      url.searchParams.set('organ', selectedOrganId);
    } else {
      url.searchParams.delete('organ');
      url.searchParams.delete('structure');
    }

    window.history.replaceState({ organ: selectedOrganId }, '', url.toString());
  }, [selectedOrganId]);

  // Autocomplete search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{ id: string; labelVi: string; labelEn: string; category: string }> = [];

    DIGESTIVE_STRUCTURE_LIST.forEach((organ) => {
      if (
        organ.nameVi.toLowerCase().includes(q) ||
        organ.nameEn.toLowerCase().includes(q) ||
        organ.nameLa.toLowerCase().includes(q) ||
        organ.id.includes(q) ||
        organ.subdivisions.some((s) => s.nameVi.toLowerCase().includes(q) || s.nameEn.toLowerCase().includes(q))
      ) {
        let catLabel = 'Ống tiêu hóa';
        if (organ.category === 'hepatobiliary') catLabel = 'Gan - Mật';
        else if (organ.category === 'pancreas') catLabel = 'Tụy';
        else if (organ.category === 'peritoneum') catLabel = 'Phúc mạc';

        results.push({
          id: organ.id,
          labelVi: organ.nameVi,
          labelEn: `${organ.nameLa} (${organ.nameEn})`,
          category: catLabel
        });
      }
    });

    return results.slice(0, 10);
  }, [searchQuery]);

  // Breadcrumbs
  const breadcrumbSegments = useMemo(() => {
    const list: Array<{ label: string; action?: () => void }> = [
      { label: 'MedAnatomy', action: () => setViewMode('full-body') },
      { label: 'Phòng Lab Tiêu Hóa', action: () => setCameraPreset('overview') }
    ];

    const sectionLabels: Record<DigestiveCameraPreset, string> = {
      overview: 'Toàn cảnh',
      oral: 'Miệng & Tuyến',
      gastroduodenal: 'Dạ dày & Tá tràng',
      hepatobiliary: 'Gan & Phân thùy Couinaud',
      pancreas: 'Tụy & Ống Wirsung',
      small_bowel: 'Ruột non & Mạc treo',
      colorectal: 'Đại tràng & Ruột thừa',
      posterior: 'Mặt sau'
    };

    if (cameraPreset && sectionLabels[cameraPreset]) {
      list.push({ label: sectionLabels[cameraPreset] });
    }

    if (selectedOrganId && DIGESTIVE_SYSTEM_DATA[selectedOrganId]) {
      list.push({ label: DIGESTIVE_SYSTEM_DATA[selectedOrganId].nameVi });
    }

    return list;
  }, [cameraPreset, selectedOrganId, setViewMode, setCameraPreset]);

  // Active selected organ data
  const selectedOrgan = selectedOrganId ? DIGESTIVE_SYSTEM_DATA[selectedOrganId] || null : null;

  // Fit to View action
  const handleFitView = () => {
    setFocusTrigger({
      position: [0.045, 0.35, 0.65],
      target: [0.045, 0.30, 0.02],
      timestamp: Date.now()
    });
  };

  return (
    <div
      className={`relative w-full h-[calc(100dvh-64px)] min-h-[460px] md:min-h-[560px] flex flex-col overflow-hidden select-none transition-colors duration-200 ${
        isDark ? 'bg-[#0a0e17] text-slate-100' : 'bg-[#f7f0e7] text-[#28231d]'
      }`}
    >
      {/* ==================================================================== */}
      {/* 1. LAB SUB-HEADER BAR (Row 2): Title, Breadcrumbs, Search & Presets */}
      {/* ==================================================================== */}
      <header
        className={`h-14 border-b flex items-center justify-between px-3 sm:px-4 z-20 transition-colors duration-200 flex-shrink-0 gap-2 sm:gap-4 ${
          isDark
            ? 'bg-[#0f141c]/95 border-slate-800/80'
            : 'bg-[#faf6f0]/95 border-[#e7ded3]'
        }`}
      >
        {/* Left: Lab Title, Breadcrumbs & Status Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 shadow-sm flex-shrink-0">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xs sm:text-sm font-bold tracking-tight text-current uppercase whitespace-nowrap">
                Digestive & Hepatobiliary Lab
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 whitespace-nowrap">
                HỆ TIÊU HÓA 3D
              </span>
            </div>
            {/* Breadcrumb row */}
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 truncate">
              {breadcrumbSegments.map((seg, i) => {
                const isLast = i === breadcrumbSegments.length - 1;
                const isFirst = i === 0;
                const hideOnCompact = !isLast && !isFirst && i < breadcrumbSegments.length - 1;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <ChevronRight
                        className={`w-2.5 h-2.5 text-slate-400 flex-shrink-0 ${
                          hideOnCompact ? 'hidden xl:inline' : ''
                        }`}
                      />
                    )}
                    {seg.action ? (
                      <button
                        onClick={seg.action}
                        className={`hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer truncate ${
                          hideOnCompact ? 'hidden xl:inline' : ''
                        }`}
                      >
                        {seg.label}
                      </button>
                    ) : (
                      <span
                        className={`truncate ${
                          isLast ? 'font-semibold text-amber-600 dark:text-amber-400' : ''
                        } ${hideOnCompact ? 'hidden xl:inline' : ''}`}
                      >
                        {seg.label}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: Search input (Desktop >= 1024px) */}
        <div className="relative flex-1 max-w-xs hidden lg:block">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Tìm cơ quan (Dạ dày, Gan, Tụy, Ruột thừa)..."
              className={`w-full h-8 pl-8 pr-3 rounded-full text-xs transition border focus:outline-none ${
                isDark
                  ? 'bg-slate-900/90 border-slate-700/80 text-slate-200 placeholder-slate-500 focus:border-amber-500'
                  : 'bg-white/80 border-[#e0d6c7] text-slate-800 placeholder-slate-400 focus:border-amber-600'
              }`}
            />
          </div>

          {/* Search dropdown results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div
              className={`absolute top-10 left-0 right-0 rounded-xl shadow-2xl border overflow-hidden z-50 animate-fade-in ${
                isDark
                  ? 'bg-slate-900/95 border-slate-700 text-slate-100'
                  : 'bg-white/95 border-[#e7ded3] text-[#28231d]'
              }`}
            >
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => {
                    selectOrgan(res.id);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs border-b last:border-none transition cursor-pointer ${
                    isDark
                      ? 'border-slate-800/60 hover:bg-slate-800'
                      : 'border-[#f0e7db] hover:bg-[#ede3d5]/70'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-current">{res.labelVi}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-serif italic">
                      {res.labelEn}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {res.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Visualization Depth Presets & Panel Toggles */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Compact Search Trigger Button (< lg) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`lg:hidden p-1.5 rounded-full border transition cursor-pointer ${
              isSearchOpen
                ? 'bg-amber-600 border-amber-500 text-white'
                : isDark
                ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                : 'border-[#dfd4c4] bg-white text-slate-600 hover:text-[#28231d]'
            }`}
            title="Tìm kiếm cơ quan"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Depth Mode Pills (Desktop >= 1200px) */}
          <div
            className={`hidden xl:flex items-center p-0.5 rounded-full border text-xs ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#ede3d5] border-[#dfd4c4]'
            }`}
          >
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'giTract', label: 'Ống tiêu hóa' },
              { id: 'hepatobiliary', label: 'Gan mật' },
              { id: 'pancreas', label: 'Tụy' },
              { id: 'vasculature', label: 'Mạch máu' }
            ].map((d) => {
              const isLayerActive = d.id === 'all' || visibleLayers[d.id as keyof typeof visibleLayers];
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    if (d.id !== 'all') toggleLayer(d.id as any);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition cursor-pointer ${
                    isLayerActive
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'text-slate-500 hover:text-current'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>

          <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5 hidden sm:block" />

          {/* Toggle Left Tree Sidebar */}
          <button
            onClick={() => setIsTreeOpen(!isTreeOpen)}
            className={`p-1.5 rounded-full border transition cursor-pointer ${
              isTreeOpen
                ? 'bg-amber-600 border-amber-500 text-white'
                : isDark
                ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                : 'border-[#dfd4c4] bg-white text-slate-600 hover:text-[#28231d]'
            }`}
            title={isTreeOpen ? 'Thu gọn Cây giải phẫu' : 'Mở Cây giải phẫu'}
          >
            {isTreeOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          {/* Toggle Right Info Panel */}
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className={`p-1.5 rounded-full border transition cursor-pointer ${
              isInfoOpen
                ? 'bg-amber-600 border-amber-500 text-white'
                : isDark
                ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                : 'border-[#dfd4c4] bg-white text-slate-600 hover:text-[#28231d]'
            }`}
            title={isInfoOpen ? 'Thu gọn Hồ sơ giải phẫu' : 'Mở Hồ sơ giải phẫu'}
          >
            {isInfoOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Search Modal on Compact Devices (< lg) */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg mx-auto mt-12 rounded-2xl p-3 shadow-2xl border ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-[#e7ded3] text-[#28231d]'
            }`}
          >
            <div className="flex items-center gap-2 pb-3 border-b border-inherit">
              <Search className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm cơ quan (Dạ dày, Gan, Tụy, Ruột thừa)..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 text-slate-400 hover:text-current font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-inherit mt-2">
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => {
                    selectOrgan(res.id);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full text-left px-3 py-2.5 flex items-center justify-between text-xs transition cursor-pointer rounded-lg ${
                    isDark ? 'hover:bg-slate-800' : 'hover:bg-[#ede3d5]/70'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-current">{res.labelVi}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-serif italic">
                      {res.labelEn}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {res.category}
                  </span>
                </button>
              ))}
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">
                  Không tìm thấy cơ quan phù hợp
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. SECTION SWITCHER STRIP (Row 3): Multi-level Digestive Subsystems */}
      {/* ==================================================================== */}
      <div
        className={`px-3 sm:px-4 py-1.5 border-b flex items-center justify-between gap-3 z-25 transition-colors duration-200 overflow-x-auto scrollbar-none flex-nowrap ${
          isDark
            ? 'bg-[#0b0f17]/95 border-slate-800/80'
            : 'bg-[#f4ecdf]/95 border-[#e7ded3]'
        }`}
      >
        <DigestiveSectionSwitcher />
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400 whitespace-nowrap pr-2">
          <span>Tiêu Bản:</span>
          <span className="font-bold text-amber-500">
            {cameraPreset === 'overview'
              ? 'Toàn bộ ống tiêu hóa & các tạng phụ trợ'
              : cameraPreset === 'oral'
              ? 'Khoang miệng, lưỡi & 3 đôi tuyến nước bọt'
              : cameraPreset === 'gastroduodenal'
              ? 'Dạ dày, môn vị & 4 đoạn tá tràng D1-D4'
              : cameraPreset === 'hepatobiliary'
              ? 'Gan, 8 phân thùy Couinaud & túi mật'
              : cameraPreset === 'pancreas'
              ? 'Khối đầu-thân-đuôi tụy & ống Wirsung'
              : cameraPreset === 'small_bowel'
              ? 'Hỗng tràng, hồi tràng & mạc treo ruột'
              : 'Khung đại tràng, manh tràng & ruột thừa'}
          </span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. MAIN WORKSPACE WITH RESIZABLE SPLITTERS & MOBILE DRAWERS */}
      {/* ==================================================================== */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Column (Desktop >= 1200px): Collapsible & Resizable Anatomy Tree */}
        {!isCompact && (
          <DigestiveTree
            isOpen={isTreeOpen}
            onClose={() => setIsTreeOpen(false)}
            customWidth={treeWidth}
          />
        )}

        {/* Left Resizer Splitter (Desktop >= 1200px) */}
        {!isCompact && isTreeOpen && (
          <div
            onPointerDown={handleTreeSplitterPointerDown}
            onDoubleClick={() => {
              setTreeWidth(320);
              localStorage.setItem('digestive_tree_width', '320');
            }}
            className={`relative w-2.5 h-full cursor-col-resize z-30 flex items-center justify-center group select-none transition-colors ${
              isDraggingTree ? 'bg-amber-500/30' : 'hover:bg-amber-500/15'
            }`}
            title="Kéo sang trái/phải để chỉnh độ rộng cây giải phẫu. Nhấp đúp để đặt lại 320px."
          >
            <div
              className={`w-[1px] h-full ${
                isDark ? 'bg-slate-800' : 'bg-[#e7ded3]'
              } group-hover:bg-amber-500 transition-colors`}
            />
            {/* Grip handle */}
            <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 group-hover:border-amber-500 group-hover:bg-amber-500/10 flex flex-col items-center justify-center gap-0.5 shadow-sm transition">
              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-amber-500" />
              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-amber-500" />
              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-amber-500" />
            </div>
          </div>
        )}

        {/* Center Column: 3D Digestive Stage */}
        <main className="flex-1 min-w-0 w-full h-full relative overflow-hidden">
          {/* Floating Reopen Tree Button (when collapsed or on tablet/mobile) */}
          {(!isTreeOpen || isCompact) && (
            <button
              onClick={() => setIsTreeOpen(true)}
              className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full bg-slate-900/85 border border-slate-700 text-slate-200 hover:text-white shadow-xl backdrop-blur-md transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold hover:border-amber-500 animate-fade-in"
              title="Mở cây giải phẫu"
            >
              <PanelLeftOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Cây Giải Phẫu</span>
            </button>
          )}

          {/* Floating Reopen Info Dossier Button (when collapsed or on tablet/mobile) */}
          {(!isInfoOpen || isCompact) && (
            <button
              onClick={() => setIsInfoOpen(true)}
              className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-slate-900/85 border border-slate-700 text-slate-200 hover:text-white shadow-xl backdrop-blur-md transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold hover:border-amber-500 animate-fade-in"
              title="Mở hồ sơ giải phẫu"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Hồ Sơ Tiêu Hóa</span>
              {selectedOrganId && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>
          )}

          {/* 3D WebGL Canvas Viewport */}
          <Digestive3DStage
            showLabels={showLabels}
            focusTrigger={focusTrigger}
          />

          {/* Compact Anatomy Card (Bottom-center annotation card when right panel is closed) */}
          {selectedOrgan && !isInfoOpen && !isCompactDismissed && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-[92vw] sm:w-[460px] animate-fade-in pointer-events-auto">
              <AnatomyInfoCard
                nameVi={selectedOrgan.nameVi}
                nameEn={selectedOrgan.nameEn}
                nameLatin={selectedOrgan.nameLa}
                category="Cơ quan Tiêu hóa"
                reviewStatus="TA2 Verified"
                summary={selectedOrgan.overviewVi}
                details={{
                  overviewVi: selectedOrgan.overviewVi,
                  functionVi: selectedOrgan.functionVi.join('. '),
                  clinicalVi: selectedOrgan.clinicalNotesVi.join('. '),
                  bloodSupplyVi: `${selectedOrgan.bloodSupply.arterialVi} • ${selectedOrgan.bloodSupply.venousVi}`,
                  innervationVi: `${selectedOrgan.innervation.parasympatheticVi} • ${selectedOrgan.innervation.sympatheticVi}`,
                  stats: [
                    { label: 'Kích thước', value: selectedOrgan.approximateDimensions },
                    { label: 'Vùng giải phẫu', value: selectedOrgan.anatomicalQuadrant }
                  ]
                }}
                onClose={() => setIsCompactDismissed(true)}
                onExpand={() => setIsInfoOpen(true)}
              />
            </div>
          )}

          {/* Floating Context Toolbar */}
          <DigestiveToolbar
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels(!showLabels)}
            onFitView={handleFitView}
          />
        </main>

        {/* Right Resizer Splitter (Desktop >= 1200px) */}
        {!isCompact && isInfoOpen && (
          <div
            onPointerDown={handleInfoSplitterPointerDown}
            onDoubleClick={() => {
              setInfoWidth(360);
              localStorage.setItem('digestive_info_width', '360');
            }}
            className={`relative w-2.5 h-full cursor-col-resize z-30 flex items-center justify-center group select-none transition-colors ${
              isDraggingInfo ? 'bg-amber-500/30' : 'hover:bg-amber-500/15'
            }`}
            title="Kéo sang trái/phải để chỉnh độ rộng hồ sơ. Nhấp đúp để đặt lại 360px."
          >
            <div
              className={`w-[1px] h-full ${
                isDark ? 'bg-slate-800' : 'bg-[#e7ded3]'
              } group-hover:bg-amber-500 transition-colors`}
            />
            {/* Grip handle */}
            <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 group-hover:border-amber-500 group-hover:bg-amber-500/10 flex flex-col items-center justify-center gap-0.5 shadow-sm transition">
              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-amber-500" />
              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-amber-500" />
              <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-amber-500" />
            </div>
          </div>
        )}

        {/* Right Column (Desktop >= 1200px): Collapsible & Resizable Medical Dossier */}
        {!isCompact && (
          <DigestiveInfoPanel
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            customWidth={infoWidth}
          />
        )}
      </div>

      {/* ==================================================================== */}
      {/* 4. TABLET & MOBILE SLIDE-OVER DRAWERS WITH BACKDROP */}
      {/* ==================================================================== */}
      {isCompact && isTreeOpen && (
        <div className="fixed inset-0 z-50 flex animate-fade-in pointer-events-auto">
          <div
            onClick={() => setIsTreeOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
          />
          <div className="relative z-10 w-[85vw] sm:w-80 max-w-sm h-full bg-[#faf6f0] dark:bg-[#0c121e] shadow-2xl flex flex-col border-r border-slate-800">
            <DigestiveTree
              isOpen={true}
              onClose={() => setIsTreeOpen(false)}
              isMobileDrawer={true}
            />
          </div>
        </div>
      )}

      {isCompact && isInfoOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in pointer-events-auto">
          <div
            onClick={() => setIsInfoOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
          />
          <div className="relative z-10 w-[92vw] sm:w-96 max-w-md h-full bg-[#faf6f0] dark:bg-[#0c121e] shadow-2xl flex flex-col border-l border-slate-800">
            <DigestiveInfoPanel
              isOpen={true}
              onClose={() => setIsInfoOpen(false)}
              isMobileDrawer={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
