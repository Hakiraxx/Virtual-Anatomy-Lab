import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

export interface RealVisceraNetworkProps {
  opacity?: number;
  selectedId?: string | null;
  isIsolated?: boolean;
  clippingPlanes?: THREE.Plane[];
  onSelect?: (structureId: string, worldCenter: [number, number, number]) => void;
}

export function classifyOrganNode(name: string): string {
  const n = name.toLowerCase();

  // 1. Endocrine & Cervical Viscera (matched before broad category fallbacks)
  if (/thyroid|parathyroid/i.test(n)) return 'thyroid';
  if (/pituitary|hypophysis/i.test(n)) return 'pituitary';
  if (/adrenal|suprarenal/i.test(n)) return 'adrenal';
  if (/larynx|epiglottis|cricoid|pharynx/i.test(n)) return 'larynx';

  // 2. Cardiopulmonary System
  if (/heart|atrium|ventricle|myocard|endocard|epicard|valve|pericard/i.test(n)) return 'heart';
  if (/lung|bronch|pleura|trachea/i.test(n)) return 'lungs';

  // 3. Digestive & Hepatobiliary System
  if (/gallbladder|bile/i.test(n)) return 'gallbladder';
  if (/liver|hepatic/i.test(n) && !/duct/i.test(n)) return 'liver';
  if (/spleen|splenic/i.test(n)) return 'spleen';
  if (/stomach|gastric|cardia|fundus of stomach|pylorus|esophag|oesophag/i.test(n)) return 'stomach';
  if (/pancreas|pancreatic/i.test(n)) return 'pancreas';
  if (/colon|caecum|cecum|rectum|appendix|intestine|duoden|jejun|ileum|anus|taenia/i.test(n)) return 'intestine';

  // 4. Genitourinary System
  if (/kidney|renal/i.test(n)) return 'kidneys';
  if (/bladder|ureter|urethra/i.test(n)) return 'bladder';
  if (/prostate|penis|testis|scrotum|epididymis|deferens|seminal/i.test(n)) return 'reproductive';

  return 'viscera';
}

function createCalibratedOrganGroup(
  sourceScene: THREE.Object3D,
  structureId: string,
  targetSize: number,
  position: [number, number, number],
  rotation: [number, number, number]
): THREE.Group {
  const clone = sourceScene.clone(true);
  const box = new THREE.Box3().setFromObject(clone);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // 1. Center local geometry at (0, 0, 0)
  const centerGroup = new THREE.Group();
  clone.position.set(-center.x, -center.y, -center.z);
  centerGroup.add(clone);

  // 2. Apply anatomical rotation around organ centroid
  const rotGroup = new THREE.Group();
  rotGroup.rotation.set(rotation[0], rotation[1], rotation[2]);
  rotGroup.add(centerGroup);

  // 3. Scale to physiological adult dimension and place in anatomical space
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? targetSize / maxDim : 1;
  const root = new THREE.Group();
  root.scale.set(scale, scale, scale);
  root.position.set(position[0], position[1], position[2]);
  root.add(rotGroup);

  root.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      child.frustumCulled = true;
      child.userData.structureId = structureId;
    }
  });

  return root;
}

