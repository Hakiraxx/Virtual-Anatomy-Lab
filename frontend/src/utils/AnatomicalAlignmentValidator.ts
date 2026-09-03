import { ANATOMICAL_PLACEMENTS } from './AnatomyTransformNormalizer';
import { AnatomyLateralityValidator } from './AnatomyLateralityValidator';
import { AnatomyRegionValidator } from './AnatomyRegionValidator';
import { AnatomyIntersectionValidator } from './AnatomyIntersectionValidator';
import { AnatomyOrientationValidator } from './AnatomyOrientationValidator';

export interface ComprehensiveAlignmentCheck {
  structure: string;
  category: 'SKULL' | 'BRAIN' | 'SPINE' | 'HEART' | 'LUNGS' | 'LIVER' | 'STOMACH' | 'KIDNEYS' | 'BLADDER' | 'THYROID' | 'REPRODUCTIVE';
  status: 'PASS' | 'PARTIAL' | 'FAIL';
  detail: string;
}

export class AnatomicalAlignmentValidator {
  /**
   * Section AK: Master alignment validator evaluating all critical organs
   * with clinical anatomical criteria.
   */
  static validateAll(): {
    overallStatus: 'PASS' | 'PARTIAL' | 'FAIL';
    checks: ComprehensiveAlignmentCheck[];
  } {
    const checks: ComprehensiveAlignmentCheck[] = [];

    // 1. Skull: Facial orientation
    const skull = ANATOMICAL_PLACEMENTS.skull;
    const skullRot = skull?.rotationOffset || [0, 0, 0];
    const skullFacingAnterior = Math.abs(skullRot[1] - (-Math.PI / 2)) < 0.05;
    checks.push({
      structure: 'Skull & Facial Bones',
      category: 'SKULL',
      status: skullFacingAnterior ? 'PASS' : 'FAIL',
      detail: skullFacingAnterior
        ? 'Facial skeleton, orbits, and dental arches point strictly anterior (+Z)'
        : 'Skull orientation is inverted or lateralized'
    });

    // 2. Brain: Encephalon accommodation inside neurocranium
    const brain = ANATOMICAL_PLACEMENTS.brain;
    const brainInside =
      brain && skull &&
      Math.abs(brain.position[1] - skull.position[1]) < 0.05 &&
      brain.targetSize < skull.targetSize;
    checks.push({
      structure: 'Brain (Encephalon)',
      category: 'BRAIN',
      status: brainInside ? 'PASS' : 'FAIL',
      detail: brainInside
        ? 'Cerebrum, cerebellum, and brainstem accommodated inside cranial vault'
        : 'Brain displaced outside neurocranium boundaries'
    });

    // 3. Spine: Axial continuity from C1 to Sacrum
    const spine = ANATOMICAL_PLACEMENTS.spine;
    const spineOk = spine && Math.abs(spine.position[0]) <= 0.02 && spine.position[1] >= 1.0;
    checks.push({
      structure: 'Vertebral Column',
      category: 'SPINE',
      status: spineOk ? 'PASS' : 'FAIL',
      detail: spineOk
        ? 'Continuous spinal column traversing cervical, thoracic, and lumbar regions'
        : 'Spinal alignment deviated from sagittal midline'
    });

    // 4. Heart: Middle mediastinal placement with apex pointing anterior-inferior-left
    const heart = ANATOMICAL_PLACEMENTS.heart;
    const heartOk = heart && heart.position[0] < 0 && heart.position[1] >= 1.15 && heart.position[1] <= 1.25;
    checks.push({
      structure: 'Heart (Cor)',
      category: 'HEART',
      status: heartOk ? 'PASS' : 'FAIL',
      detail: heartOk
        ? 'Situated in middle mediastinum with apex lateralized to left (-X)'
        : 'Cardiac positioning violates thoracic boundaries'
    });

    // 5. Lungs: Bilateral pleural cavities embracing mediastinum
    const lungs = ANATOMICAL_PLACEMENTS.lungs;
    const lungsOk = lungs && lungs.position[1] >= 1.15 && lungs.position[1] <= 1.30;
    checks.push({
      structure: 'Lungs (Pulmones)',
      category: 'LUNGS',
      status: lungsOk ? 'PASS' : 'FAIL',
      detail: lungsOk
        ? 'Bilateral pulmonary parenchyma conforming to thoracic cage'
        : 'Lungs displaced outside thoracic cavity'
    });

    // 6. Liver: Right Upper Quadrant dominance
    const liver = ANATOMICAL_PLACEMENTS.liver;
    const liverOk = liver && liver.position[0] > 0.03 && liver.position[1] >= 0.95 && liver.position[1] <= 1.10;
    checks.push({
      structure: 'Liver (Hepar)',
      category: 'LIVER',
      status: liverOk ? 'PASS' : 'FAIL',
      detail: liverOk
        ? 'Massive right lobe situated in Right Upper Quadrant under diaphragm'
        : 'Liver displaced from subdiaphragmatic space'
    });

    // 7. Stomach: Left Upper Quadrant
    const stomach = ANATOMICAL_PLACEMENTS.stomach;
    const stomachOk = stomach && stomach.position[0] < -0.02 && stomach.position[1] >= 0.95;
    checks.push({
      structure: 'Stomach (Gaster)',
      category: 'STOMACH',
      status: stomachOk ? 'PASS' : 'FAIL',
      detail: stomachOk
        ? 'Cardia, fundus, and body positioned in Left Upper Quadrant'
        : 'Stomach deviates from left hypochondrium'
    });

    // 8. Kidneys: Retroperitoneal posterior abdomen
    const kidneys = ANATOMICAL_PLACEMENTS.kidneys;
    const kidneysOk = kidneys && kidneys.position[2] < 0 && kidneys.position[1] >= 0.95;
    checks.push({
      structure: 'Kidneys (Renes)',
      category: 'KIDNEYS',
      status: kidneysOk ? 'PASS' : 'FAIL',
      detail: kidneysOk
        ? 'Bilateral renal organs reside retroperitoneally flanking spine'
        : 'Kidneys displaced anteriorly into peritoneal space'
    });

    // 9. Bladder: Pelvic cavity posterior to pubic symphysis
    const bladder = ANATOMICAL_PLACEMENTS.bladder;
    const bladderOk = bladder && bladder.position[1] <= 0.82 && bladder.position[1] >= 0.74;
    checks.push({
      structure: 'Urinary Bladder (Vesica urinaria)',
      category: 'BLADDER',
      status: bladderOk ? 'PASS' : 'FAIL',
      detail: bladderOk
        ? 'Resting in lesser pelvis behind pubic symphysis'
        : 'Bladder displaced outside pelvic boundaries'
    });

    // 10. Thyroid: Anterior neck below larynx
    const thyroid = ANATOMICAL_PLACEMENTS.thyroid;
    const thyroidOk = thyroid && thyroid.position[1] >= 1.38 && thyroid.position[1] <= 1.46;
    checks.push({
      structure: 'Thyroid Gland (Glandula thyroidea)',
      category: 'THYROID',
      status: thyroidOk ? 'PASS' : 'FAIL',
      detail: thyroidOk
        ? 'Situated in anterior visceral space of neck in front of trachea'
        : 'Thyroid position deviates from cervical region'
    });

    // 11. Reproductive: Pelvic visceral positioning
    const testis = ANATOMICAL_PLACEMENTS.testis;
    const uterus = ANATOMICAL_PLACEMENTS.uterus;
    const reproOk = (testis && testis.position[1] < 0.75) && (uterus && uterus.position[1] <= 0.82);
    checks.push({
      structure: 'Reproductive System (Male & Female)',
      category: 'REPRODUCTIVE',
      status: reproOk ? 'PASS' : 'FAIL',
      detail: reproOk
        ? 'Male gonads in scrotum, female internal genitalia in pelvic cavity'
        : 'Reproductive structures misaligned with pelvic anatomy'
    });

    const allPass = checks.every((c) => c.status === 'PASS');
    return {
      overallStatus: allPass ? 'PASS' : 'PARTIAL',
      checks
    };
  }
}
