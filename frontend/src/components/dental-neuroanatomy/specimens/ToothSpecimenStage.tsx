import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import {
  Layers,
  Sparkles,
  Search,
  Eye,
  Activity,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { DENTAL_SPECIMENS_DATABASE } from '../../../data/dentalSpecimensData';
import { DENTAL_INNERVATION_DATABASE } from '../../../data/dentalNeuroData';
import { createCraniofacialOrganGroup } from '../DentalNeuro3DStage';

// ============================================================================
// 1. CANONICAL 3D SKULL & DENTAL ARCH CONTEXT (REAL 3D JAW & TEETH)
// ============================================================================
const CanonicalDentalArchView: React.FC<{
  selectedFdi: number;
  onSelectTooth: (fdi: number) => void;
  boneOpacity?: number;
  isContextOnly?: boolean;
}> = ({ selectedFdi, onSelectTooth, boneOpacity = 1.0, isContextOnly = false }) => {
  const skullGltf = useGLTF('/models/skull.glb');

  const normalizedSkull = useMemo(() => {
    const group = createCraniofacialOrganGroup(
      skullGltf.scene,
      0.205,
      [0, -Math.PI / 2, 0],
      [0.0, 1.41, 0.09]
    );

    group.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.roughness = 0.55;
        child.material.metalness = 0.04;
        child.material.color = new THREE.Color('#f4ede2');
        if (boneOpacity < 0.98) {
          child.material.transparent = true;
          child.material.opacity = boneOpacity;
          child.material.depthWrite = boneOpacity > 0.5;
        }
      }
    });

    return group;
  }, [skullGltf, boneOpacity]);

  return (
    <group>
      {/* Real 3D Skull & Dental Arch */}
      <primitive object={normalizedSkull} />

      {/* 32 FDI Teeth Hotspot Markers positioned on the Real Dental Arch */}
      {!isContextOnly &&
        DENTAL_INNERVATION_DATABASE.map((t) => {
          const isSelected = t.fdi === selectedFdi;
          const isMandibular = t.arch === 'mandibular';

          return (
            <group key={t.fdi} position={t.position3D}>
              {/* Clickable Tooth Beacon Mesh */}
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTooth(t.fdi);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'auto';
                }}
              >
                <sphereGeometry args={[0.0032, 12, 12]} />
                <meshStandardMaterial
                  color={isSelected ? '#f59e0b' : '#38bdf8'}
                  emissive={isSelected ? '#f59e0b' : '#0284c7'}
                  emissiveIntensity={isSelected ? 0.95 : 0.25}
                  transparent
                  opacity={isSelected ? 0.95 : 0.45}
                />
              </mesh>

              {/* Selected Tooth Radiant Halo & Pointer */}
              {isSelected && (
                <>
                  <pointLight color="#fde047" intensity={2.5} distance={0.06} />
                  <mesh
                    position={[0, isMandibular ? -0.008 : 0.008, 0]}
                    rotation={[isMandibular ? 0 : Math.PI, 0, 0]}
                  >
                    <coneGeometry args={[0.0022, 0.005, 12]} />
                    <meshStandardMaterial
                      color="#f59e0b"
                      emissive="#f59e0b"
                      emissiveIntensity={1.0}
                    />
                  </mesh>

                  {/* Apical projection line into alveolar bone */}
                  <mesh position={[0, isMandibular ? -0.005 : 0.005, 0]}>
                    <cylinderGeometry args={[0.0006, 0.0006, 0.010, 8]} />
                    <meshStandardMaterial
                      color="#e11d48"
                      emissive="#e11d48"
                      emissiveIntensity={0.8}
                    />
                  </mesh>

                  <Html position={[0, isMandibular ? -0.016 : 0.016, 0]} center>
                    <div className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold font-mono text-[9px] whitespace-nowrap shadow-xl border border-white pointer-events-none animate-bounce">
                      FDI {t.fdi}
                    </div>
                  </Html>
                </>
              )}
            </group>
          );
        })}
    </group>
  );
};

