import React, { useState, useMemo } from 'react';
import {
  Brain,
  Skull,
  Zap,
  Search,
  Layers,
  Sparkles,
  Syringe,
  Activity,
  Sliders,
  RotateCcw,
  Eye,
  EyeOff,
  HelpCircle,
  Scissors
} from 'lucide-react';
import { useDentalNeuroStore, VisualizationDepth } from '../../stores/useDentalNeuroStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  MUSCLES_OF_MASTICATION
} from '../../data/dentalNeuroData';
import { DentalNeuroTree } from './DentalNeuroTree';
import { DentalNeuro3DStage } from './DentalNeuro3DStage';
import { DentalNeuroInfoPanel } from './DentalNeuroInfoPanel';
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

  const showForaminaMarkers = useDentalNeuroStore((s) => s.showForaminaMarkers);
  const toggleForaminaMarkers = useDentalNeuroStore((s) => s.toggleForaminaMarkers);

  const showTeethMarkers = useDentalNeuroStore((s) => s.showTeethMarkers);
  const toggleTeethMarkers = useDentalNeuroStore((s) => s.toggleTeethMarkers);

  const clippingPlane = useDentalNeuroStore((s) => s.clippingPlane);
  const setClippingPlane = useDentalNeuroStore((s) => s.setClippingPlane);

  const quizMode = useDentalNeuroStore((s) => s.quizMode);
  const startQuiz = useDentalNeuroStore((s) => s.startQuiz);
  const exitQuiz = useDentalNeuroStore((s) => s.exitQuiz);
  const resetAll = useDentalNeuroStore((s) => s.resetAll);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  // Breadcrumbs calculation
  const breadcrumbs = useMemo(() => {
    if (!selectedAnatomyId) return ['Sọ Mặt & Thần Kinh Sọ'];

    const nerve = DENTAL_NERVE_STRUCTURES[selectedAnatomyId];
    if (nerve) {
      const path = ['Thần kinh sọ'];
      if (nerve.cranialNerveNumber === 5) {
        path.push('CN V (Trigeminal)');
        if (nerve.division) path.push(nerve.division);
      }
      path.push(nerve.nameVi);
      return path;
    }

    const foramen = CRANIAL_FORAMINA[selectedAnatomyId];
    if (foramen) {
      return ['Nền sọ', 'Lỗ sọ (Foramina)', foramen.nameVi];
    }

    if (selectedAnatomyId.startsWith('tooth_')) {
      return ['Cung răng', 'Răng Hàm Mặt', selectedAnatomyId.replace('tooth_', 'Răng ')];
    }

    return ['Giải phẫu sọ mặt', selectedAnatomyId];
  }, [selectedAnatomyId]);

  return (
    <div className="relative w-full h-[calc(100dvh-64px)] min-h-[540px] flex flex-col bg-[#080c14] text-slate-100 overflow-hidden select-none">
      {/* 1. TOP SPECIALIZED TOOLBAR */}
      <header className="h-12 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur px-3 flex items-center justify-between gap-3 z-30">
        {/* Left: Lab Title & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                  Craniofacial & Dental Neuro Lab
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
                  RHM CHUYÊN SÂU
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-slate-600">/</span>}
                    <span className={i === breadcrumbs.length - 1 ? 'text-amber-400 font-semibold' : ''}>
                      {b}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="relative flex-1 max-w-xs hidden lg:block">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Tìm dây TK, lỗ sọ, răng (CN V, IAN, lỗ cằm)..."
              className="w-full h-7 pl-8 pr-3 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition"
            />
          </div>

          {/* Search dropdown results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-8 left-0 right-0 bg-slate-900/95 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => {
                    selectAnatomy(res.id);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center justify-between text-xs border-b border-slate-800/60 last:border-none"
                >
                  <div>
                    <div className="font-semibold text-slate-100">{res.labelVi}</div>
                    <div className="text-[10px] text-slate-400 font-serif italic">{res.labelEn}</div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    {res.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Visualization Presets & Specialized Modes */}
        <div className="flex items-center gap-1.5">
          {/* Depth Mode Pills */}
          <div className="hidden sm:flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
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
                className={`px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                  visualizationDepth === d.id
                    ? 'bg-amber-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Mandibular Canal Mode Button */}
          <button
            onClick={toggleMandibularCanalMode}
            className={`px-2 py-1 rounded text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              isMandibularCanalMode
                ? 'bg-rose-600 border-rose-400 text-white shadow-lg animate-pulse'
                : 'bg-slate-900 border-slate-700 text-rose-300 hover:bg-slate-800'
            }`}
            title="Chế độ cô lập Xương hàm dưới, Ống răng dưới và Thần kinh IAN"
          >
            <Activity className="w-3 h-3" />
            <span className="hidden md:inline">Ống Hàm Dưới</span>
          </button>

          {/* Anesthesia Mode Button */}
          <button
            onClick={toggleAnesthesiaMode}
            className={`px-2 py-1 rounded text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              isAnesthesiaMode
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-700 text-emerald-300 hover:bg-slate-800'
            }`}
            title="Chế độ học mốc giải phẫu gây tê vùng nha khoa (Halsted, Gow-Gates, Mental)"
          >
            <Syringe className="w-3 h-3" />
            <span className="hidden md:inline">Gây Tê RHM</span>
          </button>

          {/* X-Ray Radiographic View */}
          <button
            onClick={toggleRadiographicView}
            className={`p-1.5 rounded border transition flex items-center justify-center cursor-pointer ${
              isRadiographicView
                ? 'bg-sky-600 border-sky-400 text-white'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
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
            className={`px-2.5 py-1 rounded text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              quizMode
                ? 'bg-purple-600 border-purple-400 text-white shadow'
                : 'bg-slate-900 border-slate-700 text-purple-300 hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{quizMode ? 'Thoát Quiz' : 'Thi 3D'}</span>
          </button>

          {/* Reset All */}
          <button
            onClick={resetAll}
            className="p-1.5 rounded border border-slate-700 bg-slate-900 text-slate-400 hover:text-white"
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

          {/* Floating Bottom Viewport Controls */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/85 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur shadow-2xl text-xs">
            {/* Toggle Foramina Rings */}
            <button
              onClick={toggleForaminaMarkers}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition ${
                showForaminaMarkers ? 'text-sky-400 font-bold bg-sky-950/60' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Skull className="w-3 h-3" />
              <span>Lỗ Sọ</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Toggle Teeth Markers */}
            <button
              onClick={toggleTeethMarkers}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition ${
                showTeethMarkers ? 'text-amber-400 font-bold bg-amber-950/60' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span>🦷 Răng FDI</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Clipping Plane Toggle */}
            <button
              onClick={() => setClippingPlane({ enabled: !clippingPlane.enabled })}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition ${
                clippingPlane.enabled ? 'text-rose-400 font-bold bg-rose-950/60' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Cắt lớp 3D xương sọ và hàm"
            >
              <Scissors className="w-3 h-3" />
              <span>Mặt cắt</span>
            </button>

            {clippingPlane.enabled && (
              <input
                type="range"
                min="-0.25"
                max="0.25"
                step="0.01"
                value={clippingPlane.offset}
                onChange={(e) => setClippingPlane({ offset: parseFloat(e.target.value) })}
                className="w-20 accent-rose-500 cursor-pointer h-1"
              />
            )}
          </div>
        </main>

        {/* Right Column: Medical Dossier & Clinical Anesthesia Guide */}
        <DentalNeuroInfoPanel />
      </div>
    </div>
  );
};
