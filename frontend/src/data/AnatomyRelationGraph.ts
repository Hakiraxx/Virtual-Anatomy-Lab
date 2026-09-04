/**
 * ANATOMY RELATIONSHIP GRAPH (MedAnatomy 3D)
 * Comprehensive directed graph defining verified anatomical connections:
 * - branch_of
 * - enters
 * - travels_through
 * - gives_branch
 * - innervates
 * - vascular_supply
 * - articulates_with
 * Strictly verified against Netter's Atlas of Human Anatomy & Gray's Anatomy 42nd Ed.
 */

export type RelationshipType =
  | 'branch_of'
  | 'enters'
  | 'travels_through'
  | 'gives_branch'
  | 'innervates'
  | 'vascular_supply'
  | 'articulates_with';

export interface AnatomicalEdge {
  sourceId: string;       // Canonical ID of source structure
  type: RelationshipType;
  targetId: string;       // Canonical ID of target structure
  descriptionVi: string;
  descriptionEn: string;
}

export const ANATOMY_RELATIONSHIPS: AnatomicalEdge[] = [
  // ==========================================================================
  // TRIGEMINAL NERVE (CN V) BRANCHING & FORAMINA PATHWAYS
  // ==========================================================================
  {
    sourceId: 'nerve.v1',
    type: 'branch_of',
    targetId: 'nerve.trigeminal',
    descriptionVi: 'Thần kinh mắt (V1) là nhánh thứ nhất của Dây V thoát ra từ hạch sinh ba.',
    descriptionEn: 'Ophthalmic nerve (V1) is the first division arising from the trigeminal ganglion.'
  },
  {
    sourceId: 'nerve.v2',
    type: 'branch_of',
    targetId: 'nerve.trigeminal',
    descriptionVi: 'Thần kinh hàm trên (V2) là nhánh cảm giác thứ hai của Dây V.',
    descriptionEn: 'Maxillary nerve (V2) is the second sensory division of the trigeminal nerve.'
  },
  {
    sourceId: 'nerve.v3',
    type: 'branch_of',
    targetId: 'nerve.trigeminal',
    descriptionVi: 'Thần kinh hàm dưới (V3) là nhánh hỗn hợp (cảm giác + vận động) lớn nhất của Dây V.',
    descriptionEn: 'Mandibular nerve (V3) is the largest division containing both sensory and motor roots.'
  },
  {
    sourceId: 'nerve.v3',
    type: 'enters',
    targetId: 'foramen.ovale',
    descriptionVi: 'Dây V3 chui qua Lỗ bầu dục ở cánh lớn xương bướm để xuống hố dưới thái dương.',
    descriptionEn: 'Mandibular nerve (V3) exits the middle cranial fossa via the foramen ovale into the infratemporal fossa.'
  },
  {
    sourceId: 'nerve.v2',
    type: 'enters',
    targetId: 'foramen.rotundum',
    descriptionVi: 'Dây V2 chui qua Lỗ tròn vào hố chân bướm khẩu cái.',
    descriptionEn: 'Maxillary nerve (V2) passes through the foramen rotundum into the pterygopalatine fossa.'
  },
  {
    sourceId: 'nerve.inferior_alveolar',
    type: 'branch_of',
    targetId: 'nerve.v3',
    descriptionVi: 'Thần kinh IAN xuất phát từ thân sau của thần kinh hàm dưới (V3).',
    descriptionEn: 'Inferior alveolar nerve originates from the posterior division of V3.'
  },
  {
    sourceId: 'nerve.inferior_alveolar',
    type: 'enters',
    targetId: 'foramen.mandibular',
    descriptionVi: 'Thần kinh IAN đi vào Lỗ hàm dưới nằm ở mặt trong cành cao, che chắn bởi Gai Spix.',
    descriptionEn: 'IAN enters the mandibular foramen on the medial ramus, protected by the lingula.'
  },
  {
    sourceId: 'nerve.inferior_alveolar',
    type: 'travels_through',
    targetId: 'canal.mandibular',
    descriptionVi: 'Thần kinh IAN chạy dọc trong Ống hàm dưới nằm sát chóp các răng cối lớn.',
    descriptionEn: 'IAN courses anteriorly through the mandibular canal adjacent to molar apices.'
  },
  {
    sourceId: 'nerve.inferior_alveolar',
    type: 'gives_branch',
    targetId: 'nerve.mental',
    descriptionVi: 'Thần kinh IAN phân nhánh tận cùng thành Thần kinh cằm chui ra qua Lỗ cằm.',
    descriptionEn: 'IAN gives off the mental nerve which exits via the mental foramen.'
  },
  {
    sourceId: 'nerve.inferior_alveolar',
    type: 'gives_branch',
    targetId: 'nerve.mylohyoid',
    descriptionVi: 'Thần kinh hàm móng tách ra ngay trước khi IAN đi vào lỗ hàm dưới.',
    descriptionEn: 'Nerve to mylohyoid branches off immediately before the IAN enters the mandibular canal.'
  },
  {
    sourceId: 'nerve.lingual',
    type: 'branch_of',
    targetId: 'nerve.v3',
    descriptionVi: 'Thần kinh lưỡi tách từ thân sau V3, chạy sát bản xương mặt trong xương hàm dưới.',
    descriptionEn: 'Lingual nerve arises from posterior division of V3, running medial to the mandibular ramus.'
  },
  {
    sourceId: 'nerve.mental',
    type: 'travels_through',
    targetId: 'foramen.mental',
    descriptionVi: 'Thần kinh cằm chui qua Lỗ cằm ra vùng mô mềm cằm và môi dưới.',
    descriptionEn: 'Mental nerve passes through the mental foramen to innervate the chin and lower lip.'
  },

  // ==========================================================================
  // DENTAL INNERVATION (CHI PHỐI THẦN KINH RĂNG)
  // ==========================================================================
  {
    sourceId: 'nerve.inferior_alveolar',
    type: 'innervates',
    targetId: 'tooth.48',
    descriptionVi: 'Thần kinh IAN chi phối cảm giác tủy và nha chu cho Răng khôn 48.',
    descriptionEn: 'IAN provides sensory innervation to dental pulp and periodontium of tooth #48.'
  },
  {
    sourceId: 'nerve.inferior_alveolar',
    type: 'innervates',
    targetId: 'tooth.38',
    descriptionVi: 'Thần kinh IAN chi phối cảm giác tủy và nha chu cho Răng khôn 38.',
    descriptionEn: 'IAN provides sensory innervation to dental pulp and periodontium of tooth #38.'
  },

  // ==========================================================================
  // MUSCLES & TMJ RELATIONSHIPS (CƠ NHAI & KHỚP THÁI DƯƠNG HÀM)
  // ==========================================================================
  {
    sourceId: 'bone.mandible',
    type: 'articulates_with',
    targetId: 'joint.tmj',
    descriptionVi: 'Lồi cầu xương hàm dưới khớp với diện khớp xương thái dương tạo nên Khớp Thái Dương Hàm.',
    descriptionEn: 'Mandibular condyle articulates with the temporal glenoid fossa forming the TMJ.'
  },
  {
    sourceId: 'joint.tmj.disc',
    type: 'articulates_with',
    targetId: 'joint.tmj',
    descriptionVi: 'Đĩa khớp phân chia bao khớp thành khoang trên (trượt) và khoang dưới (xoay).',
    descriptionEn: 'Articular disc divides joint into superior (gliding) and inferior (rotational) cavities.'
  },
  {
    sourceId: 'nerve.v3',
    type: 'innervates',
    targetId: 'muscle.masseter',
    descriptionVi: 'Thần kinh cơ cắn (nhánh từ V3) vận động cho Cơ cắn.',
    descriptionEn: 'Masseteric nerve from V3 provides motor supply to the masseter muscle.'
  },
  {
    sourceId: 'nerve.v3',
    type: 'innervates',
    targetId: 'muscle.temporalis',
    descriptionVi: 'Các dây thần kinh thái dương sâu (nhánh V3) vận động cho Cơ thái dương.',
    descriptionEn: 'Deep temporal nerves from V3 supply the temporalis muscle.'
  },
  {
    sourceId: 'nerve.v3',
    type: 'innervates',
    targetId: 'muscle.lateral_pterygoid',
    descriptionVi: 'Thần kinh chân bướm ngoài (nhánh V3) vận động cho Cơ chân bướm ngoài.',
    descriptionEn: 'Lateral pterygoid nerve from V3 supplies the lateral pterygoid muscle.'
  },
  {
    sourceId: 'nerve.v3',
    type: 'innervates',
    targetId: 'muscle.medial_pterygoid',
    descriptionVi: 'Thần kinh chân bướm trong (nhánh V3) vận động cho Cơ chân bướm trong.',
    descriptionEn: 'Medial pterygoid nerve from V3 supplies the medial pterygoid muscle.'
  },

  // ==========================================================================
  // VASCULAR SUPPLY (CUNG CẤP HUYẾT QUẢN)
  // ==========================================================================
  {
    sourceId: 'tooth.48',
    type: 'vascular_supply',
    targetId: 'nerve.inferior_alveolar', // Co-traversing inferior alveolar artery
    descriptionVi: 'Động mạch huyệt răng dưới (nhánh từ ĐM Hàm) đi cùng thần kinh IAN cấp máu cho R.48.',
    descriptionEn: 'Inferior alveolar artery (from maxillary artery) co-courses with IAN supplying tooth #48.'
  },
  {
    sourceId: 'tooth.38',
    type: 'vascular_supply',
    targetId: 'nerve.inferior_alveolar',
    descriptionVi: 'Động mạch huyệt răng dưới đi cùng thần kinh IAN cấp máu cho R.38.',
    descriptionEn: 'Inferior alveolar artery co-courses with IAN supplying tooth #38.'
  }
];

/**
 * Get all outgoing and incoming relationships for any anatomical ID (canonical or legacy).
 */
export function getAnatomyRelations(anatomyId: string): {
  parents: AnatomicalEdge[];
  children: AnatomicalEdge[];
  all: AnatomicalEdge[];
} {
  const cleanId = anatomyId.trim();
  const canonical = cleanId.includes('_') ? cleanId.replace(/_/g, '.') : cleanId;

  const parents = ANATOMY_RELATIONSHIPS.filter(
    (e) => e.targetId === canonical || e.targetId === cleanId
  );
  const children = ANATOMY_RELATIONSHIPS.filter(
    (e) => e.sourceId === canonical || e.sourceId === cleanId
  );

  return {
    parents,
    children,
    all: [...parents, ...children]
  };
}
