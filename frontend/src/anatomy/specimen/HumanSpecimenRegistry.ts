/**
 * HumanSpecimenRegistry.ts
 *
 * Centralized Specimen Authority for MedAnatomy 3D
 * Provides strict separation of Male and Female anatomical assets, cache keys,
 * and sex-specific organ filters based on standard adult human specimens.
 */

export type SpecimenGender = 'male' | 'female';

export interface SexSpecificStructureConfig {
  id: string;
  organKey: string;
  modelFile: string;
  nameVi: string;
  nameEn: string;
  nameLatin: string;
  cavity: 'THORACIC' | 'PELVIC' | 'EXTERNAL_GENITALIA';
  position: [number, number, number];
  targetSize: number;
  scaleMultiplier?: [number, number, number];
}

export interface SpecimenDefinition {
  specimenId: 'specimen.human.male' | 'specimen.human.female';
  sex: SpecimenGender;
  labelVi: string;
  labelEn: string;
  cacheKey: string;
  scientificName: string;
  bodyModelFile: string;
  visceraModelFile: string;
  skeletonModelFile: string;
  vesselsModelFile: string;
  nervesModelFile: string;
  // Node patterns that must NEVER be rendered in this specimen
  excludedNodePatterns: RegExp[];
  // Authoritative sex-specific structures loaded and calibrated for this specimen
  sexSpecificStructures: SexSpecificStructureConfig[];
  reviewStatus: 'VERIFIED_REAL' | 'PARTIAL' | 'UNVERIFIED';
}

