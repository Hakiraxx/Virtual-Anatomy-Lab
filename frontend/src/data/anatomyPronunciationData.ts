// ============================================================================
// MEDANATOMY 3D — ANATOMICAL PRONUNCIATION & IPA REGISTRY
// Standardized academic English pronunciation with verified IPA transcriptions
// Sources: Cambridge Advanced Learner's Dictionary, Oxford Medical Dictionary,
// Terminologia Anatomica (TA2), Dorland's Illustrated Medical Dictionary.
// ============================================================================

export type AnatomicalTermCategory =
  | 'ORGAN'
  | 'SUBSTRUCTURE'
  | 'VESSEL'
  | 'NERVE'
  | 'MUSCLE'
  | 'BONE'
  | 'LANDMARK'
  | 'TOOTH'
  | 'JOINT'
  | 'LIGAMENT'
  | 'CLINICAL_TERM'
  | 'GENERAL_MEDICAL_TERM';

export interface PronunciationRecord {
  id: string;
  englishName: string;
  ipa: string; // International Phonetic Alphabet
  audioUrl?: string; // Optional direct audio URL
  accent: 'US' | 'UK' | 'General';
  academicSource: string;
  latinName?: string;
  latinSynonyms?: string[];
  category?: AnatomicalTermCategory | string;
  substructureOf?: string;
}

