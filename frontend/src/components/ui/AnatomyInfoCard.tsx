import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  VolumeX,
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
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { getAnatomicalPronunciation } from '../../data/anatomyPronunciationData';
import { pronunciationPlayer } from '../../utils/pronunciationPlayer';

export interface AnatomyInfoCardProps {
  anatomyId?: string | null;
  nameVi: string;
  nameEn: string;
  nameLatin?: string;
  category?: string;
  reviewStatus?: string;
  summary?: string;

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
  ipa: explicitIpa,
  audioUrl: explicitAudioUrl,
  onDeepInspect,
  onClose,
  onRelationClick,
  className = ''
}) => {
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';
  const isVi = language === 'vi';

  // Global & Local expansion state
  const isGlobalExpanded = useAnatomyStore((s) => s.isInfoExpanded);
  const setIsGlobalExpanded = useAnatomyStore((s) => s.setIsInfoExpanded);

  // Local state for expanded accordion
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('overview');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Sync with global store state
  useEffect(() => {
    setIsExpanded(isGlobalExpanded);
  }, [isGlobalExpanded]);

  const handleToggleExpand = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    setIsGlobalExpanded(next);
  };

  // Keyboard shortcut: Esc to collapse or close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false);
          setIsGlobalExpanded(false);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onClose, setIsGlobalExpanded]);

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

  // Resolve pronunciation & IPA
  const pronunciation = useMemo(() => {
    return getAnatomicalPronunciation(anatomyId, nameEn);
  }, [anatomyId, nameEn]);

  const ipa = explicitIpa || pronunciation?.ipa;
  const audioUrl = explicitAudioUrl || pronunciation?.audioUrl;

  const handlePlayPronunciation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!nameEn) return;
    pronunciationPlayer.play(nameEn, audioUrl);
  };

  // Accordion toggle helper (one section at a time on mobile)
  const toggleSection = (sectionKey: string) => {
    setOpenAccordion((prev) => (prev === sectionKey ? null : sectionKey));
  };

  // Touch drag gesture for mobile bottom sheet
  const touchStartY = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY < -40 && !isExpanded) {
      // Swiped UP -> expand
      setIsExpanded(true);
      setIsGlobalExpanded(true);
    } else if (deltaY > 40 && isExpanded) {
      // Swiped DOWN -> collapse
      setIsExpanded(false);
      setIsGlobalExpanded(false);
    }
  };

  // 1-line short summary fallback
  const shortSummary =
    summary ||
    (isVi ? details?.overviewVi : details?.overviewEn) ||
    (isVi
      ? `Cấu trúc giải phẫu ${nameVi} (${nameEn}) thuộc cơ thể người.`
      : `Anatomical structure ${nameEn} of the human body.`);

  // Clean category display
  const categoryLabel = (category || 'anatomia').toUpperCase();

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex flex-col transition-all duration-300 select-none overflow-hidden ${
        isExpanded ? 'max-h-[82vh] md:max-h-[88vh]' : 'max-h-[170px] md:max-h-[190px]'
      } rounded-2xl border shadow-xl backdrop-blur-xl ${
        isDark
          ? 'bg-[#0f141c]/95 border-slate-800 text-slate-100'
          : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d]'
      } ${className}`}
    >
      {/* Mobile drag handle pill */}
      <div
        onClick={handleToggleExpand}
        className="w-full pt-2 pb-1 flex justify-center cursor-pointer md:hidden hover:bg-black/5 dark:hover:bg-white/5 transition"
        title={isExpanded ? 'Vuốt xuống để thu gọn' : 'Kéo lên để xem thêm'}
      >
        <div className="w-12 h-1.5 rounded-full bg-slate-400/60 dark:bg-slate-600/70" />
      </div>

      {/* COMPACT HEADER & SUMMARY (Always visible) */}
      <div className="p-3.5 sm:p-4 flex-shrink-0">
        {/* Top Badges & Controls */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              {categoryLabel}
            </span>
            {reviewStatus && (
              <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                <span>{reviewStatus.toUpperCase()}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleExpand}
              className="p-1.5 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
              title={isExpanded ? 'Thu gọn chi tiết (Esc)' : 'Xem chi tiết'}
              aria-expanded={isExpanded}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                title="Đóng thẻ thông tin"
                aria-label="Đóng"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Title: Vietnamese, English, Latin & Pronunciation */}
        <div className="space-y-0.5">
          <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-current leading-snug line-clamp-1">
            {nameVi}
          </h2>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-medium text-slate-700 dark:text-slate-300">{nameEn}</span>

            {/* Academic IPA & Audio Button */}
            {ipa && (
              <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded text-[11px] font-mono text-amber-700 dark:text-amber-400 border border-black/5 dark:border-white/10">
                <span>{ipa}</span>
                <button
                  onClick={handlePlayPronunciation}
                  className={`p-0.5 rounded hover:bg-amber-500/20 transition cursor-pointer ${
                    isPlayingAudio ? 'text-amber-500 animate-pulse scale-110' : 'text-slate-500 dark:text-slate-400 hover:text-amber-600'
                  }`}
                  title="Nghe phát âm tiếng Anh chuẩn học thuật"
                  aria-label="Nghe phát âm tiếng Anh"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {nameLatin && nameLatin !== nameEn && (
              <span className="font-serif italic text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                ({nameLatin})
              </span>
            )}
          </div>
        </div>

        {/* 1-Line Summary */}
        <p className="mt-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-1 leading-relaxed">
          {shortSummary}
        </p>

        {/* Compact Action Bar */}
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <button
            onClick={handleToggleExpand}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? (isVi ? 'Thu gọn' : 'Collapse') : (isVi ? 'Xem thêm' : 'Read more')}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {onDeepInspect && (
            <button
              onClick={onDeepInspect}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-[11px] shadow-sm hover:shadow transition cursor-pointer"
              title="Khám phá mô hình 3D chuyên sâu"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isVi ? 'Khám phá 3D' : '3D Specimen'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* EXPANDED ACCORDION VIEW (Only shown when expanded) */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto px-3.5 pb-4 space-y-2 border-t border-black/5 dark:border-white/10 pt-2 animate-fade-in">
          {/* Key anatomical statistics / quick facts if available */}
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

          {/* ACCORDION 1: TỔNG QUAN (Overview) */}
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

          {/* ACCORDION 2: VỊ TRÍ GIẢI PHẪU (Location) */}
          {(details?.locationVi || details?.locationEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('location')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isVi ? '2. Vị trí & Định khu' : '2. Anatomical Location'}</span>
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

          {/* ACCORDION 3: CẤU TẠO & HÌNH THÁI (Structure / Morphology) */}
          {(details?.structureVi || details?.structureEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('structure')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isVi ? '3. Cấu tạo & Hình thái học' : '3. Structure & Morphology'}</span>
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

          {/* ACCORDION 4: CHỨC NĂNG & SINH LÝ (Function) */}
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

          {/* ACCORDION 5: LIÊN QUAN GIẢI PHẪU (Relations) */}
          {(details?.relationsVi || details?.relationsEn) && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('relations')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isVi ? '5. Liên quan giải phẫu' : '5. Anatomical Relations'}</span>
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

          {/* ACCORDION 6: MẠCH MÁU & THẦN KINH (Vascular & Nerve Supply) */}
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
                        {isVi ? 'Mạch máu:' : 'Blood supply:'}
                      </span>
                      <p>{isVi ? details.bloodSupplyVi : details.bloodSupplyEn}</p>
                    </div>
                  )}
                  {details.innervationVi && (
                    <div>
                      <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-0.5">
                        {isVi ? 'Thần kinh:' : 'Innervation:'}
                      </span>
                      <p>{isVi ? details.innervationVi : details.innervationEn}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ACCORDION 7: Ý NGHĨA LÂM SÀNG & BỆNH HỌC (Clinical / Pathology) */}
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

          {/* ACCORDION 8: TÀI LIỆU THAM KHẢO (References) */}
          {details?.references && (
            <div className="border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('references')}
                className="w-full p-2.5 text-left flex items-center justify-between font-bold text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isVi ? '8. Tài liệu tham khảo' : '8. Academic References'}</span>
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

          {/* Bottom Collapse button */}
          <div className="pt-2 text-center">
            <button
              onClick={handleToggleExpand}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-600 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{isVi ? 'Thu gọn ↑' : 'Collapse ↑'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
