import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

export interface ConnectedVesselsNetworkProps {
  opacity?: number;
  selectedId?: string | null;
  isIsolated?: boolean;
  clippingPlanes?: THREE.Plane[];
  onSelect?: (structureId: string, worldCenter: [number, number, number]) => void;
}

// Classifies a mesh node into clinical vascular groups
function classifyVesselNode(name: string): {
  structureId: string;
  category: 'artery' | 'vein' | 'pulmonary' | 'heart';
} {
  const n = name.toLowerCase();

  if (/atrium|ventricle|papillary|leaflet|valve/i.test(n) && !/artery|vein/i.test(n)) {
    return { structureId: 'heart', category: 'heart' };
  }
  if (/coronary|interventricular/i.test(n)) {
    return { structureId: 'coronary_arteries', category: 'artery' };
  }
  if (/aorta/i.test(n)) {
    return { structureId: 'aorta_arch', category: 'artery' };
  }
  if (/carotid/i.test(n)) {
    return { structureId: 'carotid', category: 'artery' };
  }
  if (/pulmonary/i.test(n)) {
    return { structureId: 'pulmonary_vessels', category: 'pulmonary' };
  }
  if (/cava/i.test(n)) {
    return { structureId: 'vena_cava', category: 'vein' };
  }
  if (/jugular/i.test(n)) {
    return { structureId: 'jugular_vein', category: 'vein' };
  }
  if (/portal|splenic vein|mesenteric vein/i.test(n)) {
    return { structureId: 'portal_vein', category: 'vein' };
  }
  if (/renal/i.test(n)) {
    return {
      structureId: /vein/i.test(n) ? 'renal_vein' : 'renal_artery',
      category: /vein/i.test(n) ? 'vein' : 'artery'
    };
  }
  if (/femoral|iliac|saphenous|popliteal|tibial|plantar/i.test(n)) {
    return {
      structureId: /vein/i.test(n) ? 'leg_veins' : 'femoral_artery',
      category: /vein/i.test(n) ? 'vein' : 'artery'
    };
  }
  if (/subclavian|axillary|brachial|radial|ulnar/i.test(n)) {
    return {
      structureId: /vein/i.test(n) ? 'arm_veins' : 'arm_arteries',
      category: /vein/i.test(n) ? 'vein' : 'artery'
    };
  }
  if (/vein|venous|sinus/i.test(n)) {
    return { structureId: 'venous_system', category: 'vein' };
  }
  return { structureId: 'arterial_system', category: 'artery' };
}

export const ConnectedVesselsNetwork: React.FC<ConnectedVesselsNetworkProps> = ({
  opacity = 1.0,
  selectedId = null,
  isIsolated = false,
  clippingPlanes = [],
  onSelect
}) => {
  const { scene } = useGLTF('/models/anatomy/vessels_complete.glb');

  // Shared material pool for all 676 vessels to maximize GPU instancing & batching
  const materials = useMemo(() => {
    const planes = clippingPlanes.length > 0 ? clippingPlanes : undefined;
    const isTransp = opacity < 0.98;

    const arteryDefault = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#dc2626'),
      roughness: 0.35,
      metalness: 0.12,
      transparent: isTransp,
      opacity,
      depthWrite: opacity > 0.4,
      clippingPlanes: planes
    });

    const arteryDimmed = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#991b1b'),
      roughness: 0.50,
      metalness: 0.05,
      transparent: true,
      opacity: Math.min(0.20, opacity),
      depthWrite: false,
      clippingPlanes: planes
    });

    const veinDefault = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2563eb'),
      roughness: 0.38,
      metalness: 0.10,
      transparent: isTransp,
      opacity,
      depthWrite: opacity > 0.4,
      clippingPlanes: planes
    });

    const veinDimmed = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1e40af'),
      roughness: 0.50,
      metalness: 0.05,
      transparent: true,
      opacity: Math.min(0.20, opacity),
      depthWrite: false,
      clippingPlanes: planes
    });

    const pulmonaryMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0284c7'),
      roughness: 0.35,
      metalness: 0.10,
      transparent: isTransp,
      opacity,
      depthWrite: opacity > 0.4,
      clippingPlanes: planes
    });

    const heartMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#991b1b'),
      roughness: 0.55,
      metalness: 0.05,
      transparent: isTransp,
      opacity,
      depthWrite: opacity > 0.4,
      clippingPlanes: planes
    });

    const selectedMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      roughness: 0.30,
      metalness: 0.15,
      transparent: isTransp,
      opacity: 1.0,
      depthWrite: true,
      emissive: new THREE.Color('#f59e0b'),
      emissiveIntensity: 0.70,
      clippingPlanes: planes
    });

    return { arteryDefault, arteryDimmed, veinDefault, veinDimmed, pulmonaryMat, heartMat, selectedMat };
  }, [opacity, clippingPlanes]);

  const clonedVessels = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child: any) => {
      if (child.isMesh && child.geometry) {
        // Disable shadow passes on 676 micro-vessels to eliminate shadow map bottleneck
        child.castShadow = false;
        child.receiveShadow = false;
        child.frustumCulled = true;

        const classification = classifyVesselNode(child.name || (child.parent && child.parent.name) || '');
        child.userData.structureId = classification.structureId;
        child.userData.category = classification.category;

        const isThisSelected = selectedId && (
          selectedId === classification.structureId ||
          (selectedId === 'heart' && classification.category === 'heart') ||
          (selectedId === 'cardiovascular' && true)
        );

        if (isIsolated) {
          child.visible = Boolean(isThisSelected);
          child.material = materials.selectedMat;
        } else if (selectedId) {
          child.visible = true;
          if (isThisSelected) {
            child.material = materials.selectedMat;
          } else {
            child.material = classification.category === 'vein' ? materials.veinDimmed : materials.arteryDimmed;
          }
        } else {
          child.visible = true;
          if (classification.category === 'heart') {
            child.material = materials.heartMat;
          } else if (classification.category === 'pulmonary') {
            child.material = materials.pulmonaryMat;
          } else if (classification.category === 'vein') {
            child.material = materials.veinDefault;
          } else {
            child.material = materials.arteryDefault;
          }
        }
      }
    });

    return clone;
  }, [scene, selectedId, isIsolated, materials]);

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    const structureId = mesh.userData?.structureId || 'cardiovascular';

    const box = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);

    if (onSelect) {
      onSelect(structureId, [center.x, center.y, center.z]);
    }
  };

  return (
    <primitive
      object={clonedVessels}
      onPointerDown={handlePointerDown}
    />
  );
};

useGLTF.preload('/models/anatomy/vessels_complete.glb');
