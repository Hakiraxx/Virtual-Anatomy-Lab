// Comprehensive dictionary mapping Terminologia Anatomica (Latin) to Vietnamese medical terminology
// Based on official Vietnamese Medical Anatomical Nomenclature (Trường phái Y Hà Nội & ĐH Y Dược TP.HCM)

export const HOTSPOT_VI_MAP: Record<string, string> = {
  // --- Tim & Hệ tim mạch (Heart & Cardiovascular) ---
  'Aorta': 'Động mạch chủ',
  'Arcus aortae': 'Cung động mạch chủ',
  'Aorta ascendens': 'Động mạch chủ lên',
  'Aorta descendens': 'Động mạch chủ xuống',
  'Aorta thoracica': 'Động mạch chủ ngực',
  'Aorta abdominalis': 'Động mạch chủ bụng',
  'Truncus pulmonalis': 'Thân động mạch phổi',
  'Arteria pulmonalis dextra': 'Động mạch phổi phải',
  'Arteria pulmonalis sinistra': 'Động mạch phổi trái',
  'Vena cava superior': 'Tĩnh mạch chủ trên',
  'Vena cava inferior': 'Tĩnh mạch chủ dưới',
  'Venae pulmonales': 'Các tĩnh mạch phổi',
  'Vena pulmonalis dextra superior': 'Tĩnh mạch phổi phải trên',
  'Vena pulmonalis dextra inferior': 'Tĩnh mạch phổi phải dưới',
  'Vena pulmonalis sinistra superior': 'Tĩnh mạch phổi trái trên',
  'Vena pulmonalis sinistra inferior': 'Tĩnh mạch phổi trái dưới',
  'Atrium dextrum': 'Tâm nhĩ phải',
  'Atrium sinistrum': 'Tâm nhĩ trái',
  'Ventriculus dexter': 'Tâm thất phải',
  'Ventriculus sinister': 'Tâm thất trái',
  'Apex cordis': 'Mỏm tim (Đỉnh tim)',
  'Basis cordis': 'Đáy tim',
  'Auricula dextra': 'Tiểu nhĩ phải',
  'Auricula sinistra': 'Tiểu nhĩ trái',
  'Sulcus coronarius': 'Rãnh vành',
  'Sulcus interventricularis anterior': 'Rãnh gian thất trước',
  'Sulcus interventricularis posterior': 'Rãnh gian thất sau',
  'Arteria coronaria dextra': 'Động mạch vành phải',
  'Arteria coronaria sinistra': 'Động mạch vành trái',
  'Ramus circumflexus': 'Nhánh mũ động mạch vành trái',
  'Ramus interventricularis anterior': 'Nhánh gian thất trước (LAD)',
  'Ramus interventricularis posterior': 'Nhánh gian thất sau (PDA)',
  'Ramus marginalis dexter': 'Nhánh bờ phải',
  'Vena cordis magna': 'Tĩnh mạch tim lớn',
  'Vena cordis media': 'Tĩnh mạch tim giữa',
  'Vena cordis parva': 'Tĩnh mạch tim bé',
  'Sinus coronarius': 'Xoang tĩnh mạch vành',
  'Valva tricuspidalis': 'Van ba lá (Van nhĩ thất phải)',
  'Valva mitralis': 'Van hai lá (Van nhĩ thất trái / Van mũ ni)',
  'Valva bicuspidalis': 'Van hai lá (Van mũ ni)',
  'Valva atrioventricularis dextra': 'Van nhĩ thất phải (Van ba lá)',
  'Valva atrioventricularis sinistra': 'Van nhĩ thất trái (Van hai lá)',
  'Valva aortae': 'Van động mạch chủ',
  'Valva trunci pulmonalis': 'Van thân động mạch phổi',
  'Septum interventriculare': 'Vách gian thất',
  'Septum interatriale': 'Vách gian nhĩ',
  'Fossa ovalis': 'Hố bầu dục',
  'Trabeculae carneae': 'Cột cơ (Gờ thịt tâm thất)',
  'Musculi pectinati': 'Các cơ lược',
  'Musculi papillares': 'Các cơ nhú',
  'Chordae tendineae': 'Các thừng gân',
  'Conus arteriosus': 'Nón động mạch',
  'Truncus brachiocephalicus': 'Thân cánh tay đầu',
  'Arteria carotis communis sinistra': 'Động mạch cảnh chung trái',
  'Arteria carotis communis dextra': 'Động mạch cảnh chung phải',
  'Arteria subclavia sinistra': 'Động mạch dưới đòn trái',
  'Arteria subclavia dextra': 'Động mạch dưới đòn phải',
  'Pericardium': 'Màng ngoài tim (Bao ngoại tâm mạc)',
  'Myocardium': 'Lớp cơ tim',
  'Endocardium': 'Nội tâm mạc (Màng trong tim)',
  'Epicardium': 'Ngoại tâm mạc lá tạng',

  // --- Não & Hệ thần kinh (Brain & Nervous System) ---
  'Encephalon': 'Não bộ',
  'Telencephalon': 'Đại não',
  'Cortex cerebri': 'Vỏ đại não',
  'Hemispherium cerebri': 'Bán cầu đại não',
  'Lobus frontalis': 'Thùy trán',
  'Lobus parietalis': 'Thùy đỉnh',
  'Lobus temporalis': 'Thùy thái dương',
  'Lobus occipitalis': 'Thùy chẩm',
  'Insula': 'Thùy đảo',
  'Sulcus centralis': 'Rãnh trung tâm (Rãnh Rolando)',
  'Sulcus lateralis': 'Rãnh bên (Rãnh Sylvius)',
  'Sulcus parietooccipitalis': 'Rãnh đỉnh - chẩm',
  'Gyrus precentralis': 'Hồi trước trung tâm (Vỏ vận động)',
  'Gyrus postcentralis': 'Hồi sau trung tâm (Vỏ cảm giác)',
  'Cerebellum': 'Tiểu não',
  'Vermis cerebelli': 'Thùy giun tiểu não',
  'Hemispherium cerebelli': 'Bán cầu tiểu não',
  'Truncus encephali': 'Thân não',
  'Mesencephalon': 'Trung não',
  'Pons': 'Cầu não',
  'Medulla oblongata': 'Hành não',
  'Corpus callosum': 'Thể chai',
  'Thalamus': 'Đồi thị',
  'Hypothalamus': 'Vùng dưới đồi',
  'Glandula pituitaria': 'Tuyến yên',
  'Glandula pinealis': 'Tuyến tùng',
  'Ventriculus lateralis': 'Não thất bên',
  'Ventriculus tertius': 'Não thất ba',
  'Ventriculus quartus': 'Não thất tư',
  'Aqueductus mesencephali': 'Cống não (Cống Sylvius)',
  'Chiasma opticum': 'Giao thoa thị giác',
  'Nervus opticus': 'Dây thần kinh thị giác (TK II)',
  'Nervus olfactorius': 'Dây thần kinh khứu giác (TK I)',
  'Nervus oculomotorius': 'Dây thần kinh vận nhãn (TK III)',
  'Nervus trochlearis': 'Dây thần kinh ròng rọc (TK IV)',
  'Nervus trigeminus': 'Dây thần kinh sinh ba (TK V)',
  'Nervus abducens': 'Dây thần kinh vận nhãn ngoài (TK VI)',
  'Nervus facialis': 'Dây thần kinh mặt (TK VII)',
  'Nervus vestibulocochlearis': 'Dây thần kinh tiền đình - ốc tai (TK VIII)',
  'Nervus glossopharyngeus': 'Dây thần kinh thiệt hầu (TK IX)',
  'Nervus vagus': 'Dây thần kinh lang thang (TK X)',
  'Nervus accessorius': 'Dây thần kinh phụ (TK XI)',
  'Nervus hypoglossus': 'Dây thần kinh hạ thiệt (TK XII)',
  'Medulla spinalis': 'Tủy gai (Tủy sống)',

  // --- Da & Phần phụ (Integumentary System / Skin) ---
  'Integumentum commune': 'Hệ da và phần phụ bì',
  'Cutis': 'Da',
  'Epidermis': 'Lớp biểu bì (Thượng bì)',
  'Dermis': 'Lớp trung bì (Chân bì)',
  'Hypodermis': 'Lớp hạ bì (Mô mỡ dưới da)',
  'Stratum corneum': 'Lớp sừng',
  'Stratum basale': 'Lớp đáy (Lớp sinh sản)',
  'Stratum spinosum': 'Lớp gai',
  'Stratum granulosum': 'Lớp hạt',
  'Stratum lucidum': 'Lớp bóng',
  'Folliculus pili': 'Nang lông',
  'Pilus': 'Sợi lông / Tóc',
  'Glandula sebacea': 'Tuyến bã nhờn',
  'Glandula sudorifera': 'Tuyến mồ hôi',
  'Musculus arrector pili': 'Cơ dựng lông',
  'Papilla dermis': 'Nhú chân bì',
  'Corpusculum tactile': 'Tiểu thể xúc giác (Tiểu thể Meissner)',
  'Corpusculum lamellosum': 'Tiểu thể áp giác (Tiểu thể Pacini)',

  // --- Hộp sọ & Đầu mặt (Skull & Cranium) ---
  'Cranium': 'Hộp sọ',
  'Os frontale': 'Xương trán',
  'Orbita': 'Hốc mắt',
  'Os zygomaticum': 'Xương gò má',
  'Maxilla': 'Xương hàm trên',
  'Mandibula': 'Xương hàm dưới',
  'Os temporale': 'Xương thái dương',
  'Os parietale': 'Xương đỉnh',
  'Os occipitale': 'Xương chẩm',
  'Os sphenoidale': 'Xương bướm',
  'Os ethmoidale': 'Xương sàng',
  'Os nasale': 'Xương mũi',
  'Os lacrimale': 'Xương lệ',
  'Vomer': 'Xương lá mía',
  'Cavitas cranii': 'Khoang sọ não',
  'Cavitas nasi': 'Ổ mũi',
  'Suturae cranii': 'Các đường khớp sọ bất động',
  'Sutura coronalis': 'Đường khớp vành',
  'Sutura sagittalis': 'Đường khớp dọc',
  'Sutura lambdoidea': 'Đường khớp lambda',
  'Foramen magnum': 'Lỗ lớn xương chẩm',
  'Processus mastoideus': 'Mỏm chũm',
  'Arcus zygomaticus': 'Cung gò má',

  // --- Cột sống (Spine & Vertebral Column) ---
  'Columna vertebralis': 'Cột sống toàn trục',
  'Vertebrae cervicales': 'Các đốt sống cổ (C1 – C7)',
  'Atlas': 'Đốt đội (Đốt sống cổ C1)',
  'Axis': 'Đốt trục (Đốt sống cổ C2)',
  'Vertebrae thoracicae': 'Các đốt sống ngực (T1 – T12)',
  'Vertebrae lumbales': 'Các đốt sống thắt lưng (L1 – L5)',
  'Os sacrum': 'Xương cùng (S1 – S5)',
  'Os coccygis': 'Xương cụt',
  'Discus intervertebralis': 'Đĩa đệm gian đốt sống',
  'Disci intervertebrales': 'Các đĩa đệm gian đốt sống',
  'Canalis vertebralis': 'Ống sống chứa tủy',
  'Processus spinosus': 'Mỏm gai đốt sống',
  'Processus transversus': 'Mỏm ngang đốt sống',

  // --- Lồng ngực (Thoracic Cage) ---
  'Thorax': 'Lồng ngực',
  'Sternum': 'Xương ức',
  'Manubrium sterni': 'Cán xương ức',
  'Corpus sterni': 'Thân xương ức',
  'Processus xiphoideus': 'Mỏm mũi kiếm xương ức',
  'Costae': 'Các xương sườn',
  'Cartilago costalis': 'Sụn sườn',

  // --- Khung chậu & Chi dưới (Pelvis & Lower Limb) ---
  'Pelvis': 'Khung chậu',
  'Os coxae': 'Xương chậu',
  'Os ilii': 'Xương cánh chậu',
  'Ala ossis ilii': 'Cánh chậu & Mào chậu',
  'Crista iliaca': 'Mào chậu',
  'Spina iliaca anterior superior': 'Gai chậu trước trên (ASIS)',
  'Acetabulum': 'Ổ cối tiếp khớp chỏm xương đùi',
  'Symphysis pubica': 'Khớp mu',
  'Articulatio sacroiliaca': 'Khớp cùng - chậu',
  'Os ischii': 'Xương ngồi',
  'Tuber ischiadicum': 'Ụ ngồi',
  'Os pubis': 'Xương mu',
  'Foramen obturatum': 'Lỗ bịt',
  'Femur': 'Xương đùi',
  'Caput femoris': 'Chỏm xương đùi',
  'Collum femoris': 'Cổ xương đùi',
  'Trochanter major': 'Mấu chuyển lớn xương đùi',
  'Patella': 'Xương bánh chè',
  'Tibia': 'Xương chày',
  'Fibula': 'Xương mác',
  'Articulatio genus': 'Khớp gối',
  'Talus': 'Xương sên',
  'Calcaneus': 'Xương gót',

  // --- Chi trên (Upper Limb) ---
  'Clavicula': 'Xương đòn',
  'Scapula': 'Xương bả vai',
  'Humerus': 'Xương cánh tay',
  'Caput humeri': 'Chỏm xương cánh tay',
  'Radius': 'Xương quay',
  'Ulna': 'Xương trụ',
  'Articulatio humeri': 'Khớp vai',
  'Ossa carpi': 'Các xương cổ tay',
  'Ossa metacarpi': 'Các xương đốt bàn tay',
  'Phalanges': 'Các xương đốt ngón tay',

  // --- Phổi & Hệ hô hấp (Lungs & Respiratory) ---
  'Pulmo': 'Phổi',
  'Pulmones': 'Hai lá phổi',
  'Pulmo dexter': 'Phổi phải',
  'Pulmo sinister': 'Phổi trái',
  'Lobus superior': 'Thùy trên',
  'Lobus medius': 'Thùy giữa',
  'Lobus inferior': 'Thùy dưới',
  'Fissura obliqua': 'Rãnh chếch',
  'Fissura horizontalis': 'Rãnh ngang',
  'Arbor bronchialis': 'Cây khí phế quản',
  'Trachea': 'Khí quản',
  'Bronchus principalis': 'Phế quản gốc',
  'Pleura': 'Màng phổi',
  'Hilus pulmonis': 'Rốn phổi',
  'Larynx': 'Thanh quản',

  // --- Hệ tiêu hóa (Digestive System) ---
  'Gaster': 'Dạ dày',
  'Curvatura major': 'Bờ cong lớn dạ dày',
  'Curvatura minor': 'Bờ cong nhỏ dạ dày',
  'Pylorus': 'Môn vị dạ dày',
  'Cardia': 'Tâm vị dạ dày',
  'Fundus gastricus': 'Đáy vị dạ dày',
  'Hepar': 'Gan',
  'Lobus hepatis dexter': 'Thùy gan phải',
  'Lobus hepatis sinister': 'Thùy gan trái',
  'Vesica biliaris': 'Túi mật',
  'Ductus choledochus': 'Ống mật chủ',
  'Pancreas': 'Tụy tạng',
  'Duodenum': 'Tá tràng',
  'Jejunum': 'Hỗng tràng',
  'Ileum': 'Hồi tràng',
  'Colon': 'Đại tràng (Ruột già)',
  'Caecum': 'Manh tràng',
  'Appendix vermiformis': 'Ruột thừa',
  'Rectum': 'Trực tràng',
  'Lien': 'Lách (Tỳ)',
  'Splen': 'Lách',

  // --- Hệ tiết niệu (Urinary System) ---
  'Ren': 'Thận',
  'Renes': 'Hai quả thận',
  'Cortex renalis': 'Vỏ thận',
  'Medulla renalis': 'Tủy thận (Các tháp thận)',
  'Pelvis renalis': 'Bể thận',
  'Calices renales': 'Các đài thận',
  'Ureter': 'Niệu quản',
  'Vesica urinaria': 'Bàng quang',
  'Urethra': 'Niệu đạo',
  'Glandula suprarenalis': 'Tuyến thượng thận',

  // --- Mắt & Tai (Eye & Ear) ---
  'Oculus': 'Nhãn cầu (Mắt)',
  'Cornea': 'Giác mạc',
  'Sclera': 'Củng mạc (Lòng trắng)',
  'Iris': 'Mống mắt (Lòng đen)',
  'Pupilla': 'Đồng tử (Con ngươi)',
  'Lens': 'Thể thủy tinh',
  'Retina': 'Võng mạc',
  'Corpus vitreum': 'Thể dịch kính',
  'Auris': 'Tai',
  'Cochlea': 'Ốc tai'
};

