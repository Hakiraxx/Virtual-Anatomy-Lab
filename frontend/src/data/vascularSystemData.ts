/**
 * MedAnatomy 3D — Comprehensive 100-Detail Vascular Anatomy Data
 * Standardized to Terminologia Anatomica (TA2) & International Medical Curricula
 * All 3D nodes correspond directly to verified meshes in Z-Anatomy vessels_complete.glb (CC BY-SA 4.0)
 * Exactly 100 verified distinct anatomical details across 10 clinical regions.
 */

export type VascularRegion =
  | 'aorta_great_vessels'
  | 'coronary'
  | 'carotid_head_neck'
  | 'cerebral_circle_willis'
  | 'dural_sinuses'
  | 'upper_limb'
  | 'thoracic_pulmonary'
  | 'abdominal_digestive'
  | 'renal_retroperitoneal'
  | 'pelvic_lower_limb';

export type VesselType = 'artery' | 'vein' | 'cardiac';

export interface VascularStructureData {
  id: string;
  nameVi: string;
  nameEn: string;
  nameLa: string; // Terminologia Anatomica (TA2)
  type: VesselType;
  region: VascularRegion;
  primaryNodeName: string;
  meshNodeNames: string[];
  canonicalCenter: [number, number, number]; // [X, Y, Z] world coordinate
  cameraPreset: {
    position: [number, number, number];
    target: [number, number, number];
  };
  dimensions: string;
  originVi: string;
  originEn: string;
  branchesVi: string[];
  branchesEn: string[];
  territoryVi: string;
  territoryEn: string;
  anastomosesVi: string;
  anastomosesEn: string;
  histologyVi: string;
  histologyEn: string;
  clinicalNotesVi: string;
  clinicalNotesEn: string;
  pulsePalpationVi?: string;
  pulsePalpationEn?: string;
}

export interface VascularRegionMeta {
  id: VascularRegion;
  nameVi: string;
  nameEn: string;
  nameLa?: string;
  descriptionVi: string;
  descriptionEn: string;
  count: number;
  color: string;
}

export const VASCULAR_REGIONS: VascularRegionMeta[] = [
  {
    id: 'aorta_great_vessels',
    nameVi: 'Động mạch chủ & Mạch máu lớn',
    nameEn: 'Aorta & Great Vessels',
    descriptionVi: 'Động mạch chủ lên, cung động mạch chủ, ĐM chủ ngực, ĐM chủ bụng và tĩnh mạch chủ',
    descriptionEn: 'Ascending aorta, aortic arch, thoracic & abdominal aorta, and venae cavae',
    count: 8,
    color: '#ef4444'
  },
  {
    id: 'coronary',
    nameVi: 'Tuần hoàn vành & Tim',
    nameEn: 'Coronary & Cardiac Circulation',
    descriptionVi: 'Hệ động mạch vành (LAD, LCx, RCA), xoang vành, tĩnh mạch tim và 4 buồng tim',
    descriptionEn: 'Coronary arterial tree (LAD, LCx, RCA), coronary sinus, cardiac veins, and chambers',
    count: 10,
    color: '#f97316'
  },
  {
    id: 'carotid_head_neck',
    nameVi: 'Hệ cảnh & Đầu Mặt Cổ',
    nameEn: 'Carotid & Head-Neck Circulation',
    descriptionVi: 'Động mạch cảnh chung, cảnh trong, cảnh ngoài, mặt, hàm, thái dương và tĩnh mạch cảnh',
    descriptionEn: 'Common, internal, external carotid systems, facial, maxillary, and jugular veins',
    count: 11,
    color: '#eab308'
  },
  {
    id: 'cerebral_circle_willis',
    nameVi: 'Tuần hoàn não & Vòng Willis',
    nameEn: 'Cerebral Circulation & Circle of Willis',
    descriptionVi: 'Động mạch thân nền, não trước (ACA), não giữa (MCA), não sau (PCA) và các động mạch thông',
    descriptionEn: 'Basilar artery, ACA, MCA, PCA, communicating arteries, and cerebellar branches',
    count: 11,
    color: '#84cc16'
  },
  {
    id: 'dural_sinuses',
    nameVi: 'Xoang tĩnh mạch màng cứng',
    nameEn: 'Dural Venous Sinuses',
    descriptionVi: 'Xoang dọc trên, xoang thẳng, xoang ngang, xoang xích-ma, xoang hang và xoang đá',
    descriptionEn: 'Superior sagittal, straight, transverse, sigmoid, cavernous, and petrosal sinuses',
    count: 8,
    color: '#06b6d4'
  },
  {
    id: 'upper_limb',
    nameVi: 'Mạch máu chi trên',
    nameEn: 'Upper Limb Arteries & Veins',
    descriptionVi: 'Động mạch dưới đòn, nách, cánh tay, quay, trụ, cung gan tay và tĩnh mạch đầu/nền',
    descriptionEn: 'Subclavian, axillary, brachial, radial, ulnar, palmar arches, and cephalic/basilic veins',
    count: 12,
    color: '#3b82f6'
  },
  {
    id: 'thoracic_pulmonary',
    nameVi: 'Mạch lồng ngực & Tuần hoàn phổi',
    nameEn: 'Thoracic & Pulmonary Circulation',
    descriptionVi: 'Thân động mạch phổi, các ĐM và TM phổi, ĐM ngực trong, gian sườn và hệ tĩnh mạch đơn',
    descriptionEn: 'Pulmonary trunk, pulmonary arteries/veins, internal thoracic, and azygos system',
    count: 8,
    color: '#6366f1'
  },
  {
    id: 'abdominal_digestive',
    nameVi: 'Động mạch tạng bụng & Hệ cửa',
    nameEn: 'Abdominal Splanchnic & Portal System',
    descriptionVi: 'Thân tạng, ĐM mạc treo tràng trên, ĐM mạc treo tràng dưới và hệ tĩnh mạch cửa gan',
    descriptionEn: 'Celiac trunk, SMA, IMA branches, hepatic portal vein, and tributaries',
    count: 14,
    color: '#a855f7'
  },
  {
    id: 'renal_retroperitoneal',
    nameVi: 'Mạch thận & Sau phúc mạc',
    nameEn: 'Renal & Retroperitoneal Vessels',
    nameLa: 'Vasa renalia et retroperitonealia',
    descriptionVi: 'Động mạch và tĩnh mạch thận, ĐM thượng thận, ĐM sinh dục và TM chủ dưới bụng',
    descriptionEn: 'Renal arteries/veins, suprarenal, gonadal vessels, and abdominal IVC',
    count: 8,
    color: '#ec4899'
  },
  {
    id: 'pelvic_lower_limb',
    nameVi: 'Mạch chậu & Chi dưới',
    nameEn: 'Pelvic & Lower Limb Arteries & Veins',
    descriptionVi: 'Động mạch chậu chung/trong/ngoài, ĐM đùi, đùi sâu, khoeo, chày, mác và tĩnh mạch hiển lớn',
    descriptionEn: 'Iliac arteries, femoral, profunda femoris, popliteal, tibial, fibular, and saphenous vein',
    count: 10,
    color: '#f43f5e'
  }
];

