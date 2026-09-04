import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  CLINICAL_ANESTHESIA_TECHNIQUES
} from '../../data/dentalNeuroData';

// Normalizes and articulates any head mesh into the standard Craniofacial coordinate system
export function createCraniofacialOrganGroup(
  scene: THREE.Object3D,
  targetSize: number | [number, number, number],
  rotationOffset: [number, number, number] = [0, -Math.PI / 2, 0],
  positionOffset: [number, number, number] = [0, 0, 0]
): THREE.Group {
  const cloned = scene.clone(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // 1. Center local geometry around (0, 0, 0)
  const centerGroup = new THREE.Group();
  cloned.position.set(-center.x, -center.y, -center.z);
  centerGroup.add(cloned);

  // 2. Rotate around true centroid (e.g. -PI/2 to orient face to Anterior +Z)
  const rotationGroup = new THREE.Group();
  rotationGroup.rotation.set(...rotationOffset);
  rotationGroup.add(centerGroup);

  // 3. Scale to anatomical dimensions (supports uniform scalar or non-uniform 3D vector)
  const root = new THREE.Group();
  if (Array.isArray(targetSize)) {
    root.scale.set(targetSize[0], targetSize[1], targetSize[2]);
  } else {
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? targetSize / maxDim : 1;
    root.scale.set(scale, scale, scale);
  }
  root.position.set(...positionOffset);
  root.add(rotationGroup);
  root.updateMatrixWorld(true);

  return root;
}

// Camera controller for smooth cinematic focus
const DentalCameraController: React.FC<{ controlsRef: React.RefObject<any> }> = ({ controlsRef }) => {
  const { camera } = useThree();
  const cameraTarget = useDentalNeuroStore((s) => s.cameraTarget);

  const animRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 750,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    lastTimestamp: 0
  });

  useEffect(() => {
    if (!cameraTarget || cameraTarget.timestamp === animRef.current.lastTimestamp) return;

    animRef.current.lastTimestamp = cameraTarget.timestamp;
    animRef.current.startPos.copy(camera.position);
    animRef.current.endPos.set(...cameraTarget.position);

    const controls = controlsRef.current;
    if (controls) {
      animRef.current.startTarget.copy(controls.target);
      animRef.current.endTarget.set(...cameraTarget.lookAt);
    }

    animRef.current.startTime = performance.now();
    animRef.current.isAnimating = true;
  }, [cameraTarget, camera, controlsRef]);

  useFrame(() => {
    if (animRef.current.isAnimating) {
      const elapsed = performance.now() - animRef.current.startTime;
      const progress = Math.min(1.0, elapsed / animRef.current.duration);
      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(animRef.current.startPos, animRef.current.endPos, ease);

      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(animRef.current.startTarget, animRef.current.endTarget, ease);
        controlsRef.current.update();
      }

      if (progress >= 1.0) {
        animRef.current.isAnimating = false;
      }
    }
  });

  return null;
};

// 3D Tube geometry for nerve curves (Refined Anatomical Caliber)
interface NerveCurveMeshProps {
  id: string;
  side?: 'right' | 'left';
  points: [number, number, number][];
  color: string;
  radius?: number;
  isSelected: boolean;
  isTracing: boolean;
  traceProgress: number;
  opacity: number;
  onSelect: (id: string, side?: 'right' | 'left') => void;
}

const NerveCurveMesh: React.FC<NerveCurveMeshProps> = ({
  id,
  side,
  points,
  color,
  radius = 0.0014,
  isSelected,
  isTracing,
  traceProgress,
  opacity,
  onSelect
}) => {
  const curve = useMemo(() => {
    const vectors = points.map((p) => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.5);
  }, [points]);

  const effectiveRadius = isSelected ? 0.0020 : radius;

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 48, effectiveRadius, 10, false);
  }, [curve, effectiveRadius]);

  // Subtle anatomical pulse effect for selected nerve
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current && isSelected) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const glow = 0.3 + 0.3 * Math.sin(clock.getElapsedTime() * 3.5);
      mat.emissiveIntensity = 0.25 + glow;
    }
  });

  // Calculate position along curve for active tracing marker
  const tracerPos = useMemo(() => {
    if (!isTracing) return null;
    return curve.getPointAt(traceProgress);
  }, [curve, isTracing, traceProgress]);

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id, side);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.45 : 0.12}
          roughness={0.45}
          metalness={0.05}
          transparent={opacity < 0.98}
          opacity={opacity}
        />
      </mesh>

      {/* Animated Tracer Bead */}
      {isTracing && tracerPos && (
        <mesh position={tracerPos}>
          <sphereGeometry args={[effectiveRadius * 2.2, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight color="#fde047" intensity={2.0} distance={0.06} />
        </mesh>
      )}
    </group>
  );
};

