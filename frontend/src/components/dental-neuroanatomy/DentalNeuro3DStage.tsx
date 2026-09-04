import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';
import {
  useDentalNeuroStore
} from '../../stores/useDentalNeuroStore';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  CLINICAL_ANESTHESIA_TECHNIQUES
} from '../../data/dentalNeuroData';

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

// 3D Tube geometry for nerve curves
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
  radius = 0.0032,
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

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 36, isSelected ? radius * 1.5 : radius, 10, false);
  }, [curve, radius, isSelected]);

  // Pulse effect ref
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current && isSelected) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const glow = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 4);
      mat.emissiveIntensity = 0.4 + glow * 0.6;
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
          emissiveIntensity={isSelected ? 0.8 : 0.25}
          roughness={0.3}
          metalness={0.2}
          transparent={opacity < 0.98}
          opacity={opacity}
        />
      </mesh>

      {/* Animated Tracer Bead */}
      {isTracing && tracerPos && (
        <mesh position={tracerPos}>
          <sphereGeometry args={[radius * 2.8, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight color="#fde047" intensity={2.5} distance={0.08} />
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
        <torusGeometry args={[0.007, 0.0018, 12, 24]} />
        <meshBasicMaterial color={isSelected ? '#ef4444' : hovered ? '#f59e0b' : '#38bdf8'} />
      </mesh>

      {/* Label Badge */}
      {(hovered || isSelected) && (
        <Html center position={[0, 0.015, 0]} zIndexRange={[100, 0]}>
          <div
            onClick={() => onSelect(id)}
            className={`px-2 py-1 rounded text-[10px] font-semibold whitespace-nowrap shadow-lg border cursor-pointer transition-all transform -translate-y-1 select-none ${
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

// 3D Dental Arch Marker
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
        <sphereGeometry args={[0.004, 12, 12]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : hovered ? '#fde047' : '#ffffff'}
          roughness={0.2}
          emissive={isSelected ? '#0284c7' : '#000000'}
          emissiveIntensity={isSelected ? 0.6 : 0}
        />
      </mesh>

      {(hovered || isSelected) && (
        <Html center position={[0, -0.015, 0]} zIndexRange={[100, 0]}>
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

// Craniofacial Base Organ Models
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

  // Tune materials based on layer visibility and radiographic mode
  const applyLayerMaterials = (scene: THREE.Group, opacity: number, colorOverride?: string) => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.transparent = opacity < 0.98;
        child.material.opacity = opacity;
        child.material.clippingPlanes = clippingPlanes;
        child.material.clipShadows = true;

        if (colorOverride) {
          child.material.color = new THREE.Color(colorOverride);
        }

        if (isRadiographicView) {
          child.material.roughness = 0.6;
          child.material.metalness = 0.1;
          child.material.depthWrite = opacity > 0.6;
        }
      }
    });
  };

  // 1. Dentomaxillofacial (Jaws & Teeth - Layer 10 & 11)
  useMemo(() => {
    const opacity = isMandibularCanalMode ? 0.35 : layerOpacity[11] ?? 0.85;
    applyLayerMaterials(dentomaxillofacialGltf.scene, opacity, isRadiographicView ? '#94a3b8' : '#f5ebe0');
  }, [dentomaxillofacialGltf, layerOpacity, isRadiographicView, isMandibularCanalMode, clippingPlanes]);

  // 2. Skull (Cranium & Skull Base - Layer 4)
  useMemo(() => {
    const opacity = isMandibularCanalMode ? 0 : isRadiographicView ? 0.20 : layerOpacity[4] ?? 0.50;
    applyLayerMaterials(skullGltf.scene, opacity, isRadiographicView ? '#64748b' : '#fbf7f0');
  }, [skullGltf, layerOpacity, isRadiographicView, isMandibularCanalMode, clippingPlanes]);

  // 3. Brainstem (Layer 13)
  useMemo(() => {
    const opacity = isMandibularCanalMode ? 0 : layerOpacity[13] ?? 0.70;
    applyLayerMaterials(brainstemGltf.scene, opacity, '#fed7aa');
  }, [brainstemGltf, layerOpacity, isMandibularCanalMode, clippingPlanes]);

  // 4. Salivary Glands (Layer 9)
  useMemo(() => {
    const opacity = isMandibularCanalMode ? 0 : layerOpacity[9] ?? 0.75;
    applyLayerMaterials(salivaryGlandsGltf.scene, opacity, '#f472b6');
  }, [salivaryGlandsGltf, layerOpacity, isMandibularCanalMode, clippingPlanes]);

  // 5. Tongue (Layer 5/10)
  useMemo(() => {
    const opacity = isMandibularCanalMode ? 0.15 : layerOpacity[5] ?? 0.65;
    applyLayerMaterials(tongueGltf.scene, opacity, '#f87171');
  }, [tongueGltf, layerOpacity, isMandibularCanalMode, clippingPlanes]);

  return (
    <group position={[0, 1.34, 0.12]}>
      {/* Dentomaxillofacial (Jaws and Teeth) */}
      {(layerVisibility[10] || layerVisibility[11]) && (
        <primitive object={dentomaxillofacialGltf.scene} scale={[0.18, 0.18, 0.18]} />
      )}

      {/* Cranium & Skull */}
      {layerVisibility[4] && !isMandibularCanalMode && (
        <primitive object={skullGltf.scene} scale={[0.185, 0.185, 0.185]} position={[0, 0.02, -0.01]} />
      )}

      {/* Brainstem */}
      {layerVisibility[13] && !isMandibularCanalMode && (
        <primitive object={brainstemGltf.scene} scale={[0.12, 0.12, 0.12]} position={[0, 0.05, -0.05]} />
      )}

      {/* Salivary Glands (Parotid, Submandibular, Sublingual) */}
      {layerVisibility[9] && !isMandibularCanalMode && (
        <primitive object={salivaryGlandsGltf.scene} scale={[0.15, 0.15, 0.15]} position={[0, 0, 0.02]} />
      )}

      {/* Tongue */}
      {layerVisibility[5] && (
        <primitive object={tongueGltf.scene} scale={[0.14, 0.14, 0.14]} position={[0, -0.03, 0.05]} />
      )}
    </group>
  );
};

// Master 3D Stage
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

  // Automatic trace playback ticker
  useEffect(() => {
    if (tracePlaybackState !== 'playing') return;

    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const next = (traceProgress + delta * 0.45) % 1.0;
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

  // Handle click on canvas background to deselect
  const handlePointerMissed = () => {
    // Only deselect if not in quiz mode
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

  // Active anesthesia technique
  const activeAnesthesia = useMemo(() => {
    return CLINICAL_ANESTHESIA_TECHNIQUES.find((a) => a.id === activeAnesthesiaId);
  }, [activeAnesthesiaId]);

  return (
    <div className="relative w-full h-full bg-radial from-slate-900 via-[#0a0e17] to-[#05070c] select-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.38, 0.45], fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          localClippingEnabled: true
        }}
        onPointerMissed={handlePointerMissed}
      >
        {/* Cinematic Dental Lighting */}
        <ambientLight intensity={0.85} />
        <directionalLight position={[1.5, 3.0, 2.0]} intensity={1.4} castShadow />
        <directionalLight position={[-2.0, 1.5, -1.0]} intensity={0.65} color="#38bdf8" />
        <pointLight position={[0, 1.38, 0.35]} intensity={1.1} distance={1.2} />

        {/* 1. Base Anatomical Skeletal Models */}
        <React.Suspense fallback={null}>
          <CraniofacialSkeletonAndOrgans
            layerVisibility={layerVisibility}
            layerOpacity={layerOpacity}
            isRadiographicView={isRadiographicView}
            isMandibularCanalMode={isMandibularCanalMode}
            clippingPlanes={clippingPlanes}
          />
        </React.Suspense>

        {/* 2. Cranial & Dental Nerve 3D Pathways (Layer 6) */}
        {layerVisibility[6] && (
          <group name="CraniofacialNerveNetwork">
            {Object.values(DENTAL_NERVE_STRUCTURES).map((nerve) => {
              if (!nerve.path3D || nerve.path3D.length < 2) return null;
              const isSelected = selectedAnatomyId === nerve.id;
              const isTracing = activeNerveTraceId === nerve.id;
              const opacity = selectedAnatomyId
                ? isSelected || isTracing
                  ? 1.0
                  : 0.25
                : layerOpacity[6] ?? 1.0;

              return (
                <NerveCurveMesh
                  key={nerve.id}
                  id={nerve.id}
                  points={nerve.path3D}
                  color={nerve.color}
                  radius={isSelected ? 0.0042 : 0.0028}
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

        {/* 3. Cranial Foramina Markers */}
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

        {/* 4. Dental Arch FDI Tooth Markers */}
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

        {/* 5. Clinical Dental Anesthesia Injection Target Marker */}
        {isAnesthesiaMode && activeAnesthesia && (
          <group position={activeAnesthesia.needleTargetPosition}>
            {/* Needle Insertion Target Beacon */}
            <mesh>
              <sphereGeometry args={[0.005, 16, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
            <pointLight color="#ef4444" intensity={2.0} distance={0.06} />
            <Html center position={[0, 0.015, 0]}>
              <div className="bg-rose-950/95 border border-rose-400 text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap animate-pulse">
                🎯 {activeAnesthesia.nameVi}
              </div>
            </Html>
          </group>
        )}

        {/* 6. Dynamic Camera Glide & Smooth OrbitControls */}
        <DentalCameraController controlsRef={controlsRef} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.85}
          minDistance={0.12}
          maxDistance={1.6}
          target={[0, 1.34, 0.12]}
        />
      </Canvas>
    </div>
  );
};
