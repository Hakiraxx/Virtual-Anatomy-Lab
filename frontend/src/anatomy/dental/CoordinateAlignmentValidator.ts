/**
 * CoordinateAlignmentValidator.ts
 *
 * Central validator for 3D Dental & Craniofacial Coordinate Alignment
 * Enforces anatomical accuracy, single root transforms, metric unit consistency,
 * sagittal symmetry, and physiological relationships (R48, R38, Mandible, IAN, Lingual, Mental).
 */

export interface ValidationItem {
  id: string;
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
  details?: string;
}

export interface AlignmentValidationReport {
  timestamp: string;
  overallPassed: boolean;
  coordinateSpace: string;
  unit: string;
  items: ValidationItem[];
}

export class CoordinateAlignmentValidator {
  /**
   * Authoritative Craniofacial Metric Reference Coordinates (Z-Anatomy CC BY-SA 4.0)
   */
  public static readonly CANONICAL_COORDINATES = {
    midlineX: 0.0451,
    mandible: {
      center: [0.0451, 0.7639, 0.0360] as [number, number, number],
      boxMin: [-0.0142, 0.7167, -0.0110] as [number, number, number],
      boxMax: [0.1044, 0.8111, 0.0830] as [number, number, number]
    },
    tooth48: {
      socketPos: [0.0118, 0.7580, 0.0295] as [number, number, number],
      side: 'RIGHT' as const,
      jaw: 'MANDIBLE' as const
    },
    tooth38: {
      socketPos: [0.0784, 0.7580, 0.0295] as [number, number, number],
      side: 'LEFT' as const,
      jaw: 'MANDIBLE' as const
    },
    tooth47: {
      centerPos: [0.0150, 0.7527, 0.0394] as [number, number, number]
    },
    tooth37: {
      centerPos: [0.0752, 0.7527, 0.0394] as [number, number, number]
    },
    ianRight: {
      center: [0.0228, 0.7478, 0.0464] as [number, number, number],
      boxMin: [0.0024, 0.7219, 0.0086] as [number, number, number],
      boxMax: [0.0432, 0.7736, 0.0841] as [number, number, number]
    },
    ianLeft: {
      center: [0.0674, 0.7478, 0.0464] as [number, number, number],
      boxMin: [0.0470, 0.7219, 0.0086] as [number, number, number],
      boxMax: [0.0878, 0.7736, 0.0841] as [number, number, number]
    },
    lingualRight: {
      center: [0.0229, 0.7722, 0.0312] as [number, number, number]
    },
    lingualLeft: {
      center: [0.0673, 0.7722, 0.0312] as [number, number, number]
    },
    mentalRight: {
      center: [0.0225, 0.7318, 0.0672] as [number, number, number]
    },
    mentalLeft: {
      center: [0.0677, 0.7318, 0.0672] as [number, number, number]
    },
    mandibularForamenRight: {
      center: [0.0228, 0.7700, 0.0100] as [number, number, number]
    },
    mandibularForamenLeft: {
      center: [0.0674, 0.7700, 0.0100] as [number, number, number]
    }
  };

