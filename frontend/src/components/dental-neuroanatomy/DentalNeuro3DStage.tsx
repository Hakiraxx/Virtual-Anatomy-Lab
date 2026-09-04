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
function createCraniofacialOrganGroup(
  scene: THREE.Object3D,
  targetSize: number,
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

  // 3. Scale uniformly to anatomical dimensions
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? targetSize / maxDim : 1;
  const root = new THREE.Group();
  root.scale.set(scale, scale, scale);
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
  points: [number, number, number][];
  color: string;
  radius?: number;
  isSelected: boolean;
  isTracing: boolean;
  traceProgress: number;
  opacity: number;
  onSelect: (id: string) => void;
}

const NerveCurveMesh: React.FC<NerveCurveMeshProps> = ({
  id,
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
          onSelect(id);
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

// 3D Foramen Ring Marker
interface ForamenMarkerProps {
  id: string;
  nameVi: string;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ForamenMarker: React.FC<ForamenMarkerProps> = ({
  id,
  nameVi,
  position,
  isSelected,
  onSelect
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* 3D Target Ring */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
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
        <torusGeometry args={[0.005, 0.0012, 12, 24]} />
        <meshBasicMaterial color={isSelected ? '#ef4444' : hovered ? '#f59e0b' : '#38bdf8'} />
      </mesh>

      {/* Label Badge */}
      {(hovered || isSelected) && (
        <Html center position={[0, 0.012, 0]} zIndexRange={[100, 0]}>
          <div
            onClick={() => onSelect(id)}
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

// 3D Dental Arch FDI Tooth Marker
interface ToothMarkerProps {
  fdi: number;
  nameVi: string;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ToothMarker: React.FC<ToothMarkerProps> = ({
  fdi,
  nameVi,
  position,
  isSelected,
  onSelect
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(`tooth_${fdi}`);
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
        <sphereGeometry args={[0.003, 12, 12]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : hovered ? '#fde047' : '#ffffff'}
          roughness={0.25}
          emissive={isSelected ? '#0284c7' : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>

      {(hovered || isSelected) && (
        <Html center position={[0, -0.012, 0]} zIndexRange={[100, 0]}>
          <div
            onClick={() => onSelect(`tooth_${fdi}`)}
            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap shadow border cursor-pointer ${
              isSelected
                ? 'bg-sky-900 text-sky-100 border-sky-400'
                : 'bg-slate-900/90 text-amber-200 border-amber-400/80'
            }`}
          >
            R.{fdi} {nameVi.split('(')[0]}
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
}> = ({
  layerVisibility,
  layerOpacity,
  isRadiographicView,
  isMandibularCanalMode,
  clippingPlanes
}) => {
  // Load models from public folder
  const dentomaxillofacialGltf = useGLTF('/models/dentomaxillofacial.glb');
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
        child.material.transparent = opacity < 0.98;
        child.material.opacity = opacity;
        child.material.clippingPlanes = clippingPlanes;
        child.material.clipShadows = true;

        if (isRadiographicView) {
          child.material.roughness = 0.65;
          child.material.metalness = 0.1;
          child.material.depthWrite = opacity > 0.6;
          child.material.color = new THREE.Color(isBone ? '#94a3b8' : colorOverride);
        } else {
          child.material.roughness = isBone ? 0.52 : 0.4;
          child.material.metalness = isBone ? 0.02 : 0.1;
          child.material.depthWrite = true;
          child.material.color = new THREE.Color(colorOverride);
        }
      }
    });
  };

  // 1. Normalized Dentomaxillofacial (Jaws & Teeth)
  // Articulated with Anterior face towards +Z, dental arch at Y ~ 1.32, Z ~ 0.185
  const normalizedJaws = useMemo(() => {
    return createCraniofacialOrganGroup(
      dentomaxillofacialGltf.scene,
      0.155,
      [0, -Math.PI / 2, 0],
      [0.0, 1.32, 0.185]
    );
  }, [dentomaxillofacialGltf]);

  // 2. Normalized Skull (Cranium & Skull Base)
  // Articulated with Anterior face towards +Z, cranial vault at Y ~ 1.41, Z ~ 0.09
  const normalizedSkull = useMemo(() => {
    return createCraniofacialOrganGroup(
      skullGltf.scene,
      0.205,
      [0, -Math.PI / 2, 0],
      [0.0, 1.41, 0.09]
    );
  }, [skullGltf]);

  // 3. Normalized Brainstem
  // Nested inside foramen magnum at Y ~ 1.40, Z ~ 0.02
  const normalizedBrainstem = useMemo(() => {
    return createCraniofacialOrganGroup(
      brainstemGltf.scene,
      0.08,
      [0, 0, 0],
      [0.0, 1.40, 0.02]
    );
  }, [brainstemGltf]);

  // 4. Normalized Salivary Glands
  const normalizedSalivary = useMemo(() => {
    return createCraniofacialOrganGroup(
      salivaryGlandsGltf.scene,
      0.11,
      [0, -Math.PI / 2, 0],
      [0.0, 1.33, 0.13]
    );
  }, [salivaryGlandsGltf]);

  // 5. Normalized Tongue
  const normalizedTongue = useMemo(() => {
    return createCraniofacialOrganGroup(
      tongueGltf.scene,
      0.07,
      [0, -Math.PI / 2, 0],
      [0.0, 1.31, 0.19]
    );
  }, [tongueGltf]);

  // Dynamic opacity and material updates
  useMemo(() => {
    const jawOpacity = isMandibularCanalMode ? 0.35 : isRadiographicView ? 0.22 : layerOpacity[11] ?? 0.88;
    applyLayerMaterials(normalizedJaws, jawOpacity, '#f5eee4', true);

    const skullOpacity = isMandibularCanalMode ? 0 : isRadiographicView ? 0.18 : layerOpacity[4] ?? 0.50;
    applyLayerMaterials(normalizedSkull, skullOpacity, '#fbf7f0', true);

    const bsOpacity = isMandibularCanalMode ? 0 : layerOpacity[13] ?? 0.75;
    applyLayerMaterials(normalizedBrainstem, bsOpacity, '#fed7aa', false);

    const salOpacity = isMandibularCanalMode ? 0 : layerOpacity[9] ?? 0.70;
    applyLayerMaterials(normalizedSalivary, salOpacity, '#f472b6', false);

    const tgOpacity = isMandibularCanalMode ? 0.15 : layerOpacity[5] ?? 0.65;
    applyLayerMaterials(normalizedTongue, tgOpacity, '#f87171', false);
  }, [
    normalizedJaws,
    normalizedSkull,
    normalizedBrainstem,
    normalizedSalivary,
    normalizedTongue,
    layerOpacity,
    isRadiographicView,
    isMandibularCanalMode,
    clippingPlanes
  ]);

  return (
    <group name="SkeletalStructures">
      {/* Dentomaxillofacial Jaws & Teeth */}
      {(layerVisibility[10] || layerVisibility[11]) && (
        <primitive object={normalizedJaws} />
      )}

      {/* Cranium & Skull */}
      {layerVisibility[4] && !isMandibularCanalMode && (
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

  const handleStructureClick = (id: string) => {
    if (quizMode) {
      submitQuizAnswer(id);
    } else {
      selectAnatomy(id);
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
            />
          </React.Suspense>

          {/* B. Cranial & Dental Nerve 3D Pathways (Layer 6) */}
          {layerVisibility[6] && (
            <group name="CranialNerves">
              {Object.values(DENTAL_NERVE_STRUCTURES).map((nerve) => {
                if (!nerve.path3D || nerve.path3D.length < 2) return null;
                const isSelected = selectedAnatomyId === nerve.id;
                const isTracing = activeNerveTraceId === nerve.id;
                const opacity = selectedAnatomyId
                  ? isSelected || isTracing
                    ? 1.0
                    : 0.20
                  : layerOpacity[6] ?? 1.0;

                return (
                  <NerveCurveMesh
                    key={nerve.id}
                    id={nerve.id}
                    points={nerve.path3D}
                    color={nerve.color}
                    isSelected={isSelected}
                    isTracing={isTracing}
                    traceProgress={traceProgress}
                    opacity={opacity}
                    onSelect={handleStructureClick}
                  />
                );
              })}
            </group>
          )}

          {/* C. Cranial Foramina 3D Ring Markers */}
          {showForaminaMarkers && !isMandibularCanalMode && (
            <group name="CranialForaminaLab">
              {Object.values(CRANIAL_FORAMINA).map((foramen) => (
                <ForamenMarker
                  key={foramen.id}
                  id={foramen.id}
                  nameVi={foramen.nameVi}
                  position={foramen.position}
                  isSelected={selectedAnatomyId === foramen.id}
                  onSelect={handleStructureClick}
                />
              ))}
            </group>
          )}

          {/* D. Dental Arch FDI Tooth Markers */}
          {showTeethMarkers && layerVisibility[10] && (
            <group name="DentalArchInnervation">
              {DENTAL_INNERVATION_DATABASE.map((tooth) => (
                <ToothMarker
                  key={tooth.fdi}
                  fdi={tooth.fdi}
                  nameVi={tooth.nameVi}
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
