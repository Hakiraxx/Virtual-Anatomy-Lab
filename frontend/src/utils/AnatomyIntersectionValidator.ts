import { ANATOMICAL_PLACEMENTS } from './AnatomyTransformNormalizer';

export interface IntersectionCheck {
  pair: string;
  relationType: 'CONTAINMENT' | 'ADJACENCY' | 'BOUNDARY';
  passed: boolean;
  notes: string;
}

export class AnatomyIntersectionValidator {
  /**
   * Validates geometric containment and physiological boundary relations.
   */
  static validate(): { valid: boolean; checks: IntersectionCheck[] } {
    const checks: IntersectionCheck[] = [];

    // 1. Brain inside Cranial Vault
    const brain = ANATOMICAL_PLACEMENTS.brain;
    const skull = ANATOMICAL_PLACEMENTS.skull;
    if (brain && skull) {
      const dy = Math.abs(brain.position[1] - skull.position[1]);
      const dz = Math.abs(brain.position[2] - skull.position[2]);
      const brainContained = dy < 0.05 && dz < 0.05 && brain.targetSize < skull.targetSize;
      checks.push({
        pair: 'Brain ⊂ Skull',
        relationType: 'CONTAINMENT',
        passed: brainContained,
        notes: brainContained
          ? 'Encephalon fully accommodated inside neurocranium vault'
          : 'Brain geometry breaches skull boundaries'
      });
    }

    // 2. Heart posterior to Sternal Wall
    const heart = ANATOMICAL_PLACEMENTS.heart;
    const ribcage = ANATOMICAL_PLACEMENTS.ribcage;
    if (heart && ribcage) {
      // Heart Z should sit in anterior mediastinum but not protruding past anterior thoracic boundary
      const heartInThorax = heart.position[2] <= 0.08 && heart.position[1] >= 1.15 && heart.position[1] <= 1.30;
      checks.push({
        pair: 'Heart ⊂ Anterior Mediastinum',
        relationType: 'CONTAINMENT',
        passed: heartInThorax,
        notes: heartInThorax
          ? 'Heart rests securely in middle mediastinum behind sternum'
          : 'Heart abnormally penetrates anterior thoracic wall'
      });
    }

    // 3. Kidneys Retroperitoneal (Behind abdominal viscera)
    const kidneys = ANATOMICAL_PLACEMENTS.kidneys;
    const stomach = ANATOMICAL_PLACEMENTS.stomach;
    if (kidneys && stomach) {
      const kidneysPosterior = kidneys.position[2] < stomach.position[2];
      checks.push({
        pair: 'Kidneys posterior to Stomach',
        relationType: 'BOUNDARY',
        passed: kidneysPosterior,
        notes: kidneysPosterior
          ? 'Renal organs maintain retroperitoneal posterior relationship'
          : 'Kidneys abnormally displaced anteriorly'
      });
    }

    // 4. Bladder in Pelvic Cavity below Sacral Promontory
    const bladder = ANATOMICAL_PLACEMENTS.bladder;
    const pelvis = ANATOMICAL_PLACEMENTS.pelvis;
    if (bladder && pelvis) {
      const bladderInPelvis = bladder.position[1] <= pelvis.position[1];
      checks.push({
        pair: 'Bladder ⊂ Lesser Pelvis',
        relationType: 'CONTAINMENT',
        passed: bladderInPelvis,
        notes: bladderInPelvis
          ? 'Urinary bladder resides subperitoneally behind pubic symphysis'
          : 'Bladder displaced out of pelvic cavity'
      });
    }

    const valid = checks.every((c) => c.passed);
    return { valid, checks };
  }
}
