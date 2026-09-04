import React from 'react';
import {
  Activity,
  Zap,
  Droplets,
  Bone,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  GitBranch
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { resolveLegacyId } from '../../data/AnatomyAssetRegistry';
import { getAnatomyRelations } from '../../data/AnatomyRelationGraph';

export const DentalNeurovascularMap: React.FC<{
  toothFdi?: number;
  isOpen: boolean;
  onClose?: () => void;
}> = ({ toothFdi = 48, isOpen, onClose }) => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  if (!isOpen) return null;

  const isMandibular = toothFdi >= 31 && toothFdi <= 48;
  const isThirdMolar = toothFdi === 48 || toothFdi === 38;

  const handleHighlightNerve = () => {
    selectAnatomy('nerve_ian');
  };

  const handleHighlightCanal = () => {
    selectAnatomy('mandibular_canal');
  };

  const handleHighlightBone = () => {
    selectAnatomy('bone_mandible');
  };

  const handleHighlightLingual = () => {
    selectAnatomy('nerve_lingual');
  };

  return (
    <div
      className={`rounded-2xl border p-4 shadow-xl select-none transition-all ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-100'
          : 'bg-[#faf5ee] border-[#dfd4c4] text-[#28231d]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-inherit mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold font-serif uppercase tracking-tight">
              Sơ Đồ Mạch Máu - Thần Kinh Răng {toothFdi}
            </span>
            <div className="text-[10px] text-slate-400 font-mono">
              Dental Neurovascular Map & Alveolar Relations
            </div>
          </div>
        </div>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-rose-500/15 text-rose-500 border border-rose-500/30">
          {isMandibular ? 'CUNG HÀM DƯỚI' : 'CUNG HÀM TRÊN'}
        </span>
      </div>

      {/* Interactive Neurovascular Tree */}
      <div className="space-y-3 text-xs">
        {/* 1. Innervation Branch */}
        <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-inherit">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
              <Zap className="w-3.5 h-3.5" />
              <span>1. Chi Phối Thần Kinh (Innervation)</span>
            </div>
            <button
              onClick={handleHighlightNerve}
              className="text-[10px] font-mono font-bold text-amber-500 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Xem 3D</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1 pl-4 border-l-2 border-amber-500/30 ml-1.5 text-[11px] leading-relaxed">
            <div>
              <strong>Thần kinh chính:</strong> Thần kinh huyệt răng dưới (IAN / nhánh sau V3)
              <p className="text-slate-500 dark:text-slate-400 text-[10px]">
                Đi vào lỗ hàm dưới (gai Spix), chạy trong ống răng dưới, cấp nhánh tủy răng qua lỗ chóp chân răng.
              </p>
            </div>
            {isThirdMolar && (
              <div className="pt-1">
                <strong>Thần kinh cận kề nguy cơ:</strong> Thần kinh lưỡi (Lingual Nerve)
                <button
                  onClick={handleHighlightLingual}
                  className="ml-2 text-[10px] text-rose-500 hover:underline inline-flex items-center gap-0.5 font-bold"
                >
                  [Xem TK Lưỡi]
                </button>
                <p className="text-slate-500 dark:text-slate-400 text-[10px]">
                  Chạy sát bản xương trong vùng hậu cối, nguy cơ tổn thương khi bóc tách vạt niêm mạc màng xương quá sâu về phía lưỡi.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. Vascular Supply Branch */}
        <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-inherit">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
              <Droplets className="w-3.5 h-3.5" />
              <span>2. Mạch Máu Cấp Nuôi (Vascular Supply)</span>
            </div>
          </div>

          <div className="space-y-1 pl-4 border-l-2 border-rose-500/30 ml-1.5 text-[11px] leading-relaxed">
            <div>
              <strong>Động mạch:</strong> Động mạch huyệt răng dưới (Inferior Alveolar Artery)
              <p className="text-slate-500 dark:text-slate-400 text-[10px]">
                Nhánh của đoạn 1 Động mạch Hàm (Maxillary Artery), đồng hành cùng dây IAN trong ống xương.
              </p>
            </div>
            <div>
              <strong>Tĩnh mạch & Dẫn lưu:</strong> Tĩnh mạch huyệt răng dưới đổ vào Đám rối tĩnh mạch chân bướm (Pterygoid venous plexus).
            </div>
          </div>
        </div>

        {/* 3. Surrounding Bone & Mandibular Canal */}
        <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-inherit">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-cyan-600 dark:text-cyan-400">
              <Bone className="w-3.5 h-3.5" />
              <span>3. Khung Xương Ổ Răng & Ống Giải Phẫu</span>
            </div>
            <button
              onClick={handleHighlightCanal}
              className="text-[10px] font-mono font-bold text-cyan-500 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Xem Ống TK</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1 pl-4 border-l-2 border-cyan-500/30 ml-1.5 text-[11px] leading-relaxed">
            <div className="flex items-center justify-between">
              <span>Xương ổ răng & Vỏ xương hàm:</span>
              <button
                onClick={handleHighlightBone}
                className="text-[10px] font-bold text-amber-500 hover:underline"
              >
                Xương hàm dưới
              </button>
            </div>
            <div>
              <strong>Khoảng cách chóp chân răng - Ống IAN:</strong>
              <span className="font-mono text-rose-500 font-bold ml-1.5">
                {isThirdMolar ? '~ 0.8 - 1.5 mm (Vùng rủi ro cao)' : '> 3.5 mm (An toàn)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety / Clinical Caution Badge */}
      <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-300">
          <strong>Lưu ý lâm sàng:</strong> Luôn khảo sát phim CBCT 3 chiều trước can thiệp phẫu thuật để xác định tương quan chân răng với thành ống thần kinh răng dưới.
        </div>
      </div>
    </div>
  );
};
