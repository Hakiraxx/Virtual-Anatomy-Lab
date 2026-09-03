import React, { useState } from 'react';
import {
  X,
  EyeOff,
  RotateCcw,
  Bookmark as BookmarkIcon,
  HelpCircle,
  FileText,
  ShieldCheck,
  MapPin,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const OrganDetailPanel: React.FC = () => {
  const selectedOrganId = useAnatomyStore((s) => s.selectedOrganId);
  const selectOrgan = useAnatomyStore((s) => s.selectOrgan);
  const organs = useAnatomyStore((s) => s.organs);
  const isolatedOrganId = useAnatomyStore((s) => s.isolatedOrganId);
  const isolateOrgan = useAnatomyStore((s) => s.isolateOrgan);
  const bookmarkedOrganIds = useAnatomyStore((s) => s.bookmarkedOrganIds);
  const toggleBookmark = useAnatomyStore((s) => s.toggleBookmark);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);

  const [activeTab, setActiveTab] = useState<'info' | 'structures' | 'clinical'>('info');

  if (!selectedOrganId) return null;

  const organ = organs.find((o) => o.id === selectedOrganId);
  if (!organ) return null;

  const isIsolated = isolatedOrganId === organ.id;
  const isBookmarked = bookmarkedOrganIds.has(organ.id);

  return (
    <aside className="absolute top-16 right-3 bottom-16 w-84 sm:w-96 bg-slate-950/90 border border-slate-800/80 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col z-20 select-none overflow-hidden animate-slide-in">
      {/* Header with Close and Bookmark */}
      <div className="p-4 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-transparent">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${organ.system?.color || '#06b6d4'}20`,
                  borderColor: `${organ.system?.color || '#06b6d4'}50`,
                  color: organ.system?.color || '#06b6d4'
                }}
              >
                {organ.system?.name || 'Giải phẫu học'}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{organ.reviewStatus}</span>
              </div>
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight leading-tight">
              {organ.name}
            </h1>
            <div className="text-xs text-slate-300 font-medium">
              {organ.nameEn}
            </div>
            <div className="text-xs font-serif italic text-cyan-300">
              {organ.nameLatin}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleBookmark(organ.id)}
              className={`p-2 rounded-xl transition ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-500/20 border border-amber-500/40'
                  : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu cơ quan'}
            >
              <BookmarkIcon className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => selectOrgan(null)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              title="Đóng bảng thông tin"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/60">
          <button
            onClick={() => isolateOrgan(organ.id)}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold transition ${
              isIsolated
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-900 border border-slate-700/80 text-slate-200 hover:border-amber-400/60 hover:text-amber-300'
            }`}
          >
            {isIsolated ? <RotateCcw className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{isIsolated ? 'Hoàn tác' : 'Cách ly'}</span>
          </button>

          <button
            onClick={() => setActiveModal('notes')}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700/80 text-slate-200 hover:border-cyan-400/60 hover:text-cyan-300 transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ghi chú</span>
          </button>

          <button
            onClick={() => setActiveModal('quiz')}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700/80 text-slate-200 hover:border-emerald-400/60 hover:text-emerald-300 transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kiểm tra</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800/80 px-4 text-xs font-medium bg-slate-900/30">
        <button
          onClick={() => setActiveTab('info')}
          className={`py-2.5 px-3 border-b-2 transition ${
            activeTab === 'info'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Tổng quan
        </button>
        <button
          onClick={() => setActiveTab('structures')}
          className={`py-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'structures'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Cấu trúc con</span>
          {organ.structures && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {organ.structures.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('clinical')}
          className={`py-2.5 px-3 border-b-2 transition ${
            activeTab === 'clinical'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Lâm sàng
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed text-slate-300">
        {activeTab === 'info' && (
          <>
            {/* Description */}
            <div>
              <p className="text-slate-200">{organ.description}</p>
            </div>

            {/* Location */}
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Vị trí giải phẫu (Location)</span>
              </div>
              <p className="text-slate-300">{organ.location}</p>
            </div>

            {/* Function */}
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Chức năng sinh lý (Function)</span>
              </div>
              <p className="text-slate-300">{organ.function}</p>
            </div>
          </>
        )}

        {activeTab === 'structures' && (
          <div className="space-y-2">
            {organ.structures && organ.structures.length > 0 ? (
              organ.structures.map((st) => (
                <div
                  key={st.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 hover:border-cyan-500/40 transition"
                >
                  <div className="font-semibold text-slate-100 flex items-center justify-between">
                    <span>{st.name}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{st.nameEn}</span>
                  </div>
                  {st.nameLatin && (
                    <div className="text-[10px] font-serif italic text-cyan-400 mt-0.5">
                      {st.nameLatin}
                    </div>
                  )}
                  <p className="text-slate-400 mt-1">{st.description}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500">
                Chưa có cấu trúc chi tiết cho cơ quan này.
              </div>
            )}
          </div>
        )}

        {activeTab === 'clinical' && (
          <div className="space-y-3">
            <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3 text-rose-200">
              <div className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-400" />
                <span>Ý nghĩa lâm sàng & Bệnh học</span>
              </div>
              <p className="leading-relaxed">
                {organ.clinicalNotes || 'Chưa có dữ liệu ghi chú lâm sàng.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Accreditation */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-[10px] text-slate-500 flex items-center justify-between">
        <div className="truncate">
          <span>Nguồn: </span>
          <span className="text-slate-400 font-medium">{organ.source}</span>
        </div>
        <span className="text-emerald-400 font-semibold ml-2 whitespace-nowrap">
          ✓ Đã thẩm định
        </span>
      </div>
    </aside>
  );
};
