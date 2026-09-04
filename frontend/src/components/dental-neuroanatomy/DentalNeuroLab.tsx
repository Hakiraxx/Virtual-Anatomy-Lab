import React, { useState, useMemo, useEffect } from 'react';
import {
  Brain,
  Search,
  Sparkles,
  Syringe,
  Activity,
  RotateCcw,
  HelpCircle,
  ChevronRight,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  FileText,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useDentalNeuroStore, VisualizationDepth } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  MUSCLES_OF_MASTICATION
} from '../../data/dentalNeuroData';
import { DentalNeuroTree } from './DentalNeuroTree';
import { DentalNeuro3DStage } from './DentalNeuro3DStage';
import { DentalNeuroInfoPanel } from './DentalNeuroInfoPanel';
import { DentalNeuroToolbar } from './DentalNeuroToolbar';
import { DentalNeuroQuiz } from './DentalNeuroQuiz';
import { DentalSpecimenSwitcher } from './specimens/DentalSpecimenSwitcher';
import { ToothSpecimenStage } from './specimens/ToothSpecimenStage';
import { TMJSpecimenStage } from './specimens/TMJSpecimenStage';
import { WisdomSurgeryStage } from './specimens/WisdomSurgeryStage';
import { AnatomyTraceController } from '../3d/AnatomyTraceController';
import { AnatomyCompareViewer } from '../3d/AnatomyCompareViewer';
import { DentalNeurovascularMap } from './DentalNeurovascularMap';
import { ClinicalPathologyToggle } from './ClinicalPathologyToggle';
import { AnatomyStudyManager } from '../ui/AnatomyStudyManager';
import { AnatomyDebugPanel } from '../debug/AnatomyDebugPanel';

