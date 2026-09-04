import { create } from 'zustand';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  CLINICAL_ANESTHESIA_TECHNIQUES
} from '../data/dentalNeuroData';

export type VisualizationDepth = 'surface' | 'skeletal' | 'neural' | 'dental' | 'deep';
export type SpecimenMode = 'general' | 'tooth_specimen' | 'tmj_specimen' | 'wisdom_surgery';

export interface CraniofacialQuizQuestion {
  id: string;
  questionVi: string;
  questionEn: string;
  targetAnatomyId: string;
  targetType: 'nerve' | 'foramen' | 'tooth' | 'muscle';
  hintVi: string;
  hintEn: string;
  explanationVi: string;
  explanationEn: string;
}

export const CRANIOFACIAL_QUIZ_QUESTIONS: CraniofacialQuizQuestion[] = [
  {
    id: 'quiz_1',
    questionVi: 'Chỉ ra lỗ nơi dây thần kinh Hàm dưới (V3) thoát ra khỏi hố sọ giữa vào hố dưới thái dương?',
    questionEn: 'Identify the foramen where the Mandibular nerve (V3) exits the middle cranial fossa?',
    targetAnatomyId: 'foramen_ovale',
    targetType: 'foramen',
    hintVi: 'Lỗ có hình bầu dục nằm ở cánh lớn xương bướm.',
    hintEn: 'An oval-shaped foramen in the greater wing of sphenoid.',
    explanationVi: 'Lỗ bầu dục (Foramen ovale) là lỗ ở cánh lớn xương bướm cho dây V3, động mạch màng não phụ và thần kinh đá bé đi qua.',
    explanationEn: 'Foramen ovale transmits the mandibular nerve (CN V3), accessory meningeal artery, and lesser petrosal nerve.'
  },
  {
    id: 'quiz_2',
    questionVi: 'Xác định dây thần kinh chạy trong ống hàm dưới chi phối cảm giác cho toàn bộ răng hàm dưới?',
    questionEn: 'Identify the nerve running through the mandibular canal providing sensory innervation to all lower teeth?',
    targetAnatomyId: 'nerve_ian',
    targetType: 'nerve',
    hintVi: 'Dây thần kinh này đi vào lỗ hàm dưới được che chắn bởi Gai Spix (Lingula).',
    hintEn: 'This nerve enters the mandibular foramen guarded by the lingula.',
    explanationVi: 'Thần kinh huyệt răng dưới (Inferior Alveolar Nerve - IAN) chạy trong ống hàm dưới, chi phối tủy và nha chu tất cả các răng hàm dưới.',
    explanationEn: 'The Inferior Alveolar Nerve (IAN) traverses the mandibular canal supplying pulp and periodontium of all mandibular teeth.'
  },
  {
    id: 'quiz_3',
    questionVi: 'Nhánh tận cùng của thần kinh huyệt răng dưới chui ra ngoài xương hàm dưới qua lỗ nào?',
    questionEn: 'Through which foramen does the terminal branch of the inferior alveolar nerve emerge onto the face?',
    targetAnatomyId: 'mental_foramen',
    targetType: 'foramen',
    hintVi: 'Lỗ nằm ở mặt ngoài xương hàm dưới, ngay dưới chóp các răng cối nhỏ.',
    hintEn: 'Located on the lateral body of the mandible beneath the premolar apices.',
    explanationVi: 'Lỗ cằm (Mental foramen) cho thần kinh cằm và mạch máu cằm chui ra chi phối da cằm và môi dưới.',
    explanationEn: 'Mental foramen transmits the mental nerve and vessels to supply the chin and lower lip.'
  },
  {
    id: 'quiz_4',
    questionVi: 'Dây thần kinh nào có nguy cơ tổn thương cao nhất khi nhổ phẫu thuật răng khôn hàm dưới (răng 38/48)?',
    questionEn: 'Which nerve is at highest risk of iatrogenic injury during mandibular 3rd molar surgical extraction?',
    targetAnatomyId: 'nerve_lingual',
    targetType: 'nerve',
    hintVi: 'Dây này chạy rất sát bản xương mặt trong (lingual plate) vùng răng số 8 dưới.',
    hintEn: 'Runs adjacent to the lingual cortical plate near the mandibular 3rd molar.',
    explanationVi: 'Thần kinh lưỡi (Lingual nerve) đi sát mặt trong bờ xương hàm dưới vùng răng khôn, tổn thương gây tê bì và mất vị giác 2/3 trước lưỡi.',
    explanationEn: 'Lingual nerve is in close proximity to the lingual plate near 3rd molars; damage causes numbness and taste loss in anterior 2/3 tongue.'
  },
  {
    id: 'quiz_5',
    questionVi: 'Dây thần kinh Mặt (CN VII) thoát ra ngoài hộp sọ qua lỗ nào trước khi đi vào tuyến mang tai?',
    questionEn: 'Through which foramen does the Facial Nerve (CN VII) exit the cranium before entering the parotid gland?',
    targetAnatomyId: 'stylomastoid_foramen',
    targetType: 'foramen',
    hintVi: 'Lỗ nằm giữa mỏm trâm và mỏm chũm xương thái dương.',
    hintEn: 'Located between styloid and mastoid processes of temporal bone.',
    explanationVi: 'Lỗ trâm chũm (Stylomastoid foramen) là nơi dây VII thoát ra ngoài sọ rồi phân 5 nhánh vận động cơ mặt trong tuyến mang tai.',
    explanationEn: 'Stylomastoid foramen provides exit for CN VII, which subsequently branches within the parotid gland.'
  }
];

