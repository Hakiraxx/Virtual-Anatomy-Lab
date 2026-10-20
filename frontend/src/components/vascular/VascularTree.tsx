import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useVascularStore } from '../../stores/useVascularStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  VASCULAR_STRUCTURES,
  VASCULAR_REGIONS,
  VascularStructureData,
  VascularRegion,
  VesselType
} from '../../data/vascularSystemData';
import { getVascularSegmentHierarchy } from '../../utils/VascularSegmentManager';

export const VascularTree: React.FC = () => {
  const {
    selectedVesselId,
    activeRegion,
    typeFilter,
    searchQuery,
    selectVessel,
    setActiveRegion,
    setTypeFilter,
    setSearchQuery
  } = useVascularStore();

  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  // Track expanded state for the 10 region groups
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const r of VASCULAR_REGIONS) {
      init[r.id] = true; // All expanded initially
    }
    return init;
  });

  const toggleRegion = (regionId: string) => {
    setExpandedRegions((prev) => ({
      ...prev,
      [regionId]: !prev[regionId]
    }));
  };

  // Filtered vessels based on search query and type filter
  const filteredVessels = useMemo(() => {
    let list = VASCULAR_STRUCTURES;

    if (typeFilter !== 'all') {
      list = list.filter((v) => v.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.nameVi.toLowerCase().includes(q) ||
          v.nameEn.toLowerCase().includes(q) ||
          v.nameLa.toLowerCase().includes(q) ||
          v.clinicalNotesVi.toLowerCase().includes(q) ||
          v.territoryVi.toLowerCase().includes(q)
      );
    }

    return list;
  }, [typeFilter, searchQuery]);

  // Group filtered vessels by region
  const groupedVessels = useMemo(() => {
    const map = new Map<VascularRegion, VascularStructureData[]>();
    for (const r of VASCULAR_REGIONS) {
      map.set(r.id, []);
    }
    for (const v of filteredVessels) {
      const arr = map.get(v.region);
      if (arr) {
        arr.push(v);
      }
    }
    return map;
  }, [filteredVessels]);

  // Auto-scroll selected element into view
  const selectedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedVesselId]);

  return (
    <aside
      data-ui="vascular-tree-sidebar"
      className={`h-full flex flex-col border-r select-none overflow-hidden transition-colors ${
        isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-[#faf6f0] border-[#e2d6c6] text-slate-800'
      }`}
    >
      {/* Header & Quick stats */}
      <div className="p-3 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Cây Phân Cấp Mạch Máu
            </h2>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
            {filteredVessels.length}/100 Chi tiết
          </span>
        </div>

        {/* Search Input */}
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên Việt, Latin, lâm sàng..."
            className={`w-full pl-8 pr-7 py-1.5 rounded-md text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
              isDark
                ? 'bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500'
                : 'bg-white border border-[#dfd4c4] text-slate-800 placeholder-slate-400'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTypeFilter('all')}
            className={`flex-1 py-1 rounded text-[11px] font-semibold text-center transition-colors cursor-pointer ${
              typeFilter === 'all'
                ? 'bg-slate-800 text-amber-300 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Tất cả (100)
          </button>
          <button
            onClick={() => setTypeFilter('artery')}
            className={`flex-1 py-1 rounded text-[11px] font-semibold text-center transition-colors cursor-pointer ${
              typeFilter === 'artery'
                ? 'bg-red-950/80 text-red-300 shadow-sm border border-red-800/80'
                : 'text-red-400/80 hover:text-red-300 hover:bg-red-950/40'
            }`}
          >
            Động Mạch
          </button>
          <button
            onClick={() => setTypeFilter('vein')}
            className={`flex-1 py-1 rounded text-[11px] font-semibold text-center transition-colors cursor-pointer ${
              typeFilter === 'vein'
                ? 'bg-blue-950/80 text-blue-300 shadow-sm border border-blue-800/80'
                : 'text-blue-400/80 hover:text-blue-300 hover:bg-blue-950/40'
            }`}
          >
            Tĩnh Mạch
          </button>
        </div>
      </div>

      {/* Accordion Region Tree List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {VASCULAR_REGIONS.map((region) => {
          const vessels = groupedVessels.get(region.id) || [];
          if (vessels.length === 0 && searchQuery) return null;

          const isExpanded = !!expandedRegions[region.id];
          const isCurrentRegion = activeRegion === region.id;

          return (
            <div
              key={region.id}
              className={`rounded-lg border transition-colors ${
                isCurrentRegion
                  ? 'border-amber-500/50 bg-amber-500/5'
                  : 'border-slate-800/60 bg-slate-900/30'
              }`}
            >
              {/* Region Header Accordion Toggle */}
              <button
                onClick={() => toggleRegion(region.id)}
                className="w-full flex items-center justify-between p-2 text-left hover:bg-slate-800/40 rounded-t-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 min-w-0 pr-1">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  )}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: region.color }}
                  />
                  <span className="text-xs font-bold text-slate-200 truncate">
                    {region.nameVi}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 flex-shrink-0">
                  {vessels.length}
                </span>
              </button>

              {/* Vessel items within region */}
              {isExpanded && vessels.length > 0 && (
                <div className="p-1 pt-0 space-y-0.5">
                  {vessels.map((v) => {
                    const isSelected = v.id === selectedVesselId;
                    return (
                      <div
                        key={v.id}
                        ref={isSelected ? selectedRef : undefined}
                        onClick={() => selectVessel(v.id)}
                        className={`group flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white font-bold shadow-sm ring-1 ring-amber-400/40'
                            : 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Dot indicator for artery vs vein vs cardiac */}
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              v.type === 'artery'
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-red-500'
                                : v.type === 'vein'
                                ? isSelected
                                  ? 'bg-white'
                                  : 'bg-blue-400'
                                : isSelected
                                ? 'bg-white'
                                : 'bg-rose-500'
                            }`}
                          />
                          <div className="truncate min-w-0">
                            <div className="truncate font-medium flex items-center gap-1.5">
                              <span className="truncate">{v.nameVi}</span>
                              {(() => {
                                const hier = getVascularSegmentHierarchy(v.id);
                                if (!hier) return null;
                                const shortSeg = hier.currentSegmentName.split(':')[0].trim();
                                return (
                                  <span
                                    className={`text-[9px] font-mono px-1 py-0.2 rounded font-semibold flex-shrink-0 ${
                                      isSelected
                                        ? 'bg-slate-950/25 text-white'
                                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                                    }`}
                                  >
                                    {shortSeg}
                                  </span>
                                );
                              })()}
                            </div>
                            <div
                              className={`text-[10px] font-mono truncate ${
                                isSelected ? 'text-amber-100' : 'text-slate-500 group-hover:text-slate-400'
                              }`}
                            >
                              {v.nameLa}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-200 flex-shrink-0 ml-1" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredVessels.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-500">
            Không tìm thấy mạch máu phù hợp với từ khóa "{searchQuery}"
          </div>
        )}
      </div>
    </aside>
  );
};