export const DentalNeuroLab: React.FC = () => {
  const activeSpecimenMode = useDentalNeuroStore((s) => s.activeSpecimenMode);
  const setActiveSpecimenMode = useDentalNeuroStore((s) => s.setActiveSpecimenMode);
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const selectedToothFdi = useDentalNeuroStore((s) => s.selectedToothFdi);
  const wisdomToothId = useDentalNeuroStore((s) => s.wisdomToothId);

  const isTraceOpen = useDentalNeuroStore((s) => s.isTraceOpen);
  const toggleTrace = useDentalNeuroStore((s) => s.toggleTrace);
  const isCompareOpen = useDentalNeuroStore((s) => s.isCompareOpen);
  const toggleCompare = useDentalNeuroStore((s) => s.toggleCompare);
  const isNeuroMapOpen = useDentalNeuroStore((s) => s.isNeuroMapOpen);
  const toggleNeuroMap = useDentalNeuroStore((s) => s.toggleNeuroMap);
  const isStudyOpen = useDentalNeuroStore((s) => s.isStudyOpen);
  const toggleStudy = useDentalNeuroStore((s) => s.toggleStudy);
  const isDebugOpen = useDentalNeuroStore((s) => s.isDebugOpen);
  const toggleDebug = useDentalNeuroStore((s) => s.toggleDebug);
  const clinicalMode = useDentalNeuroStore((s) => s.clinicalMode);
  const setClinicalMode = useDentalNeuroStore((s) => s.setClinicalMode);

  const visualizationDepth = useDentalNeuroStore((s) => s.visualizationDepth);
  const setVisualizationDepth = useDentalNeuroStore((s) => s.setVisualizationDepth);

  const isRadiographicView = useDentalNeuroStore((s) => s.isRadiographicView);
  const toggleRadiographicView = useDentalNeuroStore((s) => s.toggleRadiographicView);

  const isMandibularCanalMode = useDentalNeuroStore((s) => s.isMandibularCanalMode);
  const toggleMandibularCanalMode = useDentalNeuroStore((s) => s.toggleMandibularCanalMode);

  const isAnesthesiaMode = useDentalNeuroStore((s) => s.isAnesthesiaMode);
  const toggleAnesthesiaMode = useDentalNeuroStore((s) => s.toggleAnesthesiaMode);

  const quizMode = useDentalNeuroStore((s) => s.quizMode);
  const startQuiz = useDentalNeuroStore((s) => s.startQuiz);
  const exitQuiz = useDentalNeuroStore((s) => s.exitQuiz);
  const resetAll = useDentalNeuroStore((s) => s.resetAll);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const setViewMode = useAnatomyStore((s) => s.setViewMode);
  const isDark = atelierTheme === 'dark';

  // Resizable sidebar widths with localStorage persistence
  const [treeWidth, setTreeWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dental_neuro_tree_width');
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val) && val >= 220 && val <= 540) return val;
      }
    }
    return 320;
  });

  const [infoWidth, setInfoWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dental_neuro_info_width');
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

  // Responsive sidebar visibility states:
  // On desktop (>= 1200px): tree defaults to open
  // On tablet / iPad / mobile (< 1200px): both default to FALSE so 3D canvas gets 100% full viewport!
  const [isTreeOpen, setIsTreeOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1200;
    }
    return true;
  });
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1200;
    }
    return false;
  });

  // Responsive layout watcher for viewports
  useEffect(() => {
    const handleResize = () => {
      const compact = window.innerWidth < 1200;
      setIsCompact(compact);
      if (compact) {
        // When transitioning to compact / iPad / mobile, ensure sidebars don't take in-flow space
        setIsTreeOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatically open Info panel on desktop when selection changes
  useEffect(() => {
    if (selectedAnatomyId && !isCompact) {
      setIsInfoOpen(true);
    }
  }, [selectedAnatomyId, isCompact]);

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
        localStorage.setItem('dental_neuro_tree_width', String(w));
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
        localStorage.setItem('dental_neuro_info_width', String(w));
        return w;
      });
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDepthMenuOpen, setIsDepthMenuOpen] = useState(false);

  // Parse URL search parameters on mount (?specimen=tooth_specimen&structure=tooth.48)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const specimenParam = params.get('specimen');
    const structureParam = params.get('structure');

    if (
      specimenParam === 'general' || specimenParam === 'cranial_nerves' ||
      specimenParam === 'tooth_specimen' ||
      specimenParam === 'tmj_specimen' ||
      specimenParam === 'wisdom_surgery'
    ) {
      setActiveSpecimenMode(specimenParam);
    }

    if (structureParam) {
      const clean = structureParam.toLowerCase();
      if (clean === 'nerve.inferior-alveolar' || clean === 'nerve.inferior_alveolar' || clean === 'nerve_ian' || clean === 'ian') {
        selectAnatomy('nerve_ian');
      } else if (clean === 'nerve.lingual' || clean === 'nerve_lingual' || clean === 'lingual') {
        selectAnatomy('nerve_lingual');
      } else if (clean === 'canal.mandibular' || clean === 'mandibular_canal' || clean === 'canal') {
        selectAnatomy('mandibular_canal');
      } else if (clean === 'bone.mandible' || clean === 'bone_mandible' || clean === 'mandible') {
        selectAnatomy('bone_mandible');
      } else if (clean === 'foramen.mental' || clean === 'mental_foramen' || clean === 'mental') {
        selectAnatomy('mental_foramen');
      } else if (clean === 'foramen.mandibular' || clean === 'mandibular_foramen') {
        selectAnatomy('mandibular_foramen');
      } else if (clean === 'foramen.ovale') {
        selectAnatomy('foramen_ovale');
      } else if (clean.startsWith('tooth.') || clean.startsWith('tooth_')) {
        const num = clean.replace(/tooth[._]/, '');
        selectAnatomy(`tooth_${num}`);
      } else if (clean === 'v3' || clean === 'cn-v3') {
        selectAnatomy('cn_5_v3');
      } else if (clean === 'cn-v' || clean === 'trigeminal') {
        selectAnatomy('cn_5');
      } else if (clean === 'joint_tmj' || clean === 'tmj') {
        selectAnatomy('joint_tmj');
      } else {
        const mapped = clean.replace(/\./g, '_');
        if (
          DENTAL_NERVE_STRUCTURES[mapped] ||
          CRANIAL_FORAMINA[mapped] ||
          MUSCLES_OF_MASTICATION.some((m) => m.id === mapped)
        ) {
          selectAnatomy(mapped);
        }
      }
    }
  }, [selectAnatomy, setActiveSpecimenMode]);

  // Sync active specimen & structure with URL search param
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('specimen', activeSpecimenMode);

    if (selectedAnatomyId) {
      let structureValue = selectedAnatomyId;
      if (selectedAnatomyId === 'nerve_ian') structureValue = 'nerve.inferior-alveolar';
      else if (selectedAnatomyId === 'nerve_lingual') structureValue = 'nerve.lingual';
      else if (selectedAnatomyId === 'mandibular_canal') structureValue = 'canal.mandibular';
      else if (selectedAnatomyId === 'bone_mandible') structureValue = 'bone.mandible';
      else if (selectedAnatomyId === 'mental_foramen') structureValue = 'foramen.mental';
      else if (selectedAnatomyId.startsWith('tooth_')) structureValue = selectedAnatomyId.replace('_', '.');
      url.searchParams.set('structure', structureValue);
    } else {
      url.searchParams.delete('structure');
    }

    window.history.replaceState({ specimen: activeSpecimenMode, structure: selectedAnatomyId }, '', url.toString());
  }, [activeSpecimenMode, selectedAnatomyId]);

  // Filtered search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{ id: string; labelVi: string; labelEn: string; category: string }> = [];

    // Search TMJ Complex
    if (
      'khớp thái dương hàm'.includes(q) ||
      'tmj'.includes(q) ||
      'temporomandibular'.includes(q) ||
      'đĩa khớp'.includes(q)
    ) {
      results.push({
        id: 'joint_tmj',
        labelVi: 'Khớp Thái Dương Hàm (TMJ)',
        labelEn: 'Temporomandibular Joint Complex',
        category: 'Khớp & Động học'
      });
    }

    // Search nerves
    Object.values(DENTAL_NERVE_STRUCTURES).forEach((n) => {
      if (
        n.nameVi.toLowerCase().includes(q) ||
        n.nameEn.toLowerCase().includes(q) ||
        n.latinName.toLowerCase().includes(q) ||
        (n.division && n.division.toLowerCase().includes(q)) ||
        (n.cranialNerveNumber && `cn ${n.cranialNerveNumber}`.includes(q)) ||
        (n.id.includes('ian') && q.includes('ian'))
      ) {
        results.push({ id: n.id, labelVi: n.nameVi, labelEn: n.nameEn, category: 'Thần kinh' });
      }
    });

    // Search foramina
    Object.values(CRANIAL_FORAMINA).forEach((f) => {
      if (
        f.nameVi.toLowerCase().includes(q) ||
        f.nameEn.toLowerCase().includes(q) ||
        f.latinName.toLowerCase().includes(q)
      ) {
        results.push({ id: f.id, labelVi: f.nameVi, labelEn: f.nameEn, category: 'Lỗ sọ' });
      }
    });

    // Search teeth
    DENTAL_INNERVATION_DATABASE.forEach((t) => {
      if (
        t.nameVi.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        `răng ${t.fdi}`.includes(q) ||
        `${t.fdi}` === q
      ) {
        results.push({ id: `tooth_${t.fdi}`, labelVi: t.nameVi, labelEn: t.nameEn, category: 'Răng hàm' });
      }
    });

    // Search muscles
    MUSCLES_OF_MASTICATION.forEach((m) => {
      if (
        m.nameVi.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q) ||
        m.latinName.toLowerCase().includes(q)
      ) {
        results.push({ id: m.id, labelVi: m.nameVi, labelEn: m.nameEn, category: 'Cơ nhai' });
      }
    });

    return results.slice(0, 10);
  }, [searchQuery]);

  // Breadcrumbs with full specimen mode awareness
  const breadcrumbSegments = useMemo(() => {
    const list: Array<{ label: string; action?: () => void }> = [
      { label: 'MedAnatomy', action: () => setViewMode('full-body') },
      { label: 'Phòng Lab RHM', action: () => setActiveSpecimenMode('general') }
    ];

    if (activeSpecimenMode === 'general') {
      list.push({ label: 'Tổng Thể Sọ Mặt' });
    } else if (activeSpecimenMode === 'cranial_nerves') {
      list.push({ label: 'Thần Kinh Sọ (CN V - XII)' });
      if (selectedAnatomyId) {
        const nerve = DENTAL_NERVE_STRUCTURES[selectedAnatomyId];
        if (nerve) {
          list.push({ label: nerve.nameVi });
        } else {
          const foramen = CRANIAL_FORAMINA[selectedAnatomyId];
          if (foramen) {
            list.push({ label: foramen.nameVi });
          }
        }
      }
    } else if (activeSpecimenMode === 'tooth_specimen') {
      list.push({
        label: 'Tiêu Bản Răng FDI',
        action: () => selectAnatomy(`tooth_${selectedToothFdi}`)
      });
      const tooth = DENTAL_INNERVATION_DATABASE.find((t) => t.fdi === selectedToothFdi);
      if (tooth) {
        list.push({ label: `Răng ${tooth.fdi} (${tooth.nameVi.split('(')[0].trim()})` });
      } else {
        list.push({ label: `Răng FDI ${selectedToothFdi}` });
      }
    } else if (activeSpecimenMode === 'tmj_specimen') {
      list.push({ label: 'Khớp TDH & Cơ Nhai' });
      if (selectedAnatomyId && selectedAnatomyId.startsWith('muscle_')) {
        const m = MUSCLES_OF_MASTICATION.find((mus) => mus.id === selectedAnatomyId);
        list.push({ label: m ? m.nameVi : 'Cơ Nhai' });
      } else {
        list.push({ label: 'Khớp Thái Dương Hàm (TMJ)' });
      }
    } else if (activeSpecimenMode === 'wisdom_surgery') {
      list.push({
        label: 'Phẫu Thuật Răng Khôn',
        action: () => selectAnatomy(wisdomToothId)
      });
      list.push({
        label: wisdomToothId === 'tooth_48' ? 'Răng 48' : 'Răng 38',
        action: () => selectAnatomy(wisdomToothId)
      });
      if (selectedAnatomyId && selectedAnatomyId !== 'tooth_48' && selectedAnatomyId !== 'tooth_38') {
        const itemLabels: Record<string, string> = {
          bone_mandible: 'Xương hàm dưới',
          mandible: 'Xương hàm dưới',
          nerve_ian: 'Thần kinh IAN',
          mandibular_canal: 'Ống hàm dưới',
          nerve_lingual: 'Thần kinh Lưỡi',
          mental_foramen: 'Lỗ cằm',
          mandibular_foramen: 'Lỗ hàm dưới & Gai Spix'
        };
        if (itemLabels[selectedAnatomyId]) {
          list.push({ label: itemLabels[selectedAnatomyId] });
        }
      }
    }

    return list;
  }, [
    activeSpecimenMode,
    selectedAnatomyId,
    selectedToothFdi,
    wisdomToothId,
    setViewMode,
    setActiveSpecimenMode,
    selectAnatomy
  ]);

  return (
    <div
      className={`relative w-full h-[calc(100dvh-64px)] min-h-[540px] flex flex-col select-none overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#080c14] text-slate-100' : 'bg-[#f7f0e7] text-[#28231d]'
      }`}
    >
      {/* 1. ROW 2: SPECIALIZED RHM LAB SUB-HEADER */}
      <header
        className={`h-14 border-b px-4 lg:px-6 flex items-center justify-between gap-3 z-30 transition-colors duration-200 ${
          isDark
            ? 'bg-[#0d121c]/90 border-slate-800/80 backdrop-blur-md'
            : 'bg-[#f5eee3]/90 border-[#e7ded3] backdrop-blur-md'
        }`}
      >
        {/* Left: Lab Title, Breadcrumbs & Status Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 shadow-sm flex-shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xs sm:text-sm font-bold tracking-tight text-current uppercase whitespace-nowrap">
                Craniofacial & Dental Neuro Lab
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 whitespace-nowrap">
                RHM CHUYÊN SÂU
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
              placeholder="Tìm dây TK, lỗ sọ, răng (CN V, IAN, lỗ cằm)..."
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
                    selectAnatomy(res.id);
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

        {/* Right: Quick Visualization Depth Presets & Specialized Modes */}
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
            title="Tìm kiếm giải phẫu"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Depth Mode Pills (Desktop >= 1200px) */}
          <div
            className={`hidden xl:flex items-center p-0.5 rounded-full border text-xs ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#ede3d5] border-[#dfd4c4]'
            }`}
          >
            {(
              [
                { id: 'skeletal', label: 'Xương sọ' },
                { id: 'neural', label: 'Thần kinh' },
                { id: 'dental', label: 'Răng hàm' },
                { id: 'deep', label: 'Xuyên thấu' }
              ] as const
            ).map((d) => (
              <button
                key={d.id}
                onClick={() => setVisualizationDepth(d.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition cursor-pointer ${
                  visualizationDepth === d.id
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-current'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Compact Depth Selector (< 1200px) */}
          <div className="xl:hidden relative">
            <button
              onClick={() => setIsDepthMenuOpen(!isDepthMenuOpen)}
              className={`px-2 py-1 rounded-full text-[11px] font-medium border transition cursor-pointer flex items-center gap-1 ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-[#dfd4c4] text-slate-700'
              }`}
              title="Đổi chế độ lớp hiển thị"
            >
              <Layers className="w-3 h-3 text-amber-500" />
              <span className="hidden sm:inline">
                {visualizationDepth === 'skeletal'
                  ? 'Xương sọ'
                  : visualizationDepth === 'neural'
                  ? 'Thần kinh'
                  : visualizationDepth === 'dental'
                  ? 'Răng hàm'
                  : 'Xuyên thấu'}
              </span>
              <ChevronDown className="w-2.5 h-2.5 opacity-60" />
            </button>
            {isDepthMenuOpen && (
              <div
                className={`absolute right-0 top-8 z-50 rounded-xl shadow-2xl border p-1 min-w-[120px] ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-[#e7ded3]'
                }`}
              >
                {(
                  [
                    { id: 'skeletal', label: 'Xương sọ' },
                    { id: 'neural', label: 'Thần kinh' },
                    { id: 'dental', label: 'Răng hàm' },
                    { id: 'deep', label: 'Xuyên thấu' }
                  ] as const
                ).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setVisualizationDepth(d.id);
                      setIsDepthMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      visualizationDepth === d.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-200'
                        : 'hover:bg-[#ede3d5] text-slate-800'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Anesthesia Mode Button */}
          <button
            onClick={toggleAnesthesiaMode}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              isAnesthesiaMode
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                : isDark
                ? 'bg-slate-900 border-slate-700 text-emerald-300 hover:bg-slate-800'
                : 'bg-white border-[#dfd4c4] text-emerald-600 hover:bg-[#ede3d5]'
            }`}
            title="Chế độ học mốc giải phẫu gây tê vùng nha khoa (Spix, Gow-Gates, Mental)"
          >
            <Syringe className="w-3 h-3" />
            <span className="hidden sm:inline">Gây Tê RHM</span>
          </button>

          {/* Interactive 3D Quiz Mode */}
          <button
            onClick={() => {
              if (quizMode) exitQuiz();
              else startQuiz();
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              quizMode
                ? 'bg-purple-600 border-purple-400 text-white shadow'
                : isDark
                ? 'bg-slate-900 border-slate-700 text-purple-300 hover:bg-slate-800'
                : 'bg-white border-[#dfd4c4] text-purple-600 hover:bg-[#ede3d5]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{quizMode ? 'Thoát' : 'Thi 3D'}</span>
          </button>

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
                placeholder="Tìm dây TK, lỗ sọ, răng (CN V, IAN, lỗ cằm)..."
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
                    selectAnatomy(res.id);
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
                  Không tìm thấy cấu trúc phù hợp
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. SPECIMEN LEVEL SWITCHER STRIP (Bộ Tiêu Bản Chuyên Sâu RHM) */}
      <div
        className={`px-3 sm:px-4 py-1.5 border-b flex items-center justify-between gap-3 z-25 transition-colors duration-200 overflow-x-auto scrollbar-none flex-nowrap ${
          isDark
            ? 'bg-[#0b0f17]/95 border-slate-800/80'
            : 'bg-[#f4ecdf]/95 border-[#e7ded3]'
        }`}
      >
        <DentalSpecimenSwitcher />
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400 whitespace-nowrap pr-2">
          <span>Tiêu Bản:</span>
          <span className="font-bold text-amber-500">
            {activeSpecimenMode === 'general'
              ? 'Toàn bộ rễ & dây thần kinh sọ RHM'
              : activeSpecimenMode === 'tooth_specimen'
              ? 'Cắt lớp 3D Men - Ngà - Tủy Răng FDI'
              : activeSpecimenMode === 'tmj_specimen'
              ? 'Động học Khớp TDH & 4 Cơ Nhai'
              : 'Tiểu phẫu Răng 8 & An toàn IAN'}
          </span>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE WITH RESIZABLE SPLITTERS & MOBILE DRAWERS */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Column (Desktop >= 1200px): Collapsible & Resizable Anatomy Tree */}
        {!isCompact && (
          <DentalNeuroTree
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
              localStorage.setItem('dental_neuro_tree_width', '320');
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

        {/* Center Column: 3D Craniofacial Stage (Always 100% width on mobile & tablet/iPad, fills remaining space on desktop) */}
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
              <span>Hồ Sơ Sọ Mặt</span>
              {selectedAnatomyId && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>
          )}

          {/* Active 3D Specimen Stage */}
          {activeSpecimenMode === 'general' || activeSpecimenMode === 'cranial_nerves' ? (
            <>
              <DentalNeuro3DStage />
              {/* Interactive 3D Quiz Overlay Modal */}
              <DentalNeuroQuiz />
              {/* Standard MedAnatomy-style Context Toolbar */}
              <DentalNeuroToolbar />
            </>
          ) : activeSpecimenMode === 'tooth_specimen' ? (
            <ToothSpecimenStage />
          ) : activeSpecimenMode === 'tmj_specimen' ? (
            <TMJSpecimenStage />
          ) : (
            <WisdomSurgeryStage />
          )}
        </main>

        {/* Right Resizer Splitter (Desktop >= 1200px) */}
        {!isCompact && isInfoOpen && (
          <div
            onPointerDown={handleInfoSplitterPointerDown}
            onDoubleClick={() => {
              setInfoWidth(360);
              localStorage.setItem('dental_neuro_info_width', '360');
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
          <DentalNeuroInfoPanel
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            customWidth={infoWidth}
          />
        )}
      </div>

      {/* 3. TABLET & MOBILE SLIDE-OVER DRAWERS WITH BACKDROP */}
      {isCompact && isTreeOpen && (
        <div className="fixed inset-0 z-50 flex animate-fade-in pointer-events-auto">
          <div
            onClick={() => setIsTreeOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
          />
          <div className="relative z-10 w-[85vw] sm:w-80 max-w-sm h-full bg-[#fbf7f2] dark:bg-[#0c121e] shadow-2xl flex flex-col border-r border-slate-800">
            <DentalNeuroTree
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
          <div className="relative z-10 w-[92vw] sm:w-96 max-w-md h-full bg-[#fbf7f2] dark:bg-[#0c121e] shadow-2xl flex flex-col border-l border-slate-800">
            <DentalNeuroInfoPanel
              isOpen={true}
              onClose={() => setIsInfoOpen(false)}
              isMobileDrawer={true}
            />
          </div>
        </div>
      )}
      {/* 4. MedAnatomy Interactive Modals & Overlays */}
      <AnatomyTraceController isOpen={isTraceOpen} onClose={toggleTrace} />
      <AnatomyCompareViewer isOpen={isCompareOpen} onClose={toggleCompare} />
      <AnatomyStudyManager isOpen={isStudyOpen} onClose={toggleStudy} />
      <AnatomyDebugPanel isOpen={isDebugOpen} onClose={toggleDebug} />
      {isNeuroMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg relative">
            <button
              onClick={toggleNeuroMap}
              className="absolute top-2 right-2 p-1.5 rounded-full text-slate-400 hover:text-white z-10 cursor-pointer"
            >
              ✕
            </button>
            <DentalNeurovascularMap toothFdi={selectedToothFdi} isOpen={isNeuroMapOpen} onClose={toggleNeuroMap} />
          </div>
        </div>
      )}
    </div>
  );
};