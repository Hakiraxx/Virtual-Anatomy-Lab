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
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Volume2,
  Activity,
  Scissors,
  Layers
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
import {
  DENTAL_SPECIMENS_DATABASE,
  getDentalSpecimen,
  TMJ_SPECIMEN_DATA,
  MASTICATORY_MUSCLES_DETAIL,
  WISDOM_SURGICAL_DATABASE
} from '../../data/dentalSpecimensData';
import { ToothPositionResolver } from '../../utils/ToothPositionResolver';
import { getAnatomicalPronunciation } from '../../data/anatomyPronunciationData';
import { pronunciationPlayer } from '../../utils/pronunciationPlayer';

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
  const toothRecord = selectedAnatomyId ? ToothPositionResolver.resolve(selectedAnatomyId) : null;
  const tooth = toothRecord
    ? DENTAL_INNERVATION_DATABASE.find((t) => t.fdi === toothRecord.fdi) || null
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

  const activeSpecimenMode = useDentalNeuroStore((s) => s.activeSpecimenMode);
  const selectedToothFdi = useDentalNeuroStore((s) => s.selectedToothFdi);
  const setSelectedToothFdi = useDentalNeuroStore((s) => s.setSelectedToothFdi);
  const wisdomToothId = useDentalNeuroStore((s) => s.wisdomToothId);
  const setWisdomToothId = useDentalNeuroStore((s) => s.setWisdomToothId);
  const wisdomWinterType = useDentalNeuroStore((s) => s.wisdomWinterType);
  const setWisdomWinterType = useDentalNeuroStore((s) => s.setWisdomWinterType);
  const wisdomPellGregoryClass = useDentalNeuroStore((s) => s.wisdomPellGregoryClass);
  const setWisdomPellGregoryClass = useDentalNeuroStore((s) => s.setWisdomPellGregoryClass);
  const wisdomPellGregoryPos = useDentalNeuroStore((s) => s.wisdomPellGregoryPos);
  const setWisdomPellGregoryPos = useDentalNeuroStore((s) => s.setWisdomPellGregoryPos);
  const wisdomSurgicalStep = useDentalNeuroStore((s) => s.wisdomSurgicalStep);
  const setWisdomSurgicalStep = useDentalNeuroStore((s) => s.setWisdomSurgicalStep);
  const wisdomStudyMode = useDentalNeuroStore((s) => s.wisdomStudyMode);
  const setWisdomStudyMode = useDentalNeuroStore((s) => s.setWisdomStudyMode);
  const focusAnatomy = useDentalNeuroStore((s) => s.focusAnatomy);
  const tmjJawState = useDentalNeuroStore((s) => s.tmjJawState);
  const tmjMotionMode = useDentalNeuroStore((s) => s.tmjMotionMode);
  const tmjPathology = useDentalNeuroStore((s) => s.tmjPathology);
  const setTmjPathology = useDentalNeuroStore((s) => s.setTmjPathology);
  const tmjActiveMuscleId = useDentalNeuroStore((s) => s.tmjActiveMuscleId);
  const setTmjActiveMuscleId = useDentalNeuroStore((s) => s.setTmjActiveMuscleId);

  // 1. SPECIMEN MODE: TOOTH FDI CLINICAL & ENDODONTIC DOSSIER
  if (activeSpecimenMode === 'tooth_specimen') {
    const toothDetail = getDentalSpecimen(selectedToothFdi);
    return (
      <aside
        style={!isMobileDrawer ? { width: isOpen ? `${customWidth}px` : 0 } : undefined}
        className={`h-full border-l flex flex-col z-20 select-none overflow-hidden ${
          isMobileDrawer ? 'w-full' : isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none border-l-0'
        } ${isDark ? 'bg-[#0c121e]/95 border-slate-800 text-slate-200' : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d]'}`}
      >
        {/* Header */}
        <div className={`p-3.5 border-b flex-shrink-0 ${isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-[#f3ece2]/70 border-[#e7ded3]'}`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                THẺ RĂNG LÂM SÀNG & NỘI NHA
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-500 border border-rose-500/30">
                FDI {toothDetail.fdi}
              </span>
            </div>
            {onClose ? (
              <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <PanelRightClose className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleDeselect} className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <h2 className="text-base font-serif font-bold text-current mt-1.5 leading-snug">{toothDetail.nameVi}</h2>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <p className="text-xs font-serif italic text-slate-500 dark:text-slate-400">{toothDetail.nameEn}</p>
            {(() => {
              const pron = getAnatomicalPronunciation(`tooth.${toothDetail.fdi}`, toothDetail.nameEn);
              if (!pron?.ipa) return null;
              return (
                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded text-[11px] font-mono text-amber-600 dark:text-amber-400 border border-black/5 dark:border-white/10">
                  <span>{pron.ipa}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      pronunciationPlayer.play(toothDetail.nameEn);
                    }}
                    className="p-0.5 rounded hover:bg-amber-500/20 text-slate-400 hover:text-amber-500 cursor-pointer"
                    title="Nghe phát âm tiếng Anh chuẩn học thuật"
                    aria-label="Nghe phát âm tiếng Anh"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs font-sans">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className={`p-2 rounded-xl border text-center ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'}`}>
              <div className="text-[9px] text-slate-400 font-mono">CHÂN RĂNG</div>
              <div className="text-base font-bold text-amber-500">{toothDetail.rootCount}</div>
            </div>
            <div className={`p-2 rounded-xl border text-center ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'}`}>
              <div className="text-[9px] text-slate-400 font-mono">SỐ ỐNG TỦY</div>
              <div className="text-base font-bold text-rose-500">{toothDetail.canalCount}</div>
            </div>
            <div className={`p-2 rounded-xl border text-center ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'}`}>
              <div className="text-[9px] text-slate-400 font-mono">DÀI CHÂN</div>
              <div className="text-base font-bold text-sky-500">{toothDetail.rootLengthMm} mm</div>
            </div>
          </div>

          {/* Ống tủy & Vertucci */}
          <div className={`p-3 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Hệ Thống Ống Tủy & Phân Loại Vertucci</span>
            </h3>
            <div className="text-[11px] font-mono text-slate-300">
              <span className="font-bold text-current">Các ống tủy:</span> {toothDetail.canalNames.join(', ')}
            </div>
            <div className="text-[11px] text-slate-400 leading-relaxed">
              <span className="font-bold text-amber-500">Phân loại:</span> {toothDetail.vertucciClass}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-black/5 dark:bg-white/5 p-2 rounded-lg">
              {toothDetail.vertucciDescriptionVi}
            </p>
          </div>

          {/* Mở tủy (Access Cavity) & Clamp */}
          <div className={`p-3 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <h3 className="font-bold text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" />
              <span>Đường Vào Tủy & Kẹp Đê Cao Su</span>
            </h3>
            <div className="text-[11px]">
              <span className="font-bold text-slate-400">Hình dạng lỗ mở:</span>{' '}
              <span className="font-semibold text-current">{toothDetail.accessCavityShape}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {toothDetail.accessCavityDetailsVi}
            </p>
            <div className="pt-2 border-t border-inherit">
              <div className="text-[11px]">
                <span className="font-bold text-emerald-500">Kẹp đê khuyến nghị:</span>{' '}
                <span className="font-mono font-bold text-current">{toothDetail.rubberDamClampVi}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Thay thế: {toothDetail.rubberDamClampAlternatives.join(', ')}
              </div>
            </div>
          </div>

          {/* Gây tê khuyến nghị */}
          <div className={`p-3 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Syringe className="w-3.5 h-3.5" />
              <span>Kỹ Thuật Gây Tê Khuyến Nghị</span>
            </h3>
            <ul className="space-y-1">
              {toothDetail.recommendedAnesthesia.map((anes, i) => (
                <li key={i} className="text-[11px] flex items-center gap-1.5 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>{anes}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cảnh báo rủi ro lâm sàng */}
          <div className="p-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 space-y-1.5 text-rose-300">
            <div className="font-bold text-xs flex items-center gap-1.5 text-rose-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Nguy Cơ Tai Biến Nội Nha</span>
            </div>
            <ul className="space-y-1 text-[11px]">
              {toothDetail.clinicalRisksVi.map((risk, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-rose-400">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    );
  }

  // 2. SPECIMEN MODE: TMJ & TMD CLINICAL DOSSIER
  if (activeSpecimenMode === 'tmj_specimen') {
    const selectedMuscle = tmjActiveMuscleId
      ? MASTICATORY_MUSCLES_DETAIL.find((m) => m.id === tmjActiveMuscleId)
      : null;
    return (
      <aside
        style={!isMobileDrawer ? { width: isOpen ? `${customWidth}px` : 0 } : undefined}
        className={`h-full border-l flex flex-col z-20 select-none overflow-hidden ${
          isMobileDrawer ? 'w-full' : isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none border-l-0'
        } ${isDark ? 'bg-[#0c121e]/95 border-slate-800 text-slate-200' : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d]'}`}
      >
        {/* Header */}
        <div className={`p-3.5 border-b flex-shrink-0 ${isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-[#f3ece2]/70 border-[#e7ded3]'}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
              HỒ SƠ KHỚP THÁI DƯƠNG HÀM & CƠ NHAI
            </span>
            {onClose ? (
              <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <PanelRightClose className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleDeselect} className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <h2 className="text-base font-serif font-bold text-current mt-1.5 leading-snug">{TMJ_SPECIMEN_DATA.nameVi}</h2>
          <p className="text-xs font-serif italic text-slate-500 dark:text-slate-400">{TMJ_SPECIMEN_DATA.nameEn}</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs font-sans">
          {/* Đĩa khớp 4 vùng */}
          <div className={`p-3 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <h3 className="font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>4 Vùng Giải Phẫu Đĩa Khớp Lưỡng Lõm</span>
            </h3>
            <div className="space-y-1.5">
              {TMJ_SPECIMEN_DATA.discZones.map((z, i) => (
                <div key={i} className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-current">
                    <span>{z.zone}</span>
                    <span className="font-mono text-amber-500">{z.thicknessMm} mm</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{z.characteristicsVi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dây chằng khớp */}
          <div className={`p-3 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Hệ Thống Dây Chằng Giữ Khớp</span>
            </h3>
            <div className="space-y-1.5">
              {TMJ_SPECIMEN_DATA.ligaments.map((l, i) => (
                <div key={i} className="text-[11px] space-y-0.5">
                  <div className="font-bold text-current">{l.nameVi}</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{l.functionVi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chi tiết Cơ nhai đang chọn */}
          {selectedMuscle && (
            <div className="p-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 space-y-2">
              <div className="font-bold text-xs flex items-center gap-1.5 text-rose-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{selectedMuscle.nameVi}</span>
              </div>
              <div className="text-[11px] space-y-1 text-slate-300">
                <div><span className="font-bold text-slate-400">Nguyên ủy:</span> {selectedMuscle.originVi}</div>
                <div><span className="font-bold text-slate-400">Bám tận:</span> {selectedMuscle.insertionVi}</div>
                <div><span className="font-bold text-slate-400">Thần kinh:</span> {selectedMuscle.innervationVi}</div>
                <div><span className="font-bold text-slate-400">Tác động:</span> {selectedMuscle.actionVi}</div>
                <div className="p-1.5 rounded bg-black/20 text-rose-200 text-[10px]">
                  <span className="font-bold">Điểm đau chiếu (Trigger Point):</span> {selectedMuscle.triggerPointPainVi}
                </div>
              </div>
            </div>
          )}

          {/* Cơ chế TMD hiện tại */}
          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1.5">
            <div className="font-bold text-xs text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Chẩn Đoán Lâm Sàng & Xử Trí TMD</span>
            </div>
            {(() => {
              const currentTmd = TMJ_SPECIMEN_DATA.tmdPathologies.find((p) => p.id === tmjPathology);
              if (!currentTmd) return <p className="text-[11px] text-slate-300">Khớp hoạt động bình thường, vận động trơn tru không tiếng kêu.</p>;
              return (
                <div className="space-y-1.5 text-[11px] text-slate-200">
                  <div className="font-bold text-current">{currentTmd.nameVi}</div>
                  <div className="text-amber-300 font-mono text-[10px]">{currentTmd.soundSignVi}</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{currentTmd.pathophysiologyVi}</p>
                  <div className="p-1.5 rounded bg-amber-950/40 text-amber-200 text-[10px]">
                    <span className="font-bold">Hướng xử trí:</span> {currentTmd.clinicalManagementVi}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </aside>
    );
  }

  // 3. SPECIMEN MODE: WISDOM SURGERY & SURGICAL ANATOMY DOSSIER
  if (activeSpecimenMode === 'wisdom_surgery') {
    const currentWinter =
      WISDOM_SURGICAL_DATABASE.winterTypes.find((w) => w.id === wisdomWinterType) ||
      WISDOM_SURGICAL_DATABASE.winterTypes[0];
    const currentPellClass =
      WISDOM_SURGICAL_DATABASE.pellGregory.classes.find((c) => c.id === wisdomPellGregoryClass) ||
      WISDOM_SURGICAL_DATABASE.pellGregory.classes[1];
    const currentPellPos =
      WISDOM_SURGICAL_DATABASE.pellGregory.positions.find((p) => p.id === wisdomPellGregoryPos) ||
      WISDOM_SURGICAL_DATABASE.pellGregory.positions[1];
    const currentStep =
      WISDOM_SURGICAL_DATABASE.surgicalSteps.find((s) => s.stepNumber === wisdomSurgicalStep) ||
      WISDOM_SURGICAL_DATABASE.surgicalSteps[0];

    // Simulated distance & risk score (DEMO / SIMULATED)
    let simulatedDistMm = 2.5;
    if (wisdomWinterType === 'mesioangular') simulatedDistMm = 1.1;
    else if (wisdomWinterType === 'horizontal') simulatedDistMm = 0.5;
    else if (wisdomWinterType === 'distoangular') simulatedDistMm = 1.8;
    else simulatedDistMm = 3.2;

    if (wisdomPellGregoryPos === 'B') simulatedDistMm = Math.max(0.4, Number((simulatedDistMm - 0.7).toFixed(1)));
    else if (wisdomPellGregoryPos === 'C') simulatedDistMm = Math.max(0.2, Number((simulatedDistMm - 1.4).toFixed(1)));

    let riskLevelText = 'Nguy cơ trung bình';
    let riskBadgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    let riskProgress = 45;
    if (simulatedDistMm <= 0.5) {
      riskLevelText = 'Cực kỳ cao (Chạm ống thần kinh)';
      riskBadgeColor = 'bg-rose-500/25 text-rose-300 border-rose-500/40';
      riskProgress = 95;
    } else if (simulatedDistMm <= 1.2) {
      riskLevelText = 'Nguy cơ cao (Sát vách ống)';
      riskBadgeColor = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      riskProgress = 75;
    } else if (simulatedDistMm >= 2.5) {
      riskLevelText = 'Nguy cơ thấp (An toàn)';
      riskBadgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      riskProgress = 20;
    }

    return (
      <aside
        style={!isMobileDrawer ? { width: isOpen ? `${customWidth}px` : 0 } : undefined}
        className={`h-full border-l flex flex-col z-20 select-none overflow-hidden ${
          isMobileDrawer ? 'w-full' : isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none border-l-0'
        } ${isDark ? 'bg-[#0c121e]/95 border-slate-800 text-slate-200' : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d]'}`}
      >
        {/* Header */}
        <div className={`p-3.5 border-b flex-shrink-0 ${isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-[#f3ece2]/70 border-[#e7ded3]'}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              HỒ SƠ TIỂU PHẪU RĂNG KHÔN
            </span>
            {onClose ? (
              <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <PanelRightClose className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleDeselect} className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tooth Specimen Selector (R.48 vs R.38) */}
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <h2 className="text-sm font-serif font-bold text-current leading-tight">
              Phẫu Thuật R.{wisdomToothId === 'tooth_48' ? '48' : '38'}
            </h2>
            <div className="flex rounded-lg p-0.5 bg-black/5 dark:bg-white/5 border border-inherit">
              <button
                onClick={() => setWisdomToothId('tooth_48')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  wisdomToothId === 'tooth_48'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-current'
                }`}
              >
                R.48 (Phải)
              </button>
              <button
                onClick={() => setWisdomToothId('tooth_38')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  wisdomToothId === 'tooth_38'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-current'
                }`}
              >
                R.38 (Trái)
              </button>
            </div>
          </div>

          {/* Study vs Simulation Mode Switcher */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-slate-400">Chế độ trải nghiệm:</span>
            <div className="flex rounded-lg p-0.5 bg-black/5 dark:bg-white/5 border border-inherit">
              <button
                onClick={() => setWisdomStudyMode('study')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold transition cursor-pointer ${
                  wisdomStudyMode === 'study'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-current'
                }`}
              >
                Học tập (Study)
              </button>
              <button
                onClick={() => setWisdomStudyMode('simulation')}
                className={`px-2 py-0.5 rounded text-[9px] font-bold transition cursor-pointer ${
                  wisdomStudyMode === 'simulation'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-current'
                }`}
              >
                Mô phỏng (Sim)
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs font-sans">
          {/* SECTION 1: PHÂN LOẠI LÂM SÀNG (WINTER & PELL-GREGORY) */}
          <div className={`p-3 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-500">
                1. Phân Loại Lâm Sàng
              </span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${riskBadgeColor}`}>
                Độ khó: {currentWinter.surgicalDifficulty}
              </span>
            </div>

            {/* Winter Classification Buttons */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Phân loại Winter (Góc nghiêng trục răng):</span>
                <span className="text-amber-400 font-bold">{currentWinter.angleDegrees}° ({currentWinter.frequencyPercent}%)</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {WISDOM_SURGICAL_DATABASE.winterTypes.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWisdomWinterType(w.id as any)}
                    className={`px-2 py-1.5 rounded-xl text-[10px] font-medium transition cursor-pointer text-left border ${
                      wisdomWinterType === w.id
                        ? 'bg-amber-600 text-white border-amber-500 font-bold shadow-sm'
                        : isDark
                        ? 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        : 'bg-white border-[#e0d6c7] text-slate-700 hover:bg-[#f5eee3]'
                    }`}
                  >
                    <div className="truncate">{w.labelVi.split('(')[0].trim()}</div>
                    <div className="text-[8px] opacity-75 font-serif italic truncate">{w.labelEn}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pell & Gregory Classification Buttons */}
            <div className="space-y-1.5 pt-2 border-t border-inherit">
              <div className="text-[10px] font-mono text-slate-400">
                Phân loại Pell & Gregory (Cành lên & Mặt phẳng nhai):
              </div>
              
              {/* Ramus Space (Class I, II, III) */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono text-slate-500">Tương quan cành lên (Khoảng trống):</div>
                <div className="grid grid-cols-3 gap-1">
                  {(['I', 'II', 'III'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setWisdomPellGregoryClass(c)}
                      className={`py-1 text-center rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                        wisdomPellGregoryClass === c
                          ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                          : isDark
                          ? 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                          : 'bg-white border-[#e0d6c7] text-slate-600 hover:bg-[#f5eee3]'
                      }`}
                    >
                      Class {c}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 italic pl-1 leading-snug">{currentPellClass.spaceVi}</p>
              </div>

              {/* Occlusal Depth (Pos A, B, C) */}
              <div className="space-y-1 pt-1.5">
                <div className="text-[9px] font-mono text-slate-500">Độ sâu tương đối mặt phẳng nhai:</div>
                <div className="grid grid-cols-3 gap-1">
                  {(['A', 'B', 'C'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setWisdomPellGregoryPos(p)}
                      className={`py-1 text-center rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                        wisdomPellGregoryPos === p
                          ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                          : isDark
                          ? 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                          : 'bg-white border-[#e0d6c7] text-slate-600 hover:bg-[#f5eee3]'
                      }`}
                    >
                      Vị trí {p}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 italic pl-1 leading-snug">{currentPellPos.depthVi}</p>
              </div>
            </div>

            {/* Chiến lược cắt thân (Odontotomy) */}
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] space-y-1">
              <div className="font-bold text-amber-500 flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5" />
                <span>Phương án chia cắt thân (Odontotomy):</span>
              </div>
              <p className="text-slate-300 dark:text-slate-200 leading-relaxed font-sans">
                {currentWinter.sectioningStrategyVi}
              </p>
            </div>
          </div>

          {/* SECTION 2: TƯƠNG QUAN GIẢI PHẪU QUAN TRỌNG (INTERACTIVE CAMERA FOCUS) */}
          <div className={`p-3 rounded-2xl border space-y-2.5 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-sky-500">
                2. Mốc Giải Phẫu Lân Cận
              </span>
              <span className="text-[9px] font-mono text-slate-400">Nhấp để xem 3D</span>
            </div>

            <div className="space-y-1.5">
              {/* Relationship 1: Mandibular Canal & IAN */}
              <button
                onClick={() => focusAnatomy('mandibular_canal')}
                className={`w-full text-left p-2 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                  isDark
                    ? 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                    : 'bg-white border-[#e0d6c7] hover:bg-[#f5eee3] text-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-[11px] flex items-center gap-1.5 text-rose-400">
                    <Zap className="w-3 h-3" />
                    <span>Ống hàm dưới & Thần kinh IAN</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Khoảng cách mô phỏng: <span className="text-amber-400 font-mono font-bold">{simulatedDistMm} mm</span> (DEMO)
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </button>

              {/* Relationship 2: Lingual Nerve */}
              <button
                onClick={() => focusAnatomy('nerve_lingual')}
                className={`w-full text-left p-2 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                  isDark
                    ? 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                    : 'bg-white border-[#e0d6c7] hover:bg-[#f5eee3] text-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-[11px] flex items-center gap-1.5 text-amber-400">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Thần kinh Lưỡi (Lingual Nerve)</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Sát bản xương trong (&lt; 1.5mm) • Nguy cơ mất vị giác & tê lưỡi
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </button>

              {/* Relationship 3: Second Molar (R47 / R37) */}
              <button
                onClick={() => focusAnatomy(wisdomToothId === 'tooth_48' ? 'tooth_47' : 'tooth_37')}
                className={`w-full text-left p-2 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                  isDark
                    ? 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                    : 'bg-white border-[#e0d6c7] hover:bg-[#f5eee3] text-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-[11px] flex items-center gap-1.5 text-sky-400">
                    <Activity className="w-3 h-3" />
                    <span>Răng cối số 7 (R.{wisdomToothId === 'tooth_48' ? '47' : '37'})</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Điểm tựa bẩy • Nguy cơ tiêu ngót chân xa và sâu cổ răng
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </button>

              {/* Relationship 4: Retromolar Trigone & Mandible */}
              <button
                onClick={() => focusAnatomy('bone_mandible')}
                className={`w-full text-left p-2 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                  isDark
                    ? 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                    : 'bg-white border-[#e0d6c7] hover:bg-[#f5eee3] text-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-[11px] flex items-center gap-1.5 text-emerald-400">
                    <Skull className="w-3 h-3" />
                    <span>Tam giác sau hàm & Xương hàm dưới</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Đường rạch mở vạt chếch mặt ngoài • Tránh tổn thương sàn miệng
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </button>
            </div>
          </div>

          {/* SECTION 3: THƯỚC ĐO & ĐÁNH GIÁ RỦI RO THẦN KINH (DEMO / SIMULATED) */}
          <div className="p-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs flex items-center gap-1.5 text-rose-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>3. Thước Đo Rủi Ro Thần Kinh (IAN)</span>
              </div>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                DEMO / SIMULATED
              </span>
            </div>

            {/* Distance & Level */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Khoảng cách chóp răng - ống thần kinh:</span>
                <span className="font-mono font-bold text-rose-300">{simulatedDistMm} mm</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-black/30 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${riskProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] pt-0.5">
                <span className="text-slate-400">Mức độ rủi ro:</span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${riskBadgeColor}`}>
                  {riskLevelText}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 leading-relaxed">
              Tổn thương IAN gây dị cảm hoặc tê bì vĩnh viễn vùng môi dưới và cằm (dấu hiệu Vincent).
              {simulatedDistMm <= 1.2 && ' Khi khoảng cách ≤ 1.0mm, khuyến nghị chụp phim CBCT để khảo sát 3 chiều.'}
            </p>
          </div>

          {/* SECTION 4: 7 DẤU HIỆU X-QUANG TOÀN CẢNH (PANORAMA SIGNS) */}
          <div className={`p-3 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-500">
                4. 7 Dấu Hiệu X-Quang Toàn Cảnh
              </span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25">
                EDUCATIONAL SIMULATION
              </span>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              Tiêu chuẩn Rood & Shehab (1990) đánh giá tương quan chóp răng khôn và thần kinh răng dưới:
            </p>

            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {WISDOM_SURGICAL_DATABASE.ianRadiologicRiskSigns.map((sign, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl text-[10px] border ${
                    idx === 0 || idx === 4
                      ? 'bg-rose-500/10 border-rose-500/25 text-rose-200'
                      : isDark
                      ? 'bg-slate-800/40 border-slate-700/50 text-slate-300'
                      : 'bg-white border-[#e0d6c7] text-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="font-bold">
                      {idx + 1}. {sign.signVi}
                    </span>
                    <span className="font-mono text-amber-400 flex-shrink-0 font-bold text-[9px] bg-amber-500/15 px-1 py-0.5 rounded">
                      {sign.oddsRatioRisk.split('(')[0].trim()}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1 font-serif italic">{sign.cbctIndicationVi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: QUY TRÌNH BÀI HỌC 6 BƯỚC TIỂU PHẪU */}
          <div className={`p-3 rounded-2xl border space-y-2.5 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#e7ded3]'}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>5. Bài Học Phẫu Thuật 6 Bước</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400">
                Bước {wisdomSurgicalStep} / 6
              </span>
            </div>

            {/* Step Pills & Prev/Next */}
            <div className="flex items-center justify-between gap-1">
              <button
                onClick={() => setWisdomSurgicalStep(Math.max(1, wisdomSurgicalStep - 1))}
                disabled={wisdomSurgicalStep <= 1}
                className="p-1 rounded-lg border border-inherit text-slate-400 hover:text-current disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                title="Bước trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1 flex-1 justify-center">
                {[1, 2, 3, 4, 5, 6].map((st) => (
                  <button
                    key={st}
                    onClick={() => setWisdomSurgicalStep(st)}
                    className={`w-6 h-6 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer ${
                      wisdomSurgicalStep === st
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : isDark
                        ? 'bg-slate-800 text-slate-400 hover:text-white'
                        : 'bg-black/5 text-slate-600 hover:bg-black/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setWisdomSurgicalStep(Math.min(6, wisdomSurgicalStep + 1))}
                disabled={wisdomSurgicalStep >= 6}
                className="p-1 rounded-lg border border-inherit text-slate-400 hover:text-current disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                title="Bước tiếp theo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current Step Detailed Card */}
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 space-y-1.5 text-[11px]">
              <div className="font-bold text-current text-xs">
                Bước {currentStep.stepNumber}: {currentStep.titleVi}
              </div>
              <div className="text-[10px] font-serif italic text-slate-400">
                {currentStep.titleEn}
              </div>

              <div className="pt-1 text-slate-300">
                <span className="font-bold text-amber-400">Dụng cụ:</span> {currentStep.instrumentVi}
              </div>

              <div className="text-emerald-300">
                <span className="font-bold">Thao tác an toàn:</span> {currentStep.keySafetyActionVi}
              </div>

              <div className="text-rose-400 pt-1 border-t border-inherit">
                <span className="font-bold">Cạm bẫy giải phẫu:</span> {currentStep.anatomicalPitfallVi}
              </div>
            </div>
          </div>

          {/* SECTION 6: MANDATORY MEDICAL & LEGAL DISCLAIMER */}
          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1.5 text-[10px] text-amber-200">
            <div className="font-bold flex items-center gap-1 text-amber-400 uppercase tracking-wider text-[9px]">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              <span>Cảnh Báo Đào Tạo Y Khoa</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Đây là học phần mô phỏng phục vụ mục đích đào tạo giải phẫu và lý thuyết phẫu thuật hàm mặt. Tuyệt đối không sử dụng làm chẩn đoán, kế hoạch điều trị hay chỉ dẫn thực hành lâm sàng thực tế trên bệnh nhân khi chưa có chứng chỉ hành nghề và hướng dẫn của bác sĩ chuyên khoa.
            </p>
          </div>
        </div>
      </aside>
    );
  }

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
              onClick={() => {
                if (onClose) onClose();
                else handleDeselect();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer ml-1"
              title="Đóng chi tiết"
            >
              <X className="w-4 h-4" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
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
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <p className="text-xs font-serif italic text-amber-600 dark:text-amber-400">
            {nerve?.latinName || foramen?.latinName || tooth?.nameEn || muscle?.latinName}
          </p>
          {(() => {
            const englishName = nerve?.nameEn || tooth?.nameEn || muscle?.nameEn || foramen?.nameEn || '';
            const targetId = nerve?.id || foramen?.id || (tooth ? `tooth.${tooth.fdi}` : null) || muscle?.id || selectedAnatomyId;
            const pron = getAnatomicalPronunciation(targetId, englishName);
            if (!pron?.ipa) return null;
            return (
              <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded text-[11px] font-mono text-amber-600 dark:text-amber-400 border border-black/5 dark:border-white/10">
                <span>{pron.ipa}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    pronunciationPlayer.play(englishName);
                  }}
                  className="p-0.5 rounded hover:bg-amber-500/20 text-slate-400 hover:text-amber-500 cursor-pointer"
                  title="Nghe phát âm tiếng Anh chuẩn học thuật"
                  aria-label="Nghe phát âm tiếng Anh"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })()}
        </div>
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
        {toothRecord && (
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
                  {toothRecord.fdi}
                </span>
                <span className="text-[8px] text-slate-400 block font-mono">
                  #{toothRecord.universalNumber} | {toothRecord.palmer}
                </span>
              </div>
              <div
                className={`p-2 rounded-xl border ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                }`}
              >
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-mono uppercase">
                  PHÂN CUNG & BÊN
                </span>
                <span className="font-serif text-xs font-bold text-emerald-600 dark:text-emerald-400 block truncate" title={`Cung ${toothRecord.quadrant}: ${toothRecord.jaw === 'MAXILLA' ? 'Hàm Trên' : 'Hàm Dưới'} - ${toothRecord.side === 'RIGHT' ? 'Bên Phải bệnh nhân' : 'Bên Trái bệnh nhân'}`}>
                  Cung {toothRecord.quadrant} • {toothRecord.side === 'RIGHT' ? 'Phải' : 'Trái'}
                </span>
                <span className="text-[8px] text-slate-400 block font-mono">
                  {toothRecord.jaw === 'MAXILLA' ? 'Hàm Trên' : 'Hàm Dưới'}
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
                <span className="font-serif text-xs font-bold text-sky-600 dark:text-sky-400 block truncate" title={`${toothRecord.morphology.canalCount} ống tủy (Vertucci ${toothRecord.morphology.vertucciClass})`}>
                  {toothRecord.morphology.canalCount} Ống ({toothRecord.morphology.rootCount} Chân)
                </span>
                <span className="text-[8px] text-slate-400 block font-mono">
                  Vertucci {toothRecord.morphology.vertucciClass}
                </span>
              </div>
            </div>

            {/* Anatomical Topology & 3D Mesh Node */}
            <div
              className={`p-2.5 rounded-xl border text-[11px] space-y-1 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/60 border-[#e7ded3]'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>3D Mesh Node:</span>
                <span className="text-amber-500 font-bold">{toothRecord.meshNodeName}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Tọa độ Sọ mặt (Craniofacial):</span>
                <span className="font-mono text-slate-300">
                  [{toothRecord.craniofacialPos.map(c => c.toFixed(3)).join(', ')}]
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Răng kế cận:</span>
                <span className="text-slate-300">
                  Gần: {toothRecord.mesialAdjacent || 'Đường giữa'} | Xa: {toothRecord.distalAdjacent || 'Không có'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Răng đối diện khớp cắn:</span>
                <span className="text-amber-400 font-medium">
                  {toothRecord.opposingTooth || 'Không có'}
                </span>
              </div>
            </div>

            {/* Innervation & Anesthesia */}
            {tooth && (
              <>
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
              </>
            )}

            {/* Morphology & Clinical Pearls */}
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <h4 className="font-serif font-bold text-xs text-amber-700 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Giải Phẫu Tủy & Lưu Ý Lâm Sàng</span>
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-1.5">
                {toothRecord.morphology.pulpFloorAnatomyVi}
              </p>
              {toothRecord.morphology.clinicalRisksVi.length > 0 && (
                <ul className="text-[10px] text-amber-400/90 list-disc list-inside space-y-0.5">
                  {toothRecord.morphology.clinicalRisksVi.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              )}
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