interface DentalNeuroState {
  // Selection & Focus
  selectedAnatomyId: string | null;
  focusedAnatomyId: string | null;
  hoveredAnatomyId: string | null;

  // Camera glide
  cameraTarget: {
    position: [number, number, number];
    lookAt: [number, number, number];
    distance: number;
    timestamp: number;
  } | null;

  // Nerve Tracing Animation
  activeNerveTraceId: string | null;
  traceProgress: number; // 0.0 to 1.0
  tracePlaybackState: 'playing' | 'paused' | 'stopped';
  showDirectionalFlow: boolean;

  // Visualization Presets & Depth
  visualizationDepth: VisualizationDepth;

  // 13-Layer Craniofacial Dissection Engine
  layerVisibility: Record<number, boolean>;
  layerOpacity: Record<number, number>;

  // Specialized Clinical Modes
  isRadiographicView: boolean;
  isMandibularCanalMode: boolean;
  isAnesthesiaMode: boolean;
  activeAnesthesiaId: string | null;
  // Clinical Lateralization & Marker Controls
  lateralizationSide: 'bilateral' | 'right' | 'left';
  selectedSide: 'right' | 'left' | null;
  showForaminaMarkers: boolean;
  showTeethMarkers: boolean;
  clippingPlane: {
    enabled: boolean;
    axis: 'x' | 'y' | 'z';
    offset: number;
  };

  // Interactive 3D Quiz
  quizMode: boolean;
  currentQuizIndex: number;
  quizScore: number;
  quizAnswered: boolean;
  quizFeedback: {
    correct: boolean;
    messageVi: string;
    messageEn: string;
  } | null;

  // Specialized Specimen Modes
  activeSpecimenMode: SpecimenMode;

  // 1. Tooth Specimen State
  selectedToothFdi: number;
  toothCrossSection: 'solid' | 'longitudinal' | 'pulp_isolated';
  toothEnamelOpacity: number;
  toothShowPdl: boolean;

  // 2. TMJ Specimen State
  tmjJawState: number; // 0.0 to 1.0 (opening percentage)
  tmjMotionMode: 'opening' | 'protrusion' | 'lateral';
  tmjPathology: 'normal' | 'tmd_reduction' | 'tmd_non_reduction' | 'tmd_dislocation';
  tmjShowMuscles: boolean;
  tmjShowLigaments: boolean;
  tmjActiveMuscleId: string | null;

  // 3. Wisdom Surgery Specimen State
  wisdomToothId: 'tooth_38' | 'tooth_48';
  wisdomWinterType: 'mesioangular' | 'horizontal' | 'vertical' | 'distoangular';
  wisdomPellGregoryClass: 'I' | 'II' | 'III';
  wisdomPellGregoryPos: 'A' | 'B' | 'C';
  wisdomSurgicalStep: number; // 1 to 6
  wisdomShowNerves: boolean;
  wisdomBoneOpacity: number;

