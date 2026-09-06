import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

export interface ConnectedNervesNetworkProps {
  opacity?: number;
  selectedId?: string | null;
  isIsolated?: boolean;
  clippingPlanes?: THREE.Plane[];
  onSelect?: (structureId: string, worldCenter: [number, number, number]) => void;
}

function createCalibratedBrainGroup(
  sourceScene: THREE.Object3D,
  targetSize: number,
  position: [number, number, number]
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

  // 2. Scale to physiological adult human brain dimension (16.5 cm)
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? targetSize / maxDim : 1;
  const root = new THREE.Group();
  root.scale.set(scale, scale, scale);
  // Placed exactly inside cranial cavity of skull in ZAnatomySystems
  root.position.set(position[0], position[1], position[2]);
  root.add(centerGroup);

  return root;
}

export const ConnectedNervesNetwork: React.FC<ConnectedNervesNetworkProps> = ({
  opacity = 1.0,
  selectedId = null,
  isIsolated = false,
  clippingPlanes = [],
  onSelect
}) => {
  const { scene: nervesScene } = useGLTF('/models/anatomy/nervous_complete.glb');
  const { scene: brainScene } = useGLTF('/models/brain.glb');

  // Shared material pool for all nerve and brain meshes
  const materials = useMemo(() => {
    const planes = clippingPlanes.length > 0 ? clippingPlanes : undefined;
    const isTransp = opacity < 0.98;

    const defaultNerveMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'), // Luminous amber gold
      roughness: 0.38,
      metalness: 0.08,
      transparent: isTransp,
      opacity,
      depthWrite: opacity > 0.4,
      emissive: new THREE.Color('#d97706'),
      emissiveIntensity: 0.25,
      clippingPlanes: planes
    });

    const brainMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5d0c5'), // Natural cerebral cortex tissue color
      roughness: 0.45,
      metalness: 0.05,
      transparent: isTransp,
      opacity,
      depthWrite: opacity > 0.4,
      clippingPlanes: planes
    });

    const dimmedMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#78716c'),
      roughness: 0.55,
      metalness: 0.05,
      transparent: true,
      opacity: Math.min(0.20, opacity),
      depthWrite: false,
      clippingPlanes: planes
    });

    const selectedMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fbbf24'),
      roughness: 0.30,
      metalness: 0.12,
      transparent: isTransp,
      opacity: 1.0,
      depthWrite: true,
      emissive: new THREE.Color('#fbbf24'),
      emissiveIntensity: 0.85,
      clippingPlanes: planes
    });

    return { defaultNerveMat, brainMat, dimmedMat, selectedMat };
  }, [opacity, clippingPlanes]);

  // Calibrated real 3D Brain inside cranial cavity of skull (Local: [0.050, 0.870, -0.017] -> World: [0.050, 1.860, -0.017])
  const calibratedBrain = useMemo(() => {
    return createCalibratedBrainGroup(
      brainScene,
      0.165, // 16.5 cm physiological adult brain dimension
      [0.050, 0.870, -0.017]
    );
  }, [brainScene]);

  const clonedNerves = useMemo(() => {
    const clone = nervesScene.clone(true);

    const applyMaterialToNerves = (target: THREE.Object3D) => {
      target.traverse((child: any) => {
        if (child.isMesh && child.geometry) {
          child.castShadow = false;
          child.receiveShadow = false;
          child.frustumCulled = true;

          const name = (child.name || (child.parent && child.parent.name) || '').toLowerCase();
          let structureId = 'nerves_system';
          if (/sciatic/i.test(name)) structureId = 'lumbosacral_plexus';
          else if (/brachial|median|radial|ulnar/i.test(name)) structureId = 'brachial_plexus';
          else if (/cranial|vagus|trigeminal|facial|optic|olfactory/i.test(name)) structureId = 'cranial_nerves';
          else if (/spinal cord/i.test(name)) structureId = 'spinal_cord';
          else if (/brain|cerebr|cerebell|peduncle/i.test(name)) structureId = 'brain';

          child.userData.structureId = structureId;

          const isThisSelected = selectedId && (
            selectedId === structureId ||
            selectedId === 'nervous' ||
            selectedId === 'nerves_system'
          );

          if (isIsolated) {
            child.visible = Boolean(isThisSelected);
            child.material = materials.selectedMat;
          } else if (selectedId) {
            child.visible = true;
            child.material = isThisSelected ? materials.selectedMat : materials.dimmedMat;
          } else {
            child.visible = true;
            child.material = materials.defaultNerveMat;
          }
        }
      });
    };

    const applyMaterialToBrain = (target: THREE.Object3D) => {
      target.traverse((child: any) => {
        if (child.isMesh && child.geometry) {
          child.castShadow = false;
          child.receiveShadow = false;
          child.frustumCulled = true;

          const name = (child.name || (child.parent && child.parent.name) || '').toLowerCase();
          let structureId = 'brain';
          if (/brainstem|pons|medulla|midbrain/i.test(name)) structureId = 'brainstem';

          child.userData.structureId = structureId;

          const isThisSelected = selectedId && (
            selectedId === structureId ||
            selectedId === 'brain' ||
            selectedId === 'nervous' ||
            selectedId === 'nerves_system'
          );

          if (isIsolated) {
            child.visible = Boolean(isThisSelected);
            child.material = materials.selectedMat;
          } else if (selectedId) {
            child.visible = true;
            child.material = isThisSelected ? materials.selectedMat : materials.dimmedMat;
          } else {
            child.visible = true;
            child.material = materials.brainMat;
          }
        }
      });
    };

    applyMaterialToNerves(clone);
    applyMaterialToBrain(calibratedBrain);

    return clone;
  }, [nervesScene, calibratedBrain, selectedId, isIsolated, materials]);

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const structureId = mesh.userData?.structureId || 'brain';

    const box = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);

    if (onSelect) {
      onSelect(structureId, [center.x, center.y, center.z]);
    }
  };

  return (
    <group onPointerDown={handlePointerDown}>
      <primitive object={clonedNerves} />
      <primitive object={calibratedBrain} />
    </group>
  );
};

useGLTF.preload('/models/anatomy/nervous_complete.glb');
useGLTF.preload('/models/brain.glb');