export const RealVisceraNetwork: React.FC<RealVisceraNetworkProps> = ({
  opacity = 1.0,
  selectedId = null,
  isIsolated = false,
  clippingPlanes = [],
  onSelect
}) => {
  const { scene: organsScene } = useGLTF('/models/anatomy/organs_complete.glb');
  const { scene: spleenScene } = useGLTF('/models/spleen.glb');
  const { scene: heartScene } = useGLTF('/models/heart.glb');

  // Pre-instantiated shared PBR material pool for all visceral meshes
  const materials = useMemo(() => {
    const planes = clippingPlanes.length > 0 ? clippingPlanes : undefined;
    const isTransp = opacity < 0.98;

    const makeMat = (colorHex: string, roughness: number, metalness = 0.05) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        roughness,
        metalness,
        transparent: isTransp,
        opacity,
        depthWrite: opacity > 0.4,
        clippingPlanes: planes
      });

    const categoryMats: Record<string, THREE.MeshStandardMaterial> = {
      lungs: makeMat('#f472b6', 0.55),
      liver: makeMat('#9a3412', 0.45, 0.08),
      gallbladder: makeMat('#047857', 0.35, 0.15),
      stomach: makeMat('#f97316', 0.45),
      pancreas: makeMat('#eab308', 0.50),
      spleen: makeMat('#881337', 0.42, 0.08), // Rich splenic purplish-crimson
      heart: makeMat('#b91c1c', 0.48, 0.08), // Deep cardiac myocardial red
      intestine: makeMat('#fb923c', 0.50),
      kidneys: makeMat('#991b1b', 0.42, 0.08),
      bladder: makeMat('#fef08a', 0.30, 0.10),
      thyroid: makeMat('#f43f5e', 0.45),
      pituitary: makeMat('#a855f7', 0.40),
      adrenal: makeMat('#fbbf24', 0.50),
      larynx: makeMat('#e2e8f0', 0.40),
      reproductive: makeMat('#c084fc', 0.45),
      viscera: makeMat('#cbd5e1', 0.50)
    };

    const dimmedMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#94a3b8'),
      roughness: 0.60,
      metalness: 0.02,
      transparent: true,
      opacity: Math.min(0.20, opacity),
      depthWrite: false,
      clippingPlanes: planes
    });

    const selectedMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      roughness: 0.35,
      metalness: 0.10,
      transparent: isTransp,
      opacity: 1.0,
      depthWrite: true,
      emissive: new THREE.Color('#f59e0b'),
      emissiveIntensity: 0.65,
      clippingPlanes: planes
    });

    return { categoryMats, dimmedMat, selectedMat };
  }, [opacity, clippingPlanes]);

  // Calibrated real 3D Spleen (Left hypochondrium, posterior to stomach fundus, under ribs 9-11)
  const calibratedSpleen = useMemo(() => {
    return createCalibratedOrganGroup(
      spleenScene,
      'spleen',
      0.12, // 12 cm physiological adult length
      [0.133, 0.332, -0.035], // Exact LUQ alignment with splenic vessels and ribcage
      [0.35, 0.20, -0.45] // Long axis along 10th rib, diaphragmatic surface posterolateral
    );
  }, [spleenScene]);

  // Calibrated real 3D Heart (Middle mediastinum, cardiac apex anteroinferior to the left)
  const calibratedHeart = useMemo(() => {
    return createCalibratedOrganGroup(
      heartScene,
      'heart',
      0.155, // 15.5 cm adult cardiac size
      [0.065, 0.465, 0.030], // Situated within cardiac notch between bilateral lungs
      [0.10, -0.15, -0.20] // Physiological cardiac apex orientation
    );
  }, [heartScene]);

  // Main Viscera Network from organs_complete.glb
  const clonedOrgans = useMemo(() => {
    const clone = organsScene.clone(true);

    const applyMaterial = (target: THREE.Object3D) => {
      target.traverse((child: any) => {
        if (child.isMesh && child.geometry) {
          child.castShadow = false;
          child.receiveShadow = false;
          child.frustumCulled = true;

          const structureId =
            child.userData.structureId ||
            classifyOrganNode(child.name || (child.parent && child.parent.name) || '');
          child.userData.structureId = structureId;

          const isThisSelected =
            selectedId &&
            (selectedId === structureId || (selectedId === 'viscera' && true));

          if (isIsolated) {
            child.visible = Boolean(isThisSelected);
            child.material = materials.selectedMat;
          } else if (selectedId) {
            child.visible = true;
            child.material = isThisSelected ? materials.selectedMat : materials.dimmedMat;
          } else {
            child.visible = true;
            child.material =
              materials.categoryMats[structureId] || materials.categoryMats.viscera;
          }
        }
      });
    };

    applyMaterial(clone);
    applyMaterial(calibratedSpleen);
    applyMaterial(calibratedHeart);

    return clone;
  }, [organsScene, calibratedSpleen, calibratedHeart, selectedId, isIsolated, materials]);

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const structureId = mesh.userData?.structureId || 'viscera';

    const box = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);

    if (onSelect) {
      onSelect(structureId, [center.x, center.y, center.z]);
    }
  };

  return (
    <group onPointerDown={handlePointerDown}>
      <primitive object={clonedOrgans} />
      <primitive object={calibratedSpleen} />
      <primitive object={calibratedHeart} />
    </group>
  );
};

useGLTF.preload('/models/anatomy/organs_complete.glb');
useGLTF.preload('/models/spleen.glb');
useGLTF.preload('/models/heart.glb');