  // Actions
  selectAnatomy: (id: string | null, side?: 'right' | 'left' | null) => void;
  focusAnatomy: (id: string) => void;
  setHoveredAnatomy: (id: string | null) => void;
  setLateralizationSide: (side: 'bilateral' | 'right' | 'left') => void;
  setVisualizationDepth: (depth: VisualizationDepth) => void;
  setLayerVisibility: (layerIndex: number, visible: boolean) => void;
  setLayerOpacity: (layerIndex: number, opacity: number) => void;
  toggleRadiographicView: () => void;
  toggleMandibularCanalMode: () => void;
  toggleAnesthesiaMode: () => void;
  setActiveAnesthesia: (id: string | null) => void;
  toggleForaminaMarkers: () => void;
  toggleTeethMarkers: () => void;
  toggleDirectionalFlow: () => void;
  setClippingPlane: (update: Partial<DentalNeuroState['clippingPlane']>) => void;
  setCameraTarget: (
    position: [number, number, number],
    lookAt: [number, number, number],
    distance?: number
  ) => void;

  // Specimen Actions
  setActiveSpecimenMode: (mode: SpecimenMode) => void;
  setSelectedToothFdi: (fdi: number) => void;
  setToothCrossSection: (mode: 'solid' | 'longitudinal' | 'pulp_isolated') => void;
  setToothEnamelOpacity: (opacity: number) => void;
  setToothShowPdl: (show: boolean) => void;
  setTmjJawState: (progress: number) => void;
  setTmjMotionMode: (mode: 'opening' | 'protrusion' | 'lateral') => void;
  setTmjPathology: (pathology: 'normal' | 'tmd_reduction' | 'tmd_non_reduction' | 'tmd_dislocation') => void;
  setTmjShowMuscles: (show: boolean) => void;
  setTmjShowLigaments: (show: boolean) => void;
  setTmjActiveMuscleId: (id: string | null) => void;
  setWisdomToothId: (id: 'tooth_38' | 'tooth_48') => void;
  setWisdomWinterType: (type: 'mesioangular' | 'horizontal' | 'vertical' | 'distoangular') => void;
  setWisdomPellGregoryClass: (c: 'I' | 'II' | 'III') => void;
  setWisdomPellGregoryPos: (pos: 'A' | 'B' | 'C') => void;
  setWisdomSurgicalStep: (step: number) => void;
  setWisdomShowNerves: (show: boolean) => void;
  setWisdomBoneOpacity: (opacity: number) => void;

  // Tracing controls
  startTrace: (nerveId: string) => void;
  pauseTrace: () => void;
  resumeTrace: () => void;
  resetTrace: () => void;
  setTraceProgress: (progress: number) => void;

  // Quiz actions
  startQuiz: () => void;
  submitQuizAnswer: (selectedId: string) => void;
  nextQuizQuestion: () => void;
  exitQuiz: () => void;

  // Reset all
  resetAll: () => void;
}

