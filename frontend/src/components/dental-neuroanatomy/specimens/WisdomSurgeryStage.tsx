import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import {
  Scissors,
  AlertTriangle,
  Activity,
  Layers,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { WISDOM_SURGICAL_DATABASE } from '../../../data/dentalSpecimensData';

// 3D Procedural Mandibular Angle & Impacted 3rd Molar Mesh
const MandibularAngleSurgeryMesh: React.FC<{
  toothId: 'tooth_38' | 'tooth_48';
  winterType: 'mesioangular' | 'horizontal' | 'vertical' | 'distoangular';
  pellClass: 'I' | 'II' | 'III';
  pellPos: 'A' | 'B' | 'C';
  surgicalStep: number;
  showNerves: boolean;
  boneOpacity: number;
}> = ({ toothId, winterType, pellClass, pellPos, surgicalStep, showNerves, boneOpacity }) => {
  const isR48 = toothId === 'tooth_48'; // Right vs Left side

  // Calculate tooth tilt and depth according to Winter and Pell-Gregory
  const toothTransform = useMemo(() => {
    let angleRad = 0;
    if (winterType === 'mesioangular') angleRad = Math.PI * 0.25; // 45 deg
    else if (winterType === 'horizontal') angleRad = Math.PI * 0.50; // 90 deg
    else if (winterType === 'vertical') angleRad = 0;
    else if (winterType === 'distoangular') angleRad = -Math.PI * 0.20; // -35 deg

    // Depth: Pos A (0), Pos B (-0.005), Pos C (-0.012)
    let depthY = 0;
    if (pellPos === 'B') depthY = -0.006;
    else if (pellPos === 'C') depthY = -0.013;

    // Ramus overlap: Class I (0), Class II (-0.004), Class III (-0.009)
    let ramusOffsetZ = 0;
    if (pellClass === 'II') ramusOffsetZ = -0.005;
    else if (pellClass === 'III') ramusOffsetZ = -0.010;

    // Proximity to IAN calculation (simulated distance in mm)
    let distanceMm = 2.4;
    if (pellPos === 'B') distanceMm -= 1.0;
    if (pellPos === 'C') distanceMm -= 1.0;
    if (winterType === 'horizontal') distanceMm -= 0.6;
    if (winterType === 'mesioangular') distanceMm -= 0.3;
    const finalDistanceMm = Math.max(0.2, Math.round(distanceMm * 10) / 10);

    return { angleRad, depthY, ramusOffsetZ, finalDistanceMm };
  }, [winterType, pellClass, pellPos]);

  // Surgical step visual state
  const isFlapReflected = surgicalStep >= 2;
  const isBoneGuttered = surgicalStep >= 3;
  const isSectioned = surgicalStep >= 4;
  const isExtracted = surgicalStep >= 5;
  const isSutured = surgicalStep >= 6;

  // Pulse effect for IAN nerve
  const nervePulseRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (nervePulseRef.current) {
      const glow = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 4.0);
      (nervePulseRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    }
  });

  return (
    <group position={[0, -0.02, 0]}>
      {/* 1. KHỐI XƯƠNG HÀM DƯỚI (Mandibular Body & Ramus with Adjustable Opacity) */}
      <group position={[0, 0, 0]}>
        {/* Bản ngoài xương hàm dưới (Buccal Cortical Plate) */}
        <mesh position={[-0.016, -0.02, 0]} receiveShadow>
          <boxGeometry args={[0.006, 0.08, 0.12]} />
          <meshStandardMaterial
            color="#dfd4c4"
            roughness={0.6}
            transparent={boneOpacity < 1.0}
            opacity={boneOpacity}
          />
        </mesh>

        {/* Cành lên (Ramus) ở phía sau */}
        <mesh position={[0, 0.02, -0.045]}>
          <boxGeometry args={[0.028, 0.09, 0.035]} />
          <meshStandardMaterial
            color="#d5c7b3"
            roughness={0.65}
            transparent={boneOpacity < 1.0}
            opacity={boneOpacity}
          />
        </mesh>

        {/* Bản xương mặt trong (Lingual Cortical Plate - Mỏng manh, nơi TK Lưỡi chạy qua) */}
        <mesh position={[0.016, -0.02, 0]}>
          <boxGeometry args={[0.004, 0.08, 0.12]} />
          <meshStandardMaterial
            color="#dfd4c4"
            roughness={0.6}
            transparent={boneOpacity < 1.0}
            opacity={boneOpacity}
          />
        </mesh>

        {/* Máng xương phẫu thuật (Ostectomy Bone Gutter Window - Bộc lộ ở bước 3) */}
        {isBoneGuttered && (
          <group position={[-0.018, 0.002, -0.005]}>
            <mesh>
              <boxGeometry args={[0.004, 0.022, 0.028]} />
              <meshBasicMaterial color="#1e293b" wireframe />
            </mesh>
            <Html position={[0, 0, 0]} center>
              <div className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[8px] font-bold whitespace-nowrap pointer-events-none">
                Máng xương mở (Guttering)
              </div>
            </Html>
          </group>
        )}
      </group>

      {/* 2. RĂNG KẾ CẬN (Răng cối lớn thứ hai R.47/37) */}
      <group position={[0, 0.015, 0.028]}>
        {/* Thân răng 7 */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.022, 0.022, 0.024]} />
          <meshStandardMaterial color="#f8f7f5" roughness={0.2} />
        </mesh>
        {/* Chân răng 7 */}
        <mesh position={[0, -0.025, 0]}>
          <cylinderGeometry args={[0.009, 0.004, 0.05, 16]} />
          <meshStandardMaterial color="#e8d5a7" roughness={0.4} />
        </mesh>
        <Html position={[0, 0.03, 0]} center>
          <div className="px-1.5 py-0.5 rounded bg-slate-900/80 border border-white/20 text-slate-200 text-[8px] font-mono whitespace-nowrap pointer-events-none">
            R.{isR48 ? '47' : '37'} (Răng 7)
          </div>
        </Html>
      </group>

      {/* 3. RĂNG KHÔN NGẦM (Impacted 3rd Molar R.48/38) - Morphed by Winter & Pell-Gregory */}
      {!isExtracted && (
        <group
          position={[0, 0.01 + toothTransform.depthY, -0.005 + toothTransform.ramusOffsetZ]}
          rotation={[toothTransform.angleRad, 0, 0]}
        >
          {/* Thân răng 8 */}
          <group position={[0, 0.01, 0]}>
            <mesh>
              <boxGeometry args={[0.022, 0.022, 0.024]} />
              <meshStandardMaterial
                color="#fde047"
                emissive="#fde047"
                emissiveIntensity={0.3}
                roughness={0.25}
              />
            </mesh>

            {/* Vết cắt chia thân răng (Odontotomy Sectioning Line - Bước 4) */}
            {isSectioned && (
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.024, 0.024, 0.003]} />
                <meshBasicMaterial color="#ef4444" wireframe />
              </mesh>
            )}
          </group>

          {/* Chân răng 8 (Uốn cong hướng về phía sau/dưới) */}
          <mesh position={[0, -0.024, -0.003]} rotation={[-0.1, 0, 0]}>
            <cylinderGeometry args={[0.009, 0.0035, 0.048, 16]} />
            <meshStandardMaterial color="#e5d2a0" roughness={0.4} />
          </mesh>

          {/* Nhãn 3D Răng khôn */}
          <Html position={[0, 0.025, 0]} center>
            <div className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-mono font-black whitespace-nowrap shadow-xl pointer-events-none animate-pulse">
              R.{isR48 ? '48' : '38'} (Răng Khôn)
            </div>
          </Html>
        </group>
      )}

      {/* 4. ỐNG HÀM DƯỚI & THẦN KINH HUYỆT RĂNG DƯỚI (IAN Canal & Nerve) */}
      {showNerves && (
        <group position={[0, -0.052, 0]}>
          {/* Ống xương hàm dưới (Bony Canal) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.0055, 0.0055, 0.12, 24, 1, true]} />
            <meshStandardMaterial
              color="#0f172a"
              wireframe={false}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Bó sợi Thần kinh IAN (Màu vàng rực phát quang) */}
          <mesh ref={nervePulseRef} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.0028, 0.0028, 0.12, 16]} />
            <meshStandardMaterial
              color="#eab308"
              emissive="#f59e0b"
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Đường đo khoảng cách an toàn 3D (Distance line between Root & IAN) */}
          {!isExtracted && (
            <group position={[0, 0.015, 0]}>
              <mesh>
                <cylinderGeometry args={[0.0008, 0.0008, 0.024, 8]} />
                <meshBasicMaterial
                  color={
                    toothTransform.finalDistanceMm <= 1.0
                      ? '#ef4444'
                      : toothTransform.finalDistanceMm <= 2.0
                      ? '#f59e0b'
                      : '#10b981'
                  }
                />
              </mesh>
              <Html position={[0.02, 0.005, 0]} center>
                <div
                  className={`px-2 py-0.5 rounded text-[8px] font-mono font-black whitespace-nowrap shadow-lg ${
                    toothTransform.finalDistanceMm <= 1.0
                      ? 'bg-rose-600 text-white animate-bounce'
                      : toothTransform.finalDistanceMm <= 2.0
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  Khoảng cách IAN: {toothTransform.finalDistanceMm} mm
                </div>
              </Html>
            </group>
          )}

          <Html position={[0, -0.01, 0.03]} center>
            <div className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-400/40 text-amber-300 text-[8px] font-mono font-bold whitespace-nowrap pointer-events-none">
              Thần kinh IAN (Ống răng dưới)
            </div>
          </Html>
        </group>
      )}

      {/* 5. THẦN KINH LƯỠI (Lingual Nerve) CHẠY SÁT BẢN XƯƠNG TRONG */}
      {showNerves && (
        <group position={[0.019, -0.015, 0.01]}>
          <mesh rotation={[0.2, 0, 0.15]}>
            <cylinderGeometry args={[0.0022, 0.0022, 0.09, 16]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#ea580c"
              emissiveIntensity={0.6}
            />
          </mesh>
          <Html position={[0.01, 0, 0]} center>
            <div className="px-1.5 py-0.5 rounded bg-rose-950/85 border border-rose-400/40 text-rose-300 text-[8px] font-mono font-bold whitespace-nowrap pointer-events-none">
              TK Lưỡi (Lingual N. &lt; 1.5mm)
            </div>
          </Html>
        </group>
      )}

      {/* 6. VẠT PHẪU THUẬT & ĐƯỜNG KHÂU (Suture lines at Step 6) */}
      {isSutured && (
        <group position={[0, 0.026, -0.005]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.001, 0.001, 0.035, 8]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <Html position={[0, 0.01, 0]} center>
            <div className="px-2 py-0.5 rounded bg-sky-900 border border-sky-400 text-sky-200 text-[8px] font-mono whitespace-nowrap pointer-events-none">
              Đường khâu vạt kín (Vicryl 4-0)
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};

export const WisdomSurgeryStage: React.FC = () => {
  const wisdomToothId = useDentalNeuroStore((s) => s.wisdomToothId);
  const setWisdomToothId = useDentalNeuroStore((s) => s.setWisdomToothId);
  const wisdomWinterType = useDentalNeuroStore((s) => s.wisdomWinterType);
  const setWisdomWinterType = useDentalNeuroStore((s) => s.setWisdomWinterType);
  const wisdomPellGregoryClass = useDentalNeuroStore((s) => s.wisdomPellGregoryClass);
  const setWisdomPellGregoryClass = useDentalNeuroStore((s) => s.setWisdomPellGregoryClass);
  const wisdomPellGregoryPos = useDentalNeuroStore((s) => s.wisdomPellGregoryPos);
  const setWisdomPellGregoryPos = useDentalNeuroStore((s) => s.setWisdomPellGregoryPos);
  const wisdomSurgicalStep = useDentalNeuroStore((s) => s.wisdomSurgicalStep);
  const setWisdomSurgicalStep = useDentalNeuroStore((s) => s.setWisdomSurgicalStep);
  const wisdomShowNerves = useDentalNeuroStore((s) => s.wisdomShowNerves);
  const setWisdomShowNerves = useDentalNeuroStore((s) => s.setWisdomShowNerves);
  const wisdomBoneOpacity = useDentalNeuroStore((s) => s.wisdomBoneOpacity);
  const setWisdomBoneOpacity = useDentalNeuroStore((s) => s.setWisdomBoneOpacity);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const currentStep =
    WISDOM_SURGICAL_DATABASE.surgicalSteps.find((s) => s.stepNumber === wisdomSurgicalStep) ||
    WISDOM_SURGICAL_DATABASE.surgicalSteps[0];

  const currentWinter =
    WISDOM_SURGICAL_DATABASE.winterTypes.find((w) => w.id === wisdomWinterType) ||
    WISDOM_SURGICAL_DATABASE.winterTypes[0];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1. TOP-LEFT OVERLAY: WINTER & PELL-GREGORY CLASSIFIER */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 max-w-sm pointer-events-auto">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-2xl transition ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-slate-100' : 'bg-white/95 border-[#e7ded3] text-[#28231d]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              PHẪU THUẬT RĂNG KHÔN
            </span>
            {/* Tooth Switcher (R48 vs R38) */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-inherit">
              <button
                onClick={() => setWisdomToothId('tooth_48')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  wisdomToothId === 'tooth_48' ? 'bg-amber-600 text-white' : 'text-slate-500'
                }`}
              >
                R.48 (Phải)
              </button>
              <button
                onClick={() => setWisdomToothId('tooth_38')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  wisdomToothId === 'tooth_38' ? 'bg-amber-600 text-white' : 'text-slate-500'
                }`}
              >
                R.38 (Trái)
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center justify-between">
            <span>Phân loại Winter:</span>
            <span className="font-bold text-amber-500">Độ khó: {currentWinter.surgicalDifficulty}</span>
          </div>

          {/* Winter Angulation Buttons */}
          <div className="grid grid-cols-2 gap-1 mb-2.5">
            {WISDOM_SURGICAL_DATABASE.winterTypes.map((w) => (
              <button
                key={w.id}
                onClick={() => setWisdomWinterType(w.id)}
                className={`px-2 py-1 rounded-lg text-[10px] transition cursor-pointer text-left truncate ${
                  wisdomWinterType === w.id
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-[#ede3d5] text-slate-700 hover:bg-[#dfd4c4]'
                }`}
                title={w.notesVi}
              >
                {w.labelVi}
              </button>
            ))}
          </div>

          {/* Pell & Gregory: Class & Position Selectors */}
          <div className="flex items-center gap-2 pt-2 border-t border-inherit">
            <div className="flex-1">
              <div className="text-[9px] font-mono text-slate-400 mb-0.5">Cành lên:</div>
              <div className="flex items-center gap-1">
                {(['I', 'II', 'III'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setWisdomPellGregoryClass(c)}
                    className={`flex-1 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                      wisdomPellGregoryClass === c
                        ? 'bg-amber-600 text-white shadow-sm'
                        : isDark
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-[#ede3d5] text-slate-600'
                    }`}
                  >
                    Class {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[9px] font-mono text-slate-400 mb-0.5">Độ sâu:</div>
              <div className="flex items-center gap-1">
                {(['A', 'B', 'C'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setWisdomPellGregoryPos(p)}
                    className={`flex-1 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                      wisdomPellGregoryPos === p
                        ? 'bg-amber-600 text-white shadow-sm'
                        : isDark
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-[#ede3d5] text-slate-600'
                    }`}
                  >
                    Vị trí {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT OVERLAY: NERVE SAFETY METER & X-RAY RISKS */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 max-w-xs pointer-events-auto">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-2xl transition ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-slate-100' : 'bg-white/95 border-[#e7ded3] text-[#28231d]'
          }`}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500 mb-1 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Thước Đo Rủi Ro Thần Kinh (IAN)</span>
          </div>

          <div className="space-y-1 mb-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Độ Trong Suốt Xương:</span>
              <span className="font-mono font-bold text-amber-500">
                {Math.round(wisdomBoneOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={wisdomBoneOpacity}
              onChange={(e) => setWisdomBoneOpacity(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
            />
          </div>

          {/* Dấu hiệu cảnh báo X-quang nguy cơ IAN */}
          <div className="pt-2 border-t border-inherit">
            <div className="text-[10px] font-mono text-slate-400 mb-1">
              7 Dấu Hiệu X-Quang Toàn Cảnh (Panorama):
            </div>
            <div className="text-[10px] text-slate-300 dark:text-slate-300 space-y-1">
              <div className="flex items-start gap-1 text-rose-400">
                <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>Thấu quang chóp răng (OR = 15.2)</span>
              </div>
              <div className="flex items-start gap-1 text-amber-400">
                <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>Lệch hướng / cong ống răng dưới (OR = 7.8)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 3D WEBGL CANVAS STAGE */}
      <Canvas
        shadows
        camera={{ position: [0.14, 0.06, 0.12], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[0.5, 0.8, 0.5]} intensity={2.0} castShadow />
        <directionalLight position={[-0.5, -0.2, -0.4]} intensity={0.8} />
        <pointLight position={[0, 0.08, 0.08]} intensity={1.2} />

        <MandibularAngleSurgeryMesh
          toothId={wisdomToothId}
          winterType={wisdomWinterType}
          pellClass={wisdomPellGregoryClass}
          pellPos={wisdomPellGregoryPos}
          surgicalStep={wisdomSurgicalStep}
          showNerves={wisdomShowNerves}
          boneOpacity={wisdomBoneOpacity}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          minDistance={0.08}
          maxDistance={0.35}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* 4. BOTTOM SURGICAL STEP SIMULATION BAR (6 STEPS) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl flex flex-col gap-2 p-3 rounded-2xl border backdrop-blur-md shadow-2xl pointer-events-auto bg-slate-900/95 border-slate-800 text-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center">
              {currentStep.stepNumber}
            </span>
            <span className="font-serif font-bold text-xs sm:text-sm text-current">
              {currentStep.titleVi}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setWisdomSurgicalStep(Math.max(1, wisdomSurgicalStep - 1))}
              disabled={wisdomSurgicalStep <= 1}
              className="p-1 rounded-lg border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-400 px-1">
              Bước {wisdomSurgicalStep}/6
            </span>
            <button
              onClick={() => setWisdomSurgicalStep(Math.min(6, wisdomSurgicalStep + 1))}
              disabled={wisdomSurgicalStep >= 6}
              className="p-1 rounded-lg border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-300 font-sans flex items-center gap-2">
          <span className="font-bold text-amber-400">Dụng cụ:</span>
          <span>{currentStep.instrumentVi}</span>
        </div>

        <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{currentStep.keySafetyActionVi}</span>
        </div>
      </div>
    </div>
  );
};
