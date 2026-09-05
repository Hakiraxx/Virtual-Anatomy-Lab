// Comprehensive Clinical Data for Dental Specimens (Bộ Tiêu Bản Chuyên Sâu RHM)
import { TOOTH_REGISTRY, type ToothRecord } from './ToothRegistry.ts';

// ============================================================================
// 1. TOOTH SPECIMEN & ENDODONTIC DATABASE (ALL 32 TEETH: FDI 11 - 48)
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
  // ==========================================================================
  // CUNG 1: HÀM TRÊN PHẢI (MAXILLARY RIGHT — Q1 — FDI 11 - 18)
  // ==========================================================================
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
    canalNames: ['Ống tủy trung tâm (hoặc 2 ống Ngoài - Trong)'],
    vertucciClass: 'Vertucci Type I (75%), Type II (20%), Type IV (5%)',
    vertucciDescriptionVi: 'Thường 1 chân với 1 ống tủy dẹt hình dải lụa; khoảng 25% có 2 ống tủy riêng biệt hoặc chẽ đôi ở 1/3 chóp.',
    accessCavityShape: 'Hình bầu dục (Oval) thon dài theo chiều ngoài-trong',
    accessCavityDetailsVi: 'Khoan tại trung tâm rãnh giữa mặt nhai, mở rộng theo hướng ngoài-trong giữa 2 đỉnh múi.',
    rubberDamClampVi: 'Clamp #2 hoặc #2A',
    rubberDamClampAlternatives: ['Clamp #0', 'Clamp #1'],
    crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Sàn buồng tủy nằm sâu dưới đường cổ răng, lỗ tủy dẹt rộng ngoài-trong.',
    clinicalRisksVi: ['Thủng thành bên mặt gần/xa do thân răng hẹp theo chiều gần xa', 'Sót ống tủy thứ hai chẽ ở chóp'],
    recommendedAnesthesia: ['Gây tê MSA (Thần kinh huyệt răng trên giữa) hoặc tiêm ngấm tại chỗ']
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
    canalNames: ['Ngoài (Buccal)', 'Khẩu cái / Trong (Palatal)'],
    vertucciClass: 'Vertucci Type IV (>80% có 2 ống tủy và 2 lỗ chóp riêng biệt)',
    vertucciDescriptionVi: 'Đặc trưng giải phẫu quan trọng: Rãnh lõm phát triển ở mặt gần (Mesial concavity). Hơn 85% có 2 chân răng tách biệt.',
    accessCavityShape: 'Hình bầu dục hẹp ngoài-trong',
    accessCavityDetailsVi: 'Định vị giữa múi ngoài và múi trong; cẩn trọng rãnh lõm mặt gần khi dùng mũi khoan mở rộng.',
    rubberDamClampVi: 'Clamp #2 hoặc #2A',
    rubberDamClampAlternatives: ['Clamp #0', 'Clamp #W2'],
    crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Sàn tủy tròn bầu dục với 2 lỗ ống tủy rõ rệt nằm cách nhau khoảng 3-4mm theo chiều ngoài trong.',
    clinicalRisksVi: [
      'Thủng rãnh lõm mặt gần (Mesial concavity perforation) — tai biến thường gặp nhất',
      'Gãy tách chẻ đôi thân răng do áp lực chèn ép cọc chốt'
    ],
    recommendedAnesthesia: ['Gây tê MSA kết hợp tiêm ngấm khẩu cái']
  },
  13: {
    fdi: 13,
    universal: 6,
    palmer: '3┘',
    nameVi: 'Răng nanh hàm trên phải',
    nameEn: 'Maxillary Right Canine (Răng trụ cột cung hàm)',
    quadrant: 1,
    toothType: 'canine',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy lớn trung tâm'],
    vertucciClass: 'Vertucci Type I (100% đơn ống tủy)',
    vertucciDescriptionVi: 'Răng dài nhất trong cung hàm người (chiều dài toàn bộ có thể đạt tới 26-32mm). Chân răng to khỏe hình nón.',
    accessCavityShape: 'Hình bầu dục hoặc hình ngọn lửa ở mặt trong',
    accessCavityDetailsVi: 'Mở ở mặt lưỡi/khẩu cái, mũi khoan đặt nghiêng song song với trục lớn của thân răng.',
    rubberDamClampVi: 'Clamp #2 hoặc #9 (clamp răng trước)',
    rubberDamClampAlternatives: ['Clamp #212', 'Clamp #0'],
    crownDimensionsMm: { height: 10.0, mesiodistal: 7.5, buccolingual: 8.0 },
    rootLengthMm: 17.0,
    pulpChamberFloorAnatomyVi: 'Buồng tủy rộng nhất ở vị trí đường cổ răng, chuyển tiếp mượt mà vào một ống tủy duy nhất thon dần về chóp.',
    clinicalRisksVi: [
      'Chiều dài làm việc vượt quá chiều dài dụng cụ nội nha tiêu chuẩn 25mm (phải dùng file 31mm)',
      'Cong chóp răng về phía xa (distal apical curvature)'
    ],
    recommendedAnesthesia: ['Gây tê ASA (Thần kinh huyệt răng trên trước) hoặc gây tê thần kinh dưới ổ mắt (Infraorbital block)']
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
    canalNames: ['Ống tủy đơn'],
    vertucciClass: 'Vertucci Type I (99%)',
    vertucciDescriptionVi: 'Chân răng mảnh khảnh, 1/3 chóp có độ cong sinh lý rõ rệt về phía xa (distal) và phía trong (palatal) ở >50% trường hợp.',
    accessCavityShape: 'Hình tam giác bo tròn nhỏ hoặc hình bầu dục',
    accessCavityDetailsVi: 'Mở ở mặt vòm miệng phía trên gót răng (cingulum), tránh mài phạm rìa cắn thẩm mỹ.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #210'],
    crownDimensionsMm: { height: 9.0, mesiodistal: 6.5, buccolingual: 6.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy hình tròn thu nhỏ dần, thường có độ cong đột ngột ở 2-3mm cuối của chóp.',
    clinicalRisksVi: [
      'Tạo khấc (ledge) hoặc thủng chóp do dùng trâm cứng thẳng không uốn cong trước khi thăm dò độ cong chóp',
      'Rãnh nứt khẩu cái (Palatoradicular groove) gây viêm nha chu nội nha kết hợp'
    ],
    recommendedAnesthesia: ['Tiêm ngấm tại chỗ đáy hành lang (Infiltration)']
  },
  11: {
    fdi: 11,
    universal: 8,
    palmer: '1┘',
    nameVi: 'Răng cửa giữa hàm trên phải',
    nameEn: 'Maxillary Right Central Incisor',
    quadrant: 1,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm hình nón lớn'],
    vertucciClass: 'Vertucci Type I (100%)',
    vertucciDescriptionVi: 'Răng cửa thẩm mỹ trung tâm, buồng tủy rộng lớn hình tam giác với 2 sừng tủy gần-xa rõ rệt ở người trẻ.',
    accessCavityShape: 'Hình tam giác đáy hướng rìa cắn, đỉnh hướng gót răng',
    accessCavityDetailsVi: 'Phải lấy sạch mô tủy ở 2 sừng tủy gần và xa để tránh đổi màu thân răng về sau.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #0', 'Clamp #211'],
    crownDimensionsMm: { height: 10.5, mesiodistal: 8.5, buccolingual: 7.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Không có sàn tủy riêng biệt; buồng tủy chuyển tiếp thẳng vào ống tủy hình nón tròn đều.',
    clinicalRisksVi: [
      'Đổi màu xám đen thân răng sau nội nha do sót sừng tủy hoặc chất hàn bít',
      'Thủng thành ngoài thân răng do đặt mũi khoan vuông góc với trục thân răng quá lâu'
    ],
    recommendedAnesthesia: ['Tiêm ngấm tại chỗ đáy hành lang + Tiêm lỗ răng cửa (Nasopalatine block)']
  },

  // ==========================================================================
  // CUNG 2: HÀM TRÊN TRÁI (MAXILLARY LEFT — Q2 — FDI 21 - 28)
  // ==========================================================================
  21: {
    fdi: 21,
    universal: 9,
    palmer: '└1',
    nameVi: 'Răng cửa giữa hàm trên trái',
    nameEn: 'Maxillary Left Central Incisor',
    quadrant: 2,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm hình nón lớn'],
    vertucciClass: 'Vertucci Type I (100%)',
    vertucciDescriptionVi: 'Đối xứng qua đường giữa với R11. Buồng tủy lớn hình tam giác với sừng tủy gần và xa phát triển.',
    accessCavityShape: 'Hình tam giác đáy hướng rìa cắn, đỉnh hướng gót răng',
    accessCavityDetailsVi: 'Mở từ mặt trong vòm miệng, lấy sạch hoàn toàn sừng tủy gần-xa để bảo vệ thẩm mỹ men răng.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #0', 'Clamp #211'],
    crownDimensionsMm: { height: 10.5, mesiodistal: 8.5, buccolingual: 7.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Buồng tủy chuyển tiếp mượt mà vào một ống tủy hình nón thon đều về phía chóp.',
    clinicalRisksVi: ['Đổi màu thân răng sau điều trị nội nha nếu không làm sạch sừng tủy', 'Thủng mặt ngoài thân răng'],
    recommendedAnesthesia: ['Tiêm ngấm tại chỗ đáy hành lang + Gây tê lỗ răng cửa (Nasopalatine block)']
  },
  22: {
    fdi: 22,
    universal: 10,
    palmer: '└2',
    nameVi: 'Răng cửa bên hàm trên trái',
    nameEn: 'Maxillary Left Lateral Incisor',
    quadrant: 2,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy đơn'],
    vertucciClass: 'Vertucci Type I (99%)',
    vertucciDescriptionVi: 'Đối xứng với R12. Chân răng thường có độ cong chóp về phía xa và phía trong ở hơn 50% cá thể.',
    accessCavityShape: 'Hình bầu dục hoặc tam giác nhỏ',
    accessCavityDetailsVi: 'Mở tại mặt trong phía trên gót răng, giữ gìn rìa cắn thẩm mỹ.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #210'],
    crownDimensionsMm: { height: 9.0, mesiodistal: 6.5, buccolingual: 6.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy thu nhỏ dần về chóp, thường uốn cong về phía xa ở 2-3mm cuối.',
    clinicalRisksVi: ['Tạo khấc hoặc thủng chóp do không uốn cong trâm theo độ cong giải phẫu', 'Rãnh nứt khẩu cái ngầm'],
    recommendedAnesthesia: ['Tiêm ngấm đáy hành lang tại chóp chân răng']
  },
  23: {
    fdi: 23,
    universal: 11,
    palmer: '└3',
    nameVi: 'Răng nanh hàm trên trái',
    nameEn: 'Maxillary Left Canine',
    quadrant: 2,
    toothType: 'canine',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy lớn trung tâm'],
    vertucciClass: 'Vertucci Type I (100%)',
    vertucciDescriptionVi: 'Đối xứng với R13. Răng trụ vững chắc nhất cung hàm trên, chân răng dài (lên tới 26-30mm).',
    accessCavityShape: 'Hình bầu dục / ngọn lửa theo trục dọc',
    accessCavityDetailsVi: 'Khoan mở ở mặt trong vòm miệng nghiêng theo trục răng, mở rộng giải phóng gờ vai trong.',
    rubberDamClampVi: 'Clamp #2 hoặc #9',
    rubberDamClampAlternatives: ['Clamp #212', 'Clamp #0'],
    crownDimensionsMm: { height: 10.0, mesiodistal: 7.5, buccolingual: 8.0 },
    rootLengthMm: 17.0,
    pulpChamberFloorAnatomyVi: 'Chân răng hình nón dài, chuyển tiếp ống tủy rộng rãi ở cổ răng thuôn dần về chóp.',
    clinicalRisksVi: ['Thiếu chiều dài dụng cụ nếu trâm ngắn hơn 25mm', 'Cong chóp răng về phía xa'],
    recommendedAnesthesia: ['Gây tê ASA hoặc gây tê thần kinh dưới ổ mắt (Infraorbital block)']
  },
  24: {
    fdi: 24,
    universal: 12,
    palmer: '└4',
    nameVi: 'Răng cối nhỏ thứ nhất hàm trên trái',
    nameEn: 'Maxillary Left 1st Premolar',
    quadrant: 2,
    toothType: 'premolar',
    rootCount: 2,
    canalCount: 2,
    canalNames: ['Ngoài (Buccal)', 'Khẩu cái (Palatal)'],
    vertucciClass: 'Vertucci Type IV (>80% có 2 ống tủy riêng biệt)',
    vertucciDescriptionVi: 'Đối xứng với R14. Có rãnh lõm sâu ở mặt gần (Mesial concavity), đa số có 2 chân răng tách biệt.',
    accessCavityShape: 'Hình bầu dục hẹp ngoài-trong',
    accessCavityDetailsVi: 'Mở giữa 2 múi ngoài và trong, lưu ý cẩn trọng rãnh lõm mặt gần.',
    rubberDamClampVi: 'Clamp #2 hoặc #2A',
    rubberDamClampAlternatives: ['Clamp #0', 'Clamp #W2'],
    crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Sàn tủy tròn bầu dục với 2 lỗ ống tủy ngoài và trong cách nhau 3-4mm.',
    clinicalRisksVi: ['Thủng thành lõm mặt gần (Mesial concavity perforation)', 'Gãy chẻ dọc thân răng'],
    recommendedAnesthesia: ['Gây tê MSA kết hợp tiêm ngấm khẩu cái']
  },
  25: {
    fdi: 25,
    universal: 13,
    palmer: '└5',
    nameVi: 'Răng cối nhỏ thứ hai hàm trên trái',
    nameEn: 'Maxillary Left 2nd Premolar',
    quadrant: 2,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm (hoặc 2 ống Ngoài - Trong)'],
    vertucciClass: 'Vertucci Type I (75%), Type II (20%)',
    vertucciDescriptionVi: 'Đối xứng với R15. Thường 1 chân với 1 ống tủy dẹt hình dải lụa; khoảng 20-25% chẽ 2 ống.',
    accessCavityShape: 'Hình bầu dục thon dài ngoài-trong',
    accessCavityDetailsVi: 'Mở tại rãnh trung tâm mặt nhai giữa hai đỉnh múi ngoài và trong.',
    rubberDamClampVi: 'Clamp #2 hoặc #2A',
    rubberDamClampAlternatives: ['Clamp #0', 'Clamp #1'],
    crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 9.0 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Lỗ tủy dẹt rộng ngoài-trong tại trung tâm sàn buồng tủy.',
    clinicalRisksVi: ['Thủng thành bên mặt gần/xa', 'Sót ống tủy thứ hai chẽ ở chóp'],
    recommendedAnesthesia: ['Gây tê MSA hoặc tiêm ngấm tại chỗ']
  },
  26: {
    fdi: 26,
    universal: 14,
    palmer: '└6',
    nameVi: 'Răng cối lớn thứ nhất hàm trên trái',
    nameEn: 'Maxillary Left 1st Molar (Chìa khóa khớp cắn)',
    quadrant: 2,
    toothType: 'molar',
    rootCount: 3,
    canalCount: 4,
    canalNames: ['Gần-ngoài 1 (MB1)', 'Gần-ngoài 2 (MB2)', 'Xa-ngoài (DB)', 'Khẩu cái (P)'],
    vertucciClass: 'Vertucci Type II/IV cho chân gần-ngoài (MB2 hiện diện 70-90%)',
    vertucciDescriptionVi: 'Đối xứng với R16. Chân gần ngoài có 2 ống tủy (MB1 và MB2). Chân khẩu cái to dài nhất cong về phía ngoài.',
    accessCavityShape: 'Hình tứ giác hoặc tam giác bo tròn lệch gần',
    accessCavityDetailsVi: 'Tránh mài phạm gờ chéo mặt nhai, mở rộng về phía gần-trong để bộc lộ đường vào MB2.',
    rubberDamClampVi: 'Clamp #14A hoặc #56',
    rubberDamClampAlternatives: ['Clamp #8A', 'Clamp #7'],
    crownDimensionsMm: { height: 7.5, mesiodistal: 10.0, buccolingual: 11.5 },
    rootLengthMm: 12.5,
    pulpChamberFloorAnatomyVi: 'Sàn tủy có các rãnh phát triển nối lỗ MB1, DB và P. Lỗ MB2 nằm trên đường nối từ MB1 tới Palatal.',
    clinicalRisksVi: ['Bỏ sót ống tủy phụ MB2', 'Thủng màng xoang hàm khi nong rửa chóp chân khẩu cái'],
    recommendedAnesthesia: ['Gây tê PSA kết hợp MSA + Gây tê thần kinh khẩu cái lớn (GP)']
  },
  27: {
    fdi: 27,
    universal: 15,
    palmer: '└7',
    nameVi: 'Răng cối lớn thứ hai hàm trên trái',
    nameEn: 'Maxillary Left 2nd Molar',
    quadrant: 2,
    toothType: 'molar',
    rootCount: 3,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Xa-ngoài (DB)', 'Khẩu cái (P)'],
    vertucciClass: 'Vertucci Type I (MB 85%, DB 98%, P 100%)',
    vertucciDescriptionVi: 'Đối xứng với R17. 3 chân răng khép sát nhau hơn R26, các ống tủy nằm trên tam giác nhọn.',
    accessCavityShape: 'Hình tam giác nhọn lệch gần',
    accessCavityDetailsVi: 'Hẹp hơn R26 theo chiều gần xa, nằm gọn ở 2/3 gần của mặt nhai.',
    rubberDamClampVi: 'Clamp #14 hoặc #8',
    rubberDamClampAlternatives: ['Clamp #7', 'Clamp #56'],
    crownDimensionsMm: { height: 7.0, mesiodistal: 9.0, buccolingual: 11.0 },
    rootLengthMm: 11.5,
    pulpChamberFloorAnatomyVi: 'Sàn tủy hình tam giác nhọn, lỗ ống khẩu cái to nhất, lỗ MB và DB gần nhau.',
    clinicalRisksVi: ['Thủng sàn buồng tủy', 'Sót ống tủy MB2'],
    recommendedAnesthesia: ['Gây tê PSA kết hợp gây tê GP']
  },
  28: {
    fdi: 28,
    universal: 16,
    palmer: '└8',
    nameVi: 'Răng khôn hàm trên trái',
    nameEn: 'Maxillary Left 3rd Molar',
    quadrant: 2,
    toothType: 'molar',
    rootCount: 3,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Xa-ngoài (DB)', 'Khẩu cái (P)'],
    vertucciClass: 'Biến thiên cao (Type I, II, hoặc hợp nhất)',
    vertucciDescriptionVi: 'Đối xứng với R18. Hình thái chân răng và ống tủy bất thường cao, thường chụm hoặc cong gập về phía xa.',
    accessCavityShape: 'Hình tam giác hoặc bầu dục lệch gần',
    accessCavityDetailsVi: 'Đáy tam giác hướng ngoài, đỉnh hướng trong.',
    rubberDamClampVi: 'Clamp #14A hoặc #8A',
    rubberDamClampAlternatives: ['Clamp #7', 'Clamp #W8A'],
    crownDimensionsMm: { height: 6.5, mesiodistal: 8.5, buccolingual: 10.0 },
    rootLengthMm: 11.0,
    pulpChamberFloorAnatomyVi: 'Sàn buồng tủy thu hẹp, các lỗ tủy nằm gần nhau hoặc hợp nhất.',
    clinicalRisksVi: ['Gãy chóp chân răng cong khi nhổ', 'Đẩy vào xoang hàm trên', 'Gãy củ hàm trên'],
    recommendedAnesthesia: ['Gây tê PSA + Gây tê thần kinh khẩu cái lớn (GP)']
  },

  // ==========================================================================
  // CUNG 3: HÀM DƯỚI TRÁI (MANDIBULAR LEFT — Q3 — FDI 31 - 38)
  // ==========================================================================
  31: {
    fdi: 31,
    universal: 24,
    palmer: '┌1',
    nameVi: 'Răng cửa giữa hàm dưới trái',
    nameEn: 'Mandibular Left Central Incisor',
    quadrant: 3,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy dẹt ngoài-trong (có thể chẽ 2 ống Ngoài - Trong)'],
    vertucciClass: 'Vertucci Type I (70%), Type III (25%)',
    vertucciDescriptionVi: 'Răng nhỏ nhất trong cung hàm người. Chân răng dẹt rõ rệt theo chiều gần xa, có rãnh lõm ở cả mặt gần và xa.',
    accessCavityShape: 'Hình bầu dục hẹp ngoài-trong',
    accessCavityDetailsVi: 'Mở từ mặt lưỡi phía trên cingulum, phải mở rộng về phía gót răng để phát hiện ống tủy mặt lưỡi (Lingual canal).',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #210'],
    crownDimensionsMm: { height: 9.5, mesiodistal: 5.0, buccolingual: 6.0 },
    rootLengthMm: 12.5,
    pulpChamberFloorAnatomyVi: 'Ống tủy rất dẹt theo chiều ngoài trong, có thể chia đôi thành 2 nhánh chạy song song rồi nhập lại ở chóp.',
    clinicalRisksVi: ['Bỏ sót ống tủy thứ 2 ở mặt lưỡi (tới 30-40% trường hợp)', 'Thủng thành chân răng do rãnh lõm gần/xa'],
    recommendedAnesthesia: ['Gây tê thần kinh huyệt răng dưới (IAN Block) hoặc tiêm ngấm bổ sung đáy hành lang']
  },
  32: {
    fdi: 32,
    universal: 23,
    palmer: '┌2',
    nameVi: 'Răng cửa bên hàm dưới trái',
    nameEn: 'Mandibular Left Lateral Incisor',
    quadrant: 3,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy dẹt ngoài-trong'],
    vertucciClass: 'Vertucci Type I (60%), Type III (35%)',
    vertucciDescriptionVi: 'Lớn hơn răng cửa giữa một chút, chân răng dẹt gần xa, tỷ lệ có 2 ống tủy (Ngoài và Trong) lên tới 40%.',
    accessCavityShape: 'Hình bầu dục ngoài-trong',
    accessCavityDetailsVi: 'Mở rộng về phía cingulum ở mặt lưỡi để không bỏ sót ống tủy trong.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #210'],
    crownDimensionsMm: { height: 9.5, mesiodistal: 5.5, buccolingual: 6.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy dẹt hình dải lụa, dễ chẽ đôi ở 1/3 giữa chân răng.',
    clinicalRisksVi: ['Sót ống tủy mặt lưỡi', 'Thủng thành chân răng hẹp'],
    recommendedAnesthesia: ['Gây tê IAN kết hợp tiêm ngấm đáy hành lang']
  },
  33: {
    fdi: 33,
    universal: 22,
    palmer: '┌3',
    nameVi: 'Răng nanh hàm dưới trái',
    nameEn: 'Mandibular Left Canine',
    quadrant: 3,
    toothType: 'canine',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy lớn trung tâm (có thể 2 ống / 2 chân)'],
    vertucciClass: 'Vertucci Type I (90%), Type II/IV (10%)',
    vertucciDescriptionVi: 'Răng nanh khỏe của hàm dưới, khoảng 5-10% có 2 chân riêng biệt (chân ngoài và chân trong) hoặc 2 ống tủy.',
    accessCavityShape: 'Hình bầu dục / ngọn lửa theo trục dọc',
    accessCavityDetailsVi: 'Mở ở mặt lưỡi, mở rộng về phía cổ răng để tiếp cận ống tủy thẳng hàng.',
    rubberDamClampVi: 'Clamp #2 hoặc #9',
    rubberDamClampAlternatives: ['Clamp #212', 'Clamp #0'],
    crownDimensionsMm: { height: 11.0, mesiodistal: 7.0, buccolingual: 7.5 },
    rootLengthMm: 15.5,
    pulpChamberFloorAnatomyVi: 'Ống tủy lớn hình bầu dục rộng ngoài trong, thon dần về chóp.',
    clinicalRisksVi: ['Bỏ sót chân răng / ống tủy mặt lưỡi phụ', 'Cong chóp răng về phía xa'],
    recommendedAnesthesia: ['Gây tê IAN Block hoặc tiêm ngấm đáy hành lang bờ ngoài']
  },
  34: {
    fdi: 34,
    universal: 21,
    palmer: '┌4',
    nameVi: 'Răng cối nhỏ thứ nhất hàm dưới trái',
    nameEn: 'Mandibular Left 1st Premolar',
    quadrant: 3,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm (có thể chẽ nhánh ở 1/3 chóp)'],
    vertucciClass: 'Vertucci Type I (75%), Type IV/V (25%)',
    vertucciDescriptionVi: 'Thân răng nghiêng nhiều về phía lưỡi so với chân răng. Thách thức nội nha do ống tủy hay chẽ đôi ở 1/3 chóp.',
    accessCavityShape: 'Hình bầu dục tròn lệch ngoài',
    accessCavityDetailsVi: 'Khoan lệch về phía múi ngoài (múi chức năng) để bù lại độ nghiêng trong của thân răng.',
    rubberDamClampVi: 'Clamp #2 hoặc #0',
    rubberDamClampAlternatives: ['Clamp #2A', 'Clamp #1'],
    crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 7.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy chính tròn ở cổ răng, có thể phân nhánh phức tạp thành 2 hoặc 3 ống ở 1/3 chóp.',
    clinicalRisksVi: [
      'Thủng thành lưỡi thân răng do không chú ý độ nghiêng trong sinh lý của thân răng',
      'Không tiếp cận được ống tủy chẽ ở 1/3 chóp'
    ],
    recommendedAnesthesia: ['Gây tê thần kinh huyệt răng dưới (IAN Block) hoặc gây tê cằm (Mental Block)']
  },
  35: {
    fdi: 35,
    universal: 20,
    palmer: '┌5',
    nameVi: 'Răng cối nhỏ thứ hai hàm dưới trái',
    nameEn: 'Mandibular Left 2nd Premolar',
    quadrant: 3,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm'],
    vertucciClass: 'Vertucci Type I (85%), Type IV (12%)',
    vertucciDescriptionVi: 'Thân răng đứng thẳng hơn R34, thường có 2 hoặc 3 múi. Đa số có 1 chân và 1 ống tủy duy nhất.',
    accessCavityShape: 'Hình bầu dục tròn ở giữa mặt nhai',
    accessCavityDetailsVi: 'Mở tại trung tâm rãnh giữa mặt nhai, ít lệch ngoài hơn so với R34.',
    rubberDamClampVi: 'Clamp #2 hoặc #0',
    rubberDamClampAlternatives: ['Clamp #2A', 'Clamp #1'],
    crownDimensionsMm: { height: 8.0, mesiodistal: 7.0, buccolingual: 8.0 },
    rootLengthMm: 14.5,
    pulpChamberFloorAnatomyVi: 'Sàn tủy tròn đều ở cổ răng, chuyển tiếp êm vào ống tủy trung tâm.',
    clinicalRisksVi: ['Gần lỗ cằm (Mental foramen) khi can thiệp phẫu thuật chóp'],
    recommendedAnesthesia: ['Gây tê thần kinh IAN hoặc gây tê lỗ cằm']
  },
  36: {
    fdi: 36,
    universal: 19,
    palmer: '┌6',
    nameVi: 'Răng cối lớn thứ nhất hàm dưới trái',
    nameEn: 'Mandibular Left 1st Molar (Chìa khóa khớp cắn dưới)',
    quadrant: 3,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 4,
    canalNames: ['Gần-ngoài (MB)', 'Gần-trong (ML)', 'Xa-ngoài (DB)', 'Xa-trong (DL)'],
    vertucciClass: 'Chân gần: Vertucci Type IV; Chân xa: Vertucci Type I hoặc II',
    vertucciDescriptionVi: '2 chân riêng biệt: Chân gần dẹt rộng theo chiều ngoài trong chứa 2 ống tủy riêng biệt. Chân xa chứa 1 hoặc 2 ống tủy.',
    accessCavityShape: 'Hình thang hoặc hình chữ nhật lệch gần',
    accessCavityDetailsVi: 'Đáy lớn hướng về phía gần, đáy nhỏ hướng về phía xa; mở rộng về phía gần-trong để định vị ống ML.',
    rubberDamClampVi: 'Clamp #56 hoặc #14A',
    rubberDamClampAlternatives: ['Clamp #7', 'Clamp #8A'],
    crownDimensionsMm: { height: 7.5, mesiodistal: 11.0, buccolingual: 10.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Sàn tủy màu xám tối hình chữ nhật, có các rãnh phát triển nối các lỗ tủy. Lỗ ML thường nằm dưới một gờ ngà bảo vệ.',
    clinicalRisksVi: [
      'Bỏ sót ống tủy giữa gần (Middle Mesial canal - MM)',
      'Bỏ sót chân răng xa trong phụ (Radix Entomolaris - RE)',
      'Thủng thành lõm ở mặt xa chân gần (Strip perforation)'
    ],
    recommendedAnesthesia: ['Gây tê thần kinh huyệt răng dưới (IAN Block) tại gai Spix', 'Gây tê thần kinh má ngoài (Long Buccal)']
  },
  37: {
    fdi: 37,
    universal: 18,
    palmer: '┌7',
    nameVi: 'Răng cối lớn thứ hai hàm dưới trái',
    nameEn: 'Mandibular Left 2nd Molar',
    quadrant: 3,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Gần-trong (ML)', 'Xa (D)'],
    vertucciClass: 'Vertucci Type II/IV ở chân gần, Type I chân xa (Tỷ lệ ống tủy chữ C 10-30%)',
    vertucciDescriptionVi: 'Thường có 2 chân răng gần nhau hơn R36. Đặc biệt ở người châu Á có tỷ lệ cao ống tủy hình chữ C (C-shaped canal).',
    accessCavityShape: 'Hình thang hoặc chữ nhật lệch gần',
    accessCavityDetailsVi: 'Nếu có hình thái chữ C, xoang mở tủy nối liền hình cung bán nguyệt từ mặt gần ra mặt xa qua phía lưỡi.',
    rubberDamClampVi: 'Clamp #7 hoặc #14',
    rubberDamClampAlternatives: ['Clamp #56', 'Clamp #8'],
    crownDimensionsMm: { height: 7.0, mesiodistal: 10.5, buccolingual: 10.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Sàn tủy hình thang, khoảng cách giữa 2 lỗ tủy gần hẹp hơn so với R36.',
    clinicalRisksVi: ['Thủng thành dẹt mỏng trong ống tủy hình chữ C', 'Sót mô tủy ở các eo nối (isthmus)'],
    recommendedAnesthesia: ['Gây tê thần kinh IAN tại gai Spix + Gây tê thần kinh má ngoài']
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
  },

  // ==========================================================================
  // CUNG 4: HÀM DƯỚI PHẢI (MANDIBULAR RIGHT — Q4 — FDI 41 - 48)
  // ==========================================================================
  41: {
    fdi: 41,
    universal: 25,
    palmer: '1┐',
    nameVi: 'Răng cửa giữa hàm dưới phải',
    nameEn: 'Mandibular Right Central Incisor',
    quadrant: 4,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy dẹt ngoài-trong (có thể chẽ 2 ống Ngoài - Trong)'],
    vertucciClass: 'Vertucci Type I (70%), Type III (25%)',
    vertucciDescriptionVi: 'Đối xứng với R31. Chân răng dẹt rõ rệt gần xa, tỷ lệ có 2 ống tủy (Ngoài và Trong) lên tới 30-40%.',
    accessCavityShape: 'Hình bầu dục hẹp ngoài-trong',
    accessCavityDetailsVi: 'Mở ở mặt lưỡi phía trên cingulum, phải mở rộng về phía gót răng để phát hiện ống tủy mặt lưỡi.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #210'],
    crownDimensionsMm: { height: 9.5, mesiodistal: 5.0, buccolingual: 6.0 },
    rootLengthMm: 12.5,
    pulpChamberFloorAnatomyVi: 'Ống tủy dẹt ngoài-trong, có thể chia đôi thành 2 nhánh chạy song song rồi nhập lại ở chóp.',
    clinicalRisksVi: ['Bỏ sót ống tủy thứ hai ở mặt lưỡi', 'Thủng thành bên chân răng do rãnh lõm'],
    recommendedAnesthesia: ['Gây tê thần kinh IAN Block hoặc tiêm ngấm bổ sung đáy hành lang']
  },
  42: {
    fdi: 42,
    universal: 26,
    palmer: '2┐',
    nameVi: 'Răng cửa bên hàm dưới phải',
    nameEn: 'Mandibular Right Lateral Incisor',
    quadrant: 4,
    toothType: 'incisor',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy dẹt ngoài-trong'],
    vertucciClass: 'Vertucci Type I (60%), Type III (35%)',
    vertucciDescriptionVi: 'Đối xứng với R32. Lớn hơn răng cửa giữa, tỷ lệ có 2 ống tủy (Ngoài và Trong) lên tới 40%.',
    accessCavityShape: 'Hình bầu dục ngoài-trong',
    accessCavityDetailsVi: 'Mở rộng về phía cingulum ở mặt lưỡi để không bỏ sót ống tủy trong.',
    rubberDamClampVi: 'Clamp #9 hoặc #212',
    rubberDamClampAlternatives: ['Clamp #00', 'Clamp #210'],
    crownDimensionsMm: { height: 9.5, mesiodistal: 5.5, buccolingual: 6.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy dẹt hình dải lụa, dễ chẽ đôi ở 1/3 giữa chân răng.',
    clinicalRisksVi: ['Sót ống tủy mặt lưỡi', 'Thủng thành chân răng hẹp'],
    recommendedAnesthesia: ['Gây tê IAN kết hợp tiêm ngấm đáy hành lang']
  },
  43: {
    fdi: 43,
    universal: 27,
    palmer: '3┐',
    nameVi: 'Răng nanh hàm dưới phải',
    nameEn: 'Mandibular Right Canine',
    quadrant: 4,
    toothType: 'canine',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy lớn trung tâm (có thể 2 ống / 2 chân)'],
    vertucciClass: 'Vertucci Type I (90%), Type II/IV (10%)',
    vertucciDescriptionVi: 'Đối xứng với R33. Răng nanh khỏe của hàm dưới phải, khoảng 5-10% có 2 chân riêng biệt hoặc 2 ống tủy.',
    accessCavityShape: 'Hình bầu dục / ngọn lửa theo trục dọc',
    accessCavityDetailsVi: 'Mở ở mặt lưỡi, mở rộng về phía cổ răng để tiếp cận ống tủy thẳng hàng.',
    rubberDamClampVi: 'Clamp #2 hoặc #9',
    rubberDamClampAlternatives: ['Clamp #212', 'Clamp #0'],
    crownDimensionsMm: { height: 11.0, mesiodistal: 7.0, buccolingual: 7.5 },
    rootLengthMm: 15.5,
    pulpChamberFloorAnatomyVi: 'Ống tủy lớn hình bầu dục rộng ngoài trong, thon dần về chóp.',
    clinicalRisksVi: ['Bỏ sót chân răng / ống tủy mặt lưỡi phụ', 'Cong chóp răng về phía xa'],
    recommendedAnesthesia: ['Gây tê IAN Block hoặc tiêm ngấm đáy hành lang bờ ngoài']
  },
  44: {
    fdi: 44,
    universal: 28,
    palmer: '4┐',
    nameVi: 'Răng cối nhỏ thứ nhất hàm dưới phải',
    nameEn: 'Mandibular Right 1st Premolar',
    quadrant: 4,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm (có thể chẽ nhánh ở 1/3 chóp)'],
    vertucciClass: 'Vertucci Type I (75%), Type IV/V (25%)',
    vertucciDescriptionVi: 'Đối xứng với R34. Thân răng nghiêng nhiều về phía lưỡi. Thách thức nội nha do ống tủy hay chẽ đôi ở 1/3 chóp.',
    accessCavityShape: 'Hình bầu dục tròn lệch ngoài',
    accessCavityDetailsVi: 'Khoan lệch về phía múi ngoài để bù lại độ nghiêng trong của thân răng.',
    rubberDamClampVi: 'Clamp #2 hoặc #0',
    rubberDamClampAlternatives: ['Clamp #2A', 'Clamp #1'],
    crownDimensionsMm: { height: 8.5, mesiodistal: 7.0, buccolingual: 7.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Ống tủy chính tròn ở cổ răng, có thể phân nhánh phức tạp thành 2 hoặc 3 ống ở 1/3 chóp.',
    clinicalRisksVi: ['Thủng thành lưỡi thân răng do độ nghiêng trong', 'Không tiếp cận được ống tủy chẽ ở 1/3 chóp'],
    recommendedAnesthesia: ['Gây tê thần kinh huyệt răng dưới (IAN Block) hoặc gây tê cằm (Mental Block)']
  },
  45: {
    fdi: 45,
    universal: 29,
    palmer: '5┐',
    nameVi: 'Răng cối nhỏ thứ hai hàm dưới phải',
    nameEn: 'Mandibular Right 2nd Premolar',
    quadrant: 4,
    toothType: 'premolar',
    rootCount: 1,
    canalCount: 1,
    canalNames: ['Ống tủy trung tâm'],
    vertucciClass: 'Vertucci Type I (85%), Type IV (12%)',
    vertucciDescriptionVi: 'Đối xứng với R35. Thân răng đứng thẳng hơn R44, thường có 2 hoặc 3 múi. Đa số có 1 chân và 1 ống tủy duy nhất.',
    accessCavityShape: 'Hình bầu dục tròn ở giữa mặt nhai',
    accessCavityDetailsVi: 'Mở tại trung tâm rãnh giữa mặt nhai, ít lệch ngoài hơn so với R44.',
    rubberDamClampVi: 'Clamp #2 hoặc #0',
    rubberDamClampAlternatives: ['Clamp #2A', 'Clamp #1'],
    crownDimensionsMm: { height: 8.0, mesiodistal: 7.0, buccolingual: 8.0 },
    rootLengthMm: 14.5,
    pulpChamberFloorAnatomyVi: 'Sàn tủy tròn đều ở cổ răng, chuyển tiếp êm vào ống tủy trung tâm.',
    clinicalRisksVi: ['Gần lỗ cằm (Mental foramen) khi can thiệp phẫu thuật chóp'],
    recommendedAnesthesia: ['Gây tê thần kinh IAN hoặc gây tê lỗ cằm']
  },
  46: {
    fdi: 46,
    universal: 30,
    palmer: '6┐',
    nameVi: 'Răng cối lớn thứ nhất hàm dưới phải',
    nameEn: 'Mandibular Right 1st Molar (Chìa khóa khớp cắn dưới)',
    quadrant: 4,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 4,
    canalNames: ['Gần-ngoài (MB)', 'Gần-trong (ML)', 'Xa-ngoài (DB)', 'Xa-trong (DL)'],
    vertucciClass: 'Chân gần: Vertucci Type IV; Chân xa: Vertucci Type I hoặc II',
    vertucciDescriptionVi: '2 chân riêng biệt: Chân gần dẹt rộng theo chiều ngoài trong chứa 2 ống tủy riêng biệt. Chân xa chứa 1 hoặc 2 ống tủy.',
    accessCavityShape: 'Hình thang hoặc hình chữ nhật lệch gần',
    accessCavityDetailsVi: 'Đáy lớn hướng về phía gần, đáy nhỏ hướng về phía xa; mở rộng về phía gần-trong để định vị ống ML.',
    rubberDamClampVi: 'Clamp #56 hoặc #14A',
    rubberDamClampAlternatives: ['Clamp #7', 'Clamp #8A'],
    crownDimensionsMm: { height: 7.5, mesiodistal: 11.0, buccolingual: 10.5 },
    rootLengthMm: 14.0,
    pulpChamberFloorAnatomyVi: 'Sàn tủy màu xám tối hình chữ nhật, có các rãnh phát triển nối các lỗ tủy. Lỗ ML thường nằm dưới một gờ ngà bảo vệ.',
    clinicalRisksVi: [
      'Bỏ sót ống tủy giữa gần (Middle Mesial canal - MM)',
      'Bỏ sót chân răng xa trong phụ (Radix Entomolaris - RE)',
      'Thủng thành lõm ở mặt xa chân gần (Strip perforation)'
    ],
    recommendedAnesthesia: ['Gây tê thần kinh huyệt răng dưới (IAN Block) tại gai Spix', 'Gây tê thần kinh má ngoài (Long Buccal)']
  },
  47: {
    fdi: 47,
    universal: 31,
    palmer: '7┐',
    nameVi: 'Răng cối lớn thứ hai hàm dưới phải',
    nameEn: 'Mandibular Right 2nd Molar',
    quadrant: 4,
    toothType: 'molar',
    rootCount: 2,
    canalCount: 3,
    canalNames: ['Gần-ngoài (MB)', 'Gần-trong (ML)', 'Xa (D)'],
    vertucciClass: 'Vertucci Type II/IV ở chân gần, Type I chân xa (C-shaped 10-30%)',
    vertucciDescriptionVi: 'Đối xứng với R37. Thường có 2 chân răng gần nhau hơn R46. Tỷ lệ có ống tủy hình chữ C (C-shaped) khoảng 15-30% ở người châu Á.',
    accessCavityShape: 'Hình thang hoặc chữ nhật lệch gần',
    accessCavityDetailsVi: 'Nếu có hình thái chữ C, xoang mở tủy nối liền hình cung bán nguyệt từ mặt gần ra mặt xa.',
    rubberDamClampVi: 'Clamp #7 hoặc #14',
    rubberDamClampAlternatives: ['Clamp #56', 'Clamp #8'],
    crownDimensionsMm: { height: 7.0, mesiodistal: 10.5, buccolingual: 10.0 },
    rootLengthMm: 13.0,
    pulpChamberFloorAnatomyVi: 'Sàn tủy hình thang, khoảng cách giữa 2 lỗ tủy gần hẹp hơn so với R46.',
    clinicalRisksVi: ['Thủng thành dẹt mỏng trong ống tủy hình chữ C', 'Sót mô tủy ở các eo nối (isthmus)'],
    recommendedAnesthesia: ['Gây tê thần kinh IAN tại gai Spix + Gây tê thần kinh má ngoài']
  },
  48: {
    fdi: 48,
    universal: 32,
    palmer: '8┐',
    nameVi: 'Răng khôn hàm dưới phải',
    nameEn: 'Mandibular Right 3rd Molar',
    quadrant: 4,
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

/**
 * Authoritative specimen detail resolver: guarantees exact 1-to-1 matching for all 32 teeth (FDI 11–48).
 * Never falls back to a different tooth if the requested tooth exists in TOOTH_REGISTRY.
 */
export function getDentalSpecimen(identifier: number | string): ToothSpecimenDetail {
  const fdi = typeof identifier === 'number'
    ? identifier
    : parseInt(String(identifier).replace(/[^0-9]/g, ''), 10);

  if (DENTAL_SPECIMENS_DATABASE[fdi]) {
    return DENTAL_SPECIMENS_DATABASE[fdi];
  }

  const record: ToothRecord | undefined = TOOTH_REGISTRY[fdi];
  if (record) {
    const isMolar = record.toothClass === 'MOLAR';
    const isPremolar = record.toothClass === 'PREMOLAR';
    const isCanine = record.toothClass === 'CANINE';
    const toothType: 'incisor' | 'canine' | 'premolar' | 'molar' =
      isMolar ? 'molar' : isPremolar ? 'premolar' : isCanine ? 'canine' : 'incisor';

    return {
      fdi: record.fdi,
      universal: record.universalNumber,
      palmer: record.palmer,
      nameVi: record.nameVi,
      nameEn: record.nameEn,
      quadrant: record.quadrant,
      toothType,
      rootCount: record.morphology.rootCount,
      canalCount: record.morphology.canalCount,
      canalNames: record.morphology.canalNames,
      vertucciClass: record.morphology.vertucciClass,
      vertucciDescriptionVi: record.morphology.pulpFloorAnatomyVi,
      accessCavityShape: isMolar ? 'Hình thang lệch gần' : isPremolar ? 'Hình bầu dục ngoài trong' : isCanine ? 'Hình ngọn lửa dọc' : 'Hình tam giác đáy rìa cắn',
      accessCavityDetailsVi: 'Mở xoang tủy theo trục răng giải phẫu.',
      rubberDamClampVi: isMolar ? 'Clamp #14A' : isPremolar ? 'Clamp #2' : 'Clamp #9',
      rubberDamClampAlternatives: isMolar ? ['Clamp #56', 'Clamp #7'] : ['Clamp #0', 'Clamp #212'],
      crownDimensionsMm: record.morphology.crownDimensionsMm,
      rootLengthMm: record.morphology.rootLengthMm,
      pulpChamberFloorAnatomyVi: record.morphology.pulpFloorAnatomyVi,
      clinicalRisksVi: record.morphology.clinicalRisksVi,
      recommendedAnesthesia: record.morphology.recommendedAnesthesiaVi
    };
  }

  // Only if completely invalid identifier, return default 46
  return DENTAL_SPECIMENS_DATABASE[46];
}

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
    },
    {
      signVi: 'Đổi hướng / Gập góc chóp chân răng (Deviation of root apex)',
      signEn: 'Deviation of root apex',
      oddsRatioRisk: 'OR = 3.2',
      cbctIndicationVi: 'Chóp răng bị uốn cong đột ngột khi tiếp xúc với vỏ ống thần kinh.'
    },
    {
      signVi: 'Thu hẹp chóp chân răng (Narrowing of root apex)',
      signEn: 'Narrowing of root apex',
      oddsRatioRisk: 'OR = 2.9',
      cbctIndicationVi: 'Chân răng thon nhọn bất thường khi đi xuyên hoặc đè vào thành ống thần kinh.'
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
