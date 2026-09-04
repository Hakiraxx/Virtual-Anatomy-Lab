// Comprehensive Clinical Data for Dental Specimens (Bộ Tiêu Bản Chuyên Sâu RHM)

// ============================================================================
// 1. TOOTH SPECIMEN & ENDODONTIC DATABASE (32 TEETH)
// ============================================================================

export interface ToothSpecimenDetail {
  fdi: number;
  universal: number;
  palmer: string;
  nameVi: string;
  nameEn: string;
  quadrant: 1 | 2 | 3 | 4;
  toothType: 'incisor' | 'canine' | 'premolar' | 'molar';
  rootCount: number;
  canalCount: number;
  canalNames: string[];
  vertucciClass: string;
  vertucciDescriptionVi: string;
  accessCavityShape: string;
  accessCavityDetailsVi: string;
  rubberDamClampVi: string;
  rubberDamClampAlternatives: string[];
  crownDimensionsMm: {
    height: number;
    mesiodistal: number;
    buccolingual: number;
  };
  rootLengthMm: number;
  pulpChamberFloorAnatomyVi: string;
  clinicalRisksVi: string[];
  recommendedAnesthesia: string[];
}

export const DENTAL_SPECIMENS_DATABASE: Record<number, ToothSpecimenDetail> = {
  // --- CUNG 1: HÀM TRÊN PHẢI ---
  18: {
    fdi: 18,
    universal: 1,
    palmer: '8┘',
    nameVi: 'Răng khôn trên phải',
    nameEn: 'Maxillary Right 3rd Molar',
    quadrant: 1,
    toothType: 'molar',
    rootCount: 3,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Xa-ngoài (DB)', 'Khẩu cái (P)'],
    vertucciClass: 'Biến thiên cao (Type I, II, hoặc hợp nhất)',
    vertucciDescriptionVi: 'Hình thái chân răng và ống tủy rất bất thường, thường chụm hoặc uốn cong về phía xa.',
    accessCavityShape: 'Hình tam giác hoặc bầu dục lệch về phía gần',
    accessCavityDetailsVi: 'Đáy tam giác hướng về phía ngoài, đỉnh hướng về phía vòm miệng.',
    rubberDamClampVi: 'Clamp #14A hoặc #8A (ngàm sâu cho thân răng ngắn)',
    rubberDamClampAlternatives: ['Clamp #7', 'Clamp #W8A'],
    crownDimensionsMm: { height: 6.5, mesiodistal: 8.5, buccolingual: 10.0 },
    rootLengthMm: 11.0,
    pulpChamberFloorAnatomyVi: 'Sàn buồng tủy thu hẹp, các lỗ tủy nằm gần nhau, có thể dính liền thành hình chữ C.',
    clinicalRisksVi: [
      'Gãy chóp chân răng cong khi nhổ',
      'Đẩy chân răng vào xoang hàm trên (Maxillary sinus)',
      'Gãy lồi củ hàm trên (Maxillary tuberosity)'
    ],
    recommendedAnesthesia: ['Gây tê lồi củ hàm trên (PSA Nerve Block)', 'Gây tê thần kinh khẩu cái lớn (GP)']
  },
  17: {
    fdi: 17,
    universal: 2,
    palmer: '7┘',
    nameVi: 'Răng cối lớn thứ hai trên phải',
    nameEn: 'Maxillary Right 2nd Molar',
    quadrant: 1,
    toothType: 'molar',
    rootCount: 3,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Xa-ngoài (DB)', 'Khẩu cái (P)'],
    vertucciClass: 'Vertucci Type I (MB 85%, DB 98%, P 100%)',
    vertucciDescriptionVi: '3 chân riêng biệt nhưng khép gần nhau hơn R16. MB2 xuất hiện ở khoảng 35-40% trường hợp.',
    accessCavityShape: 'Hình tam giác đáy lớn ngoài, đỉnh trong',
    accessCavityDetailsVi: 'Hẹp hơn so với R16 theo chiều gần-xa, nằm ở 2/3 phía gần của mặt nhai.',
    rubberDamClampVi: 'Clamp #14 hoặc #8',
    rubberDamClampAlternatives: ['Clamp #7', 'Clamp #56'],
    crownDimensionsMm: { height: 7.0, mesiodistal: 9.0, buccolingual: 11.0 },
    rootLengthMm: 11.5,
    pulpChamberFloorAnatomyVi: 'Sàn tủy hình tam giác nhọn, lỗ ống khẩu cái to nhất, lỗ MB và DB gần nhau.',
    clinicalRisksVi: ['Thủng sàn buồng tủy', 'Sót ống tủy MB2'],
    recommendedAnesthesia: ['Gây tê PSA (Thần kinh huyệt răng trên sau)', 'Gây tê GP (Khẩu cái lớn)']
  },
  16: {
    fdi: 16,
    universal: 3,
    palmer: '6┘',
    nameVi: 'Răng cối lớn thứ nhất trên phải',
    nameEn: 'Maxillary Right 1st Molar (Chìa khóa khớp cắn)',
    quadrant: 1,
    toothType: 'molar',
    rootCount: 3,
    canalCount: 4,
    canalNames: ['Gần-ngoài 1 (MB1)', 'Gần-ngoài 2 (MB2)', 'Xa-ngoài (DB)', 'Khẩu cái (P)'],
    vertucciClass: 'Vertucci Type II hoặc IV cho chân gần ngoài (MB2 hiện diện 70-90%)',
    vertucciDescriptionVi: 'Chân MB có 2 ống tủy (MB1 & MB2) chạy song song hoặc nhập lại ở chóp. MB2 là nguyên nhân thất bại nội nha hàng đầu.',
    accessCavityShape: 'Hình tứ giác hoặc tam giác bo tròn lệch gần',
    accessCavityDetailsVi: 'Tránh gờ chéo (oblique ridge) nếu có thể; mở rộng về phía gần-ngoài để bộc lộ đường vào MB2.',
    rubberDamClampVi: 'Clamp #14A hoặc #56 (cho răng kích thước lớn)',
    rubberDamClampAlternatives: ['Clamp #8A', 'Clamp #7'],
    crownDimensionsMm: { height: 7.5, mesiodistal: 10.0, buccolingual: 11.5 },
    rootLengthMm: 12.5,
    pulpChamberFloorAnatomyVi: 'Sàn tủy có các đường nối rãnh tối (developmental grooves). Lỗ MB2 nằm trên đường nối từ MB1 tới Palatal, cách MB1 1-3mm về phía khẩu cái.',
    clinicalRisksVi: [
      'Bỏ sót ống tủy phụ MB2 (tỷ lệ tới 90% dưới kính hiển vi)',
      'Thủng xoang hàm khi nong rửa chóp chân khẩu cái',
      'Tách gãy file dụng cụ trong ống MB cong'
    ],
    recommendedAnesthesia: ['Gây tê PSA kết hợp MSA', 'Gây tê thần kinh khẩu cái lớn (GP)']
  },
  15: {
    fdi: 15,
    universal: 4,
    palmer: '5┘',
    nameVi: 'Răng cối nhỏ thứ hai trên phải',
    nameEn: 'Maxillary Right 2nd Premolar',
    quadrant: 1,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy chính (hoặc Ngoài & Trong)'],
    vertucciClass: 'Vertucci Type I (50%), Type II (25%), Type IV (20%)',
    vertucciDescriptionVi: 'Đa số có 1 chân dẹt theo chiều gần-xa với 1 hoặc 2 ống tủy nhập ở chóp.',
    accessCavityShape: 'Hình bầu dục thuôn dài theo chiều ngoài-trong',
    accessCavityDetailsVi: 'Nằm giữa các múi ngoài và trong, mở rộng theo chiều ngoài trong đến đỉnh múi nhưng không cắt múi.',
    rubberDamClampVi: 'Clamp #2 hoặc #2A',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #1'],
    crownDimensionsMm: { height: 7.5, mesiodistal: 6.8, buccolingual: 9.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Sàn buồng tủy nằm sâu dưới đường cổ răng, có thể có 2 miệng ống tủy nếu chân chẻ.',
    clinicalRisksVi: ['Thủng thành bên phía gần do lõm chân răng (mesial developmental groove)'],
    recommendedAnesthesia: ['Gây tê ngấm tại chỗ (Infiltration)', 'Gây tê thần kinh dưới ổ mắt (Infraorbital)']
  },
  14: {
    fdi: 14,
    universal: 5,
    palmer: '4┘',
    nameVi: 'Răng cối nhỏ thứ nhất trên phải',
    nameEn: 'Maxillary Right 1st Premolar',
    quadrant: 1,
    toothType: 'premolar',
    rootCount: 2,
    canalCount: 2,
    canalNames: ['Ống Ngoài (Buccal)', 'Ống Trong/Khẩu cái (Palatal)'],
    vertucciClass: 'Vertucci Type IV (85-90% có 2 ống tủy riêng biệt với 2 lỗ chóp)',
    vertucciDescriptionVi: 'Thường có 2 chân riêng biệt (chân ngoài và chân trong) hoặc 1 chân dẹt có 2 ống tủy.',
    accessCavityShape: 'Hình bầu dục thuôn dài ngoài-trong',
    accessCavityDetailsVi: 'Đường vào nằm ở trung tâm mặt nhai giữa hai múi ngoài và trong.',
    rubberDamClampVi: 'Clamp #2 hoặc #0',
    rubberDamClampAlternatives: ['Clamp #2A', 'Clamp #1'],
    crownDimensionsMm: { height: 8.0, mesiodistal: 7.0, buccolingual: 9.2 },
    rootLengthMm: 13.5,
    pulpChamberFloorAnatomyVi: 'Lõm mặt gần sâu ở cổ răng (Mesial concavity). Dễ bị thủng khi mở tủy lệch về phía gần!',
    clinicalRisksVi: [
      'Thủng thành gần cổ răng do lõm giải phẫu đặc thù (Mesial concavity)',
      'Gãy múi ngoài khi chịu lực nhai lớn nếu không bọc mão'
    ],
    recommendedAnesthesia: ['Gây tê ngấm tại chỗ bản xương ngoài', 'Gây tê MSA (Thần kinh huyệt răng trên giữa)']
  },
  13: {
    fdi: 13,
    universal: 6,
    palmer: '3┘',
    nameVi: 'Răng nanh trên phải',
    nameEn: 'Maxillary Right Canine (Răng dài nhất cung hàm)',
    quadrant: 1,
    toothType: 'canine',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm'],
    vertucciClass: 'Vertucci Type I (100%)',
    vertucciDescriptionVi: 'Ống tủy hình bầu dục dẹt theo chiều ngoài trong, rộng ở thân răng và thon dần về chóp.',
    accessCavityShape: 'Hình ngọn giáo / quả trám thuôn dài ở mặt trong',
    accessCavityDetailsVi: 'Mở từ gờ cingulum hướng về phía rìa cắn dọc theo trục lớn của thân răng.',
    rubberDamClampVi: 'Clamp #9 hoặc #212 (Clamp chuyên dụng răng trước)',
    rubberDamClampAlternatives: ['Clamp #0', 'Clamp #2'],
    crownDimensionsMm: { height: 10.0, mesiodistal: 7.5, buccolingual: 8.0 },
    rootLengthMm: 17.5,
    pulpChamberFloorAnatomyVi: 'Không có sàn buồng tủy; buồng tủy chuyển tiếp mượt mà vào ống tủy.',
    clinicalRisksVi: ['Chiều dài làm việc cực dài (cần dùng trâm nội nha 25mm hoặc 31mm)', 'Uốn cong chóp răng về phía xa'],
    recommendedAnesthesia: ['Gây tê thần kinh dưới ổ mắt (IO Block)', 'Gây tê ngấm chóp răng']
  },
  12: {
    fdi: 12,
    universal: 7,
    palmer: '2┘',
    nameVi: 'Răng cửa bên trên phải',
    nameEn: 'Maxillary Right Lateral Incisor',
    quadrant: 1,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm'],
    vertucciClass: 'Vertucci Type I (99%)',
    vertucciDescriptionVi: '1 chân tròn hoặc hơi dẹt; 53% có chóp cong mạnh về phía xa và trong (Palatal curve).',
    accessCavityShape: 'Hình tam giác tròn hoặc hình trứng ở mặt trong',
    accessCavityDetailsVi: 'Tâm lỗ mở nằm ngay trên gờ cingulum ở mặt lưỡi.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #210'],
    crownDimensionsMm: { height: 8.8, mesiodistal: 6.5, buccolingual: 6.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy thon dần; cần cẩn trọng rãnh khẩu cái sâu (palatoradicular groove) gây tổn thương nha chu-nội nha.',
    clinicalRisksVi: ['Gãy file do chóp cong về phía xa-khẩu cái', 'Nang quanh chóp lớn xâm lấn sàn mũi'],
    recommendedAnesthesia: ['Gây tê ngấm tại chỗ ASA', 'Gây tê gai cửa (Nasopalatine)']
  },
  11: {
    fdi: 11,
    universal: 8,
    palmer: '1┘',
    nameVi: 'Răng cửa giữa trên phải',
    nameEn: 'Maxillary Right Central Incisor',
    quadrant: 1,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm'],
    vertucciClass: 'Vertucci Type I (100%)',
    vertucciDescriptionVi: 'Ống tủy rộng hình nón, thẳng, có 3 sừng tủy tương ứng 3 thùy men ở người trẻ.',
    accessCavityShape: 'Hình tam giác đáy hướng về rìa cắn, đỉnh hướng về cingulum',
    accessCavityDetailsVi: 'Mở ở mặt trong, lấy sạch các sừng tủy để tránh đổi màu răng sau điều trị nội nha.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #211', 'Chỉ chặn đê cao su Wedjets'],
    crownDimensionsMm: { height: 10.5, mesiodistal: 8.5, buccolingual: 7.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy tròn đều, dễ tạo hình và lèn gutta-percha.',
    clinicalRisksVi: ['Đổi màu thân răng do sót mô tủy ở các sừng tủy', 'Thủng thành ngoài nếu nghiêng mũi khoan'],
    recommendedAnesthesia: ['Gây tê ngấm tại chỗ mặt ngoài (ASA)', 'Gây tê thần kinh mũi khẩu cái (NP)']
  },

  // --- CUNG 4: HÀM DƯỚI PHẢI ---
  46: {
    fdi: 46,
    universal: 30,
    palmer: '┐6',
    nameVi: 'Răng cối lớn thứ nhất hàm dưới phải',
    nameEn: 'Mandibular Right 1st Molar (Răng cối lớn 6 dưới)',
    quadrant: 4,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Gần-trong (ML)', 'Xa (Distal) hoặc Xa-ngoài (DB) & Xa-trong (DL)'],
    vertucciClass: 'Chân gần: Vertucci Type IV (2 ống riêng biệt) 85%; Chân xa: Type I hoặc II',
    vertucciDescriptionVi: 'Chân gần rộng dẹt có 2 ống MB và ML nối với nhau bằng eo tủy (isthmus). Khoảng 5-15% có chân phụ trong Radix Entomolaris ở người châu Á.',
    accessCavityShape: 'Hình thang hoặc chữ nhật lệch về phía gần',
    accessCavityDetailsVi: 'Đáy lớn hướng về phía gần, đáy nhỏ hướng về phía xa. Tránh cắt phạm múi gần ngoài.',
    rubberDamClampVi: 'Clamp #14A hoặc #8A',
    rubberDamClampAlternatives: ['Clamp #7', 'Clamp #W8A'],
    crownDimensionsMm: { height: 7.5, mesiodistal: 11.0, buccolingual: 10.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Sàn tủy màu xám sẫm, có đường rãnh nối. Giữa MB và ML luôn có eo tủy chứa mô hoại tử cần làm sạch bằng siêu âm.',
    clinicalRisksVi: [
      'Bỏ sót chân phụ trong (Radix Entomolaris) nằm ở phía xa-trong',
      'Thủng thành dẹt phía xa của chân gần (Strip perforation) do giũa quá mức',
      'Đứt gãy trâm ở ống MB cong 2 bình diện'
    ],
    recommendedAnesthesia: ['Gây tê gai Spix / IAN Block', 'Gây tê Gow-Gates', 'Gây tê dây chằng nha chu bổ sung']
  },
  48: {
    fdi: 48,
    universal: 32,
    palmer: '┐8',
    nameVi: 'Răng khôn hàm dưới phải (Tiêu điểm phẫu thuật)',
    nameEn: 'Mandibular Right 3rd Molar (Impacted Wisdom Tooth)',
    quadrant: 4,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 2,
    canalNames: ['Ống gần', 'Ống xa (hoặc hợp nhất C-shaped)'],
    vertucciClass: 'Biến dị hình thái cực kỳ phong phú, phổ biến hệ thống ống tủy hình chữ C (C-shaped canal)',
    vertucciDescriptionVi: 'Chân răng thường chụm, uốn cong móc câu về phía sau hoặc ôm lấy ống thần kinh huyệt răng dưới (IAN).',
    accessCavityShape: 'Hình thang lệch gần',
    accessCavityDetailsVi: 'Ít điều trị nội nha, chủ yếu là đối tượng phẫu thuật nhổ răng ngầm/lệch.',
    rubberDamClampVi: 'Clamp #14A hoặc #8A',
    rubberDamClampAlternatives: ['Clamp #W8A'],
    crownDimensionsMm: { height: 7.0, mesiodistal: 10.0, buccolingual: 9.5 },
    rootLengthMm: 11.0,
    pulpChamberFloorAnatomyVi: 'Thường hợp nhất với các rãnh chữ C phức tạp.',
    clinicalRisksVi: [
      'Tổn thương thần kinh huyệt răng dưới (IAN) gây tê môi dưới và cằm vĩnh viễn',
      'Tổn thương thần kinh lưỡi (Lingual nerve) do vỡ bản xương mặt trong',
      'Đẩy răng khôn vào khoang dưới hàm hoặc khoang chân bướm hàm dưới'
    ],
    recommendedAnesthesia: ['Gây tê dây thần kinh huyệt răng dưới (IAN Block)', 'Gây tê thần kinh má ngoài (Long Buccal)', 'Gây tê thần kinh lưỡi']
  },

  // CUNG 3: HÀM DƯỚI TRÁI
  36: {
    fdi: 36,
    universal: 19,
    palmer: '┌6',
    nameVi: 'Răng cối lớn thứ nhất hàm dưới trái',
    nameEn: 'Mandibular Left 1st Molar',
    quadrant: 3,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Gần-trong (ML)', 'Xa (D)'],
    vertucciClass: 'Chân gần: Vertucci Type IV; Chân xa: Type I hoặc II',
    vertucciDescriptionVi: 'Tương tự R46, có thể có chân trong phụ Radix Entomolaris (3 chân).',
    accessCavityShape: 'Hình thang đáy lớn hướng về phía gần',
    accessCavityDetailsVi: 'Mở rộng về phía gần ngoài để tìm MB và gần trong để tìm ML.',
    rubberDamClampVi: 'Clamp #14A hoặc #8A',
    rubberDamClampAlternatives: ['Clamp #7'],
    crownDimensionsMm: { height: 7.5, mesiodistal: 11.0, buccolingual: 10.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Sàn buồng tủy có rãnh đen nối các lỗ tủy, eo tủy chân gần cần bơm rửa hoạt hóa sóng siêu âm (PUI).',
    clinicalRisksVi: ['Thủng thành dẹt phía xa của chân gần', 'Sót chân phụ Radix'],
    recommendedAnesthesia: ['Gây tê IAN Block', 'Gây tê Spix', 'Gây tê bổ sung dây chằng PDL']
  },
  38: {
    fdi: 38,
    universal: 17,
    palmer: '┌8',
    nameVi: 'Răng khôn hàm dưới trái',
    nameEn: 'Mandibular Left 3rd Molar',
    quadrant: 3,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 2,
    canalNames: ['Ống gần', 'Ống xa'],
    vertucciClass: 'Hợp nhất C-shaped hoặc chân cong móc',
    vertucciDescriptionVi: 'Đối tượng phẫu thuật nhổ răng khôn lệch ngầm phổ biến nhất trong lâm sàng RHM.',
    accessCavityShape: 'Hình thang lệch',
    accessCavityDetailsVi: 'Chủ yếu can thiệp phẫu thuật mở vạt, mở xương và cắt chia thân răng.',
    rubberDamClampVi: 'Clamp #14A',
    rubberDamClampAlternatives: ['Clamp #8A'],
    crownDimensionsMm: { height: 7.0, mesiodistal: 10.0, buccolingual: 9.5 },
    rootLengthMm: 11.0,
    pulpChamberFloorAnatomyVi: 'Hợp nhất bất thường.',
    clinicalRisksVi: ['Đứt thần kinh IAN', 'Tổn thương thần kinh Lưỡi', 'Viêm ổ răng khô (Alveolar Osteitis)'],
    recommendedAnesthesia: ['Gây tê Spix / IAN Block', 'Gây tê thần kinh má', 'Gây tê thần kinh lưỡi']
  }
};

// ============================================================================
// 2. TMJ & MUSCLES OF MASTICATION SPECIMEN DATABASE
// ============================================================================

export interface TMJAnatomySpecimen {
  id: string;
  nameVi: string;
  nameEn: string;
  condyleStructureVi: string;
  glenoidFossaVi: string;
  articularEminenceVi: string;
  discZones: {
    zone: string;
    thicknessMm: number;
    characteristicsVi: string;
  }[];
  ligaments: {
    nameVi: string;
    nameEn: string;
    attachmentVi: string;
    functionVi: string;
  }[];
  biomechanicsPhases: {
    phase: string;
    jawRangeMm: string;
    movementTypeVi: string;
    activeMusclesVi: string;
    discCondyleRelationVi: string;
  }[];
  tmdPathologies: {
    id: string;
    nameVi: string;
    nameEn: string;
    soundSignVi: string;
    jawOpeningLimitMm: number;
    pathophysiologyVi: string;
    clinicalManagementVi: string;
  }[];
}

export const TMJ_SPECIMEN_DATA: TMJAnatomySpecimen = {
  id: 'tmj_master',
  nameVi: 'Tiêu bản Phức Hợp Khớp Thái Dương Hàm (TMJ)',
  nameEn: 'Temporomandibular Joint Complex Specimen',
  condyleStructureVi:
    'Lồi cầu xương hàm dưới có dạng elip ngang dài 15-20mm, rộng 8-10mm. Trục lớn nghiêng vào trong và ra sau gặp nhau ở bờ trước lỗ lớn xương chẩm tạo góc 145-160 độ. Phủ bởi mô sụn sợi (fibrocartilage) có khả năng tự tái tạo cao hơn sụn trong.',
  glenoidFossaVi:
    'Hố hàm (Hố thái dương) nằm ở phần trai xương thái dương, phía trước ống tai ngoài. Thành trên hố hàm rất mỏng ngăn cách với hố sọ giữa.',
  articularEminenceVi:
    'Lồi khớp (Củ khớp) là bờ trước hố hàm, có sườn sau dốc 30-60 độ mà lồi cầu sẽ trượt lên trong thì há miệng lớn.',
  discZones: [
    {
      zone: 'Băng trước (Anterior band)',
      thicknessMm: 2.0,
      characteristicsVi: 'Dày vừa phải, gắn với bao khớp trước và nhận một phần thớ cơ của bó trên cơ chân bướm ngoài.'
    },
    {
      zone: 'Vùng trung gian (Intermediate zone)',
      thicknessMm: 1.0,
      characteristicsVi: 'Mỏng nhất, vô mạch và vô thần kinh; là vùng chịu lực nén cơ học chính giữa lồi cầu và sườn sau lồi khớp.'
    },
    {
      zone: 'Băng sau (Posterior band)',
      thicknessMm: 3.0,
      characteristicsVi: 'Dày nhất, nằm ngay trên chỏm lồi cầu ở tư thế cắn khớp trung tâm (Centric Occlusion).'
    },
    {
      zone: 'Mô sau đĩa hai lá (Bilaminar zone / Retrodiscal tissue)',
      thicknessMm: 4.5,
      characteristicsVi: 'Lá trên có nhiều sợi chun bám vào xương thái dương; lá dưới nhiều sợi collagen bám vào cổ lồi cầu. Chứa đám rối mạch máu và thụ cảm thể thần kinh cảm giác dồi dào.'
    }
  ],
  ligaments: [
    {
      nameVi: 'Dây chằng bên thái dương hàm (Lateral / Temporomandibular)',
      nameEn: 'Temporomandibular (Lateral) Ligament',
      attachmentVi: 'Từ mỏm gò má xương thái dương chạy chéo xuống dưới ra sau bám vào cổ lồi cầu.',
      functionVi: 'Hạn chế lồi cầu lùi quá mức ra sau, bảo vệ mô sau đĩa và giới hạn độ mở của thì xoay lồi cầu.'
    },
    {
      nameVi: 'Dây chằng bướm hàm (Sphenomandibular)',
      nameEn: 'Sphenomandibular Ligament',
      attachmentVi: 'Từ gai xương bướm đến gai Spix (Lingula) của xương hàm dưới.',
      functionVi: 'Hoạt động như trục bản lề tĩnh khi hàm dưới vận động; che chở cho dây thần kinh IAN chui vào lỗ hàm dưới.'
    },
    {
      nameVi: 'Dây chằng trâm hàm (Stylomandibular)',
      nameEn: 'Stylomandibular Ligament',
      attachmentVi: 'Từ mỏm trâm xương thái dương đến bờ sau góc hàm dưới.',
      functionVi: 'Hạn chế vận động đưa hàm ra trước (Protrusion) quá mức.'
    }
  ],
  biomechanicsPhases: [
    {
      phase: 'Thì 1: Há miệng ban đầu (Early Opening)',
      jawRangeMm: '0 – 20 mm (khoảng cách rìa cắn)',
      movementTypeVi: 'Chuyển động XOAY thuần túy (Pure Rotation) quanh trục bản lề ngang trong khoang khớp dưới.',
      activeMusclesVi: 'Cơ chân bướm ngoài bó dưới, cơ hai bụng thân trước, cơ cằm móng.',
      discCondyleRelationVi: 'Đĩa khớp giữ nguyên vị trí trong hố hàm, lồi cầu xoay trên mặt dưới của đĩa khớp.'
    },
    {
      phase: 'Thì 2: Há miệng tối đa (Late/Maximum Opening)',
      jawRangeMm: '20 – 50 mm',
      movementTypeVi: 'Chuyển động TRƯỢT (Translation) ra trước và xuống dưới trong khoang khớp trên.',
      activeMusclesVi: 'Co mạnh cơ chân bướm ngoài hai bên đưa lồi cầu trượt ra sườn sau lồi khớp.',
      discCondyleRelationVi: 'Phức hợp lồi cầu - đĩa khớp trượt đồng bộ cùng nhau ra trước xuống dưới tới đỉnh lồi khớp.'
    },
    {
      phase: 'Đưa hàm ra trước (Protrusion)',
      jawRangeMm: '7 – 10 mm',
      movementTypeVi: 'Chuyển động trượt phẳng ra trước trong khoang khớp trên cả hai bên đồng thời.',
      activeMusclesVi: 'Cơ chân bướm ngoài hai bên kết hợp cơ cắn bó nông.',
      discCondyleRelationVi: 'Lồi cầu và đĩa khớp trượt ra trước sườn lồi khớp mà không há miệng.'
    },
    {
      phase: 'Cử động đưa hàm sang bên (Lateral Excursion)',
      jawRangeMm: '8 – 12 mm',
      movementTypeVi: 'Lồi cầu bên làm việc xoay tại chỗ (Working condyle); lồi cầu bên không làm việc trượt ra trước - xuống dưới - vào trong tạo góc Bennett.',
      activeMusclesVi: 'Cơ chân bướm ngoài đối bên co kéo lồi cầu sang bên làm việc.',
      discCondyleRelationVi: 'Bên làm việc đĩa khớp ổn định; bên không làm việc đĩa khớp trượt theo lồi cầu.'
    }
  ],
  tmdPathologies: [
    {
      id: 'tmd_reduction',
      nameVi: 'Trượt đĩa khớp ra trước CÓ HỒI PHỤC',
      nameEn: 'Disc Displacement with Reduction (DDwR)',
      soundSignVi: 'Tiếng CLICK / POP khi há miệng và tiếng click ngược khi ngậm miệng (Reciprocal Click)',
      jawOpeningLimitMm: 45,
      pathophysiologyVi: 'Khi ngậm, đĩa khớp bị kéo trượt ra trước lồi cầu do giãn dây chằng sau đĩa. Khi há miệng, lồi cầu vượt qua gờ sau của đĩa tạo tiếng "click" và đĩa khớp nhảy trở lại vị trí bình thường trên chỏm lồi cầu.',
      clinicalManagementVi: 'Máng nhai định vị hàm ra trước (Anterior repositioning splint), tập vật lý trị liệu cơ nhai, tránh ăn đồ dai cứng.'
    },
    {
      id: 'tmd_non_reduction',
      nameVi: 'Trượt đĩa khớp ra trước KHÔNG HỒI PHỤC (Kẹt Khớp / Closed Lock)',
      nameEn: 'Disc Displacement without Reduction (DDwoR)',
      soundSignVi: 'MẤT TIẾNG CLICK, đau dữ dội, cằm lệch về bên bệnh khi há',
      jawOpeningLimitMm: 25,
      pathophysiologyVi: 'Đĩa khớp nằm kẹt vĩnh viễn ở phía trước lồi cầu, đóng vai trò như chêm cản trở lồi cầu trượt ra trước. Bệnh nhân không thể há miệng lớn (> 30mm).',
      clinicalManagementVi: 'Thủ thuật nắn khớp khẩn cấp (Manual reduction), bơm rửa khoang khớp (Arthrocentesis), máng nhai giải áp (Stabilization splint).'
    },
    {
      id: 'tmd_dislocation',
      nameVi: 'Trật Khớp Thái Dương Hàm Cấp Tính (Hở khớp cắn)',
      nameEn: 'Acute TMJ Dislocation / Open Lock',
      soundSignVi: 'Không thể ngậm miệng lại được, chảy nước dãi, căng cứng cơ cắn',
      jawOpeningLimitMm: 55,
      pathophysiologyVi: 'Lồi cầu trượt vượt quá đỉnh củ khớp (articular eminence) ra trước. Cơ cắn và cơ thái dương co thắt khóa chặt lồi cầu trong hố dưới thái dương trước lồi khớp.',
      clinicalManagementVi: 'Nắn trật khớp phương pháp Nelaton: Bác sĩ đặt ngón tay cái có quấn gạc lên mặt nhai răng cối dưới, ấn xuống dưới và đẩy lùi ra sau.'
    }
  ]
};

// Chi tiết 4 Cơ Nhai
export interface MasticatoryMuscleDetail {
  id: string;
  nameVi: string;
  nameEn: string;
  originVi: string;
  insertionVi: string;
  innervationVi: string;
  actionVi: string;
  triggerPointPainVi: string;
  color: string;
}

export const MASTICATORY_MUSCLES_DETAIL: MasticatoryMuscleDetail[] = [
  {
    id: 'masseter',
    nameVi: 'Cơ Cắn (Cơ nhai khỏe nhất)',
    nameEn: 'Masseter Muscle',
    originVi: 'Bó nông: 2/3 trước bờ dưới cung gò má; Bó sâu: 1/3 sau bờ dưới và mặt trong cung gò má.',
    insertionVi: 'Góc hàm và mặt ngoài cành lên xương hàm dưới.',
    innervationVi: 'Thần kinh cơ cắn (Nhánh thân trước dây V3).',
    actionVi: 'Nâng hàm dưới lên rất mạnh, cắn chặt răng; bó nông hỗ trợ đưa hàm ra trước nhẹ.',
    triggerPointPainVi: 'Điểm đau kích hoạt chiếu đau lên răng cối lớn hàm trên/dưới, cung mày và góc hàm.',
    color: '#ef4444'
  },
  {
    id: 'temporalis',
    nameVi: 'Cơ Thái Dương',
    nameEn: 'Temporalis Muscle',
    originVi: 'Toàn bộ hố thái dương và mạc thái dương sâu.',
    insertionVi: 'Mỏm vẹt (Coronoid process) và bờ trước cành lên xương hàm dưới.',
    innervationVi: 'Các dây thần kinh thái dương sâu (Thân trước dây V3).',
    actionVi: 'Thớ trước & giữa: Nâng hàm dưới lên; Thớ sau nằm ngang: Kéo lùi hàm dưới ra sau (Retrusion).',
    triggerPointPainVi: 'Chiếu đau lên vùng thái dương, trán, nhức đầu và ê buốt các răng cửa/răng cối nhỏ trên.',
    color: '#f97316'
  },
  {
    id: 'medial_pterygoid',
    nameVi: 'Cơ Chân Bướm Trong',
    nameEn: 'Medial Pterygoid Muscle',
    originVi: 'Bó sâu: Mặt trong mảnh ngoài mỏm chân bướm xương bướm; Bó nông: Lồi củ hàm trên và mỏm tháp xương khẩu cái.',
    insertionVi: 'Mặt trong góc hàm (gờ cắn chân bướm trong), đối xứng với cơ cắn tạo nên đai cơ nâng hàm (Pterygomasseteric sling).',
    innervationVi: 'Thần kinh cơ chân bướm trong (Thân sau dây V3).',
    actionVi: 'Nâng hàm dưới lên, hỗ trợ đưa hàm ra trước và sang bên đối diện.',
    triggerPointPainVi: 'Đau sâu sau hàm, khó nuốt, đau vùng hầu họng và sau góc hàm.',
    color: '#eab308'
  },
  {
    id: 'lateral_pterygoid',
    nameVi: 'Cơ Chân Bướm Ngoài (Chìa khóa mở khớp)',
    nameEn: 'Lateral Pterygoid Muscle',
    originVi: 'Bó trên: Mào dưới thái dương cánh lớn xương bướm; Bó dưới: Mặt ngoài mảnh ngoài mỏm chân bướm.',
    insertionVi: 'Bó trên bám vào bao khớp và bờ trước đĩa khớp; Bó dưới bám vào hõm chân bướm ở mặt trước cổ lồi cầu.',
    innervationVi: 'Thần kinh cơ chân bướm ngoài (Thân trước dây V3).',
    actionVi: 'Bó dưới co 2 bên: Hạ hàm và đưa hàm ra trước; Co 1 bên: Đưa hàm sang bên đối diện. Bó trên: Hoạt động khi ngậm miệng có kháng lực và kiểm soát đĩa khớp.',
    triggerPointPainVi: 'Nguyên nhân chính gây rối loạn khớp TDH (TMD), tiếng kêu khớp và đau buốt trước nắp tai.',
    color: '#06b6d4'
  }
];

// ============================================================================
// 3. 3RD MOLAR SURGERY & NERVE SAFETY DATABASE
// ============================================================================

export interface WisdomSurgicalData {
  winterTypes: {
    id: 'mesioangular' | 'horizontal' | 'vertical' | 'distoangular';
    labelVi: string;
    labelEn: string;
    angleDegrees: number;
    frequencyPercent: number;
    surgicalDifficulty: 'Dễ' | 'Trung bình' | 'Khó' | 'Cực kỳ khó';
    difficultyScore: number; // 1 to 4
    sectioningStrategyVi: string;
    notesVi: string;
  }[];
  pellGregory: {
    classes: {
      id: 'I' | 'II' | 'III';
      labelVi: string;
      spaceVi: string;
      difficulty: string;
    }[];
    positions: {
      id: 'A' | 'B' | 'C';
      labelVi: string;
      depthVi: string;
      difficulty: string;
    }[];
  };
  ianRadiologicRiskSigns: {
    signVi: string;
    signEn: string;
    oddsRatioRisk: string;
    cbctIndicationVi: string;
  }[];
  surgicalSteps: {
    stepNumber: number;
    titleVi: string;
    titleEn: string;
    instrumentVi: string;
    keySafetyActionVi: string;
    anatomicalPitfallVi: string;
  }[];
}

export const WISDOM_SURGICAL_DATABASE: WisdomSurgicalData = {
  winterTypes: [
    {
      id: 'mesioangular',
      labelVi: 'Nghiêng gần (Mesioangular)',
      labelEn: 'Mesioangular Impaction',
      angleDegrees: 45,
      frequencyPercent: 43,
      surgicalDifficulty: 'Trung bình',
      difficultyScore: 2,
      sectioningStrategyVi: 'Cắt vát 45 độ chia tách thân răng khỏi chân răng hoặc cắt bỏ múi xa trước khi bẩy.',
      notesVi: 'Phổ biến nhất, thân răng tựa vào mặt xa răng 7 gây sâu cổ răng hoặc tiêu ngót chân răng 7.'
    },
    {
      id: 'vertical',
      labelVi: 'Thẳng đứng (Vertical)',
      labelEn: 'Vertical Impaction',
      angleDegrees: 0,
      frequencyPercent: 38,
      surgicalDifficulty: 'Dễ',
      difficultyScore: 1,
      sectioningStrategyVi: 'Cắt rãnh dọc giữa 2 chân răng (chân gần và chân xa) rồi bẩy từng chân răng riêng biệt.',
      notesVi: 'Thường bị cản trở bởi cành cao xương hàm dưới hoặc trùm lợi (Pericoronitis).'
    },
    {
      id: 'horizontal',
      labelVi: 'Nằm ngang (Horizontal)',
      labelEn: 'Horizontal Impaction',
      angleDegrees: 90,
      frequencyPercent: 13,
      surgicalDifficulty: 'Khó',
      difficultyScore: 3,
      sectioningStrategyVi: 'Cắt rời hoàn toàn thân răng ngang đường cổ răng, gắp thân răng ra ngoài rồi kéo chân răng ra trước.',
      notesVi: 'Mặt nhai húc vuông góc vào chân răng 7. Nguy cơ chóp răng nằm đè lên ống thần kinh IAN rất cao.'
    },
    {
      id: 'distoangular',
      labelVi: 'Nghiêng xa (Distoangular)',
      labelEn: 'Distoangular Impaction',
      angleDegrees: -35,
      frequencyPercent: 6,
      surgicalDifficulty: 'Cực kỳ khó',
      difficultyScore: 4,
      sectioningStrategyVi: 'Cần mở xương mặt xa rất rộng vào cành lên; cắt chia thân răng nhiều mảnh nhỏ.',
      notesVi: 'Đường bẩy nhổ đi ngược vào trong cành cao xương hàm dưới; nguy cơ gãy chân răng và gãy góc hàm cao nhất.'
    }
  ],
  pellGregory: {
    classes: [
      {
        id: 'I',
        labelVi: 'Class I',
        spaceVi: 'Khoảng cách giữa bờ trước cành lên và mặt xa R7 lớn hơn đường kính thân R8 (Đủ chỗ).',
        difficulty: 'Dễ'
      },
      {
        id: 'II',
        labelVi: 'Class II',
        spaceVi: 'Khoảng cách nhỏ hơn đường kính thân R8 (Thiếu chỗ một phần, 1/2 thân răng nằm trong cành lên).',
        difficulty: 'Trung bình'
      },
      {
        id: 'III',
        labelVi: 'Class III',
        spaceVi: 'Toàn bộ thân răng R8 nằm hoàn toàn bên trong cành lên xương hàm dưới.',
        difficulty: 'Khó'
      }
    ],
    positions: [
      {
        id: 'A',
        labelVi: 'Vị trí A',
        depthVi: 'Mặt nhai R8 ngang bằng hoặc cao hơn mặt nhai R7.',
        difficulty: 'Dễ'
      },
      {
        id: 'B',
        labelVi: 'Vị trí B',
        depthVi: 'Mặt nhai R8 nằm giữa mặt nhai và đường cổ răng của R7.',
        difficulty: 'Trung bình'
      },
      {
        id: 'C',
        labelVi: 'Vị trí C',
        depthVi: 'Mặt nhai R8 nằm sâu dưới đường cổ răng của R7.',
        difficulty: 'Khó'
      }
    ]
  },
  ianRadiologicRiskSigns: [
    {
      signVi: 'Vùng thấu quang băng ngang chóp răng (Darkening of root)',
      signEn: 'Darkening of root',
      oddsRatioRisk: 'OR = 15.2 (Nguy cơ đứt/chèn ép thần kinh IAN cao nhất)',
      cbctIndicationVi: 'Bắt buộc chụp CBCT cắt lớp đa lát cắt để đánh giá thành ống thần kinh có bị tiêu xương.'
    },
    {
      signVi: 'Lệch hướng / Uốn cong ống thần kinh (Deflection of canal)',
      signEn: 'Deflection of canal',
      oddsRatioRisk: 'OR = 7.8',
      cbctIndicationVi: 'Ống hàm dưới bị chân răng đẩy chệch hướng; chóp răng có thể móc quanh ống.'
    },
    {
      signVi: 'Thu hẹp lòng ống răng dưới (Narrowing of canal)',
      signEn: 'Narrowing of canal',
      oddsRatioRisk: 'OR = 6.4',
      cbctIndicationVi: 'Ống thần kinh bị chóp chân răng ép dẹt; nguy cơ thiếu máu nuôi thần kinh khi nhổ.'
    },
    {
      signVi: 'Mất viền vỏ xương cản quang của ống (Interruption of white lines)',
      signEn: 'Loss of tramlines',
      oddsRatioRisk: 'OR = 5.6',
      cbctIndicationVi: 'Chóp chân răng tiếp xúc trực tiếp không có vỏ xương ngăn cách với bao bó sợi thần kinh IAN.'
    },
    {
      signVi: 'Chân răng phân đôi ôm trọn ống thần kinh (Bifid apex wrapping canal)',
      signEn: 'Root embracing canal',
      oddsRatioRisk: 'OR = 18.0 (Cực kỳ nguy hiểm nếu nhổ bẩy nguyên khối)',
      cbctIndicationVi: 'Chỉ định phẫu thuật cắt thân răng giữ lại chân (Coronectomy) để bảo tồn thần kinh IAN.'
    }
  ],
  surgicalSteps: [
    {
      stepNumber: 1,
      titleVi: 'Gây tê vùng & Đánh giá vô cảm',
      titleEn: 'Regional Anesthesia & Analgesia',
      instrumentVi: 'Kim nha khoa 27G dài, thuốc tê Articaine 4% 1:100.000 Epinephrine',
      keySafetyActionVi: 'Gây tê thần kinh IAN tại gai Spix kết hợp gây tê thần kinh má ngoài và thần kinh lưỡi.',
      anatomicalPitfallVi: 'Hút ngược (Aspiration) tránh tiêm thuốc tê trực tiếp vào động mạch huyệt răng dưới.'
    },
    {
      stepNumber: 2,
      titleVi: 'Rạch vạt màng xương (Flap Design)',
      titleEn: 'Mucoperiosteal Flap Reflection',
      instrumentVi: 'Dao mổ số 15, cây bóc tách màng xương Molt số 9, cây nâng Howarth',
      keySafetyActionVi: 'Rạch đường viền nướu từ răng 7 ra sau dọc theo bờ trước cành lên hơi chếch ra MẶT NGOÀI.',
      anatomicalPitfallVi: 'TUYỆT ĐỐI KHÔNG rạch lệch về phía trong để tránh đứt thần kinh Lưỡi (Lingual nerve).'
    },
    {
      stepNumber: 3,
      titleVi: 'Mở xương bộc lộ thân răng (Ostectomy)',
      titleEn: 'Bone Guttering',
      instrumentVi: 'Tay khoan phẫu thuật góc 45 độ, mũi khoan tròn carbua số 8, bơm rửa nước muối liên tục',
      keySafetyActionVi: 'Tạo máng xương mặt ngoài và mặt xa thân răng đến tận đường cổ răng (cổ giải phẫu).',
      anatomicalPitfallVi: 'Không dùng tay khoan xịt khí vào ổ răng để phòng ngừa tràn khí dưới da (Subcutaneous emphysema).'
    },
    {
      stepNumber: 4,
      titleVi: 'Cắt chia thân & chân răng (Odontotomy)',
      titleEn: 'Crown & Root Sectioning',
      instrumentVi: 'Mũi khoan phẫu thuật trụ dài 702 hoặc 703 Lindemann',
      keySafetyActionVi: 'Cắt sâu 3/4 chiều dày thân răng, dùng cây bẩy xoay nhẹ để tách rời thân răng làm đôi.',
      anatomicalPitfallVi: 'Không cắt sâu chạm bản xương mặt lưỡi hoặc sàn xương phía dưới để tránh đứt IAN.'
    },
    {
      stepNumber: 5,
      titleVi: 'Bẩy và gắp răng (Elevation & Extraction)',
      titleEn: 'Tooth Elevation',
      instrumentVi: 'Cây bẩy thẳng nhỏ (Straight elevator), cây bẩy khuỷu Cryer cặp trái-phải',
      keySafetyActionVi: 'Đặt điểm tựa vào xương ổ răng, bẩy nhẹ nhàng theo hướng thoát của chân răng.',
      anatomicalPitfallVi: 'Không dùng lực bẩy quá mức đẩy chóp chân răng gãy cắm sâu vào ống thần kinh IAN.'
    },
    {
      stepNumber: 6,
      titleVi: 'Làm sạch ổ răng & Khâu vạt (Debridement & Suture)',
      titleEn: 'Debridement & Closure',
      instrumentVi: 'Cây nạo túi ổ răng Lucas, chỉ khâu Vicryl 4-0 hoặc Silk 3-0, kẹp mang kim Mayo-Hegar',
      keySafetyActionVi: 'Nạo sạch bao mầm răng (follicle), bơm rửa sạch mạt xương bằng NaCl 0.9%, khâu đóng kín vạt.',
      anatomicalPitfallVi: 'Tránh khâu quá sâu vào sàn miệng phía lưỡi để không chèn ép thần kinh lưỡi.'
    }
  ]
};
