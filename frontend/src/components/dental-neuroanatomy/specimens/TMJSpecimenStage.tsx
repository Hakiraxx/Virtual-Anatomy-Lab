import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  AlertTriangle,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { MASTICATORY_MUSCLES_DETAIL } from '../../../data/dentalSpecimensData';

// Helper to extract an isolated real mesh from a loaded glTF scene with baked world transforms
function extractBakedMesh(
  rootScene: THREE.Object3D,
  nodeName: string,
  pivotOffset?: THREE.Vector3
): THREE.BufferGeometry | null {
  rootScene.updateMatrixWorld(true);
  let match: THREE.Mesh | null = null;
  rootScene.traverse((child) => {
    if (!match && child.name === nodeName && (child as THREE.Mesh).isMesh) {
      match = child as THREE.Mesh;
    }
  });
  if (!match) return null;
  const geom = (match as THREE.Mesh).geometry.clone();
  geom.applyMatrix4((match as THREE.Mesh).matrixWorld);
  if (pivotOffset) {
    geom.translate(-pivotOffset.x, -pivotOffset.y, -pivotOffset.z);
  }
  geom.computeVertexNormals();
  return geom;
}

// ============================================================================
// 1. REAL PRE-MADE 3D SKULL BACKGROUND FOR TMJ CONTEXT (Z-Anatomy / CC BY-SA 4.0)
// ============================================================================
const RealSkullTMJContext: React.FC<{
  opacity: number;
  showSkull: boolean;
}> = ({ opacity, showSkull }) => {
  const skullGltf = useGLTF('/models/craniofacial/skull/skull_complete.glb', '/draco/');

  const craniumScene = useMemo(() => {
    const cloned = skullGltf.scene.clone(true);
    // Hide the Mandible here so the articulated dynamic mandible doesn't collide
    cloned.traverse((child: any) => {
      if (child.name === 'Mandible' || child.name?.startsWith('Mandib')) {
        child.visible = false;
      } else if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = opacity < 0.98;
        child.material.opacity = opacity;
        child.material.roughness = 0.65;
        child.material.metalness = 0.03;
        child.material.color = new THREE.Color('#eae2d5');
        child.material.depthWrite = opacity > 0.6;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [skullGltf, opacity]);

  if (!showSkull) return null;

  return <primitive object={craniumScene} />;
};

// ============================================================================
// 2. REAL PRE-MADE TMJ COMPLEX, DISC, CONDYLE & 4 MASTICATORY MUSCLES
// ============================================================================
const RealTMJComplexMesh: React.FC<{
  progress: number;
  motionMode: 'opening' | 'protrusion' | 'lateral';
  pathology: 'normal' | 'tmd_reduction' | 'tmd_non_reduction' | 'tmd_dislocation';
  showMuscles: boolean;
  showLigaments: boolean;
  activeMuscleId: string | null;
}> = ({ progress, motionMode, pathology, showMuscles, showLigaments, activeMuscleId }) => {
  const [clickSoundTriggered, setClickSoundTriggered] = useState(false);

  // Exact anatomical hinge axis passing through both condyles in Z-Anatomy coordinate frame
  const condyleHinge = useMemo(() => new THREE.Vector3(0.0451, 0.80675, -0.00391), []);
  // Exact anatomical right TMJ disc centroid in Z-Anatomy coordinate frame
  const rightDiscCentroid = useMemo(() => new THREE.Vector3(-0.006236, 0.80675, -0.00391), []);

  // Load verified real medical assets
  const tmjGltf = useGLTF('/models/craniofacial/tmj/tmj_complex.glb', '/draco/');
  const musclesGltf = useGLTF('/models/craniofacial/muscles/masticatory_muscles.glb', '/draco/');
  const skullGltf = useGLTF('/models/craniofacial/skull/skull_complete.glb', '/draco/');

  // 1. Extract Real Mandible Geometry (with pivot at condyle hinge axis)
  const mandibleGeom = useMemo(() => {
    return extractBakedMesh(skullGltf.scene, 'Mandible', condyleHinge);
  }, [skullGltf, condyleHinge]);

  // 2. Extract Real TMJ Articular Disc Geometry (with pivot at right disc centroid)
  const discGeom = useMemo(() => {
    return extractBakedMesh(tmjGltf.scene, 'Articular disc of temporomandibular joint.r', rightDiscCentroid);
  }, [tmjGltf, rightDiscCentroid]);

  // 3. Extract Real TMJ Ligaments & Capsule
  const lateralLigamentGeom = useMemo(() => {
    return extractBakedMesh(tmjGltf.scene, 'Lateral temporomandibular ligament.r');
  }, [tmjGltf]);

  const sphenoLigamentGeom = useMemo(() => {
    return extractBakedMesh(tmjGltf.scene, 'Sphenomandibular ligament.r');
  }, [tmjGltf]);

  const styloLigamentGeom = useMemo(() => {
    return extractBakedMesh(tmjGltf.scene, 'Stylomandibular ligament.r');
  }, [tmjGltf]);

  const capsuleGeom = useMemo(() => {
    return extractBakedMesh(tmjGltf.scene, 'Articular capsule of temporomandibular joint.r');
  }, [tmjGltf]);

  // 4. Extract Real Masticatory Muscles (Right Side)
  const masseterSuperficialGeom = useMemo(() => {
    return extractBakedMesh(musclesGltf.scene, 'Superficial part of masseter.r');
  }, [musclesGltf]);

  const masseterDeepGeom = useMemo(() => {
    return extractBakedMesh(musclesGltf.scene, 'Deep part of masseter.r');
  }, [musclesGltf]);

  const temporalisGeom = useMemo(() => {
    return extractBakedMesh(musclesGltf.scene, 'Temporalis muscle.r');
  }, [musclesGltf]);

  const lateralPterygoidSuperiorGeom = useMemo(() => {
    return extractBakedMesh(musclesGltf.scene, 'Superior head of lateral pterygoid muscle.r');
  }, [musclesGltf]);

  const lateralPterygoidInferiorGeom = useMemo(() => {
    return extractBakedMesh(musclesGltf.scene, 'Inferior head of lateral pterygoid muscle.r');
  }, [musclesGltf]);

  const medialPterygoidGeom = useMemo(() => {
    return extractBakedMesh(musclesGltf.scene, 'Medial pterygoid muscle.r');
  }, [musclesGltf]);

  // Kinematics: rotation and translation curves
  const kinematics = useMemo(() => {
    let rotationAngle = 0; // Radians around condylar axis (X-axis)
    let translationX = 0;
    let translationY = 0;
    let translationZ = 0;
    let discOffsetZ = 0;

    if (motionMode === 'opening') {
      if (pathology === 'tmd_non_reduction') {
        const capped = Math.min(progress, 0.45);
        rotationAngle = capped * 0.28;
        translationY = -capped * 0.006;
        translationZ = capped * 0.005;
        discOffsetZ = 0.008; // Anterior displacement without reduction
      } else if (pathology === 'tmd_dislocation') {
        rotationAngle = 0.45;
        translationY = -0.015;
        translationZ = 0.024;
        discOffsetZ = -0.004;
      } else if (pathology === 'tmd_reduction') {
        if (progress < 0.35) {
          rotationAngle = progress * 0.35;
          translationY = -progress * 0.010;
          translationZ = progress * 0.012;
          discOffsetZ = 0.009;
        } else {
          rotationAngle = progress * 0.42;
          translationY = -progress * 0.016;
          translationZ = progress * 0.020;
          discOffsetZ = 0.001;
        }
      } else {
        // Normal 2-Phase Opening
        if (progress <= 0.4) {
          const p1 = progress / 0.4;
          rotationAngle = p1 * 0.20;
          translationY = -p1 * 0.002;
          translationZ = p1 * 0.002;
          discOffsetZ = 0;
        } else {
          const p2 = (progress - 0.4) / 0.6;
          rotationAngle = 0.20 + p2 * 0.22;
          translationY = -0.002 - p2 * 0.012;
          translationZ = 0.002 + p2 * 0.015;
          discOffsetZ = -p2 * 0.002;
        }
      }
    } else if (motionMode === 'protrusion') {
      translationZ = progress * 0.015;
      translationY = -progress * 0.003;
      rotationAngle = 0.04;
    } else if (motionMode === 'lateral') {
      translationX = -progress * 0.006;
      translationZ = progress * 0.006;
      rotationAngle = progress * 0.05;
    }

    return { rotationAngle, translationX, translationY, translationZ, discOffsetZ };
  }, [progress, motionMode, pathology]);

  // Click feedback for DDwR
  useEffect(() => {
    if (pathology === 'tmd_reduction' && progress >= 0.35 && progress <= 0.5) {
      setClickSoundTriggered(true);
    } else {
      setClickSoundTriggered(false);
    }
  }, [pathology, progress]);

  // Dynamic Muscle Highlight Material Helpers
  const getMuscleMaterial = (muscleId: string, baseColor: string) => {
    const isSelected = activeMuscleId === muscleId;
    const isDimmed = activeMuscleId && !isSelected;
    return (
      <meshStandardMaterial
        color={isSelected ? '#fda4af' : baseColor}
        emissive={isSelected ? '#e11d48' : '#000000'}
        emissiveIntensity={isSelected ? 0.45 : 0}
        roughness={0.38}
        metalness={0.05}
        transparent={!!isDimmed}
        opacity={isDimmed ? 0.25 : 0.95}
      />
    );
  };

  return (
    <group name="RealTMJComplexRoot">
      {/* 1. MỐC GIẢI PHẪU NỀN SỌ (Articular Eminence & Glenoid Fossa Labels on Temporal Bone) */}
      <group position={[rightDiscCentroid.x, rightDiscCentroid.y, rightDiscCentroid.z]}>
        <Html position={[-0.012, 0.008, -0.012]} center>
          <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-white/20 text-slate-200 text-[8px] font-mono whitespace-nowrap pointer-events-none shadow-md">
            Hố hàm (Glenoid Fossa)
          </div>
        </Html>
        <Html position={[-0.012, 0.004, 0.018]} center>
          <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-white/20 text-slate-200 text-[8px] font-mono whitespace-nowrap pointer-events-none shadow-md">
            Lồi khớp (Articular Eminence)
          </div>
        </Html>
      </group>

      {/* 2. REAL PRE-MADE ARTICULAR DISC (Z-Anatomy Biconcave Saddle Mesh) */}
      {discGeom && (
        <group
          position={[
            rightDiscCentroid.x + kinematics.translationX * 0.85,
            rightDiscCentroid.y + kinematics.translationY * 0.85,
            rightDiscCentroid.z + kinematics.translationZ * 0.85 + kinematics.discOffsetZ
          ]}
        >
          <mesh geometry={discGeom} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#38bdf8"
              roughness={0.25}
              transmission={0.35}
              thickness={0.002}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* Dynamic Click Alert Visualizer for DDwR */}
          {clickSoundTriggered && (
            <Html position={[0, 0.015, 0]} center>
              <div className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-widest shadow-2xl animate-bounce flex items-center gap-1 border border-white">
                <Volume2 className="w-3.5 h-3.5" />
                <span>CLICK! (Tái Lập Đĩa)</span>
              </div>
            </Html>
          )}
        </group>
      )}

      {/* 3. REAL PRE-MADE MANDIBLE & ARTICULATING CONDYLE */}
      {mandibleGeom && (
        <group
          position={[
            condyleHinge.x + kinematics.translationX,
            condyleHinge.y + kinematics.translationY,
            condyleHinge.z + kinematics.translationZ
          ]}
          rotation={[kinematics.rotationAngle, 0, 0]}
        >
          <mesh geometry={mandibleGeom} castShadow receiveShadow>
            <meshStandardMaterial
              color="#f5ede2"
              emissive="#fbbf24"
              emissiveIntensity={0.06}
              roughness={0.55}
              metalness={0.03}
            />
          </mesh>
        </group>
      )}

      {/* 4. REAL PRE-MADE TMJ LIGAMENTS & ARTICULAR CAPSULE */}
      {showLigaments && (
        <group name="TMJLigaments">
          {lateralLigamentGeom && (
            <mesh geometry={lateralLigamentGeom}>
              <meshStandardMaterial color="#38bdf8" roughness={0.3} transparent opacity={0.85} />
            </mesh>
          )}
          {sphenoLigamentGeom && (
            <mesh geometry={sphenoLigamentGeom}>
              <meshStandardMaterial color="#60a5fa" roughness={0.3} transparent opacity={0.80} />
            </mesh>
          )}
          {styloLigamentGeom && (
            <mesh geometry={styloLigamentGeom}>
              <meshStandardMaterial color="#93c5fd" roughness={0.3} transparent opacity={0.80} />
            </mesh>
          )}
          {capsuleGeom && (
            <mesh geometry={capsuleGeom}>
              <meshPhysicalMaterial color="#bae6fd" roughness={0.4} transparent opacity={0.35} depthWrite={false} />
            </mesh>
          )}
          <Html position={[rightDiscCentroid.x - 0.012, rightDiscCentroid.y - 0.010, rightDiscCentroid.z]} center>
            <div className="px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-400/30 text-sky-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
              Dây chằng & Bao khớp
            </div>
          </Html>
        </group>
      )}

      {/* 5. REAL PRE-MADE 4 MASTICATORY MUSCLES (Z-Anatomy Striated Meshes) */}
      {showMuscles && (
        <group name="MasticatoryMuscles">
          {/* CƠ CẮN (Masseter) - Bó Nông & Bó Sâu */}
          {masseterSuperficialGeom && (
            <mesh geometry={masseterSuperficialGeom}>
              {getMuscleMaterial('muscle_masseter', '#be123c')}
            </mesh>
          )}
          {masseterDeepGeom && (
            <mesh geometry={masseterDeepGeom}>
              {getMuscleMaterial('muscle_masseter', '#9f1239')}
            </mesh>
          )}
          <Html position={[rightDiscCentroid.x - 0.012, rightDiscCentroid.y - 0.035, rightDiscCentroid.z + 0.025]} center>
            <div className="px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/50 text-rose-200 text-[7px] font-mono whitespace-nowrap pointer-events-none shadow-md">
              Cơ Cắn (Masseter)
            </div>
          </Html>

          {/* CƠ THÁI DƯƠNG (Temporalis) */}
          {temporalisGeom && (
            <mesh geometry={temporalisGeom}>
              {getMuscleMaterial('muscle_temporalis', '#be123c')}
            </mesh>
          )}
          <Html position={[rightDiscCentroid.x - 0.015, rightDiscCentroid.y + 0.035, rightDiscCentroid.z - 0.005]} center>
            <div className="px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/50 text-rose-200 text-[7px] font-mono whitespace-nowrap pointer-events-none shadow-md">
              Cơ Thái Dương (Temporalis)
            </div>
          </Html>

          {/* CƠ CHÂN BƯỚM NGOÀI (Lateral Pterygoid: Superior & Inferior Heads) */}
          {lateralPterygoidSuperiorGeom && (
            <mesh geometry={lateralPterygoidSuperiorGeom}>
              {getMuscleMaterial('muscle_lateral_pterygoid', '#ea580c')}
            </mesh>
          )}
          {lateralPterygoidInferiorGeom && (
            <mesh geometry={lateralPterygoidInferiorGeom}>
              {getMuscleMaterial('muscle_lateral_pterygoid', '#c2410c')}
            </mesh>
          )}
          <Html position={[rightDiscCentroid.x + 0.015, rightDiscCentroid.y + 0.002, rightDiscCentroid.z + 0.015]} center>
            <div className="px-1.5 py-0.5 rounded bg-orange-950/90 border border-orange-500/50 text-orange-200 text-[7px] font-mono whitespace-nowrap pointer-events-none shadow-md">
              Cơ Chân Bướm Ngoài
            </div>
          </Html>

          {/* CƠ CHÂN BƯỚM TRONG (Medial Pterygoid) */}
          {medialPterygoidGeom && (
            <mesh geometry={medialPterygoidGeom}>
              {getMuscleMaterial('muscle_medial_pterygoid', '#9a3412')}
            </mesh>
          )}
          <Html position={[rightDiscCentroid.x + 0.020, rightDiscCentroid.y - 0.030, rightDiscCentroid.z + 0.018]} center>
            <div className="px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-600/50 text-amber-200 text-[7px] font-mono whitespace-nowrap pointer-events-none shadow-md">
              Cơ Chân Bướm Trong
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};

// ============================================================================
// 3. MAIN COMPONENT: TMJ SPECIMEN STAGE
// ============================================================================
export const TMJSpecimenStage: React.FC = () => {
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const [showFullSkull, setShowFullSkull] = useState(true);
  const [skullOpacity] = useState(0.42);

  const tmjJawState = useDentalNeuroStore((s) => s.tmjJawState);
  const setTmjJawState = useDentalNeuroStore((s) => s.setTmjJawState);
  const tmjMotionMode = useDentalNeuroStore((s) => s.tmjMotionMode);
  const setTmjMotionMode = useDentalNeuroStore((s) => s.setTmjMotionMode);
  const tmjPathology = useDentalNeuroStore((s) => s.tmjPathology);
  const setTmjPathology = useDentalNeuroStore((s) => s.setTmjPathology);
  const tmjShowMuscles = useDentalNeuroStore((s) => s.tmjShowMuscles);
  const setTmjShowMuscles = useDentalNeuroStore((s) => s.setTmjShowMuscles);
  const tmjShowLigaments = useDentalNeuroStore((s) => s.tmjShowLigaments);
  const tmjActiveMuscleId = useDentalNeuroStore((s) => s.tmjActiveMuscleId);
  const setTmjActiveMuscleId = useDentalNeuroStore((s) => s.setTmjActiveMuscleId);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation Loop for automatic jaw motion
  useEffect(() => {
    let animId: number;
    let forward = true;

    const animateLoop = () => {
      if (isPlaying) {
        let next = tmjJawState + (forward ? 0.008 : -0.008);
        if (next >= 1.0) {
          next = 1.0;
          forward = false;
        } else if (next <= 0.0) {
          next = 0.0;
          forward = true;
        }
        setTmjJawState(next);
        animId = requestAnimationFrame(animateLoop);
      }
    };

    if (isPlaying) {
      animId = requestAnimationFrame(animateLoop);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, tmjJawState, setTmjJawState]);

  // mm of mouth opening (0 - 50 mm)
  const mmOpening = Math.round(tmjJawState * 50);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* 1. TOP HEADER OVERLAY */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-auto">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl max-w-sm ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
              TMJ BIOMECHANICS
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">
              KHOẢNG HÁ: {mmOpening} mm
            </span>
          </div>
          <h2 className="text-sm font-bold font-serif text-current">
            Tiêu Bản Phức Hợp Khớp Thái Dương Hàm (TMJ)
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {mmOpening <= 20
              ? 'Thì 1: Xoay lồi cầu thuần túy quanh trục bản lề (Khoang khớp dưới)'
              : 'Thì 2: Trượt lồi cầu & đĩa khớp ra trước - xuống dưới qua lồi khớp (Khoang khớp trên)'}
          </p>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 mt-2.5">
            <button
              onClick={() => setTmjMotionMode('opening')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                tmjMotionMode === 'opening'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:text-current'
              }`}
            >
              Há Miệng 2 Thì
            </button>
            <button
              onClick={() => setTmjMotionMode('protrusion')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                tmjMotionMode === 'protrusion'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:text-current'
              }`}
            >
              Đưa Ra Trước
            </button>
            <button
              onClick={() => setTmjMotionMode('lateral')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                tmjMotionMode === 'lateral'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:text-current'
              }`}
            >
              Sang Bên (Excursion)
            </button>
          </div>
        </div>
      </div>

      {/* 2. TOP RIGHT CLINICAL PATHOLOGY SELECTOR & 3D SKULL TOGGLE */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto max-w-xs">
        {/* Skull Model Context Toggle */}
        <div
          className={`p-2.5 rounded-2xl border backdrop-blur-md shadow-xl flex items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-bold">Mô Hình Xương Sọ 3D</span>
          </div>
          <button
            onClick={() => setShowFullSkull(!showFullSkull)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
              showFullSkull
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {showFullSkull ? 'ĐANG BẬT' : 'ĐÃ TẮT'}
          </button>
        </div>

        {/* Pathology Selector */}
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>MÔ PHỎNG RỐI LOẠN TMD</span>
          </div>

          <div className="space-y-1">
            {[
              { id: 'normal', name: 'Bình Thường (Khớp Khỏe Mạnh)', icon: CheckCircle2 },
              { id: 'tmd_reduction', name: 'Trượt Đĩa CÓ Hồi Phục (Tiếng Click)', icon: Volume2 },
              { id: 'tmd_non_reduction', name: 'Trượt Đĩa KHÔNG Hồi Phục (Kẹt Hàm)', icon: AlertTriangle },
              { id: 'tmd_dislocation', name: 'Trật Khớp TDH Cấp (Hở Khớp Cắn)', icon: AlertTriangle }
            ].map((p) => {
              const Icon = p.icon;
              const isSelected = tmjPathology === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setTmjPathology(p.id as any)}
                  className={`w-full px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition cursor-pointer flex items-center justify-between text-left ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : isDark
                      ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                      : 'bg-[#ede3d5] text-slate-700 hover:bg-[#dfd4c4]'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <Icon className="w-3 h-3 flex-shrink-0 ml-1 opacity-80" />
                </button>
              );
            })}
          </div>

          {/* 4 Muscles of Mastication Filter */}
          <div className="pt-2.5 mt-2.5 border-t border-inherit">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
              <span>Hệ Thống 4 Cơ Nhai</span>
              <button
                onClick={() => setTmjShowMuscles(!tmjShowMuscles)}
                className="text-amber-500 hover:underline cursor-pointer"
              >
                {tmjShowMuscles ? 'Ẩn Cơ' : 'Hiện Cơ'}
              </button>
            </div>
            {tmjShowMuscles && (
              <div className="grid grid-cols-2 gap-1">
                {MASTICATORY_MUSCLES_DETAIL.map((m) => (
                  <button
                    key={m.id}
                    onClick={() =>
                      setTmjActiveMuscleId(tmjActiveMuscleId === m.id ? null : m.id)
                    }
                    className={`px-1.5 py-1 rounded text-[9px] font-medium transition cursor-pointer truncate ${
                      tmjActiveMuscleId === m.id
                        ? 'bg-rose-600 text-white font-bold'
                        : isDark
                        ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                        : 'bg-[#ede3d5] text-slate-700 hover:bg-[#dfd4c4]'
                    }`}
                    style={{ borderLeft: `3px solid ${m.color}` }}
                  >
                    {m.nameVi.split(' ')[1] || m.nameVi}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. 3D WEBGL CANVAS STAGE */}
      <Canvas
        shadows
        camera={{ position: [-0.14, 0.84, 0.08], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[-0.4, 1.8, 0.5]} intensity={2.2} castShadow />
        <directionalLight position={[0.4, 0.5, -0.4]} intensity={0.9} />
        <pointLight position={[-0.0062, 0.82, 0.04]} intensity={1.5} color="#fffef7" />

        <React.Suspense fallback={null}>
          {/* Realistic 3D Real Skull Base Context from Z-Anatomy */}
          <RealSkullTMJContext
            showSkull={showFullSkull}
            opacity={skullOpacity}
          />

          {/* Real Articulating TMJ Disc & Mandible & 4 Masticatory Muscles */}
          <RealTMJComplexMesh
            progress={tmjJawState}
            motionMode={tmjMotionMode}
            pathology={tmjPathology}
            showMuscles={tmjShowMuscles}
            showLigaments={tmjShowLigaments}
            activeMuscleId={tmjActiveMuscleId}
          />
        </React.Suspense>

        {/* Orbit Controls centered on Right TMJ */}
        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          minDistance={0.05}
          maxDistance={0.5}
          target={[-0.006236, 0.80675, -0.00391]}
        />
      </Canvas>

      {/* 4. BOTTOM KINEMATICS CONTROL BAR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md shadow-2xl text-[11px] font-medium pointer-events-auto bg-slate-900/90 border-slate-800 text-slate-200">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 rounded-full bg-amber-600 text-white hover:bg-amber-500 transition cursor-pointer"
          title={isPlaying ? 'Tạm dừng' : 'Tự động há/ngậm hàm'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Range Slider */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-[10px]">Ngậm</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={tmjJawState}
            onChange={(e) => {
              setIsPlaying(false);
              setTmjJawState(parseFloat(e.target.value));
            }}
            className="w-32 sm:w-48 accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
          />
          <span className="text-slate-400 font-mono text-[10px]">Há Tối Đa ({mmOpening}mm)</span>
        </div>

        <button
          onClick={() => {
            setIsPlaying(false);
            setTmjJawState(0);
          }}
          className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
          title="Đặt lại ngậm miệng"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
