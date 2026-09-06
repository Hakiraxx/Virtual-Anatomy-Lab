// ============================================================================
// MEDANATOMY 3D — ANATOMICAL PRONUNCIATION & IPA REGISTRY
// Standardized academic English pronunciation with verified IPA transcriptions
// Sources: Cambridge Advanced Learner's Dictionary, Oxford Medical Dictionary,
// Terminologia Anatomica (TA2), Dorland's Illustrated Medical Dictionary.
// ============================================================================

export interface PronunciationRecord {
  id: string;
  englishName: string;
  ipa: string; // International Phonetic Alphabet
  audioUrl?: string; // Optional direct audio URL
  accent: 'US' | 'UK' | 'General';
  academicSource: string;
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
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  cn_5: {
    id: 'cn_5',
    englishName: 'Trigeminal Nerve (CN V)',
    ipa: '/traɪˈdʒem.ɪ.nəl nɜːrv/',
    accent: 'US',
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
    accent: 'US',
    academicSource: "Terminologia Anatomica (TA2) & Gray's Anatomy"
  },
  cn_7: {
    id: 'cn_7',
    englishName: 'Facial Nerve (CN VII)',
    ipa: '/ˈfeɪ.ʃəl nɜːrv/',
    accent: 'US',
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
    accent: 'US',
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
    accent: 'US',
    academicSource: "Dorland's Medical Dictionary & Gray's Anatomy"
  }
};

/**
 * Normalizes an anatomy ID or English Name to locate pronunciation data
 */
export function getAnatomicalPronunciation(
  id?: string | null,
  englishName?: string | null
): PronunciationRecord | null {
  if (!id && !englishName) return null;

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
  }

  // 3. Exact or normalized English name match
  if (englishName) {
    const cleanEn = englishName.toLowerCase().trim();
    for (const record of Object.values(ANATOMY_PRONUNCIATION_DATABASE)) {
      if (record.englishName.toLowerCase() === cleanEn) return record;
    }

    // Partial contains match (e.g. "Left Central Incisor" -> contains "Central Incisor")
    for (const record of Object.values(ANATOMY_PRONUNCIATION_DATABASE)) {
      const recName = record.englishName.toLowerCase();
      if (cleanEn.includes(recName) && recName.length > 4) return record;
    }
  }

  // 4. FDI Tooth Resolution (tooth.11 - tooth.48)
  if (id && id.startsWith('tooth.')) {
    const fdi = parseInt(id.replace('tooth.', ''), 10);
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