// 3D Foramen Ring Marker (Refined, sleek caliber)
interface ForamenMarkerProps {
  id: string;
  side?: 'right' | 'left';
  nameVi: string;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (id: string, side?: 'right' | 'left') => void;
}

const ForamenMarker: React.FC<ForamenMarkerProps> = ({
  id,
  side,
  nameVi,
  position,
  isSelected,
  onSelect
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* 3D Target Ring - Refined, sleek caliber */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id, side);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <torusGeometry args={[0.0028, 0.0006, 12, 24]} />
        <meshStandardMaterial
          color={isSelected ? '#ef4444' : hovered ? '#f59e0b' : '#38bdf8'}
          emissive={isSelected ? '#ef4444' : hovered ? '#f59e0b' : '#0284c7'}
          emissiveIntensity={isSelected || hovered ? 0.8 : 0.3}
          roughness={0.35}
          transparent
          opacity={isSelected || hovered ? 1.0 : 0.7}
        />
      </mesh>

      {/* Label Badge */}
      {(hovered || isSelected) && (
        <Html center position={[0, 0.009, 0]} zIndexRange={[100, 0]}>
          <div
            onClick={() => onSelect(id, side)}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow-lg border cursor-pointer transition-all transform -translate-y-1 select-none ${
              isSelected
                ? 'bg-rose-950/95 text-rose-200 border-rose-500 scale-105'
                : 'bg-slate-900/90 text-sky-200 border-sky-500/80 hover:bg-slate-800'
            }`}
          >
            {nameVi}
          </div>
        </Html>
      )}
    </group>
  );
};

// 3D Dental Arch FDI Tooth Marker with Anatomical Crown Geometry & Target Beacon
interface ToothMarkerProps {
  fdi: number;
  nameVi: string;
  toothType: 'incisor' | 'canine' | 'premolar' | 'molar';
  quadrant: number;
  side?: 'right' | 'left';
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (id: string, side?: 'right' | 'left') => void;
}

const ToothMarker: React.FC<ToothMarkerProps> = ({
  fdi,
  nameVi,
  toothType,
  quadrant,
  side,
  position,
  isSelected,
  onSelect
}) => {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);
  const isMandibular = quadrant === 3 || quadrant === 4;

  // Pulse animation for selected tooth beacon ring
  useFrame((state) => {
    if (isSelected && ringRef.current) {
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 5) * 0.22;
      ringRef.current.scale.set(scale, scale, 1);
    }
  });

  // Clinical color mapping by tooth anatomical class
  const typeColor = useMemo(() => {
    switch (toothType) {
      case 'incisor':
        return '#06b6d4'; // Cyan (Răng cửa)
      case 'canine':
        return '#10b981'; // Emerald (Răng nanh)
      case 'premolar':
        return '#f59e0b'; // Amber (Răng cối nhỏ)
      case 'molar':
        return '#f43f5e'; // Rose-Coral (Răng cối lớn)
      default:
        return '#38bdf8';
    }
  }, [toothType]);

  const activeColor = isSelected ? '#fde047' : hovered ? '#fef08a' : typeColor;
  const activeEmissive = isSelected ? '#eab308' : hovered ? '#ca8a04' : typeColor;
  const emissiveIntensity = isSelected ? 1.4 : hovered ? 0.6 : 0.25;

  return (
    <group position={position}>
      {/* 1. Interactive Anatomical Tooth Crown Mesh */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(`tooth_${fdi}`, side);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        scale={isSelected ? 1.3 : hovered ? 1.15 : 1.0}
      >
        {toothType === 'molar' ? (
          <cylinderGeometry args={[0.0042, 0.0038, 0.0055, 16]} />
        ) : toothType === 'premolar' ? (
          <cylinderGeometry args={[0.0032, 0.0030, 0.0055, 16]} />
        ) : toothType === 'canine' ? (
          <cylinderGeometry args={[0.0016, 0.0030, 0.0068, 16]} />
        ) : (
          <boxGeometry args={[0.0045, 0.0058, 0.0028]} />
        )}
        <meshStandardMaterial
          color={activeColor}
          roughness={0.2}
          metalness={0.15}
          emissive={activeEmissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* 2. Selected Tooth Radiant Beacon, Point Light & Target Ring */}
      {isSelected && (
        <>
          {/* Beacon Point Light */}
          <pointLight color="#fde047" intensity={3.0} distance={0.09} decay={2} />

          {/* Occlusal Pulsing Radar Ring */}
          <mesh
            ref={ringRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, isMandibular ? 0.004 : -0.004, 0]}
          >
            <ringGeometry args={[0.006, 0.0085, 32]} />
            <meshBasicMaterial
              color="#fde047"
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* 3D Directional Pointer Cone */}
          <mesh
            position={[0, isMandibular ? -0.012 : 0.012, 0]}
            rotation={[isMandibular ? 0 : Math.PI, 0, 0]}
          >
            <coneGeometry args={[0.0028, 0.0065, 16]} />
            <meshStandardMaterial
              color="#fde047"
              emissive="#f59e0b"
              emissiveIntensity={1.0}
              roughness={0.2}
            />
          </mesh>
        </>
      )}

      {/* 3. High-Contrast Floating Label Badge */}
      {(hovered || isSelected) && (
        <Html
          center
          position={[0, isMandibular ? -0.024 : 0.024, 0]}
          zIndexRange={[100, 0]}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect(`tooth_${fdi}`, side);
            }}
            className={`px-2 py-1 rounded-lg text-[10px] font-sans font-bold whitespace-nowrap shadow-2xl border cursor-pointer backdrop-blur-md transition-transform transform hover:scale-105 ${
              isSelected
                ? 'bg-amber-950/95 text-amber-200 border-amber-400 ring-2 ring-amber-400/50 shadow-amber-500/30'
                : 'bg-slate-950/90 text-slate-100 border-slate-700 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
                style={{ backgroundColor: typeColor }}
              />
              <span className="font-mono font-black text-amber-300">R.{fdi}</span>
              <span>{nameVi.split('(')[0].trim()}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};


// Craniofacial Base Organ Models (Articulated Skeletal Architecture)
const CraniofacialSkeletonAndOrgans: React.FC<{
  layerVisibility: Record<number, boolean>;
  layerOpacity: Record<number, number>;
  isRadiographicView: boolean;
  isMandibularCanalMode: boolean;
  clippingPlanes: THREE.Plane[];
  selectedAnatomyId: string | null;
}> = ({
  layerVisibility,
  layerOpacity,
  isRadiographicView,
  isMandibularCanalMode,
  clippingPlanes,
  selectedAnatomyId
}) => {
  // Load canonical models from public folder
  const skullGltf = useGLTF('/models/skull.glb');
  const brainstemGltf = useGLTF('/models/brainstem.glb');
  const salivaryGlandsGltf = useGLTF('/models/salivary-glands.glb');
  const tongueGltf = useGLTF('/models/tongue.glb');

  // Apply PBR bone and organ shader properties
  const applyLayerMaterials = (
    scene: THREE.Group,
    opacity: number,
    colorOverride: string,
    isBone: boolean = false
  ) => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.transparent = opacity < 0.95;
        child.material.opacity = opacity;
        child.material.clippingPlanes = clippingPlanes;
        child.material.clipShadows = true;

        if (isRadiographicView) {
          child.material.roughness = 0.70;
          child.material.metalness = 0.05;
          child.material.depthWrite = false;
          // Bone uses radiographic slate; soft tissues (tongue, salivary) preserve natural texture or soft anatomical tone
          child.material.color = new THREE.Color(
            isBone ? '#94a3b8' : child.material.map ? '#ffffff' : colorOverride
          );
        } else {
          child.material.roughness = isBone ? 0.60 : 0.4;
          child.material.metalness = isBone ? 0.02 : 0.1;
          // When bone is translucent, depthWrite is false so internal nerve pathways are clearly visible from outside
          child.material.depthWrite = opacity > 0.70;
          // Preserve natural PBR textures for teeth and glands if available, otherwise apply color
          child.material.color = new THREE.Color(
            isBone ? colorOverride : child.material.map ? '#ffffff' : colorOverride
          );
        }
      }
    });
  };

  // 1. Normalized Canonical Skull (Cranium, Skull Base, Jaws & Teeth unified)
  // Articulated with Anterior face towards +Z, cranial vault at Y ~ 1.41, Z ~ 0.09
  const normalizedSkull = useMemo(() => {
    return createCraniofacialOrganGroup(
      skullGltf.scene,
      0.205,
      [0, -Math.PI / 2, 0],
      [0.0, 1.41, 0.09]
    );
  }, [skullGltf]);

  // 2. Normalized Brainstem
  // Anatomically nested inside the posterior fossa, resting on the clivus, descending through foramen magnum
  // Rotated [0, -Math.PI / 2, -0.22] to face anteriorly (+Z) with natural clivus slope
  const normalizedBrainstem = useMemo(() => {
    return createCraniofacialOrganGroup(
      brainstemGltf.scene,
      0.062,
      [0, -Math.PI / 2, -0.22],
      [0.0, 1.365, 0.065]
    );
  }, [brainstemGltf]);

  // 3. Normalized Salivary Glands (Bilateral Parotid & Submandibular Glands)
  // In Tripo model, Parotids were modeled at +Z (superior Y) and Submandibulars at -Z (inferior Y).
  // Rotated [0, Math.PI, 0] so Parotid glands correctly orient Posteriorly (-Z, under the ear and behind ramus),
  // and Submandibular glands orient Anteriorly (+Z, below the body of the mandible and molars).
  // Scaled non-uniformly to fit human craniofacial proportions:
  // Parotids at X ~ +/- 0.040, Y ~ 1.365, Z ~ 0.075 (parotid bed anterior to earlobe).
  // Submandibulars at X ~ +/- 0.039, Y ~ 1.320, Z ~ 0.135 (submandibular triangle below molars).
  const normalizedSalivary = useMemo(() => {
    return createCraniofacialOrganGroup(
      salivaryGlandsGltf.scene,
      [0.080 / 17000, 0.045 / 19400, 0.060 / 38500],
      [0, Math.PI, 0],
      [0.0, 1.343, 0.1062]
    );
  }, [salivaryGlandsGltf]);

  // 4. Normalized Tongue & Floor of Mouth
  // Tripo model was originally oriented facing +X with Z as lateral axis.
  // Rotated [0, -Math.PI / 2, 0] to orient lower incisors to Anterior (+Z) and molars to Posterior (-Z).
  // Scaled non-uniformly to perfectly fit the mandibular arch inside the oral cavity:
  // Incisal edge at [0, 1.328, 0.158], molars at Z ~ 0.126-0.138, fitting inside mandibular body.
  const normalizedTongue = useMemo(() => {
    return createCraniofacialOrganGroup(
      tongueGltf.scene,
      [0.048 / 38436, 0.030 / 65534, 0.043 / 38804],
      [0, -Math.PI / 2, 0],
      [0.0, 1.315, 0.1495]
    );
  }, [tongueGltf]);

  // Dynamic opacity and material updates
  useMemo(() => {
    // Skull bone translucency: when structure is selected, make bone see-through (0.32) so nerve pathways shine through brilliantly!
    const baseSkullOpacity = layerOpacity[4] ?? 0.40;
    const skullOpacity = isMandibularCanalMode
      ? 0.20 // Reveal internal canal and IAN pathway
      : isRadiographicView
      ? 0.16 // X-ray translucency
      : selectedAnatomyId
      ? 0.32 // Translucent see-through bone when examining nerves
      : baseSkullOpacity;

    applyLayerMaterials(normalizedSkull, skullOpacity, '#fcfaf5', true);

    const bsOpacity = isMandibularCanalMode ? 0 : layerOpacity[13] ?? 0.75;
    applyLayerMaterials(normalizedBrainstem, bsOpacity, '#fed7aa', false);

    const salOpacity = isMandibularCanalMode ? 0 : layerOpacity[9] ?? 0.60;
    applyLayerMaterials(normalizedSalivary, salOpacity, '#f472b6', false);

    const tgOpacity = isMandibularCanalMode ? 0.15 : layerOpacity[5] ?? 0.55;
    applyLayerMaterials(normalizedTongue, tgOpacity, '#f87171', false);
  }, [
    normalizedSkull,
    normalizedBrainstem,
    normalizedSalivary,
    normalizedTongue,
    layerOpacity,
    isRadiographicView,
    isMandibularCanalMode,
    selectedAnatomyId,
    clippingPlanes
  ]);

  // Determine whether skeletal structure should render based on Skull (4), Teeth (10), or Jaws (11)
  const showSkeleton = layerVisibility[4] || layerVisibility[10] || layerVisibility[11] || isMandibularCanalMode;

  return (
    <group name="SkeletalStructures">
      {/* Canonical Unified Skull (Cranium, Skull Base, Jaws & Teeth) */}
      {showSkeleton && (
        <primitive object={normalizedSkull} />
      )}

      {/* Brainstem */}
      {layerVisibility[13] && !isMandibularCanalMode && (
        <primitive object={normalizedBrainstem} />
      )}

      {/* Salivary Glands */}
      {layerVisibility[9] && !isMandibularCanalMode && (
        <primitive object={normalizedSalivary} />
      )}

      {/* Tongue */}
      {layerVisibility[5] && (
        <primitive object={normalizedTongue} />
      )}
    </group>
  );
};

