/**
 * ANATOMY ASSET REGISTRY (MedAnatomy 3D Unified Platform)
 * Single source of truth mapping canonical anatomy IDs (e.g. 'nerve.inferior_alveolar', 'tooth.48')
 * and legacy identifiers (e.g. 'nerve_ian', 'tooth_48') to verified external 3D GLTF meshes.
 * Strictly adheres to CC BY-SA 4.0 and CC BY 4.0 provenance (Z-Anatomy / BodyParts3D / Dundee).
 */

export type AssetType = 'ANATOMICAL_MESH' | 'PATH_ASSET' | 'COMPOSITE_SYSTEM' | 'PLACEHOLDER';
export type AssetStatus = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED' | 'PLACEHOLDER' | 'MISSING';
export type AnatomicalRegion =
  | 'HEAD'
  | 'NECK'
  | 'THORAX'
  | 'ABDOMEN'
  | 'PELVIS'
  | 'UPPER_LIMB'
  | 'LOWER_LIMB'
  | 'ORBIT'
  | 'ORAL_CAVITY'
  | 'MAXILLA'
  | 'MANDIBLE'
  | 'TMJ'
  | 'SKULL_BASE';

export type Laterality = 'LEFT' | 'RIGHT' | 'MIDLINE' | 'BILATERAL';

export interface AnatomyAssetEntry {
  id: string;                    // Primary canonical or registered ID
  canonicalId: string;           // Standard dot ID: e.g. 'nerve.inferior_alveolar', 'tooth.48'
  legacyId?: string;             // Backward-compatible ID: e.g. 'nerve_ian', 'tooth_48'
  nameVi: string;
  nameEn: string;
  latinName?: string;
  synonyms: string[];            // Search synonyms, acronyms, clinical aliases
  region: AnatomicalRegion;
  laterality: Laterality;
  modelUrl: string;
  nodeNames: {
    right?: string;
    left?: string;
    joint?: string;
    subNodes?: string[];
  };
  type: AssetType;
  source: string;
  license: string;
  licenseUrl: string;
  status: AssetStatus;
  category: 'cranial_nerve' | 'muscle' | 'joint' | 'bone' | 'vessel' | 'tooth' | 'foramen' | 'canal' | 'organ';
  reviewStatus: 'VERIFIED' | 'REVIEWED' | 'DRAFT';
  references: string[];
}

