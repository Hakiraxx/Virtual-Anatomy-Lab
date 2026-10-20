import React from 'react';
import { X } from 'lucide-react';
import { PlacedLabel } from '../../utils/ViewerLayoutManager';

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
        const isCritical = item.isCritical || item.priority === 2;

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
              zIndex: isSelected ? 30 : isCritical ? 20 : 10
            }}
            className={`pointer-events-auto cursor-pointer rounded-lg border backdrop-blur-md shadow-lg flex items-center gap-2 transition-colors duration-150 select-none group touch-manipulation relative before:absolute before:-inset-2 before:content-[''] ${
              isSelected
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400/50 px-3 py-1.5 text-xs shadow-amber-500/40'
                : isCritical
                ? 'bg-slate-900/95 text-amber-300 font-semibold border-amber-500/70 hover:border-amber-400 hover:bg-slate-900 px-2.5 py-1 text-xs shadow-black/70'
                : 'bg-slate-950/85 text-slate-200 font-medium border-slate-700/80 hover:border-slate-500 hover:text-white px-2 py-0.5 text-[11px]'
            }`}
            title={`Nhấp để chọn và định vị góc nhìn vào ${item.nameVi}`}
          >
            {/* Status dot indicator */}
            {isSelected ? (
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950 flex-shrink-0 animate-pulse" />
            ) : isCritical ? (
              <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
            )}

            {/* Vessel Name */}
            <span className="truncate max-w-[150px] sm:max-w-[200px] tracking-wide font-medium">
              {item.nameVi}
            </span>

            {/* Subtitle / Latin tag */}
            {item.subtitle && (
              <span
                className={`text-[9px] font-mono px-1 py-0.5 rounded font-normal ${
                  isSelected
                    ? 'bg-slate-950/20 text-slate-950 font-bold'
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
                className="ml-0.5 p-0.5 rounded hover:bg-slate-950/20 active:bg-slate-950/30 text-slate-950 transition-colors cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                title="Ẩn nhãn này"
                aria-label="Ẩn nhãn"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
