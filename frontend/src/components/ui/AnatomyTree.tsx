import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Activity,
  Heart,
  Brain,
  Wind,
  Utensils,
  Droplets,
  Layers,
  Radio,
  Shield,
  Search,
  Filter,
  Users,
  X
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  ANATOMICAL_SYSTEMS,
  ANATOMICAL_STRUCTURES,
  AnatomicalSystem,
  AnatomicalStructure
} from '../../data/anatomyHierarchy';
import { AnatomicalPronunciation } from './AnatomicalPronunciation';

const SYSTEM_ICONS: Record<string, React.ReactNode> = {
  skeletal: <span className="text-amber-700">🦴</span>,
  muscular: <Activity className="w-3.5 h-3.5 text-rose-600" />,
  cardiovascular: <Heart className="w-3.5 h-3.5 text-red-600" />,
  nervous_cns: <Brain className="w-3.5 h-3.5 text-amber-500" />,
  nervous_pns: <span className="text-amber-500">⚡</span>,
  respiratory: <Wind className="w-3.5 h-3.5 text-sky-500" />,
  digestive: <Utensils className="w-3.5 h-3.5 text-orange-500" />,
  urinary: <Droplets className="w-3.5 h-3.5 text-yellow-600" />,
  endocrine: <Radio className="w-3.5 h-3.5 text-purple-600" />,
  lymphatic: <Shield className="w-3.5 h-3.5 text-emerald-600" />,
  integumentary: <Layers className="w-3.5 h-3.5 text-amber-600" />,
  reproductive: <Users className="w-3.5 h-3.5 text-pink-600" />
};

