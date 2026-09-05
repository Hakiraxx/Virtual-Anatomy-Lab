import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Brain,
  Skull,
  Zap,
  Layers,
  Sparkles,
  Activity,
  PanelLeftClose
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  MUSCLES_OF_MASTICATION
} from '../../data/dentalNeuroData';
import { ToothPositionResolver } from '../../utils/ToothPositionResolver';

interface DentalNeuroTreeProps {
  isOpen?: boolean;
  onClose?: () => void;
  customWidth?: number;
  isMobileDrawer?: boolean;
}

export const DentalNeuroTree: React.FC<DentalNeuroTreeProps> = ({
  isOpen = true,
  onClose,
  customWidth = 320,
  isMobileDrawer = false
}) => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);

  const selectForamen = useDentalNeuroStore((s) => s.selectForamen);

  // When rendered in a mobile/tablet drawer, auto-close on selection so 3D model is visible
  const handleItemSelect = (id: string, side?: 'right' | 'left') => {
    if (CRANIAL_FORAMINA[id]) {
      selectForamen(id);
    } else {
      selectAnatomy(id, side);
    }
    if (isMobileDrawer && onClose) {
      onClose();
    }
  };

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    cranial_nerves: true,
    cn_v: true,
    cn_v1: false,
    cn_v2: false,
    cn_v3: true,
    cn_vii: false,
    foramina: true,
    maxilla: false,
    mandible: true,
    muscles: false
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeSpecimenMode = useDentalNeuroStore((s) => s.activeSpecimenMode);

  useEffect(() => {
    if (activeSpecimenMode === 'tmj_specimen') {
      setExpandedSections((prev) => ({ ...prev, muscles: true }));
    } else if (activeSpecimenMode === 'wisdom_surgery') {
      setExpandedSections((prev) => ({ ...prev, mandible: true }));
    }
  }, [activeSpecimenMode]);

  // Auto-expand parent branches and scroll into view when selection changes
  useEffect(() => {
    if (!selectedAnatomyId) return;

    setExpandedSections((prev) => {
      const next = { ...prev };
      if (
        selectedAnatomyId.startsWith('cn_') ||
        selectedAnatomyId.startsWith('nerve_')
      ) {
        next.cranial_nerves = true;
        if (
          selectedAnatomyId.includes('v1') ||
          selectedAnatomyId === 'nerve_frontal' ||
          selectedAnatomyId === 'nerve_supraorbital'
        ) {
          next.cn_v = true;
          next.cn_v1 = true;
        } else if (
          selectedAnatomyId.includes('v2') ||
          selectedAnatomyId === 'nerve_infraorbital' ||
          selectedAnatomyId === 'nerve_psa' ||
          selectedAnatomyId === 'nerve_msa' ||
          selectedAnatomyId === 'nerve_asa' ||
          selectedAnatomyId === 'nerve_greater_palatine' ||
          selectedAnatomyId === 'nerve_nasopalatine'
        ) {
          next.cn_v = true;
          next.cn_v2 = true;
        } else if (
          selectedAnatomyId.includes('v3') ||
          selectedAnatomyId === 'nerve_ian' ||
          selectedAnatomyId === 'nerve_mental' ||
          selectedAnatomyId === 'nerve_incisive' ||
          selectedAnatomyId === 'nerve_lingual' ||
          selectedAnatomyId === 'nerve_buccal' ||
          selectedAnatomyId === 'nerve_auriculotemporal'
        ) {
          next.cn_v = true;
          next.cn_v3 = true;
        } else if (selectedAnatomyId.startsWith('cn_7')) {
          next.cn_vii = true;
        }
      } else if (
        selectedAnatomyId.includes('foramen') ||
        selectedAnatomyId.includes('fissure') ||
        selectedAnatomyId.includes('canal')
      ) {
        next.foramina = true;
      } else if (selectedAnatomyId.startsWith('tooth.') || selectedAnatomyId.startsWith('tooth_')) {
        const num = parseInt(selectedAnatomyId.replace(/tooth[._]/, ''), 10);
        if (num >= 11 && num <= 28) {
          next.maxilla = true;
        } else {
          next.mandible = true;
        }
      } else if (
        selectedAnatomyId === 'joint_tmj' ||
        selectedAnatomyId === 'specimen_tmj' ||
        selectedAnatomyId.startsWith('muscle_')
      ) {
        next.muscles = true;
      }
      return next;
    });

    // Auto-scroll the selected element into view
    setTimeout(() => {
      const el = document.getElementById(`tree_item_${selectedAnatomyId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 120);
  }, [selectedAnatomyId]);

  return (
    <aside
      style={!isMobileDrawer ? { width: isOpen ? `${customWidth}px` : 0 } : undefined}
      className={`h-full border-r flex flex-col z-20 select-none overflow-hidden ${
        isMobileDrawer
          ? 'w-full'
          : isOpen
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none border-r-0'
      } ${
        isDark
          ? 'bg-[#0c121e]/95 border-slate-800 text-slate-200'
          : 'bg-[#fbf7f2]/95 border-[#e7ded3] text-[#28231d]'
      }`}
    >
      {/* Header */}
      <div
        className={`p-3 border-b flex items-center justify-between flex-shrink-0 ${
          isDark
            ? 'bg-slate-950/60 border-slate-800/80'
            : 'bg-[#f3ece2]/60 border-[#e7ded3]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 flex-shrink-0">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-current truncate">
              Cây Giải Phẫu Sọ Mặt
            </h2>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 font-mono truncate">
              CRANIOFACIAL HIERARCHY
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer flex-shrink-0"
            title="Thu gọn cây giải phẫu"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Scrollable Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs font-sans">
        {/* SPECIALIZED QUICK NAVIGATION FOR WISDOM SURGERY */}
        {activeSpecimenMode === 'wisdom_surgery' && (
          <div className={`p-2.5 rounded-2xl border mb-2.5 ${isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-center justify-between gap-1 text-amber-600 dark:text-amber-400 mb-1.5 px-0.5">
              <span className="font-serif font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tiêu Bản Phẫu Thuật Răng Khôn</span>
              </span>
              <span className="text-[8px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-amber-500/20">
                WISDOM LAB
              </span>
            </div>
            <div className="space-y-0.5">
              {[
                { id: 'tooth_48', label: 'Răng 48 (Khôn dưới phải)', type: 'Răng 8' },
                { id: 'tooth_38', label: 'Răng 38 (Khôn dưới trái)', type: 'Răng 8' },
                { id: 'bone_mandible', label: 'Xương hàm dưới (Mandible)', type: 'Xương' },
                { id: 'mandibular_canal', label: 'Ống hàm dưới & IAN', type: 'Ống & TK' },
                { id: 'nerve_lingual', label: 'Thần kinh Lưỡi (Lingual)', type: 'Thần kinh' },
                { id: 'mental_foramen', label: 'Lỗ cằm & Thần kinh cằm', type: 'Lỗ sọ' },
                { id: 'mandibular_foramen', label: 'Lỗ hàm dưới & Gai Spix', type: 'Lỗ sọ' }
              ].map((item) => {
                const isSelected = selectedAnatomyId === item.id;
                return (
                  <button
                    key={item.id}
                    id={`tree_item_${item.id}`}
                    onClick={() => handleItemSelect(item.id)}
                    className={`w-full text-left px-2 py-1 rounded-lg text-[11px] flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-200'
                        : 'hover:bg-white text-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[8px] font-mono opacity-70 px-1 py-0.2 rounded bg-black/10 dark:bg-white/10">{item.type}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 1: CRANIAL NERVES */}
        <div>
          <button
            onClick={() => toggleSection('cranial_nerves')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded font-serif font-bold text-amber-600 dark:text-amber-400 transition cursor-pointer ${
              isDark ? 'hover:bg-slate-800/60' : 'hover:bg-[#ede3d5]/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-amber-500" />
              <span>12 Đôi Dây Thần Kinh Sọ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono font-bold">
                12 READY
              </span>
              {expandedSections.cranial_nerves ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {expandedSections.cranial_nerves && (
            <div className={`pl-3 border-l mt-1 space-y-0.5 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
              {/* CN I - IV */}
              {['cn_1', 'cn_2', 'cn_3', 'cn_4'].map((id) => {
                const item = DENTAL_NERVE_STRUCTURES[id];
                if (!item) return null;
                const isSelected = selectedAnatomyId === id;
                return (
                  <button
                    key={id}
                    id={`tree_item_${id}`}
                    onClick={() => handleItemSelect(id)}
                    className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800/50 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span>{item.nameVi}</span>
                    <span className="text-[9px] font-mono opacity-70">CN {item.cranialNerveNumber}</span>
                  </button>
                );
              })}

              {/* CN V — TRIGEMINAL (DEEP TREE) */}
              <div className="pt-1">
                <div className="flex items-center justify-between">
                  <button
                    id="tree_item_cn_5"
                    onClick={() => handleItemSelect('cn_5')}
                    className={`flex-1 text-left px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      selectedAnatomyId === 'cn_5'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
                    }`}
                  >
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>CN V — Thần kinh Sinh ba</span>
                  </button>
                  <button
                    onClick={() => toggleSection('cn_v')}
                    className={`p-1 rounded cursor-pointer ${
                      isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-[#ede3d5] text-slate-500'
                    }`}
                  >
                    {expandedSections.cn_v ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                </div>

                {expandedSections.cn_v && (
                  <div className="pl-3 border-l border-amber-500/30 ml-2 mt-0.5 space-y-0.5">
                    {/* HẠCH GASSER */}
                    <button
                      id="tree_item_trigeminal_ganglion"
                      onClick={() => handleItemSelect('trigeminal_ganglion')}
                      className={`w-full text-left px-2 py-1 rounded text-[10px] font-bold flex items-center justify-between gap-1 transition cursor-pointer ${
                        selectedAnatomyId === 'trigeminal_ganglion'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
                      }`}
                    >
                      <span className="truncate">★ Hạch Gasser (Trigeminal Ganglion)</span>
                      <span className="text-[8px] px-1 py-0.5 rounded border border-amber-500/40 font-mono">
                        Hốc Meckel
                      </span>
                    </button>

                    {/* V1 OPHTHALMIC */}
                    <div className="flex items-center justify-between">
                      <button
                        id="tree_item_cn_5_v1"
                        onClick={() => handleItemSelect('cn_5_v1')}
                        className={`flex-1 text-left px-2 py-1 rounded text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                          selectedAnatomyId === 'cn_5_v1'
                            ? 'bg-sky-600 text-white font-bold shadow-sm'
                            : 'text-sky-600 dark:text-sky-400 hover:bg-sky-500/10'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <span>V1 — Thần kinh Mắt</span>
                      </button>
                      <button
                        onClick={() => toggleSection('cn_v1')}
                        className="p-1 text-slate-400 hover:text-slate-200"
                      >
                        {expandedSections.cn_v1 ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      </button>
                    </div>
                    {expandedSections.cn_v1 && (
                      <div className="pl-3 border-l border-sky-500/20 ml-2 space-y-0.5">
                        <button
                          id="tree_item_nerve_frontal"
                          onClick={() => handleItemSelect('nerve_frontal')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_frontal'
                              ? 'bg-sky-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Trán (Frontal)
                        </button>
                        <button
                          id="tree_item_nerve_supraorbital"
                          onClick={() => handleItemSelect('nerve_supraorbital')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_supraorbital'
                              ? 'bg-sky-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Trên ổ mắt (Supraorbital)
                        </button>
                      </div>
                    )}

                    {/* V2 MAXILLARY */}
                    <div className="flex items-center justify-between">
                      <button
                        id="tree_item_cn_5_v2"
                        onClick={() => handleItemSelect('cn_5_v2')}
                        className={`flex-1 text-left px-2 py-1 rounded text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                          selectedAnatomyId === 'cn_5_v2'
                            ? 'bg-orange-600 text-white font-bold shadow-sm'
                            : 'text-orange-600 dark:text-orange-400 hover:bg-orange-500/10'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span>V2 — Thần kinh Hàm trên</span>
                      </button>
                      <button
                        onClick={() => toggleSection('cn_v2')}
                        className="p-1 text-slate-400 hover:text-slate-200"
                      >
                        {expandedSections.cn_v2 ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      </button>
                    </div>
                    {expandedSections.cn_v2 && (
                      <div className="pl-3 border-l border-orange-500/20 ml-2 space-y-0.5">
                        <button
                          id="tree_item_nerve_infraorbital"
                          onClick={() => handleItemSelect('nerve_infraorbital')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_infraorbital'
                              ? 'bg-orange-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Dưới ổ mắt (Infraorbital)
                        </button>
                        <button
                          id="tree_item_nerve_psa"
                          onClick={() => handleItemSelect('nerve_psa')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_psa'
                              ? 'bg-orange-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Huyệt răng trên sau (PSA)
                        </button>
                        <button
                          id="tree_item_nerve_msa"
                          onClick={() => handleItemSelect('nerve_msa')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_msa'
                              ? 'bg-orange-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Huyệt răng trên giữa (MSA)
                        </button>
                        <button
                          id="tree_item_nerve_asa"
                          onClick={() => handleItemSelect('nerve_asa')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_asa'
                              ? 'bg-orange-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Huyệt răng trên trước (ASA)
                        </button>
                        <button
                          id="tree_item_nerve_greater_palatine"
                          onClick={() => handleItemSelect('nerve_greater_palatine')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_greater_palatine'
                              ? 'bg-orange-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Khẩu cái lớn (Greater palatine)
                        </button>
                        <button
                          id="tree_item_nerve_nasopalatine"
                          onClick={() => handleItemSelect('nerve_nasopalatine')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_nasopalatine'
                              ? 'bg-orange-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Mũi khẩu cái (Nasopalatine)
                        </button>
                      </div>
                    )}

                    {/* V3 MANDIBULAR */}
                    <div className="flex items-center justify-between">
                      <button
                        id="tree_item_cn_5_v3"
                        onClick={() => handleItemSelect('cn_5_v3')}
                        className={`flex-1 text-left px-2 py-1 rounded text-[11px] flex items-center gap-1.5 font-bold transition cursor-pointer ${
                          selectedAnatomyId === 'cn_5_v3'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-rose-600 dark:text-rose-400 hover:bg-rose-500/10'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span>V3 — Thần kinh Hàm dưới</span>
                      </button>
                      <button
                        onClick={() => toggleSection('cn_v3')}
                        className="p-1 text-slate-400 hover:text-slate-200"
                      >
                        {expandedSections.cn_v3 ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      </button>
                    </div>
                    {expandedSections.cn_v3 && (
                      <div className="pl-3 border-l border-rose-500/30 ml-2 space-y-0.5">
                        <button
                          id="tree_item_nerve_ian"
                          onClick={() => handleItemSelect('nerve_ian')}
                          className={`w-full text-left px-2 py-1 rounded text-[10px] font-bold flex items-center justify-between gap-1 transition cursor-pointer ${
                            selectedAnatomyId === 'nerve_ian'
                              ? 'bg-rose-700 text-white shadow-sm'
                              : 'text-rose-600 dark:text-rose-300 hover:bg-rose-500/10'
                          }`}
                        >
                          <span className="truncate">★ TK Huyệt răng dưới (IAN)</span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded border border-rose-500/40 font-mono whitespace-nowrap flex-shrink-0">
                            Ống hàm dưới
                          </span>
                        </button>
                        <button
                          id="tree_item_nerve_mental"
                          onClick={() => handleItemSelect('nerve_mental')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                            selectedAnatomyId === 'nerve_mental'
                              ? 'bg-rose-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Cằm (Mental nerve)
                        </button>
                        <button
                          id="tree_item_nerve_incisive"
                          onClick={() => handleItemSelect('nerve_incisive')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                            selectedAnatomyId === 'nerve_incisive'
                              ? 'bg-rose-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Răng cửa (Incisive nerve)
                        </button>
                        <button
                          id="tree_item_nerve_lingual"
                          onClick={() => handleItemSelect('nerve_lingual')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                            selectedAnatomyId === 'nerve_lingual'
                              ? 'bg-fuchsia-700 text-white font-bold'
                              : 'text-fuchsia-600 dark:text-fuchsia-300 hover:text-current'
                          }`}
                        >
                          · TK Lưỡi (Lingual nerve)
                        </button>
                        <button
                          id="tree_item_nerve_buccal"
                          onClick={() => handleItemSelect('nerve_buccal')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_buccal'
                              ? 'bg-purple-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Má (Buccal nerve)
                        </button>
                        <button
                          id="tree_item_nerve_auriculotemporal"
                          onClick={() => handleItemSelect('nerve_auriculotemporal')}
                          className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                            selectedAnatomyId === 'nerve_auriculotemporal'
                              ? 'bg-purple-700 text-white font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-current'
                          }`}
                        >
                          · TK Tai thái dương (TMJ)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CN VI — ABDUCENS */}
              {(() => {
                const item = DENTAL_NERVE_STRUCTURES['cn_6'];
                if (!item) return null;
                const isSelected = selectedAnatomyId === 'cn_6';
                return (
                  <button
                    key="cn_6"
                    id="tree_item_cn_6"
                    onClick={() => handleItemSelect('cn_6')}
                    className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800/50 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span>{item.nameVi}</span>
                    <span className="text-[9px] font-mono opacity-70">CN {item.cranialNerveNumber}</span>
                  </button>
                );
              })()}

              {/* CN VII — FACIAL NERVE */}
              <div className="pt-1">
                <button
                  id="tree_item_cn_7"
                  onClick={() => handleItemSelect('cn_7')}
                  className={`w-full text-left px-2 py-1 rounded text-[11px] font-bold flex items-center justify-between transition cursor-pointer ${
                    selectedAnatomyId === 'cn_7'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <Sparkles className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">CN VII — Dây thần kinh Mặt</span>
                  </div>
                  <span className="text-[8px] px-1.5 py-0.5 rounded border border-emerald-500/40 font-mono whitespace-nowrap flex-shrink-0">
                    Mang tai
                  </span>
                </button>
                <div className="pl-3 border-l border-emerald-500/20 ml-2 space-y-0.5 mt-0.5">
                  <button
                    id="tree_item_cn_7_temporal"
                    onClick={() => handleItemSelect('cn_7_temporal')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                      selectedAnatomyId === 'cn_7_temporal'
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-current'
                    }`}
                  >
                    · Nhánh Thái dương (Temporal)
                  </button>
                  <button
                    id="tree_item_cn_7_zygomatic"
                    onClick={() => handleItemSelect('cn_7_zygomatic')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                      selectedAnatomyId === 'cn_7_zygomatic'
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-current'
                    }`}
                  >
                    · Nhánh Gò má (Zygomatic)
                  </button>
                  <button
                    id="tree_item_cn_7_buccal"
                    onClick={() => handleItemSelect('cn_7_buccal')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                      selectedAnatomyId === 'cn_7_buccal'
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-current'
                    }`}
                  >
                    · Nhánh Má (Buccal motor)
                  </button>
                  <button
                    id="tree_item_cn_7_marginal_mandibular"
                    onClick={() => handleItemSelect('cn_7_marginal_mandibular')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                      selectedAnatomyId === 'cn_7_marginal_mandibular'
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-current'
                    }`}
                  >
                    · Nhánh Bờ hàm dưới (Marginal mandibular)
                  </button>
                  <button
                    id="tree_item_cn_7_cervical"
                    onClick={() => handleItemSelect('cn_7_cervical')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                      selectedAnatomyId === 'cn_7_cervical'
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-current'
                    }`}
                  >
                    · Nhánh Cổ (Cervical)
                  </button>
                </div>
              </div>

              {/* CN VIII — VESTIBULOCOCHLEAR */}
              {(() => {
                const item = DENTAL_NERVE_STRUCTURES['cn_8'];
                if (!item) return null;
                const isSelected = selectedAnatomyId === 'cn_8';
                return (
                  <button
                    key="cn_8"
                    id="tree_item_cn_8"
                    onClick={() => handleItemSelect('cn_8')}
                    className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800/50 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span>{item.nameVi}</span>
                    <span className="text-[9px] font-mono opacity-70">CN {item.cranialNerveNumber}</span>
                  </button>
                );
              })()}

              {/* CN IX, X, XI, XII */}
              {['cn_9', 'cn_10', 'cn_11', 'cn_12'].map((id) => {
                const item = DENTAL_NERVE_STRUCTURES[id];
                if (!item) return null;
                const isSelected = selectedAnatomyId === id;
                return (
                  <button
                    key={id}
                    id={`tree_item_${id}`}
                    onClick={() => handleItemSelect(id)}
                    className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800/50 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span>{item.nameVi}</span>
                    <span className="text-[9px] font-mono opacity-70">CN {item.cranialNerveNumber}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 2: CRANIAL FORAMINA LAB */}
        <div>
          <button
            onClick={() => toggleSection('foramina')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded font-serif font-bold text-sky-600 dark:text-sky-400 transition cursor-pointer ${
              isDark ? 'hover:bg-slate-800/60' : 'hover:bg-[#ede3d5]/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Skull className="w-3.5 h-3.5 text-sky-500" />
              <span>Lỗ Sọ & Nền Sọ (Foramina)</span>
            </div>
            {expandedSections.foramina ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.foramina && (
            <div className={`pl-3 border-l mt-1 space-y-0.5 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
              {Object.values(CRANIAL_FORAMINA).map((foramen) => {
                const isSelected = selectedAnatomyId === foramen.id;
                return (
                  <button
                    key={foramen.id}
                    id={`tree_item_${foramen.id}`}
                    onClick={() => handleItemSelect(foramen.id)}
                    className={`w-full text-left px-2 py-1 rounded text-[10px] flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-sky-600 text-white font-bold shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800/50 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span>{foramen.nameVi}</span>
                    <span className="text-[9px] font-mono text-slate-400">{foramen.latinName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 3: MANDIBLE & LOWER TEETH */}
        <div>
          <button
            onClick={() => toggleSection('mandible')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded font-serif font-bold text-rose-600 dark:text-rose-400 transition cursor-pointer ${
              isDark ? 'hover:bg-slate-800/60' : 'hover:bg-[#ede3d5]/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-500" />
              <span>Xương Hàm Dưới & Cung Răng Dưới</span>
            </div>
            {expandedSections.mandible ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.mandible && (
            <div className={`pl-3 border-l mt-1 space-y-0.5 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
              <button
                id="tree_item_bone_mandible"
                onClick={() => handleItemSelect('bone_mandible')}
                className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                  selectedAnatomyId === 'bone_mandible'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                · Xương hàm dưới (Mandible)
              </button>
              <button
                id="tree_item_mandibular_foramen"
                onClick={() => handleItemSelect('mandibular_foramen')}
                className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                  selectedAnatomyId === 'mandibular_foramen'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-amber-600 dark:text-amber-300 hover:bg-amber-500/10'
                }`}
              >
                · Lỗ hàm dưới & Gai Spix (Lingula)
              </button>
              <button
                id="tree_item_nerve_ian"
                onClick={() => handleItemSelect('nerve_ian')}
                className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                  selectedAnatomyId === 'nerve_ian' || selectedAnatomyId === 'mandibular_canal'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-rose-600 dark:text-rose-300 hover:bg-rose-500/10'
                }`}
              >
                · Ống hàm dưới & Thần kinh răng dưới (IAN)
              </button>
              <button
                id="tree_item_nerve_lingual"
                onClick={() => handleItemSelect('nerve_lingual')}
                className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                  selectedAnatomyId === 'nerve_lingual'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-amber-600 dark:text-amber-300 hover:bg-amber-500/10'
                }`}
              >
                · Thần kinh Lưỡi (Lingual Nerve)
              </button>
              <button
                id="tree_item_mental_foramen"
                onClick={() => handleItemSelect('mental_foramen')}
                className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer ${
                  selectedAnatomyId === 'mental_foramen'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'text-sky-600 dark:text-sky-300 hover:bg-sky-500/10'
                }`}
              >
                · Lỗ cằm & Thần kinh cằm (Mental)
              </button>

              <div className="pt-1.5 text-[9px] font-mono text-slate-400 px-2 uppercase">
                Răng Hàm Dưới (FDI 31 - 38 & 41 - 48)
              </div>
              {DENTAL_INNERVATION_DATABASE.filter((t) => t.arch === 'mandibular').map((tooth) => {
                const toothId = `tooth.${tooth.fdi}`;
                const isSelected =
                  selectedAnatomyId === toothId ||
                  selectedAnatomyId === `tooth_${tooth.fdi}` ||
                  (selectedAnatomyId && ToothPositionResolver.resolve(selectedAnatomyId)?.fdi === tooth.fdi);
                const isWisdom = tooth.fdi === 38 || tooth.fdi === 48;
                return (
                  <button
                    key={tooth.fdi}
                    id={`tree_item_tooth_${tooth.fdi}`}
                    onClick={() => handleItemSelect(toothId)}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white font-bold shadow-sm ring-1 ring-amber-400'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="truncate">R.{tooth.fdi} — {tooth.nameVi.split('(')[0]}</span>
                      {isWisdom && (
                        <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30 flex-shrink-0">
                          Tiểu Phẫu
                        </span>
                      )}
                    </span>
                    <span className="text-[9px] font-mono text-rose-500/80 flex-shrink-0">IAN</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 4: MAXILLA & UPPER TEETH */}
        <div>
          <button
            onClick={() => toggleSection('maxilla')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded font-serif font-bold text-orange-600 dark:text-orange-400 transition cursor-pointer ${
              isDark ? 'hover:bg-slate-800/60' : 'hover:bg-[#ede3d5]/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Xương Hàm Trên & Cung Răng Trên</span>
            </div>
            {expandedSections.maxilla ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.maxilla && (
            <div className={`pl-3 border-l mt-1 space-y-0.5 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
              <button
                id="tree_item_infraorbital_foramen"
                onClick={() => handleItemSelect('infraorbital_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-orange-500 hover:bg-orange-500/10 cursor-pointer"
              >
                · Lỗ dưới ổ mắt & Ống dưới ổ mắt
              </button>
              <button
                id="tree_item_greater_palatine_foramen"
                onClick={() => handleItemSelect('greater_palatine_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-amber-500 hover:bg-amber-500/10 cursor-pointer"
              >
                · Lỗ khẩu cái lớn (Vòm miệng)
              </button>
              <button
                id="tree_item_incisive_foramen"
                onClick={() => handleItemSelect('incisive_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-yellow-500 hover:bg-yellow-500/10 cursor-pointer"
              >
                · Lỗ răng cửa & Ống răng cửa
              </button>

              <div className="pt-1.5 text-[9px] font-mono text-slate-400 px-2 uppercase">
                Răng Hàm Trên (FDI 11 - 18 & 21 - 28)
              </div>
              {DENTAL_INNERVATION_DATABASE.filter((t) => t.arch === 'maxillary').map((tooth) => {
                const toothId = `tooth.${tooth.fdi}`;
                const isSelected =
                  selectedAnatomyId === toothId ||
                  selectedAnatomyId === `tooth_${tooth.fdi}` ||
                  (selectedAnatomyId && ToothPositionResolver.resolve(selectedAnatomyId)?.fdi === tooth.fdi);
                return (
                  <button
                    key={tooth.fdi}
                    id={`tree_item_tooth_${tooth.fdi}`}
                    onClick={() => handleItemSelect(toothId)}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 text-white font-bold shadow-sm ring-1 ring-amber-400'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span>R.{tooth.fdi} — {tooth.nameVi.split('(')[0]}</span>
                    <span className="text-[9px] font-mono text-orange-500/80">
                      {tooth.toothType === 'molar' ? 'PSA' : tooth.toothType === 'premolar' ? 'MSA' : 'ASA'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 5: TMJ & MUSCLES OF MASTICATION */}
        <div>
          <button
            onClick={() => toggleSection('muscles')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded font-serif font-bold text-emerald-600 dark:text-emerald-400 transition cursor-pointer ${
              isDark ? 'hover:bg-slate-800/60' : 'hover:bg-[#ede3d5]/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Khớp TDH & Cơ Nhai (TMJ & Muscles)</span>
            </div>
            {expandedSections.muscles ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.muscles && (
            <div className={`pl-3 border-l mt-1 space-y-0.5 ${isDark ? 'border-slate-800' : 'border-[#e7ded3]'}`}>
              {/* TMJ Complex node */}
              <button
                id="tree_item_joint_tmj"
                onClick={() => handleItemSelect('joint_tmj')}
                className={`w-full text-left px-2 py-1.5 rounded text-[10px] flex items-center justify-between cursor-pointer font-semibold transition ${
                  selectedAnatomyId === 'joint_tmj' || selectedAnatomyId === 'specimen_tmj'
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : isDark
                    ? 'hover:bg-slate-800 text-amber-400'
                    : 'hover:bg-[#ede3d5]/60 text-amber-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-amber-500" />
                  <span>Khớp Thái Dương Hàm (TMJ)</span>
                </div>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30">
                  ĐỘNG HỌC
                </span>
              </button>

              <div className="pt-1 text-[9px] font-mono text-slate-400 px-1 uppercase">
                4 Cơ Nhai (Masticatory Muscles)
              </div>

              {MUSCLES_OF_MASTICATION.map((m) => {
                const isSelected = selectedAnatomyId === m.id;
                return (
                  <button
                    key={m.id}
                    id={`tree_item_${m.id}`}
                    onClick={() => handleItemSelect(m.id)}
                    className={`w-full text-left px-2 py-1 rounded text-[10px] flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : isDark
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-[#ede3d5]/60 text-slate-700'
                    }`}
                  >
                    <span>{m.nameVi}</span>
                    <span className="text-[9px] font-mono text-emerald-500">{m.latinName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
