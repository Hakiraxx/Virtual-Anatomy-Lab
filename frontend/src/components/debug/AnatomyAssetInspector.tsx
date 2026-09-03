import React, { useState } from 'react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { ANATOMICAL_PLACEMENTS } from '../../utils/AnatomyTransformNormalizer';
import { X, Layers, Crosshair, Box } from 'lucide-react';

interface AnatomyAssetInspectorProps {
  onClose: () => void;
}

export const AnatomyAssetInspector: React.FC<AnatomyAssetInspectorProps> = ({ onClose }) => {
  const selectedStructureId = useAnatomyStore((s) => s.selectedStructureId);
  const selectStructure = useAnatomyStore((s) => s.selectStructure);
  const [activeTab, setActiveTab] = useState<'selected' | 'all'>('selected');

  const selectedPlacement = selectedStructureId ? ANATOMICAL_PLACEMENTS[selectedStructureId] : null;

  return (
    <div className="fixed top-20 right-4 z-50 w-96 max-h-[80vh] overflow-hidden flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80">
        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
          <Crosshair className="w-4 h-4 text-emerald-500" />
          <span>Anatomy Asset Inspector</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50">
        <button
          onClick={() => setActiveTab('selected')}
          className={`flex-1 py-2 font-medium text-center transition-colors ${
            activeTab === 'selected'
              ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500 bg-white dark:bg-slate-900'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Selected Node
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 font-medium text-center transition-colors ${
            activeTab === 'all'
              ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500 bg-white dark:bg-slate-900'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          All Assets ({Object.keys(ANATOMICAL_PLACEMENTS).length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
        {activeTab === 'selected' ? (
          selectedPlacement && selectedStructureId ? (
            <div className="space-y-2">
              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">Anatomy ID:</span>{' '}
                <strong className="text-emerald-600 dark:text-emerald-400">{selectedStructureId}</strong>
              </div>

              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-400 mb-1">Local Position [X, Y, Z]:</div>
                <div className="text-slate-700 dark:text-slate-200">
                  X: {selectedPlacement.position[0].toFixed(3)}m<br />
                  Y: {selectedPlacement.position[1].toFixed(3)}m<br />
                  Z: {selectedPlacement.position[2].toFixed(3)}m
                </div>
              </div>

              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-400 mb-1">Target Bounding Size:</div>
                <div className="text-slate-700 dark:text-slate-200">{selectedPlacement.targetSize}m</div>
              </div>

              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-400 mb-1">Rotation Offset [Rad]:</div>
                <div className="text-slate-700 dark:text-slate-200">
                  {selectedPlacement.rotationOffset
                    ? `[${selectedPlacement.rotationOffset.map((r) => r.toFixed(2)).join(', ')}]`
                    : '[0.00, 0.00, 0.00]'}
                </div>
              </div>

              <div className="p-2 rounded bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="text-slate-400 mb-1">Anatomical Coordinates:</div>
                <div className="text-slate-600 dark:text-slate-300">
                  Transverse: {selectedPlacement.position[0] > 0 ? 'Dextral (+X)' : selectedPlacement.position[0] < 0 ? 'Sinistral (-X)' : 'Midline (0)'}<br />
                  Longitudinal: {selectedPlacement.position[1].toFixed(2)}m Superior<br />
                  Anteroposterior: {selectedPlacement.position[2] > 0 ? 'Anterior (+Z)' : 'Posterior (-Z)'}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400">
              <Box className="w-8 h-8 mx-auto mb-2 opacity-40" />
              Click any 3D organ to inspect transforms.
            </div>
          )
        ) : (
          <div className="space-y-1.5">
            {Object.entries(ANATOMICAL_PLACEMENTS).map(([id, p]) => (
              <button
                key={id}
                onClick={() => selectStructure(id)}
                className={`w-full text-left p-2 rounded flex items-center justify-between border transition-all ${
                  selectedStructureId === id
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300">{id}</span>
                <span className="text-[10px] text-slate-400">
                  [{p.position.map((v) => v.toFixed(2)).join(', ')}]
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
