import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Camera,
  ArrowRight,
  ArrowLeft,
  X,
  Waypoints
} from 'lucide-react';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { resolveLegacyId } from '../../data/AnatomyAssetRegistry';

export interface TraceNode {
  id: string;              // Canonical ID
  nameVi: string;
  nameEn: string;
  type: 'nerve' | 'foramen' | 'canal' | 'tooth' | 'ganglion';
  descriptionVi: string;
  descriptionEn: string;
  clinicalNoteVi?: string;
  clinicalNoteEn?: string;
}

export interface TracePathway {
  id: string;
  titleVi: string;
  titleEn: string;
  category: string;
  nodes: TraceNode[];
}

export const TRACE_PATHWAYS: TracePathway[] = [
  {
    id: 'trigeminal_ian_pathway',
    titleVi: 'Đường đi Thần Kinh Răng Dưới (CN V3 → IAN → Thần kinh Cằm)',
    titleEn: 'Trigeminal Mandibular Pathway (CN V3 → IAN → Mental Nerve)',
    category: 'Thần kinh Sọ Mặt RHM',
    nodes: [
      {
        id: 'nerve.trigeminal',
        nameVi: 'Dây thần kinh sinh ba (CN V)',
        nameEn: 'Trigeminal Nerve (CN V)',
        type: 'nerve',
        descriptionVi: 'Thoát ra từ mặt trước bên của cầu não với hai rễ: rễ cảm giác lớn và rễ vận động nhỏ.',
        descriptionEn: 'Emerges from the ventrolateral pons with a large sensory and small motor root.',
        clinicalNoteVi: 'Rễ cảm giác phình ra tạo thành hạch sinh ba (Gasser) nằm trong hõm Meckel.',
        clinicalNoteEn: 'Sensory root expands into trigeminal ganglion in Meckel cave.'
      },
      {
        id: 'foramen.ovale',
        nameVi: 'Lỗ bầu dục (Foramen Ovale)',
        nameEn: 'Foramen Ovale',
        type: 'foramen',
        descriptionVi: 'Lỗ hình oval nằm ở cánh lớn xương bướm, nối hố sọ giữa với hố dưới thái dương.',
        descriptionEn: 'Oval aperture in the greater wing of sphenoid connecting middle cranial fossa to infratemporal fossa.',
        clinicalNoteVi: 'Toàn bộ rễ thần kinh hàm dưới (V3) thoát khỏi hộp sọ qua lỗ này.',
        clinicalNoteEn: 'Transmits mandibular nerve (V3), accessory meningeal artery, and lesser petrosal nerve.'
      },
      {
        id: 'nerve.v3',
        nameVi: 'Thần kinh hàm dưới (V3)',
        nameEn: 'Mandibular Nerve (V3)',
        type: 'nerve',
        descriptionVi: 'Thân chính của V3 đi vào hố dưới thái dương trước khi chia thành thân trước và thân sau.',
        descriptionEn: 'Main trunk enters infratemporal fossa dividing into anterior and posterior divisions.',
        clinicalNoteVi: 'Vị trí gây tê vùng toàn bộ V3 theo kỹ thuật Gow-Gates (tại cổ lồi cầu).',
        clinicalNoteEn: 'Target site for Gow-Gates mandibular conduction block.'
      },
      {
        id: 'foramen.mandibular',
        nameVi: 'Lỗ hàm dưới & Gai Spix',
        nameEn: 'Mandibular Foramen & Lingula',
        type: 'foramen',
        descriptionVi: 'Lỗ nằm ở mặt trong cành cao xương hàm dưới, được che chắn bởi gai Spix (Lingula).',
        descriptionEn: 'Located on medial surface of ramus, guarded anteriorly by the lingula.',
        clinicalNoteVi: 'Mốc giải phẫu then chốt để thực hiện gây tê thần kinh răng dưới cổ điển (Spix block).',
        clinicalNoteEn: 'Crucial landmark for inferior alveolar nerve block (Spix block).'
      },
      {
        id: 'canal.mandibular',
        nameVi: 'Ống hàm dưới (Mandibular Canal)',
        nameEn: 'Mandibular Canal',
        type: 'canal',
        descriptionVi: 'Ống xương chạy uốn cong trong thân xương hàm dưới từ lỗ hàm dưới ra trước đến lỗ cằm.',
        descriptionEn: 'Bony canal coursing through mandibular body from mandibular to mental foramen.',
        clinicalNoteVi: 'Chạy sát ngay dưới chóp chân răng 48/38, nguy cơ tổn thương cao khi nhổ răng khôn.',
        clinicalNoteEn: 'Runs adjacent to roots of third molars; high risk zone in wisdom tooth surgery.'
      },
      {
        id: 'nerve.inferior_alveolar',
        nameVi: 'Thần kinh huyệt răng dưới (IAN)',
        nameEn: 'Inferior Alveolar Nerve (IAN)',
        type: 'nerve',
        descriptionVi: 'Chạy trong ống hàm dưới, phát ra đám rối răng dưới chi phối tủy và nha chu các răng hàm dưới.',
        descriptionEn: 'Traverses canal giving off inferior dental plexus supplying all mandibular teeth.',
        clinicalNoteVi: 'Tổn thương gây tê bì vĩnh viễn hoặc tạm thời nửa môi dưới và cằm cùng bên.',
        clinicalNoteEn: 'Damage causes paresthesia or anesthesia of ipsilateral lower lip and chin.'
      },
      {
        id: 'foramen.mental',
        nameVi: 'Lỗ cằm (Mental Foramen)',
        nameEn: 'Mental Foramen',
        type: 'foramen',
        descriptionVi: 'Lỗ ở mặt ngoài thân xương hàm dưới, thường nằm ngang mức giữa chóp chân răng 44-45 hoặc 34-35.',
        descriptionEn: 'Opening on anterolateral mandibular body below premolar apices.',
        clinicalNoteVi: 'Điểm thoát ra của bó mạch thần kinh cằm, mốc gây tê lỗ cằm.',
        clinicalNoteEn: 'Mental neurovascular bundle exits here; landmark for mental nerve block.'
      },
      {
        id: 'nerve.mental',
        nameVi: 'Thần kinh cằm (Mental Nerve)',
        nameEn: 'Mental Nerve',
        type: 'nerve',
        descriptionVi: 'Nhánh tận cùng của IAN chi phối cảm giác da cằm, môi dưới và niêm mạc ngách tiền đình trước.',
        descriptionEn: 'Terminal branch supplying sensory innervation to chin, lower lip, and labial mucosa.',
        clinicalNoteVi: 'Cần bảo tồn cẩn trọng khi thực hiện vạt phẫu thuật vùng răng cối nhỏ và răng nanh.',
        clinicalNoteEn: 'Must be preserved during flap reflection in the premolar/canine region.'
      }
    ]
  },
  {
    id: 'trigeminal_v2_pathway',
    titleVi: 'Đường đi Thần Kinh Hàm Trên (CN V2 → Dưới Ổ Mắt)',
    titleEn: 'Trigeminal Maxillary Pathway (CN V2 → Infraorbital)',
    category: 'Thần kinh Sọ Mặt',
    nodes: [
      {
        id: 'nerve.trigeminal',
        nameVi: 'Dây thần kinh sinh ba (CN V)',
        nameEn: 'Trigeminal Nerve',
        type: 'nerve',
        descriptionVi: 'Rễ cảm giác phình ra tạo hạch sinh ba.',
        descriptionEn: 'Sensory root forms trigeminal ganglion.'
      },
      {
        id: 'foramen.rotundum',
        nameVi: 'Lỗ tròn (Foramen Rotundum)',
        nameEn: 'Foramen Rotundum',
        type: 'foramen',
        descriptionVi: 'Lỗ nằm ở cánh lớn xương bướm nối hố sọ giữa vào hố chân bướm khẩu cái.',
        descriptionEn: 'Connects middle cranial fossa to pterygopalatine fossa.'
      },
      {
        id: 'nerve.v2',
        nameVi: 'Thần kinh hàm trên (V2)',
        nameEn: 'Maxillary Nerve (V2)',
        type: 'nerve',
        descriptionVi: 'Đi qua hố chân bướm khẩu cái, phát các nhánh răng trên và tiếp tục thành TK dưới ổ mắt.',
        descriptionEn: 'Crosses pterygopalatine fossa, giving superior alveolar nerves and infraorbital nerve.'
      }
    ]
  }
];

