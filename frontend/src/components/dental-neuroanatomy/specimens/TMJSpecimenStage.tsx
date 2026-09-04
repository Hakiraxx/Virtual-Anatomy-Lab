import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Layers
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { TMJ_SPECIMEN_DATA, MASTICATORY_MUSCLES_DETAIL } from '../../../data/dentalSpecimensData';
import { createCraniofacialOrganGroup } from '../DentalNeuro3DStage';

// ============================================================================
// 1. CANONICAL 3D SKULL BACKGROUND FOR TMJ CONTEXT
// ============================================================================
const CanonicalSkullTMJContext: React.FC<{
  opacity: number;
  showSkull: boolean;
}> = ({ opacity, showSkull }) => {
  const skullGltf = useGLTF('/models/skull.glb');

  const normalizedSkull = useMemo(() => {
    const group = createCraniofacialOrganGroup(
      skullGltf.scene,
      0.205,
      [0, -Math.PI / 2, 0],
      [0.0, 1.41, 0.09]
    );

    // Apply high-fidelity anatomical bone shader
    group.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.transparent = opacity < 0.98;
        child.material.opacity = opacity;
        child.material.roughness = 0.65;
        child.material.metalness = 0.03;
        child.material.color = new THREE.Color('#eae2d5');
        child.material.depthWrite = opacity > 0.6;
      }
    });

    return group;
  }, [skullGltf, opacity]);

  if (!showSkull) return null;

  return <primitive object={normalizedSkull} />;
};

