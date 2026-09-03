export const systemsData = [
  {
    id: "cardiovascular",
    name: "Hệ tuần hoàn (Tim mạch)",
    nameEn: "Cardiovascular System",
    nameLatin: "Systema cardiovasculare",
    description: "Vận chuyển oxy, chất dinh dưỡng, hormone và các chất chuyển hóa qua mạng lưới tim và mạch máu.",
    color: "#e11d48",
    orderIndex: 1,
    icon: "Heart"
  },
  {
    id: "respiratory",
    name: "Hệ hô hấp",
    nameEn: "Respiratory System",
    nameLatin: "Systema respiratorium",
    description: "Thực hiện trao đổi khí O2 và CO2 giữa môi trường ngoài và phế nang qua phổi và đường dẫn khí.",
    color: "#06b6d4",
    orderIndex: 2,
    icon: "Wind"
  },
  {
    id: "nervous",
    name: "Hệ thần kinh",
    nameEn: "Nervous System",
    nameLatin: "Systema nervosum",
    description: "Điều hòa và phối hợp các hoạt động cơ thể thông qua não bộ, tủy sống và mạng lưới thần kinh ngoại biên.",
    color: "#8b5cf6",
    orderIndex: 3,
    icon: "Zap"
  },
  {
    id: "digestive",
    name: "Hệ tiêu hóa",
    nameEn: "Digestive System",
    nameLatin: "Systema digestorium",
    description: "Tiếp nhận thức ăn, tiêu hóa cơ học và hóa học, hấp thụ chất dinh dưỡng và đào thải cặn bã.",
    color: "#f59e0b",
    orderIndex: 4,
    icon: "Utensils"
  },
  {
    id: "skeletal",
    name: "Hệ xương khớp",
    nameEn: "Skeletal System",
    nameLatin: "Systema skeletale",
    description: "Tạo khung nâng đỡ cơ thể, bảo vệ các nội quan thiết yếu và làm đòn bẩy cho vận động cơ học.",
    color: "#94a3b8",
    orderIndex: 5,
    icon: "Bone"
  },
  {
    id: "muscular",
    name: "Hệ cơ",
    nameEn: "Muscular System",
    nameLatin: "Systema musculare",
    description: "Tạo lực co rút vận động cơ thể, duy trì tư thế và sinh nhiệt cho cơ thể.",
    color: "#ef4444",
    orderIndex: 6,
    icon: "Activity"
  },
  {
    id: "urinary",
    name: "Hệ tiết niệu",
    nameEn: "Urinary System",
    nameLatin: "Systema urinarium",
    description: "Lọc máu, bài tiết các chất thải chuyển hóa, điều hòa cân bằng nước, điện giải và huyết áp qua thận và bàng quang.",
    color: "#10b981",
    orderIndex: 7,
    icon: "Droplets"
  },
  {
    id: "endocrine",
    name: "Hệ nội tiết",
    nameEn: "Endocrine System",
    nameLatin: "Systema endocrinum",
    description: "Bài tiết hormone trực tiếp vào máu để kiểm soát chuyển hóa, sinh trưởng và cân bằng nội môi.",
    color: "#ec4899",
    orderIndex: 8,
    icon: "Sparkles"
  },
  {
    id: "lymphatic",
    name: "Hệ bạch huyết & Miễn dịch",
    nameEn: "Lymphatic System",
    nameLatin: "Systema lymphoideum",
    description: "Dẫn lưu dịch kẽ về tuần hoàn tĩnh mạch, hấp thu lipid ruột non và bảo vệ cơ thể chống lại tác nhân gây bệnh.",
    color: "#14b8a6",
    orderIndex: 9,
    icon: "Shield"
  },
  {
    id: "reproductive",
    name: "Hệ sinh dục",
    nameEn: "Reproductive System",
    nameLatin: "Systema reproductionis",
    description: "Sản xuất giao tử và các hormone sinh dục duy trì nòi giống và đặc tính sinh dục.",
    color: "#f43f5e",
    orderIndex: 10,
    icon: "Users"
  },
  {
    id: "integumentary",
    name: "Hệ da và phần phụ",
    nameEn: "Integumentary System",
    nameLatin: "Systema integumentarium",
    description: "Bao bọc cơ thể, ngăn mất nước, điều hòa nhiệt độ và cảm nhận xúc giác, nhiệt độ, đau.",
    color: "#d97706",
    orderIndex: 11,
    icon: "Layers"
  }
];

