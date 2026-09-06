import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Compass,
  Activity,
  Layers,
  Heart,
  GitFork,
  Stethoscope,
  BookOpen,
  Info,
  PanelRightClose
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { getAnatomicalPronunciation } from '../../data/anatomyPronunciationData';
import { pronunciationPlayer } from '../../utils/pronunciationPlayer';
import { useAnnotationPosition } from '../../hooks/useAnnotationPosition';
import { ModelObstructionTarget } from '../../utils/AnnotationPositioner';
import {
  resolveDetailPanelMode,
  computeDetailPanelMetrics,
  DetailPanelMode,
  BottomSheetState
} from '../../utils/DetailPanelPositioner';

export interface AnatomyInfoCardProps {
  anatomyId?: string | null;
  nameVi: string;
  nameEn: string;
  nameLatin?: string;
  category?: string;
  reviewStatus?: string;
  summary?: string;
  position?: [number, number, number]; // [x, y, z] for smart positioning

  details?: {
    overviewVi?: string;
    overviewEn?: string;
    locationVi?: string;
    locationEn?: string;
    structureVi?: string;
    structureEn?: string;
    functionVi?: string;
    functionEn?: string;
    relationsVi?: string;
    relationsEn?: string;
    bloodSupplyVi?: string;
    bloodSupplyEn?: string;
    innervationVi?: string;
    innervationEn?: string;
    clinicalVi?: string;
    clinicalEn?: string;
    icd10?: string[];
    references?: string | string[];
    stats?: { label: string; value: string; sub?: string }[];
  };

  ipa?: string;
  audioUrl?: string;

  onDeepInspect?: () => void;
  onClose?: () => void;
  onExpand?: () => void;
  onRelationClick?: (targetId: string) => void;
  className?: string;
}

