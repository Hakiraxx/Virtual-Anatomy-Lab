/**
 * MEDANATOMY 3D — DENTAL LANDMARK REGISTRY
 * Authoritative 3D anatomical reference landmarks for maxillofacial and dental structures.
 * 
 * Coordinate System:
 * - Patient Anterior: +Z
 * - Patient Posterior: -Z
 * - Superior: +Y
 * - Inferior: -Y
 * - Patient Right: X < 0.0451 (Screen Left in frontal view)
 * - Patient Left: X > 0.0451 (Screen Right in frontal view)
 * - Midline Sagittal Plane: X = 0.0451
 */

export interface DentalLandmark {
  id: string;
  nameVi: string;
  nameEn: string;
  latinName: string;
  region: 'MAXILLA' | 'MANDIBLE' | 'CRANIOFACIAL_BASE';
  position: [number, number, number];
  descriptionVi: string;
  descriptionEn: string;
}

export const DENTAL_LANDMARKS: Record<string, DentalLandmark> = {
  // --- DENTAL MIDLINE LANDMARKS ---
  'midline.maxillary': {
    id: 'midline.maxillary',
    nameVi: 'Đường giữa cung răng hàm trên (Giữa R11 và R21)',
    nameEn: 'Maxillary Dental Midline (Between #11 and #21)',
    latinName: 'Linea mediana dentalis superior',
    region: 'MAXILLA',
    position: [0.0451, 0.7629, 0.0874],
    descriptionVi: 'Điểm tiếp xúc mặt gần giữa răng cửa giữa 11 và 21, làm mốc thẩm mỹ trung tâm cung cười.',
    descriptionEn: 'Interproximal contact between #11 and #21; primary aesthetic midline landmark.'
  },
  'midline.mandibular': {
    id: 'midline.mandibular',
    nameVi: 'Đường giữa cung răng hàm dưới (Giữa R31 và R41)',
    nameEn: 'Mandibular Dental Midline (Between #31 and #41)',
    latinName: 'Linea mediana dentalis inferior',
    region: 'MANDIBLE',
    position: [0.0451, 0.7405, 0.0790],
    descriptionVi: 'Điểm tiếp xúc mặt gần giữa hai răng cửa giữa hàm dưới 31 và 41.',
    descriptionEn: 'Interproximal contact between #31 and #41.'
  },

  // --- REGIONAL LANDMARKS ---
  'region.incisor.maxillary': {
    id: 'region.incisor.maxillary',
    nameVi: 'Vùng răng cửa hàm trên (R12 - R22)',
    nameEn: 'Maxillary Incisor Region (#12 to #22)',
    latinName: 'Regio incisiva superior',
    region: 'MAXILLA',
    position: [0.0451, 0.7635, 0.0855],
    descriptionVi: 'Vùng răng trước hàm trên bao gồm răng cửa giữa và răng cửa bên hai bên.',
    descriptionEn: 'Anterior maxillary dentition zone.'
  },
  'region.canine.maxillary.right': {
    id: 'region.canine.maxillary.right',
    nameVi: 'Gờ nanh hàm trên phải (R13)',
    nameEn: 'Maxillary Right Canine Eminence (#13)',
    latinName: 'Eminentia canina dexterior',
    region: 'MAXILLA',
    position: [0.0261, 0.7670, 0.0792],
    descriptionVi: 'Gờ xương lồi nổi bật nâng đỡ góc miệng và rãnh mũi má bên phải.',
    descriptionEn: 'Bony ridge formed by the prominent root of the maxillary right canine.'
  },
  'region.canine.maxillary.left': {
    id: 'region.canine.maxillary.left',
    nameVi: 'Gờ nanh hàm trên trái (R23)',
    nameEn: 'Maxillary Left Canine Eminence (#23)',
    latinName: 'Eminentia canina sinister',
    region: 'MAXILLA',
    position: [0.0641, 0.7670, 0.0792],
    descriptionVi: 'Gờ xương lồi bờ ngoài răng nanh trên trái.',
    descriptionEn: 'Bony ridge formed by the root of the maxillary left canine.'
  },
  'region.molar.mandibular.right': {
    id: 'region.molar.mandibular.right',
    nameVi: 'Vùng răng cối hàm dưới phải (R46 - R48)',
    nameEn: 'Mandibular Right Molar Region (#46 to #48)',
    latinName: 'Regio molaris inferior dexterior',
    region: 'MANDIBLE',
    position: [0.0165, 0.7510, 0.0450],
    descriptionVi: 'Xương hàm dưới vùng cối lớn bên phải, nơi răng 46, 47, 48 liên hệ mật thiết với ống thần kinh răng dưới.',
    descriptionEn: 'Posterior mandibular alveolar ridge housing #46-#48.'
  },
  'region.molar.mandibular.left': {
    id: 'region.molar.mandibular.left',
    nameVi: 'Vùng răng cối hàm dưới trái (R36 - R38)',
    nameEn: 'Mandibular Left Molar Region (#36 to #38)',
    latinName: 'Regio molaris inferior sinister',
    region: 'MANDIBLE',
    position: [0.0735, 0.7510, 0.0450],
    descriptionVi: 'Xương hàm dưới vùng cối lớn bên trái.',
    descriptionEn: 'Posterior mandibular alveolar ridge housing #36-#38.'
  },

  // --- FORAMINA & NERVE ENTRY LANDMARKS ---
  'foramen.mandibular.right': {
    id: 'foramen.mandibular.right',
    nameVi: 'Lỗ hàm dưới phải (Gai Spix / Lingula mandibulae)',
    nameEn: 'Right Mandibular Foramen (Spix Lingula)',
    latinName: 'Foramen mandibulae dexter',
    region: 'MANDIBLE',
    position: [0.0180, 0.7650, 0.0150],
    descriptionVi: 'Điểm mốc gây tê gai Spix: thần kinh huyệt răng dưới (IAN) chui vào ống hàm dưới.',
    descriptionEn: 'Target for standard IAN block anesthesia.'
  },
  'foramen.mandibular.left': {
    id: 'foramen.mandibular.left',
    nameVi: 'Lỗ hàm dưới trái (Gai Spix / Lingula mandibulae)',
    nameEn: 'Left Mandibular Foramen (Spix Lingula)',
    latinName: 'Foramen mandibulae sinister',
    region: 'MANDIBLE',
    position: [0.0720, 0.7650, 0.0150],
    descriptionVi: 'Điểm mốc gây tê gai Spix bên trái.',
    descriptionEn: 'Target for left IAN block anesthesia.'
  },
  'foramen.mental.right': {
    id: 'foramen.mental.right',
    nameVi: 'Lỗ cằm phải (Dưới chóp chân răng 44 - 45)',
    nameEn: 'Right Mental Foramen (Below #44-#45)',
    latinName: 'Foramen mentale dexter',
    region: 'MANDIBLE',
    position: [0.0240, 0.7350, 0.0650],
    descriptionVi: 'Nơi thần kinh cằm thoát ra chi phối cảm giác môi dưới và cằm bên phải.',
    descriptionEn: 'Exit for mental nerve supplying sensation to lower lip and chin.'
  },
  'foramen.mental.left': {
    id: 'foramen.mental.left',
    nameVi: 'Lỗ cằm trái (Dưới chóp chân răng 34 - 35)',
    nameEn: 'Left Mental Foramen (Below #34-#35)',
    latinName: 'Foramen mentale sinister',
    region: 'MANDIBLE',
    position: [0.0660, 0.7350, 0.0650],
    descriptionVi: 'Nơi thần kinh cằm bên trái thoát ra.',
    descriptionEn: 'Exit for left mental nerve.'
  }
};