// ============================================================================
// 2. TMJ COMPLEX & BIOMECHANICS MESH (RIGHT TMJ: NEGATIVE X)
// ============================================================================
const TMJComplexMesh: React.FC<{
  progress: number;
  motionMode: 'opening' | 'protrusion' | 'lateral';
  pathology: 'normal' | 'tmd_reduction' | 'tmd_non_reduction' | 'tmd_dislocation';
  showMuscles: boolean;
  showLigaments: boolean;
  activeMuscleId: string | null;
}> = ({ progress, motionMode, pathology, showMuscles, showLigaments, activeMuscleId }) => {
  const condyleRef = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Group>(null);
  const [clickSoundTriggered, setClickSoundTriggered] = useState(false);

  // Exact anatomical coordinate of Right TMJ on canonical skull: [-0.046, 1.366, 0.068]
  const tmjBasePos: [number, number, number] = [-0.046, 1.366, 0.068];

  // Compute anatomical translation & rotation based on jaw opening phase
  const kinematics = useMemo(() => {
    let rotationAngle = 0; // Pure rotation around transverse axis
    let translationX = 0;  // Lateral
    let translationY = 0;  // Inferior
    let translationZ = 0;  // Anterior (forward)
    let discOffsetZ = 0;   // Disc relative to condyle

    if (motionMode === 'opening') {
      if (pathology === 'tmd_non_reduction') {
        // Closed lock: cannot open beyond ~25mm (progress capped at 0.45)
        const capped = Math.min(progress, 0.45);
        rotationAngle = capped * 0.28;
        translationY = -capped * 0.006;
        translationZ = capped * 0.005;
        discOffsetZ = 0.008; // Disc stuck in front
      } else if (pathology === 'tmd_dislocation') {
        // Dislocation: condyle translates past articular crest and stays stuck
        const val = Math.max(progress, 0.95);
        rotationAngle = 0.45;
        translationY = -0.015;
        translationZ = 0.024; // Over-translated past eminence
        discOffsetZ = -0.004;
      } else if (pathology === 'tmd_reduction') {
        // With reduction: Disc starts anterior, snaps back at progress ~ 0.35
        if (progress < 0.35) {
          rotationAngle = progress * 0.35;
          translationY = -progress * 0.010;
          translationZ = progress * 0.012;
          discOffsetZ = 0.009; // Displaced forward
        } else {
          // Snapped onto condyle
          rotationAngle = progress * 0.42;
          translationY = -progress * 0.016;
          translationZ = progress * 0.020;
          discOffsetZ = 0.001; // Recaptured
        }
      } else {
        // Normal Opening
        // Phase 1 (0 to 0.4): Pure rotation (0-20mm) in lower compartment
        // Phase 2 (0.4 to 1.0): Translation along articular eminence (20-50mm) in upper compartment
        if (progress <= 0.4) {
          const p1 = progress / 0.4;
          rotationAngle = p1 * 0.22;
          translationY = -p1 * 0.003;
          translationZ = p1 * 0.002;
          discOffsetZ = 0;
        } else {
          const p2 = (progress - 0.4) / 0.6;
          rotationAngle = 0.22 + p2 * 0.24;
          translationY = -0.003 - p2 * 0.014;
          translationZ = 0.002 + p2 * 0.018;
          discOffsetZ = -p2 * 0.002;
        }
      }
    } else if (motionMode === 'protrusion') {
      translationZ = progress * 0.018;
      translationY = -progress * 0.004;
      rotationAngle = 0.05;
    } else if (motionMode === 'lateral') {
      translationX = -progress * 0.008;
      translationZ = progress * 0.008;
      rotationAngle = progress * 0.06;
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

  return (
    <group position={tmjBasePos}>
      {/* 1. MỐC GIẢI PHẪU NỀN SỌ (Articular Eminence & Glenoid Fossa Labels) */}
      <group position={[0, 0.006, 0]}>
        <Html position={[-0.012, 0.006, -0.010]} center>
          <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-white/20 text-slate-200 text-[8px] font-mono whitespace-nowrap pointer-events-none shadow-md">
            Hố hàm (Glenoid Fossa)
          </div>
        </Html>
        <Html position={[-0.012, 0.002, 0.016]} center>
          <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-white/20 text-slate-200 text-[8px] font-mono whitespace-nowrap pointer-events-none shadow-md">
            Lồi khớp (Articular Eminence)
          </div>
        </Html>
      </group>

      {/* 2. ĐĨA KHỚP LƯỠNG LÕM (Biconcave Articular Disc) */}
      <group
        ref={discRef}
        position={[
          kinematics.translationX * 0.9,
          0.002 + kinematics.translationY * 0.85,
          kinematics.translationZ * 0.85 + kinematics.discOffsetZ
        ]}
      >
        {/* Vùng trung gian mỏng (Intermediate Zone - 1mm) */}
        <mesh position={[0, 0, 0]} scale={[1.1, 1, 1]}>
          <cylinderGeometry args={[0.010, 0.011, 0.002, 24]} />
          <meshStandardMaterial
            color="#38bdf8"
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.88}
          />
        </mesh>
        {/* Băng trước dày (Anterior Band - 2mm) */}
        <mesh position={[0, 0.0005, 0.008]}>
          <cylinderGeometry args={[0.010, 0.010, 0.0035, 24, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#0284c7" roughness={0.35} />
        </mesh>
        {/* Băng sau dày nhất (Posterior Band - 3mm) */}
        <mesh position={[0, 0.001, -0.007]}>
          <cylinderGeometry args={[0.010, 0.010, 0.0048, 24, 1, false, Math.PI, Math.PI]} />
          <meshStandardMaterial color="#0369a1" roughness={0.35} />
        </mesh>
        {/* Mô sau đĩa 2 lá (Bilaminar retrodiscal tissue) */}
        <mesh position={[0, 0.0015, -0.014]}>
          <boxGeometry args={[0.018, 0.005, 0.010]} />
          <meshStandardMaterial
            color="#fb7185"
            roughness={0.5}
            transparent
            opacity={0.75}
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

      {/* 3. LỒI CẦU & ĐỘNG HỌC KHỚP (Articulating Condylar Dynamic Head) */}
      <group
        ref={condyleRef}
        position={[kinematics.translationX, -0.003 + kinematics.translationY, kinematics.translationZ]}
        rotation={[kinematics.rotationAngle, 0, 0]}
      >
        {/* Chỏm lồi cầu (Condylar Head) */}
        <mesh castShadow receiveShadow scale={[1.3, 0.65, 0.85]}>
          <sphereGeometry args={[0.0095, 24, 16]} />
          <meshStandardMaterial
            color="#f5ede2"
            emissive="#fbbf24"
            emissiveIntensity={0.15}
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* Cổ lồi cầu (Condylar Neck) */}
        <mesh position={[0, -0.014, 0]} castShadow>
          <cylinderGeometry args={[0.006, 0.008, 0.020, 16]} />
          <meshStandardMaterial color="#ebdcc8" roughness={0.5} />
        </mesh>
      </group>

      {/* 4. DÂY CHẰNG THÁI DƯƠNG HÀM (Temporomandibular Lateral Ligament) */}
      {showLigaments && (
        <group position={[-0.010, kinematics.translationY * 0.5, kinematics.translationZ * 0.5]}>
          <mesh position={[0, -0.008, 0]} rotation={[0.35, 0, 0]}>
            <cylinderGeometry args={[0.0018, 0.0022, 0.022, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              roughness={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
          <Html position={[-0.005, -0.008, 0]} center>
            <div className="px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-400/30 text-sky-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
              Dây chằng bên
            </div>
          </Html>
        </group>
      )}

      {/* 5. HỆ THỐNG 4 CƠ NHAI (Masticatory Muscles) Mapped onto Right Skull Landmarks */}
      {showMuscles && (
        <group>
          {/* CƠ CẮN (Masseter) - Bó Nông: Cung gò má -> Góc hàm */}
          {(!activeMuscleId || activeMuscleId === 'muscle_masseter') && (
            <group position={[-0.003, -0.028, 0.018]}>
              <mesh rotation={[0.45, -0.1, 0.1]}>
                <boxGeometry args={[0.006, 0.038, 0.014]} />
                <meshStandardMaterial
                  color="#e11d48"
                  roughness={0.4}
                  transparent
                  opacity={activeMuscleId === 'muscle_masseter' ? 0.92 : 0.65}
                />
              </mesh>
              <Html position={[-0.006, 0, 0]} center>
                <div className="px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
                  Cơ Cắn (Masseter)
                </div>
              </Html>
            </group>
          )}

          {/* CƠ THÁI DƯƠNG (Temporalis): Hố thái dương -> Mỏm vẹt */}
          {(!activeMuscleId || activeMuscleId === 'muscle_temporalis') && (
            <group position={[-0.004, 0.024, 0.012]}>
              <mesh rotation={[-0.3, -0.15, 0.15]}>
                <cylinderGeometry args={[0.016, 0.005, 0.042, 16, 1, false, 0, Math.PI]} />
                <meshStandardMaterial
                  color="#be123c"
                  roughness={0.4}
                  transparent
                  opacity={activeMuscleId === 'muscle_temporalis' ? 0.92 : 0.60}
                />
              </mesh>
              <Html position={[-0.008, 0.015, 0]} center>
                <div className="px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
                  Cơ Thái Dương (Temporalis)
                </div>
              </Html>
            </group>
          )}

          {/* CƠ CHÂN BƯỚM NGOÀI (Lateral Pterygoid) - Đi vào trong (medial = +X relative to Right TMJ) */}
          {(!activeMuscleId || activeMuscleId === 'muscle_lateral_pterygoid') && (
            <group position={[0.015, -0.002, 0.014]}>
              {/* Bó trên bám Đĩa khớp */}
              <mesh position={[0, 0.003, 0]} rotation={[0, -0.7, 0.15]}>
                <cylinderGeometry args={[0.0025, 0.003, 0.022, 10]} />
                <meshStandardMaterial
                  color="#f97316"
                  roughness={0.35}
                  transparent
                  opacity={activeMuscleId === 'muscle_lateral_pterygoid' ? 0.95 : 0.75}
                />
              </mesh>
              {/* Bó dưới bám Cổ lồi cầu */}
              <mesh position={[0, -0.004, -0.002]} rotation={[0, -0.7, 0.3]}>
                <cylinderGeometry args={[0.003, 0.0035, 0.024, 10]} />
                <meshStandardMaterial
                  color="#ea580c"
                  roughness={0.35}
                  transparent
                  opacity={activeMuscleId === 'muscle_lateral_pterygoid' ? 0.95 : 0.75}
                />
              </mesh>
              <Html position={[0.005, 0, 0]} center>
                <div className="px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-500/40 text-orange-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
                  Cơ Chân Bướm Ngoài
                </div>
              </Html>
            </group>
          )}

          {/* CƠ CHÂN BƯỚM TRONG (Medial Pterygoid) - Đi vào trong */}
          {(!activeMuscleId || activeMuscleId === 'muscle_medial_pterygoid') && (
            <group position={[0.014, -0.026, 0.010]}>
              <mesh rotation={[0.4, 0.2, -0.15]}>
                <boxGeometry args={[0.006, 0.034, 0.010]} />
                <meshStandardMaterial
                  color="#c2410c"
                  roughness={0.4}
                  transparent
                  opacity={activeMuscleId === 'muscle_medial_pterygoid' ? 0.95 : 0.65}
                />
              </mesh>
              <Html position={[0.005, 0, 0]} center>
                <div className="px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-500/40 text-orange-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
                  Cơ Chân Bướm Trong
                </div>
              </Html>
            </group>
          )}
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
  const [skullOpacity, setSkullOpacity] = useState(0.85);

  const tmjJawState = useDentalNeuroStore((s) => s.tmjJawState);
  const setTmjJawState = useDentalNeuroStore((s) => s.setTmjJawState);

  const tmjMotionMode = useDentalNeuroStore((s) => s.tmjMotionMode);
  const setTmjMotionMode = useDentalNeuroStore((s) => s.setTmjMotionMode);

  const tmjPathology = useDentalNeuroStore((s) => s.tmjPathology);
  const setTmjPathology = useDentalNeuroStore((s) => s.setTmjPathology);

  const tmjShowMuscles = useDentalNeuroStore((s) => s.tmjShowMuscles);
  const setTmjShowMuscles = useDentalNeuroStore((s) => s.setTmjShowMuscles);

  const tmjShowLigaments = useDentalNeuroStore((s) => s.tmjShowLigaments);
  const setTmjShowLigaments = useDentalNeuroStore((s) => s.setTmjShowLigaments);

  const tmjActiveMuscleId = useDentalNeuroStore((s) => s.tmjActiveMuscleId);
  const setTmjActiveMuscleId = useDentalNeuroStore((s) => s.setTmjActiveMuscleId);

  // Auto-play jaw animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const jawStateRef = useRef(tmjJawState);
  jawStateRef.current = tmjJawState;

  useEffect(() => {
    let animId: number;
    let direction = 1;
    const speed = 0.008;

    const animateLoop = () => {
      if (isPlaying) {
        let next = jawStateRef.current + direction * speed;
        if (next >= 1.0) {
          next = 1.0;
          direction = -1;
        } else if (next <= 0.0) {
          next = 0.0;
          direction = 1;
        }
        setTmjJawState(next);
        animId = requestAnimationFrame(animateLoop);
      }
    };

    if (isPlaying) {
      animId = requestAnimationFrame(animateLoop);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, setTmjJawState]);

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
        camera={{ position: [-0.16, 1.38, 0.12], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[-0.4, 1.8, 0.5]} intensity={2.2} castShadow />
        <directionalLight position={[0.4, 0.5, -0.4]} intensity={0.9} />
        <pointLight position={[-0.046, 1.39, 0.10]} intensity={1.5} color="#fffef7" />

        {/* Realistic 3D Canonical Skull Context */}
        <CanonicalSkullTMJContext
          showSkull={showFullSkull}
          opacity={skullOpacity}
        />

        {/* Articulating TMJ Disc & Condyle & Muscles on Right TMJ */}
        <TMJComplexMesh
          progress={tmjJawState}
          motionMode={tmjMotionMode}
          pathology={tmjPathology}
          showMuscles={tmjShowMuscles}
          showLigaments={tmjShowLigaments}
          activeMuscleId={tmjActiveMuscleId}
        />

        {/* Orbit Controls centered on Right TMJ */}
        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          minDistance={0.05}
          maxDistance={0.5}
          target={[-0.046, 1.366, 0.068]}
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
