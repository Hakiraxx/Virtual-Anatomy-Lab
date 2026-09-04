import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import {
  Scissors,
  Layers,
  Sparkles,
  Eye,
  RotateCcw,
  Compass,
  Info,
  ChevronRight
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { DENTAL_SPECIMENS_DATABASE } from '../../../data/dentalSpecimensData';

// 3D Procedural Anatomical Tooth Mesh with Longitudinal Cut & Pulp System
const DetailedToothMesh: React.FC<{
  fdi: number;
  sectionMode: 'solid' | 'longitudinal' | 'pulp_isolated';
  enamelOpacity: number;
  showPdl: boolean;
}> = ({ fdi, sectionMode, enamelOpacity, showPdl }) => {
  const toothData = DENTAL_SPECIMENS_DATABASE[fdi] || DENTAL_SPECIMENS_DATABASE[46];
  const isMolar = toothData.toothType === 'molar';
  const isUpper = toothData.quadrant === 1 || toothData.quadrant === 2;
  const rootCount = toothData.rootCount;

  // Pulse animation for pulp
  const pulpRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (pulpRef.current) {
      const scale = 1.0 + Math.sin(clock.getElapsedTime() * 3.0) * 0.02;
      pulpRef.current.scale.set(scale, scale, scale);
    }
  });

  // Longitudinal cut clips the front half (+X or +Z)
  const isCut = sectionMode === 'longitudinal';
  const isPulpOnly = sectionMode === 'pulp_isolated';

  return (
    <group position={[0, -0.02, 0]}>
      {/* 1. XƯƠNG Ổ RĂNG (Alveolar Bone Socket) */}
      {!isPulpOnly && (
        <group position={[0, -0.06, 0]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[0.045, 0.038, 0.07, 32, 1, true, 0, isCut ? Math.PI : Math.PI * 2]} />
            <meshStandardMaterial
              color="#d4c5a9"
              roughness={0.7}
              metalness={0.1}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {/* 2. DÂY CHẰNG NHA CHU (Periodontal Ligament - PDL) */}
      {showPdl && !isPulpOnly && (
        <group position={[0, -0.058, 0]}>
          <mesh>
            <cylinderGeometry args={[0.038, 0.028, 0.068, 32, 1, false, 0, isCut ? Math.PI : Math.PI * 2]} />
            <meshStandardMaterial
              color="#06b6d4"
              roughness={0.4}
              transparent
              opacity={0.35}
              wireframe={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}

      {/* 3. MEN RĂNG THÂN RĂNG (Enamel Crown) */}
      {!isPulpOnly && (
        <group position={[0, 0.025, 0]}>
          <mesh castShadow receiveShadow>
            {/* Crown Geometry: Rounded box-cylinder with occlusal cusp depressions */}
            <cylinderGeometry
              args={[
                isMolar ? 0.036 : 0.024,
                isMolar ? 0.032 : 0.020,
                0.045,
                32,
                16,
                false,
                0,
                isCut ? Math.PI : Math.PI * 2
              ]}
            />
            <meshPhysicalMaterial
              color="#fcfbfa"
              roughness={0.2}
              transmission={0.4}
              thickness={0.015}
              ior={1.62} // Real dental enamel IOR
              transparent
              opacity={enamelOpacity}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Occlusal Cusps (Múi nhai) */}
          {isMolar && (
            <group position={[0, 0.022, 0]}>
              {/* Múi Gần-Ngoài (MB) */}
              <mesh position={[-0.015, 0.003, 0.015]}>
                <sphereGeometry args={[0.011, 16, 16, 0, isCut ? Math.PI : Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#fffef7" roughness={0.25} />
              </mesh>
              {/* Múi Gần-Trong (ML) */}
              <mesh position={[0.015, 0.004, 0.015]}>
                <sphereGeometry args={[0.011, 16, 16, 0, isCut ? Math.PI : Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#fffef7" roughness={0.25} />
              </mesh>
              {/* Múi Xa-Ngoài (DB) */}
              <mesh position={[-0.015, 0.002, -0.015]}>
                <sphereGeometry args={[0.010, 16, 16, 0, isCut ? Math.PI : Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#fffef7" roughness={0.25} />
              </mesh>
              {/* Múi Xa-Trong (DL) */}
              <mesh position={[0.015, 0.002, -0.015]}>
                <sphereGeometry args={[0.010, 16, 16, 0, isCut ? Math.PI : Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#fffef7" roughness={0.25} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* 4. LỚP NGÀ RĂNG (Dentin Core) */}
      {!isPulpOnly && (
        <group position={[0, -0.015, 0]}>
          {/* Dentin in Crown */}
          <mesh position={[0, 0.035, 0]}>
            <cylinderGeometry
              args={[
                isMolar ? 0.029 : 0.018,
                isMolar ? 0.026 : 0.016,
                0.038,
                24,
                8,
                false,
                0,
                isCut ? Math.PI : Math.PI * 2
              ]}
            />
            <meshStandardMaterial
              color="#e8d5a7"
              roughness={0.5}
              metalness={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Dentin in Roots */}
          {rootCount === 1 ? (
            // 1 Chân răng (Răng trước / Răng nanh / Cối nhỏ 2)
            <mesh position={[0, -0.035, 0]}>
              <coneGeometry args={[0.024, 0.08, 24, 16, false, 0, isCut ? Math.PI : Math.PI * 2]} />
              <meshStandardMaterial color="#e0caa0" roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
          ) : rootCount === 2 ? (
            // 2 Chân răng (Răng cối lớn hàm dưới R46/36: Chân gần & Chân xa)
            <group position={[0, -0.035, 0]}>
              {/* Chân Gần (Mesial Root - Rộng dẹt) */}
              <mesh position={[0, 0, 0.015]} rotation={[0.05, 0, 0]}>
                <coneGeometry args={[0.018, 0.085, 20, 16, false, 0, isCut ? Math.PI : Math.PI * 2]} />
                <meshStandardMaterial color="#e0caa0" roughness={0.5} side={THREE.DoubleSide} />
              </mesh>
              {/* Chân Xa (Distal Root - Thuôn tròn hơn) */}
              <mesh position={[0, 0, -0.015]} rotation={[-0.05, 0, 0]}>
                <coneGeometry args={[0.017, 0.082, 20, 16, false, 0, isCut ? Math.PI : Math.PI * 2]} />
                <meshStandardMaterial color="#e0caa0" roughness={0.5} side={THREE.DoubleSide} />
              </mesh>
            </group>
          ) : (
            // 3 Chân răng (Răng cối lớn hàm trên R16/26: 2 chân ngoài MB/DB & 1 chân khẩu cái P to lớn)
            <group position={[0, -0.035, 0]}>
              {/* Chân Khẩu Cái (Palatal Root) */}
              <mesh position={[0.015, 0, 0]} rotation={[0, 0, -0.1]}>
                <coneGeometry args={[0.018, 0.09, 20, 16, false, 0, isCut ? Math.PI : Math.PI * 2]} />
                <meshStandardMaterial color="#e0caa0" roughness={0.5} side={THREE.DoubleSide} />
              </mesh>
              {/* Chân Gần Ngoài (MB Root) */}
              <mesh position={[-0.015, 0, 0.015]} rotation={[-0.05, 0, 0.08]}>
                <coneGeometry args={[0.014, 0.08, 16, 16, false, 0, isCut ? Math.PI : Math.PI * 2]} />
                <meshStandardMaterial color="#e0caa0" roughness={0.5} side={THREE.DoubleSide} />
              </mesh>
              {/* Chân Xa Ngoài (DB Root) */}
              <mesh position={[-0.015, 0, -0.015]} rotation={[0.05, 0, 0.08]}>
                <coneGeometry args={[0.013, 0.078, 16, 16, false, 0, isCut ? Math.PI : Math.PI * 2]} />
                <meshStandardMaterial color="#e0caa0" roughness={0.5} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* 5. BUỒNG TỦY & HỆ THỐNG ỐNG TỦY (Pulp Chamber & Root Canals) */}
      <group ref={pulpRef} position={[0, -0.015, 0]}>
        {/* Buồng tủy thân răng (Pulp Chamber) */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[isMolar ? 0.024 : 0.012, 0.020, isMolar ? 0.022 : 0.010]} />
          <meshStandardMaterial
            color="#e11d48"
            emissive="#e11d48"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Sừng tủy (Pulp Horns) nhô lên dưới các múi răng */}
        {isMolar ? (
          <>
            <mesh position={[-0.009, 0.043, 0.009]}>
              <coneGeometry args={[0.0035, 0.010, 12]} />
              <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.9} />
            </mesh>
            <mesh position={[0.009, 0.043, 0.009]}>
              <coneGeometry args={[0.0035, 0.010, 12]} />
              <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.9} />
            </mesh>
            <mesh position={[-0.009, 0.042, -0.009]}>
              <coneGeometry args={[0.003, 0.009, 12]} />
              <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.9} />
            </mesh>
            <mesh position={[0.009, 0.042, -0.009]}>
              <coneGeometry args={[0.003, 0.009, 12]} />
              <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.9} />
            </mesh>
          </>
        ) : (
          <mesh position={[0, 0.042, 0]}>
            <coneGeometry args={[0.004, 0.012, 12]} />
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.9} />
          </mesh>
        )}

        {/* Các ống tủy chân răng (Root Canals) */}
        {rootCount === 1 ? (
          // Ống tủy trung tâm
          <mesh position={[0, -0.025, 0]}>
            <cylinderGeometry args={[0.004, 0.0015, 0.075, 16]} />
            <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.85} />
          </mesh>
        ) : rootCount === 2 ? (
          // Răng cối lớn dưới: Chân gần có 2 ống (MB & ML) nối eo tủy; Chân xa có 1 ống D lớn
          <group>
            {/* Ống Gần-Ngoài (MB Canal) */}
            <mesh position={[-0.005, -0.026, 0.015]} rotation={[0.04, 0, 0.02]}>
              <cylinderGeometry args={[0.003, 0.0012, 0.078, 16]} />
              <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.9} />
            </mesh>
            {/* Ống Gần-Trong (ML Canal) */}
            <mesh position={[0.005, -0.026, 0.015]} rotation={[0.04, 0, -0.02]}>
              <cylinderGeometry args={[0.003, 0.0012, 0.078, 16]} />
              <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.9} />
            </mesh>
            {/* Eo tủy chân gần (Isthmus) */}
            <mesh position={[0, -0.022, 0.015]}>
              <boxGeometry args={[0.008, 0.045, 0.0015]} />
              <meshStandardMaterial
                color="#f43f5e"
                emissive="#f43f5e"
                emissiveIntensity={0.6}
                transparent
                opacity={0.8}
              />
            </mesh>
            {/* Ống Xa (Distal Canal - Thường to hơn) */}
            <mesh position={[0, -0.026, -0.015]} rotation={[-0.04, 0, 0]}>
              <cylinderGeometry args={[0.0045, 0.0018, 0.076, 16]} />
              <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.9} />
            </mesh>
          </group>
        ) : (
          // Răng cối lớn trên: Ống MB1, MB2, DB, Palatal
          <group>
            {/* Ống Khẩu cái (Palatal Canal - Lớn nhất) */}
            <mesh position={[0.012, -0.028, 0]} rotation={[0, 0, -0.08]}>
              <cylinderGeometry args={[0.005, 0.002, 0.082, 16]} />
              <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.95} />
            </mesh>
            {/* Ống Gần Ngoài 1 (MB1) */}
            <mesh position={[-0.010, -0.025, 0.012]} rotation={[-0.04, 0, 0.06]}>
              <cylinderGeometry args={[0.0028, 0.0012, 0.075, 14]} />
              <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.9} />
            </mesh>
            {/* Ống Gần Ngoài 2 (MB2 - Ống phụ lâm sàng) */}
            <mesh position={[-0.004, -0.024, 0.008]} rotation={[-0.03, 0, 0.04]}>
              <cylinderGeometry args={[0.0020, 0.0009, 0.072, 14]} />
              <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.9} />
            </mesh>
            {/* Ống Xa Ngoài (DB) */}
            <mesh position={[-0.010, -0.025, -0.012]} rotation={[0.04, 0, 0.06]}>
              <cylinderGeometry args={[0.0028, 0.0012, 0.073, 14]} />
              <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.9} />
            </mesh>
          </group>
        )}

        {/* Lỗ chóp chân răng (Apical Foramina) - Đèn điểm phát sáng ở chóp */}
        <pointLight position={[0, -0.065, 0]} color="#fb7185" intensity={1.5} distance={0.05} />
      </group>

      {/* 6. THẺ MỐC GIẢI PHẪU 3D (3D Anatomical Labels) */}
      {isCut && (
        <group>
          {/* Label Men răng */}
          <Html position={[0.038, 0.035, 0]} center>
            <div className="px-2 py-0.5 rounded-full bg-slate-900/85 border border-white/20 text-white text-[9px] font-mono whitespace-nowrap shadow-xl pointer-events-none">
              Men răng (Enamel)
            </div>
          </Html>
          {/* Label Ngà răng */}
          <Html position={[0.030, 0.010, 0]} center>
            <div className="px-2 py-0.5 rounded-full bg-amber-900/85 border border-amber-500/30 text-amber-200 text-[9px] font-mono whitespace-nowrap shadow-xl pointer-events-none">
              Ngà răng (Dentin)
            </div>
          </Html>
          {/* Label Buồng tủy */}
          <Html position={[0, 0.018, 0]} center>
            <div className="px-2 py-0.5 rounded-full bg-rose-900/85 border border-rose-500/40 text-rose-200 text-[9px] font-mono font-bold whitespace-nowrap shadow-xl pointer-events-none animate-pulse">
              Buồng tủy (Pulp Chamber)
            </div>
          </Html>
          {/* Label Chóp răng */}
          <Html position={[0, -0.075, 0]} center>
            <div className="px-2 py-0.5 rounded-full bg-emerald-900/85 border border-emerald-500/40 text-emerald-200 text-[9px] font-mono whitespace-nowrap shadow-xl pointer-events-none">
              Lỗ chóp (Apical Foramen)
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};

export const ToothSpecimenStage: React.FC = () => {
  const selectedToothFdi = useDentalNeuroStore((s) => s.selectedToothFdi);
  const setSelectedToothFdi = useDentalNeuroStore((s) => s.setSelectedToothFdi);
  const toothCrossSection = useDentalNeuroStore((s) => s.toothCrossSection);
  const setToothCrossSection = useDentalNeuroStore((s) => s.setToothCrossSection);
  const toothEnamelOpacity = useDentalNeuroStore((s) => s.toothEnamelOpacity);
  const setToothEnamelOpacity = useDentalNeuroStore((s) => s.setToothEnamelOpacity);
  const toothShowPdl = useDentalNeuroStore((s) => s.toothShowPdl);
  const setToothShowPdl = useDentalNeuroStore((s) => s.setToothShowPdl);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const toothData = DENTAL_SPECIMENS_DATABASE[selectedToothFdi] || DENTAL_SPECIMENS_DATABASE[46];

  // Key educational teeth presets
  const keyTeeth = [
    { fdi: 46, label: 'R.46 Cối lớn 1 dưới' },
    { fdi: 16, label: 'R.16 Cối lớn 1 trên' },
    { fdi: 14, label: 'R.14 Cối nhỏ 1 trên' },
    { fdi: 11, label: 'R.11 Cửa giữa trên' },
    { fdi: 48, label: 'R.48 Khôn hàm dưới' }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 1. TOP-LEFT OVERLAY: TOOTH SPECIMEN BADGE & SELECTOR */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 max-w-sm pointer-events-auto">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-2xl transition ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-slate-100' : 'bg-white/95 border-[#e7ded3] text-[#28231d]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              FDI {toothData.fdi} | {toothData.universal} | {toothData.palmer}
            </span>
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-rose-500">
              TIÊU BẢN CẮT LỚP 3D
            </span>
          </div>
          <h2 className="text-sm font-serif font-bold text-current">{toothData.nameVi}</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mb-2">{toothData.nameEn}</p>

          {/* Quick Teeth Switcher Chips */}
          <div className="flex items-center gap-1 flex-wrap">
            {keyTeeth.map((t) => (
              <button
                key={t.fdi}
                onClick={() => setSelectedToothFdi(t.fdi)}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium transition cursor-pointer ${
                  selectedToothFdi === t.fdi
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-[#ede3d5] text-slate-700 hover:bg-[#dfd4c4]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT OVERLAY: CROSS-SECTION & ENAMEL CONTROLS */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 max-w-xs pointer-events-auto">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-2xl transition ${
            isDark ? 'bg-slate-900/90 border-slate-700/80 text-slate-100' : 'bg-white/95 border-[#e7ded3] text-[#28231d]'
          }`}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Mặt Cắt & Độ Trong Suốt
          </div>

          {/* Section Mode Toggle */}
          <div className="grid grid-cols-3 gap-1 p-0.5 rounded-xl bg-black/5 dark:bg-white/5 border border-inherit mb-3">
            <button
              onClick={() => setToothCrossSection('longitudinal')}
              className={`py-1 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                toothCrossSection === 'longitudinal'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-current'
              }`}
            >
              Cắt Dọc
            </button>
            <button
              onClick={() => setToothCrossSection('solid')}
              className={`py-1 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                toothCrossSection === 'solid'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-current'
              }`}
            >
              Nguyên Khối
            </button>
            <button
              onClick={() => setToothCrossSection('pulp_isolated')}
              className={`py-1 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                toothCrossSection === 'pulp_isolated'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-current'
              }`}
            >
              Ống Tủy
            </button>
          </div>

          {/* Enamel Transparency Slider */}
          <div className="space-y-1 mb-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Độ Mờ Men Răng:</span>
              <span className="font-mono font-bold text-amber-500">
                {Math.round(toothEnamelOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={toothEnamelOpacity}
              onChange={(e) => setToothEnamelOpacity(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-slate-200 dark:bg-slate-700"
            />
          </div>

          {/* Toggle PDL / Bone */}
          <button
            onClick={() => setToothShowPdl(!toothShowPdl)}
            className={`w-full py-1.5 px-2.5 rounded-xl text-[10px] font-bold border transition cursor-pointer flex items-center justify-between ${
              toothShowPdl
                ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent bg-black/5 dark:bg-white/5 text-slate-500'
            }`}
          >
            <span>Dây chằng nha chu (PDL) & Xương</span>
            <span>{toothShowPdl ? 'ĐANG BẬT' : 'ĐANG TẮT'}</span>
          </button>
        </div>
      </div>

      {/* 3. 3D WEBGL CANVAS STAGE */}
      <Canvas
        shadows
        camera={{ position: [0.12, 0.05, 0.15], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[0.5, 1.0, 0.5]} intensity={2.0} castShadow />
        <directionalLight position={[-0.5, -0.2, -0.5]} intensity={0.8} />
        <pointLight position={[0, 0.1, 0.1]} intensity={1.5} color="#fffef5" />

        <DetailedToothMesh
          fdi={selectedToothFdi}
          sectionMode={toothCrossSection}
          enamelOpacity={toothEnamelOpacity}
          showPdl={toothShowPdl}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          minDistance={0.08}
          maxDistance={0.4}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* 4. BOTTOM LEGEND BAR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md shadow-2xl text-[11px] font-medium pointer-events-auto bg-slate-900/90 border-slate-800 text-slate-200">
        <span className="flex items-center gap-1.5 text-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fcfbfa] border border-white inline-block" />
          Men Răng (Enamel)
        </span>
        <span className="flex items-center gap-1.5 text-amber-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e8d5a7] inline-block" />
          Ngà Răng (Dentin)
        </span>
        <span className="flex items-center gap-1.5 text-rose-400">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48] animate-pulse inline-block" />
          Tủy & Ống Tủy (Pulp & Canals)
        </span>
        <span className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] inline-block" />
          Nha Chu (PDL)
        </span>
      </div>
    </div>
  );
};
