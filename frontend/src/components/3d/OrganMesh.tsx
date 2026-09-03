import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Organ } from '../../types/anatomy';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

// Map organ IDs to their realistic GLTF/GLB models in /models/
const GLB_MODELS: Record<string, { path: string; targetSize: number; rotOffset?: [number, number, number] }> = {
  heart: { path: '/models/heart.glb', targetSize: 0.5, rotOffset: [0, 0, 0] },
  brain: { path: '/models/brain.glb', targetSize: 0.55, rotOffset: [0, 0, 0] },
  kidneys: { path: '/models/kidney.glb', targetSize: 0.45, rotOffset: [0, 0, 0] },
  liver: { path: '/models/liver.glb', targetSize: 0.65, rotOffset: [0, 0, 0] },
  lungs: { path: '/models/lung.glb', targetSize: 0.68, rotOffset: [0, 0, 0] }
};

interface GLTFModelProps {
  path: string;
  targetSize: number;
  rotOffset?: [number, number, number];
  clippingPlanes: THREE.Plane[];
  isSelected: boolean;
  isHovered: boolean;
  opacity: number;
  isHeart: boolean;
}

const GLTFOrganModel: React.FC<GLTFModelProps> = ({
  path,
  targetSize,
  rotOffset = [0, 0, 0],
  clippingPlanes,
  isSelected,
  isHovered,
  opacity,
  isHeart
}) => {
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);

  // Normalize model geometry: center at local origin & scale to target medical size
  const normalizedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Center pivot
    cloned.position.set(-center.x, -center.y, -center.z);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? targetSize / maxDim : 1;

    const wrapper = new THREE.Group();
    cloned.scale.set(scaleFactor, scaleFactor, scaleFactor);
    wrapper.add(cloned);

    return wrapper;
  }, [scene, targetSize]);

  // Update material properties dynamically for clipping, highlight, transparency
  useMemo(() => {
    normalizedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          child.material.clippingPlanes = clippingPlanes;
          child.material.clipShadows = true;
          child.material.transparent = opacity < 1.0;
          child.material.opacity = opacity;

          if ('roughness' in child.material) {
            child.material.roughness = 0.32;
            child.material.metalness = 0.05;
          }

          if (isSelected) {
            child.material.emissive = new THREE.Color('#38bdf8');
            child.material.emissiveIntensity = 0.45;
          } else if (isHovered) {
            child.material.emissive = new THREE.Color('#06b6d4');
            child.material.emissiveIntensity = 0.3;
          } else {
            child.material.emissive = new THREE.Color('#000000');
            child.material.emissiveIntensity = 0;
          }
        }
      }
    });
  }, [normalizedScene, clippingPlanes, isSelected, isHovered, opacity]);

  // Realistic cardiac heartbeat pulse
  useFrame((state) => {
    if (isHeart && groupRef.current) {
      const t = state.clock.getElapsedTime();
      const beat = Math.sin(t * 7.5);
      const pulse = beat > 0.3 ? 1 + Math.pow(beat, 4) * 0.045 : 1;
      groupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef} rotation={rotOffset}>
      <primitive object={normalizedScene} />
    </group>
  );
};

interface OrganMeshProps {
  organ: Organ;
}

