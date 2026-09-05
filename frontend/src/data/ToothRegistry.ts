/**
 * MEDANATOMY 3D — AUTHORITATIVE TOOTH REGISTRY
 * Single source of truth for all 32 adult human permanent teeth (FDI 11–48).
 * Strictly maps: FDI ID ↔ 3D MESH NODE ↔ WORLD POSITION ↔ PATIENT SIDE ↔ JAW ↔ ADJACENCY ↔ CLINICAL MORPHOLOGY.
 * 
 * Standard References:
 * - FDI Two-Digit Notation (ISO 3950)
 * - Terminologia Anatomica (TA2)
 * - Wheeler's Dental Anatomy, Physiology and Occlusion (11th Ed)
 * - Gray's Anatomy (42nd Ed, Chapter 30: Oral Cavity & Dentition)
 * - Vertucci's Root Canal Morphology Classification
 */

export type DentitionType = 'PERMANENT' | 'DECIDUOUS';
export type ToothJaw = 'MAXILLA' | 'MANDIBLE';
export type ToothSide = 'RIGHT' | 'LEFT'; // Patient anatomical laterality (Patient Right = Screen Left when facing patient)
export type ToothQuadrant = 1 | 2 | 3 | 4;
export type ToothClass = 'INCISOR' | 'CANINE' | 'PREMOLAR' | 'MOLAR';
export type ToothType =
  | 'CENTRAL_INCISOR'
  | 'LATERAL_INCISOR'
  | 'CANINE'
  | 'FIRST_PREMOLAR'
  | 'SECOND_PREMOLAR'
  | 'FIRST_MOLAR'
  | 'SECOND_MOLAR'
  | 'THIRD_MOLAR';

export type AnatomyRegion =
  | 'ANTERIOR_MAXILLA'
  | 'POSTERIOR_MAXILLA'
  | 'ANTERIOR_MANDIBLE'
  | 'POSTERIOR_MANDIBLE';

export interface ToothSurfaceDirections {
  mesial: [number, number, number];   // Toward dental midline
  distal: [number, number, number];   // Toward posterior ramus/tuberosity
  buccal: [number, number, number];   // Outward toward cheek/lips
  lingual: [number, number, number];  // Inward toward tongue/palate
  occlusal: [number, number, number]; // Toward biting plane
  apical: [number, number, number];   // Toward root apex/bone socket
}

export interface ToothMorphology {
  rootCount: number;
  canalCount: number;
  canalNames: string[];
  vertucciClass: string;
  crownDimensionsMm: {
    height: number;
    mesiodistal: number;
    buccolingual: number;
  };
  rootLengthMm: number;
  pulpFloorAnatomyVi: string;
  clinicalRisksVi: string[];
  recommendedAnesthesiaVi: string[];
}

export interface ToothRecord {
  id: string;                         // Canonical ID: "tooth.46"
  legacyId: string;                   // "tooth_46"
  fdi: number;                        // 46
  universalNumber: number;            // 30
  palmer: string;                     // "6┐"
  nameVi: string;
  nameEn: string;
  latinName: string;
  dentition: DentitionType;
  jaw: ToothJaw;                      // "MANDIBLE"
  side: ToothSide;                    // "RIGHT" (Patient Right)
  quadrant: ToothQuadrant;            // 4
  toothClass: ToothClass;             // "MOLAR"
  toothType: ToothType;               // "FIRST_MOLAR"
  positionIndex: number;              // 1 to 8 (1 = Central Incisor from midline, 8 = Third Molar)
  anatomyRegion: AnatomyRegion;       // "POSTERIOR_MANDIBLE"

  // 3D Asset & Mesh Mapping
  meshNodeName: string;               // Node in skull_complete.glb e.g. "Lower first molar tooth.r"
  meshName: string;                   // Geometry name e.g. "Lower first molar tooth.001"
  isMirroredMesh: boolean;            // Left teeth mirrored with scale.x < 0
  assetId: string;                    // "skull_complete.glb#Lower_first_molar_tooth.r"
  dedicatedAssetUrl?: string;         // e.g. "/models/dental/mandibular_third_molar_48.glb"
  landmarkId: string;                 // "landmark.tooth.46"

  // Anatomical Coordinates
  // 1. Craniofacial space (inside skull_complete.glb, origin at cervical spine, midline X=0.0451)
  craniofacialPos: [number, number, number];
  // 2. Whole body space (standing 1.8m human skeleton)
  wholeBodyPos: [number, number, number];
  // 3. Camera focus target and eye positions for 3D stage
  cameraFocus: {
    target: [number, number, number];
    position: [number, number, number];
    distance: number;
  };

  // Topological Adjacency
  mesialAdjacent: string | null;      // e.g. "tooth.45"
  distalAdjacent: string | null;      // e.g. "tooth.47"
  opposingTooth: string;              // e.g. "tooth.16"

  // Innervation & Blood Supply
  pulpInnervationId: string;          // e.g. "nerve_ian"
  periodontalInnervationId: string;   // e.g. "nerve_ian"
  buccalGingivaInnervationId: string; // e.g. "nerve_buccal"
  lingualGingivaInnervationId: string;// e.g. "nerve_lingual"
  bloodSupplyId: string;              // e.g. "inferior_alveolar_artery"

  // Morphological & Endodontic Specimen Data
  morphology: ToothMorphology;
}

/**
 * Midline reference in skull_complete.glb
 */
export const DENTAL_MIDLINE_X = 0.0451;

/**
 * 32 AUTHORITATIVE HUMAN TEETH
 */
