/**
 * MedAnatomy 3D — Vascular Segment & Pathway Manager
 * Provides anatomical segment classification, flow progression chains,
 * and upstream/downstream vascular pathways.
 */

export interface VascularSegmentNode {
  vesselId: string;
  shortLabel: string;
  fullNameVi: string;
  order: number;
}

export interface VascularSegmentHierarchy {
  axisId: string;
  axisNameVi: string;
  axisNameEn: string;
  axisColor: string;
  currentSegmentName: string;
  segmentOrder: number;
  totalSegments: number;
  levelBadge: 'Thân chính (Cấp 0)' | 'Nhánh chính (Cấp 1)' | 'Phân đoạn (Cấp 2)' | 'Phân nhánh tận (Cấp 3)';
  anatomicalLandmarks: string;
  breadcrumb: string[];
  segmentChain: VascularSegmentNode[];
}

/**
 * Master Clinical Vascular Segments Registry
 */
const VASCULAR_AXIS_REGISTRY: Record<string, {
  axisId: string;
  axisNameVi: string;
  axisNameEn: string;
  axisColor: string;
  chain: VascularSegmentNode[];
  vessels: Record<string, {
    segmentName: string;
    order: number;
    levelBadge: 'Thân chính (Cấp 0)' | 'Nhánh chính (Cấp 1)' | 'Phân đoạn (Cấp 2)' | 'Phân nhánh tận (Cấp 3)';
    landmarks: string;
    breadcrumb: string[];
  }>;
}> = {
  // 1. TRỤC ĐỘNG MẠCH CHỦ (AORTIC ARTERIAL TRUNK)
  aorta_trunk: {
    axisId: 'aorta_trunk',
    axisNameVi: 'Trục Động Mạch Chủ Toàn Thân',
    axisNameEn: 'Systemic Aortic Trunk Axis',
    axisColor: '#ef4444',
    chain: [
      { vesselId: 'ascending_aorta', shortLabel: '1. ĐMC Lên', fullNameVi: 'Động mạch chủ lên', order: 1 },
      { vesselId: 'aortic_arch', shortLabel: '2. Quai ĐMC', fullNameVi: 'Cung động mạch chủ', order: 2 },
      { vesselId: 'thoracic_aorta', shortLabel: '3. ĐMC Ngực', fullNameVi: 'Động mạch chủ ngực', order: 3 },
      { vesselId: 'abdominal_aorta', shortLabel: '4. ĐMC Bụng', fullNameVi: 'Động mạch chủ bụng', order: 4 },
      { vesselId: 'common_iliac_artery_left', shortLabel: '5. ĐM Chậu', fullNameVi: 'Động mạch chậu chung', order: 5 }
    ],
    vessels: {
      ascending_aorta: {
        segmentName: 'Đoạn 1: Động Mạch Chủ Lên (Pars ascendens)',
        order: 1,
        levelBadge: 'Thân chính (Cấp 0)',
        landmarks: 'Từ lỗ van ĐMC trong tâm thất trái đến khớp ức sườn 2 phải (ngang mức góc ức Louis).',
        breadcrumb: ['Tâm Thất Trái', 'Xoang Valsalva', 'Đoạn 1: Động Mạch Chủ Lên']
      },
      aortic_arch: {
        segmentName: 'Đoạn 2: Cung / Quai Động Mạch Chủ (Arcus aortae)',
        order: 2,
        levelBadge: 'Thân chính (Cấp 0)',
        landmarks: 'Từ khớp ức sườn 2 phải uốn cong ra sau sang trái đến bờ dưới đốt sống ngực T4.',
        breadcrumb: ['Tâm Thất Trái', 'ĐM Chủ Lên', 'Đoạn 2: Cung Động Mạch Chủ']
      },
      brachiocephalic_trunk: {
        segmentName: 'Phân nhánh Quai 1: Thân Cánh Tay Đầu (Truncus brachiocephalicus)',
        order: 2,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Nhánh đầu tiên và lớn nhất của quai ĐMC, lên khớp ức đòn phải chia ĐM Cảnh chung (P) và ĐM Dưới đòn (P).',
        breadcrumb: ['Tâm Thất Trái', 'Cung Động Mạch Chủ', 'Thân Cánh Tay Đầu']
      },
      thoracic_aorta: {
        segmentName: 'Đoạn 3: Động Mạch Chủ Ngực (Aorta thoracica)',
        order: 3,
        levelBadge: 'Thân chính (Cấp 0)',
        landmarks: 'Từ bờ dưới đốt sống T4 chạy dọc trung thất sau đến lỗ động mạch chủ cơ hoành ngang T12.',
        breadcrumb: ['Tâm Thất Trái', 'Cung Động Mạch Chủ', 'Đoạn 3: Động Mạch Chủ Ngực']
      },
      abdominal_aorta: {
        segmentName: 'Đoạn 4: Động Mạch Chủ Bụng (Aorta abdominalis)',
        order: 4,
        levelBadge: 'Thân chính (Cấp 0)',
        landmarks: 'Từ lỗ cơ hoành T12 chạy trước cột sống thắt lưng đến đốt sống L4 rồi tách đôi thành hai ĐM Chậu chung.',
        breadcrumb: ['Tâm Thất Trái', 'ĐM Chủ Ngực (T12)', 'Đoạn 4: Động Mạch Chủ Bụng (L1-L4)']
      },
      common_iliac_artery_left: {
        segmentName: 'Đoạn 5: Động Mạch Chậu Chung Trái (A. iliaca communis sinistra)',
        order: 5,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Từ ngã ba phân nhánh của ĐM chủ bụng (L4) đến trước khớp cùng chậu thì chia thành ĐM chậu trong & chậu ngoài.',
        breadcrumb: ['ĐM Chủ Bụng (L4)', 'Đoạn 5: Động Mạch Chậu Chung Trái']
      },
      common_iliac_artery_right: {
        segmentName: 'Đoạn 5: Động Mạch Chậu Chung Phải (A. iliaca communis dextra)',
        order: 5,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Từ ngã ba phân nhánh của ĐM chủ bụng (L4) bắt chéo trước TM chủ dưới đến trước khớp cùng chậu.',
        breadcrumb: ['ĐM Chủ Bụng (L4)', 'Đoạn 5: Động Mạch Chậu Chung Phải']
      }
    }
  },

  // 2. TRỤC CẢNH - NÃO & VÒNG WILLIS (CEREBRAL & WILLIS CIRCULATION)
  cerebral_willis: {
    axisId: 'cerebral_willis',
    axisNameVi: 'Trục Động Mạch Cảnh & Tuần Hoàn Não (Vòng Willis)',
    axisNameEn: 'Carotid & Cerebral Circle of Willis Axis',
    axisColor: '#84cc16',
    chain: [
      { vesselId: 'common_carotid_artery_left', shortLabel: '1. Cảnh Chung', fullNameVi: 'Động mạch cảnh chung', order: 1 },
      { vesselId: 'internal_carotid_artery_left', shortLabel: '2. Cảnh Trong', fullNameVi: 'Động mạch cảnh trong (C1-C7)', order: 2 },
      { vesselId: 'middle_cerebral_artery_m1', shortLabel: '3. Đoạn M1 Não Giữa', fullNameVi: 'ĐM Não giữa - Đoạn M1', order: 3 },
      { vesselId: 'anterior_cerebral_artery_a1', shortLabel: '4. Đoạn A1 Não Trước', fullNameVi: 'ĐM Não trước - Đoạn A1', order: 4 },
      { vesselId: 'basilar_artery', shortLabel: '5. Thân Nền', fullNameVi: 'Động mạch thân nền', order: 5 }
    ],
    vessels: {
      common_carotid_artery_left: {
        segmentName: 'Đoạn Cảnh Chung: Thân Cảnh Trái (A. carotis communis sinistra)',
        order: 1,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Từ quai ĐMC chạy thẳng qua trung thất trên lên cổ, ngang bờ trên sụn giáp (C4) chia cảnh trong & ngoài.',
        breadcrumb: ['Cung ĐM Chủ', 'Đoạn Cảnh Chung (Trái)', 'Phình Cảnh (C4)']
      },
      common_carotid_artery_right: {
        segmentName: 'Đoạn Cảnh Chung: Thân Cảnh Phải (A. carotis communis dextra)',
        order: 1,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Từ thân cánh tay đầu sau khớp ức đòn phải lên cổ, ngang bờ trên sụn giáp (C4) chia cảnh trong & ngoài.',
        breadcrumb: ['Thân Cánh Tay Đầu', 'Đoạn Cảnh Chung (Phải)', 'Phình Cảnh (C4)']
      },
      internal_carotid_artery_left: {
        segmentName: 'Đoạn Cảnh Trong (Phân đoạn Bouthillier C1-C7)',
        order: 2,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Gồm 7 đoạn: C1 (Cổ) → C2 (Xương đá) → C3 (Lỗ rách) → C4 (Xoang hang) → C5 (Mỏm yên) → C6 (Mắt) → C7 (Não).',
        breadcrumb: ['ĐM Cảnh Chung', 'Xoang Cảnh', 'Đoạn Cảnh Trong C1-C7']
      },
      internal_carotid_artery_right: {
        segmentName: 'Đoạn Cảnh Trong (Phân đoạn Bouthillier C1-C7)',
        order: 2,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Gồm 7 đoạn: C1 (Cổ) → C2 (Xương đá) → C3 (Lỗ rách) → C4 (Xoang hang) → C5 (Mỏm yên) → C6 (Mắt) → C7 (Não).',
        breadcrumb: ['ĐM Cảnh Chung (P)', 'Xoang Cảnh', 'Đoạn Cảnh Trong C1-C7']
      },
      middle_cerebral_artery_m1: {
        segmentName: 'Động Mạch Não Giữa — Phân Đoạn M1 (Đoạn Ngang / Sphenoidal)',
        order: 3,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Từ chẽ đôi của ĐM cảnh trong chạy ngang qua rãnh bên Sylvius, phát các nhánh xuyên nuôi bao trong và hạch nền.',
        breadcrumb: ['ĐM Cảnh Trong (C7)', 'Rãnh Bên Sylvius', 'Đoạn M1 (Sphenoidal) ➔ Tiếp đến M2']
      },
      anterior_cerebral_artery_a1: {
        segmentName: 'Động Mạch Não Trước — Phân Đoạn A1 (Đoạn Trước Thông / Pre-communicating)',
        order: 4,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Từ chẽ đôi ĐM cảnh trong đi vào khe não dọc phía trên dây thần kinh thị giác đến ĐM thông trước.',
        breadcrumb: ['ĐM Cảnh Trong (C7)', 'Giao Thoa Thị Giác', 'Đoạn A1 (Trước Thông) ➔ Nối ĐM Thông Trước']
      },
      anterior_communicating_artery: {
        segmentName: 'Cầu Nối Thông Trước (Vòng Willis Anterior Arch)',
        order: 4,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Mạch nối ngắn giữa 2 đoạn A1 động mạch não trước, khép kín nửa trước vòng Willis.',
        breadcrumb: ['ĐM Não Trước (A1 Trái/Phải)', 'ĐM Thông Trước (Vòng Willis)']
      },
      posterior_communicating_artery: {
        segmentName: 'Cầu Nối Thông Sau (Carotid-Vertebrobasilar Anastomosis)',
        order: 4,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Nối ĐM cảnh trong (C7) với ĐM não sau (P1), là cầu nối tuần hoàn trước - sau.',
        breadcrumb: ['ĐM Cảnh Trong (C7)', 'ĐM Thông Sau', 'ĐM Não Sau (P1)']
      },
      vertebral_artery_v4: {
        segmentName: 'Động Mạch Đốt Sống — Phân Đoạn V4 (Đoạn Trong Màng Cứng / Intracranial)',
        order: 5,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Từ khi chui qua màng cứng qua lỗ lớn xương chẩm (foramen magnum) đến rãnh hành cầu hợp lưu thành ĐM thân nền.',
        breadcrumb: ['ĐM Dưới Đòn', 'Lỗ Mỏm Ngang C6-C1 (V2-V3)', 'Đoạn V4 Trong Sọ']
      },
      basilar_artery: {
        segmentName: 'Động Mạch Thân Nền (Hệ Tuần Hoàn Sau / Vertebrobasilar)',
        order: 5,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Hình thành do sự hợp lưu của 2 ĐM đốt sống tại rãnh hành cầu, chạy dọc rãnh nền cầu não đến hố liên cuống.',
        breadcrumb: ['2 ĐM Đốt Sống (V4)', 'Rãnh Nền Cầu Não', 'ĐM Thân Nền ➔ Chia 2 ĐM Não Sau']
      },
      posterior_cerebral_artery_p1: {
        segmentName: 'Động Mạch Não Sau — Phân Đoạn P1 (Đoạn Cuống Não / Pre-communicating)',
        order: 5,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Từ chẽ đôi ĐM thân nền uốn quanh cuống đại não đến chỗ nối với ĐM thông sau.',
        breadcrumb: ['ĐM Thân Nền', 'Hố Liên Cuống Não', 'Đoạn P1 ➔ Tiếp đến P2']
      }
    }
  },

  // 3. TRỤC ĐỘNG MẠCH CHI TRÊN (UPPER LIMB ARTERIAL AXIS)
  upper_limb_axis: {
    axisId: 'upper_limb_axis',
    axisNameVi: 'Trục Động Mạch Chi Trên (Dưới Đòn → Gan Tay)',
    axisNameEn: 'Upper Limb Arterial Axis',
    axisColor: '#06b6d4',
    chain: [
      { vesselId: 'subclavian_artery_right', shortLabel: '1. Dưới Đòn', fullNameVi: 'Động mạch dưới đòn', order: 1 },
      { vesselId: 'axillary_artery_right', shortLabel: '2. ĐM Nách (I-III)', fullNameVi: 'Động mạch nách (3 đoạn)', order: 2 },
      { vesselId: 'brachial_artery', shortLabel: '3. ĐM Cánh Tay', fullNameVi: 'Động mạch cánh tay', order: 3 },
      { vesselId: 'radial_artery', shortLabel: '4. ĐM Quay', fullNameVi: 'Động mạch quay', order: 4 },
      { vesselId: 'ulnar_artery', shortLabel: '5. ĐM Trụ', fullNameVi: 'Động mạch trụ', order: 5 },
      { vesselId: 'superficial_palmar_arch', shortLabel: '6. Cung Gan Tay', fullNameVi: 'Cung gan tay nông & sâu', order: 6 }
    ],
    vessels: {
      subclavian_artery_left: {
        segmentName: 'Đoạn 1: Động Mạch Dưới Đòn Trái (A. subclavia sinistra)',
        order: 1,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Từ quai ĐMC chạy qua khe sườn đòn và khe giữa cơ bậc thang trước và giữa đến bờ ngoài xương sườn 1.',
        breadcrumb: ['Cung ĐM Chủ', 'Khe Cơ Bậc Thang', 'Đoạn Dưới Đòn Trái']
      },
      subclavian_artery_right: {
        segmentName: 'Đoạn 1: Động Mạch Dưới Đòn Phải (A. subclavia dextra)',
        order: 1,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Từ thân cánh tay đầu sau khớp ức đòn phải qua khe cơ bậc thang đến bờ ngoài xương sườn 1 đổi tên thành ĐM nách.',
        breadcrumb: ['Thân Cánh Tay Đầu', 'Khe Cơ Bậc Thang', 'Đoạn Dưới Đòn Phải']
      },
      axillary_artery_right: {
        segmentName: 'Đoạn 2: Động Mạch Nách (Phân chia 3 đoạn theo cơ ngực bé)',
        order: 2,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Đoạn I (trên cơ ngực bé) → Đoạn II (sau cơ ngực bé) → Đoạn III (dưới cơ ngực bé, đến bờ dưới cơ tròn lớn).',
        breadcrumb: ['Bờ Ngoài Xương Sườn 1', 'Đoạn Nách I-II-III', 'Bờ Dưới Cơ Tròn Lớn']
      },
      brachial_artery: {
        segmentName: 'Đoạn 3: Động Mạch Cánh Tay (A. brachialis)',
        order: 3,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Từ bờ dưới cơ tròn lớn chạy trong ống cánh tay cùng TK giữa đến dưới nếp gấp khuỷu 2.5cm chia ĐM quay & trụ.',
        breadcrumb: ['ĐM Nách (Bờ Dưới Cơ Tròn Lớn)', 'Ống Cánh Tay', 'Đoạn Cánh Tay ➔ Chia ĐM Quay/Trụ']
      },
      radial_artery: {
        segmentName: 'Đoạn 4: Động Mạch Quay — Nhánh Cẳng Tay Ngoài (A. radialis)',
        order: 4,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Chạy dọc máng quay cẳng tay trước, đi qua hõm lào giải phẫu vào mu tay rồi tạo cung gan tay sâu.',
        breadcrumb: ['ĐM Cánh Tay', 'Máng Quay Cẳng Tay', 'Hõm Lào Giải Phẫu ➔ Cung Gan Tay Sâu']
      },
      ulnar_artery: {
        segmentName: 'Đoạn 5: Động Mạch Trụ — Nhánh Cẳng Tay Trong (A. ulnaris)',
        order: 5,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Chạy sâu dưới cơ sấp tròn sang bờ trong cẳng tay cùng TK trụ qua ống Guyon vào gan tay tạo cung gan tay nông.',
        breadcrumb: ['ĐM Cánh Tay', 'Ống Guyon Cổ Tay', 'Đoạn Trụ ➔ Cung Gan Tay Nông']
      },
      superficial_palmar_arch: {
        segmentName: 'Đoạn 6: Cung Động Mạch Gan Tay Nông (Arcus palmaris superficialis)',
        order: 6,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Tạo bởi nhánh tận ĐM trụ nối với nhánh gan tay nông ĐM quay, nằm ngay dưới mạc gan tay, cấp máu cho ngón tay.',
        breadcrumb: ['ĐM Trụ + Nhánh Nông ĐM Quay', 'Cung Gan Tay Nông ➔ ĐM Ngón Tay']
      },
      deep_palmar_arch: {
        segmentName: 'Đoạn 6: Cung Động Mạch Gan Tay Sâu (Arcus palmaris profundus)',
        order: 6,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Tạo bởi nhánh tận ĐM quay nối với nhánh gan tay sâu ĐM trụ, nằm sát nền các xương đốt bàn tay.',
        breadcrumb: ['ĐM Quay + Nhánh Sâu ĐM Trụ', 'Cung Gan Tay Sâu ➔ ĐM Gan Đốt Bàn']
      }
    }
  },

  // 4. TRỤC ĐỘNG MẠCH CHI DƯỚI (LOWER LIMB ARTERIAL AXIS)
  lower_limb_axis: {
    axisId: 'lower_limb_axis',
    axisNameVi: 'Trục Động Mạch Chi Dưới (Chậu Ngoài → Khoeo → Bàn Chân)',
    axisNameEn: 'Lower Limb Arterial Axis',
    axisColor: '#a855f7',
    chain: [
      { vesselId: 'external_iliac_artery', shortLabel: '1. Chậu Ngoài', fullNameVi: 'Động mạch chậu ngoài', order: 1 },
      { vesselId: 'femoral_artery', shortLabel: '2. ĐM Đùi Chung', fullNameVi: 'Động mạch đùi chung', order: 2 },
      { vesselId: 'deep_femoral_artery', shortLabel: '3. ĐM Đùi Sâu', fullNameVi: 'Động mạch đùi sâu', order: 3 },
      { vesselId: 'popliteal_artery', shortLabel: '4. ĐM Khoeo (P1-P3)', fullNameVi: 'Động mạch khoeo (3 đoạn)', order: 4 },
      { vesselId: 'anterior_tibial_artery', shortLabel: '5. ĐM Chày Trước', fullNameVi: 'Động mạch chày trước', order: 5 },
      { vesselId: 'posterior_tibial_artery', shortLabel: '6. ĐM Chày Sau', fullNameVi: 'Động mạch chày sau', order: 6 },
      { vesselId: 'dorsalis_pedis_artery', shortLabel: '7. ĐM Mu Chân', fullNameVi: 'Động mạch mu chân', order: 7 }
    ],
    vessels: {
      external_iliac_artery: {
        segmentName: 'Đoạn 1: Động Mạch Chậu Ngoài (A. iliaca externa)',
        order: 1,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Từ khớp cùng chậu dọc theo cơ thắt lưng lớn chui qua sau dây chằng bẹn đổi tên thành ĐM đùi.',
        breadcrumb: ['ĐM Chậu Chung', 'Mào Chậu', 'Dây Chằng Bẹn ➔ Đổi tên ĐM Đùi']
      },
      femoral_artery: {
        segmentName: 'Đoạn 2: Động Mạch Đùi Chung (A. femoralis communis)',
        order: 2,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Từ giữa dây chằng bẹn trong tam giác đùi Scarpa, chạy vào ống cơ khép (Hunter) đến lỗ gân cơ khép đổi tên thành ĐM khoeo.',
        breadcrumb: ['Dây Chằng Bẹn', 'Tam Giác Đùi Scarpa', 'Ống Cơ Khép (Hunter) ➔ ĐM Khoeo']
      },
      deep_femoral_artery: {
        segmentName: 'Đoạn 3: Động Mạch Đùi Sâu (A. profunda femoris)',
        order: 3,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Tách từ ĐM đùi chung cách dây chằng bẹn 4cm, chạy ra sau cơ khép dài phát các nhánh xiên cấp máu cơ đùi.',
        breadcrumb: ['ĐM Đùi Chung', 'Nhánh Xiên Đùi Sâu ➔ Cấp Máu Cơ Đùi']
      },
      popliteal_artery: {
        segmentName: 'Đoạn 4: Động Mạch Khoeo (Phân đoạn P1, P2, P3 trong trám khoeo)',
        order: 4,
        levelBadge: 'Phân đoạn (Cấp 2)',
        landmarks: 'Từ lỗ gân cơ khép lớn chạy chéo qua hõm khoeo (sau xương đùi & bao khớp gối) đến bờ dưới cơ khoeo chia ĐM chày trước & sau.',
        breadcrumb: ['Lỗ Gân Cơ Khép', 'Trám Khoeo P1-P2-P3', 'Bờ Dưới Cơ Khoeo ➔ Chia Chày Trước & Sau']
      },
      anterior_tibial_artery: {
        segmentName: 'Đoạn 5: Động Mạch Chày Trước (A. tibialis anterior)',
        order: 5,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Chui qua lỗ trên màng gian cốt ra ngăn cẳng chân trước, đi trước mắt cá trong đổi tên thành ĐM mu chân.',
        breadcrumb: ['ĐM Khoeo', 'Ngăn Cẳng Chân Trước', 'Hãm Gân Duỗi Cổ Chân ➔ Đổi tên ĐM Mu Chân']
      },
      posterior_tibial_artery: {
        segmentName: 'Đoạn 6: Động Mạch Chày Sau (A. tibialis posterior)',
        order: 6,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Chạy sâu dưới cơ dép ở ngăn cẳng chân sau, đi sau mắt cá trong (rãnh gót) vào gan chân chia ĐM gan chân trong & ngoài.',
        breadcrumb: ['ĐM Khoeo', 'Ngăn Cẳng Chân Sau', 'Sau Mắt Cá Trong (Bắt Mạch) ➔ ĐM Gan Chân']
      },
      fibular_artery: {
        segmentName: 'Đoạn 6: Động Mạch Mác (A. fibularis / peronea)',
        order: 6,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Nhánh lớn nhất của ĐM chày sau, chạy áp sát xương mác cấp máu cho cơ mác và mắt cá ngoài.',
        breadcrumb: ['ĐM Chày Sau', 'Mặt Trong Xương Mác ➔ Nhánh Mắt Cá Ngoài']
      },
      dorsalis_pedis_artery: {
        segmentName: 'Đoạn 7: Động Mạch Mu Chân (A. dorsalis pedis)',
        order: 7,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Tiếp nối ĐM chày trước từ nếp gấp cổ chân dọc kẽ ngón chân 1-2, là vị trí bắt mạch mu chân trên lâm sàng.',
        breadcrumb: ['ĐM Chày Trước', 'Kẽ Xương Đốt Bàn 1-2 (Bắt Mạch Mu Chân) ➔ Cung Mu Chân']
      }
    }
  },

  // 5. TRỤC MẠCH TẠNG BỤNG & HỆ TĨNH MẠCH CỬA (SPLANCHNIC & PORTAL AXIS)
  splanchnic_axis: {
    axisId: 'splanchnic_axis',
    axisNameVi: 'Trục Động Mạch Tạng Bụng & Hệ Cửa',
    axisNameEn: 'Abdominal Splanchnic & Portal Axis',
    axisColor: '#f59e0b',
    chain: [
      { vesselId: 'celiac_trunk', shortLabel: '1. Thân Tạng (T12)', fullNameVi: 'Thân động mạch tạng', order: 1 },
      { vesselId: 'superior_mesenteric_artery', shortLabel: '2. ĐM Mạc Treo Trên (L1)', fullNameVi: 'ĐM mạc treo tràng trên', order: 2 },
      { vesselId: 'inferior_mesenteric_artery', shortLabel: '3. ĐM Mạc Treo Dưới (L3)', fullNameVi: 'ĐM mạc treo tràng dưới', order: 3 },
      { vesselId: 'portal_vein', shortLabel: '4. Thân Tĩnh Mạch Cửa', fullNameVi: 'Tĩnh mạch cửa (Portal Vein)', order: 4 }
    ],
    vessels: {
      celiac_trunk: {
        segmentName: 'Đoạn 1: Thân Tạng — Động Mạch Tiêu Hóa Trên (Truncus coeliacus)',
        order: 1,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Tách từ mặt trước ĐM chủ bụng ngay dưới cơ hoành ngang mức T12, dài 1.25cm chia ba nhánh: ĐM vị trái, ĐM gan chung, ĐM lách.',
        breadcrumb: ['ĐM Chủ Bụng (T12)', 'Thân Tạng', 'Chia 3 Nhánh: Vị Trái / Gan Chung / Lách']
      },
      superior_mesenteric_artery: {
        segmentName: 'Đoạn 2: Động Mạch Mạc Treo Tràng Trên (A. mesenterica superior)',
        order: 2,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Tách từ mặt trước ĐM chủ bụng ngang đốt sống L1 (sau thân tụy), bắt chéo trước đoạn D3 tá tràng vào mạc treo ruột non.',
        breadcrumb: ['ĐM Chủ Bụng (L1)', 'Bắt Chéo Tá Tràng D3', 'Rễ Mạc Treo Ruột Non']
      },
      inferior_mesenteric_artery: {
        segmentName: 'Đoạn 3: Động Mạch Mạc Treo Tràng Dưới (A. mesenterica inferior)',
        order: 3,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Tách từ mặt trước ĐM chủ bụng ngang đốt sống L3 (cách chỗ chia đôi 3-4cm), cấp máu đại tràng trái, sigma và trực tràng.',
        breadcrumb: ['ĐM Chủ Bụng (L3)', 'Hố Chậu Trái', 'ĐM Trực Tràng Trên']
      },
      portal_vein: {
        segmentName: 'Đoạn 4: Thân Tĩnh Mạch Cửa (Vena portae hepatis)',
        order: 4,
        levelBadge: 'Thân chính (Cấp 0)',
        landmarks: 'Hình thành sau cổ tụy do sự hợp lưu của TM mạc treo tràng trên và TM lách, đi trong cuống gan vào rốn gan.',
        breadcrumb: ['TM Mạc Treo Tràng Trên + TM Lách', 'Cuống Gan (Sau Ống Mật & ĐM Gan)', 'Rốn Gan (Cửa Gan)']
      }
    }
  },

  // 6. TRỤC TUẦN HOÀN VÀNH & TIM (CORONARY AXIS)
  coronary_axis: {
    axisId: 'coronary_axis',
    axisNameVi: 'Trục Tuần Hoàn Động Mạch Vành & Cơ Tim',
    axisNameEn: 'Coronary Arterial Tree Axis',
    axisColor: '#f97316',
    chain: [
      { vesselId: 'ascending_aorta', shortLabel: '1. Xoang Valsalva', fullNameVi: 'Gốc ĐM chủ lên', order: 1 },
      { vesselId: 'anterior_interventricular_artery', shortLabel: '2. ĐM LAD (Gian Thất Trước)', fullNameVi: 'Nhánh gian thất trước (LAD)', order: 2 },
      { vesselId: 'circumflex_artery', shortLabel: '3. ĐM Mũ (LCx)', fullNameVi: 'Nhánh mũ (LCx)', order: 3 },
      { vesselId: 'right_coronary_artery', shortLabel: '4. ĐM Vành Phải (RCA)', fullNameVi: 'Động mạch vành phải', order: 4 },
      { vesselId: 'coronary_sinus', shortLabel: '5. Xoang Tĩnh Mạch Vành', fullNameVi: 'Xoang tĩnh mạch vành', order: 5 }
    ],
    vessels: {
      anterior_interventricular_artery: {
        segmentName: 'Đoạn 2: Nhánh Gian Thất Trước — Động Mạch LAD (Left Anterior Descending)',
        order: 2,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Tách từ thân chung vành trái (LMCA), chạy dọc rãnh gian thất trước đến khuyết đỉnh tim (được phân thành đoạn gần, giữa, xa).',
        breadcrumb: ['Xoang Valsalva Trái', 'Thân Chung LMCA', 'Rãnh Gian Thất Trước (LAD Proximal-Mid-Distal)']
      },
      circumflex_artery: {
        segmentName: 'Đoạn 3: Nhánh Mũ — Động Mạch LCx (Left Circumflex Artery)',
        order: 3,
        levelBadge: 'Phân nhánh tận (Cấp 3)',
        landmarks: 'Tách từ thân chung vành trái (LMCA), uốn quanh rãnh vành sang mặt sau thất trái đến nhánh bờ tù (OM).',
        breadcrumb: ['Thân Chung LMCA', 'Rãnh Vành Trái', 'Nhánh Bờ Tù (OM) & Thành Sau Thất Trái']
      },
      right_coronary_artery: {
        segmentName: 'Đoạn 4: Động Mạch Vành Phải — RCA (Right Coronary Artery)',
        order: 4,
        levelBadge: 'Nhánh chính (Cấp 1)',
        landmarks: 'Tách từ xoang Valsalva phải, chạy trong rãnh vành phải xuống bờ dưới tim phát nhánh bờ phải và nhánh gian thất sau (PDA).',
        breadcrumb: ['Xoang Valsalva Phải', 'Rãnh Vành Phải', 'Nhánh Gian Thất Sau (PDA) Ngang Rãnh Chữ Thập']
      },
      coronary_sinus: {
        segmentName: 'Đoạn 5: Xoang Tĩnh Mạch Vành (Sinus coronarius)',
        order: 5,
        levelBadge: 'Thân chính (Cấp 0)',
        landmarks: 'Ống tĩnh mạch rộng nằm ở rãnh vành sau tâm thất trái, thu hồi 60-70% máu tĩnh mạch tim đổ trực tiếp vào tâm nhĩ phải.',
        breadcrumb: ['TM Tim Lớn + TM Tim Giữa', 'Rãnh Vành Sau', 'Lỗ Đổ Tâm Nhĩ Phải']
      }
    }
  }
};

/**
 * Lookup helper to retrieve full segment hierarchy, breadcrumb, and progression chain for any vessel ID
 */
export function getVascularSegmentHierarchy(vesselId: string): VascularSegmentHierarchy | null {
  for (const axis of Object.values(VASCULAR_AXIS_REGISTRY)) {
    if (axis.vessels[vesselId]) {
      const v = axis.vessels[vesselId];
      return {
        axisId: axis.axisId,
        axisNameVi: axis.axisNameVi,
        axisNameEn: axis.axisNameEn,
        axisColor: axis.axisColor,
        currentSegmentName: v.segmentName,
        segmentOrder: v.order,
        totalSegments: axis.chain.length,
        levelBadge: v.levelBadge,
        anatomicalLandmarks: v.landmarks,
        breadcrumb: v.breadcrumb,
        segmentChain: axis.chain
      };
    }
  }

  return null;
}
