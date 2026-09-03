import { ANATOMICAL_PLACEMENTS } from './AnatomyTransformNormalizer';

export type AnatomicalRegion =
  | 'HEAD'
  | 'NECK'
  | 'THORAX'
  | 'ABDOMEN'
  | 'PELVIS'
  | 'UPPER_LIMB'
  | 'LOWER_LIMB';

export interface RegionCheck {
  structureId: string;
  expectedRegion: AnatomicalRegion;
  actualY: number;
  passed: boolean;
  notes: string;
}

export const REGION_VERTICAL_BOUNDS: Record<AnatomicalRegion, { minY: number; maxY: number }> = {
  HEAD: { minY: 1.50, maxY: 1.78 },
  NECK: { minY: 1.38, maxY: 1.50 },
  THORAX: { minY: 1.12, maxY: 1.38 },
  ABDOMEN: { minY: 0.86, maxY: 1.12 },
  PELVIS: { minY: 0.68, maxY: 0.86 },
  UPPER_LIMB: { minY: 1.05, maxY: 1.42 },
  LOWER_LIMB: { minY: 0.35, maxY: 0.60 }
};

export class AnatomyRegionValidator {
  private static STRUCTURE_REGIONS: Record<string, AnatomicalRegion> = {
    brain: 'HEAD',
    skull: 'HEAD',
    pituitary: 'HEAD',
    eyeball: 'HEAD',
    cranial_nerves: 'HEAD',
    brainstem: 'HEAD',
    thyroid: 'NECK',
    larynx: 'NECK',
    heart: 'THORAX',
    lungs: 'THORAX',
    ribcage: 'THORAX',
    coronary_arteries: 'THORAX',
    aorta_arch: 'THORAX',
    diaphragm: 'THORAX',
    liver: 'ABDOMEN',
    stomach: 'ABDOMEN',
    spleen: 'ABDOMEN',
    pancreas: 'ABDOMEN',
    gallbladder: 'ABDOMEN',
    intestine: 'ABDOMEN',
    kidneys: 'ABDOMEN',
    adrenal: 'ABDOMEN',
    pelvis: 'PELVIS',
    bladder: 'PELVIS',
    testis: 'PELVIS',
    penis: 'PELVIS',
    prostate: 'PELVIS',
    uterus: 'PELVIS',
    ovary: 'PELVIS',
    shoulder_joint: 'UPPER_LIMB',
    biceps: 'UPPER_LIMB',
    knee_joint: 'LOWER_LIMB'
  };

  /**
   * Validates that every registered organ resides inside its physiologic anatomical body region.
   */
  static validate(): { valid: boolean; checks: RegionCheck[] } {
    const checks: RegionCheck[] = [];

    for (const [id, region] of Object.entries(this.STRUCTURE_REGIONS)) {
      const placement = ANATOMICAL_PLACEMENTS[id];
      if (!placement) continue;

      const bounds = REGION_VERTICAL_BOUNDS[region];
      const y = placement.position[1];
      const passed = y >= bounds.minY && y <= bounds.maxY;

      checks.push({
        structureId: id,
        expectedRegion: region,
        actualY: y,
        passed,
        notes: passed
          ? `${id} properly positioned within ${region} boundaries [${bounds.minY}m - ${bounds.maxY}m]`
          : `${id} vertical position (${y.toFixed(2)}m) violates ${region} bounds [${bounds.minY}m - ${bounds.maxY}m]`
      });
    }

    const valid = checks.every((c) => c.passed);
    return { valid, checks };
  }
}
