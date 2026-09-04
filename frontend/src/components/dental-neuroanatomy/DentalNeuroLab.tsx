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
  Home
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

export const DentalNeuroLab: React.FC = () => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);

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

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Parse URL search parameters on mount (?structure=nerve.inferior-alveolar or ?structure=tooth.36)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const structureParam = params.get('structure');
    if (structureParam) {
      const clean = structureParam.toLowerCase();
      if (clean === 'nerve.inferior-alveolar' || clean === 'ian') {
        selectAnatomy('nerve_ian');
      } else if (clean === 'foramen.mental' || clean === 'mental_foramen') {
        selectAnatomy('mental_foramen');
      } else if (clean === 'foramen.ovale') {
        selectAnatomy('foramen_ovale');
      } else if (clean.startsWith('tooth.') || clean.startsWith('tooth_')) {
        const num = clean.replace(/tooth[._]/, '');
        selectAnatomy(`tooth_${num}`);
      } else if (clean === 'v3' || clean === 'cn-v3') {
        selectAnatomy('cn_5_v3');
      } else if (clean === 'cn-v' || clean === 'trigeminal') {
        selectAnatomy('cn_5');
      } else {
        const mapped = clean.replace(/\./g, '_');
        if (DENTAL_NERVE_STRUCTURES[mapped] || CRANIAL_FORAMINA[mapped]) {
          selectAnatomy(mapped);
        }
      }
    }
  }, [selectAnatomy]);

  // Sync active structure with URL search param
  useEffect(() => {
    if (!selectedAnatomyId) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('structure')) {
        url.searchParams.delete('structure');
        window.history.replaceState({}, '', url.pathname);
      }
      return;
    }

    const url = new URL(window.location.href);
    let structureValue = selectedAnatomyId;
    if (selectedAnatomyId === 'nerve_ian') structureValue = 'nerve.inferior-alveolar';
    else if (selectedAnatomyId === 'mental_foramen') structureValue = 'foramen.mental';
    else if (selectedAnatomyId.startsWith('tooth_')) structureValue = selectedAnatomyId.replace('_', '.');

    url.searchParams.set('structure', structureValue);
    window.history.replaceState({ structure: selectedAnatomyId }, '', url.toString());
  }, [selectedAnatomyId]);

  // Filtered search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{ id: string; labelVi: string; labelEn: string; category: string }> = [];

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

  // Breadcrumbs
  const breadcrumbSegments = useMemo(() => {
    const list: Array<{ label: string; action?: () => void }> = [
      { label: 'MedAnatomy', action: () => setViewMode('full-body') },
      { label: 'Phòng Lab RHM' },
      { label: 'Neuroanatomy' }
    ];

    if (selectedAnatomyId) {
      const nerve = DENTAL_NERVE_STRUCTURES[selectedAnatomyId];
      if (nerve) {
        list.push({ label: nerve.nameVi });
      } else {
        const foramen = CRANIAL_FORAMINA[selectedAnatomyId];
        if (foramen) {
          list.push({ label: foramen.nameVi });
        } else if (selectedAnatomyId.startsWith('tooth_')) {
          list.push({ label: selectedAnatomyId.replace('tooth_', 'Răng ') });
        }
      }
    }

    return list;
  }, [selectedAnatomyId, setViewMode]);

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
              {breadcrumbSegments.map((seg, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ChevronRight className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" />}
                  {seg.action ? (
                    <button
                      onClick={seg.action}
                      className="hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer truncate"
                    >
                      {seg.label}
                    </button>
                  ) : (
                    <span
                      className={`truncate ${
                        i === breadcrumbSegments.length - 1
                          ? 'font-semibold text-amber-600 dark:text-amber-400'
                          : ''
                      }`}
                    >
                      {seg.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="relative flex-1 max-w-xs hidden md:block">
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
        <div className="flex items-center gap-1.5">
          {/* Depth Mode Pills */}
          <div
            className={`hidden lg:flex items-center p-0.5 rounded-full border text-xs ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#ede3d5] border-[#dfd4c4]'
            }`}
          >
            {(
              [
                { id: 'surface', label: 'Bề mặt' },
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

          {/* Mandibular Canal Mode Button */}
          <button
            onClick={toggleMandibularCanalMode}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              isMandibularCanalMode
                ? 'bg-rose-600 border-rose-400 text-white shadow-md animate-pulse'
                : isDark
                ? 'bg-slate-900 border-slate-700 text-rose-300 hover:bg-slate-800'
                : 'bg-white border-[#dfd4c4] text-rose-600 hover:bg-[#ede3d5]'
            }`}
            title="Chế độ cô lập Xương hàm dưới, Ống răng dưới và Thần kinh IAN"
          >
            <Activity className="w-3 h-3" />
            <span className="hidden xl:inline">Ống Hàm Dưới</span>
          </button>

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
            <span className="hidden xl:inline">Gây Tê RHM</span>
          </button>

          {/* X-Ray Radiographic View */}
          <button
            onClick={toggleRadiographicView}
            className={`p-1.5 rounded-full border transition flex items-center justify-center cursor-pointer ${
              isRadiographicView
                ? 'bg-sky-600 border-sky-400 text-white shadow-md'
                : isDark
                ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-white border-[#dfd4c4] text-slate-600 hover:text-[#28231d]'
            }`}
            title="Chế độ Radiographic (X-Ray xuyên thấu xương thấy rõ thần kinh và răng)"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Interactive 3D Quiz Mode */}
          <button
            onClick={() => {
              if (quizMode) exitQuiz();
              else startQuiz();
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              quizMode
                ? 'bg-purple-600 border-purple-400 text-white shadow'
                : isDark
                ? 'bg-slate-900 border-slate-700 text-purple-300 hover:bg-slate-800'
                : 'bg-white border-[#dfd4c4] text-purple-600 hover:bg-[#ede3d5]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{quizMode ? 'Thoát' : 'Thi 3D'}</span>
          </button>

          {/* Reset All */}
          <button
            onClick={resetAll}
            className={`p-1.5 rounded-full border transition cursor-pointer ${
              isDark
                ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                : 'border-[#dfd4c4] bg-white text-slate-600 hover:text-[#28231d]'
            }`}
            title="Khôi phục góc nhìn mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. MAIN 3-COLUMN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Column: Anatomy Tree */}
        <DentalNeuroTree />

        {/* Center Column: 3D Craniofacial Stage */}
        <main className="flex-1 relative h-full overflow-hidden">
          <DentalNeuro3DStage />

          {/* Interactive 3D Quiz Overlay Modal */}
          <DentalNeuroQuiz />

          {/* Standard MedAnatomy-style Context Toolbar */}
          <DentalNeuroToolbar />
        </main>

        {/* Right Column: Medical Dossier & Clinical Anesthesia Guide */}
        <DentalNeuroInfoPanel />
      </div>
    </div>
  );
};