export const AnatomyInfoCard: React.FC<AnatomyInfoCardProps> = ({
  anatomyId,
  nameVi,
  nameEn,
  nameLatin,
  category = 'organ',
  reviewStatus = 'verified',
  summary,
  details,
  position,
  ipa: explicitIpa,
  audioUrl: explicitAudioUrl,
  onDeepInspect,
  onClose,
  onExpand,
  onRelationClick,
  className = ''
}) => {
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';
  const isVi = language === 'vi';

  // Clean View Support: hide annotation and detail when clean view is toggled
  const isAnatomyCleanView = useAnatomyStore((s) => s.isCleanView);
  const isDentalCleanView = useDentalNeuroStore((s) => s.isCleanView);
  const isCleanView = isAnatomyCleanView || isDentalCleanView;

  // Global expansion state in store
  const isGlobalExpanded = useAnatomyStore((s) => s.isInfoExpanded);
  const setIsGlobalExpanded = useAnatomyStore((s) => s.setIsInfoExpanded);
  const infoSheetState = useAnatomyStore((s) => s.infoSheetState);
  const setInfoSheetState = useAnatomyStore((s) => s.setInfoSheetState);

  // Local states
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('overview');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Viewport dimensions with live resize listener
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerHeight : 900
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const panelMode: DetailPanelMode = useMemo(
    () => resolveDetailPanelMode(viewportWidth),
    [viewportWidth]
  );

  // Model obstruction target for collision avoidance in compact mode
  const obstructionTarget: ModelObstructionTarget = useMemo(
    () => ({
      isFullBody: anatomyId === 'human_skeleton' || (!position && !anatomyId),
      position,
      anatomyId
    }),
    [anatomyId, position]
  );

  const { positionResult, isRotating } = useAnnotationPosition({
    target: obstructionTarget,
    isExpanded
  });

  // Sync with global store state
  useEffect(() => {
    setIsExpanded(isGlobalExpanded);
  }, [isGlobalExpanded]);

  const handleToggleExpand = () => {
    if (onExpand) {
      onExpand();
      return;
    }
    const next = !isExpanded;
    setIsExpanded(next);
    setIsGlobalExpanded(next);
    setInfoSheetState(next ? (panelMode === 'bottom-sheet' ? 'half' : 'expanded') : 'collapsed');
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setIsGlobalExpanded(false);
    setInfoSheetState('collapsed');
  };

  // Keyboard shortcut: Esc to collapse or close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          handleCollapse();
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onClose]);

  // Audio status subscription
  useEffect(() => {
    const unsubscribe = pronunciationPlayer.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => {
      unsubscribe();
      pronunciationPlayer.stop();
    };
  }, []);

  // Resolve pronunciation & IPA from authoritative registry
  const pronunciation = useMemo(() => {
    return getAnatomicalPronunciation(anatomyId, nameEn, nameLatin);
  }, [anatomyId, nameEn, nameLatin]);

  const ipa = explicitIpa || pronunciation?.ipa;
  const audioUrl = explicitAudioUrl || pronunciation?.audioUrl;

  const handlePlayPronunciation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!nameEn) return;
    pronunciationPlayer.play(nameEn, audioUrl);
  };

  // Accordion toggle helper
  const toggleSection = (sectionKey: string) => {
    setOpenAccordion((prev) => (prev === sectionKey ? null : sectionKey));
  };

  // Touch drag gesture for mobile/tablet bottom sheet
  const touchStartY = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY < -40) {
      // Swiped UP -> advance state
      if (!isExpanded) {
        setIsExpanded(true);
        setIsGlobalExpanded(true);
        setInfoSheetState('half');
      } else if (infoSheetState === 'half') {
        setInfoSheetState('expanded');
      }
    } else if (deltaY > 40) {
      // Swiped DOWN -> reduce state
      if (infoSheetState === 'expanded') {
        setInfoSheetState('half');
      } else {
        handleCollapse();
      }
    }
  };

  // 1-sentence concise short summary (strict 1 line)
  const shortSummary = useMemo(() => {
    const raw =
      summary ||
      (isVi ? details?.overviewVi : details?.overviewEn) ||
      (isVi
        ? `Cấu trúc giải phẫu ${nameVi} (${nameEn}) thuộc cơ thể người.`
        : `Anatomical structure ${nameEn} of the human body.`);
    const firstSentence = raw.split(/(?<=[.?!])\s+/)[0] || raw;
    return firstSentence;
  }, [summary, details, isVi, nameVi, nameEn]);

  const categoryLabel = (category || 'anatomia').toUpperCase();

  // If clean view mode is active, do not render
  if (isCleanView) {
    return null;
  }

  // --------------------------------------------------------------------------
  // RENDER MODE A: COMPACT ANNOTATION
  // Shown when not expanded, or in collapsed state on mobile/tablet.
  // Single active instance, non-intrusive safe placement.
  // --------------------------------------------------------------------------
  if (!isExpanded) {
    return (
      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={positionResult.style}
        data-ui="anatomy-annotation-card"
        data-placement={positionResult.placement}
        className={`pointer-events-auto select-none transition-opacity duration-200 animate-fade-in ${
          isRotating ? 'opacity-35 pointer-events-none' : 'opacity-100'
        } ${className}`}
      >
        <div
          className={`w-full min-h-[85px] max-h-[135px] p-3 sm:px-4 sm:py-2.5 rounded-2xl border shadow-2xl backdrop-blur-xl flex flex-col justify-between select-none ${
            isDark
              ? 'bg-[#0f141c]/95 border-slate-800 text-slate-100 shadow-black/60'
              : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d] shadow-amber-950/10'
          }`}
        >
          {/* Top Line: Vietnamese Title + Category + Close button */}
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-serif text-sm sm:text-base font-bold tracking-tight text-current truncate leading-tight">
              {nameVi}
            </h2>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                {categoryLabel}
              </span>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                  title="Đóng chú thích"
                  aria-label="Đóng"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Second Line: English Name + Latin + IPA + Speaker Button */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs -mt-0.5">
            <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs truncate max-w-[170px]">
              {nameEn}
            </span>

            {/* Academic IPA & Audio Button */}
            {ipa && (
              <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-mono text-amber-700 dark:text-amber-400 border border-black/5 dark:border-white/10">
                <span>{ipa}</span>
                <button
                  onClick={handlePlayPronunciation}
                  className={`p-0.5 rounded hover:bg-amber-500/20 transition cursor-pointer ${
                    isPlayingAudio ? 'text-amber-500 animate-pulse scale-110' : 'text-slate-400 hover:text-amber-600'
                  }`}
                  title="Nghe phát âm tiếng Anh chuẩn học thuật"
                  aria-label="Nghe phát âm tiếng Anh"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {nameLatin && nameLatin !== nameEn && (
              <span className="font-serif italic text-[10px] sm:text-[11px] text-slate-400 hidden sm:inline truncate max-w-[120px]">
                ({nameLatin})
              </span>
            )}
          </div>

          {/* Third Line: 1-Sentence Concise Summary */}
          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 leading-normal">
            {shortSummary}
          </p>

          {/* Bottom Line: Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <button
              onClick={handleToggleExpand}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 transition cursor-pointer"
              aria-expanded={false}
            >
              <span>{isVi ? 'Xem thêm' : 'Read more'}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {onDeepInspect && (
              <button
                onClick={onDeepInspect}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-[10px] sm:text-[11px] shadow-xs hover:shadow transition cursor-pointer"
                title="Khám phá mô hình 3D chuyên sâu"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isVi ? 'Khám phá 3D' : '3D Specimen'}</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </aside>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER MODE B: FULL ANATOMY DETAILS
  // Content-Based Height, zero empty space defect!
  // Adapts layout mode strictly by device:
  // - Desktop (>= 1440px): Floating right card (w: 368px, h-auto, top-16)
  // - Laptop (1200-1439px): Floating compact card (w: 320px, h-auto, top-16)
  // - Tablet Landscape (900-1199px): Overlay slide-over drawer (w: 340px, top-16)
  // - Tablet Portrait (< 900px) & Mobile (< 600px): 3-state Bottom Sheet
  // --------------------------------------------------------------------------

  // Container styling tailored per device class
  let containerClasses = '';
  let containerStyles: React.CSSProperties = {};

  if (panelMode === 'desktop-panel') {
    // Desktop: Content-based floating right card
    containerClasses =
      'fixed top-[68px] right-4 z-40 w-92 max-w-[380px] h-auto max-h-[calc(100vh-84px)] rounded-2xl border shadow-2xl flex flex-col animate-fade-in';
  } else if (panelMode === 'laptop-compact') {
    // Laptop: Compact content-based floating right card
    containerClasses =
      'fixed top-[68px] right-3 z-40 w-80 max-w-[320px] h-auto max-h-[calc(100vh-84px)] rounded-2xl border shadow-2xl flex flex-col animate-fade-in';
  } else if (panelMode === 'tablet-drawer') {
    // Tablet Landscape: Slide-over drawer from right (overlay, doesn't crush 3D canvas)
    containerClasses =
      'fixed top-[64px] right-0 bottom-0 z-40 w-[340px] max-w-[85vw] h-[calc(100vh-64px)] border-l shadow-2xl flex flex-col animate-slide-left';
  } else {
    // Bottom Sheet on Tablet Portrait (< 900px) & Mobile (< 600px)
    const isExpandedFull = infoSheetState === 'expanded';
    const heightClass = isExpandedFull ? 'max-h-[85vh] h-[85vh]' : 'max-h-[50vh] h-auto';
    const marginClass = viewportWidth < 600 ? 'inset-x-0 bottom-0 rounded-t-3xl' : 'inset-x-4 bottom-0 max-w-lg mx-auto rounded-t-3xl';
    containerClasses = `fixed ${marginClass} z-40 ${heightClass} border-t shadow-2xl flex flex-col animate-slide-up pb-[env(safe-area-inset-bottom,0px)]`;
  }

  return (
    <>
      {/* Backdrop for Tablet Landscape Drawer and Expanded Bottom Sheet */}
      {(panelMode === 'tablet-drawer' || (panelMode === 'bottom-sheet' && infoSheetState === 'expanded')) && (
        <div
          onClick={handleCollapse}
          className="fixed inset-0 z-35 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in cursor-pointer"
          title="Bấm ra ngoài để đóng"
        />
      )}

      <aside
        onPointerDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        data-ui="anatomy-details-panel"
        data-panel-mode={panelMode}
        data-sheet-state={infoSheetState}
        style={containerStyles}
        className={`${containerClasses} pointer-events-auto transition-all duration-200 select-none overflow-hidden backdrop-blur-xl ${
          isDark
            ? 'bg-[#0f141c]/95 border-slate-800 text-slate-100 shadow-black/60'
            : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d] shadow-amber-950/15'
        } ${className}`}
      >
        {/* Mobile / Tablet drag handle */}
        {panelMode === 'bottom-sheet' && (
          <div
            onClick={() => {
              if (infoSheetState === 'expanded') {
                setInfoSheetState('half');
              } else {
                setInfoSheetState('expanded');
              }
            }}
            className="w-full pt-2 pb-1.5 flex justify-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition flex-shrink-0"
            title="Vuốt lên để xem toàn bộ, vuốt xuống để thu gọn"
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-400/60 dark:bg-slate-600/70" />
          </div>
        )}

        {/* Panel Header */}
        <div className="p-3.5 sm:p-4 border-b border-black/5 dark:border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                {categoryLabel}
              </span>
              {reviewStatus && (
                <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{reviewStatus.toUpperCase()}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleCollapse}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition cursor-pointer"
                title="Thu gọn về chú thích nhỏ (Esc)"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>{isVi ? 'Thu gọn' : 'Collapse'}</span>
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                  title="Đóng panel"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Title & Pronunciation */}
          <h1 className="text-lg sm:text-xl font-serif font-bold tracking-tight text-current leading-snug">
            {nameVi}
          </h1>

          <div className="flex items-center gap-2 mt-1 flex-wrap text-xs">
            <span className="font-medium text-slate-700 dark:text-slate-300">{nameEn}</span>

            {ipa && (
              <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded text-[11px] font-mono text-amber-700 dark:text-amber-400 border border-black/5 dark:border-white/10">
                <span>{ipa}</span>
                <button
                  onClick={handlePlayPronunciation}
                  className={`p-0.5 rounded hover:bg-amber-500/20 transition cursor-pointer ${
                    isPlayingAudio ? 'text-amber-500 animate-pulse scale-110' : 'text-slate-400 hover:text-amber-600'
                  }`}
                  title="Nghe phát âm tiếng Anh chuẩn học thuật"
                  aria-label="Nghe phát âm tiếng Anh"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {nameLatin && nameLatin !== nameEn && (
              <span className="font-serif italic text-xs text-slate-400">
                ({nameLatin})
              </span>
            )}
          </div>

          {/* Deep Inspect button */}
          {onDeepInspect && (
            <button
              onClick={onDeepInspect}
              className="mt-2.5 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVi ? 'Khám phá tiêu bản 3D chuyên sâu' : 'Inspect 3D Specimen'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Scrollable Content Body (Content-based natural height, scrolls only when needed) */}
        <div className="overflow-y-auto p-3.5 sm:p-4 space-y-2 text-xs flex-1">
          {/* Quick Facts Grid */}
          {details?.stats && details.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {details.stats.map((st, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl border bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-center"
                >
                  <div className="text-[10px] text-slate-500 uppercase font-mono">{st.label}</div>
                  <div className="text-sm font-bold font-serif text-amber-600 dark:text-amber-400">{st.value}</div>
                  {st.sub && <div className="text-[9px] text-slate-400">{st.sub}</div>}
                </div>
              ))}
            </div>
          )}

          {/* SECTION 1: TỔNG QUAN (Overview) */}
          {(details?.overviewVi || details?.overviewEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('overview')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isVi ? '1. Tổng quan giải phẫu' : '1. Overview'}</span>
                </div>
                {openAccordion === 'overview' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'overview' && (
                <div className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40">
                  {isVi ? details.overviewVi : details.overviewEn}
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: VỊ TRÍ GIẢI PHẪU (Location) */}
          {(details?.locationVi || details?.locationEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('location')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isVi ? '2. Vị trí & Định khu' : '2. Location'}</span>
                </div>
                {openAccordion === 'location' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'location' && (
                <div className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40">
                  {isVi ? details.locationVi : details.locationEn}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: CẤU TẠO & HÌNH THÁI (Structure / Morphology) */}
          {(details?.structureVi || details?.structureEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('structure')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isVi ? '3. Cấu tạo & Hình thái học' : '3. Morphology'}</span>
                </div>
                {openAccordion === 'structure' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'structure' && (
                <div className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40">
                  {isVi ? details.structureVi : details.structureEn}
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: CHỨC NĂNG SINH LÝ (Function) */}
          {(details?.functionVi || details?.functionEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('function')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isVi ? '4. Chức năng sinh lý' : '4. Physiology & Function'}</span>
                </div>
                {openAccordion === 'function' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'function' && (
                <div className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40">
                  {isVi ? details.functionVi : details.functionEn}
                </div>
              )}
            </div>
          )}

          {/* SECTION 5: LIÊN QUAN GIẢI PHẪU (Relations) */}
          {(details?.relationsVi || details?.relationsEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('relations')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isVi ? '5. Liên quan giải phẫu' : '5. Relations'}</span>
                </div>
                {openAccordion === 'relations' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'relations' && (
                <div className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40">
                  {isVi ? details.relationsVi : details.relationsEn}
                </div>
              )}
            </div>
          )}

          {/* SECTION 6: MẠCH MÁU & THẦN KINH CHI PHỐI (Vascular & Nerve Supply) */}
          {(details?.bloodSupplyVi || details?.innervationVi) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('vascular')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>{isVi ? '6. Mạch máu & Thần kinh chi phối' : '6. Neurovascular Supply'}</span>
                </div>
                {openAccordion === 'vascular' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'vascular' && (
                <div className="p-3 space-y-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40">
                  {details.bloodSupplyVi && (
                    <div>
                      <span className="font-semibold text-rose-600 dark:text-rose-400 block mb-0.5">
                        {isVi ? 'Mạch máu cấp dưỡng:' : 'Blood supply:'}
                      </span>
                      <p>{isVi ? details.bloodSupplyVi : details.bloodSupplyEn}</p>
                    </div>
                  )}
                  {details.innervationVi && (
                    <div>
                      <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                        {isVi ? 'Thần kinh chi phối:' : 'Innervation:'}
                      </span>
                      <p>{isVi ? details.innervationVi : details.innervationEn}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SECTION 7: Ý NGHĨA LÂM SÀNG & BỆNH HỌC (Clinical / Pathology) */}
          {(details?.clinicalVi || details?.clinicalEn || (details?.icd10 && details.icd10.length > 0)) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('clinical')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5 text-teal-500" />
                  <span>{isVi ? '7. Ý nghĩa lâm sàng & Bệnh học' : '7. Clinical Relevance'}</span>
                </div>
                {openAccordion === 'clinical' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'clinical' && (
                <div className="p-3 space-y-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40">
                  {(details.clinicalVi || details.clinicalEn) && (
                    <p>{isVi ? details.clinicalVi : details.clinicalEn}</p>
                  )}
                  {details.icd10 && details.icd10.length > 0 && (
                    <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Mã ICD-10:</span>
                      {details.icd10.map((code, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SECTION 8: TÀI LIỆU THAM KHẢO (References) */}
          {details?.references && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('references')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isVi ? '8. Tài liệu tham khảo' : '8. References'}</span>
                </div>
                {openAccordion === 'references' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'references' && (
                <div className="p-3 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40">
                  {Array.isArray(details.references) ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {details.references.map((ref, idx) => (
                        <li key={idx}>{ref}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{details.references}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bottom Collapse trigger */}
          <div className="pt-2 pb-2 text-center">
            <button
              onClick={handleCollapse}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-600 hover:text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 transition cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{isVi ? 'Thu gọn về chú thích nhỏ ↑' : 'Collapse to compact ↑'}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
