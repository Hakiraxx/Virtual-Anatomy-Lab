/**
 * LayerRegistry.ts
 *
 * Centralized Dissection Layer Authority for MedAnatomy 3D
 * Defines anatomical systems, layer indices, dissection depths, and
 * standard 3D spatial separation vectors for the Whole Body exploded assembly.
 */

export interface LayerDefinition {
  layerIndex: number;
  id: string;
  nameVi: string;
  nameEn: string;
  systemId: string;
  /**
   * Anatomical direction of spatial separation:
   * - 'center': Anchor baseline (e.g. skeletal axial column)
   * - 'anterior': Displaces forward (+Z)
   * - 'posterior': Displaces backward (-Z)
   * - 'lateral_right': Displaces to anatomical right / viewer's left (-X, +Z)
   * - 'lateral_left': Displaces to anatomical left / viewer's right (+X, +Z)
   */
  direction: 'center' | 'anterior' | 'posterior' | 'lateral_right' | 'lateral_left';
  /**
   * Maximum practical spatial displacement vector [dx, dy, dz] in meters at 100% explode factor.
   * Calculated relative to anatomical midline to maintain proportional spacing without off-screen clipping.
   */
  maxOffset: [number, number, number];
  descriptionVi: string;
  descriptionEn: string;
}

export const LAYER_REGISTRY: Record<number, LayerDefinition> = {
  1: {
    layerIndex: 1,
    id: 'layer_skin',
    nameVi: 'Lớp 1: Hệ da & Vỏ bọc',
    nameEn: 'Layer 1: Skin & Integumentary Envelope',
    systemId: 'integumentary',
    direction: 'anterior',
    maxOffset: [0.0, 0.0, 0.65], // Floats furthest anteriorly as a protective outer silhouette
    descriptionVi: 'Lớp da bảo vệ bao bọc toàn bộ cơ thể từ đầu đến chân.',
    descriptionEn: 'Full-body translucent integumentary boundary.'
  },
  2: {
    layerIndex: 2,
    id: 'layer_fascia',
    nameVi: 'Lớp 2: Mạc nông & Mô mỡ',
    nameEn: 'Layer 2: Superficial Fascia',
    systemId: 'integumentary',
    direction: 'anterior',
    maxOffset: [0.0, 0.0, 0.50],
    descriptionVi: 'Mạc liên kết bọc cơ và đệm dưới da.',
    descriptionEn: 'Investing fascia and adipose compartments.'
  },
  3: {
    layerIndex: 3,
    id: 'layer_muscles',
    nameVi: 'Lớp 3: Hệ cơ vân',
    nameEn: 'Layer 3: Muscular System',
    systemId: 'muscular',
    direction: 'lateral_left',
    maxOffset: [0.35, 0.0, 0.15], // Shifts anterolaterally to anatomical left, displaying full muscular physique
    descriptionVi: 'Hệ thống các cơ vân tạo lực vận động và duy trì tư thế.',
    descriptionEn: 'Skeletal musculature spanning axial and appendicular compartments.'
  },
  4: {
    layerIndex: 4,
    id: 'layer_skeleton',
    nameVi: 'Lớp 4: Hệ xương & Khớp',
    nameEn: 'Layer 4: Bones & Joints (Anatomical Core)',
    systemId: 'skeletal',
    direction: 'center',
    maxOffset: [0.0, 0.0, 0.0], // Stationary anatomical reference anchor
    descriptionVi: 'Khung xương nâng đỡ cơ thể, giữ vai trò tâm trục giải phẫu.',
    descriptionEn: 'Rigid skeletal framework acting as the stationary central anatomical anchor.'
  },
  5: {
    layerIndex: 5,
    id: 'layer_organs',
    nameVi: 'Lớp 5: Các tạng nội tạng',
    nameEn: 'Layer 5: Visceral Organs',
    systemId: 'visceral',
    direction: 'anterior',
    maxOffset: [0.0, 0.0, 0.35], // Shifts directly forward out of thoracic/abdominal cavities
    descriptionVi: 'Hệ cơ quan nội tạng lồng ngực, ổ bụng và tiểu khung.',
    descriptionEn: 'Cardiopulmonary, gastrointestinal, and genitourinary visceral organs.'
  },
  6: {
    layerIndex: 6,
    id: 'layer_vessels',
    nameVi: 'Lớp 6: Mạng mạch máu',
    nameEn: 'Layer 6: Cardiovascular Angiology Network',
    systemId: 'cardiovascular',
    direction: 'lateral_right',
    maxOffset: [-0.35, 0.0, 0.15], // Shifts anterolaterally to anatomical right, displaying vascular tree
    descriptionVi: 'Động mạch, tĩnh mạch và hệ thống mạch vành tim mạch.',
    descriptionEn: 'Systemic aorta, vena cava, and extensive full-body vascular network.'
  },
  7: {
    layerIndex: 7,
    id: 'layer_nerves',
    nameVi: 'Lớp 7: Hệ thần kinh',
    nameEn: 'Layer 7: Nervous System & CNS',
    systemId: 'nervous',
    direction: 'posterior',
    maxOffset: [0.0, 0.0, -0.35], // Shifts posteriorly out of skull base and spinal canal
    descriptionVi: 'Não bộ, thân não, tủy sống và mạng lưới dây thần kinh.',
    descriptionEn: 'Brain, brainstem, spinal cord, cranial, and peripheral nerves.'
  },
  8: {
    layerIndex: 8,
    id: 'layer_deep',
    nameVi: 'Lớp 8: Cấu trúc sâu & Tuyến nội tiết',
    nameEn: 'Layer 8: Deep Structures & Endocrine Glands',
    systemId: 'endocrine',
    direction: 'anterior',
    maxOffset: [0.0, 0.0, 0.25],
    descriptionVi: 'Các tuyến nội tiết và cấu trúc vi giải phẫu nằm sâu.',
    descriptionEn: 'Endocrine glands and deep visceral structures.'
  }
};

export class LayerRegistry {
  /**
   * Retrieves definition for a specific dissection layer.
   */
  static getLayer(layerIndex: number): LayerDefinition {
    return LAYER_REGISTRY[layerIndex] || LAYER_REGISTRY[4];
  }

  /**
   * Calculates the 3D displacement offset vector [dx, dy, dz] for a layer at a given explode factor.
   * Linear mapping from 0.0 (exact [0,0,0]) to 1.0 (maxOffset).
   */
  static getLayerOffset(layerIndex: number, factor: number): [number, number, number] {
    const clamped = Math.max(0, Math.min(1, factor));
    if (clamped <= 0.0001) {
      return [0, 0, 0];
    }
    const def = this.getLayer(layerIndex);
    return [
      def.maxOffset[0] * clamped,
      def.maxOffset[1] * clamped,
      def.maxOffset[2] * clamped
    ];
  }

  /**
   * Returns all supported whole-body layer definitions in dissection order (1 to 8).
   */
  static getAllLayers(): LayerDefinition[] {
    return Object.values(LAYER_REGISTRY);
  }
}