export const AnatomyTree: React.FC = () => {
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const gender = useAnatomyStore((s) => s.gender);
  const selectedStructureId = useAnatomyStore((s) => s.selectedStructureId);
  const selectStructure = useAnatomyStore((s) => s.selectStructure);
  const triggerCameraFocus = useAnatomyStore((s) => s.triggerCameraFocus);
  const focusOnStructure = useAnatomyStore((s) => s.focusOnStructure);
  const isTreeOpen = useAnatomyStore((s) => s.isTreeOpen);
  const setIsTreeOpen = useAnatomyStore((s) => s.setIsTreeOpen);

  const [expandedSystems, setExpandedSystems] = useState<Record<string, boolean>>({
    cardiovascular: true,
    nervous_cns: true
  });
  const [filterText, setFilterText] = useState('');

  const isVi = language === 'vi';

  // Automatically expand parent system when a structure is selected anywhere
  React.useEffect(() => {
    if (selectedStructureId) {
      const st = ANATOMICAL_STRUCTURES[selectedStructureId];
      if (st && st.systemId) {
        setExpandedSystems((prev) => ({ ...prev, [st.systemId]: true }));
      }
    }
  }, [selectedStructureId]);

  const toggleSystem = (sysId: string) => {
    setExpandedSystems((prev) => ({ ...prev, [sysId]: !prev[sysId] }));
  };

  const handleStructureClick = (st: AnatomicalStructure) => {
    selectStructure(st.id);
    focusOnStructure(st.id, st.nameVi, st.nameEn, st.position);

    // Smooth dynamic camera focus to structure anchor
    triggerCameraFocus({
      targetPosition: [st.position[0], st.position[1] + 0.05, st.position[2] + 0.6],
      targetLookAt: [st.position[0], st.position[1], st.position[2]],
      duration: 800,
      timestamp: Date.now()
    });
  };

  // Get structures belonging to system, filtered by gender & search
  const getStructuresForSystem = (sys: AnatomicalSystem): AnatomicalStructure[] => {
    return Object.values(ANATOMICAL_STRUCTURES).filter((st: AnatomicalStructure) => {
      if (st.systemId !== sys.id) return false;
      if (st.gender !== 'all' && st.gender !== gender) return false;
      if (filterText.trim()) {
        const q = filterText.toLowerCase();
        const matchName =
          st.nameVi.toLowerCase().includes(q) ||
          st.nameEn.toLowerCase().includes(q) ||
          (st.synonyms && st.synonyms.some((s: string) => s.toLowerCase().includes(q))) ||
          (st.nameLatin && st.nameLatin.toLowerCase().includes(q));
        if (!matchName) return false;
      }
      return true;
    });
  };

  return (
    <>
      {/* Mobile / Tablet Backdrop Overlay (< 1200px) */}
      {isTreeOpen && (
        <div
          onClick={() => setIsTreeOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-fade-in"
        />
      )}

      <aside
        data-ui="left-sidebar"
        className={`fixed lg:relative inset-y-0 left-0 z-50 h-full flex flex-col border-r select-none transition-all duration-300 ${
          isTreeOpen
            ? 'translate-x-0 w-80 max-w-[85vw] lg:w-64 xl:w-72 2xl:w-80 shadow-2xl lg:shadow-none'
            : '-translate-x-full lg:w-0 lg:border-r-0 lg:overflow-hidden'
        } ${
          isDark
            ? 'bg-[#0f141c] border-slate-800 text-slate-200'
            : 'bg-[#f7f0e7] border-[#e7ded3] text-[#28231d]'
        }`}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-inherit space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="font-serif font-bold text-sm tracking-tight text-amber-700 dark:text-amber-400">
              {isVi ? 'CÂY GIẢI PHẪU CƠ THỂ' : 'ANATOMICAL TREE'}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 uppercase font-bold">
                {gender === 'male' ? (isVi ? 'Nam ♂' : 'Male ♂') : (isVi ? 'Nữ ♀' : 'Female ♀')}
              </span>
              <button
                onClick={() => setIsTreeOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                title="Đóng / Thu gọn cây giải phẫu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={isVi ? 'Lọc cấu trúc giải phẫu…' : 'Filter anatomy tree…'}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white/70 dark:bg-slate-900/70 border border-[#e7ded3] dark:border-slate-800 outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Systems & Structures Hierarchy Tree */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          {ANATOMICAL_SYSTEMS.map((sys) => {
            const isExpanded = expandedSystems[sys.id] ?? false;
            const structures = getStructuresForSystem(sys);

            return (
              <div key={sys.id} className="rounded-xl overflow-hidden border border-transparent hover:border-inherit">
                {/* System Parent Accordion Header */}
                <button
                  onClick={() => toggleSystem(sys.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isExpanded
                    ? isDark
                      ? 'bg-slate-800/80 text-white'
                      : 'bg-[#ede3d5] text-[#28231d]'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="flex-shrink-0">{SYSTEM_ICONS[sys.id] || <span>◈</span>}</span>
                  <span className="truncate">{isVi ? sys.nameVi : sys.nameEn}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 text-[10px]">
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                      sys.assetStatus === 'READY'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : sys.assetStatus === 'PARTIAL'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-500/15 text-slate-500'
                    }`}
                  >
                    {sys.assetStatus}
                  </span>
                  <span className="text-slate-400">({structures.length})</span>
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </div>
              </button>

              {/* Child Structures List */}
              {isExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-amber-600/30 ml-3.5 my-1">
                  {structures.length === 0 ? (
                    <div className="text-[11px] text-slate-400 italic py-1 pl-2">
                      {isVi ? 'Không có cấu trúc phù hợp' : 'No structures matching filter'}
                    </div>
                  ) : (
                    structures.map((st) => {
                      const isSelected = selectedStructureId === st.id;

                      return (
                        <button
                          key={st.id}
                          onClick={() => handleStructureClick(st)}
                          className={`w-full flex items-center justify-between p-1.5 rounded-lg text-left text-xs transition-all cursor-pointer group ${
                            isSelected
                              ? 'bg-amber-600 text-white font-bold shadow-sm'
                              : 'hover:bg-amber-500/10 hover:text-amber-600 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="truncate pr-1">
                            <div className="truncate font-medium">
                              {isVi ? st.nameVi : st.nameEn}
                            </div>
                            {st.nameLatin && (
                              <div
                                className={`text-[10px] font-serif italic truncate ${
                                  isSelected ? 'text-amber-100' : 'text-slate-400'
                                }`}
                              >
                                {st.nameLatin}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <AnatomicalPronunciation
                              termId={st.id}
                              englishName={st.nameEn}
                              latinName={st.nameLatin}
                              mode="button-only"
                              size="xs"
                              className={`opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity ${
                                isSelected ? '!opacity-100 !text-white hover:!bg-white/20' : ''
                              }`}
                            />
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono ${
                                isSelected
                                  ? 'bg-black/20 text-white'
                                  : 'bg-black/5 dark:bg-white/5 text-slate-400'
                              }`}
                            >
                              {st.category}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </aside>
    </>
  );
};
