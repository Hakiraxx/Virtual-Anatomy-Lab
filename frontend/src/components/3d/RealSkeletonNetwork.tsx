import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

export interface RealSkeletonNetworkProps {
  opacity?: number;
  selectedId?: string | null;
  isIsolated?: boolean;
  clippingPlanes?: THREE.Plane[];
  onSelect?: (structureId: string, worldCenter: [number, number, number]) => void;
}

function classifyBoneNode(name: string): string {
  const n = name.toLowerCase();
  if (/cranium|skull|frontal|parietal|occipital|temporal|sphenoid|ethmoid|maxilla|zygomatic/i.test(n)) {
    return 'skull';
  }
  if (/mandible|mental/i.test(n)) {
    return 'mandible';
  }
  if (/vertebra|cervical|thoracic vertebra|lumbar|sacrum|coccyx|atlas|axis/i.test(n)) {
    return 'spine';
  }
  if (/rib|costal|sternum|xiphoid|manubrium/i.test(n)) {
    return 'ribcage';
  }
  if (/ilium|ischium|pubis|pelvis|pelvic|acetabulum/i.test(n)) {
    return 'pelvis';
  }
  if (/clavicle|scapula/i.test(n)) {
    return 'shoulder_joint';
  }
  if (/humerus/i.test(n)) {
    return 'humerus';
  }
  if (/radius|ulna/i.test(n)) {
    return 'forearm';
  }
  if (/carpal|metacarpal|phalanx of hand|scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate/i.test(n)) {
    return 'hand_skeleton';
  }
  if (/femur/i.test(n)) {
    return 'femur';
  }
  if (/patella/i.test(n)) {
    return 'knee_joint';
  }
  if (/tibia|fibula/i.test(n)) {
    return 'tibia';
  }
  if (/tarsal|metatarsal|phalanx of foot|talus|calcaneus|navicular|cuneiform|cuboid/i.test(n)) {
    return 'foot_skeleton';
  }
  return 'skeleton';
}

export const RealSkeletonNetwork: React.FC<RealSkeletonNetworkProps> = ({
  opacity = 1.0,
  selectedId = null,
  isIsolated = false,
  clippingPlanes = [],
  onSelect
}) => {
  const { scene } = useGLTF('/models/anatomy/skeleton_complete.glb');

  // Shared material pool to minimize WebGL draw calls & state switching
  const materials = useMemo(() => {
    const planes = clippingPlanes.length > 0 ? clippingPlanes : undefined;
    const defaultMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8fafc'), // Natural cortical bone ivory
      roughness: 0.52,
      metalness: 0.04,
      transparent: opacity < 0.98,
      opacity,
      depthWrite: opacity > 0.4,
      clippingPlanes: planes
    });

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
      color: new THREE.Color('#fef08a'),
      roughness: 0.40,
      metalness: 0.08,
      transparent: opacity < 0.98,
      opacity: 1.0,
      depthWrite: true,
      emissive: new THREE.Color('#f59e0b'),
      emissiveIntensity: 0.65,
      clippingPlanes: planes
    });

    return { defaultMat, dimmedMat, selectedMat };
  }, [opacity, clippingPlanes]);

  const clonedSkeleton = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child: any) => {
      if (child.isMesh && child.geometry) {
        // Disable shadow passes on 1,847 micro-meshes to save 1,800+ draw calls/frame
        child.castShadow = false;
        child.receiveShadow = false;
        child.frustumCulled = true;

        const structureId = classifyBoneNode(child.name || (child.parent && child.parent.name) || '');
        child.userData.structureId = structureId;

        const isThisSelected = selectedId && (
          selectedId === structureId ||
          selectedId === 'skeleton'
        );

        if (isIsolated) {
          child.visible = Boolean(isThisSelected);
          child.material = materials.selectedMat;
        } else if (selectedId) {
          child.visible = true;
          child.material = isThisSelected ? materials.selectedMat : materials.dimmedMat;
        } else {
          child.visible = true;
          child.material = materials.defaultMat;
        }
      }
    });

    return clone;
  }, [scene, selectedId, isIsolated, materials]);

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const structureId = mesh.userData?.structureId || 'skeleton';

    const box = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);

    if (onSelect) {
      onSelect(structureId, [center.x, center.y, center.z]);
    }
  };

  return (
    <primitive
      object={clonedSkeleton}
      onPointerDown={handlePointerDown}
    />
  );
};

useGLTF.preload('/models/anatomy/skeleton_complete.glb');
