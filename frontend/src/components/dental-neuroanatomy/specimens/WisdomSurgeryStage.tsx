import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Activity,
  Maximize2,
  Layers
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { WISDOM_SURGICAL_DATABASE } from '../../../data/dentalSpecimensData';
import { createCraniofacialOrganGroup } from '../DentalNeuro3DStage';
import {
  AnatomicalMolarMesh,
  DentalSyringe3D,
  PeriostealElevator3D,
  SurgicalBurHandpiece3D,
  CryerElevator3D,
  SurgicalSutureStitch3D,
  MucoperiostealFlap3D,
  BoneGutteringTrough3D
} from './AnatomicalDentalModels3D';


// Extract baked real nerve geometry from Z-Anatomy glTF
function extractBakedNerveMesh(
  rootScene: THREE.Object3D,
  nodeName: string,
  targetOffset: [number, number, number] = [-0.0451, 0.60, 0.08]
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
  geom.translate(targetOffset[0], targetOffset[1], targetOffset[2]);
  geom.computeVertexNormals();
  return geom;
}

// ============================================================================
// 1. CANONICAL 3D SKULL BACKGROUND FOR MANDIBULAR SURGERY
// ============================================================================
const CanonicalSkullSurgeryContext: React.FC<{
  boneOpacity: number;
  showSkull: boolean;
}> = ({ boneOpacity, showSkull }) => {
  const skullGltf = useGLTF('/models/skull.glb');

  const normalizedSkull = useMemo(() => {
    const group = createCraniofacialOrganGroup(
      skullGltf.scene,
      0.205,
      [0, -Math.PI / 2, 0],
      [0.0, 1.41, 0.09]
    );

    // Apply clinical bone transparency
    group.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.transparent = boneOpacity < 0.98;
        child.material.opacity = boneOpacity;
        child.material.roughness = 0.65;
        child.material.metalness = 0.02;
        child.material.color = new THREE.Color('#f0e8dc');
        child.material.depthWrite = boneOpacity > 0.7;
      }
    });

    return group;
  }, [skullGltf, boneOpacity]);

  if (!showSkull) return null;

  return <primitive object={normalizedSkull} />;
};