// Smart fallback translation engine for any Latin anatomical term
export function getHotspotVi(ta: string | undefined | null): string {
  if (!ta) return 'Cấu trúc giải phẫu';

  const clean = ta.trim();
  if (HOTSPOT_VI_MAP[clean]) {
    return HOTSPOT_VI_MAP[clean];
  }

  // Case insensitive check
  const lower = clean.toLowerCase();
  for (const [latin, vi] of Object.entries(HOTSPOT_VI_MAP)) {
    if (latin.toLowerCase() === lower) {
      return vi;
    }
  }

  // Rule-based morphological anatomical translation
  let result = clean;

  // Prefixes / Nouns
  result = result
    .replace(/^Arteria\s+/i, 'Động mạch ')
    .replace(/^Arteriae\s+/i, 'Các động mạch ')
    .replace(/^Vena\s+/i, 'Tĩnh mạch ')
    .replace(/^Venae\s+/i, 'Các tĩnh mạch ')
    .replace(/^Nervus\s+/i, 'Dây thần kinh ')
    .replace(/^Nervi\s+/i, 'Các dây thần kinh ')
    .replace(/^Musculus\s+/i, 'Cơ ')
    .replace(/^Musculi\s+/i, 'Các cơ ')
    .replace(/^Ligamentum\s+/i, 'Dây chằng ')
    .replace(/^Ligamenta\s+/i, 'Các dây chằng ')
    .replace(/^Gyrus\s+/i, 'Hồi ')
    .replace(/^Gyri\s+/i, 'Các hồi ')
    .replace(/^Sulcus\s+/i, 'Rãnh ')
    .replace(/^Sulci\s+/i, 'Các rãnh ')
    .replace(/^Lobus\s+/i, 'Thùy ')
    .replace(/^Lobi\s+/i, 'Các thùy ')
    .replace(/^Sinus\s+/i, 'Xoang ')
    .replace(/^Valva\s+/i, 'Van ')
    .replace(/^Septum\s+/i, 'Vách ')
    .replace(/^Processus\s+/i, 'Mỏm ')
    .replace(/^Foramen\s+/i, 'Lỗ ')
    .replace(/^Fossa\s+/i, 'Hố ')
    .replace(/^Canalis\s+/i, 'Ống ')
    .replace(/^Ramus\s+/i, 'Nhánh ')
    .replace(/^Rami\s+/i, 'Các nhánh ')
    .replace(/^Os\s+/i, 'Xương ')
    .replace(/^Ossa\s+/i, 'Các xương ')
    .replace(/^Cartilago\s+/i, 'Sụn ')
    .replace(/^Articulatio\s+/i, 'Khớp ')
    .replace(/^Glandula\s+/i, 'Tuyến ')
    .replace(/^Tuber\s+/i, 'Ụ ');

  // Adjectives / Directions
  result = result
    .replace(/\s+sinister$/i, ' trái')
    .replace(/\s+sinistra$/i, ' trái')
    .replace(/\s+sinistrum$/i, ' trái')
    .replace(/\s+dexter$/i, ' phải')
    .replace(/\s+dextra$/i, ' phải')
    .replace(/\s+dextrum$/i, ' phải')
    .replace(/\s+anterior$/i, ' trước')
    .replace(/\s+posterior$/i, ' sau')
    .replace(/\s+superior$/i, ' trên')
    .replace(/\s+inferior$/i, ' dưới')
    .replace(/\s+medialis$/i, ' trong')
    .replace(/\s+lateralis$/i, ' ngoài')
    .replace(/\s+major$/i, ' lớn')
    .replace(/\s+minor$/i, ' bé')
    .replace(/\s+magnus$/i, ' lớn')
    .replace(/\s+parvus$/i, ' nhỏ')
    .replace(/\s+profundus$/i, ' sâu')
    .replace(/\s+superficialis$/i, ' nông')
    .replace(/\s+pulmonalis$/i, ' phổi')
    .replace(/\s+coronaria$/i, ' vành')
    .replace(/\s+coronarius$/i, ' vành')
    .replace(/\s+cerebri$/i, ' đại não')
    .replace(/\s+cerebelli$/i, ' tiểu não');

  return result;
}