const RAW_ENTRIES: AnatomyAssetEntry[] = [
  // ==========================================================================
  // 1. CRANIAL NERVES (HỆ THẦN KINH SỌ)
  // ==========================================================================
  {
    id: 'nerve.trigeminal',
    canonicalId: 'nerve.trigeminal',
    legacyId: 'nerve_cn_v',
    nameVi: 'Dây thần kinh sinh ba (Dây V)',
    nameEn: 'Trigeminal Nerve (CN V)',
    latinName: 'Nervus trigeminus',
    synonyms: ['CN V', 'Dây V', 'Thần kinh tam thoa', 'Trigeminal nerve', 'CN 5'],
    region: 'HEAD',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Trigeminal nerve (V).r',
      left: 'Trigeminal nerve (V).l',
      subNodes: ['Sensory root of trigeminal nerve.r', 'Motor root of trigeminal nerve.r']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 582", 'Netter Atlas of Human Anatomy, Plate 45']
  },
  {
    id: 'nerve.v1',
    canonicalId: 'nerve.v1',
    legacyId: 'nerve_v1',
    nameVi: 'Thần kinh mắt (V1)',
    nameEn: 'Ophthalmic Nerve (V1)',
    latinName: 'Nervus ophthalmicus',
    synonyms: ['V1', 'Dây V1', 'Thần kinh mắt', 'Ophthalmic nerve'],
    region: 'ORBIT',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Ophthalmic nerve.r',
      left: 'Ophthalmic nerve.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 583"]
  },
  {
    id: 'nerve.v2',
    canonicalId: 'nerve.v2',
    legacyId: 'nerve_v2',
    nameVi: 'Thần kinh hàm trên (V2)',
    nameEn: 'Maxillary Nerve (V2)',
    latinName: 'Nervus maxillaris',
    synonyms: ['V2', 'Dây V2', 'Thần kinh hàm trên', 'Maxillary nerve'],
    region: 'MAXILLA',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Maxillary nerve.r',
      left: 'Maxillary nerve.l',
      subNodes: ['Meningeal branch of maxillary nerve.r', 'Meningeal branch of maxillary nerve.l']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 584"]
  },
  {
    id: 'nerve.v3',
    canonicalId: 'nerve.v3',
    legacyId: 'nerve_v3',
    nameVi: 'Thần kinh hàm dưới (V3)',
    nameEn: 'Mandibular Nerve (V3)',
    latinName: 'Nervus mandibularis',
    synonyms: ['V3', 'Dây V3', 'Thần kinh hàm dưới', 'Mandibular nerve', 'TK V3'],
    region: 'MANDIBLE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      joint: 'Mandibular nerve.j',
      right: 'Posterior division of mandibular nerve.r',
      left: 'Posterior division of mandibular nerve.l',
      subNodes: ['Anterior division of mandibular nerve.r', 'Anterior division of mandibular nerve.l']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 586"]
  },
  {
    id: 'nerve.inferior_alveolar',
    canonicalId: 'nerve.inferior_alveolar',
    legacyId: 'nerve_ian',
    nameVi: 'Thần kinh huyệt răng dưới (IAN)',
    nameEn: 'Inferior Alveolar Nerve (IAN)',
    latinName: 'Nervus alveolaris inferior',
    synonyms: ['IAN', 'TK răng dưới', 'Thần kinh huyệt răng dưới', 'thần kinh xương ổ răng dưới', 'inferior alveolar nerve'],
    region: 'MANDIBLE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Inferior alveolar nerve.r',
      left: 'Inferior alveolar nerve.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Malamed's Handbook of Local Anesthesia 7th Ed", "Gray's Anatomy 42nd Ed, p. 588"]
  },
  {
    id: 'nerve.lingual',
    canonicalId: 'nerve.lingual',
    legacyId: 'nerve_lingual',
    nameVi: 'Thần kinh lưỡi',
    nameEn: 'Lingual Nerve',
    latinName: 'Nervus lingualis',
    synonyms: ['TK lưỡi', 'Lingual nerve', 'Dây TK lưỡi', 'LN'],
    region: 'ORAL_CAVITY',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Lingual nerve.r',
      left: 'Lingual nerve.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 587"]
  },
  {
    id: 'nerve.mental',
    canonicalId: 'nerve.mental',
    legacyId: 'nerve_mental',
    nameVi: 'Thần kinh cằm',
    nameEn: 'Mental Nerve',
    latinName: 'Nervus mentalis',
    synonyms: ['TK cằm', 'Mental nerve', 'Dây thần kinh cằm'],
    region: 'MANDIBLE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Mental nerve.r',
      left: 'Mental nerve.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 589"]
  },
  {
    id: 'nerve.buccal',
    canonicalId: 'nerve.buccal',
    legacyId: 'nerve_buccal',
    nameVi: 'Thần kinh má',
    nameEn: 'Buccal Nerve (Long Buccal)',
    latinName: 'Nervus buccalis',
    synonyms: ['TK má', 'Buccal nerve', 'Long buccal nerve'],
    region: 'ORAL_CAVITY',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Buccal nerve.r',
      left: 'Buccal nerve.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 586"]
  },
  {
    id: 'nerve.mylohyoid',
    canonicalId: 'nerve.mylohyoid',
    legacyId: 'nerve_mylohyoid',
    nameVi: 'Thần kinh hàm móng',
    nameEn: 'Mylohyoid Nerve',
    latinName: 'Nervus mylohyoideus',
    synonyms: ['TK hàm móng', 'Mylohyoid nerve'],
    region: 'MANDIBLE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Nerve to mylohyoid.r',
      left: 'Nerve to mylohyoid.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 588"]
  },
  {
    id: 'nerve.facial',
    canonicalId: 'nerve.facial',
    legacyId: 'nerve_facial_cn_vii',
    nameVi: 'Dây thần kinh mặt (Dây VII)',
    nameEn: 'Facial Nerve (CN VII)',
    latinName: 'Nervus facialis',
    synonyms: ['CN VII', 'Dây VII', 'Thần kinh mặt', 'Facial nerve', 'CN 7'],
    region: 'HEAD',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Facial nerve (VII).r',
      left: 'Facial nerve (VII).l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 590"]
  },

  // ==========================================================================
  // 2. MUSCLES OF MASTICATION (CƠ NHAI)
  // ==========================================================================
  {
    id: 'muscle.masseter',
    canonicalId: 'muscle.masseter',
    legacyId: 'muscle_masseter',
    nameVi: 'Cơ cắn',
    nameEn: 'Masseter Muscle',
    latinName: 'Musculus masseter',
    synonyms: ['Cơ cắn', 'Masseter', 'Musculus masseter'],
    region: 'TMJ',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Masseter superficial part.r',
      left: 'Masseter superficial part.l',
      subNodes: ['Masseter deep part.r', 'Masseter deep part.l']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle',
    reviewStatus: 'VERIFIED',
    references: ["Moore Clinically Oriented Anatomy 8th Ed, p. 928"]
  },
  {
    id: 'muscle.temporalis',
    canonicalId: 'muscle.temporalis',
    legacyId: 'muscle_temporalis',
    nameVi: 'Cơ thái dương',
    nameEn: 'Temporalis Muscle',
    latinName: 'Musculus temporalis',
    synonyms: ['Cơ thái dương', 'Temporalis'],
    region: 'HEAD',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Temporalis anterior part.r',
      left: 'Temporalis anterior part.l',
      subNodes: ['Temporalis posterior part.r', 'Temporalis posterior part.l']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle',
    reviewStatus: 'VERIFIED',
    references: ["Moore Clinically Oriented Anatomy 8th Ed, p. 928"]
  },
  {
    id: 'muscle.lateral_pterygoid',
    canonicalId: 'muscle.lateral_pterygoid',
    legacyId: 'muscle_lateral_pterygoid',
    nameVi: 'Cơ chân bướm ngoài',
    nameEn: 'Lateral Pterygoid Muscle',
    latinName: 'Musculus pterygoideus lateralis',
    synonyms: ['Cơ chân bướm ngoài', 'Lateral pterygoid'],
    region: 'TMJ',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Lateral pterygoid superior head.r',
      left: 'Lateral pterygoid superior head.l',
      subNodes: ['Lateral pterygoid inferior head.r', 'Lateral pterygoid inferior head.l']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle',
    reviewStatus: 'VERIFIED',
    references: ["Moore Clinically Oriented Anatomy 8th Ed, p. 929"]
  },
  {
    id: 'muscle.medial_pterygoid',
    canonicalId: 'muscle.medial_pterygoid',
    legacyId: 'muscle_medial_pterygoid',
    nameVi: 'Cơ chân bướm trong',
    nameEn: 'Medial Pterygoid Muscle',
    latinName: 'Musculus pterygoideus medialis',
    synonyms: ['Cơ chân bướm trong', 'Medial pterygoid'],
    region: 'TMJ',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Medial pterygoid.r',
      left: 'Medial pterygoid.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle',
    reviewStatus: 'VERIFIED',
    references: ["Moore Clinically Oriented Anatomy 8th Ed, p. 929"]
  },
  {
    id: 'muscle.buccinator',
    canonicalId: 'muscle.buccinator',
    legacyId: 'muscle_buccinator',
    nameVi: 'Cơ mút',
    nameEn: 'Buccinator Muscle',
    latinName: 'Musculus buccinator',
    synonyms: ['Cơ mút', 'Buccinator'],
    region: 'ORAL_CAVITY',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Buccinator.r',
      left: 'Buccinator.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle',
    reviewStatus: 'VERIFIED',
    references: ["Netter Atlas Plate 54"]
  },

  // ==========================================================================
  // 3. TEMPOROMANDIBULAR JOINT COMPLEX (KHỚP THÁI DƯƠNG HÀM)
  // ==========================================================================
  {
    id: 'joint.tmj',
    canonicalId: 'joint.tmj',
    legacyId: 'joint_tmj',
    nameVi: 'Khớp Thái Dương Hàm (TMJ)',
    nameEn: 'Temporomandibular Joint Complex',
    latinName: 'Articulatio temporomandibularis',
    synonyms: ['TMJ', 'Khớp TDH', 'Khớp thái dương hàm', 'Temporomandibular joint'],
    region: 'TMJ',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/tmj/tmj_complex.glb',
    nodeNames: {
      right: 'Articular disc of temporomandibular joint.r',
      left: 'Articular disc of temporomandibular joint.l',
      subNodes: ['Articular capsule of temporomandibular joint.r', 'Articular capsule of temporomandibular joint.l']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'joint',
    reviewStatus: 'VERIFIED',
    references: ["Okeson Management of Temporomandibular Disorders 8th Ed"]
  },
  {
    id: 'joint.tmj.disc',
    canonicalId: 'joint.tmj.disc',
    legacyId: 'tmj_disc',
    nameVi: 'Đĩa khớp thái dương hàm',
    nameEn: 'Articular Disc of TMJ',
    latinName: 'Discus articularis',
    synonyms: ['Đĩa khớp', 'TMJ disc', 'Articular disc'],
    region: 'TMJ',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/tmj/tmj_complex.glb',
    nodeNames: {
      right: 'Articular disc of temporomandibular joint.r',
      left: 'Articular disc of temporomandibular joint.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'joint',
    reviewStatus: 'VERIFIED',
    references: ["Okeson Management of TMD 8th Ed, p. 12"]
  },

  // ==========================================================================
  // 4. BONES & OSTEOLOGY (XƯƠNG SỌ MẶT)
  // ==========================================================================
  {
    id: 'bone.mandible',
    canonicalId: 'bone.mandible',
    legacyId: 'bone_mandible',
    nameVi: 'Xương hàm dưới',
    nameEn: 'Mandible',
    latinName: 'Mandibula',
    synonyms: ['Xương hàm dưới', 'Mandible', 'Xương hàm', 'XHD'],
    region: 'MANDIBLE',
    laterality: 'MIDLINE',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      joint: 'Mandible'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'bone',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 512"]
  },
  {
    id: 'bone.maxilla',
    canonicalId: 'bone.maxilla',
    legacyId: 'bone_maxilla',
    nameVi: 'Xương hàm trên',
    nameEn: 'Maxilla',
    latinName: 'Maxilla',
    synonyms: ['Xương hàm trên', 'Maxilla', 'XHT'],
    region: 'MAXILLA',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      right: 'Maxilla.r',
      left: 'Maxilla.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'bone',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 508"]
  },

  // ==========================================================================
  // 5. TEETH / DENTITION (RĂNG HÀM MẶT)
  // ==========================================================================
  {
    id: 'tooth.48',
    canonicalId: 'tooth.48',
    legacyId: 'tooth_48',
    nameVi: 'Răng khôn hàm dưới phải (R.48)',
    nameEn: 'Mandibular Right Third Molar (Tooth #48)',
    latinName: 'Dens serotinus inferior dexter',
    synonyms: ['Răng 48', 'R.48', 'Răng khôn 48', 'Răng số 8 hàm dưới phải', '48', 'tooth 48'],
    region: 'MANDIBLE',
    laterality: 'RIGHT',
    modelUrl: '/models/dental/mandibular_third_molar_48.glb',
    nodeNames: {
      right: 'MandibularThirdMolar_48',
      subNodes: ['MandibularThirdMolar_48_Crown', 'MandibularThirdMolar_48_Roots']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / University of Dundee Dental Education',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'tooth',
    reviewStatus: 'VERIFIED',
    references: ["Nelson Wheeler's Dental Anatomy, Physiology and Occlusion 11th Ed"]
  },
  {
    id: 'tooth.38',
    canonicalId: 'tooth.38',
    legacyId: 'tooth_38',
    nameVi: 'Răng khôn hàm dưới trái (R.38)',
    nameEn: 'Mandibular Left Third Molar (Tooth #38)',
    latinName: 'Dens serotinus inferior sinister',
    synonyms: ['Răng 38', 'R.38', 'Răng khôn 38', 'Răng số 8 hàm dưới trái', '38', 'tooth 38'],
    region: 'MANDIBLE',
    laterality: 'LEFT',
    modelUrl: '/models/dental/mandibular_third_molar_38.glb',
    nodeNames: {
      left: 'MandibularThirdMolar_38',
      subNodes: ['MandibularThirdMolar_38_Crown', 'MandibularThirdMolar_38_Roots']
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / University of Dundee Dental Education',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'tooth',
    reviewStatus: 'VERIFIED',
    references: ["Nelson Wheeler's Dental Anatomy 11th Ed"]
  },

  // ==========================================================================
  // 6. CANALS & FORAMINA (ỐNG & LỖ NỀN SỌ HÀM MẶT)
  // ==========================================================================
  {
    id: 'canal.mandibular',
    canonicalId: 'canal.mandibular',
    legacyId: 'mandibular_canal',
    nameVi: 'Ống hàm dưới',
    nameEn: 'Mandibular Canal',
    latinName: 'Canalis mandibulae',
    synonyms: ['Ống hàm dưới', 'Mandibular canal', 'Ống răng dưới', 'Canal'],
    region: 'MANDIBLE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      joint: 'Mandible'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'canal',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 514"]
  },
  {
    id: 'foramen.mental',
    canonicalId: 'foramen.mental',
    legacyId: 'mental_foramen',
    nameVi: 'Lỗ cằm',
    nameEn: 'Mental Foramen',
    latinName: 'Foramen mentale',
    synonyms: ['Lỗ cằm', 'Mental foramen', 'Foramen mentale'],
    region: 'MANDIBLE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      joint: 'Mandible'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'foramen',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 513"]
  },
  {
    id: 'foramen.mandibular',
    canonicalId: 'foramen.mandibular',
    legacyId: 'mandibular_foramen',
    nameVi: 'Lỗ hàm dưới & Gai Spix',
    nameEn: 'Mandibular Foramen & Lingula',
    latinName: 'Foramen mandibulae',
    synonyms: ['Lỗ hàm dưới', 'Mandibular foramen', 'Gai Spix', 'Lingula', 'Lỗ gai spix'],
    region: 'MANDIBLE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      joint: 'Mandible'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'foramen',
    reviewStatus: 'VERIFIED',
    references: ["Malamed's Local Anesthesia 7th Ed"]
  },
  {
    id: 'foramen.ovale',
    canonicalId: 'foramen.ovale',
    legacyId: 'foramen_ovale',
    nameVi: 'Lỗ bầu dục',
    nameEn: 'Foramen Ovale',
    latinName: 'Foramen ovale',
    synonyms: ['Lỗ bầu dục', 'Foramen ovale', 'Lỗ V3'],
    region: 'SKULL_BASE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      joint: 'Sphenoid'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'foramen',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 488"]
  },
  {
    id: 'foramen.rotundum',
    canonicalId: 'foramen.rotundum',
    legacyId: 'foramen_rotundum',
    nameVi: 'Lỗ tròn',
    nameEn: 'Foramen Rotundum',
    latinName: 'Foramen rotundum',
    synonyms: ['Lỗ tròn', 'Foramen rotundum', 'Lỗ V2'],
    region: 'SKULL_BASE',
    laterality: 'BILATERAL',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      joint: 'Sphenoid'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'foramen',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 488"]
  },

  // ==========================================================================
  // 7. WHOLE BODY / DEEP SPECIMEN MAJOR ORGANS (TIÊU BẢN SÂU ĐẠI CƠ QUAN)
  // ==========================================================================
  {
    id: 'body.heart',
    canonicalId: 'body.heart',
    legacyId: 'heart',
    nameVi: 'Trái tim',
    nameEn: 'Heart',
    latinName: 'Cor',
    synonyms: ['Tim', 'Heart', 'Cor', 'Trái tim'],
    region: 'THORAX',
    laterality: 'MIDLINE',
    modelUrl: '/models/heart.glb',
    nodeNames: {
      joint: 'Heart'
    },
    type: 'ANATOMICAL_MESH',
    source: 'MedAnatomy Specimen Library',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    status: 'VERIFIED',
    category: 'organ',
    reviewStatus: 'VERIFIED',
    references: ["Netter Atlas Plate 215"]
  },
  {
    id: 'body.brain',
    canonicalId: 'body.brain',
    legacyId: 'brain',
    nameVi: 'Não bộ',
    nameEn: 'Brain',
    latinName: 'Encephalon',
    synonyms: ['Bộ não', 'Brain', 'Não', 'Đại não'],
    region: 'HEAD',
    laterality: 'MIDLINE',
    modelUrl: '/models/craniofacial/brain/brain_complete.glb',
    nodeNames: {
      joint: 'Brain'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'organ',
    reviewStatus: 'VERIFIED',
    references: ["Gray's Anatomy 42nd Ed, p. 320"]
  }
,
  {
    "id": "nerve.olfactory",
    "canonicalId": "nerve.olfactory",
    "legacyId": "cn_1",
    "nameVi": "Dây thần kinh khứu giác (Dây I)",
    "nameEn": "Olfactory Nerve (CN I)",
    "latinName": "Nervus olfactorius",
    "synonyms": [
      "CN I",
      "Dây I",
      "Thần kinh khứu giác",
      "Olfactory nerve"
    ],
    "region": "HEAD",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Olfactory nerve (I).r",
      "left": "Olfactory nerve (I).l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 578"
    ]
  },
  {
    "id": "nerve.optic",
    "canonicalId": "nerve.optic",
    "legacyId": "cn_2",
    "nameVi": "Dây thần kinh thị giác (Dây II)",
    "nameEn": "Optic Nerve (CN II)",
    "latinName": "Nervus opticus",
    "synonyms": [
      "CN II",
      "Dây II",
      "Thần kinh thị giác",
      "Optic nerve"
    ],
    "region": "ORBIT",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Optic chiasm.r",
      "left": "Optic chiasm.l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 579"
    ]
  },
  {
    "id": "nerve.oculomotor",
    "canonicalId": "nerve.oculomotor",
    "legacyId": "cn_3",
    "nameVi": "Dây thần kinh vận nhãn (Dây III)",
    "nameEn": "Oculomotor Nerve (CN III)",
    "latinName": "Nervus oculomotorius",
    "synonyms": [
      "CN III",
      "Dây III",
      "Thần kinh vận nhãn",
      "Oculomotor nerve"
    ],
    "region": "ORBIT",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Accessory nucleus of oculomotor nerve.r",
      "left": "Accessory nucleus of oculomotor nerve.l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 580"
    ]
  },
  {
    "id": "nerve.trochlear",
    "canonicalId": "nerve.trochlear",
    "legacyId": "cn_4",
    "nameVi": "Dây thần kinh ròng rọc (Dây IV)",
    "nameEn": "Trochlear Nerve (CN IV)",
    "latinName": "Nervus trochlearis",
    "synonyms": [
      "CN IV",
      "Dây IV",
      "Thần kinh ròng rọc",
      "Trochlear nerve"
    ],
    "region": "ORBIT",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Trochlear nerve (IV).r",
      "left": "Trochlear nerve (IV).l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 581"
    ]
  },
  {
    "id": "nerve.trigeminal_ganglion",
    "canonicalId": "nerve.trigeminal_ganglion",
    "legacyId": "trigeminal_ganglion",
    "nameVi": "Hạch thần kinh sinh ba (Hạch Gasser)",
    "nameEn": "Trigeminal Ganglion (Gasserian Ganglion)",
    "latinName": "Ganglion trigeminale",
    "synonyms": [
      "Hạch Gasser",
      "Gasserian ganglion",
      "Hạch sinh ba",
      "Trigeminal ganglion"
    ],
    "region": "SKULL_BASE",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Sensory root of trigeminal nerve.r",
      "left": "Sensory root of trigeminal nerve.l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 583",
      "Netter Atlas Plate 45"
    ]
  },
  {
    "id": "nerve.abducens",
    "canonicalId": "nerve.abducens",
    "legacyId": "cn_6",
    "nameVi": "Dây thần kinh vận nhãn ngoài (Dây VI)",
    "nameEn": "Abducens Nerve (CN VI)",
    "latinName": "Nervus abducens",
    "synonyms": [
      "CN VI",
      "Dây VI",
      "Thần kinh vận nhãn ngoài",
      "Abducens nerve"
    ],
    "region": "ORBIT",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Abducens nerve (VI).r",
      "left": "Abducens nerve (VI).l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 589"
    ]
  },
  {
    "id": "nerve.vestibulocochlear",
    "canonicalId": "nerve.vestibulocochlear",
    "legacyId": "cn_8",
    "nameVi": "Dây thần kinh tiền đình - ốc tai (Dây VIII)",
    "nameEn": "Vestibulocochlear Nerve (CN VIII)",
    "latinName": "Nervus vestibulocochlearis",
    "synonyms": [
      "CN VIII",
      "Dây VIII",
      "Thần kinh tiền đình ốc tai",
      "Vestibulocochlear nerve"
    ],
    "region": "HEAD",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Vestibulocochlear nerve (VIII).r",
      "left": "Vestibulocochlear nerve (VIII).l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 592"
    ]
  },
  {
    "id": "nerve.vagus",
    "canonicalId": "nerve.vagus",
    "legacyId": "cn_10",
    "nameVi": "Dây thần kinh lang thang (Dây X)",
    "nameEn": "Vagus Nerve (CN X)",
    "latinName": "Nervus vagus",
    "synonyms": [
      "CN X",
      "Dây X",
      "Thần kinh phế vị",
      "Vagus nerve"
    ],
    "region": "NECK",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Vagus nerve (X).r",
      "left": "Vagus nerve (X).l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 595"
    ]
  },
  {
    "id": "nerve.accessory",
    "canonicalId": "nerve.accessory",
    "legacyId": "cn_11",
    "nameVi": "Dây thần kinh phụ (Dây XI)",
    "nameEn": "Accessory Nerve (CN XI)",
    "latinName": "Nervus accessorius",
    "synonyms": [
      "CN XI",
      "Dây XI",
      "Thần kinh phụ",
      "Accessory nerve"
    ],
    "region": "NECK",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb",
    "nodeNames": {
      "right": "Accessory visual structures.j",
      "left": "Accessory visual structures.j"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "cranial_nerve",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 597"
    ]
  },
  {
    "id": "foramen.optic_canal",
    "canonicalId": "foramen.optic_canal",
    "legacyId": "optic_canal",
    "nameVi": "Ống thị giác",
    "nameEn": "Optic Canal",
    "latinName": "Canalis opticus",
    "synonyms": [
      "Ống thị giác",
      "Optic canal",
      "Lỗ thị giác"
    ],
    "region": "ORBIT",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/skull/skull_complete.glb",
    "nodeNames": {
      "right": "Sphenoid bone",
      "left": "Sphenoid bone"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "foramen",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 482"
    ]
  },
  {
    "id": "foramen.superior_orbital_fissure",
    "canonicalId": "foramen.superior_orbital_fissure",
    "legacyId": "superior_orbital_fissure",
    "nameVi": "Khe ổ mắt trên (SOF)",
    "nameEn": "Superior Orbital Fissure (SOF)",
    "latinName": "Fissura orbitalis superior",
    "synonyms": [
      "SOF",
      "Khe ổ mắt trên",
      "Superior orbital fissure"
    ],
    "region": "ORBIT",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/skull/skull_complete.glb",
    "nodeNames": {
      "right": "Sphenoid bone",
      "left": "Sphenoid bone"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "foramen",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 483"
    ]
  },
  {
    "id": "foramen.internal_acoustic_meatus",
    "canonicalId": "foramen.internal_acoustic_meatus",
    "legacyId": "internal_acoustic_meatus",
    "nameVi": "Lỗ ống tai trong (IAM)",
    "nameEn": "Internal Acoustic Meatus (IAM)",
    "latinName": "Porus acusticus internus",
    "synonyms": [
      "IAM",
      "Lỗ ống tai trong",
      "Internal acoustic meatus"
    ],
    "region": "SKULL_BASE",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/skull/skull_complete.glb",
    "nodeNames": {
      "right": "Temporal bone.r",
      "left": "Temporal bone.l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "foramen",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 485"
    ]
  },
  {
    "id": "foramen.jugular",
    "canonicalId": "foramen.jugular",
    "legacyId": "jugular_foramen",
    "nameVi": "Lỗ tĩnh mạch cảnh",
    "nameEn": "Jugular Foramen",
    "latinName": "Foramen jugulare",
    "synonyms": [
      "Lỗ tĩnh mạch cảnh",
      "Jugular foramen"
    ],
    "region": "SKULL_BASE",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/skull/skull_complete.glb",
    "nodeNames": {
      "right": "Temporal bone.r",
      "left": "Temporal bone.l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "foramen",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 486"
    ]
  },
  {
    "id": "foramen.hypoglossal_canal",
    "canonicalId": "foramen.hypoglossal_canal",
    "legacyId": "hypoglossal_canal",
    "nameVi": "Ống thần kinh hạ thiệt",
    "nameEn": "Hypoglossal Canal",
    "latinName": "Canalis nervi hypoglossi",
    "synonyms": [
      "Ống thần kinh hạ thiệt",
      "Hypoglossal canal"
    ],
    "region": "SKULL_BASE",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/skull/skull_complete.glb",
    "nodeNames": {
      "right": "Occipital bone",
      "left": "Occipital bone"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "foramen",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 487"
    ]
  },
  {
    "id": "foramen.magnum",
    "canonicalId": "foramen.magnum",
    "legacyId": "foramen_magnum",
    "nameVi": "Lỗ lớn xương chẩm",
    "nameEn": "Foramen Magnum",
    "latinName": "Foramen magnum",
    "synonyms": [
      "Lỗ lớn",
      "Foramen magnum",
      "Lỗ lớn xương chẩm"
    ],
    "region": "SKULL_BASE",
    "laterality": "MIDLINE",
    "modelUrl": "/models/craniofacial/skull/skull_complete.glb",
    "nodeNames": {
      "joint": "Occipital bone"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "foramen",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 488"
    ]
  },
  {
    "id": "foramen.stylomastoid",
    "canonicalId": "foramen.stylomastoid",
    "legacyId": "stylomastoid_foramen",
    "nameVi": "Lỗ trâm chũm",
    "nameEn": "Stylomastoid Foramen",
    "latinName": "Foramen stylomastoideum",
    "synonyms": [
      "Lỗ trâm chũm",
      "Stylomastoid foramen"
    ],
    "region": "SKULL_BASE",
    "laterality": "BILATERAL",
    "modelUrl": "/models/craniofacial/skull/skull_complete.glb",
    "nodeNames": {
      "right": "Temporal bone.r",
      "left": "Temporal bone.l"
    },
    "type": "ANATOMICAL_MESH",
    "source": "Z-Anatomy / BodyParts3D",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "status": "VERIFIED",
    "category": "foramen",
    "reviewStatus": "VERIFIED",
    "references": [
      "Gray's Anatomy 42nd Ed, p. 487"
    ]
  }
];

