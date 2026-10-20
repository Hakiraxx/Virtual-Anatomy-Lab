import React from 'react';
import { PlacedLabel } from '../../utils/ViewerLayoutManager';

export interface DigestiveLabelLayerProps {
  labels: PlacedLabel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const DigestiveLabelLayer: React.FC<DigestiveLabelLayerProps> = ({
  labels,
  selectedId,
  onSelect
}) => {
  if (!labels || labels.length === 0) return null;

  return (
    <div
      data-ui="digestive-labels-layer"
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
            className={`pointer-events-auto cursor-pointer rounded-xl border backdrop-blur-md shadow-lg flex items-center gap-2 transition-all duration-150 select-none group touch-manipulation relative before:absolute before:-inset-2 before:content-[''] ${
              isSelected
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400/50 px-3.5 py-1.5 text-xs shadow-amber-500/40 scale-105'
                : isCritical
                ? 'bg-slate-900/95 text-amber-300 font-semibold border-amber-500/70 hover:border-amber-400 hover:bg-slate-900 px-3 py-1.5 text-xs hover:scale-105 shadow-black/70'
                : 'bg-slate-950/85 text-slate-200 font-medium border-slate-700/80 hover:border-slate-500 hover:text-white px-2.5 py-1 text-[11px] hover:scale-105'
            }`}
            title={`Nhấp để chọn và định vị góc nhìn vào ${item.nameVi}`}
          >
            {/* Status dot indicator */}
            {isSelected ? (
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950 flex-shrink-0 animate-pulse" />
            ) : isCritical ? (
              <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
            )}

            {/* Organ Name */}
            <span className="truncate max-w-[140px] sm:max-w-[180px] tracking-wide">
              {item.nameVi}
            </span>

            {/* Subtitle / Latin tag */}
            {item.subtitle && (
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-normal ${
                  isSelected
                    ? 'bg-slate-950/20 text-slate-950 font-bold'
                    : 'bg-black/40 text-slate-400'
                }`}
              >
                {item.subtitle}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
