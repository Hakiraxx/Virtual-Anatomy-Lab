import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Brain,
  Skull,
  Zap,
  Layers,
  Sparkles,
  Search,
  Eye,
  Activity
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  MUSCLES_OF_MASTICATION
} from '../../data/dentalNeuroData';

export const DentalNeuroTree: React.FC = () => {
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    cranial_nerves: true,
    cn_v: true,
    cn_v3: true,
    foramina: true,
    maxilla: false,
    mandible: true,
    muscles: false
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-80 h-full border-r border-slate-800 bg-[#0c121e]/95 backdrop-blur flex flex-col z-20 text-slate-200 select-none overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Cây Giải Phẫu Sọ Mặt
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">CRANIOFACIAL HIERARCHY</p>
          </div>
        </div>
      </div>

      {/* Scrollable Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs font-sans">
        {/* SECTION 1: CRANIAL NERVES */}
        <div>
          <button
            onClick={() => toggleSection('cranial_nerves')}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800/60 font-semibold text-amber-400"
          >
            <div className="flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              <span>12 Đôi Dây Thần Kinh Sọ</span>
            </div>
            {expandedSections.cranial_nerves ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.cranial_nerves && (
            <div className="pl-3 border-l border-slate-800 mt-1 space-y-0.5">
              {/* CN I - IV */}
              {['cn_1', 'cn_2', 'cn_3', 'cn_4'].map((id) => {
                const item = DENTAL_NERVE_STRUCTURES[id];
                if (!item) return null;
                const isSelected = selectedAnatomyId === id;
                return (
                  <button
                    key={id}
                    onClick={() => selectAnatomy(id)}
                    className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold'
                        : 'hover:bg-slate-800/50 text-slate-300'
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
                    onClick={() => selectAnatomy('cn_5')}
                    className={`flex-1 text-left px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 ${
                      selectedAnatomyId === 'cn_5'
                        ? 'bg-amber-600 text-white'
                        : 'text-amber-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>CN V — Thần kinh Sinh ba</span>
                  </button>
                  <button
                    onClick={() => toggleSection('cn_v')}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400"
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
                    {/* V1 OPHTHALMIC */}
                    <button
                      onClick={() => selectAnatomy('cn_5_v1')}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center gap-1.5 ${
                        selectedAnatomyId === 'cn_5_v1'
                          ? 'bg-sky-600 text-white font-bold'
                          : 'text-sky-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>V1 — Thần kinh Mắt</span>
                    </button>
                    <div className="pl-3 border-l border-sky-500/20 ml-2 space-y-0.5">
                      <button
                        onClick={() => selectAnatomy('nerve_frontal')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                          selectedAnatomyId === 'nerve_frontal'
                            ? 'bg-sky-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        · TK Trán (Frontal)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_supraorbital')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                          selectedAnatomyId === 'nerve_supraorbital'
                            ? 'bg-sky-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        · TK Trên ổ mắt (Supraorbital)
                      </button>
                    </div>

                    {/* V2 MAXILLARY */}
                    <button
                      onClick={() => selectAnatomy('cn_5_v2')}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center gap-1.5 ${
                        selectedAnatomyId === 'cn_5_v2'
                          ? 'bg-orange-600 text-white font-bold'
                          : 'text-orange-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span>V2 — Thần kinh Hàm trên</span>
                    </button>
                    <div className="pl-3 border-l border-orange-500/20 ml-2 space-y-0.5">
                      <button
                        onClick={() => selectAnatomy('nerve_infraorbital')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                          selectedAnatomyId === 'nerve_infraorbital'
                            ? 'bg-orange-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        · TK Dưới ổ mắt (Infraorbital)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_psa')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium ${
                          selectedAnatomyId === 'nerve_psa'
                            ? 'bg-orange-700 text-white'
                            : 'text-orange-200/90 hover:text-white'
                        }`}
                      >
                        · TK Huyệt răng trên sau (PSA)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_msa')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium ${
                          selectedAnatomyId === 'nerve_msa'
                            ? 'bg-orange-700 text-white'
                            : 'text-orange-200/90 hover:text-white'
                        }`}
                      >
                        · TK Huyệt răng trên giữa (MSA)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_asa')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium ${
                          selectedAnatomyId === 'nerve_asa'
                            ? 'bg-orange-700 text-white'
                            : 'text-orange-200/90 hover:text-white'
                        }`}
                      >
                        · TK Huyệt răng trên trước (ASA)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_greater_palatine')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                          selectedAnatomyId === 'nerve_greater_palatine'
                            ? 'bg-orange-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        · TK Khẩu cái lớn (Greater palatine)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_nasopalatine')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                          selectedAnatomyId === 'nerve_nasopalatine'
                            ? 'bg-orange-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        · TK Mũi khẩu cái (Nasopalatine)
                      </button>
                    </div>

                    {/* V3 MANDIBULAR */}
                    <button
                      onClick={() => selectAnatomy('cn_5_v3')}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center gap-1.5 font-bold ${
                        selectedAnatomyId === 'cn_5_v3'
                          ? 'bg-rose-600 text-white'
                          : 'text-rose-400 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>V3 — Thần kinh Hàm dưới</span>
                    </button>
                    <div className="pl-3 border-l border-rose-500/30 ml-2 space-y-0.5">
                      <button
                        onClick={() => selectAnatomy('nerve_ian')}
                        className={`w-full text-left px-2 py-1 rounded text-[10px] font-bold flex items-center justify-between ${
                          selectedAnatomyId === 'nerve_ian'
                            ? 'bg-rose-700 text-white shadow'
                            : 'text-rose-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>★ TK Huyệt răng dưới (IAN)</span>
                        <span className="text-[8px] bg-rose-950 px-1 rounded border border-rose-600/40">Ống hàm dưới</span>
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_mental')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium ${
                          selectedAnatomyId === 'nerve_mental'
                            ? 'bg-rose-700 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        · TK Cằm (Mental nerve)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_incisive')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-medium ${
                          selectedAnatomyId === 'nerve_incisive'
                            ? 'bg-rose-700 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        · TK Răng cửa (Incisive nerve)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_lingual')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] font-semibold ${
                          selectedAnatomyId === 'nerve_lingual'
                            ? 'bg-fuchsia-700 text-white'
                            : 'text-fuchsia-300 hover:text-white'
                        }`}
                      >
                        · TK Lưỡi (Lingual nerve)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_buccal')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                          selectedAnatomyId === 'nerve_buccal'
                            ? 'bg-purple-700 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        · TK Má (Buccal nerve)
                      </button>
                      <button
                        onClick={() => selectAnatomy('nerve_auriculotemporal')}
                        className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                          selectedAnatomyId === 'nerve_auriculotemporal'
                            ? 'bg-purple-700 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        · TK Tai thái dương (TMJ)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CN VII — FACIAL NERVE */}
              <div className="pt-1">
                <button
                  onClick={() => selectAnatomy('cn_7')}
                  className={`w-full text-left px-2 py-1 rounded text-[11px] font-bold flex items-center justify-between ${
                    selectedAnatomyId === 'cn_7'
                      ? 'bg-emerald-600 text-white'
                      : 'text-emerald-400 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>CN VII — Dây thần kinh Mặt</span>
                  </div>
                  <span className="text-[8px] bg-emerald-950 px-1 rounded border border-emerald-700">Mang tai</span>
                </button>
                <div className="pl-3 border-l border-emerald-500/20 ml-2 space-y-0.5 mt-0.5">
                  <button
                    onClick={() => selectAnatomy('cn_7_temporal')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                      selectedAnatomyId === 'cn_7_temporal' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    · Nhánh Thái dương (Temporal)
                  </button>
                  <button
                    onClick={() => selectAnatomy('cn_7_zygomatic')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                      selectedAnatomyId === 'cn_7_zygomatic' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    · Nhánh Gò má (Zygomatic)
                  </button>
                  <button
                    onClick={() => selectAnatomy('cn_7_buccal')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                      selectedAnatomyId === 'cn_7_buccal' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    · Nhánh Má (Buccal motor)
                  </button>
                  <button
                    onClick={() => selectAnatomy('cn_7_marginal_mandibular')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                      selectedAnatomyId === 'cn_7_marginal_mandibular' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    · Nhánh Bờ hàm dưới (Marginal mandibular)
                  </button>
                  <button
                    onClick={() => selectAnatomy('cn_7_cervical')}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] ${
                      selectedAnatomyId === 'cn_7_cervical' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    · Nhánh Cổ (Cervical)
                  </button>
                </div>
              </div>

              {/* CN IX, X, XI, XII */}
              {['cn_9', 'cn_10', 'cn_11', 'cn_12'].map((id) => {
                const item = DENTAL_NERVE_STRUCTURES[id];
                if (!item) return null;
                const isSelected = selectedAnatomyId === id;
                return (
                  <button
                    key={id}
                    onClick={() => selectAnatomy(id)}
                    className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold'
                        : 'hover:bg-slate-800/50 text-slate-300'
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

        {/* SECTION 2: CRANIAL FORAMINA LAB (14 KEY FORAMINA) */}
        <div>
          <button
            onClick={() => toggleSection('foramina')}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800/60 font-semibold text-sky-400"
          >
            <div className="flex items-center gap-1.5">
              <Skull className="w-3.5 h-3.5" />
              <span>Lỗ Sọ & Nền Sọ (Foramina)</span>
            </div>
            {expandedSections.foramina ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.foramina && (
            <div className="pl-3 border-l border-slate-800 mt-1 space-y-0.5">
              {Object.values(CRANIAL_FORAMINA).map((foramen) => {
                const isSelected = selectedAnatomyId === foramen.id;
                return (
                  <button
                    key={foramen.id}
                    onClick={() => selectAnatomy(foramen.id)}
                    className={`w-full text-left px-2 py-1 rounded text-[10px] flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-sky-600 text-white font-bold'
                        : 'hover:bg-slate-800/50 text-slate-300'
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
            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800/60 font-semibold text-rose-400"
          >
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Xương Hàm Dưới & Cung Răng Dưới</span>
            </div>
            {expandedSections.mandible ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.mandible && (
            <div className="pl-3 border-l border-slate-800 mt-1 space-y-0.5">
              <button
                onClick={() => selectAnatomy('mandibular_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-amber-300 hover:bg-slate-800"
              >
                · Lỗ hàm dưới & Gai Spix (Lingula)
              </button>
              <button
                onClick={() => selectAnatomy('nerve_ian')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-rose-300 font-medium hover:bg-slate-800"
              >
                · Ống hàm dưới & Thần kinh răng dưới
              </button>
              <button
                onClick={() => selectAnatomy('mental_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-sky-300 hover:bg-slate-800"
              >
                · Lỗ cằm & Thần kinh cằm
              </button>

              <div className="pt-1 text-[9px] font-mono text-slate-400 px-2 uppercase">
                Răng Hàm Dưới (FDI 31 - 38)
              </div>
              {DENTAL_INNERVATION_DATABASE.filter((t) => t.arch === 'mandibular').map((tooth) => {
                const toothId = `tooth_${tooth.fdi}`;
                const isSelected = selectedAnatomyId === toothId;
                return (
                  <button
                    key={tooth.fdi}
                    onClick={() => selectAnatomy(toothId)}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-600 text-white font-bold'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>R.{tooth.fdi} — {tooth.nameVi.split('(')[0]}</span>
                    <span className="text-[9px] font-mono text-rose-400/80">IAN</span>
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
            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800/60 font-semibold text-orange-400"
          >
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Xương Hàm Trên & Cung Răng Trên</span>
            </div>
            {expandedSections.maxilla ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.maxilla && (
            <div className="pl-3 border-l border-slate-800 mt-1 space-y-0.5">
              <button
                onClick={() => selectAnatomy('infraorbital_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-orange-300 hover:bg-slate-800"
              >
                · Lỗ dưới ổ mắt & Ống dưới ổ mắt
              </button>
              <button
                onClick={() => selectAnatomy('greater_palatine_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-amber-300 hover:bg-slate-800"
              >
                · Lỗ khẩu cái lớn (Vòm miệng)
              </button>
              <button
                onClick={() => selectAnatomy('incisive_foramen')}
                className="w-full text-left px-2 py-0.5 rounded text-[10px] text-yellow-300 hover:bg-slate-800"
              >
                · Lỗ răng cửa & Ống răng cửa
              </button>

              <div className="pt-1 text-[9px] font-mono text-slate-400 px-2 uppercase">
                Răng Hàm Trên (FDI 11 - 18)
              </div>
              {DENTAL_INNERVATION_DATABASE.filter((t) => t.arch === 'maxillary').map((tooth) => {
                const toothId = `tooth_${tooth.fdi}`;
                const isSelected = selectedAnatomyId === toothId;
                return (
                  <button
                    key={tooth.fdi}
                    onClick={() => selectAnatomy(toothId)}
                    className={`w-full text-left px-2 py-0.5 rounded text-[10px] flex items-center justify-between ${
                      isSelected
                        ? 'bg-orange-600 text-white font-bold'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>R.{tooth.fdi} — {tooth.nameVi.split('(')[0]}</span>
                    <span className="text-[9px] font-mono text-orange-400/80">
                      {tooth.toothType === 'molar' ? 'PSA' : tooth.toothType === 'premolar' ? 'MSA' : 'ASA'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 5: MUSCLES OF MASTICATION */}
        <div>
          <button
            onClick={() => toggleSection('muscles')}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800/60 font-semibold text-emerald-400"
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Cơ Nhai (Muscles of Mastication)</span>
            </div>
            {expandedSections.muscles ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {expandedSections.muscles && (
            <div className="pl-3 border-l border-slate-800 mt-1 space-y-0.5">
              {MUSCLES_OF_MASTICATION.map((m) => {
                const isSelected = selectedAnatomyId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => selectAnatomy(m.id)}
                    className={`w-full text-left px-2 py-1 rounded text-[10px] flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>{m.nameVi}</span>
                    <span className="text-[9px] font-mono text-emerald-400">{m.latinName}</span>
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