export const TOOTH_REGISTRY: Record<number, ToothRecord> = {
  // ==========================================================================
  // QUADRANT 1: HÀM TRÊN PHẢI (MAXILLARY RIGHT — PATIENT RIGHT — FDI 11 - 18)
  // ==========================================================================
  18: {
    id: 'tooth.18',
    legacyId: 'tooth_18',
    fdi: 18,
    universalNumber: 1,
    palmer: '8┘',
    nameVi: 'Răng khôn trên phải',
    nameEn: 'Maxillary right third molar',
    latinName: 'Dens molaris tertius superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'MOLAR',
    toothType: 'THIRD_MOLAR',
    positionIndex: 8,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper third molar tooth.r',
    meshName: 'Upper third molar tooth.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_third_molar_tooth.r',
    dedicatedAssetUrl: '/models/dental/mandibular_third_molar_48.glb',
    landmarkId: 'landmark.tooth.18',
    craniofacialPos: [0.0165, 0.7770, 0.0350],
    wholeBodyPos: [-0.032, 1.344, 0.124],
    cameraFocus: {
      target: [0.0165, 0.7770, 0.0350],
      position: [0.0165 - 0.045, 0.7770 + 0.035, 0.0350 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.17',
    distalAdjacent: null,
    opposingTooth: 'tooth.48',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'posterior_superior_alveolar_artery',
    morphology: {
      rootCount: 3,
      canalCount: 3,
      canalNames: ['Ống ngoài gần', 'Ống ngoài xa', 'Ống khẩu cái'],
      vertucciClass: 'Biến dị hình thái cao, chân răng chụm uốn cong về phía xa',
      crownDimensionsMm: { height: 6.5, mesiodistal: 8.5, buccolingual: 10.0 },
      rootLengthMm: 11.0,
      pulpFloorAnatomyVi: 'Thường hợp nhất với các hình dạng tam giác lệch hoặc chữ C.',
      clinicalRisksVi: ['Đẩy răng vào xoang hàm trên (Maxillary sinus)', 'Thủng thành xoang', 'Gãy củ hàm trên (Tuber maxillae)'],
      recommendedAnesthesiaVi: ['Gây tê PSA (Posterior Superior Alveolar block)', 'Gây tê thần kinh khẩu cái lớn (Greater Palatine block)']
    }
  },
  17: {
    id: 'tooth.17',
    legacyId: 'tooth_17',
    fdi: 17,
    universalNumber: 2,
    palmer: '7┘',
    nameVi: 'Răng cối lớn thứ hai hàm trên phải',
    nameEn: 'Maxillary right second molar',
    latinName: 'Dens molaris secundus superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'MOLAR',
    toothType: 'SECOND_MOLAR',
    positionIndex: 7,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper second molar tooth.r',
    meshName: 'Upper second molar tooth.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_second_molar_tooth.r',
    landmarkId: 'landmark.tooth.17',
    craniofacialPos: [0.0169, 0.7744, 0.0450],
    wholeBodyPos: [-0.030, 1.344, 0.132],
    cameraFocus: {
      target: [0.0169, 0.7744, 0.0450],
      position: [0.0169 - 0.045, 0.7744 + 0.035, 0.0450 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.16',
    distalAdjacent: 'tooth.18',
    opposingTooth: 'tooth.47',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'posterior_superior_alveolar_artery',
    morphology: {
      rootCount: 3,
      canalCount: 3,
      canalNames: ['Ống ngoài gần (MB)', 'Ống ngoài xa (DB)', 'Ống khẩu cái (Palatal)'],
      vertucciClass: 'MB: Class I hoặc II, DB: Class I, P: Class I',
      crownDimensionsMm: { height: 7.0, mesiodistal: 9.0, buccolingual: 11.0 },
      rootLengthMm: 12.0,
      pulpFloorAnatomyVi: 'Sàn tủy hình tam giác nhọn lệch gần, 3 lỗ tủy nằm sát nhau hơn so với răng 16.',
      clinicalRisksVi: ['Thủng sàn tủy', 'Gãy dụng cụ trong ống MB cong', 'Chân răng liên quan sát đáy xoang hàm'],
      recommendedAnesthesiaVi: ['Gây tê PSA kết hợp gây tê vòm miệng khẩu cái lớn']
    }
  },
  16: {
    id: 'tooth.16',
    legacyId: 'tooth_16',
    fdi: 16,
    universalNumber: 3,
    palmer: '6┘',
    nameVi: 'Răng cối lớn thứ nhất hàm trên phải',
    nameEn: 'Maxillary right first molar',
    latinName: 'Dens molaris primus superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'MOLAR',
    toothType: 'FIRST_MOLAR',
    positionIndex: 6,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper first molar tooth.r',
    meshName: 'Upper first molar tooth.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_first_molar_tooth.r',
    landmarkId: 'landmark.tooth.16',
    craniofacialPos: [0.0170, 0.7702, 0.0552],
    wholeBodyPos: [-0.028, 1.343, 0.140],
    cameraFocus: {
      target: [0.0170, 0.7702, 0.0552],
      position: [0.0170 - 0.045, 0.7702 + 0.035, 0.0552 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.15',
    distalAdjacent: 'tooth.17',
    opposingTooth: 'tooth.46',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'posterior_superior_alveolar_artery',
    morphology: {
      rootCount: 3,
      canalCount: 4,
      canalNames: ['MB1 (Gần ngoài 1)', 'MB2 (Gần ngoài 2 - tỷ lệ 70-90%)', 'DB (Xa ngoài)', 'Palatal (Khẩu cái)'],
      vertucciClass: 'Chân gần ngoài (MB): Vertucci Class II hoặc IV (2 ống tủy)',
      crownDimensionsMm: { height: 7.5, mesiodistal: 10.0, buccolingual: 11.5 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Sàn tủy hình tứ giác/tam giác mở rộng; gờ men Carabelli ở múi gần trong.',
      clinicalRisksVi: ['Bỏ sót ống tủy MB2 dẫn đến thất bại nội nha', 'Thủng chẽ chân răng (furcation perforation)', 'Đẩy mảnh chóp răng vào xoang hàm'],
      recommendedAnesthesiaVi: ['Gây tê PSA + Tiêm ngấm bổ sung chân gần ngoài (nhánh MSA) + Gây tê khẩu cái lớn']
    }
  },
  15: {
    id: 'tooth.15',
    legacyId: 'tooth_15',
    fdi: 15,
    universalNumber: 4,
    palmer: '5┘',
    nameVi: 'Răng cối nhỏ thứ hai hàm trên phải',
    nameEn: 'Maxillary right second premolar',
    latinName: 'Dens praemolaris secundus superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'PREMOLAR',
    toothType: 'SECOND_PREMOLAR',
    positionIndex: 5,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper second premolar.r',
    meshName: 'Upper second premolar.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_second_premolar.r',
    landmarkId: 'landmark.tooth.15',
    craniofacialPos: [0.0191, 0.7692, 0.0650],
    wholeBodyPos: [-0.024, 1.342, 0.147],
    cameraFocus: {
      target: [0.0191, 0.7692, 0.0650],
      position: [0.0191 - 0.042, 0.7692 + 0.035, 0.0650 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.14',
    distalAdjacent: 'tooth.16',
    opposingTooth: 'tooth.45',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống tủy trung tâm (hoặc 2 ống Ngoài - Trong)'],
      vertucciClass: 'Vertucci Class I (75%), Class II (20%)',
      crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Hình bầu dục dẹt theo chiều ngoài trong.',
      clinicalRisksVi: ['Thủng thành bên chân răng do uốn cong ngầm', 'Chân răng nằm sát màng Schneider xoang hàm'],
      recommendedAnesthesiaVi: ['Tiêm ngấm tại chỗ đáy hành lang (Infiltration) + Gây tê vòm miệng']
    }
  },
  14: {
    id: 'tooth.14',
    legacyId: 'tooth_14',
    fdi: 14,
    universalNumber: 5,
    palmer: '4┘',
    nameVi: 'Răng cối nhỏ thứ nhất hàm trên phải',
    nameEn: 'Maxillary right first premolar',
    latinName: 'Dens praemolaris primus superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'PREMOLAR',
    toothType: 'FIRST_PREMOLAR',
    positionIndex: 4,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper first premolar.r',
    meshName: 'Upper first premolar.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_first_premolar.r',
    landmarkId: 'landmark.tooth.14',
    craniofacialPos: [0.0227, 0.7681, 0.0717],
    wholeBodyPos: [-0.020, 1.342, 0.151],
    cameraFocus: {
      target: [0.0227, 0.7681, 0.0717],
      position: [0.0227 - 0.040, 0.7681 + 0.035, 0.0717 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.13',
    distalAdjacent: 'tooth.15',
    opposingTooth: 'tooth.44',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 2,
      canalNames: ['Ống ngoài (Buccal)', 'Ống trong (Palatal)'],
      vertucciClass: 'Vertucci Class IV (2 ống tủy riêng biệt từ sàn đến chóp, chiếm >80%)',
      crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Rãnh lõm phát triển sâu ở mặt gần (Mesial concavity) — nguy cơ thủng dẹt rất cao.',
      clinicalRisksVi: ['Thủng thành lõm mặt gần khi tạo hình xoang tủy', 'Gãy tách chẻ chân răng'],
      recommendedAnesthesiaVi: ['Tiêm ngấm tại chỗ đáy hành lang (Infiltration) + Gây tê khẩu cái']
    }
  },
  13: {
    id: 'tooth.13',
    legacyId: 'tooth_13',
    fdi: 13,
    universalNumber: 6,
    palmer: '3┘',
    nameVi: 'Răng nanh hàm trên phải',
    nameEn: 'Maxillary right canine',
    latinName: 'Dens caninus superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'CANINE',
    toothType: 'CANINE',
    positionIndex: 3,
    anatomyRegion: 'ANTERIOR_MAXILLA',
    meshNodeName: 'Upper canine.r',
    meshName: 'Upper canine.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_canine.r',
    landmarkId: 'landmark.tooth.13',
    craniofacialPos: [0.0261, 0.7670, 0.0792],
    wholeBodyPos: [-0.016, 1.342, 0.154],
    cameraFocus: {
      target: [0.0261, 0.7670, 0.0792],
      position: [0.0261 - 0.038, 0.7670 + 0.035, 0.0792 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.12',
    distalAdjacent: 'tooth.14',
    opposingTooth: 'tooth.43',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống tủy lớn trung tâm'],
      vertucciClass: 'Vertucci Class I (100%)',
      crownDimensionsMm: { height: 10.0, mesiodistal: 7.5, buccolingual: 8.0 },
      rootLengthMm: 17.0,
      pulpFloorAnatomyVi: 'Răng có chân dài nhất cung răng (lên tới 26-30mm), gờ nanh nổi rõ ở xương ổ răng.',
      clinicalRisksVi: ['Không tiếp cận được hết chiều dài làm việc do trâm tiêu chuẩn (21-25mm) bị ngắn', 'Cong chóp răng về phía xa'],
      recommendedAnesthesiaVi: ['Tiêm ngấm đáy hành lang bờ ngoài gờ nanh hoặc gây tê thần kinh dưới ổ mắt (Infraorbital nerve block)']
    }
  },
  12: {
    id: 'tooth.12',
    legacyId: 'tooth_12',
    fdi: 12,
    universalNumber: 7,
    palmer: '2┘',
    nameVi: 'Răng cửa bên hàm trên phải',
    nameEn: 'Maxillary right lateral incisor',
    latinName: 'Dens incisivus lateralis superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'INCISOR',
    toothType: 'LATERAL_INCISOR',
    positionIndex: 2,
    anatomyRegion: 'ANTERIOR_MAXILLA',
    meshNodeName: 'Upper lateral incisor.r',
    meshName: 'Upper lateral incisor.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_lateral_incisor.r',
    landmarkId: 'landmark.tooth.12',
    craniofacialPos: [0.0327, 0.7646, 0.0839],
    wholeBodyPos: [-0.010, 1.342, 0.157],
    cameraFocus: {
      target: [0.0327, 0.7646, 0.0839],
      position: [0.0327 - 0.035, 0.7646 + 0.035, 0.0839 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.11',
    distalAdjacent: 'tooth.13',
    opposingTooth: 'tooth.42',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống tủy đơn'],
      vertucciClass: 'Vertucci Class I (99%)',
      crownDimensionsMm: { height: 9.0, mesiodistal: 6.5, buccolingual: 6.0 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Chóp răng thường cong rõ rệt về phía xa và phía trong.',
      clinicalRisksVi: ['Tạo khấc (ledging) hoặc thủng chóp mặt ngoài do không uốn cong trâm theo độ cong chóp xa-trong', 'Rãnh nứt khẩu cái (palatoradicular groove)'],
      recommendedAnesthesiaVi: ['Tiêm ngấm tại chỗ đáy hành lang (Infiltration) bờ ngoài chóp chân răng']
    }
  },
  11: {
    id: 'tooth.11',
    legacyId: 'tooth_11',
    fdi: 11,
    universalNumber: 8,
    palmer: '1┘',
    nameVi: 'Răng cửa giữa hàm trên phải',
    nameEn: 'Maxillary right central incisor',
    latinName: 'Dens incisivus centralis superior dexter',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'RIGHT',
    quadrant: 1,
    toothClass: 'INCISOR',
    toothType: 'CENTRAL_INCISOR',
    positionIndex: 1,
    anatomyRegion: 'ANTERIOR_MAXILLA',
    meshNodeName: 'Upper medial incisor.r',
    meshName: 'Upper medial incisor.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Upper_medial_incisor.r',
    landmarkId: 'landmark.tooth.11',
    craniofacialPos: [0.0404, 0.7629, 0.0874],
    wholeBodyPos: [-0.004, 1.342, 0.158],
    cameraFocus: {
      target: [0.0404, 0.7629, 0.0874],
      position: [0.0404 - 0.030, 0.7629 + 0.035, 0.0874 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.21',
    distalAdjacent: 'tooth.12',
    opposingTooth: 'tooth.41',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống tủy trung tâm hình nón lớn'],
      vertucciClass: 'Vertucci Class I (100%)',
      crownDimensionsMm: { height: 10.5, mesiodistal: 8.5, buccolingual: 7.0 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Buồng tủy rộng hình tam giác ở thân răng, ống tủy hình nón thon đều về chóp.',
      clinicalRisksVi: ['Đổi màu thân răng sau điều trị nội nha nếu không làm sạch sừng tủy', 'Chấn thương gãy ngang thân răng'],
      recommendedAnesthesiaVi: ['Tiêm ngấm tại chỗ đáy hành lang bờ ngoài + Tiêm lỗ mũi khẩu cái (Nasopalatine block)']
    }
  },

  // ==========================================================================
  // QUADRANT 2: HÀM TRÊN TRÁI (MAXILLARY LEFT — PATIENT LEFT — FDI 21 - 28)
  // ==========================================================================
  21: {
    id: 'tooth.21',
    legacyId: 'tooth_21',
    fdi: 21,
    universalNumber: 9,
    palmer: '└1',
    nameVi: 'Răng cửa giữa hàm trên trái',
    nameEn: 'Maxillary left central incisor',
    latinName: 'Dens incisivus centralis superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'INCISOR',
    toothType: 'CENTRAL_INCISOR',
    positionIndex: 1,
    anatomyRegion: 'ANTERIOR_MAXILLA',
    meshNodeName: 'Upper medial incisor.l',
    meshName: 'Upper medial incisor.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_medial_incisor.l',
    landmarkId: 'landmark.tooth.21',
    craniofacialPos: [0.0498, 0.7629, 0.0874],
    wholeBodyPos: [0.004, 1.342, 0.158],
    cameraFocus: {
      target: [0.0498, 0.7629, 0.0874],
      position: [0.0498 + 0.030, 0.7629 + 0.035, 0.0874 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.11',
    distalAdjacent: 'tooth.22',
    opposingTooth: 'tooth.31',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống tủy trung tâm'],
      vertucciClass: 'Vertucci Class I (100%)',
      crownDimensionsMm: { height: 10.5, mesiodistal: 8.5, buccolingual: 7.0 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Đối xứng qua đường giữa với răng 11.',
      clinicalRisksVi: ['Đổi màu thân răng', 'Tổn thương thần kinh mũi khẩu cái khi phẫu thuật chóp'],
      recommendedAnesthesiaVi: ['Tiêm ngấm đáy hành lang + Gây tê lỗ mũi khẩu cái']
    }
  },
  22: {
    id: 'tooth.22',
    legacyId: 'tooth_22',
    fdi: 22,
    universalNumber: 10,
    palmer: '└2',
    nameVi: 'Răng cửa bên hàm trên trái',
    nameEn: 'Maxillary left lateral incisor',
    latinName: 'Dens incisivus lateralis superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'INCISOR',
    toothType: 'LATERAL_INCISOR',
    positionIndex: 2,
    anatomyRegion: 'ANTERIOR_MAXILLA',
    meshNodeName: 'Upper lateral incisor.l',
    meshName: 'Upper lateral incisor.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_lateral_incisor.l',
    landmarkId: 'landmark.tooth.22',
    craniofacialPos: [0.0575, 0.7646, 0.0839],
    wholeBodyPos: [0.010, 1.342, 0.157],
    cameraFocus: {
      target: [0.0575, 0.7646, 0.0839],
      position: [0.0575 + 0.035, 0.7646 + 0.035, 0.0839 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.21',
    distalAdjacent: 'tooth.23',
    opposingTooth: 'tooth.32',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống tủy đơn'],
      vertucciClass: 'Vertucci Class I (99%)',
      crownDimensionsMm: { height: 9.0, mesiodistal: 6.5, buccolingual: 6.0 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Chóp răng cong về phía xa-trong.',
      clinicalRisksVi: ['Thủng thành ngoài chóp do không nhận biết độ cong phía xa'],
      recommendedAnesthesiaVi: ['Tiêm ngấm đáy hành lang']
    }
  },
  23: {
    id: 'tooth.23',
    legacyId: 'tooth_23',
    fdi: 23,
    universalNumber: 11,
    palmer: '└3',
    nameVi: 'Răng nanh hàm trên trái',
    nameEn: 'Maxillary left canine',
    latinName: 'Dens caninus superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'CANINE',
    toothType: 'CANINE',
    positionIndex: 3,
    anatomyRegion: 'ANTERIOR_MAXILLA',
    meshNodeName: 'Upper canine.l',
    meshName: 'Upper canine.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_canine.l',
    landmarkId: 'landmark.tooth.23',
    craniofacialPos: [0.0641, 0.7670, 0.0792],
    wholeBodyPos: [0.016, 1.342, 0.154],
    cameraFocus: {
      target: [0.0641, 0.7670, 0.0792],
      position: [0.0641 + 0.038, 0.7670 + 0.035, 0.0792 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.22',
    distalAdjacent: 'tooth.24',
    opposingTooth: 'tooth.33',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống tủy trung tâm lớn'],
      vertucciClass: 'Vertucci Class I (100%)',
      crownDimensionsMm: { height: 10.0, mesiodistal: 7.5, buccolingual: 8.0 },
      rootLengthMm: 17.0,
      pulpFloorAnatomyVi: 'Chân răng cực dài, nâng đỡ góc môi má (Canine eminence).',
      clinicalRisksVi: ['Trâm nội nha ngắn không tới chóp', 'Gãy bờ ngoài xương ổ răng khi nhổ'],
      recommendedAnesthesiaVi: ['Tiêm ngấm đáy hành lang hoặc gây tê thần kinh dưới ổ mắt']
    }
  },
  24: {
    id: 'tooth.24',
    legacyId: 'tooth_24',
    fdi: 24,
    universalNumber: 12,
    palmer: '└4',
    nameVi: 'Răng cối nhỏ thứ nhất hàm trên trái',
    nameEn: 'Maxillary left first premolar',
    latinName: 'Dens praemolaris primus superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'PREMOLAR',
    toothType: 'FIRST_PREMOLAR',
    positionIndex: 4,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper first premolar.l',
    meshName: 'Upper first premolar.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_first_premolar.l',
    landmarkId: 'landmark.tooth.24',
    craniofacialPos: [0.0675, 0.7681, 0.0717],
    wholeBodyPos: [0.020, 1.342, 0.151],
    cameraFocus: {
      target: [0.0675, 0.7681, 0.0717],
      position: [0.0675 + 0.040, 0.7681 + 0.035, 0.0717 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.23',
    distalAdjacent: 'tooth.25',
    opposingTooth: 'tooth.34',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 2,
      canalNames: ['Ống ngoài', 'Ống trong'],
      vertucciClass: 'Vertucci Class IV (>80%)',
      crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Rãnh phát triển sâu ở mặt gần.',
      clinicalRisksVi: ['Thủng thành lõm phía gần', 'Gãy chóp chân trong'],
      recommendedAnesthesiaVi: ['Tiêm ngấm đáy hành lang + Tiêm khẩu cái']
    }
  },
  25: {
    id: 'tooth.25',
    legacyId: 'tooth_25',
    fdi: 25,
    universalNumber: 13,
    palmer: '└5',
    nameVi: 'Răng cối nhỏ thứ hai hàm trên trái',
    nameEn: 'Maxillary left second premolar',
    latinName: 'Dens praemolaris secundus superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'PREMOLAR',
    toothType: 'SECOND_PREMOLAR',
    positionIndex: 5,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper second premolar.l',
    meshName: 'Upper second premolar.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_second_premolar.l',
    landmarkId: 'landmark.tooth.25',
    craniofacialPos: [0.0711, 0.7692, 0.0650],
    wholeBodyPos: [0.024, 1.342, 0.147],
    cameraFocus: {
      target: [0.0711, 0.7692, 0.0650],
      position: [0.0711 + 0.042, 0.7692 + 0.035, 0.0650 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.24',
    distalAdjacent: 'tooth.26',
    opposingTooth: 'tooth.35',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'anterior_superior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống trung tâm dẹt'],
      vertucciClass: 'Vertucci Class I (75%), Class II (20%)',
      crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Ống tủy hình dải băng hẹp ngoài-trong.',
      clinicalRisksVi: ['Bỏ sót ống tủy thứ hai nếu phân nhánh muộn ở 1/3 chóp'],
      recommendedAnesthesiaVi: ['Tiêm ngấm đáy hành lang + Tiêm khẩu cái']
    }
  },
  26: {
    id: 'tooth.26',
    legacyId: 'tooth_26',
    fdi: 26,
    universalNumber: 14,
    palmer: '└6',
    nameVi: 'Răng cối lớn thứ nhất hàm trên trái',
    nameEn: 'Maxillary left first molar',
    latinName: 'Dens molaris primus superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'MOLAR',
    toothType: 'FIRST_MOLAR',
    positionIndex: 6,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper first molar tooth.l',
    meshName: 'Upper first molar tooth.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_first_molar_tooth.l',
    landmarkId: 'landmark.tooth.26',
    craniofacialPos: [0.0732, 0.7702, 0.0552],
    wholeBodyPos: [0.028, 1.343, 0.140],
    cameraFocus: {
      target: [0.0732, 0.7702, 0.0552],
      position: [0.0732 + 0.045, 0.7702 + 0.035, 0.0552 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.25',
    distalAdjacent: 'tooth.27',
    opposingTooth: 'tooth.36',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'posterior_superior_alveolar_artery',
    morphology: {
      rootCount: 3,
      canalCount: 4,
      canalNames: ['MB1', 'MB2 (70-90%)', 'DB', 'Palatal'],
      vertucciClass: 'Chân MB: Vertucci Class II hoặc IV',
      crownDimensionsMm: { height: 7.5, mesiodistal: 10.0, buccolingual: 11.5 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Sàn tủy mở rộng, tương đồng với răng 16 đối xứng.',
      clinicalRisksVi: ['Bỏ sót MB2', 'Thủng xoang hàm qua lỗ chóp chân trong'],
      recommendedAnesthesiaVi: ['Gây tê PSA + Tiêm ngấm chân MB + Gây tê khẩu cái lớn']
    }
  },
  27: {
    id: 'tooth.27',
    legacyId: 'tooth_27',
    fdi: 27,
    universalNumber: 15,
    palmer: '└7',
    nameVi: 'Răng cối lớn thứ hai hàm trên trái',
    nameEn: 'Maxillary left second molar',
    latinName: 'Dens molaris secundus superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'MOLAR',
    toothType: 'SECOND_MOLAR',
    positionIndex: 7,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper second molar tooth.l',
    meshName: 'Upper second molar tooth.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_second_molar_tooth.l',
    landmarkId: 'landmark.tooth.27',
    craniofacialPos: [0.0733, 0.7744, 0.0450],
    wholeBodyPos: [0.030, 1.344, 0.132],
    cameraFocus: {
      target: [0.0733, 0.7744, 0.0450],
      position: [0.0733 + 0.045, 0.7744 + 0.035, 0.0450 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.26',
    distalAdjacent: 'tooth.28',
    opposingTooth: 'tooth.37',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'posterior_superior_alveolar_artery',
    morphology: {
      rootCount: 3,
      canalCount: 3,
      canalNames: ['MB', 'DB', 'Palatal'],
      vertucciClass: 'MB: Class I/II, DB: Class I, P: Class I',
      crownDimensionsMm: { height: 7.0, mesiodistal: 9.0, buccolingual: 11.0 },
      rootLengthMm: 12.0,
      pulpFloorAnatomyVi: 'Sàn tủy hình tam giác nhọn lệch gần.',
      clinicalRisksVi: ['Thủng sàn tủy', 'Gãy dụng cụ'],
      recommendedAnesthesiaVi: ['Gây tê PSA + Gây tê khẩu cái lớn']
    }
  },
  28: {
    id: 'tooth.28',
    legacyId: 'tooth_28',
    fdi: 28,
    universalNumber: 16,
    palmer: '└8',
    nameVi: 'Răng khôn trên trái',
    nameEn: 'Maxillary left third molar',
    latinName: 'Dens molaris tertius superior sinister',
    dentition: 'PERMANENT',
    jaw: 'MAXILLA',
    side: 'LEFT',
    quadrant: 2,
    toothClass: 'MOLAR',
    toothType: 'THIRD_MOLAR',
    positionIndex: 8,
    anatomyRegion: 'POSTERIOR_MAXILLA',
    meshNodeName: 'Upper third molar tooth.l',
    meshName: 'Upper third molar tooth.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Upper_third_molar_tooth.l',
    dedicatedAssetUrl: '/models/dental/mandibular_third_molar_38.glb',
    landmarkId: 'landmark.tooth.28',
    craniofacialPos: [0.0737, 0.7770, 0.0350],
    wholeBodyPos: [0.032, 1.344, 0.124],
    cameraFocus: {
      target: [0.0737, 0.7770, 0.0350],
      position: [0.0737 + 0.045, 0.7770 + 0.035, 0.0350 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.27',
    distalAdjacent: null,
    opposingTooth: 'tooth.38',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    bloodSupplyId: 'posterior_superior_alveolar_artery',
    morphology: {
      rootCount: 3,
      canalCount: 3,
      canalNames: ['Ống ngoài gần', 'Ống ngoài xa', 'Ống khẩu cái'],
      vertucciClass: 'Biến dị hình thái cao',
      crownDimensionsMm: { height: 6.5, mesiodistal: 8.5, buccolingual: 10.0 },
      rootLengthMm: 11.0,
      pulpFloorAnatomyVi: 'Sàn tủy thu hẹp, chân chụm.',
      clinicalRisksVi: ['Đẩy răng vào xoang hàm', 'Rách màng nhầy vòm miệng'],
      recommendedAnesthesiaVi: ['Gây tê PSA + Gây tê khẩu cái lớn']
    }
  },

  // ==========================================================================
  // QUADRANT 3: HÀM DƯỚI TRÁI (MANDIBULAR LEFT — PATIENT LEFT — FDI 31 - 38)
  // ==========================================================================
  31: {
    id: 'tooth.31',
    legacyId: 'tooth_31',
    fdi: 31,
    universalNumber: 24,
    palmer: '┌1',
    nameVi: 'Răng cửa giữa hàm dưới trái',
    nameEn: 'Mandibular left central incisor',
    latinName: 'Dens incisivus centralis inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'INCISOR',
    toothType: 'CENTRAL_INCISOR',
    positionIndex: 1,
    anatomyRegion: 'ANTERIOR_MANDIBLE',
    meshNodeName: 'Lower medial incisor.l',
    meshName: 'Lower medial incisor.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Lower_medial_incisor.l',
    landmarkId: 'landmark.tooth.31',
    craniofacialPos: [0.0482, 0.7405, 0.0790],
    wholeBodyPos: [0.004, 1.330, 0.158],
    cameraFocus: {
      target: [0.0482, 0.7405, 0.0790],
      position: [0.0482 + 0.030, 0.7405 + 0.035, 0.0790 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.41',
    distalAdjacent: 'tooth.32',
    opposingTooth: 'tooth.21',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'incisive_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống ngoài', 'Ống trong (tỷ lệ có 2 ống tủy là 40%)'],
      vertucciClass: 'Vertucci Class III (1-2-1) hoặc Class II (2-1)',
      crownDimensionsMm: { height: 9.0, mesiodistal: 5.0, buccolingual: 6.0 },
      rootLengthMm: 12.5,
      pulpFloorAnatomyVi: 'Răng nhỏ nhất trong cung răng, dẹt theo chiều ngoài trong, dễ có ống tủy thứ hai ở phía lưỡi.',
      clinicalRisksVi: ['Bỏ sót ống tủy phía trong (Lingual canal) do mở tủy quá nhỏ', 'Thủng thành bên mặt gần/xa'],
      recommendedAnesthesiaVi: ['Gây tê thần kinh răng cửa (Incisive block) hoặc tiêm ngấm xương vỏ mỏng']
    }
  },
  32: {
    id: 'tooth.32',
    legacyId: 'tooth_32',
    fdi: 32,
    universalNumber: 23,
    palmer: '┌2',
    nameVi: 'Răng cửa bên hàm dưới trái',
    nameEn: 'Mandibular left lateral incisor',
    latinName: 'Dens incisivus lateralis inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'INCISOR',
    toothType: 'LATERAL_INCISOR',
    positionIndex: 2,
    anatomyRegion: 'ANTERIOR_MANDIBLE',
    meshNodeName: 'Lower lateral incisor.l',
    meshName: 'Lower lateral incisor.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Lower_lateral_incisor.l',
    landmarkId: 'landmark.tooth.32',
    craniofacialPos: [0.0535, 0.7418, 0.0795],
    wholeBodyPos: [0.010, 1.330, 0.157],
    cameraFocus: {
      target: [0.0535, 0.7418, 0.0795],
      position: [0.0535 + 0.035, 0.7418 + 0.035, 0.0795 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.31',
    distalAdjacent: 'tooth.33',
    opposingTooth: 'tooth.22',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'incisive_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống ngoài', 'Ống trong'],
      vertucciClass: 'Vertucci Class III hoặc Class II (2 ống chiếm ~44%)',
      crownDimensionsMm: { height: 9.5, mesiodistal: 5.5, buccolingual: 6.5 },
      rootLengthMm: 13.5,
      pulpFloorAnatomyVi: 'Thân răng lớn hơn răng cửa giữa một chút, có độ nghiêng xa nhẹ.',
      clinicalRisksVi: ['Bỏ sót ống tủy phụ phía lưỡi'],
      recommendedAnesthesiaVi: ['Gây tê thần kinh răng cửa hoặc tiêm ngấm']
    }
  },
  33: {
    id: 'tooth.33',
    legacyId: 'tooth_33',
    fdi: 33,
    universalNumber: 22,
    palmer: '┌3',
    nameVi: 'Răng nanh hàm dưới trái',
    nameEn: 'Mandibular left canine',
    latinName: 'Dens caninus inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'CANINE',
    toothType: 'CANINE',
    positionIndex: 3,
    anatomyRegion: 'ANTERIOR_MANDIBLE',
    meshNodeName: 'Lower canine.l',
    meshName: 'Lower canine.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Lower_canine.l',
    landmarkId: 'landmark.tooth.33',
    craniofacialPos: [0.0595, 0.7399, 0.0748],
    wholeBodyPos: [0.016, 1.330, 0.154],
    cameraFocus: {
      target: [0.0595, 0.7399, 0.0748],
      position: [0.0595 + 0.038, 0.7399 + 0.035, 0.0748 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.32',
    distalAdjacent: 'tooth.34',
    opposingTooth: 'tooth.23',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'incisive_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống ngoài', 'Ống trong (khoảng 15% có 2 chân riêng biệt)'],
      vertucciClass: 'Vertucci Class I (85%), Class II/IV (15%)',
      crownDimensionsMm: { height: 11.0, mesiodistal: 7.0, buccolingual: 7.5 },
      rootLengthMm: 15.5,
      pulpFloorAnatomyVi: 'Chân răng dài và khỏe, mặt ngoài nhẵn bóng, chỏm múi nhọn.',
      clinicalRisksVi: ['Bỏ sót chân răng phụ phía lưỡi (bifurcated root)'],
      recommendedAnesthesiaVi: ['Gây tê thần kinh răng cửa (Incisive block) hoặc gây tê gai Spix']
    }
  },
  34: {
    id: 'tooth.34',
    legacyId: 'tooth_34',
    fdi: 34,
    universalNumber: 21,
    palmer: '┌4',
    nameVi: 'Răng cối nhỏ thứ nhất hàm dưới trái',
    nameEn: 'Mandibular left first premolar',
    latinName: 'Dens praemolaris primus inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'PREMOLAR',
    toothType: 'FIRST_PREMOLAR',
    positionIndex: 4,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower first premolar.l',
    meshName: 'Lower first premolar.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Lower_first_premolar.l',
    landmarkId: 'landmark.tooth.34',
    craniofacialPos: [0.0644, 0.7441, 0.0690],
    wholeBodyPos: [0.021, 1.330, 0.151],
    cameraFocus: {
      target: [0.0644, 0.7441, 0.0690],
      position: [0.0644 + 0.040, 0.7441 + 0.035, 0.0690 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.33',
    distalAdjacent: 'tooth.35',
    opposingTooth: 'tooth.24',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống chính (phân nhánh chạc ba 1/3 chóp ở ~25% trường hợp)'],
      vertucciClass: 'Vertucci Class V (1-2) hoặc Class IV; giải phẫu phức tạp',
      crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 7.5 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Thân răng nghiêng nhiều về phía lưỡi (lingual tilt ~30°), múi trong thoái hóa nhỏ.',
      clinicalRisksVi: ['Thủng thành ngoài khi khoan thẳng góc mặt nhai do không tính độ nghiêng trong', 'Chóp răng nằm cực sát lỗ cằm (Mental foramen)'],
      recommendedAnesthesiaVi: ['Gây tê gai Spix / IAN block hoặc gây tê lỗ cằm (Mental nerve block)']
    }
  },
  35: {
    id: 'tooth.35',
    legacyId: 'tooth_35',
    fdi: 35,
    universalNumber: 20,
    palmer: '┌5',
    nameVi: 'Răng cối nhỏ thứ hai hàm dưới trái',
    nameEn: 'Mandibular left second premolar',
    latinName: 'Dens praemolaris secundus inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'PREMOLAR',
    toothType: 'SECOND_PREMOLAR',
    positionIndex: 5,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower second premolar.l',
    meshName: 'Lower second premolar.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Lower_second_premolar.l',
    landmarkId: 'landmark.tooth.35',
    craniofacialPos: [0.0682, 0.7464, 0.0616],
    wholeBodyPos: [0.025, 1.330, 0.147],
    cameraFocus: {
      target: [0.0682, 0.7464, 0.0616],
      position: [0.0682 + 0.042, 0.7464 + 0.035, 0.0616 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.34',
    distalAdjacent: 'tooth.36',
    opposingTooth: 'tooth.25',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống trung tâm đơn (88%)'],
      vertucciClass: 'Vertucci Class I (88%), Class II/V (12%)',
      crownDimensionsMm: { height: 8.0, mesiodistal: 7.0, buccolingual: 8.0 },
      rootLengthMm: 14.5,
      pulpFloorAnatomyVi: 'Thân răng thẳng đứng hơn so với răng 34, thường có 3 múi (1 ngoài, 2 trong).',
      clinicalRisksVi: ['Chóp răng nằm ngay trên đỉnh quai thần kinh cằm (Anterior loop of mental nerve)'],
      recommendedAnesthesiaVi: ['Gây tê gai Spix hoặc gây tê lỗ cằm']
    }
  },
  36: {
    id: 'tooth.36',
    legacyId: 'tooth_36',
    fdi: 36,
    universalNumber: 19,
    palmer: '┌6',
    nameVi: 'Răng cối lớn thứ nhất hàm dưới trái',
    nameEn: 'Mandibular left first molar',
    latinName: 'Dens molaris primus inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'MOLAR',
    toothType: 'FIRST_MOLAR',
    positionIndex: 6,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower first molar tooth.l',
    meshName: 'Lower first molar tooth.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Lower_first_molar_tooth.l',
    landmarkId: 'landmark.tooth.36',
    craniofacialPos: [0.0717, 0.7487, 0.0519],
    wholeBodyPos: [0.029, 1.332, 0.140],
    cameraFocus: {
      target: [0.0717, 0.7487, 0.0519],
      position: [0.0717 + 0.045, 0.7487 + 0.035, 0.0519 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.35',
    distalAdjacent: 'tooth.37',
    opposingTooth: 'tooth.26',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 3,
      canalNames: ['Ống gần ngoài (MB)', 'Ống gần trong (ML)', 'Ống xa (D hoặc DB + DL)'],
      vertucciClass: 'Chân gần: Vertucci Class IV hoặc II, Chân xa: Class I hoặc II',
      crownDimensionsMm: { height: 7.5, mesiodistal: 11.0, buccolingual: 10.5 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Sàn tủy hình thang, cạnh dài ở phía gần; chân phụ trong (Radix Entomolaris) gặp ở 10-15% dân số châu Á.',
      clinicalRisksVi: ['Bỏ sót chân phụ Radix Entomolaris nằm ở phía xa-trong', 'Thủng thành dẹt phía xa của chân gần (Strip perforation)'],
      recommendedAnesthesiaVi: ['Gây tê gai Spix (IAN block) + Gây tê thần kinh má ngoài (Long buccal block)']
    }
  },
  37: {
    id: 'tooth.37',
    legacyId: 'tooth_37',
    fdi: 37,
    universalNumber: 18,
    palmer: '┌7',
    nameVi: 'Răng cối lớn thứ hai hàm dưới trái',
    nameEn: 'Mandibular left second molar',
    latinName: 'Dens molaris secundus inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'MOLAR',
    toothType: 'SECOND_MOLAR',
    positionIndex: 7,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower second molar tooth.l',
    meshName: 'Lower second molar tooth.001',
    isMirroredMesh: true,
    assetId: 'skull_complete.glb#Lower_second_molar_tooth.l',
    landmarkId: 'landmark.tooth.37',
    craniofacialPos: [0.0754, 0.7537, 0.0402],
    wholeBodyPos: [0.032, 1.332, 0.132],
    cameraFocus: {
      target: [0.0754, 0.7537, 0.0402],
      position: [0.0754 + 0.045, 0.7537 + 0.035, 0.0402 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.36',
    distalAdjacent: 'tooth.38',
    opposingTooth: 'tooth.27',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 3,
      canalNames: ['MB', 'ML', 'Distal'],
      vertucciClass: 'Biến dị hình thái ống tủy hình chữ C (C-shaped canal, tỷ lệ 30-40% ở người châu Á)',
      crownDimensionsMm: { height: 7.0, mesiodistal: 10.5, buccolingual: 10.0 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Các chân răng có xu hướng chụm vào nhau, rãnh sàn tủy uốn lượn liên tục hình chữ C từ ngoài qua gần đến trong.',
      clinicalRisksVi: ['Khó bơm rửa và trám bít kín hệ thống eo nối chữ C (isthmus)', 'Chóp răng nằm rất gần ống thần kinh hàm dưới'],
      recommendedAnesthesiaVi: ['Gây tê gai Spix + Gây tê thần kinh má']
    }
  },
  38: {
    id: 'tooth.38',
    legacyId: 'tooth_38',
    fdi: 38,
    universalNumber: 17,
    palmer: '┌8',
    nameVi: 'Răng khôn dưới trái',
    nameEn: 'Mandibular left third molar',
    latinName: 'Dens molaris tertius inferior sinister',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'LEFT',
    quadrant: 3,
    toothClass: 'MOLAR',
    toothType: 'THIRD_MOLAR',
    positionIndex: 8,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'MandibularThirdMolar_38',
    meshName: 'MandibularThirdMolar_38_Crown',
    isMirroredMesh: false,
    assetId: 'dental/mandibular_third_molar_38.glb',
    dedicatedAssetUrl: '/models/dental/mandibular_third_molar_38.glb',
    landmarkId: 'landmark.tooth.38',
    craniofacialPos: [0.0784, 0.7580, 0.0295],
    wholeBodyPos: [0.034, 1.332, 0.124],
    cameraFocus: {
      target: [0.0784, 0.7580, 0.0295],
      position: [0.0784 + 0.045, 0.7580 + 0.035, 0.0295 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.37',
    distalAdjacent: null,
    opposingTooth: 'tooth.28',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 2,
      canalNames: ['Ống gần', 'Ống xa'],
      vertucciClass: 'Đa dạng, thường có chân cong móc câu về phía sau hoặc ôm lấy ống thần kinh răng dưới',
      crownDimensionsMm: { height: 7.0, mesiodistal: 10.0, buccolingual: 9.5 },
      rootLengthMm: 11.0,
      pulpFloorAnatomyVi: 'Thường hợp nhất với các rãnh chữ C phức tạp, đối xứng với răng 48.',
      clinicalRisksVi: ['Tổn thương thần kinh huyệt răng dưới (IAN)', 'Tổn thương thần kinh lưỡi (Lingual nerve)', 'Gãy góc hàm khi dùng bẩy quá mức', 'Đẩy răng vào khoang dưới hàm (Submandibular space)'],
      recommendedAnesthesiaVi: ['Gây tê gai Spix (IAN block) + Gây tê thần kinh má + Gây tê thần kinh lưỡi']
    }
  },

  // ==========================================================================
  // QUADRANT 4: HÀM DƯỚI PHẢI (MANDIBULAR RIGHT — PATIENT RIGHT — FDI 41 - 48)
  // ==========================================================================
  41: {
    id: 'tooth.41',
    legacyId: 'tooth_41',
    fdi: 41,
    universalNumber: 25,
    palmer: '┐1',
    nameVi: 'Răng cửa giữa hàm dưới phải',
    nameEn: 'Mandibular right central incisor',
    latinName: 'Dens incisivus centralis inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'INCISOR',
    toothType: 'CENTRAL_INCISOR',
    positionIndex: 1,
    anatomyRegion: 'ANTERIOR_MANDIBLE',
    meshNodeName: 'Lower medial incisor.r',
    meshName: 'Lower medial incisor.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Lower_medial_incisor.r',
    landmarkId: 'landmark.tooth.41',
    craniofacialPos: [0.0420, 0.7405, 0.0790],
    wholeBodyPos: [-0.004, 1.330, 0.158],
    cameraFocus: {
      target: [0.0420, 0.7405, 0.0790],
      position: [0.0420 - 0.030, 0.7405 + 0.035, 0.0790 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.31',
    distalAdjacent: 'tooth.42',
    opposingTooth: 'tooth.11',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'incisive_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống ngoài', 'Ống trong (~40% có 2 ống tủy)'],
      vertucciClass: 'Vertucci Class III (1-2-1) hoặc Class II',
      crownDimensionsMm: { height: 9.0, mesiodistal: 5.0, buccolingual: 6.0 },
      rootLengthMm: 12.5,
      pulpFloorAnatomyVi: 'Thân răng đối xứng hoàn hảo quanh đường giữa với răng 31.',
      clinicalRisksVi: ['Bỏ sót ống tủy phụ phía lưỡi'],
      recommendedAnesthesiaVi: ['Gây tê thần kinh răng cửa hoặc tiêm ngấm']
    }
  },
  42: {
    id: 'tooth.42',
    legacyId: 'tooth_42',
    fdi: 42,
    universalNumber: 26,
    palmer: '┐2',
    nameVi: 'Răng cửa bên hàm dưới phải',
    nameEn: 'Mandibular right lateral incisor',
    latinName: 'Dens incisivus lateralis inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'INCISOR',
    toothType: 'LATERAL_INCISOR',
    positionIndex: 2,
    anatomyRegion: 'ANTERIOR_MANDIBLE',
    meshNodeName: 'Lower lateral incisor.r',
    meshName: 'Lower lateral incisor.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Lower_lateral_incisor.r',
    landmarkId: 'landmark.tooth.42',
    craniofacialPos: [0.0368, 0.7418, 0.0795],
    wholeBodyPos: [-0.010, 1.330, 0.157],
    cameraFocus: {
      target: [0.0368, 0.7418, 0.0795],
      position: [0.0368 - 0.035, 0.7418 + 0.035, 0.0795 + 0.075],
      distance: 0.10
    },
    mesialAdjacent: 'tooth.41',
    distalAdjacent: 'tooth.43',
    opposingTooth: 'tooth.12',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'incisive_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống ngoài', 'Ống trong'],
      vertucciClass: 'Vertucci Class III hoặc Class II',
      crownDimensionsMm: { height: 9.5, mesiodistal: 5.5, buccolingual: 6.5 },
      rootLengthMm: 13.5,
      pulpFloorAnatomyVi: 'Thân răng lớn hơn răng 41, bờ cắn nghiêng nhẹ về phía xa.',
      clinicalRisksVi: ['Bỏ sót ống tủy phụ phía lưỡi'],
      recommendedAnesthesiaVi: ['Gây tê thần kinh răng cửa hoặc tiêm ngấm']
    }
  },
  43: {
    id: 'tooth.43',
    legacyId: 'tooth_43',
    fdi: 43,
    universalNumber: 27,
    palmer: '┐3',
    nameVi: 'Răng nanh hàm dưới phải',
    nameEn: 'Mandibular right canine',
    latinName: 'Dens caninus inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'CANINE',
    toothType: 'CANINE',
    positionIndex: 3,
    anatomyRegion: 'ANTERIOR_MANDIBLE',
    meshNodeName: 'Lower canine.r',
    meshName: 'Lower canine.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Lower_canine.r',
    landmarkId: 'landmark.tooth.43',
    craniofacialPos: [0.0307, 0.7399, 0.0748],
    wholeBodyPos: [-0.016, 1.330, 0.154],
    cameraFocus: {
      target: [0.0307, 0.7399, 0.0748],
      position: [0.0307 - 0.038, 0.7399 + 0.035, 0.0748 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.42',
    distalAdjacent: 'tooth.44',
    opposingTooth: 'tooth.13',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'incisive_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống chính đơn (~15% phân 2 chân Ngoài - Trong)'],
      vertucciClass: 'Vertucci Class I (85%), Class II/IV (15%)',
      crownDimensionsMm: { height: 11.0, mesiodistal: 7.0, buccolingual: 7.5 },
      rootLengthMm: 15.5,
      pulpFloorAnatomyVi: 'Chân răng hình nón chắc khỏe, cắm sâu vào bờ xương hàm dưới.',
      clinicalRisksVi: ['Bỏ sót chân răng phụ phía lưỡi'],
      recommendedAnesthesiaVi: ['Gây tê thần kinh răng cửa hoặc gây tê gai Spix']
    }
  },
  44: {
    id: 'tooth.44',
    legacyId: 'tooth_44',
    fdi: 44,
    universalNumber: 28,
    palmer: '┐4',
    nameVi: 'Răng cối nhỏ thứ nhất hàm dưới phải',
    nameEn: 'Mandibular right first premolar',
    latinName: 'Dens praemolaris primus inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'PREMOLAR',
    toothType: 'FIRST_PREMOLAR',
    positionIndex: 4,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower first premolar.r',
    meshName: 'Lower first premolar.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Lower_first_premolar.r',
    landmarkId: 'landmark.tooth.44',
    craniofacialPos: [0.0259, 0.7441, 0.0690],
    wholeBodyPos: [-0.021, 1.330, 0.151],
    cameraFocus: {
      target: [0.0259, 0.7441, 0.0690],
      position: [0.0259 - 0.040, 0.7441 + 0.035, 0.0690 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.43',
    distalAdjacent: 'tooth.45',
    opposingTooth: 'tooth.14',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống chính (phân nhánh chạc ba 1/3 chóp ở ~25% trường hợp)'],
      vertucciClass: 'Vertucci Class V (1-2) hoặc Class IV',
      crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 7.5 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Mặt nhai nghiêng nhiều về phía lưỡi (~30°).',
      clinicalRisksVi: ['Thủng thành ngoài khi mở tủy do độ nghiêng lưỡi', 'Sát lỗ cằm'],
      recommendedAnesthesiaVi: ['Gây tê lỗ cằm hoặc gây tê gai Spix']
    }
  },
  45: {
    id: 'tooth.45',
    legacyId: 'tooth_45',
    fdi: 45,
    universalNumber: 29,
    palmer: '┐5',
    nameVi: 'Răng cối nhỏ thứ hai hàm dưới phải',
    nameEn: 'Mandibular right second premolar',
    latinName: 'Dens praemolaris secundus inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'PREMOLAR',
    toothType: 'SECOND_PREMOLAR',
    positionIndex: 5,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower second premolar.r',
    meshName: 'Lower second premolar.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Lower_second_premolar.r',
    landmarkId: 'landmark.tooth.45',
    craniofacialPos: [0.0220, 0.7464, 0.0616],
    wholeBodyPos: [-0.025, 1.330, 0.147],
    cameraFocus: {
      target: [0.0220, 0.7464, 0.0616],
      position: [0.0220 - 0.042, 0.7464 + 0.035, 0.0616 + 0.075],
      distance: 0.11
    },
    mesialAdjacent: 'tooth.44',
    distalAdjacent: 'tooth.46',
    opposingTooth: 'tooth.15',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 1,
      canalCount: 1,
      canalNames: ['Ống trung tâm đơn (88%)'],
      vertucciClass: 'Vertucci Class I (88%), Class II/V (12%)',
      crownDimensionsMm: { height: 8.0, mesiodistal: 7.0, buccolingual: 8.0 },
      rootLengthMm: 14.5,
      pulpFloorAnatomyVi: 'Thân răng dạng tròn hoặc vuông, 3 múi (1 ngoài, 2 trong).',
      clinicalRisksVi: ['Chóp chân răng nằm sát quai trước thần kinh cằm'],
      recommendedAnesthesiaVi: ['Gây tê gai Spix hoặc gây tê lỗ cằm/răng cửa']
    }
  },
  46: {
    id: 'tooth.46',
    legacyId: 'tooth_46',
    fdi: 46,
    universalNumber: 30,
    palmer: '┐6',
    nameVi: 'Răng cối lớn thứ nhất hàm dưới phải',
    nameEn: 'Mandibular right first molar',
    latinName: 'Dens molaris primus inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'MOLAR',
    toothType: 'FIRST_MOLAR',
    positionIndex: 6,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower first molar tooth.r',
    meshName: 'Lower first molar tooth.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Lower_first_molar_tooth.r',
    landmarkId: 'landmark.tooth.46',
    // EXACT WORLD COORDINATES in skull_complete.glb
    craniofacialPos: [0.0186, 0.7487, 0.0519],
    wholeBodyPos: [-0.029, 1.332, 0.140],
    cameraFocus: {
      target: [0.0186, 0.7487, 0.0519],
      position: [0.0186 - 0.045, 0.7487 + 0.035, 0.0519 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.45',
    distalAdjacent: 'tooth.47',
    opposingTooth: 'tooth.16',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 3,
      canalNames: ['Ống gần ngoài (MB)', 'Ống gần trong (ML)', 'Ống xa (Distal x1 hoặc DB + DL)'],
      vertucciClass: 'Chân gần: Vertucci Class IV (2 ống riêng biệt) hoặc Class II; Chân xa: Class I hoặc II',
      crownDimensionsMm: { height: 7.5, mesiodistal: 11.0, buccolingual: 10.5 },
      rootLengthMm: 14.0,
      pulpFloorAnatomyVi: 'Sàn tủy hình thang, rãnh nối sàn tủy hình chữ Y ngược; chân phụ trong (Radix Entomolaris) nằm ở phía xa-trong.',
      clinicalRisksVi: [
        'Bỏ sót chân phụ trong (Radix Entomolaris) nằm ở phía xa-trong',
        'Thủng thành dẹt phía xa của chân gần (Strip perforation) do giũa quá mức',
        'Đứt gãy trâm ở ống MB cong 2 bình diện'
      ],
      recommendedAnesthesiaVi: ['Gây tê gai Spix / IAN Block', 'Gây tê Gow-Gates', 'Gây tê dây chằng nha chu bổ sung']
    }
  },
  47: {
    id: 'tooth.47',
    legacyId: 'tooth_47',
    fdi: 47,
    universalNumber: 31,
    palmer: '┐7',
    nameVi: 'Răng cối lớn thứ hai hàm dưới phải',
    nameEn: 'Mandibular right second molar',
    latinName: 'Dens molaris secundus inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'MOLAR',
    toothType: 'SECOND_MOLAR',
    positionIndex: 7,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'Lower second molar tooth.r',
    meshName: 'Lower second molar tooth.001',
    isMirroredMesh: false,
    assetId: 'skull_complete.glb#Lower_second_molar_tooth.r',
    landmarkId: 'landmark.tooth.47',
    craniofacialPos: [0.0148, 0.7537, 0.0402],
    wholeBodyPos: [-0.032, 1.332, 0.132],
    cameraFocus: {
      target: [0.0148, 0.7537, 0.0402],
      position: [0.0148 - 0.045, 0.7537 + 0.035, 0.0402 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.46',
    distalAdjacent: 'tooth.48',
    opposingTooth: 'tooth.17',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 3,
      canalNames: ['MB', 'ML', 'Distal'],
      vertucciClass: 'Biến dị hình thái hệ thống ống tủy hình chữ C (C-shaped canal, tỷ lệ 30-40% ở người châu Á)',
      crownDimensionsMm: { height: 7.0, mesiodistal: 10.5, buccolingual: 10.0 },
      rootLengthMm: 13.0,
      pulpFloorAnatomyVi: 'Các chân răng có xu hướng chụm vào nhau, rãnh sàn tủy uốn lượn liên tục hình chữ C từ ngoài qua gần đến trong.',
      clinicalRisksVi: ['Khó bơm rửa và trám bít kín hệ thống eo nối chữ C (isthmus)', 'Chóp răng nằm rất gần ống thần kinh hàm dưới'],
      recommendedAnesthesiaVi: ['Gây tê gai Spix (IAN block) + Gây tê thần kinh má']
    }
  },
  48: {
    id: 'tooth.48',
    legacyId: 'tooth_48',
    fdi: 48,
    universalNumber: 32,
    palmer: '┐8',
    nameVi: 'Răng khôn dưới phải',
    nameEn: 'Mandibular right third molar',
    latinName: 'Dens molaris tertius inferior dexter',
    dentition: 'PERMANENT',
    jaw: 'MANDIBLE',
    side: 'RIGHT',
    quadrant: 4,
    toothClass: 'MOLAR',
    toothType: 'THIRD_MOLAR',
    positionIndex: 8,
    anatomyRegion: 'POSTERIOR_MANDIBLE',
    meshNodeName: 'MandibularThirdMolar_48',
    meshName: 'MandibularThirdMolar_48_Crown',
    isMirroredMesh: false,
    assetId: 'dental/mandibular_third_molar_48.glb',
    dedicatedAssetUrl: '/models/dental/mandibular_third_molar_48.glb',
    landmarkId: 'landmark.tooth.48',
    craniofacialPos: [0.0118, 0.7580, 0.0295],
    wholeBodyPos: [-0.034, 1.332, 0.124],
    cameraFocus: {
      target: [0.0118, 0.7580, 0.0295],
      position: [0.0118 - 0.045, 0.7580 + 0.035, 0.0295 + 0.075],
      distance: 0.12
    },
    mesialAdjacent: 'tooth.47',
    distalAdjacent: null,
    opposingTooth: 'tooth.18',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    bloodSupplyId: 'inferior_alveolar_artery',
    morphology: {
      rootCount: 2,
      canalCount: 2,
      canalNames: ['Ống gần', 'Ống xa (hoặc hợp nhất C-shaped)'],
      vertucciClass: 'Biến dị hình thái cực kỳ phong phú, phổ biến hệ thống ống tủy hình chữ C (C-shaped canal)',
      crownDimensionsMm: { height: 7.0, mesiodistal: 10.0, buccolingual: 9.5 },
      rootLengthMm: 11.0,
      pulpFloorAnatomyVi: 'Chân răng thường chụm, uốn cong móc câu về phía sau hoặc ôm lấy ống thần kinh huyệt răng dưới (IAN).',
      clinicalRisksVi: [
        'Tê môi cằm vĩnh viễn hoặc tạm thời do tổn thương thần kinh huyệt răng dưới (IAN)',
        'Tổn thương thần kinh lưỡi (Lingual nerve) gây mất cảm giác và vị giác 2/3 trước lưỡi',
        'Gãy xương góc hàm khi mở xương hoặc dùng lực bẩy quá mức',
        'Đẩy chân răng vào khoang dưới hàm hoặc ống thần kinh'
      ],
      recommendedAnesthesiaVi: ['Gây tê gai Spix (IAN block)', 'Gây tê Gow-Gates', 'Gây tê thần kinh má bổ sung']
    }
  }
};

/**
 * Fast lookup maps
 */
export const FDI_TOOTH_MAP = TOOTH_REGISTRY;

export const TOOTH_ID_MAP: Record<string, ToothRecord> = {};
export const MESH_NODE_TO_FDI_MAP: Record<string, number> = {};

Object.values(TOOTH_REGISTRY).forEach((t) => {
  TOOTH_ID_MAP[t.id] = t;
  TOOTH_ID_MAP[t.legacyId] = t;
  TOOTH_ID_MAP[String(t.fdi)] = t;
  MESH_NODE_TO_FDI_MAP[t.meshNodeName] = t.fdi;
});

// Also map lowercase & normalized mesh node names
Object.values(TOOTH_REGISTRY).forEach((t) => {
  MESH_NODE_TO_FDI_MAP[t.meshNodeName.toLowerCase()] = t.fdi;
  if (t.meshName) {
    MESH_NODE_TO_FDI_MAP[t.meshName.toLowerCase()] = t.fdi;
  }
});
