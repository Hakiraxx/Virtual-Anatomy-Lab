import * as THREE from 'three';

export interface AnatomicalPlacement {
  position: [number, number, number]; // [x, y, z] in standard 1.75m standing human coordinates
  targetSize: number; // max dimension in meters (e.g. heart ~ 0.16m)
  rotationOffset?: [number, number, number]; // euler angles [x, y, z] in radians
  scaleMultiplier?: [number, number, number]; // [x, y, z] multiplier for true sagittal plane mirroring
  gender?: 'male' | 'female' | 'all';
}

// Medical Standard Anatomical Placements in a 1.75m Standing Human Frame
export const ANATOMICAL_PLACEMENTS: Record<string, AnatomicalPlacement> = {
  // Head & Neck (Cranial vault to C7)
  brain: { position: [0.0, 1.63, -0.01], targetSize: 0.165 },
  brainstem: { position: [0.0, 1.57, -0.01], targetSize: 0.08 },
  spinal_cord: { position: [0.0, 1.20, -0.035], targetSize: 0.55 },
  skull: { position: [0.0, 1.62, -0.01], targetSize: 0.20, rotationOffset: [0, -Math.PI / 2, 0] },
  pituitary: { position: [0.0, 1.62, 0.0], targetSize: 0.035 },
  eyeball: { position: [0.035, 1.64, 0.06], targetSize: 0.04 },
  ear: { position: [0.08, 1.63, -0.01], targetSize: 0.05 },
  thyroid: { position: [0.0, 1.42, 0.03], targetSize: 0.07 },
  cranial_nerves: { position: [0.0, 1.60, 0.0], targetSize: 0.14 },
  brachial_plexus: { position: [0.0, 1.34, -0.01], targetSize: 0.34 },
  lumbosacral_plexus: { position: [0.0, 0.84, -0.02], targetSize: 0.28 },
  nerves_system: { position: [0.0, 0.88, 0.0], targetSize: 1.70 },

  // Skeletal Appendicular Limbs & Joints (Bilateral Anatomical Pairs with Sagittal Symmetry)
  shoulder_joint: { position: [-0.19, 1.34, 0.0], targetSize: 0.14 },
  shoulder_left: { position: [-0.19, 1.34, 0.0], targetSize: 0.14 },
  shoulder_right: { position: [0.19, 1.34, 0.0], targetSize: 0.14, scaleMultiplier: [-1, 1, 1] },

  humerus_left: { position: [-0.22, 1.14, 0.0], targetSize: 0.26, rotationOffset: [0, 0, -0.05] },
  humerus_right: { position: [0.22, 1.14, 0.0], targetSize: 0.26, rotationOffset: [0, 0, 0.05], scaleMultiplier: [-1, 1, 1] },

  forearm_left: { position: [-0.26, 0.90, 0.0], targetSize: 0.21, rotationOffset: [0, 0, -0.05] },
  forearm_right: { position: [0.26, 0.90, 0.0], targetSize: 0.21, rotationOffset: [0, 0, 0.05], scaleMultiplier: [-1, 1, 1] },

  hand_left: { position: [-0.30, 0.72, 0.0], targetSize: 0.16, rotationOffset: [Math.PI, 0, 0] },
  hand_right: { position: [0.30, 0.72, 0.0], targetSize: 0.16, rotationOffset: [Math.PI, 0, 0], scaleMultiplier: [-1, 1, 1] },

  hip_joint: { position: [-0.105, 0.77, 0.0], targetSize: 0.15 },
  hip_left: { position: [-0.105, 0.77, 0.0], targetSize: 0.15 },
  hip_right: { position: [0.105, 0.77, 0.0], targetSize: 0.15, scaleMultiplier: [-1, 1, 1] },

  femur_left: { position: [-0.105, 0.58, 0.01], targetSize: 0.33, rotationOffset: [0, 0, -0.03] },
  femur_right: { position: [0.105, 0.58, 0.01], targetSize: 0.33, rotationOffset: [0, 0, 0.03], scaleMultiplier: [-1, 1, 1] },

  knee_joint: { position: [-0.10, 0.42, 0.015], targetSize: 0.12 },
  knee_left: { position: [-0.10, 0.42, 0.015], targetSize: 0.12 },
  knee_right: { position: [0.10, 0.42, 0.015], targetSize: 0.12, scaleMultiplier: [-1, 1, 1] },

  tibia_left: { position: [-0.105, 0.24, 0.01], targetSize: 0.32 },
  tibia_right: { position: [0.105, 0.24, 0.01], targetSize: 0.32, scaleMultiplier: [-1, 1, 1] },

  foot_left: { position: [-0.105, 0.06, 0.03], targetSize: 0.17, rotationOffset: [0, Math.PI, 0] },
  foot_right: { position: [0.105, 0.06, 0.03], targetSize: 0.17, rotationOffset: [0, Math.PI, 0], scaleMultiplier: [-1, 1, 1] },

  // Thoracic Cavity (T1 to T12)
  heart: { position: [-0.02, 1.20, 0.05], targetSize: 0.16 },
  lungs: { position: [0.0, 1.22, 0.02], targetSize: 0.28 },
  aorta_arch: { position: [0.0, 1.28, 0.03], targetSize: 0.16 },
  coronary_arteries: { position: [-0.02, 1.20, 0.055], targetSize: 0.13 },
  circle_of_willis: { position: [0.0, 1.58, 0.0], targetSize: 0.14 },
  portal_vein: { position: [0.02, 1.04, 0.02], targetSize: 0.14 },
  leg_veins: { position: [-0.105, 0.45, 0.02], targetSize: 0.82 },
  leg_veins_left: { position: [-0.105, 0.45, 0.02], targetSize: 0.82 },
  leg_veins_right: { position: [0.105, 0.45, 0.02], targetSize: 0.82, scaleMultiplier: [-1, 1, 1] },
  ribcage: { position: [0.0, 1.20, 0.01], targetSize: 0.32, rotationOffset: [0, -Math.PI / 2, 0] },
  spine: { position: [0.0, 1.16, -0.03], targetSize: 0.74 },

  // Abdominal Cavity (RUQ, LUQ, Retroperitoneal)
  liver: { position: [0.06, 1.04, 0.04], targetSize: 0.20 },
  stomach: { position: [-0.05, 1.03, 0.05], targetSize: 0.17 },
  spleen: { position: [-0.10, 1.04, -0.01], targetSize: 0.11 },
  pancreas: { position: [0.0, 1.01, 0.02], targetSize: 0.13 },
  gallbladder: { position: [0.05, 1.00, 0.05], targetSize: 0.07 },
  intestine: { position: [0.0, 0.90, 0.03], targetSize: 0.24 },
  kidneys: { position: [0.0, 1.01, -0.04], targetSize: 0.16 },
  adrenal: { position: [0.04, 1.07, -0.04], targetSize: 0.05 },

  // Pelvic Cavity (True & False Pelvis)
  pelvis: { position: [0.0, 0.82, 0.0], targetSize: 0.28, rotationOffset: [0, -Math.PI / 2, 0] },
  bladder: { position: [0.0, 0.78, 0.04], targetSize: 0.11 },

  // Reproductive (Male)
  testis: { position: [0.0, 0.72, 0.06], targetSize: 0.08, gender: 'male' },
  penis: { position: [0.0, 0.74, 0.08], targetSize: 0.10, gender: 'male' },
  prostate: { position: [0.0, 0.76, 0.03], targetSize: 0.05, gender: 'male' },

  // Reproductive (Female)
  uterus: { position: [0.0, 0.79, 0.02], targetSize: 0.10, gender: 'female' },
  ovary: { position: [0.04, 0.80, 0.01], targetSize: 0.06, gender: 'female' },
  breast: { position: [0.085, 1.22, 0.10], targetSize: 0.14, gender: 'female' },
  breast_left: { position: [-0.085, 1.22, 0.10], targetSize: 0.14, gender: 'female' },
  breast_right: { position: [0.085, 1.22, 0.10], targetSize: 0.14, scaleMultiplier: [-1, 1, 1], gender: 'female' },
  vagina: { position: [0.0, 0.74, 0.02], targetSize: 0.08, gender: 'female' },
  uterine_tube: { position: [0.0, 0.81, 0.015], targetSize: 0.12, gender: 'female' },

  // Musculoskeletal and Whole Body Framework
  muscle: { position: [0.0, 0.875, 0.0], targetSize: 1.75, rotationOffset: [0, -Math.PI / 2, 0] },
  biceps: { position: [-0.20, 1.22, 0.01], targetSize: 0.24, rotationOffset: [Math.PI / 2, 0, 0] },
  diaphragm: { position: [0.0, 1.12, 0.01], targetSize: 0.28, rotationOffset: [0, 0, 0] },
  body_skin: { position: [0.0, 0.875, 0.0], targetSize: 1.75, rotationOffset: [0, -Math.PI / 2, 0] }
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
    position: [0.0, 1.0, 0.0],
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