// Bidirectional Dictionary: Maps canonicalId, legacyId, and all aliases to canonical entries
export const ANATOMY_ASSET_REGISTRY: Record<string, AnatomyAssetEntry> = {};

RAW_ENTRIES.forEach((entry) => {
  ANATOMY_ASSET_REGISTRY[entry.canonicalId] = entry;
  if (entry.legacyId) {
    ANATOMY_ASSET_REGISTRY[entry.legacyId] = entry;
  }
});

/**
 * Resolve any input ID (legacy, canonical, dot, underscore, or alias) to standard canonical dot notation.
 * e.g. 'nerve_ian' -> 'nerve.inferior_alveolar', 'tooth_48' -> 'tooth.48'
 */
export function resolveCanonicalId(rawId: string): string {
  if (!rawId) return '';
  const trimmed = rawId.trim();

  // Direct match in registry
  if (ANATOMY_ASSET_REGISTRY[trimmed]) {
    return ANATOMY_ASSET_REGISTRY[trimmed].canonicalId;
  }

  // Canonical mapping heuristics
  const lower = trimmed.toLowerCase();
  if (lower === 'nerve_ian' || lower === 'ian' || lower === 'nerve.inferior-alveolar') {
    return 'nerve.inferior_alveolar';
  }
  if (lower === 'nerve_lingual' || lower === 'lingual') {
    return 'nerve.lingual';
  }
  if (lower === 'nerve_mental' || lower === 'mental') {
    return 'nerve.mental';
  }
  if (lower === 'nerve_cn_v' || lower === 'cn_5' || lower === 'cn-v' || lower === 'trigeminal') {
    return 'nerve.trigeminal';
  }
  if (lower === 'nerve_v1' || lower === 'v1' || lower === 'cn_5_v1') {
    return 'nerve.v1';
  }
  if (lower === 'nerve_v2' || lower === 'v2' || lower === 'cn_5_v2') {
    return 'nerve.v2';
  }
  if (lower === 'nerve_v3' || lower === 'v3' || lower === 'cn_5_v3') {
    return 'nerve.v3';
  }
  if (lower === 'mandibular_canal' || lower === 'canal') {
    return 'canal.mandibular';
  }
  if (lower === 'mental_foramen') {
    return 'foramen.mental';
  }
  if (lower === 'mandibular_foramen') {
    return 'foramen.mandibular';
  }
  if (lower === 'foramen_ovale') {
    return 'foramen.ovale';
  }
  if (lower === 'foramen_rotundum') {
    return 'foramen.rotundum';
  }
  if (lower === 'bone_mandible' || lower === 'mandible') {
    return 'bone.mandible';
  }
  if (lower === 'bone_maxilla' || lower === 'maxilla') {
    return 'bone.maxilla';
  }
  if (lower === 'joint_tmj' || lower === 'tmj') {
    return 'joint.tmj';
  }
  if (lower.startsWith('tooth_') || lower.startsWith('tooth.')) {
    const num = lower.replace(/tooth[._]/, '');
    return 'tooth.' + num;
  }

  // Fallback: replace underscores with dots if prefixed by known category
  if (lower.includes('_')) {
    const dotCandidate = lower.replace(/_/g, '.');
    if (ANATOMY_ASSET_REGISTRY[dotCandidate]) {
      return dotCandidate;
    }
  }

  return rawId;
}

