// ============================================================================
// CRANIOFACIAL & DENTAL NEUROANATOMY LAB - RELATIONAL ANATOMICAL DATABASE
// Based on Terminologia Anatomica (TA2), Gray's Anatomy 42nd ed, Netter Anatomy
// ============================================================================

export type StructureType =
  | 'cranial_nerve'
  | 'nerve_division'
  | 'nerve_branch'
  | 'terminal_branch'
  | 'foramen'
  | 'canal'
  | 'tooth'
  | 'bone'
  | 'muscle'
  | 'gland'
  | 'joint'
  | 'landmark';

export type RelationType =
  | 'branch_of'
  | 'originates_from'
  | 'passes_through'
  | 'travels_through'
  | 'enters'
  | 'exits'
  | 'innervates'
  | 'supplies'
  | 'communicates_with'
  | 'adjacent_to';

export interface AnatomyRelation {
  sourceId: string;
  relationType: RelationType;
  targetId: string;
  descriptionVi?: string;
  descriptionEn?: string;
}

export interface DentalNerveStructure {
  id: string;
  nameVi: string;
  nameEn: string;
  latinName: string;
  type: StructureType;
  cranialNerveNumber?: number; // 1 to 12
  division?: 'V1' | 'V2' | 'V3';
  parentNerveId?: string;
  originVi: string;
  originEn: string;
  courseVi: string;
  courseEn: string;
  foramenId?: string;
  canalId?: string;
  innervationVi: string;
  innervationEn: string;
  clinicalAnatomyVi: string;
  clinicalAnatomyEn: string;
  color: string;
  path3D?: [number, number, number][]; // 3D coordinates for Catmull-Rom spline trajectory
  cameraFocus: {
    position: [number, number, number];
    lookAt: [number, number, number];
    distance: number;
  };
  references: {
    terminologiaAnatomica: string;
    netterPlate?: number;
    graysPage?: string;
    reviewStatus: 'VERIFIED' | 'REVIEWED' | 'DRAFT';
    reviewedBy: string;
    reviewedAt: string;
  };
}

export interface CranialForamen {
  id: string;
  nameVi: string;
  nameEn: string;
  latinName: string;
  boneVi: string;
  boneEn: string;
  position: [number, number, number];
  structuresPassingThroughVi: string[];
  structuresPassingThroughEn: string[];
  relatedNerveIds: string[];
  clinicalSignificanceVi: string;
  clinicalSignificanceEn: string;
  cameraFocus: {
    position: [number, number, number];
    lookAt: [number, number, number];
  };
}

export interface ToothInnervation {
  fdi: number; // 11-18, 21-28, 31-38, 41-48
  universalNumber: number; // 1-32
  nameVi: string;
  nameEn: string;
  arch: 'maxillary' | 'mandibular';
  quadrant: 1 | 2 | 3 | 4;
  toothType: 'incisor' | 'canine' | 'premolar' | 'molar';
  rootCount: number;
  canalCount: string;
  pulpInnervationId: string;
  periodontalInnervationId: string;
  buccalGingivaInnervationId: string;
  lingualGingivaInnervationId: string;
  position3D: [number, number, number];
  anesthesiaTechniqueVi: string;
  anesthesiaTechniqueEn: string;
}

export interface MuscleOfMastication {
  id: string;
  nameVi: string;
  nameEn: string;
  latinName: string;
  originVi: string;
  originEn: string;
  insertionVi: string;
  insertionEn: string;
  actionVi: string;
  actionEn: string;
  innervationId: string; // usually nerve branch of V3
  bloodSupplyVi: string;
  bloodSupplyEn: string;
}

export interface ClinicalAnesthesiaTechnique {
  id: string;
  nameVi: string;
  nameEn: string;
  targetNerveIds: string[];
  landmarkVi: string;
  landmarkEn: string;
  needleTargetPosition: [number, number, number];
  anesthetizedStructuresVi: string[];
  anesthetizedStructuresEn: string[];
  potentialComplicationsVi: string[];
  potentialComplicationsEn: string[];
  educationalNoteVi: string;
  educationalNoteEn: string;
}

// ============================================================================
// 1. CRANIAL NERVES & TRIGEMINAL DEEP HIERARCHY
// ============================================================================