export const useDentalNeuroStore = create<DentalNeuroState>((set, get) => ({
  selectedAnatomyId: 'cn_5',
  focusedAnatomyId: null,
  hoveredAnatomyId: null,
  cameraTarget: null,

  activeNerveTraceId: null,
  traceProgress: 0,
  tracePlaybackState: 'stopped',
  showDirectionalFlow: true,

  visualizationDepth: 'neural',

  // 13 Layers:
  // 1: Skin, 2: Superficial fascia, 3: Facial muscles, 4: Skull, 5: Deep structures
  // 6: Cranial nerves, 7: Arteries, 8: Veins, 9: Salivary glands, 10: Teeth
  // 11: Jaw bones (Maxilla/Mandible), 12: TMJ, 13: Brain / Brainstem
  layerVisibility: {
    1: false, // Skin
    2: false, // Superficial fascia
    3: false, // Facial muscles
    4: true,  // Skull
    5: false, // Deep facial structures
    6: true,  // Cranial nerves
    7: false, // Arteries
    8: false, // Veins
    9: false, // Salivary glands (disabled by default in neuro lab for crystal-clear visualization)
    10: true, // Teeth
    11: true, // Jaw bones
    12: true, // TMJ
    13: true  // Brain / Brainstem
  },
  layerOpacity: {
    1: 0.15,
    2: 0.20,
    3: 0.35,
    4: 0.40,
    5: 0.50,
    6: 1.00,
    7: 0.85,
    8: 0.85,
    9: 0.60,
    10: 0.90,
    11: 0.50,
    12: 0.70,
    13: 0.75
  },

  isRadiographicView: false,
  isMandibularCanalMode: false,
  isAnesthesiaMode: false,
  activeAnesthesiaId: null,

  // Specimen Modes Default Values
  activeSpecimenMode: 'general',
  selectedToothFdi: 46,
  toothCrossSection: 'longitudinal',
  toothEnamelOpacity: 0.65,
  toothShowPdl: true,
  tmjJawState: 0.0,
  tmjMotionMode: 'opening',
  tmjPathology: 'normal',
  tmjShowMuscles: true,
  tmjShowLigaments: true,
  tmjActiveMuscleId: null,
  wisdomToothId: 'tooth_48',
  wisdomWinterType: 'mesioangular',
  wisdomPellGregoryClass: 'II',
  wisdomPellGregoryPos: 'B',
  wisdomSurgicalStep: 1,
  wisdomShowNerves: true,
  wisdomBoneOpacity: 0.45,

  lateralizationSide: 'bilateral',
  selectedSide: 'right',
  showForaminaMarkers: false, // Default false: clinical view without artificial locator rings
  showTeethMarkers: false, // Disabled by default to prevent floating spheres clutter
  clippingPlane: {
    enabled: false,
    axis: 'y',
    offset: 0
  },

  quizMode: false,
  currentQuizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  quizFeedback: null,

  selectAnatomy: (id, side = null) => {
    let updates: Partial<DentalNeuroState> = {};
    if (id?.startsWith('tooth_')) {
      const fdi = parseInt(id.replace('tooth_', ''), 10);
      if (!isNaN(fdi)) {
        const autoSide: 'right' | 'left' =
          (fdi >= 11 && fdi <= 18) || (fdi >= 41 && fdi <= 48) ? 'right' : 'left';
        updates = {
          selectedToothFdi: fdi,
          wisdomToothId: fdi === 38 ? 'tooth_38' : fdi === 48 ? 'tooth_48' : get().wisdomToothId,
          selectedSide: side || autoSide
        };
        // If currently on TMJ, auto switch to tooth_specimen
        if (get().activeSpecimenMode === 'tmj_specimen') {
          updates.activeSpecimenMode = 'tooth_specimen';
        }
      }
    } else if (id === 'joint_tmj' || id === 'specimen_tmj' || id === 'caput-mandibulae' || id?.startsWith('muscle_')) {
      updates = {
        activeSpecimenMode: 'tmj_specimen',
        tmjActiveMuscleId: id?.startsWith('muscle_') ? id : null,
        tmjShowMuscles: true,
        tmjShowLigaments: true,
        selectedSide: 'right'
      };
    } else if (id?.startsWith('cn_') || id?.startsWith('nerve_') || id?.includes('foramen')) {
      // If user selected a cranial nerve or foramen, switch back to general neuro mode
      if (get().activeSpecimenMode !== 'general') {
        updates.activeSpecimenMode = 'general';
      }
    }

    set({
      selectedAnatomyId: id,
      selectedSide: side || updates.selectedSide || (id ? get().selectedSide || 'right' : null),
      ...updates
    });
    if (id) {
      get().focusAnatomy(id);
    }
  },

  setLateralizationSide: (side) => {
    set({ lateralizationSide: side });
  },

  focusAnatomy: (id) => {
    set({ focusedAnatomyId: id });

    // Look for structure in nerves
    const nerve = DENTAL_NERVE_STRUCTURES[id];
    if (nerve && nerve.cameraFocus) {
      set({
        cameraTarget: {
          position: nerve.cameraFocus.position,
          lookAt: nerve.cameraFocus.lookAt,
          distance: nerve.cameraFocus.distance,
          timestamp: Date.now()
        }
      });
      return;
    }

    // Look for TMJ or masticatory muscles
    if (id === 'joint_tmj' || id === 'specimen_tmj' || id?.startsWith('muscle_')) {
      set({
        cameraTarget: {
          position: [-0.095, 1.375, 0.125],
          lookAt: [-0.046, 1.366, 0.068],
          distance: 0.14,
          timestamp: Date.now()
        }
      });
      return;
    }

    // Look for structure in foramina
    const foramen = CRANIAL_FORAMINA[id];
    if (foramen && foramen.cameraFocus) {
      set({
        cameraTarget: {
          position: foramen.cameraFocus.position,
          lookAt: foramen.cameraFocus.lookAt,
          distance: 0.22,
          timestamp: Date.now()
        }
      });
      return;
    }

    // Look for structure in teeth
    const tooth = DENTAL_INNERVATION_DATABASE.find(
      (t) => `tooth_${t.fdi}` === id || `tooth_${t.universalNumber}` === id
    );
    if (tooth) {
      set({
        cameraTarget: {
          position: [tooth.position3D[0] * 1.5, tooth.position3D[1] + 0.05, tooth.position3D[2] + 0.18],
          lookAt: tooth.position3D,
          distance: 0.18,
          timestamp: Date.now()
        }
      });
      return;
    }

    // Default framing
    set({
      cameraTarget: {
        position: [0, 1.38, 0.45],
        lookAt: [0, 1.34, 0.10],
        distance: 0.45,
        timestamp: Date.now()
      }
    });
  },

  setHoveredAnatomy: (id) => set({ hoveredAnatomyId: id }),

  setVisualizationDepth: (depth) => {
    set({ visualizationDepth: depth });
    if (depth === 'surface') {
      set({
        layerVisibility: {
          1: true, 2: true, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false
        },
        layerOpacity: {
          1: 0.95, 2: 0.6, 3: 0.8, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0
        },
        isRadiographicView: false,
        isMandibularCanalMode: false
      });
    } else if (depth === 'skeletal') {
      set({
        layerVisibility: {
          1: false, 2: false, 3: false, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10: true, 11: true, 12: true, 13: false
        },
        layerOpacity: {
          1: 0, 2: 0, 3: 0, 4: 1.0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 1.0, 11: 1.0, 12: 1.0, 13: 0
        },
        isRadiographicView: false,
        isMandibularCanalMode: false
      });
    } else if (depth === 'neural') {
      set({
        layerVisibility: {
          1: false, 2: false, 3: false, 4: true, 5: false, 6: true, 7: false, 8: false, 9: true, 10: true, 11: true, 12: true, 13: true
        },
        layerOpacity: {
          1: 0, 2: 0, 3: 0, 4: 0.40, 5: 0, 6: 1.0, 7: 0, 8: 0, 9: 0.70, 10: 0.95, 11: 0.75, 12: 0.85, 13: 0.70
        },
        isRadiographicView: false,
        isMandibularCanalMode: false
      });
    } else if (depth === 'dental') {
      set({
        layerVisibility: {
          1: false, 2: false, 3: false, 4: false, 5: false, 6: true, 7: false, 8: false, 9: false, 10: true, 11: true, 12: true, 13: false
        },
        layerOpacity: {
          1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1.0, 7: 0, 8: 0, 9: 0, 10: 1.0, 11: 0.85, 12: 0.90, 13: 0
        },
        isRadiographicView: false,
        isMandibularCanalMode: false
      });
    } else if (depth === 'deep') {
      set({
        layerVisibility: {
          1: false, 2: false, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true, 13: true
        },
        layerOpacity: {
          1: 0, 2: 0, 3: 0, 4: 0.25, 5: 0.5, 6: 1.0, 7: 0.8, 8: 0.8, 9: 0.7, 10: 1.0, 11: 0.50, 12: 0.7, 13: 0.65
        },
        isRadiographicView: true,
        isMandibularCanalMode: false
      });
    }
  },

  setLayerVisibility: (layerIndex, visible) =>
    set((s) => ({ layerVisibility: { ...s.layerVisibility, [layerIndex]: visible } })),

  setLayerOpacity: (layerIndex, opacity) =>
    set((s) => ({ layerOpacity: { ...s.layerOpacity, [layerIndex]: opacity } })),

  toggleRadiographicView: () =>
    set((s) => {
      const next = !s.isRadiographicView;
      return {
        isRadiographicView: next,
        layerOpacity: {
          ...s.layerOpacity,
          4: next ? 0.20 : 0.45,
          11: next ? 0.25 : 0.80
        }
      };
    }),

  toggleMandibularCanalMode: () =>
    set((s) => {
      const next = !s.isMandibularCanalMode;
      if (next) {
        return {
          isMandibularCanalMode: true,
          selectedAnatomyId: 'nerve_ian',
          isRadiographicView: true,
          layerVisibility: {
            1: false, 2: false, 3: false, 4: false, 5: false, 6: true, 7: false, 8: false, 9: false, 10: true, 11: true, 12: true, 13: false
          },
          layerOpacity: {
            ...s.layerOpacity,
            11: 0.30,
            10: 1.0,
            6: 1.0
          },
          cameraTarget: {
            position: [-0.08, 1.31, 0.32],
            lookAt: [-0.040, 1.30, 0.155],
            distance: 0.25,
            timestamp: Date.now()
          }
        };
      }
      return { isMandibularCanalMode: false };
    }),

  toggleAnesthesiaMode: () =>
    set((s) => {
      const next = !s.isAnesthesiaMode;
      return {
        isAnesthesiaMode: next,
        activeAnesthesiaId: next ? 'ian_block' : null,
        selectedAnatomyId: next ? 'nerve_ian' : s.selectedAnatomyId
      };
    }),

  setActiveAnesthesia: (id) => {
    set({ activeAnesthesiaId: id });
    const tech = CLINICAL_ANESTHESIA_TECHNIQUES.find((t) => t.id === id);
    if (tech) {
      set({
        selectedAnatomyId: tech.targetNerveIds[0] || null,
        cameraTarget: {
          position: [tech.needleTargetPosition[0] * 1.5, tech.needleTargetPosition[1] + 0.04, tech.needleTargetPosition[2] + 0.20],
          lookAt: tech.needleTargetPosition,
          distance: 0.22,
          timestamp: Date.now()
        }
      });
    }
  },

  toggleForaminaMarkers: () => set((s) => ({ showForaminaMarkers: !s.showForaminaMarkers })),
  toggleTeethMarkers: () => set((s) => ({ showTeethMarkers: !s.showTeethMarkers })),
  toggleDirectionalFlow: () => set((s) => ({ showDirectionalFlow: !s.showDirectionalFlow })),

  setClippingPlane: (update) =>
    set((s) => ({ clippingPlane: { ...s.clippingPlane, ...update } })),

  setCameraTarget: (position, lookAt, distance = 0.35) =>
    set({
      cameraTarget: {
        position,
        lookAt,
        distance,
        timestamp: Date.now()
      }
    }),

  startTrace: (nerveId) => {
    set({
      activeNerveTraceId: nerveId,
      traceProgress: 0,
      tracePlaybackState: 'playing',
      selectedAnatomyId: nerveId
    });
  },

  pauseTrace: () => set({ tracePlaybackState: 'paused' }),
  resumeTrace: () => set({ tracePlaybackState: 'playing' }),
  resetTrace: () => set({ traceProgress: 0, tracePlaybackState: 'stopped', activeNerveTraceId: null }),
  setTraceProgress: (progress) => set({ traceProgress: Math.max(0, Math.min(1, progress)) }),

  startQuiz: () => {
    set({
      quizMode: true,
      currentQuizIndex: 0,
      quizScore: 0,
      quizAnswered: false,
      quizFeedback: null
    });
  },

  submitQuizAnswer: (selectedId) => {
    const { currentQuizIndex, quizScore, quizAnswered } = get();
    if (quizAnswered) return;

    const question = CRANIOFACIAL_QUIZ_QUESTIONS[currentQuizIndex];
    if (!question) return;

    const isCorrect = selectedId === question.targetAnatomyId;
    const newScore = isCorrect ? quizScore + 1 : quizScore;

    set({
      quizAnswered: true,
      quizScore: newScore,
      quizFeedback: {
        correct: isCorrect,
        messageVi: isCorrect ? 'Chính xác! ' + question.explanationVi : 'Chưa đúng! ' + question.explanationVi,
        messageEn: isCorrect ? 'Correct! ' + question.explanationEn : 'Incorrect! ' + question.explanationEn
      }
    });
  },

  nextQuizQuestion: () => {
    const { currentQuizIndex } = get();
    if (currentQuizIndex + 1 < CRANIOFACIAL_QUIZ_QUESTIONS.length) {
      set({
        currentQuizIndex: currentQuizIndex + 1,
        quizAnswered: false,
        quizFeedback: null
      });
    } else {
      // Quiz finished
      set({
        quizAnswered: true,
        quizFeedback: {
          correct: true,
          messageVi: `Hoàn thành bài kiểm tra! Bạn đạt ${get().quizScore}/${CRANIOFACIAL_QUIZ_QUESTIONS.length} điểm.`,
          messageEn: `Quiz completed! Score: ${get().quizScore}/${CRANIOFACIAL_QUIZ_QUESTIONS.length}.`
        }
      });
    }
  },

  exitQuiz: () => {
    set({
      quizMode: false,
      currentQuizIndex: 0,
      quizScore: 0,
      quizAnswered: false,
      quizFeedback: null
    });
  },

  // Specimen Actions
  setActiveSpecimenMode: (mode) => {
    const updates: Partial<DentalNeuroState> = { activeSpecimenMode: mode };
    if (mode === 'tooth_specimen') {
      const fdi = get().selectedToothFdi || 46;
      updates.selectedAnatomyId = `tooth_${fdi}`;
      updates.selectedSide = (fdi >= 11 && fdi <= 18) || (fdi >= 41 && fdi <= 48) ? 'right' : 'left';
    } else if (mode === 'tmj_specimen') {
      updates.selectedAnatomyId = get().tmjActiveMuscleId || 'joint_tmj';
      updates.selectedSide = 'right';
    } else if (mode === 'wisdom_surgery') {
      updates.selectedAnatomyId = get().wisdomToothId;
      updates.selectedSide = get().wisdomToothId === 'tooth_38' ? 'left' : 'right';
    }
    set(updates);
    if (updates.selectedAnatomyId) {
      get().focusAnatomy(updates.selectedAnatomyId);
    }
  },
  setSelectedToothFdi: (fdi) => {
    const side: 'right' | 'left' =
      (fdi >= 11 && fdi <= 18) || (fdi >= 41 && fdi <= 48) ? 'right' : 'left';
    set({
      selectedToothFdi: fdi,
      selectedAnatomyId: `tooth_${fdi}`,
      selectedSide: side,
      wisdomToothId: fdi === 38 ? 'tooth_38' : fdi === 48 ? 'tooth_48' : get().wisdomToothId
    });
    get().focusAnatomy(`tooth_${fdi}`);
  },
  setToothCrossSection: (mode) => set({ toothCrossSection: mode }),
  setToothEnamelOpacity: (opacity) => set({ toothEnamelOpacity: opacity }),
  setToothShowPdl: (show) => set({ toothShowPdl: show }),
  setTmjJawState: (progress) => set({ tmjJawState: Math.max(0, Math.min(1, progress)) }),
  setTmjMotionMode: (mode) => set({ tmjMotionMode: mode }),
  setTmjPathology: (pathology) => set({ tmjPathology: pathology }),
  setTmjShowMuscles: (show) => set({ tmjShowMuscles: show }),
  setTmjShowLigaments: (show) => set({ tmjShowLigaments: show }),
  setTmjActiveMuscleId: (id) => set({ tmjActiveMuscleId: id }),
  setWisdomToothId: (id) => {
    const fdi = id === 'tooth_38' ? 38 : 48;
    set({
      wisdomToothId: id,
      selectedToothFdi: fdi,
      selectedAnatomyId: id,
      selectedSide: id === 'tooth_38' ? 'left' : 'right'
    });
    get().focusAnatomy(id);
  },
  setWisdomWinterType: (type) => set({ wisdomWinterType: type }),
  setWisdomPellGregoryClass: (c) => set({ wisdomPellGregoryClass: c }),
  setWisdomPellGregoryPos: (pos) => set({ wisdomPellGregoryPos: pos }),
  setWisdomSurgicalStep: (step) => set({ wisdomSurgicalStep: step }),
  setWisdomShowNerves: (show) => set({ wisdomShowNerves: show }),
  setWisdomBoneOpacity: (opacity) => set({ wisdomBoneOpacity: opacity }),

  resetAll: () => {
    set({
      selectedAnatomyId: 'cn_5',
      focusedAnatomyId: null,
      hoveredAnatomyId: null,
      activeNerveTraceId: null,
      traceProgress: 0,
      tracePlaybackState: 'stopped',
      visualizationDepth: 'neural',
      isRadiographicView: false,
      isMandibularCanalMode: false,
      isAnesthesiaMode: false,
      activeAnesthesiaId: null,
      quizMode: false,
      cameraTarget: {
        position: [0, 1.38, 0.45],
        lookAt: [0, 1.34, 0.10],
        distance: 0.45,
        timestamp: Date.now()
      }
    });
  }
}));
