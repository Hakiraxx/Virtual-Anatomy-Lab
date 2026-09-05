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
    preset: 'default' | 'occlusal' | 'buccal' | 'lingual' | 'mesial' | 'distal' | 'apical' | 'root' = 'default'
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
      // Scale is 2.2x -> normalized height ~0.0484m. At FOV 30, distance 0.145m yields 55-65% viewport height
      const d = 0.145;
      if (preset === 'occlusal') return { position: [0, d, 0.001], lookAt: [0, 0, 0], distance: d };
      if (preset === 'apical') return { position: [0, -d, 0.001], lookAt: [0, 0, 0], distance: d };
      if (preset === 'buccal') return { position: [0, 0, d], lookAt: [0, 0, 0], distance: d };
      if (preset === 'lingual') return { position: [0, 0, -d], lookAt: [0, 0, 0], distance: d };
      if (preset === 'mesial') return { position: [d, 0, 0], lookAt: [0, 0, 0], distance: d };
      if (preset === 'distal') return { position: [-d, 0, 0], lookAt: [0, 0, 0], distance: d };
      if (preset === 'root') return { position: [0.05, -0.11, 0.10], lookAt: [0, -0.015, 0], distance: d };

      // 3/4 Isometric Perspective (Default)
      return {
        position: [0.095, 0.055, 0.115],
        lookAt: [0, 0, 0],
        distance: 0.155
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

    // Camera offset: position camera for 55-65% screen height (~0.067m distance)
    const offsetX = isRightSide ? -0.040 : 0.040;
    const offsetY = tooth.jaw === 'MANDIBLE' ? 0.020 : -0.020;
    const offsetZ = 0.050;

    return {
      position: [tx + offsetX, ty + offsetY, tz + offsetZ],
      lookAt: [tx, ty, tz],
      distance: 0.067
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
   * Handles raw glTF node names ("Upper medial incisor.l") and Three.js sanitized names ("Upper_medial_incisorl")
   */
  public static getFdiFromMeshNodeName(nodeName: string): number | null {
    if (!nodeName) return null;
    const direct = MESH_NODE_TO_FDI_MAP[nodeName] || MESH_NODE_TO_FDI_MAP[nodeName.toLowerCase()];
    if (direct) return direct;

    // Normalize underscores, dots, and spaces
    const clean = nodeName.toLowerCase().replace(/_/g, ' ');
    const isRight = clean.includes('.r') || clean.includes(' right') || clean.endsWith('r') || clean.endsWith(' r');
    const isLeft = clean.includes('.l') || clean.includes(' left') || clean.endsWith('l') || clean.endsWith(' l');

    if (clean.includes('upper medial incisor') || clean.includes('upper central incisor')) {
      return isRight ? 11 : isLeft ? 21 : 11;
    }
    if (clean.includes('upper lateral incisor')) {
      return isRight ? 12 : isLeft ? 22 : 12;
    }
    if (clean.includes('upper canine')) {
      return isRight ? 13 : isLeft ? 23 : 13;
    }
    if (clean.includes('upper first premolar')) {
      return isRight ? 14 : isLeft ? 24 : 14;
    }
    if (clean.includes('upper second premolar')) {
      return isRight ? 15 : isLeft ? 25 : 15;
    }
    if (clean.includes('upper first molar') || clean.includes('maxillary first molar')) {
      return isRight ? 16 : isLeft ? 26 : 16;
    }
    if (clean.includes('upper second molar') || clean.includes('maxillary second molar')) {
      return isRight ? 17 : isLeft ? 27 : 17;
    }
    if (clean.includes('upper third molar')) {
      return isRight ? 18 : isLeft ? 28 : 18;
    }

    if (clean.includes('lower medial incisor') || clean.includes('lower central incisor')) {
      return isRight ? 41 : isLeft ? 31 : 41;
    }
    if (clean.includes('lower lateral incisor')) {
      return isRight ? 42 : isLeft ? 32 : 42;
    }
    if (clean.includes('lower canine')) {
      return isRight ? 43 : isLeft ? 33 : 43;
    }
    if (clean.includes('lower first premolar')) {
      return isRight ? 44 : isLeft ? 34 : 44;
    }
    if (clean.includes('lower second premolar')) {
      return isRight ? 45 : isLeft ? 35 : 45;
    }
    if (clean.includes('lower first molar') || clean.includes('mandibular first molar')) {
      return isRight ? 46 : isLeft ? 36 : 46;
    }
    if (clean.includes('lower second molar') || clean.includes('mandibular second molar')) {
      return isRight ? 47 : isLeft ? 37 : 47;
    }
    if (clean.includes('lower third molar') || clean.includes('thirdmolar_48') || clean.includes('third_molar_48')) {
      return 48;
    }
    if (clean.includes('thirdmolar_38') || clean.includes('third_molar_38')) {
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
