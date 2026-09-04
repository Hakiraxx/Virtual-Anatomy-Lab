import React from 'react';
import {
  Skull,
  Eye,
  Sliders,
  Sparkles,
  Zap,
  Target,
  Compass,
  Layers,
  Activity,
  Check
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const CranialFossaToolbar: React.FC = () => {
  const boneOpacity = useDentalNeuroStore((s) => s.boneOpacity);
  const setBoneOpacity = useDentalNeuroStore((s) => s.setBoneOpacity);
  const isNeuralXRay = useDentalNeuroStore((s) => s.isNeuralXRay);
  const toggleNeuralXRay = useDentalNeuroStore((s) => s.toggleNeuralXRay);
  const isSkullBaseMode = useDentalNeuroStore((s) => s.isSkullBaseMode);
  const setSkullBaseMode = useDentalNeuroStore((s) => s.setSkullBaseMode);
  const cranialFossa = useDentalNeuroStore((s) => s.cranialFossa);
  const setCranialFossa = useDentalNeuroStore((s) => s.setCranialFossa);
  const isV2DentalView = useDentalNeuroStore((s) => s.isV2DentalView);
  const setV2DentalView = useDentalNeuroStore((s) => s.setV2DentalView);
  const isFacialNerveLab = useDentalNeuroStore((s) => s.isFacialNerveLab);
  const setFacialNerveLab = useDentalNeuroStore((s) => s.setFacialNerveLab);
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const highlightedToothRelations = useDentalNeuroStore((s) => s.highlightedToothRelations);
  const setHighlightedToothRelations = useDentalNeuroStore((s) => s.setHighlightedToothRelations);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const isToothSelected = Boolean(selectedAnatomyId && selectedAnatomyId.startsWith('tooth_'));

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-xl shadow-xl transition-all select-none text-xs bg-white/90 dark:bg-slate-900/90 border-[#e7ded3] dark:border-slate-800 text-slate-700 dark:text-slate-200">
      {/* 1. Bone Opacity Slider */}
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <Sliders className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Độ Mờ Xương:</span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(boneOpacity * 100)}
          onChange={(e) => setBoneOpacity(Number(e.target.value) / 100)}
          className="w-16 sm:w-20 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          title={`Độ mờ xương sọ: ${Math.round(boneOpacity * 100)}%`}
        />
        <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 min-w-[28px]">
          {Math.round(boneOpacity * 100)}%
        </span>
      </div>

      {/* 2. Neural X-Ray Mode Toggle */}
      <button
        onClick={toggleNeuralXRay}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition cursor-pointer ${
          isNeuralXRay
            ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 font-bold'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
        }`}
        title="Chế độ Neural X-Ray: Xương mờ đục, dây thần kinh phát quang y khoa sắc nét"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Neural X-Ray</span>
      </button>

      {/* 3. Skull Base Mode Toggle */}
      <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setSkullBaseMode(!isSkullBaseMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
            isSkullBaseMode
              ? 'bg-sky-600 text-white shadow-sm font-bold'
              : 'hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
          title="Chế độ Nền Sọ: Góc nhìn từ trên xuống khảo sát 3 hố sọ"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Nền Sọ</span>
        </button>

        {isSkullBaseMode && (
          <div className="flex items-center gap-0.5 pl-1 border-l border-slate-300 dark:border-slate-600">
            {(
              [
                { id: 'all', label: 'Toàn bộ' },
                { id: 'anterior', label: 'Hố Trước' },
                { id: 'middle', label: 'Hố Giữa' },
                { id: 'posterior', label: 'Hố Sau' }
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setCranialFossa(f.id)}
                className={`px-2 py-0.5 rounded text-[10px] transition cursor-pointer ${
                  cranialFossa === f.id
                    ? 'bg-sky-500 text-white font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. Specialized RHM Views */}
      <div className="flex items-center gap-1">
        {/* V2 Dental View */}
        <button
          onClick={() => setV2DentalView(!isV2DentalView)}
          className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-medium transition cursor-pointer ${
            isV2DentalView
              ? 'bg-emerald-600 text-white shadow-sm font-bold'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
          title="V2 Dental View: Khảo sát Thần kinh hàm trên V2 + Xương hàm trên + Cung răng"
        >
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>V2 Dental View</span>
        </button>

        {/* Facial Nerve / Parotid View */}
        <button
          onClick={() => setFacialNerveLab(!isFacialNerveLab)}
          className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-medium transition cursor-pointer ${
            isFacialNerveLab
              ? 'bg-purple-600 text-white shadow-sm font-bold'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
          title="Facial Nerve Lab: Khảo sát Dây VII + Lỗ trâm chũm + Tuyến mang tai + 5 nhánh tận"
        >
          <Activity className="w-3 h-3 text-purple-400" />
          <span>CN VII / Parotid</span>
        </button>
      </div>

      {/* 5. Tooth Relation Context Actions (When a Tooth is clicked) */}
      {isToothSelected && (
        <div className="flex items-center gap-1 pl-2 border-l border-amber-500/30">
          <span className="text-[10px] font-bold text-amber-500">Răng {selectedAnatomyId?.replace('tooth_', '')}:</span>
          <button
            onClick={() =>
              setHighlightedToothRelations({
                innervation: !highlightedToothRelations.innervation
              })
            }
            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition cursor-pointer ${
              highlightedToothRelations.innervation
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
            }`}
            title="Chiếu sáng thần kinh chi phối (IAN / V3)"
          >
            SHOW INNERVATION
          </button>
          <button
            onClick={() =>
              setHighlightedToothRelations({
                vascular: !highlightedToothRelations.vascular
              })
            }
            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition cursor-pointer ${
              highlightedToothRelations.vascular
                ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
            }`}
            title="Chiếu sáng mạch máu cấp nuôi"
          >
            SHOW VASCULAR
          </button>
          <button
            onClick={() =>
              setHighlightedToothRelations({
                canal: !highlightedToothRelations.canal
              })
            }
            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition cursor-pointer ${
              highlightedToothRelations.canal
                ? 'bg-indigo-500 text-white border-indigo-600 shadow-sm'
                : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800'
            }`}
            title="Chiếu sáng ống hàm dưới (Mandibular canal)"
          >
            SHOW CANAL
          </button>
        </div>
      )}
    </div>
  );
};
