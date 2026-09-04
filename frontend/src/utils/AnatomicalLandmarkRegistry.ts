export interface AnatomicalLandmark {
  id: string;
  nameVi: string;
  nameEn: string;
  region: 'head' | 'neck' | 'spine' | 'thorax' | 'pelvis' | 'upper_limb' | 'lower_limb';
  position: [number, number, number]; // [x, y, z] in standard 1.75m standing human coordinates
  description: string;
}

export const ANATOMICAL_LANDMARKS: Record<string, AnatomicalLandmark> = {
  // Head & Cranium
  vertex: {
    id: 'vertex',
    nameVi: 'Đỉnh đầu (Vertex)',
    nameEn: 'Vertex',
    region: 'head',
    position: [0.0, 1.75, 0.0],
    description: 'Điểm cao nhất của vòm sọ trên đường giữa dọc.'
  },
  glabella: {
    id: 'glabella',
    nameVi: 'Điểm giữa hai cung mày (Glabella)',
    nameEn: 'Glabella',
    region: 'head',
    position: [0.0, 1.65, 0.08],
    description: 'Vùng phẳng giữa hai cung lông mày trên xương trán.'
  },
  nasion: {
    id: 'nasion',
    nameVi: 'Gốc mũi (Nasion)',
    nameEn: 'Nasion',
    region: 'head',
    position: [0.0, 1.63, 0.08],
    description: 'Giao điểm của khớp trán mũi trên đường giữa sọ mặt.'
  },
  gnathion_chin: {
    id: 'gnathion_chin',
    nameVi: 'Điểm cằm (Gnathion / Menton)',
    nameEn: 'Chin (Gnathion)',
    region: 'head',
    position: [0.0, 1.49, 0.08],
    description: 'Điểm thấp nhất của củ cằm xương hàm dưới.'
  },

  // Spine & Vertebral Column
  c1_atlas: {
    id: 'c1_atlas',
    nameVi: 'Đốt đội C1 (Atlas)',
    nameEn: 'C1 Atlas',
    region: 'spine',
    position: [0.0, 1.51, -0.04],
    description: 'Đốt sống cổ thứ nhất tiếp khớp với lồi cầu xương chẩm.'
  },
  c2_axis: {
    id: 'c2_axis',
    nameVi: 'Đốt trục C2 (Axis)',
    nameEn: 'C2 Axis',
    region: 'spine',
    position: [0.0, 1.49, -0.04],
    description: 'Đốt sống cổ thứ hai có mỏm răng (dens).'
  },
  c7_prominens: {
    id: 'c7_prominens',
    nameVi: 'Đốt sống lồi C7 (Vertebra Prominens)',
    nameEn: 'C7 Vertebra Prominens',
    region: 'spine',
    position: [0.0, 1.40, -0.06],
    description: 'Đốt sống cổ thứ 7 có mỏm gai dài sờ rõ nhất sau gáy.'
  },
  t1_vertebra: {
    id: 't1_vertebra',
    nameVi: 'Đốt sống ngực T1',
    nameEn: 'T1 Vertebra',
    region: 'spine',
    position: [0.0, 1.38, -0.055],
    description: 'Bắt đầu đoạn cột sống ngực, tiếp khớp xương sườn 1.'
  },
  t4_vertebra: {
    id: 't4_vertebra',
    nameVi: 'Đốt sống ngực T4 (Mức góc ức)',
    nameEn: 'T4 Vertebra',
    region: 'spine',
    position: [0.0, 1.31, -0.05],
    description: 'Ngang mức quai động mạch chủ và chỗ chia phế quản gốc.'
  },
  t7_vertebra: {
    id: 't7_vertebra',
    nameVi: 'Đốt sống ngực T7 (Mức góc dưới xương bả vai)',
    nameEn: 'T7 Vertebra',
    region: 'spine',
    position: [0.0, 1.22, -0.045],
    description: 'Mốc đo lồng ngực ngang góc dưới xương bả vai.'
  },
  t10_vertebra: {
    id: 't10_vertebra',
    nameVi: 'Đốt sống ngực T10 (Mức lỗ thực quản cơ hoành)',
    nameEn: 'T10 Vertebra',
    region: 'spine',
    position: [0.0, 1.14, -0.04],
    description: 'Mức thực quản xuyên qua vòm hoành vào dạ dày.'
  },
  t12_vertebra: {
    id: 't12_vertebra',
    nameVi: 'Đốt sống ngực T12 (Mức lỗ động mạch chủ hoành)',
    nameEn: 'T12 Vertebra',
    region: 'spine',
    position: [0.0, 1.08, -0.04],
    description: 'Chuyển tiếp ngực - thắt lưng, cực trên thận hai bên.'
  },
  l1_vertebra: {
    id: 'l1_vertebra',
    nameVi: 'Đốt sống thắt lưng L1 (Mức nón tủy)',
    nameEn: 'L1 Vertebra',
    region: 'spine',
    position: [0.0, 1.05, -0.04],
    description: 'Mức tận cùng của nón tủy sống (conus medullaris).'
  },
  l3_vertebra: {
    id: 'l3_vertebra',
    nameVi: 'Đốt sống thắt lưng L3 (Mức rốn)',
    nameEn: 'L3 Vertebra',
    region: 'spine',
    position: [0.0, 0.99, -0.04],
    description: 'Mức mặt phẳng dưới sườn và rốn.'
  },
  l5_vertebra: {
    id: 'l5_vertebra',
    nameVi: 'Đốt sống thắt lưng L5 (Nhô xương cùng)',
    nameEn: 'L5 Vertebra',
    region: 'spine',
    position: [0.0, 0.92, -0.035],
    description: 'Đốt sống thắt lưng cuối cùng tiếp khớp với đĩa gian đốt cùng 1.'
  },
  sacrum_promontory: {
    id: 'sacrum_promontory',
    nameVi: 'Gờ nhô xương cùng (Sacral Promontory)',
    nameEn: 'Sacral Promontory',
    region: 'spine',
    position: [0.0, 0.89, -0.03],
    description: 'Bờ trước trên của đốt sống cùng S1 nhô vào eo trên khung chậu.'
  },

  // Thorax & Anterior Chest Wall
  jugular_notch: {
    id: 'jugular_notch',
    nameVi: 'Khuyết tĩnh mạch cán ức (Jugular Notch)',
    nameEn: 'Jugular Notch (Suprasternal)',
    region: 'thorax',
    position: [0.0, 1.38, 0.05],
    description: 'Hõm ức sờ rõ ở đáy cổ, ngang mức đốt sống T2.'
  },
  sternal_angle: {
    id: 'sternal_angle',
    nameVi: 'Góc xương ức (Góc Louis)',
    nameEn: 'Sternal Angle (Angle of Louis)',
    region: 'thorax',
    position: [0.0, 1.31, 0.065],
    description: 'Khớp giữa cán và thân ức, tiếp khớp sụn sườn 2, mức T4-T5.'
  },
  xiphoid_process: {
    id: 'xiphoid_process',
    nameVi: 'Mũi ức (Xiphoid Process)',
    nameEn: 'Xiphoid Process',
    region: 'thorax',
    position: [0.0, 1.15, 0.05],
    description: 'Đầu dưới của xương ức, mức ngực T9-T10, mốc ranh giới ngực-bụng.'
  },

  // Pelvis & Lower Trunk
  iliac_crest_left: {
    id: 'iliac_crest_left',
    nameVi: 'Mào chậu trái (Iliac Crest Left)',
    nameEn: 'Left Iliac Crest',
    region: 'pelvis',
    position: [-0.14, 0.95, -0.01],
    description: 'Bờ cong trên cùng của cánh chậu trái, ngang mức L4.'
  },
  iliac_crest_right: {
    id: 'iliac_crest_right',
    nameVi: 'Mào chậu phải (Iliac Crest Right)',
    nameEn: 'Right Iliac Crest',
    region: 'pelvis',
    position: [0.14, 0.95, -0.01],
    description: 'Bờ cong trên cùng của cánh chậu phải, ngang mức L4.'
  },
  asis_left: {
    id: 'asis_left',
    nameVi: 'Gai chậu trước trên trái (Left ASIS)',
    nameEn: 'Left Anterior Superior Iliac Spine',
    region: 'pelvis',
    position: [-0.12, 0.89, 0.06],
    description: 'Mốc giải phẫu sờ thấy trước ngoài khung chậu.'
  },
  asis_right: {
    id: 'asis_right',
    nameVi: 'Gai chậu trước trên phải (Right ASIS)',
    nameEn: 'Right Anterior Superior Iliac Spine',
    region: 'pelvis',
    position: [0.12, 0.89, 0.06],
    description: 'Mốc giải phẫu sờ thấy trước ngoài khung chậu.'
  },
  pubic_symphysis: {
    id: 'pubic_symphysis',
    nameVi: 'Khớp mu (Pubic Symphysis)',
    nameEn: 'Pubic Symphysis',
    region: 'pelvis',
    position: [0.0, 0.82, 0.06],
    description: 'Khớp sụn sợi giữa hai thân xương mu trên đường giữa trước.'
  },

  // Limbs Joint Centers
  shoulder_left: {
    id: 'shoulder_left',
    nameVi: 'Khớp vai trái (Left Glenohumeral Joint)',
    nameEn: 'Left Shoulder Joint',
    region: 'upper_limb',
    position: [-0.19, 1.34, 0.0],
    description: 'Trung tâm khớp chỏm cầu cánh tay - ổ chảo xương vai trái.'
  },
  shoulder_right: {
    id: 'shoulder_right',
    nameVi: 'Khớp vai phải (Right Glenohumeral Joint)',
    nameEn: 'Right Shoulder Joint',
    region: 'upper_limb',
    position: [0.19, 1.34, 0.0],
    description: 'Trung tâm khớp chỏm cầu cánh tay - ổ chảo xương vai phải.'
  },
  hip_joint_left: {
    id: 'hip_joint_left',
    nameVi: 'Khớp háng trái (Left Hip Joint / Acetabulum)',
    nameEn: 'Left Hip Joint',
    region: 'lower_limb',
    position: [-0.09, 0.82, 0.0],
    description: 'Ổ cối tiếp khớp chỏm xương đùi trái.'
  },
  hip_joint_right: {
    id: 'hip_joint_right',
    nameVi: 'Khớp háng phải (Right Hip Joint / Acetabulum)',
    nameEn: 'Right Hip Joint',
    region: 'lower_limb',
    position: [0.09, 0.82, 0.0],
    description: 'Ổ cối tiếp khớp chỏm xương đùi phải.'
  },
  knee_joint_left: {
    id: 'knee_joint_left',
    nameVi: 'Khớp gối trái (Left Knee Joint)',
    nameEn: 'Left Knee Joint',
    region: 'lower_limb',
    position: [-0.09, 0.46, 0.0],
    description: 'Đường khớp đùi - chày và xương bánh chè bên trái.'
  },
  knee_joint_right: {
    id: 'knee_joint_right',
    nameVi: 'Khớp gối phải (Right Knee Joint)',
    nameEn: 'Right Knee Joint',
    region: 'lower_limb',
    position: [0.09, 0.46, 0.0],
    description: 'Đường khớp đùi - chày và xương bánh chè bên phải.'
  },
  ankle_joint_left: {
    id: 'ankle_joint_left',
    nameVi: 'Khớp cổ chân trái (Left Ankle Joint)',
    nameEn: 'Left Ankle Joint',
    region: 'lower_limb',
    position: [-0.09, 0.08, 0.0],
    description: 'Mắt cá trong - ngoài và xương sên bên trái.'
  },
  ankle_joint_right: {
    id: 'ankle_joint_right',
    nameVi: 'Khớp cổ chân phải (Right Ankle Joint)',
    nameEn: 'Right Ankle Joint',
    region: 'lower_limb',
    position: [0.09, 0.08, 0.0],
    description: 'Mắt cá trong - ngoài và xương sên bên phải.'
  },
  // RHM Craniofacial & Dental Surgical Landmarks
  mental_foramen_r: {
    id: 'mental_foramen_r',
    nameVi: 'Lỗ cằm phải (Right Mental Foramen)',
    nameEn: 'Right Mental Foramen',
    region: 'head',
    position: [0.028, 1.33, 0.088],
    description: 'Lỗ nằm ở mặt ngoài thân xương hàm dưới phải, nơi thần kinh cằm chui ra.'
  },
  mental_foramen_l: {
    id: 'mental_foramen_l',
    nameVi: 'Lỗ cằm trái (Left Mental Foramen)',
    nameEn: 'Left Mental Foramen',
    region: 'head',
    position: [-0.028, 1.33, 0.088],
    description: 'Lỗ nằm ở mặt ngoài thân xương hàm dưới trái, nơi thần kinh cằm chui ra.'
  },
  mandibular_foramen_r: {
    id: 'mandibular_foramen_r',
    nameVi: 'Lỗ hàm dưới & Gai Spix phải',
    nameEn: 'Right Mandibular Foramen & Lingula',
    region: 'head',
    position: [0.035, 1.35, 0.032],
    description: 'Lỗ ở mặt trong cành cao xương hàm dưới phải, mốc gây tê gai Spix.'
  },
  mandibular_foramen_l: {
    id: 'mandibular_foramen_l',
    nameVi: 'Lỗ hàm dưới & Gai Spix trái',
    nameEn: 'Left Mandibular Foramen & Lingula',
    region: 'head',
    position: [-0.035, 1.35, 0.032],
    description: 'Lỗ ở mặt trong cành cao xương hàm dưới trái, mốc gây tê gai Spix.'
  },
  foramen_ovale_r: {
    id: 'foramen_ovale_r',
    nameVi: 'Lỗ bầu dục phải (Right Foramen Ovale)',
    nameEn: 'Right Foramen Ovale',
    region: 'head',
    position: [0.024, 1.45, 0.015],
    description: 'Lỗ ở cánh lớn xương bướm cho dây V3 thoát ra.'
  },
  foramen_ovale_l: {
    id: 'foramen_ovale_l',
    nameVi: 'Lỗ bầu dục trái (Left Foramen Ovale)',
    nameEn: 'Left Foramen Ovale',
    region: 'head',
    position: [-0.024, 1.45, 0.015],
    description: 'Lỗ ở cánh lớn xương bướm cho dây V3 thoát ra.'
  },
  tmj_condyle_r: {
    id: 'tmj_condyle_r',
    nameVi: 'Chỏm lồi cầu xương hàm dưới phải (Right Condyle)',
    nameEn: 'Right Mandibular Condyle',
    region: 'head',
    position: [0.055, 1.366, 0.068],
    description: 'Tiếp khớp với hõm khớp xương thái dương và đĩa khớp TMJ phải.'
  },
  tmj_condyle_l: {
    id: 'tmj_condyle_l',
    nameVi: 'Chỏm lồi cầu xương hàm dưới trái (Left Condyle)',
    nameEn: 'Left Mandibular Condyle',
    region: 'head',
    position: [-0.055, 1.366, 0.068],
    description: 'Tiếp khớp với hõm khớp xương thái dương và đĩa khớp TMJ trái.'
  },
  molar_48_site: {
    id: 'molar_48_site',
    nameVi: 'Huyệt ổ răng R.48 (Hàm dưới phải)',
    nameEn: 'Tooth #48 Alveolar Socket Site',
    region: 'head',
    position: [0.028, 1.335, 0.065],
    description: 'Vị trí răng khôn hàm dưới phải cạnh góc hàm và ống răng dưới.'
  },
  molar_38_site: {
    id: 'molar_38_site',
    nameVi: 'Huyệt ổ răng R.38 (Hàm dưới trái)',
    nameEn: 'Tooth #38 Alveolar Socket Site',
    region: 'head',
    position: [-0.028, 1.335, 0.065],
    description: 'Vị trí răng khôn hàm dưới trái cạnh góc hàm và ống răng dưới.'
  }

};
