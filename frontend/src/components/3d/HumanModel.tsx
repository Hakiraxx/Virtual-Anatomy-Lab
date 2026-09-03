import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { OrganMesh } from './OrganMesh';
import { AnatomicalPins } from './AnatomicalPins';
import { MeasurementTool } from './MeasurementTool';

// Full Human Body Outer Skin Shell from body.glb
const FullBodySkin: React.FC<{ opacity: number; depth: number }> = ({ opacity, depth }) => {
  const { scene } = useGLTF('/models/body.glb');

  const normalizedSkin = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Center pivot horizontally, align bottom at Y = -0.6
    cloned.position.set(-center.x, -center.y, -center.z);

    const wrapper = new THREE.Group();
    // Scale body height to span ~2.7 units (feet at -0.6, head at 2.1)
    const scaleFactor = 2.65;
    cloned.scale.set(scaleFactor, scaleFactor, scaleFactor);
    // Face forward
    cloned.rotation.y = Math.PI / 2;
    wrapper.add(cloned);
    wrapper.position.set(0, 0.95, 0);

    return wrapper;
  }, [scene]);

  // Update skin material depending on depth slider
  useMemo(() => {
    normalizedSkin.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.material) {
          child.material = child.material.clone();
          child.material.transparent = true;
          child.material.opacity = opacity;
          child.material.depthWrite = opacity > 0.6;

          // If showing surface anatomy (depth < 0.25), use natural medical skin tone
          if (depth < 0.25) {
            child.material.color = new THREE.Color('#38bdf8');
            child.material.roughness = 0.5;
            child.material.metalness = 0.05;
          } else {
            // Translucent holographic medical glass silhouette
            child.material.color = new THREE.Color('#38bdf8');
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
          }
        }
      }
    });
  }, [normalizedSkin, opacity, depth]);

  return <primitive object={normalizedSkin} />;
};

export const HumanModel: React.FC = () => {
  const organs = useAnatomyStore((s) => s.organs);
  const layerDepth = useAnatomyStore((s) => s.layerDepth);
  const isolatedOrganId = useAnatomyStore((s) => s.isolatedOrganId);

  // Compute skin opacity based on anatomical depth slider
  // Depth 0% -> opacity 0.8 (Solid skin)
  // Depth 50% -> opacity 0.18 (Translucent glass silhouette)
  // Depth 100% -> opacity 0.05 (Faint reference outline)
  const skinOpacity = useMemo(() => {
    if (isolatedOrganId) return 0;
    if (layerDepth <= 0.2) return 0.85 - layerDepth * 2.0;
    return Math.max(0.08, 0.35 - layerDepth * 0.25);
  }, [layerDepth, isolatedOrganId]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Full Human Body Skin Shell (Head to Toe) */}
      {!isolatedOrganId && (
        <React.Suspense fallback={null}>
          <FullBodySkin opacity={skinOpacity} depth={layerDepth} />
        </React.Suspense>
      )}

      {/* 2. All Internal Organs & Skeletal System */}
      {organs.map((organ) => (
        <OrganMesh key={organ.id} organ={organ} />
      ))}

      {/* 3. 3D Minimalist Glowing Pins (Only active when enabled) */}
      <AnatomicalPins />

      {/* 4. 3D Measurement Ruler */}
      <MeasurementTool />
    </group>
  );
};
