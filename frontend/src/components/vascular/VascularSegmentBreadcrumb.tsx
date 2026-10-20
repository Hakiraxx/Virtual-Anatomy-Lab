import React from 'react';
import { GitFork, ChevronRight, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { getVascularSegmentHierarchy, VascularSegmentHierarchy } from '../../utils/VascularSegmentManager';
import { useVascularStore } from '../../stores/useVascularStore';

interface VascularSegmentBreadcrumbProps {
  vesselId: string;
  isCompact?: boolean;
}

export const VascularSegmentBreadcrumb: React.FC<VascularSegmentBreadcrumbProps> = ({
  vesselId,
  isCompact = false
}) => {
  const selectVessel = useVascularStore((s) => s.selectVessel);
  const hierarchy = getVascularSegmentHierarchy(vesselId);

  if (!hierarchy) return null;

  return (
    <div
      data-ui="vascular-segment-breadcrumb"
      className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 space-y-2.5 transition-colors"
    >
      {/* 1. Header: Axis Title & Hierarchy Level Badge */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 min-w-0">
          <GitFork className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] font-bold text-amber-300 truncate">
            {hierarchy.axisNameVi}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
            {hierarchy.levelBadge}
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
            Đoạn {hierarchy.segmentOrder}/{hierarchy.totalSegments}
          </span>
        </div>
      </div>

      {/* 2. Vascular Pathway Flow Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-300 overflow-x-auto scrollbar-none py-0.5 flex-nowrap">
        {hierarchy.breadcrumb.map((step, idx) => {
          const isLast = idx === hierarchy.breadcrumb.length - 1;
          return (
            <React.Fragment key={idx}>
              <span
                className={`whitespace-nowrap px-1.5 py-0.5 rounded text-[10.5px] ${
                  isLast
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {step}
              </span>
              {!isLast && (
                <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 3. Segment Chain Progression Bar (Clickable Nodes to Glide Between Segments) */}
      <div className="space-y-1 pt-1 border-t border-slate-800/80">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Chuỗi phân đoạn liên tiếp trong trục:</span>
          <span className="text-amber-400 font-semibold">Click để chuyển đoạn</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 flex-nowrap">
          {hierarchy.segmentChain.map((node, idx) => {
            const isCurrent = node.vesselId === vesselId;
            return (
              <React.Fragment key={node.vesselId}>
                <button
                  type="button"
                  onClick={() => selectVessel(node.vesselId)}
                  className={`px-2 py-1 rounded-md text-[10.5px] font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm ring-1 ring-amber-300'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                  }`}
                  title={`Chuyển góc nhìn & tiêu cự 3D tới ${node.fullNameVi}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent ? 'bg-slate-950 animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  <span>{node.shortLabel}</span>
                </button>
                {idx < hierarchy.segmentChain.length - 1 && (
                  <ArrowRight className="w-2.5 h-2.5 text-slate-600 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 4. Anatomical Boundary Landmarks */}
      <div className="pt-1.5 border-t border-slate-800/80 text-[10.5px] text-slate-400 flex items-start gap-1.5 leading-relaxed">
        <Compass className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-sky-300">Giới hạn mốc giải phẫu: </span>
          <span>{hierarchy.anatomicalLandmarks}</span>
        </div>
      </div>
    </div>
  );
};