export const HUMAN_SPECIMEN_REGISTRY: Record<SpecimenGender, SpecimenDefinition> = {
  male: {
    specimenId: 'specimen.human.male',
    sex: 'male',
    labelVi: 'Cơ thể Nam giới',
    labelEn: 'Male Human Body',
    scientificName: 'Homo sapiens ♂',
    cacheKey: 'wholebody:male',
    bodyModelFile: '/models/body.glb',
    visceraModelFile: '/models/anatomy/organs_complete.glb',
    skeletonModelFile: '/models/anatomy/skeleton_complete.glb',
    vesselsModelFile: '/models/anatomy/vessels_complete.glb',
    nervesModelFile: '/models/anatomy/nervous_complete.glb',
    // Male specimen excludes female-only reproductive structures
    excludedNodePatterns: [
      /uterus|uterine|ovary|ovarian|vagina|vulva|clitoris|fallopian|mamma|mammary/i
    ],
    sexSpecificStructures: [
      {
        id: 'testis',
        organKey: 'testis',
        modelFile: '/models/testis.glb',
        nameVi: 'Tinh hoàn & Mào tinh (Nam)',
        nameEn: 'Testis & Epididymis (Male)',
        nameLatin: 'Testis / Orchis',
        cavity: 'EXTERNAL_GENITALIA',
        position: [0.045, 0.842, 0.051],
        targetSize: 0.08
      },
      {
        id: 'penis',
        organKey: 'penis',
        modelFile: '/models/penis.glb',
        nameVi: 'Dương vật (Nam)',
        nameEn: 'Penis (Male)',
        nameLatin: 'Penis',
        cavity: 'EXTERNAL_GENITALIA',
        position: [0.045, 0.904, 0.040],
        targetSize: 0.10
      },
      {
        id: 'prostate',
        organKey: 'prostate',
        modelFile: '/models/prostate.glb',
        nameVi: 'Tuyến tiền liệt (Nam)',
        nameEn: 'Prostate Gland (Male)',
        nameLatin: 'Prostata',
        cavity: 'PELVIC',
        position: [0.045, 0.933, -0.032],
        targetSize: 0.06
      }
    ],
    reviewStatus: 'VERIFIED_REAL'
  },
  female: {
    specimenId: 'specimen.human.female',
    sex: 'female',
    labelVi: 'Cơ thể Nữ giới',
    labelEn: 'Female Human Body',
    scientificName: 'Homo sapiens ♀',
    cacheKey: 'wholebody:female',
    bodyModelFile: '/models/body.glb',
    visceraModelFile: '/models/anatomy/organs_complete.glb',
    skeletonModelFile: '/models/anatomy/skeleton_complete.glb',
    vesselsModelFile: '/models/anatomy/vessels_complete.glb',
    nervesModelFile: '/models/anatomy/nervous_complete.glb',
    // Female specimen MUST STRICTLY EXCLUDE all male genital and reproductive nodes
    excludedNodePatterns: [
      /penis/i,
      /glans\s*penis/i,
      /corpus\s*cavernosum/i,
      /corpus\s*spongiosum/i,
      /testis/i,
      /testicle/i,
      /scrotum/i,
      /prostate/i,
      /epididymis/i,
      /ductus\s*deferens/i,
      /vas\s*deferens/i,
      /seminal\s*gland/i,
      /seminal\s*vesicle/i,
      /male\s*(internal|external)?\s*genital/i,
      /male\s*genital\s*system/i
    ],
    sexSpecificStructures: [
      {
        id: 'uterus',
        organKey: 'uterus',
        modelFile: '/models/uterus.glb',
        nameVi: 'Tử cung (Nữ)',
        nameEn: 'Uterus (Womb - Female)',
        nameLatin: 'Uterus / Metra',
        cavity: 'PELVIC',
        position: [0.045, 0.955, 0.020],
        targetSize: 0.10
      },
      {
        id: 'ovary',
        organKey: 'ovary',
        modelFile: '/models/ovary.glb',
        nameVi: 'Buồng trứng (Nữ)',
        nameEn: 'Ovaries (Female)',
        nameLatin: 'Ovarium',
        cavity: 'PELVIC',
        position: [0.085, 0.960, 0.010],
        targetSize: 0.06
      },
      {
        id: 'vagina',
        organKey: 'vagina',
        modelFile: '/models/vagina.glb',
        nameVi: 'Âm đạo (Nữ)',
        nameEn: 'Vagina (Female)',
        nameLatin: 'Vagina',
        cavity: 'PELVIC',
        position: [0.045, 0.915, 0.020],
        targetSize: 0.08
      },
      {
        id: 'uterine_tube',
        organKey: 'uterine_tube',
        modelFile: '/models/uterine-tube.glb',
        nameVi: 'Vòi tử cung (Nữ)',
        nameEn: 'Fallopian Tubes (Female)',
        nameLatin: 'Tuba uterina',
        cavity: 'PELVIC',
        position: [0.045, 0.965, 0.015],
        targetSize: 0.12
      },
      {
        id: 'breast_left',
        organKey: 'breast_left',
        modelFile: '/models/breast.glb',
        nameVi: 'Tuyến vú Trái (Nữ)',
        nameEn: 'Left Mammary Gland (Female)',
        nameLatin: 'Mamma sinistra',
        cavity: 'THORACIC',
        position: [0.125, 1.440, 0.120],
        targetSize: 0.14
      },
      {
        id: 'breast_right',
        organKey: 'breast_right',
        modelFile: '/models/breast.glb',
        nameVi: 'Tuyến vú Phải (Nữ)',
        nameEn: 'Right Mammary Gland (Female)',
        nameLatin: 'Mamma dextra',
        cavity: 'THORACIC',
        position: [-0.035, 1.440, 0.120],
        targetSize: 0.14,
        scaleMultiplier: [-1, 1, 1]
      }
    ],
    reviewStatus: 'VERIFIED_REAL'
  }
};

export class HumanSpecimenRegistry {
  /**
   * Retrieves the authoritative specimen definition for a given sex.
   */
  static getSpecimen(gender: SpecimenGender): SpecimenDefinition {
    return HUMAN_SPECIMEN_REGISTRY[gender] || HUMAN_SPECIMEN_REGISTRY.male;
  }

  /**
   * Checks if an anatomical node name should be suppressed in the current specimen.
   */
  static shouldExcludeNode(nodeName: string, gender: SpecimenGender): boolean {
    const specimen = this.getSpecimen(gender);
    return specimen.excludedNodePatterns.some((pattern) => pattern.test(nodeName));
  }

  /**
   * Returns cache key for Three.js scene caching and GLTF memory management.
   */
  static getCacheKey(gender: SpecimenGender): string {
    return this.getSpecimen(gender).cacheKey;
  }
}