// Master 3D Craniofacial Stage
export const DentalNeuro3DStage: React.FC = () => {
  const controlsRef = useRef<any>(null);

  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const lateralizationSide = useDentalNeuroStore((s) => s.lateralizationSide);
  const selectedSide = useDentalNeuroStore((s) => s.selectedSide);
  const activeNerveTraceId = useDentalNeuroStore((s) => s.activeNerveTraceId);
  const traceProgress = useDentalNeuroStore((s) => s.traceProgress);
  const tracePlaybackState = useDentalNeuroStore((s) => s.tracePlaybackState);
  const setTraceProgress = useDentalNeuroStore((s) => s.setTraceProgress);

  const layerVisibility = useDentalNeuroStore((s) => s.layerVisibility);
  const layerOpacity = useDentalNeuroStore((s) => s.layerOpacity);
  const isRadiographicView = useDentalNeuroStore((s) => s.isRadiographicView);
  const isMandibularCanalMode = useDentalNeuroStore((s) => s.isMandibularCanalMode);
  const showForaminaMarkers = useDentalNeuroStore((s) => s.showForaminaMarkers);
  const showTeethMarkers = useDentalNeuroStore((s) => s.showTeethMarkers);
  const isAnesthesiaMode = useDentalNeuroStore((s) => s.isAnesthesiaMode);
  const activeAnesthesiaId = useDentalNeuroStore((s) => s.activeAnesthesiaId);
  const clippingPlaneState = useDentalNeuroStore((s) => s.clippingPlane);
  const quizMode = useDentalNeuroStore((s) => s.quizMode);
  const submitQuizAnswer = useDentalNeuroStore((s) => s.submitQuizAnswer);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  // Selected tooth resolution for innervation circuit highlight
  const selectedTooth = useMemo(() => {
    if (!selectedAnatomyId || !selectedAnatomyId.startsWith('tooth_')) return null;
    const fdi = parseInt(selectedAnatomyId.replace('tooth_', ''), 10);
    return DENTAL_INNERVATION_DATABASE.find((t) => t.fdi === fdi) || null;
  }, [selectedAnatomyId]);

  const selectedToothSide = useMemo<'right' | 'left' | null>(() => {
    if (!selectedTooth) return null;
    return selectedTooth.quadrant === 1 || selectedTooth.quadrant === 4 ? 'right' : 'left';
  }, [selectedTooth]);

  // Automatic trace playback ticker
  useEffect(() => {
    if (tracePlaybackState !== 'playing') return;

    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const next = (traceProgress + delta * 0.40) % 1.0;
      setTraceProgress(next);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [tracePlaybackState, traceProgress, setTraceProgress]);

  // Clipping planes array
  const clippingPlanes = useMemo(() => {
    if (!clippingPlaneState.enabled) return [];
    const norm =
      clippingPlaneState.axis === 'x'
        ? new THREE.Vector3(1, 0, 0)
        : clippingPlaneState.axis === 'y'
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(0, 0, 1);
    return [new THREE.Plane(norm, clippingPlaneState.offset)];
  }, [clippingPlaneState]);

  const handlePointerMissed = () => {
    if (!quizMode) {
      selectAnatomy(null);
    }
  };

  const handleStructureClick = (id: string, side?: 'right' | 'left') => {
    if (quizMode) {
      submitQuizAnswer(id);
    } else {
      selectAnatomy(id, side);
    }
  };

  const activeAnesthesia = useMemo(() => {
    return CLINICAL_ANESTHESIA_TECHNIQUES.find((a) => a.id === activeAnesthesiaId);
  }, [activeAnesthesiaId]);

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden transition-colors duration-200 ${
        isDark
          ? 'bg-radial from-slate-900 via-[#0a0e17] to-[#05070c]'
          : 'bg-radial from-[#faf6f0] via-[#f3ede4] to-[#e8dfd2]'
      }`}
    >
      <Canvas
        camera={{ position: [0.18, 1.40, 0.42], fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          localClippingEnabled: true
        }}
        onPointerMissed={handlePointerMissed}
      >
        {/* Cinematic Dental Lighting */}
        <ambientLight intensity={isDark ? 0.85 : 1.1} />
        <directionalLight position={[1.5, 3.0, 2.0]} intensity={1.4} castShadow />
        <directionalLight
          position={[-2.0, 1.5, -1.0]}
          intensity={0.65}
          color={isDark ? '#38bdf8' : '#cbd5e1'}
        />
        <pointLight position={[0, 1.35, 0.30]} intensity={1.0} distance={1.2} />

        {/* 1. UNIFIED CRANIOFACIAL ROOT (All structures share identical coordinate space) */}
        <group name="CraniofacialRoot">
          {/* A. Skeletal & Organ Meshes */}
          <React.Suspense fallback={null}>
            <CraniofacialSkeletonAndOrgans
              layerVisibility={layerVisibility}
              layerOpacity={layerOpacity}
              isRadiographicView={isRadiographicView}
              isMandibularCanalMode={isMandibularCanalMode}
              clippingPlanes={clippingPlanes}
              selectedAnatomyId={selectedAnatomyId}
            />
          </React.Suspense>

          {/* B. Cranial & Dental Nerve 3D Pathways (Layer 6) - Lateralization supported */}
          {layerVisibility[6] && (
            <group name="CranialNerves">
              {Object.values(DENTAL_NERVE_STRUCTURES).flatMap((nerve) => {
                if (!nerve.path3D || nerve.path3D.length < 2) return [];

                const isSelected = selectedAnatomyId === nerve.id;
                const isTracing = activeNerveTraceId === nerve.id;

                let opacity: number;
                let nerveColor = nerve.color;
                let radius = 0.0013;

                // Check if this nerve is in the active tooth's innervation circuit
                const isDirectToothNerve =
                  !!selectedTooth &&
                  (nerve.id === selectedTooth.pulpInnervationId ||
                    nerve.id === selectedTooth.periodontalInnervationId ||
                    nerve.id === selectedTooth.buccalGingivaInnervationId ||
                    nerve.id === selectedTooth.lingualGingivaInnervationId);

                const isParentToothTrunk =
                  !!selectedTooth &&
                  ((selectedTooth.arch === 'mandibular' && (nerve.id === 'cn_5_v3' || nerve.id === 'cn_5')) ||
                    (selectedTooth.arch === 'maxillary' && (nerve.id === 'cn_5_v2' || nerve.id === 'cn_5')));

                if (selectedAnatomyId) {
                  // Direct selection / tracing: Full brilliant illumination
                  if (isSelected || isTracing) {
                    opacity = 1.0;
                    nerveColor = '#fde047'; // Bright gold highlight
                    radius = 0.0022;
                  } else if (selectedTooth) {
                    // Clinical Dental Innervation Pathway for Selected Tooth
                    if (isDirectToothNerve) {
                      opacity = 1.0;
                      nerveColor = '#fde047'; // Radiant gold for direct pulp & gingival nerves
                      radius = 0.0022;
                    } else if (isParentToothTrunk) {
                      opacity = 0.85;
                      nerveColor = '#f59e0b'; // Warm amber for supplying cranial trunk
                      radius = 0.0017;
                    } else {
                      opacity = 0.04;
                      nerveColor = '#64748b';
                      radius = 0.0008;
                    }
                  } else {
                    // Check hierarchical relevance
                    const isRelated =
                      (selectedAnatomyId === 'cn_5' && (nerve.division || nerve.id.startsWith('cn_5') || ['nerve_ian', 'nerve_lingual', 'nerve_infraorbital', 'nerve_mental'].includes(nerve.id))) ||
                      (nerve.id === 'cn_5' && (selectedAnatomyId.startsWith('cn_5_') || selectedAnatomyId.startsWith('nerve_'))) ||
                      (nerve.division && selectedAnatomyId.toUpperCase().includes(nerve.division)) ||
                      (nerve.parentNerveId === selectedAnatomyId) ||
                      (selectedAnatomyId.startsWith('cn_7') && nerve.id.startsWith('cn_7'));

                    if (isRelated) {
                      opacity = 0.75;
                      radius = 0.0015;
                    } else {
                      // Subtly dim unrelated nerves so the scene is crystal-clear
                      opacity = 0.06;
                      nerveColor = '#94a3b8';
                      radius = 0.0009;
                    }
                  }
                } else {
                  // Overview mode (nothing selected):
                  // Clean, high-yield presentation: Highlight key trunks (CN V, V1, V2, V3, IAN, Lingual, CN VII), keep small peripheral twigs subtle
                  const isPrimary = ['cn_5', 'cn_5_v1', 'cn_5_v2', 'cn_5_v3', 'cn_7', 'nerve_ian', 'nerve_lingual', 'nerve_infraorbital'].includes(nerve.id);
                  if (isPrimary) {
                    opacity = 0.90;
                    radius = 0.0016;
                  } else {
                    opacity = 0.15; // Very subtle, avoids rainbow spaghetti
                    radius = 0.0010;
                  }
                }

                const isMidline = nerve.path3D.every(([x]) => Math.abs(x) < 0.003);
                const elements: React.ReactNode[] = [];

                // 1. Right side branch (Patient Right, X <= 0)
                if (lateralizationSide === 'bilateral' || lateralizationSide === 'right' || isMidline) {
                  const isRightSelected = (isSelected || (isDirectToothNerve && selectedToothSide === 'right')) && (selectedSide === 'right' || !selectedSide || !!selectedTooth);
                  const rightOpacity = selectedTooth && selectedToothSide === 'left' && isDirectToothNerve ? 0.04 : opacity;

                  elements.push(
                    <NerveCurveMesh
                      key={`${nerve.id}_right`}
                      id={nerve.id}
                      side="right"
                      points={nerve.path3D}
                      color={isRightSelected ? '#fde047' : nerveColor}
                      radius={isRightSelected ? radius * 1.15 : radius}
                      isSelected={isRightSelected}
                      isTracing={isTracing && (selectedSide === 'right' || !selectedSide)}
                      traceProgress={traceProgress}
                      opacity={rightOpacity}
                      onSelect={handleStructureClick}
                    />
                  );
                }

                // 2. Left side branch (Patient Left, X >= 0, mirrored)
                if (!isMidline && (lateralizationSide === 'bilateral' || lateralizationSide === 'left')) {
                  const mirroredPoints = nerve.path3D.map(
                    ([x, y, z]): [number, number, number] => [-x, y, z]
                  );
                  const isLeftSelected = (isSelected || (isDirectToothNerve && selectedToothSide === 'left')) && (selectedSide === 'left' || !selectedSide || !!selectedTooth);
                  const leftOpacity = selectedTooth && selectedToothSide === 'right' && isDirectToothNerve ? 0.04 : opacity;

                  elements.push(
                    <NerveCurveMesh
                      key={`${nerve.id}_left`}
                      id={nerve.id}
                      side="left"
                      points={mirroredPoints}
                      color={isLeftSelected ? '#fde047' : nerveColor}
                      radius={isLeftSelected ? radius * 1.15 : radius}
                      isSelected={isLeftSelected}
                      isTracing={isTracing && (selectedSide === 'left' || !selectedSide)}
                      traceProgress={traceProgress}
                      opacity={leftOpacity}
                      onSelect={handleStructureClick}
                    />
                  );
                }

                return elements;
              })}
            </group>
          )}

          {/* C. Cranial Foramina 3D Ring Markers (Context-aware filtering & Lateralization) */}
          {showForaminaMarkers && !isMandibularCanalMode && (
            <group name="CranialForaminaLab">
              {Object.values(CRANIAL_FORAMINA).flatMap((foramen) => {
                // Contextual filter: If a specific nerve/structure is selected, only show related foramina to prevent clutter
                if (selectedAnatomyId && !selectedAnatomyId.startsWith('foramen_') && !selectedAnatomyId.includes('fissure') && !selectedAnatomyId.includes('canal') && !selectedAnatomyId.includes('meatus')) {
                  const isRelated =
                    foramen.relatedNerveIds?.includes(selectedAnatomyId) ||
                    (selectedAnatomyId === 'cn_5' && ['superior_orbital_fissure', 'foramen_rotundum', 'foramen_ovale', 'mandibular_foramen', 'mental_foramen', 'infraorbital_foramen'].includes(foramen.id)) ||
                    (selectedAnatomyId.startsWith('cn_5_v1') && ['superior_orbital_fissure', 'supraorbital_foramen'].includes(foramen.id)) ||
                    (selectedAnatomyId.startsWith('cn_5_v2') && ['foramen_rotundum', 'infraorbital_foramen', 'greater_palatine_foramen', 'incisive_foramen', 'sphenopalatine_foramen'].includes(foramen.id)) ||
                    ((selectedAnatomyId.startsWith('cn_5_v3') || selectedAnatomyId.startsWith('nerve_ian') || selectedAnatomyId.startsWith('nerve_lingual') || selectedAnatomyId.startsWith('nerve_buccal') || selectedAnatomyId.startsWith('nerve_mental')) && ['foramen_ovale', 'mandibular_foramen', 'mental_foramen'].includes(foramen.id)) ||
                    (selectedTooth && selectedTooth.arch === 'mandibular' && ['foramen_ovale', 'mandibular_foramen', 'mental_foramen'].includes(foramen.id)) ||
                    (selectedTooth && selectedTooth.arch === 'maxillary' && ['foramen_rotundum', 'infraorbital_foramen', 'greater_palatine_foramen', 'incisive_foramen', 'sphenopalatine_foramen'].includes(foramen.id)) ||
                    (selectedAnatomyId.startsWith('cn_7') && ['stylomastoid_foramen', 'internal_acoustic_meatus'].includes(foramen.id));

                  if (!isRelated) return [];
                }

                const isSelected = selectedAnatomyId === foramen.id;
                const isMidline = Math.abs(foramen.position[0]) < 0.005;
                const markers: React.ReactNode[] = [];

                if (lateralizationSide === 'bilateral' || lateralizationSide === 'right' || isMidline) {
                  markers.push(
                    <ForamenMarker
                      key={`${foramen.id}_right`}
                      id={foramen.id}
                      side="right"
                      nameVi={foramen.nameVi}
                      position={foramen.position}
                      isSelected={isSelected && (selectedSide === 'right' || !selectedSide)}
                      onSelect={handleStructureClick}
                    />
                  );
                }

                if (!isMidline && (lateralizationSide === 'bilateral' || lateralizationSide === 'left')) {
                  const mirroredPos: [number, number, number] = [
                    -foramen.position[0],
                    foramen.position[1],
                    foramen.position[2]
                  ];
                  markers.push(
                    <ForamenMarker
                      key={`${foramen.id}_left`}
                      id={foramen.id}
                      side="left"
                      nameVi={foramen.nameVi}
                      position={mirroredPos}
                      isSelected={isSelected && (selectedSide === 'left' || !selectedSide)}
                      onSelect={handleStructureClick}
                    />
                  );
                }

                return markers;
              })}
            </group>
          )}

          {/* D. Dental Arch FDI Tooth Markers (Full 32 Teeth with Lateralization & Guaranteed Selection Visibility) */}
          {(showTeethMarkers || selectedAnatomyId?.startsWith('tooth_')) && layerVisibility[10] && (
            <group name="DentalArchInnervation">
              {DENTAL_INNERVATION_DATABASE
                .filter((tooth) => {
                  const isToothSelected = selectedAnatomyId === `tooth_${tooth.fdi}`;
                  if (isToothSelected) return true; // ALWAYS display selected tooth
                  if (!showTeethMarkers) return false;
                  const isRight = tooth.quadrant === 1 || tooth.quadrant === 4;
                  if (lateralizationSide === 'right') return isRight;
                  if (lateralizationSide === 'left') return !isRight;
                  return true;
                })
                .map((tooth) => (
                  <ToothMarker
                    key={tooth.fdi}
                    fdi={tooth.fdi}
                    nameVi={tooth.nameVi}
                    toothType={tooth.toothType}
                    quadrant={tooth.quadrant}
                    side={tooth.quadrant === 1 || tooth.quadrant === 4 ? 'right' : 'left'}
                    position={tooth.position3D}
                    isSelected={selectedAnatomyId === `tooth_${tooth.fdi}`}
                    onSelect={handleStructureClick}
                  />
                ))}
            </group>
          )}

          {/* E. Clinical Dental Anesthesia Injection Target Marker */}
          {isAnesthesiaMode && activeAnesthesia && (
            <group position={activeAnesthesia.needleTargetPosition}>
              <mesh>
                <sphereGeometry args={[0.004, 16, 16]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
              <pointLight color="#ef4444" intensity={2.0} distance={0.06} />
              <Html center position={[0, 0.012, 0]}>
                <div className="bg-rose-950/95 border border-rose-400 text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap animate-pulse">
                  🎯 {activeAnesthesia.nameVi}
                </div>
              </Html>
            </group>
          )}
        </group>

        {/* Dynamic Camera Glide & Smooth OrbitControls */}
        <DentalCameraController controlsRef={controlsRef} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.85}
          minDistance={0.10}
          maxDistance={1.4}
          target={[0.0, 1.33, 0.17]}
        />
      </Canvas>
    </div>
  );
};
