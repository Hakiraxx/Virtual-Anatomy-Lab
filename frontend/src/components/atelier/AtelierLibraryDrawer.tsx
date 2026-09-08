import React, { useState } from 'react';
import { Search, X, Bookmark, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { ATELIER_ORGANS, AtelierOrgan } from '../../data/fullOrgansData';

export const AtelierLibraryDrawer: React.FC = () => {
  const isLibraryOpen = useAnatomyStore((s) => s.isLibraryOpen);
  const toggleLibraryOpen = useAnatomyStore((s) => s.toggleLibraryOpen);
  const activeSpecimenId = useAnatomyStore((s) => s.activeSpecimenId);
  const setActiveSpecimen = useAnatomyStore((s) => s.setActiveSpecimen);
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const bookmarkedOrganIds = useAnatomyStore((s) => s.bookmarkedOrganIds);
  const toggleBookmark = useAnatomyStore((s) => s.toggleBookmark);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSaved, setFilterSaved] = useState(false);

  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  if (!isLibraryOpen) return null;

  const filtered = ATELIER_ORGANS.filter((org) => {
    if (filterSaved && !bookmarkedOrganIds.has(org.id)) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      org.nameVi.toLowerCase().includes(q) ||
      org.nameEn.toLowerCase().includes(q) ||
      org.scientificName.toLowerCase().includes(q) ||
      org.systemNameVi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-40 flex select-none animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={toggleLibraryOpen}
      />

      {/* Slide-in Drawer */}
      <aside
        className={`relative w-80 sm:w-96 h-full flex flex-col shadow-2xl border-r z-50 transition-colors duration-200 ${
          isDark
            ? 'bg-[#0f141c] border-slate-800 text-slate-100'
            : 'bg-[#fbf7f2] border-[#e7ded3] text-[#28231d]'
        }`}
      >
        {/* Drawer Header */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-[#0d1117]' : 'border-[#e7ded3] bg-[#f7f0e7]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base">
              {isVi ? 'Thư viện tiêu bản' : 'Organ library'}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
              {ATELIER_ORGANS.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterSaved(!filterSaved)}
              className={`p-2 rounded-full border transition ${
                filterSaved
                  ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                  : 'border-transparent text-slate-400 hover:text-current'
              }`}
              title="Chỉ hiện tiêu bản đã lưu"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={toggleLibraryOpen}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-current transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-inherit">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-200'
                : 'bg-white border-[#e3d7c7] text-slate-800'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isVi ? 'Tìm kiếm cơ quan, bệnh lý…' : 'Search organs, topics…'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs focus:outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Organ List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filtered.map((organ) => {
            const isActive = organ.id === activeSpecimenId;
            const isBookmarked = bookmarkedOrganIds.has(organ.id);
            const organName = isVi ? organ.nameVi : organ.nameEn;
            const sysName = isVi ? organ.systemNameVi : organ.systemNameEn;

            return (
              <div
                key={organ.id}
                onClick={() => {
                  setActiveSpecimen(organ.id);
                  toggleLibraryOpen();
                }}
                className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition ${
                  isActive
                    ? isDark
                      ? 'bg-slate-800 border-amber-500/80 shadow-sm'
                      : 'bg-white border-[#c05a4e] shadow-sm'
                    : isDark
                    ? 'bg-slate-900/40 border-transparent hover:bg-slate-800/60'
                    : 'bg-white/40 border-transparent hover:bg-white hover:border-[#e7ded3]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={organ.thumbnail}
                    alt={organName}
                    width={38}
                    height={38}
                    className="w-10 h-10 rounded-full object-cover object-center flex-shrink-0 bg-black/5"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-current truncate flex items-center gap-1.5">
                      <span>{organName}</span>
                      <span className="text-[10px] font-serif italic text-slate-400">
                        {organ.scientificName}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {sysName}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(organ.id);
                  }}
                  className={`p-1.5 rounded-full transition ${
                    isBookmarked
                      ? 'text-rose-500'
                      : 'text-slate-300 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Inspirational Quote Footer */}
        <div
          className={`p-4 border-t text-xs ${
            isDark ? 'border-slate-800 bg-[#0d1117]' : 'border-[#e7ded3] bg-[#f7f0e7]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-serif italic text-slate-600 dark:text-slate-300 leading-snug">
                "Learning is an act of curiosity. Keep exploring!"
              </p>
              <div className="text-[10px] text-slate-400 font-mono mt-1">
                MedAnatomy · v1.0.67
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
