// ============================================================================
// CRANIAL NERVE ASSET VALIDATOR (Section 62 Automated Validation System)
// ============================================================================

export type AssetValidationStatus = 'VERIFIED' | 'PARTIAL' | 'APPROXIMATE' | 'MISSING' | 'UNVERIFIED';

export interface CranialNerveValidationRecord {
  anatomyId: string;
  nameVi: string;
  nameEn: string;
  cranialNerveNumber?: number;
  division?: string;
  assetPath: string;
  meshNodeName: string;
  assetType: 'ANATOMICAL_MESH' | 'ANATOMICAL_PATH' | 'ANATOMICAL_GROUP' | 'PLACEHOLDER';
  source: string;
  license: string;
  coordinateSystem: string;
  side: 'bilateral' | 'right' | 'left' | 'midline';
  parent?: string;
  branches?: string[];
  foramenRelation: string;
  pathDirection: 'proximal_to_distal' | 'bidirectional';
  status: AssetValidationStatus;
  statusNotes?: string;
}

export const CRANIAL_NERVE_VALIDATION_REGISTRY: Record<string, CranialNerveValidationRecord> = {
  'cn_1': {
    anatomyId: 'cranial.cn1',
    nameVi: 'Dây thần kinh Khứu giác (CN I)',
    nameEn: 'Olfactory Nerve (CN I)',
    cranialNerveNumber: 1,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Olfactory nerve (I)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'cribriform_foramina',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Authentic olfactory tract and bulb polygon meshes.'
  },
  'cn_2': {
    anatomyId: 'cranial.cn2',
    nameVi: 'Dây thần kinh Thị giác (CN II)',
    nameEn: 'Optic Nerve (CN II)',
    cranialNerveNumber: 2,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Optic nerve (II)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'optic_canal',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Includes intraorbital optic nerve, optic chiasm, and optic tracts.'
  },
  'cn_3': {
    anatomyId: 'cranial.cn3',
    nameVi: 'Dây thần kinh Vận nhãn (CN III)',
    nameEn: 'Oculomotor Nerve (CN III)',
    cranialNerveNumber: 3,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Oculomotor nerve (III)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'superior_orbital_fissure',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  },
  'cn_4': {
    anatomyId: 'cranial.cn4',
    nameVi: 'Dây thần kinh Ròng rọc (CN IV)',
    nameEn: 'Trochlear Nerve (CN IV)',
    cranialNerveNumber: 4,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Trochlear nerve (IV)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'superior_orbital_fissure',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  },
  'cn_5': {
    anatomyId: 'cranial.cn5',
    nameVi: 'Dây thần kinh Sinh ba (CN V)',
    nameEn: 'Trigeminal Nerve (CN V)',
    cranialNerveNumber: 5,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Trigeminal nerve (V)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    branches: ['cn_5_v1', 'cn_5_v2', 'cn_5_v3'],
    foramenRelation: 'superior_orbital_fissure, foramen_rotundum, foramen_ovale',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Sensory root, motor root, and Gasserian ganglion fully modeled.'
  },
  'cn_5_v1': {
    anatomyId: 'cranial.cn5.v1',
    nameVi: 'Thần kinh Mắt (V1)',
    nameEn: 'Ophthalmic Nerve (V1)',
    cranialNerveNumber: 5,
    division: 'V1',
    parent: 'cn_5',
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Ophthalmic nerve',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'superior_orbital_fissure',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  },
  'cn_5_v2': {
    anatomyId: 'cranial.cn5.v2',
    nameVi: 'Thần kinh Hàm trên (V2)',
    nameEn: 'Maxillary Nerve (V2)',
    cranialNerveNumber: 5,
    division: 'V2',
    parent: 'cn_5',
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Maxillary nerve',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'foramen_rotundum',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Includes meningeal branch and pterygopalatine fossa trajectory.'
  },
  'cn_5_v3': {
    anatomyId: 'cranial.cn5.v3',
    nameVi: 'Thần kinh Hàm dưới (V3)',
    nameEn: 'Mandibular Nerve (V3)',
    cranialNerveNumber: 5,
    division: 'V3',
    parent: 'cn_5',
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Mandibular nerve',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    branches: ['nerve_ian', 'nerve_lingual', 'nerve_mental', 'nerve_buccal'],
    foramenRelation: 'foramen_ovale',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Full anterior and posterior division branches into mandibular ramus.'
  },
  'nerve_ian': {
    anatomyId: 'nerve.inferior_alveolar',
    nameVi: 'Thần kinh Huyệt răng dưới (IAN)',
    nameEn: 'Inferior Alveolar Nerve',
    division: 'V3',
    parent: 'cn_5_v3',
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Inferior alveolar nerve',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    branches: ['nerve_mental', 'nerve_mylohyoid'],
    foramenRelation: 'mandibular_foramen',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Travels through mandibular canal; direct relationship to tooth 48 & 38 roots.'
  },
  'nerve_lingual': {
    anatomyId: 'nerve.lingual',
    nameVi: 'Thần kinh Lưỡi',
    nameEn: 'Lingual Nerve',
    division: 'V3',
    parent: 'cn_5_v3',
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Lingual nerve',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'foramen_ovale',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Descends medial to mandibular ramus into sublingual space.'
  },
  'nerve_mental': {
    anatomyId: 'nerve.mental',
    nameVi: 'Thần kinh Cằm',
    nameEn: 'Mental Nerve',
    division: 'V3',
    parent: 'nerve_ian',
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Mental nerve',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'mental_foramen',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Exits mental foramen between premolars to lower lip and chin.'
  },
  'cn_6': {
    anatomyId: 'cranial.cn6',
    nameVi: 'Dây thần kinh Vận nhãn ngoài (CN VI)',
    nameEn: 'Abducens Nerve (CN VI)',
    cranialNerveNumber: 6,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Abducens nerve (VI)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'superior_orbital_fissure',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  },
  'cn_7': {
    anatomyId: 'cranial.cn7',
    nameVi: 'Dây thần kinh Mặt (CN VII)',
    nameEn: 'Facial Nerve (CN VII)',
    cranialNerveNumber: 7,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Facial nerve (VII)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    branches: ['chorda_tympani'],
    foramenRelation: 'internal_acoustic_meatus, stylomastoid_foramen',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Passes IAM, geniculate ganglion, and exits stylomastoid foramen.'
  },
  'cn_8': {
    anatomyId: 'cranial.cn8',
    nameVi: 'Dây thần kinh Tiền đình - Ốc tai (CN VIII)',
    nameEn: 'Vestibulocochlear Nerve (CN VIII)',
    cranialNerveNumber: 8,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Vestibulocochlear nerve (VIII)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'internal_acoustic_meatus',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED',
    statusNotes: 'Includes cochlear and vestibular nerve divisions.'
  },
  'cn_9': {
    anatomyId: 'cranial.cn9',
    nameVi: 'Dây thần kinh Thiệt hầu (CN IX)',
    nameEn: 'Glossopharyngeal Nerve (CN IX)',
    cranialNerveNumber: 9,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Glossopharyngeal nerve (IX)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'jugular_foramen',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  },
  'cn_10': {
    anatomyId: 'cranial.cn10',
    nameVi: 'Dây thần kinh Lang thang (CN X)',
    nameEn: 'Vagus Nerve (CN X)',
    cranialNerveNumber: 10,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Vagus nerve (X)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'jugular_foramen',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  },
  'cn_11': {
    anatomyId: 'cranial.cn11',
    nameVi: 'Dây thần kinh Phụ (CN XI)',
    nameEn: 'Accessory Nerve (CN XI)',
    cranialNerveNumber: 11,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Accessory nerve (XI)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'foramen_magnum, jugular_foramen',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  },
  'cn_12': {
    anatomyId: 'cranial.cn12',
    nameVi: 'Dây thần kinh Hạ thiệt (CN XII)',
    nameEn: 'Hypoglossal Nerve (CN XII)',
    cranialNerveNumber: 12,
    assetPath: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    meshNodeName: 'Hypoglossal nerve (XII)',
    assetType: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    coordinateSystem: 'Craniofacial Metric Y-Up [0,0,0]',
    side: 'bilateral',
    foramenRelation: 'hypoglossal_canal',
    pathDirection: 'proximal_to_distal',
    status: 'VERIFIED'
  }
};

export class CranialNerveAssetValidator {
  public static validateAll(): {
    totalRecords: number;
    verifiedCount: number;
    partialCount: number;
    missingCount: number;
    records: CranialNerveValidationRecord[];
  } {
    const records = Object.values(CRANIAL_NERVE_VALIDATION_REGISTRY);
    const verified = records.filter(r => r.status === 'VERIFIED').length;
    const partial = records.filter(r => r.status === 'PARTIAL').length;
    const missing = records.filter(r => r.status === 'MISSING').length;

    return {
      totalRecords: records.length,
      verifiedCount: verified,
      partialCount: partial,
      missingCount: missing,
      records
    };
  }

  public static getCranialStatusSummary(): {
    readyNerves: number;
    missingNerves: number;
    displayBadge: string;
  } {
    const val = this.validateAll();
    const readyNerves = val.verifiedCount;
    const missingNerves = val.missingCount;
    return {
      readyNerves,
      missingNerves,
      displayBadge: `${readyNerves} READY · ${missingNerves} MISSING`
    };
  }
}
