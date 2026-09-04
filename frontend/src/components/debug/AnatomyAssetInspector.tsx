import React from 'react';
import { ShieldCheck, Layers, Info, CheckCircle2, AlertCircle, FileCode, Box } from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { CRANIAL_NERVE_VALIDATION_REGISTRY, CranialNerveAssetValidator } from '../../utils/CranialNerveAssetValidator';

export const AnatomyAssetInspector: React.FC<{ isOpen?: boolean; onClose: () => void }> = ({
  isOpen = true,
  onClose
}) => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);

  if (!isOpen) return null;

  const currentRecord = selectedAnatomyId ? CRANIAL_NERVE_VALIDATION_REGISTRY[selectedAnatomyId] : null;
  const summary = CranialNerveAssetValidator.validateAll();

  return (
    <div className="fixed inset-y-0 right-0 w-96 max-w-full bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/80 shadow-2xl z-50 flex flex-col font-sans text-slate-200 animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-bold tracking-wide uppercase text-amber-400">
            Anatomy Asset Inspector
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-xs font-mono"
        >
          ESC / ✕
        </button>
      </div>

      {/* Validation Status Banner (Section 26 UI Rule) */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">Trạng thái tài nguyên 3D:</span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-mono font-semibold text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {summary.verifiedCount} READY
          </span>
          {summary.missingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/50 font-mono font-semibold text-[11px] flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-rose-400" />
              {summary.missingCount} MISSING
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-700">
        {currentRecord ? (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-800/80 border border-amber-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-amber-300">{currentRecord.anatomyId}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-900/60 text-emerald-200 border border-emerald-500/40">
                  {currentRecord.status}
                </span>
              </div>
              <div className="font-semibold text-white text-sm">{currentRecord.nameVi}</div>
              <div className="text-slate-400 text-[11px]">{currentRecord.nameEn}</div>
            </div>

            {/* Spec Sheet Table */}
            <div className="space-y-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Asset Type:</span>
                <span className="col-span-2 font-mono text-cyan-300">{currentRecord.assetType}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Mesh Node:</span>
                <span className="col-span-2 font-mono text-amber-200">{currentRecord.meshNodeName}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">File Path:</span>
                <span className="col-span-2 font-mono text-[10px] text-slate-300 break-all">{currentRecord.assetPath}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Source:</span>
                <span className="col-span-2 text-slate-200">{currentRecord.source}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">License:</span>
                <span className="col-span-2 text-emerald-400 font-medium">{currentRecord.license}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Coord System:</span>
                <span className="col-span-2 font-mono text-[10px] text-slate-300">{currentRecord.coordinateSystem}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Side / Laterality:</span>
                <span className="col-span-2 capitalize text-sky-300">{currentRecord.side}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Foramen:</span>
                <span className="col-span-2 font-mono text-rose-300">{currentRecord.foramenRelation}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1">
                <span className="text-slate-400">Direction:</span>
                <span className="col-span-2 font-mono text-amber-300">{currentRecord.pathDirection}</span>
              </div>
            </div>

            {currentRecord.statusNotes && (
              <div className="p-2.5 rounded bg-blue-950/40 border border-blue-800/50 text-[11px] text-blue-200 flex gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{currentRecord.statusNotes}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            <Box className="w-8 h-8 mx-auto mb-2 text-slate-600 animate-pulse" />
            <p>Chọn một dây thần kinh sọ hoặc cấu trúc để kiểm tra thông số 3D Asset.</p>
          </div>
        )}

        {/* 12 Cranial Nerves Quick Registry Selector */}
        <div className="pt-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            12 Cranial Nerves Verified List
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['cn_1', 'cn_2', 'cn_3', 'cn_4', 'cn_5', 'cn_6', 'cn_7', 'cn_8', 'cn_9', 'cn_10', 'cn_11', 'cn_12'].map((id) => {
              const rec = CRANIAL_NERVE_VALIDATION_REGISTRY[id];
              const isSel = selectedAnatomyId === id;
              return (
                <button
                  key={id}
                  onClick={() => selectAnatomy(id)}
                  className={`p-1.5 rounded border text-center font-mono text-[11px] font-semibold transition ${
                    isSel
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:border-amber-400'
                  }`}
                >
                  {id.replace('_', ' ').toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
