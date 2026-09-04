import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import {
  Play,
  Pause,
  RotateCcw,
  Activity,
  Layers,
  Volume2,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { TMJ_SPECIMEN_DATA, MASTICATORY_MUSCLES_DETAIL } from '../../../data/dentalSpecimensData';

// 3D Procedural TMJ Joint Complex & Biomechanics Mesh
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
        translationY = -capped * 0.008;
        translationZ = capped * 0.006;
        discOffsetZ = 0.012; // Disc stuck in front
      } else if (pathology === 'tmd_dislocation') {
        // Dislocation: condyle translates past articular crest and stays stuck
        const val = Math.max(progress, 0.95);
        rotationAngle = 0.45;
        translationY = -0.018;
        translationZ = 0.042; // Over-translated
        discOffsetZ = -0.005;
      } else if (pathology === 'tmd_reduction') {
        // With reduction: Disc starts anterior, snaps back at progress ~ 0.35
        if (progress < 0.35) {
          rotationAngle = progress * 0.35;
          translationY = -progress * 0.015;
          translationZ = progress * 0.018;
          discOffsetZ = 0.014; // Displaced forward
        } else {
          // Snapped onto condyle
          rotationAngle = progress * 0.42;
          translationY = -progress * 0.024;
          translationZ = progress * 0.032;
          discOffsetZ = 0.001; // Normal relation
        }
      } else {
        // Normal Opening
        // Phase 1 (0 to 0.4): Pure rotation (0-20mm)
        // Phase 2 (0.4 to 1.0): Translation along articular eminence (20-50mm)
        if (progress <= 0.4) {
          const p1 = progress / 0.4;
          rotationAngle = p1 * 0.22;
          translationY = -p1 * 0.004;
          translationZ = p1 * 0.003;
          discOffsetZ = 0;
        } else {
          const p2 = (progress - 0.4) / 0.6;
          rotationAngle = 0.22 + p2 * 0.24;
          translationY = -0.004 - p2 * 0.022;
          translationZ = 0.003 + p2 * 0.028;
          discOffsetZ = -p2 * 0.003;
        }
      }
    } else if (motionMode === 'protrusion') {
      // Direct forward translation
      translationZ = progress * 0.025;
      translationY = -progress * 0.006;
      rotationAngle = 0.05;
    } else if (motionMode === 'lateral') {
      // Lateral excursion
      translationX = progress * 0.015;
      translationZ = progress * 0.012;
      rotationAngle = progress * 0.08;
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
    <group position={[0, 0, 0]}>
      {/* 1. XƯƠNG THÁI DƯƠNG (Temporal Bone: Glenoid Fossa & Articular Eminence) */}
      <group position={[0, 0.045, 0]}>
        {/* Phần trai xương thái dương */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <boxGeometry args={[0.07, 0.025, 0.12]} />
          <meshStandardMaterial color="#dfd4c4" roughness={0.7} metalness={0.05} />
        </mesh>

        {/* Hố hàm (Glenoid Fossa - Lõm vào) */}
        <mesh position={[0, 0.005, -0.015]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.022, 0.025, 0.012, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#c5b69f" roughness={0.6} />
        </mesh>

        {/* Lồi khớp / Củ khớp (Articular Eminence - Gờ lồi phía trước sườn dốc 45 độ) */}
        <mesh position={[0, 0.002, 0.025]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.045, 0.014, 0.035]} />
          <meshStandardMaterial color="#d4c5a9" roughness={0.5} />
        </mesh>

        {/* Nhãn mốc giải phẫu */}
        <Html position={[0.035, 0.01, -0.015]} center>
          <div className="px-2 py-0.5 rounded bg-slate-900/80 border border-white/20 text-slate-200 text-[8px] font-mono whitespace-nowrap pointer-events-none">
            Hố hàm (Glenoid Fossa)
          </div>
        </Html>
        <Html position={[0.035, 0.005, 0.035]} center>
          <div className="px-2 py-0.5 rounded bg-slate-900/80 border border-white/20 text-slate-200 text-[8px] font-mono whitespace-nowrap pointer-events-none">
            Lồi khớp (Articular Eminence)
          </div>
        </Html>
      </group>

      {/* 2. ĐĨA KHỚP LƯỠNG LÕM (Biconcave Articular Disc) */}
      <group
        ref={discRef}
        position={[
          kinematics.translationX * 0.9,
          0.042 + kinematics.translationY * 0.85,
          kinematics.translationZ * 0.85 + kinematics.discOffsetZ
        ]}
      >
        {/* Vùng trung gian mỏng (Intermediate Zone - 1mm) */}
        <mesh position={[0, 0, 0]} scale={[1.2, 1, 1]}>
          <cylinderGeometry args={[0.018, 0.019, 0.003, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            roughness={0.35}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Băng trước dày (Anterior Band - 2mm) */}
        <mesh position={[0, 0.001, 0.014]}>
          <cylinderGeometry args={[0.018, 0.018, 0.005, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        {/* Băng sau dày nhất (Posterior Band - 3mm) */}
        <mesh position={[0, 0.002, -0.013]}>
          <cylinderGeometry args={[0.018, 0.018, 0.007, 32, 1, false, Math.PI, Math.PI]} />
          <meshStandardMaterial color="#0369a1" roughness={0.4} />
        </mesh>
        {/* Mô sau đĩa 2 lá giàu mạch máu thần kinh (Retrodiscal pad / Bilaminar zone) */}
        <mesh position={[0, 0.003, -0.024]}>
          <boxGeometry args={[0.034, 0.008, 0.018]} />
          <meshStandardMaterial
            color="#fb7185"
            roughness={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Dynamic Click Alert Visualizer for DDwR */}
        {clickSoundTriggered && (
          <Html position={[0, 0.02, 0]} center>
            <div className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-widest shadow-2xl animate-bounce flex items-center gap-1 border border-white">
              <Volume2 className="w-3.5 h-3.5" />
              <span>CLICK! (Tái Lập Đĩa)</span>
            </div>
          </Html>
        )}
      </group>

      {/* 3. LỒI CẦU & CÀNH LÊN XƯƠNG HÀM DƯỚI (Mandibular Condyle & Ramus) */}
      <group
        ref={condyleRef}
        position={[kinematics.translationX, 0.032 + kinematics.translationY, kinematics.translationZ]}
        rotation={[kinematics.rotationAngle, 0, 0]}
      >
        {/* Chỏm lồi cầu (Condylar Head - Dạng elip ngang) */}
        <mesh castShadow receiveShadow scale={[1.4, 0.65, 0.9]}>
          <sphereGeometry args={[0.018, 32, 16]} />
          <meshStandardMaterial
            color="#e2d8c3"
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* Cổ lồi cầu (Condylar Neck) */}
        <mesh position={[0, -0.022, 0]} castShadow>
          <cylinderGeometry args={[0.010, 0.014, 0.036, 24]} />
          <meshStandardMaterial color="#dfd2bc" roughness={0.5} />
        </mesh>

        {/* Cành lên xương hàm dưới (Ramus of Mandible) */}
        <mesh position={[0, -0.065, -0.005]} castShadow>
          <boxGeometry args={[0.016, 0.065, 0.042]} />
          <meshStandardMaterial color="#dac9af" roughness={0.6} />
        </mesh>

        {/* Mỏm vẹt (Coronoid Process) ở phía trước */}
        <mesh position={[0, -0.022, 0.035]} rotation={[-0.3, 0, 0]}>
          <coneGeometry args={[0.012, 0.045, 16]} />
          <meshStandardMaterial color="#dac9af" roughness={0.6} />
        </mesh>

        {/* Khuyết hàm dưới (Sigmoid Notch) giữa mỏm vẹt và lồi cầu */}
        {/* Gai Spix & Lỗ hàm dưới ở mặt trong */}
        <mesh position={[0.008, -0.052, 0.005]}>
          <cylinderGeometry args={[0.002, 0.003, 0.008, 12]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* 4. BAO KHỚP & DÂY CHẰNG THÁI DƯƠNG HÀM (Capsule & Lateral Ligament) */}
      {showLigaments && (
        <group position={[0, 0.038 + kinematics.translationY * 0.5, kinematics.translationZ * 0.5]}>
          {/* Dây chằng bên (Temporomandibular / Lateral Ligament) */}
          <mesh position={[-0.024, -0.012, 0]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.003, 0.004, 0.035, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              roughness={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
          <Html position={[-0.03, -0.012, 0]} center>
            <div className="px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-400/30 text-sky-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
              Dây chằng bên (Lateral Lig.)
            </div>
          </Html>
        </group>
      )}

      {/* 5. 4 CƠ NHAI 3D (4 Muscles of Mastication) */}
      {showMuscles && (
        <group>
          {/* A. Cơ Cắn (Masseter) */}
          {(!activeMuscleId || activeMuscleId === 'masseter') && (
            <group position={[-0.025, -0.02, 0.01]} rotation={[0.2, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.012, 0.08, 0.035]} />
                <meshStandardMaterial
                  color="#ef4444"
                  roughness={0.6}
                  transparent
                  opacity={activeMuscleId === 'masseter' ? 0.9 : 0.45}
                  emissive={activeMuscleId === 'masseter' ? '#ef4444' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          )}

          {/* B. Cơ Thái Dương (Temporalis) */}
          {(!activeMuscleId || activeMuscleId === 'temporalis') && (
            <group position={[-0.018, 0.07, 0.02]} rotation={[-0.1, 0, 0]}>
              <mesh rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.045, 0.09, 24, 1, false, 0, Math.PI]} />
                <meshStandardMaterial
                  color="#f97316"
                  roughness={0.6}
                  transparent
                  opacity={activeMuscleId === 'temporalis' ? 0.9 : 0.4}
                  emissive={activeMuscleId === 'temporalis' ? '#f97316' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          )}

          {/* C. Cơ Chân Bướm Trong (Medial Pterygoid) */}
          {(!activeMuscleId || activeMuscleId === 'medial_pterygoid') && (
            <group position={[0.024, -0.035, 0.005]} rotation={[0.25, 0, -0.1]}>
              <mesh>
                <boxGeometry args={[0.010, 0.065, 0.028]} />
                <meshStandardMaterial
                  color="#eab308"
                  roughness={0.6}
                  transparent
                  opacity={activeMuscleId === 'medial_pterygoid' ? 0.9 : 0.4}
                  emissive={activeMuscleId === 'medial_pterygoid' ? '#eab308' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          )}

          {/* D. Cơ Chân Bướm Ngoài (Lateral Pterygoid - 2 Bó) */}
          {(!activeMuscleId || activeMuscleId === 'lateral_pterygoid') && (
            <group position={[0.015, 0.035, 0.025]}>
              {/* Bó trên (Superior Head - Bám vào đĩa khớp) */}
              <group position={[0, 0.005, 0.018]} rotation={[-0.2, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.005, 0.006, 0.035, 16]} />
                  <meshStandardMaterial
                    color="#06b6d4"
                    roughness={0.5}
                    transparent
                    opacity={activeMuscleId === 'lateral_pterygoid' ? 0.95 : 0.55}
                    emissive={activeMuscleId === 'lateral_pterygoid' ? '#06b6d4' : '#000000'}
                    emissiveIntensity={0.4}
                  />
                </mesh>
              </group>
              {/* Bó dưới (Inferior Head - Bám vào cổ lồi cầu) */}
              <group position={[0, -0.012, 0.015]} rotation={[-0.4, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.007, 0.008, 0.042, 16]} />
                  <meshStandardMaterial
                    color="#06b6d4"
                    roughness={0.5}
                    transparent
                    opacity={activeMuscleId === 'lateral_pterygoid' ? 0.95 : 0.55}
                    emissive={activeMuscleId === 'lateral_pterygoid' ? '#06b6d4' : '#000000'}
                    emissiveIntensity={0.4}
                  />
                </mesh>
              </group>
            </group>
          )}
        </group>
      )}
    </group>
  );
};

export const TMJSpecimenStage: React.FC = () => {
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

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play jaw cycle animation
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    let direction = 1;

    const animate = () => {
      setTmjJawState(Math.max(0, Math.min(1, tmjJawState + direction * 0.015)));
      if (tmjJawState >= 1.0) direction = -1;
      else if (tmjJawState <= 0.0) direction = 1;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, tmjJawState, setTmjJawState]);

  // Current jaw opening distance in mm
  const mmOpening = Math.round(tmjJawState * 50);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1. TOP-LEFT OVERLAY: TMJ INFO & KINEMATICS PHASE */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 max-w-sm pointer-events-auto">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-2xl transition ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-slate-100' : 'bg-white/95 border-[#e7ded3] text-[#28231d]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
              TMJ BIOMECHANICS
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 font-bold">
              KHOẢNG HÁ: {mmOpening} mm
            </span>
          </div>
          <h2 className="text-sm font-serif font-bold text-current">{TMJ_SPECIMEN_DATA.nameVi}</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mb-2">
            {tmjJawState <= 0.4
              ? 'Thì 1: Xoay lồi cầu thuần túy quanh trục bản lề (Khoang khớp dưới)'
              : 'Thì 2: Trượt phức hợp lồi cầu - đĩa khớp ra trước xuống dưới (Khoang khớp trên)'}
          </p>

          {/* Jaw Motion Mode Switcher */}
          <div className="flex items-center gap-1">
            {(
              [
                { id: 'opening', label: 'Há Miệng 2 Thì' },
                { id: 'protrusion', label: 'Đưa Ra Trước' },
                { id: 'lateral', label: 'Sang Bên (Bennett)' }
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setTmjMotionMode(m.id)}
                className={`flex-1 py-1 px-1 text-center rounded-lg text-[10px] font-semibold transition cursor-pointer ${
                  tmjMotionMode === m.id
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-[#ede3d5] text-slate-700 hover:bg-[#dfd4c4]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT OVERLAY: TMD PATHOLOGY & MUSCLES CONTROLS */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 max-w-xs pointer-events-auto">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-2xl transition ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-slate-100' : 'bg-white/95 border-[#e7ded3] text-[#28231d]'
          }`}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Mô Phỏng Rối Loạn TMD</span>
          </div>

          {/* Pathology Mode Buttons */}
          <div className="flex flex-col gap-1 mb-2.5">
            {[
              { id: 'normal', label: 'Bình Thường (Khớp Khỏe Mạnh)' },
              { id: 'tmd_reduction', label: 'Trượt Đĩa CÓ Hồi Phục (Tiếng Click)' },
              { id: 'tmd_non_reduction', label: 'Trượt Đĩa KHÔNG Hồi Phục (Kẹt Hàm)' },
              { id: 'tmd_dislocation', label: 'Trật Khớp TDH Cấp (Hở Khớp Cắn)' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setTmjPathology(p.id as any)}
                className={`w-full text-left px-2 py-1 rounded-lg text-[10px] transition cursor-pointer flex items-center justify-between ${
                  tmjPathology === p.id
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-[#ede3d5] text-slate-700 hover:bg-[#dfd4c4]'
                }`}
              >
                <span className="truncate">{p.label}</span>
                {tmjPathology === p.id && <CheckCircle2 className="w-3 h-3 flex-shrink-0" />}
              </button>
            ))}
          </div>

          {/* 4 Muscles of Mastication Filter */}
          <div className="pt-2 border-t border-inherit">
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
        camera={{ position: [0.15, 0.05, 0.12], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[0.4, 0.8, 0.5]} intensity={2.0} castShadow />
        <directionalLight position={[-0.4, -0.2, -0.4]} intensity={0.7} />
        <pointLight position={[0, 0.08, 0.08]} intensity={1.2} />

        <TMJComplexMesh
          progress={tmjJawState}
          motionMode={tmjMotionMode}
          pathology={tmjPathology}
          showMuscles={tmjShowMuscles}
          showLigaments={tmjShowLigaments}
          activeMuscleId={tmjActiveMuscleId}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          minDistance={0.08}
          maxDistance={0.35}
          target={[0, 0.01, 0]}
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
