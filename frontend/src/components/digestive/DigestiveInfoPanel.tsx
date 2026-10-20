import React, { useState } from 'react';
import {
  X,
  Compass,
  Activity,
  HeartPulse,
  BrainCircuit,
  Microscope,
  Stethoscope,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Maximize2,
  ShieldCheck,
  PanelRightClose,
  Volume2,
  GitFork,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2
} from 'lucide-react';
import { useDigestiveStore } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { DIGESTIVE_SYSTEM_DATA, DigestiveOrganData } from '../../data/digestiveSystemData';
import { AnatomicalPronunciation } from '../ui/AnatomicalPronunciation';

interface DigestiveInfoPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  customWidth?: number;
  isMobileDrawer?: boolean;
}

export const DigestiveInfoPanel: React.FC<DigestiveInfoPanelProps> = ({
  isOpen = true,
  onClose,
  customWidth = 360,
  isMobileDrawer = false
}) => {
  const selectedOrganId = useDigestiveStore((s) => s.selectedOrganId);
  const selectOrgan = useDigestiveStore((s) => s.selectOrgan);
  const isolatedView = useDigestiveStore((s) => s.isolatedView);
  const toggleIsolatedView = useDigestiveStore((s) => s.toggleIsolatedView);
  const activeSubdivisionId = useDigestiveStore((s) => s.activeSubdivisionId);
  const selectSubdivision = useDigestiveStore((s) => s.selectSubdivision);

  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  // Tabs: overview, subdivisions, neurovasculature, histology, clinical
  const [activeTab, setActiveTab] = useState<'overview' | 'subdivisions' | 'neurovasculature' | 'histology' | 'clinical'>('overview');

  if (!isOpen) return null;

  const organ: DigestiveOrganData | null = selectedOrganId ? DIGESTIVE_SYSTEM_DATA[selectedOrganId] || null : null;

  const styleWidth = isMobileDrawer ? '100%' : `${customWidth}px`;

  return (
    <aside
      data-ui="digestive-info-panel"
      style={{ width: styleWidth }}
      className={`h-full flex flex-col flex-shrink-0 select-text overflow-hidden transition-all duration-150 border-l ${
        isDark
          ? 'bg-[#0c121e] border-slate-800/80 text-slate-100'
          : 'bg-[#faf6f0] border-[#e7ded3] text-[#28231d]'
      }`}
    >
      {/* 1. Header: Organ Name, Nomenclature, Quick Action Buttons */}
      <div className={`p-4 border-b flex-shrink-0 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {organ ? (
              <>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                    {organ.anatomicalQuadrant}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    TA2
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-current truncate">
                  {organ.nameVi}
                </h2>
                <div className="flex items-center gap-2 text-xs font-serif italic text-slate-500 dark:text-slate-400 truncate">
                  <span>{organ.nameLa}</span>
                  <span>•</span>
                  <span>{organ.nameEn}</span>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-base font-serif font-bold text-current">Hồ Sơ Hệ Tiêu Hóa</h2>
                <p className="text-xs text-slate-400">Chọn một cơ quan để xem giải phẫu chi tiết</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {organ && (
              <button
                onClick={toggleIsolatedView}
                className={`p-1.5 rounded-lg border text-xs cursor-pointer transition ${
                  isolatedView
                    ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                    : isDark
                    ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                    : 'border-[#dfd4c4] bg-white text-slate-600 hover:text-[#28231d]'
                }`}
                title={isolatedView ? 'Tắt chế độ cô lập' : 'Cô lập quan sát cơ quan này'}
                aria-label="Toggle isolate"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg border text-xs cursor-pointer transition ${
                  isDark
                    ? 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                    : 'border-[#dfd4c4] bg-white text-slate-600 hover:text-[#28231d]'
                }`}
                title="Thu gọn hồ sơ giải phẫu"
                aria-label="Close dossier"
              >
                <PanelRightClose className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {organ && (
          <div className="mt-2.5 pt-2 border-t border-inherit flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Kích thước: <strong className="text-current font-mono">{organ.approximateDimensions}</strong></span>
            <span>Nguồn gốc: <strong className="text-current">{organ.embryologicalOrigin.split('(')[0].trim()}</strong></span>
          </div>
        )}
      </div>

      {organ ? (
        <>
          {/* 2. Navigation Pills / Tabs */}
          <div
            className={`flex items-center gap-1 p-2 border-b overflow-x-auto flex-shrink-0 text-xs scrollbar-none ${
              isDark ? 'border-slate-800 bg-slate-900/50' : 'border-[#e7ded3] bg-[#f2ebd9]'
            }`}
          >
            {[
              { id: 'overview', label: 'Tổng quan' },
              { id: 'subdivisions', label: 'Phân đoạn' },
              { id: 'neurovasculature', label: 'Mạch & Thần kinh' },
              { id: 'histology', label: 'Mô học & Chức năng' },
              { id: 'clinical', label: 'Lâm sàng' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : isDark
                    ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                    : 'hover:bg-[#ede5d6] text-slate-600 hover:text-[#28231d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3. Tab Content Viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {/* TAB 1: TỔNG QUAN (OVERVIEW) */}
            {activeTab === 'overview' && (
              <div className="space-y-4 animate-fade-in text-xs leading-relaxed">
                <div>
                  <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Mô tả giải phẫu đại thể</span>
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                    {organ.overviewVi}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white/80 border-[#e7ded3] text-slate-800'
                  }`}
                >
                  <h4 className="font-semibold text-current mb-1.5 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Chức năng sinh lý chính</span>
                  </h4>
                  <ul className="space-y-1 pl-4 list-disc text-slate-600 dark:text-slate-400">
                    {organ.functionVi.map((fn, idx) => (
                      <li key={idx} className="leading-normal">{fn}</li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white/80 border-[#e7ded3] text-slate-800'
                  }`}
                >
                  <h4 className="font-semibold text-current mb-1 text-[11px]">Phôi thai học</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-normal">
                    {organ.embryologicalOrigin}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: PHÂN ĐOẠN & CẤU TRÚC (SUBDIVISIONS) */}
            {activeTab === 'subdivisions' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                  <span>Danh sách phân vùng ({organ.subdivisions.length})</span>
                  <span className="font-mono text-[10px]">TA2 Anatomical Subdivisions</span>
                </div>

                {organ.subdivisions.map((sub) => {
                  const isSubSelected = activeSubdivisionId === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => selectSubdivision(isSubSelected ? null : sub.id)}
                      className={`p-3 rounded-xl border transition cursor-pointer ${
                        isSubSelected
                          ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/30'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          : 'bg-white/80 border-[#e7ded3] hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="font-semibold text-current text-xs">{sub.nameVi}</div>
                        <span className="text-[10px] font-serif italic text-slate-400">{sub.nameLa}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        {sub.descriptionVi}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 3: MẠCH MÁU & THẦN KINH (NEUROVASCULATURE) */}
            {activeTab === 'neurovasculature' && (
              <div className="space-y-3 animate-fade-in text-xs leading-relaxed">
                {/* Arterial Supply */}
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                  }`}
                >
                  <h4 className="font-serif font-bold text-xs text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                    <span>Động mạch cấp máu</span>
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">{organ.bloodSupply.arterialVi}</p>
                  <p className="text-[10px] text-slate-400 font-serif italic mt-0.5">{organ.bloodSupply.arterialEn}</p>
                </div>

                {/* Venous Drainage */}
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                  }`}
                >
                  <h4 className="font-serif font-bold text-xs text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-500" />
                    <span>Tĩnh mạch dẫn lưu</span>
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">{organ.bloodSupply.venousVi}</p>
                  <p className="text-[10px] text-slate-400 font-serif italic mt-0.5">{organ.bloodSupply.venousEn}</p>
                </div>

                {/* Innervation */}
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                  }`}
                >
                  <h4 className="font-serif font-bold text-xs text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-amber-500" />
                    <span>Chi phối thần kinh</span>
                  </h4>
                  <div className="space-y-1.5 text-[11px]">
                    <div>
                      <strong className="text-emerald-600 dark:text-emerald-400">Đối giao cảm (Parasympathetic): </strong>
                      <span className="text-slate-700 dark:text-slate-300">{organ.innervation.parasympatheticVi}</span>
                    </div>
                    <div>
                      <strong className="text-amber-600 dark:text-amber-400">Giao cảm (Sympathetic): </strong>
                      <span className="text-slate-700 dark:text-slate-300">{organ.innervation.sympatheticVi}</span>
                    </div>
                    <div>
                      <strong className="text-indigo-600 dark:text-indigo-400">Cảm giác đau tạng (Sensory): </strong>
                      <span className="text-slate-700 dark:text-slate-300">{organ.innervation.sensoryVi}</span>
                    </div>
                  </div>
                </div>

                {/* Lymphatics */}
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                  }`}
                >
                  <h4 className="font-semibold text-current mb-1 text-[11px]">Hạch bạch huyết</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{organ.bloodSupply.lymphaticVi}</p>
                </div>
              </div>
            )}

            {/* TAB 4: MÔ HỌC (HISTOLOGY) */}
            {activeTab === 'histology' && (
              <div className="space-y-3 animate-fade-in text-xs leading-relaxed">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
                  }`}
                >
                  <h4 className="font-serif font-bold text-xs text-purple-600 dark:text-purple-400 mb-1.5 flex items-center gap-1.5">
                    <Microscope className="w-3.5 h-3.5 text-purple-500" />
                    <span>Mô học & Cấu trúc 4 lớp thành ống</span>
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                    {organ.histologyVi}
                  </p>
                  <p className="text-[10px] text-slate-400 font-serif italic mt-2 pt-2 border-t border-inherit">
                    {organ.histologyEn}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 5: LÂM SÀNG & BỆNH HỌC (CLINICAL) */}
            {activeTab === 'clinical' && (
              <div className="space-y-3 animate-fade-in text-xs leading-relaxed">
                <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
                  <h4 className="font-serif font-bold text-xs text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-rose-500" />
                    <span>Tương quan lâm sàng & Điểm ngoại khoa</span>
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-800 dark:text-slate-200 text-[11px]">
                    {organ.clinicalNotesVi.map((note, idx) => (
                      <li key={idx} className="leading-relaxed">{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4. VERIFIED REFERENCES & ACCREDITATION FOOTER */}
            <div
              className={`p-3 rounded-xl border text-[10px] space-y-1.5 mt-4 ${
                isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-[#e7ded3]'
              }`}
            >
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Terminologia Anatomica 2 (TA2)
                </span>
                <span className="font-mono">Z-Anatomy CC BY-SA 4.0</span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-inherit">
                <span>Mã Node 3D: {organ.primaryNodeName}</span>
                <span>Kiểm duyệt: PGS. TS. BS Y Hà Nội</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400">
          <Layers className="w-10 h-10 text-slate-500 mb-3 opacity-60" />
          <p className="text-sm font-semibold text-slate-300 mb-1">Chưa chọn cơ quan nào</p>
          <p className="text-xs text-slate-500 max-w-xs">
            Nhấp chuột vào bất kỳ cơ quan nào trên mô hình 3D hoặc trong cây giải phẫu bên trái để hiển thị hồ sơ chi tiết.
          </p>
        </div>
      )}
    </aside>
  );
};