/**
 * Resolve canonical dot ID to legacy underscore ID for backward compatibility.
 * e.g. 'nerve.inferior_alveolar' -> 'nerve_ian', 'tooth.48' -> 'tooth_48'
 */
export function resolveLegacyId(canonicalId: string): string {
  if (!canonicalId) return '';
  const entry = ANATOMY_ASSET_REGISTRY[canonicalId];
  if (entry && entry.legacyId) {
    return entry.legacyId;
  }
  if (canonicalId.startsWith('tooth.')) {
    return canonicalId.replace('tooth.', 'tooth_');
  }
  return canonicalId.replace(/\./g, '_');
}

/**
 * Retrieve complete anatomical asset record by canonical or legacy ID.
 */
export function getAnatomyEntry(id: string): AnatomyAssetEntry | undefined {
  if (!id) return undefined;
  if (ANATOMY_ASSET_REGISTRY[id]) {
    return ANATOMY_ASSET_REGISTRY[id];
  }
  const canonical = resolveCanonicalId(id);
  return ANATOMY_ASSET_REGISTRY[canonical];
}

/**
 * High-performance search across names, Latin names, canonical IDs, and synonyms.
 */
export function searchAnatomyRegistry(query: string): AnatomyAssetEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matched = new Set<string>();
  const results: AnatomyAssetEntry[] = [];

  RAW_ENTRIES.forEach((entry) => {
    if (matched.has(entry.canonicalId)) return;

    const matchesCanonical = entry.canonicalId.toLowerCase().includes(q);
    const matchesVi = entry.nameVi.toLowerCase().includes(q);
    const matchesEn = entry.nameEn.toLowerCase().includes(q);
    const matchesLatin = entry.latinName ? entry.latinName.toLowerCase().includes(q) : false;
    const matchesSynonyms = entry.synonyms.some((s) => s.toLowerCase().includes(q));

    if (matchesCanonical || matchesVi || matchesEn || matchesLatin || matchesSynonyms) {
      matched.add(entry.canonicalId);
      results.push(entry);
    }
  });

  return results;
}
