/**
 * ANATOMY ASSET REGISTRY
 * Maps clinical/anatomical structure IDs to verified external 3D GLTF meshes.
 * Strictly adheres to CC BY-SA 4.0 licensing and Z-Anatomy / BodyParts3D provenance.
 */

export type AssetType = 'ANATOMICAL_MESH' | 'PATH_ASSET' | 'COMPOSITE_SYSTEM';
export type AssetStatus = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED' | 'PLACEHOLDER' | 'MISSING';

export interface AnatomyAssetEntry {
  id: string;
  nameVi: string;
  nameEn: string;
  latinName?: string;
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
  category: 'cranial_nerve' | 'muscle' | 'joint' | 'bone' | 'vessel' | 'tooth';
}

export const ANATOMY_ASSET_REGISTRY: Record<string, AnatomyAssetEntry> = {
  // ==========================================================================
  // 1. CRANIAL NERVES (HỆ THẦN KINH SỌ - DÂY V, VII, II...)
  // ==========================================================================
  'nerve_cn_v': {
    id: 'nerve_cn_v',
    nameVi: 'Dây thần kinh sinh ba (Dây V)',
    nameEn: 'Trigeminal Nerve (CN V)',
    latinName: 'Nervus trigeminus',
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
    category: 'cranial_nerve'
  },
  'nerve_v1': {
    id: 'nerve_v1',
    nameVi: 'Thần kinh mắt (V1)',
    nameEn: 'Ophthalmic Nerve (V1)',
    latinName: 'Nervus ophthalmicus',
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
    category: 'cranial_nerve'
  },
  'nerve_v2': {
    id: 'nerve_v2',
    nameVi: 'Thần kinh hàm trên (V2)',
    nameEn: 'Maxillary Nerve (V2)',
    latinName: 'Nervus maxillaris',
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
    category: 'cranial_nerve'
  },
  'nerve_v3': {
    id: 'nerve_v3',
    nameVi: 'Thần kinh hàm dưới (V3)',
    nameEn: 'Mandibular Nerve (V3)',
    latinName: 'Nervus mandibularis',
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
    category: 'cranial_nerve'
  },
  'nerve_ian': {
    id: 'nerve_ian',
    nameVi: 'Thần kinh huyệt răng dưới (IAN)',
    nameEn: 'Inferior Alveolar Nerve',
    latinName: 'Nervus alveolaris inferior',
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
    category: 'cranial_nerve'
  },
  'nerve_lingual': {
    id: 'nerve_lingual',
    nameVi: 'Thần kinh lưỡi',
    nameEn: 'Lingual Nerve',
    latinName: 'Nervus lingualis',
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
    category: 'cranial_nerve'
  },
  'nerve_mental': {
    id: 'nerve_mental',
    nameVi: 'Thần kinh cằm',
    nameEn: 'Mental Nerve',
    latinName: 'Nervus mentalis',
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
    category: 'cranial_nerve'
  },
  'nerve_buccal': {
    id: 'nerve_buccal',
    nameVi: 'Thần kinh má',
    nameEn: 'Buccal Nerve',
    latinName: 'Nervus buccalis',
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
    category: 'cranial_nerve'
  },
  'nerve_mylohyoid': {
    id: 'nerve_mylohyoid',
    nameVi: 'Thần kinh hàm móng',
    nameEn: 'Nerve to Mylohyoid',
    latinName: 'Nervus mylohyoideus',
    modelUrl: '/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    nodeNames: {
      right: 'Nerve to mylohyoid muscle.r',
      left: 'Nerve to mylohyoid muscle.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'cranial_nerve'
  },
  'nerve_facial_cn_vii': {
    id: 'nerve_facial_cn_vii',
    nameVi: 'Thần kinh mặt (Dây VII)',
    nameEn: 'Facial Nerve (CN VII)',
    latinName: 'Nervus facialis',
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
    category: 'cranial_nerve'
  },

  // ==========================================================================
  // 2. MASTICATORY MUSCLES (HỆ CƠ CẮN)
  // ==========================================================================
  'muscle_masseter': {
    id: 'muscle_masseter',
    nameVi: 'Cơ cắn (Masseter)',
    nameEn: 'Masseter Muscle',
    latinName: 'Musculus masseter',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Superficial part of masseter.r',
      left: 'Superficial part of masseter.l',
      subNodes: [
        'Deep part of masseter.r',
        'Deep part of masseter.l',
        'Masseteric fascia.r',
        'Masseteric fascia.l'
      ]
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle'
  },
  'muscle_temporalis': {
    id: 'muscle_temporalis',
    nameVi: 'Cơ thái dương (Temporalis)',
    nameEn: 'Temporalis Muscle',
    latinName: 'Musculus temporalis',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Temporalis muscle.r',
      left: 'Temporalis muscle.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle'
  },
  'muscle_lateral_pterygoid': {
    id: 'muscle_lateral_pterygoid',
    nameVi: 'Cơ chân bướm ngoài',
    nameEn: 'Lateral Pterygoid Muscle',
    latinName: 'Musculus pterygoideus lateralis',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Superior head of lateral pterygoid muscle.r',
      left: 'Superior head of lateral pterygoid muscle.l',
      subNodes: [
        'Inferior head of lateral pterygoid muscle.r',
        'Inferior head of lateral pterygoid muscle.l'
      ]
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle'
  },
  'muscle_medial_pterygoid': {
    id: 'muscle_medial_pterygoid',
    nameVi: 'Cơ chân bướm trong',
    nameEn: 'Medial Pterygoid Muscle',
    latinName: 'Musculus pterygoideus medialis',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Medial pterygoid muscle.r',
      left: 'Medial pterygoid muscle.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle'
  },
  'muscle_buccinator': {
    id: 'muscle_buccinator',
    nameVi: 'Cơ mút (Buccinator)',
    nameEn: 'Buccinator Muscle',
    latinName: 'Musculus buccinator',
    modelUrl: '/models/craniofacial/muscles/masticatory_muscles.glb',
    nodeNames: {
      right: 'Bucinator.r',
      left: 'Bucinator.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'muscle'
  },

  // ==========================================================================
  // 3. TMJ COMPLEX & LIGAMENTS (KHỚP THÁI DƯƠNG HÀM)
  // ==========================================================================
  'joint_tmj': {
    id: 'joint_tmj',
    nameVi: 'Khớp thái dương hàm (TMJ)',
    nameEn: 'Temporomandibular Joint',
    latinName: 'Articulatio temporomandibularis',
    modelUrl: '/models/craniofacial/tmj/tmj_complex.glb',
    nodeNames: {
      right: 'Articular disc of temporomandibular joint.r',
      left: 'Articular disc of temporomandibular joint.l',
      subNodes: [
        'Lateral temporomandibular ligament.r',
        'Lateral temporomandibular ligament.l',
        'Sphenomandibular ligament.r',
        'Sphenomandibular ligament.l',
        'Stylomandibular ligament.r',
        'Stylomandibular ligament.l',
        'Articular capsule of temporomandibular joint.r',
        'Articular capsule of temporomandibular joint.l'
      ]
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'joint'
  },
  'tmj_disc': {
    id: 'tmj_disc',
    nameVi: 'Đĩa khớp thái dương hàm',
    nameEn: 'Articular Disc of TMJ',
    latinName: 'Discus articularis articulationis temporomandibularis',
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
    category: 'joint'
  },
  'tmj_capsule': {
    id: 'tmj_capsule',
    nameVi: 'Bao khớp thái dương hàm',
    nameEn: 'Articular Capsule of TMJ',
    latinName: 'Capsula articularis articulationis temporomandibularis',
    modelUrl: '/models/craniofacial/tmj/tmj_complex.glb',
    nodeNames: {
      right: 'Articular capsule of temporomandibular joint.r',
      left: 'Articular capsule of temporomandibular joint.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'joint'
  },
  'tmj_lateral_ligament': {
    id: 'tmj_lateral_ligament',
    nameVi: 'Dây chằng thái dương hàm ngoài',
    nameEn: 'Lateral Temporomandibular Ligament',
    latinName: 'Ligamentum laterale',
    modelUrl: '/models/craniofacial/tmj/tmj_complex.glb',
    nodeNames: {
      right: 'Lateral temporomandibular ligament.r',
      left: 'Lateral temporomandibular ligament.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'joint'
  },
  'tmj_sphenomandibular': {
    id: 'tmj_sphenomandibular',
    nameVi: 'Dây chằng bướm - hàm',
    nameEn: 'Sphenomandibular Ligament',
    latinName: 'Ligamentum sphenomandibulare',
    modelUrl: '/models/craniofacial/tmj/tmj_complex.glb',
    nodeNames: {
      right: 'Sphenomandibular ligament.r',
      left: 'Sphenomandibular ligament.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'joint'
  },
  'tmj_stylomandibular': {
    id: 'tmj_stylomandibular',
    nameVi: 'Dây chằng trâm - hàm',
    nameEn: 'Stylomandibular Ligament',
    latinName: 'Ligamentum stylomandibulare',
    modelUrl: '/models/craniofacial/tmj/tmj_complex.glb',
    nodeNames: {
      right: 'Stylomandibular ligament.r',
      left: 'Stylomandibular ligament.l'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'joint'
  },

  // ==========================================================================
  // 4. BONES & DENTITION (XƯƠNG SỌ MẶT & RĂNG)
  // ==========================================================================
  'bone_mandible': {
    id: 'bone_mandible',
    nameVi: 'Xương hàm dưới',
    nameEn: 'Mandible',
    latinName: 'Mandibula',
    modelUrl: '/models/craniofacial/skull/skull_complete.glb',
    nodeNames: {
      joint: 'Mandible'
    },
    type: 'ANATOMICAL_MESH',
    source: 'Z-Anatomy / BodyParts3D',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    status: 'VERIFIED',
    category: 'bone'
  },
  'bone_maxilla': {
    id: 'bone_maxilla',
    nameVi: 'Xương hàm trên',
    nameEn: 'Maxilla',
    latinName: 'Maxilla',
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
    category: 'bone'
  }
};
