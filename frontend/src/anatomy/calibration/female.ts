import { GenderCalibrationConfig } from './male';

/**
 * Master Female Anatomical Calibration
 * Coordinates based on standard 1.70m adult female in anatomical position.
 */
export const FEMALE_CALIBRATION: GenderCalibrationConfig = {
  gender: 'female',
  pelvisWidthScale: 1.15, // Gynecoid pelvis - broader pelvic brim & wider pubic arch
  shoulderWidthScale: 0.95,
  specificStructures: {
    uterus: {
      position: [0.0, 0.79, 0.02],
      targetSize: 0.10,
      cavity: 'PELVIC'
    },
    ovary: {
      position: [0.04, 0.80, 0.01],
      targetSize: 0.06,
      cavity: 'PELVIC'
    },
    breast: {
      position: [0.09, 1.23, 0.11],
      targetSize: 0.13,
      cavity: 'THORACIC'
    }
  }
};