// ============================================================================
// 2. SURGICAL SITE MESH: IMPACTED R48/R38, IAN CANAL & 6-STEP SIMULATION
// ============================================================================
const MandibularSurgicalSiteMesh: React.FC<{
  toothId: 'tooth_38' | 'tooth_48';
  winterType: 'mesioangular' | 'horizontal' | 'vertical' | 'distoangular';
  pellClass: 'I' | 'II' | 'III';
  pellPos: 'A' | 'B' | 'C';
  surgicalStep: number;
  showNerves: boolean;
}> = ({ toothId, winterType, pellClass, pellPos, surgicalStep, showNerves }) => {
  // Quadrant 4 (R48 - Phải) uses NEGATIVE X (-0.034)
  // Quadrant 3 (R38 - Trái) uses POSITIVE X (+0.034)
  const isRight = toothId === 'tooth_48';
  const sideSign = isRight ? -1 : 1;

  const baseToothPos: [number, number, number] = [sideSign * 0.034, 1.332, 0.124];

  // Compute 3D rotation & depth from Winter & Pell-Gregory classifications
  const { toothRotation, depthOffset, distToCanalMm } = useMemo(() => {
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;
    let dY = 0;
    let dZ = 0;
    let dist = 2.5;

    // Winter Angulation
    if (winterType === 'mesioangular') {
      rotX = 0.65; // Tilted forward towards R7
      dist = 1.1;  // High risk
    } else if (winterType === 'horizontal') {
      rotX = 1.35; // Crown horizontal facing R7 root
      dY = -0.003;
      dist = 0.5;  // Extreme risk (contacting canal)
    } else if (winterType === 'distoangular') {
      rotX = -0.55; // Tilted backwards into ascending ramus
      dZ = -0.004;
      dist = 1.8;
    } else {
      // vertical
      rotX = 0.05;
      dist = 3.2;  // Low risk
    }

    // Pell-Gregory Depth Position
    if (pellPos === 'B') {
      dY -= 0.003;
      dist = Math.max(0.4, dist - 0.7);
    } else if (pellPos === 'C') {
      dY -= 0.006;
      dist = Math.max(0.2, dist - 1.4);
    }

    // Pell-Gregory Ramal Class
    if (pellClass === 'II') {
      dZ -= 0.002;
    } else if (pellClass === 'III') {
      dZ -= 0.004;
    }

    return {
      toothRotation: [rotX, rotY, rotZ] as [number, number, number],
      depthOffset: [0, dY, dZ] as [number, number, number],
      distToCanalMm: dist
    };
  }, [winterType, pellClass, pellPos]);

  // Load verified real pre-made cranial nerve assets (Z-Anatomy CC BY-SA 4.0)
  const cranialNervesGltf = useGLTF('/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb', '/draco/');
  const ianNodeName = sideSign > 0 ? 'Inferior alveolar nerve.r' : 'Inferior alveolar nerve.l';
  const lingualNodeName = sideSign > 0 ? 'Lingual nerve.r' : 'Lingual nerve.l';

  const realIanGeometry = useMemo(() => {
    return extractBakedNerveMesh(cranialNervesGltf.scene, ianNodeName);
  }, [cranialNervesGltf, ianNodeName]);

  const realLingualGeometry = useMemo(() => {
    return extractBakedNerveMesh(cranialNervesGltf.scene, lingualNodeName);
  }, [cranialNervesGltf, lingualNodeName]);

  // Tooth position with depth offset
  const toothPos: [number, number, number] = [
    baseToothPos[0] + depthOffset[0],
    baseToothPos[1] + depthOffset[1],
    baseToothPos[2] + depthOffset[2]
  ];

  // Apex of tooth root for proximity sensor
  const toothApexPos: [number, number, number] = [
    toothPos[0],
    toothPos[1] - 0.009,
    toothPos[2] - 0.003
  ];

  // Closest IAN canal point beneath tooth
  const canalTargetPos: [number, number, number] = [sideSign * 0.036, 1.336, 0.118];

  // Surgical step states
  const isAnesthetized = surgicalStep >= 1;
  const isFlapReflected = surgicalStep >= 2;
  const isBoneGuttered = surgicalStep >= 3;
  const isOdontotomyCut = surgicalStep >= 4;
  const isToothElevated = surgicalStep >= 5;
  const isSutured = surgicalStep >= 6;

  // Color-coded safety alert
  const riskColor = distToCanalMm <= 1.0 ? '#ef4444' : distToCanalMm <= 2.0 ? '#f59e0b' : '#10b981';

  return (
    <group>
      {/* 1. THẦN KINH RĂNG DƯỚI (IAN) & THẦN KINH LƯỠI */}
      {showNerves && (
        <group>
          {/* IAN Main Trunk inside Mandibular Canal */}
          {realIanGeometry && <mesh geometry={realIanGeometry}>
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>}

          {/* Lingual Nerve running medially */}
          {realLingualGeometry && <mesh geometry={realLingualGeometry}>
            <meshStandardMaterial
              color="#fb7185"
              emissive="#e11d48"
              emissiveIntensity={0.6}
              roughness={0.4}
            />
          </mesh>}

          {/* IAN Foramen & Exit Labels */}
          <Html position={[sideSign * 0.038, 1.358, 0.095]} center>
            <div className="px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-500/50 text-amber-300 text-[7px] font-mono whitespace-nowrap pointer-events-none shadow-lg">
              Lỗ hàm dưới (Gai Spix)
            </div>
          </Html>

          <Html position={[sideSign * 0.030, 1.317, 0.152]} center>
            <div className="px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-500/50 text-amber-300 text-[7px] font-mono whitespace-nowrap pointer-events-none shadow-lg">
              Lỗ cằm (Mental Foramen)
            </div>
          </Html>

          <Html position={[sideSign * 0.026, 1.337, 0.116]} center>
            <div className="px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/50 text-rose-300 text-[7px] font-mono whitespace-nowrap pointer-events-none shadow-lg">
              TK Lưỡi (Lingual N.)
            </div>
          </Html>
        </group>
      )}

      {/* 2. THƯỚC ĐO KHOẢNG CÁCH 3D (REAL-TIME PROXIMITY LINE) */}
      <group>
        {/* Measurement dashed line */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...toothApexPos, ...canalTargetPos])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineDashedMaterial
            color={riskColor}
            dashSize={0.002}
            gapSize={0.001}
            linewidth={2}
          />
        </line>

        {/* Live Distance Floating Indicator */}
        <Html
          position={[
            (toothApexPos[0] + canalTargetPos[0]) / 2 + (isRight ? -0.008 : 0.008),
            (toothApexPos[1] + canalTargetPos[1]) / 2,
            (toothApexPos[2] + canalTargetPos[2]) / 2
          ]}
          center
        >
          <div
            className="px-2 py-0.5 rounded-full border text-[8px] font-black tracking-wider flex items-center gap-1 shadow-2xl pointer-events-none whitespace-nowrap animate-pulse"
            style={{
              backgroundColor: distToCanalMm <= 1.0 ? '#7f1d1d' : '#451a03',
              borderColor: riskColor,
              color: riskColor
            }}
          >
            <Activity className="w-2.5 h-2.5" />
            <span>K/c IAN: {distToCanalMm.toFixed(1)} mm</span>
          </div>
        </Html>
      </group>

      {/* 3. RĂNG KHÔN NGẦM GIẢI PHẪU 3D CHUẨN Y KHOA (ANATOMICAL MOLAR 3D) */}
      <group>
        <AnatomicalMolarMesh
          position={toothPos}
          rotation={toothRotation}
          scale={1.08}
          isRightSide={isRight}
          isSectioned={isOdontotomyCut}
          isSeparated={isToothElevated}
          elevationOffset={isToothElevated ? [sideSign * -0.012, 0.018, 0.008] : [0, 0, 0]}
        />

        {/* Dynamic Tooth Clinical Status Badge */}
        <Html position={[toothPos[0], toothPos[1] + 0.012, toothPos[2]]} center>
          <div className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[8px] font-mono whitespace-nowrap shadow-md pointer-events-none">
            {isRight ? 'R.48' : 'R.38'}{' '}
            {isToothElevated
              ? '(Đã Bẩy Rời)'
              : isOdontotomyCut
              ? '(Đã Cắt Thân)'
              : '(Răng Khôn Ngầm)'}
          </div>
        </Html>
      </group>

      {/* 4. GÂY TÊ VÙNG SPIX & THẦN KINH MÁ (Anesthesia Depot & 27G Syringe at Step 1) */}
      {isAnesthetized && (
        <group position={[sideSign * 0.038, 1.355, 0.095]}>
          {/* Bơm tiêm & Kim nha khoa 27G y tế */}
          <DentalSyringe3D
            position={[sideSign * -0.004, 0.008, -0.006]}
            rotation={[-0.8, sideSign * -0.5, 0.2]}
          />
          {/* Quầng thuốc tê phát quang bao quanh gai Spix */}
          <mesh>
            <sphereGeometry args={[0.0065, 16, 16]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.85}
              transparent
              opacity={0.45}
            />
          </mesh>
          <Html position={[0, 0.010, 0]} center>
            <div className="px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-[7px] font-mono whitespace-nowrap pointer-events-none">
              Gây tê gai Spix (Lidocaine 2%)
            </div>
          </Html>
        </group>
      )}

      {/* 5. ĐƯỜNG RẠCH & VẠT MÀNG XƯƠNG (Mucoperiosteal Flap & Periosteal Elevator at Step 2) */}
      {isFlapReflected && (
        <group position={[sideSign * 0.035, 1.335, 0.126]}>
          {/* Vạt niêm mạc màng xương lật mở 3D */}
          <MucoperiostealFlap3D position={[0, 0, 0]} isRightSide={isRight} />
          {/* Cây bóc tách màng xương Molt #9 đang banh giữ vạt */}
          <PeriostealElevator3D
            position={[sideSign * 0.006, 0.006, 0.004]}
            rotation={[0.3, sideSign * 0.5, 0.1]}
          />
          <Html position={[sideSign * 0.004, 0.010, 0]} center>
            <div className="px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/50 text-rose-300 text-[7px] font-mono whitespace-nowrap pointer-events-none">
              Vạt tam giác Ward (Bóc tách toàn phần)
            </div>
          </Html>
        </group>
      )}

      {/* 6. MỞ XƯƠNG TẠO RÃNH MÁ (Bone Guttering Trough & Lindemann Bur at Step 3) */}
      {isBoneGuttered && (
        <group position={[sideSign * 0.036, 1.332, 0.122]}>
          {/* Cửa sổ mở xương rãnh má hình máng bộc lộ cổ răng */}
          <BoneGutteringTrough3D position={[0, 0, 0]} isRightSide={isRight} />
          {/* Mũi khoan Lindemann #702 và vòi phun sương làm mát ở Bước 3 */}
          {surgicalStep === 3 && (
            <SurgicalBurHandpiece3D
              position={[sideSign * 0.003, 0.006, 0.003]}
              rotation={[0.35, sideSign * 0.4, 0]}
            />
          )}
          <Html position={[sideSign * 0.004, -0.008, 0]} center>
            <div className="px-1.5 py-0.5 rounded bg-sky-950/90 border border-sky-500/50 text-sky-200 text-[7px] font-mono whitespace-nowrap pointer-events-none">
              Rãnh mở xương má (Bone Guttering)
            </div>
          </Html>
        </group>
      )}

      {/* 7. CHIA CẮT THÂN RĂNG (Odontotomy Handpiece at Step 4) */}
      {isOdontotomyCut && surgicalStep === 4 && (
        <group position={[toothPos[0] + (isRight ? -0.002 : 0.002), toothPos[1] + 0.004, toothPos[2]]}>
          <SurgicalBurHandpiece3D
            position={[0, 0.002, 0]}
            rotation={[0.65, sideSign * 0.25, 0]}
          />
          <Html position={[0, 0.010, 0]} center>
            <div className="px-2 py-0.5 rounded bg-rose-900/90 border border-rose-400 text-rose-200 text-[8px] font-mono whitespace-nowrap shadow-lg pointer-events-none">
              Cắt thân răng 45° (Mũi #702)
            </div>
          </Html>
        </group>
      )}

      {/* 8. BẨY RĂNG (Cryer Elevator & Leverage Vector at Step 5) */}
      {isToothElevated && !isSutured && (
        <group position={[sideSign * 0.036, 1.332, 0.124]}>
          {/* Cây bẩy Cryer cắm vào điểm tựa rãnh xương má */}
          <CryerElevator3D
            position={[sideSign * 0.002, -0.002, 0.001]}
            rotation={[0.35, sideSign * 0.45, 0.15]}
            isRightSide={isRight}
          />
          {/* Mũi tên vector hướng lực bẩy nâng thân răng */}
          <mesh position={[sideSign * -0.006, 0.012, 0.004]} rotation={[0.4, sideSign * -0.3, 0]}>
            <cylinderGeometry args={[0.0004, 0.0004, 0.010, 8]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[sideSign * -0.008, 0.017, 0.006]} rotation={[0.4, sideSign * -0.3, 0]}>
            <coneGeometry args={[0.0012, 0.003, 8]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
          </mesh>
          <Html position={[0, 0.022, 0]} center>
            <div className="px-2 py-0.5 rounded bg-emerald-900/90 border border-emerald-400 text-emerald-200 text-[8px] font-mono whitespace-nowrap shadow-xl pointer-events-none">
              Điểm tựa bẩy (Đòn bẩy loại 1)
            </div>
          </Html>
        </group>
      )}

      {/* 9. KHÂU ĐÓNG VẠT (3-0 Silk / 4-0 Vicryl Interrupted Sutures at Step 6) */}
      {isSutured && (
        <group position={[sideSign * 0.035, 1.336, 0.124]}>
          {/* Mũi #1: Sau cành ngang / Vùng tam giác sau hàm */}
          <SurgicalSutureStitch3D
            position={[0, 0.001, -0.006]}
            rotation={[0, sideSign * 0.3, 0]}
            scale={1.0}
          />
          {/* Mũi #2: Góc đường rạch giảm áp */}
          <SurgicalSutureStitch3D
            position={[sideSign * 0.002, -0.001, 0.003]}
            rotation={[0, sideSign * -0.2, 0]}
            scale={0.95}
          />
          {/* Mũi #3: Khe viền nướu R.47 */}
          <SurgicalSutureStitch3D
            position={[0, -0.003, 0.009]}
            rotation={[0, sideSign * 0.1, 0]}
            scale={0.9}
          />
          <Html position={[0, 0.008, 0]} center>
            <div className="px-2 py-0.5 rounded bg-sky-900 border border-sky-400 text-sky-200 text-[8px] font-mono whitespace-nowrap pointer-events-none shadow-lg">
              3 Mũi Khâu Rời (Silk 3-0 / Vicryl 4-0)
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};

// ============================================================================
// 3. MAIN COMPONENT: WISDOM SURGERY STAGE
// ============================================================================
export const WisdomSurgeryStage: React.FC = () => {
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const [showFullSkull, setShowFullSkull] = useState(true);

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

  const isRight = wisdomToothId === 'tooth_48';
  const sideSign = isRight ? -1 : 1;

  const currentStep =
    WISDOM_SURGICAL_DATABASE.surgicalSteps.find((s) => s.stepNumber === wisdomSurgicalStep) ||
    WISDOM_SURGICAL_DATABASE.surgicalSteps[0];

  const currentWinterInfo =
    WISDOM_SURGICAL_DATABASE.winterTypes.find((w) => w.id === wisdomWinterType) ||
    WISDOM_SURGICAL_DATABASE.winterTypes[0];

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* 1. TOP LEFT SURGICAL PARAMETERS & MORPHING CONTROLS */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-auto max-w-sm">
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
              PHẪU THUẬT RĂNG KHÔN
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setWisdomToothId('tooth_48')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  wisdomToothId === 'tooth_48' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                R.48 (Phải)
              </button>
              <button
                onClick={() => setWisdomToothId('tooth_38')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  wisdomToothId === 'tooth_38' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                R.38 (Trái)
              </button>
            </div>
          </div>

          {/* Phân loại Winter */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>Phân loại Winter:</span>
              <span className="text-amber-400 font-bold">Độ khó: {currentWinterInfo.surgicalDifficulty}</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {WISDOM_SURGICAL_DATABASE.winterTypes.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWisdomWinterType(w.id as any)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer truncate ${
                    wisdomWinterType === w.id
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:text-current'
                  }`}
                >
                  {w.labelVi}
                </button>
              ))}
            </div>
          </div>

          {/* Phân loại Pell-Gregory */}
          <div>
            <div className="text-[10px] font-mono text-slate-400 mb-1">
              Phân loại Pell-Gregory (Tương quan Cành lên & Mặt phẳng nhai):
            </div>
            <div className="grid grid-cols-2 gap-1">
              {/* Class I, II, III */}
              <div className="flex rounded-lg bg-black/5 dark:bg-white/5 p-0.5">
                {(['I', 'II', 'III'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setWisdomPellGregoryClass(c)}
                    className={`flex-1 py-0.5 text-[9px] font-bold rounded transition cursor-pointer ${
                      wisdomPellGregoryClass === c
                        ? 'bg-amber-600 text-white'
                        : 'text-slate-400 hover:text-current'
                    }`}
                  >
                    Class {c}
                  </button>
                ))}
              </div>

              {/* Position A, B, C */}
              <div className="flex rounded-lg bg-black/5 dark:bg-white/5 p-0.5">
                {(['A', 'B', 'C'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setWisdomPellGregoryPos(p)}
                    className={`flex-1 py-0.5 text-[9px] font-bold rounded transition cursor-pointer ${
                      wisdomPellGregoryPos === p
                        ? 'bg-amber-600 text-white'
                        : 'text-slate-400 hover:text-current'
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

      {/* 2. TOP RIGHT NERVE SAFETY & BONE TRANSPARENCY CONTROLS */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto max-w-xs">
        {/* Skull Model Context Toggle */}
        <div
          className={`p-2.5 rounded-2xl border backdrop-blur-md shadow-xl flex items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-bold">Mô Hình Xương Hàm 3D</span>
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

        {/* Bone Transparency & Proximity Controls */}
        <div
          className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>THƯỚC ĐO RỦI RO THẦN KINH (IAN)</span>
          </div>

          {/* Bone Opacity Slider */}
          <div className="space-y-1 mb-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Độ Trong Suốt Xương:</span>
              <span className="font-mono font-bold text-amber-400">
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
        camera={{ position: [sideSign * 0.10, 1.355, 0.17], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[sideSign * 0.4, 1.8, 0.5]} intensity={2.2} castShadow />
        <directionalLight position={[sideSign * -0.4, 0.5, -0.4]} intensity={0.9} />
        <pointLight position={[sideSign * 0.034, 1.35, 0.15]} intensity={1.5} color="#fffef7" />

        {/* Real Canonical 3D Skull / Mandible Context */}
        <CanonicalSkullSurgeryContext
          showSkull={showFullSkull}
          boneOpacity={wisdomBoneOpacity}
        />

        {/* Surgical Site: Impacted Tooth, IAN Tube, Proximity Line, 6 Steps */}
        <MandibularSurgicalSiteMesh
          toothId={wisdomToothId}
          winterType={wisdomWinterType}
          pellClass={wisdomPellGregoryClass}
          pellPos={wisdomPellGregoryPos}
          surgicalStep={wisdomSurgicalStep}
          showNerves={wisdomShowNerves}
        />

        {/* Focused on Mandibular Angle and Retromolar Trigone */}
        <OrbitControls
          key={wisdomToothId}
          enableDamping
          dampingFactor={0.06}
          minDistance={0.03}
          maxDistance={0.4}
          target={[sideSign * 0.034, 1.332, 0.124]}
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