export const organsData = [
  {
    id: "heart",
    systemId: "cardiovascular",
    name: "Tim",
    nameEn: "Heart",
    nameLatin: "Cor",
    description: "Cơ quan cơ rỗng hoạt động như một máy bơm kép hút và đẩy máu đi khắp tuần hoàn phổi và tuần hoàn hệ thống.",
    function: "Co bóp tống máu giàu O2 vào động mạch chủ đi nuôi toàn cơ thể và nhận máu nghèo O2 từ tĩnh mạch chủ đẩy lên phổi.",
    location: "Nằm trong trung thất giữa của lồng ngực, trên cơ hoành, sau xương ức và giữa hai lá phổi, lệch sang trái khoảng 2/3.",
    clinicalNotes: "Nhồi máu cơ tim (Myocardial Infarction) xảy ra khi tắc nhánh động mạch vành cấp máu cho cơ tim. Suy tim trái dẫn đến ứ máu tại phổi gây phù phổi cấp.",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 210-218)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.6,
    positionX: -0.15,
    positionY: 1.1,
    positionZ: 0.2,
    scale: 1.0,
    color: "#ef4444",
    structures: [
      { id: "right_atrium", name: "Tâm nhĩ phải", nameEn: "Right Atrium", nameLatin: "Atrium dextrum", description: "Nhận máu tĩnh mạch từ tĩnh mạch chủ trên, tĩnh mạch chủ dưới và xoang vành." },
      { id: "left_atrium", name: "Tâm nhĩ trái", nameEn: "Left Atrium", nameLatin: "Atrium sinistrum", description: "Nhận máu giàu oxy từ 4 tĩnh mạch phổi đổ về." },
      { id: "right_ventricle", name: "Tâm thất phải", nameEn: "Right Ventricle", nameLatin: "Ventriculus dexter", description: "Bơm máu lên động mạch phổi qua van động mạch phổi." },
      { id: "left_ventricle", name: "Tâm thất trái", nameEn: "Left Ventricle", nameLatin: "Ventriculus sinister", description: "Thành cơ dày nhất, bơm máu giàu oxy vào động mạch chủ với áp lực cao." },
      { id: "aorta_arch", name: "Quai động mạch chủ", nameEn: "Aortic Arch", nameLatin: "Arcus aortae", description: "Cung cấp máu cho đầu, cổ và hai chi trên qua các nhánh lớn." }
    ]
  },
  {
    id: "lungs",
    systemId: "respiratory",
    name: "Phổi (Phổi phải & Phổi trái)",
    nameEn: "Lungs (Right & Left)",
    nameLatin: "Pulmones",
    description: "Cặp cơ quan xốp đàn hồi nằm trong lồng ngực chịu trách nhiệm hô hấp ngoài.",
    function: "Khuếch tán oxy từ phế nang vào mao mạch và đưa carbon dioxide từ máu thải ra ngoài khí quyển.",
    location: "Nằm hai bên khoang lồng ngực trong khoang màng phổi, tựa lên vòm hoành, ôm lấy trung thất.",
    clinicalNotes: "Tràn dịch/khí màng phổi gây xẹp phổi và suy hô hấp cấp. Viêm phổi cấp tính gây đông đặc nhu mô phổi và giảm chỉ số SpO2.",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 192-205)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.5,
    positionX: 0,
    positionY: 1.15,
    positionZ: 0.05,
    scale: 1.0,
    color: "#38bdf8",
    structures: [
      { id: "right_lung_lobes", name: "Phổi phải (3 thùy)", nameEn: "Right Lung (3 Lobes)", nameLatin: "Pulmo dexter", description: "Gồm thùy trên, thùy giữa và thùy dưới, ngăn cách bởi khe chếch và khe ngang." },
      { id: "left_lung_lobes", name: "Phổi trái (2 thùy)", nameEn: "Left Lung (2 Lobes)", nameLatin: "Pulmo sinister", description: "Gồm thùy trên và thùy dưới ngăn cách bởi khe chếch, có khuyết tim ôm bờ tim." },
      { id: "trachea_bronchi", name: "Khí phế quản", nameEn: "Trachea and Bronchial Tree", nameLatin: "Arbor bronchialis", description: "Đường dẫn khí phân nhánh từ khí quản đến các phế quản thùy và tiểu phế quản." }
    ]
  },
  {
    id: "brain",
    systemId: "nervous",
    name: "Não bộ (Đại não & Tiểu não)",
    nameEn: "Brain",
    nameLatin: "Encephalon / Cerebrum",
    description: "Trung khu điều hành cao cấp nhất của hệ thần kinh trung ương được bảo vệ trong hộp sọ.",
    function: "Xử lý thông tin cảm giác, khởi phát vận động ý thức, trí nhớ, ngôn ngữ, cảm xúc và điều hòa nhịp sinh học.",
    location: "Nằm hoàn toàn trong khoang sọ, được bảo vệ bởi hộp sọ, 3 lớp màng não và dịch não tủy.",
    clinicalNotes: "Tai biến mạch máu não (Đột quỵ) do tắc mạch hoặc xuất huyết não. Tăng áp lực nội sọ đe dọa tụt kẹt hạnh nhân tiểu não.",
    source: "Netter's Neurology & Gray's Anatomy",
    reviewStatus: "VERIFIED",
    layerDepth: 0.7,
    positionX: 0,
    positionY: 2.15,
    positionZ: 0.05,
    scale: 0.9,
    color: "#c084fc",
    structures: [
      { id: "cerebral_cortex", name: "Vỏ đại não", nameEn: "Cerebral Cortex", nameLatin: "Cortex cerebri", description: "Chứa các vùng chức năng vận động sơ cấp, cảm giác thân thể và ngôn ngữ." },
      { id: "cerebellum", name: "Tiểu não", nameEn: "Cerebellum", nameLatin: "Cerebellum", description: "Phối hợp động tác tinh vi, thăng bằng và trương lực cơ." },
      { id: "brainstem", name: "Thân não", nameEn: "Brainstem", nameLatin: "Truncus encephali", description: "Gồm cuống não, cầu não và hành não; chứa các trung khu sinh tồn tim mạch và hô hấp." }
    ]
  },
  {
    id: "liver",
    systemId: "digestive",
    name: "Gan",
    nameEn: "Liver",
    nameLatin: "Hepar",
    description: "Tuyến tiêu hóa lớn nhất cơ thể, nặng khoảng 1.4 - 1.6 kg ở người trưởng thành, có nguồn cấp máu kép (ĐM gan & TM cửa).",
    function: "Chuyển hóa glucid/lipid/protein, khử độc, dự trữ glycogen/vitamin, và sản xuất mật tiêu hóa chất béo.",
    location: "Nằm ở hạ sườn phải, thượng vị và một phần hạ sườn trái; nằm ngay dưới cơ hoành phải.",
    clinicalNotes: "Xơ gan dẫn đến tăng áp lực tĩnh mạch cửa, tuần hoàn bàng hệ cửa-chủ và cổ trướng. Viêm gan virus B, C là nguyên nhân hàng đầu dẫn tới ung thư biểu mô tế bào gan (HCC).",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 277-285)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.55,
    positionX: 0.25,
    positionY: 0.45,
    positionZ: 0.15,
    scale: 1.05,
    color: "#b45309",
    structures: [
      { id: "liver_right_lobe", name: "Thùy gan phải", nameEn: "Right Lobe", nameLatin: "Lobus dexter hepatis", description: "Thùy lớn nhất chiếm phần lớn hạ sườn phải." },
      { id: "liver_left_lobe", name: "Thùy gan trái", nameEn: "Left Lobe", nameLatin: "Lobus sinister hepatis", description: "Thùy nhỏ hơn nằm bắt chéo qua vùng thượng vị." },
      { id: "gallbladder", name: "Túi mật", nameEn: "Gallbladder", nameLatin: "Vesica biliaris", description: "Cơ quan hình quả lê dưới mặt tạng gan dự trữ và cô đặc dịch mật." }
    ]
  },
  {
    id: "stomach",
    systemId: "digestive",
    name: "Dạ dày",
    nameEn: "Stomach",
    nameLatin: "Gaster / Ventriculus",
    description: "Đoạn phình to hình chữ J của ống tiêu hóa nằm giữa thực quản và tá tràng.",
    function: "Nhào trộn thức ăn cơ học và tiết dịch vị (HCl, pepsinogen) để tiêu hóa protein thành dưỡng chất.",
    location: "Nằm ở vùng thượng vị, hạ sườn trái và một phần vùng rốn, sau gan trái và trước tụy.",
    clinicalNotes: "Loét dạ dày tá tràng liên quan vi khuẩn Helicobacter pylori và lạm dụng NSAIDs. Thủng ổ loét dạ dày gây viêm phúc mạc cấp tính cần mổ cấp cứu.",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 267-272)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.58,
    positionX: -0.22,
    positionY: 0.4,
    positionZ: 0.18,
    scale: 0.95,
    color: "#f59e0b",
    structures: [
      { id: "cardia", name: "Tâm vị", nameEn: "Cardia", nameLatin: "Cardia", description: "Vùng nối tiếp giữa thực quản và dạ dày, ngăn trào ngược acid." },
      { id: "fundus", name: "Đáy vị", nameEn: "Fundus", nameLatin: "Fundus gastricus", description: "Phần vòm cao nhất nằm dưới cơ hoành trái, thường chứa túi khí dạ dày." },
      { id: "stomach_body", name: "Thân vị", nameEn: "Body of Stomach", nameLatin: "Corpus gastricum", description: "Phần lớn nhất của dạ dày chứa các tuyến bài tiết acid hydrochloric." },
      { id: "pylorus", name: "Môn vị", nameEn: "Pylorus", nameLatin: "Pylorus", description: "Cơ thắt điều hòa lượng dưỡng chấp từ dạ dày xuống hành tá tràng." }
    ]
  },
  {
    id: "kidneys",
    systemId: "urinary",
    name: "Thận (Thận phải & Thận trái)",
    nameEn: "Kidneys (Right & Left)",
    nameLatin: "Renes",
    description: "Cặp cơ quan hình hạt đậu nằm sau phúc mạc hai bên cột sống thắt lưng.",
    function: "Siêu lọc huyết tương tại cầu thận, tái hấp thu nước và chất điện giải, bài tiết erythropoietin và renin.",
    location: "Nằm ở khoang sau phúc mạc, ngang mức đốt sống ngực T12 đến thắt lưng L3. Thận phải thấp hơn thận trái khoảng 1.5 cm do gan đè lên.",
    clinicalNotes: "Sỏi thận tiết niệu có thể gây cơn đau quặn thận khi sỏi di chuyển kẹt tại các vị trí hẹp sinh lý của niệu quản. Suy thận mạn giai đoạn cuối đòi hỏi lọc máu chu kỳ hoặc ghép thận.",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 310-318)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.65,
    positionX: 0,
    positionY: 0.35,
    positionZ: -0.15,
    scale: 0.95,
    color: "#059669",
    structures: [
      { id: "renal_cortex", name: "Vỏ thận", nameEn: "Renal Cortex", nameLatin: "Cortex renalis", description: "Chứa hàng triệu tiểu cầu thận (Nephron) thực hiện chức năng lọc máu." },
      { id: "renal_medulla", name: "Tủy thận (Tháp thận)", nameEn: "Renal Medulla", nameLatin: "Medulla renalis", description: "Gồm các tháp thận Malpighi chứa quai Henle và ống góp nước tiểu." },
      { id: "renal_pelvis", name: "Bể thận", nameEn: "Renal Pelvis", nameLatin: "Pelvis renalis", description: "Phễu hội lưu đài thận lớn gom nước tiểu đổ vào niệu quản." }
    ]
  },
  {
    id: "skeleton_ribcage",
    systemId: "skeletal",
    name: "Khung lồng ngực (Xương sườn & Xương ức)",
    nameEn: "Thoracic Cage (Ribs & Sternum)",
    nameLatin: "Cavea thoracis",
    description: "Khung xương bảo vệ tim phổi cấu thành bởi 12 đốt sống ngực, 12 đôi xương sườn và xương ức.",
    function: "Bảo vệ các tạng trung thất và phổi, phối hợp cơ liên sườn tạo cử động nâng hạ lồng ngực khi hít thở.",
    location: "Bao bọc toàn bộ phần ngực cơ thể, giới hạn bởi lỗ ngực trên và lỗ ngực dưới.",
    clinicalNotes: "Gãy nhiều xương sườn liên tiếp tạo nên mảng sườn di động (Flail chest) gây hô hấp đảo nghịch đe dọa tính mạng.",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 180-188)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.3,
    positionX: 0,
    positionY: 1.05,
    positionZ: 0.05,
    scale: 1.05,
    color: "#cbd5e1",
    structures: [
      { id: "sternum", name: "Xương ức", nameEn: "Sternum", nameLatin: "Sternum", description: "Gồm cán ức, thân ức và mỏm mũi kiếm (mỏm kiếm)." },
      { id: "true_ribs", name: "Xương sườn thật (Đôi 1-7)", nameEn: "True Ribs", nameLatin: "Costae verae", description: "Nối trực tiếp vào xương ức qua sụn sườn riêng biệt." },
      { id: "false_floating_ribs", name: "Xương sườn giả và sườn cụt (Đôi 8-12)", nameEn: "False and Floating Ribs", nameLatin: "Costae spuriae et fluctuantes", description: "Đôi 8-10 bám gián tiếp vào sụn sườn trên; đôi 11-12 đầu trước tự do trong cơ thành bụng." }
    ]
  },
  {
    id: "skeleton_spine",
    systemId: "skeletal",
    name: "Cột sống",
    nameEn: "Vertebral Column",
    nameLatin: "Columna vertebralis",
    description: "Trục nâng đỡ chính của cơ thể gồm 33-34 đốt sống xếp chồng lên nhau tạo ống sống bảo vệ tủy gai.",
    function: "Nâng đỡ trọng lượng đầu và thân mình, hấp thu rung xóc qua các đĩa đệm và che chở tủy sống.",
    location: "Chạy dọc chính giữa lưng từ nền sọ xuống tận xương cụt.",
    clinicalNotes: "Thoát vị đĩa đệm (đặc biệt tầng L4-L5, L5-S1) chèn ép rễ thần kinh tọa gây đau lan xuống cẳng chân. Thoái hóa cột sống cổ có thể gây hẹp ống sống cổ.",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 150-160)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.4,
    positionX: 0,
    positionY: 0.9,
    positionZ: -0.22,
    scale: 1.0,
    color: "#e2e8f0",
    structures: [
      { id: "cervical_spine", name: "Đoạn sống cổ (C1-C7)", nameEn: "Cervical Spine", nameLatin: "Vertebrae cervicales", description: "Đoạn linh hoạt nhất nâng đỡ đầu, đặc biệt đốt C1 (Atlas) và C2 (Axis)." },
      { id: "thoracic_spine", name: "Đoạn sống ngực (T1-T12)", nameEn: "Thoracic Spine", nameLatin: "Vertebrae thoracicae", description: "Khớp với các đầu xương sườn tạo khung lồng ngực." },
      { id: "lumbar_spine", name: "Đoạn sống thắt lưng (L1-L5)", nameEn: "Lumbar Spine", nameLatin: "Vertebrae lumbales", description: "Thân đốt to và dày nhất chịu tải trọng lớn nhất của phần thân trên." }
    ]
  },
  {
    id: "skull",
    systemId: "skeletal",
    name: "Hộp sọ",
    nameEn: "Cranium / Skull",
    nameLatin: "Cranium",
    description: "Khối xương phức tạp gồm 8 xương sọ não bảo vệ não bộ và 14 xương mặt tạo nên ổ mắt, mũi và khung hàm.",
    function: "Bảo vệ toàn vẹn các cấu trúc thần kinh trung ương và các giác quan cao cấp (mắt, tai, mũi, lưỡi).",
    location: "Phần cao nhất của trục xương, tựa trên đốt đội C1.",
    clinicalNotes: "Chấn thương sọ não vỡ xương đá có thể gây chảy dịch não tủy qua tai hoặc dấu hiệu bầm tím sau tai (Battle sign).",
    source: "Gray's Anatomy 42nd Ed., Netter Atlas (Plates 1-15)",
    reviewStatus: "VERIFIED",
    layerDepth: 0.25,
    positionX: 0,
    positionY: 2.15,
    positionZ: 0.05,
    scale: 0.95,
    color: "#f1f5f9",
    structures: [
      { id: "frontal_bone", name: "Xương trán", nameEn: "Frontal Bone", nameLatin: "Os frontale", description: "Tạo nên phần trán và trần ổ mắt." },
      { id: "mandible", name: "Xương hàm dưới", nameEn: "Mandible", nameLatin: "Mandibula", description: "Xương duy nhất cử động được của khối sọ mặt thông qua khớp thái dương hàm (TMJ)." }
    ]
  },
  {
    id: "vascular_aorta_cava",
    systemId: "cardiovascular",
    name: "Động mạch chủ & Tĩnh mạch chủ",
    nameEn: "Aorta & Vena Cava",
    nameLatin: "Aorta et Vena cava",
    description: "Hai thân mạch máu chính lớn nhất của cơ thể chịu trách nhiệm phân phối và hồi lưu toàn bộ lưu lượng tuần hoàn.",
    function: "Động mạch chủ dẫn máu oxy cao đi đến các động mạch nhánh; tĩnh mạch chủ trên và dưới thu thập máu nghèo oxy về tâm nhĩ phải.",
    location: "Chạy dọc song song trước cột sống ngực và thắt lưng.",
    clinicalNotes: "Phình bóc tách động mạch chủ ngực/bụng (Aortic Dissection) là cấp cứu tối khẩn cấp với tỷ lệ tử vong cao nếu vỡ mạch.",
    source: "Gray's Anatomy 42nd Ed.",
    reviewStatus: "VERIFIED",
    layerDepth: 0.62,
    positionX: 0.02,
    positionY: 0.85,
    positionZ: -0.05,
    scale: 1.0,
    color: "#dc2626",
    structures: [
      { id: "thoracic_aorta", name: "Động mạch chủ ngực", nameEn: "Thoracic Aorta", nameLatin: "Aorta thoracica", description: "Đoạn tiếp nối quai ĐM chủ chạy xuống trung thất sau." },
      { id: "abdominal_aorta", name: "Động mạch chủ bụng", nameEn: "Abdominal Aorta", nameLatin: "Aorta abdominalis", description: "Phân nhánh cấp máu cho các tạng tiêu hóa, thận và chia đôi thành 2 ĐM chậu chung." },
      { id: "inferior_vena_cava", name: "Tĩnh mạch chủ dưới", nameEn: "Inferior Vena Cava (IVC)", nameLatin: "Vena cava inferior", description: "Hồi lưu máu từ toàn bộ nửa dưới cơ thể về nhĩ phải." }
    ]
  },
  {
    id: "skeleton_pelvis",
    systemId: "skeletal",
    name: "Khung chậu (Xương chậu & Xương cùng)",
    nameEn: "Bony Pelvis (Hip Bones & Sacrum)",
    nameLatin: "Pelvis",
    description: "Khung xương nâng đỡ các tạng vùng chậu và truyền trọng lực thân mình xuống hai chi dưới.",
    function: "Bảo vệ bàng quang, trực tràng, cơ quan sinh dục trong và tạo ổ cối khớp với chỏm xương đùi.",
    location: "Nằm ở phần dưới cùng của thân mình, nối liền cột sống thắt lưng với xương đùi.",
    clinicalNotes: "Vỡ khung chậu do tai nạn giao thông là tổn thương nặng nề có nguy cơ mất máu dữ dội và tổn thương niệu đạo.",
    source: "Gray's Anatomy 42nd Ed.",
    reviewStatus: "VERIFIED",
    layerDepth: 0.35,
    positionX: 0,
    positionY: 0.45,
    positionZ: 0,
    scale: 1.0,
    color: "#cbd5e1",
    structures: [
      { id: "ilium", name: "Xương cánh chậu", nameEn: "Ilium", nameLatin: "Os ilii", description: "Phần xương hình quạt rộng tạo nên mào chậu." },
      { id: "acetabulum", name: "Ổ cối", nameEn: "Acetabulum", nameLatin: "Acetabulum", description: "Hõm khớp sâu tiếp nhận chỏm xương đùi tạo khớp háng." },
      { id: "sacrum", name: "Xương cùng", nameEn: "Sacrum", nameLatin: "Os sacrum", description: "Khối 5 đốt sống cùng dính liền làm một hình tam giác." }
    ]
  },
  {
    id: "skeleton_limbs_lower",
    systemId: "skeletal",
    name: "Xương chi dưới (Xương đùi, Xương chày, Xương mác)",
    nameEn: "Lower Limb Bones (Femur, Tibia, Fibula)",
    nameLatin: "Ossa membri inferioris",
    description: "Hệ xương chịu tải trọng toàn thân cho phép đứng thẳng, đi lại và chạy nhảy.",
    function: "Xương đùi là xương dài nhất và khỏe nhất cơ thể; cẳng chân gồm xương chày chịu lực chính và xương mác làm chỗ bám cho cơ.",
    location: "Kéo dài từ khớp háng xuống tận cổ chân và bàn chân.",
    clinicalNotes: "Gãy cổ xương đùi ở người cao tuổi loãng xương dễ dẫn tới hoại tử vô mạch chỏm xương đùi. Gãy thân xương chày dễ biến chứng chèn ép khoang.",
    source: "Gray's Anatomy 42nd Ed.",
    reviewStatus: "VERIFIED",
    layerDepth: 0.3,
    positionX: 0,
    positionY: -0.35,
    positionZ: 0,
    scale: 1.0,
    color: "#cbd5e1",
    structures: [
      { id: "femur", name: "Xương đùi", nameEn: "Femur", nameLatin: "Os femoris", description: "Xương dài nhất và nặng nhất trong cơ thể người." },
      { id: "patella", name: "Xương bánh chè", nameEn: "Patella", nameLatin: "Patella", description: "Xương vừng lớn nhất cơ thể nằm trong gân cơ tứ đầu đùi." },
      { id: "tibia", name: "Xương chày", nameEn: "Tibia", nameLatin: "Tibia", description: "Xương lớn nằm phía trong của cẳng chân chịu 90% tải trọng cơ thể." }
    ]
  },
  {
    id: "skeleton_limbs_upper",
    systemId: "skeletal",
    name: "Xương chi trên (Xương đòn, Bả vai, Cánh tay, Cẳng tay)",
    nameEn: "Upper Limb Bones (Clavicle, Scapula, Humerus)",
    nameLatin: "Ossa membri superioris",
    description: "Khung xương chi trên gồm đai vai linh hoạt và các đoạn cánh tay, cẳng tay, cổ bàn tay giúp cử động khéo léo.",
    function: "Treo chi trên vào lồng ngực và cho phép bàn tay thao tác cầm nắm tinh vi trong không gian 3 chiều.",
    location: "Nối từ xương ức qua xương đòn, bả vai ra cánh tay và bàn tay hai bên.",
    clinicalNotes: "Trật khớp vai là dạng trật khớp phổ biến nhất cơ thể do chỏm xương cánh tay to hơn nhiều so with ổ chảo nông của bả vai.",
    source: "Gray's Anatomy 42nd Ed.",
    reviewStatus: "VERIFIED",
    layerDepth: 0.3,
    positionX: 0,
    positionY: 1.15,
    positionZ: 0,
    scale: 1.0,
    color: "#cbd5e1",
    structures: [
      { id: "clavicle", name: "Xương đòn", nameEn: "Clavicle", nameLatin: "Clavicula", description: "Xương cong hình chữ S nằm ngang trên nền cổ." },
      { id: "humerus", name: "Xương cánh tay", nameEn: "Humerus", nameLatin: "Humerus", description: "Xương dài nối đai vai với khớp khuỷu." },
      { id: "radius_ulna", name: "Xương quay và xương trụ", nameEn: "Radius and Ulna", nameLatin: "Radius et Ulna", description: "Hai xương song song ở cẳng tay cho phép động tác sấp ngửa bàn tay." }
    ]
  }
];