export const DENTAL_NERVE_STRUCTURES: Record<string, DentalNerveStructure> = {
  // --- CN I ---
  'cn_1': {
    id: 'cn_1',
    nameVi: 'Dây thần kinh Khứu giác (CN I)',
    nameEn: 'Olfactory Nerve (CN I)',
    latinName: 'Nervus olfactorius [I]',
    type: 'cranial_nerve',
    cranialNerveNumber: 1,
    originVi: 'Các tế bào thụ cảm khứu giác ở niêm mạc mũi phần trên',
    originEn: 'Olfactory receptor neurons in upper nasal mucosa',
    courseVi: 'Xuyên qua mảnh sàng xương sàng để vào hành khứu ở nền sọ trước',
    courseEn: 'Passes through cribriform plate of ethmoid bone to olfactory bulb',
    foramenId: 'cribriform_foramina',
    innervationVi: 'Cảm giác đặc biệt: Khứu giác (mùi vị)',
    innervationEn: 'Special sensory: Olfaction (smell)',
    clinicalAnatomyVi: 'Chấn thương tầng sọ trước gãy xương sàng gây rò dịch não tủy qua mũi và mất khứu giác (anosmia).',
    clinicalAnatomyEn: 'Anterior skull base trauma can cause CSF rhinorrhea and anosmia.',
    color: '#fbbf24',
    cameraFocus: { position: [0, 1.48, 0.45], lookAt: [0, 1.43, 0.05], distance: 0.35 },
    references: {
      terminologiaAnatomica: 'A14.2.01.004',
      netterPlate: 121,
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN II ---
  'cn_2': {
    id: 'cn_2',
    nameVi: 'Dây thần kinh Thị giác (CN II)',
    nameEn: 'Optic Nerve (CN II)',
    latinName: 'Nervus opticus [II]',
    type: 'cranial_nerve',
    cranialNerveNumber: 2,
    originVi: 'Các tế bào hạch võng mạc của nhãn cầu',
    originEn: 'Ganglion cells of the retina',
    courseVi: 'Chạy từ cực sau nhãn cầu, qua ống thị giác vào hố sọ giữa tạo giao thoa thị giác',
    courseEn: 'Extends from posterior eyeball through optic canal into middle cranial fossa forming optic chiasm',
    foramenId: 'optic_canal',
    innervationVi: 'Cảm giác đặc biệt: Thị giác (ánh sáng và hình ảnh)',
    innervationEn: 'Special sensory: Vision',
    clinicalAnatomyVi: 'Tổn thương giao thoa thị giác do u tuyến yên chèn ép gây bán manh hai thái dương.',
    clinicalAnatomyEn: 'Pituitary adenoma compressing chiasm leads to bitemporal hemianopsia.',
    color: '#f59e0b',
    cameraFocus: { position: [0, 1.45, 0.42], lookAt: [0, 1.42, 0.08], distance: 0.35 },
    references: {
      terminologiaAnatomica: 'A14.2.01.006',
      netterPlate: 122,
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN III ---
  'cn_3': {
    id: 'cn_3',
    nameVi: 'Dây thần kinh Vận nhãn (CN III)',
    nameEn: 'Oculomotor Nerve (CN III)',
    latinName: 'Nervus oculomotorius [III]',
    type: 'cranial_nerve',
    cranialNerveNumber: 3,
    originVi: 'Nhân vận nhãn ở trung não (cuống não)',
    originEn: 'Oculomotor nucleus and Edinger-Westphal nucleus in midbrain',
    courseVi: 'Chạy qua thành ngoài xoang hang, qua khe ổ mắt trên vào ổ mắt',
    courseEn: 'Traverses lateral wall of cavernous sinus, enters orbit via superior orbital fissure',
    foramenId: 'superior_orbital_fissure',
    innervationVi: 'Vận động 4 cơ vận nhãn (thẳng trên, thẳng dưới, thẳng trong, chéo dưới), cơ nâng mi trên; phó giao cảm co đồng tử',
    innervationEn: 'Motor to 4 extraocular muscles and levator palpebrae; parasympathetic to sphincter pupillae and ciliary muscle',
    clinicalAnatomyVi: 'Liệt dây III gây sụp mi, lác ngoài và giãn đồng tử mất phản xạ ánh sáng.',
    clinicalAnatomyEn: 'CN III palsy causes ptosis, "down-and-out" eye deviation, and pupil dilation.',
    color: '#ea580c',
    cameraFocus: { position: [0.08, 1.44, 0.40], lookAt: [0.02, 1.41, 0.08], distance: 0.35 },
    references: {
      terminologiaAnatomica: 'A14.2.01.007',
      netterPlate: 123,
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN IV ---
  'cn_4': {
    id: 'cn_4',
    nameVi: 'Dây thần kinh Ròng rọc (CN IV)',
    nameEn: 'Trochlear Nerve (CN IV)',
    latinName: 'Nervus trochlearis [IV]',
    type: 'cranial_nerve',
    cranialNerveNumber: 4,
    originVi: 'Nhân ròng rọc ở mặt sau trung não (dây thần kinh sọ duy nhất thoát ra ở mặt sau thân não)',
    originEn: 'Trochlear nucleus in dorsal midbrain (only CN emerging from posterior brainstem)',
    courseVi: 'Vòng quanh cuống đại não, qua xoang hang và khe ổ mắt trên vào ổ mắt',
    courseEn: 'Curves around cerebral peduncle, traverses cavernous sinus, enters orbit via superior orbital fissure',
    foramenId: 'superior_orbital_fissure',
    innervationVi: 'Vận động: Cơ chéo trên (kéo nhãn cầu xuống dưới và ra ngoài)',
    innervationEn: 'Motor: Superior oblique muscle (intorsion and depression when adducted)',
    clinicalAnatomyVi: 'Liệt dây IV gây nhìn đôi (song thị đứng), bệnh nhân thường nghiêng đầu sang bên đối diện để bù trừ.',
    clinicalAnatomyEn: 'CN IV palsy causes vertical diplopia; patients tilt head to opposite side.',
    color: '#d97706',
    cameraFocus: { position: [0.08, 1.43, 0.38], lookAt: [0.02, 1.41, 0.08], distance: 0.35 },
    references: {
      terminologiaAnatomica: 'A14.2.01.011',
      netterPlate: 123,
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN V: TRIGEMINAL TRUNK ---
  'cn_5': {
    id: 'cn_5',
    nameVi: 'Thần kinh Sinh ba / Dây V',
    nameEn: 'Trigeminal Nerve (CN V)',
    latinName: 'Nervus trigeminus [V]',
    type: 'cranial_nerve',
    cranialNerveNumber: 5,
    originVi: 'Mặt trước - bên cầu não bởi rễ cảm giác lớn và rễ vận động nhỏ hơn',
    originEn: 'Anterolateral pons via large sensory root and smaller medial motor root',
    courseVi: 'Đi từ hố sọ sau qua bờ trên xương đá vào hố sọ giữa, phình thành hạch sinh ba (Gasser) nằm trong hốc Meckel',
    courseEn: 'Travels from posterior fossa over petrous apex into middle fossa, forming trigeminal (Gasserian) ganglion in Meckel cave',
    foramenId: 'meckel_cave',
    innervationVi: 'Cảm giác toàn bộ vùng da mặt, mắt, khoang mũi, khoang miệng, các răng và 2/3 trước lưỡi; Vận động các cơ nhai',
    innervationEn: 'Sensory to facial skin, orbit, nasal and oral cavities, teeth, anterior 2/3 tongue; Motor to muscles of mastication',
    clinicalAnatomyVi: 'Đau dây thần kinh sinh ba (Trigeminal neuralgia / Tic douloureux): Cơn đau kịch phát như điện giật vùng mặt khi chạm nhẹ, nhai, nuốt hoặc đánh răng.',
    clinicalAnatomyEn: 'Trigeminal neuralgia causes excruciating electric-shock paroxysms triggered by chewing, speaking, or touching facial trigger points.',
    color: '#eab308',
    path3D: [
      [-0.010, 1.372, 0.068], // Root emergence at anterolateral surface of pons
      [-0.014, 1.378, 0.067], // Prepontine cisternal segment
      [-0.018, 1.388, 0.066], // Crossing petrous ridge (porus trigeminus)
      [-0.022, 1.398, 0.065], // Meckel cave entrance
      [-0.026, 1.405, 0.065]  // Trigeminal ganglion (Gasser) center
    ],
    cameraFocus: { position: [-0.15, 1.46, 0.32], lookAt: [-0.025, 1.39, 0.08], distance: 0.28 },
    references: {
      terminologiaAnatomica: 'A14.2.01.012',
      netterPlate: 124,
      graysPage: '601-615',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'trigeminal_ganglion': {
    id: 'trigeminal_ganglion',
    nameVi: 'Hạch Thần kinh Sinh ba (Hạch Gasser)',
    nameEn: 'Trigeminal Ganglion (Gasserian Ganglion)',
    latinName: 'Ganglion trigeminale (Gasseri)',
    type: 'cranial_nerve',
    cranialNerveNumber: 5,
    parentNerveId: 'cn_5',
    originVi: 'Chỗ phình hình bán nguyệt chứa thân nơ-ron cảm giác nguyên phát của dây V',
    originEn: 'Semilunar ganglion housing cell bodies of primary pseudounipolar sensory neurons',
    courseVi: 'Nằm trong hốc Meckel (Cavum trigeminale) trên ấn ngón tay mặt trước phần đá xương thái dương',
    courseEn: 'Rests in Meckel cave (cavum trigeminale) in a dural recess on the petrous apex in middle cranial fossa',
    foramenId: 'meckel_cave',
    innervationVi: 'Trạm tiếp vận cảm giác của toàn bộ 3 phân nhánh V1, V2, V3',
    innervationEn: 'Primary sensory station serving ophthalmic, maxillary, and mandibular divisions',
    clinicalAnatomyVi: 'Điều trị đau dây V trơ bằng phong bế hạch Gasser qua da qua lỗ bầu dục bằng sóng cao tần (Radiofrequency rhizotomy) hoặc tiêm glycerol.',
    clinicalAnatomyEn: 'Target for percutaneous radiofrequency ablation or glycerol injection via foramen ovale for intractable trigeminal neuralgia.',
    color: '#eab308',
    path3D: [
      [-0.022, 1.398, 0.065],
      [-0.026, 1.405, 0.065]
    ],
    cameraFocus: { position: [-0.08, 1.42, 0.22], lookAt: [-0.026, 1.405, 0.065], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.013',
      netterPlate: 124,
      graysPage: '603',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN V1: OPHTHALMIC DIVISION ---
  'cn_5_v1': {
    id: 'cn_5_v1',
    nameVi: 'Thần kinh Mắt — V1',
    nameEn: 'Ophthalmic Nerve — V1',
    latinName: 'Nervus ophthalmicus [V1]',
    type: 'nerve_division',
    cranialNerveNumber: 5,
    division: 'V1',
    parentNerveId: 'cn_5',
    originVi: 'Nhánh đầu tiên và nhỏ nhất tách từ bờ trước hạch sinh ba',
    originEn: 'First and smallest division from anterior border of trigeminal ganglion',
    courseVi: 'Chạy trong thành ngoài xoang hang bên dưới dây III và IV, đi qua khe ổ mắt trên chia thành 3 nhánh chính: Trán, Lệ, Mũi mi',
    courseEn: 'Travels in lateral wall of cavernous sinus below CN III and IV; enters orbit through superior orbital fissure',
    foramenId: 'superior_orbital_fissure',
    innervationVi: 'Cảm giác: Nhãn cầu, tuyến lệ, màng tiếp hợp, trán, da đầu trước, mi trên, xoang trán, sống mũi',
    innervationEn: 'Sensory: Eyeball, lacrimal gland, conjunctiva, forehead, anterior scalp, upper eyelid, frontal sinuses, dorsum of nose',
    clinicalAnatomyVi: 'Zona mắt (Herpes zoster ophthalmicus): Tổn thương da theo phân bố V1, nguy cơ loét giác mạc mất thị lực nếu có dấu hiệu Hutchinson (sang thương đầu mũi - nhánh mũi mi).',
    clinicalAnatomyEn: 'Herpes zoster ophthalmicus: risk of corneal ulceration when Hutchinson sign is present.',
    color: '#38bdf8',
    path3D: [
      [-0.026, 1.405, 0.065], // Trigeminal ganglion
      [-0.025, 1.408, 0.075], // Cavernous sinus postero-lateral
      [-0.025, 1.411, 0.088], // Cavernous sinus below CN IV
      [-0.024, 1.413, 0.098], // Annulus of Zinn proximity
      [-0.024, 1.415, 0.105], // Superior orbital fissure (SOF)
      [-0.025, 1.420, 0.115], // Retro-orbital cone
      [-0.026, 1.425, 0.125]  // Intra-orbital bifurcation
    ],
    cameraFocus: { position: [-0.07, 1.44, 0.30], lookAt: [-0.025, 1.420, 0.110], distance: 0.26 },
    references: {
      terminologiaAnatomica: 'A14.2.01.013',
      netterPlate: 125,
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- V1 BRANCHES ---
  'nerve_frontal': {
    id: 'nerve_frontal',
    nameVi: 'Thần kinh Trán',
    nameEn: 'Frontal Nerve',
    latinName: 'Nervus frontalis',
    type: 'nerve_branch',
    division: 'V1',
    parentNerveId: 'cn_5_v1',
    originVi: 'Nhánh lớn nhất của V1, tách ra ngay sau khi qua khe ổ mắt trên',
    originEn: 'Largest branch of V1, arising just after superior orbital fissure',
    courseVi: 'Chạy thẳng về phía trước dưới trần ổ mắt, chia thành 2 nhánh: Thần kinh trên ròng rọc và Thần kinh trên ổ mắt',
    courseEn: 'Runs forward under orbital roof above levator palpebrae; bifurcates into supratrochlear and supraorbital nerves',
    innervationVi: 'Cảm giác trán, đỉnh đầu và mi mắt trên',
    innervationEn: 'Sensory to forehead, vertex of scalp, and upper eyelid',
    clinicalAnatomyVi: 'Gây tê thần kinh trên ổ mắt được ứng dụng trong khâu vết thương trán hoặc phẫu thuật mí mắt trên.',
    clinicalAnatomyEn: 'Supraorbital nerve block utilized for forehead lacerations and upper blepharoplasty.',
    color: '#0ea5e9',
    path3D: [
      [-0.026, 1.425, 0.125], // Division from V1 in orbit
      [-0.026, 1.430, 0.130], // Runs above levator palpebrae
      [-0.025, 1.436, 0.136], // Under orbital roof
      [-0.025, 1.442, 0.141], // Pre-septal course
      [-0.025, 1.445, 0.145]  // Supraorbital notch on frontal bone
    ],
    cameraFocus: { position: [-0.05, 1.48, 0.38], lookAt: [-0.025, 1.445, 0.145], distance: 0.25 },
    references: {
      terminologiaAnatomica: 'A14.2.01.014',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_supraorbital': {
    id: 'nerve_supraorbital',
    nameVi: 'Thần kinh Trên ổ mắt',
    nameEn: 'Supraorbital Nerve',
    latinName: 'Nervus supraorbitalis',
    type: 'terminal_branch',
    division: 'V1',
    parentNerveId: 'nerve_frontal',
    originVi: 'Nhánh ngoài và lớn hơn của thần kinh trán',
    originEn: 'Lateral and larger terminal branch of frontal nerve',
    courseVi: 'Chui qua lỗ (hoặc khuyết) trên ổ mắt của bờ trên xương trán lên vùng trán',
    courseEn: 'Passes through supraorbital notch/foramen on supraorbital margin onto forehead',
    foramenId: 'supraorbital_foramen',
    innervationVi: 'Cảm giác mi trên, da trán và da đầu kéo dài đến khớp lambda',
    innervationEn: 'Sensory to upper eyelid, conjunctiva, scalp up to lambdoid suture',
    clinicalAnatomyVi: 'Khuyết trên ổ mắt là mốc giải phẫu sờ thấy được ở bờ trên ổ mắt cách đường giữa khoảng 2.5cm.',
    clinicalAnatomyEn: 'Supraorbital notch is palpable ~2.5 cm lateral to midline on orbital rim.',
    color: '#38bdf8',
    path3D: [
      [-0.025, 1.445, 0.145], // Supraorbital notch on orbital rim
      [-0.025, 1.454, 0.144], // Exits onto supraorbital rim
      [-0.024, 1.466, 0.141], // Ascends beneath frontalis muscle
      [-0.023, 1.478, 0.134], // Hugs frontal bone curvature
      [-0.022, 1.490, 0.124], // Coronal suture approach
      [-0.020, 1.502, 0.108], // Vertex epicranial aponeurosis
      [-0.018, 1.510, 0.090]  // Scalp vertex (parietal distribution)
    ],
    cameraFocus: { position: [-0.06, 1.47, 0.30], lookAt: [-0.024, 1.465, 0.140], distance: 0.22 },
    references: {
      terminologiaAnatomica: 'A14.2.01.015',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN V2: MAXILLARY DIVISION (CRITICAL FOR DENTISTRY) ---
  'cn_5_v2': {
    id: 'cn_5_v2',
    nameVi: 'Thần kinh Hàm trên — V2',
    nameEn: 'Maxillary Nerve — V2',
    latinName: 'Nervus maxillaris [V2]',
    type: 'nerve_division',
    cranialNerveNumber: 5,
    division: 'V2',
    parentNerveId: 'cn_5',
    originVi: 'Nhánh giữa của hạch thần kinh sinh ba',
    originEn: 'Middle division of trigeminal ganglion',
    courseVi: 'Chạy qua lỗ tròn vào hố chân bướm - khẩu cái, băng qua khe ổ mắt dưới vào rãnh và ống dưới ổ mắt thành thần kinh dưới ổ mắt',
    courseEn: 'Exits middle fossa via foramen rotundum into pterygopalatine fossa, enters orbit via inferior orbital fissure, becoming infraorbital nerve',
    foramenId: 'foramen_rotundum',
    innervationVi: 'Cảm giác toàn bộ răng và xương hàm trên, xoang hàm trên, vòm miệng, khoang mũi, mi dưới, cánh mũi và môi trên',
    innervationEn: 'Sensory to maxillary teeth, maxilla, maxillary sinus, palate, nasal cavity, lower eyelid, side of nose, upper lip',
    clinicalAnatomyVi: 'Gây tê thần kinh hàm trên (Maxillary nerve block) tại hố chân bướm khẩu cái làm mất cảm giác toàn bộ nửa hàm trên, phục vụ phẫu thuật cắt khối hàm, nhổ răng phức tạp.',
    clinicalAnatomyEn: 'Maxillary block at pterygopalatine fossa anesthetizes entire hemimaxilla for extensive oral and maxillofacial surgeries.',
    color: '#f97316',
    path3D: [
      [-0.026, 1.405, 0.065], // Trigeminal ganglion anterior border
      [-0.025, 1.400, 0.072], // Middle cranial fossa floor
      [-0.024, 1.395, 0.080], // Foramen Rotundum
      [-0.024, 1.390, 0.090], // Enters Pterygopalatine fossa
      [-0.025, 1.385, 0.100], // Pterygopalatine fossa center (ganglion relay)
      [-0.026, 1.382, 0.110], // Inferior orbital fissure entrance
      [-0.028, 1.380, 0.120]  // Enters infraorbital groove
    ],
    cameraFocus: { position: [-0.07, 1.40, 0.28], lookAt: [-0.026, 1.385, 0.100], distance: 0.24 },
    references: {
      terminologiaAnatomica: 'A14.2.01.018',
      netterPlate: 126,
      graysPage: '605-608',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_infraorbital': {
    id: 'nerve_infraorbital',
    nameVi: 'Thần kinh Dưới ổ mắt',
    nameEn: 'Infraorbital Nerve',
    latinName: 'Nervus infraorbitalis',
    type: 'nerve_branch',
    division: 'V2',
    parentNerveId: 'cn_5_v2',
    originVi: 'Đoạn tận cùng của thần kinh hàm trên sau khi rời hố chân bướm khẩu cái',
    originEn: 'Direct continuation of maxillary nerve in orbit and face',
    courseVi: 'Chạy trong rãnh dưới ổ mắt rồi vào ống dưới ổ mắt ở sàn ổ mắt, chui ra mặt qua lỗ dưới ổ mắt chia các nhánh tận: mi dưới, mũi, môi trên',
    courseEn: 'Traverses infraorbital groove and canal in orbital floor, emerges onto face via infraorbital foramen',
    foramenId: 'infraorbital_foramen',
    canalId: 'infraorbital_canal',
    innervationVi: 'Cảm giác mi mắt dưới, mặt ngoài mũi, môi trên và niêm mạc môi trên',
    innervationEn: 'Sensory to lower eyelid, lateral nose, upper lip and labial mucosa',
    clinicalAnatomyVi: 'Gây tê lỗ dưới ổ mắt (Infraorbital nerve block): Kim hướng vào lỗ dưới ổ mắt (cách bờ dưới ổ mắt 5-8mm) giúp gây tê thần kinh huyệt răng trên trước (ASA), vô cảm răng cửa, răng nanh và môi trên.',
    clinicalAnatomyEn: 'Infraorbital block provides anesthesia to anterior superior alveolar nerve, numbing incisors, canine, and upper lip.',
    color: '#fb923c',
    path3D: [
      [-0.028, 1.380, 0.120], // Infraorbital groove on orbital floor
      [-0.028, 1.378, 0.128], // Mid-groove
      [-0.029, 1.374, 0.136], // Enters infraorbital canal
      [-0.030, 1.370, 0.145], // Exits Infraorbital Foramen on anterior maxilla
      [-0.029, 1.365, 0.149], // Pes anserinus minor (terminal branches)
      [-0.027, 1.358, 0.153], // Superior labial branches to upper lip
      [-0.025, 1.352, 0.155]  // Philtrum & labial commissure
    ],
    cameraFocus: { position: [-0.06, 1.38, 0.30], lookAt: [-0.030, 1.370, 0.145], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.026',
      netterPlate: 126,
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // SUPERIOR ALVEOLAR NERVES (DENTAL INNERVATION)
  'nerve_psa': {
    id: 'nerve_psa',
    nameVi: 'Thần kinh Huyệt răng trên sau (PSA)',
    nameEn: 'Posterior Superior Alveolar Nerve (PSA)',
    latinName: 'Nervi alveolares superiores posteriores',
    type: 'nerve_branch',
    division: 'V2',
    parentNerveId: 'cn_5_v2',
    originVi: 'Tách từ thần kinh hàm trên ngay trong hố chân bướm khẩu cái trước khi vào ổ mắt',
    originEn: 'Branches from maxillary nerve in pterygopalatine fossa before entering orbit',
    courseVi: 'Đi xuống mặt sau lồi củ xương hàm trên, chui qua các lỗ huyệt răng sau vào trong xoang hàm',
    courseEn: 'Descends on infratemporal surface of maxilla, enters posterior alveolar foramina to maxillary sinus mucosa and molars',
    foramenId: 'posterior_alveolar_foramina',
    innervationVi: 'Tủy và nha chu các răng cối lớn hàm trên (răng 16, 17, 18 hoặc 26, 27, 28) — ngoại trừ chân gần ngoài răng cối lớn thứ nhất (răng số 6)',
    innervationEn: 'Pulp and periodontium of maxillary 1st, 2nd, 3rd molars (except mesiobuccal root of 1st molar in 72% cases)',
    clinicalAnatomyVi: 'Gây tê PSA (Posterior Superior Alveolar block): Nguy cơ đâm trúng đám rối tĩnh mạch chân bướm hoặc động mạch hàm trên gây tụ máu lớn vùng má (hematoma).',
    clinicalAnatomyEn: 'PSA block carries risk of pterygoid venous plexus or maxillary artery puncture causing extensive cheek hematoma.',
    color: '#fdba74',
    path3D: [
      [-0.025, 1.385, 0.100], // Branching from V2 in pterygopalatine fossa
      [-0.029, 1.380, 0.106], // Crosses infratemporal surface of maxilla
      [-0.033, 1.374, 0.114], // Descends along maxillary tuberosity
      [-0.035, 1.365, 0.122], // Posterior superior alveolar foramina
      [-0.035, 1.355, 0.130], // Alveolar bone above tooth 18/28 (3rd molar)
      [-0.032, 1.346, 0.136], // Alveolar bone above tooth 17/27 (2nd molar)
      [-0.029, 1.342, 0.142]  // Alveolar bone above tooth 16/26 (1st molar, DB/palatal roots)
    ],
    cameraFocus: { position: [-0.07, 1.36, 0.28], lookAt: [-0.035, 1.360, 0.120], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.028',
      netterPlate: 126,
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_msa': {
    id: 'nerve_msa',
    nameVi: 'Thần kinh Huyệt răng trên giữa (MSA)',
    nameEn: 'Middle Superior Alveolar Nerve (MSA)',
    latinName: 'Ramus alveolaris superior medius',
    type: 'nerve_branch',
    division: 'V2',
    parentNerveId: 'nerve_infraorbital',
    originVi: 'Tách từ thần kinh dưới ổ mắt ở đoạn sau của ống dưới ổ mắt (hiện diện ở khoảng 28-54% cá thể)',
    originEn: 'Branches from infraorbital nerve in posterior infraorbital canal (present in 28-54% individuals)',
    courseVi: 'Chạy xuống trong thành ngoài xoang hàm trên tham gia đám rối thần kinh răng trên',
    courseEn: 'Runs down lateral wall of maxillary sinus to superior dental plexus',
    innervationVi: 'Tủy và nha chu 2 răng cối nhỏ hàm trên (răng số 4, 5) và chân gần ngoài răng cối lớn 1 (răng số 6)',
    innervationEn: 'Pulp and periodontium of maxillary premolars and mesiobuccal root of 1st molar',
    clinicalAnatomyVi: 'Khi không có nhánh MSA, vùng chi phối của nó do nhánh PSA và ASA đảm nhiệm.',
    clinicalAnatomyEn: 'When MSA is absent, its innervation territory is shared between PSA and ASA branches.',
    color: '#fed7aa',
    path3D: [
      [-0.029, 1.375, 0.132], // Branches from infraorbital canal (posterior section)
      [-0.030, 1.368, 0.136], // Enters lateral wall of maxillary sinus
      [-0.030, 1.360, 0.140], // Descends through canalis sinuosus branch
      [-0.028, 1.352, 0.144], // Alveolar bone above tooth 16 MB root
      [-0.025, 1.346, 0.147], // Alveolar bone above tooth 15/25 (2nd premolar)
      [-0.022, 1.342, 0.150]  // Alveolar bone above tooth 14/24 (1st premolar)
    ],
    cameraFocus: { position: [-0.06, 1.36, 0.28], lookAt: [-0.029, 1.355, 0.140], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.029',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_asa': {
    id: 'nerve_asa',
    nameVi: 'Thần kinh Huyệt răng trên trước (ASA)',
    nameEn: 'Anterior Superior Alveolar Nerve (ASA)',
    latinName: 'Rami alveolares superiores anteriores',
    type: 'nerve_branch',
    division: 'V2',
    parentNerveId: 'nerve_infraorbital',
    originVi: 'Tách từ thần kinh dưới ổ mắt trước khi ra khỏi lỗ dưới ổ mắt khoảng 5mm',
    originEn: 'Branches from infraorbital nerve ~5mm prior to exiting infraorbital foramen',
    courseVi: 'Chạy xuống trong thành trước xương hàm trên, cấp nhánh cho sàn mũi và răng trước',
    courseEn: 'Runs down anterior wall of maxilla within canalis sinuosus to anterior teeth',
    innervationVi: 'Tủy và nha chu các răng cửa và răng nanh hàm trên (răng 11, 12, 13 hoặc 21, 22, 23); niêm mạc sàn mũi',
    innervationEn: 'Pulp and periodontium of maxillary central incisors, lateral incisors, and canines',
    clinicalAnatomyVi: 'Gây tê ngấm tại ngách lợi tương ứng chóp răng cửa trên hoặc gây tê lỗ dưới ổ mắt làm vô cảm toàn bộ nhóm răng trước trên.',
    clinicalAnatomyEn: 'Infiltration at the mucobuccal fold above canine/incisor apex blocks ASA.',
    color: '#ffedd5',
    path3D: [
      [-0.030, 1.370, 0.143], // Branches from infraorbital canal ~5mm before foramen
      [-0.028, 1.365, 0.148], // Travels through anterior maxilla bone
      [-0.024, 1.358, 0.152], // Canalis sinuosus course
      [-0.019, 1.352, 0.155], // Alveolar bone above tooth 13/23 (canine)
      [-0.014, 1.346, 0.157], // Alveolar bone above tooth 12/22 (lateral incisor)
      [-0.007, 1.342, 0.158], // Alveolar bone above tooth 11/21 (central incisor)
      [-0.002, 1.341, 0.159]  // Nasal septal branch near anterior nasal spine
    ],
    cameraFocus: { position: [-0.05, 1.36, 0.30], lookAt: [-0.020, 1.350, 0.150], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.030',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_greater_palatine': {
    id: 'nerve_greater_palatine',
    nameVi: 'Thần kinh Khẩu cái lớn',
    nameEn: 'Greater Palatine Nerve',
    latinName: 'Nervus palatinus major',
    type: 'nerve_branch',
    division: 'V2',
    parentNerveId: 'cn_5_v2',
    originVi: 'Nhánh hạch chân bướm khẩu cái từ thần kinh hàm trên',
    originEn: 'Branches from pterygopalatine ganglion / maxillary nerve',
    courseVi: 'Đi xuống qua ống khẩu cái lớn, chui ra ở lỗ khẩu cái lớn (ngang răng cối lớn 2-3), chạy ra trước dọc rãnh khẩu cái',
    courseEn: 'Descends via greater palatine canal, exits greater palatine foramen near 2nd/3rd molar, travels forward in palatal groove',
    foramenId: 'greater_palatine_foramen',
    innervationVi: 'Cảm giác niêm mạc và màng xương của vòm miệng cứng từ răng cối lớn đến phía sau răng nanh',
    innervationEn: 'Sensory to hard palate mucosa and palatal gingiva from molars forward to canine',
    clinicalAnatomyVi: 'Gây tê lỗ khẩu cái lớn (Greater palatine block): Điểm chọc kim cách bờ lợi răng cối lớn hàm trên 1cm về phía đường giữa, phục vụ nhổ răng hàm trên không đau phần vòm miệng.',
    clinicalAnatomyEn: 'Greater palatine block numbs palatal soft tissues of posterior teeth for extractions and periodontal surgery.',
    color: '#fbbf24',
    path3D: [
      [-0.025, 1.385, 0.100], // Pterygopalatine ganglion in fossa
      [-0.024, 1.376, 0.104], // Descends into greater palatine canal
      [-0.022, 1.365, 0.110], // Within pterygopalatine canal
      [-0.020, 1.354, 0.114], // Approaching hard palate
      [-0.018, 1.345, 0.118], // Exits Greater Palatine Foramen near 2nd/3rd molar
      [-0.017, 1.345, 0.126], // Runs anteriorly in palatal groove
      [-0.015, 1.345, 0.136], // Lingual gingival plexus of premolars
      [-0.012, 1.345, 0.144]  // Anastomoses with nasopalatine nerve behind canine
    ],
    cameraFocus: { position: [-0.05, 1.35, 0.25], lookAt: [-0.018, 1.345, 0.125], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.024',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_nasopalatine': {
    id: 'nerve_nasopalatine',
    nameVi: 'Thần kinh Mũi khẩu cái (Scarpa)',
    nameEn: 'Nasopalatine Nerve',
    latinName: 'Nervus nasopalatinus',
    type: 'nerve_branch',
    division: 'V2',
    parentNerveId: 'cn_5_v2',
    originVi: 'Tách từ hạch chân bướm khẩu cái đi vào khoang mũi qua lỗ bướm khẩu cái',
    originEn: 'Branches from pterygopalatine ganglion entering nasal cavity via sphenopalatine foramen',
    courseVi: 'Chạy chéo xuống dưới và ra trước dọc theo vách ngăn mũi, chui qua ống răng cửa ra lỗ răng cửa ở vòm miệng',
    courseEn: 'Crosses nasal septum anteroinferiorly, enters incisive canal, emerges through incisive foramen into anterior palate',
    foramenId: 'incisive_foramen',
    canalId: 'incisive_canal',
    innervationVi: 'Cảm giác phần trước vòm miệng cứng (vùng răng cửa trên từ nanh nọ sang nanh kia)',
    innervationEn: 'Sensory to palatal mucosa of anterior premaxilla (canine to canine)',
    clinicalAnatomyVi: 'Gây tê lỗ răng cửa (Nasopalatine nerve block): Chọc kim cạnh nhú răng cửa (incisive papilla), là mũi tiêm gây cảm giác đau chói nhiều nhất trong miệng do niêm mạc dính chặt màng xương.',
    clinicalAnatomyEn: 'Nasopalatine block at incisive papilla is notoriously painful due to tightly bound mucoperiosteum.',
    color: '#fde047',
    path3D: [
      [-0.025, 1.385, 0.100], // Sphenopalatine foramen from pterygopalatine fossa
      [-0.020, 1.382, 0.108], // Roof of nasal cavity
      [-0.015, 1.378, 0.118], // Slants anteroinferiorly along vomer/septum
      [-0.009, 1.370, 0.128], // Medial wall of nasal cavity
      [-0.004, 1.360, 0.138], // Approaches floor of nasal cavity
      [0.000, 1.352, 0.144],  // Enters incisive canal (foramen of Stenson)
      [0.000, 1.345, 0.148]   // Exits Incisive Foramen onto premaxillary palate
    ],
    cameraFocus: { position: [0.00, 1.35, 0.28], lookAt: [0.000, 1.345, 0.148], distance: 0.18 },
    references: {
      terminologiaAnatomica: 'A14.2.01.023',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN V3: MANDIBULAR DIVISION (CORNERSTONE OF DENTAL ANATOMY) ---
  'cn_5_v3': {
    id: 'cn_5_v3',
    nameVi: 'Thần kinh Hàm dưới — V3',
    nameEn: 'Mandibular Nerve — V3',
    latinName: 'Nervus mandibularis [V3]',
    type: 'nerve_division',
    cranialNerveNumber: 5,
    division: 'V3',
    parentNerveId: 'cn_5',
    originVi: 'Nhánh lớn nhất của dây V, hợp nhất rễ cảm giác từ hạch sinh ba và toàn bộ rễ vận động của dây V',
    originEn: 'Largest division of CN V; mixed nerve uniting sensory root with entire motor root of trigeminal',
    courseVi: 'Rời hố sọ giữa qua lỗ bầu dục vào hố dưới thái dương, chia thành thân trước (chủ yếu vận động cơ nhai) và thân sau (chủ yếu cảm giác)',
    courseEn: 'Exits middle cranial fossa via foramen ovale into infratemporal fossa, dividing into anterior (mostly motor) and posterior (mostly sensory) trunks',
    foramenId: 'foramen_ovale',
    innervationVi: 'Cảm giác toàn bộ răng và xương hàm dưới, môi dưới, cằm, má, 2/3 trước lưỡi, vùng thái dương; Vận động 4 cơ nhai, cơ hàm móng, bụng trước cơ hai thân, cơ căng màng khẩu cái, cơ căng màng nhĩ',
    innervationEn: 'Sensory to mandibular teeth, mandible, lower lip, chin, cheek, anterior 2/3 tongue, temple; Motor to 4 masticatory muscles, mylohyoid, anterior digastric, tensor veli palatini, tensor tympani',
    clinicalAnatomyVi: 'Gây tê thần kinh hàm dưới (Gow-Gates hoặc Vazirani-Akinosi) vô cảm toàn bộ một bên hàm dưới bao gồm răng, xương, niêm mạc và 2/3 trước lưỡi.',
    clinicalAnatomyEn: 'High mandibular block (Gow-Gates or Akinosi) achieves complete unilateral mandibular anesthesia.',
    color: '#e11d48',
    path3D: [
      [-0.026, 1.405, 0.065], // Trigeminal ganglion (postero-inferior border)
      [-0.026, 1.395, 0.065], // Passes through Foramen Ovale
      [-0.027, 1.385, 0.066], // Immediately beneath skull base
      [-0.030, 1.378, 0.070], // Infratemporal fossa trunk
      [-0.035, 1.370, 0.075]  // Bifurcation into anterior and posterior trunks
    ],
    cameraFocus: { position: [-0.08, 1.39, 0.28], lookAt: [-0.030, 1.375, 0.070], distance: 0.25 },
    references: {
      terminologiaAnatomica: 'A14.2.01.031',
      netterPlate: 127,
      graysPage: '608-615',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // INFERIOR ALVEOLAR NERVE (THE HEART OF MANDIBULAR ANESTHESIA)
  'nerve_ian': {
    id: 'nerve_ian',
    nameVi: 'Thần kinh Huyệt răng dưới (IAN)',
    nameEn: 'Inferior Alveolar Nerve (IAN)',
    latinName: 'Nervus alveolaris inferior',
    type: 'nerve_branch',
    division: 'V3',
    parentNerveId: 'cn_5_v3',
    originVi: 'Nhánh lớn nhất của thân sau thần kinh hàm dưới trong hố dưới thái dương',
    originEn: 'Largest branch of posterior trunk of mandibular nerve in infratemporal fossa',
    courseVi: 'Chạy giữa cơ chân bướm trong và cành lên xương hàm dưới, đi vào lỗ hàm dưới (bảo vệ bởi gai Spix / Lingula), chạy dọc trong ống hàm dưới để cấp nhánh cho toàn bộ răng dưới rồi chia thành Thần kinh cằm và Thần kinh răng cửa',
    courseEn: 'Runs between medial pterygoid and mandibular ramus, enters mandibular foramen (shielded by lingula), travels through mandibular canal giving dental plexus, terminates as mental and incisive nerves',
    foramenId: 'mandibular_foramen',
    canalId: 'mandibular_canal',
    innervationVi: 'Tủy và nha chu tất cả các răng hàm dưới cùng bên (từ răng số 1 đến răng số 8)',
    innervationEn: 'Pulp and periodontium of all mandibular teeth on ipsilateral side',
    clinicalAnatomyVi: 'Gây tê gai Spix (Inferior Alveolar Nerve Block / Halsted): Thủ thuật gây tê phổ biến nhất trong nha khoa. Tai biến: tổn thương thần kinh do kim hoặc chèn ép khi nhổ răng số 8 ngầm sát ống răng dưới gây tê bì môi dưới vĩnh viễn (paresthesia).',
    clinicalAnatomyEn: 'IAN Block (Halsted) is the most common dental block. Impacted 3rd molar roots intimate with mandibular canal risk neuropraxia or permanent lip paresthesia.',
    color: '#dc2626',
    path3D: [
      [-0.035, 1.370, 0.075], // Origin from V3 posterior trunk
      [-0.036, 1.365, 0.080], // Pterygomandibular space medial to ramus
      [-0.037, 1.360, 0.088], // Descends behind lingula (gai Spix)
      [-0.038, 1.355, 0.095], // Enters Mandibular Foramen
      [-0.037, 1.346, 0.106], // Enters mandibular canal in ramus
      [-0.036, 1.336, 0.118], // Angle of mandible, inferior to 3rd molar (38/48)
      [-0.034, 1.330, 0.130], // Inferior to 2nd molar (37/47)
      [-0.033, 1.325, 0.138], // Inferior to 1st molar (36/46)
      [-0.032, 1.322, 0.144], // Beneath 2nd premolar (35/45)
      [-0.030, 1.320, 0.150]  // Mental bifurcation zone
    ],
    cameraFocus: { position: [-0.07, 1.34, 0.28], lookAt: [-0.036, 1.335, 0.115], distance: 0.22 },
    references: {
      terminologiaAnatomica: 'A14.2.01.042',
      netterPlate: 127,
      graysPage: '612-613',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_mental': {
    id: 'nerve_mental',
    nameVi: 'Thần kinh Cằm',
    nameEn: 'Mental Nerve',
    latinName: 'Nervus mentalis',
    type: 'terminal_branch',
    division: 'V3',
    parentNerveId: 'nerve_ian',
    originVi: 'Nhánh tận cùng thoát ra ngoài xương hàm dưới của thần kinh huyệt răng dưới',
    originEn: 'Terminal branch of inferior alveolar nerve exiting the mandible',
    courseVi: 'Chui ra khỏi xương hàm dưới qua lỗ cằm (thường nằm ở chóp giữa 2 răng cối nhỏ hàm dưới 34, 35 hoặc 44, 45) chia thành các nhánh cằm và môi',
    courseEn: 'Exits mandible through mental foramen (below apices of mandibular premolars), branching onto chin and lower lip',
    foramenId: 'mental_foramen',
    innervationVi: 'Cảm giác da cằm, môi dưới và niêm mạc ngách lợi vùng răng trước hàm dưới',
    innervationEn: 'Sensory to skin of chin, lower lip, and labial mucosa of anterior teeth',
    clinicalAnatomyVi: 'Gây tê lỗ cằm (Mental nerve block): Dễ xác định vị trí dưới chóp răng cối nhỏ hàm dưới. Khi đặt implant vùng răng cối nhỏ dưới, bắt buộc chụp CBCT xác định lỗ cằm và quai trước (anterior loop) để tránh gây đứt thần kinh.',
    clinicalAnatomyEn: 'Mental block provides profound lip/chin anesthesia. Implant placement requires CBCT to avoid damaging mental foramen and anterior loop.',
    color: '#ef4444',
    path3D: [
      [-0.030, 1.320, 0.150], // Pre-bifurcation in mandibular canal
      [-0.028, 1.319, 0.153], // Anterior loop: extends forward past foramen
      [-0.029, 1.321, 0.152], // Loops backwards and superiorly
      [-0.030, 1.322, 0.150], // Exits Mental Foramen on lateral cortex
      [-0.032, 1.324, 0.153], // Curves onto buccal periosteum
      [-0.028, 1.322, 0.160], // Mental soft tissue branch to chin
      [-0.022, 1.318, 0.166]  // Inferior labial branch to lower lip
    ],
    cameraFocus: { position: [-0.06, 1.32, 0.28], lookAt: [-0.030, 1.320, 0.155], distance: 0.18 },
    references: {
      terminologiaAnatomica: 'A14.2.01.045',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_incisive': {
    id: 'nerve_incisive',
    nameVi: 'Thần kinh Răng cửa hàm dưới',
    nameEn: 'Incisive Nerve',
    latinName: 'Ramus incisivus',
    type: 'terminal_branch',
    division: 'V3',
    parentNerveId: 'nerve_ian',
    originVi: 'Nhánh tận tiếp tục đi trong xương của thần kinh huyệt răng dưới sau khi tách thần kinh cằm',
    originEn: 'Intraosseous continuation of inferior alveolar nerve after mental nerve branching',
    courseVi: 'Tiếp tục chạy trong ống răng cửa xương hàm dưới ra đường giữa',
    courseEn: 'Runs forward in mandibular incisive canal towards the symphysis',
    canalId: 'incisive_canal_mandible',
    innervationVi: 'Tủy và nha chu răng nanh và 2 răng cửa hàm dưới (răng 31, 32, 33 hoặc 41, 42, 43)',
    innervationEn: 'Pulp and periodontium of mandibular canine, lateral incisor, and central incisor',
    clinicalAnatomyVi: 'Gây tê ép lỗ cằm (Mental/Incisive nerve block): Bơm thuốc tê tại lỗ cằm kết hợp đè ngón tay đẩy thuốc tê vào trong ống để vô cảm nhánh răng cửa mà không cần gây tê gai Spix.',
    clinicalAnatomyEn: 'Applying digital pressure over mental foramen during injection pushes anesthetic into incisive canal to numb anterior teeth.',
    color: '#f87171',
    path3D: [
      [-0.030, 1.320, 0.150], // Mandibular canal continuation at mental foramen
      [-0.026, 1.319, 0.154], // Incisive canal beneath 1st premolar (34/44)
      [-0.020, 1.318, 0.158], // Beneath canine apex (33/43)
      [-0.014, 1.316, 0.162], // Beneath lateral incisor apex (32/42)
      [-0.007, 1.315, 0.164], // Beneath central incisor apex (31/41)
      [0.000, 1.315, 0.166]   // Mandibular symphysis decussation
    ],
    cameraFocus: { position: [-0.04, 1.32, 0.28], lookAt: [-0.010, 1.316, 0.160], distance: 0.18 },
    references: {
      terminologiaAnatomica: 'A14.2.01.046',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_lingual': {
    id: 'nerve_lingual',
    nameVi: 'Thần kinh Lưỡi',
    nameEn: 'Lingual Nerve',
    latinName: 'Nervus lingualis',
    type: 'nerve_branch',
    division: 'V3',
    parentNerveId: 'cn_5_v3',
    originVi: 'Tách từ thân sau thần kinh hàm dưới trong hố dưới thái dương',
    originEn: 'Branch of posterior trunk of mandibular nerve in infratemporal fossa',
    courseVi: 'Chạy ra trước và xuống dưới, đi sát mặt trong bờ xương hàm dưới ngay dưới mào huyệt răng vùng răng khôn (răng số 8 dưới), nhận thừng nhĩ (chorda tympani của dây VII), băng qua ống tuyến dưới hàm vào sàn miệng và lưỡi',
    courseEn: 'Descends medial to mandibular ramus, hugs lingual plate near 3rd molar, joined by chorda tympani (CN VII), loops submandibular duct into tongue',
    innervationVi: 'Cảm giác chung (đau, nhiệt, xúc giác) 2/3 trước lưỡi, niêm mạc sàn miệng và lợi mặt trong hàm dưới; mang sợi vị giác và tiết dịch từ thừng nhĩ',
    innervationEn: 'General sensation to anterior 2/3 tongue, floor of mouth, lingual gingiva; carries taste and secretomotor fibers via chorda tympani',
    clinicalAnatomyVi: 'Thần kinh lưỡi có nguy cơ tổn thương rất cao khi phẫu thuật nhổ răng khôn hàm dưới (răng 8 lệch/ngầm) hoặc rạch áp xe sàn miệng. Đứt dây thần kinh lưỡi gây mất cảm giác và mất vị giác 2/3 trước lưỡi kéo dài.',
    clinicalAnatomyEn: 'Extremely vulnerable during mandibular 3rd molar extractions due to close proximity to lingual cortical plate (sometimes <1mm).',
    color: '#e879f9',
    path3D: [
      [-0.035, 1.370, 0.075], // Posterior trunk of V3 in infratemporal fossa
      [-0.036, 1.362, 0.082], // Descends anteromedial to IAN
      [-0.036, 1.355, 0.090], // Joined by Chorda Tympani (dây VII)
      [-0.034, 1.346, 0.100], // Crosses medial pterygoid muscle
      [-0.033, 1.338, 0.112], // Hugs medial lingual plate near 3rd molar (38/48) subperiosteally
      [-0.030, 1.332, 0.124], // Lingual surface of mandibular body
      [-0.026, 1.327, 0.136], // Loops lateral & inferior to Wharton duct
      [-0.020, 1.325, 0.146], // Deep to sublingual gland in floor of mouth
      [-0.014, 1.327, 0.154], // Enters lateral side of tongue
      [-0.008, 1.330, 0.160]  // Submucosal terminal branches to tongue apex
    ],
    cameraFocus: { position: [-0.06, 1.34, 0.28], lookAt: [-0.028, 1.330, 0.120], distance: 0.22 },
    references: {
      terminologiaAnatomica: 'A14.2.01.037',
      netterPlate: 127,
      graysPage: '611-612',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_buccal': {
    id: 'nerve_buccal',
    nameVi: 'Thần kinh Má (Buccal Nerve)',
    nameEn: 'Buccal Nerve',
    latinName: 'Nervus buccalis',
    type: 'nerve_branch',
    division: 'V3',
    parentNerveId: 'cn_5_v3',
    originVi: 'Tách từ thân trước của thần kinh hàm dưới (nhánh cảm giác duy nhất của thân trước)',
    originEn: 'Only sensory branch of anterior trunk of mandibular nerve',
    courseVi: 'Đi giữa 2 đầu cơ chân bướm ngoài, bắt chéo bờ trước cơ cắn và gân cơ thái dương ra phía má',
    courseEn: 'Passes between heads of lateral pterygoid, crosses anterior border of ramus onto buccinator muscle',
    innervationVi: 'Cảm giác da má, niêm mạc má và lợi mặt ngoài (mặt tiền đình) của các răng cối lớn hàm dưới',
    innervationEn: 'Sensory to skin and mucosa of cheek, and buccal gingiva of mandibular molars',
    clinicalAnatomyVi: 'Gây tê thần kinh má (Long buccal block): Tiêm vào niêm mạc ngách lợi mặt ngoài ngay phía sau răng cối lớn cuối cùng, cần thiết khi nhổ răng cối lớn hàm dưới hoặc can thiệp nha chu mặt ngoài.',
    clinicalAnatomyEn: 'Long buccal block anesthetizes buccal soft tissues adjacent to mandibular molars.',
    color: '#c084fc',
    path3D: [
      [-0.035, 1.370, 0.075], // Anterior trunk of V3
      [-0.037, 1.362, 0.085], // Passes between two heads of lateral pterygoid
      [-0.039, 1.352, 0.098], // Crosses tendon of temporalis muscle
      [-0.041, 1.342, 0.112], // Crosses anterior border of coronoid process/ramus
      [-0.040, 1.334, 0.126], // Onto lateral surface of buccinator muscle
      [-0.037, 1.330, 0.138], // Enters buccal fat pad
      [-0.034, 1.328, 0.148]  // Buccal gingiva and cheek mucosa of molars
    ],
    cameraFocus: { position: [-0.07, 1.34, 0.28], lookAt: [-0.038, 1.335, 0.120], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.034',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  'nerve_auriculotemporal': {
    id: 'nerve_auriculotemporal',
    nameVi: 'Thần kinh Tai thái dương',
    nameEn: 'Auriculotemporal Nerve',
    latinName: 'Nervus auriculotemporalis',
    type: 'nerve_branch',
    division: 'V3',
    parentNerveId: 'cn_5_v3',
    originVi: 'Tách từ thân sau dây V3 bằng hai rễ ôm quanh động mạch màng não giữa',
    originEn: 'Arises by two roots encircling middle meningeal artery',
    courseVi: 'Chạy vòng quanh cổ lồi cầu xương hàm dưới, đi qua phần trên tuyến mang tai rồi đi lên thái dương cùng động mạch thái dương nông',
    courseEn: 'Encircles neck of mandible, traverses upper parotid gland, ascends anterior to ear with superficial temporal artery',
    innervationVi: 'Cảm giác da vùng thái dương, loa tai, ống tai ngoài, màng nhĩ và khớp thái dương hàm (TMJ); mang sợi phó giao cảm từ hạch tai đến tuyến mang tai',
    innervationEn: 'Sensory to temple, auricle, external meatus, TMJ; delivers postganglionic parasympathetics from otic ganglion to parotid',
    clinicalAnatomyVi: 'Hội chứng Frey (Đổ mồ hôi khi ăn / Gustatory sweating): Sau phẫu thuật tuyến mang tai, các sợi thần kinh phó giao cảm của dây tai thái dương mọc nhầm vào tuyến mồ hôi dưới da gây đỏ mặt và toát mồ hôi khi ngửi hoặc nhai thức ăn.',
    clinicalAnatomyEn: 'Frey syndrome: aberrant regeneration of auriculotemporal parasympathetics to sweat glands causing gustatory sweating.',
    color: '#a855f7',
    path3D: [
      [-0.035, 1.370, 0.075], // Posterior trunk of V3
      [-0.038, 1.372, 0.072], // Two roots encircling middle meningeal artery
      [-0.042, 1.376, 0.068], // Passes medial to condylar neck of mandible
      [-0.045, 1.385, 0.064], // Curves behind TMJ capsule
      [-0.047, 1.400, 0.062], // Upper part of parotid gland
      [-0.048, 1.420, 0.060], // Anterior to tragus of ear
      [-0.047, 1.442, 0.062], // Accompanies superficial temporal artery
      [-0.043, 1.465, 0.066]  // Posterior temporal fossa skin
    ],
    cameraFocus: { position: [-0.08, 1.40, 0.28], lookAt: [-0.044, 1.380, 0.065], distance: 0.24 },
    references: {
      terminologiaAnatomica: 'A14.2.01.036',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN VI: ABDUCENS NERVE ---
  'cn_6': {
    id: 'cn_6',
    nameVi: 'Dây thần kinh Vận nhãn ngoài (CN VI)',
    nameEn: 'Abducens Nerve (CN VI)',
    latinName: 'Nervus abducens [VI]',
    type: 'cranial_nerve',
    cranialNerveNumber: 6,
    originVi: 'Rãnh hành - cầu của thân não gần đường giữa',
    originEn: 'Pontomedullary junction medial to facial nerve',
    courseVi: 'Chạy qua ống Dorello, xoang hang bên cạnh động mạch cảnh trong, qua khe ổ mắt trên vào ổ mắt',
    courseEn: 'Courses through Dorello canal, cavernous sinus lateral to internal carotid artery, enters orbit through superior orbital fissure',
    foramenId: 'superior_orbital_fissure',
    innervationVi: 'Vận động cơ thẳng ngoài của nhãn cầu (liếc ngoài)',
    innervationEn: 'Somatic motor to lateral rectus muscle of eyeball (abduction)',
    clinicalAnatomyVi: 'Liệt dây VI là liệt thần kinh sọ phổ biến nhất do đường đi dài trong khoang dưới nhện; gây song thị ngang khi nhìn về bên tổn thương.',
    clinicalAnatomyEn: 'Vulnerable to elevated intracranial pressure due to long subarachnoid course; damage results in convergent strabismus and horizontal diplopia.',
    color: '#38bdf8',
    path3D: [
      [-0.008, 1.370, 0.055],
      [-0.015, 1.385, 0.075],
      [-0.025, 1.405, 0.115]
    ],
    cameraFocus: { position: [-0.06, 1.42, 0.28], lookAt: [-0.020, 1.400, 0.100], distance: 0.22 },
    references: {
      terminologiaAnatomica: 'A14.2.01.046',
      netterPlate: 122,
      graysPage: '614',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN VII: FACIAL NERVE ---
  'cn_7': {
    id: 'cn_7',
    nameVi: 'Dây thần kinh Mặt (CN VII)',
    nameEn: 'Facial Nerve (CN VII)',
    latinName: 'Nervus facialis [VII]',
    type: 'cranial_nerve',
    cranialNerveNumber: 7,
    originVi: 'Rãnh hành - cầu của thân não',
    originEn: 'Pontomedullary sulcus of brainstem',
    courseVi: 'Chui vào lỗ tai trong, qua ống thần kinh mặt trong xương đá, thoát ra ngoài sọ ở lỗ trâm chũm, đi vào tuyến mang tai chia 5 nhánh tận',
    courseEn: 'Enters internal acoustic meatus, traverses facial canal, exits stylomastoid foramen, enters parotid gland forming parotid plexus with 5 terminal branches',
    foramenId: 'stylomastoid_foramen',
    canalId: 'facial_canal',
    innervationVi: 'Vận động: Tất cả các cơ biểu cảm khuôn mặt; Cảm giác đặc biệt: Vị giác 2/3 trước lưỡi (qua thừng nhĩ); Tiết dịch: Tuyến lệ, tuyến dưới hàm, tuyến dưới lưỡi',
    innervationEn: 'Motor: Muscles of facial expression; Special sensory: Taste anterior 2/3 tongue; Parasympathetic: Lacrimal, submandibular, sublingual glands',
    clinicalAnatomyVi: 'Liệt Bell (Liệt mặt ngoại biên): Mất vận động nửa mặt, mắt nhắm không kín (dấu hiệu Charles Bell), miệng méo xệch. Trong gây tê gai Spix, nếu đâm kim quá sâu về phía sau vào bao tuyến mang tai sẽ gây liệt mặt tạm thời.',
    clinicalAnatomyEn: 'Bell palsy causes unilateral facial weakness. In IAN block, inserting needle too far posteriorly penetrates parotid capsule, causing transient facial paralysis.',
    color: '#10b981',
    path3D: [
      [-0.014, 1.365, 0.055], // Pontomedullary sulcus
      [-0.020, 1.370, 0.048], // Enters Internal Acoustic Meatus
      [-0.028, 1.372, 0.044], // Labyrinthine & tympanic segments in petrous bone
      [-0.034, 1.370, 0.044], // Mastoid descending segment
      [-0.038, 1.368, 0.048], // Exits Stylomastoid Foramen
      [-0.042, 1.358, 0.060], // Posterior belly of digastric
      [-0.045, 1.345, 0.076]  // Pes anserinus in parotid gland
    ],
    cameraFocus: { position: [-0.08, 1.36, 0.28], lookAt: [-0.040, 1.360, 0.060], distance: 0.25 },
    references: {
      terminologiaAnatomica: 'A14.2.01.047',
      netterPlate: 128,
      graysPage: '615-622',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu & RHM',
      reviewedAt: '2026-09-04'
    }
  },

  // CN VII 5 TERMINAL BRANCHES
  'cn_7_temporal': {
    id: 'cn_7_temporal',
    nameVi: 'Nhánh Thái dương (CN VII)',
    nameEn: 'Temporal Branch (CN VII)',
    latinName: 'Rami temporales nervi facialis',
    type: 'terminal_branch',
    parentNerveId: 'cn_7',
    originVi: 'Bờ trên tuyến mang tai',
    originEn: 'Upper border of parotid gland',
    courseVi: 'Bắt chéo cung gò má đi lên vùng thái dương',
    courseEn: 'Crosses zygomatic arch to temporal and frontal regions',
    innervationVi: 'Cơ trán, cơ vòng mắt phần trên, cơ nhăn mày',
    innervationEn: 'Frontalis, upper orbicularis oculi, corrugator supercilii',
    clinicalAnatomyVi: 'Tổn thương nhánh thái dương làm mất khả năng nhăn trán và nhắm kín mắt.',
    clinicalAnatomyEn: 'Injury impairs forehead wrinkling and eye closure.',
    color: '#34d399',
    path3D: [
      [-0.045, 1.345, 0.076], // From pes anserinus in parotid
      [-0.046, 1.375, 0.085], // Crosses zygomatic arch
      [-0.044, 1.410, 0.098], // Temporal fossa superficial fascia
      [-0.040, 1.445, 0.115], // Frontalis muscle lateral border
      [-0.035, 1.470, 0.125]  // Corrugator supercilii & upper orbicularis
    ],
    cameraFocus: { position: [-0.08, 1.40, 0.28], lookAt: [-0.042, 1.390, 0.095], distance: 0.22 },
    references: { terminologiaAnatomica: 'A14.2.01.050', reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  'cn_7_zygomatic': {
    id: 'cn_7_zygomatic',
    nameVi: 'Nhánh Gò má (CN VII)',
    nameEn: 'Zygomatic Branch (CN VII)',
    latinName: 'Rami zygomatici nervi facialis',
    type: 'terminal_branch',
    parentNerveId: 'cn_7',
    originVi: 'Bờ trước trên tuyến mang tai',
    originEn: 'Anterosuperior border of parotid gland',
    courseVi: 'Chạy ngang qua xương gò má hướng về góc ngoài ổ mắt',
    courseEn: 'Runs across zygomatic bone to lateral canthus',
    innervationVi: 'Cơ vòng mắt phần dưới',
    innervationEn: 'Lower orbicularis oculi muscle',
    clinicalAnatomyVi: 'Quan trọng nhất để nhắm kín mắt, bảo vệ giác mạc không bị khô loét.',
    clinicalAnatomyEn: 'Crucial for complete eye closure; injury risks corneal exposure keratitis.',
    color: '#6ee7b7',
    path3D: [
      [-0.045, 1.345, 0.076], // From pes anserinus
      [-0.043, 1.355, 0.095], // Passes over zygomatic bone
      [-0.039, 1.368, 0.118], // Inferior orbital margin approach
      [-0.035, 1.378, 0.138]  // Lower orbicularis oculi muscle
    ],
    cameraFocus: { position: [-0.07, 1.37, 0.28], lookAt: [-0.040, 1.375, 0.105], distance: 0.20 },
    references: { terminologiaAnatomica: 'A14.2.01.051', reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  'cn_7_buccal': {
    id: 'cn_7_buccal',
    nameVi: 'Nhánh Má (CN VII — Vận động)',
    nameEn: 'Buccal Branch of Facial Nerve (CN VII)',
    latinName: 'Rami buccales nervi facialis',
    type: 'terminal_branch',
    parentNerveId: 'cn_7',
    originVi: 'Mặt trước tuyến mang tai',
    originEn: 'Anterior border of parotid gland below parotid duct',
    courseVi: 'Chạy ngang má bên dưới ống tuyến mang tai đến khóe miệng',
    courseEn: 'Runs across face below parotid duct to corner of mouth',
    innervationVi: 'Vận động: Cơ mút (buccinator), cơ nâng môi trên, cơ nâng góc miệng, cơ vòng miệng (chú ý phân biệt với thần kinh má của dây V3 là cảm giác!)',
    innervationEn: 'Motor: Buccinator and upper perioral muscles (distinct from sensory buccal nerve of V3!)',
    clinicalAnatomyVi: 'Liệt nhánh má làm thức ăn đọng lại ở ngách tiền đình miệng khi nhai do cơ mút mất trương lực.',
    clinicalAnatomyEn: 'Injury causes food impaction in buccal vestibule due to flaccid buccinator.',
    color: '#059669',
    path3D: [
      [-0.045, 1.345, 0.076], // From pes anserinus
      [-0.042, 1.342, 0.098], // Runs beneath parotid duct (Stensen)
      [-0.038, 1.338, 0.120], // Crosses buccinator muscle surface
      [-0.032, 1.332, 0.142]  // Modiolus and orbicularis oris
    ],
    cameraFocus: { position: [-0.06, 1.33, 0.28], lookAt: [-0.038, 1.345, 0.110], distance: 0.20 },
    references: { terminologiaAnatomica: 'A14.2.01.052', reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  'cn_7_marginal_mandibular': {
    id: 'cn_7_marginal_mandibular',
    nameVi: 'Nhánh Bờ hàm dưới (CN VII)',
    nameEn: 'Marginal Mandibular Branch (CN VII)',
    latinName: 'Ramus marginalis mandibulae',
    type: 'terminal_branch',
    parentNerveId: 'cn_7',
    originVi: 'Góc dưới tuyến mang tai',
    originEn: 'Inferior border of parotid gland',
    courseVi: 'Chạy dọc hoặc ngay dưới bờ dưới xương hàm dưới, bắt chéo động mạch mặt',
    courseEn: 'Runs along or just below inferior border of mandible, crossing facial artery',
    innervationVi: 'Cơ hạ môi dưới, cơ hạ góc miệng, cơ cằm',
    innervationEn: 'Depressor labii inferioris, depressor anguli oris, mentalis',
    clinicalAnatomyVi: 'Phẫu thuật rạch dưới hàm (đường rạch Risdon trong phẫu thuật gãy xương hàm dưới) phải đi dưới bờ hàm ít nhất 2cm để tránh cắt phạm nhánh bờ hàm dưới gây méo miệng khi cười.',
    clinicalAnatomyEn: 'Submandibular incisions (Risdon approach) must be placed ≥2 cm below mandibular border to protect this nerve.',
    color: '#047857',
    path3D: [
      [-0.045, 1.345, 0.076], // From parotid inferior pole
      [-0.043, 1.328, 0.088], // Descends near angle of mandible
      [-0.038, 1.315, 0.108], // Runs along inferior border of mandible
      [-0.032, 1.312, 0.130], // Crosses facial artery and anterior border of masseter
      [-0.025, 1.315, 0.145]  // Depressor anguli oris / depressor labii inferioris
    ],
    cameraFocus: { position: [-0.06, 1.30, 0.28], lookAt: [-0.038, 1.315, 0.100], distance: 0.20 },
    references: { terminologiaAnatomica: 'A14.2.01.053', reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  'cn_7_cervical': {
    id: 'cn_7_cervical',
    nameVi: 'Nhánh Cổ (CN VII)',
    nameEn: 'Cervical Branch (CN VII)',
    latinName: 'Ramus colli nervi facialis',
    type: 'terminal_branch',
    parentNerveId: 'cn_7',
    originVi: 'Cực dưới tuyến mang tai',
    originEn: 'Lower pole of parotid gland',
    courseVi: 'Đi xuống cổ dưới cơ bám da cổ',
    courseEn: 'Descends into neck beneath platysma',
    innervationVi: 'Vận động: Cơ bám da cổ (platysma)',
    innervationEn: 'Platysma muscle',
    clinicalAnatomyVi: 'Làm căng da cổ.',
    clinicalAnatomyEn: 'Tenses neck skin.',
    color: '#065f46',
    path3D: [
      [-0.045, 1.345, 0.076], // From lower pole of parotid
      [-0.042, 1.320, 0.072], // Descends behind angle of mandible
      [-0.038, 1.295, 0.070], // Into carotid triangle deep to platysma
      [-0.032, 1.270, 0.072]  // Cervical subcutaneous supply
    ],
    cameraFocus: { position: [-0.07, 1.25, 0.28], lookAt: [-0.040, 1.280, 0.075], distance: 0.22 },
    references: { terminologiaAnatomica: 'A14.2.01.054', reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  // --- CN VIII: VESTIBULOCOCHLEAR NERVE ---
  'cn_8': {
    id: 'cn_8',
    nameVi: 'Dây thần kinh Tiền đình - Ốc tai (CN VIII)',
    nameEn: 'Vestibulocochlear Nerve (CN VIII)',
    latinName: 'Nervus vestibulocochlearis [VIII]',
    type: 'cranial_nerve',
    cranialNerveNumber: 8,
    originVi: 'Góc cầu - tiểu não (Rãnh hành - cầu phía ngoài dây VII)',
    originEn: 'Cerebellopontine angle at lateral pontomedullary sulcus',
    courseVi: 'Cùng dây VII chui vào lỗ tai trong của xương đá, chia thành phần tiền đình và phần ốc tai',
    courseEn: 'Enters internal acoustic meatus alongside facial nerve to vestibular system and cochlea',
    foramenId: 'internal_acoustic_meatus',
    innervationVi: 'Cảm giác đặc biệt: Thính giác (phần ốc tai) và thăng bằng tư thế (phần tiền đình)',
    innervationEn: 'Special sensory: Hearing (cochlear nerve) and equilibrium / balance (vestibular nerve)',
    clinicalAnatomyVi: 'U bao dây thần kinh thính giác (Acoustic Neuroma / Schwannoma tiền đình): Gây ù tai, nghe kém tiếp nhận và mất thăng bằng. Tổn thương tiến triển có thể chèn ép dây VII và dây V kế cận.',
    clinicalAnatomyEn: 'Vestibular schwannoma causes sensorineural hearing loss, tinnitus, and vertigo; expansive growth can compress CN VII and CN V.',
    color: '#a855f7',
    path3D: [
      [-0.018, 1.365, 0.052],
      [-0.025, 1.372, 0.046],
      [-0.030, 1.373, 0.040]
    ],
    cameraFocus: { position: [-0.08, 1.38, 0.25], lookAt: [-0.025, 1.370, 0.045], distance: 0.20 },
    references: {
      terminologiaAnatomica: 'A14.2.01.111',
      netterPlate: 129,
      graysPage: '623',
      reviewStatus: 'VERIFIED',
      reviewedBy: 'Bộ môn Giải phẫu',
      reviewedAt: '2026-09-04'
    }
  },

  // --- CN IX ---
  'cn_9': {
    id: 'cn_9',
    nameVi: 'Dây thần kinh Thiệt hầu (CN IX)',
    nameEn: 'Glossopharyngeal Nerve (CN IX)',
    latinName: 'Nervus glossopharyngeus [IX]',
    type: 'cranial_nerve',
    cranialNerveNumber: 9,
    originVi: 'Rãnh sau trám hành của hành não',
    originEn: 'Post-olivary sulcus of medulla oblongata',
    courseVi: 'Thoát ra khỏi sọ qua lỗ tĩnh mạch cảnh, chạy giữa động mạch cảnh trong và tĩnh mạch cảnh trong, uốn quanh cơ trâm hầu đến đáy lưỡi',
    courseEn: 'Exits skull via jugular foramen, curves around stylopharyngeus muscle to posterior 1/3 of tongue',
    foramenId: 'jugular_foramen',
    innervationVi: 'Cảm giác chung và vị giác 1/3 sau lưỡi; Cảm giác niêm mạc hầu và amidan; Vận động cơ trâm hầu; Phó giao cảm cho tuyến mang tai (qua hạch tai)',
    innervationEn: 'General sensation and taste to posterior 1/3 tongue; sensory to pharynx and tonsils; motor to stylopharyngeus; parasympathetic to parotid gland',
    clinicalAnatomyVi: 'Đau dây IX (Glossopharyngeal neuralgia): Đau dữ dội vùng hầu họng và đáy lưỡi khi nuốt. Mất phản xạ nôn (Gag reflex) khi dây IX bị tổn thương.',
    clinicalAnatomyEn: 'Loss of afferent limb of gag reflex upon unilateral damage; glossopharyngeal neuralgia triggers throat pain on swallowing.',
    color: '#0284c7',
    path3D: [
      [-0.015, 1.360, 0.025],
      [-0.026, 1.350, 0.040], // Jugular foramen
      [-0.028, 1.325, 0.070], // Along stylopharyngeus
      [-0.016, 1.320, 0.115]  // Posterior 1/3 of tongue
    ],
    cameraFocus: { position: [-0.07, 1.33, 0.28], lookAt: [-0.026, 1.335, 0.070], distance: 0.22 },
    references: { terminologiaAnatomica: 'A14.2.01.055', netterPlate: 129, reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  // --- CN X ---
  'cn_10': {
    id: 'cn_10',
    nameVi: 'Dây thần kinh Lang thang (CN X)',
    nameEn: 'Vagus Nerve (CN X)',
    latinName: 'Nervus vagus [X]',
    type: 'cranial_nerve',
    cranialNerveNumber: 10,
    originVi: 'Rãnh sau trám hành của hành não',
    originEn: 'Post-olivary sulcus of medulla',
    courseVi: 'Thoát ra sọ qua lỗ tĩnh mạch cảnh, đi xuống trong bao cảnh cùng động mạch cảnh và tĩnh mạch cảnh trong vào ngực và bụng',
    courseEn: 'Exits jugular foramen, descends in carotid sheath between ICA and IJV into thorax',
    foramenId: 'jugular_foramen',
    innervationVi: 'Vận động các cơ của hầu, thanh quản (qua thần kinh thanh quản quặt ngược và thanh quản trên); phó giao cảm tim, phổi, đường tiêu hóa',
    innervationEn: 'Motor to pharyngeal and laryngeal muscles (via recurrent and superior laryngeal nerves); parasympathetics to thoracic and abdominal viscera',
    clinicalAnatomyVi: 'Liệt thần kinh thanh quản quặt ngược (Recurrent laryngeal nerve) sau phẫu thuật tuyến giáp gây khàn tiếng hoặc khó thở nếu liệt hai bên.',
    clinicalAnatomyEn: 'Recurrent laryngeal nerve injury during thyroidectomy leads to hoarseness or bilateral airway compromise.',
    color: '#0369a1',
    cameraFocus: { position: [-0.07, 1.30, 0.35], lookAt: [-0.030, 1.28, 0.06], distance: 0.28 },
    references: { terminologiaAnatomica: 'A14.2.01.066', netterPlate: 130, reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  // --- CN XI ---
  'cn_11': {
    id: 'cn_11',
    nameVi: 'Dây thần kinh Phụ (CN XI)',
    nameEn: 'Accessory Nerve (CN XI)',
    latinName: 'Nervus accessorius [XI]',
    type: 'cranial_nerve',
    cranialNerveNumber: 11,
    originVi: 'Các rễ gai từ đoạn tủy cổ C1-C5 đi lên qua lỗ lớn vào sọ rồi thoát ra qua lỗ tĩnh mạch cảnh',
    originEn: 'Spinal rootlets from C1-C5 ascending through foramen magnum, exiting via jugular foramen',
    courseVi: 'Bắt chéo tĩnh mạch cảnh trong, xuyên qua cơ ức đòn chũm rồi chạy chéo qua tam giác cổ sau đến bờ trước cơ thang',
    courseEn: 'Crosses IJV, pierces sternocleidomastoid, traverses posterior triangle to trapezius',
    foramenId: 'jugular_foramen',
    innervationVi: 'Vận động: Cơ ức đòn chũm và cơ thang',
    innervationEn: 'Motor: Sternocleidomastoid and trapezius muscles',
    clinicalAnatomyVi: 'Tổn thương dây XI trong phẫu thuật nạo vét hạch cổ gây sụp vai, khó nâng tay quá đầu và khó quay đầu sang bên đối diện.',
    clinicalAnatomyEn: 'Iatrogenic injury during neck dissection leads to shoulder droop and inability to shrug or abduct arm above 90°.',
    color: '#475569',
    cameraFocus: { position: [-0.08, 1.28, 0.35], lookAt: [-0.035, 1.27, 0.06], distance: 0.28 },
    references: { terminologiaAnatomica: 'A14.2.01.088', netterPlate: 131, reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  },

  // --- CN XII ---
  'cn_12': {
    id: 'cn_12',
    nameVi: 'Dây thần kinh Hạ thiệt (CN XII)',
    nameEn: 'Hypoglossal Nerve (CN XII)',
    latinName: 'Nervus hypoglossus [XII]',
    type: 'cranial_nerve',
    cranialNerveNumber: 12,
    originVi: 'Rãnh trước trám hành của hành não',
    originEn: 'Pre-olivary sulcus of medulla',
    courseVi: 'Thoát ra khỏi sọ qua ống thần kinh hạ thiệt, vòng quanh các mạch máu cảnh, đi sâu dưới cơ hai thân vào lưỡi',
    courseEn: 'Exits hypoglossal canal, hooks around occipital artery and external carotid, enters submandibular region and tongue',
    foramenId: 'hypoglossal_canal',
    canalId: 'hypoglossal_canal',
    innervationVi: 'Vận động: Toàn bộ các cơ nội tại và ngoại lai của lưỡi (cơ cằm lưỡi, móng lưỡi, trâm lưỡi), trừ cơ khẩu cái lưỡi (do dây X)',
    innervationEn: 'Motor: All intrinsic and extrinsic muscles of the tongue (genioglossus, hyoglossus, styloglossus), except palatoglossus (CN X)',
    clinicalAnatomyVi: 'Liệt dây XII một bên: Khi thè lưỡi, đầu lưỡi bị lệch về bên tổn thương (do cơ cằm lưỡi bên lành đẩy sang).',
    clinicalAnatomyEn: 'Unilateral CN XII palsy causes the tongue to deviate toward the paralyzed side on protrusion.',
    color: '#64748b',
    path3D: [
      [-0.015, 1.350, 0.025],
      [-0.022, 1.340, 0.040], // Hypoglossal canal
      [-0.026, 1.310, 0.070], // Submandibular curve
      [-0.012, 1.310, 0.125]  // Intrinsic muscles of tongue
    ],
    cameraFocus: { position: [-0.07, 1.32, 0.30], lookAt: [-0.022, 1.325, 0.070], distance: 0.22 },
    references: { terminologiaAnatomica: 'A14.2.01.091', netterPlate: 132, reviewStatus: 'VERIFIED', reviewedBy: 'Bộ môn Giải phẫu', reviewedAt: '2026-09-04' }
  }
};

// ============================================================================
// 2. CRANIAL FORAMINA LAB (17 KEY FORAMINA)
// ============================================================================

export const CRANIAL_FORAMINA: Record<string, CranialForamen> = {
  'foramen_ovale': {
    id: 'foramen_ovale',
    nameVi: 'Lỗ Bầu dục',
    nameEn: 'Foramen Ovale',
    latinName: 'Foramen ovale',
    boneVi: 'Cánh lớn xương bướm',
    boneEn: 'Greater wing of sphenoid bone',
    position: [-0.026, 1.385, 0.065],
    structuresPassingThroughVi: [
      'Thần kinh hàm dưới (CN V3)',
      'Động mạch màng não phụ',
      'Thần kinh đá bé (nhánh dây IX đến hạch tai)',
      'Tĩnh mạch liên lạc (Emissary vein) nối xoang hang với đám rối chân bướm'
    ],
    structuresPassingThroughEn: [
      'Mandibular nerve (CN V3)',
      'Accessory meningeal artery',
      'Lesser petrosal nerve',
      'Emissary vein connecting cavernous sinus to pterygoid plexus'
    ],
    relatedNerveIds: ['cn_5_v3'],
    clinicalSignificanceVi: 'Lỗ sọ then chốt để dây V3 thoát ra hố dưới thái dương. Đường chọc kim tiếp cận hạch Gasser qua da để điều trị đau dây V kịch phát bằng nhiệt đông cao tần (Percutaneous radiofrequency rhizotomy).',
    clinicalSignificanceEn: 'Direct route for percutaneous cannulation of the trigeminal ganglion in treating refractory trigeminal neuralgia.',
    cameraFocus: { position: [-0.07, 1.41, 0.22], lookAt: [-0.026, 1.385, 0.065] }
  },

  'foramen_rotundum': {
    id: 'foramen_rotundum',
    nameVi: 'Lỗ Tròn',
    nameEn: 'Foramen Rotundum',
    latinName: 'Foramen rotundum',
    boneVi: 'Cánh lớn xương bướm',
    boneEn: 'Greater wing of sphenoid bone',
    position: [-0.024, 1.395, 0.080],
    structuresPassingThroughVi: [
      'Thần kinh hàm trên (CN V2)'
    ],
    structuresPassingThroughEn: [
      'Maxillary nerve (CN V2)'
    ],
    relatedNerveIds: ['cn_5_v2'],
    clinicalSignificanceVi: 'Đưa dây V2 từ hố sọ giữa vào hố chân bướm khẩu cái. Gãy xương nền sọ giữa liên quan lỗ tròn gây tê bì vùng má, mi dưới và răng hàm trên.',
    clinicalSignificanceEn: 'Passageway for V2 into pterygopalatine fossa; trauma causes midfacial numbness.',
    cameraFocus: { position: [-0.06, 1.41, 0.24], lookAt: [-0.024, 1.395, 0.080] }
  },

  'foramen_spinosum': {
    id: 'foramen_spinosum',
    nameVi: 'Lỗ Gai',
    nameEn: 'Foramen Spinosum',
    latinName: 'Foramen spinosum',
    boneVi: 'Cánh lớn xương bướm (gần gai xương bướm)',
    boneEn: 'Greater wing of sphenoid near sphenoidal spine',
    position: [-0.030, 1.385, 0.055],
    structuresPassingThroughVi: [
      'Động mạch màng não giữa',
      'Tĩnh mạch màng não giữa',
      'Nhánh màng não của thần kinh hàm dưới (Nervus spinosus)'
    ],
    structuresPassingThroughEn: [
      'Middle meningeal artery',
      'Middle meningeal vein',
      'Nervous spinosus (meningeal branch of V3)'
    ],
    relatedNerveIds: ['cn_5_v3'],
    clinicalSignificanceVi: 'Chấn thương vùng thái dương (điểm Pterion) làm vỡ động mạch màng não giữa tại lỗ gai gây tụ máu ngoài màng cứng (Epidural hematoma) cấp tính nguy kịch.',
    clinicalSignificanceEn: 'Fracture of pterion ruptures middle meningeal artery causing life-threatening epidural hematoma.',
    cameraFocus: { position: [-0.07, 1.40, 0.20], lookAt: [-0.030, 1.385, 0.055] }
  },

  'superior_orbital_fissure': {
    id: 'superior_orbital_fissure',
    nameVi: 'Khe Ổ mắt trên',
    nameEn: 'Superior Orbital Fissure',
    latinName: 'Fissura orbitalis superior',
    boneVi: 'Giữa cánh nhỏ và cánh lớn xương bướm',
    boneEn: 'Between lesser and greater wings of sphenoid',
    position: [-0.024, 1.415, 0.105],
    structuresPassingThroughVi: [
      'Thần kinh vận nhãn (CN III)',
      'Thần kinh ròng rọc (CN IV)',
      'Thần kinh mắt (CN V1) và các nhánh: Lệ, Trán, Mũi mi',
      'Thần kinh vận nhãn ngoài (CN VI)',
      'Tĩnh mạch mắt trên'
    ],
    structuresPassingThroughEn: [
      'Oculomotor nerve (CN III)',
      'Trochlear nerve (CN IV)',
      'Ophthalmic nerve branches (CN V1: lacrimal, frontal, nasociliary)',
      'Abducens nerve (CN VI)',
      'Superior ophthalmic vein'
    ],
    relatedNerveIds: ['cn_3', 'cn_4', 'cn_5_v1'],
    clinicalSignificanceVi: 'Hội chứng khe ổ mắt trên: Gãy xương hoặc chèn ép tại khe gây liệt nhãn cầu toàn bộ (dây III, IV, VI), mất cảm giác trán mi mắt (dây V1) và giãn đồng tử.',
    clinicalSignificanceEn: 'Superior orbital fissure syndrome presents with complete ophthalmoplegia, ptosis, fixed pupil, and upper facial sensory loss.',
    cameraFocus: { position: [-0.06, 1.44, 0.25], lookAt: [-0.024, 1.415, 0.105] }
  },

  'mandibular_foramen': {
    id: 'mandibular_foramen',
    nameVi: 'Lỗ Hàm dưới',
    nameEn: 'Mandibular Foramen',
    latinName: 'Foramen mandibulae',
    boneVi: 'Mặt trong cành lên xương hàm dưới (Ramus of mandible)',
    boneEn: 'Medial surface of mandibular ramus',
    position: [-0.038, 1.355, 0.095],
    structuresPassingThroughVi: [
      'Thần kinh huyệt răng dưới (IAN)',
      'Động mạch huyệt răng dưới',
      'Tĩnh mạch huyệt răng dưới'
    ],
    structuresPassingThroughEn: [
      'Inferior alveolar nerve (IAN)',
      'Inferior alveolar artery',
      'Inferior alveolar vein'
    ],
    relatedNerveIds: ['nerve_ian'],
    clinicalSignificanceVi: 'Điểm mốc quan trọng nhất trong gây tê vùng nha khoa. Lỗ được che chắn ở phía trước bởi Gai Spix (Lingula). Mục tiêu kim tiêm trong kỹ thuật Halsted đặt ngay phía trên gai Spix.',
    clinicalSignificanceEn: 'Primary anatomical target for Inferior Alveolar Nerve Block (Halsted technique); guarded anteriorly by the lingula.',
    cameraFocus: { position: [-0.07, 1.36, 0.24], lookAt: [-0.038, 1.355, 0.095] }
  },

  'mental_foramen': {
    id: 'mental_foramen',
    nameVi: 'Lỗ Cằm',
    nameEn: 'Mental Foramen',
    latinName: 'Foramen mentale',
    boneVi: 'Mặt ngoài thân xương hàm dưới (dưới chóp răng cối nhỏ)',
    boneEn: 'Anterolateral surface of mandibular body below premolars',
    position: [-0.030, 1.320, 0.150],
    structuresPassingThroughVi: [
      'Thần kinh cằm (Mental nerve)',
      'Mạch máu cằm (Mental vessels)'
    ],
    structuresPassingThroughEn: [
      'Mental nerve',
      'Mental artery and vein'
    ],
    relatedNerveIds: ['nerve_mental', 'nerve_ian'],
    clinicalSignificanceVi: 'Nơi thần kinh cằm thoát ra chi phối môi dưới và cằm. Cần bảo tồn tuyệt đối khi phẫu thuật đặt implant, phẫu thuật cắt chóp hoặc gọt hàm.',
    clinicalSignificanceEn: 'Exit of mental nerve supplying lower lip and chin. Strict surgical safety zone for dental implantology.',
    cameraFocus: { position: [-0.06, 1.32, 0.28], lookAt: [-0.030, 1.320, 0.150] }
  },

  'infraorbital_foramen': {
    id: 'infraorbital_foramen',
    nameVi: 'Lỗ Dưới ổ mắt',
    nameEn: 'Infraorbital Foramen',
    latinName: 'Foramen infraorbitale',
    boneVi: 'Mặt trước xương hàm trên, cách bờ dưới ổ mắt 5–8mm',
    boneEn: 'Anterior surface of maxilla, 5-8mm inferior to infraorbital margin',
    position: [-0.030, 1.370, 0.145],
    structuresPassingThroughVi: [
      'Thần kinh dưới ổ mắt (nhánh tận của V2)',
      'Động mạch dưới ổ mắt',
      'Tĩnh mạch dưới ổ mắt'
    ],
    structuresPassingThroughEn: [
      'Infraorbital nerve (terminal branch of V2)',
      'Infraorbital artery and vein'
    ],
    relatedNerveIds: ['nerve_infraorbital', 'cn_5_v2'],
    clinicalSignificanceVi: 'Điểm chọc kim gây tê thần kinh dưới ổ mắt. Tổn thương do gãy khối gò má - hàm trên (Le Fort II hoặc ZMC fracture) gây tê bì má, cánh mũi và môi trên.',
    clinicalSignificanceEn: 'Target for infraorbital block; trauma to zygomaticomaxillary complex causes midfacial numbness.',
    cameraFocus: { position: [-0.06, 1.38, 0.28], lookAt: [-0.030, 1.370, 0.145] }
  },

  'stylomastoid_foramen': {
    id: 'stylomastoid_foramen',
    nameVi: 'Lỗ Trâm chũm',
    nameEn: 'Stylomastoid Foramen',
    latinName: 'Foramen stylomastoideum',
    boneVi: 'Nền sọ, giữa mỏm trâm và mỏm chũm xương thái dương',
    boneEn: 'Inferior petrous temporal bone between styloid and mastoid processes',
    position: [-0.038, 1.370, 0.050],
    structuresPassingThroughVi: [
      'Thần kinh mặt (CN VII)',
      'Động mạch trâm chũm'
    ],
    structuresPassingThroughEn: [
      'Facial nerve (CN VII)',
      'Stylomastoid artery'
    ],
    relatedNerveIds: ['cn_7'],
    clinicalSignificanceVi: 'Điểm thoát ra ngoài sọ của dây VII trước khi phân nhánh vào tuyến mang tai. Viêm phù nề dây VII tại đây gây liệt Bell.',
    clinicalSignificanceEn: 'Exit point of CN VII from skull; entrapment/edema here leads to Bell palsy.',
    cameraFocus: { position: [-0.07, 1.37, 0.20], lookAt: [-0.038, 1.370, 0.050] }
  },

  'greater_palatine_foramen': {
    id: 'greater_palatine_foramen',
    nameVi: 'Lỗ Khẩu cái lớn',
    nameEn: 'Greater Palatine Foramen',
    latinName: 'Foramen palatinum majus',
    boneVi: 'Mảnh ngang xương khẩu cái (ngang răng cối lớn 2-3 hàm trên)',
    boneEn: 'Horizontal plate of palatine bone near maxillary 2nd/3rd molar',
    position: [-0.018, 1.345, 0.118],
    structuresPassingThroughVi: [
      'Thần kinh khẩu cái lớn',
      'Động mạch khẩu cái lớn'
    ],
    structuresPassingThroughEn: [
      'Greater palatine nerve',
      'Greater palatine artery'
    ],
    relatedNerveIds: ['nerve_greater_palatine', 'cn_5_v2'],
    clinicalSignificanceVi: 'Điểm gây tê niêm mạc vòm miệng phía sau trong nhổ răng cối lớn trên hoặc phẫu thuật vòm.',
    clinicalSignificanceEn: 'Target for greater palatine nerve block in palatal surgery.',
    cameraFocus: { position: [-0.05, 1.35, 0.25], lookAt: [-0.018, 1.345, 0.118] }
  },

  'incisive_foramen': {
    id: 'incisive_foramen',
    nameVi: 'Lỗ Răng cửa',
    nameEn: 'Incisive Foramen',
    latinName: 'Foramen incisivum',
    boneVi: 'Mỏm khẩu cái xương hàm trên, ngay sau các răng cửa giữa',
    boneEn: 'Palatine process of maxilla, posterior to central incisors',
    position: [0.000, 1.345, 0.148],
    structuresPassingThroughVi: [
      'Thần kinh mũi khẩu cái (dây V2)',
      'Động mạch bướm khẩu cái tận cùng'
    ],
    structuresPassingThroughEn: [
      'Nasopalatine nerve',
      'Terminal branches of sphenopalatine artery'
    ],
    relatedNerveIds: ['nerve_nasopalatine', 'cn_5_v2'],
    clinicalSignificanceVi: 'Vị trí nang ống răng cửa (Incisive canal cyst / Nasopalatine duct cyst) - tổn thương nang lành tính phổ biến nhất vùng hàm trên.',
    clinicalSignificanceEn: 'Site of nasopalatine duct cysts, the most common non-odontogenic cyst of the maxilla.',
    cameraFocus: { position: [0.00, 1.35, 0.28], lookAt: [0.000, 1.345, 0.148] }
  },

  'optic_canal': {
    id: 'optic_canal',
    nameVi: 'Ống Thị giác',
    nameEn: 'Optic Canal',
    latinName: 'Canalis opticus',
    boneVi: 'Cánh nhỏ xương bướm',
    boneEn: 'Lesser wing of sphenoid bone',
    position: [-0.015, 1.420, 0.095],
    structuresPassingThroughVi: [
      'Thần kinh thị giác (CN II)',
      'Động mạch mắt (Ophthalmic artery)'
    ],
    structuresPassingThroughEn: [
      'Optic nerve (CN II)',
      'Ophthalmic artery'
    ],
    relatedNerveIds: ['cn_2'],
    clinicalSignificanceVi: 'Chấn thương gãy ống thị giác chèn ép gây mù mắt nhanh chóng, cần phẫu thuật giải áp ống thị giác khẩn cấp.',
    clinicalSignificanceEn: 'Optic canal fractures risk compressive optic neuropathy requiring urgent decompression.',
    cameraFocus: { position: [-0.05, 1.43, 0.22], lookAt: [-0.015, 1.420, 0.095] }
  },

  'jugular_foramen': {
    id: 'jugular_foramen',
    nameVi: 'Lỗ Tĩnh mạch cảnh',
    nameEn: 'Jugular Foramen',
    latinName: 'Foramen jugulare',
    boneVi: 'Giữa xương đá (thái dương) và xương chẩm',
    boneEn: 'Between petrous temporal and occipital bones',
    position: [-0.026, 1.350, 0.040],
    structuresPassingThroughVi: [
      'Dây thần kinh thiệt hầu (CN IX)',
      'Dây thần kinh lang thang (CN X)',
      'Dây thần kinh phụ (CN XI)',
      'Hành trên tĩnh mạch cảnh trong',
      'Động mạch màng não sau'
    ],
    structuresPassingThroughEn: [
      'Glossopharyngeal nerve (CN IX)',
      'Vagus nerve (CN X)',
      'Accessory nerve (CN XI)',
      'Internal jugular vein / superior bulb',
      'Posterior meningeal artery'
    ],
    relatedNerveIds: ['cn_9', 'cn_10', 'cn_11'],
    clinicalSignificanceVi: 'Hội chứng lỗ rách sau (Vernet syndrome): Tổn thương đồng thời dây IX, X, XI do u cuộn cảnh (Glomus jugulare tumor) hoặc gãy xương nền sọ.',
    clinicalSignificanceEn: 'Vernet syndrome: concurrent paresis of CN IX, X, XI caused by glomus tumors or skull base fractures.',
    cameraFocus: { position: [-0.06, 1.36, 0.16], lookAt: [-0.026, 1.350, 0.040] }
  },

  'hypoglossal_canal': {
    id: 'hypoglossal_canal',
    nameVi: 'Ống Thần kinh Hạ thiệt',
    nameEn: 'Hypoglossal Canal',
    latinName: 'Canalis nervi hypoglossi',
    boneVi: 'Phần bên xương chẩm (ngang trên lồi cầu chẩm)',
    boneEn: 'Lateral part of occipital bone above occipital condyle',
    position: [-0.022, 1.340, 0.040],
    structuresPassingThroughVi: [
      'Thần kinh hạ thiệt (CN XII)',
      'Nhánh màng não của động mạch hầu lên'
    ],
    structuresPassingThroughEn: [
      'Hypoglossal nerve (CN XII)',
      'Meningeal branch of ascending pharyngeal artery'
    ],
    relatedNerveIds: ['cn_12'],
    clinicalSignificanceVi: 'U bao dây thần kinh hoặc gãy lồi cầu chẩm làm tổn thương dây XII gây teo cơ và lệch lưỡi.',
    clinicalSignificanceEn: 'Schwannomas or occipital condyle fractures affect CN XII, manifesting as tongue atrophy and deviation.',
    cameraFocus: { position: [-0.05, 1.35, 0.16], lookAt: [-0.022, 1.340, 0.040] }
  },

  'foramen_magnum': {
    id: 'foramen_magnum',
    nameVi: 'Lỗ Lớn xương chẩm',
    nameEn: 'Foramen Magnum',
    latinName: 'Foramen magnum',
    boneVi: 'Xương chẩm',
    boneEn: 'Occipital bone',
    position: [0.000, 1.330, 0.020],
    structuresPassingThroughVi: [
      'Hành não tiếp nối tủy gai',
      'Động mạch đốt sống (trái & phải)',
      'Rễ gai thần kinh phụ (CN XI) đi lên',
      'Động mạch tủy trước và tủy sau',
      'Màng não và các dây chằng tủy'
    ],
    structuresPassingThroughEn: [
      'Medulla oblongata continuous with spinal cord',
      'Vertebral arteries',
      'Spinal roots of accessory nerve (CN XI)',
      'Anterior and posterior spinal arteries',
      'Meninges and apical ligament'
    ],
    relatedNerveIds: ['cn_11'],
    clinicalSignificanceVi: 'Tụt hạnh nhân tiểu não qua lỗ lớn (Tụt não do tăng áp lực nội sọ) chèn ép trung tâm hô hấp và tuần hoàn hành não dẫn đến tử vong nhanh chóng.',
    clinicalSignificanceEn: 'Tonsillar herniation through foramen magnum compresses respiratory centres in medulla, causing rapid fatality.',
    cameraFocus: { position: [0.00, 1.36, 0.20], lookAt: [0.000, 1.330, 0.020] }
  },

  'internal_acoustic_meatus': {
    id: 'internal_acoustic_meatus',
    nameVi: 'Lỗ Ống tai trong (IAM)',
    nameEn: 'Internal Acoustic Meatus (IAM)',
    latinName: 'Porus acusticus internus',
    boneVi: 'Mặt sau phần đá xương thái dương',
    boneEn: 'Posterior surface of petrous temporal bone',
    position: [-0.028, 1.370, 0.052],
    structuresPassingThroughVi: [
      'Dây thần kinh mặt (CN VII)',
      'Dây thần kinh tiền đình - ốc tai (CN VIII)',
      'Thần kinh trung gian (Nervus intermedius của Wrisberg)',
      'Động mạch mê đạo (Labyrinthine artery)'
    ],
    structuresPassingThroughEn: [
      'Facial nerve (CN VII)',
      'Vestibulocochlear nerve (CN VIII)',
      'Nervus intermedius of Wrisberg',
      'Labyrinthine artery'
    ],
    relatedNerveIds: ['cn_7', 'cn_8'],
    clinicalSignificanceVi: 'U bao dây thần kinh tiền đình (Vestibular schwannoma / Acoustic neuroma) phát triển tại lỗ ống tai trong gây giảm thính lực, ù tai, mất thăng bằng và liệt mặt tiến triển.',
    clinicalSignificanceEn: 'Site of vestibular schwannoma (acoustic neuroma) presentation with sensorineural hearing loss, tinnitus, and facial weakness.',
    cameraFocus: { position: [-0.06, 1.38, 0.18], lookAt: [-0.028, 1.370, 0.052] }
  },

  'inferior_orbital_fissure': {
    id: 'inferior_orbital_fissure',
    nameVi: 'Khe Ổ mắt dưới (IOF)',
    nameEn: 'Inferior Orbital Fissure (IOF)',
    latinName: 'Fissura orbitalis inferior',
    boneVi: 'Giữa cánh lớn xương bướm và xương hàm trên',
    boneEn: 'Between greater wing of sphenoid and maxilla',
    position: [-0.028, 1.395, 0.115],
    structuresPassingThroughVi: [
      'Thần kinh hàm trên (nhánh dưới ổ mắt và gò má của CN V2)',
      'Động mạch và tĩnh mạch dưới ổ mắt',
      'Các nhánh của đám rối tĩnh mạch chân bướm'
    ],
    structuresPassingThroughEn: [
      'Maxillary nerve branches (infraorbital and zygomatic of CN V2)',
      'Infraorbital artery and vein',
      'Emissary connections to pterygoid plexus'
    ],
    relatedNerveIds: ['cn_5_v2', 'nerve_infraorbital'],
    clinicalSignificanceVi: 'Nối hố chân bướm khẩu cái và hố dưới thái dương với ổ mắt. Chấn thương vỡ sàn ổ mắt (Blowout fracture) thường lan tới khe ổ mắt dưới.',
    clinicalSignificanceEn: 'Transmits neurovascular structures from pterygopalatine fossa to orbit; involved in orbital blowout fractures.',
    cameraFocus: { position: [-0.07, 1.41, 0.24], lookAt: [-0.028, 1.395, 0.115] }
  }
};

// ============================================================================
// 3. DENTAL INNERVATION DATABASE (FDI NUMBERING 11-48)
// ============================================================================

export const DENTAL_INNERVATION_DATABASE: ToothInnervation[] = [
  // ==========================================================================
  // --- CUNG 1: HÀM TRÊN PHẢI (MAXILLARY RIGHT - FDI 11 - 18) ---
  // ==========================================================================
  {
    fdi: 18,
    universalNumber: 1,
    nameVi: 'Răng khôn trên phải (Răng 18)',
    nameEn: 'Maxillary Right 3rd Molar (#18)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'molar',
    rootCount: 3,
    canalCount: '3-4',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [-0.032, 1.344, 0.124],
    anesthesiaTechniqueVi: 'Gây tê PSA kết hợp gây tê thần kinh khẩu cái lớn (Greater Palatine block)',
    anesthesiaTechniqueEn: 'PSA nerve block + Greater palatine block'
  },
  {
    fdi: 17,
    universalNumber: 2,
    nameVi: 'Răng cối lớn 2 trên phải (Răng 17)',
    nameEn: 'Maxillary Right 2nd Molar (#17)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'molar',
    rootCount: 3,
    canalCount: '3-4',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [-0.030, 1.344, 0.132],
    anesthesiaTechniqueVi: 'Gây tê PSA kết hợp gây tê vòm miệng khẩu cái lớn',
    anesthesiaTechniqueEn: 'PSA nerve block + Greater palatine block'
  },
  {
    fdi: 16,
    universalNumber: 3,
    nameVi: 'Răng cối lớn 1 trên phải (Răng 16)',
    nameEn: 'Maxillary Right 1st Molar (#16)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'molar',
    rootCount: 3,
    canalCount: '3-4 (MB1, MB2, DB, Palatal)',
    pulpInnervationId: 'nerve_psa', // Chân gần ngoài chi phối bởi MSA
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [-0.028, 1.343, 0.140],
    anesthesiaTechniqueVi: 'Gây tê PSA + Tiêm ngấm bổ sung chân gần ngoài (nhánh MSA) + Gây tê khẩu cái lớn',
    anesthesiaTechniqueEn: 'PSA block + local infiltration over mesiobuccal root (MSA) + Greater palatine block'
  },
  {
    fdi: 15,
    universalNumber: 4,
    nameVi: 'Răng cối nhỏ 2 trên phải (Răng 15)',
    nameEn: 'Maxillary Right 2nd Premolar (#15)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [-0.024, 1.342, 0.147],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ ngách tiền đình + Gây tê niêm mạc vòm',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration + palatal infiltration'
  },
  {
    fdi: 14,
    universalNumber: 5,
    nameVi: 'Răng cối nhỏ 1 trên phải (Răng 14)',
    nameEn: 'Maxillary Right 1st Premolar (#14)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'premolar',
    rootCount: 2,
    canalCount: '2 (Buccal, Palatal)',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [-0.020, 1.342, 0.151],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ ngách tiền đình (MSA)',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration'
  },
  {
    fdi: 13,
    universalNumber: 6,
    nameVi: 'Răng nanh trên phải (Răng 13)',
    nameEn: 'Maxillary Right Canine (#13)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'canine',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    position3D: [-0.016, 1.342, 0.154],
    anesthesiaTechniqueVi: 'Gây tê ASA hoặc gây tê lỗ dưới ổ mắt + Gây tê lỗ răng cửa',
    anesthesiaTechniqueEn: 'ASA infiltration or Infraorbital block + Nasopalatine block'
  },
  {
    fdi: 12,
    universalNumber: 7,
    nameVi: 'Răng cửa bên trên phải (Răng 12)',
    nameEn: 'Maxillary Right Lateral Incisor (#12)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    position3D: [-0.010, 1.342, 0.157],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ chóp răng 12 + Gây tê vòm răng cửa',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration + Nasopalatine block'
  },
  {
    fdi: 11,
    universalNumber: 8,
    nameVi: 'Răng cửa giữa trên phải (Răng 11)',
    nameEn: 'Maxillary Right Central Incisor (#11)',
    arch: 'maxillary',
    quadrant: 1,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    position3D: [-0.004, 1.342, 0.158],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ ngách tiền đình + Gây tê lỗ răng cửa',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration + Nasopalatine block'
  },

  // ==========================================================================
  // --- CUNG 2: HÀM TRÊN TRÁI (MAXILLARY LEFT - FDI 21 - 28) ---
  // ==========================================================================
  {
    fdi: 21,
    universalNumber: 9,
    nameVi: 'Răng cửa giữa trên trái (Răng 21)',
    nameEn: 'Maxillary Left Central Incisor (#21)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    position3D: [0.004, 1.342, 0.158],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ ngách tiền đình + Gây tê lỗ răng cửa',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration + Nasopalatine block'
  },
  {
    fdi: 22,
    universalNumber: 10,
    nameVi: 'Răng cửa bên trên trái (Răng 22)',
    nameEn: 'Maxillary Left Lateral Incisor (#22)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    position3D: [0.010, 1.342, 0.157],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ chóp răng 22 + Gây tê vòm răng cửa',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration + Nasopalatine block'
  },
  {
    fdi: 23,
    universalNumber: 11,
    nameVi: 'Răng nanh trên trái (Răng 23)',
    nameEn: 'Maxillary Left Canine (#23)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'canine',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_asa',
    periodontalInnervationId: 'nerve_asa',
    buccalGingivaInnervationId: 'nerve_asa',
    lingualGingivaInnervationId: 'nerve_nasopalatine',
    position3D: [0.016, 1.342, 0.154],
    anesthesiaTechniqueVi: 'Gây tê ASA hoặc gây tê lỗ dưới ổ mắt + Gây tê lỗ răng cửa',
    anesthesiaTechniqueEn: 'ASA infiltration or Infraorbital block + Nasopalatine block'
  },
  {
    fdi: 24,
    universalNumber: 12,
    nameVi: 'Răng cối nhỏ 1 trên trái (Răng 24)',
    nameEn: 'Maxillary Left 1st Premolar (#24)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'premolar',
    rootCount: 2,
    canalCount: '2 (Buccal, Palatal)',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [0.020, 1.342, 0.151],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ ngách tiền đình (MSA)',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration'
  },
  {
    fdi: 25,
    universalNumber: 13,
    nameVi: 'Răng cối nhỏ 2 trên trái (Răng 25)',
    nameEn: 'Maxillary Left 2nd Premolar (#25)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_msa',
    periodontalInnervationId: 'nerve_msa',
    buccalGingivaInnervationId: 'nerve_msa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [0.024, 1.342, 0.147],
    anesthesiaTechniqueVi: 'Gây tê ngấm tại chỗ ngách tiền đình + Gây tê niêm mạc vòm',
    anesthesiaTechniqueEn: 'Supraperiosteal infiltration + palatal infiltration'
  },
  {
    fdi: 26,
    universalNumber: 14,
    nameVi: 'Răng cối lớn 1 trên trái (Răng 26)',
    nameEn: 'Maxillary Left 1st Molar (#26)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'molar',
    rootCount: 3,
    canalCount: '3-4 (MB1, MB2, DB, Palatal)',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [0.028, 1.343, 0.140],
    anesthesiaTechniqueVi: 'Gây tê PSA + Tiêm ngấm bổ sung chân gần ngoài (nhánh MSA) + Gây tê khẩu cái lớn',
    anesthesiaTechniqueEn: 'PSA block + local infiltration over mesiobuccal root (MSA) + Greater palatine block'
  },
  {
    fdi: 27,
    universalNumber: 15,
    nameVi: 'Răng cối lớn 2 trên trái (Răng 27)',
    nameEn: 'Maxillary Left 2nd Molar (#27)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'molar',
    rootCount: 3,
    canalCount: '3-4',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [0.030, 1.344, 0.132],
    anesthesiaTechniqueVi: 'Gây tê PSA kết hợp gây tê vòm miệng khẩu cái lớn',
    anesthesiaTechniqueEn: 'PSA nerve block + Greater palatine block'
  },
  {
    fdi: 28,
    universalNumber: 16,
    nameVi: 'Răng khôn trên trái (Răng 28)',
    nameEn: 'Maxillary Left 3rd Molar (#28)',
    arch: 'maxillary',
    quadrant: 2,
    toothType: 'molar',
    rootCount: 3,
    canalCount: '3-4',
    pulpInnervationId: 'nerve_psa',
    periodontalInnervationId: 'nerve_psa',
    buccalGingivaInnervationId: 'nerve_psa',
    lingualGingivaInnervationId: 'nerve_greater_palatine',
    position3D: [0.032, 1.344, 0.124],
    anesthesiaTechniqueVi: 'Gây tê PSA kết hợp gây tê thần kinh khẩu cái lớn',
    anesthesiaTechniqueEn: 'PSA nerve block + Greater palatine block'
  },

  // ==========================================================================
  // --- CUNG 3: HÀM DƯỚI TRÁI (MANDIBULAR LEFT - FDI 31 - 38) ---
  // ==========================================================================
  {
    fdi: 31,
    universalNumber: 24,
    nameVi: 'Răng cửa giữa dưới trái (Răng 31)',
    nameEn: 'Mandibular Left Central Incisor (#31)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.004, 1.330, 0.158],
    anesthesiaTechniqueVi: 'Gây tê thần kinh răng cửa hoặc tiêm ngấm tại chỗ',
    anesthesiaTechniqueEn: 'Incisive block or local infiltration'
  },
  {
    fdi: 32,
    universalNumber: 23,
    nameVi: 'Răng cửa bên dưới trái (Răng 32)',
    nameEn: 'Mandibular Left Lateral Incisor (#32)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.010, 1.330, 0.157],
    anesthesiaTechniqueVi: 'Gây tê thần kinh răng cửa hoặc tiêm ngấm xương vỏ mỏng',
    anesthesiaTechniqueEn: 'Incisive block or supraperiosteal infiltration'
  },
  {
    fdi: 33,
    universalNumber: 22,
    nameVi: 'Răng nanh dưới trái (Răng 33)',
    nameEn: 'Mandibular Left Canine (#33)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'canine',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.016, 1.330, 0.154],
    anesthesiaTechniqueVi: 'Gây tê thần kinh răng cửa (Incisive nerve block) hoặc tiêm ngấm',
    anesthesiaTechniqueEn: 'Incisive block or local infiltration'
  },
  {
    fdi: 34,
    universalNumber: 21,
    nameVi: 'Răng cối nhỏ 1 dưới trái (Răng 34)',
    nameEn: 'Mandibular Left 1st Premolar (#34)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.021, 1.330, 0.151],
    anesthesiaTechniqueVi: 'Gây tê lỗ cằm/răng cửa hoặc gây tê gai Spix',
    anesthesiaTechniqueEn: 'Mental/Incisive block or IAN block'
  },
  {
    fdi: 35,
    universalNumber: 20,
    nameVi: 'Răng cối nhỏ 2 dưới trái (Răng 35)',
    nameEn: 'Mandibular Left 2nd Premolar (#35)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.025, 1.330, 0.147],
    anesthesiaTechniqueVi: 'Gây tê gai Spix hoặc gây tê lỗ cằm/răng cửa (Mental/Incisive block)',
    anesthesiaTechniqueEn: 'IAN block or Mental/Incisive nerve block'
  },
  {
    fdi: 36,
    universalNumber: 19,
    nameVi: 'Răng cối lớn 1 dưới trái (Răng 36)',
    nameEn: 'Mandibular Left 1st Molar (#36)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'molar',
    rootCount: 2,
    canalCount: '3-4 (MB, ML, Distal / DB, DL)',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.029, 1.332, 0.140],
    anesthesiaTechniqueVi: 'Gây tê gai Spix (IAN block) + Gây tê thần kinh má',
    anesthesiaTechniqueEn: 'IAN block + Long buccal block'
  },
  {
    fdi: 37,
    universalNumber: 18,
    nameVi: 'Răng cối lớn 2 dưới trái (Răng 37)',
    nameEn: 'Mandibular Left 2nd Molar (#37)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'molar',
    rootCount: 2,
    canalCount: '3 (Mesial x2, Distal x1)',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.032, 1.332, 0.132],
    anesthesiaTechniqueVi: 'Gây tê gai Spix (IAN block) + Gây tê thần kinh má',
    anesthesiaTechniqueEn: 'IAN block + Long buccal block'
  },
  {
    fdi: 38,
    universalNumber: 17,
    nameVi: 'Răng khôn dưới trái (Răng 38)',
    nameEn: 'Mandibular Left 3rd Molar (#38)',
    arch: 'mandibular',
    quadrant: 3,
    toothType: 'molar',
    rootCount: 2,
    canalCount: '2-3',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [0.034, 1.332, 0.124],
    anesthesiaTechniqueVi: 'Gây tê gai Spix (IAN block) + Gây tê thần kinh má (Buccal block) + Gây tê thần kinh lưỡi',
    anesthesiaTechniqueEn: 'Inferior alveolar nerve block + Long buccal block + Lingual block'
  },

  // ==========================================================================
  // --- CUNG 4: HÀM DƯỚI PHẢI (MANDIBULAR RIGHT - FDI 41 - 48) ---
  // ==========================================================================
  {
    fdi: 41,
    universalNumber: 25,
    nameVi: 'Răng cửa giữa dưới phải (Răng 41)',
    nameEn: 'Mandibular Right Central Incisor (#41)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.004, 1.330, 0.158],
    anesthesiaTechniqueVi: 'Gây tê thần kinh răng cửa hoặc tiêm ngấm tại chỗ',
    anesthesiaTechniqueEn: 'Incisive block or local infiltration'
  },
  {
    fdi: 42,
    universalNumber: 26,
    nameVi: 'Răng cửa bên dưới phải (Răng 42)',
    nameEn: 'Mandibular Right Lateral Incisor (#42)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.010, 1.330, 0.157],
    anesthesiaTechniqueVi: 'Gây tê thần kinh răng cửa hoặc tiêm ngấm xương vỏ mỏng',
    anesthesiaTechniqueEn: 'Incisive block or supraperiosteal infiltration'
  },
  {
    fdi: 43,
    universalNumber: 27,
    nameVi: 'Răng nanh dưới phải (Răng 43)',
    nameEn: 'Mandibular Right Canine (#43)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'canine',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_incisive',
    periodontalInnervationId: 'nerve_incisive',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.016, 1.330, 0.154],
    anesthesiaTechniqueVi: 'Gây tê thần kinh răng cửa (Incisive nerve block) hoặc tiêm ngấm',
    anesthesiaTechniqueEn: 'Incisive block or local infiltration'
  },
  {
    fdi: 44,
    universalNumber: 28,
    nameVi: 'Răng cối nhỏ 1 dưới phải (Răng 44)',
    nameEn: 'Mandibular Right 1st Premolar (#44)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.021, 1.330, 0.151],
    anesthesiaTechniqueVi: 'Gây tê lỗ cằm/răng cửa hoặc gây tê gai Spix',
    anesthesiaTechniqueEn: 'Mental/Incisive block or IAN block'
  },
  {
    fdi: 45,
    universalNumber: 29,
    nameVi: 'Răng cối nhỏ 2 dưới phải (Răng 45)',
    nameEn: 'Mandibular Right 2nd Premolar (#45)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: '1-2',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_mental',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.025, 1.330, 0.147],
    anesthesiaTechniqueVi: 'Gây tê gai Spix hoặc gây tê lỗ cằm/răng cửa (Mental/Incisive block)',
    anesthesiaTechniqueEn: 'IAN block or Mental/Incisive nerve block'
  },
  {
    fdi: 46,
    universalNumber: 30,
    nameVi: 'Răng cối lớn 1 dưới phải (Răng 46)',
    nameEn: 'Mandibular Right 1st Molar (#46)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'molar',
    rootCount: 2,
    canalCount: '3-4 (MB, ML, Distal / DB, DL)',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.029, 1.332, 0.140],
    anesthesiaTechniqueVi: 'Gây tê gai Spix (IAN block) + Gây tê thần kinh má',
    anesthesiaTechniqueEn: 'IAN block + Long buccal block'
  },
  {
    fdi: 47,
    universalNumber: 31,
    nameVi: 'Răng cối lớn 2 dưới phải (Răng 47)',
    nameEn: 'Mandibular Right 2nd Molar (#47)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'molar',
    rootCount: 2,
    canalCount: '3 (Mesial x2, Distal x1)',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.032, 1.332, 0.132],
    anesthesiaTechniqueVi: 'Gây tê gai Spix (IAN block) + Gây tê thần kinh má',
    anesthesiaTechniqueEn: 'IAN block + Long buccal block'
  },
  {
    fdi: 48,
    universalNumber: 32,
    nameVi: 'Răng khôn dưới phải (Răng 48)',
    nameEn: 'Mandibular Right 3rd Molar (#48)',
    arch: 'mandibular',
    quadrant: 4,
    toothType: 'molar',
    rootCount: 2,
    canalCount: '2-3',
    pulpInnervationId: 'nerve_ian',
    periodontalInnervationId: 'nerve_ian',
    buccalGingivaInnervationId: 'nerve_buccal',
    lingualGingivaInnervationId: 'nerve_lingual',
    position3D: [-0.034, 1.332, 0.124],
    anesthesiaTechniqueVi: 'Gây tê gai Spix (IAN block) + Gây tê thần kinh má (Buccal block) + Gây tê thần kinh lưỡi',
    anesthesiaTechniqueEn: 'Inferior alveolar nerve block + Long buccal block + Lingual block'
  }
];

// ============================================================================
// 4. MUSCLES OF MASTICATION (INNERVATED BY CN V3)
// ============================================================================

export const MUSCLES_OF_MASTICATION: MuscleOfMastication[] = [
  {
    id: 'muscle_masseter',
    nameVi: 'Cơ Cắn',
    nameEn: 'Masseter Muscle',
    latinName: 'Musculus masseter',
    originVi: 'Bờ dưới và mặt trong cung gò má',
    originEn: 'Zygomatic arch (inferior border and medial surface)',
    insertionVi: 'Góc hàm và mặt ngoài cành lên xương hàm dưới',
    insertionEn: 'Angle and lateral surface of mandibular ramus',
    actionVi: 'Nâng xương hàm dưới lên trên (ngậm miệng và cắn chặt hai hàm)',
    actionEn: 'Elevates mandible (closes jaw)',
    innervationId: 'cn_5_v3', // masseteric nerve of V3
    bloodSupplyVi: 'Động mạch cắn (nhánh của động mạch hàm trên)',
    bloodSupplyEn: 'Masseteric artery from maxillary artery'
  },
  {
    id: 'muscle_temporalis',
    nameVi: 'Cơ Thái dương',
    nameEn: 'Temporalis Muscle',
    latinName: 'Musculus temporalis',
    originVi: 'Hố thái dương và mạc thái dương sâu',
    originEn: 'Temporal fossa and deep temporal fascia',
    insertionVi: 'Mỏm vẹt và bờ trước cành lên xương hàm dưới',
    insertionEn: 'Coronoid process and anterior border of ramus',
    actionVi: 'Nâng hàm dưới (ngậm miệng); các sợi sau kéo hàm dưới ra sau',
    actionEn: 'Elevates mandible; posterior horizontal fibers retract mandible',
    innervationId: 'cn_5_v3', // deep temporal nerves of V3
    bloodSupplyVi: 'Các động mạch thái dương sâu',
    bloodSupplyEn: 'Deep temporal arteries'
  },
  {
    id: 'muscle_medial_pterygoid',
    nameVi: 'Cơ Chân bướm trong',
    nameEn: 'Medial Pterygoid Muscle',
    latinName: 'Musculus pterygoideus medialis',
    originVi: 'Mặt trong cánh ngoài mỏm chân bướm và hố chân bướm',
    originEn: 'Medial surface of lateral pterygoid plate and pterygoid fossa',
    insertionVi: 'Mặt trong góc hàm (tạo thành đai cơ nhai cùng cơ cắn)',
    insertionEn: 'Medial surface of mandibular angle and ramus',
    actionVi: 'Nâng hàm dưới, đưa hàm ra trước và sang hai bên khi nhai',
    actionEn: 'Elevates mandible, assists in protrusion and side-to-side chewing',
    innervationId: 'cn_5_v3', // nerve to medial pterygoid
    bloodSupplyVi: 'Nhánh chân bướm của động mạch hàm trên',
    bloodSupplyEn: 'Pterygoid branches of maxillary artery'
  },
  {
    id: 'muscle_lateral_pterygoid',
    nameVi: 'Cơ Chân bướm ngoài',
    nameEn: 'Lateral Pterygoid Muscle',
    latinName: 'Musculus pterygoideus lateralis',
    originVi: 'Đầu trên: Mặt dưới cánh lớn xương bướm; Đầu dưới: Mặt ngoài cánh ngoài mỏm chân bướm',
    originEn: 'Upper head: infratemporal surface of sphenoid; Lower head: lateral surface of lateral pterygoid plate',
    insertionVi: 'Hõm chân bướm ở cổ lồi cầu hàm dưới và bao khớp, đĩa khớp thái dương hàm (TMJ)',
    insertionEn: 'Pterygoid fovea on mandibular neck, TMJ capsule and articular disc',
    actionVi: 'Hạ hàm dưới (MỞ MIỆNG - cơ nhai duy nhất mở miệng!), đưa hàm dưới ra trước và sang bên đối diện',
    actionEn: 'Depresses mandible (OPENS JAW - only masticatory muscle to do so!), protrudes mandible and produces contralateral excursion',
    innervationId: 'cn_5_v3', // nerve to lateral pterygoid
    bloodSupplyVi: 'Nhánh chân bướm của động mạch hàm trên',
    bloodSupplyEn: 'Pterygoid branches of maxillary artery'
  }
];

// ============================================================================
// 5. CLINICAL DENTAL ANESTHESIA TECHNIQUES
// ============================================================================

export const CLINICAL_ANESTHESIA_TECHNIQUES: ClinicalAnesthesiaTechnique[] = [
  {
    id: 'ian_block',
    nameVi: 'Gây tê Gai Spix (Kỹ thuật Halsted)',
    nameEn: 'Inferior Alveolar Nerve Block (Halsted Technique)',
    targetNerveIds: ['nerve_ian', 'nerve_lingual'],
    landmarkVi: 'Độ sâu rãnh chân bướm hàm, bờ trước cành lên (mào thái dương), cách mặt nhai răng cối lớn dưới 1cm',
    landmarkEn: 'Pterygomandibular raphe, coronoid notch, 6-10mm superior to mandibular occlusal plane',
    needleTargetPosition: [-0.038, 1.355, 0.095],
    anesthetizedStructuresVi: [
      'Toàn bộ răng hàm dưới cùng bên (tủy và nha chu)',
      'Thân và cành xương hàm dưới',
      'Màng xương và niêm mạc ngách lợi từ răng cối nhỏ ra trước',
      'Môi dưới và da cằm cùng bên',
      '2/3 trước lưỡi và sàn miệng (kèm tê thần kinh lưỡi)'
    ],
    anesthetizedStructuresEn: [
      'All ipsilateral mandibular teeth (pulp and periodontium)',
      'Body and lower ramus of mandible',
      'Buccal periosteum/mucosa anterior to 1st molar',
      'Lower lip and chin',
      'Anterior 2/3 of tongue and floor of mouth'
    ],
    potentialComplicationsVi: [
      'Tiêm trúng tĩnh mạch/động mạch huyệt răng dưới (phải hút kiểm tra ngược)',
      'Liệt mặt ngoại vi tạm thời nếu kim quá sâu vào tuyến mang tai',
      'Tê bì dị cảm kéo dài do kim chạm bó sợi thần kinh',
      'Khít hàm do tiêm vào cơ chân bướm trong'
    ],
    potentialComplicationsEn: [
      'Intravascular injection into IAN vessels (mandatory aspiration)',
      'Transient facial nerve palsy from parotid penetration',
      'Lingual nerve or IAN paresthesia from needle trauma',
      'Trismus from medial pterygoid muscle spasm'
    ],
    educationalNoteVi: 'Kỹ thuật kinh điển nhất trong phẫu thuật miệng và nhổ răng khôn hàm dưới.',
    educationalNoteEn: 'Most widely performed injection technique in dentistry and oral surgery.'
  },
  {
    id: 'gow_gates_block',
    nameVi: 'Gây tê Thần kinh Hàm dưới Cao (Kỹ thuật Gow-Gates)',
    nameEn: 'Gow-Gates High Mandibular Nerve Block',
    targetNerveIds: ['cn_5_v3', 'nerve_ian', 'nerve_lingual', 'nerve_buccal', 'nerve_auriculotemporal'],
    landmarkVi: 'Mặt trong cổ lồi cầu xương hàm dưới, ngay dưới bám tận cơ chân bướm ngoài',
    landmarkEn: 'Anteromedial neck of mandibular condyle, below lateral pterygoid insertion',
    needleTargetPosition: [-0.044, 1.380, 0.070],
    anesthetizedStructuresVi: [
      'Toàn bộ phân bố của dây V3: tất cả răng dưới, lưỡi, má, cằm, thái dương'
    ],
    anesthetizedStructuresEn: [
      'Entire sensory distribution of V3 including buccal mucosa and temporal region'
    ],
    potentialComplicationsVi: [
      'Thời gian khởi tê chậm hơn Halsted (5-10 phút)',
      'Khó xác định mốc nếu bệnh nhân không há miệng tối đa'
    ],
    potentialComplicationsEn: [
      'Slower onset (5-10 min)',
      'Requires wide mouth opening to position condyle anteriorly'
    ],
    educationalNoteVi: 'Tỷ lệ thành công >95% và hầu như không gây đâm trúng mạch máu.',
    educationalNoteEn: 'True mandibular trunk block with >95% success rate and minimal intravascular risk.'
  },
  {
    id: 'mental_incisive_block',
    nameVi: 'Gây tê Thần kinh Cằm & Răng cửa',
    nameEn: 'Mental and Incisive Nerve Block',
    targetNerveIds: ['nerve_mental', 'nerve_incisive'],
    landmarkVi: 'Ngách lợi giữa 2 răng cối nhỏ hàm dưới (răng 34-35 hoặc 44-45)',
    landmarkEn: 'Mucobuccal fold adjacent to mandibular premolar apices',
    needleTargetPosition: [-0.030, 1.320, 0.150],
    anesthetizedStructuresVi: [
      'Răng cối nhỏ, răng nanh và răng cửa hàm dưới cùng bên',
      'Môi dưới và cằm cùng bên'
    ],
    anesthetizedStructuresEn: [
      'Mandibular premolars, canines, and incisors ipsilaterally',
      'Lower lip and chin soft tissues'
    ],
    potentialComplicationsVi: [
      'Tụ máu tại lỗ cằm (Hematoma)'
    ],
    potentialComplicationsEn: [
      'Hematoma at mental foramen'
    ],
    educationalNoteVi: 'Khi bơm thuốc tê, dùng ngón tay ấn nhẹ miệng lỗ cằm trong 1-2 phút để thuốc ngấm vào ống răng cửa.',
    educationalNoteEn: 'Gentle digital pressure over foramen pushes anesthetic into incisive canal.'
  }
];

// ============================================================================
// 6. RELATIONAL GRAPH CONNECTIONS
// ============================================================================

export const ANATOMICAL_RELATIONS: AnatomyRelation[] = [
  // CN V Hierarchy
  { sourceId: 'cn_5', relationType: 'branch_of', targetId: 'brainstem' },
  { sourceId: 'cn_5_v1', relationType: 'branch_of', targetId: 'cn_5' },
  { sourceId: 'cn_5_v2', relationType: 'branch_of', targetId: 'cn_5' },
  { sourceId: 'cn_5_v3', relationType: 'branch_of', targetId: 'cn_5' },

  // V1 Course
  { sourceId: 'cn_5_v1', relationType: 'passes_through', targetId: 'superior_orbital_fissure' },
  { sourceId: 'nerve_frontal', relationType: 'branch_of', targetId: 'cn_5_v1' },
  { sourceId: 'nerve_supraorbital', relationType: 'branch_of', targetId: 'nerve_frontal' },
  { sourceId: 'nerve_supraorbital', relationType: 'passes_through', targetId: 'supraorbital_foramen' },

  // V2 Course
  { sourceId: 'cn_5_v2', relationType: 'passes_through', targetId: 'foramen_rotundum' },
  { sourceId: 'nerve_infraorbital', relationType: 'branch_of', targetId: 'cn_5_v2' },
  { sourceId: 'nerve_infraorbital', relationType: 'travels_through', targetId: 'infraorbital_canal' },
  { sourceId: 'nerve_infraorbital', relationType: 'exits', targetId: 'infraorbital_foramen' },
  { sourceId: 'nerve_psa', relationType: 'branch_of', targetId: 'cn_5_v2' },
  { sourceId: 'nerve_msa', relationType: 'branch_of', targetId: 'nerve_infraorbital' },
  { sourceId: 'nerve_asa', relationType: 'branch_of', targetId: 'nerve_infraorbital' },
  { sourceId: 'nerve_greater_palatine', relationType: 'branch_of', targetId: 'cn_5_v2' },
  { sourceId: 'nerve_greater_palatine', relationType: 'passes_through', targetId: 'greater_palatine_foramen' },
  { sourceId: 'nerve_nasopalatine', relationType: 'branch_of', targetId: 'cn_5_v2' },
  { sourceId: 'nerve_nasopalatine', relationType: 'passes_through', targetId: 'incisive_foramen' },

  // V3 Course & Mandibular Canal
  { sourceId: 'cn_5_v3', relationType: 'passes_through', targetId: 'foramen_ovale' },
  { sourceId: 'nerve_ian', relationType: 'branch_of', targetId: 'cn_5_v3' },
  { sourceId: 'nerve_ian', relationType: 'enters', targetId: 'mandibular_foramen' },
  { sourceId: 'nerve_ian', relationType: 'travels_through', targetId: 'mandibular_canal' },
  { sourceId: 'nerve_mental', relationType: 'branch_of', targetId: 'nerve_ian' },
  { sourceId: 'nerve_mental', relationType: 'exits', targetId: 'mental_foramen' },
  { sourceId: 'nerve_incisive', relationType: 'branch_of', targetId: 'nerve_ian' },
  { sourceId: 'nerve_lingual', relationType: 'branch_of', targetId: 'cn_5_v3' },
  { sourceId: 'nerve_buccal', relationType: 'branch_of', targetId: 'cn_5_v3' },
  { sourceId: 'nerve_auriculotemporal', relationType: 'branch_of', targetId: 'cn_5_v3' },

  // Muscles Innervation
  { sourceId: 'cn_5_v3', relationType: 'innervates', targetId: 'muscle_masseter' },
  { sourceId: 'cn_5_v3', relationType: 'innervates', targetId: 'muscle_temporalis' },
  { sourceId: 'cn_5_v3', relationType: 'innervates', targetId: 'muscle_medial_pterygoid' },
  { sourceId: 'cn_5_v3', relationType: 'innervates', targetId: 'muscle_lateral_pterygoid' },

  // CN VII
  { sourceId: 'cn_7', relationType: 'passes_through', targetId: 'stylomastoid_foramen' },
  { sourceId: 'cn_7_temporal', relationType: 'branch_of', targetId: 'cn_7' },
  { sourceId: 'cn_7_zygomatic', relationType: 'branch_of', targetId: 'cn_7' },
  { sourceId: 'cn_7_buccal', relationType: 'branch_of', targetId: 'cn_7' },
  { sourceId: 'cn_7_marginal_mandibular', relationType: 'branch_of', targetId: 'cn_7' },
  { sourceId: 'cn_7_cervical', relationType: 'branch_of', targetId: 'cn_7' }
];
