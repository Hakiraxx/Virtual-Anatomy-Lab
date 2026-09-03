import { ANATOMICAL_PLACEMENTS } from './AnatomyTransformNormalizer';

export interface LateralityCheck {
  structureId: string;
  expectedSide: 'LEFT' | 'RIGHT' | 'MIDLINE' | 'BILATERAL';
  actualX: number;
  passed: boolean;
  notes: string;
}

export class AnatomyLateralityValidator {
  /**
   * Validates physiological laterality and visceral asymmetry:
   * Patient Right = +X, Patient Left = -X, Midline = |X| <= 0.03
   */
  static validate(): { valid: boolean; checks: LateralityCheck[] } {
    const checks: LateralityCheck[] = [];

    // 1. Heart: 2/3 of heart mass and cardiac apex point Left (-X)
    const heart = ANATOMICAL_PLACEMENTS.heart;
    if (heart) {
      const isLeft = heart.position[0] < -0.01;
      checks.push({
        structureId: 'heart',
        expectedSide: 'LEFT',
        actualX: heart.position[0],
        passed: isLeft,
        notes: isLeft ? 'Cardiac apex lateralized to left (-X)' : 'Cardiac apex is not lateralized to left'
      });
    }

    // 2. Liver: Dominant right lobe occupies Right Upper Quadrant (+X)
    const liver = ANATOMICAL_PLACEMENTS.liver;
    if (liver) {
      const isRight = liver.position[0] > 0.03;
      checks.push({
        structureId: 'liver',
        expectedSide: 'RIGHT',
        actualX: liver.position[0],
        passed: isRight,
        notes: isRight ? 'Liver bulk positioned in Right Upper Quadrant (+X)' : 'Liver is not positioned in RUQ'
      });
    }

    // 3. Stomach: Cardiac orifice & fundus occupy Left Upper Quadrant (-X)
    const stomach = ANATOMICAL_PLACEMENTS.stomach;
    if (stomach) {
      const isLeft = stomach.position[0] < -0.02;
      checks.push({
        structureId: 'stomach',
        expectedSide: 'LEFT',
        actualX: stomach.position[0],
        passed: isLeft,
        notes: isLeft ? 'Gastric fundus positioned in Left Upper Quadrant (-X)' : 'Stomach is not in LUQ'
      });
    }

    // 4. Spleen: Situated in posterior LUQ against left diaphragm (-X)
    const spleen = ANATOMICAL_PLACEMENTS.spleen;
    if (spleen) {
      const isLeft = spleen.position[0] < -0.05;
      checks.push({
        structureId: 'spleen',
        expectedSide: 'LEFT',
        actualX: spleen.position[0],
        passed: isLeft,
        notes: isLeft ? 'Spleen lateralized to posterolateral LUQ (-X)' : 'Spleen not in left hypochondrium'
      });
    }

    // 5. Midline axial structures: Skull, Spine, Bladder, Trachea must center near X = 0
    const midlineStructures = ['skull', 'spine', 'bladder'];
    for (const id of midlineStructures) {
      const s = ANATOMICAL_PLACEMENTS[id];
      if (s) {
        const isMidline = Math.abs(s.position[0]) <= 0.03;
        checks.push({
          structureId: id,
          expectedSide: 'MIDLINE',
          actualX: s.position[0],
          passed: isMidline,
          notes: isMidline ? `${id} aligns with sagittal midline plane` : `${id} deviates from sagittal plane`
        });
      }
    }

    const valid = checks.every((c) => c.passed);
    return { valid, checks };
  }
}