export const ANATOMY_PRONUNCIATION_DATABASE: Record<string, PronunciationRecord> = {
  // --- CORE ORGANS & VISCERA ---
  heart: {
    id: 'heart',
    englishName: 'Heart',
    ipa: '/hɑːrt/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  liver: {
    id: 'liver',
    englishName: 'Liver',
    ipa: '/ˈlɪv.ər/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  lungs: {
    id: 'lungs',
    englishName: 'Lungs',
    ipa: '/lʌŋz/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  lung: {
    id: 'lung',
    englishName: 'Lung',
    ipa: '/lʌŋ/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  left_lung: {
    id: 'left_lung',
    englishName: 'Left Lung',
    ipa: '/left lʌŋ/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  right_lung: {
    id: 'right_lung',
    englishName: 'Right Lung',
    ipa: '/raɪt lʌŋ/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  kidneys: {
    id: 'kidneys',
    englishName: 'Kidneys',
    ipa: '/ˈkɪd.niz/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  kidney: {
    id: 'kidney',
    englishName: 'Kidney',
    ipa: '/ˈkɪd.ni/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  left_kidney: {
    id: 'left_kidney',
    englishName: 'Left Kidney',
    ipa: '/left ˈkɪd.ni/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  right_kidney: {
    id: 'right_kidney',
    englishName: 'Right Kidney',
    ipa: '/raɪt ˈkɪd.ni/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  brain: {
    id: 'brain',
    englishName: 'Brain',
    ipa: '/breɪn/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  stomach: {
    id: 'stomach',
    englishName: 'Stomach',
    ipa: '/ˈstʌm.ək/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  spleen: {
    id: 'spleen',
    englishName: 'Spleen',
    ipa: '/spliːn/',
    latinName: 'Lien',
    latinSynonyms: ['Splen'],
    category: 'ORGAN',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  pancreas: {
    id: 'pancreas',
    englishName: 'Pancreas',
    ipa: '/ˈpæŋ.kri.əs/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  gallbladder: {
    id: 'gallbladder',
    englishName: 'Gallbladder',
    ipa: '/ˈɡɔːlˌblæd.ər/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  bladder: {
    id: 'bladder',
    englishName: 'Urinary Bladder',
    ipa: '/ˈblæd.ər/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  thyroid: {
    id: 'thyroid',
    englishName: 'Thyroid Gland',
    ipa: '/ˈθaɪ.rɔɪd ɡlænd/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  small_intestine: {
    id: 'small_intestine',
    englishName: 'Small Intestine',
    ipa: '/smɔːl ɪnˈtes.tɪn/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  large_intestine: {
    id: 'large_intestine',
    englishName: 'Large Intestine',
    ipa: '/lɑːrdʒ ɪnˈtes.tɪn/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  colon: {
    id: 'colon',
    englishName: 'Colon',
    ipa: '/ˈkoʊ.lɑːn/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  diaphragm: {
    id: 'diaphragm',
    englishName: 'Diaphragm',
    ipa: '/ˈdaɪ.ə.fræm/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  esophagus: {
    id: 'esophagus',
    englishName: 'Esophagus',
    ipa: '/ɪˈsɑː.fə.ɡəs/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  trachea: {
    id: 'trachea',
    englishName: 'Trachea',
    ipa: '/trəˈkiː.ə/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  larynx: {
    id: 'larynx',
    englishName: 'Larynx',
    ipa: '/ˈlær.ɪŋks/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  pharynx: {
    id: 'pharynx',
    englishName: 'Pharynx',
    ipa: '/ˈfær.ɪŋks/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },

  // --- SKELETAL SYSTEM & CRANIUM ---
  skeleton: {
    id: 'skeleton',
    englishName: 'Skeleton',
    ipa: '/ˈskel.ɪ.tən/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  human_skeleton: {
    id: 'human_skeleton',
    englishName: 'Human Skeleton',
    ipa: '/ˈhjuː.mən ˈskel.ɪ.tən/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  skull: {
    id: 'skull',
    englishName: 'Skull',
    ipa: '/skʌl/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  mandible: {
    id: 'mandible',
    englishName: 'Mandible',
    ipa: '/ˈmæn.dɪ.bəl/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  maxilla: {
    id: 'maxilla',
    englishName: 'Maxilla',
    ipa: '/mækˈsɪl.ə/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  femur: {
    id: 'femur',
    englishName: 'Femur',
    ipa: '/ˈfiː.mər/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  humerus: {
    id: 'humerus',
    englishName: 'Humerus',
    ipa: '/ˈhjuː.mər.əs/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  tibia: {
    id: 'tibia',
    englishName: 'Tibia',
    ipa: '/ˈtɪb.i.ə/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  fibula: {
    id: 'fibula',
    englishName: 'Fibula',
    ipa: '/ˈfɪb.jə.lə/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  radius: {
    id: 'radius',
    englishName: 'Radius',
    ipa: '/ˈreɪ.di.əs/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  ulna: {
    id: 'ulna',
    englishName: 'Ulna',
    ipa: '/ˈʌl.nə/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  clavicle: {
    id: 'clavicle',
    englishName: 'Clavicle',
    ipa: '/ˈklæv.ɪ.kəl/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  scapula: {
    id: 'scapula',
    englishName: 'Scapula',
    ipa: '/ˈskæp.jə.lə/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  sternum: {
    id: 'sternum',
    englishName: 'Sternum',
    ipa: '/ˈstɜːr.nəm/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  rib_cage: {
    id: 'rib_cage',
    englishName: 'Rib Cage',
    ipa: '/rɪb keɪdʒ/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  spine: {
    id: 'spine',
    englishName: 'Spine',
    ipa: '/spaɪn/',
    accent: 'US',
    academicSource: "Cambridge English & Dorland's Medical Dictionary"
  },
  vertebral_column: {
    id: 'vertebral_column',
    englishName: 'Vertebral Column',
    ipa: '/ˌvɜːr.tə.brəl ˈkɑː.ləm/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  pelvis: {
    id: 'pelvis',
    englishName: 'Pelvis',
    ipa: '/ˈpel.vɪs/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  patella: {
    id: 'patella',
    englishName: 'Patella',
    ipa: '/pəˈtel.ə/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },

  // --- CRANIOFACIAL & DENTAL NERVES (RHM PRIORITY) ---
  trigeminal_nerve: {
    id: 'trigeminal_nerve',
    englishName: 'Trigeminal Nerve',
    ipa: '/traɪˈdʒem.ɪ.nəl nɜːrv/',
    latinName: 'Nervus trigeminus',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  cn_5: {
    id: 'cn_5',
    englishName: 'Trigeminal Nerve (CN V)',
    ipa: '/traɪˈdʒem.ɪ.nəl nɜːrv/',
    latinName: 'Nervus trigeminus',
    latinSynonyms: ['Nervus trigeminus [V]'],
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  cn_v1: {
    id: 'cn_v1',
    englishName: 'Ophthalmic Nerve (V1)',
    ipa: '/ɒfˈθæl.mɪk nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  cn_v2: {
    id: 'cn_v2',
    englishName: 'Maxillary Nerve (V2)',
    ipa: '/mækˈsɪl.ər.i nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  cn_v3: {
    id: 'cn_v3',
    englishName: 'Mandibular Nerve (V3)',
    ipa: '/mænˈdɪb.jə.lər nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  ophthalmic_nerve: {
    id: 'ophthalmic_nerve',
    englishName: 'Ophthalmic Nerve',
    ipa: '/ɒfˈθæl.mɪk nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  maxillary_nerve: {
    id: 'maxillary_nerve',
    englishName: 'Maxillary Nerve',
    ipa: '/mækˈsɪl.ər.i nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  mandibular_nerve: {
    id: 'mandibular_nerve',
    englishName: 'Mandibular Nerve',
    ipa: '/mænˈdɪb.jə.lər nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  inferior_alveolar_nerve: {
    id: 'inferior_alveolar_nerve',
    englishName: 'Inferior Alveolar Nerve',
    ipa: '/ɪnˈfɪr.i.ər ælˈviː.ə.lər nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  nerve_inferior_alveolar: {
    id: 'nerve_inferior_alveolar',
    englishName: 'Inferior Alveolar Nerve',
    ipa: '/ɪnˈfɪr.i.ər ælˈviː.ə.lər nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  lingual_nerve: {
    id: 'lingual_nerve',
    englishName: 'Lingual Nerve',
    ipa: '/ˈlɪŋ.ɡwəl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  nerve_lingual: {
    id: 'nerve_lingual',
    englishName: 'Lingual Nerve',
    ipa: '/ˈlɪŋ.ɡwəl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  mental_nerve: {
    id: 'mental_nerve',
    englishName: 'Mental Nerve',
    ipa: '/ˈmen.təl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  nerve_mental: {
    id: 'nerve_mental',
    englishName: 'Mental Nerve',
    ipa: '/ˈmen.təl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  buccal_nerve: {
    id: 'buccal_nerve',
    englishName: 'Long Buccal Nerve',
    ipa: '/ˈbʌk.əl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  nerve_buccal: {
    id: 'nerve_buccal',
    englishName: 'Long Buccal Nerve',
    ipa: '/ˈbʌk.əl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  mylohyoid_nerve: {
    id: 'mylohyoid_nerve',
    englishName: 'Mylohyoid Nerve',
    ipa: '/ˌmaɪ.loʊˈhaɪ.ɔɪd nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  auriculotemporal_nerve: {
    id: 'auriculotemporal_nerve',
    englishName: 'Auriculotemporal Nerve',
    ipa: '/ɔːˌrɪk.jʊ.loʊˈtem.pə.rəl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  facial_nerve: {
    id: 'facial_nerve',
    englishName: 'Facial Nerve (CN VII)',
    ipa: '/ˈfeɪ.ʃəl nɜːrv/',
    latinName: 'Nervus facialis',
    latinSynonyms: ['Nervus facialis [VII]'],
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  cn_7: {
    id: 'cn_7',
    englishName: 'Facial Nerve (CN VII)',
    ipa: '/ˈfeɪ.ʃəl nɜːrv/',
    latinName: 'Nervus facialis',
    latinSynonyms: ['Nervus facialis [VII]'],
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  infraorbital_nerve: {
    id: 'infraorbital_nerve',
    englishName: 'Infraorbital Nerve',
    ipa: '/ˌɪn.frəˈɔːr.bɪ.təl nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  greater_palatine_nerve: {
    id: 'greater_palatine_nerve',
    englishName: 'Greater Palatine Nerve',
    ipa: '/ˌɡreɪ.tər ˈpæl.ə.taɪn nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  nasopalatine_nerve: {
    id: 'nasopalatine_nerve',
    englishName: 'Nasopalatine Nerve',
    ipa: '/ˌneɪ.zoʊˈpæl.ə.taɪn nɜːrv/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },

  // --- CRANIAL FORAMINA, CANALS & TMJ (RHM PRIORITY) ---
  temporomandibular_joint: {
    id: 'temporomandibular_joint',
    englishName: 'Temporomandibular Joint (TMJ)',
    ipa: '/ˌtem.pə.roʊ.mænˈdɪb.jə.lər dʒɔɪnt/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  tmj: {
    id: 'tmj',
    englishName: 'Temporomandibular Joint',
    ipa: '/ˌtem.pə.roʊ.mænˈdɪb.jə.lər dʒɔɪnt/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  mandibular_canal: {
    id: 'mandibular_canal',
    englishName: 'Mandibular Canal',
    ipa: '/mænˈdɪb.jə.lər kəˈnæl/',
    accent: 'US',
    academicSource: "Oxford Medical Dictionary & Gray's Anatomy"
  },
  mental_foramen: {
    id: 'mental_foramen',
    englishName: 'Mental Foramen',
    ipa: '/ˈmen.təl fəˈreɪ.mən/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  foramen_mental: {
    id: 'foramen_mental',
    englishName: 'Mental Foramen',
    ipa: '/ˈmen.təl fəˈreɪ.mən/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  infraorbital_foramen: {
    id: 'infraorbital_foramen',
    englishName: 'Infraorbital Foramen',
    ipa: '/ˌɪn.frəˈɔːr.bɪ.təl fəˈreɪ.mən/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  foramen_infraorbital: {
    id: 'foramen_infraorbital',
    englishName: 'Infraorbital Foramen',
    ipa: '/ˌɪn.frəˈɔːr.bɪ.təl fəˈreɪ.mən/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  foramen_ovale: {
    id: 'foramen_ovale',
    englishName: 'Foramen Ovale',
    ipa: '/fəˈreɪ.mən oʊˈveɪ.li/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  foramen_rotundum: {
    id: 'foramen_rotundum',
    englishName: 'Foramen Rotundum',
    ipa: '/fəˈreɪ.mən roʊˈtʌn.dəm/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  foramen_mandibular: {
    id: 'foramen_mandibular',
    englishName: 'Mandibular Foramen',
    ipa: '/mænˈdɪb.jə.lər fəˈreɪ.mən/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  mandibular_foramen: {
    id: 'mandibular_foramen',
    englishName: 'Mandibular Foramen',
    ipa: '/mænˈdɪb.jə.lər fəˈreɪ.mən/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  incisive_foramen: {
    id: 'incisive_foramen',
    englishName: 'Incisive Foramen',
    ipa: '/ɪnˈsaɪ.sɪv fəˈreɪ.mən/',
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },

  // --- DENTAL STRUCTURES & TOOTH HISTOLOGY ---
  tooth: {
    id: 'tooth',
    englishName: 'Tooth',
    ipa: '/tuːθ/',
    accent: 'US',
    academicSource: "Cambridge English & Oxford Medical"
  },
  teeth: {
    id: 'teeth',
    englishName: 'Teeth',
    ipa: '/tiːθ/',
    accent: 'US',
    academicSource: "Cambridge English & Oxford Medical"
  },
  enamel: {
    id: 'enamel',
    englishName: 'Enamel',
    ipa: '/ɪˈnæm.əl/',
    accent: 'US',
    academicSource: "Dorland's & Wheeler's Dental Anatomy"
  },
  dentin: {
    id: 'dentin',
    englishName: 'Dentin',
    ipa: '/ˈden.tɪn/',
    accent: 'US',
    academicSource: "Dorland's & Wheeler's Dental Anatomy"
  },
  pulp: {
    id: 'pulp',
    englishName: 'Dental Pulp',
    ipa: '/pʌlp/',
    accent: 'US',
    academicSource: "Dorland's & Wheeler's Dental Anatomy"
  },
  dental_pulp: {
    id: 'dental_pulp',
    englishName: 'Dental Pulp',
    ipa: '/ˈden.təl pʌlp/',
    accent: 'US',
    academicSource: "Dorland's & Wheeler's Dental Anatomy"
  },
  root_canal: {
    id: 'root_canal',
    englishName: 'Root Canal',
    ipa: '/ruːt kəˈnæl/',
    accent: 'US',
    academicSource: "Dorland's & Wheeler's Dental Anatomy"
  },
  periodontal_ligament: {
    id: 'periodontal_ligament',
    englishName: 'Periodontal Ligament (PDL)',
    ipa: '/ˌper.i.oʊˈdɑːn.təl ˈlɪɡ.ə.mənt/',
    latinName: 'Ligamentum periodontale',
    latinSynonyms: ['PDL', 'Periodontium', 'Desmodontium'],
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy & Lindhe Periodontology"
  },
  alveolar_bone: {
    id: 'alveolar_bone',
    englishName: 'Alveolar Bone',
    ipa: '/ælˈviː.ə.lər boʊn/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  gingiva: {
    id: 'gingiva',
    englishName: 'Gingiva (Gum)',
    ipa: '/ˈdʒɪn.dʒɪ.və/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },

  // --- DENTAL TOOTH CLASSES ---
  central_incisor: {
    id: 'central_incisor',
    englishName: 'Central Incisor',
    ipa: '/ˈsen.trəl ɪnˈsaɪ.zər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  lateral_incisor: {
    id: 'lateral_incisor',
    englishName: 'Lateral Incisor',
    ipa: '/ˈlæt.ər.əl ɪnˈsaɪ.zər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  canine: {
    id: 'canine',
    englishName: 'Canine',
    ipa: '/ˈkeɪ.naɪn/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  first_premolar: {
    id: 'first_premolar',
    englishName: 'First Premolar',
    ipa: '/fɜːrst ˌpriːˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  second_premolar: {
    id: 'second_premolar',
    englishName: 'Second Premolar',
    ipa: '/ˈsek.ənd ˌpriːˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  first_molar: {
    id: 'first_molar',
    englishName: 'First Molar',
    ipa: '/fɜːrst ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  second_molar: {
    id: 'second_molar',
    englishName: 'Second Molar',
    ipa: '/ˈsek.ənd ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  third_molar: {
    id: 'third_molar',
    englishName: 'Third Molar (Wisdom Tooth)',
    ipa: '/θɜːrd ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },
  wisdom_tooth: {
    id: 'wisdom_tooth',
    englishName: 'Wisdom Tooth',
    ipa: '/ˈwɪz.dəm tuːθ/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy"
  },

  // --- KEY GOLDEN TEETH ---
  'tooth.11': {
    id: 'tooth.11',
    englishName: 'Maxillary Right Central Incisor',
    ipa: '/mækˈsɪl.ər.i raɪt ˈsen.trəl ɪnˈsaɪ.zər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.21': {
    id: 'tooth.21',
    englishName: 'Maxillary Left Central Incisor',
    ipa: '/mækˈsɪl.ər.i left ˈsen.trəl ɪnˈsaɪ.zər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.16': {
    id: 'tooth.16',
    englishName: 'Maxillary Right First Molar',
    ipa: '/mækˈsɪl.ər.i raɪt fɜːrst ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.26': {
    id: 'tooth.26',
    englishName: 'Maxillary Left First Molar',
    ipa: '/mækˈsɪl.ər.i left fɜːrst ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.31': {
    id: 'tooth.31',
    englishName: 'Mandibular Left Central Incisor',
    ipa: '/mænˈdɪb.jə.lər left ˈsen.trəl ɪnˈsaɪ.zər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.41': {
    id: 'tooth.41',
    englishName: 'Mandibular Right Central Incisor',
    ipa: '/mænˈdɪb.jə.lər raɪt ˈsen.trəl ɪnˈsaɪ.zər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.36': {
    id: 'tooth.36',
    englishName: 'Mandibular Left First Molar',
    ipa: '/mænˈdɪb.jə.lər left fɜːrst ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.46': {
    id: 'tooth.46',
    englishName: 'Mandibular Right First Molar',
    ipa: '/mænˈdɪb.jə.lər raɪt fɜːrst ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.38': {
    id: 'tooth.38',
    englishName: 'Mandibular Left Third Molar',
    ipa: '/mænˈdɪb.jə.lər left θɜːrd ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },
  'tooth.48': {
    id: 'tooth.48',
    englishName: 'Mandibular Right Third Molar',
    ipa: '/mænˈdɪb.jə.lər raɪt θɜːrd ˈmoʊ.lər/',
    accent: 'US',
    academicSource: "Wheeler's Dental Anatomy & FDI World Dental Federation"
  },

  // --- MASTICATORY MUSCLES ---
  masseter: {
    id: 'masseter',
    englishName: 'Masseter Muscle',
    ipa: '/məˈsiː.tər ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },
  muscle_masseter: {
    id: 'muscle_masseter',
    englishName: 'Masseter Muscle',
    ipa: '/məˈsiː.tər ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },
  temporalis: {
    id: 'temporalis',
    englishName: 'Temporalis Muscle',
    ipa: '/ˌtem.pəˈreɪ.lɪs ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },
  muscle_temporalis: {
    id: 'muscle_temporalis',
    englishName: 'Temporalis Muscle',
    ipa: '/ˌtem.pəˈreɪ.lɪs ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },
  medial_pterygoid: {
    id: 'medial_pterygoid',
    englishName: 'Medial Pterygoid Muscle',
    ipa: '/ˈmiː.di.əl ˈter.ɪ.ɡɔɪd ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },
  muscle_medial_pterygoid: {
    id: 'muscle_medial_pterygoid',
    englishName: 'Medial Pterygoid Muscle',
    ipa: '/ˈmiː.di.əl ˈter.ɪ.ɡɔɪd ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },
  lateral_pterygoid: {
    id: 'lateral_pterygoid',
    englishName: 'Lateral Pterygoid Muscle',
    ipa: '/ˈlæt.ər.əl ˈter.ɪ.ɡɔɪd ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },
  muscle_lateral_pterygoid: {
    id: 'muscle_lateral_pterygoid',
    englishName: 'Lateral Pterygoid Muscle',
    ipa: '/ˈlæt.ər.əl ˈter.ɪ.ɡɔɪd ˈmʌs.əl/',
    accent: 'US',
    academicSource: "Gray's Anatomy & Netter Head and Neck"
  },

  // --- MAJOR VASCULAR STRUCTURES ---
  aorta: {
    id: 'aorta',
    englishName: 'Aorta',
    ipa: '/eɪˈɔːr.tə/',
    accent: 'US',
    academicSource: "Dorland's Medical Dictionary & Gray's Anatomy"
  },
  vena_cava: {
    id: 'vena_cava',
    englishName: 'Vena Cava',
    ipa: '/ˌviː.nə ˈkeɪ.və/',
    accent: 'US',
    academicSource: "Dorland's Medical Dictionary & Gray's Anatomy"
  },
  carotid_artery: {
    id: 'carotid_artery',
    englishName: 'Carotid Artery',
    ipa: '/kəˈrɑː.tɪd ˈɑːr.tər.i/',
    accent: 'US',
    academicSource: "Dorland's Medical Dictionary & Gray's Anatomy"
  },
  maxillary_artery: {
    id: 'maxillary_artery',
    englishName: 'Maxillary Artery',
    ipa: '/mækˈsɪl.ər.i ˈɑːr.tər.i/',
    accent: 'US',
    academicSource: "Dorland's Medical Dictionary & Gray's Anatomy"
  },
  facial_artery: {
    id: 'facial_artery',
    englishName: 'Facial Artery',
    ipa: '/ˈfeɪ.ʃəl ˈɑːr.tər.i/',
    latinName: 'Arteria facialis',
    accent: 'US',
    category: 'VESSEL',
    academicSource: "Dorland's Medical Dictionary & Gray's Anatomy"
  },

  // --- SPLEEN & LYMPHATIC SYSTEM ---
  spleen_hilum: {
    id: 'spleen_hilum',
    englishName: 'Splenic Hilum',
    ipa: '/ˈsplen.ɪk ˈhaɪ.ləm/',
    latinName: 'Hilum splenicum',
    latinSynonyms: ['Hilum lienis', 'Porta lienis', 'Hilum of spleen'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Terminologia Anatomica (TA2 3381) & Gray's Anatomy"
  },
  hilum_splenicum: {
    id: 'hilum_splenicum',
    englishName: 'Splenic Hilum',
    ipa: '/ˈsplen.ɪk ˈhaɪ.ləm/',
    latinName: 'Hilum splenicum',
    latinSynonyms: ['Hilum lienis'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Terminologia Anatomica (TA2 3381) & Gray's Anatomy"
  },
  hilum: {
    id: 'hilum',
    englishName: 'Hilum',
    ipa: '/ˈhaɪ.ləm/',
    latinName: 'Hilum',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Cambridge English & Dorland's Illustrated Medical Dictionary"
  },
  splenic_artery: {
    id: 'splenic_artery',
    englishName: 'Splenic Artery',
    ipa: '/ˈsplen.ɪk ˈɑːr.tər.i/',
    latinName: 'Arteria splenica',
    latinSynonyms: ['Arteria lienalis'],
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'spleen',
    academicSource: "Terminologia Anatomica (TA2 4118) & Netter Anatomy"
  },
  arteria_splenica: {
    id: 'arteria_splenica',
    englishName: 'Splenic Artery',
    ipa: '/ˈsplen.ɪk ˈɑːr.tər.i/',
    latinName: 'Arteria splenica',
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'spleen',
    academicSource: "Terminologia Anatomica (TA2 4118)"
  },
  splenic_vein: {
    id: 'splenic_vein',
    englishName: 'Splenic Vein',
    ipa: '/ˈsplen.ɪk veɪn/',
    latinName: 'Vena splenica',
    latinSynonyms: ['Vena lienalis'],
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'spleen',
    academicSource: "Terminologia Anatomica (TA2 4492) & Netter Anatomy"
  },
  vena_splenica: {
    id: 'vena_splenica',
    englishName: 'Splenic Vein',
    ipa: '/ˈsplen.ɪk veɪn/',
    latinName: 'Vena splenica',
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'spleen',
    academicSource: "Terminologia Anatomica (TA2 4492)"
  },
  splenorenal_ligament: {
    id: 'splenorenal_ligament',
    englishName: 'Splenorenal Ligament',
    ipa: '/ˌsplen.oʊˈriː.nəl ˈlɪɡ.ə.mənt/',
    latinName: 'Ligamentum splenorenale',
    latinSynonyms: ['Ligamentum lienorenale', 'Lienorenal ligament'],
    accent: 'US',
    category: 'LIGAMENT',
    substructureOf: 'spleen',
    academicSource: "Gray's Anatomy & Terminologia Anatomica"
  },
  gastrosplenic_ligament: {
    id: 'gastrosplenic_ligament',
    englishName: 'Gastrosplenic Ligament',
    ipa: '/ˌɡæs.troʊˈsplen.ɪk ˈlɪɡ.ə.mənt/',
    latinName: 'Ligamentum gastrosplenicum',
    latinSynonyms: ['Ligamentum gastrolienale', 'Gastrolienal ligament'],
    accent: 'US',
    category: 'LIGAMENT',
    substructureOf: 'spleen',
    academicSource: "Gray's Anatomy & Terminologia Anatomica"
  },
  splenic_capsule: {
    id: 'splenic_capsule',
    englishName: 'Splenic Capsule',
    ipa: '/ˈsplen.ɪk ˈkæp.sjuːl/',
    latinName: 'Capsula splenica',
    latinSynonyms: ['Capsula fibrosa lienis'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Junqueira's Basic Histology & TA2"
  },
  capsula_splenica: {
    id: 'capsula_splenica',
    englishName: 'Splenic Capsule',
    ipa: '/ˈsplen.ɪk ˈkæp.sjuːl/',
    latinName: 'Capsula splenica',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Junqueira's Basic Histology & TA2"
  },
  red_pulp: {
    id: 'red_pulp',
    englishName: 'Red Pulp',
    ipa: '/red pʌlp/',
    latinName: 'Pulpa rubra',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Wheater's Functional Histology & TA2"
  },
  white_pulp: {
    id: 'white_pulp',
    englishName: 'White Pulp',
    ipa: '/waɪt pʌlp/',
    latinName: 'Pulpa alba',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Wheater's Functional Histology & TA2"
  },
  splenic_sinusoids: {
    id: 'splenic_sinusoids',
    englishName: 'Splenic Sinusoids',
    ipa: '/ˈsplen.ɪk ˈsaɪ.njə.sɔɪdz/',
    latinName: 'Sinus splenici',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Junqueira's Basic Histology"
  },
  splenic_trabeculae: {
    id: 'splenic_trabeculae',
    englishName: 'Splenic Trabeculae',
    ipa: '/ˈsplen.ɪk trəˈbek.jʊ.liː/',
    latinName: 'Trabeculae splenicae',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'spleen',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },

  // --- HEART SUBSTRUCTURES & VALVES ---
  left_ventricle: {
    id: 'left_ventricle',
    englishName: 'Left Ventricle',
    ipa: '/left ˈven.trɪ.kəl/',
    latinName: 'Ventriculus sinister cordis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  right_ventricle: {
    id: 'right_ventricle',
    englishName: 'Right Ventricle',
    ipa: '/raɪt ˈven.trɪ.kəl/',
    latinName: 'Ventriculus dexter cordis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  left_atrium: {
    id: 'left_atrium',
    englishName: 'Left Atrium',
    ipa: '/left ˈeɪ.tri.əm/',
    latinName: 'Atrium sinistrum cordis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  right_atrium: {
    id: 'right_atrium',
    englishName: 'Right Atrium',
    ipa: '/raɪt ˈeɪ.tri.əm/',
    latinName: 'Atrium dextrum cordis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  pulmonary_trunk: {
    id: 'pulmonary_trunk',
    englishName: 'Pulmonary Trunk',
    ipa: '/ˈpʊl.mə.ner.i trʌŋk/',
    latinName: 'Truncus pulmonalis',
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'heart',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  mitral_valve: {
    id: 'mitral_valve',
    englishName: 'Mitral Valve',
    ipa: '/ˈmaɪ.trəl vælv/',
    latinName: 'Valva mitralis',
    latinSynonyms: ['Valva bicuspidalis', 'Bicuspid valve'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Illustrated Medical Dictionary"
  },
  bicuspid_valve: {
    id: 'bicuspid_valve',
    englishName: 'Bicuspid Valve',
    ipa: '/baɪˈkʌs.pɪd vælv/',
    latinName: 'Valva bicuspidalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Illustrated Medical Dictionary"
  },
  tricuspid_valve: {
    id: 'tricuspid_valve',
    englishName: 'Tricuspid Valve',
    ipa: '/traɪˈkʌs.pɪd vælv/',
    latinName: 'Valva tricuspidalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Illustrated Medical Dictionary"
  },
  aortic_valve: {
    id: 'aortic_valve',
    englishName: 'Aortic Valve',
    ipa: '/eɪˈɔːr.tɪk vælv/',
    latinName: 'Valva aortae',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Illustrated Medical Dictionary"
  },
  pulmonary_valve: {
    id: 'pulmonary_valve',
    englishName: 'Pulmonary Valve',
    ipa: '/ˈpʊl.mə.ner.i vælv/',
    latinName: 'Valva trunci pulmonalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Illustrated Medical Dictionary"
  },
  interventricular_septum: {
    id: 'interventricular_septum',
    englishName: 'Interventricular Septum',
    ipa: '/ˌɪn.tər.venˈtrɪk.jə.lər ˈsep.təm/',
    latinName: 'Septum interventriculare',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Gray's Anatomy"
  },
  interatrial_septum: {
    id: 'interatrial_septum',
    englishName: 'Interatrial Septum',
    ipa: '/ˌɪn.tərˈeɪ.tri.əl ˈsep.təm/',
    latinName: 'Septum interatriale',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Gray's Anatomy"
  },
  superior_vena_cava: {
    id: 'superior_vena_cava',
    englishName: 'Superior Vena Cava',
    ipa: '/suːˈpɪr.i.ər ˌviː.nə ˈkeɪ.və/',
    latinName: 'Vena cava superior',
    accent: 'US',
    category: 'VESSEL',
    academicSource: "Terminologia Anatomica"
  },
  inferior_vena_cava: {
    id: 'inferior_vena_cava',
    englishName: 'Inferior Vena Cava',
    ipa: '/ɪnˈfɪr.i.ər ˌviː.nə ˈkeɪ.və/',
    latinName: 'Vena cava inferior',
    accent: 'US',
    category: 'VESSEL',
    academicSource: "Terminologia Anatomica"
  },
  pulmonary_veins: {
    id: 'pulmonary_veins',
    englishName: 'Pulmonary Veins',
    ipa: '/ˈpʊl.mə.ner.i veɪnz/',
    latinName: 'Venae pulmonales',
    accent: 'US',
    category: 'VESSEL',
    academicSource: "Terminologia Anatomica"
  },
  coronary_sinus: {
    id: 'coronary_sinus',
    englishName: 'Coronary Sinus',
    ipa: '/ˈkɔːr.ə.ner.i ˈsaɪ.nəs/',
    latinName: 'Sinus coronarius',
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'heart',
    academicSource: "Terminologia Anatomica"
  },
  papillary_muscles: {
    id: 'papillary_muscles',
    englishName: 'Papillary Muscles',
    ipa: '/ˈpæp.ɪ.ler.i ˈmʌs.əlz/',
    latinName: 'Musculi papillares',
    accent: 'US',
    category: 'MUSCLE',
    substructureOf: 'heart',
    academicSource: "Gray's Anatomy"
  },
  chordae_tendineae: {
    id: 'chordae_tendineae',
    englishName: 'Chordae Tendineae',
    ipa: '/ˈkɔːr.diː tenˈdɪn.i.iː/',
    latinName: 'Chordae tendineae',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Medical Dictionary"
  },
  sinoatrial_node: {
    id: 'sinoatrial_node',
    englishName: 'Sinoatrial Node',
    ipa: '/ˌsaɪ.noʊˈeɪ.tri.əl noʊd/',
    latinName: 'Nodus sinuatrialis',
    latinSynonyms: ['SA node', 'Sinus node'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Medical Dictionary"
  },
  atrioventricular_node: {
    id: 'atrioventricular_node',
    englishName: 'Atrioventricular Node',
    ipa: '/ˌeɪ.tri.oʊ.venˈtrɪk.jə.lər noʊd/',
    latinName: 'Nodus atrioventricularis',
    latinSynonyms: ['AV node'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Medical Dictionary"
  },
  pericardium: {
    id: 'pericardium',
    englishName: 'Pericardium',
    ipa: '/ˌper.ɪˈkɑːr.di.əm/',
    latinName: 'Pericardium',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Medical Dictionary"
  },
  myocardium: {
    id: 'myocardium',
    englishName: 'Myocardium',
    ipa: '/ˌmaɪ.oʊˈkɑːr.di.əm/',
    latinName: 'Myocardium',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Medical Dictionary"
  },
  endocardium: {
    id: 'endocardium',
    englishName: 'Endocardium',
    ipa: '/ˌen.doʊˈkɑːr.di.əm/',
    latinName: 'Endocardium',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'heart',
    academicSource: "Dorland's Medical Dictionary"
  },

  // --- SKULL, CRANIAL BONES & FORAMINA ---
  zygomatic_bone: {
    id: 'zygomatic_bone',
    englishName: 'Zygomatic Bone',
    ipa: '/ˌzaɪ.ɡəˈmæt.ɪk boʊn/',
    latinName: 'Os zygomaticum',
    accent: 'US',
    category: 'BONE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  temporal_bone: {
    id: 'temporal_bone',
    englishName: 'Temporal Bone',
    ipa: '/ˈtem.pər.əl boʊn/',
    latinName: 'Os temporale',
    accent: 'US',
    category: 'BONE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  frontal_bone: {
    id: 'frontal_bone',
    englishName: 'Frontal Bone',
    ipa: '/ˈfrʌn.təl boʊn/',
    latinName: 'Os frontale',
    accent: 'US',
    category: 'BONE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  parietal_bone: {
    id: 'parietal_bone',
    englishName: 'Parietal Bone',
    ipa: '/pəˈraɪ.ə.təl boʊn/',
    latinName: 'Os parietale',
    accent: 'US',
    category: 'BONE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  occipital_bone: {
    id: 'occipital_bone',
    englishName: 'Occipital Bone',
    ipa: '/ɑːkˈsɪp.ɪ.təl boʊn/',
    latinName: 'Os occipitale',
    accent: 'US',
    category: 'BONE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  sphenoid_bone: {
    id: 'sphenoid_bone',
    englishName: 'Sphenoid Bone',
    ipa: '/ˈsfiː.nɔɪd boʊn/',
    latinName: 'Os sphenoidale',
    accent: 'US',
    category: 'BONE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  ethmoid_bone: {
    id: 'ethmoid_bone',
    englishName: 'Ethmoid Bone',
    ipa: '/ˈeθ.mɔɪd boʊn/',
    latinName: 'Os ethmoidale',
    accent: 'US',
    category: 'BONE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  foramen_magnum: {
    id: 'foramen_magnum',
    englishName: 'Foramen Magnum',
    ipa: '/fəˈreɪ.mən ˈmæɡ.nəm/',
    latinName: 'Foramen magnum',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica"
  },
  jugular_foramen: {
    id: 'jugular_foramen',
    englishName: 'Jugular Foramen',
    ipa: '/ˈdʒʌɡ.jə.lər fəˈreɪ.mən/',
    latinName: 'Foramen jugulare',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica"
  },
  carotid_canal: {
    id: 'carotid_canal',
    englishName: 'Carotid Canal',
    ipa: '/kəˈrɑː.tɪd kəˈnæl/',
    latinName: 'Canalis caroticus',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica"
  },
  stylomastoid_foramen: {
    id: 'stylomastoid_foramen',
    englishName: 'Stylomastoid Foramen',
    ipa: '/ˌstaɪ.loʊˈmæs.tɔɪd fəˈreɪ.mən/',
    latinName: 'Foramen stylomastoideum',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica"
  },
  pterygopalatine_fossa: {
    id: 'pterygopalatine_fossa',
    englishName: 'Pterygopalatine Fossa',
    ipa: '/ˌter.ɪ.ɡoʊˈpæl.ə.taɪn ˈfɑː.sə/',
    latinName: 'Fossa pterygopalatina',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica"
  },
  infratemporal_fossa: {
    id: 'infratemporal_fossa',
    englishName: 'Infratemporal Fossa',
    ipa: '/ˌɪn.frəˈtem.pər.əl ˈfɑː.sə/',
    latinName: 'Fossa infratemporalis',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica"
  },

  // --- CRANIAL NERVES (I - XII) & DENTAL BRANCHES ---
  cn_1: {
    id: 'cn_1',
    englishName: 'Olfactory Nerve',
    ipa: '/ɑːlˈfæk.tər.i nɜːrv/',
    latinName: 'Nervus olfactorius [I]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6171)"
  },
  olfactory_nerve: {
    id: 'olfactory_nerve',
    englishName: 'Olfactory Nerve',
    ipa: '/ɑːlˈfæk.tər.i nɜːrv/',
    latinName: 'Nervus olfactorius',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_2: {
    id: 'cn_2',
    englishName: 'Optic Nerve',
    ipa: '/ˈɑːp.tɪk nɜːrv/',
    latinName: 'Nervus opticus [II]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6174)"
  },
  optic_nerve: {
    id: 'optic_nerve',
    englishName: 'Optic Nerve',
    ipa: '/ˈɑːp.tɪk nɜːrv/',
    latinName: 'Nervus opticus',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_3: {
    id: 'cn_3',
    englishName: 'Oculomotor Nerve',
    ipa: '/ˌɑːk.jə.loʊˈmoʊ.tər nɜːrv/',
    latinName: 'Nervus oculomotorius [III]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6176)"
  },
  oculomotor_nerve: {
    id: 'oculomotor_nerve',
    englishName: 'Oculomotor Nerve',
    ipa: '/ˌɑːk.jə.loʊˈmoʊ.tər nɜːrv/',
    latinName: 'Nervus oculomotorius',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_4: {
    id: 'cn_4',
    englishName: 'Trochlear Nerve',
    ipa: '/ˈtrɑːk.li.ər nɜːrv/',
    latinName: 'Nervus trochlearis [IV]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6184)"
  },
  trochlear_nerve: {
    id: 'trochlear_nerve',
    englishName: 'Trochlear Nerve',
    ipa: '/ˈtrɑːk.li.ər nɜːrv/',
    latinName: 'Nervus trochlearis',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_6: {
    id: 'cn_6',
    englishName: 'Abducens Nerve',
    ipa: '/æbˈduː.sənz nɜːrv/',
    latinName: 'Nervus abducens [VI]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6265)"
  },
  abducens_nerve: {
    id: 'abducens_nerve',
    englishName: 'Abducens Nerve',
    ipa: '/æbˈduː.sənz nɜːrv/',
    latinName: 'Nervus abducens',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_8: {
    id: 'cn_8',
    englishName: 'Vestibulocochlear Nerve',
    ipa: '/vɛˌstɪb.jə.loʊˈkɑːk.li.ər nɜːrv/',
    latinName: 'Nervus vestibulocochlearis [VIII]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6300)"
  },
  vestibulocochlear_nerve: {
    id: 'vestibulocochlear_nerve',
    englishName: 'Vestibulocochlear Nerve',
    ipa: '/vɛˌstɪb.jə.loʊˈkɑːk.li.ər nɜːrv/',
    latinName: 'Nervus vestibulocochlearis',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_9: {
    id: 'cn_9',
    englishName: 'Glossopharyngeal Nerve',
    ipa: '/ˌɡlɑː.soʊ.fəˈrɪn.dʒi.əl nɜːrv/',
    latinName: 'Nervus glossopharyngeus [IX]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6306)"
  },
  glossopharyngeal_nerve: {
    id: 'glossopharyngeal_nerve',
    englishName: 'Glossopharyngeal Nerve',
    ipa: '/ˌɡlɑː.soʊ.fəˈrɪn.dʒi.əl nɜːrv/',
    latinName: 'Nervus glossopharyngeus',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_10: {
    id: 'cn_10',
    englishName: 'Vagus Nerve',
    ipa: '/ˈveɪ.ɡəs nɜːrv/',
    latinName: 'Nervus vagus [X]',
    latinSynonyms: ['Nervus vagus'],
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6318)"
  },
  vagus_nerve: {
    id: 'vagus_nerve',
    englishName: 'Vagus Nerve',
    ipa: '/ˈveɪ.ɡəs nɜːrv/',
    latinName: 'Nervus vagus',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_11: {
    id: 'cn_11',
    englishName: 'Accessory Nerve',
    ipa: '/əkˈses.ər.i nɜːrv/',
    latinName: 'Nervus accessorius [XI]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6351)"
  },
  accessory_nerve: {
    id: 'accessory_nerve',
    englishName: 'Accessory Nerve',
    ipa: '/əkˈses.ər.i nɜːrv/',
    latinName: 'Nervus accessorius',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  cn_12: {
    id: 'cn_12',
    englishName: 'Hypoglossal Nerve',
    ipa: '/ˌhaɪ.pəˈɡlɑː.səl nɜːrv/',
    latinName: 'Nervus hypoglossus [XII]',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica (TA2 6355)"
  },
  hypoglossal_nerve: {
    id: 'hypoglossal_nerve',
    englishName: 'Hypoglossal Nerve',
    ipa: '/ˌhaɪ.pəˈɡlɑː.səl nɜːrv/',
    latinName: 'Nervus hypoglossus',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  nerve_auriculotemporal: {
    id: 'nerve_auriculotemporal',
    englishName: 'Auriculotemporal Nerve',
    ipa: '/ˌɔː.rɪk.jə.loʊˈtem.pər.əl nɜːrv/',
    latinName: 'Nervus auriculotemporalis',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  nerve_nasopalatine: {
    id: 'nerve_nasopalatine',
    englishName: 'Nasopalatine Nerve',
    ipa: '/ˌneɪ.zoʊˈpæl.ə.taɪn nɜːrv/',
    latinName: 'Nervus nasopalatinus',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  nerve_greater_palatine: {
    id: 'nerve_greater_palatine',
    englishName: 'Greater Palatine Nerve',
    ipa: '/ˈɡreɪ.tər ˈpæl.ə.taɪn nɜːrv/',
    latinName: 'Nervus palatinus major',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  nerve_infraorbital: {
    id: 'nerve_infraorbital',
    englishName: 'Infraorbital Nerve',
    ipa: '/ˌɪn.frəˈɔːr.bɪ.təl nɜːrv/',
    latinName: 'Nervus infraorbitalis',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica"
  },
  chorda_tympani: {
    id: 'chorda_tympani',
    englishName: 'Chorda Tympani',
    ipa: '/ˈkɔːr.də ˈtɪm.pə.naɪ/',
    latinName: 'Chorda tympani',
    accent: 'US',
    category: 'NERVE',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },

  // --- DENTAL HISTOLOGY, MORPHOLOGY & TEETH ---
  pulp_chamber: {
    id: 'pulp_chamber',
    englishName: 'Pulp Chamber',
    ipa: '/pʌlp ˈtʃeɪm.bər/',
    latinName: 'Cavitas coronae',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  apical_foramen: {
    id: 'apical_foramen',
    englishName: 'Apical Foramen',
    ipa: '/ˈeɪ.pɪ.kəl fəˈreɪ.mən/',
    latinName: 'Foramen apicale dentis',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  cementum: {
    id: 'cementum',
    englishName: 'Cementum',
    ipa: '/sɪˈmen.təm/',
    latinName: 'Cementum',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Ten Cate's Oral Histology"
  },
  dental_crown: {
    id: 'dental_crown',
    englishName: 'Crown of Tooth',
    ipa: '/kraʊn/',
    latinName: 'Corona dentis',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  crown: {
    id: 'crown',
    englishName: 'Crown',
    ipa: '/kraʊn/',
    latinName: 'Corona dentis',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  dental_root: {
    id: 'dental_root',
    englishName: 'Root of Tooth',
    ipa: '/ruːt/',
    latinName: 'Radix dentis',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  root: {
    id: 'root',
    englishName: 'Root',
    ipa: '/ruːt/',
    latinName: 'Radix dentis',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  cementoenamel_junction: {
    id: 'cementoenamel_junction',
    englishName: 'Cementoenamel Junction',
    ipa: '/sɪˌmen.toʊ.ɪˈnæm.əl ˈdʒʌŋk.ʃən/',
    latinName: 'Junctio cementoenameli',
    latinSynonyms: ['CEJ', 'Cervical line'],
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  dentinoenamel_junction: {
    id: 'dentinoenamel_junction',
    englishName: 'Dentinoenamel Junction',
    ipa: '/ˌden.tɪ.noʊ.ɪˈnæm.əl ˈdʒʌŋk.ʃən/',
    latinName: 'Junctio dentinoenameli',
    latinSynonyms: ['DEJ'],
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  mandibular_first_molar: {
    id: 'mandibular_first_molar',
    englishName: 'Mandibular First Molar',
    ipa: '/mænˈdɪb.jə.lər fɜːrst ˈmoʊ.lər/',
    latinName: 'Dens molaris primus inferior',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },
  maxillary_first_molar: {
    id: 'maxillary_first_molar',
    englishName: 'Maxillary First Molar',
    ipa: '/mækˈsɪl.ər.i fɜːrst ˈmoʊ.lər/',
    latinName: 'Dens molaris primus superior',
    accent: 'US',
    category: 'TOOTH',
    academicSource: "Wheeler's Dental Anatomy"
  },

  // --- TMJ & CRANIOMANDIBULAR JOINT ---
  joint_tmj: {
    id: 'joint_tmj',
    englishName: 'Temporomandibular Joint',
    ipa: '/ˌtem.pə.roʊ.mænˈdɪb.jə.lər dʒɔɪnt/',
    latinName: 'Articulatio temporomandibularis',
    accent: 'US',
    category: 'JOINT',
    academicSource: "Okeson Management of Temporomandibular Disorders"
  },
  mandibular_condyle: {
    id: 'mandibular_condyle',
    englishName: 'Mandibular Condyle',
    ipa: '/mænˈdɪb.jə.lər ˈkɑːn.daɪl/',
    latinName: 'Processus condylaris mandibulae',
    latinSynonyms: ['Caput mandibulae'],
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica & Okeson"
  },
  articular_disc: {
    id: 'articular_disc',
    englishName: 'Articular Disc',
    ipa: '/ɑːrˈtɪk.jə.lər dɪsk/',
    latinName: 'Discus articularis',
    accent: 'US',
    category: 'JOINT',
    academicSource: "Terminologia Anatomica & Okeson"
  },
  mandibular_fossa: {
    id: 'mandibular_fossa',
    englishName: 'Mandibular Fossa',
    ipa: '/mænˈdɪb.jə.lər ˈfɑː.sə/',
    latinName: 'Fossa mandibularis',
    latinSynonyms: ['Glenoid fossa'],
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica & Okeson"
  },
  articular_eminence: {
    id: 'articular_eminence',
    englishName: 'Articular Eminence',
    ipa: '/ɑːrˈtɪk.jə.lər ˈem.ə.nəns/',
    latinName: 'Tuberculum articulare',
    accent: 'US',
    category: 'LANDMARK',
    academicSource: "Terminologia Anatomica & Okeson"
  },
  sphenomandibular_ligament: {
    id: 'sphenomandibular_ligament',
    englishName: 'Sphenomandibular Ligament',
    ipa: '/ˌsfiː.noʊ.mænˈdɪb.jə.lər ˈlɪɡ.ə.mənt/',
    latinName: 'Ligamentum sphenomandibulare',
    accent: 'US',
    category: 'LIGAMENT',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  stylomandibular_ligament: {
    id: 'stylomandibular_ligament',
    englishName: 'Stylomandibular Ligament',
    ipa: '/ˌstaɪ.loʊ.mænˈdɪb.jə.lər ˈlɪɡ.ə.mənt/',
    latinName: 'Ligamentum stylomandibulare',
    accent: 'US',
    category: 'LIGAMENT',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },

  // --- BRAIN & CENTRAL NERVOUS SYSTEM ---
  cerebrum: {
    id: 'cerebrum',
    englishName: 'Cerebrum',
    ipa: '/səˈriː.brəm/',
    latinName: 'Cerebrum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica & Carpenter's Human Neuroanatomy"
  },
  cerebellum: {
    id: 'cerebellum',
    englishName: 'Cerebellum',
    ipa: '/ˌser.əˈbel.əm/',
    latinName: 'Cerebellum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica & Carpenter's Human Neuroanatomy"
  },
  brainstem: {
    id: 'brainstem',
    englishName: 'Brainstem',
    ipa: '/ˈbreɪn.stem/',
    latinName: 'Truncus encephali',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica & Carpenter's Human Neuroanatomy"
  },
  midbrain: {
    id: 'midbrain',
    englishName: 'Midbrain',
    ipa: '/ˈmɪd.breɪn/',
    latinName: 'Mesencephalon',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  pons: {
    id: 'pons',
    englishName: 'Pons',
    ipa: '/pɑːnz/',
    latinName: 'Pons',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  medulla_oblongata: {
    id: 'medulla_oblongata',
    englishName: 'Medulla Oblongata',
    ipa: '/məˈdʌl.ə ˌɑːb.lɑːŋˈɡɑː.tə/',
    latinName: 'Medulla oblongata',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  thalamus: {
    id: 'thalamus',
    englishName: 'Thalamus',
    ipa: '/ˈθæl.ə.məs/',
    latinName: 'Thalamus',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  hypothalamus: {
    id: 'hypothalamus',
    englishName: 'Hypothalamus',
    ipa: '/ˌhaɪ.poʊˈθæl.ə.məs/',
    latinName: 'Hypothalamus',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  hippocampus: {
    id: 'hippocampus',
    englishName: 'Hippocampus',
    ipa: '/ˌhɪp.əˈkæm.pəs/',
    latinName: 'Hippocampus',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  amygdala: {
    id: 'amygdala',
    englishName: 'Amygdala',
    ipa: '/əˈmɪɡ.də.lə/',
    latinName: 'Corpus amygdaloideum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  corpus_callosum: {
    id: 'corpus_callosum',
    englishName: 'Corpus Callosum',
    ipa: '/ˈkɔːr.pəs kəˈloʊ.səm/',
    latinName: 'Corpus callosum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  frontal_lobe: {
    id: 'frontal_lobe',
    englishName: 'Frontal Lobe',
    ipa: '/ˈfrʌn.təl loʊb/',
    latinName: 'Lobus frontalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  parietal_lobe: {
    id: 'parietal_lobe',
    englishName: 'Parietal Lobe',
    ipa: '/pəˈraɪ.ə.təl loʊb/',
    latinName: 'Lobus parietalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  temporal_lobe: {
    id: 'temporal_lobe',
    englishName: 'Temporal Lobe',
    ipa: '/ˈtem.pər.əl loʊb/',
    latinName: 'Lobus temporalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  occipital_lobe: {
    id: 'occipital_lobe',
    englishName: 'Occipital Lobe',
    ipa: '/ɑːkˈsɪp.ɪ.təl loʊb/',
    latinName: 'Lobus occipitalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  meninges: {
    id: 'meninges',
    englishName: 'Meninges',
    ipa: '/məˈnɪn.dʒiːz/',
    latinName: 'Meninges',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  dura_mater: {
    id: 'dura_mater',
    englishName: 'Dura Mater',
    ipa: '/ˌdʊr.ə ˈmeɪ.tər/',
    latinName: 'Dura mater cranialis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  arachnoid_mater: {
    id: 'arachnoid_mater',
    englishName: 'Arachnoid Mater',
    ipa: '/əˈræk.nɔɪd ˈmeɪ.tər/',
    latinName: 'Arachnoidea mater cranialis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  pia_mater: {
    id: 'pia_mater',
    englishName: 'Pia Mater',
    ipa: '/ˌpiː.ə ˈmeɪ.tər/',
    latinName: 'Pia mater cranialis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'brain',
    academicSource: "Terminologia Anatomica"
  },
  cerebrospinal_fluid: {
    id: 'cerebrospinal_fluid',
    englishName: 'Cerebrospinal Fluid',
    ipa: '/səˌriː.broʊˈspaɪ.nəl ˈfluː.ɪd/',
    latinName: 'Liquor cerebrospinalis',
    latinSynonyms: ['CSF'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    academicSource: "Dorland's Illustrated Medical Dictionary"
  },
  spinal_cord: {
    id: 'spinal_cord',
    englishName: 'Spinal Cord',
    ipa: '/ˈspaɪ.nəl kɔːrd/',
    latinName: 'Medulla spinalis',
    accent: 'US',
    category: 'ORGAN',
    academicSource: "Terminologia Anatomica"
  },

  // --- VISCERA, DIGESTION & RESPIRATORY/URINARY ---
  bile_duct: {
    id: 'bile_duct',
    englishName: 'Bile Duct',
    ipa: '/baɪl dʌkt/',
    latinName: 'Ductus choledochus',
    latinSynonyms: ['Common bile duct'],
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'liver',
    academicSource: "Terminologia Anatomica"
  },
  hepatic_artery: {
    id: 'hepatic_artery',
    englishName: 'Hepatic Artery',
    ipa: '/hɪˈpæt.ɪk ˈɑːr.tər.i/',
    latinName: 'Arteria hepatica propria',
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'liver',
    academicSource: "Terminologia Anatomica"
  },
  portal_vein: {
    id: 'portal_vein',
    englishName: 'Portal Vein',
    ipa: '/ˈpɔːr.təl veɪn/',
    latinName: 'Vena portae hepatis',
    latinSynonyms: ['Hepatic portal vein'],
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'liver',
    academicSource: "Terminologia Anatomica"
  },
  pancreatic_duct: {
    id: 'pancreatic_duct',
    englishName: 'Pancreatic Duct',
    ipa: '/ˌpæŋ.kriˈæt.ɪk dʌkt/',
    latinName: 'Ductus pancreaticus',
    latinSynonyms: ['Duct of Wirsung'],
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'pancreas',
    academicSource: "Terminologia Anatomica"
  },
  duodenum: {
    id: 'duodenum',
    englishName: 'Duodenum',
    ipa: '/ˌduː.əˈdiː.nəm/',
    latinName: 'Duodenum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'small_intestine',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  jejunum: {
    id: 'jejunum',
    englishName: 'Jejunum',
    ipa: '/dʒɪˈdʒuː.nəm/',
    latinName: 'Jejunum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'small_intestine',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  ileum: {
    id: 'ileum',
    englishName: 'Ileum',
    ipa: '/ˈɪl.i.əm/',
    latinName: 'Ileum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'small_intestine',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  cecum: {
    id: 'cecum',
    englishName: 'Cecum',
    ipa: '/ˈsiː.kəm/',
    latinName: 'Caecum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'large_intestine',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  appendix: {
    id: 'appendix',
    englishName: 'Appendix',
    ipa: '/əˈpen.dɪks/',
    latinName: 'Appendix vermiformis',
    latinSynonyms: ['Vermiform appendix'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'large_intestine',
    academicSource: "Terminologia Anatomica & Gray's Anatomy"
  },
  ascending_colon: {
    id: 'ascending_colon',
    englishName: 'Ascending Colon',
    ipa: '/əˈsen.dɪŋ ˈkoʊ.lɑːn/',
    latinName: 'Colon ascendens',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'large_intestine',
    academicSource: "Terminologia Anatomica"
  },
  transverse_colon: {
    id: 'transverse_colon',
    englishName: 'Transverse Colon',
    ipa: '/trænsˈvɜːrs ˈkoʊ.lɑːn/',
    latinName: 'Colon transversum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'large_intestine',
    academicSource: "Terminologia Anatomica"
  },
  descending_colon: {
    id: 'descending_colon',
    englishName: 'Descending Colon',
    ipa: '/dɪˈsen.dɪŋ ˈkoʊ.lɑːn/',
    latinName: 'Colon descendens',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'large_intestine',
    academicSource: "Terminologia Anatomica"
  },
  sigmoid_colon: {
    id: 'sigmoid_colon',
    englishName: 'Sigmoid Colon',
    ipa: '/ˈsɪɡ.mɔɪd ˈkoʊ.lɑːn/',
    latinName: 'Colon sigmoideum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'large_intestine',
    academicSource: "Terminologia Anatomica"
  },
  rectum: {
    id: 'rectum',
    englishName: 'Rectum',
    ipa: '/ˈrek.təm/',
    latinName: 'Rectum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'large_intestine',
    academicSource: "Terminologia Anatomica"
  },
  renal_cortex: {
    id: 'renal_cortex',
    englishName: 'Renal Cortex',
    ipa: '/ˈriː.nəl ˈkɔːr.teks/',
    latinName: 'Cortex renalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'kidney',
    academicSource: "Terminologia Anatomica"
  },
  renal_medulla: {
    id: 'renal_medulla',
    englishName: 'Renal Medulla',
    ipa: '/ˈriː.nəl məˈdʌl.ə/',
    latinName: 'Medulla renalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'kidney',
    academicSource: "Terminologia Anatomica"
  },
  renal_pelvis: {
    id: 'renal_pelvis',
    englishName: 'Renal Pelvis',
    ipa: '/ˈriː.nəl ˈpel.vɪs/',
    latinName: 'Pelvis renalis',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'kidney',
    academicSource: "Terminologia Anatomica"
  },
  renal_artery: {
    id: 'renal_artery',
    englishName: 'Renal Artery',
    ipa: '/ˈriː.nəl ˈɑːr.tər.i/',
    latinName: 'Arteria renalis',
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'kidney',
    academicSource: "Terminologia Anatomica"
  },
  renal_vein: {
    id: 'renal_vein',
    englishName: 'Renal Vein',
    ipa: '/ˈriː.nəl veɪn/',
    latinName: 'Vena renalis',
    accent: 'US',
    category: 'VESSEL',
    substructureOf: 'kidney',
    academicSource: "Terminologia Anatomica"
  },
  nephron: {
    id: 'nephron',
    englishName: 'Nephron',
    ipa: '/ˈnef.rɑːn/',
    latinName: 'Nephronum',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'kidney',
    academicSource: "Wheater's Functional Histology"
  },
  glomerulus: {
    id: 'glomerulus',
    englishName: 'Glomerulus',
    ipa: '/ɡloʊˈmer.jə.ləs/',
    latinName: 'Glomerulus',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'kidney',
    academicSource: "Wheater's Functional Histology"
  },
  ureter: {
    id: 'ureter',
    englishName: 'Ureter',
    ipa: '/jʊˈriː.tər/',
    latinName: 'Ureter',
    accent: 'US',
    category: 'ORGAN',
    academicSource: "Terminologia Anatomica"
  },
  urethra: {
    id: 'urethra',
    englishName: 'Urethra',
    ipa: '/jʊˈriː.θrə/',
    latinName: 'Urethra',
    accent: 'US',
    category: 'ORGAN',
    academicSource: "Terminologia Anatomica"
  },
  bronchus: {
    id: 'bronchus',
    englishName: 'Bronchus',
    ipa: '/ˈbrɑːŋ.kəs/',
    latinName: 'Bronchus principalis',
    latinSynonyms: ['Bronchi'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'lungs',
    academicSource: "Terminologia Anatomica"
  },
  bronchiole: {
    id: 'bronchiole',
    englishName: 'Bronchiole',
    ipa: '/ˈbrɑːŋ.ki.oʊl/',
    latinName: 'Bronchiolus',
    latinSynonyms: ['Bronchioles'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'lungs',
    academicSource: "Terminologia Anatomica"
  },
  alveoli: {
    id: 'alveoli',
    englishName: 'Alveoli',
    ipa: '/ælˈviː.ə.laɪ/',
    latinName: 'Alveoli pulmonis',
    latinSynonyms: ['Alveolus', 'Pulmonary alveoli'],
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'lungs',
    academicSource: "Terminologia Anatomica"
  },
  pleura: {
    id: 'pleura',
    englishName: 'Pleura',
    ipa: '/ˈplʊr.ə/',
    latinName: 'Pleura',
    accent: 'US',
    category: 'SUBSTRUCTURE',
    substructureOf: 'lungs',
    academicSource: "Terminologia Anatomica"
  }
};

/**
 * Normalizes an anatomy ID, English Name, or Latin Name to locate pronunciation data
 */
export function getAnatomicalPronunciation(
  id?: string | null,
  englishName?: string | null,
  latinName?: string | null
): PronunciationRecord | null {
  if (!id && !englishName && !latinName) return null;

  // 1. Exact ID match
  if (id && ANATOMY_PRONUNCIATION_DATABASE[id]) {
    return ANATOMY_PRONUNCIATION_DATABASE[id];
  }

  // 2. Normalized clean ID match
  if (id) {
    const cleanId = id.toLowerCase().replace(/[-_\s.]/g, '');
    for (const [key, record] of Object.entries(ANATOMY_PRONUNCIATION_DATABASE)) {
      const cleanKey = key.toLowerCase().replace(/[-_\s.]/g, '');
      if (cleanId === cleanKey) return record;
    }

    // 2b. Dot-notation or underscore sub-part resolution (e.g. 'spleen.hilum' -> 'hilum_splenicum' / 'spleen_hilum' / 'hilum')
    const subParts = id.split(/[._]/);
    if (subParts.length > 1) {
      const lastPart = subParts[subParts.length - 1];
      const joinedTail = subParts.slice(1).join('_');
      if (ANATOMY_PRONUNCIATION_DATABASE[joinedTail]) return ANATOMY_PRONUNCIATION_DATABASE[joinedTail];
      if (ANATOMY_PRONUNCIATION_DATABASE[lastPart]) return ANATOMY_PRONUNCIATION_DATABASE[lastPart];

      // Try with parent prefix (e.g. 'spleen_' + lastPart)
      const prefixed = `${subParts[0]}_${lastPart}`;
      if (ANATOMY_PRONUNCIATION_DATABASE[prefixed]) return ANATOMY_PRONUNCIATION_DATABASE[prefixed];
    }

    // 2c. Common medical prefixes stripping and acronym mapping
    const strippedPrefix = id.replace(/^(nerve_|muscle_|joint_|specimen_|structure_)/, '');
    if (strippedPrefix !== id) {
      if (ANATOMY_PRONUNCIATION_DATABASE[strippedPrefix]) return ANATOMY_PRONUNCIATION_DATABASE[strippedPrefix];
    }

    const acronyms: Record<string, string> = {
      ian: 'inferior_alveolar_nerve',
      tmj: 'temporomandibular_joint',
      pdl: 'periodontal_ligament',
      cej: 'cementoenamel_junction',
      dej: 'dentinoenamel_junction',
      sanode: 'sinoatrial_node',
      avnode: 'atrioventricular_node',
      csf: 'cerebrospinal_fluid'
    };
    if (acronyms[cleanId] && ANATOMY_PRONUNCIATION_DATABASE[acronyms[cleanId]]) {
      return ANATOMY_PRONUNCIATION_DATABASE[acronyms[cleanId]];
    }
    if (acronyms[strippedPrefix] && ANATOMY_PRONUNCIATION_DATABASE[acronyms[strippedPrefix]]) {
      return ANATOMY_PRONUNCIATION_DATABASE[acronyms[strippedPrefix]];
    }
  }

  // 3. Exact or normalized English name match
  if (englishName) {
    const cleanEn = englishName.toLowerCase().trim();
    for (const record of Object.values(ANATOMY_PRONUNCIATION_DATABASE)) {
      if (record.englishName.toLowerCase() === cleanEn) return record;
    }
  }

  // 4. Latin Name / Synonym match
  const searchLatin = (latinName || englishName || id || '').toLowerCase().trim();
  if (searchLatin) {
    for (const record of Object.values(ANATOMY_PRONUNCIATION_DATABASE)) {
      if (record.latinName && record.latinName.toLowerCase() === searchLatin) return record;
      if (record.latinSynonyms && record.latinSynonyms.some((s) => s.toLowerCase() === searchLatin)) return record;
    }
  }

  // 5. Partial contains match for English name
  if (englishName) {
    const cleanEn = englishName.toLowerCase().trim();
    for (const record of Object.values(ANATOMY_PRONUNCIATION_DATABASE)) {
      const recName = record.englishName.toLowerCase();
      if (cleanEn.includes(recName) && recName.length > 4) return record;
    }
  }

  // 6. FDI Tooth Resolution (tooth.11 - tooth.48)
  if (id && (id.startsWith('tooth.') || id.startsWith('tooth_'))) {
    const fdi = parseInt(id.replace(/tooth[._]/, ''), 10);
    if (!isNaN(fdi) && fdi >= 11 && fdi <= 48) {
      return deriveFdiToothPronunciation(fdi);
    }
  }

  return null;
}

/**
 * Derives authentic academic IPA for any of the 32 FDI teeth
 */
function deriveFdiToothPronunciation(fdi: number): PronunciationRecord {
  const quad = Math.floor(fdi / 10);
  const toothNum = fdi % 10;

  const jaw = quad === 1 || quad === 2 ? 'Maxillary' : 'Mandibular';
  const jawIpa = quad === 1 || quad === 2 ? '/mækˈsɪl.ər.i' : '/mænˈdɪb.jə.lər';

  const side = quad === 1 || quad === 4 ? 'Right' : 'Left';
  const sideIpa = quad === 1 || quad === 4 ? 'raɪt' : 'left';

  let typeName = 'Tooth';
  let typeIpa = 'tuːθ/';

  switch (toothNum) {
    case 1:
      typeName = 'Central Incisor';
      typeIpa = 'ˈsen.trəl ɪnˈsaɪ.zər/';
      break;
    case 2:
      typeName = 'Lateral Incisor';
      typeIpa = 'ˈlæt.ər.əl ɪnˈsaɪ.zər/';
      break;
    case 3:
      typeName = 'Canine';
      typeIpa = 'ˈkeɪ.naɪn/';
      break;
    case 4:
      typeName = 'First Premolar';
      typeIpa = 'fɜːrst ˌpriːˈmoʊ.lər/';
      break;
    case 5:
      typeName = 'Second Premolar';
      typeIpa = 'ˈsek.ənd ˌpriːˈmoʊ.lər/';
      break;
    case 6:
      typeName = 'First Molar';
      typeIpa = 'fɜːrst ˈmoʊ.lər/';
      break;
    case 7:
      typeName = 'Second Molar';
      typeIpa = 'ˈsek.ənd ˈmoʊ.lər/';
      break;
    case 8:
      typeName = 'Third Molar';
      typeIpa = 'θɜːrd ˈmoʊ.lər/';
      break;
  }

  return {
    id: `tooth.${fdi}`,
    englishName: `${jaw} ${side} ${typeName}`,
    ipa: `${jawIpa} ${sideIpa} ${typeIpa}`,
    accent: 'US',
    academicSource: "FDI World Dental Federation & Wheeler's Dental Anatomy"
  };
}
