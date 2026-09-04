import * as THREE from 'three';

export interface AnatomicalPlacement {
  position: [number, number, number]; // [x, y, z] in standard human world coordinates (feet at Y=0)
  targetSize: number; // max dimension in meters (e.g. heart ~ 0.16m)
  rotationOffset?: [number, number, number]; // euler angles [x, y, z] in radians
  scaleMultiplier?: [number, number, number]; // [x, y, z] multiplier for true sagittal plane mirroring
  gender?: 'male' | 'female' | 'all';
}

// Medical Standard Anatomical Placements in Universal Body Space (Aligned with Z-Anatomy CC-BY-SA 4.0)
export const ANATOMICAL_PLACEMENTS: Record<string, AnatomicalPlacement> = {
  // Head & Neck (Cranial vault to C7)
  brain: { position: [0.045, 1.809, -0.040], targetSize: 0.165 },
  brainstem: { position: [0.045, 1.750, -0.035], targetSize: 0.08 },
  spinal_cord: { position: [0.045, 1.450, -0.055], targetSize: 0.55 },
  skull: { position: [0.045, 1.815, 0.005], targetSize: 0.20, rotationOffset: [0, -Math.PI / 2, 0] },
  pituitary: { position: [0.045, 1.826, 0.006], targetSize: 0.035 },
  eyeball: { position: [0.080, 1.820, 0.050], targetSize: 0.04 },
  ear: { position: [0.125, 1.810, -0.020], targetSize: 0.05 },
  thyroid: { position: [0.045, 1.667, 0.034], targetSize: 0.07 },
  cranial_nerves: { position: [0.045, 1.790, -0.010], targetSize: 0.14 },
  brachial_plexus: { position: [0.045, 1.530, -0.020], targetSize: 0.34 },
  lumbosacral_plexus: { position: [0.045, 1.030, -0.030], targetSize: 0.28 },
  nerves_system: { position: [0.045, 1.070, -0.010], targetSize: 1.70 },

  // Skeletal Appendicular Limbs & Joints (Bilateral Anatomical Pairs with Sagittal Symmetry)
  shoulder_joint: { position: [-0.145, 1.530, -0.010], targetSize: 0.14 },
  shoulder_left: { position: [0.235, 1.530, -0.010], targetSize: 0.14 },
  shoulder_right: { position: [-0.145, 1.530, -0.010], targetSize: 0.14, scaleMultiplier: [-1, 1, 1] },

  humerus_left: { position: [0.265, 1.330, -0.010], targetSize: 0.26, rotationOffset: [0, 0, -0.05] },
  humerus_right: { position: [-0.175, 1.330, -0.010], targetSize: 0.26, rotationOffset: [0, 0, 0.05], scaleMultiplier: [-1, 1, 1] },

  forearm_left: { position: [0.305, 1.090, -0.010], targetSize: 0.21, rotationOffset: [0, 0, -0.05] },
  forearm_right: { position: [-0.215, 1.090, -0.010], targetSize: 0.21, rotationOffset: [0, 0, 0.05], scaleMultiplier: [-1, 1, 1] },

  hand_left: { position: [0.345, 0.910, -0.010], targetSize: 0.16, rotationOffset: [Math.PI, 0, 0] },
  hand_right: { position: [-0.255, 0.910, -0.010], targetSize: 0.16, rotationOffset: [Math.PI, 0, 0], scaleMultiplier: [-1, 1, 1] },

  hip_joint: { position: [-0.060, 0.960, -0.010], targetSize: 0.15 },
  hip_left: { position: [0.150, 0.960, -0.010], targetSize: 0.15 },
  hip_right: { position: [-0.060, 0.960, -0.010], targetSize: 0.15, scaleMultiplier: [-1, 1, 1] },

  femur_left: { position: [0.150, 0.770, 0.000], targetSize: 0.33, rotationOffset: [0, 0, -0.03] },
  femur_right: { position: [-0.060, 0.770, 0.000], targetSize: 0.33, rotationOffset: [0, 0, 0.03], scaleMultiplier: [-1, 1, 1] },

  knee_joint: { position: [-0.055, 0.610, 0.005], targetSize: 0.12 },
  knee_left: { position: [0.145, 0.610, 0.005], targetSize: 0.12 },
  knee_right: { position: [-0.055, 0.610, 0.005], targetSize: 0.12, scaleMultiplier: [-1, 1, 1] },

  tibia_left: { position: [0.150, 0.430, 0.000], targetSize: 0.32 },
  tibia_right: { position: [-0.060, 0.430, 0.000], targetSize: 0.32, scaleMultiplier: [-1, 1, 1] },

  foot_left: { position: [0.150, 0.250, 0.020], targetSize: 0.17, rotationOffset: [0, Math.PI, 0] },
  foot_right: { position: [-0.060, 0.250, 0.020], targetSize: 0.17, rotationOffset: [0, Math.PI, 0], scaleMultiplier: [-1, 1, 1] },

  // Thoracic Cavity (T1 to T12)
  heart: { position: [0.065, 1.455, 0.030], targetSize: 0.16 },
  lungs: { position: [0.035, 1.408, -0.007], targetSize: 0.32 },
  aorta_arch: { position: [0.058, 1.475, -0.016], targetSize: 0.38 },
  coronary_arteries: { position: [0.068, 1.455, 0.035], targetSize: 0.13 },
  circle_of_willis: { position: [0.045, 1.830, -0.010], targetSize: 0.14 },
  carotid: { position: [0.045, 1.670, 0.000], targetSize: 0.22 },
  pulmonary_vessels: { position: [0.045, 1.470, 0.000], targetSize: 0.16 },
  vena_cava: { position: [0.028, 1.390, 0.007], targetSize: 0.38 },
  portal_vein: { position: [0.039, 1.326, 0.022], targetSize: 0.14 },
  femoral_artery: { position: [0.045, 0.720, -0.027], targetSize: 0.85 },
  leg_veins: { position: [0.045, 0.710, -0.040], targetSize: 0.85 },
  leg_veins_left: { position: [0.105, 0.710, -0.040], targetSize: 0.85 },
  leg_veins_right: { position: [-0.015, 0.710, -0.040], targetSize: 0.85, scaleMultiplier: [-1, 1, 1] },
  ribcage: { position: [0.036, 1.441, -0.016], targetSize: 0.38, rotationOffset: [0, -Math.PI / 2, 0] },
  spine: { position: [0.047, 1.450, -0.151], targetSize: 0.74 },

  // Abdominal Cavity (RUQ, LUQ, Retroperitoneal)
  liver: { position: [-0.013, 1.381, 0.026], targetSize: 0.28 },
  stomach: { position: [0.087, 1.335, 0.036], targetSize: 0.20 },
  spleen: { position: [0.133, 1.322, -0.035], targetSize: 0.12, rotationOffset: [0.35, 0.20, -0.45] },
  pancreas: { position: [0.039, 1.321, 0.023], targetSize: 0.15 },
  gallbladder: { position: [-0.009, 1.302, 0.052], targetSize: 0.10 },
  intestine: { position: [0.022, 1.140, 0.028], targetSize: 0.36 },
  kidneys: { position: [0.047, 1.255, -0.028], targetSize: 0.22 },
  adrenal: { position: [0.047, 1.313, -0.033], targetSize: 0.06 },

  // Pelvic Cavity (True & False Pelvis)
  pelvis: { position: [0.045, 1.003, -0.020], targetSize: 0.32, rotationOffset: [0, -Math.PI / 2, 0] },
  bladder: { position: [0.046, 0.974, -0.017], targetSize: 0.12 },

  // Reproductive (Male)
  testis: { position: [0.045, 0.842, 0.051], targetSize: 0.08, gender: 'male' },
  penis: { position: [0.045, 0.904, 0.040], targetSize: 0.10, gender: 'male' },
  prostate: { position: [0.045, 0.933, -0.032], targetSize: 0.06, gender: 'male' },

  // Reproductive (Female)
  uterus: { position: [0.045, 0.955, 0.020], targetSize: 0.10, gender: 'female' },
  ovary: { position: [0.085, 0.960, 0.010], targetSize: 0.06, gender: 'female' },
  breast: { position: [-0.045, 1.440, 0.120], targetSize: 0.14, gender: 'female' },
  breast_left: { position: [0.125, 1.440, 0.120], targetSize: 0.14, gender: 'female' },
  breast_right: { position: [-0.035, 1.440, 0.120], targetSize: 0.14, scaleMultiplier: [-1, 1, 1], gender: 'female' },
  vagina: { position: [0.045, 0.915, 0.020], targetSize: 0.08, gender: 'female' },
  uterine_tube: { position: [0.045, 0.965, 0.015], targetSize: 0.12, gender: 'female' },

  // Musculoskeletal and Whole Body Framework
  muscle: { position: [0.0, 0.99, 0.0], targetSize: 1.95, rotationOffset: [0, -Math.PI / 2, 0] },
  biceps: { position: [-0.190, 1.340, 0.010], targetSize: 0.24, rotationOffset: [Math.PI / 2, 0, 0] },
  diaphragm: { position: [0.045, 1.350, 0.010], targetSize: 0.28, rotationOffset: [0, 0, 0] },
  body_skin: { position: [0.0, 0.99, 0.0], targetSize: 1.95, rotationOffset: [0, -Math.PI / 2, 0] }
};