export const OrganMesh: React.FC<OrganMeshProps> = ({ organ }) => {
  const selectedOrganId = useAnatomyStore((s) => s.selectedOrganId);
  const hoveredOrganId = useAnatomyStore((s) => s.hoveredOrganId);
  const isolatedOrganId = useAnatomyStore((s) => s.isolatedOrganId);
  const systemVisibility = useAnatomyStore((s) => s.systemVisibility);
  const layerDepth = useAnatomyStore((s) => s.layerDepth);
  const transparency = useAnatomyStore((s) => s.transparency);
  const crossSection = useAnatomyStore((s) => s.crossSection);
  const activeTool = useAnatomyStore((s) => s.activeTool);
  const isQuizActive = useAnatomyStore((s) => s.isQuizActive);
  const onQuizOrganClicked = useAnatomyStore((s) => s.onQuizOrganClicked);

  const selectOrgan = useAnatomyStore((s) => s.selectOrgan);
  const setHoveredOrgan = useAnatomyStore((s) => s.setHoveredOrgan);
  const addMeasurementPoint = useAnatomyStore((s) => s.addMeasurementPoint);

  const isSelected = selectedOrganId === organ.id;
  const isHovered = hoveredOrganId === organ.id;

  const isVisible = useMemo(() => {
    if (isolatedOrganId) {
      return isolatedOrganId === organ.id;
    }
    if (systemVisibility[organ.systemId] === false) {
      return false;
    }
    if (organ.layerDepth > layerDepth + 0.15) {
      return false;
    }
    return true;
  }, [isolatedOrganId, organ.id, organ.systemId, organ.layerDepth, systemVisibility, layerDepth]);

  const clippingPlanes = useMemo(() => {
    if (!crossSection.enabled) return [];
    const planes: THREE.Plane[] = [];
    if (crossSection.x !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(1, 0, 0), crossSection.x));
    }
    if (crossSection.y !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, 1, 0), crossSection.y));
    }
    if (crossSection.z !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, 0, 1), crossSection.z));
    }
    return planes;
  }, [crossSection]);

  const materialOpacity = useMemo(() => {
    if (isSelected) return 1.0;
    const baseOpacity = 1.0 - transparency / 100;
    return Math.max(0.15, baseOpacity);
  }, [isSelected, transparency]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    if (activeTool === 'measure') {
      const p = e.point;
      addMeasurementPoint([p.x, p.y, p.z]);
      return;
    }

    if (isQuizActive && onQuizOrganClicked) {
      onQuizOrganClicked(organ.id);
      return;
    }

    selectOrgan(organ.id);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredOrgan(organ.id);
  };

  const handlePointerOut = () => {
    if (hoveredOrganId === organ.id) {
      setHoveredOrgan(null);
    }
  };

  if (!isVisible) return null;

  const baseColor = organ.color || '#cbd5e1';
  const emissiveColor = isSelected ? '#38bdf8' : isHovered ? '#06b6d4' : '#000000';
  const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.3 : 0.0;

  const glbConfig = GLB_MODELS[organ.id];

  return (
    <group
      position={[organ.positionX, organ.positionY, organ.positionZ]}
      scale={organ.scale || 1.0}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 1. Realistic GLB Models (Heart, Brain, Lungs, Liver, Kidneys) */}
      {glbConfig ? (
        <React.Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color={baseColor} wireframe />
            </mesh>
          }
        >
          <GLTFOrganModel
            path={glbConfig.path}
            targetSize={glbConfig.targetSize}
            rotOffset={glbConfig.rotOffset}
            clippingPlanes={clippingPlanes}
            isSelected={isSelected}
            isHovered={isHovered}
            opacity={materialOpacity}
            isHeart={organ.id === 'heart'}
          />
        </React.Suspense>
      ) : (
        /* 2. Full Anatomy Skeletal & Vascular Geometries */
        <group>
          {/* Ribcage & Sternum */}
          {organ.id === 'skeleton_ribcage' && (
            <group>
              <mesh position={[0, 0.08, 0.28]} castShadow>
                <boxGeometry args={[0.06, 0.42, 0.025]} />
                <meshStandardMaterial
                  color={baseColor}
                  roughness={0.65}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {[-0.14, -0.07, 0, 0.07, 0.14, 0.21].map((yOffset, i) => (
                <mesh
                  key={`rib-${i}`}
                  position={[0, yOffset, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <torusGeometry args={[0.34 - Math.abs(yOffset) * 0.2, 0.018, 12, 32, Math.PI * 1.85]} />
                  <meshStandardMaterial
                    color="#e2e8f0"
                    roughness={0.6}
                    emissive={emissiveColor}
                    emissiveIntensity={emissiveIntensity}
                    transparent={materialOpacity < 1.0}
                    opacity={materialOpacity}
                    clippingPlanes={clippingPlanes}
                  />
                </mesh>
              ))}
            </group>
          )}

          {/* Complete Vertebral Column (Spine) */}
          {organ.id === 'skeleton_spine' && (
            <group>
              {Array.from({ length: 18 }).map((_, i) => (
                <mesh key={`vert-${i}`} position={[0, -0.5 + i * 0.08, 0]} castShadow>
                  <cylinderGeometry args={[0.05, 0.05, 0.055, 16]} />
                  <meshStandardMaterial
                    color={baseColor}
                    roughness={0.7}
                    emissive={emissiveColor}
                    emissiveIntensity={emissiveIntensity}
                    transparent={materialOpacity < 1.0}
                    opacity={materialOpacity}
                    clippingPlanes={clippingPlanes}
                  />
                </mesh>
              ))}
            </group>
          )}

          {/* Cranium / Skull */}
          {organ.id === 'skull' && (
            <group>
              <mesh castShadow>
                <sphereGeometry args={[0.26, 32, 32]} />
                <meshStandardMaterial
                  color={baseColor}
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              <mesh position={[0, -0.16, 0.12]} castShadow>
                <boxGeometry args={[0.22, 0.22, 0.16]} />
                <meshStandardMaterial
                  color={baseColor}
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
            </group>
          )}

          {/* Pelvis & Sacrum */}
          {organ.id === 'skeleton_pelvis' && (
            <group>
              {/* Left & Right Iliac Wings */}
              <mesh position={[-0.22, 0.05, 0]} rotation={[0, 0.3, 0.2]} castShadow>
                <torusGeometry args={[0.16, 0.04, 12, 24, Math.PI * 1.2]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              <mesh position={[0.22, 0.05, 0]} rotation={[0, -0.3, -0.2]} castShadow>
                <torusGeometry args={[0.16, 0.04, 12, 24, Math.PI * 1.2]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {/* Central Sacrum */}
              <mesh position={[0, 0.02, -0.08]} castShadow>
                <coneGeometry args={[0.12, 0.22, 16]} />
                <meshStandardMaterial
                  color="#cbd5e1"
                  roughness={0.7}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
            </group>
          )}

          {/* Full Lower Limb Bones (Bilateral Femur, Tibia, Fibula, Feet) */}
          {organ.id === 'skeleton_limbs_lower' && (
            <group>
              {/* Left Femur (Thigh) */}
              <mesh position={[-0.18, 0.55, 0]} rotation={[0, 0, -0.04]} castShadow>
                <cylinderGeometry args={[0.04, 0.038, 0.55, 16]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {/* Right Femur (Thigh) */}
              <mesh position={[0.18, 0.55, 0]} rotation={[0, 0, 0.04]} castShadow>
                <cylinderGeometry args={[0.04, 0.038, 0.55, 16]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>

              {/* Knees (Patella) */}
              <mesh position={[-0.18, 0.25, 0.04]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#cbd5e1" clippingPlanes={clippingPlanes} />
              </mesh>
              <mesh position={[0.18, 0.25, 0.04]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#cbd5e1" clippingPlanes={clippingPlanes} />
              </mesh>

              {/* Left Lower Leg (Tibia & Fibula) */}
              <mesh position={[-0.18, -0.05, 0]} castShadow>
                <cylinderGeometry args={[0.035, 0.03, 0.55, 16]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {/* Right Lower Leg (Tibia & Fibula) */}
              <mesh position={[0.18, -0.05, 0]} castShadow>
                <cylinderGeometry args={[0.035, 0.03, 0.55, 16]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>

              {/* Feet Bases */}
              <mesh position={[-0.18, -0.34, 0.08]} castShadow>
                <boxGeometry args={[0.09, 0.05, 0.2]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.6} clippingPlanes={clippingPlanes} />
              </mesh>
              <mesh position={[0.18, -0.34, 0.08]} castShadow>
                <boxGeometry args={[0.09, 0.05, 0.2]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.6} clippingPlanes={clippingPlanes} />
              </mesh>
            </group>
          )}

          {/* Full Upper Limb Bones (Bilateral Clavicles, Arms, Forearms) */}
          {organ.id === 'skeleton_limbs_upper' && (
            <group>
              {/* Left & Right Clavicles (Collar bones) */}
              <mesh position={[-0.2, 0.28, 0.12]} rotation={[0, 0, 0.15]}>
                <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.6} clippingPlanes={clippingPlanes} />
              </mesh>
              <mesh position={[0.2, 0.28, 0.12]} rotation={[0, 0, -0.15]}>
                <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.6} clippingPlanes={clippingPlanes} />
              </mesh>

              {/* Left Humerus (Upper arm) */}
              <mesh position={[-0.45, 0.02, 0]} rotation={[0, 0, 0.1]} castShadow>
                <cylinderGeometry args={[0.035, 0.032, 0.48, 16]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {/* Right Humerus (Upper arm) */}
              <mesh position={[0.45, 0.02, 0]} rotation={[0, 0, -0.1]} castShadow>
                <cylinderGeometry args={[0.035, 0.032, 0.48, 16]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.6}
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  transparent={materialOpacity < 1.0}
                  opacity={materialOpacity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>

              {/* Left Forearm & Hand */}
              <mesh position={[-0.52, -0.42, 0]} rotation={[0, 0, 0.06]} castShadow>
                <cylinderGeometry args={[0.028, 0.025, 0.45, 16]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.6} clippingPlanes={clippingPlanes} />
              </mesh>
              {/* Right Forearm & Hand */}
              <mesh position={[0.52, -0.42, 0]} rotation={[0, 0, -0.06]} castShadow>
                <cylinderGeometry args={[0.028, 0.025, 0.45, 16]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.6} clippingPlanes={clippingPlanes} />
              </mesh>
            </group>
          )}

          {/* Major Blood Vessels */}
          {organ.id === 'vascular_aorta_cava' && (
            <group>
              <mesh position={[-0.04, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.9, 16]} />
                <meshStandardMaterial
                  color="#dc2626"
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              <mesh position={[0.04, 0, 0]}>
                <cylinderGeometry args={[0.035, 0.035, 0.9, 16]} />
                <meshStandardMaterial
                  color="#0284c7"
                  emissive={emissiveColor}
                  emissiveIntensity={emissiveIntensity}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
            </group>
          )}
        </group>
      )}
    </group>
  );
};
