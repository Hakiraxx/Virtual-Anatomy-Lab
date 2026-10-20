import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Activity,
  HeartPulse,
  Compass,
  GitFork,
  Stethoscope,
  PanelLeftClose,
  Search,
  Eye,
  EyeOff,
  Filter
} from 'lucide-react';
import { useDigestiveStore } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  DIGESTIVE_STRUCTURE_LIST,
  DIGESTIVE_SYSTEM_DATA,
  DigestiveCategory,
  DigestiveOrganData
} from '../../data/digestiveSystemData';

interface DigestiveTreeProps {
  isOpen?: boolean;
  onClose?: () => void;
  customWidth?: number;
  isMobileDrawer?: boolean;
}

export const DigestiveTree: React.FC<DigestiveTreeProps> = ({
  isOpen = true,
  onClose,
  customWidth = 320,
  isMobileDrawer = false
}) => {
  const selectedOrganId = useDigestiveStore((s) => s.selectedOrganId);
  const selectOrgan = useDigestiveStore((s) => s.selectOrgan);
  const visibleLayers = useDigestiveStore((s) => s.visibleLayers);
  const toggleLayer = useDigestiveStore((s) => s.toggleLayer);
  const setAllLayers = useDigestiveStore((s) => s.setAllLayers);

  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  // Search input within tree
  const [treeSearch, setTreeSearch] = useState('');
  const [showLayerToggles, setShowLayerToggles] = useState(false);

  // Expanded tree branches
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    gi_tract: true,
    hepatobiliary: true,
    pancreas: true,
    vasculature: false,
    peritoneum: false
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Auto-expand relevant tree section when selection changes
  useEffect(() => {
    if (!selectedOrganId) return;
    const organ = DIGESTIVE_SYSTEM_DATA[selectedOrganId];
    if (!organ) return;

    setExpandedSections((prev) => {
      const next = { ...prev };
      if (
        organ.category === 'oral_pharynx' ||
        organ.category === 'esophagus_stomach' ||
        organ.category === 'small_intestine' ||
        organ.category === 'large_intestine'
      ) {
        next.gi_tract = true;
      } else if (organ.category === 'hepatobiliary') {
        next.hepatobiliary = true;
      } else if (organ.category === 'pancreas') {
        next.pancreas = true;
      } else if (organ.category === 'peritoneum') {
        next.peritoneum = true;
      }
      return next;
    });
  }, [selectedOrganId]);

  const handleItemSelect = (id: string) => {
    selectOrgan(id);
    if (isMobileDrawer && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Filter structures by search query
  const query = treeSearch.trim().toLowerCase();
  const filterMatch = (item: DigestiveOrganData) => {
    if (!query) return true;
    return (
      item.nameVi.toLowerCase().includes(query) ||
      item.nameEn.toLowerCase().includes(query) ||
      item.nameLa.toLowerCase().includes(query) ||
      item.id.includes(query)
    );
  };

  // Structure groupings
  const giTractOrgans = DIGESTIVE_STRUCTURE_LIST.filter(
    (o) =>
      (o.category === 'oral_pharynx' ||
        o.category === 'esophagus_stomach' ||
        o.category === 'small_intestine' ||
        o.category === 'large_intestine') &&
      filterMatch(o)
  );

  const hepatobiliaryOrgans = DIGESTIVE_STRUCTURE_LIST.filter(
    (o) => o.category === 'hepatobiliary' && filterMatch(o)
  );

  const pancreasOrgans = DIGESTIVE_STRUCTURE_LIST.filter(
    (o) => o.category === 'pancreas' && filterMatch(o)
  );

  const peritoneumOrgans = DIGESTIVE_STRUCTURE_LIST.filter(
    (o) => o.category === 'peritoneum' && filterMatch(o)
  );

  const styleWidth = isMobileDrawer ? '100%' : `${customWidth}px`;

  return (
    <aside
      data-ui="digestive-tree"
      style={{ width: styleWidth }}
      className={`h-full flex flex-col flex-shrink-0 select-none overflow-hidden transition-all duration-150 border-r ${
        isDark
          ? 'bg-[#0c121e] border-slate-800/80 text-slate-100'
          : 'bg-[#faf6f0] border-[#e7ded3] text-[#28231d]'
      }`}
    >
      {/* 1. Header: Title, Search & Close button */}
      <div className={`p-3 border-b flex-shrink-0 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h2 className="font-serif font-bold text-xs uppercase tracking-wider text-current">
              Cây Giải Phẫu Tiêu Hóa
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowLayerToggles(!showLayerToggles)}
              className={`p-1 rounded-md text-[10px] border transition cursor-pointer flex items-center gap-1 ${
                showLayerToggles
                  ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                  : 'text-slate-400 border-transparent hover:border-slate-700'
              }`}
              title="Bật / Tắt lớp hiển thị"
            >
              <Filter className="w-3 h-3" />
              <span className="hidden sm:inline">Lớp</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition"
                title="Thu gọn cây giải phẫu"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={treeSearch}
            onChange={(e) => setTreeSearch(e.target.value)}
            placeholder="Tìm dạ dày, gan, tụy, ruột thừa…"
            className={`w-full pl-8 pr-3 py-1 rounded-lg text-xs border transition outline-none ${
              isDark
                ? 'bg-slate-900 border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-amber-500'
                : 'bg-white border-[#dcd2c3] text-[#28231d] placeholder-slate-400 focus:border-amber-600'
            }`}
          />
          {treeSearch && (
            <button
              onClick={() => setTreeSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-current"
            >
              ✕
            </button>
          )}
        </div>

        {/* Layer toggles popdown */}
        {showLayerToggles && (
          <div
            className={`mt-2 p-2 rounded-xl border text-[11px] space-y-1 ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-[#ede5d6] border-[#dfd4c4]'
            }`}
          >
            <div className="flex items-center justify-between pb-1 border-b border-inherit font-semibold text-[10px] uppercase text-slate-400">
              <span>Lớp hiển thị</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setAllLayers(true)}
                  className="text-amber-500 hover:underline cursor-pointer"
                >
                  Bật hết
                </button>
                <button
                  onClick={() => setAllLayers(false)}
                  className="text-slate-400 hover:underline cursor-pointer"
                >
                  Tắt
                </button>
              </div>
            </div>

            <label className="flex items-center justify-between cursor-pointer py-0.5">
              <span>Ống tiêu hóa chính</span>
              <input
                type="checkbox"
                checked={visibleLayers.giTract}
                onChange={() => toggleLayer('giTract')}
                className="accent-amber-600 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer py-0.5">
              <span>Gan & Đường mật</span>
              <input
                type="checkbox"
                checked={visibleLayers.hepatobiliary}
                onChange={() => toggleLayer('hepatobiliary')}
                className="accent-amber-600 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer py-0.5">
              <span>Tụy & Ống tụy</span>
              <input
                type="checkbox"
                checked={visibleLayers.pancreas}
                onChange={() => toggleLayer('pancreas')}
                className="accent-amber-600 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer py-0.5">
              <span>Mạch máu tạng</span>
              <input
                type="checkbox"
                checked={visibleLayers.vasculature}
                onChange={() => toggleLayer('vasculature')}
                className="accent-amber-600 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer py-0.5">
              <span>Phúc mạc & Mạc nối</span>
              <input
                type="checkbox"
                checked={visibleLayers.peritoneum}
                onChange={() => toggleLayer('peritoneum')}
                className="accent-amber-600 rounded cursor-pointer"
              />
            </label>
          </div>
        )}
      </div>

      {/* 2. Scrollable Hierarchical Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
        {/* GROUP A: ỐNG TIÊU HÓA CHÍNH (GI TRACT) */}
        {giTractOrgans.length > 0 && (
          <div className="rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('gi_tract')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                isDark ? 'hover:bg-slate-800/60 text-slate-300' : 'hover:bg-[#ede5d6]/70 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-amber-500" />
                <span>Ống Tiêu Hóa Chính</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono text-amber-500 font-bold">
                  {giTractOrgans.length}
                </span>
                {expandedSections.gi_tract ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>

            {expandedSections.gi_tract && (
              <div className="mt-1 space-y-0.5 pl-2 border-l border-amber-500/20 ml-3">
                {giTractOrgans.map((organ) => {
                  const isSelected = selectedOrganId === organ.id;
                  return (
                    <button
                      key={organ.id}
                      onClick={() => handleItemSelect(organ.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white font-bold shadow-sm'
                          : isDark
                          ? 'hover:bg-slate-800/80 text-slate-300'
                          : 'hover:bg-[#ede5d6] text-slate-800'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{organ.nameVi}</div>
                        <div
                          className={`text-[10px] truncate font-serif italic ${
                            isSelected ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {organ.nameLa} • {organ.approximateDimensions}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isSelected ? 'text-white' : 'text-slate-400 opacity-60'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* GROUP B: GAN & ĐƯỜNG MẬT (HEPATOBILIARY) */}
        {hepatobiliaryOrgans.length > 0 && (
          <div className="rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('hepatobiliary')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                isDark ? 'hover:bg-slate-800/60 text-slate-300' : 'hover:bg-[#ede5d6]/70 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-500" />
                <span>Gan & Hệ Thống Mật</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono text-emerald-500 font-bold">
                  {hepatobiliaryOrgans.length}
                </span>
                {expandedSections.hepatobiliary ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>

            {expandedSections.hepatobiliary && (
              <div className="mt-1 space-y-0.5 pl-2 border-l border-emerald-500/20 ml-3">
                {hepatobiliaryOrgans.map((organ) => {
                  const isSelected = selectedOrganId === organ.id;
                  return (
                    <div key={organ.id} className="space-y-0.5">
                      <button
                        onClick={() => handleItemSelect(organ.id)}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-600 text-white font-bold shadow-sm'
                            : isDark
                            ? 'hover:bg-slate-800/80 text-slate-300'
                            : 'hover:bg-[#ede5d6] text-slate-800'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold">{organ.nameVi}</div>
                          <div
                            className={`text-[10px] truncate font-serif italic ${
                              isSelected ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {organ.nameLa}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isSelected ? 'text-white' : 'text-slate-400 opacity-60'
                          }`}
                        />
                      </button>

                      {/* Couinaud segments preview if Liver */}
                      {organ.id === 'liver' && isSelected && (
                        <div className="pl-3 py-1 space-y-0.5 text-[10px]">
                          <div className="text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider mb-0.5">
                            8 Phân thùy Couinaud:
                          </div>
                          <div className="grid grid-cols-2 gap-1 font-mono">
                            {organ.subdivisions.map((sub) => (
                              <div
                                key={sub.id}
                                className={`px-1.5 py-0.5 rounded border text-[9px] truncate ${
                                  isDark
                                    ? 'bg-slate-900/60 border-slate-700/60 text-slate-300'
                                    : 'bg-white/80 border-[#e0d6c7] text-slate-700'
                                }`}
                                title={sub.descriptionVi}
                              >
                                {sub.nameVi.replace('Phân thùy ', 'PT ')}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* GROUP C: TUỴ & ĐƯỜNG TIÊU HÓA PHỤ TRỢ (PANCREAS) */}
        {pancreasOrgans.length > 0 && (
          <div className="rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('pancreas')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                isDark ? 'hover:bg-slate-800/60 text-slate-300' : 'hover:bg-[#ede5d6]/70 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>Tụy & Tuyến Tiêu Hóa</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono text-amber-500 font-bold">
                  {pancreasOrgans.length}
                </span>
                {expandedSections.pancreas ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>

            {expandedSections.pancreas && (
              <div className="mt-1 space-y-0.5 pl-2 border-l border-amber-500/20 ml-3">
                {pancreasOrgans.map((organ) => {
                  const isSelected = selectedOrganId === organ.id;
                  return (
                    <button
                      key={organ.id}
                      onClick={() => handleItemSelect(organ.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white font-bold shadow-sm'
                          : isDark
                          ? 'hover:bg-slate-800/80 text-slate-300'
                          : 'hover:bg-[#ede5d6] text-slate-800'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{organ.nameVi}</div>
                        <div
                          className={`text-[10px] truncate font-serif italic ${
                            isSelected ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {organ.nameLa} • {organ.approximateDimensions}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isSelected ? 'text-white' : 'text-slate-400 opacity-60'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* GROUP D: PHÚC MẠC & MẠC NỐI (PERITONEUM) */}
        {peritoneumOrgans.length > 0 && (
          <div className="rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('peritoneum')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                isDark ? 'hover:bg-slate-800/60 text-slate-300' : 'hover:bg-[#ede5d6]/70 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Phúc Mạc & Mạc Nối</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono text-indigo-500 font-bold">
                  {peritoneumOrgans.length}
                </span>
                {expandedSections.peritoneum ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>

            {expandedSections.peritoneum && (
              <div className="mt-1 space-y-0.5 pl-2 border-l border-indigo-500/20 ml-3">
                {peritoneumOrgans.map((organ) => {
                  const isSelected = selectedOrganId === organ.id;
                  return (
                    <button
                      key={organ.id}
                      onClick={() => handleItemSelect(organ.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white font-bold shadow-sm'
                          : isDark
                          ? 'hover:bg-slate-800/80 text-slate-300'
                          : 'hover:bg-[#ede5d6] text-slate-800'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{organ.nameVi}</div>
                        <div
                          className={`text-[10px] truncate font-serif italic ${
                            isSelected ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {organ.nameLa}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isSelected ? 'text-white' : 'text-slate-400 opacity-60'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Footer summary badge */}
      <div
        className={`p-2.5 border-t flex-shrink-0 text-[11px] font-mono flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-[#e7ded3] bg-[#f4ecdf] text-slate-600'
        }`}
      >
        <span>Z-Anatomy CC BY-SA 4.0</span>
        <span className="font-bold text-amber-500">13 CƠ QUAN 3D</span>
      </div>
    </aside>
  );
};
