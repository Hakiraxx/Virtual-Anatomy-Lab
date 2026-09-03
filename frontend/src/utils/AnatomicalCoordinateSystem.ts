import * as THREE from 'three';

/**
 * MASTER ANATOMICAL COORDINATE SYSTEM
 * Universal Reference Frame for MedAnatomy 3D
 *
 * Orientation Convention (Standing Standard Anatomical Position):
 * - Axis X: Left <-> Right (Transverse axis). Patient's Left is -X, Patient's Right is +X (or vice versa, strictly mirrored around midline X = 0).
 * - Axis Y: Inferior <-> Superior (Longitudinal axis). Ground/Feet = 0.0m, Cranial Vertex = 1.75m.
 * - Axis Z: Posterior <-> Anterior (Sagittal axis). Back/Dorsal = -Z, Front/Ventral/Chest = +Z.
 */
export const ANATOMICAL_COORDINATE_SYSTEM = {
  AXIS_TRANSVERSE: new THREE.Vector3(1, 0, 0), // X: Lateral / Medial
  AXIS_LONGITUDINAL: new THREE.Vector3(0, 1, 0), // Y: Superior / Inferior
  AXIS_SAGITTAL: new THREE.Vector3(0, 0, 1), // Z: Anterior / Posterior

  // Standard Anthropometric Heights in a 1.75m Adult Human
  BODY_HEIGHT_TOTAL: 1.75, // Ground to Cranial Vertex
  HEIGHT_VERTEX: 1.75, // Crown of head
  HEIGHT_NASION: 1.63, // Bridge of nose
  HEIGHT_CHIN: 1.50, // Gnathion
  HEIGHT_C1_ATLAS: 1.52, // Cranio-cervical junction
  HEIGHT_C7_PROMINENS: 1.41, // Base of neck
  HEIGHT_STERNAL_NOTCH: 1.38, // Jugular notch (T2)
  HEIGHT_STERNAL_ANGLE: 1.31, // Angle of Louis (T4-T5 junction)
  HEIGHT_XIPHOID: 1.15, // Xiphisternal junction (T9)
  HEIGHT_UMBILICUS: 1.02, // L3-L4 disc level
  HEIGHT_ILIAC_CREST: 0.95, // L4 level
  HEIGHT_PUBIC_SYMPHYSIS: 0.82, // Base of anterior pelvis
  HEIGHT_ISCHIAL_TUBEROSITY: 0.77, // Inferior pelvic boundary
  HEIGHT_GREATER_TROCHANTER: 0.82, // Hip joint center
  HEIGHT_PATELLA: 0.46, // Mid-knee joint line
  HEIGHT_MEDIAL_MALLEOLUS: 0.08, // Ankle joint
  HEIGHT_GROUND: 0.0, // Plantar surface of feet
};

/**
 * Per-Asset Transform Calibration Dictionary
 * Rectifies raw 3D artist coordinate systems (e.g. models authored with lateral axis along Z)
 * to the Master Anatomical Coordinate System.
 */
export const ASSET_CALIBRATION_OFFSETS: Record<
  string,
  {
    rotationOffset?: [number, number, number];
    scaleMultiplier?: number;
    anchorLandmark?: string;
  }
> = {
  // Assets with local face/anterior along +X: rotate by -90deg (-Math.PI / 2) to face +Z
  body_skin: { rotationOffset: [0, -Math.PI / 2, 0], scaleMultiplier: 1.0 },
  skull: { rotationOffset: [0, -Math.PI / 2, 0], scaleMultiplier: 1.0, anchorLandmark: 'nasion' },
  pelvis: { rotationOffset: [0, -Math.PI / 2, 0], scaleMultiplier: 1.0, anchorLandmark: 'pubic_symphysis' },

  // Pre-aligned assets already facing +Z with Left-Right along X
  ribcage: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'sternal_angle' },
  spine: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'c1_atlas' },
  heart: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'sternal_angle' },
  lungs: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'sternal_notch' },
  liver: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'xiphoid' },
  stomach: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'xiphoid' },
  kidneys: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 't12_vertebra' },
  bladder: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'pubic_symphysis' },
  brain: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'vertex' },
  thyroid: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'c7_prominens' },
  spleen: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'xiphoid' },
  testis: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'pubic_symphysis' },
  uterus: { rotationOffset: [0, 0, 0], scaleMultiplier: 1.0, anchorLandmark: 'pubic_symphysis' },
};
