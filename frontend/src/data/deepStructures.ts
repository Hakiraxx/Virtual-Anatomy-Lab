// Deep anatomical sub-structures database with functions, clinical notes, spatial offsets, and explode vectors

export interface DeepStructure {
  id: string;
  organId: string;
  nameVi: string;
  nameEn: string;
  nameLatin: string;
  localOffset: [number, number, number];
  explodeVector: [number, number, number]; // Direction for exploded view (unit vector * relative distance)
  approximateSize: number; // For dynamic camera distance framing
  functionVi: string;
  functionEn: string;
  clinicalNotesVi: string;
  clinicalNotesEn: string;
  relatedStructureIds: string[];
}

export interface OrganDeepHierarchy {
  organId: string;
  systemId: string;
  systemNameVi: string;
  systemNameEn: string;
  nameVi: string;
  nameEn: string;
  nameLatin: string;
  structures: DeepStructure[];
}

export const DEEP_STRUCTURES_MAP: Record<string, OrganDeepHierarchy> = {
  heart: {
    organId: 'heart',
    systemId: 'cardiovascular',
    systemNameVi: 'Hệ tuần hoàn (Tim mạch)',
    systemNameEn: 'Cardiovascular System',
    nameVi: 'Tim',
    nameEn: 'Heart',
    nameLatin: 'Cor',
    structures: [
      {
        id: 'left_ventricle',
        organId: 'heart',
        nameVi: 'Tâm thất trái',
        nameEn: 'Left Ventricle',
        nameLatin: 'Ventriculus sinister cordis',
        localOffset: [-0.18, -0.22, 0.15],
        explodeVector: [-0.6, -0.4, 0.5],
        approximateSize: 0.35,
        functionVi: 'Thành cơ dày nhất, co bóp bơm máu giàu oxy vào động mạch chủ đi nuôi toàn bộ cơ thể.',
        functionEn: 'Thickest muscular chamber; pumps oxygenated blood into the systemic circulation via the aorta.',
        clinicalNotesVi: 'Phì đại thất trái do tăng huyết áp mạn tính. Vùng hay gặp nhồi máu cơ tim thất trái do tắc nhánh LAD.',
        clinicalNotesEn: 'Hypertrophy common in chronic hypertension; primary site of myocardial infarction from LAD occlusion.',
        relatedStructureIds: ['aorta', 'mitral_valve', 'interventricular_septum', 'papillary_muscles']
      },
      {
        id: 'right_ventricle',
        organId: 'heart',
        nameVi: 'Tâm thất phải',
        nameEn: 'Right Ventricle',
        nameLatin: 'Ventriculus dexter cordis',
        localOffset: [0.12, -0.18, 0.22],
        explodeVector: [0.5, -0.3, 0.6],
        approximateSize: 0.32,
        functionVi: 'Nhận máu nghèo oxy từ tâm nhĩ phải và bơm vào thân động mạch phổi lên hai lá phổi.',
        functionEn: 'Receives deoxygenated blood from right atrium and pumps it into the pulmonary circuit.',
        clinicalNotesVi: 'Suy tim phải thứ phát sau bệnh phổi mạn tính (tâm phế mạn). Quá tải áp lực trong hẹp van ĐM phổi.',
        clinicalNotesEn: 'Right heart failure secondary to chronic pulmonary disease (cor pulmonale).',
        relatedStructureIds: ['pulmonary_trunk', 'tricuspid_valve', 'interventricular_septum']
      },
      {
        id: 'left_atrium',
        organId: 'heart',
        nameVi: 'Tâm nhĩ trái',
        nameEn: 'Left Atrium',
        nameLatin: 'Atrium sinistrum cordis',
        localOffset: [-0.08, 0.15, -0.18],
        explodeVector: [-0.4, 0.6, -0.5],
        approximateSize: 0.26,
        functionVi: 'Nhận máu giàu oxy từ 4 tĩnh mạch phổi và chuyển xuống thất trái qua van hai lá.',
        functionEn: 'Receives oxygen-rich blood from four pulmonary veins, delivering it to the left ventricle.',
        clinicalNotesVi: 'Tiểu nhĩ trái là nơi hình thành 90% huyết khối trong rung nhĩ, nguy cơ gây đột quỵ nhồi máu não.',
        clinicalNotesEn: 'Left atrial appendage is site for 90% of thrombi in atrial fibrillation, causing ischemic stroke.',
        relatedStructureIds: ['mitral_valve', 'left_ventricle', 'pulmonary_veins']
      },
      {
        id: 'right_atrium',
        organId: 'heart',
        nameVi: 'Tâm nhĩ phải',
        nameEn: 'Right Atrium',
        nameLatin: 'Atrium dextrum cordis',
        localOffset: [0.25, 0.12, -0.05],
        explodeVector: [0.8, 0.4, -0.2],
        approximateSize: 0.28,
        functionVi: 'Thu nhận toàn bộ máu tĩnh mạch nghèo oxy từ tĩnh mạch chủ trên, tĩnh mạch chủ dưới và xoang vành.',
        functionEn: 'Receives systemic venous return from SVC, IVC, and coronary sinus; contains the SA pacemaker node.',
        clinicalNotesVi: 'Chứa nút xoang nhĩ (SA node) - chủ nhịp tim. Rối loạn chức năng nút xoang gây hội chứng suy nút xoang.',
        clinicalNotesEn: 'Houses Sinoatrial (SA) node pacemaker. Sick sinus syndrome leads to severe bradycardia.',
        relatedStructureIds: ['superior_vena_cava', 'inferior_vena_cava', 'tricuspid_valve']
      },
      {
        id: 'aorta',
        organId: 'heart',
        nameVi: 'Động mạch chủ',
        nameEn: 'Aorta',
        nameLatin: 'Aorta ascendens & Arcus aortae',
        localOffset: [0.02, 0.42, 0.05],
        explodeVector: [0, 0.9, 0.2],
        approximateSize: 0.38,
        functionVi: 'Động mạch lớn nhất cơ thể, dẫn máu áp lực cao từ tâm thất trái đi nuôi toàn bộ cơ thể.',
        functionEn: 'Largest artery of the human body, carrying high-pressure oxygenated blood to all systemic tissues.',
        clinicalNotesVi: 'Phình bóc tách động mạch chủ ngực là cấp cứu ngoại khoa tối khẩn có tỷ lệ tử vong cao.',
        clinicalNotesEn: 'Aortic dissection and aneurysms are life-threatening vascular emergencies.',
        relatedStructureIds: ['aortic_valve', 'left_ventricle', 'coronary_arteries']
      },
      {
        id: 'pulmonary_trunk',
        organId: 'heart',
        nameVi: 'Thân động mạch phổi',
        nameEn: 'Pulmonary Trunk',
        nameLatin: 'Truncus pulmonalis',
        localOffset: [-0.08, 0.35, 0.18],
        explodeVector: [-0.3, 0.8, 0.4],
        approximateSize: 0.3,
        functionVi: 'Xuất phát từ tâm thất phải, chia đôi thành ĐM phổi phải và trái dẫn máu nghèo oxy đến hai phổi.',
        functionEn: 'Arises from right ventricle, branching into right and left pulmonary arteries.',
        clinicalNotesVi: 'Thuyên tắc động mạch phổi cấp tính do huyết khối tĩnh mạch sâu chi dưới di chuyển lên.',
        clinicalNotesEn: 'Acute pulmonary thromboembolism commonly originates from deep vein thrombosis (DVT).',
        relatedStructureIds: ['right_ventricle', 'pulmonary_valve']
      },
      {
        id: 'mitral_valve',
        organId: 'heart',
        nameVi: 'Van hai lá (Van mũ ni)',
        nameEn: 'Mitral Valve',
        nameLatin: 'Valva mitralis (bicuspidalis)',
        localOffset: [-0.12, -0.05, 0.02],
        explodeVector: [-0.5, 0.1, 0.2],
        approximateSize: 0.18,
        functionVi: 'Van hai lá ngăn cách nhĩ trái và thất trái, ngăn dòng máu chảy ngược về tâm nhĩ trong thì tâm thu.',
        functionEn: 'Bicuspid atrioventricular valve preventing backflow into left atrium during ventricular systole.',
        clinicalNotesVi: 'Hẹp hở van hai lá do di chứng sốt thấp khớp (thấp tim). Sa van hai lá (MVP).',
        clinicalNotesEn: 'Mitral stenosis and regurgitation commonly result from rheumatic fever or myxomatous degeneration.',
        relatedStructureIds: ['left_ventricle', 'left_atrium', 'papillary_muscles']
      },
      {
        id: 'interventricular_septum',
        organId: 'heart',
        nameVi: 'Vách gian thất',
        nameEn: 'Interventricular Septum',
        nameLatin: 'Septum interventriculare',
        localOffset: [-0.02, -0.2, 0.12],
        explodeVector: [0, -0.4, 0.3],
        approximateSize: 0.28,
        functionVi: 'Vách cơ dày ngăn cách hoàn toàn hai tâm thất trái và phải, chứa bó His của hệ dẫn truyền tim.',
        functionEn: 'Thick muscular-membranous wall separating ventricles; carries the Bundle of His conduction fibers.',
        clinicalNotesVi: 'Thông liên thất (VSD) là dị tật tim bẩm sinh phổ biến nhất ở trẻ sơ sinh.',
        clinicalNotesEn: 'Ventricular Septal Defect (VSD) is the most frequent congenital cardiac anomaly.',
        relatedStructureIds: ['left_ventricle', 'right_ventricle']
      }
    ]
  },

  skull: {
    organId: 'skull',
    systemId: 'skeletal',
    systemNameVi: 'Hệ xương khớp',
    systemNameEn: 'Skeletal System',
    nameVi: 'Hộp sọ & Xương đầu mặt',
    nameEn: 'Skull & Cranium',
    nameLatin: 'Cranium',
    structures: [
      {
        id: 'frontal_bone',
        organId: 'skull',
        nameVi: 'Xương trán',
        nameEn: 'Frontal Bone',
        nameLatin: 'Os frontale',
        localOffset: [0, 0.35, 0.3],
        explodeVector: [0, 0.6, 0.8],
        approximateSize: 0.38,
        functionVi: 'Tạo nên vùng trán, trần hốc mắt và phần trước nền sọ; chứa xoang trán.',
        functionEn: 'Forms the forehead, roof of the orbits, and anterior cranial fossa; contains frontal sinuses.',
        clinicalNotesVi: 'Chấn thương vỡ xương trán có thể rách màng não gây rò dịch não tủy qua mũi.',
        clinicalNotesEn: 'Frontal bone fracture can breach the dural seal, producing CSF rhinorrhea.',
        relatedStructureIds: ['orbit', 'cranial_sutures', 'parietal_bone']
      },
      {
        id: 'orbit',
        organId: 'skull',
        nameVi: 'Hốc mắt',
        nameEn: 'Orbit (Eye Socket)',
        nameLatin: 'Orbita',
        localOffset: [-0.16, 0.08, 0.38],
        explodeVector: [-0.4, 0.2, 0.8],
        approximateSize: 0.22,
        functionVi: 'Hốc xương hình tháp chứa nhãn cầu, cơ vận nhãn, mỡ đệm, dây thần kinh thị giác số II.',
        functionEn: 'Pyramidal bony cavity protecting the eyeball, extraocular muscles, and optic nerve CN II.',
        clinicalNotesVi: 'Gãy sàn hốc mắt (blowout fracture) do chấn thương đấm vào mắt gây kẹt cơ thẳng dưới, nhìn đôi.',
        clinicalNotesEn: 'Orbital blowout fractures may entrap the inferior rectus muscle, causing diplopia.',
        relatedStructureIds: ['frontal_bone', 'zygomatic_bone', 'maxilla']
      },
      {
        id: 'mandible',
        organId: 'skull',
        nameVi: 'Xương hàm dưới',
        nameEn: 'Mandible (Lower Jaw)',
        nameLatin: 'Mandibula',
        localOffset: [0, -0.42, 0.25],
        explodeVector: [0, -0.8, 0.6],
        approximateSize: 0.36,
        functionVi: 'Xương duy nhất có thể cử động của hộp sọ, chứa cung răng dưới và tạo khớp thái dương hàm (TMJ).',
        functionEn: 'Only mobile bone of the skull; houses lower dentition and forms the temporomandibular joint (TMJ).',
        clinicalNotesVi: 'Trật khớp thái dương hàm ra trước khi há miệng quá to. Gãy cằm hoặc lồi cầu hàm dưới.',
        clinicalNotesEn: 'TMJ dislocation commonly occurs anteriorly with extreme mouth opening.',
        relatedStructureIds: ['maxilla', 'cranial_sutures']
      },
      {
        id: 'maxilla',
        organId: 'skull',
        nameVi: 'Xương hàm trên',
        nameEn: 'Maxilla (Upper Jaw)',
        nameLatin: 'Maxilla',
        localOffset: [0, -0.15, 0.35],
        explodeVector: [0, -0.3, 0.8],
        approximateSize: 0.3,
        functionVi: 'Tạo nên phần lớn khối mặt, sàn hốc mắt, thành bên ổ mũi, khẩu cái cứng; chứa xoang hàm trên.',
        functionEn: 'Forms the midface, floor of orbits, lateral nasal walls, hard palate; contains maxillary sinuses.',
        clinicalNotesVi: 'Phân loại gãy hàm trên Le Fort I, II, III trong chấn thương hàm mặt nghiêm trọng.',
        clinicalNotesEn: 'Le Fort I, II, III classification for midface maxillary fracture patterns.',
        relatedStructureIds: ['mandible', 'orbit', 'zygomatic_bone']
      },
      {
        id: 'zygomatic_bone',
        organId: 'skull',
        nameVi: 'Xương gò má',
        nameEn: 'Zygomatic Bone (Cheekbone)',
        nameLatin: 'Os zygomaticum',
        localOffset: [-0.35, -0.05, 0.32],
        explodeVector: [-0.8, 0, 0.5],
        approximateSize: 0.24,
        functionVi: 'Tạo nên gò má nổi rõ và bờ ngoài hốc mắt; nối với xương thái dương tạo quai gò má.',
        functionEn: 'Forms the prominence of the cheek and lateral orbital rim; forms the zygomatic arch.',
        clinicalNotesVi: 'Gãy phức hợp gò má - hàm trên (ZMC fracture) làm mất cân xứng khuôn mặt và hạn chế há miệng.',
        clinicalNotesEn: 'Zygomaticomaxillary complex (ZMC) fractures flatten the cheek prominence.',
        relatedStructureIds: ['orbit', 'maxilla', 'frontal_bone']
      },
      {
        id: 'cranial_sutures',
        organId: 'skull',
        nameVi: 'Các đường khớp sọ bất động',
        nameEn: 'Cranial Sutures',
        nameLatin: 'Suturae cranii',
        localOffset: [0, 0.42, 0.05],
        explodeVector: [0, 0.9, 0],
        approximateSize: 0.42,
        functionVi: 'Các khớp bất động dạng sợi (khớp vành, khớp dọc, khớp lambda) liên kết chặt chẽ các xương sọ.',
        functionEn: 'Fibrous joints (coronal, sagittal, lambdoid sutures) uniting the cranium bones.',
        clinicalNotesVi: 'Hẹp sọ dính khớp sớm ở trẻ nhỏ (Craniosynostosis) cản trở não phát triển bình thường.',
        clinicalNotesEn: 'Premature closure of sutures (craniosynostosis) causes abnormal skull morphology.',
        relatedStructureIds: ['frontal_bone', 'parietal_bone']
      }
    ]
  },

  spine: {
    organId: 'spine',
    systemId: 'skeletal',
    systemNameVi: 'Hệ xương khớp',
    systemNameEn: 'Skeletal System',
    nameVi: 'Cột sống toàn trục',
    nameEn: 'Vertebral Column',
    nameLatin: 'Columna vertebralis',
    structures: [
      {
        id: 'cervical_spine',
        organId: 'spine',
        nameVi: 'Cột sống cổ (C1 – C7)',
        nameEn: 'Cervical Spine (C1–C7)',
        nameLatin: 'Vertebrae cervicales',
        localOffset: [0, 0.55, 0.08],
        explodeVector: [0, 0.8, 0.3],
        approximateSize: 0.35,
        functionVi: 'Nâng đỡ đầu và cho phép biên độ cử động xoay, cúi, ngửa tối đa; bảo vệ tủy sống cổ.',
        functionEn: 'Supports skull and provides greatest range of motion; protects cervical spinal cord.',
        clinicalNotesVi: 'Gãy mỏm răng đốt sống C2 (Hangman fracture) hoặc trật đốt đội C1 nguy cơ ngưng thở tử vong.',
        clinicalNotesEn: 'Odontoid and C1 Atlas fractures pose catastrophic risk of high cervical cord transection.',
        relatedStructureIds: ['intervertebral_discs', 'thoracic_spine']
      },
      {
        id: 'thoracic_spine',
        organId: 'spine',
        nameVi: 'Cột sống ngực (T1 – T12)',
        nameEn: 'Thoracic Spine (T1–T12)',
        nameLatin: 'Vertebrae thoracicae',
        localOffset: [0, 0.15, -0.05],
        explodeVector: [0, 0.2, -0.4],
        approximateSize: 0.45,
        functionVi: 'Khớp với các xương sườn tạo lồng ngực vững chắc bảo vệ tim và phổi; biên độ cử động hạn chế.',
        functionEn: 'Articulates with 12 pairs of ribs to form rigid protective cage for heart and lungs.',
        clinicalNotesVi: 'Gù cột sống ngực (Kyphosis) ở người già do xẹp lún đốt sống do loãng xương.',
        clinicalNotesEn: 'Thoracic kyphosis often results from osteoporotic vertebral wedge compression fractures.',
        relatedStructureIds: ['cervical_spine', 'lumbar_spine', 'intervertebral_discs']
      },
      {
        id: 'lumbar_spine',
        organId: 'spine',
        nameVi: 'Cột sống thắt lưng (L1 – L5)',
        nameEn: 'Lumbar Spine (L1–L5)',
        nameLatin: 'Vertebrae lumbales',
        localOffset: [0, -0.28, 0.06],
        explodeVector: [0, -0.5, 0.3],
        approximateSize: 0.38,
        functionVi: 'Thân đốt sống to dày nhất để chịu toàn bộ trọng lượng cơ thể phía trên dồn xuống.',
        functionEn: 'Massive vertebral bodies built to bear the major axial compressive load of body weight.',
        clinicalNotesVi: 'Thoát vị đĩa đệm L4-L5 và L5-S1 chèn ép rễ thần kinh tọa gây đau lan xuống chân.',
        clinicalNotesEn: 'L4-L5 and L5-S1 disc herniation commonly causes sciatica (radiculopathy).',
        relatedStructureIds: ['intervertebral_discs', 'sacrum', 'thoracic_spine']
      },
      {
        id: 'sacrum',
        organId: 'spine',
        nameVi: 'Xương cùng (S1 – S5)',
        nameEn: 'Sacrum',
        nameLatin: 'Os sacrum',
        localOffset: [0, -0.65, -0.08],
        explodeVector: [0, -0.9, -0.3],
        approximateSize: 0.3,
        functionVi: '5 đốt sống dính liền hình tam giác, liên kết với 2 cánh chậu tạo khung chậu vững chãi.',
        functionEn: 'Triangular bone fused from 5 vertebrae; anchors the pelvic ring at sacroiliac joints.',
        clinicalNotesVi: 'Viêm khớp cùng chậu trong bệnh viêm cột sống dính khớp (Ankylosing Spondylitis - HLA-B27).',
        clinicalNotesEn: 'Sacroiliitis is hallmark presentation of Ankylosing Spondylitis (HLA-B27 associated).',
        relatedStructureIds: ['lumbar_spine']
      },
      {
        id: 'intervertebral_discs',
        organId: 'spine',
        nameVi: 'Đĩa đệm gian đốt sống',
        nameEn: 'Intervertebral Discs',
        nameLatin: 'Disci intervertebrales',
        localOffset: [0, -0.05, 0.05],
        explodeVector: [0.6, 0, 0.3],
        approximateSize: 0.22,
        functionVi: 'Gồm nhân nhầy (nucleus pulposus) và vòng sợi (anulus fibrosus) làm giảm xóc và phân phối lực nén.',
        functionEn: 'Shock-absorbing fibrocartilaginous pads between vertebral bodies.',
        clinicalNotesVi: 'Rách vòng xơ làm thoát vị nhân nhầy ra sau bên chèn ép tủy sống hoặc rễ thần kinh.',
        clinicalNotesEn: 'Annular tear allows nucleus pulposus extrusion, impinging the exiting spinal nerve root.',
        relatedStructureIds: ['lumbar_spine', 'cervical_spine']
      }
    ]
  },

  pelvis: {
    organId: 'pelvis',
    systemId: 'skeletal',
    systemNameVi: 'Hệ xương khớp',
    systemNameEn: 'Skeletal System',
    nameVi: 'Khung chậu & Ổ cối',
    nameEn: 'Bony Pelvis & Acetabulum',
    nameLatin: 'Pelvis',
    structures: [
      {
        id: 'ala_ilii',
        organId: 'pelvis',
        nameVi: 'Cánh chậu & Mào chậu',
        nameEn: 'Iliac Wing & Crest',
        nameLatin: 'Ala ossis ilii & Crista iliaca',
        localOffset: [-0.35, 0.25, 0.1],
        explodeVector: [-0.8, 0.6, 0.2],
        approximateSize: 0.4,
        functionVi: 'Bản xương rộng hình cánh quạt, chỗ bám cho các cơ thành bụng và cơ mông; mào chậu là mốc khám lâm sàng.',
        functionEn: 'Broad fan-shaped blade providing wide attachment for abdominal and gluteal muscles.',
        clinicalNotesVi: 'Mào chậu là vị trí kinh điển để chọc hút tủy xương làm tủy đồ và sinh thiết tủy.',
        clinicalNotesEn: 'Iliac crest is the gold standard site for bone marrow aspiration and core biopsy.',
        relatedStructureIds: ['acetabulum', 'sacroiliac_joint']
      },
      {
        id: 'acetabulum',
        organId: 'pelvis',
        nameVi: 'Ổ cối khớp háng',
        nameEn: 'Acetabulum (Hip Socket)',
        nameLatin: 'Acetabulum',
        localOffset: [-0.32, -0.15, 0.15],
        explodeVector: [-0.7, -0.3, 0.5],
        approximateSize: 0.25,
        functionVi: 'Hõm khớp hình cầu sâu tạo bởi sự hợp nhất của 3 xương (chậu, ngồi, mu) tiếp nhận chỏm xương đùi.',
        functionEn: 'Deep hemispherical cup formed by ilium, ischium, and pubis accepting the femoral head.',
        clinicalNotesVi: 'Trật khớp háng bẩm sinh (DDH) hoặc thoái hóa sụn viền ổ cối cần phẫu thuật thay khớp háng nhân tạo.',
        clinicalNotesEn: 'Developmental dysplasia of the hip (DDH); severe osteoarthritis requires total hip arthroplasty.',
        relatedStructureIds: ['ala_ilii', 'pubic_symphysis']
      },
      {
        id: 'pubic_symphysis',
        organId: 'pelvis',
        nameVi: 'Khớp mu',
        nameEn: 'Pubic Symphysis',
        nameLatin: 'Symphysis pubica',
        localOffset: [0, -0.32, 0.28],
        explodeVector: [0, -0.6, 0.8],
        approximateSize: 0.18,
        functionVi: 'Khớp sụn sợi bán động nối hai xương mu ở đường giữa phía trước, giãn rộng nhẹ khi phụ nữ sinh nở.',
        functionEn: 'Cartilaginous joint uniting left and right pubic bones anteriorly; relaxes during childbirth.',
        clinicalNotesVi: 'Giãn hoặc đứt toác khớp mu sau chấn thương vùng chậu nặng hoặc sau chuyển dạ đẻ khó.',
        clinicalNotesEn: 'Diastasis of pubic symphysis can occur postpartum or in high-energy pelvic ring crush trauma.',
        relatedStructureIds: ['acetabulum']
      }
    ]
  },

  brain: {
    organId: 'brain',
    systemId: 'nervous',
    systemNameVi: 'Hệ thần kinh',
    systemNameEn: 'Nervous System',
    nameVi: 'Não bộ',
    nameEn: 'Brain',
    nameLatin: 'Encephalon',
    structures: [
      {
        id: 'frontal_lobe',
        organId: 'brain',
        nameVi: 'Thùy trán',
        nameEn: 'Frontal Lobe',
        nameLatin: 'Lobus frontalis',
        localOffset: [0, 0.18, 0.28],
        explodeVector: [0, 0.4, 0.8],
        approximateSize: 0.42,
        functionVi: 'Trung tâm điều hành chức năng cao cấp: tư duy logic, lập kế hoạch, ngôn ngữ (vùng Broca), vận động chủ ý.',
        functionEn: 'Executive cognition, motor programming, expressive language (Broca area), and personality.',
        clinicalNotesVi: 'Tổn thương vùng Broca gây mất ngôn ngữ vận động (hiểu được nhưng không nói được thành lời).',
        clinicalNotesEn: 'Broca aphasia (expressive non-fluent language deficit) from left frontal lobe stroke.',
        relatedStructureIds: ['temporal_lobe', 'cerebellum']
      },
      {
        id: 'cerebellum',
        organId: 'brain',
        nameVi: 'Tiểu não',
        nameEn: 'Cerebellum',
        nameLatin: 'Cerebellum',
        localOffset: [0, -0.28, -0.25],
        explodeVector: [0, -0.6, -0.7],
        approximateSize: 0.32,
        functionVi: 'Điều hòa thăng bằng, trương lực cơ và phối hợp nhịp nhàng các động tác tinh vi, phức tạp.',
        functionEn: 'Coordinates voluntary movement, precision, equilibrium, and motor learning.',
        clinicalNotesVi: 'Hội chứng tiểu não: run khi làm động tác chủ ý, mất điều hòa dáng đi lảo đảo như người say rượu.',
        clinicalNotesEn: 'Cerebellar ataxia: intention tremor, dysmetria, and broad-based drunken gait.',
        relatedStructureIds: ['brainstem', 'frontal_lobe']
      },
      {
        id: 'brainstem',
        organId: 'brain',
        nameVi: 'Thân não',
        nameEn: 'Brainstem',
        nameLatin: 'Truncus encephali',
        localOffset: [0, -0.35, -0.05],
        explodeVector: [0, -0.9, -0.1],
        approximateSize: 0.28,
        functionVi: 'Gồm trung não, cầu não và hành não; kiểm soát các phản xạ sinh tồn sống còn (hô hấp, nhịp tim, huyết áp).',
        functionEn: 'Comprises midbrain, pons, medulla; regulates autonomous vegetative life functions (heart rate, respiration).',
        clinicalNotesVi: 'Chết não được xác định dựa trên mất hoàn toàn các phản xạ thân não.',
        clinicalNotesEn: 'Brain death declaration critically depends on complete irreversible loss of brainstem reflexes.',
        relatedStructureIds: ['cerebellum']
      }
    ]
  },

  lungs: {
    organId: 'lungs',
    systemId: 'respiratory',
    systemNameVi: 'Hệ hô hấp',
    systemNameEn: 'Respiratory System',
    nameVi: 'Phổi',
    nameEn: 'Lungs',
    nameLatin: 'Pulmones',
    structures: [
      {
        id: 'right_lung_lobes',
        organId: 'lungs',
        nameVi: 'Phổi phải (3 thùy: Trên, Giữa, Dưới)',
        nameEn: 'Right Lung (3 Lobes: Superior, Middle, Inferior)',
        nameLatin: 'Pulmo dexter',
        localOffset: [0.28, 0, 0],
        explodeVector: [0.8, 0, 0],
        approximateSize: 0.45,
        functionVi: 'Phổi phải lớn hơn phổi trái, có 2 rãnh (chếch và ngang) chia làm 3 thùy riêng biệt.',
        functionEn: 'Larger than left lung; partitioned by oblique and horizontal fissures into three lobes.',
        clinicalNotesVi: 'Dị vật đường thở thường rơi vào phế quản thùy dưới phổi phải do lòng phế quản gốc phải dốc và to hơn.',
        clinicalNotesEn: 'Aspirated foreign objects predominantly lodge in right bronchus due to steeper vertical course.',
        relatedStructureIds: ['left_lung_lobes', 'bronchial_tree']
      },
      {
        id: 'left_lung_lobes',
        organId: 'lungs',
        nameVi: 'Phổi trái (2 thùy: Trên, Dưới)',
        nameEn: 'Left Lung (2 Lobes: Superior, Inferior)',
        nameLatin: 'Pulmo sinister',
        localOffset: [-0.28, 0, 0],
        explodeVector: [-0.8, 0, 0],
        approximateSize: 0.42,
        functionVi: 'Nhỏ hơn phổi phải để nhường chỗ cho bóng tim; có khuyết tim và lưỡi phổi.',
        functionEn: 'Smaller lung with cardiac notch accommodating the heart; divided into two lobes.',
        clinicalNotesVi: 'Tràn dịch màng phổi tích tụ ở góc sườn hoành thùy dưới phổi trái.',
        clinicalNotesEn: 'Pleural effusion collects in the dependent costodiaphragmatic recess.',
        relatedStructureIds: ['right_lung_lobes', 'bronchial_tree']
      },
      {
        id: 'bronchial_tree',
        organId: 'lungs',
        nameVi: 'Cây khí phế quản',
        nameEn: 'Tracheobronchial Tree',
        nameLatin: 'Arbor bronchialis',
        localOffset: [0, 0.22, -0.08],
        explodeVector: [0, 0.8, -0.3],
        approximateSize: 0.35,
        functionVi: 'Dẫn khí từ khí quản phân nhánh thành các phế quản gốc, phế quản thùy, phân thùy đến tận phế nang.',
        functionEn: 'Conduit airway dividing into lobar, segmental bronchi down to terminal alveolar sacs.',
        clinicalNotesVi: 'Co thắt phế quản cấp tính trong cơn hen phế quản gây khó thở thì thở ra.',
        clinicalNotesEn: 'Smooth muscle bronchospasm in acute asthma attack produces expiratory wheezing.',
        relatedStructureIds: ['right_lung_lobes', 'left_lung_lobes']
      }
    ]
  },

  kidneys: {
    organId: 'kidneys',
    systemId: 'urinary',
    systemNameVi: 'Hệ tiết niệu',
    systemNameEn: 'Urinary System',
    nameVi: 'Thận',
    nameEn: 'Kidneys',
    nameLatin: 'Renes',
    structures: [
      {
        id: 'renal_cortex',
        organId: 'kidneys',
        nameVi: 'Vỏ thận & Cầu thận',
        nameEn: 'Renal Cortex & Glomeruli',
        nameLatin: 'Cortex renalis',
        localOffset: [0.18, 0.08, 0.05],
        explodeVector: [0.7, 0.3, 0.3],
        approximateSize: 0.25,
        functionVi: 'Chứa hơn 1 triệu đơn vị nephron thực hiện lọc siêu lọc huyết tương tạo nước tiểu đầu.',
        functionEn: 'Outer region housing 1+ million glomeruli performing ultrafiltration of plasma.',
        clinicalNotesVi: 'Viêm cầu thận cấp (Glomerulonephritis) gây tiểu máu, phù và tăng huyết áp.',
        clinicalNotesEn: 'Acute glomerulonephritis leads to nephritic syndrome (hematuria, edema, hypertension).',
        relatedStructureIds: ['renal_medulla', 'renal_pelvis']
      },
      {
        id: 'renal_pelvis',
        organId: 'kidneys',
        nameVi: 'Bể thận & Đài thận',
        nameEn: 'Renal Pelvis & Calyces',
        nameLatin: 'Pelvis renalis',
        localOffset: [-0.08, -0.05, 0],
        explodeVector: [-0.6, -0.2, 0],
        approximateSize: 0.22,
        functionVi: 'Hệ thống hình phễu thu gom nước tiểu từ các đài thận lớn nhỏ trước khi đổ vào niệu quản.',
        functionEn: 'Funnel-like dilated proximal ureter gathering urine from major and minor calyces.',
        clinicalNotesVi: 'Sỏi đài bể thận (sỏi san hô) có thể gây ứ nước thận và nhiễm trùng đường tiết niệu nặng.',
        clinicalNotesEn: 'Staghorn calculi in renal pelvis risk hydronephrosis and urosepsis.',
        relatedStructureIds: ['renal_cortex']
      }
    ]
  },
  spleen: {
    organId: 'spleen',
    systemId: 'lymphatic',
    systemNameVi: 'Hệ bạch huyết & Miễn dịch',
    systemNameEn: 'Lymphatic & Immune System',
    nameVi: 'Lách (Tỳ)',
    nameEn: 'Spleen',
    nameLatin: 'Splen / Lien',
    structures: [
      {
        id: 'spleen_hilum',
        organId: 'spleen',
        nameVi: 'Rốn lách',
        nameEn: 'Splenic Hilum',
        nameLatin: 'Hilum splenicum',
        localOffset: [-0.02, -0.02, 0.73],
        explodeVector: [-0.5, -0.2, 0.6],
        approximateSize: 0.22,
        functionVi: 'Cửa ngõ giải phẫu nơi động mạch lách, tĩnh mạch lách và các nhánh thần kinh giao cảm đi vào và rời khỏi lách.',
        functionEn: 'Fissure on the visceral surface transmitting splenic vessels and autonomic nerve plexus.',
        clinicalNotesVi: 'Phẫu trường then chốt trong phẫu thuật cắt lách; cần thắt cuống mạch lách an toàn để tránh xuất huyết nội ồ ạt.',
        clinicalNotesEn: 'Critical surgical zone in splenectomy; hilar pedicle control prevents life-threatening hemoperitoneum.',
        relatedStructureIds: ['splenic_artery', 'splenic_vein', 'splenorenal_ligament', 'gastrosplenic_ligament']
      },
      {
        id: 'splenic_artery',
        organId: 'spleen',
        nameVi: 'Động mạch lách',
        nameEn: 'Splenic Artery',
        nameLatin: 'Arteria splenica',
        localOffset: [0.16, 0.56, 0.98],
        explodeVector: [0.4, 0.6, 0.5],
        approximateSize: 0.20,
        functionVi: 'Nhánh lớn nhất của thân tạng, chạy ngoằn ngoèo dọc bờ trên tụy cung cấp máu giàu oxy cho nhu mô lách.',
        functionEn: 'Largest branch of celiac trunk running tortuously along superior border of pancreas to supply splenic tissue.',
        clinicalNotesVi: 'Phình động mạch lách (Splenic artery aneurysm) có nguy cơ vỡ tử vong cao, đặc biệt ở phụ nữ mang thai.',
        clinicalNotesEn: 'Splenic artery aneurysm carries high maternal-fetal mortality upon third-trimester rupture.',
        relatedStructureIds: ['spleen_hilum', 'splenic_vein']
      },
      {
        id: 'splenic_vein',
        organId: 'spleen',
        nameVi: 'Tĩnh mạch lách',
        nameEn: 'Splenic Vein',
        nameLatin: 'Vena splenica',
        localOffset: [-0.08, -0.6, 0.67],
        explodeVector: [-0.3, -0.7, 0.4],
        approximateSize: 0.20,
        functionVi: 'Dẫn lưu toàn bộ máu từ lách và dạ dày tụy, hợp lưu với tĩnh mạch mạc treo tràng trên tạo tĩnh mạch cửa.',
        functionEn: 'Drains splenic venous blood, joining superior mesenteric vein behind pancreatic neck to form portal vein.',
        clinicalNotesVi: 'Tăng áp lực tĩnh mạch cửa gây ứ trệ tuần hoàn lách dẫn đến lách to và giãn vỡ tĩnh mạch phình vị.',
        clinicalNotesEn: 'Portal hypertension causes splenomegaly, hypersplenism, and bleeding gastric varices.',
        relatedStructureIds: ['spleen_hilum', 'splenic_artery']
      },
      {
        id: 'splenic_capsule',
        organId: 'spleen',
        nameVi: 'Bao xơ lách',
        nameEn: 'Splenic Capsule',
        nameLatin: 'Capsula splenica',
        localOffset: [0.15, 0.84, -1.29],
        explodeVector: [0.3, 0.7, -0.6],
        approximateSize: 0.28,
        functionVi: 'Bao mô liên kết sợi đàn hồi dày bao bọc nhu mô lách, phát ra các bè sợi chia nhu mô thành các xoang.',
        functionEn: 'Dense fibroelastic capsule enclosing splenic pulp and giving off trabeculae that carry blood vessels.',
        clinicalNotesVi: 'Vỡ bao lách hai thì (Delayed rupture) xảy ra sau chấn thương kín do tụ máu dưới bao vỡ thứ phát.',
        clinicalNotesEn: 'Subcapsular hematoma may rupture days after blunt abdominal trauma, presenting with sudden shock.',
        relatedStructureIds: ['spleen_red_pulp', 'spleen_white_pulp']
      },
      {
        id: 'splenorenal_ligament',
        organId: 'spleen',
        nameVi: 'Dây chằng lách - thận',
        nameEn: 'Splenorenal Ligament',
        nameLatin: 'Ligamentum splenorenale',
        localOffset: [-0.25, 0.15, 0.45],
        explodeVector: [-0.7, 0.3, 0.4],
        approximateSize: 0.22,
        functionVi: 'Nếp phúc mạc nối rốn lách với thận trái, chứa động mạch lách, tĩnh mạch lách và đuôi tụy.',
        functionEn: 'Peritoneal fold connecting splenic hilum to anterior left kidney; encases splenic vessels and pancreatic tail.',
        clinicalNotesVi: 'Trong phẫu thuật cắt lách cần phẫu tích cẩn thận tránh làm tổn thương đuôi tụy nằm trong dây chằng này.',
        clinicalNotesEn: 'Pancreatic tail injury during splenorenal dissection leads to dangerous postoperative pancreatic fistula.',
        relatedStructureIds: ['spleen_hilum', 'gastrosplenic_ligament']
      },
      {
        id: 'gastrosplenic_ligament',
        organId: 'spleen',
        nameVi: 'Dây chằng vị - lách',
        nameEn: 'Gastrosplenic Ligament',
        nameLatin: 'Ligamentum gastrosplenicum',
        localOffset: [0.22, -0.15, 0.55],
        explodeVector: [0.6, -0.3, 0.5],
        approximateSize: 0.22,
        functionVi: 'Nếp phúc mạc nối bờ cong lớn dạ dày với rốn lách, chứa các động mạch vị ngắn và động mạch vị mạc nối trái.',
        functionEn: 'Peritoneal fold connecting stomach greater curvature to splenic hilum; transmits short gastric vessels.',
        clinicalNotesVi: 'Cần thắt các nhánh mạch vị ngắn khi cắt lách để giải phóng hoàn toàn lách khỏi dạ dày.',
        clinicalNotesEn: 'Ligating short gastric arteries within this ligament is essential for mobilizing the greater curvature.',
        relatedStructureIds: ['spleen_hilum', 'splenorenal_ligament']
      },
      {
        id: 'spleen_red_pulp',
        organId: 'spleen',
        nameVi: 'Tủy đỏ',
        nameEn: 'Red Pulp',
        nameLatin: 'Pulpa rubra',
        localOffset: [0.05, 0.1, -0.2],
        explodeVector: [0.2, 0.4, -0.5],
        approximateSize: 0.25,
        functionVi: 'Gồm các xoang tĩnh mạch lách và dây Billroth lọc máu cơ học, loại bỏ hồng cầu già nua và tái chế sắt.',
        functionEn: 'Vascular network of splenic cords (Billroth) and sinusoids filtering blood and clearing aged RBCs.',
        clinicalNotesVi: 'Cường lách (Hypersplenism) làm tăng tiêu hủy tế bào máu tại tủy đỏ dẫn đến thiếu máu và giảm tiểu cầu.',
        clinicalNotesEn: 'Red pulp sequestration and destruction causes severe autoimmune hemolytic anemia and thrombocytopenia.',
        relatedStructureIds: ['spleen_white_pulp', 'splenic_capsule']
      },
      {
        id: 'spleen_white_pulp',
        organId: 'spleen',
        nameVi: 'Tủy trắng',
        nameEn: 'White Pulp',
        nameLatin: 'Pulpa alba',
        localOffset: [-0.05, -0.1, -0.15],
        explodeVector: [-0.2, -0.3, -0.4],
        approximateSize: 0.24,
        functionVi: 'Mô bạch huyết bao quanh các tiểu động mạch trung tâm (PALS), kích hoạt đáp ứng miễn dịch và tạo kháng thể IgM.',
        functionEn: 'Periarteriolar lymphoid sheaths (PALS) and follicles mounting adaptive humoral immune defenses.',
        clinicalNotesVi: 'Cắt lách làm mất tủy trắng khiến bệnh nhân đối mặt với hội chứng nhiễm khuẩn huyết bùng phát sau cắt lách (OPSI).',
        clinicalNotesEn: 'Overwhelming post-splenectomy infection (OPSI) by encapsulated bacteria due to white pulp loss.',
        relatedStructureIds: ['spleen_red_pulp', 'splenic_capsule']
      }
    ]
  }
};