export const quizQuestionsData = [
  {
    systemId: "cardiovascular",
    organId: "heart",
    question: "Khoang tim nào có thành cơ dày nhất và tạo lực tống máu vào hệ tuần hoàn lớn (tuần hoàn hệ thống)?",
    type: "MULTIPLE_CHOICE",
    options: JSON.stringify(["Tâm nhĩ phải", "Tâm thất phải", "Tâm thất trái", "Tâm nhĩ trái"]),
    correctAnswer: "Tâm thất trái",
    explanation: "Tâm thất trái (Left Ventricle) có thành cơ dày gấp 3 lần tâm thất phải vì phải co bóp thắng áp lực kháng trở mạch ngoại vi rất cao để tống máu vào động mạch chủ.",
    difficulty: "EASY"
  },
  {
    systemId: "cardiovascular",
    organId: "heart",
    question: "Hãy nhận diện và nhấp chuột (Click) trực tiếp vào TIM trên mô hình cơ thể 3D.",
    type: "IDENTIFY_ORGAN",
    options: JSON.stringify(["heart"]),
    correctAnswer: "heart",
    explanation: "Tim nằm trong trung thất giữa lồng ngực, trên cơ hoành, hơi lệch sang trái giữa 2 lá phổi.",
    difficulty: "EASY"
  },
  {
    systemId: "digestive",
    organId: "liver",
    question: "Cơ quan nội tạng nào nhận nguồn máu kép từ Động mạch gan riêng và Tĩnh mạch cửa?",
    type: "MULTIPLE_CHOICE",
    options: JSON.stringify(["Dạ dày", "Gan", "Lách", "Tụy"]),
    correctAnswer: "Gan",
    explanation: "Gan (Hepar) nhận khoảng 75-80% lưu lượng máu giàu chất dinh dưỡng từ Tĩnh mạch cửa và 20-25% máu giàu oxy từ Động mạch gan riêng.",
    difficulty: "MEDIUM"
  },
  {
    systemId: "digestive",
    organId: "liver",
    question: "Hãy xác định và nhấp chuột (Click) vào GAN trên mô hình 3D.",
    type: "IDENTIFY_ORGAN",
    options: JSON.stringify(["liver"]),
    correctAnswer: "liver",
    explanation: "Gan nằm ở vùng hạ sườn phải và thượng vị ngay dưới cơ hoành phải, là tuyến lớn nhất của cơ thể.",
    difficulty: "EASY"
  },
  {
    systemId: "respiratory",
    organId: "lungs",
    question: "Phổi phải của người bình thường được phân chia thành bao nhiêu thùy bởi các khe giải phẫu?",
    type: "MULTIPLE_CHOICE",
    options: JSON.stringify(["1 thùy", "2 thùy", "3 thùy", "4 thùy"]),
    correctAnswer: "3 thùy",
    explanation: "Phổi phải có 3 thùy (Thùy trên, Thùy giữa, Thùy dưới) ngăn cách bởi khe chếch và khe ngang; trong khi phổi trái chỉ có 2 thùy.",
    difficulty: "EASY"
  },
  {
    systemId: "respiratory",
    organId: "lungs",
    question: "Hãy nhấp chuột (Click) trực tiếp vào PHỔI trên mô hình giải phẫu 3D.",
    type: "IDENTIFY_ORGAN",
    options: JSON.stringify(["lungs"]),
    correctAnswer: "lungs",
    explanation: "Phổi gồm 2 lá nằm trong lồng ngực hai bên trung thất ôm lấy tim.",
    difficulty: "EASY"
  },
  {
    systemId: "nervous",
    organId: "brain",
    question: "Cấu trúc thần kinh nào chịu trách nhiệm chính về phối hợp thăng bằng, tinh vi động tác và điều hòa trương lực cơ?",
    type: "MULTIPLE_CHOICE",
    options: JSON.stringify(["Đại não", "Tiểu não (Cerebellum)", "Hành não", "Cầu não"]),
    correctAnswer: "Tiểu não (Cerebellum)",
    explanation: "Tiểu não tiếp nhận xung động tiền đình và cảm giác sâu bản thể để điều hòa sự nhịp nhàng của các cử động có ý thức và giữ thăng bằng.",
    difficulty: "MEDIUM"
  },
  {
    systemId: "urinary",
    organId: "kidneys",
    question: "Tại sao vị trí giải phẫu của Thận phải thường thấp hơn Thận trái khoảng 1.5 cm?",
    type: "MULTIPLE_CHOICE",
    options: JSON.stringify(["Do lách chèn ép phía trên", "Do gan phải có kích thước lớn đè lên", "Do quai tá tràng nâng đỡ", "Do cơ hoành bên phải thấp hơn"]),
    correctAnswer: "Do gan phải có kích thước lớn đè lên",
    explanation: "Thùy gan phải chiếm thể tích lớn ở hạ sườn phải, đẩy thận phải xuống thấp hơn một chút so với thận trái.",
    difficulty: "MEDIUM"
  },
  {
    systemId: "urinary",
    organId: "kidneys",
    question: "Hãy nhấp chuột (Click) vào THẬN trên mô hình 3D.",
    type: "IDENTIFY_ORGAN",
    options: JSON.stringify(["kidneys"]),
    correctAnswer: "kidneys",
    explanation: "Thận nằm sau phúc mạc hai bên cột sống thắt lưng.",
    difficulty: "EASY"
  }
];

