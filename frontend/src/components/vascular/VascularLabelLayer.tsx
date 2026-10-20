import React from 'react';
import { X, GitFork } from 'lucide-react';
import { PlacedLabel } from '../../utils/ViewerLayoutManager';
import { getVascularStructureById } from '../../data/vascularSystemData';
import { getVascularSegmentHierarchy } from '../../utils/VascularSegmentManager';

export interface VascularLabelLayerProps {
  labels: PlacedLabel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDismiss?: () => void;
}

export const VascularLabelLayer: React.FC<VascularLabelLayerProps> = ({
  labels,
  selectedId,
  onSelect,
  onDismiss
}) => {
  if (!labels || labels.length === 0) return null;

  return (
    <div
      data-ui="vascular-labels-layer"
      style={{ zIndex: 25 }}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      {labels.map((item) => {
        if (!item.isVisible) return null;

        const isSelected = item.isSelected || item.id === selectedId;
        const vesselData = getVascularStructureById(item.id);
        const hierarchy = getVascularSegmentHierarchy(item.id);

        return (
          <div
            key={item.id}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item.id);
            }}
            style={{
              position: 'absolute',
              left: `${item.placedX}px`,
              top: `${item.placedY}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 120ms ease-out, top 120ms ease-out, opacity 150ms ease-out',
              zIndex: isSelected ? 30 : 15
            }}
            className={`pointer-events-auto cursor-pointer rounded-lg border backdrop-blur-md shadow-lg flex flex-col transition-colors select-none group touch-manipulation relative before:absolute before:-inset-2 before:content-[''] ${
              isSelected
                ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 p-2 text-xs shadow-amber-500/40 min-w-[200px] max-w-[300px]'
                : 'bg-slate-950/85 text-slate-200 font-medium border-slate-700/80 hover:border-slate-500 hover:text-white px-2.5 py-1 text-xs'
            }`}
            title={isSelected ? `${item.nameVi} (Đang chọn)` : `Nhấp để chọn và định vị góc nhìn vào ${item.nameVi}`}
          >
            {/* Header row */}
            <div className="flex items-center gap-1.5 w-full">
              {/* Status dot indicator */}
              <span
                className={`rounded-full flex-shrink-0 ${
                  isSelected
                    ? 'w-2 h-2 bg-slate-950 animate-pulse'
                    : 'w-1.5 h-1.5 bg-amber-400'
                }`}
              />

              {/* Vessel Name */}
              <span className={`truncate flex-1 tracking-wide ${isSelected ? 'font-bold' : 'font-medium'}`}>
                {item.nameVi}
              </span>

              {/* Subtitle / Latin tag */}
              {item.subtitle && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-normal flex-shrink-0 ${
                    isSelected
                      ? 'bg-slate-950/20 text-slate-950 font-semibold'
                      : 'bg-black/40 text-slate-400'
                  }`}
                >
                  {item.subtitle}
                </span>
              )}

              {/* Close / Dismiss button when selected */}
              {isSelected && onDismiss && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss();
                  }}
                  className="ml-1 p-0.5 rounded hover:bg-slate-950/20 active:bg-slate-950/30 text-slate-950 transition-colors cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                  title="Ẩn nhãn này"
                  aria-label="Ẩn nhãn"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* When selected, show segment & origin description */}
            {isSelected && (
              <div className="mt-1 pt-1 border-t border-slate-950/20 text-[10.5px] leading-snug text-slate-900 font-normal space-y-0.5">
                {hierarchy && (
                  <div className="flex items-center gap-1 font-semibold text-slate-950 text-[10px] truncate">
                    <GitFork className="w-3 h-3 flex-shrink-0 text-slate-950" />
                    <span className="truncate">{hierarchy.currentSegmentName}</span>
                  </div>
                )}
                {vesselData && (
                  <div className="line-clamp-2 text-slate-900/90">
                    <span className="font-semibold text-slate-950">Nguyên ủy: </span>
                    {vesselData.originVi}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
