import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const AnatomicalPins: React.FC = () => {
  const showLabels = useAnatomyStore((s) => s.showLabels);
  const organs = useAnatomyStore((s) => s.organs);
  const selectedOrganId = useAnatomyStore((s) => s.selectedOrganId);
  const isolatedOrganId = useAnatomyStore((s) => s.isolatedOrganId);
  const selectOrgan = useAnatomyStore((s) => s.selectOrgan);
  const systemVisibility = useAnatomyStore((s) => s.systemVisibility);
  const layerDepth = useAnatomyStore((s) => s.layerDepth);

  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);

  if (!showLabels) return null;

  // Filter organs to show pins for
  const visibleOrgans = organs.filter((organ) => {
    if (isolatedOrganId) return organ.id === isolatedOrganId;
    if (systemVisibility[organ.systemId] === false) return false;
    if (organ.layerDepth > layerDepth + 0.15) return false;
    return true;
  });

  return (
    <group>
      {visibleOrgans.map((organ) => {
        const isSelected = organ.id === selectedOrganId;
        const isHovered = hoveredPinId === organ.id;
        const showBadge = isSelected || isHovered;

        const pinPos: [number, number, number] = [
          organ.positionX,
          organ.positionY + 0.12,
          organ.positionZ + 0.12
        ];

        return (
          <group key={`pin-${organ.id}`} position={pinPos}>
            <Html distanceFactor={8} center zIndexRange={[100, 0]}>
              <div
                className="relative flex items-center justify-center cursor-pointer select-none group"
                onMouseEnter={() => setHoveredPinId(organ.id)}
                onMouseLeave={() => setHoveredPinId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOrgan(organ.id);
                }}
              >
                {/* Minimalist Glowing Medical Pinpoint Dot */}
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute w-6 h-6 rounded-full opacity-75 animate-ping"
                    style={{ backgroundColor: organ.color || '#06b6d4' }}
                  />
                  <div
                    className={`relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-transform duration-200 ${
                      showBadge ? 'scale-125 ring-2 ring-cyan-400' : 'hover:scale-125'
                    }`}
                    style={{ backgroundColor: organ.color || '#06b6d4' }}
                  />
                </div>

                {/* Elegant Expanded Tooltip Badge on Hover / Selected */}
                {showBadge && (
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/95 border border-cyan-400/80 px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md whitespace-nowrap animate-fade-in z-50 pointer-events-none flex flex-col text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{organ.name}</span>
                      <span className="text-[10px] font-normal text-slate-400">({organ.nameEn})</span>
                    </div>
                    <div className="text-[10px] font-serif italic text-cyan-300">
                      {organ.nameLatin}
                    </div>
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