export const AnatomyTraceController: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('trigeminal_ian_pathway');
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 1x or 2x
  const [direction, setDirection] = useState<'proximal_to_distal' | 'distal_to_proximal'>('proximal_to_distal');
  const [isFollowCamera, setIsFollowCamera] = useState<boolean>(true);

  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const timerRef = useRef<number | null>(null);

  const currentPathway = TRACE_PATHWAYS.find((p) => p.id === selectedPathwayId) || TRACE_PATHWAYS[0];
  const totalNodes = currentPathway.nodes.length;
  const currentNode = currentPathway.nodes[currentNodeIndex];

  // Synchronize selection and camera when node changes
  useEffect(() => {
    if (!isOpen || !currentNode) return;

    // Convert canonical ID to legacy ID for dental store
    const legacyId = resolveLegacyId(currentNode.id);
    selectAnatomy(legacyId);
  }, [currentNodeIndex, selectedPathwayId, isOpen, selectAnatomy, currentNode]);

  // Automated playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = (1800 / playbackSpeed);
    timerRef.current = window.setInterval(() => {
      setCurrentNodeIndex((prev) => {
        if (direction === 'proximal_to_distal') {
          if (prev >= totalNodes - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            setIsPlaying(false);
            return prev;
          }
          return prev - 1;
        }
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalNodes, direction, playbackSpeed]);

  if (!isOpen) return null;

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentNodeIndex < totalNodes - 1) {
      setCurrentNodeIndex((i) => i + 1);
    }
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    if (currentNodeIndex > 0) {
      setCurrentNodeIndex((i) => i - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentNodeIndex(direction === 'proximal_to_distal' ? 0 : totalNodes - 1);
  };

  const toggleDirection = () => {
    setDirection((d) => (d === 'proximal_to_distal' ? 'distal_to_proximal' : 'proximal_to_distal'));
  };

  return (
    <div
      className={`fixed bottom-16 left-4 sm:left-1/2 sm:-translate-x-1/2 z-40 w-[calc(100%-2rem)] sm:w-[580px] max-w-full rounded-2xl border shadow-2xl backdrop-blur-xl transition-all select-none animate-fade-in ${
        isDark
          ? 'bg-slate-900/95 border-slate-700/80 text-slate-100'
          : 'bg-white/95 border-[#e2d8cb] text-[#28231d]'
      }`}
    >
      {/* 1. Header & Pathway Switcher */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-inherit bg-black/5 dark:bg-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <Waypoints className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold font-serif tracking-tight uppercase">
              Hệ Thống Dò Đường Giải Phẫu (Anatomy Trace)
            </span>
            <span className="text-[9px] font-mono ml-2 px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
              REAL 3D PATH
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-current hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
          title="Đóng trình dò đường"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Pathway Selector Dropdown */}
      <div className="px-4 pt-2.5 flex items-center justify-between gap-2">
        <select
          value={selectedPathwayId}
          onChange={(e) => {
            setSelectedPathwayId(e.target.value);
            setCurrentNodeIndex(0);
            setIsPlaying(false);
          }}
          className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none flex-1 truncate ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-slate-50 border-[#dfd4c4] text-slate-800'
          }`}
        >
          {TRACE_PATHWAYS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.titleVi}
            </option>
          ))}
        </select>

        {/* Direction Toggle (Proximal <-> Distal) */}
        <button
          onClick={toggleDirection}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition cursor-pointer flex-shrink-0 ${
            direction === 'proximal_to_distal'
              ? 'bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400'
              : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          }`}
          title="Đổi chiều di chuyển: Gần tâm (Proximal) ↔ Xa tâm (Distal)"
        >
          {direction === 'proximal_to_distal' ? (
            <>
              <ArrowRight className="w-3 h-3" />
              <span>Gần → Xa (Distal)</span>
            </>
          ) : (
            <>
              <ArrowLeft className="w-3 h-3" />
              <span>Xa → Gần (Proximal)</span>
            </>
          )}
        </button>
      </div>

      {/* 3. Progress Step Indicator */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
          <span>
            Mốc {currentNodeIndex + 1} / {totalNodes}:{' '}
            <strong className="text-amber-500">{currentNode.nameVi}</strong>
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            {currentNode.type}
          </span>
        </div>

        {/* Step Nodes Track */}
        <div className="flex items-center gap-1 w-full">
          {currentPathway.nodes.map((node, idx) => {
            const isCurrent = idx === currentNodeIndex;
            const isPassed =
              direction === 'proximal_to_distal'
                ? idx <= currentNodeIndex
                : idx >= currentNodeIndex;

            return (
              <button
                key={node.id}
                onClick={() => {
                  setCurrentNodeIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex-1 h-2 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 ring-2 ring-amber-500/40 h-2.5'
                    : isPassed
                    ? 'bg-amber-600/60'
                    : isDark
                    ? 'bg-slate-800'
                    : 'bg-slate-200'
                }`}
                title={`${idx + 1}. ${node.nameVi}`}
              />
            );
          })}
        </div>
      </div>

      {/* 4. Active Node Detail Card */}
      <div className="px-4 pb-2.5">
        <div
          className={`p-3 rounded-xl border text-xs leading-relaxed ${
            isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-[#f7f1e8] border-[#e4d9ca]'
          }`}
        >
          <div className="font-semibold text-current mb-0.5">{currentNode.descriptionVi}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-serif italic mb-1">
            {currentNode.descriptionEn}
          </div>
          {currentNode.clinicalNoteVi && (
            <div className="mt-1 pt-1 border-t border-inherit text-[11px] text-rose-600 dark:text-rose-400">
              <strong>Ý nghĩa lâm sàng:</strong> {currentNode.clinicalNoteVi}
            </div>
          )}
        </div>
      </div>

      {/* 5. Trace Playback Controls Bar */}
      <div className="px-4 py-2 border-t border-inherit flex items-center justify-between bg-black/5 dark:bg-white/5">
        <div className="flex items-center gap-1">
          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer text-slate-400 hover:text-current"
            title="Đặt lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Step Back */}
          <button
            onClick={handleStepBack}
            disabled={currentNodeIndex === 0}
            className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer disabled:opacity-40"
            title="Lùi một mốc"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg border font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                : 'bg-amber-500 text-slate-950 font-bold border-amber-400 hover:bg-amber-400'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Tạm dừng' : 'Chạy tự động'}</span>
          </button>

          {/* Step Forward */}
          <button
            onClick={handleStepForward}
            disabled={currentNodeIndex === totalNodes - 1}
            className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer disabled:opacity-40"
            title="Tiến một mốc"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => setPlaybackSpeed((s) => (s === 1 ? 2 : 1))}
            className="px-2 py-1 rounded-lg border text-[11px] font-mono font-bold hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer text-slate-400 hover:text-current ml-1"
            title="Đổi tốc độ phát (1x / 2x)"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Follow Camera Toggle */}
        <button
          onClick={() => setIsFollowCamera(!isFollowCamera)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
            isFollowCamera
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
              : 'text-slate-400 border-transparent hover:border-inherit'
          }`}
          title="Camera tự động bay đến căn góc nhìn cận cảnh cấu trúc đang trace"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Theo Camera</span>
        </button>
      </div>
    </div>
  );
};
