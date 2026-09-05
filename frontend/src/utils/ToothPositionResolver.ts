import {
  TOOTH_REGISTRY,
  TOOTH_ID_MAP,
  MESH_NODE_TO_FDI_MAP,
  type ToothRecord,
  DENTAL_MIDLINE_X
} from '../data/ToothRegistry.ts';
import { DENTAL_LANDMARKS } from '../data/DentalLandmarkRegistry.ts';

export type CoordinateFrame = 'craniofacial' | 'wholeBody' | 'specimen';

export interface CameraTargetPreset {
  position: [number, number, number];
  lookAt: [number, number, number];
  distance: number;
}

export interface ToothValidationResult {
  fdi: number;
  id: string;
  nameEn: string;
  valid: boolean;
  errors: string[];
  jawPass: boolean;
  sidePass: boolean;
  typePass: boolean;
  meshPass: boolean;
  positionPass: boolean;
  adjacencyPass: boolean;
  orientationPass: boolean;
}

export class ToothPositionResolver {
  /**
   * Universal resolver accepting any representation of a tooth
   * e.g. 46, "46", "tooth.46", "tooth_46", "R46", "răng 46", "mandibular right first molar"
   */
  public static resolve(identifier: string | number | null | undefined): ToothRecord | undefined {
    if (!identifier) return undefined;

    if (typeof identifier === 'number') {
      return TOOTH_REGISTRY[identifier];
    }

    const clean = String(identifier).trim().toLowerCase();

    // 1. Direct match in lookup map
    if (TOOTH_ID_MAP[clean]) {
      return TOOTH_ID_MAP[clean];
    }

    // 2. Format: "r46", "r.46", "tooth 46", "tooth-46"
    const numMatch = clean.match(/(?:tooth[._\- ]?|r[._ ]?)?([1-4][1-8])/);
    if (numMatch) {
      const fdi = parseInt(numMatch[1], 10);
      if (TOOTH_REGISTRY[fdi]) {
        return TOOTH_REGISTRY[fdi];
      }
    }

    // 3. Match by name or synonym
    for (const t of Object.values(TOOTH_REGISTRY)) {
      if (
        t.nameVi.toLowerCase().includes(clean) ||
        t.nameEn.toLowerCase().includes(clean) ||
        t.latinName.toLowerCase().includes(clean)
      ) {
        return t;
      }
    }

    return undefined;
  }

  /**
   * Get 3D world position in the requested coordinate frame
   */
  public static getPosition(
    identifier: string | number,
    frame: CoordinateFrame = 'craniofacial'
  ): [number, number, number] {
    const tooth = this.resolve(identifier);
    if (!tooth) return [0, 0, 0];

    if (frame === 'specimen') {
      return [0, 0, 0];
    }
    if (frame === 'wholeBody') {
      return tooth.wholeBodyPos;
    }
    // Default craniofacial frame
    return tooth.craniofacialPos;
  }

  /**
   * Get exact camera framing coordinates for cinematic glide & focus
   */
  public static getCameraFocus(
    identifier: string | number,
    frame: CoordinateFrame = 'craniofacial',
    preset: 'default' | 'occlusal' | 'buccal' | 'lingual' | 'mesial' | 'distal' | 'apical' = 'default'
  ): CameraTargetPreset {
    const tooth = this.resolve(identifier);
    if (!tooth) {
      return {
        position: [0.24, 0.12, 0.28],
        lookAt: [0, 0, 0],
        distance: 0.28
      };
    }

    if (frame === 'specimen') {
      if (preset === 'occlusal') return { position: [0, 0.08, 0.001], lookAt: [0, 0, 0], distance: 0.08 };
      if (preset === 'buccal') return { position: [0, 0, 0.07], lookAt: [0, 0, 0], distance: 0.07 };
      if (preset === 'lingual') return { position: [0, 0, -0.07], lookAt: [0, 0, 0], distance: 0.07 };
      if (preset === 'mesial') return { position: [0.07, 0, 0], lookAt: [0, 0, 0], distance: 0.07 };
      if (preset === 'distal') return { position: [-0.07, 0, 0], lookAt: [0, 0, 0], distance: 0.07 };
      if (preset === 'apical') return { position: [0, -0.08, 0.001], lookAt: [0, 0, 0], distance: 0.08 };

      return {
        position: [0.06, 0.03, 0.08],
        lookAt: [0, 0, 0],
        distance: 0.10
      };
    }

    if (frame === 'wholeBody') {
      const [x, y, z] = tooth.wholeBodyPos;
      return {
        position: [x * 1.5, y + 0.04, z + 0.16],
        lookAt: [x, y, z],
        distance: 0.18
      };
    }

    // Default craniofacial frame in skull_complete.glb
    const [tx, ty, tz] = tooth.craniofacialPos;
    const isRightSide = tooth.side === 'RIGHT';

    // Camera offset: position camera slightly outward and anterior to inspect buccal & occlusal face
    const offsetX = isRightSide ? -0.055 : 0.055;
    const offsetY = tooth.jaw === 'MANDIBLE' ? 0.025 : -0.025;
    const offsetZ = 0.065;

    return {
      position: [tx + offsetX, ty + offsetY, tz + offsetZ],
      lookAt: [tx, ty, tz],
      distance: 0.09
    };
  }