export const VASCULAR_STRUCTURES: VascularStructureData[] = [
  {
    "id": "ascending_aorta",
    "nameVi": "Động mạch chủ lên",
    "nameEn": "Ascending Aorta",
    "nameLa": "Aorta ascendens",
    "type": "artery",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Ascending aorta",
    "meshNodeNames": [
      "Ascending aorta"
    ],
    "canonicalCenter": [
      0.0579,
      0.5325,
      0.0148
    ],
    "cameraPreset": {
      "target": [
        0.0579,
        0.5325,
        0.0148
      ],
      "position": [
        0.0679,
        0.5725,
        0.2948
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.0 cm, dài ~5 cm",
    "originVi": "Lỗ động mạch chủ tại tâm thất trái ngang mức bờ dưới sụn sườn 3 trái",
    "originEn": "Aortic orifice of left ventricle at level of lower border of 3rd left costal cartilage",
    "branchesVi": [
      "Động mạch vành phải (RCA)",
      "Động mạch vành trái (LCA)"
    ],
    "branchesEn": [
      "Right coronary artery (RCA)",
      "Left coronary artery (LCA)"
    ],
    "territoryVi": "Cấp máu cho toàn bộ cơ tim qua 2 động mạch vành và dẫn toàn bộ cung lượng tim lên cung động mạch chủ",
    "territoryEn": "Supplies myocardium via coronary arteries and transmits full cardiac output into aortic arch",
    "anastomosesVi": "Nối tiếp trực tiếp với cung động mạch chủ tại góc ức (mức đĩa gian đốt T4-T5)",
    "anastomosesEn": "Direct continuity with aortic arch at sternal angle (T4-T5 intervertebral disc)",
    "histologyVi": "Động mạch đàn hồi (elastic artery) với lớp áo giữa dày gồm 40-70 lá chun đồng tâm xen kẽ tế bào cơ trơn",
    "histologyEn": "Elastic conducting artery with thick tunica media containing 40-70 concentric fenestrated elastic lamellae",
    "clinicalNotesVi": "Vị trí thường gặp của phình động mạch chủ ngực (thoracic aneurysm), bóc tách thành động mạch chủ Stanford type A (cần phẫu thuật cấp cứu khẩn cấp) và hẹp van động mạch chủ.",
    "clinicalNotesEn": "Common site of thoracic aortic aneurysm, Stanford type A aortic dissection (surgical emergency), and post-stenotic dilation in aortic valve stenosis."
  },
  {
    "id": "aortic_arch",
    "nameVi": "Cung động mạch chủ",
    "nameEn": "Aortic Arch",
    "nameLa": "Arcus aortae",
    "type": "artery",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Ascending aorta",
    "meshNodeNames": [
      "Ascending aorta"
    ],
    "canonicalCenter": [
      0.0579,
      0.5325,
      0.0148
    ],
    "cameraPreset": {
      "target": [
        0.0579,
        0.5325,
        0.0148
      ],
      "position": [
        0.0679,
        0.5925,
        0.2648
      ]
    },
    "dimensions": "Đường kính ~2.2 - 2.5 cm, uốn cong ra sau và sang trái",
    "originVi": "Tiếp nối động mạch chủ lên tại mức khớp ức - sườn 2 phải",
    "originEn": "Continuation of ascending aorta at right 2nd sternocostal joint",
    "branchesVi": [
      "Thân cánh tay đầu",
      "Động mạch cảnh chung trái",
      "Động mạch dưới đòn trái"
    ],
    "branchesEn": [
      "Brachiocephalic trunk",
      "Left common carotid artery",
      "Left subclavian artery"
    ],
    "territoryVi": "Phân phối máu nuôi đầu, cổ, não bộ và hai chi trên trước khi chuyển thành động mạch chủ xuống",
    "territoryEn": "Distributes blood to head, neck, brain, and both upper limbs before becoming descending aorta",
    "anastomosesVi": "Được nối với thân động mạch phổi qua dây chằng động mạch (ligamentum arteriosum - di tích ống động mạch)",
    "anastomosesEn": "Connected to pulmonary trunk by ligamentum arteriosum (remnant of ductus arteriosus)",
    "histologyVi": "Thành động mạch đàn hồi lớn giàu sợi chun chịu xung lực tống máu tâm thu với áp lực cao (hiệu ứng Windkessel)",
    "histologyEn": "Large elastic artery with rich elastin network dampening systolic pulse wave (Windkessel effect)",
    "clinicalNotesVi": "Phình cung động mạch chủ có thể chèn ép thần kinh thanh quản quặt ngược trái gây khàn tiếng (hội chứng Ortner) hoặc chèn ép khí phế quản gây khó thở.",
    "clinicalNotesEn": "Aortic arch aneurysm can compress left recurrent laryngeal nerve causing hoarseness (Ortner syndrome) or trachea/bronchus causing dyspnea."
  },
  {
    "id": "brachiocephalic_trunk",
    "nameVi": "Thân cánh tay đầu",
    "nameEn": "Brachiocephalic Trunk",
    "nameLa": "Truncus brachiocephalicus",
    "type": "artery",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Brachiocephalic trunk",
    "meshNodeNames": [
      "Brachiocephalic trunk"
    ],
    "canonicalCenter": [
      0.044,
      0.6045,
      0.0036
    ],
    "cameraPreset": {
      "target": [
        0.044,
        0.6045,
        0.0036
      ],
      "position": [
        0.054,
        0.6345,
        0.2036
      ]
    },
    "dimensions": "Đường kính ~1.2 - 1.5 cm, dài 4 - 5 cm",
    "originVi": "Nhánh đầu tiên và lớn nhất xuất phát từ cung động mạch chủ",
    "originEn": "First and largest branch arising from the convexity of aortic arch",
    "branchesVi": [
      "Động mạch cảnh chung phải",
      "Động mạch dưới đòn phải"
    ],
    "branchesEn": [
      "Right common carotid artery",
      "Right subclavian artery"
    ],
    "territoryVi": "Cấp máu cho nửa phải của đầu, cổ, não và toàn bộ chi trên bên phải",
    "territoryEn": "Supplies right side of head, neck, brain, and entire right upper extremity",
    "anastomosesVi": "Chẽ đôi tại khớp ức đòn phải thành động mạch cảnh chung và dưới đòn",
    "anastomosesEn": "Bifurcates behind right sternoclavicular joint into right common carotid and right subclavian",
    "histologyVi": "Động mạch chuyển tiếp từ cấu trúc đàn hồi sang cơ (elastic-to-muscular transition)",
    "histologyEn": "Transitional elastic-to-muscular arterial wall maintaining forward hemodynamic flow",
    "clinicalNotesVi": "Có thể bị chèn ép hoặc thuyên tắc trong hội chứng Takayasu (viêm động mạch vô mạch) hoặc tổn thương do chấn thương ngực kín đụng dập xương ức.",
    "clinicalNotesEn": "Involved in Takayasu arteritis (pulseless disease); vulnerable to blunt deceleration chest trauma behind sternoclavicular joint."
  },
  {
    "id": "thoracic_aorta",
    "nameVi": "Động mạch chủ ngực",
    "nameEn": "Thoracic Aorta",
    "nameLa": "Aorta thoracica",
    "type": "artery",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Thoracic aorta",
    "meshNodeNames": [
      "Thoracic aorta"
    ],
    "canonicalCenter": [
      0.0626,
      0.4746,
      -0.042
    ],
    "cameraPreset": {
      "target": [
        0.0626,
        0.4746,
        -0.042
      ],
      "position": [
        0.0726,
        0.4746,
        0.258
      ]
    },
    "dimensions": "Đường kính ~2.0 - 2.3 cm, dài ~20 cm",
    "originVi": "Tiếp nối cung động mạch chủ ở bờ dưới đốt sống ngực T4",
    "originEn": "Continuation of aortic arch at lower border of T4 vertebra",
    "branchesVi": [
      "Các động mạch gian sườn sau (3-11)",
      "Động mạch phế quản",
      "Động mạch thực quản",
      "Động mạch trung thất và màng tim"
    ],
    "branchesEn": [
      "Posterior intercostal arteries (3-11)",
      "Bronchial arteries",
      "Esophageal arteries",
      "Mediastinal and pericardial branches"
    ],
    "territoryVi": "Cấp máu cho thành ngực, phổi (nhu mô), thực quản, màng phổi và các cấu trúc trung thất sau",
    "territoryEn": "Supplies thoracic wall, pulmonary parenchyma, esophagus, and posterior mediastinum",
    "anastomosesVi": "Nối tiếp động mạch chủ bụng sau khi chui qua lỗ động mạch chủ của cơ hoành ngang mức T12",
    "anastomosesEn": "Transitions into abdominal aorta after passing through aortic hiatus of diaphragm at T12",
    "histologyVi": "Lớp áo giữa chuyển dần từ dạng đàn hồi (đoạn trên) sang dạng cơ chiếm ưu thế (đoạn dưới)",
    "histologyEn": "Tunica media gradually shifts from elastic lamellae to vascular smooth muscle cells",
    "clinicalNotesVi": "Phân loại Bóc tách thành động mạch chủ Stanford type B bắt nguồn từ đây (sau chỗ xuất phát ĐM dưới đòn trái), điều trị nội khoa hoặc TEVAR (đặt stent graft).",
    "clinicalNotesEn": "Primary site of Stanford type B aortic dissection; managed medically or by Thoracic Endovascular Aortic Repair (TEVAR)."
  },
  {
    "id": "abdominal_aorta",
    "nameVi": "Động mạch chủ bụng",
    "nameEn": "Abdominal Aorta",
    "nameLa": "Aorta abdominalis",
    "type": "artery",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Abdominal aorta",
    "meshNodeNames": [
      "Abdominal aorta"
    ],
    "canonicalCenter": [
      0.0539,
      0.2846,
      -0.0009
    ],
    "cameraPreset": {
      "target": [
        0.0539,
        0.2846,
        -0.0009
      ],
      "position": [
        0.0639,
        0.2646,
        0.2991
      ]
    },
    "dimensions": "Đường kính ~1.8 - 2.0 cm ở gốc, thuôn nhỏ còn 1.5 cm trước khi chia đôi",
    "originVi": "Lỗ động mạch chủ cơ hoành (mức T12), chạy trước cột sống thắt lưng đến bờ dưới L4",
    "originEn": "Aortic hiatus of diaphragm at T12, descending anterior to spine to lower border of L4",
    "branchesVi": [
      "Thân tạng (T12)",
      "ĐM mạc treo tràng trên (L1)",
      "ĐM thận (L1-L2)",
      "ĐM mạc treo tràng dưới (L3)",
      "ĐM chậu chung (L4)"
    ],
    "branchesEn": [
      "Celiac trunk (T12)",
      "Superior mesenteric artery (L1)",
      "Renal arteries (L1-L2)",
      "Inferior mesenteric artery (L3)",
      "Common iliac bifurcation (L4)"
    ],
    "territoryVi": "Cấp máu cho toàn bộ các tạng trong ổ bụng, khung chậu và hai chi dưới",
    "territoryEn": "Supplies all abdominal viscera, pelvis, perineum, and bilateral lower extremities",
    "anastomosesVi": "Tận cùng bằng cách chẽ đôi thành hai động mạch chậu chung trái và phải ngang mức rốn (đốt sống L4)",
    "anastomosesEn": "Terminates by bifurcating into left and right common iliac arteries at L4 vertebra",
    "histologyVi": "Động mạch cơ lớn với áo trong có màng chun trong rõ, áo giữa nhiều sợi cơ trơn",
    "histologyEn": "Muscular-conducting artery with prominent internal elastic lamina and smooth muscle matrix",
    "clinicalNotesVi": "Phình động mạch chủ bụng (AAA) thường gặp ở đoạn dưới thận; nguy cơ vỡ tử vong cao nếu đường kính > 5.5 cm. Tầm soát bằng siêu âm Doppler.",
    "clinicalNotesEn": "Abdominal aortic aneurysm (AAA) most common infrarenal; high rupture mortality when diameter > 5.5 cm; screened by Doppler ultrasound.",
    "pulsePalpationVi": "Bắt mạch sâu vùng thượng vị - quanh rốn khi bệnh nhân nằm ngửa, thành bụng giãn",
    "pulsePalpationEn": "Deep bimanual palpation in epigastric/umbilical midline in supine patient"
  },
  {
    "id": "superior_vena_cava",
    "nameVi": "Tĩnh mạch chủ trên",
    "nameEn": "Superior Vena Cava",
    "nameLa": "Vena cava superior",
    "type": "vein",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Superior vena cava",
    "meshNodeNames": [
      "Superior vena cava"
    ],
    "canonicalCenter": [
      0.0264,
      0.559,
      0.0088
    ],
    "cameraPreset": {
      "target": [
        0.0264,
        0.559,
        0.0088
      ],
      "position": [
        0.0364,
        0.589,
        0.2288
      ]
    },
    "dimensions": "Đường kính ~2.0 cm, dài ~7 cm, không có van tĩnh mạch",
    "originVi": "Hợp lưu của 2 tĩnh mạch cánh tay đầu trái và phải sau khớp ức sườn 1 phải",
    "originEn": "Confluence of left and right brachiocephalic veins behind right 1st costal cartilage",
    "branchesVi": [
      "Tĩnh mạch đơn (Azygos vein) cắm vào mặt sau ở mức T4"
    ],
    "branchesEn": [
      "Azygos vein arching over right lung root to enter posterior SVC at T4"
    ],
    "territoryVi": "Dẫn toàn bộ máu tĩnh mạch từ đầu, mặt, cổ, hai chi trên và thành ngực về tâm nhĩ phải",
    "territoryEn": "Returns systemic venous blood from head, neck, upper limbs, and thorax to right atrium",
    "anastomosesVi": "Đổ trực tiếp vào phần trên - sau của tâm nhĩ phải ở ngang mức sụn sườn 3 phải",
    "anastomosesEn": "Drains directly into posterosuperior aspect of right atrium at right 3rd costal cartilage",
    "histologyVi": "Tĩnh mạch lớn với áo trong mỏng, áo ngoài (adventitia) dày chứa các bó cơ trơn dọc (longitudinal smooth muscle)",
    "histologyEn": "Large vein with thin media and thick adventitia containing longitudinal smooth muscle bundles",
    "clinicalNotesVi": "Hội chứng tĩnh mạch chủ trên (SVC syndrome) do u phổi trung thất hoặc u lympho chèn ép, gây phù áo khoác (phù mặt, cổ, chi trên) và tuần hoàn bàng hệ ngực.",
    "clinicalNotesEn": "Superior vena cava syndrome caused by bronchogenic carcinoma or lymphoma; leads to facial plethora, distended neck veins, and chest collaterals."
  },
  {
    "id": "inferior_vena_cava_thoracic",
    "nameVi": "Tĩnh mạch chủ dưới đoạn ngực",
    "nameEn": "Inferior Vena Cava (Thoracic Part)",
    "nameLa": "Vena cava inferior (pars thoracica)",
    "type": "vein",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Inferior vena cava (thoracic part)",
    "meshNodeNames": [
      "Inferior vena cava (thoracic part)"
    ],
    "canonicalCenter": [
      0.0296,
      0.3962,
      0.0062
    ],
    "cameraPreset": {
      "target": [
        0.0296,
        0.3962,
        0.0062
      ],
      "position": [
        0.0396,
        0.4162,
        0.2062
      ]
    },
    "dimensions": "Dài ~2 - 3 cm trong khoang màng tim, đường kính ~2.5 - 3.5 cm",
    "originVi": "Chui qua lỗ tĩnh mạch chủ ở gân trung tâm cơ hoành ở mức đốt sống T8",
    "originEn": "Passes through vena caval foramen in central tendon of diaphragm at T8 vertebra",
    "branchesVi": [
      "Nhận máu từ tĩnh mạch hoành dưới và toàn bộ dòng hồi lưu từ đoạn bụng"
    ],
    "branchesEn": [
      "Receives inferior phrenic veins and the entire upstream infra-diaphragmatic inflow"
    ],
    "territoryVi": "Dẫn toàn bộ máu khử oxy từ nửa dưới cơ thể (chi dưới, khung chậu, ổ bụng) về tim",
    "territoryEn": "Carries deoxygenated blood from lower body (limbs, pelvis, abdomen) into right atrium",
    "anastomosesVi": "Đổ vào góc dưới sau của tâm nhĩ phải, có van Eustachian (di tích phôi thai) che chở một phần lỗ đổ",
    "anastomosesEn": "Enters inferoposterior right atrium, guarded by Eustachian valve (valvula venae cavae inferioris)",
    "histologyVi": "Thành tĩnh mạch có lớp áo ngoài dày hợp nhất với mô liên kết cơ hoành và màng ngoài tim",
    "histologyEn": "Venous wall firmly attached to diaphragmatic margin preventing collapse during respiration",
    "clinicalNotesVi": "Áp lực tĩnh mạch chủ dưới biến đổi theo nhịp thở; đường kính và mức độ xẹp trên siêu âm tim phản ánh chính xác thể tích tuần hoàn và áp lực nhĩ phải.",
    "clinicalNotesEn": "Inspiratory collapsibility index of thoracic IVC reflects central venous pressure and volume responsiveness in critical care."
  },
  {
    "id": "brachiocephalic_veins",
    "nameVi": "Các tĩnh mạch cánh tay đầu",
    "nameEn": "Brachiocephalic Veins",
    "nameLa": "Venae brachiocephalicae (dextra et sinistra)",
    "type": "vein",
    "region": "aorta_great_vessels",
    "primaryNodeName": "Left brachiocephalic vein",
    "meshNodeNames": [
      "Left brachiocephalic vein",
      "Right brachiocephalic vein"
    ],
    "canonicalCenter": [
      0.037,
      0.5973,
      0.0139
    ],
    "cameraPreset": {
      "target": [
        0.037,
        0.5973,
        0.0139
      ],
      "position": [
        0.047,
        0.6173,
        0.2139
      ]
    },
    "dimensions": "TM trái dài ~6 cm bắt chéo sau cán ức; TM phải dài ~2.5 cm chạy thẳng đứng",
    "originVi": "Hợp lưu của tĩnh mạch cảnh trong và tĩnh mạch dưới đòn sau mỗi khớp ức đòn",
    "originEn": "Union of internal jugular and subclavian veins behind each sternoclavicular joint",
    "branchesVi": [
      "Tĩnh mạch giáp dưới",
      "Tĩnh mạch ngực trong",
      "Tĩnh mạch gian sườn trên"
    ],
    "branchesEn": [
      "Inferior thyroid veins",
      "Internal thoracic veins",
      "Superior intercostal veins"
    ],
    "territoryVi": "Thu nhận máu tĩnh mạch từ não, mặt, cổ và chi trên hai bên, cùng dịch bạch huyết từ ống ngực",
    "territoryEn": "Drains head, neck, brain, and upper limbs; receives thoracic duct (left) and right lymphatic duct",
    "anastomosesVi": "Hai tĩnh mạch hợp nhất tạo thành tĩnh mạch chủ trên",
    "anastomosesEn": "Join together behind right 1st costal cartilage to form superior vena cava",
    "histologyVi": "Thành tĩnh mạch đàn hồi mềm dẻo, lớp áo giữa mỏng, màng trong nhẵn bóng",
    "histologyEn": "Thin-walled large systemic veins with compliant collagen-rich adventitia",
    "clinicalNotesVi": "Góc tĩnh mạch Pirogoff (nơi TM cảnh trong gặp TM dưới đòn) là điểm đổ vào của ống ngực (thoracic duct) dẫn toàn bộ dịch bạch huyết cơ thể.",
    "clinicalNotesEn": "Left venous angle (Pirogoff angle) receives thoracic duct draining 75% of lymphatic volume into systemic circulation."
  },
  {
    "id": "left_coronary_artery",
    "nameVi": "Động mạch vành trái (Thân chung LMCA)",
    "nameEn": "Left Coronary Artery (Left Main)",
    "nameLa": "Arteria coronaria sinistra",
    "type": "artery",
    "region": "coronary",
    "primaryNodeName": "Left coronary artery",
    "meshNodeNames": [
      "Left coronary artery"
    ],
    "canonicalCenter": [
      0.0779,
      0.5229,
      0.0131
    ],
    "cameraPreset": {
      "target": [
        0.0779,
        0.5229,
        0.0131
      ],
      "position": [
        0.0879,
        0.5429,
        0.1631
      ]
    },
    "dimensions": "Đường kính ~4.0 - 5.0 mm, dài 10 - 25 mm trước khi chia nhánh",
    "originVi": "Xoang Valsalva động mạch chủ trái (xoang vành trái)",
    "originEn": "Left aortic sinus of Valsalva above left aortic semilunar cusp",
    "branchesVi": [
      "Nhánh gian thất trước (LAD)",
      "Nhánh mũ (LCx)",
      "Đôi khi có nhánh trung gian (Ramus intermedius)"
    ],
    "branchesEn": [
      "Anterior interventricular (LAD)",
      "Circumflex (LCx)",
      "Intermediate branch (Ramus intermedius)"
    ],
    "territoryVi": "Cấp máu cho tâm nhĩ trái, phần lớn tâm thất trái, 2/3 trước vách gian thất và bó His",
    "territoryEn": "Supplies left atrium, majority of left ventricle, anterior two-thirds of interventricular septum, and bundle of His",
    "anastomosesVi": "Nối với các nhánh của động mạch vành phải qua mạng lưới mao mạch màng ngoài tim và chóp tim",
    "anastomosesEn": "Microvascular anastomoses with RCA branches at cardiac apex and crux cordis",
    "histologyVi": "Động mạch cơ cỡ vừa chịu ứng suất dòng máu dao động mạnh theo chu kỳ tâm trương tim",
    "histologyEn": "Muscular artery subjected to intense phasic flow occurring almost entirely during ventricular diastole",
    "clinicalNotesVi": "Tắc nghẽn thân chung ĐM vành trái (Left Main stenosis > 50%) được gọi là 'tổn thương góa phụ' (widow-maker lesion), là chỉ định tuyệt đối phẫu thuật bắc cầu CABG khẩn.",
    "clinicalNotesEn": "Critical stenosis (>50%) of Left Main trunk is known as a widow-maker lesion; mandatory indication for emergent CABG surgery."
  },
  {
    "id": "anterior_interventricular_artery",
    "nameVi": "Nhánh gian thất trước (LAD)",
    "nameEn": "Anterior Interventricular Artery (LAD)",
    "nameLa": "Ramus interventricularis anterior arteriae coronariae sinistrae",
    "type": "artery",
    "region": "coronary",
    "primaryNodeName": "Anterior interventricular artery",
    "meshNodeNames": [
      "Anterior interventricular artery"
    ],
    "canonicalCenter": [
      0.1078,
      0.4736,
      0.0454
    ],
    "cameraPreset": {
      "target": [
        0.1078,
        0.4736,
        0.0454
      ],
      "position": [
        0.1178,
        0.4836,
        0.2054
      ]
    },
    "dimensions": "Đường kính ~3.5 - 4.0 mm ở gốc, dài ~10 - 15 cm theo rãnh gian thất trước",
    "originVi": "Nhánh tận trước của thân chung động mạch vành trái",
    "originEn": "Direct anterior terminal branch of left main coronary artery",
    "branchesVi": [
      "Các nhánh đường chéo (Diagonal branches D1, D2)",
      "Các nhánh vách gian thất trước (Septal perforators)"
    ],
    "branchesEn": [
      "Diagonal branches (D1, D2, D3)",
      "Anterior septal perforating branches (S1, S2)"
    ],
    "territoryVi": "Mặt trước và mỏm tâm thất trái, 2/3 trước vách gian thất và trụ cơ trước - bên",
    "territoryEn": "Anterior wall and apex of left ventricle, anterior 2/3 of septum, and anterolateral papillary muscle",
    "anastomosesVi": "Uốn quanh mỏm tim (incisura apicis cordis) nối với động mạch gian thất sau (PDA)",
    "anastomosesEn": "Anastomoses around cardiac notch at apex with posterior descending artery (PDA)",
    "histologyVi": "Động mạch cơ có lớp nội mô dễ bị tổn thương bởi lực xé cắt dòng máu (shear stress) gây mảng xơ vữa",
    "histologyEn": "Muscular coronary artery prone to endothelial shear-stress injury and atheroma formation",
    "clinicalNotesVi": "Động mạch bị nhồi máu cơ tim (STEMI thành trước) thường gặp nhất (45-50% tổng số ca NMCT); có thể gây sốc tim, rối loạn nhịp thất chết người hoặc thủng vách tim.",
    "clinicalNotesEn": "Most commonly occluded artery in myocardial infarction (anterior STEMI, 45-50% cases); causes cardiogenic shock and ventricular free-wall/septal rupture."
  },
  {
    "id": "circumflex_artery",
    "nameVi": "Nhánh mũ động mạch vành trái (LCx)",
    "nameEn": "Circumflex Artery of Heart (LCx)",
    "nameLa": "Ramus circumflexus arteriae coronariae sinistrae",
    "type": "artery",
    "region": "coronary",
    "primaryNodeName": "Circumflex artery of heart",
    "meshNodeNames": [
      "Circumflex artery of heart"
    ],
    "canonicalCenter": [
      0.1112,
      0.4777,
      0.007
    ],
    "cameraPreset": {
      "target": [
        0.1112,
        0.4777,
        0.007
      ],
      "position": [
        0.1212,
        0.4977,
        0.167
      ]
    },
    "dimensions": "Đường kính ~3.0 - 3.5 mm, chạy vòng trong rãnh vành sang mặt sau tim",
    "originVi": "Nhánh tận thứ hai của thân chung động mạch vành trái",
    "originEn": "Second terminal bifurcation branch of left main coronary artery",
    "branchesVi": [
      "Các nhánh bờ tù (Obtuse marginal OM1, OM2)",
      "Nhánh nhĩ trái",
      "Nhánh nút xoang nhĩ (ở 40% người)"
    ],
    "branchesEn": [
      "Obtuse marginal branches (OM1, OM2)",
      "Left atrial circumflex branches",
      "SA nodal branch (in 40% of individuals)"
    ],
    "territoryVi": "Thành bên và thành sau dưới của tâm thất trái cùng tâm nhĩ trái",
    "territoryEn": "Posterolateral and lateral free walls of left ventricle and left atrium",
    "anastomosesVi": "Nối tiếp với nhánh tận của động mạch vành phải tại rãnh vành sau",
    "anastomosesEn": "Anastomoses with distal right coronary artery branches in posterior atrioventricular groove",
    "histologyVi": "Động mạch cơ chạy uốn lượn được đệm trong mỡ rãnh vành dưới lá tạng màng ngoài tim",
    "histologyEn": "Muscular artery embedded in subepicardial adipose cushion within coronary sulcus",
    "clinicalNotesVi": "Tắc LCx gây nhồi máu cơ tim thành bên hoặc thành sau (lateral/posterior STEMI), biểu hiện bằng sóng ST chênh lên ở DI, aVL, V5, V6 hoặc ST chênh xuống ở V1-V3.",
    "clinicalNotesEn": "LCx occlusion produces lateral or posterior STEMI, seen as ST-elevation in I, aVL, V5, V6 or reciprocal ST-depression in anterior leads V1-V3."
  },
  {
    "id": "septal_branches_lad",
    "nameVi": "Các nhánh vách gian thất của LAD",
    "nameEn": "Septal Branches of Anterior Interventricular Artery",
    "nameLa": "Rami interventriculares septales",
    "type": "artery",
    "region": "coronary",
    "primaryNodeName": "Septal branches of anterior interventricular artery",
    "meshNodeNames": [
      "Septal branches of anterior interventricular artery"
    ],
    "canonicalCenter": [
      0.1025,
      0.4782,
      0.0532
    ],
    "cameraPreset": {
      "target": [
        0.1025,
        0.4782,
        0.0532
      ],
      "position": [
        0.1125,
        0.4882,
        0.1932
      ]
    },
    "dimensions": "Đường kính ~1.0 - 1.5 mm, đâm sâu 90 độ vào mô cơ vách gian thất",
    "originVi": "Tách vuông góc từ mặt sâu của động mạch gian thất trước (LAD)",
    "originEn": "Arise perpendicularly from deep surface of anterior interventricular artery",
    "branchesVi": [
      "Nhánh vách lớn thứ nhất (S1 - nuôi hệ thống dẫn truyền)",
      "Các nhánh vách S2-S6"
    ],
    "branchesEn": [
      "First septal perforator (S1 - supplies conduction bundle)",
      "Subsequent septal perforators (S2-S6)"
    ],
    "territoryVi": "2/3 trước của vách gian thất, bó His và phần đầu của 2 nhánh dẫn truyền Tawara",
    "territoryEn": "Anterior 2/3 of interventricular septum, bundle of His, and bundle branches",
    "anastomosesVi": "Nối sâu trong cơ tim với các nhánh vách sau của động mạch gian thất sau (PDA)",
    "anastomosesEn": "Intramyocardial deep anastomoses with posterior septal perforators from PDA",
    "histologyVi": "Tiểu động mạch đâm sâu được bao quanh bởi các bó sợi cơ tim co bóp",
    "histologyEn": "Penetrating muscular arterioles surrounded by contractile syncytial cardiomyocytes",
    "clinicalNotesVi": "Mục tiêu điều trị trong can thiệp làm mỏng vách ngăn bằng cồn (Alcohol Septal Ablation) ở bệnh cơ tim phì đại tắc nghẽn (HOCM); tổn thương gây blốc nhánh tim.",
    "clinicalNotesEn": "Target of alcohol septal ablation for hypertrophic obstructive cardiomyopathy (HOCM); occlusion causes complete bundle branch block."
  },
  {
    "id": "right_coronary_artery",
    "nameVi": "Động mạch vành phải (RCA)",
    "nameEn": "Right Coronary Artery",
    "nameLa": "Arteria coronaria dextra",
    "type": "artery",
    "region": "coronary",
    "primaryNodeName": "Right coronary artery",
    "meshNodeNames": [
      "Right coronary artery"
    ],
    "canonicalCenter": [
      0.0654,
      0.4767,
      0.031
    ],
    "cameraPreset": {
      "target": [
        0.0654,
        0.4767,
        0.031
      ],
      "position": [
        0.0754,
        0.4967,
        0.211
      ]
    },
    "dimensions": "Đường kính ~3.5 - 4.0 mm, dài ~12 - 14 cm",
    "originVi": "Xoang Valsalva động mạch chủ trước - phải (xoang vành phải)",
    "originEn": "Anterior (right) aortic sinus of Valsalva",
    "branchesVi": [
      "Nhánh nút xoang nhĩ (SA node, 60%)",
      "Nhánh nón (Conus branch)",
      "Nhánh bờ phải",
      "ĐM gian thất sau (PDA, 85%)",
      "Nhánh nút nhĩ thất (AV node, 85%)"
    ],
    "branchesEn": [
      "SA nodal branch (60%)",
      "Conus branch",
      "Right marginal branch",
      "Posterior descending artery (PDA, 85%)",
      "AV nodal branch (85%)"
    ],
    "territoryVi": "Tâm nhĩ phải, hầu hết tâm thất phải, thành hoành tâm thất trái, 1/3 sau vách gian thất, nút SA và nút AV",
    "territoryEn": "Right atrium, most of right ventricle, diaphragmatic surface of LV, posterior 1/3 septum, SA and AV nodes",
    "anastomosesVi": "Nối ở rãnh vành với nhánh mũ và ở mỏm tim với LAD",
    "anastomosesEn": "Anastomoses at coronary sulcus with LCx and at cardiac apex with LAD",
    "histologyVi": "Động mạch cơ giàu sợi đàn hồi, có áp lực tưới máu cả trong kỳ tâm thu và tâm trương",
    "histologyEn": "Muscular artery exhibiting dual systolic and diastolic flow due to lower right ventricular pressures",
    "clinicalNotesVi": "Nhồi máu cơ tim thành dưới (inferior STEMI, DII-DIII-aVF) thường do tắc RCA; kèm nguy cơ rối loạn nhịp chậm nghiêm trọng (blốc nhĩ thất độ II/III) và nhồi máu thất phải.",
    "clinicalNotesEn": "Inferior STEMI (leads II, III, aVF) predominantly caused by RCA occlusion; accompanied by high risk of AV block, sinus bradycardia, and RV infarction."
  },
  {
    "id": "right_inferolateral_branch",
    "nameVi": "Nhánh bờ phải của động mạch vành",
    "nameEn": "Right Marginal Branch of RCA",
    "nameLa": "Ramus marginalis dexter arteriae coronariae dextrae",
    "type": "artery",
    "region": "coronary",
    "primaryNodeName": "Right inferolateral branch of right coronary artery",
    "meshNodeNames": [
      "Right inferolateral branch of right coronary artery"
    ],
    "canonicalCenter": [
      0.1012,
      0.4319,
      0.0058
    ],
    "cameraPreset": {
      "target": [
        0.1012,
        0.4319,
        0.0058
      ],
      "position": [
        0.1112,
        0.4419,
        0.1558
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.0 mm, chạy dọc bờ dưới tâm thất phải",
    "originVi": "Tách ra từ đoạn giữa động mạch vành phải tại bờ sắc (margo acutus) của tim",
    "originEn": "Arises from acute margin of heart from right coronary artery",
    "branchesVi": [
      "Các nhánh cơ tâm thất phải",
      "Các nhánh vi mạch mỏm tim"
    ],
    "branchesEn": [
      "Right ventricular free wall branches",
      "Apical microvascular collaterals"
    ],
    "territoryVi": "Cấp máu cho thành trước dưới và cơ tự do tâm thất phải đến gần mỏm tim",
    "territoryEn": "Supplies myocardium of anteroinferior free wall of right ventricle towards apex",
    "anastomosesVi": "Nối với các nhánh mỏm tim của LAD",
    "anastomosesEn": "Anastomoses distally with apical terminal branches of anterior descending artery",
    "histologyVi": "Động mạch cơ nhỏ nằm dưới màng ngoài tim",
    "histologyEn": "Small subepicardial muscular artery supplying low-pressure ventricular wall",
    "clinicalNotesVi": "Quan trọng trong việc bảo tồn chức năng bơm máu của thất phải khi có bệnh tim phổi hoặc nhồi máu cơ tim thất phải.",
    "clinicalNotesEn": "Preserves RV systolic function; critical marker during coronary angiography for right ventricular involvement."
  },
  {
    "id": "great_cardiac_vein",
    "nameVi": "Tĩnh mạch tim lớn",
    "nameEn": "Great Cardiac Vein",
    "nameLa": "Vena cardiaca magna",
    "type": "vein",
    "region": "coronary",
    "primaryNodeName": "Great cardiac vein",
    "meshNodeNames": [
      "Great cardiac vein"
    ],
    "canonicalCenter": [
      0.1126,
      0.4694,
      0.0222
    ],
    "cameraPreset": {
      "target": [
        0.1126,
        0.4694,
        0.0222
      ],
      "position": [
        0.1226,
        0.4894,
        0.1822
      ]
    },
    "dimensions": "Đường kính ~3 - 5 mm, dài ~10 - 12 cm",
    "originVi": "Khởi đầu tại mỏm tim, đi cùng LAD trong rãnh gian thất trước",
    "originEn": "Begins at apex of heart, ascends alongside LAD in anterior interventricular sulcus",
    "branchesVi": [
      "Nhận các nhánh tĩnh mạch từ vách gian thất và thành tự do 2 tâm thất"
    ],
    "branchesEn": [
      "Receives tributaries from interventricular septum and left ventricular free wall"
    ],
    "territoryVi": "Dẫn lưu máu từ toàn bộ thành trước tâm thất trái và phần lớn vách gian thất",
    "territoryEn": "Drains venous blood from anterior wall of left ventricle and anterior interventricular septum",
    "anastomosesVi": "Uốn cong vào rãnh vành trái cùng LCx, tiếp nối liên tục thành xoang tĩnh mạch vành",
    "anastomosesEn": "Curves into left atrioventricular groove alongside LCx and enlarges into coronary sinus",
    "histologyVi": "Tĩnh mạch cơ không van, có thành mỏng giàu sợi collagen và tế bào cơ trơn",
    "histologyEn": "Compliant muscular vein with thin wall lacking robust valves in anterior groove",
    "clinicalNotesVi": "Đường đi chủ đạo để luồn dây điện cực thất trái (left ventricular lead) trong phẫu thuật cấy máy tái đồng bộ tim (CRT - Cardiac Resynchronization Therapy).",
    "clinicalNotesEn": "Primary anatomical conduit for cannulation and LV pacing lead placement in Cardiac Resynchronization Therapy (CRT)."
  },
  {
    "id": "middle_cardiac_vein",
    "nameVi": "Tĩnh mạch tim giữa",
    "nameEn": "Middle Cardiac Vein",
    "nameLa": "Vena cardiaca media",
    "type": "vein",
    "region": "coronary",
    "primaryNodeName": "Middle cardiac vein",
    "meshNodeNames": [
      "Middle cardiac vein"
    ],
    "canonicalCenter": [
      0.0884,
      0.4382,
      0.0276
    ],
    "cameraPreset": {
      "target": [
        0.0884,
        0.4382,
        0.0276
      ],
      "position": [
        0.0984,
        0.4482,
        0.1776
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.5 mm, dài ~8 cm",
    "originVi": "Khởi đầu ở mỏm tim, chạy ngược lên trong rãnh gian thất sau cùng PDA",
    "originEn": "Originates at apex, runs superiorly in posterior interventricular sulcus with PDA",
    "branchesVi": [
      "Nhận tĩnh mạch từ thành sau của hai tâm thất và vách gian thất sau"
    ],
    "branchesEn": [
      "Receives tributaries from posterior walls of ventricles and posterior septum"
    ],
    "territoryVi": "Dẫn lưu máu khử oxy từ mặt hoành tâm thất và vách gian thất sau",
    "territoryEn": "Drains diaphragmatic aspect of left and right ventricles and posterior septum",
    "anastomosesVi": "Đổ vào tận cùng bên phải của xoang tĩnh mạch vành gần lối vào nhĩ phải",
    "anastomosesEn": "Empties into the right extremity of coronary sinus near its atrial orifice",
    "histologyVi": "Tĩnh mạch thành mỏng, đoạn tận cùng có van nhỏ (van Vieussens)",
    "histologyEn": "Thin-walled venous vessel guarded near its termination by valve of Vieussens",
    "clinicalNotesVi": "Vị trí thay thế để đưa dây điện cực tạo nhịp thất trái trong CRT khi tĩnh mạch tim lớn hoặc nhánh bên không thể tiếp cận.",
    "clinicalNotesEn": "Alternative route for transvenous epicardial LV lead deployment in biventricular pacing."
  },
  {
    "id": "coronary_sinus",
    "nameVi": "Xoang tĩnh mạch vành",
    "nameEn": "Coronary Sinus",
    "nameLa": "Sinus coronarius",
    "type": "vein",
    "region": "coronary",
    "primaryNodeName": "Coronary sinus",
    "meshNodeNames": [
      "Coronary sinus"
    ],
    "canonicalCenter": [
      0.0701,
      0.4599,
      -0.0129
    ],
    "cameraPreset": {
      "target": [
        0.0701,
        0.4599,
        -0.0129
      ],
      "position": [
        0.0801,
        0.4799,
        0.1571
      ]
    },
    "dimensions": "Đường kính ~8 - 12 mm, dài ~2.5 - 3.0 cm",
    "originVi": "Nằm trong rãnh vành sau giữa tâm nhĩ trái và tâm thất trái",
    "originEn": "Located in posterior part of coronary groove between left atrium and left ventricle",
    "branchesVi": [
      "Tĩnh mạch tim lớn",
      "Tĩnh mạch tim giữa",
      "Tĩnh mạch tim nhỏ",
      "Tĩnh mạch sau thất trái",
      "Tĩnh mạch chéo nhĩ trái (Marshall)"
    ],
    "branchesEn": [
      "Great cardiac vein",
      "Middle cardiac vein",
      "Small cardiac vein",
      "Posterior vein of left ventricle",
      "Oblique vein of left atrium (Marshall)"
    ],
    "territoryVi": "Thu nhận khoảng 65 - 75% toàn bộ lượng máu tĩnh mạch hồi lưu của cơ tim",
    "territoryEn": "Receives approximately 65-75% of total venous drainage from cardiac myocardium",
    "anastomosesVi": "Mở trực tiếp vào tâm nhĩ phải giữa lỗ tĩnh mạch chủ dưới và lỗ nhĩ thất phải qua van Thebesian",
    "anastomosesEn": "Opens into right atrium between IVC orifice and right AV valve; guarded by Thebesian valve",
    "histologyVi": "Ống tĩnh mạch giãn nở rộng với lớp áo cơ tim bao bọc phía ngoài (myocardial sleeve) có khả năng sinh điện học",
    "histologyEn": "Wide venous channel partially enveloped by striated myocardial sleeve capable of arrhythmogenesis",
    "clinicalNotesVi": "Lối vào để thực hiện điện sinh lý tim (EPS), triệt đốt rung nhĩ qua tĩnh mạch Marshall, và thông tim ngược dòng bảo vệ cơ tim trong phẫu thuật hở tim.",
    "clinicalNotesEn": "Gateway for cardiac electrophysiology studies, catheter ablation of atrial arrhythmias, and retrograde cardioplegia infusion in cardiac surgery."
  },
  {
    "id": "cardiac_chambers_perfusion",
    "nameVi": "Buồng tim & Trục cấp máu cơ tim",
    "nameEn": "Cardiac Chambers & Perfusion Core",
    "nameLa": "Cor et valvae",
    "type": "cardiac",
    "region": "coronary",
    "primaryNodeName": "Left ventricle",
    "meshNodeNames": [
      "Left ventricle",
      "Right ventricle",
      "Left atrium",
      "Right atrium"
    ],
    "canonicalCenter": [
      0.0648,
      0.4808,
      0.0203
    ],
    "cameraPreset": {
      "target": [
        0.0648,
        0.4808,
        0.0203
      ],
      "position": [
        0.0748,
        0.5108,
        0.3403
      ]
    },
    "dimensions": "Kích thước tim người trưởng thành ~12 x 8.5 x 6 cm, trọng lượng ~250 - 350g",
    "originVi": "Hệ thống 4 buồng bơm máu trung tâm của cơ thể nằm trong trung thất giữa",
    "originEn": "Central four-chamber muscular double pump located in middle mediastinum",
    "branchesVi": [
      "Thân ĐM phổi (từ thất phải)",
      "ĐM chủ lên (từ thất trái)"
    ],
    "branchesEn": [
      "Pulmonary trunk (from RV)",
      "Ascending aorta (from LV)"
    ],
    "territoryVi": "Cung cấp tuần hoàn máu động mạch đến toàn cơ thể và tuần hoàn trao đổi khí tại phổi",
    "territoryEn": "Drives systemic circulation throughout whole body and pulmonary gas-exchange circuit",
    "anastomosesVi": "Phân cách bởi vách liên nhĩ và vách liên thất với hệ thống van tim 1 chiều",
    "anastomosesEn": "Divided by interatrial and interventricular septa with unidirectional heart valves",
    "histologyVi": "Cơ tim gồm các tế bào cơ vân có vân ngang, liên kết bằng đĩa xen (intercalated discs) và mạng lưới mao mạch dày đặc",
    "histologyEn": "Striated syncytial cardiac myocytes coupled via gap junctions in intercalated discs with dense capillary network",
    "clinicalNotesVi": "Suy tim (HFpEF, HFrEF), bệnh cơ tim giãn nở, viêm cơ tim cấp và các bệnh lý van tim (hẹp/hở van hai lá, van ba lá, van ĐMC).",
    "clinicalNotesEn": "Congestive heart failure, dilated cardiomyopathy, infective endocarditis, and valvular heart disease."
  },
  {
    "id": "common_carotid_artery_left",
    "nameVi": "Động mạch cảnh chung trái",
    "nameEn": "Left Common Carotid Artery",
    "nameLa": "Arteria carotis communis sinistra",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Left common carotid artery",
    "meshNodeNames": [
      "Left common carotid artery"
    ],
    "canonicalCenter": [
      0.0724,
      0.6531,
      -0.0098
    ],
    "cameraPreset": {
      "target": [
        0.0724,
        0.6531,
        -0.0098
      ],
      "position": [
        0.0824,
        0.6731,
        0.1702
      ]
    },
    "dimensions": "Đường kính ~6 - 8 mm, dài ~10 - 13 cm",
    "originVi": "Nhánh trực tiếp thứ 2 từ mặt lồi cung động mạch chủ trong trung thất trên",
    "originEn": "Direct second branch from convexity of aortic arch in superior mediastinum",
    "branchesVi": [
      "Động mạch cảnh trong trái",
      "Động mạch cảnh ngoài trái"
    ],
    "branchesEn": [
      "Left internal carotid artery",
      "Left external carotid artery"
    ],
    "territoryVi": "Cấp máu cho toàn bộ bán cầu đại não trái, mắt trái và cấu trúc nửa đầu mặt cổ trái",
    "territoryEn": "Supplies left cerebral hemisphere, left eye, and left viscerocranial structures",
    "anastomosesVi": "Chẽ đôi ngang mức bờ trên sụn giáp (đốt sống cổ C3-C4) tại xoang cảnh",
    "anastomosesEn": "Bifurcates at upper border of thyroid cartilage (C3-C4 vertebra) at carotid sinus",
    "histologyVi": "Động mạch đàn hồi chuyển sang cơ, vùng xoang cảnh giàu thụ thể áp lực (baroreceptors)",
    "histologyEn": "Elastic-to-muscular artery with carotid sinus baroreceptor adventitial plexus innervated by CN IX",
    "clinicalNotesVi": "Xoang cảnh (carotid sinus) nhạy cảm với áp lực, xoa xoang cảnh có thể kích thích phó giao cảm cắt cơn nhịp nhanh trên thất (SVT) nhưng nguy cơ ngừng tim nếu quá mẫn.",
    "clinicalNotesEn": "Carotid sinus massage stimulates vagal tone to terminate SVT; carotid stenosis screened by carotid duplex ultrasound.",
    "pulsePalpationVi": "Bắt mạch giữa bờ trước cơ ức đòn chũm và sụn giáp cổ",
    "pulsePalpationEn": "Palpated between anterior border of sternocleidomastoid and thyroid cartilage"
  },
  {
    "id": "common_carotid_artery_right",
    "nameVi": "Động mạch cảnh chung phải",
    "nameEn": "Right Common Carotid Artery",
    "nameLa": "Arteria carotis communis dextra",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Right common carotid artery",
    "meshNodeNames": [
      "Right common carotid artery"
    ],
    "canonicalCenter": [
      0.0188,
      0.6615,
      -0.0033
    ],
    "cameraPreset": {
      "target": [
        0.0188,
        0.6615,
        -0.0033
      ],
      "position": [
        0.0288,
        0.6815,
        0.1767
      ]
    },
    "dimensions": "Đường kính ~6 - 8 mm, dài ~8 - 10 cm (ngắn hơn nhánh bên trái)",
    "originVi": "Tách ra từ thân cánh tay đầu sau khớp ức đòn phải",
    "originEn": "Arises from bifurcation of brachiocephalic trunk behind right sternoclavicular joint",
    "branchesVi": [
      "Động mạch cảnh trong phải",
      "Động mạch cảnh ngoài phải"
    ],
    "branchesEn": [
      "Right internal carotid artery",
      "Right external carotid artery"
    ],
    "territoryVi": "Cấp máu cho bán cầu đại não phải, mắt phải và các cấu trúc nửa mặt cổ bên phải",
    "territoryEn": "Supplies right cerebral hemisphere, right eye, and right head and neck structures",
    "anastomosesVi": "Chẽ đôi ở mức bờ trên sụn giáp (đốt sống cổ C3-C4) tạo xoang cảnh phải",
    "anastomosesEn": "Bifurcates at upper border of thyroid cartilage (C3-C4) into ICA and ECA",
    "histologyVi": "Động mạch lớn giàu sợi chun và cơ trơn nằm trong bao cảnh cùng TM cảnh trong và TK X",
    "histologyEn": "Runs within carotid sheath with internal jugular vein (lateral) and vagus nerve (posterior)",
    "clinicalNotesVi": "Mảng xơ vữa tại chỗ chẽ đôi động mạch cảnh là nguyên nhân hàng đầu gây cơn thiếu máu não cục bộ thoáng qua (TIA) và đột quỵ nhồi máu não.",
    "clinicalNotesEn": "Atherosclerotic plaque at carotid bifurcation is primary etiology of thromboembolic TIA and ischemic stroke.",
    "pulsePalpationVi": "Bắt mạch rãnh cảnh phải phía trong cơ ức đòn chũm",
    "pulsePalpationEn": "Palpated along medial border of right sternocleidomastoid muscle"
  },
  {
    "id": "internal_carotid_artery",
    "nameVi": "Động mạch cảnh trong",
    "nameEn": "Internal Carotid Artery",
    "nameLa": "Arteria carotis interna",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Internal carotid artery.l",
    "meshNodeNames": [
      "Internal carotid artery.l",
      "Internal carotid artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.7723,
      -0.0002
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.7723,
        -0.0002
      ],
      "position": [
        0.0551,
        0.8023,
        0.1598
      ]
    },
    "dimensions": "Đường kính ~4 - 5 mm; chia 4 đoạn giải phẫu (cổ, đá, hang, não)",
    "originVi": "Chẽ đôi từ động mạch cảnh chung ngang bờ trên sụn giáp C3-C4",
    "originEn": "Originates from common carotid bifurcation at upper border of thyroid cartilage",
    "branchesVi": [
      "ĐM mắt (Ophthalmic)",
      "ĐM thông sau (PCoA)",
      "ĐM màng mạch trước (AChA)",
      "ĐM não trước (ACA)",
      "ĐM não giữa (MCA)"
    ],
    "branchesEn": [
      "Ophthalmic artery",
      "Posterior communicating artery (PCoA)",
      "Anterior choroidal artery (AChA)",
      "Anterior cerebral artery (ACA)",
      "Middle cerebral artery (MCA)"
    ],
    "territoryVi": "Nhãn cầu, não bộ, tuyến yên và màng não trán - đỉnh - thái dương",
    "territoryEn": "Eyeball, pituitary gland, orbit, and anterior and middle regions of cerebral hemisphere",
    "anastomosesVi": "Tạo nên nửa trước vòng động mạch não (Circle of Willis) qua ĐM thông trước và sau",
    "anastomosesEn": "Forms anterior circulation of Circle of Willis via anterior and posterior communicating arteries",
    "histologyVi": "Đoạn trong xương đá và xoang hang uốn cong chữ S (Siphon caroticum) triệt tiêu sóng áp lực mạch nẩy",
    "histologyEn": "S-shaped carotid siphon cushions pulsatile pressure waves before cerebral microcirculation",
    "clinicalNotesVi": "Bóc tách động mạch cảnh trong (ICA dissection) do chấn thương cổ hoặc tự phát gây hội chứng Horner một bên và đột quỵ ở người trẻ; phình xoang hang gây liệt vận nhãn.",
    "clinicalNotesEn": "Internal carotid dissection causes ipsilateral Horner syndrome and ischemic stroke in young adults; cavernous sinus aneurysm compresses CN III, IV, VI."
  },
  {
    "id": "external_carotid_artery",
    "nameVi": "Động mạch cảnh ngoài",
    "nameEn": "External Carotid Artery",
    "nameLa": "Arteria carotis externa",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "External carotid artery.l",
    "meshNodeNames": [
      "External carotid artery.l",
      "External carotid artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.7477,
      -0.0111
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.7477,
        -0.0111
      ],
      "position": [
        0.0551,
        0.7777,
        0.1489
      ]
    },
    "dimensions": "Đường kính ~4 - 5 mm, chạy lên trong tuyến nước bọt mang tai",
    "originVi": "Chẽ đôi từ động mạch cảnh chung tại tam giác cảnh (ngang mức C3-C4)",
    "originEn": "Medial terminal branch of common carotid artery bifurcation at carotid triangle",
    "branchesVi": [
      "ĐM giáp trên",
      "ĐM hầu lên",
      "ĐM lưỡi",
      "ĐM mặt",
      "ĐM chẩm",
      "ĐM tai sau",
      "ĐM thái dương nông",
      "ĐM hàm"
    ],
    "branchesEn": [
      "Superior thyroid",
      "Ascending pharyngeal",
      "Lingual",
      "Facial",
      "Occipital",
      "Posterior auricular",
      "Superficial temporal",
      "Maxillary"
    ],
    "territoryVi": "Cấp máu cho toàn bộ mô mềm mặt, xương hàm, vòm họng, tuyến giáp, da đầu và màng não cứng",
    "territoryEn": "Supplies facial soft tissues, jaws, tongue, pharynx, thyroid gland, scalp, and dura mater",
    "anastomosesVi": "Nối phong phú giữa 2 bên mặt qua đường giữa và nối với ĐM cảnh trong qua ĐM mắt",
    "anastomosesEn": "Extensive bilateral midline anastomoses and orbital collaterals with ICA via ophthalmic branches",
    "histologyVi": "Động mạch cơ phân nhánh nhanh chóng, thành giàu sợi cơ trơn chịu điều hòa giao cảm",
    "histologyEn": "Highly responsive muscular distributing artery controlled by autonomic vasomotor tone",
    "clinicalNotesVi": "Thắt hoặc thuyên tắc mạch chọn lọc ĐM cảnh ngoài để kiểm soát chảy máu mũi nặng (chảy máu điểm mạch sau), u mạch máu hàm mặt hoặc chuẩn bị mổ u vùng cổ.",
    "clinicalNotesEn": "Target for selective embolization or surgical ligation in intractable posterior epistaxis and vascular maxillofacial tumors."
  },
  {
    "id": "facial_artery",
    "nameVi": "Động mạch mặt",
    "nameEn": "Facial Artery",
    "nameLa": "Arteria facialis",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Facial artery.l",
    "meshNodeNames": [
      "Facial artery.l",
      "Facial artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.7564,
      0.0293
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.7564,
        0.0293
      ],
      "position": [
        0.0551,
        0.7864,
        0.1693
      ]
    },
    "dimensions": "Đường kính ~2.0 - 2.5 mm, đường đi ngoằn ngoèo đặc trưng",
    "originVi": "Tách từ mặt trước động mạch cảnh ngoài ngay phía trên động mạch lưỡi",
    "originEn": "Arises from anterior aspect of external carotid artery in carotid triangle",
    "branchesVi": [
      "ĐM khẩu cái lên",
      "ĐM hạnh nhân",
      "ĐM dưới cằm",
      "ĐM môi dưới",
      "ĐM môi trên",
      "ĐM góc (Angular artery)"
    ],
    "branchesEn": [
      "Ascending palatine",
      "Tonsillar",
      "Submental",
      "Inferior labial",
      "Superior labial",
      "Angular artery"
    ],
    "territoryVi": "Cấp máu cho amidan, tuyến dưới hàm, môi, má, cánh mũi và góc mắt trong",
    "territoryEn": "Supplies palatine tonsil, submandibular gland, lips, cheeks, external nose, and medial canthus",
    "anastomosesVi": "Nhánh tận (ĐM góc) tiếp hợp trực tiếp với ĐM lưng mũi (nhánh của ĐM mắt thuộc hệ cảnh trong)",
    "anastomosesEn": "Angular artery anastomoses with dorsal nasal artery from ophthalmic artery (ECA-ICA bridge)",
    "histologyVi": "Động mạch cơ với thành ngoằn ngoèo cho phép dãn dài mà không căng khi há miệng và biểu cảm nét mặt",
    "histologyEn": "Tortuous muscular artery adapted to prevent mechanical stretching during mastication and facial expression",
    "clinicalNotesVi": "Cầu nối quan trọng giữa cảnh ngoài và cảnh trong; điểm bắt mạch bờ dưới xương hàm dưới; vùng tam giác nguy hiểm mặt (vùng chữ T) có nguy cơ nhiễm trùng lan vào xoang hang.",
    "clinicalNotesEn": "Key ECA-ICA collateral; palpated at lower mandibular border; runs in dangerous triangle of face where facial vein connects to cavernous sinus.",
    "pulsePalpationVi": "Bắt mạch tại bờ dưới xương hàm dưới ngay trước cơ cắn (masseter)",
    "pulsePalpationEn": "Palpated where artery crosses inferior border of mandible anterior to masseter"
  },
  {
    "id": "maxillary_artery",
    "nameVi": "Động mạch hàm",
    "nameEn": "Maxillary Artery",
    "nameLa": "Arteria maxillaris",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Maxillary artery.l",
    "meshNodeNames": [
      "Maxillary artery.l",
      "Maxillary artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.7911,
      0.0229
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.7911,
        0.0229
      ],
      "position": [
        0.0551,
        0.8211,
        0.1629
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.0 mm; nhánh tận lớn nhất của ĐM cảnh ngoài",
    "originVi": "Sau cổ xương hàm dưới bên trong nhu mô tuyến nước bọt mang tai",
    "originEn": "Arises behind neck of mandible within substance of parotid gland",
    "branchesVi": [
      "ĐM màng não giữa (MMA)",
      "ĐM huyệt răng dưới (IAN artery)",
      "ĐM cắn",
      "ĐM bướm khẩu cái (Sphenopalatine)",
      "ĐM dưới ổ mắt"
    ],
    "branchesEn": [
      "Middle meningeal (MMA)",
      "Inferior alveolar",
      "Masseteric",
      "Sphenopalatine (artery of epistaxis)",
      "Infraorbital"
    ],
    "territoryVi": "Cấp máu cho xương hàm trên, hàm dưới, toàn bộ cung răng, các cơ nhai, hốc mũi và màng não cứng",
    "territoryEn": "Supplies upper/lower jaws, teeth, muscles of mastication, nasal cavity, palate, and dura mater",
    "anastomosesVi": "Nối với các nhánh của ĐM mặt và ĐM mắt trong hố chân bướm khẩu cái",
    "anastomosesEn": "Forms rich anastomotic plexus with facial and ophthalmic vessels in pterygopalatine fossa",
    "histologyVi": "Động mạch cơ sâu phân nhiều nhánh nhỏ nuôi dưỡng xương và cấu trúc răng mặt",
    "histologyEn": "Deep muscular distributing artery branching extensively into bony canals and masticatory spaces",
    "clinicalNotesVi": "Nhánh ĐM màng não giữa chui qua lỗ gai (foramen spinosum); chấn thương thái dương vỡ xương gây đứt MMA tạo khối máu tụ ngoài màng cứng (epidural hematoma) hình thấu kính hai mặt lồi.",
    "clinicalNotesEn": "Middle meningeal artery passes through foramen spinosum; pterion fracture tears MMA causing acute biconvex epidural hematoma requiring urgent trephination."
  },
  {
    "id": "superficial_temporal_artery",
    "nameVi": "Động mạch thái dương nông",
    "nameEn": "Superficial Temporal Artery",
    "nameLa": "Arteria temporalis superficialis",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Superficial temporal artery.l",
    "meshNodeNames": [
      "Superficial temporal artery.l",
      "Superficial temporal artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8611,
      -0.0144
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8611,
        -0.0144
      ],
      "position": [
        0.0551,
        0.9011,
        0.1356
      ]
    },
    "dimensions": "Đường kính ~1.8 - 2.2 mm, chạy qua mỏm gò má lên da đầu vùng thái dương",
    "originVi": "Nhánh tận nhỏ hơn của ĐM cảnh ngoài tách ra sau cổ xương hàm dưới",
    "originEn": "Smaller terminal branch of external carotid artery arising behind mandibular neck",
    "branchesVi": [
      "ĐM mặt ngang (Transverse facial)",
      "Nhánh tai trước",
      "Nhánh trán (Frontal branch)",
      "Nhánh đỉnh (Parietal branch)"
    ],
    "branchesEn": [
      "Transverse facial artery",
      "Anterior auricular",
      "Frontal branch",
      "Parietal branch"
    ],
    "territoryVi": "Tuyến mang tai, khớp thái dương hàm (TMJ), cơ thái dương và da đầu vùng trán - đỉnh",
    "territoryEn": "Parotid gland, TMJ, masseter, temporalis muscle, and skin of frontal and parietal scalp",
    "anastomosesVi": "Nối qua đường giữa với ĐM đối bên và nối với ĐM trên ổ mắt / trên rọc sách của ĐM mắt",
    "anastomosesEn": "Extensive scalp anastomoses across midline and with supraorbital/supratrochlear arteries",
    "histologyVi": "Động mạch cơ nông nằm trong lớp mạc nông da đầu (lớp galea/SMAS)",
    "histologyEn": "Superficial muscular artery embedded within subcutaneous connective tissue of scalp",
    "clinicalNotesVi": "Sinh thiết ĐM thái dương nông là tiêu chuẩn vàng chẩn đoán Viêm động mạch tế bào khổng lồ (viêm động mạch thái dương Horton); bắt mạch mạch thái dương trước tai.",
    "clinicalNotesEn": "Temporal artery biopsy is gold standard for Giant Cell (Temporal) Arteritis; palpated anterior to tragus for pulse verification.",
    "pulsePalpationVi": "Bắt mạch ngay phía trước nắp tai (tragus) trên cung tiếp gò má",
    "pulsePalpationEn": "Palpated directly anterior to tragus of ear over zygomatic arch"
  },
  {
    "id": "occipital_artery",
    "nameVi": "Động mạch chẩm",
    "nameEn": "Occipital Artery",
    "nameLa": "Arteria occipitalis",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Occipital artery.l",
    "meshNodeNames": [
      "Occipital artery.l",
      "Occipital artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8541,
      -0.07
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8541,
        -0.07
      ],
      "position": [
        0.0551,
        0.8941,
        0.08
      ]
    },
    "dimensions": "Đường kính ~2.0 mm, chạy ra sau dưới cơ hai bụng đến da đầu chẩm",
    "originVi": "Mặt sau động mạch cảnh ngoài ngang mức động mạch mặt",
    "originEn": "Arises from posterior aspect of external carotid artery opposite facial artery",
    "branchesVi": [
      "Nhánh ức đòn chũm",
      "Nhánh chũm",
      "Nhánh tai",
      "Nhánh màng não",
      "Các nhánh chẩm cơ và da đầu"
    ],
    "branchesEn": [
      "Sternocleidomastoid branches",
      "Mastoid branch",
      "Auricular branch",
      "Meningeal branch",
      "Occipital scalp branches"
    ],
    "territoryVi": "Cấp máu cho cơ cổ sâu, cơ ức đòn chũm, màng não hố sọ sau và da đầu vùng chẩm",
    "territoryEn": "Supplies suboccipital muscles, mastoid cells, posterior fossa dura, and occipital scalp",
    "anastomosesVi": "Nối phong phú với ĐM đốt sống, ĐM cổ sâu và ĐM tai sau",
    "anastomosesEn": "Important collateral pathway connecting with vertebral artery and deep cervical artery",
    "histologyVi": "Động mạch cơ khỏe khoắn uốn cong dưới các khối cơ gáy dày",
    "histologyEn": "Stout muscular artery coursing through deep suboccipital musculature to scalp",
    "clinicalNotesVi": "Tuần hoàn bàng hệ cực kỳ quan trọng khi có tắc nghẽn động mạch cảnh trong hoặc động mạch đốt sống; thường được dùng trong vạt da chẩm tạo hình sọ não.",
    "clinicalNotesEn": "Crucial muscular-to-vertebral collateral pathway in proximal vertebral or carotid occlusive disease."
  },
  {
    "id": "facial_vein",
    "nameVi": "Tĩnh mạch mặt",
    "nameEn": "Facial Vein",
    "nameLa": "Vena facialis",
    "type": "vein",
    "region": "carotid_head_neck",
    "primaryNodeName": "Facial vein.l",
    "meshNodeNames": [
      "Facial vein.l",
      "Facial vein.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.7557,
      0.0326
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.7557,
        0.0326
      ],
      "position": [
        0.0551,
        0.7857,
        0.1826
      ]
    },
    "dimensions": "Đường kính ~3 - 4 mm, chạy thẳng chéo từ góc mắt trong xuống góc hàm",
    "originVi": "Bắt đầu từ tĩnh mạch góc (Angular vein) do TM trên rọc sách và trên ổ mắt hợp thành",
    "originEn": "Begins at medial angle of eye as continuation of angular vein",
    "branchesVi": [
      "Tĩnh mạch môi trên",
      "Tĩnh mạch môi dưới",
      "Tĩnh mạch mặt sâu (Deep facial vein)",
      "Tĩnh mạch dưới cằm"
    ],
    "branchesEn": [
      "Superior and inferior labial veins",
      "Deep facial vein (from pterygoid plexus)",
      "Submental vein"
    ],
    "territoryVi": "Dẫn lưu máu từ da trán, mi mắt, mũi, môi, má và sàn miệng",
    "territoryEn": "Drains superficial structures of face from forehead to mandible",
    "anastomosesVi": "Nối với đám rối chân bướm qua TM mặt sâu và nối với xoang hang qua TM mắt trên",
    "anastomosesEn": "Communicates with cavernous sinus via ophthalmic veins and pterygoid venous plexus",
    "histologyVi": "Tĩnh mạch không có van chống trào ngược, cho phép máu chảy hai chiều tùy chênh áp",
    "histologyEn": "Valveless superficial vein allowing retrograde blood flow into deep cranial venous sinuses",
    "clinicalNotesVi": "Do TM mặt không có van và nối trực tiếp với xoang hang, nhiễm trùng da 'tam giác nguy hiểm' (vùng mũi - môi trên) có thể lan ngược dòng gây Huyết khối xoang hang (Cavernous sinus thrombosis) đe dọa tử vong.",
    "clinicalNotesEn": "Valveless connections to cavernous sinus make furuncles in the 'danger triangle of face' prone to retrograde cavernous sinus septic thrombosis."
  },
  {
    "id": "internal_jugular_vein",
    "nameVi": "Tĩnh mạch cảnh trong",
    "nameEn": "Internal Jugular Vein",
    "nameLa": "Vena jugularis interna",
    "type": "vein",
    "region": "carotid_head_neck",
    "primaryNodeName": "Internal jugular vein.l",
    "meshNodeNames": [
      "Internal jugular vein.l",
      "Internal jugular vein.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.7127,
      -0.0108
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.7127,
        -0.0108
      ],
      "position": [
        0.0551,
        0.7427,
        0.1692
      ]
    },
    "dimensions": "Đường kính ~10 - 18 mm (phải thường lớn hơn trái), có 2 chỗ phình hành trên và hành dưới",
    "originVi": "Tiếp nối xoang xích-ma tại lỗ tĩnh mạch cảnh (foramen jugulare) ở nền sọ",
    "originEn": "Direct continuation of sigmoid sinus at jugular foramen of cranial base",
    "branchesVi": [
      "Xoang đá dưới",
      "TM mặt chung",
      "TM lưỡi",
      "TM giáp trên",
      "TM giáp giữa"
    ],
    "branchesEn": [
      "Inferior petrosal sinus",
      "Common facial vein",
      "Lingual vein",
      "Superior and middle thyroid veins"
    ],
    "territoryVi": "Dẫn lưu hơn 90% lượng máu tĩnh mạch từ toàn bộ não bộ sọ não, mắt và các cơ quan vùng mặt cổ",
    "territoryEn": "Collects greater than 90% of venous return from brain, cranial vaults, skull, and face",
    "anastomosesVi": "Hợp với TM dưới đòn sau khớp ức đòn tạo thành thân tĩnh mạch cánh tay đầu",
    "anastomosesEn": "Unites with subclavian vein behind sternoclavicular joint to form brachiocephalic vein",
    "histologyVi": "Tĩnh mạch lớn có van hai lá ở hành dưới (hành tĩnh mạch dưới) ngăn máu trào ngược khi tăng áp lực lồng ngực",
    "histologyEn": "Large compliant vein with bicuspid valve at inferior bulb preventing thoracic regurgitation",
    "clinicalNotesVi": "Vị trí đặt catheter tĩnh mạch trung tâm (CVC - Central Venous Catheter) phổ biến nhất dưới hướng dẫn siêu âm; đo áp lực tĩnh mạch cảnh (JVP) để đánh giá suy tim phải.",
    "clinicalNotesEn": "Primary route for ultrasound-guided central venous line cannulation; Jugular Venous Pulse (JVP) reflects right atrial hemodynamics."
  },
  {
    "id": "vertebral_artery",
    "nameVi": "Động mạch đốt sống",
    "nameEn": "Vertebral Artery",
    "nameLa": "Arteria vertebralis",
    "type": "artery",
    "region": "carotid_head_neck",
    "primaryNodeName": "Vertebral artery.l",
    "meshNodeNames": [
      "Vertebral artery.l",
      "Vertebral artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.7206,
      -0.0308
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.7206,
        -0.0308
      ],
      "position": [
        0.0551,
        0.7506,
        0.1392
      ]
    },
    "dimensions": "Đường kính ~3.0 - 4.5 mm (thường không cân xứng, bên trái ưu thế ở 60%)",
    "originVi": "Nhánh đầu tiên và lớn nhất từ mặt trên của đoạn thứ nhất động mạch dưới đòn",
    "originEn": "First and largest branch from first part of subclavian artery in root of neck",
    "branchesVi": [
      "Các nhánh tủy sống và cơ cổ",
      "ĐM gai sống sau",
      "ĐM gai sống trước",
      "ĐM tiểu não sau dưới (PICA)"
    ],
    "branchesEn": [
      "Spinal and muscular branches",
      "Posterior spinal artery",
      "Anterior spinal artery",
      "Posterior inferior cerebellar artery (PICA)"
    ],
    "territoryVi": "Cột sống cổ, tủy cổ, hành não, tiểu não và hợp nhất tạo thân nền nuôi thân não - chẩm",
    "territoryEn": "Cervical spine, spinal cord, medulla oblongata, cerebellum, and posterior cerebral hemisphere",
    "anastomosesVi": "Hai động mạch đốt sống hợp nhất tại rãnh hành cầu thành động mạch thân nền duy nhất",
    "anastomosesEn": "Confluence of bilateral vertebral arteries forms single midline basilar artery at pontomedullary junction",
    "histologyVi": "Động mạch cơ chạy qua lỗ mỏm ngang các đốt sống cổ C6 đến C1 được bảo vệ bởi xương",
    "histologyEn": "Muscular artery traversing transverse foramina (C6-C1) before piercing atlanto-occipital membrane",
    "clinicalNotesVi": "Hội chứng trộm máu động mạch dưới đòn (Subclavian steal syndrome) gây đảo ngược dòng máu ĐM đốt sống; bóc tách ĐM đốt sống sau chấn thương cổ xoay gập mạnh.",
    "clinicalNotesEn": "Subclavian steal syndrome reverses vertebral flow; vertebral dissection causes lateral medullary (Wallenberg) syndrome."
  },
  {
    "id": "basilar_artery",
    "nameVi": "Động mạch thân nền",
    "nameEn": "Basilar Artery",
    "nameLa": "Arteria basilaris",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Basilar artery",
    "meshNodeNames": [
      "Basilar artery"
    ],
    "canonicalCenter": [
      0.0451,
      0.8243,
      -0.0096
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8243,
        -0.0096
      ],
      "position": [
        0.0551,
        0.8443,
        0.1104
      ]
    },
    "dimensions": "Đường kính ~3.0 - 4.0 mm, dài ~3.0 - 3.5 cm",
    "originVi": "Hợp lưu của 2 động mạch đốt sống tại bờ dưới cầu não",
    "originEn": "Midline confluence of left and right vertebral arteries at pontomedullary sulcus",
    "branchesVi": [
      "ĐM tiểu não trước dưới (AICA)",
      "ĐM mê đạo",
      "Các nhánh cầu não (Pontine)",
      "ĐM tiểu não trên (SCA)",
      "ĐM não sau (PCA)"
    ],
    "branchesEn": [
      "Anterior inferior cerebellar (AICA)",
      "Labyrinthine",
      "Pontine perforators",
      "Superior cerebellar (SCA)",
      "Posterior cerebral (PCA)"
    ],
    "territoryVi": "Toàn bộ cầu não, trung não, tiểu não, tai trong và mặt dưới thùy thái dương - chẩm",
    "territoryEn": "Pons, midbrain, cerebellum, internal ear, and inferomedial temporal and occipital cortices",
    "anastomosesVi": "Tận cùng tại bờ trên cầu não bằng cách chẽ đôi thành 2 động mạch não sau",
    "anastomosesEn": "Terminates at interpeduncular cistern by bifurcating into bilateral posterior cerebral arteries",
    "histologyVi": "Động mạch cơ nằm trong khoang dưới nhện trên rãnh nền của cầu não",
    "histologyEn": "Subarachnoid muscular artery resting directly on the ventral pontine sulcus",
    "clinicalNotesVi": "Huyết khối tắc động mạch thân nền (Basilar artery occlusion) là thảm họa thần kinh cấp, gây hội chứng khóa trong (Locked-in syndrome) hoặc hôn mê tử vong; cần can thiệp lấy huyết khối cơ học khẩn cấp.",
    "clinicalNotesEn": "Basilar artery occlusion is a catastrophic neurological emergency causing locked-in syndrome or coma; treated with emergent endovascular thrombectomy."
  },
  {
    "id": "anterior_cerebral_artery",
    "nameVi": "Động mạch não trước (ACA - Đoạn A1/A2)",
    "nameEn": "Anterior Cerebral Artery (ACA)",
    "nameLa": "Arteria cerebri anterior",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Anterior cerebral artery.l",
    "meshNodeNames": [
      "Anterior cerebral artery.l",
      "Anterior cerebral artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8496,
      0.0203
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8496,
        0.0203
      ],
      "position": [
        0.0551,
        0.8696,
        0.1403
      ]
    },
    "dimensions": "Đường kính ~2.0 - 3.0 mm; chạy trong khe gian bán cầu",
    "originVi": "Nhánh tận nhỏ hơn phía trong của động mạch cảnh trong tại khoang thủng trước",
    "originEn": "Medial terminal branch of internal carotid artery in anterior perforated substance",
    "branchesVi": [
      "ĐM tái hồi Heubner",
      "ĐM ổ trán",
      "ĐM quanh thể chai (Pericallosal)",
      "ĐM viền chai (Callosomarginal)"
    ],
    "branchesEn": [
      "Recurrent artery of Heubner",
      "Orbitofrontal",
      "Pericallosal",
      "Callosomarginal branches"
    ],
    "territoryVi": "Mặt trong bán cầu đại não (vùng chi phối vận động và cảm giác của chi dưới và bàn chân), thể chai và phần trước bao trong",
    "territoryEn": "Medial cortex of frontal and parietal lobes (leg/foot homunculus), corpus callosum, anterior internal capsule",
    "anastomosesVi": "Nối 2 bên não trước qua động mạch thông trước (ACoA)",
    "anastomosesEn": "Connected medially across midline via anterior communicating artery (ACoA)",
    "histologyVi": "Động mạch cơ nội sọ với màng chun trong dày và lớp áo ngoài rất mỏng",
    "histologyEn": "Intracranial muscular artery characterized by prominent internal elastica and thin adventitia",
    "clinicalNotesVi": "Nhồi máu động mạch não trước gây liệt vận động và mất cảm giác ưu thế ở chân và bàn chân đối bên, kèm rối loạn hành vi tác phong và tiểu tiện không tự chủ.",
    "clinicalNotesEn": "ACA ischemic stroke causes contralateral lower limb sensory-motor deficit, abulia, and urinary incontinence."
  },
  {
    "id": "anterior_communicating_artery",
    "nameVi": "Động mạch thông trước (ACoA)",
    "nameEn": "Anterior Communicating Artery",
    "nameLa": "Arteria communicans anterior",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Anterior communicating artery",
    "meshNodeNames": [
      "Anterior communicating artery"
    ],
    "canonicalCenter": [
      0.0453,
      0.8469,
      0.0136
    ],
    "cameraPreset": {
      "target": [
        0.0453,
        0.8469,
        0.0136
      ],
      "position": [
        0.0553,
        0.8669,
        0.1236
      ]
    },
    "dimensions": "Dài ~2 - 4 mm, đường kính ~1.5 - 2.0 mm (có thể kép hoặc dạng lưới)",
    "originVi": "Bắc cầu ngang nối hai động mạch não trước (đoạn A1) ngay phía trước giao thoa thị giác",
    "originEn": "Transverse anastomotic channel bridging left and right A1 segments anterior to optic chiasm",
    "branchesVi": [
      "Các nhánh xuyên dưới đồi và giao thoa thị giác"
    ],
    "branchesEn": [
      "Hypothalamic and subcallosal perforating arteries"
    ],
    "territoryVi": "Tưới máu vùng dưới đồi trước, giao thoa thị và cung cấp lưu lượng máu bàng hệ giữa 2 bán cầu",
    "territoryEn": "Hypothalamic nuclei, optic chiasm, and provides critical hemispheric cross-perfusion",
    "anastomosesVi": "Hoàn chỉnh phần trước của vòng tuần hoàn não Willis",
    "anastomosesEn": "Completes the anterior arch of the Circle of Willis",
    "histologyVi": "Ống mạch cơ ngắn chịu lực xoáy dòng máu đối đầu giữa 2 hệ cảnh",
    "histologyEn": "Short anastomotic conduit subject to high hemodynamic wall shear stress and turbulence",
    "clinicalNotesVi": "Vị trí thường gặp nhất của phình động mạch não túi (Berry aneurysm ~35% tổng số phình não); khi vỡ gây xuất huyết dưới nhện (SAH) với triệu chứng 'đau đầu sét đánh'.",
    "clinicalNotesEn": "Most common site of saccular cerebral aneurysm (~35%); rupture leads to aneurysmal subarachnoid hemorrhage with sudden thunderclap headache."
  },
  {
    "id": "middle_cerebral_artery_m1",
    "nameVi": "Động mạch não giữa - Đoạn M1 (Thân chính)",
    "nameEn": "Middle Cerebral Artery (M1 Segment)",
    "nameLa": "Arteria cerebri media (pars sphenoidalis / segmentum M1)",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Middle cerebral artery (M1-segment).l",
    "meshNodeNames": [
      "Middle cerebral artery (M1-segment).l",
      "Middle cerebral artery (M1-segment).r"
    ],
    "canonicalCenter": [
      0.0451,
      0.847,
      0.0118
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.847,
        0.0118
      ],
      "position": [
        0.0551,
        0.867,
        0.1318
      ]
    },
    "dimensions": "Đường kính ~3.0 - 4.0 mm, dài ~15 - 20 mm, chạy ngang theo cánh nhỏ xương bướm",
    "originVi": "Nhánh tận lớn nhất (80% lưu lượng) của động mạch cảnh trong",
    "originEn": "Larger lateral direct terminal continuation of internal carotid artery",
    "branchesVi": [
      "Các động mạch vân - bèo (Lenticulostriate arteries - 6 đến 12 nhánh đâm sâu)"
    ],
    "branchesEn": [
      "Anterolateral central (lenticulostriate) perforating arteries"
    ],
    "territoryVi": "Nhân bèo, nhân đuôi, bao trong (chi sau bao trong) và đồi thị",
    "territoryEn": "Basal ganglia (putamen, globus pallidus), caudate nucleus, and posterior limb of internal capsule",
    "anastomosesVi": "Chạy vào rãnh Sylvius rồi chia đôi hoặc chia ba thành các nhánh M2 đảo",
    "anastomosesEn": "Bifurcates or trifurcates at limen insulae into M2 insular trunks",
    "histologyVi": "Động mạch cơ chịu áp lực dòng máu mạnh, các nhánh vân bèo xuất phát vuông góc",
    "histologyEn": "Muscular artery giving off delicate perpendicular perforators vulnerable to lipohyalinosis",
    "clinicalNotesVi": "Tắc M1 gây hội chứng nhồi máu não diện rộng cấp tính (liệt nửa người, mất cảm giác, bán manh, thất ngôn Broca/Wernicke nếu bên ưu thế); đích can thiệp lấy huyết khối cơ học (EVT).",
    "clinicalNotesEn": "Target for emergent mechanical thrombectomy in large vessel occlusion (LVO); lenticulostriate rupture causes hypertensive intracerebral hemorrhage."
  },
  {
    "id": "middle_cerebral_artery_m2",
    "nameVi": "Nhánh đảo động mạch não giữa (Đoạn M2)",
    "nameEn": "Insular Branches of Middle Cerebral Artery (M2)",
    "nameLa": "Arteria cerebri media (pars insularis / segmentum M2)",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Insular branches of middle cerebral artery (M2-segment).l",
    "meshNodeNames": [
      "Insular branches of middle cerebral artery (M2-segment).l",
      "Insular branches of middle cerebral artery (M2).r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8599,
      0.0075
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8599,
        0.0075
      ],
      "position": [
        0.0551,
        0.8799,
        0.1375
      ]
    },
    "dimensions": "Gồm thân trên và thân dưới, đường kính ~2.0 - 2.5 mm",
    "originVi": "Chẽ đôi của đoạn M1 tại thềm thùy đảo (limen insulae)",
    "originEn": "Bifurcation of M1 trunk over the surface of insular cortex",
    "branchesVi": [
      "Các nhánh vỏ thùy đảo, thái dương, trán và đỉnh"
    ],
    "branchesEn": [
      "Superior and inferior division insular trunks and opercular branches"
    ],
    "territoryVi": "Vỏ thùy đảo, vùng vận động vỏ não chi trên và mặt, trung tâm ngôn ngữ Broca và Wernicke",
    "territoryEn": "Insula, motor strip (face/arm), primary somatosensory cortex, Broca and Wernicke language areas",
    "anastomosesVi": "Tiếp tục chia thành đoạn M3 nắp và M4 vỏ não, tiếp hợp ngoại vi với ACA và PCA",
    "anastomosesEn": "Continues into M3 opercular and M4 cortical branches with leptomeningeal ACA/PCA collaterals",
    "histologyVi": "Động mạch cơ chạy uốn lượn sâu trong khe rãnh não Sylvius",
    "histologyEn": "Tortuous muscular arteries adapted to deep convolutions within Sylvian fissure",
    "clinicalNotesVi": "Tắc thân trên M2 gây liệt ưu thế tay và mặt, thất ngôn Broca (không nói được); tắc thân dưới gây thất ngôn Wernicke (nói trôi chảy vô nghĩa) và bán manh đồng danh.",
    "clinicalNotesEn": "Superior division infarct causes contralateral faciobrachial paresis and Broca aphasia; inferior division causes Wernicke aphasia and hemianopia."
  },
  {
    "id": "posterior_cerebral_artery",
    "nameVi": "Động mạch não sau (PCA)",
    "nameEn": "Posterior Cerebral Artery",
    "nameLa": "Arteria cerebri posterior",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Posterior cerebral artery.l",
    "meshNodeNames": [
      "Posterior cerebral artery.l",
      "Posterior cerebral artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8529,
      -0.0441
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8529,
        -0.0441
      ],
      "position": [
        0.0551,
        0.8729,
        0.0859
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.0 mm; chia các đoạn P1, P2, P3, P4",
    "originVi": "Chẽ đôi tận cùng của động mạch thân nền tại bể gian cuống não",
    "originEn": "Terminal bifurcation of basilar artery in interpeduncular cistern",
    "branchesVi": [
      "ĐM đồi thị - thể gối",
      "ĐM màng mạch sau",
      "ĐM cựa (Calcarine artery)",
      "ĐM đỉnh chẩm"
    ],
    "branchesEn": [
      "Thalamoperforating",
      "Thalamogeniculate",
      "Posterior choroidal",
      "Calcarine",
      "Parieto-occipital"
    ],
    "territoryVi": "Thùy chẩm (vỏ não thị giác sơ cấp V1), mặt dưới thùy thái dương, thể gối ngoài và đồi thị",
    "territoryEn": "Occipital lobe (primary visual cortex), inferomedial temporal lobe, thalamus, and posterior midbrain",
    "anastomosesVi": "Nối với động mạch cảnh trong qua động mạch thông sau (PCoA)",
    "anastomosesEn": "Receives posterior communicating artery forming posterior Circle of Willis",
    "histologyVi": "Động mạch cơ uốn quanh cuống đại não (crus cerebri) trong khoang dưới nhện",
    "histologyEn": "Muscular artery winding around cerebral peduncle within ambient and quadrigeminal cisterns",
    "clinicalNotesVi": "Nhồi máu ĐM não sau gây bán manh đồng danh đối bên có bảo tồn hoàng điểm (macular sparing) và hội chứng đau đồi thị Dejerine-Roussy.",
    "clinicalNotesEn": "PCA stroke leads to contralateral homonymous hemianopia with macular sparing and Dejerine-Roussy thalamic pain syndrome."
  },
  {
    "id": "posterior_communicating_artery",
    "nameVi": "Động mạch thông sau (PCoA)",
    "nameEn": "Posterior Communicating Artery",
    "nameLa": "Arteria communicans posterior",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Posterior communicating artery.l",
    "meshNodeNames": [
      "Posterior communicating artery.l",
      "Posterior communicating artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8416,
      0.0044
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8416,
        0.0044
      ],
      "position": [
        0.0551,
        0.8616,
        0.1244
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.5 mm, dài ~12 - 15 mm (20% người có dạng phôi thai)",
    "originVi": "Mặt sau động mạch cảnh trong trước khi chia thành ACA và MCA",
    "originEn": "Posterior wall of internal carotid artery before its terminal bifurcation",
    "branchesVi": [
      "Các nhánh xuyên nuôi củ vú và đồi thị sau (thalamotuberal)"
    ],
    "branchesEn": [
      "Premamillary and tuberothalamic perforating branches"
    ],
    "territoryVi": "Đồi thị, thành dưới thất ba, cuống đại não và nối tuần hoàn trước - sau",
    "territoryEn": "Hypothalamus, ventral thalamus, and critical anterior-to-posterior arterial bridge",
    "anastomosesVi": "Nối động mạch cảnh trong với động mạch não sau (PCA đoạn P1/P2)",
    "anastomosesEn": "Anastomoses directly with posterior cerebral artery completing the lateral polygon of Willis",
    "histologyVi": "Ống nối mạch cơ có thành mỏng, chạy song song với dây thần kinh vận nhãn (CN III)",
    "histologyEn": "Thin-walled anastomotic muscular vessel running intimately above oculomotor nerve (CN III)",
    "clinicalNotesVi": "Phình động mạch thông sau (PCoA aneurysm) thường chèn ép trực tiếp dây thần kinh vận nhãn (CN III) gây giãn đồng tử và sụp mi cùng bên — dấu hiệu báo động vỡ phình.",
    "clinicalNotesEn": "PCoA aneurysm causes painful compressive CN III palsy with pupil dilation (blown pupil), requiring emergency exclusion."
  },
  {
    "id": "superior_cerebellar_artery",
    "nameVi": "Động mạch tiểu não trên (SCA)",
    "nameEn": "Superior Cerebellar Artery",
    "nameLa": "Arteria cerebellaris superior",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Superior cerebellar artery.l",
    "meshNodeNames": [
      "Superior cerebellar artery.l",
      "Superior cerebellar artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8338,
      -0.0454
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8338,
        -0.0454
      ],
      "position": [
        0.0551,
        0.8538,
        0.0846
      ]
    },
    "dimensions": "Đường kính ~1.8 - 2.2 mm, chạy ngay dưới dây thần kinh III",
    "originVi": "Tách từ thân nền ngay trước khi thân nền chia đôi thành ĐM não sau",
    "originEn": "Arises from distal basilar artery immediately proximal to PCA bifurcation",
    "branchesVi": [
      "Nhánh bán cầu tiểu não trên",
      "Nhánh thùy nhộng trên",
      "Các nhánh đâm vào trung não"
    ],
    "branchesEn": [
      "Hemispheric branches",
      "Superior vermian branch",
      "Pontine and tectal perforators"
    ],
    "territoryVi": "Mặt trên bán cầu tiểu não, thùy nhộng trên, nhân răng tiểu não, cuống tiểu não trên và củ não sinh tư",
    "territoryEn": "Superior cerebellar cortex, superior vermis, dentate nucleus, superior cerebellar peduncle, and tectum",
    "anastomosesVi": "Nối với AICA và PICA tại vỏ tiểu não",
    "anastomosesEn": "Extensive cortical cerebellar anastomoses with AICA and PICA",
    "histologyVi": "Động mạch cơ chạy uốn quanh cầu não và cuống đại não",
    "histologyEn": "Delicate muscular artery traversing perimesencephalic subarachnoid cisterns",
    "clinicalNotesVi": "Đoạn uốn cong của SCA có thể chèn ép vào rễ dây thần kinh sinh ba (CN V) tại vùng vào rễ (root entry zone), gây chứng Đau dây thần kinh số V (Trigeminal neuralgia - Tic douloureux).",
    "clinicalNotesEn": "Neurovascular compression of CN V root entry zone by looping SCA causes trigeminal neuralgia; treated with microvascular decompression (Jannetta procedure)."
  },
  {
    "id": "anterior_inferior_cerebellar_artery",
    "nameVi": "Động mạch tiểu não trước dưới (AICA)",
    "nameEn": "Anterior Inferior Cerebellar Artery",
    "nameLa": "Arteria cerebellaris inferior anterior",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Anterior inferior cerebellar artery.l",
    "meshNodeNames": [
      "Anterior inferior cerebellar artery.l",
      "Anterior inferior cerebellar artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8128,
      -0.0278
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8128,
        -0.0278
      ],
      "position": [
        0.0551,
        0.8328,
        0.1022
      ]
    },
    "dimensions": "Đường kính ~1.2 - 1.8 mm, bắt chéo rãnh hành cầu",
    "originVi": "Phần dưới của động mạch thân nền gần chỗ nối hai động mạch đốt sống",
    "originEn": "Arises from lower third of basilar artery near pontomedullary junction",
    "branchesVi": [
      "ĐM mê đạo (Labyrinthine artery - nuôi ốc tai)",
      "Nhánh bán cầu trước dưới",
      "Nhánh góc cầu tiểu não"
    ],
    "branchesEn": [
      "Labyrinthine (internal acoustic) artery",
      "Subarcuate branch",
      "Lateral pontine and choroidal branches"
    ],
    "territoryVi": "Mặt trước dưới tiểu não, góc cầu tiểu não, cuống tiểu não giữa, dây VII, VIII và tai trong",
    "territoryEn": "Anteroinferior cerebellar surface, middle cerebellar peduncle, inner ear, CN VII and CN VIII",
    "anastomosesVi": "Nối với PICA và SCA trên bề mặt vỏ tiểu não",
    "anastomosesEn": "Anastomoses with PICA and SCA branches along cerebellar folia",
    "histologyVi": "Động mạch cơ nhỏ đi cùng dây thần kinh sọ VII và VIII vào lỗ ống tai trong",
    "histologyEn": "Small caliber muscular artery looping in intimate contact with CN VII/VIII at cerebellopontine angle",
    "clinicalNotesVi": "Tắc AICA gây hội chứng cầu não ngoài (Lateral pontine syndrome): điếc tiếp nhận cùng bên, chóng mặt nôn mửa, liệt mặt ngoại biên, và hội chứng Horner.",
    "clinicalNotesEn": "AICA infarct causes lateral pontine syndrome: ipsilateral sensorineural deafness, facial paralysis, ataxia, vertigo, and Horner syndrome."
  },
  {
    "id": "posterior_inferior_cerebellar_artery",
    "nameVi": "Động mạch tiểu não sau dưới (PICA)",
    "nameEn": "Posterior Inferior Cerebellar Artery",
    "nameLa": "Arteria cerebellaris inferior posterior",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Posterior inferior cerebellar artery.l",
    "meshNodeNames": [
      "Posterior inferior cerebellar artery.l",
      "Posterior inferior cerebellar artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8081,
      -0.0635
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8081,
        -0.0635
      ],
      "position": [
        0.0551,
        0.8281,
        0.0665
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.0 mm, đường đi phức tạp nhất trong các mạch não",
    "originVi": "Nhánh bên lớn nhất của động mạch đốt sống gần mức rãnh bên sau hành não",
    "originEn": "Largest branch of vertebral artery arising near lower end of olive in medulla",
    "branchesVi": [
      "Nhánh tủy hành sau bên",
      "Nhánh màng mạch não thất IV",
      "Nhánh hạnh nhân tiểu não",
      "Nhánh vỏ bán cầu sau dưới"
    ],
    "branchesEn": [
      "Lateral medullary perforators",
      "Choroidal branch to 4th ventricle",
      "Tonsillar",
      "Inferior vermian"
    ],
    "territoryVi": "Phần sau bên hành não (nhân hoài nghi, nhân cảm giác dây V, nhân tiền đình), hạnh nhân tiểu não và thùy nhộng dưới",
    "territoryEn": "Posterolateral medulla, inferior vermis, cerebellar tonsils, and inferior cerebellar hemisphere",
    "anastomosesVi": "Nối tiếp hợp vỏ não với AICA và SCA",
    "anastomosesEn": "Collateral connections with AICA and contralateral PICA",
    "histologyVi": "Động mạch cơ uốn lượn hình chữ S đôi quanh rễ các dây thần kinh sọ IX, X, XI",
    "histologyEn": "Complex loop-forming muscular artery closely related to roots of CN IX, X, and XI",
    "clinicalNotesVi": "Tắc PICA gây Hội chứng Wallenberg (Hội chứng hành não ngoài): mất cảm giác đau nhiệt nửa mặt cùng bên và nửa thân đối bên, nuốt khó, khàn tiếng, thất điều và hội chứng Horner.",
    "clinicalNotesEn": "PICA occlusion produces lateral medullary (Wallenberg) syndrome: ipsilateral loss of facial pain/temp, contralateral body loss, dysphagia, hoarseness, and ataxia."
  },
  {
    "id": "pontine_arteries",
    "nameVi": "Các nhánh cầu não của động mạch nền",
    "nameEn": "Pontine Arteries",
    "nameLa": "Rami ad pontem arteriae basilaris",
    "type": "artery",
    "region": "cerebral_circle_willis",
    "primaryNodeName": "Lateral pontine branches of basilar artery.l",
    "meshNodeNames": [
      "Lateral pontine branches of basilar artery.l",
      "Medial pontine branches of basilar artery.l"
    ],
    "canonicalCenter": [
      0.0544,
      0.823,
      -0.0128
    ],
    "cameraPreset": {
      "target": [
        0.0544,
        0.823,
        -0.0128
      ],
      "position": [
        0.0644,
        0.843,
        0.0972
      ]
    },
    "dimensions": "Đường kính ~0.3 - 0.8 mm, gồm 4 đến 8 cặp nhánh nhỏ đâm vuông góc",
    "originVi": "Tách trực tiếp hai bên thành của động mạch thân nền dọc cầu não",
    "originEn": "Arise directly from lateral walls of basilar artery along entire ventral pons",
    "branchesVi": [
      "Nhánh trung gian cạnh đường giữa (paramedian)",
      "Nhánh vòng ngắn (short circumferential)",
      "Nhánh vòng dài (long circumferential)"
    ],
    "branchesEn": [
      "Paramedian pontine arteries",
      "Short circumferential branches",
      "Long circumferential branches"
    ],
    "territoryVi": "Nhân cầu não, dải vỏ - gai (bó tháp), dải vỏ - hành, liềm trong và dải dọc giữa",
    "territoryEn": "Pontine nuclei, corticospinal tract, corticobulbar fibers, medial lemniscus, and medial longitudinal fasciculus",
    "anastomosesVi": "Các nhánh tận tận cùng không có vòng nối chức năng phong phú (end-arteries)",
    "anastomosesEn": "End-artery architecture with minimal functional microvascular reserve",
    "histologyVi": "Tiểu động mạch đâm xuyên thành mỏng dễ bị xơ hyalin do tăng huyết áp mạn tính",
    "histologyEn": "Penetrating terminal arterioles prone to lipohyalinosis and microatheroma",
    "clinicalNotesVi": "Nhồi máu lỗ khuyết (lacunar stroke) do tắc các nhánh cầu não gây hội chứng liệt nửa người thuần túy (pure motor hemiparesis) hoặc hội chứng thất điều - liệt nửa người.",
    "clinicalNotesEn": "Occlusion leads to pontine lacunar infarcts presenting as pure motor hemiparesis or dysarthria-clumsy hand syndrome."
  },
  {
    "id": "superior_sagittal_sinus",
    "nameVi": "Xoang dọc trên",
    "nameEn": "Superior Sagittal Sinus",
    "nameLa": "Sinus sagittalis superior",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Superior sagittal sinus",
    "meshNodeNames": [
      "Superior sagittal sinus"
    ],
    "canonicalCenter": [
      0.0451,
      0.8826,
      -0.0239
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8826,
        -0.0239
      ],
      "position": [
        0.0551,
        0.9226,
        0.1361
      ]
    },
    "dimensions": "Dài ~25 - 30 cm, mở rộng dần từ trước ra sau (lòng tam giác)",
    "originVi": "Bắt đầu từ mào gà (crista galli) và lỗ tịt (foramen cecum) ở xương trán",
    "originEn": "Begins at crista galli and foramen cecum of anterior cranial fossa",
    "branchesVi": [
      "Nhận tĩnh mạch não trên, tĩnh mạch liên lạc đỉnh và hạt màng nhện Pacchioni"
    ],
    "branchesEn": [
      "Receives superior cerebral veins, parietal emissary veins, and arachnoid granulations"
    ],
    "territoryVi": "Dẫn lưu máu tĩnh mạch từ mặt lồi hai bán cầu đại não và là vị trí hấp thu dịch não tủy (CSF) chính",
    "territoryEn": "Drains convexities of cerebral hemispheres and serves as primary site of CSF reabsorption into bloodstream",
    "anastomosesVi": "Đổ vào hội lưu các xoang (Confluens sinuum) tại ụ chẩm trong",
    "anastomosesEn": "Empties posteriorly into confluence of sinuses (torcular Herophili) at internal occipital protuberance",
    "histologyVi": "Kênh xoang hình tam giác cấu tạo bởi màng não cứng, không có van và không có lớp cơ",
    "histologyEn": "Triangular channel formed between periosteal and meningeal dura layers lined by endothelium without valves or muscle",
    "clinicalNotesVi": "Huyết khối xoang tĩnh mạch màng cứng (CVST) gây tăng áp lực nội sọ, phù gai thị, co giật và nhồi máu xuất huyết não hai bên; hạt màng nhện tắc gây não úng thủy giao thông.",
    "clinicalNotesEn": "Cerebral venous sinus thrombosis (CVST) presents with headache, papilledema, seizures, and bilateral venous infarcts; blocked by arachnoid granulation fibrosis."
  },
  {
    "id": "inferior_sagittal_sinus",
    "nameVi": "Xoang dọc dưới",
    "nameEn": "Inferior Sagittal Sinus",
    "nameLa": "Sinus sagittalis inferior",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Inferior sagittal sinus",
    "meshNodeNames": [
      "Inferior sagittal sinus"
    ],
    "canonicalCenter": [
      0.0451,
      0.8709,
      -0.0157
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8709,
        -0.0157
      ],
      "position": [
        0.0551,
        0.9109,
        0.1343
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.5 mm, dài ~15 cm, chiếm 2/3 sau bờ tự do liềm đại não",
    "originVi": "Chạy dọc bờ cong dưới tự do của liềm não (falx cerebri) phía trên thể chai",
    "originEn": "Occupies the posterior two-thirds of the free inferior margin of the falx cerebri",
    "branchesVi": [
      "Nhận các tĩnh mạch từ mặt trong bán cầu não và tĩnh mạch thể chai"
    ],
    "branchesEn": [
      "Receives veins from falx cerebri and medial surfaces of hemispheres"
    ],
    "territoryVi": "Dẫn lưu máu từ liềm não, thể chai và hồi đai hai bên",
    "territoryEn": "Drains falx cerebri, corpus callosum, cingulate gyri, and medial frontal cortex",
    "anastomosesVi": "Hợp với tĩnh mạch não lớn Galen tại bờ trước lều tiểu não để tạo thành xoang thẳng",
    "anastomosesEn": "Unites with great cerebral vein of Galen at apex of tentorium cerebelli to form straight sinus",
    "histologyVi": "Ống nội mô hình trụ nhỏ nằm giữa hai lá gấp của liềm màng cứng",
    "histologyEn": "Cylindrical endothelial-lined channel contained entirely within dural fold",
    "clinicalNotesVi": "Một phần của hệ thống dẫn lưu tĩnh mạch não sâu; tổn thương khi bóc tách phẫu thuật qua thể chai hoặc cắt liềm não.",
    "clinicalNotesEn": "Component of deep cerebral venous system; at risk during transcallosal interhemispheric neurosurgical approaches."
  },
  {
    "id": "straight_sinus",
    "nameVi": "Xoang thẳng",
    "nameEn": "Straight Sinus",
    "nameLa": "Sinus rectus",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Straight sinus",
    "meshNodeNames": [
      "Straight sinus"
    ],
    "canonicalCenter": [
      0.0451,
      0.8325,
      -0.0225
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8325,
        -0.0225
      ],
      "position": [
        0.0551,
        0.8725,
        0.1275
      ]
    },
    "dimensions": "Dài ~4 - 5 cm, đường kính ~3 - 5 mm, chạy chếch xuống dưới ra sau",
    "originVi": "Đường nối giữa liềm đại não và lều tiểu não tại chỗ hợp lưu của TM não lớn và xoang dọc dưới",
    "originEn": "Line of junction of falx cerebri with tentorium cerebelli, formed by union of vein of Galen and inferior sagittal sinus",
    "branchesVi": [
      "Tĩnh mạch não lớn Galen",
      "Xoang dọc dưới",
      "Các tĩnh mạch tiểu não trên"
    ],
    "branchesEn": [
      "Great cerebral vein of Galen",
      "Inferior sagittal sinus",
      "Superior cerebellar veins"
    ],
    "territoryVi": "Dẫn lưu toàn bộ hệ tĩnh mạch não sâu (đồi thị, nhân nền, não thất) và mặt trên tiểu não",
    "territoryEn": "Drains deep cerebral venous system (thalamus, basal ganglia, internal cerebral veins) and upper cerebellum",
    "anastomosesVi": "Đổ vào hội lưu các xoang (thường lệch về xoang ngang trái)",
    "anastomosesEn": "Drains into confluence of sinuses, usually continuing primarily into left transverse sinus",
    "histologyVi": "Ống xoang màng cứng hình tam giác được cố định chắc chắn bởi sức căng của lều tiểu não",
    "histologyEn": "Rigid triangular fibrous sinus anchored by tense tension lines of tentorium cerebelli",
    "clinicalNotesVi": "Huyết khối xoang thẳng gây phù và nhồi máu xuất huyết hai bên đồi thị (bithalamic infarction) với rối loạn ý thức cấp tính, hôn mê và tiên lượng rất nặng.",
    "clinicalNotesEn": "Straight sinus thrombosis causes devastating bilateral thalamic venous infarction presenting with abrupt coma and severe morbidity."
  },
  {
    "id": "occipital_sinus",
    "nameVi": "Xoang chẩm",
    "nameEn": "Occipital Sinus",
    "nameLa": "Sinus occipitalis",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Occipital sinus",
    "meshNodeNames": [
      "Occipital sinus"
    ],
    "canonicalCenter": [
      0.0451,
      0.804,
      -0.0331
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.804,
        -0.0331
      ],
      "position": [
        0.0551,
        0.834,
        0.1069
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.5 mm, xoang nhỏ nhất trong các xoang màng cứng",
    "originVi": "Nằm trong bờ gắn của liềm tiểu não (falx cerebelli) áp sát mào chẩm trong",
    "originEn": "Situated in attached margin of falx cerebelli along internal occipital crest",
    "branchesVi": [
      "Nhận các tĩnh mạch nhỏ từ mép lỗ lớn xương chẩm"
    ],
    "branchesEn": [
      "Receives veins around foramen magnum and marginal sinus plexus"
    ],
    "territoryVi": "Dẫn lưu máu màng cứng hố sọ sau và vùng quanh lỗ lớn xương chẩm",
    "territoryEn": "Drains posterior cranial fossa dura and marginal venous plexus around foramen magnum",
    "anastomosesVi": "Phía trên đổ vào hội lưu các xoang, phía dưới nối với đám rối tĩnh mạch đốt sống",
    "anastomosesEn": "Opens superiorly into confluence of sinuses; connects inferiorly with vertebral venous plexus",
    "histologyVi": "Xoang màng cứng hẹp gắn liền với màng xương chẩm",
    "histologyEn": "Narrow dural venous channel firmly adherent to periosteum of occipital bone",
    "clinicalNotesVi": "Có thể phì đại bù trừ khi xoang ngang hoặc xoang xích-ma bị tắc; cần lưu ý khi mở nắp sọ dưới chẩm đường giữa để tránh rách xoang gây chảy máu dữ dội.",
    "clinicalNotesEn": "Enlarges as collateral channel when sigmoid sinus is thrombosed; vulnerable to laceration in midline suboccipital craniotomy."
  },
  {
    "id": "transverse_sinus",
    "nameVi": "Xoang ngang",
    "nameEn": "Transverse Sinus",
    "nameLa": "Sinus transversus",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Transverse sinus.l",
    "meshNodeNames": [
      "Transverse sinus.l",
      "Transverse sinus.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8211,
      -0.0816
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8211,
        -0.0816
      ],
      "position": [
        0.0551,
        0.8611,
        0.0684
      ]
    },
    "dimensions": "Dài ~6 - 8 cm, đường kính ~6 - 10 mm (xoang phải thường ưu thế hơn bên trái)",
    "originVi": "Khởi đầu từ hội lưu các xoang tại ụ chẩm trong, chạy ngang trong rãnh xoang ngang của xương chẩm",
    "originEn": "Begins at confluence of sinuses, courses laterally within attached margin of tentorium cerebelli",
    "branchesVi": [
      "Nhận tĩnh mạch não dưới, tĩnh mạch tiểu não và tĩnh mạch liên lạc chũm"
    ],
    "branchesEn": [
      "Receives inferior cerebral veins, inferior cerebellar veins, and mastoid emissary vein"
    ],
    "territoryVi": "Dẫn lưu máu từ toàn bộ vòm sọ, não sâu và tiểu não sang góc xương đá",
    "territoryEn": "Transmits venous drainage of cerebral and cerebellar hemispheres toward petrous temporal bone",
    "anastomosesVi": "Uốn cong xuống dưới tại bờ sau xương đá để tiếp nối liên tục thành xoang xích-ma",
    "anastomosesEn": "Curves downward at posterior base of petrous pyramid to transition into sigmoid sinus",
    "histologyVi": "Ống xoang màng cứng lớn nằm trong rãnh xương chẩm và góc sau - dưới xương đỉnh",
    "histologyEn": "Large endothelial-lined sinus grooving inner surface of occipital and parietal bones",
    "clinicalNotesVi": "Hẹp hoặc bất sản một bên xoang ngang là biến thể giải phẫu thường gặp; hẹp xoang ngang hai bên liên quan chặt chẽ với Tăng áp lực nội sọ vô căn (Idiopathic Intracranial Hypertension - IIH).",
    "clinicalNotesEn": "Bilateral transverse sinus stenosis is strongly implicated in idiopathic intracranial hypertension (pseudotumor cerebri), treated by venous sinus stenting."
  },
  {
    "id": "sigmoid_sinus",
    "nameVi": "Xoang xích-ma",
    "nameEn": "Sigmoid Sinus",
    "nameLa": "Sinus sigmoideus",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Sigmoid sinus.l",
    "meshNodeNames": [
      "Sigmoid sinus.l",
      "Sigmoid sinus.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.813,
      -0.0485
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.813,
        -0.0485
      ],
      "position": [
        0.0551,
        0.843,
        0.1015
      ]
    },
    "dimensions": "Đường kính ~8 - 12 mm, dài ~4 - 5 cm, uốn cong chữ S",
    "originVi": "Tiếp nối xoang ngang tại góc sau xương đá, lượn cong xuống qua rãnh xương chũm",
    "originEn": "Continuation of transverse sinus at posterior surface of petrous temporal bone, curving in S-shape",
    "branchesVi": [
      "Nhận xoang đá trên, tĩnh mạch liên lạc chũm và tĩnh mạch liên lạc lồi cầu"
    ],
    "branchesEn": [
      "Receives superior petrosal sinus, mastoid emissary vein, and condylar emissary vein"
    ],
    "territoryVi": "Dẫn toàn bộ dòng máu từ xoang ngang và xoang đá đổ về tĩnh mạch cảnh trong",
    "territoryEn": "Conveys venous stream from transverse and petrosal sinuses directly into internal jugular vein",
    "anastomosesVi": "Chui qua lỗ tĩnh mạch cảnh (foramen jugulare) và phình ra tạo hành trên TM cảnh trong",
    "anastomosesEn": "Terminates at jugular foramen by expanding into superior bulb of internal jugular vein",
    "histologyVi": "Xoang màng cứng uốn lượn sâu trong rãnh xích-ma của xương thái dương và chẩm",
    "histologyEn": "Deeply grooved venous sinus situated in mastoid wall immediately adjacent to mastoid air cells",
    "clinicalNotesVi": "Nhiễm trùng tai giữa mạn tính hoặc viêm xương chũm thủng vách xương có thể lan trực tiếp gây Viêm tắc xoang xích-ma (thrombophlebitis), sốt hình gai và nhiễm khuẩn huyết.",
    "clinicalNotesEn": "Directly threatened by coalescent mastoiditis and cholesteatoma causing septic sigmoid sinus thrombosis and bacteremia."
  },
  {
    "id": "cavernous_sinus",
    "nameVi": "Xoang hang",
    "nameEn": "Cavernous Sinus",
    "nameLa": "Sinus cavernosus",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Cavernous sinus.l",
    "meshNodeNames": [
      "Cavernous sinus.l",
      "Cavernous sinus.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8303,
      0.0034
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8303,
        0.0034
      ],
      "position": [
        0.0551,
        0.8603,
        0.1234
      ]
    },
    "dimensions": "Kích thước ~2 x 1 cm, khoang tĩnh mạch xốp dạng bè nằm hai bên thân xương bướm",
    "originVi": "Nằm hai bên yên bướm (sella turcica) từ khe ổ mắt trên đến đỉnh xương đá",
    "originEn": "Paired dural trabeculated venous spaces flanking the sella turcica and body of sphenoid bone",
    "branchesVi": [
      "Nhận TM mắt trên, TM mắt dưới, TM não giữa nông và xoang bướm đỉnh"
    ],
    "branchesEn": [
      "Receives superior and inferior ophthalmic veins, superficial middle cerebral vein, and sphenoparietal sinus"
    ],
    "territoryVi": "Dẫn lưu máu từ hốc mắt, nhãn cầu, xoang mặt và vùng nền thùy trán - thái dương",
    "territoryEn": "Drains orbit, ocular globe, superior facial tissues, and anterior inferior cerebral surfaces",
    "anastomosesVi": "Nối hai bên qua xoang liên hang trước và sau; dẫn lưu ra sau qua xoang đá trên và xoang đá dưới",
    "anastomosesEn": "Intercommunicates across midline via intercavernous sinuses; drains into petrosal sinuses",
    "histologyVi": "Đám rối tĩnh mạch dạng khoang xốp chia nhiều ngăn bè, có ĐM cảnh trong và TK VI chạy bên trong lòng xoang",
    "histologyEn": "Plexiform venous lake traversed internally by internal carotid artery and abducens nerve (CN VI)",
    "clinicalNotesVi": "Thành ngoài chứa dây thần kinh III, IV, V1, V2; lòng xoang chứa ĐM cảnh trong và dây VI. Hội chứng xoang hang gây liệt vận nhãn toàn bộ, mất cảm giác trán và mắt lồi cương tụ.",
    "clinicalNotesEn": "Contains ICA and CN VI within lumen; CN III, IV, V1, V2 in lateral wall. Cavernous sinus syndrome causes total ophthalmoplegia and proptosis."
  },
  {
    "id": "superior_petrosal_sinus",
    "nameVi": "Xoang đá trên",
    "nameEn": "Superior Petrosal Sinus",
    "nameLa": "Sinus petrosus superior",
    "type": "vein",
    "region": "dural_sinuses",
    "primaryNodeName": "Superior petrosal sinus.l",
    "meshNodeNames": [
      "Superior petrosal sinus.l",
      "Superior petrosal sinus.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.8273,
      -0.0324
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.8273,
        -0.0324
      ],
      "position": [
        0.0551,
        0.8573,
        0.0976
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.5 mm, dài ~3 - 4 cm",
    "originVi": "Khởi đầu từ phần sau xoang hang, chạy dọc rãnh bờ trên xương đá trong bờ gắn lều tiểu não",
    "originEn": "Arises from posterior aspect of cavernous sinus, runs along superior crest of petrous temporal bone",
    "branchesVi": [
      "Nhận các tĩnh mạch tiểu não, tĩnh mạch cầu não và tĩnh mạch màng nhĩ"
    ],
    "branchesEn": [
      "Receives cerebellar veins, inferior cerebral veins, and tympanic branch"
    ],
    "territoryVi": "Dẫn lưu máu từ xoang hang và mặt trước - trên của tiểu não",
    "territoryEn": "Drains cavernous sinus and anterolateral cerebellar and brainstem surfaces",
    "anastomosesVi": "Đổ vào chỗ uốn cong nối giữa xoang ngang và xoang xích-ma",
    "anastomosesEn": "Empties distally into the junction of transverse and sigmoid sinuses",
    "histologyVi": "Xoang màng cứng hình ống nhỏ nằm sát bờ gắn của lều tiểu não",
    "histologyEn": "Small tubular dural sinus embedded in the attachment of tentorium cerebelli",
    "clinicalNotesVi": "Mốc giải phẫu quan trọng bảo vệ tĩnh mạch khi mở nắp sọ xuyên lều tiểu não (retrosigmoid approach) trong phẫu thuật u dây thần kinh số VIII (vestibular schwannoma).",
    "clinicalNotesEn": "Critical surgical landmark during retrosigmoid and petrosal approaches for acoustic neuroma and skull base meningiomas."
  },
  {
    "id": "subclavian_artery",
    "nameVi": "Động mạch dưới đòn",
    "nameEn": "Subclavian Artery",
    "nameLa": "Arteria subclavia (dextra et sinistra)",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Left subclavian artery",
    "meshNodeNames": [
      "Left subclavian artery",
      "Right subclavian artery"
    ],
    "canonicalCenter": [
      0.0474,
      0.62,
      -0.0104
    ],
    "cameraPreset": {
      "target": [
        0.0474,
        0.62,
        -0.0104
      ],
      "position": [
        0.0574,
        0.64,
        0.2096
      ]
    },
    "dimensions": "Đường kính ~8 - 10 mm; chia 3 đoạn theo tương quan với cơ bậc thang trước",
    "originVi": "Bên phải tách từ thân cánh tay đầu; bên trái tách trực tiếp từ cung động mạch chủ",
    "originEn": "Right from brachiocephalic trunk; left directly from aortic arch in superior mediastinum",
    "branchesVi": [
      "ĐM đốt sống",
      "ĐM ngực trong",
      "Thân giáp cổ (Thyrocervical)",
      "Thân sườn cổ (Costocervical)",
      "ĐM vai lưng"
    ],
    "branchesEn": [
      "Vertebral artery",
      "Internal thoracic artery",
      "Thyrocervical trunk",
      "Costocervical trunk",
      "Dorsal scapular"
    ],
    "territoryVi": "Cấp máu cho não (qua ĐM đốt sống), thành ngực, tuyến giáp, vùng cổ sâu và toàn bộ chi trên",
    "territoryEn": "Supplies brainstem/cerebellum, anterior thoracic wall, neck viscus, shoulder girdle, and upper limb",
    "anastomosesVi": "Đổi tên thành động mạch nách khi vượt qua bờ ngoài xương sườn 1",
    "anastomosesEn": "Becomes axillary artery at the outer lateral border of first rib",
    "histologyVi": "Động mạch đàn hồi chuyển sang cơ, có thành dày chịu áp lực tâm thu lớn",
    "histologyEn": "High-flow elastic-to-muscular conducting artery crossing interscalene triangle",
    "clinicalNotesVi": "Hội chứng lối thoát ngực (Thoracic Outlet Syndrome - TOS) do xương sườn cổ chèn ép ĐM dưới đòn; hội chứng trộm máu dưới đòn (Subclavian Steal) gây chóng mặt khi vận động tay.",
    "clinicalNotesEn": "Thoracic outlet syndrome compresses artery between clavicle and 1st rib; proximal stenosis produces subclavian steal syndrome.",
    "pulsePalpationVi": "Bắt mạch tại hố thượng đòn trên bờ ngoài cơ ức đòn chũm ép xuống xương sườn 1",
    "pulsePalpationEn": "Palpated in supraclavicular fossa pressed downwards against 1st rib"
  },
  {
    "id": "subclavian_vein",
    "nameVi": "Tĩnh mạch dưới đòn",
    "nameEn": "Subclavian Vein",
    "nameLa": "Vena subclavia",
    "type": "vein",
    "region": "upper_limb",
    "primaryNodeName": "Left subclavian vein",
    "meshNodeNames": [
      "Left subclavian vein",
      "Right subclavian vein"
    ],
    "canonicalCenter": [
      0.0462,
      0.6142,
      -0.0003
    ],
    "cameraPreset": {
      "target": [
        0.0462,
        0.6142,
        -0.0003
      ],
      "position": [
        0.0562,
        0.6342,
        0.1997
      ]
    },
    "dimensions": "Đường kính ~10 - 14 mm, dài ~3 - 4 cm, nằm trước cơ bậc thang trước",
    "originVi": "Tiếp nối tĩnh mạch nách tại bờ ngoài xương sườn 1",
    "originEn": "Continuation of axillary vein at outer border of first rib",
    "branchesVi": [
      "Nhận tĩnh mạch cảnh ngoài và đôi khi tĩnh mạch cảnh trước"
    ],
    "branchesEn": [
      "Receives external jugular vein and dorsal scapular vein"
    ],
    "territoryVi": "Dẫn lưu toàn bộ máu hồi lưu từ chi trên, vai và một phần thành ngực",
    "territoryEn": "Drains whole upper extremity, shoulder girdle, and superficial lateral neck",
    "anastomosesVi": "Hợp nhất với tĩnh mạch cảnh trong tạo thành thân tĩnh mạch cánh tay đầu",
    "anastomosesEn": "Unites with internal jugular vein behind sternoclavicular joint to form brachiocephalic vein",
    "histologyVi": "Tĩnh mạch lớn có lớp áo ngoài dính vào màng xương sườn 1 và xương đòn giữ lòng mạch luôn mở",
    "histologyEn": "Adventitia anchored to costoclavicular ligament and subclavius fascia preventing collapse",
    "clinicalNotesVi": "Đường đặt catheter tĩnh mạch trung tâm (CVC dưới đòn) kinh điển; biến chứng nguy hiểm gồm tràn khí màng phổi (do chọc vào đỉnh phổi) và chảy máu khoang màng phổi.",
    "clinicalNotesEn": "Classic infraclavicular subclavian central line approach; primary hazards include pneumothorax and hemothorax from apical pleural puncture."
  },
  {
    "id": "axillary_artery",
    "nameVi": "Động mạch nách",
    "nameEn": "Axillary Artery",
    "nameLa": "Arteria axillaris",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Axillary artery.l",
    "meshNodeNames": [
      "Axillary artery.l",
      "Axillary artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.5935,
      -0.0213
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.5935,
        -0.0213
      ],
      "position": [
        0.0551,
        0.6135,
        0.1787
      ]
    },
    "dimensions": "Đường kính ~6 - 8 mm, dài ~10 - 12 cm, chia 3 đoạn bởi cơ ngực bé",
    "originVi": "Tiếp nối động mạch dưới đòn tại bờ ngoài xương sườn 1",
    "originEn": "Continuation of subclavian artery at lateral border of first rib",
    "branchesVi": [
      "ĐM ngực trên",
      "ĐM ngực cùng vai",
      "ĐM ngực ngoài",
      "ĐM dưới vai",
      "ĐM mũ cánh tay trước & sau"
    ],
    "branchesEn": [
      "Superior thoracic",
      "Thoracoacromial",
      "Lateral thoracic",
      "Subscapular",
      "Anterior and posterior circumflex humeral"
    ],
    "territoryVi": "Cấp máu cho cơ ngực, thành ngực bên, tuyến vú, cơ delta, khớp vai và chi trên",
    "territoryEn": "Supplies pectoral muscles, lateral chest wall, breast, scapular muscles, shoulder joint, and arm",
    "anastomosesVi": "Mạng mạch quanh xương bả vai (scapular anastomosis) nối phong phú với ĐM dưới đòn",
    "anastomosesEn": "Forms rich scapular anastomotic collateral network connecting subclavian and axillary systems",
    "histologyVi": "Động mạch cơ lớn nằm trong bao nách cùng các bó của đám rối thần kinh cánh tay",
    "histologyEn": "Large muscular artery enclosed within axillary sheath closely surrounded by brachial plexus cords",
    "clinicalNotesVi": "Đổi tên thành ĐM cánh tay tại bờ dưới cơ tròn lớn; mạng mạch quanh vai cho phép thắt ĐM nách đoạn giữa ĐM ngực cùng vai và ĐM dưới vai mà không hoại tử tay.",
    "clinicalNotesEn": "Scapular collateral network allows surgical ligation between thoracoacromial and subscapular arteries in trauma without limb ischemia.",
    "pulsePalpationVi": "Bắt mạch sâu ở hõm nách phía sau cơ ngực lớn ép vào chỏm xương cánh tay",
    "pulsePalpationEn": "Palpated deeply in apex of axilla against proximal humeral shaft"
  },
  {
    "id": "axillary_vein",
    "nameVi": "Tĩnh mạch nách",
    "nameEn": "Axillary Vein",
    "nameLa": "Vena axillaris",
    "type": "vein",
    "region": "upper_limb",
    "primaryNodeName": "Axillary vein.l",
    "meshNodeNames": [
      "Axillary vein.l",
      "Axillary vein.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.5559,
      -0.0137
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.5559,
        -0.0137
      ],
      "position": [
        0.0551,
        0.5759,
        0.1663
      ]
    },
    "dimensions": "Đường kính ~8 - 12 mm, nằm phía trong động mạch nách",
    "originVi": "Tiếp nối tĩnh mạch nền (Basilic vein) tại bờ dưới cơ tròn lớn",
    "originEn": "Formed at lower border of teres major by union of basilic vein and brachial venae comitantes",
    "branchesVi": [
      "Nhận tĩnh mạch đầu (Cephalic vein chui qua tam giác ngực delta) và các tĩnh mạch cùng tên với nhánh ĐM"
    ],
    "branchesEn": [
      "Receives cephalic vein piercing clavipectoral fascia, subscapular, and lateral thoracic veins"
    ],
    "territoryVi": "Dẫn lưu toàn bộ hệ thống tĩnh mạch sâu và nông của chi trên và thành ngực bên",
    "territoryEn": "Drains all deep and superficial veins of upper extremity and lateral thoracic wall",
    "anastomosesVi": "Tiếp nối thành tĩnh mạch dưới đòn tại bờ ngoài xương sườn 1",
    "anastomosesEn": "Transitions into subclavian vein at lateral border of first rib",
    "histologyVi": "Tĩnh mạch lớn có van, thành chứa các bó cơ trơn và sợi collagen đàn hồi",
    "histologyEn": "Valved systemic conduit possessing smooth muscle media and thick adventitial coat",
    "clinicalNotesVi": "Huyết khối tĩnh mạch nách do gắng sức (Hội chứng Paget-Schroetter) gặp ở người trẻ vận động tay lặp đi lặp lại; vị trí nạo vét hạch nách trong phẫu thuật ung thư vú.",
    "clinicalNotesEn": "Effort thrombosis (Paget-Schroetter syndrome) in overhead athletes; key landmark during axillary lymph node dissection in breast cancer."
  },
  {
    "id": "brachial_artery",
    "nameVi": "Động mạch cánh tay",
    "nameEn": "Brachial Artery",
    "nameLa": "Arteria brachialis",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Brachial artery.l",
    "meshNodeNames": [
      "Brachial artery.l",
      "Brachial artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.4088,
      -0.0337
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.4088,
        -0.0337
      ],
      "position": [
        0.0551,
        0.4088,
        0.1863
      ]
    },
    "dimensions": "Đường kính ~4 - 5 mm, dài ~25 cm, chạy dọc mặt trong cánh tay",
    "originVi": "Tiếp nối động mạch nách tại bờ dưới cơ tròn lớn (teres major)",
    "originEn": "Continuation of axillary artery at inferior margin of teres major tendon",
    "branchesVi": [
      "ĐM cánh tay sâu (Profunda brachii)",
      "ĐM nuôi xương cánh tay",
      "ĐM bên trụ trên và dưới",
      "ĐM quay",
      "ĐM trụ"
    ],
    "branchesEn": [
      "Deep artery of arm (profunda brachii)",
      "Humeral nutrient",
      "Superior and inferior ulnar collateral",
      "Radial and ulnar"
    ],
    "territoryVi": "Cấp máu cho khoang cánh tay trước (cơ nhị đầu, cánh tay), khoang sau (cơ tam đầu) và toàn bộ cẳng - bàn tay",
    "territoryEn": "Supplies anterior and posterior arm compartments, elbow joint, and entirety of forearm and hand",
    "anastomosesVi": "Chẽ đôi thành 2 động mạch quay và trụ tại hõm khuỷu (ngang mức cổ xương quay)",
    "anastomosesEn": "Bifurcates into radial and ulnar arteries in cubital fossa at level of neck of radius",
    "histologyVi": "Động mạch cơ kinh điển có màng chun trong phát triển rõ và 2 tĩnh mạch tùy hành đi kèm",
    "histologyEn": "Classic muscular distributing artery flanked by paired venae comitantes and median nerve",
    "clinicalNotesVi": "Vị trí tiêu chuẩn đo huyết áp lâm sàng bằng ống nghe (nghe tiếng Korotkoff); chấn thương gãy trên lồi cầu xương cánh tay ở trẻ em dễ đè ép gây co thắt co rút Volkmann thiếu máu cục bộ.",
    "clinicalNotesEn": "Standard vessel for clinical non-invasive blood pressure measurement (Korotkoff sounds); supracondylar fracture entrapment causes Volkmann ischemic contracture.",
    "pulsePalpationVi": "Bắt mạch ở rãnh nhị đầu trong ở mặt trong cánh tay hoặc trước hõm khuỷu",
    "pulsePalpationEn": "Palpated in medial bicipital groove of arm and medial to biceps tendon in cubital fossa"
  },
  {
    "id": "deep_brachial_artery",
    "nameVi": "Động mạch cánh tay sâu",
    "nameEn": "Deep Brachial Artery (Profunda Brachii)",
    "nameLa": "Arteria profunda brachii",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Deep brachial artery.l",
    "meshNodeNames": [
      "Deep brachial artery.l",
      "Deep brachial artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.404,
      -0.053
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.404,
        -0.053
      ],
      "position": [
        0.0551,
        0.404,
        0.147
      ]
    },
    "dimensions": "Đường kính ~2.0 - 2.5 mm, nhánh bên lớn nhất của ĐM cánh tay",
    "originVi": "Tách ra từ mặt trong - sau của ĐM cánh tay ngay dưới bờ dưới cơ tròn lớn",
    "originEn": "Arises from posterior aspect of brachial artery just distal to teres major margin",
    "branchesVi": [
      "ĐM nuôi xương cánh tay",
      "ĐM bên quay (Radial collateral)",
      "ĐM bên giữa (Middle collateral)"
    ],
    "branchesEn": [
      "Humeral nutrient artery",
      "Radial collateral artery",
      "Middle collateral artery"
    ],
    "territoryVi": "Nuôi dưỡng toàn bộ cơ tam đầu cánh tay và tham gia mạng mạch quanh khớp khuỷu",
    "territoryEn": "Supplies triceps brachii muscle and contributes significantly to anastomotic network around elbow",
    "anastomosesVi": "Chạy cùng dây thần kinh quay trong rãnh thần kinh quay (rãnh xoắn) ra mặt sau xương cánh tay",
    "anastomosesEn": "Traverses spiral radial groove of humerus in close company with radial nerve",
    "histologyVi": "Động mạch cơ cấp máu sâu nằm sát rãnh xương cánh tay",
    "histologyEn": "Muscular branch closely nestled between lateral and medial heads of triceps",
    "clinicalNotesVi": "Gãy thân xương cánh tay (gãy 1/3 giữa) có thể làm đứt hoặc tổn thương phối hợp ĐM cánh tay sâu và thần kinh quay gây bàn tay rủ (liệt rủ cổ tay - wrist drop).",
    "clinicalNotesEn": "Mid-shaft humeral fractures risk transection of profunda brachii and radial nerve injury resulting in wrist drop."
  },
  {
    "id": "radial_artery",
    "nameVi": "Động mạch quay",
    "nameEn": "Radial Artery",
    "nameLa": "Arteria radialis",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Radial artery.l",
    "meshNodeNames": [
      "Radial artery.l",
      "Radial artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.1099,
      -0.0074
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.1099,
        -0.0074
      ],
      "position": [
        0.0551,
        0.0699,
        0.1926
      ]
    },
    "dimensions": "Đường kính ~2.2 - 2.8 mm; chạy dọc bờ ngoài khoang cẳng tay trước",
    "originVi": "Nhánh tận bên ngoài của động mạch cánh tay tại hõm khuỷu",
    "originEn": "Lateral terminal branch of brachial artery bifurcation in cubital fossa",
    "branchesVi": [
      "ĐM quặt ngược quay",
      "ĐM gan cổ tay",
      "ĐM gan tay nông",
      "ĐM ngón cái chính (Princeps pollicis)",
      "Cung gan tay sâu"
    ],
    "branchesEn": [
      "Radial recurrent",
      "Palmar carpal branch",
      "Superficial palmar branch",
      "Princeps pollicis",
      "Deep palmar arch"
    ],
    "territoryVi": "Cơ khoang cẳng tay trước ngoài, cung quay xương cẳng tay, ngón cái, ngón trỏ và cung gan tay sâu",
    "territoryEn": "Supplies lateral forearm muscles, radius bone, thumb, index finger, and palmar arches",
    "anastomosesVi": "Đi qua 'hố lào giải phẫu' (anatomical snuffbox) vào gan tay tạo cung động mạch gan tay sâu",
    "anastomosesEn": "Traverses anatomical snuffbox, pierces 1st dorsal interosseous to form deep palmar arch",
    "histologyVi": "Động mạch cơ có áo giữa giàu tế bào cơ trơn, có thể co thắt mạch mạnh khi kích thích cơ học",
    "histologyEn": "Muscular artery prone to vasospasm upon mechanical instrumentation, responsive to vasodilators",
    "clinicalNotesVi": "Vị trí bắt mạch quay thường quy nhất trong y khoa; đường tiếp cận chính để thông tim can thiệp (PCI qua ĐM quay); làm Test Allen đánh giá tuần hoàn bàng hệ trước khi chọc khí máu động mạch (ABG).",
    "clinicalNotesEn": "Universal site for pulse palpation; preferred route for coronary angiography/PCI; Allen test mandatory before radial puncture/cannulation.",
    "pulsePalpationVi": "Bắt mạch ở rãnh mạch quay giữa gân cơ cánh tay quay và gân cơ gấp cổ tay quay",
    "pulsePalpationEn": "Palpated in radial groove at distal forearm lateral to flexor carpi radialis tendon"
  },
  {
    "id": "ulnar_artery",
    "nameVi": "Động mạch trụ",
    "nameEn": "Ulnar Artery",
    "nameLa": "Arteria ulnaris",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Ulnar artery.l",
    "meshNodeNames": [
      "Ulnar artery.l",
      "Ulnar artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.1188,
      -0.0064
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.1188,
        -0.0064
      ],
      "position": [
        0.0551,
        0.0788,
        0.1936
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.2 mm (lớn hơn ĐM quay ở đoạn cẳng tay)",
    "originVi": "Nhánh tận bên trong của động mạch cánh tay tại hõm khuỷu",
    "originEn": "Medial larger terminal branch of brachial artery bifurcation in cubital fossa",
    "branchesVi": [
      "ĐM quặt ngược trụ",
      "ĐM gian cốt chung (Common interosseous)",
      "ĐM mu cổ tay",
      "Cung gan tay nông"
    ],
    "branchesEn": [
      "Anterior/posterior ulnar recurrent",
      "Common interosseous (anterior/posterior)",
      "Dorsal carpal",
      "Superficial palmar arch"
    ],
    "territoryVi": "Toàn bộ cơ khoang cẳng tay trước trong, xương trụ, thần kinh trụ và tạo cung gan tay nông",
    "territoryEn": "Supplies medial flexor forearm compartment, ulna, ulnar nerve, and dominant supply to superficial palmar arch",
    "anastomosesVi": "Đi qua ống Guyon ở cổ tay vào gan tay tạo cung động mạch gan tay nông",
    "anastomosesEn": "Enters palm superficial to flexor retinaculum through Guyon canal to form superficial palmar arch",
    "histologyVi": "Động mạch cơ đi kèm thần kinh trụ ở 2/3 dưới cẳng tay",
    "histologyEn": "Muscular artery running parallel to ulnar nerve covered by flexor carpi ulnaris",
    "clinicalNotesVi": "Chèn ép tại ống Guyon (hội chứng ống Guyon do đi xe đạp hoặc búa) gây thiếu máu ngón tay và liệt ngón út; nhánh ĐM gian cốt chung nuôi các cơ sâu cẳng tay.",
    "clinicalNotesEn": "Subject to entrapment in Guyon canal (hypothenar hammer syndrome); common interosseous feeds deep forearm muscle beds.",
    "pulsePalpationVi": "Bắt mạch ở bờ trong cổ tay phía ngoài gân cơ gấp cổ tay trụ",
    "pulsePalpationEn": "Palpated on anterior distal wrist just lateral to flexor carpi ulnaris tendon and pisiform"
  },
  {
    "id": "cephalic_vein",
    "nameVi": "Tĩnh mạch đầu",
    "nameEn": "Cephalic Vein",
    "nameLa": "Vena cephalica",
    "type": "vein",
    "region": "upper_limb",
    "primaryNodeName": "Cephalic vein.l",
    "meshNodeNames": [
      "Cephalic vein.l",
      "Cephalic vein.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.2747,
      -0.01
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.2747,
        -0.01
      ],
      "position": [
        0.0551,
        0.2747,
        0.21
      ]
    },
    "dimensions": "Đường kính ~3 - 5 mm, chạy dọc bờ ngoài mu bàn tay, cẳng tay và cánh tay",
    "originVi": "Mạng lưới tĩnh mạch mu bàn tay phía ngón cái (khoang gian đốt 1)",
    "originEn": "Radial side of dorsal venous network of hand at anatomical snuffbox",
    "branchesVi": [
      "Nhận các nhánh tĩnh mạch nông cẳng tay và cho nhánh tĩnh mạch giữa khuỷu"
    ],
    "branchesEn": [
      "Receives tributaries from superficial forearm and sends median cubital branch"
    ],
    "territoryVi": "Dẫn lưu máu da và mô dưới da của phần ngoài cẳng tay và cánh tay",
    "territoryEn": "Drains superficial lateral aspect of forearm, antecubital region, and arm",
    "anastomosesVi": "Chạy trong rãnh delta - ngực rồi chui qua mạc đòn ngực đổ vào tĩnh mạch nách",
    "anastomosesEn": "Traverses deltopectoral groove and pierces clavipectoral fascia to empty into axillary vein",
    "histologyVi": "Tĩnh mạch nông có thành chứa nhiều sợi chun và van 1 chiều hướng tâm",
    "histologyEn": "Superficial valved cutaneous vein with longitudinal smooth muscle fibers in adventitia",
    "clinicalNotesVi": "Tĩnh mạch được chọn hàng đầu để tạo đường rò động - tĩnh mạch tự thân (AVF Cimino-Brescia: nối ĐM quay với TM đầu) cho bệnh nhân chạy thận nhân tạo chu kỳ.",
    "clinicalNotesEn": "Preferred conduit for creating radiocephalic arteriovenous fistula (Cimino-Brescia AVF) for permanent hemodialysis vascular access."
  },
  {
    "id": "basilic_vein",
    "nameVi": "Tĩnh mạch nền",
    "nameEn": "Basilic Vein",
    "nameLa": "Vena basilica",
    "type": "vein",
    "region": "upper_limb",
    "primaryNodeName": "Basilic vein.l",
    "meshNodeNames": [
      "Basilic vein.l",
      "Basilic vein.r"
    ],
    "canonicalCenter": [
      0.0452,
      0.2352,
      -0.0229
    ],
    "cameraPreset": {
      "target": [
        0.0452,
        0.2352,
        -0.0229
      ],
      "position": [
        0.0552,
        0.2352,
        0.1971
      ]
    },
    "dimensions": "Đường kính ~3.5 - 5.5 mm (lớn hơn tĩnh mạch đầu ở đoạn trên)",
    "originVi": "Mạng lưới tĩnh mạch mu bàn tay phía bờ ngón út",
    "originEn": "Ulnar border of dorsal venous network of hand",
    "branchesVi": [
      "Nhận tĩnh mạch giữa khuỷu (Median cubital vein) tại hõm khuỷu"
    ],
    "branchesEn": [
      "Receives median cubital vein at anterior elbow fold"
    ],
    "territoryVi": "Dẫn lưu mặt trong mu bàn tay, cẳng tay và mô mềm cánh tay trong",
    "territoryEn": "Drains medial aspects of hand, forearm, and medial arm soft tissues",
    "anastomosesVi": "Chui qua mạc sâu cánh tay ở 1/3 dưới rồi tiếp nối với TM cánh tay tạo thành TM nách",
    "anastomosesEn": "Pierces deep brachial fascia at middle of arm to unite with brachial veins forming axillary vein",
    "histologyVi": "Tĩnh mạch nông lớn chuyển thành tĩnh mạch sâu khi xuyên qua mạc sâu",
    "histologyEn": "Starts as superficial subcutaneous vein before transitioning into subfascial deep compartment",
    "clinicalNotesVi": "TM giữa khuỷu nối TM đầu và TM nền là vị trí chọc kim lấy máu xét nghiệm và truyền dịch tĩnh mạch thường dùng nhất trên lâm sàng; phẫu thuật chuyển vị TM nền (basilic transposition AVF).",
    "clinicalNotesEn": "Median cubital vein joining basilic and cephalic is classic site for phlebotomy and IV cannula; basilic vein transposition used for secondary dialysis access."
  },
  {
    "id": "deep_palmar_arch",
    "nameVi": "Cung động mạch gan tay sâu",
    "nameEn": "Deep Palmar Arch",
    "nameLa": "Arcus palmaris profundus",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Deep palmar arch.l",
    "meshNodeNames": [
      "Deep palmar arch.l",
      "Deep palmar arch.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.0283,
      0.0116
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.0283,
        0.0116
      ],
      "position": [
        0.0551,
        -0.1083,
        0.1516
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.0 mm, nằm sâu sát nền các xương đốt bàn tay",
    "originVi": "Tạo bởi nhánh tận của động mạch quay hợp với nhánh gan tay sâu của động mạch trụ",
    "originEn": "Formed predominantly by terminal radial artery anastomosing with deep branch of ulnar artery",
    "branchesVi": [
      "Các động mạch gan đốt bàn tay (Palmar metacarpal 1-4)",
      "Các nhánh xuyên (Perforating)"
    ],
    "branchesEn": [
      "Palmar metacarpal arteries (1-4)",
      "Perforating branches to dorsal metacarpals"
    ],
    "territoryVi": "Cấp máu cho các cơ gian cốt, ngón cái, ngón trỏ và khớp khối xương cổ tay",
    "territoryEn": "Supplies interosseous muscles, deep spaces of palm, carpal joints, and metacarpal bones",
    "anastomosesVi": "Nối qua các nhánh xuyên với các động mạch mu đốt bàn tay và cung gan tay nông",
    "anastomosesEn": "Communicates with dorsal metacarpal arteries and superficial palmar arch via perforators",
    "histologyVi": "Cung mạch cơ nhỏ nằm dưới các gân cơ gấp sâu và cơ khép ngón cái",
    "histologyEn": "Deep muscular vascular arch lying across bases of metacarpal bones beneath adductor pollicis",
    "clinicalNotesVi": "Tuần hoàn bàng hệ kép bảo vệ sức sống bàn tay khi tắc ĐM quay hoặc ĐM trụ; chảy máu sâu bàn tay rất khó cầm cần chèn ép bộc lộ chính xác.",
    "clinicalNotesEn": "Dual palmar arch system protects manual perfusion; deep palmar space infections or penetrating injuries risk severe bleeding."
  },
  {
    "id": "superficial_palmar_arch",
    "nameVi": "Cung động mạch gan tay nông",
    "nameEn": "Superficial Palmar Arch",
    "nameLa": "Arcus palmaris superficialis",
    "type": "artery",
    "region": "upper_limb",
    "primaryNodeName": "Superficial palmar arch.l",
    "meshNodeNames": [
      "Superficial palmar arch.l",
      "Superficial palmar arch.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.0327,
      0.0183
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.0327,
        0.0183
      ],
      "position": [
        0.0551,
        -0.1127,
        0.1583
      ]
    },
    "dimensions": "Đường kính ~2.0 - 2.5 mm, nằm ngay dưới cân gan tay (palmar aponeurosis)",
    "originVi": "Tạo chủ yếu bởi nhánh tận của động mạch trụ hợp với nhánh gan tay nông của động mạch quay",
    "originEn": "Formed mainly by terminal ulnar artery anastomosing with superficial palmar branch of radial artery",
    "branchesVi": [
      "3 động mạch gan ngón tay chung (Common palmar digital arteries)"
    ],
    "branchesEn": [
      "Three common palmar digital arteries dividing into proper palmar digital arteries"
    ],
    "territoryVi": "Cấp máu chính cho các ngón tay (ngón 2, 3, 4 và nửa ngoài ngón 5)",
    "territoryEn": "Supplies medially three and a half fingers (index, middle, ring, and little fingers)",
    "anastomosesVi": "Nối tiếp hợp hoàn chỉnh hoặc bán hoàn chỉnh với cung sâu qua các nhánh ngón tay",
    "anastomosesEn": "Completes palmar vascular circuit with deep arch digital branches at web spaces",
    "histologyVi": "Cung động mạch cơ nông nằm nông trên các gân cơ gấp ngón nông",
    "histologyEn": "Subfascial muscular arcade positioned immediately deep to dense palmar aponeurosis",
    "clinicalNotesVi": "Đường ngang Kaplan là mốc phẫu thuật bảo vệ cung gan tay nông khi phẫu thuật giải phóng ống cổ tay (carpal tunnel release) và chấn thương rách gan bàn tay.",
    "clinicalNotesEn": "Kaplan cardinal line is surgical safety landmark during open/endoscopic carpal tunnel decompression to prevent arch laceration."
  },
  {
    "id": "pulmonary_trunk",
    "nameVi": "Thân động mạch phổi",
    "nameEn": "Pulmonary Trunk",
    "nameLa": "Truncus pulmonalis",
    "type": "artery",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Pulmonary trunk",
    "meshNodeNames": [
      "Pulmonary trunk"
    ],
    "canonicalCenter": [
      0.0769,
      0.5381,
      0.0378
    ],
    "cameraPreset": {
      "target": [
        0.0769,
        0.5381,
        0.0378
      ],
      "position": [
        0.0869,
        0.5681,
        0.2578
      ]
    },
    "dimensions": "Đường kính ~2.8 - 3.2 cm, dài ~5 cm, thành mỏng hơn ĐM chủ",
    "originVi": "Lỗ thân động mạch phổi tại phễu thất phải (conus arteriosus)",
    "originEn": "Pulmonary orifice of right ventricle at base of infundibulum (conus arteriosus)",
    "branchesVi": [
      "Động mạch phổi phải",
      "Động mạch phổi trái"
    ],
    "branchesEn": [
      "Right pulmonary artery",
      "Left pulmonary artery"
    ],
    "territoryVi": "Dẫn toàn bộ cung lượng tim chứa máu khử oxy từ tâm thất phải lên hai phổi để trao đổi khí",
    "territoryEn": "Carries entire deoxygenated cardiac output from right ventricle to lungs for gas exchange",
    "anastomosesVi": "Nối với bờ dưới cung động mạch chủ qua dây chằng động mạch (ligamentum arteriosum)",
    "anastomosesEn": "Connected to inferior concavity of aortic arch by ligamentum arteriosum",
    "histologyVi": "Động mạch đàn hồi chịu áp lực thấp (áp lực tâm thu bình thường ~15-25 mmHg)",
    "histologyEn": "Compliant elastic artery engineered for high flow and low vascular resistance",
    "clinicalNotesVi": "Tăng áp động mạch phổi (Pulmonary Hypertension > 20 mmHg) gây giãn thân ĐM phổi và suy tim phải (Cor pulmonale); viêm tắc hoặc hẹp van động mạch phổi bẩm sinh.",
    "clinicalNotesEn": "Pulmonary arterial hypertension leads to right ventricular overload and cor pulmonale; dilated trunk seen on chest CT (>29 mm)."
  },
  {
    "id": "pulmonary_bifurcation",
    "nameVi": "Chẽ đôi thân động mạch phổi",
    "nameEn": "Bifurcation of Pulmonary Trunk",
    "nameLa": "Bifurcatio trunci pulmonalis",
    "type": "artery",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Bifurcation of pulmonary trunk",
    "meshNodeNames": [
      "Bifurcation of pulmonary trunk"
    ],
    "canonicalCenter": [
      0.0742,
      0.5433,
      0.0025
    ],
    "cameraPreset": {
      "target": [
        0.0742,
        0.5433,
        0.0025
      ],
      "position": [
        0.0842,
        0.5733,
        0.2025
      ]
    },
    "dimensions": "Ngang mức góc ức và đĩa gian đốt sống ngực T4-T5",
    "originVi": "Tận cùng của thân động mạch phổi phía dưới lõm cung động mạch chủ",
    "originEn": "Terminal branching point of pulmonary trunk beneath concavity of aortic arch",
    "branchesVi": [
      "Nhánh sang rốn phổi phải",
      "Nhánh sang rốn phổi trái"
    ],
    "branchesEn": [
      "Right pulmonary bifurcation arm",
      "Left pulmonary bifurcation arm"
    ],
    "territoryVi": "Chia đôi dòng máu tâm thu đều về hai phế trường phổi",
    "territoryEn": "Equitably partitions pulmonary blood flow between right and left lungs",
    "anastomosesVi": "Nằm ngay trước phế quản gốc trái và phía trước phế quản chính",
    "anastomosesEn": "Sits directly anterior to left mainstem bronchus and bifurcation of trachea (carina)",
    "histologyVi": "Thành đàn hồi dày dặn với cấu trúc phân nhánh chữ Y góc tù",
    "histologyEn": "Dichotomous Y-shaped bifurcation reinforced by elastin fibers",
    "clinicalNotesVi": "Vị trí kẹt của Huyết khối động mạch phổi yên ngựa (Saddle Pulmonary Embolism) làm tắc nghẽn hoàn toàn đường tống máu thất phải, gây tụt huyết áp kịch phát, sốc tắc nghẽn và đột tử.",
    "clinicalNotesEn": "Primary site of massive saddle pulmonary embolism straddling the carina; precipitates acute right heart failure, obstructive shock, and sudden death."
  },
  {
    "id": "pulmonary_arteries",
    "nameVi": "Các động mạch phổi (Phải và Trái)",
    "nameEn": "Pulmonary Arteries (Right & Left)",
    "nameLa": "Arteriae pulmonales (dextra et sinistra)",
    "type": "artery",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Left pulmonary artery",
    "meshNodeNames": [
      "Left pulmonary artery",
      "Right pulmonary artery"
    ],
    "canonicalCenter": [
      0.0704,
      0.5206,
      -0.0253
    ],
    "cameraPreset": {
      "target": [
        0.0704,
        0.5206,
        -0.0253
      ],
      "position": [
        0.0804,
        0.5506,
        0.1947
      ]
    },
    "dimensions": "ĐM phải dài ~5 cm (chui sau ĐMC lên và TM chủ trên); ĐM trái dài ~3 cm",
    "originVi": "Tách ra từ chẽ đôi thân động mạch phổi ở trung thất giữa",
    "originEn": "Formed by bifurcation of pulmonary trunk within pericardial reflections",
    "branchesVi": [
      "Các động mạch thùy (Lobar arteries)",
      "Các động mạch phân thùy (Segmental arteries)"
    ],
    "branchesEn": [
      "Lobar branches (superior, middle, inferior)",
      "Bronchopulmonary segmental arteries"
    ],
    "territoryVi": "Cung cấp tuần hoàn chức năng trao đổi oxy đến từng phân thùy phổi của 2 phổi",
    "territoryEn": "Provides functional perfusion to alveolar capillary beds of all 18 bronchopulmonary segments",
    "anastomosesVi": "Chia nhánh bám sát theo cây phế quản đến mạng lưới mao mạch quanh phế nang",
    "anastomosesEn": "Branches travel strictly in tandem with bronchial tree into alveolar capillary plexuses",
    "histologyVi": "Động mạch đàn hồi chuyển sang cơ có thành mỏng và sức cản mạch máu phổi rất thấp",
    "histologyEn": "Thin-walled low-resistance muscular-elastic pulmonary vessels with high vascular capacitance",
    "clinicalNotesVi": "Thuyên tắc phổi (Pulmonary Embolism - PE) thường do huyết khối từ tĩnh mạch sâu chi dưới (DVT) di chuyển lên; chẩn đoán tiêu chuẩn vàng bằng chụp cắt lớp vi tính mạch máu phổi (CTPA).",
    "clinicalNotesEn": "Target of pulmonary embolism originating from lower extremity deep vein thrombosis (DVT); diagnosed rapidly via CT Pulmonary Angiography (CTPA)."
  },
  {
    "id": "pulmonary_veins",
    "nameVi": "Các tĩnh mạch phổi (4 tĩnh mạch)",
    "nameEn": "Pulmonary Veins (Four Veins)",
    "nameLa": "Venae pulmonales (quattuor)",
    "type": "vein",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Left superior pulmonary vein",
    "meshNodeNames": [
      "Left superior pulmonary vein",
      "Left inferior pulmonary vein",
      "Right superior pulmonary vein",
      "Right inferior pulmonary vein"
    ],
    "canonicalCenter": [
      0.0591,
      0.4994,
      -0.0302
    ],
    "cameraPreset": {
      "target": [
        0.0591,
        0.4994,
        -0.0302
      ],
      "position": [
        0.0691,
        0.5294,
        0.1898
      ]
    },
    "dimensions": "Gồm 4 tĩnh mạch riêng biệt, đường kính mỗi TM ~12 - 15 mm, không có van",
    "originVi": "Mỗi phổi dẫn lưu qua 2 tĩnh mạch phổi (trên và dưới) xuất phát từ rốn phổi",
    "originEn": "Arise from capillary beds of pulmonary alveoli, exiting lung hilum as 2 veins per lung",
    "branchesVi": [
      "Hợp lưu từ các tĩnh mạch gian phân thùy và thùy phổi"
    ],
    "branchesEn": [
      "Formed by coalescence of intersegmental and lobar pulmonary veins"
    ],
    "territoryVi": "Dẫn lưu 100% máu giàu oxy (đã bão hòa 98% O2 tại phế nang) trở về tâm nhĩ trái",
    "territoryEn": "Transports 100% of oxygenated post-alveolar blood directly into left atrium",
    "anastomosesVi": "Mở trực tiếp vào thành sau của tâm nhĩ trái qua 4 lỗ tĩnh mạch phổi riêng biệt",
    "anastomosesEn": "Opens into posterosuperior wall of left atrium via four discrete ostia",
    "histologyVi": "Tĩnh mạch không van, thành có các dải cơ tim (myocardial sleeves) bao quanh đoạn gốc",
    "histologyEn": "Valveless veins whose proximal segments are encircled by extensions of left atrial myocardium",
    "clinicalNotesVi": "Các sợi cơ tim bao quanh gốc tĩnh mạch phổi là nguồn phát sinh các ổ ngoại vị kích hoạt bệnh Rung Nhĩ (Atrial Fibrillation - AF); triệt đốt cô lập tĩnh mạch phổi (PVI) là điều trị can thiệp chuẩn.",
    "clinicalNotesEn": "Myocardial sleeves around pulmonary vein ostia are primary arrhythmogenic triggers for Atrial Fibrillation; treated by Pulmonary Vein Isolation (PVI) catheter ablation."
  },
  {
    "id": "internal_thoracic_artery",
    "nameVi": "Động mạch ngực trong (ĐM vú trong)",
    "nameEn": "Internal Thoracic Artery (LIMA / RIMA)",
    "nameLa": "Arteria thoracica interna",
    "type": "artery",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Internal thoracic artery.l",
    "meshNodeNames": [
      "Internal thoracic artery.l",
      "Internal thoracic artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.5322,
      0.0444
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.5322,
        0.0444
      ],
      "position": [
        0.0551,
        0.5322,
        0.2844
      ]
    },
    "dimensions": "Đường kính ~2.0 - 2.5 mm, dài ~18 - 22 cm, chạy song song bờ xương ức",
    "originVi": "Mặt dưới đoạn thứ nhất của động mạch dưới đòn",
    "originEn": "Arises from inferior aspect of first part of subclavian artery opposite thyrocervical trunk",
    "branchesVi": [
      "ĐM hoành màng tim (Pericardiacophrenic)",
      "Các nhánh gian sườn trước (1-6)",
      "ĐM thượng vị trên",
      "ĐM cơ hoành (Musculophrenic)"
    ],
    "branchesEn": [
      "Pericardiacophrenic",
      "Anterior intercostal branches (spaces 1-6)",
      "Superior epigastric",
      "Musculophrenic"
    ],
    "territoryVi": "Cấp máu cho thành ngực trước, xương ức, tuyến vú, màng ngoài tim và cơ hoành",
    "territoryEn": "Supplies anterior thoracic wall, sternum, breast, thymus, pericardium, and anterior diaphragm",
    "anastomosesVi": "Nhánh thượng vị trên nối với động mạch thượng vị dưới (nhánh của ĐM chậu ngoài) tại bao cơ thẳng bụng",
    "anastomosesEn": "Superior epigastric branch anastomoses directly with inferior epigastric artery in rectus sheath",
    "histologyVi": "Động mạch cơ với lớp nội mô đặc biệt kháng xơ vữa động mạch và có lớp chun nguyên vẹn",
    "histologyEn": "Muscular artery possessing unique biological resistance to intimal hyperplasia and atherosclerosis",
    "clinicalNotesVi": "Động mạch ngực trong trái (LIMA) là mạch ghép số 1 được ưu tiên tuyệt đối trong phẫu thuật bắc cầu động mạch vành (LIMA-to-LAD CABG) với tỷ lệ thông mạch trên 90% sau 10-15 năm.",
    "clinicalNotesEn": "Left internal mammary artery (LIMA) is gold-standard conduit for bypass to LAD in CABG surgery, demonstrating >90% patency at 10-15 years."
  },
  {
    "id": "posterior_intercostal_arteries",
    "nameVi": "Các động mạch gian sườn sau",
    "nameEn": "Posterior Intercostal Arteries",
    "nameLa": "Arteriae intercostales posteriores",
    "type": "artery",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Posterior intercostal arteries.l",
    "meshNodeNames": [
      "Posterior intercostal arteries.l",
      "Posterior intercostal arteries.r"
    ],
    "canonicalCenter": [
      0.0541,
      0.4167,
      -0.0044
    ],
    "cameraPreset": {
      "target": [
        0.0541,
        0.4167,
        -0.0044
      ],
      "position": [
        0.0641,
        0.4167,
        0.2556
      ]
    },
    "dimensions": "11 cặp động mạch chạy trong rãnh sườn của các khoang liên sườn",
    "originVi": "Cặp 1-2 từ ĐM gian sườn cao nhất (thân sườn cổ); cặp 3-11 tách trực tiếp từ mặt sau ĐM chủ ngực",
    "originEn": "First 2 spaces from supreme intercostal artery; spaces 3-11 directly from posterior thoracic aorta",
    "branchesVi": [
      "Nhánh lưng (nuôi cơ lưng và tủy sống qua nhánh gai)",
      "Nhánh bì ngoài",
      "Nhánh gian sườn chính"
    ],
    "branchesEn": [
      "Dorsal branch (with spinal branch to cord)",
      "Collateral intercostal branch",
      "Lateral cutaneous"
    ],
    "territoryVi": "Cấp máu cho cơ gian sườn, xương sườn, màng phổi thành, tủy sống ngực và da thành ngực",
    "territoryEn": "Supplies intercostal muscles, ribs, parietal pleura, thoracic spinal cord, and overlying skin",
    "anastomosesVi": "Nối tiếp hợp ở phía trước với các nhánh gian sườn trước của động mạch ngực trong",
    "anastomosesEn": "Anastomoses anteriorly with anterior intercostal branches from internal thoracic artery",
    "histologyVi": "Động mạch cơ đi cùng tĩnh mạch gian sườn và thần kinh gian sườn theo thứ tự V-A-N từ trên xuống dưới trong rãnh sườn",
    "histologyEn": "Runs within subcostal groove in neurovascular bundle organized Vein-Artery-Nerve (V-A-N from superior to inferior)",
    "clinicalNotesVi": "Nhánh Adamkiewicz (ĐM tủy lớn) thường tách từ ĐM gian sườn sau T9-T12 bên trái nuôi 2/3 dưới tủy sống; khi chọc hút dịch màng phổi (thoracentesis) phải đi sát bờ trên xương sườn dưới để tránh tổn thương bó mạch V-A-N.",
    "clinicalNotesEn": "Artery of Adamkiewicz arises from lower intercostals (T9-T12); thoracentesis needles must be inserted over upper border of rib to avoid subcostal V-A-N injury."
  },
  {
    "id": "azygos_vein",
    "nameVi": "Tĩnh mạch đơn",
    "nameEn": "Azygos Vein",
    "nameLa": "Vena azygos",
    "type": "vein",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Azygos vein",
    "meshNodeNames": [
      "Azygos vein"
    ],
    "canonicalCenter": [
      0.0316,
      0.444,
      -0.0267
    ],
    "cameraPreset": {
      "target": [
        0.0316,
        0.444,
        -0.0267
      ],
      "position": [
        0.0416,
        0.444,
        0.2133
      ]
    },
    "dimensions": "Đường kính ~8 - 10 mm, dài ~20 - 25 cm, chạy dọc bên phải cột sống ngực",
    "originVi": "Hợp lưu của tĩnh mạch thắt lưng lên phải và tĩnh mạch dưới sườn phải ngang mức T12",
    "originEn": "Formed by union of right ascending lumbar vein and right subcostal vein at T12 level",
    "branchesVi": [
      "Nhận các TM gian sườn sau phải (4-11), TM bán đơn, TM bán đơn phụ và TM phế quản"
    ],
    "branchesEn": [
      "Receives right posterior intercostal veins (4-11), hemiazygos, accessory hemiazygos, and esophageal veins"
    ],
    "territoryVi": "Dẫn lưu toàn bộ thành ngực sau, các tạng trung thất sau và cột sống ngực - thắt lưng",
    "territoryEn": "Drains posterior walls of thorax and abdomen, mediastinal viscera, and vertebral venous plexus",
    "anastomosesVi": "Uốn cong hình quai (cung TM đơn) bắt chéo trên cuống phổi phải để đổ vào tĩnh mạch chủ trên",
    "anastomosesEn": "Arches forward over right lung root at T4 to terminate in posterior superior vena cava",
    "histologyVi": "Tĩnh mạch hệ thống lớn có vài van không hoàn toàn, thành cơ trơn phát triển vừa",
    "histologyEn": "Unpaired systemic collateral conduit possessing rudimentary non-occlusive valves",
    "clinicalNotesVi": "Cầu nối tuần hoàn bàng hệ sống còn giữa hệ thống tĩnh mạch chủ dưới và tĩnh mạch chủ trên (Cavo-caval shunt); khi tắc SVC hoặc IVC, tĩnh mạch đơn giãn to dẫn lưu máu thay thế.",
    "clinicalNotesEn": "Critical cavocaval anastomosis connecting IVC and SVC territories; acts as primary decompression bypass in SVC or IVC obstruction."
  },
  {
    "id": "hemiazygos_vein",
    "nameVi": "Tĩnh mạch bán đơn",
    "nameEn": "Hemiazygos Vein",
    "nameLa": "Vena hemi-azygos",
    "type": "vein",
    "region": "thoracic_pulmonary",
    "primaryNodeName": "Hemi-azygos vein",
    "meshNodeNames": [
      "Hemi-azygos vein"
    ],
    "canonicalCenter": [
      0.0497,
      0.3744,
      -0.0505
    ],
    "cameraPreset": {
      "target": [
        0.0497,
        0.3744,
        -0.0505
      ],
      "position": [
        0.0597,
        0.3744,
        0.1695
      ]
    },
    "dimensions": "Đường kính ~4 - 6 mm, chạy dọc bên trái cột sống ngực dưới",
    "originVi": "Hợp lưu của tĩnh mạch thắt lưng lên trái và tĩnh mạch dưới sườn trái",
    "originEn": "Formed in abdomen by union of left ascending lumbar vein and left subcostal vein",
    "branchesVi": [
      "Nhận các tĩnh mạch gian sườn sau trái dưới (khoang 9-11) và TM thực quản"
    ],
    "branchesEn": [
      "Receives 9th-11th left posterior intercostal veins, lower esophageal, and mediastinal veins"
    ],
    "territoryVi": "Dẫn lưu máu từ thành ngực sau bên trái đoạn dưới và vùng thắt lưng trên",
    "territoryEn": "Drains left posterior lower thoracic wall and retroperitoneal lumbar tissues",
    "anastomosesVi": "Bắt chéo qua mặt trước cột sống đốt ngực T8 hoặc T9 (sau động mạch chủ ngực) đổ vào tĩnh mạch đơn",
    "anastomosesEn": "Crosses vertebral column from left to right at T8/T9 behind thoracic aorta to join azygos vein",
    "histologyVi": "Tĩnh mạch thành mỏng thuộc hệ thống tĩnh mạch đơn thành ngực",
    "histologyEn": "Thin-walled venous collector forming the inferior left counterpart of the azygos axis",
    "clinicalNotesVi": "Tĩnh mạch bán đơn phụ (Accessory hemiazygos) dẫn lưu các khoang gian sườn trái giữa (4-8); phối hợp dẫn lưu bàng hệ trong tăng áp lực tĩnh mạch cửa qua búi tĩnh mạch thực quản.",
    "clinicalNotesEn": "Communicates with accessory hemiazygos and esophageal veins; serves as portosystemic collateral channel in portal hypertension."
  },
  {
    "id": "celiac_trunk",
    "nameVi": "Thân tạng",
    "nameEn": "Celiac Trunk",
    "nameLa": "Truncus coeliacus",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Coeliac trunk",
    "meshNodeNames": [
      "Coeliac trunk"
    ],
    "canonicalCenter": [
      0.0547,
      0.3168,
      0.0138
    ],
    "cameraPreset": {
      "target": [
        0.0547,
        0.3168,
        0.0138
      ],
      "position": [
        0.0647,
        0.2968,
        0.2138
      ]
    },
    "dimensions": "Đường kính ~6 - 8 mm, thân rất ngắn dài ~1.0 - 1.5 cm",
    "originVi": "Mặt trước động mạch chủ bụng ngay dưới cơ hoành ngang mức đốt sống ngực T12 - L1",
    "originEn": "Anterior aspect of abdominal aorta immediately below aortic hiatus at T12-L1 vertebra",
    "branchesVi": [
      "ĐM vị trái (Left gastric)",
      "ĐM lách (Splenic)",
      "ĐM gan chung (Common hepatic)"
    ],
    "branchesEn": [
      "Left gastric artery",
      "Splenic artery",
      "Common hepatic artery (tripus Halleri)"
    ],
    "territoryVi": "Cấp máu cho toàn bộ các tạng có nguồn gốc từ ruột trước (foregut): thực quản bụng, dạ dày, tá tràng đoạn trên, gan, túi mật, tụy và lách",
    "territoryEn": "Supplies all embryological foregut viscera: abdominal esophagus, stomach, proximal duodenum, liver, gallbladder, pancreas, and spleen",
    "anastomosesVi": "Nối phong phú với ĐM mạc treo tràng trên qua các cung động mạch tá tụy",
    "anastomosesEn": "Forms rich gastroduodenal and pancreaticoduodenal anastomoses with superior mesenteric artery",
    "histologyVi": "Thân động mạch cơ lớn tách ra vuông góc từ động mạch chủ bụng",
    "histologyEn": "Short, wide muscular arterial trunk surrounded by dense celiac autonomic plexus and lymph nodes",
    "clinicalNotesVi": "Hội chứng dây chằng cung giữa (Median Arcuate Ligament Syndrome - MALS / Dunbar syndrome) do cơ hoành chèn ép thân tạng gây đau bụng sau ăn và sụt cân.",
    "clinicalNotesEn": "Median Arcuate Ligament Syndrome (MALS) compresses celiac trunk causing postprandial epigastric angina and weight loss."
  },
  {
    "id": "left_gastric_artery",
    "nameVi": "Động mạch vị trái",
    "nameEn": "Left Gastric Artery",
    "nameLa": "Arteria gastrica sinistra",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Left gastric artery",
    "meshNodeNames": [
      "Left gastric artery"
    ],
    "canonicalCenter": [
      0.0595,
      0.3379,
      0.0364
    ],
    "cameraPreset": {
      "target": [
        0.0595,
        0.3379,
        0.0364
      ],
      "position": [
        0.0695,
        0.3179,
        0.2164
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.5 mm; nhánh nhỏ nhất của thân tạng",
    "originVi": "Tách ra từ thân tạng, chạy ngược lên về phía tâm vị rồi quặt xuống dọc bờ cong nhỏ dạ dày",
    "originEn": "Arises from celiac trunk, ascends toward cardiac orifice then curves down along lesser curvature",
    "branchesVi": [
      "Các nhánh thực quản (Esophageal branches)",
      "Các nhánh vị (Gastric branches)"
    ],
    "branchesEn": [
      "Ascending esophageal branches",
      "Anterior and posterior gastric branches"
    ],
    "territoryVi": "Cấp máu cho đoạn dưới thực quản, tâm vị và 2/3 trên bờ cong nhỏ dạ dày",
    "territoryEn": "Supplies abdominal esophagus, cardiac notch, and superior lesser curvature of stomach",
    "anastomosesVi": "Nối trực tiếp với động mạch vị phải (nhánh của ĐM gan riêng) tạo vòng mạch bờ cong nhỏ",
    "anastomosesEn": "Anastomoses along lesser curvature with right gastric artery to complete lesser curvature arcade",
    "histologyVi": "Động mạch cơ chạy trong nếp phúc mạc của mạc nối nhỏ (dây chằng gan - vị)",
    "histologyEn": "Muscular artery running within the two layers of the hepatogastric ligament of lesser omentum",
    "clinicalNotesVi": "Loét bờ cong nhỏ dạ dày ăn thủng ĐM vị trái gây xuất huyết tiêu hóa trên ồ ạt; thuyên tắc mạch qua ống thông (catheter embolization) là phương pháp cầm máu can thiệp hiệu quả.",
    "clinicalNotesEn": "Peptic ulcer of lesser curvature eroding into left gastric artery causes massive upper gastrointestinal hemorrhage."
  },
  {
    "id": "splenic_artery",
    "nameVi": "Động mạch lách",
    "nameEn": "Splenic Artery",
    "nameLa": "Arteria splenica / lienalis",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Splenic artery",
    "meshNodeNames": [
      "Splenic artery"
    ],
    "canonicalCenter": [
      0.1043,
      0.327,
      -0.0025
    ],
    "cameraPreset": {
      "target": [
        0.1043,
        0.327,
        -0.0025
      ],
      "position": [
        0.1143,
        0.307,
        0.1775
      ]
    },
    "dimensions": "Đường kính ~4 - 5 mm, dài ~12 - 15 cm, đường đi ngoằn ngoèo đặc trưng",
    "originVi": "Nhánh lớn nhất của thân tạng, chạy sang trái dọc bờ trên thân và đuôi tụy",
    "originEn": "Largest branch of celiac trunk, tortuous course running along superior border of pancreas to spleen",
    "branchesVi": [
      "ĐM tụy lưng",
      "ĐM tụy lớn",
      "Các ĐM vị ngắn (Short gastric)",
      "ĐM vị mạc nối trái (Left gastro-omental)"
    ],
    "branchesEn": [
      "Dorsal pancreatic",
      "Greater pancreatic (magna)",
      "Short gastric arteries (4-6)",
      "Left gastro-omental (gastroepiploic)"
    ],
    "territoryVi": "Cấp máu cho thân và đuôi tụy, đáy vị dạ dày, mạc nối lớn và toàn bộ nhu mô lách",
    "territoryEn": "Supplies pancreatic body and tail, gastric fundus, greater omentum, and splenic parenchyma",
    "anastomosesVi": "Nhánh vị mạc nối trái nối với nhánh vị mạc nối phải dọc bờ cong lớn dạ dày",
    "anastomosesEn": "Left gastro-omental branch anastomoses along greater curvature with right gastro-omental artery",
    "histologyVi": "Động mạch cơ lớn với thành uốn khúc uốn lượn để thích ứng với chuyển động của dạ dày và cơ hoành",
    "histologyEn": "Tortuous muscular distributing artery with thick elastic lamellae cushioning respiratory displacement",
    "clinicalNotesVi": "Phình động mạch lách (Splenic artery aneurysm) là phình động mạch tạng phổ biến nhất, có nguy cơ vỡ cực cao trong thai kỳ; chấn thương dập lách gây chảy máu ổ bụng cấp cứu cắt lách.",
    "clinicalNotesEn": "Most common visceral artery aneurysm; high rupture risk in 3rd trimester pregnancy; splenic trauma causes hemoperitoneum."
  },
  {
    "id": "common_hepatic_artery",
    "nameVi": "Động mạch gan chung",
    "nameEn": "Common Hepatic Artery",
    "nameLa": "Arteria hepatica communis",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Common hepatic artery",
    "meshNodeNames": [
      "Common hepatic artery"
    ],
    "canonicalCenter": [
      0.0379,
      0.3216,
      0.0395
    ],
    "cameraPreset": {
      "target": [
        0.0379,
        0.3216,
        0.0395
      ],
      "position": [
        0.0479,
        0.3016,
        0.2195
      ]
    },
    "dimensions": "Đường kính ~4.5 - 5.5 mm, dài ~3 - 4 cm, chạy sang phải",
    "originVi": "Tách ra từ thân tạng chạy sang phải về phía cuống gan",
    "originEn": "Arises from celiac trunk running forward and to the right toward upper border of duodenum",
    "branchesVi": [
      "Động mạch gan riêng (Proper hepatic)",
      "Động mạch vị tá tràng (Gastroduodenal)",
      "Đôi khi tách ĐM vị phải"
    ],
    "branchesEn": [
      "Proper hepatic artery",
      "Gastroduodenal artery",
      "Right gastric artery (variable)"
    ],
    "territoryVi": "Dẫn lưu lượng máu nuôi dưỡng đến gan, túi mật, dạ dày, tá tràng và đầu tụy",
    "territoryEn": "Transmits arterial blood to liver, biliary tree, stomach, duodenum, and pancreas head",
    "anastomosesVi": "Chạy dọc bờ trên mạc nối nhỏ phía trước tĩnh mạch cửa",
    "anastomosesEn": "Traverses anterior margin of foramen of Winslow (epiploic foramen) anterior to portal vein",
    "histologyVi": "Động mạch cơ lớn được bao quanh bởi mạng hạch bạch huyết gan và đám rối thần kinh tạng",
    "histologyEn": "Stout muscular artery enveloped by hepatic lymph node chain and perivascular sympathetic nerves",
    "clinicalNotesVi": "Nghiệm pháp Pringle (kẹp cuống gan tại lỗ Winslow) kẹp bó mạch gan chung/riêng và TM cửa để kiểm soát chảy máu gan ồ ạt trong chấn thương gan hoặc phẫu thuật cắt gan.",
    "clinicalNotesEn": "Target of Pringle maneuver (clamping hepatoduodenal ligament at epiploic foramen) to control liver parenchymal hemorrhage."
  },
  {
    "id": "proper_hepatic_artery",
    "nameVi": "Động mạch gan riêng",
    "nameEn": "Proper Hepatic Artery",
    "nameLa": "Arteria hepatica propria",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Proper hepatic artery",
    "meshNodeNames": [
      "Proper hepatic artery"
    ],
    "canonicalCenter": [
      -0.0311,
      0.3293,
      0.0558
    ],
    "cameraPreset": {
      "target": [
        -0.0311,
        0.3293,
        0.0558
      ],
      "position": [
        -0.0211,
        0.3093,
        0.2258
      ]
    },
    "dimensions": "Đường kính ~3.5 - 4.5 mm, dài ~2 - 3 cm",
    "originVi": "Tiếp nối động mạch gan chung sau khi tách ra động mạch vị tá tràng",
    "originEn": "Direct continuation of common hepatic artery distal to origin of gastroduodenal artery",
    "branchesVi": [
      "ĐM vị phải (Right gastric)",
      "ĐM gan trái",
      "ĐM gan phải (cho ĐM túi mật - Cystic artery)"
    ],
    "branchesEn": [
      "Right gastric artery",
      "Left hepatic artery",
      "Right hepatic artery (gives off cystic artery)"
    ],
    "territoryVi": "Cấp 25% lượng máu giàu oxy cho nhu mô gan, đường mật trong gan và túi mật",
    "territoryEn": "Provides 25% of hepatic blood flow (50% of oxygen supply) to liver lobes and biliary tree",
    "anastomosesVi": "Nằm trong cuống gan (dây chằng gan tá tràng) phía trước TM cửa và bên trái ống mật chủ",
    "anastomosesEn": "Ascends in free edge of lesser omentum medial to common bile duct and anterior to portal vein",
    "histologyVi": "Động mạch cơ phân chia vào các khoảng cửa gan (portal triads) chia nhánh tận tiểu động mạch",
    "histologyEn": "Muscular artery branching into interlobular arterioles within classic hepatic portal triads",
    "clinicalNotesVi": "Động mạch túi mật (Cystic artery) xuất phát từ nhánh gan phải nằm trong Tam giác Calot (chứa ĐM túi mật, ống túi mật, ống gan chung); xác định chính xác để kẹp cắt khi mổ cắt túi mật nội soi.",
    "clinicalNotesEn": "Cystic artery branches within Calot triangle; critical surgical dissection target during laparoscopic cholecystectomy."
  },
  {
    "id": "gastroduodenal_artery",
    "nameVi": "Động mạch vị tá tràng",
    "nameEn": "Gastroduodenal Artery (GDA)",
    "nameLa": "Arteria gastroduodenalis",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Gastroduodenal artery",
    "meshNodeNames": [
      "Gastroduodenal artery"
    ],
    "canonicalCenter": [
      0.0136,
      0.3066,
      0.0715
    ],
    "cameraPreset": {
      "target": [
        0.0136,
        0.3066,
        0.0715
      ],
      "position": [
        0.0236,
        0.2766,
        0.2415
      ]
    },
    "dimensions": "Đường kính ~3.0 - 4.0 mm, chạy thẳng đứng xuống sau khúc 1 tá tràng",
    "originVi": "Nhánh tận dưới của động mạch gan chung tại bờ trên khúc 1 tá tràng",
    "originEn": "Descends behind first part of duodenum from common hepatic artery",
    "branchesVi": [
      "ĐM vị mạc nối phải (Right gastro-omental)",
      "ĐM tá tụy trên trước và sau (Superior pancreaticoduodenal)"
    ],
    "branchesEn": [
      "Right gastro-omental",
      "Anterior superior pancreaticoduodenal",
      "Posterior superior pancreaticoduodenal"
    ],
    "territoryVi": "Khúc 1 và 2 tá tràng, đầu và mỏm móc tụy, bờ cong lớn dạ dày và mạc nối lớn",
    "territoryEn": "First and second parts of duodenum, pancreatic head, uncinate process, and greater curvature of stomach",
    "anastomosesVi": "Nối trực tiếp với các nhánh tá tụy dưới của ĐM mạc treo tràng trên tạo các cung mạch tá tụy",
    "anastomosesEn": "Anastomoses with inferior pancreaticoduodenal branches from SMA forming peripancreatic arterial arches",
    "histologyVi": "Động mạch cơ áp sát thành sau tá tràng",
    "histologyEn": "Muscular artery coursing in direct retroperitoneal contact with posterior duodenal bulb",
    "clinicalNotesVi": "Ổ loét hành tá tràng mặt sau ăn thủng ĐM vị tá tràng là nguyên nhân phổ biến nhất của xuất huyết tiêu hóa trên nặng đe dọa tính mạng (nôn ra máu, đi ngoài phân đen).",
    "clinicalNotesEn": "Posterior duodenal peptic ulcer eroding GDA is classic cause of life-threatening catastrophic upper GI bleeding."
  },
  {
    "id": "superior_mesenteric_artery",
    "nameVi": "Động mạch mạc treo tràng trên (SMA)",
    "nameEn": "Superior Mesenteric Artery",
    "nameLa": "Arteria mesenterica superior",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Superior mesenteric artery",
    "meshNodeNames": [
      "Superior mesenteric artery"
    ],
    "canonicalCenter": [
      0.0427,
      0.2126,
      0.0316
    ],
    "cameraPreset": {
      "target": [
        0.0427,
        0.2126,
        0.0316
      ],
      "position": [
        0.0527,
        0.1726,
        0.2516
      ]
    },
    "dimensions": "Đường kính ~6 - 8 mm, dài ~20 - 25 cm, chạy trong rễ mạc treo ruột non",
    "originVi": "Mặt trước động mạch chủ bụng ngang mức bờ dưới đốt sống thắt lưng L1 (sau thân tụy)",
    "originEn": "Anterior surface of abdominal aorta ~1 cm below celiac trunk at level of lower L1 border",
    "branchesVi": [
      "ĐM tá tụy dưới",
      "Các ĐM hỗng tràng và hồi tràng (12-15 nhánh)",
      "ĐM hồi đại tràng",
      "ĐM đại tràng phải",
      "ĐM đại tràng giữa"
    ],
    "branchesEn": [
      "Inferior pancreaticoduodenal",
      "Jejunal and ileal branches",
      "Ileocolic",
      "Right colic",
      "Middle colic"
    ],
    "territoryVi": "Cấp máu cho toàn bộ các tạng nguồn gốc ruột giữa (midgut): từ khúc dưới tá tràng, toàn bộ hỗng tràng, hồi tràng, manh tràng, ruột thừa, đại tràng lên và 2/3 phải đại tràng ngang",
    "territoryEn": "Supplies entire midgut: lower duodenum, entire jejunum and ileum, cecum, appendix, ascending colon, and proximal 2/3 transverse colon",
    "anastomosesVi": "Nối với ĐM thân tạng qua cung tá tụy; nối với ĐM mạc treo tràng dưới qua cung Riolan và động mạch viền Drummond",
    "anastomosesEn": "Anastomoses with celiac via pancreaticoduodenal arcade and with IMA via marginal artery of Drummond and arc of Riolan",
    "histologyVi": "Động mạch cơ lớn chạy bắt chéo trước khúc 3 tá tràng và mỏm móc tụy",
    "histologyEn": "Large muscular distributing artery crossing anterior to uncinate process and 3rd duodenal segment",
    "clinicalNotesVi": "Hội chứng động mạch mạc treo tràng trên (Wilkie syndrome): góc SMA hẹp kẹp nghẽn tá tràng khúc 3; tắc nghẽn cấp SMA do huyết khối gây hoại tử toàn bộ ruột non với tỷ lệ tử vong 70%.",
    "clinicalNotesEn": "Acute SMA thromboembolism causes catastrophic acute mesenteric ischemia; SMA syndrome compresses 3rd duodenum in narrow aortomesenteric angle."
  },
  {
    "id": "inferior_mesenteric_artery",
    "nameVi": "Động mạch mạc treo tràng dưới (IMA)",
    "nameEn": "Inferior Mesenteric Artery",
    "nameLa": "Arteria mesenterica inferior",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Inferior mesenteric artery",
    "meshNodeNames": [
      "Inferior mesenteric artery"
    ],
    "canonicalCenter": [
      0.0582,
      0.1678,
      0.0178
    ],
    "cameraPreset": {
      "target": [
        0.0582,
        0.1678,
        0.0178
      ],
      "position": [
        0.0682,
        0.1178,
        0.2178
      ]
    },
    "dimensions": "Đường kính ~3.5 - 4.5 mm, dài ~4 - 5 cm trước khi chia nhánh",
    "originVi": "Mặt trước động mạch chủ bụng ở mức đốt sống thắt lưng L3 (khoảng 3-4 cm trên chỗ chia đôi ĐMC)",
    "originEn": "Anterior aorta at level of L3, approximately 3-4 cm superior to aortic bifurcation",
    "branchesVi": [
      "ĐM đại tràng trái (Left colic)",
      "Các ĐM đại tràng xích-ma (Sigmoid arteries 2-4 nhánh)",
      "ĐM trực tràng trên (Superior rectal)"
    ],
    "branchesEn": [
      "Left colic artery",
      "Sigmoid arteries (2-4)",
      "Superior rectal artery (terminal branch)"
    ],
    "territoryVi": "Cấp máu cho toàn bộ các tạng ruột sau (hindgut): 1/3 trái đại tràng ngang, đại tràng xuống, đại tràng xích-ma và phần trên trực tràng",
    "territoryEn": "Supplies entire embryological hindgut: distal 1/3 transverse colon, splenic flexure, descending colon, sigmoid colon, and upper rectum",
    "anastomosesVi": "Nối với ĐM mạc treo tràng trên qua động mạch viền Drummond và cung Riolan tại góc lách",
    "anastomosesEn": "Anastomoses with SMA via marginal artery of Drummond and meandering mesenteric artery of Moskowitz",
    "histologyVi": "Động mạch cơ chạy sau phúc mạc bắt chéo bờ trong động mạch chậu chung trái",
    "histologyEn": "Retroperitoneal muscular artery passing inferolaterally crossing left common iliac vessels",
    "clinicalNotesVi": "Góc lách đại tràng (điểm Griffiths) và chỗ nối đại tràng xích-ma - trực tràng (điểm Sudeck) là các 'vùng ranh giới mạch máu' (watershed areas) dễ bị viêm đại tràng thiếu máu cục bộ (ischemic colitis) nhất khi tụt huyết áp.",
    "clinicalNotesEn": "Griffiths point (splenic flexure) and Sudeck point (rectosigmoid) are watershed ischemic zones highly vulnerable during systemic hypotension."
  },
  {
    "id": "ileocolic_artery",
    "nameVi": "Động mạch hồi đại tràng",
    "nameEn": "Ileocolic Artery",
    "nameLa": "Arteria ileocolica",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Ileocolic artery",
    "meshNodeNames": [
      "Ileocolic artery"
    ],
    "canonicalCenter": [
      0.0236,
      0.1969,
      0.0318
    ],
    "cameraPreset": {
      "target": [
        0.0236,
        0.1969,
        0.0318
      ],
      "position": [
        0.0336,
        0.1469,
        0.2118
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.2 mm, chạy chéo xuống hố chậu phải",
    "originVi": "Nhánh bên dưới cùng tách từ bờ phải động mạch mạc treo tràng trên",
    "originEn": "Lowest right branch arising from trunk of superior mesenteric artery",
    "branchesVi": [
      "Nhánh lên (nối ĐM đại tràng phải)",
      "Nhánh hồi (nối ĐM mạc treo)",
      "ĐM manh tràng trước và sau",
      "ĐM ruột thừa (Appendicular artery)"
    ],
    "branchesEn": [
      "Colic branch",
      "Ileal branch",
      "Anterior and posterior cecal",
      "Appendicular artery"
    ],
    "territoryVi": "Đoạn cuối hồi tràng, van hồi manh tràng Bauhin, manh tràng, ruột thừa và đoạn đầu đại tràng lên",
    "territoryEn": "Terminal ileum, ileocecal valve, cecum, vermiform appendix, and proximal ascending colon",
    "anastomosesVi": "Nối với nhánh tận của SMA và nhánh xuống của ĐM đại tràng phải",
    "anastomosesEn": "Forms continuous arcade between terminal SMA and descending branch of right colic artery",
    "histologyVi": "Động mạch cơ chạy trong rễ mạc treo ruột về phía góc hồi manh tràng",
    "histologyEn": "Muscular branch traversing retroperitoneal fascia into mesoappendix and ileocecal fold",
    "clinicalNotesVi": "Động mạch ruột thừa là động mạch tận (end-artery) chạy trong mạc treo ruột thừa; tắc lòng ruột thừa gây ứ trệ, tắc ĐM ruột thừa dẫn đến hoại tử thủng ruột thừa trong viêm ruột thừa cấp.",
    "clinicalNotesEn": "Appendicular artery is a terminal functional end-artery; thrombosis triggers rapid transmural gangrene and perforation in acute appendicitis."
  },
  {
    "id": "right_colic_artery",
    "nameVi": "Động mạch đại tràng phải",
    "nameEn": "Right Colic Artery",
    "nameLa": "Arteria colica dextra",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Right colic artery",
    "meshNodeNames": [
      "Right colic artery"
    ],
    "canonicalCenter": [
      0.0015,
      0.2338,
      0.0284
    ],
    "cameraPreset": {
      "target": [
        0.0015,
        0.2338,
        0.0284
      ],
      "position": [
        0.0115,
        0.1938,
        0.2084
      ]
    },
    "dimensions": "Đường kính ~2.2 - 2.8 mm, chạy ngang sau phúc mạc sang phải",
    "originVi": "Mặt trước phải của SMA (hoặc tách chung thân với ĐM hồi đại tràng)",
    "originEn": "Arises from right side of SMA near root of transverse mesocolon",
    "branchesVi": [
      "Nhánh xuống (nối ĐM hồi đại tràng)",
      "Nhánh lên (nối ĐM đại tràng giữa)"
    ],
    "branchesEn": [
      "Descending branch",
      "Ascending branch joining middle colic"
    ],
    "territoryVi": "Cấp máu cho toàn bộ đại tràng lên và góc gan đại tràng (hepatic flexure)",
    "territoryEn": "Supplies ascending colon, hepatic flexure, and retroperitoneal paracolic tissues",
    "anastomosesVi": "Tạo thành cung động mạch viền dọc bờ trong đại tràng lên",
    "anastomosesEn": "Forms marginal arterial arcade parallel to mesenteric margin of ascending colon",
    "histologyVi": "Động mạch cơ chạy sau phúc mạc trước mạc Toldt phải và niệu quản phải",
    "histologyEn": "Retroperitoneal muscular artery crossing anterior to right gonadal vessels and ureter",
    "clinicalNotesVi": "Thắt sát gốc ĐM đại tràng phải và hồi đại tràng kèm nạo hạch D3 (CME) là nguyên tắc ung thư học trong phẫu thuật cắt đại tràng phải triệt căn.",
    "clinicalNotesEn": "High ligation at SMA takeoff is core surgical principle during complete mesocolic excision (CME) for ascending colon cancer."
  },
  {
    "id": "middle_colic_artery",
    "nameVi": "Động mạch đại tràng giữa",
    "nameEn": "Middle Colic Artery",
    "nameLa": "Arteria colica media",
    "type": "artery",
    "region": "abdominal_digestive",
    "primaryNodeName": "Middle colic artery",
    "meshNodeNames": [
      "Middle colic artery"
    ],
    "canonicalCenter": [
      0.0032,
      0.26,
      0.029
    ],
    "cameraPreset": {
      "target": [
        0.0032,
        0.26,
        0.029
      ],
      "position": [
        0.0132,
        0.23,
        0.209
      ]
    },
    "dimensions": "Đường kính ~3.0 - 3.8 mm, chạy trong mạc treo đại tràng ngang",
    "originVi": "Mặt trước của SMA ngay dưới bờ dưới thân tụy",
    "originEn": "Arises from anterior surface of SMA just below inferior margin of pancreas",
    "branchesVi": [
      "Nhánh phải (nối ĐM đại tràng phải)",
      "Nhánh trái (nối ĐM đại tràng trái)"
    ],
    "branchesEn": [
      "Right branch",
      "Left branch forming Riolan arcade with left colic artery"
    ],
    "territoryVi": "Cấp máu cho 2/3 phải đại tràng ngang và các mạc nối lớn liên quan",
    "territoryEn": "Supplies proximal two-thirds of transverse colon and superior mesocolon",
    "anastomosesVi": "Nhánh trái nối với ĐM đại tràng trái tạo Cung Riolan (Arc of Riolan) cứu cánh khi hẹp SMA hoặc IMA",
    "anastomosesEn": "Left branch connects with left colic artery forming critical Arc of Riolan mesenteric bypass",
    "histologyVi": "Động mạch cơ chạy giữa 2 lá của mạc treo đại tràng ngang",
    "histologyEn": "Muscular artery suspended within anterior leaf of transverse mesocolon",
    "clinicalNotesVi": "Phẫu thuật cắt dạ dày hoặc cắt tụy phải bảo tồn cẩn thận ĐM đại tràng giữa; tổn thương vô ý gây hoại tử toàn bộ đại tràng ngang.",
    "clinicalNotesEn": "Vulnerable to inadvertent ligation during gastrectomy, colectomy, or pancreaticoduodenectomy causing transverse colon infarction."
  },
  {
    "id": "hepatic_portal_vein",
    "nameVi": "Tĩnh mạch cửa gan",
    "nameEn": "Hepatic Portal Vein",
    "nameLa": "Vena portae hepatis",
    "type": "vein",
    "region": "abdominal_digestive",
    "primaryNodeName": "Hepatic portal vein",
    "meshNodeNames": [
      "Hepatic portal vein"
    ],
    "canonicalCenter": [
      0.0386,
      0.3461,
      0.0219
    ],
    "cameraPreset": {
      "target": [
        0.0386,
        0.3461,
        0.0219
      ],
      "position": [
        0.0486,
        0.3261,
        0.2219
      ]
    },
    "dimensions": "Đường kính ~10 - 14 mm (bình thường < 12 mm), dài ~7 - 8 cm, không van",
    "originVi": "Hợp lưu của tĩnh mạch mạc treo tràng trên và tĩnh mạch lách sau cổ tụy (ngang mức L2)",
    "originEn": "Formed behind neck of pancreas at L2 by confluence of superior mesenteric and splenic veins",
    "branchesVi": [
      "Nhánh cửa phải",
      "Nhánh cửa trái (chia tiếp theo 8 hạ phân thùy Couinaud)"
    ],
    "branchesEn": [
      "Right portal branch",
      "Left portal branch (supplying 8 functional Couinaud segments)"
    ],
    "territoryVi": "Dẫn toàn bộ máu chứa chất dinh dưỡng hấp thu từ ống tiêu hóa và lách về gan xử lý (75% lượng máu gan)",
    "territoryEn": "Carries 75% of liver blood flow, delivering all absorbed nutrients and toxins from GI tract to hepatocytes",
    "anastomosesVi": "Các vòng nối cửa - chủ (Portosystemic anastomoses): thực quản, quanh rốn, trực tràng và sau phúc mạc (Retzius)",
    "anastomosesEn": "Portocaval anastomotic sites: gastroesophageal, paraumbilical, hemorrhoidal/rectal, and retroperitoneal (Retzius)",
    "histologyVi": "Tĩnh mạch lớn không van, lòng rộng, áp lực bình thường thấp từ 5 - 10 mmHg",
    "histologyEn": "Large valveless low-pressure venous trunk with compliant collagenous adventitia",
    "clinicalNotesVi": "Tăng áp lực tĩnh mạch cửa (Portal Hypertension > 10-12 mmHg) trong xơ gan gây giãn vỡ tĩnh mạch thực quản (xuất huyết tử vong), cổ trướng và tuần hoàn bàng hệ đầu sứa (Caput medusae).",
    "clinicalNotesEn": "Portal hypertension in cirrhosis causes life-threatening esophageal variceal hemorrhage, splenomegaly, ascites, and caput medusae; treated via TIPS procedure."
  },
  {
    "id": "superior_mesenteric_vein",
    "nameVi": "Tĩnh mạch mạc treo tràng trên (SMV)",
    "nameEn": "Superior Mesenteric Vein",
    "nameLa": "Vena mesenterica superior",
    "type": "vein",
    "region": "abdominal_digestive",
    "primaryNodeName": "Superior mesenteric vein",
    "meshNodeNames": [
      "Superior mesenteric vein"
    ],
    "canonicalCenter": [
      0.0107,
      0.2239,
      0.025
    ],
    "cameraPreset": {
      "target": [
        0.0107,
        0.2239,
        0.025
      ],
      "position": [
        0.0207,
        0.1939,
        0.225
      ]
    },
    "dimensions": "Đường kính ~8 - 12 mm, chạy bên phải động mạch mạc treo tràng trên",
    "originVi": "Hợp lưu từ các tĩnh mạch hồi tràng và hỗng tràng tại rễ mạc treo ruột non",
    "originEn": "Formed in mesentery by confluence of ileal and jejunal tributary veins",
    "branchesVi": [
      "Nhận tĩnh mạch hồi đại tràng, đại tràng phải, đại tràng giữa và tĩnh mạch vị mạc nối phải"
    ],
    "branchesEn": [
      "Receives ileocolic, right colic, middle colic, and right gastro-omental veins"
    ],
    "territoryVi": "Dẫn lưu toàn bộ máu tĩnh mạch chứa chất dinh dưỡng từ ruột non và nửa phải đại tràng",
    "territoryEn": "Drains all nutrient-rich venous effluent from small intestine, cecum, appendix, and right colon",
    "anastomosesVi": "Hợp với tĩnh mạch lách sau cổ tụy tạo thành tĩnh mạch cửa",
    "anastomosesEn": "Unites with splenic vein behind neck of pancreas to create hepatic portal vein",
    "histologyVi": "Tĩnh mạch lớn màng trong nhẵn bóng, không có van chức năng",
    "histologyEn": "Wide valveless mesenteric venous conduit running in retroperitoneal groove",
    "clinicalNotesVi": "Huyết khối tĩnh mạch mạc treo tràng trên (SMV thrombosis) gây ứ trệ phù nề và nhồi máu ruột non; đánh giá xâm lấn SMV quyết định khả năng mổ cắt u đầu tụy (Whipple).",
    "clinicalNotesEn": "SMV thrombosis causes severe venous mesenteric ischemia; vascular encasement by pancreatic ductal adenocarcinoma defines resectability for Whipple procedure."
  },
  {
    "id": "splenic_vein",
    "nameVi": "Tĩnh mạch lách",
    "nameEn": "Splenic Vein",
    "nameLa": "Vena splenica",
    "type": "vein",
    "region": "abdominal_digestive",
    "primaryNodeName": "Splenic vein",
    "meshNodeNames": [
      "Splenic vein"
    ],
    "canonicalCenter": [
      0.0992,
      0.3271,
      0.0045
    ],
    "cameraPreset": {
      "target": [
        0.0992,
        0.3271,
        0.0045
      ],
      "position": [
        0.1092,
        0.3071,
        0.1845
      ]
    },
    "dimensions": "Đường kính ~6 - 9 mm, dài ~10 - 12 cm, chạy thẳng dưới động mạch lách",
    "originVi": "Hợp lưu từ 5 đến 6 nhánh tĩnh mạch tại rốn lách",
    "originEn": "Formed by confluence of 5-6 venules emerging from hilum of spleen",
    "branchesVi": [
      "Nhận các tĩnh mạch vị ngắn, TM vị mạc nối trái, các TM tụy và TM mạc treo tràng dưới (IMV)"
    ],
    "branchesEn": [
      "Receives short gastric veins, left gastro-omental, pancreatic veins, and inferior mesenteric vein (IMV)"
    ],
    "territoryVi": "Dẫn lưu lách, đáy dạ dày, thân đuôi tụy và toàn bộ nửa trái đại tràng (qua IMV)",
    "territoryEn": "Drains spleen, gastric fundus, pancreas body/tail, and hindgut via inferior mesenteric vein",
    "anastomosesVi": "Hợp với SMV sau cổ tụy tạo thành thân tĩnh mạch cửa",
    "anastomosesEn": "Joins superior mesenteric vein at splenic-mesenteric confluence to form portal vein",
    "histologyVi": "Tĩnh mạch cơ thành mỏng chạy trong rãnh sau tụy tiếp xúc trực tiếp mô tụy",
    "histologyEn": "Thin-walled large caliber vein embedded in groove on posterior surface of pancreas",
    "clinicalNotesVi": "Huyết khối tĩnh mạch lách do viêm tụy mạn hoặc ung thư tụy gây Tăng áp lực tĩnh mạch cửa khu trú (Sinistral / Left-sided portal hypertension), dẫn đến giãn vỡ tĩnh mạch đáy dạ dày.",
    "clinicalNotesEn": "Splenic vein thrombosis from pancreatitis or pancreatic cancer leads to sinistral (left-sided) portal hypertension and isolated bleeding gastric varices."
  },
  {
    "id": "renal_artery_left",
    "nameVi": "Động mạch thận trái",
    "nameEn": "Left Renal Artery",
    "nameLa": "Arteria renalis sinistra",
    "type": "artery",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Left renal artery",
    "meshNodeNames": [
      "Left renal artery"
    ],
    "canonicalCenter": [
      0.0666,
      0.2811,
      0.0029
    ],
    "cameraPreset": {
      "target": [
        0.0666,
        0.2811,
        0.0029
      ],
      "position": [
        0.0766,
        0.2511,
        0.1829
      ]
    },
    "dimensions": "Đường kính ~5 - 7 mm, dài ~4 - 5 cm (ngắn hơn bên phải)",
    "originVi": "Mặt bên trái động mạch chủ bụng ngay dưới mức ĐM mạc treo tràng trên (đốt sống L1-L2)",
    "originEn": "Arises from left anterolateral aspect of aorta just below SMA at L1-L2 level",
    "branchesVi": [
      "ĐM thượng vị dưới",
      "Nhánh niệu quản",
      "5 nhánh phân thùy thận (trước trên, trước dưới, trên, dưới, sau)"
    ],
    "branchesEn": [
      "Inferior suprarenal artery",
      "Ureteric branch",
      "Five segmental arteries (apical, anterosuperior, anteroinferior, inferior, posterior)"
    ],
    "territoryVi": "Cung cấp 10% lưu lượng tim đến thận trái để lọc máu và tạo nước tiểu",
    "territoryEn": "Supplies 10% of total cardiac output to left kidney for glomerular filtration, and left suprarenal gland",
    "anastomosesVi": "Các nhánh phân thùy thận là động mạch tận (end-arteries) tuyệt đối không có vòng nối chức năng",
    "anastomosesEn": "Segmental branches are absolute functional end-arteries without intrarenal parenchymal collaterals",
    "histologyVi": "Động mạch cơ lớn với thành dày chịu áp lực tưới máu thận cao (áp lực lọc cầu thận)",
    "histologyEn": "Large muscular artery with thick tunica media tuned for high-volume renal autoregulation",
    "clinicalNotesVi": "Hẹp động mạch thận (Renal Artery Stenosis - RAS do xơ vữa hoặc loạn sản cơ sợi FMD) gây Tăng huyết áp thứ phát (Goldblatt hypertension) kháng trị; điều trị can thiệp nong đặt stent ĐM thận.",
    "clinicalNotesEn": "Renal artery stenosis triggers renovascular hypertension via renin-angiotensin activation; treated with angioplasty and stenting."
  },
  {
    "id": "renal_artery_right",
    "nameVi": "Động mạch thận phải",
    "nameEn": "Right Renal Artery",
    "nameLa": "Arteria renalis dextra",
    "type": "artery",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Right renal artery",
    "meshNodeNames": [
      "Right renal artery"
    ],
    "canonicalCenter": [
      0.0323,
      0.2777,
      0.0
    ],
    "cameraPreset": {
      "target": [
        0.0323,
        0.2777,
        0.0
      ],
      "position": [
        0.0423,
        0.2477,
        0.18
      ]
    },
    "dimensions": "Đường kính ~5 - 7 mm, dài ~6 - 7 cm (dài hơn và thấp hơn bên trái)",
    "originVi": "Mặt bên phải động mạch chủ bụng ngang mức L1-L2, chạy sau tĩnh mạch chủ dưới",
    "originEn": "Arises from right side of aorta, courses horizontally behind IVC and right renal vein to hilum",
    "branchesVi": [
      "ĐM thượng thận dưới phải",
      "Nhánh niệu quản",
      "Các nhánh phân thùy thận phải"
    ],
    "branchesEn": [
      "Right inferior suprarenal",
      "Ureteric branch",
      "Right renal segmental branches"
    ],
    "territoryVi": "Cấp máu cho thận phải, tuyến thượng thận phải và đoạn trên niệu quản phải",
    "territoryEn": "Supplies right kidney, upper right ureter, and right adrenal gland",
    "anastomosesVi": "Chia các nhánh phân thùy tại rốn thận, không có cầu nối trong nhu mô thận",
    "anastomosesEn": "Divides at renal hilus into anterior and posterior divisions; zero intrarenal arterial cross-flow",
    "histologyVi": "Động mạch cơ dài chạy sau tĩnh mạch chủ dưới (IVC) được đệm bởi mô mỡ sau phúc mạc",
    "histologyEn": "Long muscular conducting vessel cushioned by retroperitoneal perinephric fat behind IVC",
    "clinicalNotesVi": "Do chạy sau IVC, phẫu thuật bộc lộ ĐM thận phải trong ghép thận hoặc phình ĐMC cần cẩn trọng; tắc nhánh phân thùy gây nhồi máu thận hình chêm (wedge-shaped renal infarct).",
    "clinicalNotesEn": "Courses posterior to IVC; end-artery occlusion produces sharply demarcated wedge-shaped cortical renal infarction with flank pain and hematuria."
  },
  {
    "id": "renal_vein_left",
    "nameVi": "Tĩnh mạch thận trái",
    "nameEn": "Left Renal Vein",
    "nameLa": "Vena renalis sinistra",
    "type": "vein",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Left renal vein",
    "meshNodeNames": [
      "Left renal vein"
    ],
    "canonicalCenter": [
      0.0537,
      0.2691,
      0.0065
    ],
    "cameraPreset": {
      "target": [
        0.0537,
        0.2691,
        0.0065
      ],
      "position": [
        0.0637,
        0.2391,
        0.1865
      ]
    },
    "dimensions": "Đường kính ~10 - 14 mm, dài ~7 - 8 cm (dài gấp 3 lần TM thận phải)",
    "originVi": "Xuất phát từ rốn thận trái, chạy ngang bắt chéo trước ĐM chủ bụng và dưới gốc SMA",
    "originEn": "Emerges from left renal hilum, crosses aorta anteriorly in angle between aorta and SMA",
    "branchesVi": [
      "Nhận tĩnh mạch thượng thận trái, tĩnh mạch sinh dục trái (tinh hoàn/buồng trứng) và TM hoành dưới"
    ],
    "branchesEn": [
      "Receives left suprarenal vein, left gonadal (testicular/ovarian) vein, and left inferior phrenic"
    ],
    "territoryVi": "Dẫn lưu thận trái, tuyến thượng thận trái, tinh hoàn/buồng trứng trái và thành bụng sau",
    "territoryEn": "Drains left kidney, left adrenal gland, left gonad (testis/ovary), and posterior body wall",
    "anastomosesVi": "Đổ thẳng vào bờ trái của tĩnh mạch chủ dưới",
    "anastomosesEn": "Empties at right angle into lateral margin of inferior vena cava",
    "histologyVi": "Tĩnh mạch lớn không van, thành mỏng có tính đàn hồi cao",
    "histologyEn": "Long, large-caliber compliant vein lacking valves throughout its retroperitoneal course",
    "clinicalNotesVi": "Hội chứng kẹp hạt dẻ (Nutcracker syndrome): TM thận trái bị kẹp giữa ĐM chủ bụng và ĐM mạc treo tràng trên, gây đái máu đại thể, đau mạn sườn trái và giãn tĩnh mạch thừng tinh trái (varicocele).",
    "clinicalNotesEn": "Nutcracker syndrome: compression of left renal vein between aorta and SMA causes left flank pain, hematuria, and left-sided varicocele."
  },
  {
    "id": "renal_vein_right",
    "nameVi": "Tĩnh mạch thận phải",
    "nameEn": "Right Renal Vein",
    "nameLa": "Vena renalis dextra",
    "type": "vein",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Right renal vein",
    "meshNodeNames": [
      "Right renal vein"
    ],
    "canonicalCenter": [
      0.0234,
      0.2652,
      -0.0012
    ],
    "cameraPreset": {
      "target": [
        0.0234,
        0.2652,
        -0.0012
      ],
      "position": [
        0.0334,
        0.2352,
        0.1788
      ]
    },
    "dimensions": "Đường kính ~10 - 12 mm, dài rất ngắn chỉ ~2 - 3 cm",
    "originVi": "Rốn thận phải, chạy thẳng ngang vào bờ phải tĩnh mạch chủ dưới",
    "originEn": "Emerges from right kidney hilum, courses directly and horizontally to right border of IVC",
    "branchesVi": [
      "Thường không nhận nhánh phụ (TM sinh dục và thượng thận phải đổ thẳng vào IVC)"
    ],
    "branchesEn": [
      "Usually receives no extra tributaries (right gonadal and suprarenal enter IVC directly)"
    ],
    "territoryVi": "Dẫn lưu toàn bộ lượng máu lọc trở về từ thận phải",
    "territoryEn": "Drains filtered parenchymal venous return exclusively from right kidney",
    "anastomosesVi": "Đổ trực tiếp vào tĩnh mạch chủ dưới",
    "anastomosesEn": "Short direct confluence into the inferior vena cava",
    "histologyVi": "Kênh tĩnh mạch ngắn, rộng, thành mỏng chịu áp lực tĩnh mạch trung tâm",
    "histologyEn": "Short, wide-bore venous conduit with thin compliant wall",
    "clinicalNotesVi": "Do TM thận phải rất ngắn, trong phẫu thuật ghép thận người hiến sống, thận trái thường được ưu tiên lấy hơn thận phải vì tĩnh mạch dài hơn dễ khâu nối mạch máu.",
    "clinicalNotesEn": "Short length makes right renal vein technically more challenging in donor nephrectomy; left kidney is traditionally preferred for living donation."
  },
  {
    "id": "inferior_vena_cava_abdominal",
    "nameVi": "Tĩnh mạch chủ dưới đoạn bụng",
    "nameEn": "Inferior Vena Cava (Abdominal Part)",
    "nameLa": "Vena cava inferior (pars abdominalis)",
    "type": "vein",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Inferior vena cava (abdominal part)",
    "meshNodeNames": [
      "Inferior vena cava (abdominal part)"
    ],
    "canonicalCenter": [
      0.0342,
      0.2646,
      0.01
    ],
    "cameraPreset": {
      "target": [
        0.0342,
        0.2646,
        0.01
      ],
      "position": [
        0.0442,
        0.2446,
        0.31
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.5 cm, dài ~20 cm, tĩnh mạch lớn nhất trong cơ thể",
    "originVi": "Hợp lưu của 2 tĩnh mạch chậu chung trái và phải ngang mức đốt sống thắt lưng L5 (sau ĐM chậu chung phải)",
    "originEn": "Formed by union of common iliac veins behind right common iliac artery at L5 vertebra",
    "branchesVi": [
      "Các TM thắt lưng",
      "TM tinh hoàn/buồng trứng phải",
      "Các TM thận",
      "TM thượng thận phải",
      "Các TM gan (Hepatic veins 3 nhánh lớn)"
    ],
    "branchesEn": [
      "Lumbar veins",
      "Right gonadal vein",
      "Renal veins",
      "Right suprarenal",
      "Inferior phrenic",
      "Hepatic veins (right, middle, left)"
    ],
    "territoryVi": "Dẫn lưu toàn bộ máu tĩnh mạch khử oxy từ hai chi dưới, khung chậu, tạng sau phúc mạc và gan về tâm nhĩ phải",
    "territoryEn": "Returns venous blood from bilateral lower limbs, pelvic organs, retroperitoneum, and hepatic sinusoids",
    "anastomosesVi": "Nối bàng hệ với hệ thống tĩnh mạch đơn/bán đơn và đám rối tĩnh mạch đốt sống Batson",
    "anastomosesEn": "Extensive collaterals via ascending lumbar veins, azygos system, and Batson vertebral venous plexus",
    "histologyVi": "Tĩnh mạch lớn thành mỏng với lớp áo ngoài giàu sợi collagen và các bó cơ trơn chạy dọc",
    "histologyEn": "Large capacitance vessel with prominent adventitia containing longitudinal smooth muscle bundles",
    "clinicalNotesVi": "Hội chứng chèn ép tĩnh mạch chủ dưới ở phụ nữ mang thai nằm ngửa (Supine hypotensive syndrome); đặt Lưới lọc tĩnh mạch chủ dưới (IVC filter) để ngăn huyết khối phổi ở bệnh nhân DVT tái phát.",
    "clinicalNotesEn": "IVC filter placement in infrarenal IVC prevents fatal pulmonary embolism in patients with DVT and anticoagulation contraindications."
  },
  {
    "id": "inferior_suprarenal_artery",
    "nameVi": "Động mạch thượng thận dưới",
    "nameEn": "Inferior Suprarenal Artery",
    "nameLa": "Arteria suprarenalis inferior",
    "type": "artery",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Inferior suprarenal artery.l",
    "meshNodeNames": [
      "Inferior suprarenal artery.l",
      "Inferior suprarenal artery.r"
    ],
    "canonicalCenter": [
      0.0473,
      0.3074,
      -0.0234
    ],
    "cameraPreset": {
      "target": [
        0.0473,
        0.3074,
        -0.0234
      ],
      "position": [
        0.0573,
        0.2874,
        0.1266
      ]
    },
    "dimensions": "Đường kính ~1.0 - 1.5 mm, tách từ đoạn gốc ĐM thận",
    "originVi": "Tách từ bờ trên động mạch thận trước khi vào rốn thận",
    "originEn": "Arises from superior border of proximal renal artery on each side",
    "branchesVi": [
      "Các nhánh chia nhỏ vào vỏ và tủy tuyến thượng thận"
    ],
    "branchesEn": [
      "Multiple microarteriolar branches penetrating adrenal capsule"
    ],
    "territoryVi": "Cấp máu cho cực dưới tuyến thượng thận và mô mỡ quanh thận",
    "territoryEn": "Supplies inferior aspect of adrenal gland, perirenal fat, and adjacent sympathetic ganglia",
    "anastomosesVi": "Nối phong phú với ĐM thượng thận trên (từ ĐM hoành dưới) và ĐM thượng thận giữa (từ ĐMC bụng)",
    "anastomosesEn": "Forms rich subcapsular anastomotic plexus with superior and middle suprarenal arteries",
    "histologyVi": "Tiểu động mạch cơ nhỏ dẫn máu vào hệ thống mao mạch dạng xoang của tuyến nội tiết",
    "histologyEn": "Muscular microarteriole feeding fenestrated sinusoidal capillaries in adrenal cortex",
    "clinicalNotesVi": "Tuyến thượng thận có nguồn cấp máu phong phú từ 3 động mạch riêng biệt (trên, giữa, dưới) giúp bảo tồn chức năng nội tiết bài tiết cortisol và aldosterone sinh tử.",
    "clinicalNotesEn": "Triple arterial supply (superior, middle, inferior) ensures robust vital perfusion for steroidogenesis and catecholamine release."
  },
  {
    "id": "testicular_artery",
    "nameVi": "Động mạch tinh hoàn / buồng trứng (ĐM sinh dục)",
    "nameEn": "Testicular / Ovarian (Gonadal) Artery",
    "nameLa": "Arteria testicularis / Arteria ovarica",
    "type": "artery",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Left testicular artery",
    "meshNodeNames": [
      "Left testicular artery",
      "Right testicular artery.r"
    ],
    "canonicalCenter": [
      0.05,
      0.0448,
      0.006
    ],
    "cameraPreset": {
      "target": [
        0.05,
        0.0448,
        0.006
      ],
      "position": [
        0.06,
        -0.0152,
        0.226
      ]
    },
    "dimensions": "Đường kính ~1.5 - 2.0 mm, dài rất dài ~30 - 35 cm",
    "originVi": "Mặt trước động mạch chủ bụng ngay dưới gốc động mạch thận (ngang mức L2)",
    "originEn": "Anterior aorta below renal arteries at L2, reflecting embryonic descent of gonads",
    "branchesVi": [
      "Nhánh niệu quản",
      "Nhánh mào tinh hoàn (nam)",
      "Nhánh vòi trứng (nữ)"
    ],
    "branchesEn": [
      "Ureteric branches",
      "Epididymal branches (male)",
      "Tubal branches (female)"
    ],
    "territoryVi": "Cấp máu cho tinh hoàn và mào tinh hoàn (ở nam) hoặc buồng trứng và vòi tử cung (ở nữ)",
    "territoryEn": "Supplies testis and epididymis via spermatic cord (male) or ovary and fallopian tube in suspensory ligament (female)",
    "anastomosesVi": "Ở nam nối với ĐM cơ bìu và ĐM ống dẫn tinh; ở nữ nối với ĐM tử cung",
    "anastomosesEn": "Male: anastomoses with cremasteric and deferential arteries. Female: anastomoses with uterine artery",
    "histologyVi": "Động mạch cơ dài uốn lượn chạy sau phúc mạc bắt chéo trước niệu quản và cơ thắt lưng chậu",
    "histologyEn": "Long slender muscular artery traveling retroperitoneally crossing anterior to ureter and psoas major",
    "clinicalNotesVi": "Xoắn tinh hoàn (Testicular torsion) xoắn bó mạch thừng tinh gây tắc nghẽn ĐM tinh hoàn và hoại tử tinh hoàn trong 6 giờ; cần phẫu thuật tháo xoắn cấp cứu khẩn cấp.",
    "clinicalNotesEn": "Testicular torsion twists gonadal vessels within spermatic cord, producing ischemic infarction within 6 hours unless surgically detorsed."
  },
  {
    "id": "lumbar_arteries",
    "nameVi": "Các động mạch thắt lưng",
    "nameEn": "Lumbar Arteries (Four Pairs)",
    "nameLa": "Arteriae lumbales (quattuor paria)",
    "type": "artery",
    "region": "renal_retroperitoneal",
    "primaryNodeName": "Lumbar arteries.l",
    "meshNodeNames": [
      "Lumbar arteries.l",
      "Lumbar arteries.r"
    ],
    "canonicalCenter": [
      0.0484,
      0.2313,
      -0.03
    ],
    "cameraPreset": {
      "target": [
        0.0484,
        0.2313,
        -0.03
      ],
      "position": [
        0.0584,
        0.1813,
        0.19
      ]
    },
    "dimensions": "4 cặp động mạch tương ứng 4 đốt sống thắt lưng trên",
    "originVi": "Mặt sau động mạch chủ bụng đối diện với thân đốt sống L1 đến L4",
    "originEn": "Four paired posterolateral branches of abdominal aorta opposite L1-L4 vertebral bodies",
    "branchesVi": [
      "Nhánh lưng (nuôi cơ lưng và cột sống)",
      "Nhánh gai (nuôi màng tủy và rễ thần kinh)",
      "Nhánh thành bụng"
    ],
    "branchesEn": [
      "Dorsal muscular branches",
      "Spinal radicular branches",
      "Abdominal wall lateral branches"
    ],
    "territoryVi": "Cấp máu cho đốt sống thắt lưng, tủy sống chùm đuôi ngựa, cơ thắt lưng chậu và cơ thành bụng sau",
    "territoryEn": "Supplies lumbar vertebrae, cauda equina nerve roots, psoas and quadratus lumborum, and anterolateral abdominal wall",
    "anastomosesVi": "Nối với các động mạch gian sườn dưới, ĐM chậu thắt lưng, ĐM thượng vị dưới và ĐM mũ chậu sâu",
    "anastomosesEn": "Extensive collaterals with intercostal, iliolumbar, deep circumflex iliac, and inferior epigastric arteries",
    "histologyVi": "Động mạch cơ chạy sau chuỗi hạch giao cảm và sau thân các đốt sống",
    "histologyEn": "Segmental muscular arteries winding around vertebral bodies deep to psoas attachments",
    "clinicalNotesVi": "Trong phẫu thuật sửa phình động mạch chủ bụng nội mạch (EVAR), dòng chảy ngược từ các ĐM thắt lưng vào túi phình tạo rò rỉ nội mạch loại 2 (Type II Endoleak).",
    "clinicalNotesEn": "Retrograde backbleeding from patent lumbar arteries into aneurysm sac is primary cause of Type II endoleak following EVAR."
  },
  {
    "id": "common_iliac_artery",
    "nameVi": "Động mạch chậu chung",
    "nameEn": "Common Iliac Artery",
    "nameLa": "Arteria iliaca communis",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Common iliac artery.l",
    "meshNodeNames": [
      "Common iliac artery.l",
      "Common iliac artery.r"
    ],
    "canonicalCenter": [
      0.0482,
      0.1539,
      0.0134
    ],
    "cameraPreset": {
      "target": [
        0.0482,
        0.1539,
        0.0134
      ],
      "position": [
        0.0582,
        0.0939,
        0.2534
      ]
    },
    "dimensions": "Đường kính ~10 - 12 mm, dài ~4 - 6 cm",
    "originVi": "Chẽ đôi tận cùng của động mạch chủ bụng ngang mức bờ dưới đốt sống thắt lưng L4",
    "originEn": "Bifurcation of abdominal aorta at L4 vertebra slightly left of midline",
    "branchesVi": [
      "Động mạch chậu trong (Internal iliac)",
      "Động mạch chậu ngoài (External iliac)"
    ],
    "branchesEn": [
      "Internal iliac artery (hypogastric)",
      "External iliac artery"
    ],
    "territoryVi": "Cấp toàn bộ máu nuôi dưỡng cho vùng chậu hông, cơ quan sinh dục ngoài và hai chi dưới",
    "territoryEn": "Supplies all pelvic viscera, pelvic walls, perineum, external genitalia, and bilateral lower extremities",
    "anastomosesVi": "Chẽ đôi tại bờ chậu (trước khớp cùng chậu) thành động mạch chậu trong và ngoài",
    "anastomosesEn": "Bifurcates anterior to sacroiliac joint at pelvic brim into internal and external branches",
    "histologyVi": "Động mạch chuyển tiếp từ cấu trúc đàn hồi sang cơ, thành dày chịu áp lực tống máu lớn",
    "histologyEn": "Transitional elastic-muscular artery with high tensile strength crossing pelvic brim",
    "clinicalNotesVi": "Hội chứng Leriche (tắc nghẽn mạn tính ngã ba chủ - chậu): tam chứng liệt dương, đau cách hồi mông đùi hai bên và mất mạch bẹn; phình ĐM chậu chung kèm AAA.",
    "clinicalNotesEn": "Leriche syndrome (aortoiliac occlusive disease): triad of claudication of buttocks/thighs, absent femoral pulses, and erectile dysfunction.",
    "pulsePalpationVi": "Bắt mạch sâu đường nối từ rốn đến điểm giữa nếp bẹn",
    "pulsePalpationEn": "Deep bimanual palpation along line from umbilicus to midinguinal point"
  },
  {
    "id": "internal_iliac_artery",
    "nameVi": "Động mạch chậu trong (ĐM hạ vị)",
    "nameEn": "Internal Iliac Artery (Hypogastric)",
    "nameLa": "Arteria iliaca interna",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Internal iliac artery.l",
    "meshNodeNames": [
      "Internal iliac artery.l",
      "Internal iliac artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.105,
      -0.011
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.105,
        -0.011
      ],
      "position": [
        0.0551,
        0.045,
        0.189
      ]
    },
    "dimensions": "Đường kính ~6 - 8 mm, dài ~3 - 4 cm, chia 2 thân trước và sau",
    "originVi": "Nhánh trong của chẽ đôi động mạch chậu chung ngang mức đĩa gian đốt L5-S1",
    "originEn": "Medial terminal division of common iliac artery at pelvic brim anterior to sacroiliac joint",
    "branchesVi": [
      "Thân trước: ĐM bịt, bàng quang dưới, trực tràng giữa, tử cung/âm đạo (nữ), thẹn trong. Thân sau: ĐM mông trên, mông dưới, cùng bên"
    ],
    "branchesEn": [
      "Anterior: obturator, umbilical, inferior vesical, uterine/vaginal, middle rectal, internal pudendal. Posterior: superior gluteal, iliolumbar, lateral sacral"
    ],
    "territoryVi": "Cấp máu cho bàng quang, trực tràng, tử cung, âm đạo, tiền liệt tuyến, cơ quan sinh dục ngoài và cơ vùng mông",
    "territoryEn": "Supplies pelvic viscera (bladder, rectum, prostate, uterus, vagina), perineum, erectile tissues, and gluteal muscles",
    "anastomosesVi": "Mạng nối phong phú giữa 2 bên qua đường giữa (ĐM tử cung, ĐM trực tràng giữa - trên - dưới)",
    "anastomosesEn": "Extensive pelvic collateral anastomoses across midline and with mesenteric/femoral arteries",
    "histologyVi": "Động mạch cơ chia nhiều nhánh tỏa vào khoang chậu sâu",
    "histologyEn": "Short muscular artery distributing into visceral and parietal branches surrounded by dense pelvic autonomic plexuses",
    "clinicalNotesVi": "Thắt động mạch chậu trong hai bên hoặc thuyên tắc mạch chọn lọc cấp cứu trong băng huyết sau sinh (PPH) đe dọa tính mạng hoặc vỡ xương chậu chảy máu lớn.",
    "clinicalNotesEn": "Bilateral internal iliac artery ligation or transcatheter arterial embolization controls catastrophic postpartum hemorrhage and pelvic fracture bleeding."
  },
  {
    "id": "external_iliac_artery",
    "nameVi": "Động mạch chậu ngoài",
    "nameEn": "External Iliac Artery",
    "nameLa": "Arteria iliaca externa",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "External iliac artery.l",
    "meshNodeNames": [
      "External iliac artery.l",
      "External iliac artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      0.0778,
      0.0031
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        0.0778,
        0.0031
      ],
      "position": [
        0.0551,
        0.0178,
        0.2231
      ]
    },
    "dimensions": "Đường kính ~8 - 10 mm, dài ~8 - 10 cm",
    "originVi": "Nhánh ngoài lớn hơn của chẽ đôi động mạch chậu chung",
    "originEn": "Lateral larger branch of common iliac bifurcation coursing along medial psoas border",
    "branchesVi": [
      "ĐM thượng vị dưới (Inferior epigastric)",
      "ĐM mũ chậu sâu (Deep circumflex iliac)"
    ],
    "branchesEn": [
      "Inferior epigastric artery",
      "Deep circumflex iliac artery"
    ],
    "territoryVi": "Cấp máu cho cơ thẳng bụng, thành bụng dưới và chuyển tiếp toàn bộ lưu lượng máu xuống chi dưới",
    "territoryEn": "Supplies lower anterior abdominal wall and conducts total systemic arterial inflow to lower limb",
    "anastomosesVi": "Đổi tên thành động mạch đùi khi chui qua phía sau dây chằng bẹn (tại điểm giữa bẹn)",
    "anastomosesEn": "Becomes femoral artery as it passes beneath inguinal ligament at mid-inguinal point",
    "histologyVi": "Động mạch cơ lớn chạy dọc bờ trong cơ thắt lưng lớn trong khoang sau phúc mạc",
    "histologyEn": "Large muscular artery flanked laterally by genitofemoral nerve and medially by external iliac vein",
    "clinicalNotesVi": "Vị trí miệng nối mạch máu tiêu chuẩn trong phẫu thuật Ghép thận (nối động mạch thận ghép vào động mạch chậu ngoài); ĐM thượng vị dưới là mốc phân biệt thoát vị bẹn trực tiếp và gián tiếp.",
    "clinicalNotesEn": "Preferred vascular anastomosis target for donor renal artery in kidney transplantation; inferior epigastric artery defines direct vs indirect inguinal hernia."
  },
  {
    "id": "femoral_artery",
    "nameVi": "Động mạch đùi (ĐM đùi chung & đùi nông)",
    "nameEn": "Femoral Artery (Common & Superficial)",
    "nameLa": "Arteria femoralis",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Femoral artery.l",
    "meshNodeNames": [
      "Femoral artery.l",
      "Femoral artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.1635,
      0.0057
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.1635,
        0.0057
      ],
      "position": [
        0.0551,
        -0.2835,
        0.2457
      ]
    },
    "dimensions": "Đường kính ~7 - 9 mm ở gốc, dài ~30 - 35 cm",
    "originVi": "Tiếp nối động mạch chậu ngoài phía sau dây chằng bẹn tại điểm giữa bẹn",
    "originEn": "Continuation of external iliac artery behind inguinal ligament at midinguinal point",
    "branchesVi": [
      "ĐM thượng vị nông",
      "ĐM mũ chậu nông",
      "ĐM thẹn ngoài",
      "ĐM đùi sâu (Deep femoral)",
      "ĐM gối xuống"
    ],
    "branchesEn": [
      "Superficial epigastric",
      "Superficial circumflex iliac",
      "Superficial external pudendal",
      "Deep femoral (profunda femoris)",
      "Descending genicular"
    ],
    "territoryVi": "Cấp máu cho thành bụng dưới, cơ quan sinh dục ngoài, toàn bộ cơ đùi và nối tiếp xuống cẳng chân",
    "territoryEn": "Supplies groin, anterior and medial thigh muscles, femur, and continuous inflow to popliteal artery",
    "anastomosesVi": "Chui qua lỗ gân cơ khép (adductor hiatus) của cơ khép lớn đổi tên thành động mạch khoeo",
    "anastomosesEn": "Passes through adductor hiatus in adductor magnus tendon to become popliteal artery",
    "histologyVi": "Động mạch cơ lớn nằm trong tam giác đùi (tam giác Scarpa) và ống cơ khép (ống Hunter)",
    "histologyEn": "Major muscular conduit housed in femoral sheath (lateral to femoral vein and medial to femoral nerve)",
    "clinicalNotesVi": "Vị trí chọc mạch đùi kinh điển để can thiệp tim mạch và mạch máu can thiệp (angiography/PCI/TAVI); xơ vữa gây hẹp tắc ĐM đùi nông dẫn đến đau cách hồi bắp chân (Claudication Fontaine II).",
    "clinicalNotesEn": "Primary arterial access site for catheterization (angiography, TAVI); superficial femoral artery occlusion causes calf intermittent claudication.",
    "pulsePalpationVi": "Bắt mạch tại nếp bẹn ở điểm giữa bờ mu và gai chậu trước trên (điểm giữa bẹn)",
    "pulsePalpationEn": "Palpated strongly at midinguinal point midway between anterior superior iliac spine and pubic symphysis"
  },
  {
    "id": "deep_femoral_artery",
    "nameVi": "Động mạch đùi sâu",
    "nameEn": "Deep Femoral Artery (Profunda Femoris)",
    "nameLa": "Arteria profunda femoris",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Deep femoral artery.l",
    "meshNodeNames": [
      "Deep femoral artery.l",
      "Deep femoral artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.1727,
      -0.0025
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.1727,
        -0.0025
      ],
      "position": [
        0.0551,
        -0.2727,
        0.2175
      ]
    },
    "dimensions": "Đường kính ~5 - 6 mm, nhánh lớn nhất của ĐM đùi tách cách dây chằng bẹn 3-5 cm",
    "originVi": "Mặt sau ngoài của động mạch đùi trong tam giác đùi",
    "originEn": "Arises from posterolateral aspect of femoral artery 3-5 cm inferior to inguinal ligament",
    "branchesVi": [
      "ĐM mũ đùi ngoài (Lateral circumflex)",
      "ĐM mũ đùi trong (Medial circumflex)",
      "3 đến 4 ĐM xuyên (Perforating arteries)"
    ],
    "branchesEn": [
      "Lateral circumflex femoral",
      "Medial circumflex femoral",
      "Perforating arteries (1st-4th)"
    ],
    "territoryVi": "Cấp máu cho toàn bộ các nhóm cơ đùi (cơ tứ đầu, cơ khép, cơ ụ ngồi - cẳng chân) và xương đùi",
    "territoryEn": "Supplies adductor, extensor, and flexor thigh musculature, shaft of femur, and hip joint",
    "anastomosesVi": "Tạo vòng nối chữ thập (Cruciate anastomosis) và vòng nối quanh mấu chuyển nuôi dưỡng chỏm xương đùi",
    "anastomosesEn": "Forms crucial trochanteric and cruciate anastomoses connecting internal iliac and femoral systems",
    "histologyVi": "Động mạch cơ lớn chạy sâu giữa cơ lược và cơ khép dài",
    "histologyEn": "Robust muscular artery plunging deeply into posterior fascial compartment of thigh",
    "clinicalNotesVi": "ĐM mũ đùi trong nuôi phần lớn chỏm xương đùi; gãy cổ xương đùi làm đứt các nhánh này dẫn đến Hoại tử vô mạch chỏm xương đùi (AVN - Avascular Necrosis).",
    "clinicalNotesEn": "Medial circumflex branch supplies femoral head; femoral neck fracture disrupts retinacular vessels causing avascular necrosis of femoral head."
  },
  {
    "id": "popliteal_artery",
    "nameVi": "Động mạch khoeo",
    "nameEn": "Popliteal Artery",
    "nameLa": "Arteria poplitea",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Popliteal artery.l",
    "meshNodeNames": [
      "Popliteal artery.l",
      "Popliteal artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.4609,
      -0.0586
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.4609,
        -0.0586
      ],
      "position": [
        0.0551,
        -0.6409,
        0.1414
      ]
    },
    "dimensions": "Đường kính ~5 - 6 mm, dài ~15 - 18 cm, chạy sâu trong hố khoeo",
    "originVi": "Tiếp nối động mạch đùi tại lỗ gân cơ khép lớn",
    "originEn": "Continuation of femoral artery at adductor hiatus in adductor magnus",
    "branchesVi": [
      "Các ĐM gối trên ngoài và trong",
      "ĐM gối giữa",
      "Các ĐM gối dưới ngoài và trong",
      "Các ĐM cơ bụng chân (Sural)"
    ],
    "branchesEn": [
      "Superior lateral and medial genicular",
      "Middle genicular",
      "Inferior lateral and medial genicular",
      "Sural arteries"
    ],
    "territoryVi": "Toàn bộ cấu trúc khớp gối (bao khớp, dây chằng chéo), cơ vùng khoeo và cơ bụng chân",
    "territoryEn": "Supplies knee joint capsule, cruciate ligaments, menisci, popliteus, gastrocnemius, and soleus",
    "anastomosesVi": "Mạng mạch bánh chè (patellar anastomotic network) quanh khớp gối",
    "anastomosesEn": "Complex five-vessel genicular arterial anastomotic plexus surrounding patella and knee joint",
    "histologyVi": "Động mạch cơ nằm sâu nhất trong hố khoeo, áp sát diện khoeo xương đùi và bao khớp gối",
    "histologyEn": "Deepest structure in popliteal fossa running directly on popliteal surface of femur and joint capsule",
    "clinicalNotesVi": "Phình động mạch khoeo (Popliteal aneurysm) là phình mạch ngoại vi thường gặp nhất, dễ gây huyết khối tắc mạch cẳng chân cấp tính; trật khớp gối có thể làm đứt rách ĐM khoeo.",
    "clinicalNotesEn": "Most frequent peripheral aneurysm, posing severe limb-loss threat via distal thromboembolism; posterior knee dislocation tears popliteal artery.",
    "pulsePalpationVi": "Bắt mạch sâu trong hố khoeo khi bệnh nhân nằm sấp hoặc nằm ngửa gấp gối 45 độ",
    "pulsePalpationEn": "Deep bimanual palpation in flexed popliteal fossa against posterior tibial plateau"
  },
  {
    "id": "anterior_tibial_artery",
    "nameVi": "Động mạch chày trước",
    "nameEn": "Anterior Tibial Artery",
    "nameLa": "Arteria tibialis anterior",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Anterior tibial artery.l",
    "meshNodeNames": [
      "Anterior tibial artery.l",
      "Anterior tibial artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.7287,
      -0.049
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.7287,
        -0.049
      ],
      "position": [
        0.0551,
        -0.9887,
        0.151
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.2 mm, chạy qua bờ trên màng gian cốt ra khoang trước",
    "originVi": "Chẽ đôi từ động mạch khoeo tại bờ dưới cơ khoeo",
    "originEn": "Anterior terminal division of popliteal artery at lower border of popliteus muscle",
    "branchesVi": [
      "ĐM quặt ngược chày sau và trước",
      "Các nhánh cơ khoang trước",
      "ĐM mắt cá trước trong và ngoài"
    ],
    "branchesEn": [
      "Posterior and anterior tibial recurrent",
      "Muscular branches",
      "Anterior medial and lateral malleolar"
    ],
    "territoryVi": "Cấp máu cho toàn bộ các cơ khoang cẳng chân trước (cơ chày trước, duỗi ngón chân) và khớp cổ chân",
    "territoryEn": "Supplies anterior extensor compartment of leg, ankle joint, and continuous flow to dorsum of foot",
    "anastomosesVi": "Đi qua trước khớp cổ chân (dưới hãm gân duỗi) đổi tên thành động mạch mu chân",
    "anastomosesEn": "Passes anterior to ankle joint midway between malleoli to become dorsalis pedis artery",
    "histologyVi": "Động mạch cơ đi cùng thần kinh mác sâu trong khoang cân màng gian cốt",
    "histologyEn": "Muscular artery traveling on anterior interosseous membrane accompanied by deep fibular (peroneal) nerve",
    "clinicalNotesVi": "Hội chứng khoang cẳng chân trước (Anterior Compartment Syndrome) sau gãy xương chày làm tăng áp lực khoang chèn ép ĐM chày trước gây thiếu máu hoại tử cơ; cần rạch mạc giải áp khẩn (fasciotomy).",
    "clinicalNotesEn": "Anterior compartment syndrome following tibial fracture compresses anterior tibial vessels causing ischemic foot drop unless urgent fasciotomy is performed."
  },
  {
    "id": "posterior_tibial_artery",
    "nameVi": "Động mạch chày sau",
    "nameEn": "Posterior Tibial Artery",
    "nameLa": "Arteria tibialis posterior",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Posterior tibial artery.l",
    "meshNodeNames": [
      "Posterior tibial artery.l",
      "Posterior tibial artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.7623,
      -0.0658
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.7623,
        -0.0658
      ],
      "position": [
        0.0551,
        -1.0423,
        0.1342
      ]
    },
    "dimensions": "Đường kính ~3.0 - 4.0 mm (lớn hơn ĐM chày trước), dài ~30 cm",
    "originVi": "Tiếp nối trực tiếp của thân chày mác từ động mạch khoeo",
    "originEn": "Direct continuation of tibioperoneal trunk at lower border of popliteus",
    "branchesVi": [
      "ĐM mác (Fibular/peroneal)",
      "ĐM nuôi xương chày",
      "Nhánh mắt cá trong",
      "Nhánh gót (Calcaneal)",
      "ĐM gan chân trong & ngoài"
    ],
    "branchesEn": [
      "Fibular (peroneal) artery",
      "Tibial nutrient",
      "Medial malleolar",
      "Calcaneal branches",
      "Medial and lateral plantar"
    ],
    "territoryVi": "Cấp máu cho khoang cẳng chân sau (cơ tam đầu cẳng chân, cơ gấp sâu), xương chày và toàn bộ gan bàn chân",
    "territoryEn": "Supplies posterior superficial and deep flexor leg compartments, tibia bone, and sole of foot",
    "anastomosesVi": "Đi sau mắt cá trong (trong ống cổ chân) chia thành động mạch gan chân trong và gan chân ngoài",
    "anastomosesEn": "Curves behind medial malleolus through tarsal tunnel to divide into medial and lateral plantar arteries",
    "histologyVi": "Động mạch cơ lớn đi cùng thần kinh chày sau cơ dép",
    "histologyEn": "Large muscular artery traveling with tibial nerve deep to gastrocnemius-soleus complex",
    "clinicalNotesVi": "Vị trí bắt mạch chày sau cực kỳ quan trọng để đánh giá bệnh động mạch chi dưới (PAD); hội chứng ống cổ chân (Tarsal tunnel syndrome) chèn ép bó mạch thần kinh sau mắt cá trong.",
    "clinicalNotesEn": "Essential pulse point for diagnosing Peripheral Artery Disease (PAD) and calculating Ankle-Brachial Index (ABI); vulnerable in tarsal tunnel syndrome.",
    "pulsePalpationVi": "Bắt mạch ở rãnh sau - dưới mắt cá trong xương chày",
    "pulsePalpationEn": "Palpated 2 cm posterior and inferior to medial malleolus against calcaneus"
  },
  {
    "id": "fibular_artery",
    "nameVi": "Động mạch mác",
    "nameEn": "Fibular Artery (Peroneal Artery)",
    "nameLa": "Arteria fibularis / Arteria peronea",
    "type": "artery",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Fibular artery.l",
    "meshNodeNames": [
      "Fibular artery.l",
      "Fibular artery.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.7531,
      -0.0844
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.7531,
        -0.0844
      ],
      "position": [
        0.0551,
        -1.0331,
        0.1156
      ]
    },
    "dimensions": "Đường kính ~2.5 - 3.2 mm, chạy sát bờ trong xương mác",
    "originVi": "Nhánh lớn nhất của động mạch chày sau, tách cách bờ dưới cơ khoeo 2-3 cm",
    "originEn": "Arises from posterior tibial artery ~2.5 cm distal to lower border of popliteus",
    "branchesVi": [
      "ĐM nuôi xương mác",
      "Nhánh xuyên (Perforating branch)",
      "Nhánh mắt cá ngoài",
      "Nhánh gót ngoài"
    ],
    "branchesEn": [
      "Fibular nutrient artery",
      "Perforating branch",
      "Lateral malleolar branch",
      "Lateral calcaneal branches"
    ],
    "territoryVi": "Cấp máu cho xương mác, cơ khoang cẳng chân ngoài (cơ mác dài, mác ngắn) và gót chân",
    "territoryEn": "Supplies fibula bone, lateral peroneal compartment muscles, flexor hallucis longus, and heel",
    "anastomosesVi": "Nhánh xuyên chui qua màng gian cốt nối với ĐM chày trước; nhánh gót nối với ĐM chày sau",
    "anastomosesEn": "Perforating branch pierces interosseous membrane to anastomose with anterior tibial and dorsalis pedis",
    "histologyVi": "Động mạch cơ nằm sâu trong ống cơ giữa cơ gấp ngón cái dài và cơ chày sau",
    "histologyEn": "Deep muscular artery running in fibrous canal between fibula and flexor hallucis longus",
    "clinicalNotesVi": "Động mạch mác là mạch máu nuôi xương được lựa chọn hàng đầu cho vạt xương mác tự do có cuống mạch (Free Fibula Flap) trong tái tạo xương hàm mặt sau cắt u ung thư.",
    "clinicalNotesEn": "Primary pedicle for vascularized free fibula bone flap in reconstructive maxillofacial surgery for mandibular reconstruction."
  },
  {
    "id": "great_saphenous_vein",
    "nameVi": "Tĩnh mạch hiển lớn",
    "nameEn": "Great Saphenous Vein (GSV)",
    "nameLa": "Vena saphena magna",
    "type": "vein",
    "region": "pelvic_lower_limb",
    "primaryNodeName": "Great saphenous vein.l",
    "meshNodeNames": [
      "Great saphenous vein.l",
      "Great saphenous vein.r"
    ],
    "canonicalCenter": [
      0.0451,
      -0.4757,
      -0.0154
    ],
    "cameraPreset": {
      "target": [
        0.0451,
        -0.4757,
        -0.0154
      ],
      "position": [
        0.0551,
        -0.6357,
        0.2446
      ]
    },
    "dimensions": "Đường kính ~4 - 6 mm, dài ~80 - 90 cm, tĩnh mạch dài nhất cơ thể người",
    "originVi": "Mạng lưới tĩnh mạch mu chân phía ngón cái, chạy trước mắt cá trong lên mặt trong cẳng - đùi",
    "originEn": "Medial marginal vein of foot, ascends anterior to medial malleolus along medial leg and thigh",
    "branchesVi": [
      "Nhận tĩnh mạch hiển phụ, TM mũ chậu nông, TM thượng vị nông và TM thẹn ngoài"
    ],
    "branchesEn": [
      "Receives accessory saphenous, superficial epigastric, superficial circumflex iliac, and external pudendal"
    ],
    "territoryVi": "Dẫn lưu toàn bộ mạng tĩnh mạch nông của mu chân, mặt trong cẳng chân và đùi",
    "territoryEn": "Drains superficial cutaneous venous network of foot, medial calf, and medial thigh",
    "anastomosesVi": "Chui qua lỗ tĩnh mạch hiển (saphenous opening/fossa ovalis) đổ vào tĩnh mạch đùi tại quai hiển (saphenofemoral junction - SFJ)",
    "anastomosesEn": "Pierces cribriform fascia at fossa ovalis to join femoral vein at saphenofemoral junction (SFJ)",
    "histologyVi": "Tĩnh mạch nông có thành cơ trơn dày nhất cơ thể và có từ 10 đến 20 cặp van 1 chiều chống trào ngược",
    "histologyEn": "Longest vein with thick muscular media and 10-20 bicuspid valves preventing venous reflux",
    "clinicalNotesVi": "Suy tĩnh mạch mạn tính chi dưới (giãn tĩnh mạch hiển) gây ứ trệ, phù chân và loét dinh dưỡng (CVI CEAP C1-C6); tĩnh mạch hiển lớn là mạch ghép tự thân phổ biến nhất trong mổ bắc cầu mạch vành (CABG).",
    "clinicalNotesEn": "Incompetent valves cause chronic venous insufficiency (varicose veins, stasis ulcers); universally harvested as autologous saphenous vein graft in CABG.",
    "pulsePalpationVi": "Bắt/nhìn thấy ở mặt trước mắt cá trong xương chày (vị trí bộc lộ tĩnh mạch cấp cứu)",
    "pulsePalpationEn": "Identified visually and palpated consistently 1 cm anterior to medial malleolus"
  }
];

export function getVascularStructureById(id: string): VascularStructureData | undefined {
  return VASCULAR_STRUCTURES.find((v) => v.id === id);
}

export function getVesselsByRegion(region: VascularRegion): VascularStructureData[] {
  return VASCULAR_STRUCTURES.filter((v) => v.region === region);
}

export function getVesselsByType(type: VesselType): VascularStructureData[] {
  return VASCULAR_STRUCTURES.filter((v) => v.type === type);
}

export function searchVascularStructures(query: string, language: 'vi' | 'en' = 'vi'): VascularStructureData[] {
  const q = query.toLowerCase().trim();
  if (!q) return VASCULAR_STRUCTURES;
  return VASCULAR_STRUCTURES.filter((v) => {
    return (
      v.nameVi.toLowerCase().includes(q) ||
      v.nameEn.toLowerCase().includes(q) ||
      v.nameLa.toLowerCase().includes(q) ||
      v.id.toLowerCase().includes(q) ||
      v.clinicalNotesVi.toLowerCase().includes(q) ||
      v.clinicalNotesEn.toLowerCase().includes(q) ||
      v.territoryVi.toLowerCase().includes(q)
    );
  });
}
