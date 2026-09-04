import React from 'react';
import {
  Brain,
  Skull,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Compass,
  FileText,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Syringe,
  Info
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  MUSCLES_OF_MASTICATION,
  CLINICAL_ANESTHESIA_TECHNIQUES,
  ANATOMICAL_RELATIONS
} from '../../data/dentalNeuroData';

export const DentalNeuroInfoPanel: React.FC = () => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);

  const activeNerveTraceId = useDentalNeuroStore((s) => s.activeNerveTraceId);
  const tracePlaybackState = useDentalNeuroStore((s) => s.tracePlaybackState);
  const startTrace = useDentalNeuroStore((s) => s.startTrace);
  const pauseTrace = useDentalNeuroStore((s) => s.pauseTrace);
  const resumeTrace = useDentalNeuroStore((s) => s.resumeTrace);
  const resetTrace = useDentalNeuroStore((s) => s.resetTrace);

  // 1. Identify selected structure type
  const nerve = selectedAnatomyId ? DENTAL_NERVE_STRUCTURES[selectedAnatomyId] : null;
  const foramen = selectedAnatomyId ? CRANIAL_FORAMINA[selectedAnatomyId] : null;
  const tooth = selectedAnatomyId && selectedAnatomyId.startsWith('tooth_')
    ? DENTAL_INNERVATION_DATABASE.find((t) => `tooth_${t.fdi}` === selectedAnatomyId)
    : null;
  const muscle = selectedAnatomyId ? MUSCLES_OF_MASTICATION.find((m) => m.id === selectedAnatomyId) : null;

  // 2. Relational graph for selected item
  const outgoingRelations = selectedAnatomyId
    ? ANATOMICAL_RELATIONS.filter((r) => r.sourceId === selectedAnatomyId)
    : [];
  const incomingRelations = selectedAnatomyId
    ? ANATOMICAL_RELATIONS.filter((r) => r.targetId === selectedAnatomyId)
    : [];

  // 3. Clinical anesthesia match
  const relatedAnesthesia = selectedAnatomyId
    ? CLINICAL_ANESTHESIA_TECHNIQUES.find((a) => a.targetNerveIds.includes(selectedAnatomyId))
    : null;

  // Proximal / Distal navigation
  const handleGoProximal = () => {
    if (nerve && nerve.parentNerveId) {
      selectAnatomy(nerve.parentNerveId);
    }
  };

  const handleGoDistal = () => {
    if (nerve) {
      const child = Object.values(DENTAL_NERVE_STRUCTURES).find((n) => n.parentNerveId === nerve.id);
      if (child) {
        selectAnatomy(child.id);
      }
    }
  };

  if (!selectedAnatomyId) {
    return (
      <aside className="w-88 h-full border-l border-slate-800 bg-[#0c121e]/95 backdrop-blur flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <Brain className="w-10 h-10 text-slate-600 mb-3 animate-pulse" />
        <p className="text-sm font-semibold text-slate-300">Chưa chọn cấu trúc</p>
        <p className="text-xs text-slate-500 mt-1">
          Nhấp vào bất kỳ dây thần kinh, lỗ sọ hoặc răng trên mô hình 3D hoặc cây giải phẫu để xem hồ sơ chi tiết.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-88 h-full border-l border-slate-800 bg-[#0c121e]/95 backdrop-blur flex flex-col z-20 text-slate-200 select-none overflow-hidden">
      {/* 1. Header Banner */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/70">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {nerve ? 'DÂY THẦN KINH' : foramen ? 'LỖ NỀN SỌ' : tooth ? 'RĂNG & HUYỆT RĂNG' : 'CƠ NHAI'}
          </span>
          {nerve && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleGoProximal}
                disabled={!nerve.parentNerveId}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium border border-slate-700 bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700"
                title="Đi về phía gốc thần kinh (Parent nerve)"
              >
                ← Gốc (Proximal)
              </button>
              <button
                onClick={handleGoDistal}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                title="Đi về phía nhánh ngoại vi (Distal branch)"
              >
                Ngọn (Distal) →
              </button>
            </div>
          )}
        </div>

        <h1 className="text-base font-bold text-slate-100 mt-1.5 leading-tight">
          {nerve?.nameVi || foramen?.nameVi || tooth?.nameVi || muscle?.nameVi}
        </h1>
        <p className="text-xs font-serif italic text-amber-300/80">
          {nerve?.latinName || foramen?.latinName || tooth?.nameEn || muscle?.latinName}
        </p>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs font-sans">
        {/* NERVE TRACING CONTROLS */}
        {nerve && nerve.path3D && (
          <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-950/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-amber-300 uppercase flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Truy Vết Đường Đi 3D (Trace Course)
              </span>
              <span className="text-[9px] font-mono text-slate-400">Proximal → Distal</span>
            </div>
            <div className="flex items-center gap-1.5">
              {activeNerveTraceId === nerve.id && tracePlaybackState === 'playing' ? (
                <button
                  onClick={pauseTrace}
                  className="flex-1 py-1 px-2 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Tạm dừng</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (activeNerveTraceId === nerve.id && tracePlaybackState === 'paused') {
                      resumeTrace();
                    } else {
                      startTrace(nerve.id);
                    }
                  }}
                  className="flex-1 py-1 px-2 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Chạy mô phỏng</span>
                </button>
              )}
              <button
                onClick={resetTrace}
                className="p-1.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                title="Khôi phục trạng thái ban đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* NERVE SPECIFIC INFORMATION */}
        {nerve && (
          <div className="space-y-3">
            <div>
              <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Compass className="w-3 h-3 text-sky-400" />
                Nguyên ủy (Origin)
              </h3>
              <p className="text-slate-300/90 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800/80">
                {nerve.originVi}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-400" />
                Đường đi & Liên quan (Course)
              </h3>
              <p className="text-slate-300/90 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800/80">
                {nerve.courseVi}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                Chi phối Chức năng (Innervation)
              </h3>
              <p className="text-slate-300/90 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800/80">
                {nerve.innervationVi}
              </p>
            </div>

            {/* CLINICAL ANATOMY */}
            <div>
              <h3 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                Ý nghĩa Lâm sàng & Phẫu thuật
              </h3>
              <div className="p-2.5 rounded border border-rose-500/30 bg-rose-950/20 text-rose-200/90 leading-relaxed">
                {nerve.clinicalAnatomyVi}
              </div>
            </div>
          </div>
        )}

        {/* FORAMEN SPECIFIC INFORMATION */}
        {foramen && (
          <div className="space-y-3">
            <div>
              <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Skull className="w-3 h-3 text-sky-400" />
                Vị trí Xương (Bone Location)
              </h3>
              <p className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/80 font-medium">
                {foramen.boneVi} ({foramen.boneEn})
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-400" />
                Cấu trúc đi qua (Structures Passing Through)
              </h3>
              <ul className="space-y-1 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                {foramen.structuresPassingThroughVi.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                Ý nghĩa Lâm sàng & Ứng dụng
              </h3>
              <div className="p-2.5 rounded border border-rose-500/30 bg-rose-950/20 text-rose-200/90 leading-relaxed">
                {foramen.clinicalSignificanceVi}
              </div>
            </div>
          </div>
        )}

        {/* TOOTH SPECIFIC INFORMATION */}
        {tooth && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">SỐ RĂNG FDI</span>
                <span className="text-base font-bold text-amber-400">{tooth.fdi}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">SỐ ỐNG TỦY</span>
                <span className="text-base font-bold text-sky-400">{tooth.canalCount}</span>
              </div>
            </div>

            <div className="p-2.5 rounded border border-sky-500/30 bg-sky-950/20 space-y-2">
              <h3 className="text-[11px] font-bold text-sky-300 uppercase flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                Hệ Thần Kinh Chi Phối Răng
              </h3>
              <div className="text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-400">Tủy & Nha chu: </span>
                  <button
                    onClick={() => selectAnatomy(tooth.pulpInnervationId)}
                    className="font-bold text-amber-300 underline hover:text-amber-200"
                  >
                    {DENTAL_NERVE_STRUCTURES[tooth.pulpInnervationId]?.nameVi || tooth.pulpInnervationId}
                  </button>
                </div>
                <div>
                  <span className="text-slate-400">Lợi mặt ngoài (Buccal): </span>
                  <button
                    onClick={() => selectAnatomy(tooth.buccalGingivaInnervationId)}
                    className="font-medium text-orange-300 underline hover:text-orange-200"
                  >
                    {DENTAL_NERVE_STRUCTURES[tooth.buccalGingivaInnervationId]?.nameVi || tooth.buccalGingivaInnervationId}
                  </button>
                </div>
                <div>
                  <span className="text-slate-400">Lợi mặt trong (Lingual/Palatal): </span>
                  <button
                    onClick={() => selectAnatomy(tooth.lingualGingivaInnervationId)}
                    className="font-medium text-purple-300 underline hover:text-purple-200"
                  >
                    {DENTAL_NERVE_STRUCTURES[tooth.lingualGingivaInnervationId]?.nameVi || tooth.lingualGingivaInnervationId}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Syringe className="w-3.5 h-3.5 text-rose-400" />
                Kỹ Thuật Gây Tê Khuyến Nghị
              </h3>
              <div className="p-2.5 rounded border border-rose-500/30 bg-rose-950/20 text-rose-200/90 leading-relaxed font-medium">
                {tooth.anesthesiaTechniqueVi}
              </div>
            </div>
          </div>
        )}

        {/* MUSCLE SPECIFIC INFORMATION */}
        {muscle && (
          <div className="space-y-3">
            <div>
              <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Nguyên ủy & Bám tận
              </h3>
              <div className="space-y-1.5 bg-slate-900/60 p-2 rounded border border-slate-800/80 text-slate-300">
                <p><span className="text-slate-400">Nguyên ủy: </span>{muscle.originVi}</p>
                <p><span className="text-slate-400">Bám tận: </span>{muscle.insertionVi}</p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Động tác (Action)
              </h3>
              <p className="bg-slate-900/60 p-2 rounded border border-slate-800/80 text-slate-300 font-medium">
                {muscle.actionVi}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider mb-1">
                Thần kinh Chi phối
              </h3>
              <button
                onClick={() => selectAnatomy(muscle.innervationId)}
                className="w-full text-left p-2 rounded bg-amber-950/20 border border-amber-500/30 text-amber-300 font-bold hover:bg-amber-950/40"
              >
                Nhánh của Thần kinh Hàm dưới (CN V3) →
              </button>
            </div>
          </div>
        )}

        {/* CLINICAL ANESTHESIA GUIDE BOX */}
        {relatedAnesthesia && (
          <div className="p-2.5 rounded-lg border border-rose-600/40 bg-rose-950/30 space-y-1.5">
            <h4 className="text-[10px] font-bold text-rose-300 uppercase flex items-center gap-1">
              <Syringe className="w-3 h-3 text-rose-400" />
              Gây Tê Vùng: {relatedAnesthesia.nameVi}
            </h4>
            <p className="text-[11px] text-slate-300">
              <span className="text-slate-400 font-semibold">Mốc giải phẫu: </span>
              {relatedAnesthesia.landmarkVi}
            </p>
            <div className="text-[10px] text-rose-300/80 pt-1 border-t border-rose-800/40">
              ⚠️ Biến chứng cần tránh: {relatedAnesthesia.potentialComplicationsVi.join(', ')}.
            </div>
          </div>
        )}

        {/* RELATIONAL GRAPH */}
        {(outgoingRelations.length > 0 || incomingRelations.length > 0) && (
          <div>
            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Sơ Đồ Mối Quan Hệ Giải Phẫu
            </h3>
            <div className="space-y-1 bg-slate-900/70 p-2 rounded border border-slate-800/80">
              {outgoingRelations.map((rel, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px]">
                  <ArrowUpRight className="w-3 h-3 text-sky-400 flex-shrink-0" />
                  <span className="text-slate-400 font-mono">{rel.relationType}</span>
                  <span className="text-slate-500">→</span>
                  <button
                    onClick={() => selectAnatomy(rel.targetId)}
                    className="font-bold text-amber-300 hover:underline truncate"
                  >
                    {DENTAL_NERVE_STRUCTURES[rel.targetId]?.nameVi ||
                     CRANIAL_FORAMINA[rel.targetId]?.nameVi ||
                     rel.targetId}
                  </button>
                </div>
              ))}
              {incomingRelations.map((rel, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px]">
                  <ArrowDownLeft className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <button
                    onClick={() => selectAnatomy(rel.sourceId)}
                    className="font-bold text-emerald-300 hover:underline truncate"
                  >
                    {DENTAL_NERVE_STRUCTURES[rel.sourceId]?.nameVi ||
                     CRANIAL_FORAMINA[rel.sourceId]?.nameVi ||
                     rel.sourceId}
                  </button>
                  <span className="text-slate-500">→</span>
                  <span className="text-slate-400 font-mono">{rel.relationType}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VERIFIED REFERENCES */}
        {nerve && nerve.references && (
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-[10px] space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {nerve.references.reviewStatus}
              </span>
              <span className="font-mono">{nerve.references.terminologiaAnatomica}</span>
            </div>
            <div className="text-slate-500 flex items-center justify-between">
              <span>Kiểm duyệt: {nerve.references.reviewedBy}</span>
              <span>Netter Plate #{nerve.references.netterPlate}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
