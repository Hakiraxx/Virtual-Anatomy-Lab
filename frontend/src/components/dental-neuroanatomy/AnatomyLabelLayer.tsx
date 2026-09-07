import React from 'react';
import { PlacedLabel } from '../../utils/ViewerLayoutManager';

export interface AnatomyLabelLayerProps {
  labels: PlacedLabel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const AnatomyLabelLayer: React.FC<AnatomyLabelLayerProps> = ({
  labels,
  selectedId,
  onSelect
}) => {
  if (!labels || labels.length === 0) return null;

  return (
    <div
      data-ui="anatomy-labels-layer"
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden select-none"
    >
      {labels.map((item) => {
        if (!item.isVisible) return null;

        const isSelected = item.isSelected || item.id === selectedId || (selectedId?.startsWith('tooth.') && item.id.includes(selectedId.replace('tooth.', '')));
        const isCritical = item.isCritical || item.priority === 2;

        return (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item.id);
            }}
            style={{
              position: 'absolute',
              left: `${item.placedX}px`,
              top: `${item.placedY}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 120ms ease-out, top 120ms ease-out, opacity 150ms ease-out'
            }}
            className={`pointer-events-auto cursor-pointer rounded-xl border backdrop-blur-md shadow-2xl flex items-center gap-1.5 transition-all duration-150 group hover:scale-105 active:scale-95 ${
              isSelected
                ? 'bg-amber-500/95 text-slate-950 font-bold border-amber-300 ring-2 ring-amber-400/40 px-2.5 py-1 text-[11px] z-30 shadow-amber-500/30'
                : isCritical
                ? 'bg-slate-900/90 text-amber-300 font-semibold border-amber-500/60 px-2 py-0.5 text-[10px] z-20 hover:border-amber-400 shadow-black/60'
                : 'bg-slate-950/80 text-slate-300 font-medium border-slate-700/60 px-1.5 py-0.5 text-[9px] z-10 hover:text-white hover:border-slate-500'
            }`}
            title={`Nhấp để chọn và căn góc nhìn vào ${item.nameVi}`}
          >
            {/* Status dot or icon */}
            {isSelected ? (
              <span className="w-2 h-2 rounded-full bg-slate-950 flex-shrink-0 animate-pulse" />
            ) : isCritical ? (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
            ) : null}

            {/* Anatomical Name */}
            <span className="truncate max-w-[150px] sm:max-w-[200px]">
              {item.nameVi}
            </span>

            {/* Subtitle or Tag */}
            {item.subtitle && (
              <span
                className={`text-[8px] font-mono px-1 py-0.2 rounded ${
                  isSelected
                    ? 'bg-slate-950/20 text-slate-900 font-bold'
                    : 'bg-black/30 text-slate-400'
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