// ============================================================================
// 2. ULTRA-DETAILED SOLID ENDODONTIC CROSS-SECTION SPECIMEN
// ============================================================================
const SolidOrganicToothCrossSection: React.FC<{
  fdi: number;
  sectionMode: 'longitudinal' | 'solid' | 'pulp_isolated';
  enamelOpacity: number;
  showPdl: boolean;
}> = ({ fdi, sectionMode, enamelOpacity, showPdl }) => {
  const toothSpecimen =
    DENTAL_SPECIMENS_DATABASE[fdi] || DENTAL_SPECIMENS_DATABASE[46];

  const isMolar = toothSpecimen.toothType === 'molar';
  const isPremolar = toothSpecimen.toothType === 'premolar';
  const isCut = sectionMode === 'longitudinal';
  const isPulpOnly = sectionMode === 'pulp_isolated';

  // Smooth Anatomical Crown Profile
  const crownRadiusTop = isMolar ? 0.026 : isPremolar ? 0.018 : 0.014;
  const crownRadiusMid = isMolar ? 0.028 : isPremolar ? 0.019 : 0.015;
  const crownRadiusNeck = isMolar ? 0.022 : isPremolar ? 0.015 : 0.011;

  // Theta length: Math.PI for longitudinal cut, Math.PI * 2 for solid full tooth
  const thetaLength = isCut ? Math.PI : Math.PI * 2;

  // Dynamic materials based on section mode
  const enamelColor = isPulpOnly ? '#93c5fd' : '#fcfbfa';
  const currentEnamelOpacity = isPulpOnly ? 0.15 : enamelOpacity;
  const dentinOpacity = isPulpOnly ? 0.12 : 1.0;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. XƯƠNG Ổ RĂNG & DÂY CHẰNG NHA CHU (Alveolar Bone & PDL) */}
      {showPdl && !isPulpOnly && (
        <group position={[0, -0.024, 0]}>
          {/* Xương ổ răng (Alveolar Bone Socket) */}
          <mesh position={[0, -0.010, 0]}>
            <cylinderGeometry
              args={[
                crownRadiusNeck + 0.008,
                crownRadiusNeck + 0.012,
                0.048,
                32,
                1,
                true,
                0,
                thetaLength
              ]}
            />
            <meshStandardMaterial
              color="#e6dbcb"
              roughness={0.8}
              metalness={0.02}
              side={THREE.DoubleSide}
              transparent
              opacity={0.65}
            />
          </mesh>

          {/* Màng nha chu (Periodontal Ligament - PDL) */}
          <mesh position={[0, -0.008, 0]}>
            <cylinderGeometry
              args={[
                crownRadiusNeck + 0.002,
                crownRadiusNeck + 0.004,
                0.044,
                32,
                1,
                true,
                0,
                thetaLength
              ]}
            />
            <meshStandardMaterial
              color="#06b6d4"
              roughness={0.4}
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      )}

      {/* 2. MEN RĂNG THÂN RĂNG (Enamel Crown with Solid Caps) */}
      <group position={[0, 0.020, 0]}>
        {/* Curved 3D Crown Body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry
            args={[
              crownRadiusTop,
              crownRadiusNeck,
              0.034,
              32,
              16,
              false,
              0,
              thetaLength
            ]}
          />
          <meshPhysicalMaterial
            color={enamelColor}
            roughness={0.18}
            transmission={isPulpOnly ? 0.85 : 0.45}
            thickness={0.014}
            ior={1.62}
            transparent
            opacity={currentEnamelOpacity}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SOLID CUT FACE CAPS: Flat cut planes sealing the slice */}
        {isCut && !isPulpOnly && (
          <group position={[0, 0, 0]}>
            {/* Left enamel cut rim */}
            <mesh position={[-(crownRadiusTop + crownRadiusNeck) / 4 - 0.004, 0, 0]}>
              <planeGeometry args={[0.004, 0.034]} />
              <meshStandardMaterial
                color="#fcfbfa"
                roughness={0.2}
                side={THREE.DoubleSide}
                transparent
                opacity={currentEnamelOpacity}
              />
            </mesh>
            {/* Right enamel cut rim */}
            <mesh position={[(crownRadiusTop + crownRadiusNeck) / 4 + 0.004, 0, 0]}>
              <planeGeometry args={[0.004, 0.034]} />
              <meshStandardMaterial
                color="#fcfbfa"
                roughness={0.2}
                side={THREE.DoubleSide}
                transparent
                opacity={currentEnamelOpacity}
              />
            </mesh>
          </group>
        )}

        {/* Múi nhai giải phẫu (Anatomical Cusps) */}
        {isMolar && (
          <group position={[0, 0.017, 0]}>
            <mesh position={[-0.012, 0.002, 0.012]}>
              <sphereGeometry
                args={[0.009, 16, 16, 0, thetaLength, 0, Math.PI / 2]}
              />
              <meshStandardMaterial
                color={enamelColor}
                roughness={0.25}
                transparent
                opacity={currentEnamelOpacity}
              />
            </mesh>
            <mesh position={[0.012, 0.003, 0.012]}>
              <sphereGeometry
                args={[0.009, 16, 16, 0, thetaLength, 0, Math.PI / 2]}
              />
              <meshStandardMaterial
                color={enamelColor}
                roughness={0.25}
                transparent
                opacity={currentEnamelOpacity}
              />
            </mesh>
            <mesh position={[-0.012, 0.001, -0.012]}>
              <sphereGeometry
                args={[0.008, 16, 16, 0, thetaLength, 0, Math.PI / 2]}
              />
              <meshStandardMaterial
                color={enamelColor}
                roughness={0.25}
                transparent
                opacity={currentEnamelOpacity}
              />
            </mesh>
            <mesh position={[0.012, 0.001, -0.012]}>
              <sphereGeometry
                args={[0.008, 16, 16, 0, thetaLength, 0, Math.PI / 2]}
              />
              <meshStandardMaterial
                color={enamelColor}
                roughness={0.25}
                transparent
                opacity={currentEnamelOpacity}
              />
            </mesh>
          </group>
        )}

        <Html position={[crownRadiusTop + 0.010, 0.008, 0]} center>
          <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-white/30 text-white text-[8px] font-mono whitespace-nowrap shadow-md pointer-events-none">
            Men răng (Enamel - IOR 1.62)
          </div>
        </Html>
      </group>

      {/* 3. LỚP NGÀ RĂNG (Dentin Core Body with Solid Caps) */}
      <group position={[0, -0.010, 0]}>
        {/* Ngà thân răng (Crown Dentin 3D curved body) */}
        <mesh position={[0, 0.024, 0]}>
          <cylinderGeometry
            args={[
              crownRadiusTop - 0.005,
              crownRadiusNeck - 0.003,
              0.028,
              24,
              8,
              false,
              0,
              thetaLength
            ]}
          />
          <meshStandardMaterial
            color="#e8d5a7"
            roughness={0.45}
            metalness={0.05}
            side={THREE.DoubleSide}
            transparent={isPulpOnly}
            opacity={dentinOpacity}
          />
        </mesh>

        {/* SOLID DENTIN CUT FACE: Seals the interior so it is never hollow */}
        {isCut && !isPulpOnly && (
          <group position={[0, 0.024, 0.0001]}>
            <mesh position={[-(crownRadiusTop - 0.005) / 2, 0, 0]}>
              <planeGeometry args={[(crownRadiusTop - 0.005), 0.028]} />
              <meshStandardMaterial
                color="#e8d5a7"
                roughness={0.45}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[(crownRadiusTop - 0.005) / 2, 0, 0]}>
              <planeGeometry args={[(crownRadiusTop - 0.005), 0.028]} />
              <meshStandardMaterial
                color="#e8d5a7"
                roughness={0.45}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        )}

        {/* Ngà chân răng (Root Dentin: Bifurcated for Molars, Tapered for Single) */}
        <group position={[0, -0.012, 0]}>
          {isMolar ? (
            <>
              {/* Chân Gần (Mesial Root) */}
              <group position={[-0.009, -0.010, 0]} rotation={[0, 0, 0.06]}>
                <mesh>
                  <cylinderGeometry
                    args={[
                      0.008,
                      0.003,
                      0.038,
                      16,
                      1,
                      false,
                      0,
                      thetaLength
                    ]}
                  />
                  <meshStandardMaterial
                    color="#e2ce9c"
                    roughness={0.5}
                    side={THREE.DoubleSide}
                    transparent={isPulpOnly}
                    opacity={dentinOpacity}
                  />
                </mesh>
                {isCut && !isPulpOnly && (
                  <mesh position={[0, 0, 0.0001]}>
                    <planeGeometry args={[0.010, 0.038]} />
                    <meshStandardMaterial color="#e2ce9c" roughness={0.5} side={THREE.DoubleSide} />
                  </mesh>
                )}
                {/* Lỗ chóp chân gần */}
                <mesh position={[0, -0.019, 0]}>
                  <sphereGeometry args={[0.0014, 8, 8]} />
                  <meshStandardMaterial color="#1e293b" />
                </mesh>
              </group>

              {/* Chân Xa (Distal Root) */}
              <group position={[0.009, -0.010, 0]} rotation={[0, 0, -0.06]}>
                <mesh>
                  <cylinderGeometry
                    args={[
                      0.007,
                      0.003,
                      0.036,
                      16,
                      1,
                      false,
                      0,
                      thetaLength
                    ]}
                  />
                  <meshStandardMaterial
                    color="#e2ce9c"
                    roughness={0.5}
                    side={THREE.DoubleSide}
                    transparent={isPulpOnly}
                    opacity={dentinOpacity}
                  />
                </mesh>
                {isCut && !isPulpOnly && (
                  <mesh position={[0, 0, 0.0001]}>
                    <planeGeometry args={[0.009, 0.036]} />
                    <meshStandardMaterial color="#e2ce9c" roughness={0.5} side={THREE.DoubleSide} />
                  </mesh>
                )}
                {/* Lỗ chóp chân xa */}
                <mesh position={[0, -0.018, 0]}>
                  <sphereGeometry args={[0.0014, 8, 8]} />
                  <meshStandardMaterial color="#1e293b" />
                </mesh>
              </group>
            </>
          ) : (
            <group position={[0, -0.010, 0]}>
              <mesh>
                <cylinderGeometry
                  args={[
                    crownRadiusNeck - 0.003,
                    0.0025,
                    0.042,
                    16,
                    1,
                    false,
                    0,
                    thetaLength
                  ]}
                />
                <meshStandardMaterial
                  color="#e2ce9c"
                  roughness={0.5}
                  side={THREE.DoubleSide}
                  transparent={isPulpOnly}
                  opacity={dentinOpacity}
                />
              </mesh>
              {isCut && !isPulpOnly && (
                <mesh position={[0, 0, 0.0001]}>
                  <planeGeometry args={[0.014, 0.042]} />
                  <meshStandardMaterial color="#e2ce9c" roughness={0.5} side={THREE.DoubleSide} />
                </mesh>
              )}
              {/* Lỗ chóp */}
              <mesh position={[0, -0.021, 0]}>
                <sphereGeometry args={[0.0014, 8, 8]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          )}
        </group>

        <Html position={[crownRadiusTop + 0.008, 0.014, 0]} center>
          <div className="px-2 py-0.5 rounded bg-amber-950/90 border border-amber-500/40 text-amber-200 text-[8px] font-mono whitespace-nowrap shadow-md pointer-events-none">
            Ngà răng (Dentin)
          </div>
        </Html>
      </group>

      {/* 4. BUỒNG TỦY & HỆ THỐNG ỐNG TỦY (Luminous Pulp Chamber & Vertucci Canals) */}
      <group position={[0, 0, 0.001]}>
        {/* Buồng tủy thân răng (Pulp Chamber) */}
        <mesh position={[0, 0.012, 0]}>
          <boxGeometry
            args={[
              isMolar ? 0.016 : 0.008,
              0.012,
              isCut ? 0.008 : isMolar ? 0.014 : 0.007
            ]}
          />
          <meshStandardMaterial
            color="#e11d48"
            emissive="#e11d48"
            emissiveIntensity={1.1}
            roughness={0.2}
          />
        </mesh>

        {/* Các Sừng Tủy (Pulp Horns) */}
        {isMolar && (
          <group position={[0, 0.018, 0]}>
            <mesh position={[-0.006, 0, 0.003]}>
              <coneGeometry args={[0.002, 0.005, 8]} />
              <meshStandardMaterial
                color="#e11d48"
                emissive="#e11d48"
                emissiveIntensity={1.2}
              />
            </mesh>
            <mesh position={[0.006, 0, 0.003]}>
              <coneGeometry args={[0.002, 0.005, 8]} />
              <meshStandardMaterial
                color="#e11d48"
                emissive="#e11d48"
                emissiveIntensity={1.2}
              />
            </mesh>
            {!isCut && (
              <>
                <mesh position={[-0.006, 0, -0.003]}>
                  <coneGeometry args={[0.002, 0.004, 8]} />
                  <meshStandardMaterial
                    color="#e11d48"
                    emissive="#e11d48"
                    emissiveIntensity={1.2}
                  />
                </mesh>
                <mesh position={[0.006, 0, -0.003]}>
                  <coneGeometry args={[0.002, 0.004, 8]} />
                  <meshStandardMaterial
                    color="#e11d48"
                    emissive="#e11d48"
                    emissiveIntensity={1.2}
                  />
                </mesh>
              </>
            )}
          </group>
        )}

        {/* Các Ống Tủy Chân Răng (Root Canals: MB, ML, DB, DL) */}
        <group position={[0, -0.022, 0]}>
          {isMolar ? (
            <>
              {/* Ống gần ngoài (MB) */}
              <mesh position={[-0.009, 0, 0.002]} rotation={[0, 0, 0.05]}>
                <cylinderGeometry args={[0.0016, 0.0006, 0.036, 12]} />
                <meshStandardMaterial
                  color="#e11d48"
                  emissive="#e11d48"
                  emissiveIntensity={1.0}
                />
              </mesh>
              {!isCut && (
                <mesh position={[-0.009, 0, -0.003]} rotation={[0, 0, 0.05]}>
                  <cylinderGeometry args={[0.0014, 0.0005, 0.036, 12]} />
                  <meshStandardMaterial
                    color="#e11d48"
                    emissive="#e11d48"
                    emissiveIntensity={1.0}
                  />
                </mesh>
              )}
              {/* Ống xa (Distal Canal) */}
              <mesh position={[0.009, 0, 0]} rotation={[0, 0, -0.05]}>
                <cylinderGeometry args={[0.0020, 0.0008, 0.034, 12]} />
                <meshStandardMaterial
                  color="#e11d48"
                  emissive="#e11d48"
                  emissiveIntensity={1.0}
                />
              </mesh>
            </>
          ) : (
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.0018, 0.0006, 0.040, 12]} />
              <meshStandardMaterial
                color="#e11d48"
                emissive="#e11d48"
                emissiveIntensity={1.0}
              />
            </mesh>
          )}
        </group>

        {/* Apical Sensory Nerve Entrance */}
        <group position={[0, -0.042, 0]}>
          {isMolar ? (
            <>
              <mesh position={[-0.010, 0, 0]}>
                <cylinderGeometry args={[0.0006, 0.0006, 0.012, 8]} />
                <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
              </mesh>
              <mesh position={[0.010, 0, 0]}>
                <cylinderGeometry args={[0.0006, 0.0006, 0.012, 8]} />
                <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
              </mesh>
            </>
          ) : (
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.0006, 0.0006, 0.012, 8]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
            </mesh>
          )}
        </group>

        {/* Nhãn Buồng Tủy */}
        <Html position={[-0.022, 0.012, 0]} center>
          <div className="px-2 py-0.5 rounded bg-rose-950/90 border border-rose-500/50 text-rose-200 text-[8px] font-mono whitespace-nowrap shadow-md pointer-events-none">
            Buồng tủy (Pulp Chamber)
          </div>
        </Html>
      </group>
    </group>
  );
};

