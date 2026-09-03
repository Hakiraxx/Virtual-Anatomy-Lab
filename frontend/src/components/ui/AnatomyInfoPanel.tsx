import React from 'react';
import {
  Stethoscope,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  GitFork,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  X
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  ANATOMICAL_STRUCTURES,
  ANATOMICAL_SYSTEMS,
  AnatomicalStructure
} from '../../data/anatomyHierarchy';

export const AnatomyInfoPanel: React.FC = () => {
  const selectedStructureId = useAnatomyStore((s) => s.selectedStructureId);
  const selectStructure = useAnatomyStore((s) => s.selectStructure);
  const setActiveSpecimen = useAnatomyStore((s) => s.setActiveSpecimen);
  const setViewMode = useAnatomyStore((s) => s.setViewMode);
  const triggerCameraFocus = useAnatomyStore((s) => s.triggerCameraFocus);
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const isInfoOpen = useAnatomyStore((s) => s.isInfoOpen);
  const setIsInfoOpen = useAnatomyStore((s) => s.setIsInfoOpen);

  const isVi = language === 'vi';

  // If a specific structure is selected, display it; otherwise display whole-body summary
  const structure: AnatomicalStructure | null =
    selectedStructureId && ANATOMICAL_STRUCTURES[selectedStructureId]
      ? ANATOMICAL_STRUCTURES[selectedStructureId]
      : null;

  const system = structure
    ? ANATOMICAL_SYSTEMS.find((sys) => sys.id === structure.systemId)
    : null;

  // Switch to specimen atelier for deep inspection
  const handleDeepInspect = () => {
    if (!structure) return;
    let specimenId = 'heart';
    if (structure.id.includes('brain') || structure.id.includes('lobe')) specimenId = 'brain';
    else if (structure.id.includes('skull')) specimenId = 'skull';
    else if (structure.id.includes('spine')) specimenId = 'spine';
    else if (structure.id.includes('lung')) specimenId = 'lungs';
    else if (structure.id.includes('liver')) specimenId = 'liver';
    else if (structure.id.includes('kidney')) specimenId = 'kidneys';
    else if (structure.id.includes('stomach')) specimenId = 'stomach';
    else if (structure.id.includes('thyroid')) specimenId = 'thyroid';
    else if (structure.id.includes('testis')) specimenId = 'testis';
    else if (structure.id.includes('uterus')) specimenId = 'uterus';
    else if (structure.id.includes('muscle') || structure.id.includes('biceps')) specimenId = 'muscle';
    else if (structure.id.includes('vagus') || structure.id.includes('cranial')) specimenId = 'cranial-nerves';

    setActiveSpecimen(specimenId);
    setViewMode('specimen');
  };

  const handleRelationClick = (targetId: string) => {
    const target = ANATOMICAL_STRUCTURES[targetId];
    if (target) {
      selectStructure(target.id);
      triggerCameraFocus({
        targetPosition: [target.position[0], target.position[1] + 0.05, target.position[2] + 0.6],
        targetLookAt: [target.position[0], target.position[1], target.position[2]],
        duration: 750,
        timestamp: Date.now()
      });
    }
  };

  const panelWrapperClass = `
    fixed xl:relative z-50
    inset-x-0 bottom-0 max-h-[82vh] rounded-t-3xl border-t
    md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-full md:rounded-none md:border-t-0 md:border-l
    xl:inset-auto xl:h-full
    flex flex-col overflow-y-auto select-none transition-all duration-300
    ${
      isInfoOpen
        ? 'translate-y-0 md:translate-x-0 w-full md:w-80 lg:w-96 shadow-2xl xl:shadow-none'
        : 'translate-y-full md:translate-x-full xl:w-0 xl:border-l-0 xl:overflow-hidden'
    }
    ${isDark ? 'bg-[#0f141c]/95 border-slate-800 text-slate-100 backdrop-blur-xl' : 'bg-[#f7f0e7]/95 border-[#e7ded3] text-[#28231d] backdrop-blur-xl'}
  `;

  if (!structure) {
    return (
      <>
        {isInfoOpen && (
          <div
            onClick={() => setIsInfoOpen(false)}
            className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-fade-in"
          />
        )}
        <aside className={panelWrapperClass}>
          {/* iOS Bottom Sheet Drag Handle */}
          <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto my-2 md:hidden" />

          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {isVi ? 'TỔNG QUAN GIẢI PHẪU HỌC' : 'ANATOMY OVERVIEW'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  HOMO SAPIENS
                </span>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  title="Đóng / Thu gọn chi tiết"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-current">
              {isVi ? 'Cơ thể người' : 'Human Body'}
            </h1>
            <div className="text-xs font-serif italic text-amber-600 dark:text-amber-400 mt-0.5">
              Corpus humanum
            </div>
          </div>

          <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/20 text-xs space-y-1.5">
            <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVi ? 'Hướng dẫn khám phá tương tác' : 'Interactive Navigation'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              {isVi
                ? 'Nhấp trực tiếp lên bất kỳ cơ quan nào trên mô hình 3D hoặc chọn trên Cây giải phẫu bên trái để tự động Focus, giảm mờ xung quanh và xem hồ sơ y khoa chi tiết.'
                : 'Click any organ in the 3D viewport or select from the left Anatomy Tree to auto-focus, dim surrounding structures, and view medical pathology.'}
            </p>
          </div>

          {/* Key anatomical statistics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">{isVi ? 'Khung xương' : 'Skeleton'}</div>
              <div className="text-base font-bold font-serif text-amber-600">206</div>
              <div className="text-[10px] text-slate-500">{isVi ? 'Xương chính' : 'Bones'}</div>
            </div>
            <div className="p-2.5 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">{isVi ? 'Hệ cơ vân' : 'Muscles'}</div>
              <div className="text-base font-bold font-serif text-rose-600">~640</div>
              <div className="text-[10px] text-slate-500">{isVi ? 'Cơ vận động' : 'Skeletal muscles'}</div>
            </div>
            <div className="p-2.5 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">{isVi ? 'Hệ cơ quan' : 'Systems'}</div>
              <div className="text-base font-bold font-serif text-sky-600">12</div>
              <div className="text-[10px] text-slate-500">{isVi ? 'Hệ giải phẫu' : 'Major systems'}</div>
            </div>
            <div className="p-2.5 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">{isVi ? 'Tiêu bản 3D' : '3D Models'}</div>
              <div className="text-base font-bold font-serif text-emerald-600">64</div>
              <div className="text-[10px] text-slate-500">{isVi ? 'Mô hình tạng' : 'PBR Assets'}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

  return (
    <>
      {isInfoOpen && (
        <div
          onClick={() => setIsInfoOpen(false)}
          className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-fade-in"
        />
      )}
      <aside className={panelWrapperClass}>
        {/* iOS Bottom Sheet Drag Handle */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto my-2 md:hidden" />

        <div className="p-5 space-y-4">
          {/* 1. Header: System tag, Review Status & Close button */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span>{system ? (isVi ? system.nameVi : system.nameEn) : 'Hệ cơ quan'}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                <span>{structure.reviewStatus.toUpperCase()}</span>
              </span>
              <button
                onClick={() => setIsInfoOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                title="Đóng / Thu gọn chi tiết"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

        {/* 2. Titles */}
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-current">
            {isVi ? structure.nameVi : structure.nameEn}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="text-xs font-serif italic text-amber-600 dark:text-amber-400">
              {structure.nameLatin || structure.nameEn}
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 uppercase">
              {structure.category}
            </span>
          </div>
        </div>

        {/* 3. Deep Explore Button */}
        <button
          onClick={handleDeepInspect}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isVi ? 'Khám phá tiêu bản 3D chuyên sâu' : 'Inspect 3D Specimen'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* 4. Description */}
        <div className="p-3 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800 text-xs">
          <div className="font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1">
            <span>◈</span>
            <span>{isVi ? 'Mô tả giải phẫu' : 'Anatomical Description'}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            {isVi ? structure.descriptionVi : structure.descriptionEn}
          </p>
        </div>

        {/* 5. Location & Function */}
        <div className="grid grid-cols-1 gap-2 text-xs">
          {structure.locationVi && (
            <div className="p-2.5 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800">
              <span className="font-semibold text-slate-500 text-[10px] uppercase tracking-wider block mb-0.5">
                {isVi ? 'Vị trí giải phẫu' : 'Location'}
              </span>
              <p className="text-slate-700 dark:text-slate-200 text-[11px] leading-relaxed">
                {isVi ? structure.locationVi : structure.locationEn}
              </p>
            </div>
          )}

          {structure.functionVi && (
            <div className="p-2.5 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800">
              <span className="font-semibold text-slate-500 text-[10px] uppercase tracking-wider block mb-0.5">
                {isVi ? 'Chức năng sinh lý' : 'Function'}
              </span>
              <p className="text-slate-700 dark:text-slate-200 text-[11px] leading-relaxed">
                {isVi ? structure.functionVi : structure.functionEn}
              </p>
            </div>
          )}
        </div>

        {/* 6. Vascular & Innervation */}
        {(structure.bloodSupplyVi || structure.innervationVi) && (
          <div className="p-3 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800 text-xs space-y-2">
            {structure.bloodSupplyVi && (
              <div>
                <div className="font-bold text-rose-600 dark:text-rose-400 text-[11px] flex items-center gap-1">
                  <span>🩸</span>
                  <span>{isVi ? 'Mạch máu cấp dưỡng' : 'Blood Supply'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                  {isVi ? structure.bloodSupplyVi : structure.bloodSupplyEn}
                </p>
              </div>
            )}

            {structure.innervationVi && (
              <div>
                <div className="font-bold text-amber-600 dark:text-amber-400 text-[11px] flex items-center gap-1">
                  <span>⚡</span>
                  <span>{isVi ? 'Thần kinh chi phối' : 'Innervation'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                  {isVi ? structure.innervationVi : structure.innervationEn}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 7. Clinical Pathology Notes & ICD-10 */}
        {structure.clinicalNotesVi && (
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/20 text-xs space-y-1">
            <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{isVi ? 'Ý nghĩa bệnh học & lâm sàng' : 'Clinical Anatomy'}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {isVi ? structure.clinicalNotesVi : structure.clinicalNotesEn}
            </p>
            {structure.icd10 && structure.icd10.length > 0 && (
              <div className="flex items-center gap-1 pt-1">
                <span className="text-[10px] text-slate-400">ICD-10:</span>
                {structure.icd10.map((code) => (
                  <span
                    key={code}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold"
                  >
                    {code}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 8. Relationships Graph */}
        {structure.relationships && structure.relationships.length > 0 && (
          <div className="p-3 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800 text-xs space-y-1.5">
            <div className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 text-[11px]">
              <GitFork className="w-3.5 h-3.5 text-amber-600" />
              <span>{isVi ? 'Quan hệ liên quan' : 'Anatomical Relationships'}</span>
            </div>
            <div className="space-y-1">
              {structure.relationships.map((rel, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRelationClick(rel.targetId)}
                  className="w-full flex items-center justify-between p-1.5 rounded-lg border border-transparent hover:border-amber-500/40 hover:bg-amber-500/5 text-left text-xs transition cursor-pointer group"
                >
                  <div className="truncate pr-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 group-hover:text-amber-600 mr-1.5">
                      {rel.type.replace('_', ' ')}
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-amber-600">
                      {isVi ? rel.targetNameVi : rel.targetNameEn}
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-600 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 9. Medical Source Citation */}
        <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
          <BookOpen className="w-3 h-3" />
          <span>{structure.referenceSource}</span>
        </div>
      </div>
    </aside>
    </>
  );
};
