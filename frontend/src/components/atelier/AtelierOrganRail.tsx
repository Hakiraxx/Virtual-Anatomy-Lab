import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, LibraryBig } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { ATELIER_ORGANS } from '../../data/fullOrgansData';

export const AtelierOrganRail: React.FC = () => {
  const activeSpecimenId = useAnatomyStore((s) => s.activeSpecimenId);
  const setActiveSpecimen = useAnatomyStore((s) => s.setActiveSpecimen);
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const toggleLibraryOpen = useAnatomyStore((s) => s.toggleLibraryOpen);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`relative h-14 border-b flex items-center px-2 select-none z-20 transition-colors duration-200 ${
        isDark
          ? 'bg-[#0f141c]/90 border-slate-800'
          : 'bg-[#f7f0e7] border-[#e7ded3]'
      }`}
      aria-label="Organ library rail"
    >
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        className={`hidden sm:flex p-1 rounded-full border transition items-center justify-center mr-1 ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            : 'bg-[#ede3d5] border-[#e3d7c7] text-slate-600 hover:text-slate-900'
        }`}
        title="Cuộn sang trái"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
      >
        {ATELIER_ORGANS.map((organ) => {
          const isActive = organ.id === activeSpecimenId;
          const organName = isVi ? organ.nameVi : organ.nameEn;

          return (
            <button
              key={organ.id}
              onClick={() => setActiveSpecimen(organ.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                isActive
                  ? isDark
                    ? 'bg-slate-800 border-amber-500/80 text-white shadow-md ring-1 ring-amber-500/30 font-semibold'
                    : 'bg-white border-[#c05a4e] text-[#28231d] shadow-sm ring-1 ring-[#c05a4e]/20 font-semibold'
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  : 'bg-[#ede3d5]/40 border-transparent text-slate-700 hover:bg-[#ede3d5] hover:border-[#e3d7c7]'
              }`}
            >
              {/* Official 34x34 Organ Thumbnail */}
              <img
                src={organ.thumbnail}
                alt={organName}
                width={26}
                height={26}
                className="w-6 h-6 rounded-full object-cover object-center flex-shrink-0 bg-black/5"
                onError={(e) => {
                  // Fallback to dot if thumb failed
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="whitespace-nowrap tracking-tight">{organName}</span>
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: organ.accent || '#ee7c6a' }}
              />
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        className={`hidden sm:flex p-1 rounded-full border transition items-center justify-center ml-1 ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            : 'bg-[#ede3d5] border-[#e3d7c7] text-slate-600 hover:text-slate-900'
        }`}
        title="Cuộn sang phải"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Total Organs Badge / Open Library Drawer Trigger */}
      <button
        onClick={toggleLibraryOpen}
        className={`ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
            : 'bg-[#ede3d5] border-[#e3d7c7] text-[#c05a4e] hover:bg-[#e4d6c4]'
        }`}
        title="Mở toàn bộ thư viện tiêu bản"
      >
        <LibraryBig className="w-3.5 h-3.5" />
        <span>59</span>
      </button>
    </nav>
  );
};
