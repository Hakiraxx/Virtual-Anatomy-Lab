import React, { useState } from 'react';
import {
  Layers,
  Search,
  Eye,
  EyeOff,
  Maximize2,
  RotateCcw,
  Tag,
  HeartPulse,
  Compass,
  Check,
  ChevronRight,
  Filter,
  Info
} from 'lucide-react';
import { Digestive3DStage } from './Digestive3DStage';
import { DigestiveInfoCard } from './DigestiveInfoCard';
import {
  DIGESTIVE_STRUCTURE_LIST,
  DIGESTIVE_SYSTEM_DATA,
  DigestiveCategory
} from '../../data/digestiveSystemData';
import { useDigestiveStore, DigestiveCameraPreset } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const DigestiveLab: React.FC = () => {
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const isVi = language === 'vi';

  // Store bindings
  const selectedOrganId = useDigestiveStore((s) => s.selectedOrganId);
  const selectOrgan = useDigestiveStore((s) => s.selectOrgan);
  const activeCategory = useDigestiveStore((s) => s.activeCategory);
  const setActiveCategory = useDigestiveStore((s) => s.setActiveCategory);
  const visibleLayers = useDigestiveStore((s) => s.visibleLayers);
  const toggleLayer = useDigestiveStore((s) => s.toggleLayer);
  const isolatedView = useDigestiveStore((s) => s.isolatedView);
  const toggleIsolatedView = useDigestiveStore((s) => s.toggleIsolatedView);
  const xrayMode = useDigestiveStore((s) => s.xrayMode);
  const toggleXrayMode = useDigestiveStore((s) => s.toggleXrayMode);
  const cameraPreset = useDigestiveStore((s) => s.cameraPreset);
  const setCameraPreset = useDigestiveStore((s) => s.setCameraPreset);
  const resetView = useDigestiveStore((s) => s.resetView);

  // Local UI state
  const [showLabels, setShowLabels] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [leftRailOpen, setLeftRailOpen] = useState(true);

  const selectedOrgan = selectedOrganId ? DIGESTIVE_SYSTEM_DATA[selectedOrganId] : null;

  // Filtered organ list
  const filteredOrgans = DIGESTIVE_STRUCTURE_LIST.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchVi = item.nameVi.toLowerCase().includes(q);
      const matchEn = item.nameEn.toLowerCase().includes(q);
      const matchLa = item.nameLa.toLowerCase().includes(q);
      return matchVi || matchEn || matchLa;
    }
    return true;
  });

  const categories: { id: DigestiveCategory | 'all'; labelVi: string; labelEn: string }[] = [
    { id: 'all', labelVi: 'Tất cả cơ quan', labelEn: 'All Organs' },
    { id: 'oral_pharynx', labelVi: 'Miệng, Tuyến & Hầu', labelEn: 'Oral & Pharynx' },
    { id: 'esophagus_stomach', labelVi: 'Thực quản & Dạ dày', labelEn: 'Esophagus & Stomach' },
    { id: 'small_intestine', labelVi: 'Tá tràng & Ruột non', labelEn: 'Small Intestine' },
    { id: 'large_intestine', labelVi: 'Đại tràng & Ruột thừa', labelEn: 'Colon & Appendix' },
    { id: 'hepatobiliary', labelVi: 'Gan & Đường mật', labelEn: 'Hepatobiliary' },
    { id: 'pancreas', labelVi: 'Tụy & Ống tụy', labelEn: 'Pancreas' },
    { id: 'peritoneum', labelVi: 'Mạc nối & Phúc mạc', labelEn: 'Peritoneum' }
  ];

  const cameraPresetsList: { id: DigestiveCameraPreset; labelVi: string; labelEn: string }[] = [
    { id: 'overview', labelVi: 'Toàn cảnh', labelEn: 'Overview' },
    { id: 'oral', labelVi: 'Miệng - Hầu', labelEn: 'Oral' },
    { id: 'gastroduodenal', labelVi: 'Dạ dày - Tá tràng', labelEn: 'Gastroduodenal' },
    { id: 'small_bowel', labelVi: 'Ruột non', labelEn: 'Small Bowel' },
    { id: 'colorectal', labelVi: 'Đại tràng', labelEn: 'Colon' },
    { id: 'hepatobiliary', labelVi: 'Gan - Mật', labelEn: 'Hepatobiliary' },
    { id: 'pancreas', labelVi: 'Tụy', labelEn: 'Pancreas' },
    { id: 'posterior', labelVi: 'Mặt sau', labelEn: 'Posterior' }
  ];

  return (
    <div
      className={`relative w-full h-[calc(100dvh-64px)] min-h-[460px] md:min-h-[560px] flex overflow-hidden select-none ${
        isDark ? 'bg-[#0a0e17] text-slate-100' : 'bg-[#f7f0e7] text-[#28231d]'
      }`}
    >
      {/* ==================================================================== */}
      {/* LEFT COLUMN: ORGAN EXPLORER & LAYER SWITCHER RAIL */}
      {/* ==================================================================== */}
      <aside
        className={`${
          leftRailOpen ? 'w-64 sm:w-72' : 'w-0'
        } flex-shrink-0 h-full flex flex-col border-r transition-all duration-200 overflow-hidden z-20 ${
          isDark ? 'bg-[#0f141c] border-slate-800' : 'bg-[#faf6f0] border-[#e7ded3]'
        }`}
      >
        {/* Search header */}
        <div className={`p-3 border-b flex-shrink-0 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? 'Tìm cơ quan tiêu hóa…' : 'Search digestive organ…'}
              className={`w-full pl-8 pr-3 py-1.5 rounded-md text-xs border transition outline-none ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-amber-500'
                  : 'bg-white border-[#dcd2c3] text-[#28231d] placeholder-slate-400 focus:border-amber-600'
              }`}
            />
          </div>

          {/* Category Dropdown */}
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as any)}
              className={`w-full py-1 px-1.5 rounded border text-[11px] font-medium outline-none cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                  : 'bg-[#ede5d6] border-[#dfd4c4] text-[#28231d]'
              }`}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {isVi ? c.labelVi : c.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Anatomical Structure Tree / List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>{isVi ? 'Danh mục cơ quan' : 'Anatomical Structures'}</span>
            <span className="font-mono tabular-nums text-[10px] text-amber-600 dark:text-amber-400">
              {filteredOrgans.length}
            </span>
          </div>

          {filteredOrgans.map((organ) => {
            const isSelected = selectedOrganId === organ.id;
            const name = isVi ? organ.nameVi : organ.nameEn;

            return (
              <button
                key={organ.id}
                onClick={() => selectOrgan(organ.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white font-medium shadow-sm'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{name}</div>
                  <div
                    className={`text-[10px] truncate font-serif italic ${
                      isSelected ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {organ.nameLa}
                  </div>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Layer Toggles Section */}
        <div className={`p-3 border-t flex-shrink-0 text-xs space-y-1.5 ${isDark ? 'border-slate-800 bg-slate-900/40' : 'border-[#e7ded3] bg-[#f5ede0]'}`}>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>{isVi ? 'Lớp hiển thị giải phẫu' : 'Anatomy Layers'}</span>
          </div>

          <label className="flex items-center justify-between cursor-pointer py-0.5">
            <span className="text-[11px] text-slate-700 dark:text-slate-300">{isVi ? 'Ống tiêu hóa chính' : 'GI Tract'}</span>
            <input
              type="checkbox"
              checked={visibleLayers.giTract}
              onChange={() => toggleLayer('giTract')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-0.5">
            <span className="text-[11px] text-slate-700 dark:text-slate-300">{isVi ? 'Gan & Túi mật' : 'Hepatobiliary'}</span>
            <input
              type="checkbox"
              checked={visibleLayers.hepatobiliary}
              onChange={() => toggleLayer('hepatobiliary')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-0.5">
            <span className="text-[11px] text-slate-700 dark:text-slate-300">{isVi ? 'Tụy & Ống tụy' : 'Pancreas'}</span>
            <input
              type="checkbox"
              checked={visibleLayers.pancreas}
              onChange={() => toggleLayer('pancreas')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-0.5">
            <span className="text-[11px] text-slate-700 dark:text-slate-300">{isVi ? 'Mạch máu tạng' : 'Splanchnic Vessels'}</span>
            <input
              type="checkbox"
              checked={visibleLayers.vasculature}
              onChange={() => toggleLayer('vasculature')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-0.5">
            <span className="text-[11px] text-slate-700 dark:text-slate-300">{isVi ? 'Mạc nối & Phúc mạc' : 'Peritoneum'}</span>
            <input
              type="checkbox"
              checked={visibleLayers.peritoneum}
              onChange={() => toggleLayer('peritoneum')}
              className="accent-amber-600 rounded cursor-pointer"
            />
          </label>
        </div>
      </aside>

      {/* ==================================================================== */}
      {/* CENTER VIEWPORT: 3D ANATOMICAL STAGE + OVERLAYS */}
      {/* ==================================================================== */}
      <div className="flex-1 relative h-full flex flex-col overflow-hidden">
        {/* Top Control Bar: Camera Presets (Zone A) */}
        <div
          className={`h-11 px-3 border-b flex items-center justify-between gap-2 overflow-x-auto select-none z-10 flex-shrink-0 ${
            isDark ? 'bg-[#0f141c]/90 border-slate-800' : 'bg-[#faf6f0]/90 border-[#e7ded3]'
          }`}
        >
          {/* Toggle rail button */}
          <button
            onClick={() => setLeftRailOpen(!leftRailOpen)}
            className="p-1.5 rounded-md border text-xs cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            title={leftRailOpen ? 'Thu gọn danh mục' : 'Mở danh mục cơ quan'}
            aria-label="Toggle rail"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Camera View Presets */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {cameraPresetsList.map((preset) => {
              const isActive = cameraPreset === preset.id && !selectedOrganId;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    selectOrgan(null);
                    setCameraPreset(preset.id);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isVi ? preset.labelVi : preset.labelEn}
                </button>
              );
            })}
          </div>

          {/* Reset View Button */}
          <button
            onClick={resetView}
            className="flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-medium transition cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            title="Đặt lại góc nhìn và hiển thị"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">{isVi ? 'Đặt lại' : 'Reset'}</span>
          </button>
        </div>

        {/* 3D Canvas Stage */}
        <div className="flex-1 relative w-full h-full">
          <Digestive3DStage showLabels={showLabels} />
        </div>

        {/* Bottom Viewer Toolbar (Zone B) */}
        <div
          className={`h-11 px-4 border-t flex items-center justify-between gap-3 text-xs select-none z-10 flex-shrink-0 ${
            isDark ? 'bg-[#0f141c]/90 border-slate-800' : 'bg-[#faf6f0]/90 border-[#e7ded3]'
          }`}
        >
          {/* Left tools: Labels & X-ray */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition cursor-pointer ${
                showLabels
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400 font-medium'
                  : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }`}
              title="Bật / Tắt nhãn 3D các cơ quan"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{isVi ? 'Nhãn 3D' : 'Labels'}</span>
            </button>

            <button
              onClick={toggleXrayMode}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition cursor-pointer ${
                xrayMode
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400 font-medium'
                  : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }`}
              title="Chế độ xuyên thấu X-Quang nhìn rõ ống tụy và đường mật trong nhu mô"
            >
              {xrayMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isVi ? 'X-Quang' : 'X-Ray'}</span>
            </button>

            {selectedOrganId && (
              <button
                onClick={toggleIsolatedView}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition cursor-pointer ${
                  isolatedView
                    ? 'bg-amber-600 text-white border-amber-500 font-medium shadow-sm'
                    : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}
                title="Cô lập quan sát cơ quan đã chọn"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isVi ? 'Cô lập' : 'Isolate'}</span>
              </button>
            )}
          </div>

          {/* Right info indicator */}
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
            <span className="hidden sm:inline">Chuẩn giải phẫu Z-Anatomy CC BY-SA 4.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300 font-medium">1:1 Metric</span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* RIGHT COLUMN: MEDICAL DOSSIER & ANATOMICAL INFO CARD */}
      {/* ==================================================================== */}
      {selectedOrgan && (
        <aside className="w-80 sm:w-96 flex-shrink-0 h-full overflow-hidden z-20">
          <DigestiveInfoCard
            organ={selectedOrgan}
            onClose={() => selectOrgan(null)}
          />
        </aside>
      )}
    </div>
  );
};
