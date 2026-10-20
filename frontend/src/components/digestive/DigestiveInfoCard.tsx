import React, { useState } from 'react';
import {
  X,
  Compass,
  Activity,
  HeartPulse,
  BrainCircuit,
  Microscope,
  Stethoscope,
  ChevronDown,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { DigestiveOrganData } from '../../data/digestiveSystemData';
import { useDigestiveStore } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const DigestiveInfoCard: React.FC<{
  organ: DigestiveOrganData;
  onClose: () => void;
}> = ({ organ, onClose }) => {
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const isVi = language === 'vi';

  const isolatedView = useDigestiveStore((s) => s.isolatedView);
  const toggleIsolatedView = useDigestiveStore((s) => s.toggleIsolatedView);
  const activeSubdivisionId = useDigestiveStore((s) => s.activeSubdivisionId);
  const selectSubdivision = useDigestiveStore((s) => s.selectSubdivision);

  // Active accordion tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'subdivisions' | 'neurovasculature' | 'histology' | 'clinical'>('overview');

  const selectedSub = organ.subdivisions.find((s) => s.id === activeSubdivisionId) || organ.subdivisions[0];

  return (
    <div
      className={`w-full h-full flex flex-col border-l select-text overflow-hidden transition-colors duration-150 ${
        isDark ? 'bg-[#0f141c] border-slate-800 text-slate-100' : 'bg-[#faf6f0] border-[#e7ded3] text-[#28231d]'
      }`}
    >
      {/* 1. Header Bar: Organ Name, Latin Nomenclature, Actions */}
      <div className={`p-4 border-b flex-shrink-0 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide border uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                {organ.anatomicalQuadrant}
              </span>
            </div>
            <h2 className="text-lg font-serif font-bold tracking-tight text-current truncate">
              {isVi ? organ.nameVi : organ.nameEn}
            </h2>
            <p className="text-xs font-serif italic text-slate-500 dark:text-slate-400 truncate">
              {organ.nameLa} (TA2) • {organ.approximateDimensions}
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={toggleIsolatedView}
              className={`p-1.5 rounded-md border text-xs cursor-pointer transition ${
                isolatedView
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }`}
              title={isolatedView ? 'Tắt chế độ cô lập' : 'Cô lập quan sát cơ quan này'}
              aria-label="Toggle isolate"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition"
              title="Đóng bảng thông tin"
              aria-label="Close dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Origin tag */}
        <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
          <span className="font-medium text-slate-700 dark:text-slate-300">Nguồn gốc phôi thai:</span>
          <span>{organ.embryologicalOrigin}</span>
        </div>
      </div>

      {/* 2. Navigation Pills / Tabs */}
      <div
        className={`flex items-center gap-1 p-2 border-b overflow-x-auto flex-shrink-0 text-xs ${
          isDark ? 'border-slate-800 bg-slate-900/50' : 'border-[#e7ded3] bg-[#f2ebd9]'
        }`}
      >
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-current'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{isVi ? 'Tổng quan' : 'Overview'}</span>
        </button>

        {organ.subdivisions.length > 0 && (
          <button
            onClick={() => setActiveTab('subdivisions')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === 'subdivisions'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-current'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isVi ? 'Cấu trúc & Phân thùy' : 'Subdivisions'}</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('neurovasculature')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
            activeTab === 'neurovasculature'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-current'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>{isVi ? 'Mạch máu & Thần kinh' : 'Vessels & Nerves'}</span>
        </button>

        <button
          onClick={() => setActiveTab('histology')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
            activeTab === 'histology'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-current'
          }`}
        >
          <Microscope className="w-3.5 h-3.5" />
          <span>{isVi ? 'Mô học' : 'Histology'}</span>
        </button>

        <button
          onClick={() => setActiveTab('clinical')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
            activeTab === 'clinical'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-current'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>{isVi ? 'Lâm sàng' : 'Clinical'}</span>
        </button>
      </div>

      {/* 3. Tab Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h3 className="font-semibold text-sm mb-1.5 text-amber-700 dark:text-amber-400">
                {isVi ? 'Mô tả giải phẫu' : 'Anatomical Overview'}
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                {isVi ? organ.overviewVi : organ.overviewEn}
              </p>
            </div>

            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#e7ded3]'}`}>
              <h4 className="font-semibold text-xs mb-2 flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
                <Activity className="w-3.5 h-3.5 text-amber-600" />
                <span>{isVi ? 'Chức năng sinh lý cốt lõi' : 'Core Physiological Functions'}</span>
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                {(isVi ? organ.functionVi : organ.functionEn).map((func, i) => (
                  <li key={i}>{func}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: SUBDIVISIONS */}
        {activeTab === 'subdivisions' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <p className="text-slate-600 dark:text-slate-400">
              {isVi
                ? 'Các phân khu giải phẫu và chi tiết bề mặt được định danh độc lập theo TA2:'
                : 'Anatomical subdivisions and surface landmarks indexed under TA2:'}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {organ.subdivisions.map((sub) => {
                const isSelected = (activeSubdivisionId === sub.id) || (!activeSubdivisionId && organ.subdivisions[0].id === sub.id);
                return (
                  <button
                    key={sub.id}
                    onClick={() => selectSubdivision(sub.id)}
                    className={`text-left p-2.5 rounded-lg border transition cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                        {isVi ? sub.nameVi : sub.nameEn}
                      </span>
                      <span className="text-[10px] font-mono italic text-slate-500 dark:text-slate-400">
                        {sub.nameLa}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                      {isVi ? sub.descriptionVi : sub.descriptionEn}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: NEUROVASCULATURE */}
        {activeTab === 'neurovasculature' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#e7ded3]'}`}>
              <h4 className="font-semibold text-xs text-red-600 dark:text-red-400 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>{isVi ? 'Cấp máu động mạch' : 'Arterial Blood Supply'}</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300">
                {isVi ? organ.bloodSupply.arterialVi : organ.bloodSupply.arterialEn}
              </p>
            </div>

            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#e7ded3]'}`}>
              <h4 className="font-semibold text-xs text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>{isVi ? 'Dẫn lưu tĩnh mạch' : 'Venous Drainage'}</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300">
                {isVi ? organ.bloodSupply.venousVi : organ.bloodSupply.venousEn}
              </p>
            </div>

            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#e7ded3]'}`}>
              <h4 className="font-semibold text-xs text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>{isVi ? 'Dẫn lưu bạch huyết' : 'Lymphatic Drainage'}</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300">
                {isVi ? organ.bloodSupply.lymphaticVi : organ.bloodSupply.lymphaticEn}
              </p>
            </div>

            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#e7ded3]'}`}>
              <h4 className="font-semibold text-xs text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>{isVi ? 'Chi phối thần kinh (Tự chủ & Cảm giác)' : 'Innervation'}</span>
              </h4>
              <div className="space-y-1.5 text-slate-700 dark:text-slate-300 mt-1.5">
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Đối giao cảm: </span>
                  {isVi ? organ.innervation.parasympatheticVi : organ.innervation.parasympatheticEn}
                </div>
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Giao cảm: </span>
                  {isVi ? organ.innervation.sympatheticVi : organ.innervation.sympatheticEn}
                </div>
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Cảm giác tạng: </span>
                  {isVi ? organ.innervation.sensoryVi : organ.innervation.sensoryEn}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HISTOLOGY */}
        {activeTab === 'histology' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#e7ded3]'}`}>
              <h4 className="font-semibold text-xs mb-1.5 text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <Microscope className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đặc điểm mô học & Tế bào học' : 'Microscopic & Cellular Architecture'}</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {isVi ? organ.histologyVi : organ.histologyEn}
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: CLINICAL PEARLS */}
        {activeTab === 'clinical' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50 border-rose-200'}`}>
              <h4 className="font-semibold text-xs mb-2 text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{isVi ? 'Điểm mấu chốt ngoại khoa & Bệnh học' : 'Surgical & Pathological Correlations'}</span>
              </h4>
              <ul className="space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300">
                {(isVi ? organ.clinicalNotesVi : organ.clinicalNotesEn).map((note, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer Reference Citation */}
      <div className={`p-2.5 px-4 border-t text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between flex-shrink-0 ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-[#e7ded3] bg-[#f5ede0]'}`}>
        <span className="truncate">Nguồn 3D: Z-Anatomy (CC BY-SA 4.0)</span>
        <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">TA2 Verified</span>
      </div>
    </div>
  );
};
