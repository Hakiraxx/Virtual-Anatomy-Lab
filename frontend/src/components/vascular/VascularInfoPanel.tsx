import React from 'react';
import {
  Volume2,
  Focus,
  Eye,
  EyeOff,
  Activity,
  GitBranch,
  MapPin,
  Layers,
  AlertCircle,
  Copy,
  Check,
  Stethoscope
} from 'lucide-react';
import { useVascularStore, VascularTab } from '../../stores/useVascularStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { VASCULAR_REGIONS } from '../../data/vascularSystemData';
import { VascularSegmentBreadcrumb } from './VascularSegmentBreadcrumb';

export const VascularInfoPanel: React.FC = () => {
  const {
    activeTab,
    isolatedView,
    setActiveTab,
    toggleIsolatedView,
    triggerCameraFocus,
    getSelectedVesselData
  } = useVascularStore();

  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const [copied, setCopied] = React.useState(false);

  const vessel = getSelectedVesselData();

  if (!vessel) {
    return (
      <aside
        data-ui="vascular-info-panel-empty"
        className={`h-full flex items-center justify-center p-6 border-l text-center text-xs ${
          isDark ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-[#faf6f0] border-[#e2d6c6] text-slate-500'
        }`}
      >
        Chọn một mạch máu từ mô hình 3D hoặc cây phân cấp để xem hồ sơ giải phẫu lâm sàng.
      </aside>
    );
  }

  const regionMeta = VASCULAR_REGIONS.find((r) => r.id === vessel.region);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'la'; // Latin for anatomical terms
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${vessel.nameVi} (${vessel.nameLa}) - ${vessel.nameEn}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tabs: Array<{ id: VascularTab; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Tổng quan', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'branches', label: 'Phân nhánh', icon: <GitBranch className="w-3.5 h-3.5" /> },
    { id: 'territory', label: 'Vùng cấp máu', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'histology', label: 'Mô học', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'clinical', label: 'Lâm sàng', icon: <AlertCircle className="w-3.5 h-3.5" /> }
  ];

  return (
    <aside
      data-ui="vascular-info-panel"
      className={`h-full flex flex-col border-l select-none overflow-hidden transition-colors ${
        isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-[#faf6f0] border-[#e2d6c6] text-slate-800'
      }`}
    >
      {/* Header Profile Dossier */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40">
        {/* Badges row */}
        <div className="flex items-center gap-1.5 flex-wrap mb-2">
          {/* Type Badge */}
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
              vessel.type === 'artery'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : vessel.type === 'vein'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}
          >
            {vessel.type === 'artery'
              ? 'Động Mạch'
              : vessel.type === 'vein'
              ? 'Tĩnh Mạch'
              : 'Cấu Trúc Tim'}
          </span>

          {/* Region Badge */}
          {regionMeta && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80"
              style={{ borderColor: regionMeta.color + '40' }}
            >
              {regionMeta.nameVi}
            </span>
          )}

          {/* Mesh Count */}
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
            {vessel.meshNodeNames.length} mesh 3D
          </span>
        </div>

        {/* Vietnamese Name */}
        <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight leading-snug">
          {vessel.nameVi}
        </h1>

        {/* English Name */}
        <div className="text-xs text-slate-400 font-medium mt-0.5">
          {vessel.nameEn}
        </div>

        {/* Latin Nomenclature (TA2) Pill */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/60">
          <span className="text-xs font-mono italic text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 truncate">
            {vessel.nameLa}
          </span>
          <button
            onClick={() => handleSpeak(vessel.nameLa)}
            className="p-1 rounded text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
            title="Phát âm tiếng Latin (TA2)"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Sao chép tên danh pháp"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={triggerCameraFocus}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition-colors cursor-pointer shadow-sm"
          >
            <Focus className="w-3.5 h-3.5" />
            <span>Tiêu Cự 3D</span>
          </button>
          <button
            onClick={toggleIsolatedView}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
              isolatedView
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'border-slate-800 hover:bg-slate-800 text-slate-300'
            }`}
            title="Bật/Tắt cô lập mạch máu này"
          >
            {isolatedView ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{isolatedView ? 'Hủy Cô Lập' : 'Cô Lập'}</span>
          </button>
        </div>

        {/* Anatomical Segment & Pathway Progression Hierarchy */}
        <div className="mt-3">
          <VascularSegmentBreadcrumb vesselId={vessel.id} />
        </div>
      </div>

      {/* Tabs Navigation Strip */}
      <div
        role="tablist"
        className="flex items-center border-b border-slate-800/80 bg-slate-900/60 overflow-x-auto scrollbar-none flex-nowrap"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors flex-shrink-0 cursor-pointer border-b-2 ${
                isActive
                  ? 'border-amber-500 text-amber-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-800">
        {activeTab === 'overview' && (
          <div className="space-y-3.5">
            {/* Dimensions */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                Kích Thước & Đường Kính
              </div>
              <div className="text-slate-200 font-medium leading-relaxed">
                {vessel.dimensions}
              </div>
            </div>

            {/* Origin */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                Nguyên Ủy & Đường Đi
              </div>
              <div className="text-slate-200 leading-relaxed mb-2">
                {vessel.originVi}
              </div>
              <div className="text-slate-400 text-[11px] italic leading-relaxed pt-2 border-t border-slate-800/60">
                {vessel.originEn}
              </div>
            </div>

            {/* Pulse Point if applicable */}
            {vessel.pulsePalpationVi && (
              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/50">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Điểm Bắt Mạch Lâm Sàng</span>
                </div>
                <div className="text-emerald-200 leading-relaxed font-medium">
                  {vessel.pulsePalpationVi}
                </div>
              </div>
            )}

            {/* 3D Metric Coordinates */}
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-[11px]">
              <div className="text-slate-400 mb-1 font-mono">Tọa độ 3D Không gian Metric (Z-Anatomy):</div>
              <div className="font-mono text-amber-300">
                X: {vessel.canonicalCenter[0]}m | Y: {vessel.canonicalCenter[1]}m | Z: {vessel.canonicalCenter[2]}m
              </div>
            </div>
          </div>
        )}

        {activeTab === 'branches' && (
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Các Nhánh Bên & Phân Nhánh Chính ({vessel.branchesVi.length})
            </div>
            <div className="space-y-2">
              {vessel.branchesVi.map((brVi, idx) => {
                const brEn = vessel.branchesEn[idx] || '';
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="font-semibold text-slate-100">{brVi}</div>
                    </div>
                    {brEn && (
                      <div className="text-slate-400 text-[11px] font-mono mt-1 pl-7">
                        {brEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'territory' && (
          <div className="space-y-3.5">
            {/* Territory */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                Vùng Cấp Máu & Dẫn Lưu
              </div>
              <div className="text-slate-200 leading-relaxed mb-2">
                {vessel.territoryVi}
              </div>
              <div className="text-slate-400 text-[11px] italic leading-relaxed pt-2 border-t border-slate-800/60">
                {vessel.territoryEn}
              </div>
            </div>

            {/* Anastomoses */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                Vòng Nối & Tuần Hoàn Bàng Hệ
              </div>
              <div className="text-slate-200 leading-relaxed mb-2">
                {vessel.anastomosesVi}
              </div>
              <div className="text-slate-400 text-[11px] italic leading-relaxed pt-2 border-t border-slate-800/60">
                {vessel.anastomosesEn}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'histology' && (
          <div className="space-y-3.5">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-1">
                Cấu Trúc Mô Học & Thành Mạch
              </div>
              <div className="text-slate-200 leading-relaxed mb-2">
                {vessel.histologyVi}
              </div>
              <div className="text-slate-400 text-[11px] italic leading-relaxed pt-2 border-t border-slate-800/60">
                {vessel.histologyEn}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Đặc tính sinh lý:</strong> Áo trong (Tunica intima) với lớp tế bào nội mô tiết NO và Prostacyclin điều hòa trương lực; Áo giữa (Tunica media) giàu sợi chun hoặc tế bào cơ trơn; Áo ngoài (Tunica adventitia) chứa vasa vasorum và sợi thần kinh tự chủ.
            </div>
          </div>
        )}

        {activeTab === 'clinical' && (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-800/60">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Ý Nghĩa Y Khoa & Điểm Nhấn Lâm Sàng</span>
              </div>
              <div className="text-slate-100 font-medium leading-relaxed mb-2">
                {vessel.clinicalNotesVi}
              </div>
              <div className="text-slate-400 text-[11px] italic leading-relaxed pt-2 border-t border-rose-900/40">
                {vessel.clinicalNotesEn}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