/**
 * Normalizes an isolated organ mesh with 3-tier hierarchy:
 * 1. Center Tier: Offsets mesh geometry to local (0, 0, 0)
 * 2. Orientation Tier: Applies rotation offset around true centroid
 * 3. Position Tier: Scales to physiological size and translates to anatomical cavity
 */
export function normalizeAnatomicalObject(
  scene: THREE.Object3D,
  organKey: string
): THREE.Group {
  const placement = ANATOMICAL_PLACEMENTS[organKey] || {
    position: [0.0, 0.99, 0.0],
    targetSize: 0.2
  };

  const cloned = scene.clone(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // 1. Center group: ensures child center is at (0, 0, 0)
  const centerGroup = new THREE.Group();
  cloned.position.set(-center.x, -center.y, -center.z);
  centerGroup.add(cloned);

  // 2. Rotation group: rotates around the origin
  const rotationGroup = new THREE.Group();
  if (placement.rotationOffset) {
    rotationGroup.rotation.set(
      placement.rotationOffset[0],
      placement.rotationOffset[1],
      placement.rotationOffset[2]
    );
  }
  rotationGroup.add(centerGroup);

  // 3. Scale and Cavity Placement group
  const maxDim = Math.max(size.x, size.y, size.z);
  const baseScale = maxDim > 0 ? placement.targetSize / maxDim : 1;
  const sx = baseScale * (placement.scaleMultiplier ? placement.scaleMultiplier[0] : 1);
  const sy = baseScale * (placement.scaleMultiplier ? placement.scaleMultiplier[1] : 1);
  const sz = baseScale * (placement.scaleMultiplier ? placement.scaleMultiplier[2] : 1);

  const rootGroup = new THREE.Group();
  rootGroup.scale.set(sx, sy, sz);
  rootGroup.position.set(
    placement.position[0],
    placement.position[1],
    placement.position[2]
  );
  rootGroup.add(rotationGroup);

  // Mark all child meshes for anatomical raycasting
  rootGroup.traverse((c: any) => {
    if (c.isMesh) {
      c.userData.isAnatomy = true;
      c.userData.anatomyId = organKey;
    }
  });

  rootGroup.updateMatrixWorld(true);
  return rootGroup;
}
