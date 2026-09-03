/**
 * Master Male Anatomical Calibration
 * Coordinates based on standard 1.75m adult male in anatomical position.
 */
export interface GenderCalibrationConfig {
  gender: 'male' | 'female';
  pelvisWidthScale: number;
  shoulderWidthScale: number;
  specificStructures: Record<
    string,
    {
      position: [number, number, number];
      targetSize: number;
      rotationOffset?: [number, number, number];
      cavity: 'CRANIAL' | 'THORACIC' | 'ABDOMINAL' | 'PELVIC' | 'EXTREMITY';
    }
  >;
}

export const MALE_CALIBRATION: GenderCalibrationConfig = {
  gender: 'male',
  pelvisWidthScale: 1.0, // Android pelvis - narrower and deeper
  shoulderWidthScale: 1.05, // Broader shoulder girdle
  specificStructures: {
    testis: {
      position: [0.0, 0.72, 0.06],
      targetSize: 0.08,
      cavity: 'PELVIC'
    },
    penis: {
      position: [0.0, 0.74, 0.08],
      targetSize: 0.10,
      cavity: 'PELVIC'
    },
    prostate: {
      position: [0.0, 0.76, 0.03],
      targetSize: 0.05,
      cavity: 'PELVIC'
    }
  }
};