  /**
   * Get authentic mesh node name in skull_complete.glb for this tooth
   */
  public static getMeshNodeName(identifier: string | number): string {
    const tooth = this.resolve(identifier);
    return tooth ? tooth.meshNodeName : '';
  }

  /**
   * Map 3D scene mesh node name to canonical FDI number
   */
  public static getFdiFromMeshNodeName(nodeName: string): number | null {
    if (!nodeName) return null;
    const direct = MESH_NODE_TO_FDI_MAP[nodeName] || MESH_NODE_TO_FDI_MAP[nodeName.toLowerCase()];
    if (direct) return direct;

    const lower = nodeName.toLowerCase();

    // Check for molar, premolar, canine, incisor naming
    if (lower.includes('lower first molar') || lower.includes('mandibular first molar')) {
      return lower.includes('.r') || lower.includes('right') ? 46 : 36;
    }
    if (lower.includes('lower second molar') || lower.includes('mandibular second molar')) {
      return lower.includes('.r') || lower.includes('right') ? 47 : 37;
    }
    if (lower.includes('upper first molar') || lower.includes('maxillary first molar')) {
      return lower.includes('.r') || lower.includes('right') ? 16 : 26;
    }
    if (lower.includes('upper second molar') || lower.includes('maxillary second molar')) {
      return lower.includes('.r') || lower.includes('right') ? 17 : 27;
    }
    if (lower.includes('lower canine')) {
      return lower.includes('.r') || lower.includes('right') ? 43 : 33;
    }
    if (lower.includes('upper canine')) {
      return lower.includes('.r') || lower.includes('right') ? 13 : 23;
    }
    if (lower.includes('lower medial incisor') || lower.includes('lower central incisor')) {
      return lower.includes('.r') || lower.includes('right') ? 41 : 31;
    }
    if (lower.includes('upper medial incisor') || lower.includes('upper central incisor')) {
      return lower.includes('.r') || lower.includes('right') ? 11 : 21;
    }
    if (lower.includes('thirdmolar_48') || lower.includes('third_molar_48')) {
      return 48;
    }
    if (lower.includes('thirdmolar_38') || lower.includes('third_molar_38')) {
      return 38;
    }

    return null;
  }

  /**
   * Get adjacent teeth (Mesial, Distal, Opposing)
   */
  public static getAdjacentTeeth(identifier: string | number) {
    const tooth = this.resolve(identifier);
    if (!tooth) {
      return { mesial: null, distal: null, opposing: null };
    }

    return {
      mesial: tooth.mesialAdjacent ? this.resolve(tooth.mesialAdjacent) || null : null,
      distal: tooth.distalAdjacent ? this.resolve(tooth.distalAdjacent) || null : null,
      opposing: tooth.opposingTooth ? this.resolve(tooth.opposingTooth) || null : null
    };
  }