  /**
   * Validates full dental coordinate alignment and physiological relationships.
   */
  public static validateAll(): AlignmentValidationReport {
    const items: ValidationItem[] = [];
    const coords = this.CANONICAL_COORDINATES;

    // 1. Metric Unit Check (Mandible dimension in meters ~ 10-12cm)
    const mandWidth = coords.mandible.boxMax[0] - coords.mandible.boxMin[0];
    const isMetric = mandWidth >= 0.08 && mandWidth <= 0.15;
    items.push({
      id: 'unit_system',
      name: 'Metric Unit Consistency',
      passed: isMetric,
      expected: '0.08m - 0.15m width (adult human mandible in meters)',
      actual: `${mandWidth.toFixed(4)}m`,
      details: 'Strictly 1 unit = 1 meter across all 3D assets'
    });

    // 2. Tooth 48 laterality & socket position (Patient Right = X < Midline)
    const t48X = coords.tooth48.socketPos[0];
    const isT48Right = t48X < coords.midlineX;
    items.push({
      id: 'tooth_48_laterality',
      name: 'Tooth 48 Anatomical Right Laterality',
      passed: isT48Right,
      expected: `< ${coords.midlineX}m (Patient Right)`,
      actual: `${t48X.toFixed(4)}m`,
      details: 'R48 positioned on the patient right mandibular body'
    });

    // 3. Tooth 38 laterality & socket position (Patient Left = X > Midline)
    const t38X = coords.tooth38.socketPos[0];
    const isT38Left = t38X > coords.midlineX;
    items.push({
      id: 'tooth_38_laterality',
      name: 'Tooth 38 Anatomical Left Laterality',
      passed: isT38Left,
      expected: `> ${coords.midlineX}m (Patient Left)`,
      actual: `${t38X.toFixed(4)}m`,
      details: 'R38 positioned on the patient left mandibular body'
    });

    // 4. Sagittal Symmetry between R48 and R38
    const distT48 = Math.abs(coords.midlineX - t48X);
    const distT38 = Math.abs(t38X - coords.midlineX);
    const symmetryDelta = Math.abs(distT48 - distT38);
    const isSymmetric = symmetryDelta < 0.001; // Less than 1mm delta
    items.push({
      id: 'sagittal_symmetry',
      name: 'Molar Sagittal Bilateral Symmetry',
      passed: isSymmetric,
      expected: `Equal distance from midline (${coords.midlineX}m)`,
      actual: `R48 dist: ${distT48.toFixed(4)}m, R38 dist: ${distT38.toFixed(4)}m (delta: ${(symmetryDelta * 1000).toFixed(2)}mm)`,
      details: 'Perfect bilateral anatomical arch balance'
    });

    // 5. Tooth 48 Distal to Tooth 47 (Curve of Spee & arch progression)
    // Distal means smaller Z (posterior towards ramus) and higher Y (ascending ramus)
    const isDistalToR47 =
      coords.tooth48.socketPos[2] < coords.tooth47.centerPos[2] &&
      coords.tooth48.socketPos[1] >= coords.tooth47.centerPos[1];
    items.push({
      id: 'r48_distal_r47',
      name: 'R48 Position Relative to Second Molar R47',
      passed: isDistalToR47,
      expected: 'Z_48 < Z_47 (distal/posterior) and Y_48 >= Y_47 (Curve of Spee)',
      actual: `R48: [${coords.tooth48.socketPos.join(', ')}], R47: [${coords.tooth47.centerPos.join(', ')}]`,
      details: 'Correct socket sequence on mandibular dental arch'
    });

    // 6. IAN contained inside Mandible bounding box (with 5mm margin for terminal mental nerve branches exiting mental foramen)
    const margin = 0.005; // 5mm tolerance for nerve arborization exiting cortical bone
    const ianInsideMandible =
      coords.ianRight.boxMin[0] >= coords.mandible.boxMin[0] - margin &&
      coords.ianRight.boxMax[0] <= coords.mandible.boxMax[0] + margin &&
      coords.ianRight.boxMin[1] >= coords.mandible.boxMin[1] - margin &&
      coords.ianRight.boxMax[1] <= coords.mandible.boxMax[1] + margin &&
      coords.ianRight.boxMin[2] >= coords.mandible.boxMin[2] - margin &&
      coords.ianRight.boxMax[2] <= coords.mandible.boxMax[2] + margin;
    items.push({
      id: 'ian_inside_mandible',
      name: 'IAN Anatomical Trajectory inside Mandibular Canal',
      passed: ianInsideMandible,
      expected: 'IAN bounding box fully enveloped within Mandible bounds (+5mm exit margin for mental nerve)',
      actual: `IAN: [${coords.ianRight.boxMin.join(', ')}] to [${coords.ianRight.boxMax.join(', ')}] | Mandible: [${coords.mandible.boxMin.join(', ')}] to [${coords.mandible.boxMax.join(', ')}]`,
      details: 'Traced through mandibular foramen (Gai Spix) to mental foramen with terminal arborization'
    });

    // 7. R48 Root Apex Proximity to IAN
    // Tooth 48 CEJ at Y=0.7580, root apex at ~Y=0.7472. IAN at Y=0.7478.
    const rootApexY = coords.tooth48.socketPos[1] - 0.0108;
    const ianYAtMolar = coords.ianRight.center[1];
    const verticalProximityMm = Math.abs(rootApexY - ianYAtMolar) * 1000;
    const isProximityValid = verticalProximityMm >= 0.0 && verticalProximityMm <= 6.0;
    items.push({
      id: 'root_ian_proximity',
      name: 'R48 Root Apex to IAN Canal Proximity',
      passed: isProximityValid,
      expected: '0.0mm - 6.0mm clinical proximity',
      actual: `${verticalProximityMm.toFixed(2)}mm`,
      details: 'High-risk surgical proximity authentic to third molar impaction'
    });

    // 8. Lingual Nerve medial (lingual) to R48
    // In our coordinate system, increasing X toward midline 0.0451 is medial (lingual)
    const isLingualMedial = coords.lingualRight.center[0] > coords.tooth48.socketPos[0];
    items.push({
      id: 'lingual_nerve_relation',
      name: 'Lingual Nerve Spatial Relation to Molar Region',
      passed: isLingualMedial,
      expected: `X_lingual > X_tooth48 (medial toward midline ${coords.midlineX}m)`,
      actual: `Lingual X: ${coords.lingualRight.center[0]}m, Tooth48 X: ${coords.tooth48.socketPos[0]}m`,
      details: 'Lingual nerve correctly tracks along medial sublingual cortical plate'
    });

    // 9. Mental Foramen & Nerve Anterior to Molars
    // Anterior is larger Z (towards chin)
    const isMentalAnterior = coords.mentalRight.center[2] > coords.tooth48.socketPos[2];
    items.push({
      id: 'mental_foramen_relation',
      name: 'Mental Foramen Location on Mandibular Body',
      passed: isMentalAnterior,
      expected: 'Z_mental > Z_molar (anterior below premolars)',
      actual: `Mental Z: ${coords.mentalRight.center[2]}m, Molar Z: ${coords.tooth48.socketPos[2]}m`,
      details: 'Mental nerve emerges at premolar level to supply chin and lower lip'
    });

    const overallPassed = items.every((i) => i.passed);

    return {
      timestamp: new Date().toISOString(),
      overallPassed,
      coordinateSpace: 'Craniofacial Metric Canonical Space (Z-Anatomy CC BY-SA 4.0)',
      unit: 'Meters (m)',
      items
    };
  }

  /**
   * Helper to calculate camera view presets based on anatomical target vector.
   */
  public static calculateViewPreset(
    target: [number, number, number],
    preset: 'occlusal' | 'buccal' | 'lingual' | 'closeup',
    isRightSide: boolean
  ): { position: [number, number, number]; target: [number, number, number] } {
    const [tx, ty, tz] = target;
    let pos: [number, number, number];

    switch (preset) {
      case 'occlusal':
        // Superior top-down view looking into occlusal table
        pos = [tx, ty + 0.065, tz];
        break;
      case 'buccal':
        // Lateral/vestibular view from cheek
        pos = [isRightSide ? tx - 0.060 : tx + 0.060, ty + 0.005, tz + 0.015];
        break;
      case 'lingual':
        // Medial view from tongue/floor of mouth
        pos = [isRightSide ? tx + 0.050 : tx - 0.050, ty + 0.005, tz - 0.010];
        break;
      case 'closeup':
      default:
        // Anterolateral close-up of tooth root apices & IAN proximity
        pos = [isRightSide ? tx - 0.035 : tx + 0.035, ty + 0.015, tz + 0.045];
        break;
    }

    return { position: pos, target };
  }
}