// ============================================================================
// 3. MAIN COMPONENT: TOOTH SPECIMEN STAGE
// ============================================================================
export const ToothSpecimenStage: React.FC = () => {
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  // Toggle between Real 3D Dental Arch View and Solid Cross-Section Specimen
  const [viewMode, setViewMode] = useState<'arch' | 'isolated'>('arch');
  const [showSkullContext, setShowSkullContext] = useState<boolean>(true);

  const selectedToothFdi = useDentalNeuroStore((s) => s.selectedToothFdi);
  const setSelectedToothFdi = useDentalNeuroStore((s) => s.setSelectedToothFdi);

  const toothCrossSection = useDentalNeuroStore((s) => s.toothCrossSection);
  const setToothCrossSection = useDentalNeuroStore((s) => s.setToothCrossSection);

  const toothEnamelOpacity = useDentalNeuroStore((s) => s.toothEnamelOpacity);
  const setToothEnamelOpacity = useDentalNeuroStore((s) => s.setToothEnamelOpacity);

  const toothShowPdl = useDentalNeuroStore((s) => s.toothShowPdl);
  const setToothShowPdl = useDentalNeuroStore((s) => s.setToothShowPdl);

  const currentToothData =
    DENTAL_SPECIMENS_DATABASE[selectedToothFdi] || DENTAL_SPECIMENS_DATABASE[46];

  const currentToothInnervation =
    DENTAL_INNERVATION_DATABASE.find((t) => t.fdi === selectedToothFdi) ||
    DENTAL_INNERVATION_DATABASE[0];

  // Camera target coordinates based on active view mode and selected tooth
  const cameraTarget = useMemo(() => {
    if (viewMode === 'arch') {
      return currentToothInnervation.position3D;
    }
    return [0, 0, 0] as [number, number, number];
  }, [viewMode, currentToothInnervation]);

  const cameraPosition = useMemo(() => {
    if (viewMode === 'arch') {
      const [x, y, z] = currentToothInnervation.position3D;
      return [x * 1.4 + 0.04, y + 0.02, z + 0.09] as [number, number, number];
    }
    return [0.08, 0.03, 0.12] as [number, number, number];
  }, [viewMode, currentToothInnervation]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* 1. TOP LEFT FDI SELECTOR & QUICK CHANGER */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-auto max-w-sm">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
              FDI {currentToothData.fdi} | #{currentToothData.universal} | {currentToothData.palmer}
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-bold">
              {viewMode === 'arch' ? 'CUNG RĂNG 3D THẬT' : 'TIÊU BẢN CẮT LỚP 3D'}
            </span>
          </div>

          <h2 className="text-sm font-bold font-serif text-current">
            {currentToothData.nameVi}
          </h2>
          <p className="text-[11px] text-slate-400 italic font-serif">
            {currentToothData.nameEn}
          </p>

          {/* Quick FDI Jump Pill Buttons */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {[46, 16, 14, 11, 48, 38].map((fdiNum) => (
              <button
                key={fdiNum}
                onClick={() => setSelectedToothFdi(fdiNum)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  selectedToothFdi === fdiNum
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:text-current'
                }`}
              >
                R.{fdiNum} {fdiNum === 48 || fdiNum === 38 ? '★' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TOP RIGHT CONTROLS: VIEW MODE TOGGLE & CROSS-SECTION PARAMETERS */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto max-w-xs">
        {/* Main View Mode Switcher: Arch 3D vs Isolated Cross Section */}
        <div
          className={`p-2 rounded-2xl border backdrop-blur-md shadow-xl flex items-center gap-1.5 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <button
            onClick={() => setViewMode('arch')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'arch'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-current'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cung Răng 3D Thật</span>
          </button>
          <button
            onClick={() => setViewMode('isolated')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'isolated'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-current'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Cắt Lớp Nội Nha</span>
          </button>
        </div>

        {/* Cross-Section Parameters (Visible in Isolated mode) */}
        {viewMode === 'isolated' && (
          <div
            className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl animate-fade-in ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-400 mb-2">
              MẶT CẮT & ĐỘ TRONG SUỐT
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
                <span className="text-slate-400">Độ Mờ Men Răng:</span>
                <span className="font-mono font-bold text-amber-400">
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
                className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
              />
            </div>

            {/* Toggle PDL / Bone */}
            <button
              onClick={() => setToothShowPdl(!toothShowPdl)}
              className={`w-full py-1.5 px-2.5 rounded-xl text-[10px] font-bold border transition cursor-pointer flex items-center justify-between mb-2 ${
                toothShowPdl
                  ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
                  : 'border-transparent bg-black/5 dark:bg-white/5 text-slate-400'
              }`}
            >
              <span>Dây chằng nha chu (PDL) & Xương</span>
              <span>{toothShowPdl ? 'BẬT' : 'TẮT'}</span>
            </button>

            {/* Toggle Background 3D Skull Context */}
            <button
              onClick={() => setShowSkullContext(!showSkullContext)}
              className={`w-full py-1.5 px-2.5 rounded-xl text-[10px] font-bold border transition cursor-pointer flex items-center justify-between ${
                showSkullContext
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'border-transparent bg-black/5 dark:bg-white/5 text-slate-400'
              }`}
            >
              <span>Khung Xương Sọ Tham Chiếu</span>
              <span>{showSkullContext ? 'BẬT' : 'TẮT'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. 3D WEBGL CANVAS STAGE */}
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[0.5, 1.8, 0.5]} intensity={2.2} castShadow />
        <directionalLight position={[-0.5, 0.2, -0.5]} intensity={1.0} />
        <directionalLight position={[0, -0.5, 0.5]} intensity={0.6} />
        <pointLight
          position={[cameraTarget[0], cameraTarget[1] + 0.05, cameraTarget[2] + 0.05]}
          intensity={1.8}
          color="#fffef5"
        />

        {/* View Mode 1: Full 3D Dental Arch & In-Situ Teeth on Skull */}
        {viewMode === 'arch' ? (
          <CanonicalDentalArchView
            selectedFdi={selectedToothFdi}
            onSelectTooth={setSelectedToothFdi}
          />
        ) : (
          /* View Mode 2: Ultra-Detailed Organic Endodontic Cross-Section */
          <group>
            {/* Optional 3D Skull contextual reference in the background */}
            {showSkullContext && (
              <group position={[0, -1.34, -0.16]}>
                <CanonicalDentalArchView
                  selectedFdi={selectedToothFdi}
                  onSelectTooth={setSelectedToothFdi}
                  boneOpacity={0.25}
                  isContextOnly={true}
                />
              </group>
            )}

            {/* Solid anatomical tooth specimen in focus */}
            <SolidOrganicToothCrossSection
              fdi={selectedToothFdi}
              sectionMode={toothCrossSection}
              enamelOpacity={toothEnamelOpacity}
              showPdl={toothShowPdl}
            />
          </group>
        )}

        {/* Orbit Controls with dynamic target */}
        <OrbitControls
          key={`${viewMode}-${selectedToothFdi}`}
          enableDamping
          dampingFactor={0.06}
          minDistance={0.03}
          maxDistance={0.45}
          target={cameraTarget}
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