  /**
   * Medical & Topological Validator for a single tooth
   */
  public static validateTooth(tooth: ToothRecord): ToothValidationResult {
    const errors: string[] = [];

    // 1. Quadrant Validation
    const expectedQuadrant = Math.floor(tooth.fdi / 10);
    if (tooth.quadrant !== expectedQuadrant) {
      errors.push(`Quadrant mismatch: expected ${expectedQuadrant}, got ${tooth.quadrant}`);
    }

    // 2. Jaw Validation
    const isMaxillary = tooth.quadrant === 1 || tooth.quadrant === 2;
    const expectedJaw: 'MAXILLA' | 'MANDIBLE' = isMaxillary ? 'MAXILLA' : 'MANDIBLE';
    const jawPass = tooth.jaw === expectedJaw;
    if (!jawPass) {
      errors.push(`Jaw mismatch: FDI ${tooth.fdi} should be ${expectedJaw}, but marked as ${tooth.jaw}`);
    }

    // 3. Side Validation (Patient Anatomical Orientation)
    // Q1 & Q4 = Patient Right; Q2 & Q3 = Patient Left
    const expectedSide: 'RIGHT' | 'LEFT' = tooth.quadrant === 1 || tooth.quadrant === 4 ? 'RIGHT' : 'LEFT';
    const sidePass = tooth.side === expectedSide;
    if (!sidePass) {
      errors.push(`Side mismatch: FDI ${tooth.fdi} should be ${expectedSide}, but marked as ${tooth.side}`);
    }

    // 4. Tooth Type & Position Index Validation
    const posIndex = tooth.fdi % 10;
    const expectedTypeMap: Record<number, string> = {
      1: 'CENTRAL_INCISOR',
      2: 'LATERAL_INCISOR',
      3: 'CANINE',
      4: 'FIRST_PREMOLAR',
      5: 'SECOND_PREMOLAR',
      6: 'FIRST_MOLAR',
      7: 'SECOND_MOLAR',
      8: 'THIRD_MOLAR'
    };
    const typePass = tooth.toothType === expectedTypeMap[posIndex] && tooth.positionIndex === posIndex;
    if (!typePass) {
      errors.push(`Type mismatch: index ${posIndex} should be ${expectedTypeMap[posIndex]}, got ${tooth.toothType}`);
    }

    // 5. 3D World Position & Midline Coordinate Check
    // In skull_complete.glb, sagittal midline is X = 0.0451
    // Patient Right must have X < 0.0451
    // Patient Left must have X > 0.0451
    const x = tooth.craniofacialPos[0];
    const y = tooth.craniofacialPos[1];
    const isCorrectLaterality = expectedSide === 'RIGHT' ? x < DENTAL_MIDLINE_X : x > DENTAL_MIDLINE_X;
    const isCorrectElevation = isMaxillary ? y > 0.760 : y < 0.760;
    const positionPass = isCorrectLaterality && isCorrectElevation;

    if (!isCorrectLaterality) {
      errors.push(`Position X laterality error: FDI ${tooth.fdi} (${tooth.side}) has X=${x}, violates midline ${DENTAL_MIDLINE_X}`);
    }
    if (!isCorrectElevation) {
      errors.push(`Elevation Y error: FDI ${tooth.fdi} (${tooth.jaw}) has Y=${y}, violates maxilla/mandible plane`);
    }

    // 6. Adjacency Validation
    let adjacencyPass = true;
    if (posIndex > 1) {
      const expectedMesialFdi = tooth.fdi - 1;
      const expectedMesialId = `tooth.${expectedMesialFdi}`;
      if (tooth.mesialAdjacent !== expectedMesialId) {
        adjacencyPass = false;
        errors.push(`Mesial adjacency error: expected ${expectedMesialId}, got ${tooth.mesialAdjacent}`);
      }
    } else {
      // Central incisor touches opposite central incisor
      const opposingMidlineFdi = tooth.fdi === 11 ? 21 : tooth.fdi === 21 ? 11 : tooth.fdi === 31 ? 41 : 31;
      const expectedMesialId = `tooth.${opposingMidlineFdi}`;
      if (tooth.mesialAdjacent !== expectedMesialId) {
        adjacencyPass = false;
        errors.push(`Midline mesial adjacency error: expected ${expectedMesialId}, got ${tooth.mesialAdjacent}`);
      }
    }

    if (posIndex < 8) {
      const expectedDistalFdi = tooth.fdi + 1;
      const expectedDistalId = `tooth.${expectedDistalFdi}`;
      if (tooth.distalAdjacent !== expectedDistalId) {
        adjacencyPass = false;
        errors.push(`Distal adjacency error: expected ${expectedDistalId}, got ${tooth.distalAdjacent}`);
      }
    } else {
      if (tooth.distalAdjacent !== null) {
        adjacencyPass = false;
        errors.push(`Third molar should have null distalAdjacent, got ${tooth.distalAdjacent}`);
      }
    }

    // 7. Mesh Mapping Check
    const meshPass = Boolean(tooth.meshNodeName);
    if (!meshPass) {
      errors.push(`Missing meshNodeName`);
    }

    const orientationPass = true;

    return {
      fdi: tooth.fdi,
      id: tooth.id,
      nameEn: tooth.nameEn,
      valid: errors.length === 0,
      errors,
      jawPass,
      sidePass,
      typePass,
      meshPass,
      positionPass,
      adjacencyPass,
      orientationPass
    };
  }

  /**
   * Validate all 32 teeth in the registry
   */
  public static validateAllTeeth() {
    const results: Record<number, ToothValidationResult> = {};
    let totalErrors = 0;

    for (let fdi = 11; fdi <= 48; fdi++) {
      // Skip invalid FDI digits (e.g. 19, 20, 29, 30, 39, 40)
      const lastDigit = fdi % 10;
      if (lastDigit < 1 || lastDigit > 8) continue;

      const tooth = TOOTH_REGISTRY[fdi];
      if (!tooth) {
        totalErrors++;
        results[fdi] = {
          fdi,
          id: `tooth.${fdi}`,
          nameEn: 'MISSING',
          valid: false,
          errors: ['Tooth missing from registry'],
          jawPass: false,
          sidePass: false,
          typePass: false,
          meshPass: false,
          positionPass: false,
          adjacencyPass: false,
          orientationPass: false
        };
        continue;
      }

      const val = this.validateTooth(tooth);
      results[fdi] = val;
      if (!val.valid) {
        totalErrors += val.errors.length;
      }
    }

    return {
      allValid: totalErrors === 0,
      totalTeeth: 32,
      passedTeeth: Object.values(results).filter((r) => r.valid).length,
      failedTeeth: Object.values(results).filter((r) => !r.valid).length,
      totalErrors,
      results
    };
  }
}
