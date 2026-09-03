import * as THREE from 'three';
import { ANATOMICAL_PLACEMENTS } from './AnatomyTransformNormalizer';

export interface OrientationValidationResult {
  valid: boolean;
  checks: {
    name: string;
    passed: boolean;
    description: string;
  }[];
}

export class AnatomyOrientationValidator {
  /**
   * Validates that all critical organs maintain correct anatomical orientations,
   * lateralization (Left vs Right), and anterior-posterior alignment.
   */
  static validate(): OrientationValidationResult {
    const checks: OrientationValidationResult['checks'] = [];

    // 1. Skull Face Direction = Anterior (+Z)
    const skull = ANATOMICAL_PLACEMENTS.skull;
    const skullRot = skull.rotationOffset || [0, 0, 0];
    // With -PI/2 around Y, the local face (+X) rotates to world +Z
    const skullFacesAnterior = Math.abs(skullRot[1] - (-Math.PI / 2)) < 0.01;
    checks.push({
      name: 'Skull Face Direction',
      passed: skullFacesAnterior,
      description: skullFacesAnterior
        ? 'Skull face (maxilla, mandible, nasal) points anteriorly towards +Z.'
        : 'Skull face is not facing anteriorly!'
    });

    // 2. Brain Anterior/Posterior
    const brain = ANATOMICAL_PLACEMENTS.brain;
    const brainInsideSkull =
      Math.abs(brain.position[1] - skull.position[1]) < 0.05 &&
      Math.abs(brain.position[2] - skull.position[2]) < 0.05;
    checks.push({
      name: 'Brain Co-localization',
      passed: brainInsideSkull,
      description: brainInsideSkull
        ? 'Brain is co-localized with skull inside cranial vault.'
        : 'Brain is offset from skull!'
    });

    // 3. Heart Left Asymmetry
    const heart = ANATOMICAL_PLACEMENTS.heart;
    const heartLeftOfMidline = heart.position[0] < 0; // -X is left
    checks.push({
      name: 'Heart Visceral Lateralization',
      passed: heartLeftOfMidline,
      description: heartLeftOfMidline
        ? 'Heart apex is lateralized to the left (-X) in middle mediastinum.'
        : 'Heart is not lateralized to the left!'
    });

    // 4. Liver Right Dominance vs Stomach Left Dominance
    const liver = ANATOMICAL_PLACEMENTS.liver;
    const stomach = ANATOMICAL_PLACEMENTS.stomach;
    const visceralAsymmetryOk = liver.position[0] > 0 && stomach.position[0] < 0;
    checks.push({
      name: 'Liver (RUQ) and Stomach (LUQ) Asymmetry',
      passed: visceralAsymmetryOk,
      description: visceralAsymmetryOk
        ? 'Liver is in Right Upper Quadrant (+X) and Stomach in Left Upper Quadrant (-X).'
        : 'Liver and Stomach lateral positions are invalid!'
    });

    // 5. Kidneys Posterior Retroperitoneal Position
    const kidneys = ANATOMICAL_PLACEMENTS.kidneys;
    const kidneysPosterior = kidneys.position[2] < 0; // -Z is posterior
    checks.push({
      name: 'Kidneys Retroperitoneal Depth',
      passed: kidneysPosterior,
      description: kidneysPosterior
        ? 'Kidneys are situated posteriorly in the retroperitoneum (-Z).'
        : 'Kidneys are not situated posteriorly!'
    });

    // 6. Body Skin Anterior Alignment
    const bodySkin = ANATOMICAL_PLACEMENTS.body_skin;
    const bodySkinRot = bodySkin.rotationOffset || [0, 0, 0];
    const bodyFacesAnterior = Math.abs(bodySkinRot[1] - (-Math.PI / 2)) < 0.01;
    checks.push({
      name: 'Body Skin Anterior Direction',
      passed: bodyFacesAnterior,
      description: bodyFacesAnterior
        ? 'Body skin envelope faces anteriorly towards +Z, matching skull and skeleton.'
        : 'Body skin is not facing anteriorly!'
    });

    const allValid = checks.every((c) => c.passed);
    console.log('[AnatomyOrientationValidator] Validation complete. All valid:', allValid);
    return {
      valid: allValid,
      checks
    };
  }
}
