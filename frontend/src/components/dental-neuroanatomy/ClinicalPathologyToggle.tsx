import React, { useState } from 'react';
import {
  ShieldAlert,
  Stethoscope,
  HeartPulse,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';

export type ClinicalMode = 'normal' | 'clinical' | 'pathology';

export interface PathologyCondition {
  id: string;
  nameVi: string;
  nameEn: string;
  category: string;
  descriptionVi: string;
  descriptionEn: string;
  symptomsVi: string[];
  radiologyVi: string;
  targetAnatomyId: string;
}

export const PATHOLOGY_CONDITIONS: PathologyCondition[] = [
  {
    id: 'impacted_wisdom_tooth',
    nameVi: 'Răng Khôn Mọc Lệch Gần & Viêm Lợi Trùm (Pericoronitis)',
    nameEn: 'Mesioangular Impacted Third Molar with Pericoronitis',
    category: 'Răng Hàm Mặt / Tiểu Phẫu',
    descriptionVi: 'Răng 48 bị kẹt vào mặt xa thân răng 47 do thiếu chỗ trên cung hàm. Thức ăn giắt dưới nắp lợi gây viêm nhiễm cấp tính.',
    descriptionEn: 'Tooth #48 impacted against distal aspect of #47 due to insufficient arch space. Food debris leads to acute operculitis.',
    symptomsVi: ['Đau nhức vùng góc hàm', 'Khít hàm khó há miệng', 'Sưng nề nắp lợi trùm', 'Sốt nhẹ nổi hạch dưới hàm'],
    radiologyVi: 'Phim Panorama/CBCT: Trục răng nghiêng gần 45-60 độ, chóp chân răng sát trần ống thần kinh răng dưới.',
    targetAnatomyId: 'tooth_48'
  },
  {
    id: 'tmj_disc_displacement',
    nameVi: 'Trật Đĩa Khớp Thái Dương Hàm Ra Trước Có Hồi Phục',
    nameEn: 'Anterior TMJ Disc Displacement with Reduction',
    category: 'Khớp TDH & Khớp Cắn',
    descriptionVi: 'Dây chằng sau đĩa khớp bị giãn, đĩa khớp trượt ra trước lồi cầu khi ngậm miệng. Khi há miệng có tiếng kêu "click" do đĩa trượt về lại trên chỏm lồi cầu.',
    descriptionEn: 'Posterior attachment elongation allows disc to slip anteriorly when closed. Clicking sound occurs on opening as disc recaptures condyle.',
    symptomsVi: ['Tiếng kêu khớp (clicking/popping) khi há ngậm', 'Lệch hàm khi mở miệng', 'Đau cơ cắn và vùng khớp'],
    radiologyVi: 'MRI Khớp TDH: Đĩa khớp nằm trước lồi cầu ở tư thế ngậm miệng, trở về vị trí trung tâm khi há tối đa.',
    targetAnatomyId: 'joint_tmj'
  },
  {
    id: 'deep_dentin_caries',
    nameVi: 'Sâu Ngà Sâu & Viêm Tủy Răng Có Thể Hồi Phục',
    nameEn: 'Deep Dentin Caries & Reversible Pulpitis',
    category: 'Nội Nha & Chữa Răng',
    descriptionVi: 'Vi khuẩn hủy khoáng men răng và tiến sâu vào các ống ngà, kích thích đầu mút thần kinh tủy răng gây đau buốt khi tiếp xúc nóng/lạnh/ngọt.',
    descriptionEn: 'Bacterial demineralization penetrates enamel into dentinal tubules, irritating pulp nociceptors upon thermal stimulus.',
    symptomsVi: ['Buốt buốt nhói thoáng qua khi ăn đồ lạnh hoặc chua', 'Không đau tự nhiên về đêm'],
    radiologyVi: 'Vùng thấu quang sâu áp sát buồng tủy răng trên phim quanh chóp.',
    targetAnatomyId: 'tooth_specimen'
  }
];

export const ClinicalPathologyToggle: React.FC<{
  currentMode: ClinicalMode;
  onModeChange: (mode: ClinicalMode) => void;
  selectedConditionId?: string;
  onConditionChange?: (condition: PathologyCondition) => void;
}> = ({ currentMode, onModeChange, selectedConditionId = 'impacted_wisdom_tooth', onConditionChange }) => {
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);

  const selectedCondition =
    PATHOLOGY_CONDITIONS.find((c) => c.id === selectedConditionId) || PATHOLOGY_CONDITIONS[0];

  const handleConditionSelect = (c: PathologyCondition) => {
    if (onConditionChange) onConditionChange(c);
    selectAnatomy(c.targetAnatomyId);
  };

  return (
    <div
      className={`rounded-2xl border p-3 shadow-lg select-none transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-white/95 border-[#e2d8cb] text-[#28231d]'
      }`}
    >
      {/* 1. Mode Pill Switcher */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div
          className={`flex items-center p-0.5 rounded-full border text-xs w-full sm:w-auto ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-[#ede3d5] border-[#ded4c4]'
          }`}
        >
          <button
            onClick={() => onModeChange('normal')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
              currentMode === 'normal'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-current'
            }`}
          >
            Giải Phẫu Chuẩn
          </button>
          <button
            onClick={() => onModeChange('clinical')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
              currentMode === 'clinical'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-current'
            }`}
          >
            Lâm Sàng
          </button>
          <button
            onClick={() => onModeChange('pathology')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
              currentMode === 'pathology'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-current'
            }`}
          >
            Bệnh Học
          </button>
        </div>
      </div>

      {/* 2. Educational Simulation Mandatory Disclaimer Banner */}
      {currentMode !== 'normal' && (
        <div className="mb-2.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            <strong>EDUCATIONAL / SIMULATION ONLY:</strong> Nội dung mô phỏng phục vụ đào tạo y khoa, không dùng để chẩn đoán hoặc ra chỉ định điều trị thực tế trên người bệnh.
          </span>
        </div>
      )}

      {/* 3. Pathology Condition Details if in Clinical or Pathology Mode */}
      {currentMode !== 'normal' && (
        <div className="space-y-2 pt-1 border-t border-inherit">
          {/* Condition Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Ca Bệnh:</span>
            <select
              value={selectedCondition.id}
              onChange={(e) => {
                const found = PATHOLOGY_CONDITIONS.find((c) => c.id === e.target.value);
                if (found) handleConditionSelect(found);
              }}
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none flex-1 truncate ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-[#dfd4c4] text-slate-800'
              }`}
            >
              {PATHOLOGY_CONDITIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameVi}
                </option>
              ))}
            </select>
          </div>

          {/* Description & Mechanism Card */}
          <div
            className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
              isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-[#f7f0e6] border-[#dfd4c4]'
            }`}
          >
            <div className="font-semibold text-rose-500 mb-1">{selectedCondition.nameVi}</div>
            <p className="text-slate-600 dark:text-slate-300 mb-1.5">{selectedCondition.descriptionVi}</p>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-serif italic mb-2">
              {selectedCondition.descriptionEn}
            </div>

            <div className="space-y-1 text-[11px] pt-1 border-t border-inherit">
              <div>
                <strong>Triệu chứng điển hình:</strong>{' '}
                <span className="text-slate-600 dark:text-slate-300">
                  {selectedCondition.symptomsVi.join(' • ')}
                </span>
              </div>
              <div>
                <strong>Dấu hiệu hình ảnh (X-quang / CBCT):</strong>{' '}
                <span className="text-slate-600 dark:text-slate-300">
                  {selectedCondition.radiologyVi}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