export const flashcardsData = [
  {
    systemId: "cardiovascular",
    organId: "heart",
    front: "Cấu trúc nào ngăn cách tâm nhĩ trái và tâm thất trái của tim?",
    back: "Van hai lá (Bicuspid / Mitral valve). Van này mở trong thì tâm trương để máu từ nhĩ trái xuống thất trái và đóng kín trong thì tâm thu.",
    latinTerm: "Valva atrioventricularis sinistra / Valva mitralis",
    hint: "Còn gọi là van tăng bạt (bicuspid)",
    difficulty: "EASY"
  },
  {
    systemId: "cardiovascular",
    organId: "heart",
    front: "Hệ thống dẫn truyền tự động của tim xuất phát từ cấu trúc phát nhịp nào?",
    back: "Nút xoang nhĩ (Sinoatrial node hay SA node), nằm ở thành sau của tâm nhĩ phải gần lỗ tĩnh mạch chủ trên.",
    latinTerm: "Nodus sinuatrialis",
    hint: "Chủ nhịp sinh lý tự nhiên của tim",
    difficulty: "MEDIUM"
  },
  {
    systemId: "respiratory",
    organId: "lungs",
    front: "Mặt trong của phổi trái có một khuyết lõm sâu chứa cơ quan nào?",
    back: "Khuyết tim (Cardiac notch) để tạo khoảng không gian cho đỉnh tim hướng sang trái.",
    latinTerm: "Incisura cardiaca pulmonis sinistri",
    hint: "Liên quan mật thiết với màng ngoài tim",
    difficulty: "EASY"
  },
  {
    systemId: "digestive",
    organId: "liver",
    front: "Đơn vị cấu tạo và chức năng vi thể cơ bản của gan là gì?",
    back: "Tiểu thùy gan (Hepatic lobule) hình lục giác, ở giữa là tĩnh mạch trung tâm tiểu thùy, xung quanh là các khoảng cửa (bộ ba khoảng cửa).",
    latinTerm: "Lobulus hepatis",
    hint: "Cấu trúc hình lăng trụ lục giác",
    difficulty: "MEDIUM"
  },
  {
    systemId: "nervous",
    organId: "brain",
    front: "Ba lớp màng não (Meninges) theo thứ tự từ ngoài vào trong gồm những màng nào?",
    back: "1. Màng cứng (Dura mater)\n2. Màng nhện (Arachnoid mater)\n3. Màng mềm hay màng nuôi (Pia mater). Giữa màng nhện và màng mềm là khoang dưới nhện chứa dịch não tủy.",
    latinTerm: "Meninges (Dura, Arachnoidea, Pia mater)",
    hint: "Dura - Arachnoid - Pia",
    difficulty: "MEDIUM"
  },
  {
    systemId: "urinary",
    organId: "kidneys",
    front: "Đơn vị chức năng vi thể của thận thực hiện quá trình lọc máu là gì?",
    back: "Nephron (gồm Cầu thận Malpighi và Hệ thống ống thận: ống lượn gần, quai Henle, ống lượn xa). Mỗi quả thận có khoảng 1 - 1.2 triệu nephron.",
    latinTerm: "Nephronum",
    hint: "Khoảng 1 triệu đơn vị ở mỗi thận",
    difficulty: "EASY"
  },
  {
    systemId: "skeletal",
    organId: "skeleton_spine",
    front: "Đốt sống cổ thứ nhất (C1) và thứ hai (C2) có tên gọi đặc biệt nào trong giải phẫu học?",
    back: "C1 là Đốt đội (Atlas) - đỡ hộp sọ. C2 là Đốt trục (Axis) - có mỏm răng (dens) làm trục xoay cho đốt đội.",
    latinTerm: "Atlas (C1) et Axis (C2)",
    hint: "Tên vị thần nâng bầu trời và một trục quay",
    difficulty: "EASY"
  }
];

