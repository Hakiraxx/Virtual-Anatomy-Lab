import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Layers, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { searchAnatomyStructures, AnatomicalStructure } from '../../data/anatomyHierarchy';

import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';

export const SearchModal: React.FC = () => {
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const selectStructure = useAnatomyStore((s) => s.selectStructure);
  const triggerCameraFocus = useAnatomyStore((s) => s.triggerCameraFocus);
  const gender = useAnatomyStore((s) => s.gender);
  const language = useAnatomyStore((s) => s.language);
  const setViewMode = useAnatomyStore((s) => s.setViewMode);
  const setActiveSpecimen = useAnatomyStore((s) => s.setActiveSpecimen);

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isVi = language === 'vi';

  useEffect(() => {
    if (activeModal === 'search') {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [activeModal]);

  // Multilingual & synonym real-time search
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchAnatomyStructures(query, gender);
  }, [query, gender]);

  if (activeModal !== 'search') return null;

  const handleSelect = (st: AnatomicalStructure) => {
    if (st.systemId === 'craniofacial') {
      setViewMode('dental-neuro');
      useDentalNeuroStore.getState().selectAnatomy(st.id);
      setActiveModal(null);
      return;
    }

    selectStructure(st.id);

    // Focus camera onto structure position
    triggerCameraFocus({
      targetPosition: [st.position[0], st.position[1] + 0.05, st.position[2] + 0.6],
      targetLookAt: [st.position[0], st.position[1], st.position[2]],
      duration: 800,
      timestamp: Date.now()
    });

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 z-50 animate-fade-in select-none">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-amber-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder={
              isVi
                ? 'Tìm theo Tiếng Việt (Tim, Não...), Tiếng Anh (Heart...), Latin (Cor) hoặc Đồng nghĩa (Cardiac)...'
                : 'Search by English (Heart...), Vietnamese (Tim...), Latin (Cor) or Synonyms (Cardiac)...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-500 hover:text-slate-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setActiveModal(null)}
            className="px-2 py-1 text-xs text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {!query && (
            <div className="py-6 px-3 text-slate-400 space-y-2">
              <div className="font-semibold text-slate-300">
                {isVi ? 'Gợi ý tra cứu nhanh:' : 'Quick Search Suggestions:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Tim (Cor / Heart)',
                  'Thất trái (Left Ventricle)',
                  'Van hai lá (Mitral Valve)',
                  'Não (Encephalon / Brain)',
                  'Thùy trán (Frontal Lobe)',
                  'TK lang thang (Vagus Nerve CN X)',
                  'Hộp sọ (Skull)',
                  'Phổi (Lungs)',
                  'Gan (Liver)',
                  'Thận (Kidneys)',
                  'Tuyến giáp (Thyroid)'
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag.split(' ')[0])}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isVi ? `Kết quả tìm kiếm (${results.length})` : `Search Results (${results.length})`}
                </span>
              </div>

              {results.map((st) => (
                <div
                  key={st.id}
                  onClick={() => handleSelect(st)}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 hover:border-amber-500/50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-100 group-hover:text-amber-400 flex items-center gap-2">
                      <span>{isVi ? st.nameVi : st.nameEn}</span>
                      <span className="text-slate-400 text-[11px] font-normal">
                        ({isVi ? st.nameEn : st.nameVi})
                      </span>
                    </div>
                    {st.nameLatin && (
                      <div className="text-[10px] font-serif italic text-amber-300/80">
                        {st.nameLatin}
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400 line-clamp-1">
                      {isVi ? st.descriptionVi : st.descriptionEn}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                        st.systemId === 'craniofacial'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-black/20 text-slate-300'
                      }`}
                    >
                      {st.systemId === 'craniofacial' ? 'RHM' : st.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              {isVi
                ? `Không tìm thấy cấu trúc giải phẫu phù hợp với "${query}".`
                : `No anatomical structures matching "${query}".`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
