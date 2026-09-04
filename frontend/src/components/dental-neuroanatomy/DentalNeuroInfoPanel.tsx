import React from 'react';
import {
  Brain,
  Skull,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Compass,
  FileText,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Syringe,
  Stethoscope,
  Info,
  X,
  PanelRightClose,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  MUSCLES_OF_MASTICATION,
  CLINICAL_ANESTHESIA_TECHNIQUES,
  ANATOMICAL_RELATIONS
} from '../../data/dentalNeuroData';

interface DentalNeuroInfoPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  customWidth?: number;
  isMobileDrawer?: boolean;
}

export const DentalNeuroInfoPanel: React.FC<DentalNeuroInfoPanelProps> = ({
  isOpen = true,
  onClose,
  customWidth = 360,
  isMobileDrawer = false
}) => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const selectedSide = useDentalNeuroStore((s) => s.selectedSide);

  const activeNerveTraceId = useDentalNeuroStore((s) => s.activeNerveTraceId);
  const tracePlaybackState = useDentalNeuroStore((s) => s.tracePlaybackState);
  const startTrace = useDentalNeuroStore((s) => s.startTrace);
  const pauseTrace = useDentalNeuroStore((s) => s.pauseTrace);
  const resumeTrace = useDentalNeuroStore((s) => s.resumeTrace);
  const resetTrace = useDentalNeuroStore((s) => s.resetTrace);
  const toggleAnesthesiaMode = useDentalNeuroStore((s) => s.toggleAnesthesiaMode);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  // 1. Identify selected structure type
  const nerve = selectedAnatomyId ? DENTAL_NERVE_STRUCTURES[selectedAnatomyId] : null;
  const foramen = selectedAnatomyId ? CRANIAL_FORAMINA[selectedAnatomyId] : null;
  const tooth =
    selectedAnatomyId && selectedAnatomyId.startsWith('tooth_')
      ? DENTAL_INNERVATION_DATABASE.find((t) => `tooth_${t.fdi}` === selectedAnatomyId)
      : null;
  const muscle = selectedAnatomyId
    ? MUSCLES_OF_MASTICATION.find((m) => m.id === selectedAnatomyId)
    : null;

  // 2. Relational graph for selected item
  const outgoingRelations = selectedAnatomyId
    ? ANATOMICAL_RELATIONS.filter((r) => r.sourceId === selectedAnatomyId)
    : [];
  const incomingRelations = selectedAnatomyId
    ? ANATOMICAL_RELATIONS.filter((r) => r.targetId === selectedAnatomyId)
    : [];

  // 3. Clinical anesthesia match
  const relatedAnesthesia = selectedAnatomyId
    ? CLINICAL_ANESTHESIA_TECHNIQUES.find((a) => a.targetNerveIds.includes(selectedAnatomyId))
    : null;

  // Proximal / Distal navigation
  const handleGoProximal = () => {
    if (nerve && nerve.parentNerveId) {
      selectAnatomy(nerve.parentNerveId);
    }
  };

  const handleGoDistal = () => {
    if (nerve) {
      const child = Object.values(DENTAL_NERVE_STRUCTURES).find((n) => n.parentNerveId === nerve.id);
      if (child) {
        selectAnatomy(child.id);
      }
    }
  };

  const handleDeselect = () => {
    selectAnatomy(null);
  };

  // When nothing is selected, show an engaging, high-yield overview navigator
  if (!selectedAnatomyId) {
    return (
      <aside
        style={!isMobileDrawer ? { width: isOpen ? `${customWidth}px` : 0 } : undefined}
        className={`h-full border-l flex flex-col z-20 select-none overflow-hidden ${
          isMobileDrawer
            ? 'w-full'
            : isOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none border-l-0'
        } ${
          isDark
            ? 'bg-[#0c121e]/95 border-slate-800 text-slate-200'
            : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d]'
        }`}
      >
        {/* Header */}
        <div
          className={`p-3 border-b flex items-center justify-between flex-shrink-0 ${
            isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-[#f3ece2]/60 border-[#e7ded3]'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-current truncate">
                Hồ Sơ Sọ Mặt & Thần Kinh
              </h2>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-mono truncate">
                HIGH-YIELD OVERVIEW
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer flex-shrink-0"
              title="Thu gọn hồ sơ"
            >
              <PanelRightClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* High-yield Quick Cards */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs font-sans">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Chọn một cấu trúc trên mô hình 3D hoặc bấm thẻ bên dưới để xem đường đi chi tiết và ứng dụng lâm sàng:
          </p>

          {/* Card 1: CN V */}
          <div
            onClick={() => selectAnatomy('cn_5')}
            className={`p-3 rounded-xl border transition cursor-pointer group ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/60 hover:bg-slate-900'
                : 'bg-white/80 border-[#e7ded3] hover:border-amber-600/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                CN V • Tam thoa
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
            </div>
            <h4 className="font-serif font-bold text-sm text-current">Dây V & 3 Phân nhánh</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Trục thần kinh cảm giác trung tâm sọ mặt: V1 (Mắt), V2 (Hàm trên), V3 (Hàm dưới & cơ nhai).
            </p>
          </div>

          {/* Card 2: IAN */}
          <div
            onClick={() => selectAnatomy('nerve_ian')}
            className={`p-3 rounded-xl border transition cursor-pointer group ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-rose-500/60 hover:bg-slate-900'
                : 'bg-white/80 border-[#e7ded3] hover:border-rose-600/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-rose-500 uppercase">
                Gây tê lâm sàng
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
            </div>
            <h4 className="font-serif font-bold text-sm text-current">Thần kinh IAN & Gai Spix</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Đường đi trong ống hàm dưới, chi phối cảm giác toàn bộ răng hàm dưới và mốc gây tê gai Spix.
            </p>
          </div>

          {/* Card 3: CN VII */}
          <div
            onClick={() => selectAnatomy('cn_7')}
            className={`p-3 rounded-xl border transition cursor-pointer group ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900'
                : 'bg-white/80 border-[#e7ded3] hover:border-emerald-600/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">
                CN VII • Thần kinh Mặt
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
            </div>
            <h4 className="font-serif font-bold text-sm text-current">5 Nhánh Vận Động Biểu Cảm</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Thoát ra khỏi sọ qua lỗ trâm chũm, xuyên tuyến mang tai chi phối cơ mặt (Thái dương, Gò má, Má, Bờ hàm, Cổ).
            </p>
          </div>

          {/* Card 4: Foramina */}
          <div
            onClick={() => selectAnatomy('foramen_ovale')}
            className={`p-3 rounded-xl border transition cursor-pointer group ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-sky-500/60 hover:bg-slate-900'
                : 'bg-white/80 border-[#e7ded3] hover:border-sky-600/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-sky-500 uppercase">
                Nền sọ & Lỗ sọ
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
            </div>
            <h4 className="font-serif font-bold text-sm text-current">Lỗ Bầu Dục, Lỗ Tròn, Lỗ Cằm</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              17 lỗ và ống xương then chốt dẫn truyền các dây thần kinh sọ và bó mạch hàm mặt.
            </p>
          </div>

          {/* Quick Anesthesia launch */}
          <div className="pt-2">
            <button
              onClick={toggleAnesthesiaMode}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition"
            >
              <Syringe className="w-3.5 h-3.5" />
              <span>Chế độ Học Gây Tê Nha Khoa</span>
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      style={!isMobileDrawer ? { width: isOpen ? `${customWidth}px` : 0 } : undefined}
      className={`h-full border-l flex flex-col z-20 select-none overflow-hidden ${
        isMobileDrawer
          ? 'w-full'
          : isOpen
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none border-l-0'
      } ${
        isDark
          ? 'bg-[#0c121e]/95 border-slate-800 text-slate-200'
          : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d]'
      }`}
    >
      {/* 1. Header Banner */}
      <div
        className={`p-3.5 border-b flex-shrink-0 ${
          isDark
            ? 'bg-slate-950/70 border-slate-800/80'
            : 'bg-[#f3ece2]/70 border-[#e7ded3]'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              {nerve ? 'DÂY THẦN KINH SỌ' : foramen ? 'LỖ NỀN SỌ' : tooth ? 'RĂNG & HUYỆT RĂNG' : 'CƠ NHAI'}
            </span>
            {selectedSide && (
              <span
                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  selectedSide === 'right'
                    ? 'bg-amber-600/20 text-amber-600 dark:text-amber-400 border-amber-500/40'
                    : 'bg-sky-600/20 text-sky-600 dark:text-sky-400 border-sky-500/40'
                }`}
              >
                {selectedSide === 'right' ? '◧ Bên Phải (R)' : '◨ Bên Trái (L)'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {nerve && (
              <>
                <button
                  onClick={handleGoProximal}
                  disabled={!nerve.parentNerveId}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-medium border transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'border-[#dfd5c7] bg-[#ede3d5] text-slate-700 hover:bg-[#e4d6c4]'
                  }`}
                  title="Đi về phía gốc thần kinh (Parent nerve)"
                >
                  ← Gốc
                </button>
                <button
                  onClick={handleGoDistal}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-medium border transition cursor-pointer ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'border-[#dfd5c7] bg-[#ede3d5] text-slate-700 hover:bg-[#e4d6c4]'
                  }`}
                  title="Đi về phía nhánh ngoại vi (Distal branch)"
                >
                  Ngọn →
                </button>
              </>
            )}
            <button
              onClick={handleDeselect}
              className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer ml-1"
              title="Bỏ chọn / Đóng chi tiết"
            >
              <X className="w-4 h-4" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                title="Thu gọn panel"
              >
                <PanelRightClose className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <h1 className="font-serif text-lg font-bold text-current mt-2 leading-tight">
          {nerve?.nameVi || foramen?.nameVi || tooth?.nameVi || muscle?.nameVi}
        </h1>
        <p className="text-xs font-serif italic text-amber-600 dark:text-amber-400 mt-0.5">
          {nerve?.latinName || foramen?.latinName || tooth?.nameEn || muscle?.latinName}
        </p>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs font-sans">
        {/* NERVE TRACING CONTROLS */}
        {nerve && nerve.path3D && (
          <div
            className={`p-3 rounded-xl border ${
              isDark
                ? 'border-amber-500/30 bg-amber-950/20'
                : 'border-amber-500/30 bg-amber-500/10'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-serif font-bold text-amber-700 dark:text-amber-300 uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Truy Vết Đường Đi 3D
              </span>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">Proximal → Distal</span>
            </div>
            <div className="flex items-center gap-1.5">
              {activeNerveTraceId === nerve.id && tracePlaybackState === 'playing' ? (
                <button
                  onClick={pauseTrace}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Tạm dừng</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (activeNerveTraceId === nerve.id && tracePlaybackState === 'paused') {
                      resumeTrace();
                    } else {
                      startTrace(nerve.id);
                    }
                  }}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Chạy mô phỏng</span>
                </button>
              )}
              <button
                onClick={resetTrace}
                className={`p-1.5 rounded-lg border transition cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'border-[#dfd5c7] bg-[#ede3d5] text-slate-700 hover:bg-[#e4d6c4]'
                }`}
                title="Khôi phục trạng thái ban đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* NERVE SPECIFIC INFORMATION */}
        {nerve && (
          <div className="space-y-3">
            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                  : 'bg-white/70 border-[#e7ded3] text-slate-800'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Nguyên ủy (Origin)</span>
              </h3>
              <p className="text-[11px] leading-relaxed opacity-90">{nerve.originVi}</p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                  : 'bg-white/70 border-[#e7ded3] text-slate-800'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Đường đi & Liên quan (Course)</span>
              </h3>
              <p className="text-[11px] leading-relaxed opacity-90">{nerve.courseVi}</p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                  : 'bg-white/70 border-[#e7ded3] text-slate-800'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Chi phối Chức năng (Innervation)</span>
              </h3>
              <p className="text-[11px] leading-relaxed opacity-90">{nerve.innervationVi}</p>
            </div>

            {/* CLINICAL ANATOMY */}
            <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/20 text-xs">
              <div className="font-serif font-bold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Ý nghĩa lâm sàng & Phẫu thuật</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90 text-rose-900 dark:text-rose-200">
                {nerve.clinicalAnatomyVi}
              </p>
            </div>
          </div>
        )}

        {/* FORAMEN SPECIFIC INFORMATION */}
        {foramen && (
          <div className="space-y-3">
            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                  : 'bg-white/70 border-[#e7ded3] text-slate-800'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-1.5">
                <Skull className="w-3.5 h-3.5" />
                <span>Vị trí Xương (Bone Location)</span>
              </h3>
              <p className="text-[11px] leading-relaxed opacity-90">
                {foramen.boneVi} <span className="text-slate-400">({foramen.boneEn})</span>
              </p>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                  : 'bg-white/70 border-[#e7ded3] text-slate-800'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Cấu trúc đi qua</span>
              </h3>
              <ul className="space-y-1">
                {foramen.structuresPassingThroughVi.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/20 text-xs">
              <div className="font-serif font-bold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Ý nghĩa lâm sàng</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90 text-rose-900 dark:text-rose-200">
                {foramen.clinicalSignificanceVi}
              </p>
            </div>
          </div>
        )}

        {/* TOOTH SPECIFIC INFORMATION */}
        {tooth && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div
                className={`p-2 rounded-xl border ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                }`}
              >
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-mono uppercase">
                  RĂNG FDI
                </span>
                <span className="font-serif text-base font-bold text-amber-600 dark:text-amber-400">
                  {tooth.fdi}
                </span>
              </div>
              <div
                className={`p-2 rounded-xl border ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                }`}
              >
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-mono uppercase">
                  PHÂN CUNG
                </span>
                <span className="font-serif text-xs font-bold text-emerald-600 dark:text-emerald-400 block truncate" title={`Cung ${tooth.quadrant}: ${tooth.quadrant === 1 ? 'Hàm trên Phải' : tooth.quadrant === 2 ? 'Hàm trên Trái' : tooth.quadrant === 3 ? 'Hàm dưới Trái' : 'Hàm dưới Phải'}`}>
                  Cung {tooth.quadrant}
                </span>
              </div>
              <div
                className={`p-2 rounded-xl border ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                }`}
              >
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-mono uppercase">
                  SỐ ỐNG TỦY
                </span>
                <span className="font-serif text-xs font-bold text-sky-600 dark:text-sky-400 block truncate" title={tooth.canalCount}>
                  {tooth.canalCount}
                </span>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-sky-950/20 border-sky-500/30'
                  : 'bg-sky-50 border-sky-200'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-sky-700 dark:text-sky-300 uppercase mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-sky-500" />
                <span>Hệ Thần Kinh Chi Phối</span>
              </h3>
              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Tủy & Nha chu: </span>
                  <button
                    onClick={() => selectAnatomy(tooth.pulpInnervationId)}
                    className="font-bold text-amber-600 dark:text-amber-300 underline hover:opacity-80 cursor-pointer"
                  >
                    {DENTAL_NERVE_STRUCTURES[tooth.pulpInnervationId]?.nameVi || tooth.pulpInnervationId}
                  </button>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Lợi mặt ngoài: </span>
                  <button
                    onClick={() => selectAnatomy(tooth.buccalGingivaInnervationId)}
                    className="font-medium text-orange-600 dark:text-orange-300 underline hover:opacity-80 cursor-pointer"
                  >
                    {DENTAL_NERVE_STRUCTURES[tooth.buccalGingivaInnervationId]?.nameVi ||
                      tooth.buccalGingivaInnervationId}
                  </button>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Lợi mặt trong: </span>
                  <button
                    onClick={() => selectAnatomy(tooth.lingualGingivaInnervationId)}
                    className="font-medium text-purple-600 dark:text-purple-300 underline hover:opacity-80 cursor-pointer"
                  >
                    {DENTAL_NERVE_STRUCTURES[tooth.lingualGingivaInnervationId]?.nameVi ||
                      tooth.lingualGingivaInnervationId}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/20 text-xs">
              <div className="font-serif font-bold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                <Syringe className="w-3.5 h-3.5" />
                <span>Gây tê khuyến nghị</span>
              </div>
              <p className="text-[11px] leading-relaxed text-rose-900 dark:text-rose-200">
                {tooth.anesthesiaTechniqueVi}
              </p>
            </div>
          </div>
        )}

        {/* MUSCLE SPECIFIC INFORMATION */}
        {muscle && (
          <div className="space-y-3">
            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                  : 'bg-white/70 border-[#e7ded3] text-slate-800'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-amber-600 dark:text-amber-400 mb-1.5">
                Nguyên ủy & Bám tận
              </h3>
              <div className="space-y-1 text-[11px]">
                <p>
                  <span className="text-slate-500 dark:text-slate-400">Nguyên ủy: </span>
                  {muscle.originVi}
                </p>
                <p>
                  <span className="text-slate-500 dark:text-slate-400">Bám tận: </span>
                  {muscle.insertionVi}
                </p>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                  : 'bg-white/70 border-[#e7ded3] text-slate-800'
              }`}
            >
              <h3 className="font-serif font-bold text-xs text-amber-600 dark:text-amber-400 mb-1">
                Động tác (Action)
              </h3>
              <p className="text-[11px] leading-relaxed">{muscle.actionVi}</p>
            </div>

            <div>
              <button
                onClick={() => selectAnatomy(muscle.innervationId)}
                className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                  isDark
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-300 hover:bg-amber-950/40'
                    : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <div className="font-serif font-bold text-xs mb-0.5">Thần kinh Chi phối</div>
                <div className="text-[11px] font-medium opacity-90">
                  Nhánh cơ nhai của Thần kinh Hàm dưới (CN V3) →
                </div>
              </button>
            </div>
          </div>
        )}

        {/* CLINICAL ANESTHESIA GUIDE BOX */}
        {relatedAnesthesia && (
          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-1.5">
            <h4 className="font-serif font-bold text-xs text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <Syringe className="w-3.5 h-3.5 text-rose-500" />
              <span>Gây Tê Vùng: {relatedAnesthesia.nameVi}</span>
            </h4>
            <p className="text-[11px] leading-relaxed opacity-90">
              <span className="font-semibold text-rose-600 dark:text-rose-300">Mốc giải phẫu: </span>
              {relatedAnesthesia.landmarkVi}
            </p>
            <div className="text-[10px] text-rose-800 dark:text-rose-300 pt-1.5 border-t border-rose-500/20">
              ⚠️ Biến chứng cần tránh: {relatedAnesthesia.potentialComplicationsVi.join(', ')}.
            </div>
          </div>
        )}

        {/* RELATIONAL GRAPH */}
        {(outgoingRelations.length > 0 || incomingRelations.length > 0) && (
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Sơ đồ mối quan hệ giải phẫu</span>
            </h3>
            <div
              className={`space-y-1.5 p-3 rounded-xl border ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
              }`}
            >
              {outgoingRelations.map((rel, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">{rel.relationType}</span>
                  <span className="text-slate-400">→</span>
                  <button
                    onClick={() => selectAnatomy(rel.targetId)}
                    className="font-bold text-amber-600 dark:text-amber-400 hover:underline truncate cursor-pointer"
                  >
                    {DENTAL_NERVE_STRUCTURES[rel.targetId]?.nameVi ||
                      CRANIAL_FORAMINA[rel.targetId]?.nameVi ||
                      rel.targetId}
                  </button>
                </div>
              ))}
              {incomingRelations.map((rel, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                  <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <button
                    onClick={() => selectAnatomy(rel.sourceId)}
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline truncate cursor-pointer"
                  >
                    {DENTAL_NERVE_STRUCTURES[rel.sourceId]?.nameVi ||
                      CRANIAL_FORAMINA[rel.sourceId]?.nameVi ||
                      rel.sourceId}
                  </button>
                  <span className="text-slate-400">→</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">{rel.relationType}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VERIFIED REFERENCES */}
        {nerve && nerve.references && (
          <div
            className={`p-3 rounded-xl border text-[10px] space-y-1.5 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {nerve.references.reviewStatus}
              </span>
              <span className="font-mono">{nerve.references.terminologiaAnatomica}</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-inherit">
              <span>Kiểm duyệt: {nerve.references.reviewedBy}</span>
              <span>Netter #{nerve.references.netterPlate}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