export const lessonsData = [
  {
    id: "lesson_cardio_overview",
    systemId: "cardiovascular",
    title: "Giải phẫu Tim và Vòng tuần hoàn máu",
    titleEn: "Anatomy of the Heart & Systemic Circulation",
    description: "Khám phá hình thể ngoài, cấu tạo trong của tim, các van tim và chu kỳ bơm máu qua tuần hoàn lớn và nhỏ.",
    orderIndex: 1,
    sections: [
      {
        id: "cardio_sec_1",
        title: "1. Vị trí giải phẫu và Hình thể ngoài của Tim",
        content: "Tim là một cơ quan cơ rỗng nằm trong trung thất giữa, tựa trên vòm hoành, phía trước tựa sau xương ức, hai bên là hai lá phổi. Trục của tim chếch từ sau ra trước, từ trên xuống dưới và từ phải sang trái.",
        organFocusId: "heart",
        orderIndex: 1
      },
      {
        id: "cardio_sec_2",
        title: "2. Cấu tạo 4 buồng tim và hệ thống Van tim",
        content: "Tim được chia thành 4 buồng: hai tâm nhĩ ở trên và hai tâm thất ở dưới. Nhĩ phải ngăn cách thất phải qua van 3 lá; nhĩ trái ngăn cách thất trái qua van 2 lá (van tăng bạt). Máu từ thất phải vào ĐM phổi qua van tổ chim động mạch phổi; máu từ thất trái vào ĐM chủ qua van tổ chim động mạch chủ.",
        organFocusId: "heart",
        orderIndex: 2
      },
      {
        id: "cardio_sec_3",
        title: "3. Các mạch máu lớn kết nối với Tim",
        content: "Động mạch chủ (Aorta) xuất phát từ tâm thất trái, uốn cong thành quai động mạch chủ trước khi đi xuống ngực và bụng. Tĩnh mạch chủ trên và tĩnh mạch chủ dưới thu máu từ toàn bộ cơ thể đổ về tâm nhĩ phải.",
        organFocusId: "vascular_aorta_cava",
        orderIndex: 3
      }
    ]
  },
  {
    id: "lesson_respiratory_overview",
    systemId: "respiratory",
    title: "Đường dẫn khí và Cấu trúc giải phẫu Phổi",
    titleEn: "Airways and Functional Anatomy of the Lungs",
    description: "Tìm hiểu khí phế quản, nhu mô phổi, màng phổi và cơ chế hô hấp.",
    orderIndex: 1,
    sections: [
      {
        id: "resp_sec_1",
        title: "1. Hình thể và các thùy phổi",
        content: "Mỗi lá phổi có hình nửa hình nón với một đỉnh, một đáy và hai mặt (mặt sườn và mặt trung thất). Phổi phải lớn hơn và nặng hơn phổi trái, có 3 thùy (trên, giữa, dưới) ngăn cách bởi khe chếch và khe ngang. Phổi trái có 2 thùy.",
        organFocusId: "lungs",
        orderIndex: 1
      },
      {
        id: "resp_sec_2",
        title: "2. Cơ chế hô hấp và Khung lồng ngực",
        content: "Cơ hoành là cơ hô hấp chính (đảm nhiệm 75% thông khí yên tĩnh). Khi cơ hoành co, vòm hoành hạ xuống làm tăng kích thước chiều dọc của lồng ngực, tạo áp suất âm hút khí vào phổi.",
        organFocusId: "skeleton_ribcage",
        orderIndex: 2
      }
    ]
  },
  {
    id: "lesson_digestive_overview",
    systemId: "digestive",
    title: "Giải phẫu Gan, Dạ dày và Ống tiêu hóa",
    titleEn: "Anatomy of the Liver, Stomach and Alimentary Canal",
    description: "Nghiên cứu hình thể, phân thùy gan theo Couinaud, cấu trúc dạ dày và cuống gan.",
    orderIndex: 1,
    sections: [
      {
        id: "digest_sec_1",
        title: "1. Vị trí và giải phẫu mặt tạng của Gan",
        content: "Gan là tạng đặc lớn nhất trong ổ bụng, chiếm phần lớn hạ sườn phải. Mặt tạng của gan có các rãnh tạo thành chữ H: rãnh dọc phải (chứa túi mật và tĩnh mạch chủ dưới), rãnh dọc trái và rãnh ngang (cửa gan chứa cuống gan).",
        organFocusId: "liver",
        orderIndex: 1
      },
      {
        id: "digest_sec_2",
        title: "2. Dạ dày và liên quan giải phẫu",
        content: "Dạ dày hình chữ J gồm tâm vị, đáy vị, thân vị, hang vị và môn vị. Bờ cong nhỏ dạ dày tiếp giáp với mạc nối nhỏ; bờ cong lớn gắn với mạc nối lớn phủ phía trước các quai ruột non.",
        organFocusId: "stomach",
        orderIndex: 2
      }
    ]
  }
];
