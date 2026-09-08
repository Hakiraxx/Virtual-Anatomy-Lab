// Full Specimen Dataset for MedAnatomy
export interface Hotspot {
  id: string;
  ta: string;
  position: [number, number, number];
  color?: string;
  visibility?: string;
}

export interface Condition {
  icd10: string;
  structure: string | null;
  nameEn: string;
  nameVi: string;
}

export interface AtelierOrgan {
  id: string;
  systemId: string;
  systemNameEn: string;
  systemNameVi: string;
  nameEn: string;
  nameVi: string;
  scientificName: string;
  accent: string;
  model: string;
  icon: string;
  thumbnail: string;
  conditions: Condition[];
  hotspots: Hotspot[];
}

export const ATELIER_ORGANS: AtelierOrgan[] = [
  {
    "id": "heart",
    "systemId": "cardiovascular",
    "systemNameEn": "Cardiovascular System",
    "systemNameVi": "Hệ tuần hoàn (Tim mạch)",
    "nameEn": "Heart",
    "nameVi": "Tim",
    "scientificName": "Cor",
    "accent": "#ee7c6a",
    "model": "/models/heart-v7.glb",
    "icon": "♥",
    "thumbnail": "/anatomy/heart/thumb.webp",
    "conditions": [
      {
        "icd10": "I25.1",
        "structure": "left-ventricle",
        "nameEn": "Coronary artery disease",
        "nameVi": "Bệnh động mạch vành"
      },
      {
        "icd10": "I49.9",
        "structure": "right-atrium",
        "nameEn": "Cardiac arrhythmia",
        "nameVi": "Rối loạn nhịp tim"
      },
      {
        "icd10": "I34–I37",
        "structure": "mitral",
        "nameEn": "Heart valve disorders",
        "nameVi": "Bệnh lý van tim"
      },
      {
        "icd10": "I50.9",
        "structure": "left-ventricle",
        "nameEn": "Heart failure",
        "nameVi": "Suy tim mạn tính"
      },
      {
        "icd10": "I42.9",
        "structure": "left-ventricle",
        "nameEn": "Cardiomyopathy",
        "nameVi": "Bệnh cơ tim"
      },
      {
        "icd10": "I40.9",
        "structure": null,
        "nameEn": "Acute myocarditis",
        "nameVi": "Viêm cơ tim cấp"
      },
      {
        "icd10": "I48",
        "structure": "left-atrium",
        "nameEn": "Atrial fibrillation",
        "nameVi": "Rung nhĩ"
      },
      {
        "icd10": "Q24.9",
        "structure": null,
        "nameEn": "Congenital heart defect",
        "nameVi": "Dị tật tim bẩm sinh"
      }
    ],
    "hotspots": [
      {
        "id": "aorta",
        "ta": "Aorta",
        "position": [
          0.32,
          1.07,
          0.18
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "truncus-pulmonalis",
        "ta": "Truncus pulmonalis",
        "position": [
          -0.25,
          1.26,
          0.26
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "vena-cava-superior",
        "ta": "Vena cava superior",
        "position": [
          1.07,
          0.75,
          -0.33
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "vena-cava-inferior",
        "ta": "Vena cava inferior",
        "position": [
          0.85,
          -0.62,
          -0.6
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "vv-pulmonales",
        "ta": "Venae pulmonales",
        "position": [
          -0.42,
          0.55,
          -0.71
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "left-atrium",
        "ta": "Atrium sinistrum",
        "position": [
          -0.71,
          0.35,
          -0.61
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "right-atrium",
        "ta": "Atrium dextrum",
        "position": [
          1.03,
          0.2,
          0.16
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "auricula-dextra",
        "ta": "Auricula dextra",
        "position": [
          0.66,
          0.58,
          0.26
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "auricula-sinistra",
        "ta": "Auricula sinistra",
        "position": [
          -0.43,
          0.9,
          0.2
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "left-ventricle",
        "ta": "Ventriculus sinister",
        "position": [
          -0.91,
          -0.79,
          0.45
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "right-ventricle",
        "ta": "Ventriculus dexter",
        "position": [
          0.32,
          -0.68,
          0.88
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "apex-cordis",
        "ta": "Apex cordis",
        "position": [
          -0.42,
          -1.52,
          0.23
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "sulcus-interventricularis-anterior",
        "ta": "Sulcus interventricularis anterior",
        "position": [
          -0.32,
          -1.29,
          0.68
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "sulcus-coronarius",
        "ta": "Sulcus coronarius",
        "position": [
          0.26,
          0.15,
          0.77
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "a-coronaria-sinistra",
        "ta": "Arteria coronaria sinistra",
        "position": [
          -0.45,
          0.45,
          0.49
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "a-coronaria-dextra",
        "ta": "Arteria coronaria dextra",
        "position": [
          0.62,
          0.04,
          0.55
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "r-interventricularis-anterior",
        "ta": "Ramus interventricularis anterior",
        "position": [
          -0.11,
          0.1,
          0.86
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "r-circumflexus",
        "ta": "Ramus circumflexus",
        "position": [
          -1.04,
          0.01,
          0.21
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "r-marginalis-dexter",
        "ta": "Ramus marginalis dexter",
        "position": [
          1.22,
          -0.64,
          0.44
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "v-cordis-magna",
        "ta": "Vena cordis magna",
        "position": [
          -0.29,
          -0.66,
          0.92
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "sinus-coronarius",
        "ta": "Sinus coronarius",
        "position": [
          -0.19,
          0.09,
          -0.92
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "arcus-aortae",
        "ta": "Arcus aortae",
        "position": [
          0.36,
          1.45,
          0.07
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "truncus-brachiocephalicus",
        "ta": "Truncus brachiocephalicus",
        "position": [
          0.54,
          1.79,
          -0.22
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "a-carotis-communis-sinistra",
        "ta": "Arteria carotis communis sinistra",
        "position": [
          0.16,
          1.87,
          0.04
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "a-subclavia-sinistra",
        "ta": "Arteria subclavia sinistra",
        "position": [
          -0.24,
          1.83,
          0.11
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "aorta-descendens",
        "ta": "Aorta descendens",
        "position": [
          0.02,
          0.85,
          -0.53
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "a-pulmonalis-dextra",
        "ta": "Arteria pulmonalis dextra",
        "position": [
          0.55,
          1.12,
          -0.23
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "a-pulmonalis-sinistra",
        "ta": "Arteria pulmonalis sinistra",
        "position": [
          -0.7,
          1.18,
          -0.1
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "mitral",
        "ta": "Valva atrioventricularis sinistra",
        "position": [
          -0.22,
          -0.19,
          0
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      },
      {
        "id": "valva-tricuspidalis",
        "ta": "Valva atrioventricularis dextra",
        "position": [
          0.43,
          -0.19,
          0.15
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      },
      {
        "id": "valva-aortica",
        "ta": "Valva aortae",
        "position": [
          0.05,
          0.38,
          0.08
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      },
      {
        "id": "septum-interventriculare",
        "ta": "Septum interventriculare",
        "position": [
          0,
          -0.57,
          0.15
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "brain",
    "systemId": "nervous",
    "systemNameEn": "Nervous System",
    "systemNameVi": "Hệ thần kinh",
    "nameEn": "Brain",
    "nameVi": "Não",
    "scientificName": "Encephalon",
    "accent": "#c58696",
    "model": "/models/brain.glb",
    "icon": "◉",
    "thumbnail": "/anatomy/brain/thumb.webp",
    "conditions": [
      {
        "icd10": "G43.9",
        "structure": null,
        "nameEn": "Condition G43.9",
        "nameVi": "Bệnh lý G43.9"
      },
      {
        "icd10": "I63.9",
        "structure": null,
        "nameEn": "Cerebral infarction (Stroke)",
        "nameVi": "Nhồi máu não (Đột quỵ)"
      },
      {
        "icd10": "G31.9",
        "structure": "temporal",
        "nameEn": "Condition G31.9",
        "nameVi": "Bệnh lý G31.9"
      },
      {
        "icd10": "G40.9",
        "structure": "temporal",
        "nameEn": "Epilepsy",
        "nameVi": "Động kinh"
      },
      {
        "icd10": "S06.9",
        "structure": "frontal",
        "nameEn": "Condition S06.9",
        "nameVi": "Bệnh lý S06.9"
      },
      {
        "icd10": "G03.9",
        "structure": null,
        "nameEn": "Condition G03.9",
        "nameVi": "Bệnh lý G03.9"
      },
      {
        "icd10": "G35",
        "structure": null,
        "nameEn": "Condition G35",
        "nameVi": "Bệnh lý G35"
      },
      {
        "icd10": "I67.1",
        "structure": null,
        "nameEn": "Condition I67.1",
        "nameVi": "Bệnh lý I67.1"
      }
    ],
    "hotspots": [
      {
        "id": "frontal",
        "ta": "Lobus frontalis",
        "position": [
          -1.25,
          0.76,
          1.11
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "parietal",
        "ta": "Lobus parietalis",
        "position": [
          0.47,
          1,
          1.02
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "temporal",
        "ta": "Lobus temporalis",
        "position": [
          -0.24,
          -0.67,
          1.25
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "lobus-occipitalis",
        "ta": "Lobus occipitalis",
        "position": [
          1.32,
          0.19,
          0.83
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "sulcus-centralis",
        "ta": "Sulcus centralis",
        "position": [
          -0.37,
          1.42,
          0.9
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "gyrus-precentralis",
        "ta": "Gyrus precentralis",
        "position": [
          -0.64,
          1.28,
          1.09
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "gyrus-postcentralis",
        "ta": "Gyrus postcentralis",
        "position": [
          -0.11,
          1.26,
          1.08
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "sulcus-lateralis",
        "ta": "Sulcus lateralis",
        "position": [
          -0.46,
          -0.03,
          1.33
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "fissura-longitudinalis",
        "ta": "Fissura longitudinalis cerebri",
        "position": [
          -0.39,
          1.69,
          0.01
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "cerebellum",
        "ta": "Cerebellum",
        "position": [
          1.1,
          -1.2,
          0.64
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "pons",
        "ta": "Pons",
        "position": [
          0.33,
          -1.32,
          0.17
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "medulla-oblongata",
        "ta": "Medulla oblongata",
        "position": [
          0.41,
          -1.67,
          0
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "mesencephalon",
        "ta": "Mesencephalon",
        "position": [
          0.04,
          -0.96,
          -0.08
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "bulbus-olfactorius",
        "ta": "Bulbus olfactorius",
        "position": [
          -1.11,
          -0.75,
          -0.07
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "chiasma-opticum",
        "ta": "Chiasma opticum",
        "position": [
          -0.7,
          -0.96,
          -0.12
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "corpus-callosum",
        "ta": "Corpus callosum",
        "position": [
          -0.19,
          0.35,
          0
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      },
      {
        "id": "thalamus",
        "ta": "Thalamus",
        "position": [
          0,
          -0.17,
          0
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "ventriculus-lateralis",
        "ta": "Ventriculus lateralis",
        "position": [
          -0.19,
          0.42,
          0.38
        ],
        "color": "#6393d8",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "lungs",
    "systemId": "respiratory",
    "systemNameEn": "Respiratory System",
    "systemNameVi": "Hệ hô hấp",
    "nameEn": "Lungs",
    "nameVi": "Phổi",
    "scientificName": "Pulmones",
    "accent": "#dd8f8b",
    "model": "/models/lungs.glb",
    "icon": "◍",
    "thumbnail": "/anatomy/lungs/thumb.webp",
    "conditions": [
      {
        "icd10": "J45.9",
        "structure": "bronchus",
        "nameEn": "Asthma",
        "nameVi": "Hen phế quản"
      },
      {
        "icd10": "J44.9",
        "structure": "bronchus",
        "nameEn": "Chronic obstructive pulmonary disease (COPD)",
        "nameVi": "Bệnh phổi tắc nghẽn mạn tính"
      },
      {
        "icd10": "J18.9",
        "structure": "base",
        "nameEn": "Pneumonia",
        "nameVi": "Viêm phổi cấp"
      },
      {
        "icd10": "I26.9",
        "structure": null,
        "nameEn": "Condition I26.9",
        "nameVi": "Bệnh lý I26.9"
      },
      {
        "icd10": "J84.1",
        "structure": "base",
        "nameEn": "Condition J84.1",
        "nameVi": "Bệnh lý J84.1"
      },
      {
        "icd10": "J40",
        "structure": "bronchus",
        "nameEn": "Condition J40",
        "nameVi": "Bệnh lý J40"
      },
      {
        "icd10": "E84.9",
        "structure": "bronchus",
        "nameEn": "Condition E84.9",
        "nameVi": "Bệnh lý E84.9"
      },
      {
        "icd10": "C34.9",
        "structure": "bronchus",
        "nameEn": "Malignant neoplasm of bronchus and lung",
        "nameVi": "Ung thư phế quản - phổi"
      }
    ],
    "hotspots": [
      {
        "id": "larynx",
        "ta": "Larynx",
        "position": [
          -0.01,
          1.69,
          0.16
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "trachea",
        "ta": "Trachea",
        "position": [
          0,
          1.15,
          0.14
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "cartilagines-tracheales",
        "ta": "Cartilagines tracheales",
        "position": [
          0,
          0.77,
          0.12
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "carina",
        "ta": "Carina tracheae",
        "position": [
          0.01,
          0.44,
          -0.1
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "bronchus",
        "ta": "Bronchus principalis",
        "position": [
          -0.11,
          0.18,
          0.22
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "bronchus-principalis-dexter",
        "ta": "Bronchus principalis dexter",
        "position": [
          -0.45,
          -0.05,
          0.04
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "bronchus-principalis-sinister",
        "ta": "Bronchus principalis sinister",
        "position": [
          0.49,
          -0.05,
          0.05
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "right-lung",
        "ta": "Pulmo dexter",
        "position": [
          -1.43,
          0.25,
          0.34
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "apex-pulmonis-dexter",
        "ta": "Apex pulmonis dextri",
        "position": [
          -0.72,
          1.13,
          0
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "lobus-superior-dexter",
        "ta": "Lobus superior pulmonis dextri",
        "position": [
          -1.03,
          0.75,
          0.4
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "fissura-horizontalis",
        "ta": "Fissura horizontalis",
        "position": [
          -1.02,
          0.1,
          0.88
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "lobus-medius-dexter",
        "ta": "Lobus medius pulmonis dextri",
        "position": [
          -0.6,
          -0.57,
          0.71
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "fissura-obliqua-dextra",
        "ta": "Fissura obliqua dextra",
        "position": [
          -1.46,
          -0.22,
          -0.65
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "lobus-inferior-dexter",
        "ta": "Lobus inferior pulmonis dextri",
        "position": [
          -1.41,
          -0.72,
          -0.85
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "hilum-pulmonis-dextrum",
        "ta": "Hilum pulmonis dextri",
        "position": [
          -0.26,
          0.18,
          -0.23
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "base",
        "ta": "Basis pulmonis",
        "position": [
          -0.94,
          -1.41,
          0.11
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "left-lung",
        "ta": "Pulmo sinister",
        "position": [
          1.39,
          0.26,
          0.33
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "apex-pulmonis-sinister",
        "ta": "Apex pulmonis sinistri",
        "position": [
          0.72,
          1.14,
          0.01
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "lobus-superior-sinister",
        "ta": "Lobus superior pulmonis sinistri",
        "position": [
          0.97,
          0.84,
          0.38
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "fissura-obliqua-sinistra",
        "ta": "Fissura obliqua sinistra",
        "position": [
          1.5,
          -0.16,
          -0.52
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "lobus-inferior-sinister",
        "ta": "Lobus inferior pulmonis sinistri",
        "position": [
          1.35,
          -0.72,
          -0.89
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "lingula",
        "ta": "Lingula pulmonis sinistri",
        "position": [
          0.94,
          -0.74,
          0.66
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "hilum-pulmonis-sinistrum",
        "ta": "Hilum pulmonis sinistri",
        "position": [
          0.28,
          0.21,
          -0.24
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "facies-diaphragmatica",
        "ta": "Facies diaphragmatica",
        "position": [
          0.92,
          -1.42,
          0
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "facies-costalis",
        "ta": "Facies costalis",
        "position": [
          -1.49,
          0.26,
          -0.05
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "facies-mediastinalis",
        "ta": "Facies mediastinalis",
        "position": [
          0.21,
          -0.27,
          -0.42
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-anterior",
        "ta": "Margo anterior",
        "position": [
          0.56,
          0.29,
          0.89
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-inferior",
        "ta": "Margo inferior",
        "position": [
          -1.07,
          -1.5,
          0.62
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "pleura-visceralis",
        "ta": "Pleura visceralis",
        "position": [
          1.58,
          -0.19,
          0.25
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "bronchioli",
        "ta": "Bronchioli",
        "position": [
          -0.91,
          0.08,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "alveoli",
        "ta": "Alveoli pulmonis",
        "position": [
          -0.98,
          -0.61,
          0.12
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "segmenta-bronchopulmonalia",
        "ta": "Segmenta bronchopulmonalia",
        "position": [
          0.91,
          0,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "liver",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Liver",
    "nameVi": "Gan",
    "scientificName": "Hepar",
    "accent": "#b86858",
    "model": "/models/liver.glb",
    "icon": "≈",
    "thumbnail": "/anatomy/liver/thumb.webp",
    "conditions": [
      {
        "icd10": "K76.0",
        "structure": null,
        "nameEn": "Condition K76.0",
        "nameVi": "Bệnh lý K76.0"
      },
      {
        "icd10": "B19.9",
        "structure": null,
        "nameEn": "Condition B19.9",
        "nameVi": "Bệnh lý B19.9"
      },
      {
        "icd10": "K74.6",
        "structure": null,
        "nameEn": "Other and unspecified cirrhosis of liver",
        "nameVi": "Xơ gan"
      },
      {
        "icd10": "K80.2",
        "structure": null,
        "nameEn": "Condition K80.2",
        "nameVi": "Bệnh lý K80.2"
      },
      {
        "icd10": "E83.1",
        "structure": null,
        "nameEn": "Condition E83.1",
        "nameVi": "Bệnh lý E83.1"
      },
      {
        "icd10": "C22.0",
        "structure": "right-lobe",
        "nameEn": "Condition C22.0",
        "nameVi": "Bệnh lý C22.0"
      },
      {
        "icd10": "K75.4",
        "structure": null,
        "nameEn": "Condition K75.4",
        "nameVi": "Bệnh lý K75.4"
      },
      {
        "icd10": "K76.6",
        "structure": "portal",
        "nameEn": "Condition K76.6",
        "nameVi": "Bệnh lý K76.6"
      }
    ],
    "hotspots": [
      {
        "id": "right-lobe",
        "ta": "Lobus hepatis dexter",
        "position": [
          -1.14,
          0.32,
          0.72
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "left-lobe",
        "ta": "Lobus hepatis sinister",
        "position": [
          1.07,
          0.69,
          0.2
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "lobus-caudatus",
        "ta": "Lobus caudatus",
        "position": [
          -0.14,
          0.43,
          -0.83
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "lobus-quadratus",
        "ta": "Lobus quadratus",
        "position": [
          -0.33,
          -0.79,
          0.21
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "facies-diaphragmatica",
        "ta": "Facies diaphragmatica",
        "position": [
          -0.69,
          1.18,
          0.05
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "facies-visceralis",
        "ta": "Facies visceralis",
        "position": [
          -0.75,
          -1.17,
          -0.27
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-inferior",
        "ta": "Margo inferior",
        "position": [
          -1.06,
          -1.52,
          0.57
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "area-nuda",
        "ta": "Area nuda",
        "position": [
          -0.7,
          1.07,
          -0.52
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "capsula-fibrosa",
        "ta": "Capsula fibrosa perivascularis",
        "position": [
          -1.79,
          0.06,
          0.3
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "lig-falciforme",
        "ta": "Ligamentum falciforme",
        "position": [
          0.15,
          0.83,
          0.52
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "lig-teres-hepatis",
        "ta": "Ligamentum teres hepatis",
        "position": [
          -0.1,
          -1.15,
          0.43
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "lig-venosum",
        "ta": "Ligamentum venosum",
        "position": [
          0.11,
          0.17,
          -0.72
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "lig-coronarium",
        "ta": "Ligamentum coronarium",
        "position": [
          -0.32,
          1.78,
          -0.34
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "fossa-vesicae-biliaris",
        "ta": "Fossa vesicae biliaris",
        "position": [
          -0.47,
          -1.4,
          0.18
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "porta-hepatis",
        "ta": "Porta hepatis",
        "position": [
          -0.03,
          -0.56,
          -0.34
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "portal",
        "ta": "Vena portae hepatis",
        "position": [
          -0.21,
          -0.78,
          -0.66
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "a-hepatica-propria",
        "ta": "Arteria hepatica propria",
        "position": [
          0.18,
          -0.66,
          -0.56
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "ductus-hepaticus-communis",
        "ta": "Ductus hepaticus communis",
        "position": [
          -0.12,
          -0.86,
          -0.03
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "ductus-choledochus",
        "ta": "Ductus choledochus",
        "position": [
          0.01,
          -1.56,
          -0.03
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "vv-hepaticae",
        "ta": "Venae hepaticae",
        "position": [
          -0.04,
          1.57,
          -0.28
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "vena-cava-inferior",
        "ta": "Vena cava inferior",
        "position": [
          -0.29,
          0.76,
          -0.79
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "impressio-gastrica",
        "ta": "Impressio gastrica",
        "position": [
          0.64,
          -0.32,
          -0.59
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "impressio-renalis",
        "ta": "Impressio renalis",
        "position": [
          -1.24,
          -0.76,
          -0.65
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "impressio-colica",
        "ta": "Impressio colica",
        "position": [
          -0.94,
          -1.49,
          -0.09
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "lobulus-hepaticus",
        "ta": "Lobulus hepatis",
        "position": [
          -0.91,
          0.19,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "v-centralis",
        "ta": "Vena centralis",
        "position": [
          0.6,
          0,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "sinusoides",
        "ta": "Vasa sinusoidea hepatis",
        "position": [
          -1.13,
          -0.46,
          0.1
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "segmenta-hepatis",
        "ta": "Segmenta hepatis",
        "position": [
          0.3,
          0.61,
          -0.1
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "kidneys",
    "systemId": "urinary",
    "systemNameEn": "Urinary System",
    "systemNameVi": "Hệ tiết niệu",
    "nameEn": "Kidneys",
    "nameVi": "Thận",
    "scientificName": "Renes",
    "accent": "#c96963",
    "model": "/models/kidneys.glb",
    "icon": "∞",
    "thumbnail": "/anatomy/kidneys/thumb.webp",
    "conditions": [
      {
        "icd10": "N20.0",
        "structure": "ureter",
        "nameEn": "Calculus of kidney (Nephrolithiasis)",
        "nameVi": "Sỏi thận"
      },
      {
        "icd10": "N18.9",
        "structure": "cortex",
        "nameEn": "Chronic kidney disease",
        "nameVi": "Bệnh thận mạn giai đoạn cuối"
      },
      {
        "icd10": "N39.0",
        "structure": null,
        "nameEn": "Condition N39.0",
        "nameVi": "Bệnh lý N39.0"
      },
      {
        "icd10": "N05.9",
        "structure": "cortex",
        "nameEn": "Condition N05.9",
        "nameVi": "Bệnh lý N05.9"
      },
      {
        "icd10": "Q61.3",
        "structure": null,
        "nameEn": "Condition Q61.3",
        "nameVi": "Bệnh lý Q61.3"
      },
      {
        "icd10": "I15.1",
        "structure": null,
        "nameEn": "Condition I15.1",
        "nameVi": "Bệnh lý I15.1"
      },
      {
        "icd10": "N17.9",
        "structure": "medulla",
        "nameEn": "Condition N17.9",
        "nameVi": "Bệnh lý N17.9"
      },
      {
        "icd10": "N04.9",
        "structure": "cortex",
        "nameEn": "Condition N04.9",
        "nameVi": "Bệnh lý N04.9"
      }
    ],
    "hotspots": [
      {
        "id": "ren-dexter",
        "ta": "Ren dexter",
        "position": [
          -0.99,
          0.06,
          0.37
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "ren-sinister",
        "ta": "Ren sinister",
        "position": [
          1.17,
          0.68,
          0.55
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "extremitas-superior",
        "ta": "Extremitas superior",
        "position": [
          -1.17,
          1.34,
          0.1
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "extremitas-inferior",
        "ta": "Extremitas inferior",
        "position": [
          -1.32,
          -0.96,
          0.08
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "margo-lateralis",
        "ta": "Margo lateralis",
        "position": [
          -1.89,
          -0.01,
          -0.01
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-medialis",
        "ta": "Margo medialis",
        "position": [
          -0.54,
          1.14,
          -0.28
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "facies-anterior",
        "ta": "Facies anterior",
        "position": [
          0.84,
          -0.59,
          0.6
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "facies-posterior",
        "ta": "Facies posterior",
        "position": [
          0.92,
          -0.54,
          -0.43
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "capsula-fibrosa",
        "ta": "Capsula fibrosa",
        "position": [
          -1.8,
          0.57,
          0.06
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "hilum-renale",
        "ta": "Hilum renale",
        "position": [
          -0.58,
          0.09,
          0.14
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "v-renalis",
        "ta": "Vena renalis",
        "position": [
          -0.21,
          0.19,
          0.4
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "a-renalis",
        "ta": "Arteria renalis",
        "position": [
          -0.26,
          0.15,
          -0.03
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "pelvis-renalis",
        "ta": "Pelvis renalis",
        "position": [
          -0.83,
          -0.54,
          -0.29
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "ureter",
        "ta": "Ureter dexter",
        "position": [
          -0.64,
          -1.2,
          0.27
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "ureter-sinister",
        "ta": "Ureter sinister",
        "position": [
          0.87,
          -1.01,
          0.16
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "v-renalis-sinistra",
        "ta": "Vena renalis sinistra",
        "position": [
          0.42,
          0.07,
          0.31
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "sinus-renalis",
        "ta": "Sinus renalis",
        "position": [
          1.1,
          0.28,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "calices-majores",
        "ta": "Calices renales majores",
        "position": [
          1.14,
          -0.42,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "calices-minores",
        "ta": "Calices renales minores",
        "position": [
          1.14,
          -1.06,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cortex",
        "ta": "Cortex renalis",
        "position": [
          -1.62,
          0.58,
          0.5
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "medulla",
        "ta": "Medulla renalis",
        "position": [
          -1.29,
          0.34,
          0.03
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "pyramides-renales",
        "ta": "Pyramides renales",
        "position": [
          -1.41,
          -0.56,
          0.14
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "columnae-renales",
        "ta": "Columnae renales",
        "position": [
          -1.1,
          -0.14,
          0.17
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "papilla-renalis",
        "ta": "Papilla renalis",
        "position": [
          -0.99,
          1.01,
          -0.12
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "nephron",
        "ta": "Nephronum",
        "position": [
          1.52,
          -0.61,
          0.07
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "ansa-nephroni",
        "ta": "Ansa nephroni",
        "position": [
          1.46,
          1.13,
          0.02
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "glomerulus",
        "ta": "Glomerulus",
        "position": [
          1.6,
          0.22,
          0.14
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "tubuli-renales",
        "ta": "Tubuli renales",
        "position": [
          1.44,
          -1.26,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "eyeball",
    "systemId": "sensory",
    "systemNameEn": "Sensory System",
    "systemNameVi": "Hệ giác quan",
    "nameEn": "Eye",
    "nameVi": "Mắt",
    "scientificName": "Bulbus oculi",
    "accent": "#7294b9",
    "model": "/models/eyeball.glb",
    "icon": "⊙",
    "thumbnail": "/anatomy/eyeball/thumb.webp",
    "conditions": [
      {
        "icd10": "H52.1",
        "structure": "cornea",
        "nameEn": "Condition H52.1",
        "nameVi": "Bệnh lý H52.1"
      },
      {
        "icd10": "H26.9",
        "structure": null,
        "nameEn": "Condition H26.9",
        "nameVi": "Bệnh lý H26.9"
      },
      {
        "icd10": "H40.9",
        "structure": "optic",
        "nameEn": "Condition H40.9",
        "nameVi": "Bệnh lý H40.9"
      },
      {
        "icd10": "H35.3",
        "structure": null,
        "nameEn": "Condition H35.3",
        "nameVi": "Bệnh lý H35.3"
      },
      {
        "icd10": "H33",
        "structure": null,
        "nameEn": "Condition H33",
        "nameVi": "Bệnh lý H33"
      },
      {
        "icd10": "H04.1",
        "structure": "cornea",
        "nameEn": "Condition H04.1",
        "nameVi": "Bệnh lý H04.1"
      },
      {
        "icd10": "H52.2",
        "structure": "cornea",
        "nameEn": "Condition H52.2",
        "nameVi": "Bệnh lý H52.2"
      },
      {
        "icd10": "H10.9",
        "structure": null,
        "nameEn": "Condition H10.9",
        "nameVi": "Bệnh lý H10.9"
      }
    ],
    "hotspots": [
      {
        "id": "cornea",
        "ta": "Cornea",
        "position": [
          -1.19,
          0.09,
          1.04
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "limbus-corneae",
        "ta": "Limbus corneae",
        "position": [
          -1.13,
          1.01,
          0.93
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "conjunctiva-bulbi",
        "ta": "Tunica conjunctiva bulbi",
        "position": [
          -1.14,
          1.25,
          0.31
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "camera-anterior",
        "ta": "Camera anterior bulbi",
        "position": [
          -0.74,
          0.13,
          0.98
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "iris",
        "ta": "Iris",
        "position": [
          -1.11,
          0.12,
          0.29
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "m-sphincter-pupillae",
        "ta": "Musculus sphincter pupillae",
        "position": [
          -0.87,
          0.42,
          0.64
        ],
        "color": "#f2a33b",
        "visibility": "internal"
      },
      {
        "id": "m-dilatator-pupillae",
        "ta": "Musculus dilatator pupillae",
        "position": [
          -0.78,
          0.83,
          0.56
        ],
        "color": "#f2a33b",
        "visibility": "internal"
      },
      {
        "id": "angulus-iridocornealis",
        "ta": "Angulus iridocornealis",
        "position": [
          -1.42,
          0.13,
          0.08
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "lens-crystallina",
        "ta": "Lens",
        "position": [
          -0.72,
          0.1,
          0.52
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "zonula-ciliaris",
        "ta": "Zonula ciliaris",
        "position": [
          -0.79,
          -0.45,
          0.57
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "corpus-ciliare",
        "ta": "Corpus ciliare",
        "position": [
          -0.87,
          -0.74,
          0.63
        ],
        "color": "#f2a33b",
        "visibility": "internal"
      },
      {
        "id": "camera-posterior",
        "ta": "Camera posterior bulbi",
        "position": [
          -0.41,
          -0.2,
          0.98
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "ora-serrata",
        "ta": "Ora serrata",
        "position": [
          -1.1,
          0.05,
          -0.64
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "corpus-vitreum",
        "ta": "Corpus vitreum",
        "position": [
          -0.08,
          0,
          0.02
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "retina",
        "ta": "Retina",
        "position": [
          -0.35,
          -0.06,
          -1.04
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "choroidea",
        "ta": "Choroidea",
        "position": [
          0.05,
          -1.02,
          -0.59
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "sclera",
        "ta": "Sclera",
        "position": [
          -0.01,
          0.9,
          -0.81
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "equator-bulbi",
        "ta": "Equator bulbi oculi",
        "position": [
          -0.09,
          1.32,
          -0.2
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "vasa-vorticosa",
        "ta": "Venae vorticosae",
        "position": [
          -0.32,
          -1.27,
          -0.37
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "discus-opticus",
        "ta": "Discus nervi optici",
        "position": [
          0.76,
          -0.13,
          -0.64
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "macula-lutea",
        "ta": "Macula lutea",
        "position": [
          0.36,
          -0.12,
          -1.03
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "a-centralis-retinae",
        "ta": "Arteria centralis retinae",
        "position": [
          0.99,
          -0.02,
          -0.82
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "vagina-nervi-optici",
        "ta": "Vagina externa nervi optici",
        "position": [
          1.41,
          -0.05,
          -0.97
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "optic",
        "ta": "Nervus opticus",
        "position": [
          1.53,
          -0.26,
          -1.35
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "intestine",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Intestine",
    "nameVi": "Ruột",
    "scientificName": "Intestinum",
    "accent": "#d78b77",
    "model": "/models/intestine.glb",
    "icon": "§",
    "thumbnail": "/anatomy/intestine/thumb.webp",
    "conditions": [
      {
        "icd10": "K58.9",
        "structure": "colon",
        "nameEn": "Condition K58.9",
        "nameVi": "Bệnh lý K58.9"
      },
      {
        "icd10": "K50–K52",
        "structure": "colon",
        "nameEn": "Condition K50–K52",
        "nameVi": "Bệnh lý K50–K52"
      },
      {
        "icd10": "K90.0",
        "structure": "jejunum",
        "nameEn": "Condition K90.0",
        "nameVi": "Bệnh lý K90.0"
      },
      {
        "icd10": "K57.3",
        "structure": "colon",
        "nameEn": "Condition K57.3",
        "nameVi": "Bệnh lý K57.3"
      },
      {
        "icd10": "K56.6",
        "structure": null,
        "nameEn": "Condition K56.6",
        "nameVi": "Bệnh lý K56.6"
      },
      {
        "icd10": "K63.5",
        "structure": "colon",
        "nameEn": "Condition K63.5",
        "nameVi": "Bệnh lý K63.5"
      },
      {
        "icd10": "K50.9",
        "structure": null,
        "nameEn": "Condition K50.9",
        "nameVi": "Bệnh lý K50.9"
      },
      {
        "icd10": "E73.9",
        "structure": "jejunum",
        "nameEn": "Condition E73.9",
        "nameVi": "Bệnh lý E73.9"
      }
    ],
    "hotspots": [
      {
        "id": "duodenum",
        "ta": "Duodenum",
        "position": [
          -0.49,
          0.84,
          0.44
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "flexura-duodenojejunalis",
        "ta": "Flexura duodenojejunalis",
        "position": [
          -0.48,
          0.58,
          -0.27
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "jejunum",
        "ta": "Jejunum",
        "position": [
          0.57,
          0.45,
          -0.41
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "ileum",
        "ta": "Ileum",
        "position": [
          0.42,
          -0.72,
          0.13
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "plicae-circulares",
        "ta": "Plicae circulares",
        "position": [
          0,
          0.19,
          -0.17
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "villi-intestinales",
        "ta": "Villi intestinales",
        "position": [
          0,
          -0.38,
          -0.61
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "noduli-lymphoidei-aggregati",
        "ta": "Noduli lymphoidei aggregati",
        "position": [
          0.08,
          -0.3,
          0.4
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "valva-ileocaecalis",
        "ta": "Valva ileocaecalis",
        "position": [
          0,
          -0.15,
          0.67
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "caecum",
        "ta": "Caecum",
        "position": [
          0.37,
          -0.42,
          1.29
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "appendix-vermiformis",
        "ta": "Appendix vermiformis",
        "position": [
          0.25,
          -0.8,
          0.95
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "colon-ascendens",
        "ta": "Colon ascendens",
        "position": [
          -0.38,
          0.17,
          1.42
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "flexura-coli-dextra",
        "ta": "Flexura coli dextra",
        "position": [
          -0.32,
          1.16,
          1.3
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "colon",
        "ta": "Intestinum crassum",
        "position": [
          0.38,
          1.49,
          0.69
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "colon-transversum",
        "ta": "Colon transversum",
        "position": [
          0.46,
          1.56,
          -0.57
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "flexura-coli-sinistra",
        "ta": "Flexura coli sinistra",
        "position": [
          -0.18,
          1.26,
          -1.32
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "colon-descendens",
        "ta": "Colon descendens",
        "position": [
          -0.4,
          0.21,
          -1.42
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "colon-sigmoideum",
        "ta": "Colon sigmoideum",
        "position": [
          0.31,
          -0.87,
          -0.92
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "rectum",
        "ta": "Rectum",
        "position": [
          0.07,
          -1.29,
          0.23
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "canalis-analis",
        "ta": "Canalis analis",
        "position": [
          0,
          -1.87,
          0
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "taeniae-coli",
        "ta": "Taeniae coli",
        "position": [
          0.44,
          0.04,
          1.41
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "haustra-coli",
        "ta": "Haustra coli",
        "position": [
          0.49,
          1.22,
          -1.08
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "plicae-semilunares",
        "ta": "Plicae semilunares coli",
        "position": [
          0,
          0.46,
          1.35
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "tunica-serosa",
        "ta": "Tunica serosa",
        "position": [
          0.59,
          0.45,
          0.35
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "tunica-mucosa",
        "ta": "Tunica mucosa",
        "position": [
          0,
          -0.08,
          -1.18
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "tunica-muscularis",
        "ta": "Tunica muscularis",
        "position": [
          0,
          -0.57,
          1.18
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "glandulae-intestinales",
        "ta": "Glandulae intestinales",
        "position": [
          0,
          0.84,
          -0.74
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "ampulla-recti",
        "ta": "Ampulla recti",
        "position": [
          0,
          -1.56,
          -0.34
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "tela-submucosa",
        "ta": "Tela submucosa",
        "position": [
          0,
          0.61,
          0.61
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "pancreas",
    "systemId": "endocrine",
    "systemNameEn": "Endocrine System",
    "systemNameVi": "Hệ nội tiết",
    "nameEn": "Pancreas",
    "nameVi": "Tụy",
    "scientificName": "Pancreas",
    "accent": "#c69a5e",
    "model": "/models/pancreas.glb",
    "icon": "◈",
    "thumbnail": "/anatomy/pancreas/thumb.webp",
    "conditions": [
      {
        "icd10": "K85.9",
        "structure": null,
        "nameEn": "Condition K85.9",
        "nameVi": "Bệnh lý K85.9"
      },
      {
        "icd10": "E10.9",
        "structure": "tail",
        "nameEn": "Condition E10.9",
        "nameVi": "Bệnh lý E10.9"
      },
      {
        "icd10": "C25.0",
        "structure": "head",
        "nameEn": "Condition C25.0",
        "nameVi": "Bệnh lý C25.0"
      },
      {
        "icd10": "E11.9",
        "structure": "tail",
        "nameEn": "Condition E11.9",
        "nameVi": "Bệnh lý E11.9"
      },
      {
        "icd10": "K86.8",
        "structure": null,
        "nameEn": "Condition K86.8",
        "nameVi": "Bệnh lý K86.8"
      },
      {
        "icd10": "K86.2",
        "structure": null,
        "nameEn": "Condition K86.2",
        "nameVi": "Bệnh lý K86.2"
      },
      {
        "icd10": "K85.1",
        "structure": "duct",
        "nameEn": "Condition K85.1",
        "nameVi": "Bệnh lý K85.1"
      },
      {
        "icd10": "D13.7",
        "structure": "tail",
        "nameEn": "Condition D13.7",
        "nameVi": "Bệnh lý D13.7"
      }
    ],
    "hotspots": [
      {
        "id": "head",
        "ta": "Caput pancreatis",
        "position": [
          -1.5,
          0.07,
          0.33
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "processus-uncinatus",
        "ta": "Processus uncinatus",
        "position": [
          -0.97,
          -0.85,
          -0.23
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "incisura-pancreatis",
        "ta": "Incisura pancreatis",
        "position": [
          -0.41,
          -0.63,
          -0.07
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "collum-pancreatis",
        "ta": "Collum pancreatis",
        "position": [
          -0.21,
          0.2,
          0.2
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "body",
        "ta": "Corpus pancreatis",
        "position": [
          0.44,
          0.17,
          0.16
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "tail",
        "ta": "Cauda pancreatis",
        "position": [
          1.63,
          0.54,
          -0.17
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "facies-anterior",
        "ta": "Facies anterior",
        "position": [
          0.11,
          0.36,
          0.15
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "facies-posterior",
        "ta": "Facies posterior",
        "position": [
          0.07,
          -0.09,
          -0.39
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "facies-inferior",
        "ta": "Facies inferior",
        "position": [
          0.25,
          -0.78,
          0.08
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-superior",
        "ta": "Margo superior",
        "position": [
          0.88,
          0.53,
          -0.19
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-anterior",
        "ta": "Margo anterior",
        "position": [
          0.24,
          -0.68,
          0.41
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "tuber-omentale",
        "ta": "Tuber omentale",
        "position": [
          -0.51,
          0.9,
          0.16
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "duct",
        "ta": "Ductus pancreaticus",
        "position": [
          0.23,
          0,
          -0.03
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "ductus-pancreaticus-accessorius",
        "ta": "Ductus pancreaticus accessorius",
        "position": [
          -0.99,
          0.49,
          0.1
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "ductus-interlobularis",
        "ta": "Ductus interlobularis",
        "position": [
          0.84,
          -0.1,
          0.1
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "ductuli-intercalati",
        "ta": "Ductuli intercalati",
        "position": [
          -0.61,
          -0.2,
          0.13
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "ampulla-hepatopancreatica",
        "ta": "Ampulla hepatopancreatica",
        "position": [
          -1.67,
          -0.34,
          -0.08
        ],
        "color": "#7fa88a",
        "visibility": "internal"
      },
      {
        "id": "m-sphincter-ampullae",
        "ta": "Musculus sphincter ampullae",
        "position": [
          -1.79,
          -0.69,
          0.15
        ],
        "color": "#7fa88a",
        "visibility": "internal"
      },
      {
        "id": "ductus-choledochus-pars-pancreatica",
        "ta": "Pars pancreatica ductus choledochi",
        "position": [
          -1.37,
          0.39,
          -0.2
        ],
        "color": "#7fa88a",
        "visibility": "internal"
      },
      {
        "id": "lobuli-pancreatis",
        "ta": "Lobuli pancreatis",
        "position": [
          1.29,
          -0.2,
          0.03
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "acini-pancreatici",
        "ta": "Acini pancreatici",
        "position": [
          -0.15,
          -0.2,
          -0.2
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "insulae-pancreaticae",
        "ta": "Insulae pancreaticae",
        "position": [
          1.44,
          0.25,
          0.13
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "skin",
    "systemId": "integumentary",
    "systemNameEn": "Integumentary System",
    "systemNameVi": "Hệ da và phần phụ",
    "nameEn": "Skin",
    "nameVi": "Da",
    "scientificName": "Integumentum commune",
    "accent": "#c99277",
    "model": "/models/skin.glb",
    "icon": "▦",
    "thumbnail": "/anatomy/skin/thumb.webp",
    "conditions": [
      {
        "icd10": "L20.9",
        "structure": "epidermis",
        "nameEn": "Condition L20.9",
        "nameVi": "Bệnh lý L20.9"
      },
      {
        "icd10": "L40.9",
        "structure": "epidermis",
        "nameEn": "Condition L40.9",
        "nameVi": "Bệnh lý L40.9"
      },
      {
        "icd10": "C43.9",
        "structure": "epidermis",
        "nameEn": "Condition C43.9",
        "nameVi": "Bệnh lý C43.9"
      },
      {
        "icd10": "L70.0",
        "structure": "follicle",
        "nameEn": "Condition L70.0",
        "nameVi": "Bệnh lý L70.0"
      },
      {
        "icd10": "L03.9",
        "structure": "hypodermis",
        "nameEn": "Condition L03.9",
        "nameVi": "Bệnh lý L03.9"
      },
      {
        "icd10": "L25.9",
        "structure": "epidermis",
        "nameEn": "Condition L25.9",
        "nameVi": "Bệnh lý L25.9"
      },
      {
        "icd10": "L71.9",
        "structure": "dermis",
        "nameEn": "Condition L71.9",
        "nameVi": "Bệnh lý L71.9"
      },
      {
        "icd10": "L80",
        "structure": "epidermis",
        "nameEn": "Condition L80",
        "nameVi": "Bệnh lý L80"
      }
    ],
    "hotspots": [
      {
        "id": "scapus-pili",
        "ta": "Scapus pili",
        "position": [
          1.02,
          1.13,
          1.06
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "stratum-corneum",
        "ta": "Stratum corneum",
        "position": [
          -1.37,
          1.29,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "porus-sudoriferus",
        "ta": "Porus sudoriferus",
        "position": [
          1.42,
          0.8,
          1.37
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "terminationes-nervorum-liberae",
        "ta": "Terminationes nervorum liberae",
        "position": [
          -0.15,
          1.14,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "epidermis",
        "ta": "Epidermis",
        "position": [
          -0.79,
          0.78,
          1.37
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "stratum-basale",
        "ta": "Stratum basale",
        "position": [
          -1.06,
          0.54,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "melanocyti",
        "ta": "Melanocyti",
        "position": [
          -0.15,
          0.54,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "corpusculum-tactus",
        "ta": "Corpusculum tactus",
        "position": [
          -1.82,
          0.54,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "stratum-papillare",
        "ta": "Stratum papillare",
        "position": [
          -0.38,
          0.24,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "gl-sebacea",
        "ta": "Glandula sebacea",
        "position": [
          0.3,
          0.3,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "dermis",
        "ta": "Dermis",
        "position": [
          -1.29,
          0.03,
          1.36
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "ductus-sudoriferus",
        "ta": "Ductus sudoriferus",
        "position": [
          1.37,
          0.06,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "m-arrector-pili",
        "ta": "Musculus arrector pili",
        "position": [
          0.23,
          -0.18,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "plexus-subpapillaris",
        "ta": "Plexus subpapillaris",
        "position": [
          -1.82,
          -0.24,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "stratum-reticulare",
        "ta": "Stratum reticulare",
        "position": [
          -0.76,
          -0.3,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "follicle",
        "ta": "Folliculus pili",
        "position": [
          0.7,
          -0.43,
          1.48
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "gl-sudorifera",
        "ta": "Glandula sudorifera",
        "position": [
          1.37,
          -0.9,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "bulbus-pili",
        "ta": "Bulbus pili",
        "position": [
          0.76,
          -0.96,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "hypodermis",
        "ta": "Tela subcutanea",
        "position": [
          -1.31,
          -1.15,
          1.38
        ],
        "color": "#7fa88a",
        "visibility": "sectioned"
      },
      {
        "id": "corpusculum-lamellosum",
        "ta": "Corpusculum lamellosum",
        "position": [
          -0.23,
          -1.2,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "plexus-cutaneus",
        "ta": "Plexus cutaneus",
        "position": [
          0.38,
          -1.32,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "panniculus-adiposus",
        "ta": "Panniculus adiposus",
        "position": [
          -0.76,
          -1.32,
          1.42
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "stomach",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Stomach",
    "nameVi": "Dạ dày",
    "scientificName": "Gaster",
    "accent": "#d98a72",
    "model": "/models/stomach.glb",
    "icon": "◗",
    "thumbnail": "/anatomy/stomach/thumb.webp",
    "conditions": [
      {
        "icd10": "K29.7",
        "structure": "body",
        "nameEn": "Condition K29.7",
        "nameVi": "Bệnh lý K29.7"
      },
      {
        "icd10": "K27.9",
        "structure": "duodenum",
        "nameEn": "Condition K27.9",
        "nameVi": "Bệnh lý K27.9"
      },
      {
        "icd10": "K21.9",
        "structure": "cardia",
        "nameEn": "Condition K21.9",
        "nameVi": "Bệnh lý K21.9"
      },
      {
        "icd10": "B98.0",
        "structure": "pylorus",
        "nameEn": "Condition B98.0",
        "nameVi": "Bệnh lý B98.0"
      },
      {
        "icd10": "K31.8",
        "structure": "pylorus",
        "nameEn": "Condition K31.8",
        "nameVi": "Bệnh lý K31.8"
      },
      {
        "icd10": "K30",
        "structure": null,
        "nameEn": "Condition K30",
        "nameVi": "Bệnh lý K30"
      },
      {
        "icd10": "K44.9",
        "structure": "cardia",
        "nameEn": "Condition K44.9",
        "nameVi": "Bệnh lý K44.9"
      },
      {
        "icd10": "C16.9",
        "structure": "body",
        "nameEn": "Condition C16.9",
        "nameVi": "Bệnh lý C16.9"
      }
    ],
    "hotspots": [
      {
        "id": "oesophagus-pars-abdominalis",
        "ta": "Pars abdominalis oesophagi",
        "position": [
          0.29,
          1.5,
          -0.54
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "cardia",
        "ta": "Cardia",
        "position": [
          0.28,
          1.42,
          -0.21
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "incisura-cardiaca",
        "ta": "Incisura cardiaca",
        "position": [
          -0.1,
          1.3,
          -0.7
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "fundus",
        "ta": "Fundus gastricus",
        "position": [
          -0.03,
          1.17,
          -0.94
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "body",
        "ta": "Corpus gastricum",
        "position": [
          1.18,
          -0.14,
          -0.74
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "curvatura-major",
        "ta": "Curvatura major",
        "position": [
          0.06,
          -0.32,
          -1.47
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "curvatura-minor",
        "ta": "Curvatura minor",
        "position": [
          0.21,
          0.73,
          -0.06
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "incisura-angularis",
        "ta": "Incisura angularis",
        "position": [
          0.18,
          -0.45,
          0.67
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "antrum-pyloricum",
        "ta": "Antrum pyloricum",
        "position": [
          0.05,
          -1.01,
          0.89
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "canalis-pyloricus",
        "ta": "Canalis pyloricus",
        "position": [
          0.44,
          -1.23,
          0.48
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "pylorus",
        "ta": "Pylorus",
        "position": [
          -0.19,
          -1.42,
          1.14
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "duodenum",
        "ta": "Bulbus duodeni",
        "position": [
          -0.27,
          -1.61,
          1.41
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "m-sphincter-pyloricus",
        "ta": "Musculus sphincter pyloricus",
        "position": [
          0.26,
          -1.14,
          1.35
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "paries-anterior",
        "ta": "Paries anterior",
        "position": [
          1.12,
          0.2,
          -0.37
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "paries-posterior",
        "ta": "Paries posterior",
        "position": [
          -0.27,
          0.4,
          -0.64
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "tunica-serosa",
        "ta": "Tunica serosa",
        "position": [
          0.32,
          1.2,
          0.2
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "plicae-gastricae",
        "ta": "Plicae gastricae",
        "position": [
          0,
          0,
          -0.53
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "tunica-mucosa",
        "ta": "Tunica mucosa",
        "position": [
          -0.13,
          0.61,
          -1.07
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "foveolae-gastricae",
        "ta": "Foveolae gastricae",
        "position": [
          -0.26,
          0.3,
          0.43
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "glandulae-gastricae",
        "ta": "Glandulae gastricae",
        "position": [
          -0.2,
          -0.15,
          0.78
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cellulae-parietales",
        "ta": "Cellulae parietales",
        "position": [
          -0.2,
          -0.53,
          -0.28
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cellulae-principales",
        "ta": "Cellulae principales",
        "position": [
          -0.05,
          -0.76,
          0.07
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "tela-submucosa",
        "ta": "Tela submucosa",
        "position": [
          0.13,
          -0.61,
          -1.07
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "tunica-muscularis",
        "ta": "Tunica muscularis",
        "position": [
          -0.51,
          -0.23,
          0.18
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "stratum-obliquum",
        "ta": "Stratum obliquum",
        "position": [
          -0.56,
          0.76,
          -0.36
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "spleen",
    "systemId": "lymphatic",
    "systemNameEn": "Lymphatic System",
    "systemNameVi": "Hệ bạch huyết",
    "nameEn": "Spleen",
    "nameVi": "Lách",
    "scientificName": "Splen",
    "accent": "#8b5a7a",
    "model": "/models/spleen.glb",
    "icon": "◐",
    "thumbnail": "/anatomy/spleen/thumb.webp",
    "conditions": [
      {
        "icd10": "R16.1",
        "structure": null,
        "nameEn": "Condition R16.1",
        "nameVi": "Bệnh lý R16.1"
      },
      {
        "icd10": "S36.0",
        "structure": "capsule",
        "nameEn": "Condition S36.0",
        "nameVi": "Bệnh lý S36.0"
      },
      {
        "icd10": "D73.1",
        "structure": "red-pulp",
        "nameEn": "Condition D73.1",
        "nameVi": "Bệnh lý D73.1"
      },
      {
        "icd10": "D73.5",
        "structure": "hilum",
        "nameEn": "Condition D73.5",
        "nameVi": "Bệnh lý D73.5"
      },
      {
        "icd10": "K76.6",
        "structure": "hilum",
        "nameEn": "Condition K76.6",
        "nameVi": "Bệnh lý K76.6"
      },
      {
        "icd10": "C85.9",
        "structure": null,
        "nameEn": "Condition C85.9",
        "nameVi": "Bệnh lý C85.9"
      },
      {
        "icd10": "D57.1",
        "structure": "red-pulp",
        "nameEn": "Condition D57.1",
        "nameVi": "Bệnh lý D57.1"
      },
      {
        "icd10": "D69.3",
        "structure": "red-pulp",
        "nameEn": "Condition D69.3",
        "nameVi": "Bệnh lý D69.3"
      }
    ],
    "hotspots": [
      {
        "id": "hilum",
        "ta": "Hilum splenicum",
        "position": [
          -0.02,
          -0.02,
          0.73
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "a-splenica",
        "ta": "Arteria splenica",
        "position": [
          0.16,
          0.56,
          0.98
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "v-splenica",
        "ta": "Vena splenica",
        "position": [
          -0.08,
          -0.6,
          0.67
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "notch",
        "ta": "Incisurae marginis superioris",
        "position": [
          0.01,
          1.89,
          0.11
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-superior",
        "ta": "Margo superior",
        "position": [
          0,
          1.79,
          -0.32
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "margo-inferior",
        "ta": "Margo inferior",
        "position": [
          0.03,
          -1.74,
          -0.17
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "extremitas-anterior",
        "ta": "Extremitas anterior",
        "position": [
          0.94,
          0.19,
          -0.14
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "extremitas-posterior",
        "ta": "Extremitas posterior",
        "position": [
          -0.95,
          0.19,
          -0.16
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "capsule",
        "ta": "Capsula splenica",
        "position": [
          0.15,
          0.84,
          -1.29
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "facies-diaphragmatica",
        "ta": "Facies diaphragmatica",
        "position": [
          -0.12,
          -0.04,
          -1.47
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "facies-gastrica",
        "ta": "Facies gastrica",
        "position": [
          -0.31,
          0.67,
          1.08
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "facies-renalis",
        "ta": "Facies renalis",
        "position": [
          0.17,
          -0.8,
          0.68
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "facies-colica",
        "ta": "Facies colica",
        "position": [
          -0.22,
          -1.26,
          0.7
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "red-pulp",
        "ta": "Pulpa rubra",
        "position": [
          -0.1,
          -0.3,
          -0.15
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "pulpa-alba",
        "ta": "Pulpa alba",
        "position": [
          0.1,
          0.38,
          -0.3
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "corpuscula-splenica",
        "ta": "Corpuscula splenica",
        "position": [
          0.16,
          -0.84,
          0.15
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "vagina-periarterialis",
        "ta": "Vagina periarterialis lymphoidea",
        "position": [
          0.24,
          1.14,
          0.65
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "zona-marginalis",
        "ta": "Zona marginalis",
        "position": [
          -0.24,
          -0.53,
          -0.44
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "sinus-venosi",
        "ta": "Sinus venosi",
        "position": [
          0.24,
          0.08,
          -0.65
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "trabeculae-splenicae",
        "ta": "Trabeculae splenicae",
        "position": [
          -0.2,
          0.84,
          0.3
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "gallbladder",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Gallbladder",
    "nameVi": "Túi mật",
    "scientificName": "Vesica biliaris",
    "accent": "#7d9b6e",
    "model": "/models/gallbladder.glb",
    "icon": "◊",
    "thumbnail": "/anatomy/gallbladder/thumb.webp",
    "conditions": [
      {
        "icd10": "K80.2",
        "structure": "body-gb",
        "nameEn": "Condition K80.2",
        "nameVi": "Bệnh lý K80.2"
      },
      {
        "icd10": "K81.9",
        "structure": "neck",
        "nameEn": "Condition K81.9",
        "nameVi": "Bệnh lý K81.9"
      },
      {
        "icd10": "K82.8",
        "structure": "body-gb",
        "nameEn": "Condition K82.8",
        "nameVi": "Bệnh lý K82.8"
      },
      {
        "icd10": "K82.8",
        "structure": "cystic-duct",
        "nameEn": "Condition K82.8",
        "nameVi": "Bệnh lý K82.8"
      },
      {
        "icd10": "K83.0",
        "structure": null,
        "nameEn": "Condition K83.0",
        "nameVi": "Bệnh lý K83.0"
      },
      {
        "icd10": "K83.1",
        "structure": "cystic-duct",
        "nameEn": "Condition K83.1",
        "nameVi": "Bệnh lý K83.1"
      },
      {
        "icd10": "K82.8",
        "structure": "body-gb",
        "nameEn": "Condition K82.8",
        "nameVi": "Bệnh lý K82.8"
      },
      {
        "icd10": "C23",
        "structure": "fundus",
        "nameEn": "Condition C23",
        "nameVi": "Bệnh lý C23"
      }
    ],
    "hotspots": [
      {
        "id": "fundus",
        "ta": "Fundus vesicae biliaris",
        "position": [
          -0.66,
          -0.66,
          1.16
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "body-gb",
        "ta": "Corpus vesicae biliaris",
        "position": [
          -0.75,
          -0.13,
          0.67
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "neck",
        "ta": "Collum vesicae biliaris",
        "position": [
          -0.5,
          0.54,
          -0.14
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "cystic-duct",
        "ta": "Ductus cysticus",
        "position": [
          -0.05,
          0.88,
          -0.81
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "bladder",
    "systemId": "urinary",
    "systemNameEn": "Urinary System",
    "systemNameVi": "Hệ tiết niệu",
    "nameEn": "Urinary Bladder",
    "nameVi": "Bàng quang",
    "scientificName": "Vesica urinaria",
    "accent": "#d98fa0",
    "model": "/models/bladder.glb",
    "icon": "○",
    "thumbnail": "/anatomy/bladder/thumb.webp",
    "conditions": [
      {
        "icd10": "N30.9",
        "structure": "trigone",
        "nameEn": "Condition N30.9",
        "nameVi": "Bệnh lý N30.9"
      },
      {
        "icd10": "N32.8",
        "structure": "detrusor",
        "nameEn": "Condition N32.8",
        "nameVi": "Bệnh lý N32.8"
      },
      {
        "icd10": "N21.0",
        "structure": "trigone",
        "nameEn": "Condition N21.0",
        "nameVi": "Bệnh lý N21.0"
      },
      {
        "icd10": "R32",
        "structure": "urethra",
        "nameEn": "Condition R32",
        "nameVi": "Bệnh lý R32"
      },
      {
        "icd10": "R33.9",
        "structure": "urethra",
        "nameEn": "Condition R33.9",
        "nameVi": "Bệnh lý R33.9"
      },
      {
        "icd10": "N30.1",
        "structure": "dome",
        "nameEn": "Condition N30.1",
        "nameVi": "Bệnh lý N30.1"
      },
      {
        "icd10": "N31.9",
        "structure": "detrusor",
        "nameEn": "Condition N31.9",
        "nameVi": "Bệnh lý N31.9"
      },
      {
        "icd10": "C67.9",
        "structure": "trigone",
        "nameEn": "Condition C67.9",
        "nameVi": "Bệnh lý C67.9"
      }
    ],
    "hotspots": [
      {
        "id": "dome",
        "ta": "Apex vesicae",
        "position": [
          0.01,
          1.06,
          0.46
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "ureter",
        "ta": "Ostium ureteris",
        "position": [
          -0.95,
          0.64,
          0.32
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "trigone",
        "ta": "Trigonum vesicae",
        "position": [
          0.26,
          -0.69,
          0.86
        ],
        "color": "#f2a33b",
        "visibility": "internal"
      },
      {
        "id": "detrusor",
        "ta": "Musculus detrusor vesicae",
        "position": [
          0.98,
          0.26,
          0.65
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "urethra",
        "ta": "Collum vesicae",
        "position": [
          0,
          -1,
          0.32
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "thyroid",
    "systemId": "endocrine",
    "systemNameEn": "Endocrine System",
    "systemNameVi": "Hệ nội tiết",
    "nameEn": "Thyroid Gland",
    "nameVi": "Tuyến giáp",
    "scientificName": "Glandula thyroidea",
    "accent": "#b5484f",
    "model": "/models/thyroid.glb",
    "icon": "⋈",
    "thumbnail": "/anatomy/thyroid/thumb.webp",
    "conditions": [
      {
        "icd10": "E03.9",
        "structure": "follicle",
        "nameEn": "Condition E03.9",
        "nameVi": "Bệnh lý E03.9"
      },
      {
        "icd10": "E05.9",
        "structure": "follicle",
        "nameEn": "Condition E05.9",
        "nameVi": "Bệnh lý E05.9"
      },
      {
        "icd10": "E04.9",
        "structure": "isthmus",
        "nameEn": "Condition E04.9",
        "nameVi": "Bệnh lý E04.9"
      },
      {
        "icd10": "E06.3",
        "structure": "follicle",
        "nameEn": "Condition E06.3",
        "nameVi": "Bệnh lý E06.3"
      },
      {
        "icd10": "E05.0",
        "structure": "follicle",
        "nameEn": "Condition E05.0",
        "nameVi": "Bệnh lý E05.0"
      },
      {
        "icd10": "E04.1",
        "structure": "right-lobe",
        "nameEn": "Condition E04.1",
        "nameVi": "Bệnh lý E04.1"
      },
      {
        "icd10": "E06.1",
        "structure": "follicle",
        "nameEn": "Condition E06.1",
        "nameVi": "Bệnh lý E06.1"
      },
      {
        "icd10": "C73",
        "structure": "right-lobe",
        "nameEn": "Condition C73",
        "nameVi": "Bệnh lý C73"
      }
    ],
    "hotspots": [
      {
        "id": "right-lobe",
        "ta": "Lobus dexter glandulae thyroideae",
        "position": [
          -1,
          0,
          -0.04
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "left-lobe",
        "ta": "Lobus sinister glandulae thyroideae",
        "position": [
          0.98,
          0,
          -0.05
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "isthmus",
        "ta": "Isthmus glandulae thyroideae",
        "position": [
          0,
          -0.38,
          -0.02
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "follicle",
        "ta": "Folliculi glandulae thyroideae",
        "position": [
          -0.9,
          0.6,
          0.3
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "skull",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Skull",
    "nameVi": "Hộp sọ",
    "scientificName": "Cranium",
    "accent": "#c4a982",
    "model": "/models/skull.glb",
    "icon": "⬠",
    "thumbnail": "/anatomy/skull/thumb.webp",
    "conditions": [
      {
        "icd10": "S02.9",
        "structure": "frontal",
        "nameEn": "Condition S02.9",
        "nameVi": "Bệnh lý S02.9"
      },
      {
        "icd10": "S06.0",
        "structure": null,
        "nameEn": "Condition S06.0",
        "nameVi": "Bệnh lý S06.0"
      },
      {
        "icd10": "Q75.0",
        "structure": "suture",
        "nameEn": "Condition Q75.0",
        "nameVi": "Bệnh lý Q75.0"
      },
      {
        "icd10": "M26.6",
        "structure": "mandible",
        "nameEn": "Condition M26.6",
        "nameVi": "Bệnh lý M26.6"
      },
      {
        "icd10": "J32.9",
        "structure": "maxilla",
        "nameEn": "Condition J32.9",
        "nameVi": "Bệnh lý J32.9"
      },
      {
        "icd10": "M81.9",
        "structure": null,
        "nameEn": "Condition M81.9",
        "nameVi": "Bệnh lý M81.9"
      },
      {
        "icd10": "D16.4",
        "structure": null,
        "nameEn": "Condition D16.4",
        "nameVi": "Bệnh lý D16.4"
      },
      {
        "icd10": "M88.0",
        "structure": "frontal",
        "nameEn": "Condition M88.0",
        "nameVi": "Bệnh lý M88.0"
      }
    ],
    "hotspots": [
      {
        "id": "frontal",
        "ta": "Os frontale",
        "position": [
          -0.28,
          0.71,
          1.07
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "orbit",
        "ta": "Orbita",
        "position": [
          -0.62,
          -0.13,
          1.05
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "zygomatic",
        "ta": "Os zygomaticum",
        "position": [
          -0.85,
          -0.38,
          1.14
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "maxilla",
        "ta": "Maxilla",
        "position": [
          -0.47,
          -0.62,
          0.95
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "mandible",
        "ta": "Mandibula",
        "position": [
          0.05,
          -1.05,
          0.71
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "suture",
        "ta": "Suturae cranii",
        "position": [
          -0.5,
          1.01,
          0.94
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "spine",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Vertebral Column",
    "nameVi": "Cột sống",
    "scientificName": "Columna vertebralis",
    "accent": "#b09a7c",
    "model": "/models/spine.glb",
    "icon": "⋮",
    "thumbnail": "/anatomy/spine/thumb.webp",
    "conditions": [
      {
        "icd10": "M51.2",
        "structure": "disc",
        "nameEn": "Intervertebral disc displacement",
        "nameVi": "Thoát vị đĩa đệm"
      },
      {
        "icd10": "M41.9",
        "structure": "thoracic",
        "nameEn": "Condition M41.9",
        "nameVi": "Bệnh lý M41.9"
      },
      {
        "icd10": "M48.0",
        "structure": "lumbar",
        "nameEn": "Condition M48.0",
        "nameVi": "Bệnh lý M48.0"
      },
      {
        "icd10": "M47.9",
        "structure": "cervical",
        "nameEn": "Condition M47.9",
        "nameVi": "Bệnh lý M47.9"
      },
      {
        "icd10": "M54.3",
        "structure": "lumbar",
        "nameEn": "Condition M54.3",
        "nameVi": "Bệnh lý M54.3"
      },
      {
        "icd10": "M43.1",
        "structure": "lumbar",
        "nameEn": "Condition M43.1",
        "nameVi": "Bệnh lý M43.1"
      },
      {
        "icd10": "M48.5",
        "structure": "thoracic",
        "nameEn": "Condition M48.5",
        "nameVi": "Bệnh lý M48.5"
      },
      {
        "icd10": "M45",
        "structure": "sacrum",
        "nameEn": "Condition M45",
        "nameVi": "Bệnh lý M45"
      }
    ],
    "hotspots": [
      {
        "id": "cervical",
        "ta": "Vertebrae cervicales",
        "position": [
          0.01,
          1.32,
          0.25
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "thoracic",
        "ta": "Vertebrae thoracicae",
        "position": [
          0.02,
          0.54,
          0.36
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "lumbar",
        "ta": "Vertebrae lumbales",
        "position": [
          0.01,
          -0.38,
          0.18
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "sacrum",
        "ta": "Os sacrum",
        "position": [
          0.06,
          -1.28,
          0.09
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "disc",
        "ta": "Discus intervertebralis",
        "position": [
          0.08,
          0.04,
          0.27
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "nerves",
    "systemId": "nervous",
    "systemNameEn": "Nervous System",
    "systemNameVi": "Hệ thần kinh",
    "nameEn": "Nervous System",
    "nameVi": "Hệ thần kinh",
    "scientificName": "Systema nervosum",
    "accent": "#c2a878",
    "model": "/models/nerves-md.glb",
    "icon": "⁂",
    "thumbnail": "/anatomy/nerves/thumb.webp",
    "conditions": [
      {
        "icd10": "G62.9",
        "structure": "nervi-spinales",
        "nameEn": "Condition G62.9",
        "nameVi": "Bệnh lý G62.9"
      },
      {
        "icd10": "G56.0",
        "structure": "nervi-spinales",
        "nameEn": "Condition G56.0",
        "nameVi": "Bệnh lý G56.0"
      },
      {
        "icd10": "G61.0",
        "structure": "nervi-spinales",
        "nameEn": "Condition G61.0",
        "nameVi": "Bệnh lý G61.0"
      },
      {
        "icd10": "G54.0",
        "structure": "nervi-spinales",
        "nameEn": "Condition G54.0",
        "nameVi": "Bệnh lý G54.0"
      },
      {
        "icd10": "G35",
        "structure": "medulla",
        "nameEn": "Condition G35",
        "nameVi": "Bệnh lý G35"
      },
      {
        "icd10": "G12.2",
        "structure": "medulla",
        "nameEn": "Condition G12.2",
        "nameVi": "Bệnh lý G12.2"
      },
      {
        "icd10": "G50.0",
        "structure": "encephalon",
        "nameEn": "Condition G50.0",
        "nameVi": "Bệnh lý G50.0"
      },
      {
        "icd10": "G51.0",
        "structure": "encephalon",
        "nameEn": "Condition G51.0",
        "nameVi": "Bệnh lý G51.0"
      }
    ],
    "hotspots": [
      {
        "id": "encephalon",
        "ta": "Encephalon",
        "position": [
          0,
          1.73,
          0.01
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      },
      {
        "id": "truncus-encephali",
        "ta": "Truncus encephali",
        "position": [
          0,
          1.39,
          0.06
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      },
      {
        "id": "plexus-brachialis",
        "ta": "Plexus brachialis",
        "position": [
          0.32,
          1.15,
          0.02
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "medulla",
        "ta": "Medulla spinalis",
        "position": [
          0,
          0.72,
          0.12
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "n-radialis",
        "ta": "Nervus radialis",
        "position": [
          0.64,
          0.75,
          -0.01
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "nn-intercostales",
        "ta": "Nervi intercostales",
        "position": [
          -0.29,
          0.66,
          -0.03
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "n-medianus",
        "ta": "Nervus medianus",
        "position": [
          0.58,
          0.33,
          -0.06
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "nervi-spinales",
        "ta": "Nervi spinales",
        "position": [
          -0.21,
          0.32,
          0.08
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "plexus-lumbalis",
        "ta": "Plexus lumbosacralis",
        "position": [
          0.32,
          0.05,
          -0.01
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "conus-medullaris",
        "ta": "Conus medullaris",
        "position": [
          -0.12,
          -0.07,
          0.02
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "nn-digitales-manus",
        "ta": "Nervi digitales palmares",
        "position": [
          0.78,
          -0.05,
          -0.15
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "n-ischiadicus",
        "ta": "Nervus ischiadicus",
        "position": [
          0.32,
          -0.38,
          0.1
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "cauda-equina",
        "ta": "Cauda equina",
        "position": [
          -0.17,
          -0.41,
          -0.03
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "n-femoralis",
        "ta": "Nervus femoralis",
        "position": [
          0.31,
          -0.73,
          0.01
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "n-tibialis",
        "ta": "Nervus tibialis",
        "position": [
          0.27,
          -1.18,
          0.12
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "nn-plantares",
        "ta": "Nervi plantares",
        "position": [
          0.33,
          -1.73,
          0.06
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "spinal-cord",
    "systemId": "nervous",
    "systemNameEn": "Nervous System",
    "systemNameVi": "Hệ thần kinh",
    "nameEn": "Spinal Cord",
    "nameVi": "Tủy sống",
    "scientificName": "Medulla spinalis",
    "accent": "#cbb9a4",
    "model": "/models/spinal-cord.glb",
    "icon": "⌇",
    "thumbnail": "/anatomy/spinal-cord/thumb.webp",
    "conditions": [
      {
        "icd10": "G95.9",
        "structure": null,
        "nameEn": "Condition G95.9",
        "nameVi": "Bệnh lý G95.9"
      },
      {
        "icd10": "S14.1",
        "structure": "cauda",
        "nameEn": "Condition S14.1",
        "nameVi": "Bệnh lý S14.1"
      },
      {
        "icd10": "G35",
        "structure": null,
        "nameEn": "Condition G35",
        "nameVi": "Bệnh lý G35"
      },
      {
        "icd10": "G82.2",
        "structure": null,
        "nameEn": "Condition G82.2",
        "nameVi": "Bệnh lý G82.2"
      },
      {
        "icd10": "M48.0",
        "structure": "radices",
        "nameEn": "Condition M48.0",
        "nameVi": "Bệnh lý M48.0"
      },
      {
        "icd10": "G95.0",
        "structure": null,
        "nameEn": "Condition G95.0",
        "nameVi": "Bệnh lý G95.0"
      },
      {
        "icd10": "G12.2",
        "structure": null,
        "nameEn": "Condition G12.2",
        "nameVi": "Bệnh lý G12.2"
      },
      {
        "icd10": "G83.4",
        "structure": "cauda",
        "nameEn": "Condition G83.4",
        "nameVi": "Bệnh lý G83.4"
      }
    ],
    "hotspots": [
      {
        "id": "dura-mater-spinalis",
        "ta": "Dura mater spinalis",
        "position": [
          -0.12,
          1.36,
          0.45
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "intumescentia-cervicalis",
        "ta": "Intumescentia cervicalis",
        "position": [
          -0.03,
          1.28,
          0.03
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "lig-denticulatum",
        "ta": "Ligamentum denticulatum",
        "position": [
          -0.2,
          1.33,
          -0.41
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "radices",
        "ta": "Radices nervorum spinalium",
        "position": [
          -0.08,
          0.96,
          -0.23
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "pars-cervicalis",
        "ta": "Pars cervicalis",
        "position": [
          -0.27,
          1.16,
          0.21
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "ganglion-spinale",
        "ta": "Ganglion sensorium n. spinalis",
        "position": [
          -0.28,
          0.77,
          -0.76
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "n-spinalis",
        "ta": "Nervus spinalis",
        "position": [
          -0.33,
          0.2,
          -0.81
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "funiculus",
        "ta": "Funiculi medullae spinalis",
        "position": [
          0,
          0.61,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "pars-thoracica",
        "ta": "Pars thoracica",
        "position": [
          0.39,
          0.24,
          0.22
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "substantia-grisea",
        "ta": "Substantia grisea",
        "position": [
          0,
          0,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "substantia-alba",
        "ta": "Substantia alba",
        "position": [
          -0.16,
          -0.23,
          0.13
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "intumescentia-lumbosacralis",
        "ta": "Intumescentia lumbosacralis",
        "position": [
          0.4,
          -0.29,
          -0.04
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "canalis-centralis",
        "ta": "Canalis centralis",
        "position": [
          0,
          -0.61,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "conus-medullaris",
        "ta": "Conus medullaris",
        "position": [
          0.52,
          -0.76,
          -0.13
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "cauda",
        "ta": "Cauda equina",
        "position": [
          0.65,
          -1.04,
          -0.04
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "filum-terminale",
        "ta": "Filum terminale",
        "position": [
          0.83,
          -1.8,
          -0.16
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "ear",
    "systemId": "sensory",
    "systemNameEn": "Sensory System",
    "systemNameVi": "Hệ giác quan",
    "nameEn": "Inner Ear",
    "nameVi": "Tai trong",
    "scientificName": "Auris",
    "accent": "#dcb87f",
    "model": "/models/ear.glb",
    "icon": "◑",
    "thumbnail": "/anatomy/ear/thumb.webp",
    "conditions": [
      {
        "icd10": "H90.3",
        "structure": "cochlea",
        "nameEn": "Condition H90.3",
        "nameVi": "Bệnh lý H90.3"
      },
      {
        "icd10": "H81.1",
        "structure": "canales",
        "nameEn": "Condition H81.1",
        "nameVi": "Bệnh lý H81.1"
      },
      {
        "icd10": "H81.0",
        "structure": "canales",
        "nameEn": "Condition H81.0",
        "nameVi": "Bệnh lý H81.0"
      },
      {
        "icd10": "H93.1",
        "structure": "cochlea",
        "nameEn": "Condition H93.1",
        "nameVi": "Bệnh lý H93.1"
      },
      {
        "icd10": "H80.9",
        "structure": "ossicula",
        "nameEn": "Condition H80.9",
        "nameVi": "Bệnh lý H80.9"
      },
      {
        "icd10": "H66.9",
        "structure": "ossicula",
        "nameEn": "Condition H66.9",
        "nameVi": "Bệnh lý H66.9"
      },
      {
        "icd10": "H91.1",
        "structure": "cochlea",
        "nameEn": "Condition H91.1",
        "nameVi": "Bệnh lý H91.1"
      },
      {
        "icd10": "H83.0",
        "structure": "cochlea",
        "nameEn": "Condition H83.0",
        "nameVi": "Bệnh lý H83.0"
      }
    ],
    "hotspots": [
      {
        "id": "crus-commune",
        "ta": "Crus osseum commune",
        "position": [
          -0.21,
          1.37,
          0.43
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "canalis-semicircularis-anterior",
        "ta": "Canalis semicircularis anterior",
        "position": [
          0.05,
          1.43,
          0.23
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "canales",
        "ta": "Canales semicirculares ossei",
        "position": [
          0.23,
          0.83,
          0.16
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "meatus-acusticus-internus",
        "ta": "Meatus acusticus internus",
        "position": [
          -0.88,
          0.77,
          0.04
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "canalis-semicircularis-lateralis",
        "ta": "Canalis semicircularis lateralis",
        "position": [
          -0.51,
          0.42,
          0.28
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "ampullae-osseae",
        "ta": "Ampullae osseae",
        "position": [
          -0.15,
          0.46,
          -0.43
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "canalis-semicircularis-posterior",
        "ta": "Canalis semicircularis posterior",
        "position": [
          0.59,
          0.02,
          -0.12
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "vestibulum",
        "ta": "Vestibulum",
        "position": [
          0.15,
          0.23,
          -0.06
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "utriculus",
        "ta": "Utriculus",
        "position": [
          0.35,
          0.46,
          -0.62
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "ossicula",
        "ta": "Fenestra vestibuli",
        "position": [
          0.68,
          0.28,
          0.76
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "sacculus",
        "ta": "Sacculus",
        "position": [
          -0.05,
          -0.15,
          -0.62
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "fenestra-cochleae",
        "ta": "Fenestra cochleae",
        "position": [
          0.88,
          -0.7,
          0.24
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "scala-vestibuli",
        "ta": "Scala vestibuli",
        "position": [
          -0.25,
          -0.68,
          0.43
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cochlea",
        "ta": "Cochlea",
        "position": [
          0.05,
          -0.68,
          -0.35
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "modiolus",
        "ta": "Modiolus",
        "position": [
          0.1,
          -1.14,
          -0.25
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "basis-cochleae",
        "ta": "Basis cochleae",
        "position": [
          0.63,
          -1.28,
          -0.28
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "organum-spirale",
        "ta": "Organum spirale",
        "position": [
          0.3,
          -0.76,
          -0.74
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "ductus-cochlearis",
        "ta": "Ductus cochlearis",
        "position": [
          -0.15,
          -1.37,
          -0.5
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "scala-tympani",
        "ta": "Scala tympani",
        "position": [
          0.3,
          -1.67,
          0.31
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cupula-cochleae",
        "ta": "Cupula cochleae",
        "position": [
          -0.54,
          -1.69,
          -0.06
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "larynx",
    "systemId": "respiratory",
    "systemNameEn": "Respiratory System",
    "systemNameVi": "Hệ hô hấp",
    "nameEn": "Larynx",
    "nameVi": "Thanh quản",
    "scientificName": "Larynx",
    "accent": "#e0a091",
    "model": "/models/larynx.glb",
    "icon": "◊",
    "thumbnail": "/anatomy/larynx/thumb.webp",
    "conditions": [
      {
        "icd10": "J38.0",
        "structure": "plicae",
        "nameEn": "Condition J38.0",
        "nameVi": "Bệnh lý J38.0"
      },
      {
        "icd10": "J04.0",
        "structure": "plicae",
        "nameEn": "Condition J04.0",
        "nameVi": "Bệnh lý J04.0"
      },
      {
        "icd10": "J38.1",
        "structure": "plicae",
        "nameEn": "Condition J38.1",
        "nameVi": "Bệnh lý J38.1"
      },
      {
        "icd10": "C32.9",
        "structure": "plicae",
        "nameEn": "Condition C32.9",
        "nameVi": "Bệnh lý C32.9"
      },
      {
        "icd10": "J38.5",
        "structure": "cartilago",
        "nameEn": "Condition J38.5",
        "nameVi": "Bệnh lý J38.5"
      },
      {
        "icd10": "J05.0",
        "structure": "cricoidea",
        "nameEn": "Condition J05.0",
        "nameVi": "Bệnh lý J05.0"
      },
      {
        "icd10": "R49.0",
        "structure": "plicae",
        "nameEn": "Condition R49.0",
        "nameVi": "Bệnh lý R49.0"
      },
      {
        "icd10": "J38.3",
        "structure": "cartilago",
        "nameEn": "Condition J38.3",
        "nameVi": "Bệnh lý J38.3"
      }
    ],
    "hotspots": [
      {
        "id": "epiglottis",
        "ta": "Cartilago epiglottica",
        "position": [
          -0.26,
          1.7,
          -0.03
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "membrana-thyrohyoidea",
        "ta": "Membrana thyrohyoidea",
        "position": [
          0.28,
          1.37,
          0.37
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "cornu-superius",
        "ta": "Cornu superius",
        "position": [
          -0.51,
          1.44,
          -0.51
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "cartilago-cuneiformis",
        "ta": "Cartilago cuneiformis",
        "position": [
          -0.51,
          1.1,
          0.44
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "prominentia",
        "ta": "Prominentia laryngea",
        "position": [
          0.84,
          0.76,
          -0.19
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "cartilago-corniculata",
        "ta": "Cartilago corniculata",
        "position": [
          -0.45,
          0.72,
          0.41
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "vestibulum-laryngis",
        "ta": "Vestibulum laryngis",
        "position": [
          -0.15,
          0.91,
          -0.1
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "plica-vestibularis",
        "ta": "Plica vestibularis",
        "position": [
          -0.04,
          0.46,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cartilago",
        "ta": "Cartilago thyroidea",
        "position": [
          0.51,
          0.37,
          -0.29
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "cartilago-arytenoidea",
        "ta": "Cartilago arytenoidea",
        "position": [
          -0.49,
          0.24,
          0.38
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "ventriculus-laryngis",
        "ta": "Ventriculus laryngis",
        "position": [
          -0.26,
          0.15,
          0.2
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "rima-glottidis",
        "ta": "Rima glottidis",
        "position": [
          0,
          -0.15,
          0.03
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "plicae",
        "ta": "Plicae vocales",
        "position": [
          0,
          -0.15,
          -0.36
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "lig-vocale",
        "ta": "Ligamentum vocale",
        "position": [
          0.34,
          -0.15,
          -0.33
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "m-vocalis",
        "ta": "Musculus vocalis",
        "position": [
          0.23,
          -0.53,
          -0.29
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "m-cricothyroideus",
        "ta": "Musculus cricothyroideus",
        "position": [
          0.52,
          -0.5,
          -0.19
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "lig-cricothyroideum",
        "ta": "Ligamentum cricothyroideum",
        "position": [
          0.65,
          -0.1,
          0.1
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "m-cricoarytenoideus-posterior",
        "ta": "Musculus cricoarytenoideus posterior",
        "position": [
          -0.53,
          -0.51,
          -0.23
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "cavitas-infraglottica",
        "ta": "Cavitas infraglottica",
        "position": [
          0,
          -0.76,
          0
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cornu-inferius",
        "ta": "Cornu inferius",
        "position": [
          -0.22,
          -0.78,
          -0.38
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "cricoidea",
        "ta": "Cartilago cricoidea",
        "position": [
          0.45,
          -0.91,
          0
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "trachea",
        "ta": "Trachea",
        "position": [
          0.28,
          -1.64,
          0.01
        ],
        "color": "#6393d8",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "diaphragm",
    "systemId": "respiratory",
    "systemNameEn": "Respiratory System",
    "systemNameVi": "Hệ hô hấp",
    "nameEn": "Diaphragm",
    "nameVi": "Cơ hoành",
    "scientificName": "Diaphragma",
    "accent": "#c25f52",
    "model": "/models/diaphragm.glb",
    "icon": "⌒",
    "thumbnail": "/anatomy/diaphragm/thumb.webp",
    "conditions": [
      {
        "icd10": "K44.9",
        "structure": "hiatus",
        "nameEn": "Condition K44.9",
        "nameVi": "Bệnh lý K44.9"
      },
      {
        "icd10": "J98.6",
        "structure": null,
        "nameEn": "Condition J98.6",
        "nameVi": "Bệnh lý J98.6"
      },
      {
        "icd10": "Q79.0",
        "structure": null,
        "nameEn": "Condition Q79.0",
        "nameVi": "Bệnh lý Q79.0"
      },
      {
        "icd10": "R06.6",
        "structure": "centrum",
        "nameEn": "Condition R06.6",
        "nameVi": "Bệnh lý R06.6"
      },
      {
        "icd10": "S27.8",
        "structure": null,
        "nameEn": "Condition S27.8",
        "nameVi": "Bệnh lý S27.8"
      },
      {
        "icd10": "Q79.1",
        "structure": null,
        "nameEn": "Condition Q79.1",
        "nameVi": "Bệnh lý Q79.1"
      },
      {
        "icd10": "J90",
        "structure": null,
        "nameEn": "Condition J90",
        "nameVi": "Bệnh lý J90"
      },
      {
        "icd10": "K44.0",
        "structure": "hiatus",
        "nameEn": "Condition K44.0",
        "nameVi": "Bệnh lý K44.0"
      }
    ],
    "hotspots": [
      {
        "id": "cupula-dextra",
        "ta": "Cupula dextra",
        "position": [
          -0.17,
          0.89,
          0.82
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "cupula-sinistra",
        "ta": "Cupula sinistra",
        "position": [
          -0.17,
          -0.88,
          0.87
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "centrum",
        "ta": "Centrum tendineum",
        "position": [
          -0.1,
          0.02,
          0.97
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "foramen-venae-cavae",
        "ta": "Foramen venae cavae",
        "position": [
          0.17,
          0.48,
          0.81
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "n-phrenicus",
        "ta": "Nervus phrenicus",
        "position": [
          -0.49,
          0.19,
          1.01
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "facies-thoracica",
        "ta": "Facies thoracica",
        "position": [
          -0.24,
          -0.61,
          0.94
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "pars-sternalis",
        "ta": "Pars sternalis",
        "position": [
          -0.96,
          0,
          0.4
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "trigonum-sternocostale",
        "ta": "Trigonum sternocostale",
        "position": [
          -0.76,
          0.71,
          0.24
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "pars-costalis",
        "ta": "Pars costalis",
        "position": [
          -0.59,
          1.62,
          0.11
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "hiatus",
        "ta": "Hiatus oesophageus",
        "position": [
          0.5,
          0.05,
          -0.27
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "facies-abdominalis",
        "ta": "Facies abdominalis",
        "position": [
          -0.13,
          -0.78,
          -0.18
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "trigonum-lumbocostale",
        "ta": "Trigonum lumbocostale",
        "position": [
          0.11,
          1.71,
          -0.19
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "lig-arcuatum-laterale",
        "ta": "Ligamentum arcuatum laterale",
        "position": [
          0.34,
          1.25,
          -0.15
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "pars-lumbalis",
        "ta": "Pars lumbalis",
        "position": [
          0.82,
          0.1,
          -0.48
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "crus",
        "ta": "Crus dextrum",
        "position": [
          0.95,
          0.4,
          -0.68
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "crus-sinistrum",
        "ta": "Crus sinistrum",
        "position": [
          0.95,
          -0.41,
          -0.68
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "lig-arcuatum-mediale",
        "ta": "Ligamentum arcuatum mediale",
        "position": [
          0.83,
          0.74,
          -0.17
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "hiatus-aorticus",
        "ta": "Hiatus aorticus",
        "position": [
          0.88,
          0.13,
          -0.82
        ],
        "color": "#6393d8",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "uterus",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Uterus",
    "nameVi": "Tử cung",
    "scientificName": "Uterus",
    "accent": "#dd8a9c",
    "model": "/models/uterus.glb",
    "icon": "♀",
    "thumbnail": "/anatomy/uterus/thumb.webp",
    "conditions": [
      {
        "icd10": "D25.9",
        "structure": "corpus",
        "nameEn": "Condition D25.9",
        "nameVi": "Bệnh lý D25.9"
      },
      {
        "icd10": "N80.9",
        "structure": null,
        "nameEn": "Condition N80.9",
        "nameVi": "Bệnh lý N80.9"
      },
      {
        "icd10": "N92.0",
        "structure": "endometrium",
        "nameEn": "Condition N92.0",
        "nameVi": "Bệnh lý N92.0"
      },
      {
        "icd10": "N71.9",
        "structure": "endometrium",
        "nameEn": "Condition N71.9",
        "nameVi": "Bệnh lý N71.9"
      },
      {
        "icd10": "C54.1",
        "structure": "endometrium",
        "nameEn": "Condition C54.1",
        "nameVi": "Bệnh lý C54.1"
      },
      {
        "icd10": "N70.9",
        "structure": "tuba",
        "nameEn": "Condition N70.9",
        "nameVi": "Bệnh lý N70.9"
      },
      {
        "icd10": "O00.1",
        "structure": "tuba",
        "nameEn": "Condition O00.1",
        "nameVi": "Bệnh lý O00.1"
      },
      {
        "icd10": "N97.1",
        "structure": "tuba",
        "nameEn": "Condition N97.1",
        "nameVi": "Bệnh lý N97.1"
      }
    ],
    "hotspots": [
      {
        "id": "corpus",
        "ta": "Corpus uteri",
        "position": [
          0,
          0.35,
          0.85
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "endometrium",
        "ta": "Endometrium",
        "position": [
          0,
          -0.1,
          0.5
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      },
      {
        "id": "tuba",
        "ta": "Tuba uterina",
        "position": [
          -0.58,
          0.49,
          0.48
        ],
        "color": "#6393d8",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "prostate",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Prostate",
    "nameVi": "Tuyến tiền liệt",
    "scientificName": "Prostata",
    "accent": "#c396a1",
    "model": "/models/prostate.glb",
    "icon": "◈",
    "thumbnail": "/anatomy/prostate/thumb.webp",
    "conditions": [
      {
        "icd10": "N40",
        "structure": "zona-transitionalis",
        "nameEn": "Condition N40",
        "nameVi": "Bệnh lý N40"
      },
      {
        "icd10": "C61",
        "structure": "zona-peripherica",
        "nameEn": "Condition C61",
        "nameVi": "Bệnh lý C61"
      },
      {
        "icd10": "N41.0",
        "structure": null,
        "nameEn": "Condition N41.0",
        "nameVi": "Bệnh lý N41.0"
      },
      {
        "icd10": "N41.1",
        "structure": null,
        "nameEn": "Condition N41.1",
        "nameVi": "Bệnh lý N41.1"
      },
      {
        "icd10": "N42.3",
        "structure": "zona-peripherica",
        "nameEn": "Condition N42.3",
        "nameVi": "Bệnh lý N42.3"
      },
      {
        "icd10": "R33.9",
        "structure": "urethra-prostatica",
        "nameEn": "Condition R33.9",
        "nameVi": "Bệnh lý R33.9"
      },
      {
        "icd10": "N42.8",
        "structure": null,
        "nameEn": "Condition N42.8",
        "nameVi": "Bệnh lý N42.8"
      },
      {
        "icd10": "N50.8",
        "structure": "vesicula",
        "nameEn": "Condition N50.8",
        "nameVi": "Bệnh lý N50.8"
      }
    ],
    "hotspots": [
      {
        "id": "zona-transitionalis",
        "ta": "Zona transitionalis",
        "position": [
          -0.31,
          0.47,
          1.55
        ],
        "color": "#f2a33b",
        "visibility": "internal"
      },
      {
        "id": "zona-peripherica",
        "ta": "Zona peripherica",
        "position": [
          0,
          -0.55,
          0.95
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "urethra-prostatica",
        "ta": "Pars prostatica urethrae",
        "position": [
          -0.32,
          1.69,
          1.5
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "vesicula",
        "ta": "Glandula vesiculosa",
        "position": [
          -1.05,
          0.65,
          0.35
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "adrenal",
    "systemId": "endocrine",
    "systemNameEn": "Endocrine System",
    "systemNameVi": "Hệ nội tiết",
    "nameEn": "Adrenal Glands",
    "nameVi": "Tuyến thượng thận",
    "scientificName": "Glandulae suprarenales",
    "accent": "#d29a4c",
    "model": "/models/adrenal.glb",
    "icon": "▲",
    "thumbnail": "/anatomy/adrenal/thumb.webp",
    "conditions": [
      {
        "icd10": "E27.1",
        "structure": "cortex",
        "nameEn": "Condition E27.1",
        "nameVi": "Bệnh lý E27.1"
      },
      {
        "icd10": "E24.9",
        "structure": "cortex",
        "nameEn": "Condition E24.9",
        "nameVi": "Bệnh lý E24.9"
      },
      {
        "icd10": "E26.0",
        "structure": "cortex",
        "nameEn": "Condition E26.0",
        "nameVi": "Bệnh lý E26.0"
      },
      {
        "icd10": "D35.0",
        "structure": "cortex",
        "nameEn": "Condition D35.0",
        "nameVi": "Bệnh lý D35.0"
      },
      {
        "icd10": "E27.5",
        "structure": "medulla-adrenal",
        "nameEn": "Condition E27.5",
        "nameVi": "Bệnh lý E27.5"
      },
      {
        "icd10": "D44.7",
        "structure": "medulla-adrenal",
        "nameEn": "Condition D44.7",
        "nameVi": "Bệnh lý D44.7"
      },
      {
        "icd10": "E25.0",
        "structure": "cortex",
        "nameEn": "Condition E25.0",
        "nameVi": "Bệnh lý E25.0"
      },
      {
        "icd10": "E27.4",
        "structure": "cortex",
        "nameEn": "Condition E27.4",
        "nameVi": "Bệnh lý E27.4"
      }
    ],
    "hotspots": [
      {
        "id": "capsula-fibrosa",
        "ta": "Capsula fibrosa",
        "position": [
          -0.27,
          0.41,
          -0.56
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "cortex",
        "ta": "Cortex glandulae suprarenalis",
        "position": [
          0.35,
          0.47,
          -0.73
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "zona-glomerulosa",
        "ta": "Zona glomerulosa",
        "position": [
          -0.68,
          0.32,
          -0.76
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "zona-fasciculata",
        "ta": "Zona fasciculata",
        "position": [
          -0.11,
          0.17,
          -1.14
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "zona-reticularis",
        "ta": "Zona reticularis",
        "position": [
          0.45,
          0.06,
          -0.76
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "sinusoides-corticales",
        "ta": "Vasa sinusoidea corticis",
        "position": [
          -0.79,
          0,
          -0.53
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "gl-suprarenalis",
        "ta": "Glandula suprarenalis",
        "position": [
          0.17,
          0.49,
          0.95
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "medulla-adrenal",
        "ta": "Medulla glandulae suprarenalis",
        "position": [
          0.14,
          0,
          0.95
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cellulae-chromaffines",
        "ta": "Cellulae chromaffines",
        "position": [
          -0.28,
          -0.05,
          0.68
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "cellulae-ganglionicae",
        "ta": "Cellulae ganglionicae sympathicae",
        "position": [
          -0.23,
          0.11,
          1.37
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      },
      {
        "id": "v-centralis-suprarenalis",
        "ta": "Vena centralis",
        "position": [
          0.56,
          0.02,
          1.22
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "stroma-reticulare",
        "ta": "Stroma reticulare",
        "position": [
          0.62,
          0.13,
          0.46
        ],
        "color": "#8d6bcc",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "pelvis",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Pelvis",
    "nameVi": "Khung chậu",
    "scientificName": "Pelvis",
    "accent": "#cdb493",
    "model": "/models/pelvis.glb",
    "icon": "⌂",
    "thumbnail": "/anatomy/pelvis/thumb.webp",
    "conditions": [
      {
        "icd10": "S32.8",
        "structure": "symphysis",
        "nameEn": "Condition S32.8",
        "nameVi": "Bệnh lý S32.8"
      },
      {
        "icd10": "M16.9",
        "structure": "acetabulum",
        "nameEn": "Osteoarthritis of hip",
        "nameVi": "Thoái hóa khớp háng"
      },
      {
        "icd10": "M46.1",
        "structure": "sacroiliaca",
        "nameEn": "Condition M46.1",
        "nameVi": "Bệnh lý M46.1"
      },
      {
        "icd10": "M45",
        "structure": "sacroiliaca",
        "nameEn": "Condition M45",
        "nameVi": "Bệnh lý M45"
      },
      {
        "icd10": "M81.9",
        "structure": null,
        "nameEn": "Condition M81.9",
        "nameVi": "Bệnh lý M81.9"
      },
      {
        "icd10": "Q65.9",
        "structure": "acetabulum",
        "nameEn": "Condition Q65.9",
        "nameVi": "Bệnh lý Q65.9"
      },
      {
        "icd10": "O26.7",
        "structure": "symphysis",
        "nameEn": "Condition O26.7",
        "nameVi": "Bệnh lý O26.7"
      },
      {
        "icd10": "C79.5",
        "structure": "ala",
        "nameEn": "Condition C79.5",
        "nameVi": "Bệnh lý C79.5"
      }
    ],
    "hotspots": [
      {
        "id": "ala",
        "ta": "Ala ossis ilii",
        "position": [
          -0.84,
          0.75,
          0.36
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "acetabulum",
        "ta": "Acetabulum",
        "position": [
          -1.1,
          -0.5,
          0.55
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "symphysis",
        "ta": "Symphysis pubica",
        "position": [
          0,
          -0.85,
          0.8
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "sacroiliaca",
        "ta": "Articulatio sacroiliaca",
        "position": [
          0.63,
          0.85,
          -1.69
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "muscle",
    "systemId": "muscular",
    "systemNameEn": "Muscular System",
    "systemNameVi": "Hệ cơ",
    "nameEn": "Skeletal Muscle",
    "nameVi": "Cơ vân",
    "scientificName": "Musculus skeletalis",
    "accent": "#bd5347",
    "model": "/models/muscle.glb",
    "icon": "⌁",
    "thumbnail": "/anatomy/muscle/thumb.webp",
    "conditions": [
      {
        "icd10": "M62.8",
        "structure": "venter",
        "nameEn": "Condition M62.8",
        "nameVi": "Bệnh lý M62.8"
      },
      {
        "icd10": "M77.9",
        "structure": "tendo",
        "nameEn": "Condition M77.9",
        "nameVi": "Bệnh lý M77.9"
      },
      {
        "icd10": "T79.6",
        "structure": "fascia",
        "nameEn": "Condition T79.6",
        "nameVi": "Bệnh lý T79.6"
      },
      {
        "icd10": "G71.0",
        "structure": "fasciculus",
        "nameEn": "Condition G71.0",
        "nameVi": "Bệnh lý G71.0"
      },
      {
        "icd10": "M60.9",
        "structure": "venter",
        "nameEn": "Condition M60.9",
        "nameVi": "Bệnh lý M60.9"
      },
      {
        "icd10": "M79.1",
        "structure": "fasciculus",
        "nameEn": "Condition M79.1",
        "nameVi": "Bệnh lý M79.1"
      },
      {
        "icd10": "M66.9",
        "structure": "tendo",
        "nameEn": "Condition M66.9",
        "nameVi": "Bệnh lý M66.9"
      },
      {
        "icd10": "M79.7",
        "structure": null,
        "nameEn": "Condition M79.7",
        "nameVi": "Bệnh lý M79.7"
      }
    ],
    "hotspots": [
      {
        "id": "venter",
        "ta": "Venter musculi",
        "position": [
          0,
          0.1,
          0.75
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "tendo",
        "ta": "Tendo",
        "position": [
          0.15,
          1.35,
          0.4
        ],
        "color": "#f2f0e8",
        "visibility": "surface"
      },
      {
        "id": "fasciculus",
        "ta": "Fasciculus muscularis",
        "position": [
          -0.45,
          -0.35,
          0.7
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "fascia",
        "ta": "Fascia musculi",
        "position": [
          0.5,
          0.6,
          0.65
        ],
        "color": "#6393d8",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "ribcage",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Thoracic Cage",
    "nameVi": "Lồng ngực",
    "scientificName": "Cavea thoracis",
    "accent": "#d3bb9c",
    "model": "/models/ribcage.glb",
    "icon": "⊞",
    "thumbnail": "/anatomy/ribcage/thumb.webp",
    "conditions": [
      {
        "icd10": "S22.3",
        "structure": "costa",
        "nameEn": "Condition S22.3",
        "nameVi": "Bệnh lý S22.3"
      },
      {
        "icd10": "M94.0",
        "structure": "cartilago-costalis",
        "nameEn": "Condition M94.0",
        "nameVi": "Bệnh lý M94.0"
      },
      {
        "icd10": "S22.5",
        "structure": "costa",
        "nameEn": "Condition S22.5",
        "nameVi": "Bệnh lý S22.5"
      },
      {
        "icd10": "Q67.6",
        "structure": "sternum",
        "nameEn": "Condition Q67.6",
        "nameVi": "Bệnh lý Q67.6"
      },
      {
        "icd10": "J93.9",
        "structure": "spatium",
        "nameEn": "Condition J93.9",
        "nameVi": "Bệnh lý J93.9"
      },
      {
        "icd10": "R09.1",
        "structure": "spatium",
        "nameEn": "Condition R09.1",
        "nameVi": "Bệnh lý R09.1"
      },
      {
        "icd10": "S22.2",
        "structure": "sternum",
        "nameEn": "Condition S22.2",
        "nameVi": "Bệnh lý S22.2"
      },
      {
        "icd10": "C79.5",
        "structure": "costa",
        "nameEn": "Condition C79.5",
        "nameVi": "Bệnh lý C79.5"
      }
    ],
    "hotspots": [
      {
        "id": "sternum",
        "ta": "Sternum",
        "position": [
          0,
          1.54,
          0.36
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "costa",
        "ta": "Costa",
        "position": [
          -1.18,
          0.09,
          0.23
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "cartilago-costalis",
        "ta": "Cartilago costalis",
        "position": [
          -0.59,
          -0.8,
          0.69
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "spatium",
        "ta": "Spatium intercostale",
        "position": [
          -1.23,
          -0.57,
          0.1
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "knee",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Knee Joint",
    "nameVi": "Khớp gối",
    "scientificName": "Articulatio genus",
    "accent": "#c9b9a1",
    "model": "/models/knee.glb",
    "icon": "⌾",
    "thumbnail": "/anatomy/knee/thumb.webp",
    "conditions": [
      {
        "icd10": "M17.9",
        "structure": "cartilago-articularis",
        "nameEn": "Osteoarthritis of knee",
        "nameVi": "Thoái hóa khớp gối"
      },
      {
        "icd10": "S83.2",
        "structure": "meniscus",
        "nameEn": "Condition S83.2",
        "nameVi": "Bệnh lý S83.2"
      },
      {
        "icd10": "S83.5",
        "structure": "lca",
        "nameEn": "Condition S83.5",
        "nameVi": "Bệnh lý S83.5"
      },
      {
        "icd10": "M22.2",
        "structure": "patella",
        "nameEn": "Condition M22.2",
        "nameVi": "Bệnh lý M22.2"
      },
      {
        "icd10": "M70.4",
        "structure": "patella",
        "nameEn": "Condition M70.4",
        "nameVi": "Bệnh lý M70.4"
      },
      {
        "icd10": "M71.2",
        "structure": null,
        "nameEn": "Condition M71.2",
        "nameVi": "Bệnh lý M71.2"
      },
      {
        "icd10": "S83.0",
        "structure": "patella",
        "nameEn": "Condition S83.0",
        "nameVi": "Bệnh lý S83.0"
      },
      {
        "icd10": "M00.9",
        "structure": "cartilago-articularis",
        "nameEn": "Condition M00.9",
        "nameVi": "Bệnh lý M00.9"
      }
    ],
    "hotspots": [
      {
        "id": "patella",
        "ta": "Patella",
        "position": [
          -0.03,
          0.31,
          0.8
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "meniscus",
        "ta": "Meniscus",
        "position": [
          -0.39,
          0,
          0.47
        ],
        "color": "#6393d8",
        "visibility": "internal"
      },
      {
        "id": "lca",
        "ta": "Ligamentum cruciatum anterius",
        "position": [
          0.06,
          -0.16,
          0.13
        ],
        "color": "#f2a33b",
        "visibility": "internal"
      },
      {
        "id": "cartilago-articularis",
        "ta": "Cartilago articularis",
        "position": [
          0.42,
          0.44,
          0.51
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "penis",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Penis",
    "nameVi": "Dương vật",
    "scientificName": "Penis",
    "accent": "#c2705f",
    "model": "/models/penis.glb",
    "icon": "⌇",
    "thumbnail": "/anatomy/penis/thumb.webp",
    "conditions": [
      {
        "icd10": "N48.4",
        "structure": "corpus-cavernosum",
        "nameEn": "Condition N48.4",
        "nameVi": "Bệnh lý N48.4"
      },
      {
        "icd10": "N47",
        "structure": "glans",
        "nameEn": "Condition N47",
        "nameVi": "Bệnh lý N47"
      },
      {
        "icd10": "N48.6",
        "structure": "corpus-cavernosum",
        "nameEn": "Condition N48.6",
        "nameVi": "Bệnh lý N48.6"
      },
      {
        "icd10": "N34.1",
        "structure": "urethra-spongiosa",
        "nameEn": "Condition N34.1",
        "nameVi": "Bệnh lý N34.1"
      },
      {
        "icd10": "N48.1",
        "structure": "glans",
        "nameEn": "Condition N48.1",
        "nameVi": "Bệnh lý N48.1"
      },
      {
        "icd10": "N48.3",
        "structure": "corpus-cavernosum",
        "nameEn": "Condition N48.3",
        "nameVi": "Bệnh lý N48.3"
      },
      {
        "icd10": "Q54.9",
        "structure": "urethra-spongiosa",
        "nameEn": "Condition Q54.9",
        "nameVi": "Bệnh lý Q54.9"
      },
      {
        "icd10": "C60.9",
        "structure": "glans",
        "nameEn": "Condition C60.9",
        "nameVi": "Bệnh lý C60.9"
      }
    ],
    "hotspots": [
      {
        "id": "corpus-cavernosum",
        "ta": "Corpus cavernosum penis",
        "position": [
          -0.3,
          0.6,
          0.55
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "corpus-spongiosum",
        "ta": "Corpus spongiosum penis",
        "position": [
          0.1,
          -0.25,
          0.6
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "urethra-spongiosa",
        "ta": "Pars spongiosa urethrae",
        "position": [
          0.4,
          -0.15,
          0.5
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "glans",
        "ta": "Glans penis",
        "position": [
          0.95,
          -0.5,
          0.4
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "testis",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Testis",
    "nameVi": "Tinh hoàn",
    "scientificName": "Testis",
    "accent": "#b98a6a",
    "model": "/models/testis.glb",
    "icon": "◔",
    "thumbnail": "/anatomy/testis/thumb.webp",
    "conditions": [
      {
        "icd10": "N44.0",
        "structure": "tunica",
        "nameEn": "Condition N44.0",
        "nameVi": "Bệnh lý N44.0"
      },
      {
        "icd10": "N45.9",
        "structure": "epididymis",
        "nameEn": "Condition N45.9",
        "nameVi": "Bệnh lý N45.9"
      },
      {
        "icd10": "N43.3",
        "structure": "tunica",
        "nameEn": "Condition N43.3",
        "nameVi": "Bệnh lý N43.3"
      },
      {
        "icd10": "Q53.9",
        "structure": "tubuli",
        "nameEn": "Condition Q53.9",
        "nameVi": "Bệnh lý Q53.9"
      },
      {
        "icd10": "C62.9",
        "structure": "tubuli",
        "nameEn": "Condition C62.9",
        "nameVi": "Bệnh lý C62.9"
      },
      {
        "icd10": "N50.8",
        "structure": "epididymis",
        "nameEn": "Condition N50.8",
        "nameVi": "Bệnh lý N50.8"
      },
      {
        "icd10": "I86.1",
        "structure": "ductus-deferens",
        "nameEn": "Condition I86.1",
        "nameVi": "Bệnh lý I86.1"
      },
      {
        "icd10": "N46.9",
        "structure": "tubuli",
        "nameEn": "Condition N46.9",
        "nameVi": "Bệnh lý N46.9"
      }
    ],
    "hotspots": [
      {
        "id": "tubuli",
        "ta": "Tubuli seminiferi contorti",
        "position": [
          -0.25,
          0.1,
          0.65
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "epididymis",
        "ta": "Epididymis",
        "position": [
          0.7,
          0.2,
          0.4
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "ductus-deferens",
        "ta": "Ductus deferens",
        "position": [
          0.45,
          0.95,
          0.3
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "tunica",
        "ta": "Tunica albuginea testis",
        "position": [
          -0.7,
          -0.35,
          0.5
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "vagina",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Vagina",
    "nameVi": "Âm đạo",
    "scientificName": "Vagina",
    "accent": "#c37f8e",
    "model": "/models/vagina.glb",
    "icon": "◡",
    "thumbnail": "/anatomy/vagina/thumb.webp",
    "conditions": [
      {
        "icd10": "N76.0",
        "structure": "rugae",
        "nameEn": "Condition N76.0",
        "nameVi": "Bệnh lý N76.0"
      },
      {
        "icd10": "B37.3",
        "structure": "rugae",
        "nameEn": "Condition B37.3",
        "nameVi": "Bệnh lý B37.3"
      },
      {
        "icd10": "N81.1",
        "structure": "vestibulum",
        "nameEn": "Condition N81.1",
        "nameVi": "Bệnh lý N81.1"
      },
      {
        "icd10": "N87.9",
        "structure": "cervix",
        "nameEn": "Condition N87.9",
        "nameVi": "Bệnh lý N87.9"
      },
      {
        "icd10": "N89.8",
        "structure": "rugae",
        "nameEn": "Condition N89.8",
        "nameVi": "Bệnh lý N89.8"
      },
      {
        "icd10": "N94.1",
        "structure": "vestibulum",
        "nameEn": "Condition N94.1",
        "nameVi": "Bệnh lý N94.1"
      },
      {
        "icd10": "Q52.4",
        "structure": "rugae",
        "nameEn": "Condition Q52.4",
        "nameVi": "Bệnh lý Q52.4"
      },
      {
        "icd10": "C53.9",
        "structure": "cervix",
        "nameEn": "Condition C53.9",
        "nameVi": "Bệnh lý C53.9"
      }
    ],
    "hotspots": [
      {
        "id": "cervix",
        "ta": "Portio vaginalis cervicis",
        "position": [
          0,
          1,
          0.45
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "rugae",
        "ta": "Rugae vaginales",
        "position": [
          0,
          0.15,
          0.6
        ],
        "color": "#f2a33b",
        "visibility": "internal"
      },
      {
        "id": "vestibulum",
        "ta": "Vestibulum vaginae",
        "position": [
          0,
          -0.85,
          0.5
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "clitoris",
        "ta": "Clitoris",
        "position": [
          0,
          -1.15,
          0.4
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "ovary",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Ovary",
    "nameVi": "Buồng trứng",
    "scientificName": "Ovarium",
    "accent": "#c795a8",
    "model": "/models/ovary.glb",
    "icon": "◍",
    "thumbnail": "/anatomy/ovary/thumb.webp",
    "conditions": [
      {
        "icd10": "E28.2",
        "structure": "cortex-ov",
        "nameEn": "Condition E28.2",
        "nameVi": "Bệnh lý E28.2"
      },
      {
        "icd10": "N83.2",
        "structure": "folliculus",
        "nameEn": "Condition N83.2",
        "nameVi": "Bệnh lý N83.2"
      },
      {
        "icd10": "N80.1",
        "structure": "cortex-ov",
        "nameEn": "Condition N80.1",
        "nameVi": "Bệnh lý N80.1"
      },
      {
        "icd10": "N83.0",
        "structure": "folliculus",
        "nameEn": "Condition N83.0",
        "nameVi": "Bệnh lý N83.0"
      },
      {
        "icd10": "E28.3",
        "structure": "cortex-ov",
        "nameEn": "Condition E28.3",
        "nameVi": "Bệnh lý E28.3"
      },
      {
        "icd10": "N83.5",
        "structure": null,
        "nameEn": "Condition N83.5",
        "nameVi": "Bệnh lý N83.5"
      },
      {
        "icd10": "C56",
        "structure": "cortex-ov",
        "nameEn": "Condition C56",
        "nameVi": "Bệnh lý C56"
      },
      {
        "icd10": "N97.0",
        "structure": "folliculus",
        "nameEn": "Condition N97.0",
        "nameVi": "Bệnh lý N97.0"
      }
    ],
    "hotspots": [
      {
        "id": "cortex-ov",
        "ta": "Cortex ovarii",
        "position": [
          -0.76,
          0.32,
          1.55
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "folliculus",
        "ta": "Folliculus ovaricus vesiculosus",
        "position": [
          0.03,
          0.53,
          1.14
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "corpus-luteum",
        "ta": "Corpus luteum",
        "position": [
          0.5,
          -0.2,
          0.55
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "medulla-ov",
        "ta": "Medulla ovarii",
        "position": [
          -0.28,
          -0.4,
          1.65
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      }
    ]
  },
  {
    "id": "uterine-tube",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Uterine tube",
    "nameVi": "Vòi tử cung",
    "scientificName": "Tuba uterina",
    "accent": "#bf8f9e",
    "model": "/models/uterine-tube.glb",
    "icon": "⌒",
    "thumbnail": "/anatomy/uterine-tube/thumb.webp",
    "conditions": [
      {
        "icd10": "N70.1",
        "structure": "ampulla",
        "nameEn": "Condition N70.1",
        "nameVi": "Bệnh lý N70.1"
      },
      {
        "icd10": "O00.1",
        "structure": "ampulla",
        "nameEn": "Condition O00.1",
        "nameVi": "Bệnh lý O00.1"
      },
      {
        "icd10": "N97.1",
        "structure": "isthmus-tu",
        "nameEn": "Condition N97.1",
        "nameVi": "Bệnh lý N97.1"
      },
      {
        "icd10": "N83.6",
        "structure": "ampulla",
        "nameEn": "Condition N83.6",
        "nameVi": "Bệnh lý N83.6"
      },
      {
        "icd10": "N70.0",
        "structure": "fimbriae",
        "nameEn": "Condition N70.0",
        "nameVi": "Bệnh lý N70.0"
      },
      {
        "icd10": "Q50.6",
        "structure": "infundibulum",
        "nameEn": "Condition Q50.6",
        "nameVi": "Bệnh lý Q50.6"
      },
      {
        "icd10": "N83.8",
        "structure": "fimbriae",
        "nameEn": "Condition N83.8",
        "nameVi": "Bệnh lý N83.8"
      },
      {
        "icd10": "Z30.2",
        "structure": "isthmus-tu",
        "nameEn": "Condition Z30.2",
        "nameVi": "Bệnh lý Z30.2"
      }
    ],
    "hotspots": [
      {
        "id": "isthmus-tu",
        "ta": "Isthmus tubae uterinae",
        "position": [
          -1,
          -0.2,
          0.4
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "ampulla",
        "ta": "Ampulla tubae uterinae",
        "position": [
          0.1,
          0.15,
          0.55
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "infundibulum",
        "ta": "Infundibulum tubae uterinae",
        "position": [
          1.79,
          -0.03,
          0.54
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "fimbriae",
        "ta": "Fimbriae tubae uterinae",
        "position": [
          0.82,
          -0.33,
          0.12
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "breast",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Breast",
    "nameVi": "Tuyến vú",
    "scientificName": "Glandula mammaria",
    "accent": "#c98f92",
    "model": "/models/breast.glb",
    "icon": "◕",
    "thumbnail": "/anatomy/breast/thumb.webp",
    "conditions": [
      {
        "icd10": "N60.1",
        "structure": "lobuli",
        "nameEn": "Condition N60.1",
        "nameVi": "Bệnh lý N60.1"
      },
      {
        "icd10": "N61",
        "structure": "ductus-lactiferi",
        "nameEn": "Condition N61",
        "nameVi": "Bệnh lý N61"
      },
      {
        "icd10": "D24",
        "structure": "lobuli",
        "nameEn": "Condition D24",
        "nameVi": "Bệnh lý D24"
      },
      {
        "icd10": "N64.5",
        "structure": "sinus-lactiferi",
        "nameEn": "Condition N64.5",
        "nameVi": "Bệnh lý N64.5"
      },
      {
        "icd10": "C50.9",
        "structure": "ductus-lactiferi",
        "nameEn": "Condition C50.9",
        "nameVi": "Bệnh lý C50.9"
      },
      {
        "icd10": "N62",
        "structure": "lobuli",
        "nameEn": "Condition N62",
        "nameVi": "Bệnh lý N62"
      },
      {
        "icd10": "N64.0",
        "structure": "sinus-lactiferi",
        "nameEn": "Condition N64.0",
        "nameVi": "Bệnh lý N64.0"
      },
      {
        "icd10": "O91.2",
        "structure": "ductus-lactiferi",
        "nameEn": "Condition O91.2",
        "nameVi": "Bệnh lý O91.2"
      }
    ],
    "hotspots": [
      {
        "id": "lobuli",
        "ta": "Lobuli glandulae mammariae",
        "position": [
          -0.55,
          0.6,
          0.5
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "ductus-lactiferi",
        "ta": "Ductus lactiferi",
        "position": [
          0.2,
          0.1,
          0.6
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "sinus-lactiferi",
        "ta": "Sinus lactiferi",
        "position": [
          0.9,
          -0.25,
          0.45
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "acini",
        "ta": "Acini glandulares",
        "position": [
          -0.75,
          -0.5,
          0.5
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "aortic-arch",
    "systemId": "cardiovascular",
    "systemNameEn": "Cardiovascular System",
    "systemNameVi": "Hệ tuần hoàn (Tim mạch)",
    "nameEn": "Aortic arch",
    "nameVi": "Quai động mạch chủ",
    "scientificName": "Arcus aortae",
    "accent": "#c26a5c",
    "model": "/models/aortic-arch.glb",
    "icon": "⌓",
    "thumbnail": "/anatomy/aortic-arch/thumb.webp",
    "conditions": [
      {
        "icd10": "I71.2",
        "structure": "arcus",
        "nameEn": "Condition I71.2",
        "nameVi": "Bệnh lý I71.2"
      },
      {
        "icd10": "I71.0",
        "structure": "descendens",
        "nameEn": "Condition I71.0",
        "nameVi": "Bệnh lý I71.0"
      },
      {
        "icd10": "Q25.1",
        "structure": "arcus",
        "nameEn": "Condition Q25.1",
        "nameVi": "Bệnh lý Q25.1"
      },
      {
        "icd10": "I70.0",
        "structure": "ascendens",
        "nameEn": "Condition I70.0",
        "nameVi": "Bệnh lý I70.0"
      },
      {
        "icd10": "I77.6",
        "structure": "arcus",
        "nameEn": "Condition I77.6",
        "nameVi": "Bệnh lý I77.6"
      },
      {
        "icd10": "I65.2",
        "structure": "carotis",
        "nameEn": "Condition I65.2",
        "nameVi": "Bệnh lý I65.2"
      },
      {
        "icd10": "Q25.4",
        "structure": "descendens",
        "nameEn": "Condition Q25.4",
        "nameVi": "Bệnh lý Q25.4"
      },
      {
        "icd10": "I74.1",
        "structure": "descendens",
        "nameEn": "Condition I74.1",
        "nameVi": "Bệnh lý I74.1"
      }
    ],
    "hotspots": [
      {
        "id": "ascendens",
        "ta": "Pars ascendens aortae",
        "position": [
          -0.16,
          -0.26,
          0.89
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "arcus",
        "ta": "Arcus aortae",
        "position": [
          0.05,
          0.6,
          0.5
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "truncus-brachiocephalicus",
        "ta": "Truncus brachiocephalicus",
        "position": [
          -0.4,
          1.05,
          0.45
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "carotis",
        "ta": "Arteria carotis communis sinistra",
        "position": [
          0.05,
          1.15,
          0.45
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "subclavia",
        "ta": "Arteria subclavia sinistra",
        "position": [
          0.15,
          0.84,
          0.35
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "descendens",
        "ta": "Pars descendens aortae",
        "position": [
          0.13,
          -0.45,
          0.99
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "circle-of-willis",
    "systemId": "cardiovascular",
    "systemNameEn": "Cardiovascular System",
    "systemNameVi": "Hệ tuần hoàn (Tim mạch)",
    "nameEn": "Cerebral arterial circle",
    "nameVi": "Vòng động mạch não",
    "scientificName": "Circulus arteriosus cerebri",
    "accent": "#c07a6d",
    "model": "/models/circle-of-willis.glb",
    "icon": "◎",
    "thumbnail": "/anatomy/circle-of-willis/thumb.webp",
    "conditions": [
      {
        "icd10": "I67.1",
        "structure": "communicans",
        "nameEn": "Condition I67.1",
        "nameVi": "Bệnh lý I67.1"
      },
      {
        "icd10": "I60.9",
        "structure": "communicans",
        "nameEn": "Condition I60.9",
        "nameVi": "Bệnh lý I60.9"
      },
      {
        "icd10": "I63.5",
        "structure": "cerebri-media",
        "nameEn": "Condition I63.5",
        "nameVi": "Bệnh lý I63.5"
      },
      {
        "icd10": "I65.2",
        "structure": "carotis-interna",
        "nameEn": "Condition I65.2",
        "nameVi": "Bệnh lý I65.2"
      },
      {
        "icd10": "Q28.3",
        "structure": "communicans",
        "nameEn": "Condition Q28.3",
        "nameVi": "Bệnh lý Q28.3"
      },
      {
        "icd10": "I67.8",
        "structure": "basilaris",
        "nameEn": "Condition I67.8",
        "nameVi": "Bệnh lý I67.8"
      },
      {
        "icd10": "G45.9",
        "structure": "cerebri-media",
        "nameEn": "Condition G45.9",
        "nameVi": "Bệnh lý G45.9"
      },
      {
        "icd10": "I66.0",
        "structure": "cerebri-media",
        "nameEn": "Condition I66.0",
        "nameVi": "Bệnh lý I66.0"
      }
    ],
    "hotspots": [
      {
        "id": "carotis-interna",
        "ta": "Arteria carotis interna",
        "position": [
          -1.83,
          0.23,
          0.13
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "cerebri-media",
        "ta": "Arteria cerebri media",
        "position": [
          -1.9,
          0.07,
          -0.14
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "cerebri-anterior",
        "ta": "Arteria cerebri anterior",
        "position": [
          -0.11,
          1.72,
          0.09
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "basilaris",
        "ta": "Arteria basilaris",
        "position": [
          -0.07,
          -1.71,
          0.33
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "communicans",
        "ta": "Arteria communicans anterior",
        "position": [
          -0.09,
          1.46,
          0.2
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "coronary-arteries",
    "systemId": "cardiovascular",
    "systemNameEn": "Cardiovascular System",
    "systemNameVi": "Hệ tuần hoàn (Tim mạch)",
    "nameEn": "Coronary arteries",
    "nameVi": "Động mạch vành",
    "scientificName": "Arteriae coronariae",
    "accent": "#c05a4e",
    "model": "/models/coronary-arteries.glb",
    "icon": "⌁",
    "thumbnail": "/anatomy/coronary-arteries/thumb.webp",
    "conditions": [
      {
        "icd10": "I25.1",
        "structure": "interventricularis-anterior",
        "nameEn": "Coronary artery disease",
        "nameVi": "Bệnh động mạch vành"
      },
      {
        "icd10": "I21.0",
        "structure": "interventricularis-anterior",
        "nameEn": "Condition I21.0",
        "nameVi": "Bệnh lý I21.0"
      },
      {
        "icd10": "I21.4",
        "structure": "circumflexa",
        "nameEn": "Condition I21.4",
        "nameVi": "Bệnh lý I21.4"
      },
      {
        "icd10": "I20.0",
        "structure": "dextra",
        "nameEn": "Condition I20.0",
        "nameVi": "Bệnh lý I20.0"
      },
      {
        "icd10": "I25.5",
        "structure": null,
        "nameEn": "Condition I25.5",
        "nameVi": "Bệnh lý I25.5"
      },
      {
        "icd10": "I24.0",
        "structure": "interventricularis-anterior",
        "nameEn": "Condition I24.0",
        "nameVi": "Bệnh lý I24.0"
      },
      {
        "icd10": "Q24.5",
        "structure": "ostium",
        "nameEn": "Condition Q24.5",
        "nameVi": "Bệnh lý Q24.5"
      },
      {
        "icd10": "I21.1",
        "structure": "dextra",
        "nameEn": "Condition I21.1",
        "nameVi": "Bệnh lý I21.1"
      }
    ],
    "hotspots": [
      {
        "id": "ostium",
        "ta": "Ostium arteriae coronariae",
        "position": [
          0.01,
          0.96,
          0.62
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "interventricularis-anterior",
        "ta": "Ramus interventricularis anterior",
        "position": [
          0.29,
          -0.58,
          1.38
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "circumflexa",
        "ta": "Ramus circumflexus",
        "position": [
          1.42,
          0.13,
          0.04
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "dextra",
        "ta": "Arteria coronaria dextra",
        "position": [
          -1.81,
          0.06,
          0.62
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "portal-vein",
    "systemId": "cardiovascular",
    "systemNameEn": "Cardiovascular System",
    "systemNameVi": "Hệ tuần hoàn (Tim mạch)",
    "nameEn": "Hepatic portal vein",
    "nameVi": "Tĩnh mạch cửa",
    "scientificName": "Vena portae hepatis",
    "accent": "#6e7fa8",
    "model": "/models/portal-vein.glb",
    "icon": "⑂",
    "thumbnail": "/anatomy/portal-vein/thumb.webp",
    "conditions": [
      {
        "icd10": "K76.6",
        "structure": "truncus-portae",
        "nameEn": "Condition K76.6",
        "nameVi": "Bệnh lý K76.6"
      },
      {
        "icd10": "I85.9",
        "structure": "v-splenica",
        "nameEn": "Condition I85.9",
        "nameVi": "Bệnh lý I85.9"
      },
      {
        "icd10": "K75.1",
        "structure": "truncus-portae",
        "nameEn": "Condition K75.1",
        "nameVi": "Bệnh lý K75.1"
      },
      {
        "icd10": "I81",
        "structure": "truncus-portae",
        "nameEn": "Condition I81",
        "nameVi": "Bệnh lý I81"
      },
      {
        "icd10": "K74.6",
        "structure": null,
        "nameEn": "Other and unspecified cirrhosis of liver",
        "nameVi": "Xơ gan"
      },
      {
        "icd10": "K76.5",
        "structure": "v-mesenterica",
        "nameEn": "Condition K76.5",
        "nameVi": "Bệnh lý K76.5"
      },
      {
        "icd10": "I82.0",
        "structure": "truncus-portae",
        "nameEn": "Condition I82.0",
        "nameVi": "Bệnh lý I82.0"
      },
      {
        "icd10": "K72.9",
        "structure": null,
        "nameEn": "Condition K72.9",
        "nameVi": "Bệnh lý K72.9"
      }
    ],
    "hotspots": [
      {
        "id": "v-mesenterica",
        "ta": "Vena mesenterica superior",
        "position": [
          -0.43,
          -0.94,
          0.05
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "v-splenica",
        "ta": "Vena splenica",
        "position": [
          0.6,
          -0.75,
          0.5
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "truncus-portae",
        "ta": "Truncus venae portae",
        "position": [
          0,
          -0.1,
          0.6
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "ramus-dexter",
        "ta": "Ramus dexter venae portae",
        "position": [
          -0.12,
          1.34,
          1.6
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "ramus-sinister",
        "ta": "Ramus sinister venae portae",
        "position": [
          0.07,
          0.53,
          0.41
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "leg-veins",
    "systemId": "cardiovascular",
    "systemNameEn": "Cardiovascular System",
    "systemNameVi": "Hệ tuần hoàn (Tim mạch)",
    "nameEn": "Leg veins",
    "nameVi": "Tĩnh mạch chi dưới",
    "scientificName": "Venae superficiales membri inferioris",
    "accent": "#6d84ad",
    "model": "/models/leg-veins.glb",
    "icon": "⌇",
    "thumbnail": "/anatomy/leg-veins/thumb.webp",
    "conditions": [
      {
        "icd10": "I83.9",
        "structure": "v-saphena-magna",
        "nameEn": "Condition I83.9",
        "nameVi": "Bệnh lý I83.9"
      },
      {
        "icd10": "I80.0",
        "structure": "v-saphena-parva",
        "nameEn": "Condition I80.0",
        "nameVi": "Bệnh lý I80.0"
      },
      {
        "icd10": "I87.2",
        "structure": "valvula",
        "nameEn": "Condition I87.2",
        "nameVi": "Bệnh lý I87.2"
      },
      {
        "icd10": "I83.0",
        "structure": "v-saphena-magna",
        "nameEn": "Condition I83.0",
        "nameVi": "Bệnh lý I83.0"
      },
      {
        "icd10": "I82.4",
        "structure": null,
        "nameEn": "Condition I82.4",
        "nameVi": "Bệnh lý I82.4"
      },
      {
        "icd10": "I83.1",
        "structure": "perforans",
        "nameEn": "Condition I83.1",
        "nameVi": "Bệnh lý I83.1"
      },
      {
        "icd10": "L97",
        "structure": "v-saphena-magna",
        "nameEn": "Condition L97",
        "nameVi": "Bệnh lý L97"
      },
      {
        "icd10": "I86.8",
        "structure": "perforans",
        "nameEn": "Condition I86.8",
        "nameVi": "Bệnh lý I86.8"
      }
    ],
    "hotspots": [
      {
        "id": "v-saphena-magna",
        "ta": "Vena saphena magna",
        "position": [
          -0.1,
          0.47,
          0.09
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "v-saphena-parva",
        "ta": "Vena saphena parva",
        "position": [
          0.43,
          -1.84,
          0.35
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "valvula",
        "ta": "Valvulae venosae",
        "position": [
          -0.1,
          -0.6,
          0.09
        ],
        "color": "#ee7c6a",
        "visibility": "internal"
      },
      {
        "id": "perforans",
        "ta": "Venae perforantes",
        "position": [
          -0.12,
          -1,
          0.08
        ],
        "color": "#d89bc4",
        "visibility": "internal"
      }
    ]
  },
  {
    "id": "brachial-plexus",
    "systemId": "nervous",
    "systemNameEn": "Nervous System",
    "systemNameVi": "Hệ thần kinh",
    "nameEn": "Brachial plexus",
    "nameVi": "Đám rối cánh tay",
    "scientificName": "Plexus brachialis",
    "accent": "#b5a184",
    "model": "/models/brachial-plexus.glb",
    "icon": "⋔",
    "thumbnail": "/anatomy/brachial-plexus/thumb.webp",
    "conditions": [
      {
        "icd10": "G54.0",
        "structure": "trunci",
        "nameEn": "Condition G54.0",
        "nameVi": "Bệnh lý G54.0"
      },
      {
        "icd10": "P14.0",
        "structure": "radices",
        "nameEn": "Condition P14.0",
        "nameVi": "Bệnh lý P14.0"
      },
      {
        "icd10": "S14.3",
        "structure": "radices",
        "nameEn": "Condition S14.3",
        "nameVi": "Bệnh lý S14.3"
      },
      {
        "icd10": "G56.1",
        "structure": "n-medianus",
        "nameEn": "Condition G56.1",
        "nameVi": "Bệnh lý G56.1"
      },
      {
        "icd10": "G56.2",
        "structure": "n-ulnaris",
        "nameEn": "Condition G56.2",
        "nameVi": "Bệnh lý G56.2"
      },
      {
        "icd10": "G54.5",
        "structure": "fasciculi",
        "nameEn": "Condition G54.5",
        "nameVi": "Bệnh lý G54.5"
      },
      {
        "icd10": "M54.1",
        "structure": "radices",
        "nameEn": "Condition M54.1",
        "nameVi": "Bệnh lý M54.1"
      },
      {
        "icd10": "G56.0",
        "structure": "n-medianus",
        "nameEn": "Condition G56.0",
        "nameVi": "Bệnh lý G56.0"
      }
    ],
    "hotspots": [
      {
        "id": "radices",
        "ta": "Radices plexus brachialis",
        "position": [
          -1.03,
          0.88,
          0.23
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "trunci",
        "ta": "Trunci plexus brachialis",
        "position": [
          -0.99,
          0.67,
          0.49
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "fasciculi",
        "ta": "Fasciculi plexus brachialis",
        "position": [
          0.12,
          0.55,
          0.72
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "n-medianus",
        "ta": "Nervus medianus",
        "position": [
          -0.2,
          -1.79,
          -0.8
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "n-ulnaris",
        "ta": "Nervus ulnaris",
        "position": [
          0.3,
          -1.24,
          -0.17
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "dentomaxillofacial",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Jaws and Teeth",
    "nameVi": "Răng hàm mặt",
    "scientificName": "Regio dentomaxillofacialis",
    "accent": "#d9c39b",
    "model": "/models/dentomaxillofacial.glb",
    "icon": "◇",
    "thumbnail": "/anatomy/dentomaxillofacial/thumb.webp",
    "conditions": [
      {
        "icd10": "K02.9",
        "structure": "dens-molaris",
        "nameEn": "Condition K02.9",
        "nameVi": "Bệnh lý K02.9"
      },
      {
        "icd10": "K05.3",
        "structure": null,
        "nameEn": "Condition K05.3",
        "nameVi": "Bệnh lý K05.3"
      },
      {
        "icd10": "K04.7",
        "structure": "dens-molaris",
        "nameEn": "Condition K04.7",
        "nameVi": "Bệnh lý K04.7"
      },
      {
        "icd10": "K07.6",
        "structure": "caput-mandibulae",
        "nameEn": "Condition K07.6",
        "nameVi": "Bệnh lý K07.6"
      },
      {
        "icd10": "K01.1",
        "structure": "dens-molaris",
        "nameEn": "Condition K01.1",
        "nameVi": "Bệnh lý K01.1"
      },
      {
        "icd10": "S02.6",
        "structure": "mandibula",
        "nameEn": "Condition S02.6",
        "nameVi": "Bệnh lý S02.6"
      },
      {
        "icd10": "K08.1",
        "structure": "dens-incisivus",
        "nameEn": "Condition K08.1",
        "nameVi": "Bệnh lý K08.1"
      },
      {
        "icd10": "K10.3",
        "structure": "maxilla",
        "nameEn": "Condition K10.3",
        "nameVi": "Bệnh lý K10.3"
      }
    ],
    "hotspots": [
      {
        "id": "mandibula",
        "ta": "Mandibula",
        "position": [
          0.01,
          -0.93,
          1.21
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "maxilla",
        "ta": "Maxilla",
        "position": [
          0.04,
          1.3,
          1.13
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "dens-incisivus",
        "ta": "Dens incisivus",
        "position": [
          0,
          -0.22,
          1.42
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "dens-molaris",
        "ta": "Dens molaris",
        "position": [
          -0.81,
          -0.23,
          -1.5
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "caput-mandibulae",
        "ta": "Caput mandibulae",
        "position": [
          -1.42,
          1.4,
          -1.66
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "tongue",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Tongue",
    "nameVi": "Lưỡi",
    "scientificName": "Lingua",
    "accent": "#dd7f88",
    "model": "/models/tongue.glb",
    "icon": "◡",
    "thumbnail": "/anatomy/tongue/thumb.webp",
    "conditions": [
      {
        "icd10": "K14.0",
        "structure": "dorsum",
        "nameEn": "Condition K14.0",
        "nameVi": "Bệnh lý K14.0"
      },
      {
        "icd10": "K14.3",
        "structure": "dorsum",
        "nameEn": "Condition K14.3",
        "nameVi": "Bệnh lý K14.3"
      },
      {
        "icd10": "C02.9",
        "structure": "radix",
        "nameEn": "Condition C02.9",
        "nameVi": "Bệnh lý C02.9"
      },
      {
        "icd10": "K14.4",
        "structure": "dorsum",
        "nameEn": "Condition K14.4",
        "nameVi": "Bệnh lý K14.4"
      },
      {
        "icd10": "B37.0",
        "structure": "dorsum",
        "nameEn": "Condition B37.0",
        "nameVi": "Bệnh lý B37.0"
      },
      {
        "icd10": "K14.1",
        "structure": "dorsum",
        "nameEn": "Condition K14.1",
        "nameVi": "Bệnh lý K14.1"
      },
      {
        "icd10": "R43.2",
        "structure": "papillae-vallatae",
        "nameEn": "Condition R43.2",
        "nameVi": "Bệnh lý R43.2"
      },
      {
        "icd10": "Q38.1",
        "structure": "apex",
        "nameEn": "Condition Q38.1",
        "nameVi": "Bệnh lý Q38.1"
      }
    ],
    "hotspots": [
      {
        "id": "apex",
        "ta": "Apex linguae",
        "position": [
          0.65,
          -1.83,
          0.11
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "dorsum",
        "ta": "Dorsum linguae",
        "position": [
          0,
          0.43,
          0.97
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "papillae-vallatae",
        "ta": "Papillae vallatae",
        "position": [
          0,
          1.19,
          0.96
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "radix",
        "ta": "Radix linguae",
        "position": [
          0,
          1.83,
          0.23
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "hand",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Bones of the Hand",
    "nameVi": "Xương bàn tay",
    "scientificName": "Ossa manus",
    "accent": "#d9c39b",
    "model": "/models/hand.glb",
    "icon": "✋",
    "thumbnail": "/anatomy/hand/thumb.webp",
    "conditions": [
      {
        "icd10": "S62.0",
        "structure": "scaphoideum",
        "nameEn": "Condition S62.0",
        "nameVi": "Bệnh lý S62.0"
      },
      {
        "icd10": "G56.0",
        "structure": "carpus",
        "nameEn": "Condition G56.0",
        "nameVi": "Bệnh lý G56.0"
      },
      {
        "icd10": "M65.3",
        "structure": "phalanges",
        "nameEn": "Condition M65.3",
        "nameVi": "Bệnh lý M65.3"
      },
      {
        "icd10": "S62.3",
        "structure": "metacarpus",
        "nameEn": "Condition S62.3",
        "nameVi": "Bệnh lý S62.3"
      },
      {
        "icd10": "M19.0",
        "structure": "metacarpus",
        "nameEn": "Condition M19.0",
        "nameVi": "Bệnh lý M19.0"
      },
      {
        "icd10": "M06.9",
        "structure": "phalanges",
        "nameEn": "Condition M06.9",
        "nameVi": "Bệnh lý M06.9"
      },
      {
        "icd10": "M18.9",
        "structure": "carpus",
        "nameEn": "Condition M18.9",
        "nameVi": "Bệnh lý M18.9"
      },
      {
        "icd10": "M72.0",
        "structure": null,
        "nameEn": "Condition M72.0",
        "nameVi": "Bệnh lý M72.0"
      }
    ],
    "hotspots": [
      {
        "id": "carpus",
        "ta": "Ossa carpi",
        "position": [
          -0.02,
          -1.04,
          -0.07
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "metacarpus",
        "ta": "Ossa metacarpi",
        "position": [
          -0.04,
          -0.19,
          -0.12
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "phalanges",
        "ta": "Phalanges",
        "position": [
          -0.15,
          1.89,
          0.32
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "scaphoideum",
        "ta": "Os scaphoideum",
        "position": [
          -0.42,
          -0.95,
          -0.08
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "oesophagus",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Oesophagus",
    "nameVi": "Thực quản",
    "scientificName": "Oesophagus",
    "accent": "#cf9a9f",
    "model": "/models/oesophagus.glb",
    "icon": "❘",
    "thumbnail": "/anatomy/oesophagus/thumb.webp",
    "conditions": [
      {
        "icd10": "K21.0",
        "structure": "junctio",
        "nameEn": "Condition K21.0",
        "nameVi": "Bệnh lý K21.0"
      },
      {
        "icd10": "K22.0",
        "structure": "junctio",
        "nameEn": "Condition K22.0",
        "nameVi": "Bệnh lý K22.0"
      },
      {
        "icd10": "I85.9",
        "structure": "junctio",
        "nameEn": "Condition I85.9",
        "nameVi": "Bệnh lý I85.9"
      },
      {
        "icd10": "C15.9",
        "structure": "pars-thoracica",
        "nameEn": "Condition C15.9",
        "nameVi": "Bệnh lý C15.9"
      },
      {
        "icd10": "K22.1",
        "structure": "pars-thoracica",
        "nameEn": "Condition K22.1",
        "nameVi": "Bệnh lý K22.1"
      },
      {
        "icd10": "K44.9",
        "structure": "hiatus",
        "nameEn": "Condition K44.9",
        "nameVi": "Bệnh lý K44.9"
      },
      {
        "icd10": "K22.2",
        "structure": "pars-cervicalis",
        "nameEn": "Condition K22.2",
        "nameVi": "Bệnh lý K22.2"
      },
      {
        "icd10": "K20",
        "structure": null,
        "nameEn": "Condition K20",
        "nameVi": "Bệnh lý K20"
      }
    ],
    "hotspots": [
      {
        "id": "pars-cervicalis",
        "ta": "Pars cervicalis oesophagi",
        "position": [
          0,
          1.89,
          0.07
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "pars-thoracica",
        "ta": "Pars thoracica oesophagi",
        "position": [
          0,
          0.28,
          0.15
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "hiatus",
        "ta": "Hiatus oesophageus",
        "position": [
          0,
          -0.95,
          -0.03
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "junctio",
        "ta": "Junctio oesophagogastrica",
        "position": [
          -0.1,
          -1.9,
          0.13
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "appendix",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Caecum and Appendix",
    "nameVi": "Manh tràng và Ruột thừa",
    "scientificName": "Appendix vermiformis",
    "accent": "#d98a72",
    "model": "/models/appendix.glb",
    "icon": "∾",
    "thumbnail": "/anatomy/appendix/thumb.webp",
    "conditions": [
      {
        "icd10": "K35.80",
        "structure": "base",
        "nameEn": "Condition K35.80",
        "nameVi": "Bệnh lý K35.80"
      },
      {
        "icd10": "K35.3",
        "structure": "apex",
        "nameEn": "Condition K35.3",
        "nameVi": "Bệnh lý K35.3"
      },
      {
        "icd10": "K38.1",
        "structure": "base",
        "nameEn": "Condition K38.1",
        "nameVi": "Bệnh lý K38.1"
      },
      {
        "icd10": "K36",
        "structure": null,
        "nameEn": "Condition K36",
        "nameVi": "Bệnh lý K36"
      },
      {
        "icd10": "C18.1",
        "structure": "apex",
        "nameEn": "Condition C18.1",
        "nameVi": "Bệnh lý C18.1"
      },
      {
        "icd10": "K38.2",
        "structure": "apex",
        "nameEn": "Condition K38.2",
        "nameVi": "Bệnh lý K38.2"
      },
      {
        "icd10": "K38.3",
        "structure": "base",
        "nameEn": "Condition K38.3",
        "nameVi": "Bệnh lý K38.3"
      },
      {
        "icd10": "K38.8",
        "structure": null,
        "nameEn": "Condition K38.8",
        "nameVi": "Bệnh lý K38.8"
      }
    ],
    "hotspots": [
      {
        "id": "caecum",
        "ta": "Caecum",
        "position": [
          0.19,
          0.76,
          1.61
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "taenia",
        "ta": "Taeniae coli",
        "position": [
          -0.07,
          1.43,
          0.94
        ],
        "color": "#f2f0e8",
        "visibility": "surface"
      },
      {
        "id": "ileocaecal",
        "ta": "Ostium ileale",
        "position": [
          -0.95,
          0.48,
          0.47
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "base",
        "ta": "Basis appendicis",
        "position": [
          0.15,
          -0.56,
          0.58
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "apex",
        "ta": "Apex appendicis",
        "position": [
          0.16,
          -0.7,
          0.23
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "brainstem",
    "systemId": "nervous",
    "systemNameEn": "Nervous System",
    "systemNameVi": "Hệ thần kinh",
    "nameEn": "Brainstem",
    "nameVi": "Thân não",
    "scientificName": "Truncus encephali",
    "accent": "#c9a98f",
    "model": "/models/brainstem.glb",
    "icon": "⌶",
    "thumbnail": "/anatomy/brainstem/thumb.webp",
    "conditions": [
      {
        "icd10": "I63.5",
        "structure": "pons",
        "nameEn": "Condition I63.5",
        "nameVi": "Bệnh lý I63.5"
      },
      {
        "icd10": "G93.5",
        "structure": "medulla",
        "nameEn": "Condition G93.5",
        "nameVi": "Bệnh lý G93.5"
      },
      {
        "icd10": "G12.2",
        "structure": "medulla",
        "nameEn": "Condition G12.2",
        "nameVi": "Bệnh lý G12.2"
      },
      {
        "icd10": "I67.9",
        "structure": "pons",
        "nameEn": "Condition I67.9",
        "nameVi": "Bệnh lý I67.9"
      },
      {
        "icd10": "G37.3",
        "structure": "pons",
        "nameEn": "Condition G37.3",
        "nameVi": "Bệnh lý G37.3"
      },
      {
        "icd10": "D33.1",
        "structure": "mesencephalon",
        "nameEn": "Condition D33.1",
        "nameVi": "Bệnh lý D33.1"
      },
      {
        "icd10": "G47.3",
        "structure": "medulla",
        "nameEn": "Condition G47.3",
        "nameVi": "Bệnh lý G47.3"
      },
      {
        "icd10": "S06.3",
        "structure": null,
        "nameEn": "Condition S06.3",
        "nameVi": "Bệnh lý S06.3"
      }
    ],
    "hotspots": [
      {
        "id": "mesencephalon",
        "ta": "Mesencephalon",
        "position": [
          -0.56,
          1.78,
          0.7
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "pons",
        "ta": "Pons",
        "position": [
          -0.06,
          0.56,
          0.9
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "medulla",
        "ta": "Medulla oblongata",
        "position": [
          0.23,
          -1.25,
          0.34
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "pyramis",
        "ta": "Pyramis medullae oblongatae",
        "position": [
          -0.2,
          -0.63,
          0.47
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "oliva",
        "ta": "Oliva",
        "position": [
          -0.55,
          -0.45,
          0.25
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "rectum",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Rectum and Anal Canal",
    "nameVi": "Trực tràng và Ống hậu môn",
    "scientificName": "Rectum et canalis analis",
    "accent": "#c9787f",
    "model": "/models/rectum.glb",
    "icon": "⌷",
    "thumbnail": "/anatomy/rectum/thumb.webp",
    "conditions": [
      {
        "icd10": "K64.9",
        "structure": "columna",
        "nameEn": "Condition K64.9",
        "nameVi": "Bệnh lý K64.9"
      },
      {
        "icd10": "K60.2",
        "structure": "linea",
        "nameEn": "Condition K60.2",
        "nameVi": "Bệnh lý K60.2"
      },
      {
        "icd10": "C20",
        "structure": "ampulla",
        "nameEn": "Condition C20",
        "nameVi": "Bệnh lý C20"
      },
      {
        "icd10": "K62.3",
        "structure": "ampulla",
        "nameEn": "Condition K62.3",
        "nameVi": "Bệnh lý K62.3"
      },
      {
        "icd10": "K60.3",
        "structure": "linea",
        "nameEn": "Condition K60.3",
        "nameVi": "Bệnh lý K60.3"
      },
      {
        "icd10": "K62.6",
        "structure": "ampulla",
        "nameEn": "Condition K62.6",
        "nameVi": "Bệnh lý K62.6"
      },
      {
        "icd10": "K61.0",
        "structure": "sphincter",
        "nameEn": "Condition K61.0",
        "nameVi": "Bệnh lý K61.0"
      },
      {
        "icd10": "R15",
        "structure": "sphincter",
        "nameEn": "Condition R15",
        "nameVi": "Bệnh lý R15"
      }
    ],
    "hotspots": [
      {
        "id": "ampulla",
        "ta": "Ampulla recti",
        "position": [
          -0.04,
          1.8,
          1.12
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "plica",
        "ta": "Plicae transversae recti",
        "position": [
          -0.37,
          0.59,
          0.68
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "columna",
        "ta": "Columnae anales",
        "position": [
          0,
          -0.15,
          0.35
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "linea",
        "ta": "Linea pectinata",
        "position": [
          0,
          -0.5,
          0.09
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "sphincter",
        "ta": "Musculus sphincter ani internus",
        "position": [
          0.55,
          -0.75,
          0.05
        ],
        "color": "#7fa88a",
        "visibility": "sectioned"
      }
    ]
  },
  {
    "id": "salivary-glands",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Salivary Glands",
    "nameVi": "Tuyến nước bọt",
    "scientificName": "Glandulae salivariae majores",
    "accent": "#dcc3a8",
    "model": "/models/salivary-glands.glb",
    "icon": "⁘",
    "thumbnail": "/anatomy/salivary-glands/thumb.webp",
    "conditions": [
      {
        "icd10": "K11.5",
        "structure": "ductus-parotideus",
        "nameEn": "Condition K11.5",
        "nameVi": "Bệnh lý K11.5"
      },
      {
        "icd10": "B26.9",
        "structure": "parotidea",
        "nameEn": "Condition B26.9",
        "nameVi": "Bệnh lý B26.9"
      },
      {
        "icd10": "K11.2",
        "structure": "submandibularis",
        "nameEn": "Condition K11.2",
        "nameVi": "Bệnh lý K11.2"
      },
      {
        "icd10": "D11.0",
        "structure": "parotidea",
        "nameEn": "Condition D11.0",
        "nameVi": "Bệnh lý D11.0"
      },
      {
        "icd10": "K11.7",
        "structure": null,
        "nameEn": "Condition K11.7",
        "nameVi": "Bệnh lý K11.7"
      },
      {
        "icd10": "M35.0",
        "structure": null,
        "nameEn": "Condition M35.0",
        "nameVi": "Bệnh lý M35.0"
      },
      {
        "icd10": "C07",
        "structure": "parotidea",
        "nameEn": "Condition C07",
        "nameVi": "Bệnh lý C07"
      },
      {
        "icd10": "K11.6",
        "structure": "sublingualis",
        "nameEn": "Condition K11.6",
        "nameVi": "Bệnh lý K11.6"
      }
    ],
    "hotspots": [
      {
        "id": "parotidea",
        "ta": "Glandula parotidea",
        "position": [
          1.34,
          0.97,
          0.5
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "ductus-parotideus",
        "ta": "Ductus parotideus",
        "position": [
          -0.14,
          0.11,
          0.18
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "submandibularis",
        "ta": "Glandula submandibularis",
        "position": [
          0.23,
          -0.9,
          0.66
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "sublingualis",
        "ta": "Glandula sublingualis",
        "position": [
          -1.5,
          -1.06,
          0.37
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "shoulder",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Shoulder Joint",
    "nameVi": "Khớp vai",
    "scientificName": "Articulatio humeri",
    "accent": "#cdb99b",
    "model": "/models/shoulder.glb",
    "icon": "⌔",
    "thumbnail": "/anatomy/shoulder/thumb.webp",
    "conditions": [
      {
        "icd10": "S43.0",
        "structure": "glenoidalis",
        "nameEn": "Condition S43.0",
        "nameVi": "Bệnh lý S43.0"
      },
      {
        "icd10": "M75.1",
        "structure": "acromion",
        "nameEn": "Condition M75.1",
        "nameVi": "Bệnh lý M75.1"
      },
      {
        "icd10": "M75.0",
        "structure": "caput-humeri",
        "nameEn": "Condition M75.0",
        "nameVi": "Bệnh lý M75.0"
      },
      {
        "icd10": "M75.4",
        "structure": "acromion",
        "nameEn": "Condition M75.4",
        "nameVi": "Bệnh lý M75.4"
      },
      {
        "icd10": "S42.0",
        "structure": "clavicula",
        "nameEn": "Condition S42.0",
        "nameVi": "Bệnh lý S42.0"
      },
      {
        "icd10": "M19.0",
        "structure": "glenoidalis",
        "nameEn": "Condition M19.0",
        "nameVi": "Bệnh lý M19.0"
      },
      {
        "icd10": "S43.1",
        "structure": "clavicula",
        "nameEn": "Condition S43.1",
        "nameVi": "Bệnh lý S43.1"
      },
      {
        "icd10": "M75.3",
        "structure": null,
        "nameEn": "Condition M75.3",
        "nameVi": "Bệnh lý M75.3"
      }
    ],
    "hotspots": [
      {
        "id": "glenoidalis",
        "ta": "Cavitas glenoidalis",
        "position": [
          -0.33,
          0.63,
          1.21
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "acromion",
        "ta": "Acromion",
        "position": [
          -0.68,
          1.39,
          0.42
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "coracoideus",
        "ta": "Processus coracoideus",
        "position": [
          0.23,
          1.42,
          1.15
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "clavicula",
        "ta": "Clavicula",
        "position": [
          1.43,
          0.71,
          0.77
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "caput-humeri",
        "ta": "Caput humeri",
        "position": [
          -0.97,
          -0.11,
          0.54
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "scapula",
        "ta": "Scapula",
        "position": [
          0.36,
          -0.52,
          -0.2
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "hip",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Hip Joint",
    "nameVi": "Khớp háng",
    "scientificName": "Articulatio coxae",
    "accent": "#c9b291",
    "model": "/models/hip.glb",
    "icon": "⊕",
    "thumbnail": "/anatomy/hip/thumb.webp",
    "conditions": [
      {
        "icd10": "M16.9",
        "structure": "acetabulum",
        "nameEn": "Osteoarthritis of hip",
        "nameVi": "Thoái hóa khớp háng"
      },
      {
        "icd10": "S72.0",
        "structure": "collum",
        "nameEn": "Condition S72.0",
        "nameVi": "Bệnh lý S72.0"
      },
      {
        "icd10": "M87.05",
        "structure": "caput-femoris",
        "nameEn": "Condition M87.05",
        "nameVi": "Bệnh lý M87.05"
      },
      {
        "icd10": "Q65.9",
        "structure": "acetabulum",
        "nameEn": "Condition Q65.9",
        "nameVi": "Bệnh lý Q65.9"
      },
      {
        "icd10": "S73.0",
        "structure": "caput-femoris",
        "nameEn": "Condition S73.0",
        "nameVi": "Bệnh lý S73.0"
      },
      {
        "icd10": "M24.15",
        "structure": "labrum",
        "nameEn": "Condition M24.15",
        "nameVi": "Bệnh lý M24.15"
      },
      {
        "icd10": "M25.55",
        "structure": null,
        "nameEn": "Condition M25.55",
        "nameVi": "Bệnh lý M25.55"
      },
      {
        "icd10": "M00.05",
        "structure": "acetabulum",
        "nameEn": "Condition M00.05",
        "nameVi": "Bệnh lý M00.05"
      }
    ],
    "hotspots": [
      {
        "id": "acetabulum",
        "ta": "Acetabulum",
        "position": [
          0.02,
          1.84,
          0.92
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "caput-femoris",
        "ta": "Caput femoris",
        "position": [
          0.33,
          0.63,
          1.4
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "labrum",
        "ta": "Labrum acetabuli",
        "position": [
          -0.7,
          0.75,
          0.6
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "lig-capitis",
        "ta": "Ligamentum capitis femoris",
        "position": [
          0.16,
          1.57,
          0.91
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "collum",
        "ta": "Collum femoris",
        "position": [
          0.58,
          -0.56,
          0.81
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "trochanter",
        "ta": "Trochanter major",
        "position": [
          0.59,
          -0.33,
          0.12
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "foot",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Bones of the Foot",
    "nameVi": "Xương bàn chân",
    "scientificName": "Ossa pedis",
    "accent": "#d3c1a4",
    "model": "/models/foot.glb",
    "icon": "⌸",
    "thumbnail": "/anatomy/foot/thumb.webp",
    "conditions": [
      {
        "icd10": "S93.4",
        "structure": "talus",
        "nameEn": "Condition S93.4",
        "nameVi": "Bệnh lý S93.4"
      },
      {
        "icd10": "M72.2",
        "structure": "calcaneus",
        "nameEn": "Condition M72.2",
        "nameVi": "Bệnh lý M72.2"
      },
      {
        "icd10": "S82.6",
        "structure": "talus",
        "nameEn": "Condition S82.6",
        "nameVi": "Bệnh lý S82.6"
      },
      {
        "icd10": "M20.1",
        "structure": "metatarsus",
        "nameEn": "Condition M20.1",
        "nameVi": "Bệnh lý M20.1"
      },
      {
        "icd10": "M21.4",
        "structure": "arcus",
        "nameEn": "Condition M21.4",
        "nameVi": "Bệnh lý M21.4"
      },
      {
        "icd10": "S92.3",
        "structure": "metatarsus",
        "nameEn": "Condition S92.3",
        "nameVi": "Bệnh lý S92.3"
      },
      {
        "icd10": "M77.3",
        "structure": "calcaneus",
        "nameEn": "Condition M77.3",
        "nameVi": "Bệnh lý M77.3"
      },
      {
        "icd10": "G57.6",
        "structure": "arcus",
        "nameEn": "Condition G57.6",
        "nameVi": "Bệnh lý G57.6"
      }
    ],
    "hotspots": [
      {
        "id": "calcaneus",
        "ta": "Calcaneus",
        "position": [
          -1.83,
          -0.77,
          0.15
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "talus",
        "ta": "Talus",
        "position": [
          -1.78,
          -0.69,
          0.55
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "naviculare",
        "ta": "Os naviculare",
        "position": [
          -0.2,
          -0.1,
          0.5
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "metatarsus",
        "ta": "Ossa metatarsi",
        "position": [
          1.47,
          -0.84,
          0.52
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "phalanges",
        "ta": "Phalanges pedis",
        "position": [
          1.77,
          -0.74,
          0.31
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "arcus",
        "ta": "Arcus pedis longitudinalis",
        "position": [
          -0.05,
          -0.41,
          0.13
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "long-bone",
    "systemId": "skeletal",
    "systemNameEn": "Skeletal System",
    "systemNameVi": "Hệ xương khớp",
    "nameEn": "Long Bone",
    "nameVi": "Xương dài",
    "scientificName": "Os longum",
    "accent": "#cbb99c",
    "model": "/models/long-bone.glb",
    "icon": "▭",
    "thumbnail": "/anatomy/long-bone/thumb.webp",
    "conditions": [
      {
        "icd10": "S72.3",
        "structure": "diaphysis",
        "nameEn": "Condition S72.3",
        "nameVi": "Bệnh lý S72.3"
      },
      {
        "icd10": "M86.9",
        "structure": "cavitas-medullaris",
        "nameEn": "Condition M86.9",
        "nameVi": "Bệnh lý M86.9"
      },
      {
        "icd10": "M81.9",
        "structure": "spongiosa",
        "nameEn": "Condition M81.9",
        "nameVi": "Bệnh lý M81.9"
      },
      {
        "icd10": "C40.2",
        "structure": "diaphysis",
        "nameEn": "Condition C40.2",
        "nameVi": "Bệnh lý C40.2"
      },
      {
        "icd10": "M87.9",
        "structure": "epiphysis",
        "nameEn": "Condition M87.9",
        "nameVi": "Bệnh lý M87.9"
      },
      {
        "icd10": "D46.9",
        "structure": "cavitas-medullaris",
        "nameEn": "Condition D46.9",
        "nameVi": "Bệnh lý D46.9"
      },
      {
        "icd10": "M84.3",
        "structure": "compacta",
        "nameEn": "Condition M84.3",
        "nameVi": "Bệnh lý M84.3"
      },
      {
        "icd10": "E83.3",
        "structure": "spongiosa",
        "nameEn": "Condition E83.3",
        "nameVi": "Bệnh lý E83.3"
      }
    ],
    "hotspots": [
      {
        "id": "diaphysis",
        "ta": "Diaphysis",
        "position": [
          0.11,
          0,
          0.02
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "cavitas-medullaris",
        "ta": "Cavitas medullaris",
        "position": [
          0.19,
          0.54,
          0.03
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "compacta",
        "ta": "Substantia compacta",
        "position": [
          0.06,
          -0.47,
          0
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "spongiosa",
        "ta": "Substantia spongiosa",
        "position": [
          0.1,
          1.42,
          0.23
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "epiphysis",
        "ta": "Epiphysis",
        "position": [
          -0.1,
          1.85,
          0.21
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "gravid-uterus",
    "systemId": "reproductive",
    "systemNameEn": "Reproductive System",
    "systemNameVi": "Hệ sinh dục",
    "nameEn": "Uterus at Term",
    "nameVi": "Tử cung đủ tháng",
    "scientificName": "Uterus gravidus",
    "accent": "#c4707f",
    "model": "/models/gravid-uterus.glb",
    "icon": "☉",
    "thumbnail": "/anatomy/gravid-uterus/thumb.webp",
    "conditions": [
      {
        "icd10": "O44.1",
        "structure": "placenta",
        "nameEn": "Condition O44.1",
        "nameVi": "Bệnh lý O44.1"
      },
      {
        "icd10": "O45.9",
        "structure": "placenta",
        "nameEn": "Condition O45.9",
        "nameVi": "Bệnh lý O45.9"
      },
      {
        "icd10": "O72.0",
        "structure": "myometrium",
        "nameEn": "Condition O72.0",
        "nameVi": "Bệnh lý O72.0"
      },
      {
        "icd10": "O69.0",
        "structure": "funiculus",
        "nameEn": "Condition O69.0",
        "nameVi": "Bệnh lý O69.0"
      },
      {
        "icd10": "O42.9",
        "structure": "membranae",
        "nameEn": "Condition O42.9",
        "nameVi": "Bệnh lý O42.9"
      },
      {
        "icd10": "O62.2",
        "structure": "myometrium",
        "nameEn": "Condition O62.2",
        "nameVi": "Bệnh lý O62.2"
      },
      {
        "icd10": "O34.3",
        "structure": "cervix",
        "nameEn": "Condition O34.3",
        "nameVi": "Bệnh lý O34.3"
      },
      {
        "icd10": "O43.1",
        "structure": "placenta",
        "nameEn": "Condition O43.1",
        "nameVi": "Bệnh lý O43.1"
      }
    ],
    "hotspots": [
      {
        "id": "myometrium",
        "ta": "Myometrium",
        "position": [
          -1.61,
          0.75,
          0.7
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "placenta",
        "ta": "Placenta",
        "position": [
          0.53,
          1.01,
          0.6
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "funiculus",
        "ta": "Funiculus umbilicalis",
        "position": [
          0,
          0.02,
          0.73
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "membranae",
        "ta": "Membranae fetales",
        "position": [
          -0.08,
          -0.31,
          0.74
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "cervix",
        "ta": "Cervix uteri",
        "position": [
          0.08,
          -1.84,
          0.94
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "cranial-nerves",
    "systemId": "nervous",
    "systemNameEn": "Nervous System",
    "systemNameVi": "Hệ thần kinh",
    "nameEn": "Cranial Nerves",
    "nameVi": "Dây thần kinh sọ",
    "scientificName": "Nervi craniales",
    "accent": "#c7b393",
    "model": "/models/cranial-nerves.glb",
    "icon": "※",
    "thumbnail": "/anatomy/cranial-nerves/thumb.webp",
    "conditions": [
      {
        "icd10": "G50.0",
        "structure": "n-trigeminus",
        "nameEn": "Condition G50.0",
        "nameVi": "Bệnh lý G50.0"
      },
      {
        "icd10": "G51.0",
        "structure": "n-facialis",
        "nameEn": "Condition G51.0",
        "nameVi": "Bệnh lý G51.0"
      },
      {
        "icd10": "H49.0",
        "structure": "n-oculomotorius",
        "nameEn": "Condition H49.0",
        "nameVi": "Bệnh lý H49.0"
      },
      {
        "icd10": "H47.4",
        "structure": "chiasma",
        "nameEn": "Condition H47.4",
        "nameVi": "Bệnh lý H47.4"
      },
      {
        "icd10": "H93.3",
        "structure": "n-facialis",
        "nameEn": "Condition H93.3",
        "nameVi": "Bệnh lý H93.3"
      },
      {
        "icd10": "G52.2",
        "structure": "n-vagus",
        "nameEn": "Condition G52.2",
        "nameVi": "Bệnh lý G52.2"
      },
      {
        "icd10": "G52.3",
        "structure": "n-hypoglossus",
        "nameEn": "Condition G52.3",
        "nameVi": "Bệnh lý G52.3"
      },
      {
        "icd10": "G52.9",
        "structure": null,
        "nameEn": "Condition G52.9",
        "nameVi": "Bệnh lý G52.9"
      }
    ],
    "hotspots": [
      {
        "id": "chiasma",
        "ta": "Chiasma opticum",
        "position": [
          -0.18,
          1.16,
          0.77
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "n-oculomotorius",
        "ta": "Nervus oculomotorius",
        "position": [
          -0.75,
          0.91,
          1.44
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "n-trigeminus",
        "ta": "Nervus trigeminus",
        "position": [
          -1.15,
          0.2,
          0.99
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "n-facialis",
        "ta": "Nervus facialis",
        "position": [
          -1.15,
          -0.59,
          1.09
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "n-vagus",
        "ta": "Nervus vagus",
        "position": [
          -0.9,
          -1.06,
          1.04
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "n-hypoglossus",
        "ta": "Nervus hypoglossus",
        "position": [
          -0.52,
          -1.13,
          0.81
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "cardiac-conduction",
    "systemId": "cardiovascular",
    "systemNameEn": "Cardiovascular System",
    "systemNameVi": "Hệ tuần hoàn (Tim mạch)",
    "nameEn": "Cardiac Conducting System",
    "nameVi": "Hệ dẫn truyền tim",
    "scientificName": "Systema conducens cordis",
    "accent": "#c05a4e",
    "model": "/models/cardiac-conduction.glb",
    "icon": "∿",
    "thumbnail": "/anatomy/cardiac-conduction/thumb.webp",
    "conditions": [
      {
        "icd10": "I44.2",
        "structure": "nodus-atrioventricularis",
        "nameEn": "Condition I44.2",
        "nameVi": "Bệnh lý I44.2"
      },
      {
        "icd10": "I49.5",
        "structure": "nodus-sinuatrialis",
        "nameEn": "Condition I49.5",
        "nameVi": "Bệnh lý I49.5"
      },
      {
        "icd10": "I45.0",
        "structure": "crus-dextrum",
        "nameEn": "Condition I45.0",
        "nameVi": "Bệnh lý I45.0"
      },
      {
        "icd10": "I44.7",
        "structure": "crus-sinistrum",
        "nameEn": "Condition I44.7",
        "nameVi": "Bệnh lý I44.7"
      },
      {
        "icd10": "I48",
        "structure": "nodus-sinuatrialis",
        "nameEn": "Atrial fibrillation",
        "nameVi": "Rung nhĩ"
      },
      {
        "icd10": "I47.1",
        "structure": "nodus-atrioventricularis",
        "nameEn": "Condition I47.1",
        "nameVi": "Bệnh lý I47.1"
      },
      {
        "icd10": "I45.6",
        "structure": "fasciculus",
        "nameEn": "Condition I45.6",
        "nameVi": "Bệnh lý I45.6"
      },
      {
        "icd10": "I49.9",
        "structure": null,
        "nameEn": "Cardiac arrhythmia",
        "nameVi": "Rối loạn nhịp tim"
      }
    ],
    "hotspots": [
      {
        "id": "nodus-sinuatrialis",
        "ta": "Nodus sinuatrialis",
        "position": [
          -0.83,
          1.69,
          0.85
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "nodus-atrioventricularis",
        "ta": "Nodus atrioventricularis",
        "position": [
          -0.05,
          0.73,
          1.4
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "fasciculus",
        "ta": "Fasciculus atrioventricularis",
        "position": [
          0.21,
          -0.24,
          1.29
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "crus-dextrum",
        "ta": "Crus dextrum",
        "position": [
          -0.45,
          -0.75,
          0.7
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "crus-sinistrum",
        "ta": "Crus sinistrum",
        "position": [
          0.77,
          -1.19,
          0.75
        ],
        "color": "#7fa88a",
        "visibility": "sectioned"
      },
      {
        "id": "rami-subendocardiales",
        "ta": "Rami subendocardiales",
        "position": [
          0.25,
          -1.4,
          0.5
        ],
        "color": "#8d6bcc",
        "visibility": "sectioned"
      }
    ]
  },
  {
    "id": "lymph-node",
    "systemId": "lymphatic",
    "systemNameEn": "Lymphatic System",
    "systemNameVi": "Hệ bạch huyết",
    "nameEn": "Lymph Node",
    "nameVi": "Hạch bạch huyết",
    "scientificName": "Nodus lymphoideus",
    "accent": "#9a8bb0",
    "model": "/models/lymph-node.glb",
    "icon": "⬡",
    "thumbnail": "/anatomy/lymph-node/thumb.webp",
    "conditions": [
      {
        "icd10": "R59.1",
        "structure": "cortex",
        "nameEn": "Condition R59.1",
        "nameVi": "Bệnh lý R59.1"
      },
      {
        "icd10": "C81.9",
        "structure": "nodulus",
        "nameEn": "Condition C81.9",
        "nameVi": "Bệnh lý C81.9"
      },
      {
        "icd10": "C77.9",
        "structure": "cortex",
        "nameEn": "Condition C77.9",
        "nameVi": "Bệnh lý C77.9"
      },
      {
        "icd10": "I88.0",
        "structure": "capsula",
        "nameEn": "Condition I88.0",
        "nameVi": "Bệnh lý I88.0"
      },
      {
        "icd10": "A18.2",
        "structure": "cortex",
        "nameEn": "Condition A18.2",
        "nameVi": "Bệnh lý A18.2"
      },
      {
        "icd10": "I89.0",
        "structure": "vas-afferens",
        "nameEn": "Condition I89.0",
        "nameVi": "Bệnh lý I89.0"
      },
      {
        "icd10": "D76.1",
        "structure": "medulla",
        "nameEn": "Condition D76.1",
        "nameVi": "Bệnh lý D76.1"
      },
      {
        "icd10": "R59.9",
        "structure": null,
        "nameEn": "Condition R59.9",
        "nameVi": "Bệnh lý R59.9"
      }
    ],
    "hotspots": [
      {
        "id": "capsula",
        "ta": "Capsula nodi lymphoidei",
        "position": [
          0.2,
          1.84,
          0.62
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "cortex",
        "ta": "Cortex nodi lymphoidei",
        "position": [
          -1.12,
          0.71,
          0.77
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "nodulus",
        "ta": "Nodulus lymphoideus",
        "position": [
          -0.5,
          0.89,
          0.75
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "medulla",
        "ta": "Medulla nodi lymphoidei",
        "position": [
          0.45,
          -0.36,
          0.76
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "hilum",
        "ta": "Hilum nodi lymphoidei",
        "position": [
          1.81,
          -0.52,
          0.72
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "vas-afferens",
        "ta": "Vasa lymphatica afferentia",
        "position": [
          -1.73,
          -0.87,
          0.69
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "lumbosacral-plexus",
    "systemId": "nervous",
    "systemNameEn": "Nervous System",
    "systemNameVi": "Hệ thần kinh",
    "nameEn": "Lumbosacral Plexus",
    "nameVi": "Đám rối thắt lưng cùng",
    "scientificName": "Plexus lumbosacralis",
    "accent": "#bfa886",
    "model": "/models/lumbosacral-plexus.glb",
    "icon": "⋎",
    "thumbnail": "/anatomy/lumbosacral-plexus/thumb.webp",
    "conditions": [
      {
        "icd10": "M54.3",
        "structure": "n-ischiadicus",
        "nameEn": "Condition M54.3",
        "nameVi": "Bệnh lý M54.3"
      },
      {
        "icd10": "G57.0",
        "structure": "n-ischiadicus",
        "nameEn": "Condition G57.0",
        "nameVi": "Bệnh lý G57.0"
      },
      {
        "icd10": "G57.3",
        "structure": "n-fibularis",
        "nameEn": "Condition G57.3",
        "nameVi": "Bệnh lý G57.3"
      },
      {
        "icd10": "G57.4",
        "structure": "n-tibialis",
        "nameEn": "Condition G57.4",
        "nameVi": "Bệnh lý G57.4"
      },
      {
        "icd10": "M51.1",
        "structure": "radices",
        "nameEn": "Condition M51.1",
        "nameVi": "Bệnh lý M51.1"
      },
      {
        "icd10": "G57.2",
        "structure": "n-femoralis",
        "nameEn": "Condition G57.2",
        "nameVi": "Bệnh lý G57.2"
      },
      {
        "icd10": "G54.1",
        "structure": "truncus",
        "nameEn": "Condition G54.1",
        "nameVi": "Bệnh lý G54.1"
      },
      {
        "icd10": "G57.9",
        "structure": null,
        "nameEn": "Condition G57.9",
        "nameVi": "Bệnh lý G57.9"
      }
    ],
    "hotspots": [
      {
        "id": "radices",
        "ta": "Radices plexus lumbosacralis",
        "position": [
          0.35,
          0.75,
          0.15
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "truncus",
        "ta": "Truncus lumbosacralis",
        "position": [
          0.03,
          0.12,
          0
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "n-femoralis",
        "ta": "Nervus femoralis",
        "position": [
          -0.35,
          0.27,
          0.01
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "n-ischiadicus",
        "ta": "Nervus ischiadicus",
        "position": [
          -0.36,
          -0.56,
          0.37
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      },
      {
        "id": "n-tibialis",
        "ta": "Nervus tibialis",
        "position": [
          -0.6,
          -1.33,
          0.29
        ],
        "color": "#7fa88a",
        "visibility": "surface"
      },
      {
        "id": "n-fibularis",
        "ta": "Nervus fibularis communis",
        "position": [
          -0.05,
          -1.15,
          0.45
        ],
        "color": "#8d6bcc",
        "visibility": "surface"
      }
    ]
  },
  {
    "id": "pancreas-sectioned",
    "systemId": "digestive",
    "systemNameEn": "Digestive System",
    "systemNameVi": "Hệ tiêu hóa",
    "nameEn": "Pancreatic Duct System",
    "nameVi": "Hệ ống tuỵ",
    "scientificName": "Ductus pancreaticus",
    "accent": "#c69a5e",
    "model": "/models/pancreas-sectioned.glb",
    "icon": "⑃",
    "thumbnail": "/anatomy/pancreas-sectioned/thumb.webp",
    "conditions": [
      {
        "icd10": "K85.1",
        "structure": "ampulla",
        "nameEn": "Condition K85.1",
        "nameVi": "Bệnh lý K85.1"
      },
      {
        "icd10": "K86.1",
        "structure": "ductus-principalis",
        "nameEn": "Condition K86.1",
        "nameVi": "Bệnh lý K86.1"
      },
      {
        "icd10": "K86.8",
        "structure": "ductus-principalis",
        "nameEn": "Condition K86.8",
        "nameVi": "Bệnh lý K86.8"
      },
      {
        "icd10": "K86.8",
        "structure": "ductus-principalis",
        "nameEn": "Condition K86.8",
        "nameVi": "Bệnh lý K86.8"
      },
      {
        "icd10": "D13.6",
        "structure": "rami",
        "nameEn": "Condition D13.6",
        "nameVi": "Bệnh lý D13.6"
      },
      {
        "icd10": "Q45.3",
        "structure": "ductus-accessorius",
        "nameEn": "Condition Q45.3",
        "nameVi": "Bệnh lý Q45.3"
      },
      {
        "icd10": "K86.2",
        "structure": "rami",
        "nameEn": "Condition K86.2",
        "nameVi": "Bệnh lý K86.2"
      },
      {
        "icd10": "K83.1",
        "structure": "papilla",
        "nameEn": "Condition K83.1",
        "nameVi": "Bệnh lý K83.1"
      }
    ],
    "hotspots": [
      {
        "id": "ductus-principalis",
        "ta": "Ductus pancreaticus",
        "position": [
          0.14,
          0.1,
          0.37
        ],
        "color": "#ee7c6a",
        "visibility": "sectioned"
      },
      {
        "id": "rami",
        "ta": "Rami ductus pancreatici",
        "position": [
          0.68,
          0.35,
          0.28
        ],
        "color": "#f2a33b",
        "visibility": "sectioned"
      },
      {
        "id": "ductus-accessorius",
        "ta": "Ductus pancreaticus accessorius",
        "position": [
          -0.64,
          0.48,
          0.39
        ],
        "color": "#6393d8",
        "visibility": "sectioned"
      },
      {
        "id": "ampulla",
        "ta": "Ampulla hepatopancreatica",
        "position": [
          -1.52,
          -0.3,
          0.44
        ],
        "color": "#d89bc4",
        "visibility": "sectioned"
      },
      {
        "id": "papilla",
        "ta": "Papilla duodeni major",
        "position": [
          -1.71,
          -0.68,
          0.49
        ],
        "color": "#7fa88a",
        "visibility": "sectioned"
      }
    ]
  },
  {
    "id": "pituitary",
    "systemId": "endocrine",
    "systemNameEn": "Endocrine System",
    "systemNameVi": "Hệ nội tiết",
    "nameEn": "Pituitary Gland",
    "nameVi": "Tuyến yên",
    "scientificName": "Hypophysis",
    "accent": "#d59a86",
    "model": "/models/pituitary.glb",
    "icon": "◐",
    "thumbnail": "/anatomy/pituitary/thumb.webp",
    "conditions": [
      {
        "icd10": "E22.0",
        "structure": "adenohypophysis",
        "nameEn": "Condition E22.0",
        "nameVi": "Bệnh lý E22.0"
      },
      {
        "icd10": "E23.0",
        "structure": "adenohypophysis",
        "nameEn": "Condition E23.0",
        "nameVi": "Bệnh lý E23.0"
      },
      {
        "icd10": "D35.2",
        "structure": "adenohypophysis",
        "nameEn": "Condition D35.2",
        "nameVi": "Bệnh lý D35.2"
      },
      {
        "icd10": "E23.2",
        "structure": "neurohypophysis",
        "nameEn": "Condition E23.2",
        "nameVi": "Bệnh lý E23.2"
      },
      {
        "icd10": "E22.1",
        "structure": "adenohypophysis",
        "nameEn": "Condition E22.1",
        "nameVi": "Bệnh lý E22.1"
      },
      {
        "icd10": "E24.0",
        "structure": "adenohypophysis",
        "nameEn": "Condition E24.0",
        "nameVi": "Bệnh lý E24.0"
      },
      {
        "icd10": "H47.4",
        "structure": "chiasma",
        "nameEn": "Condition H47.4",
        "nameVi": "Bệnh lý H47.4"
      },
      {
        "icd10": "E23.6",
        "structure": null,
        "nameEn": "Condition E23.6",
        "nameVi": "Bệnh lý E23.6"
      }
    ],
    "hotspots": [
      {
        "id": "adenohypophysis",
        "ta": "Adenohypophysis",
        "position": [
          0.04,
          -0.49,
          0.78
        ],
        "color": "#ee7c6a",
        "visibility": "surface"
      },
      {
        "id": "neurohypophysis",
        "ta": "Neurohypophysis",
        "position": [
          0.07,
          -0.54,
          -0.65
        ],
        "color": "#f2a33b",
        "visibility": "surface"
      },
      {
        "id": "infundibulum",
        "ta": "Infundibulum",
        "position": [
          -0.03,
          0.26,
          -0.3
        ],
        "color": "#6393d8",
        "visibility": "surface"
      },
      {
        "id": "chiasma",
        "ta": "Chiasma opticum",
        "position": [
          0.2,
          0.57,
          0.03
        ],
        "color": "#d89bc4",
        "visibility": "surface"
      }
    ]
  }
];
