import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Activity,
  Eye,
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { WISDOM_SURGICAL_DATABASE } from '../../../data/dentalSpecimensData';
import { ToothPositionResolver } from '../../../utils/ToothPositionResolver';
import { CoordinateAlignmentValidator } from '../../../anatomy/dental/CoordinateAlignmentValidator';
import { DentalTargetResolver } from '../../../anatomy/dental/DentalTargetResolver';
import { DentalCameraFocusController, DentalViewPreset } from '../../../anatomy/dental/DentalCameraFocusController';
import {
  TopControlsManager,
  ToolbarSafeArea,
  LabelLayoutManager,
  LayoutObstacle,
  RawProjectedLabel
} from '../../../utils/ViewerLayoutManager';
import { AnatomyLabelLayer } from '../AnatomyLabelLayer';
import { DentalAnatomyLabelProjector, LabelAnchorDefinition } from '../DentalAnatomyLabelProjector';
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

// ============================================================================
// EXTRACT BAKED NERVE MESH FROM Z-ANATOMY CRANIAL NERVES ASSET
// Preserves authentic world matrices in canonical metric space (no manual translation offset)
// ============================================================================
function extractBakedNerveMesh(
  rootScene: THREE.Object3D,
  nodeName: string
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
  geom.computeVertexNormals();
  return geom;
}

// ============================================================================
// 1. CANONICAL 3D SKULL BACKGROUND FOR MANDIBULAR SURGERY
// Loads master craniofacial skull (skull_complete.glb) in metric canonical space.
// Isolates mandible and mandibular dental arch with clinical transparency.
// ============================================================================
const CanonicalSkullSurgeryContext: React.FC<{
  boneOpacity: number;
  showSkull: boolean;
  activeToothFdi: number;
}> = ({ boneOpacity, showSkull, activeToothFdi }) => {
  const skullGltf = useGLTF('/models/craniofacial/skull/skull_complete.glb', '/draco/');

  const cleanedSkull = useMemo(() => {
    const scene = skullGltf.scene.clone(true);

    scene.traverse((child: any) => {
      if (!child.isMesh) return;
      const name = child.name || '';
      const lower = name.toLowerCase();

      // Hide all extracranial body bones (vertebrae, ribs, sternum, limbs, pelvis)
      const isExtracranialBody =
        lower.includes('vertebra') ||
        lower.includes('rib') ||
        lower.includes('costal') ||
        lower.includes('sternum') ||
        lower.includes('pelvis') ||
        lower.includes('sacrum') ||
        lower.includes('ilium') ||
        lower.includes('ischium') ||
        lower.includes('pubis') ||
        lower.includes('femur') ||
        lower.includes('tibia') ||
        lower.includes('fibula') ||
        lower.includes('patella') ||
        lower.includes('scapula') ||
        lower.includes('clavicle') ||
        lower.includes('humerus') ||
        lower.includes('radius') ||
        lower.includes('ulna') ||
        lower.includes('tarsal') ||
        lower.includes('carpal') ||
        lower.includes('phalanx') ||
        lower.includes('metacarpal') ||
        lower.includes('metatarsal');

      if (isExtracranialBody) {
        child.visible = false;
        return;
      }

      // Check for teeth in the skull model
      const toothFdi = ToothPositionResolver.getFdiFromMeshNodeName(name);
      if (toothFdi) {
        child.userData.toothFdi = toothFdi;
        // Hide the active wisdom tooth (38 or 48) because our interactive AnatomicalMolarMesh renders it
        if (toothFdi === activeToothFdi) {
          child.visible = false;
          return;
        }

        // Adjacent second molars (37, 47) rendered with semi-transparent clinical context
        const isAdjacentMolar = toothFdi === 37 || toothFdi === 47;
        if (isAdjacentMolar) {
          child.visible = true;
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#e2e8f0'),
            roughness: 0.35,
            metalness: 0.02,
            transparent: true,
            opacity: 0.45,
            depthWrite: true
          });
          return;
        }

        // Other teeth: subtle context ghost
        child.visible = true;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#94a3b8'),
          roughness: 0.60,
          metalness: 0.01,
          transparent: true,
          opacity: 0.12,
          depthWrite: false
        });
        return;
      }

      // Mandible and jaw bones
      const isMandible = lower.includes('mandib');
      if (isMandible) {
        child.visible = true;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#f4ede2'),
          roughness: 0.65,
          metalness: 0.02,
          transparent: true,
          opacity: Math.min(boneOpacity, 0.45),
          depthWrite: boneOpacity > 0.8
        });
        return;
      }

      // Distant cranial skull bones (maxilla, temporal, zygoma, occipital)
      if (showSkull) {
        child.visible = true;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#e2e8f0'),
          roughness: 0.70,
          metalness: 0.02,
          transparent: true,
          opacity: 0.06,
          depthWrite: false
        });
      } else {
        child.visible = false;
      }
    });

    return scene;
  }, [skullGltf, activeToothFdi, boneOpacity, showSkull]);

  return <primitive object={cleanedSkull} position={[0, 0, 0]} />;
};

// ============================================================================
// 2. SURGICAL SITE MESH: IMPACTED R48/R38, IAN CANAL & 6-STEP SIMULATION
// Completely aligned to Canonical Metric Craniofacial Coordinates
// ============================================================================
const MandibularSurgicalSiteMesh: React.FC<{
  toothId: 'tooth_38' | 'tooth_48';
  winterType: 'mesioangular' | 'horizontal' | 'vertical' | 'distoangular';
  pellClass: 'I' | 'II' | 'III';
  pellPos: 'A' | 'B' | 'C';
  surgicalStep: number;
  showNerves: boolean;
  showDebugCoords: boolean;
}> = ({ toothId, winterType, pellClass, pellPos, surgicalStep, showNerves, showDebugCoords }) => {
  const isRight = toothId === 'tooth_48';
  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const coords = CoordinateAlignmentValidator.CANONICAL_COORDINATES;

  // Canonical base socket position:
  // R48 (Patient Right): [0.0118, 0.7580, 0.0295]
  // R38 (Patient Left):  [0.0784, 0.7580, 0.0295]
  const baseToothPos: [number, number, number] = isRight
    ? coords.tooth48.socketPos
    : coords.tooth38.socketPos;

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

  // Load verified master cranial nerve assets (Z-Anatomy CC BY-SA 4.0)
  const cranialNervesGltf = useGLTF('/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb', '/draco/');

  // Correct Anatomical Laterality: .r for patient right (R48), .l for patient left (R38)
  const ianNodeName = isRight ? 'Inferior alveolar nerve.r' : 'Inferior alveolar nerve.l';
  const lingualNodeName = isRight ? 'Lingual nerve.r' : 'Lingual nerve.l';

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

  // Apex of tooth root in mandibular bone
  const toothApexPos: [number, number, number] = [
    toothPos[0],
    toothPos[1] - 0.009,
    toothPos[2] - 0.003
  ];

  // Closest IAN canal point beneath tooth in canonical craniofacial space
  const canalTargetPos: [number, number, number] = isRight
    ? [0.0150, 0.7460, 0.0300]
    : [0.0752, 0.7460, 0.0300];

  // Foramen positions in canonical metric coordinates
  const spixPos: [number, number, number] = isRight
    ? coords.mandibularForamenRight.center
    : coords.mandibularForamenLeft.center;

  const mentalPos: [number, number, number] = isRight
    ? coords.mentalRight.center
    : coords.mentalLeft.center;

  const lingualPos: [number, number, number] = isRight
    ? coords.lingualRight.center
    : coords.lingualLeft.center;

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
    <group position={[0, 0, 0]}>
      {/* 1. THẦN KINH RĂNG DƯỚI (IAN) & THẦN KINH LƯỠI */}
      {showNerves && (
        <group>
          {/* IAN Main Trunk inside Mandibular Canal */}
          {realIanGeometry && (
            <mesh geometry={realIanGeometry}>
              <meshStandardMaterial
                color="#f59e0b"
                emissive="#f59e0b"
                emissiveIntensity={0.8}
                roughness={0.3}
              />
            </mesh>
          )}

          {/* Lingual Nerve running medially along lingual plate */}
          {realLingualGeometry && (
            <mesh geometry={realLingualGeometry}>
              <meshStandardMaterial
                color="#fb7185"
                emissive="#e11d48"
                emissiveIntensity={0.6}
                roughness={0.4}
              />
            </mesh>
          )}

          {/* Canonical Landmark points: Spix, Mental, Lingual */}
        </group>
      )}

      {/* 2. REAL-TIME PROXIMITY LINE & MEASUREMENT */}
      <group>
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
      </group>

      {/* 3. RĂNG KHÔN NGẦM GIẢI PHẪU 3D (ANATOMICAL MOLAR 3D) */}
      <group>
        <AnatomicalMolarMesh
          position={toothPos}
          rotation={toothRotation}
          scale={1.0}
          isRightSide={isRight}
          isSectioned={isOdontotomyCut}
          isSeparated={isToothElevated}
          elevationOffset={isToothElevated ? [isRight ? -0.008 : 0.008, 0.015, 0.006] : [0, 0, 0]}
        />
      </group>

      {/* 4. GÂY TÊ VÙNG SPIX (Step 1) */}
      {isAnesthetized && (
        <group position={spixPos}>
          {/* Bơm tiêm & Kim nha khoa 27G hướng vào lỗ hàm dưới từ phía răng cối nhỏ đối bên */}
          <DentalSyringe3D
            position={[isRight ? -0.004 : 0.004, 0.008, -0.006]}
            rotation={[-0.8, isRight ? -0.5 : 0.5, 0.2]}
          />
          {/* Quầng thuốc tê phát quang quanh gai Spix */}
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
        </group>
      )}

      {/* 5. ĐƯỜNG RẠCH & VẠT MÀNG XƯƠNG (Step 2) */}
      {isFlapReflected && (
        <group position={[toothPos[0] + (isRight ? -0.001 : 0.001), toothPos[1] + 0.002, toothPos[2] + 0.002]}>
          <MucoperiostealFlap3D position={[0, 0, 0]} isRightSide={isRight} />
          <PeriostealElevator3D
            position={[isRight ? -0.004 : 0.004, 0.006, 0.004]}
            rotation={[0.3, isRight ? 0.5 : -0.5, 0.1]}
          />
        </group>
      )}

      {/* 6. MỞ XƯƠNG TẠO RÃNH MÁ (Step 3) */}
      {isBoneGuttered && (
        <group position={[toothPos[0] + (isRight ? -0.003 : 0.003), toothPos[1], toothPos[2]]}>
          <BoneGutteringTrough3D position={[0, 0, 0]} isRightSide={isRight} />
          {surgicalStep === 3 && (
            <SurgicalBurHandpiece3D
              position={[isRight ? -0.002 : 0.002, 0.006, 0.003]}
              rotation={[0.35, isRight ? 0.4 : -0.4, 0]}
            />
          )}
        </group>
      )}

      {/* 7. CHIA CẮT THÂN RĂNG (Step 4) */}
      {isOdontotomyCut && surgicalStep === 4 && (
        <group position={[toothPos[0] + (isRight ? -0.002 : 0.002), toothPos[1] + 0.004, toothPos[2]]}>
          <SurgicalBurHandpiece3D
            position={[0, 0.002, 0]}
            rotation={[0.65, isRight ? 0.25 : -0.25, 0]}
          />
        </group>
      )}

      {/* 8. BẨY RĂNG (Step 5) */}
      {isToothElevated && !isSutured && (
        <group position={[toothPos[0] + (isRight ? -0.002 : 0.002), toothPos[1] - 0.001, toothPos[2] + 0.001]}>
          <CryerElevator3D
            position={[isRight ? -0.001 : 0.001, -0.002, 0.001]}
            rotation={[0.35, isRight ? 0.45 : -0.45, 0.15]}
            isRightSide={isRight}
          />
          {/* Mũi tên vector lực bẩy */}
          <mesh position={[isRight ? 0.004 : -0.004, 0.012, 0.004]} rotation={[0.4, isRight ? 0.3 : -0.3, 0]}>
            <cylinderGeometry args={[0.0004, 0.0004, 0.010, 8]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[isRight ? 0.005 : -0.005, 0.017, 0.006]} rotation={[0.4, isRight ? 0.3 : -0.3, 0]}>
            <coneGeometry args={[0.0012, 0.003, 8]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}

      {/* 9. KHÂU ĐÓNG VẠT (Step 6) */}
      {isSutured && (
        <group position={[toothPos[0], toothPos[1] + 0.003, toothPos[2]]}>
          <SurgicalSutureStitch3D
            position={[0, 0.001, -0.006]}
            rotation={[0, isRight ? 0.3 : -0.3, 0]}
            scale={1.0}
          />
          <SurgicalSutureStitch3D
            position={[isRight ? -0.002 : 0.002, -0.001, 0.003]}
            rotation={[0, isRight ? -0.2 : 0.2, 0]}
            scale={0.95}
          />
          <SurgicalSutureStitch3D
            position={[0, -0.003, 0.009]}
            rotation={[0, isRight ? 0.1 : -0.1, 0]}
            scale={0.9}
          />
        </group>
      )}

      {/* 10. DEBUG COORDINATES HELPER: 3D AXES */}
      {showDebugCoords && (
        <group>
          {/* Socket Axes Helper: Red=X (Sagittal), Green=Y (Coronal), Blue=Z (Axial) */}
          <axesHelper args={[0.03]} position={toothPos} />
          <axesHelper args={[0.02]} position={spixPos} />
          <axesHelper args={[0.02]} position={mentalPos} />
        </group>
      )}
    </group>
  );
};

// ============================================================================
// 3. SMOOTH CAMERA GLIDE CONTROLLER WITH CANCELABLE TOKENS & FAILSAFE
// ============================================================================
const WisdomCameraController: React.FC<{ controlsRef: React.RefObject<any> }> = ({ controlsRef }) => {
  const { camera } = useThree();
  const cameraTarget = useDentalNeuroStore((s) => s.cameraTarget);

  const animRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 500,
    requestId: 0,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    lastTimestamp: 0
  });

  React.useEffect(() => {
    if (!cameraTarget || cameraTarget.timestamp === animRef.current.lastTimestamp) return;

    const [px, py, pz] = cameraTarget.position;
    const [lx, ly, lz] = cameraTarget.lookAt;

    // Bounds safety: reject NaN, Infinity, or degenerate coordinates
    if (!Number.isFinite(px) || !Number.isFinite(py) || !Number.isFinite(pz) ||
        !Number.isFinite(lx) || !Number.isFinite(ly) || !Number.isFinite(lz)) {
      return;
    }

    const reqId = DentalCameraFocusController.nextRequestId();
    animRef.current.requestId = reqId;
    animRef.current.lastTimestamp = cameraTarget.timestamp;

    // Smooth transition from current live camera state (prevents teleporting/jumping)
    animRef.current.startPos.copy(camera.position);
    animRef.current.endPos.set(px, py, pz);

    const controls = controlsRef.current;
    if (controls) {
      animRef.current.startTarget.copy(controls.target);
      animRef.current.endTarget.set(lx, ly, lz);
    } else {
      animRef.current.startTarget.set(lx, ly, lz);
      animRef.current.endTarget.set(lx, ly, lz);
    }

    animRef.current.startTime = performance.now();
    animRef.current.isAnimating = true;
  }, [cameraTarget, camera, controlsRef]);

  useFrame(() => {
    if (!animRef.current.isAnimating) return;

    // Invalidate if a newer focus request was initiated
    if (!DentalCameraFocusController.isCurrentRequest(animRef.current.requestId)) {
      animRef.current.isAnimating = false;
      return;
    }

    const elapsed = performance.now() - animRef.current.startTime;
    const progress = Math.min(elapsed / animRef.current.duration, 1.0);
    // Cubic ease-out
    const t = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(animRef.current.startPos, animRef.current.endPos, t);

    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerpVectors(animRef.current.startTarget, animRef.current.endTarget, t);
      controls.update();
    }

    if (progress >= 1.0) {
      animRef.current.isAnimating = false;
    }
  });

  return null;
};

// ============================================================================
// MEDICAL 3D LOADING OVERLAY (NO BLACK SCREEN)
// ============================================================================
const Medical3DLoadingOverlay: React.FC = () => (
  <Html center>
    <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-md">
      <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <span className="text-amber-300 text-[11px] font-mono tracking-wide font-medium whitespace-nowrap">
        Đang tải mô hình giải phẫu sọ hàm & dây thần kinh 3D...
      </span>
    </div>
  </Html>
);

// ============================================================================
// 4. MAIN COMPONENT: WISDOM SURGERY STAGE
// ============================================================================
export const WisdomSurgeryStage: React.FC = () => {
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';
  const controlsRef = useRef<any>(null);

  const [showFullSkull, setShowFullSkull] = useState(true);
  const [showDebugCoords, setShowDebugCoords] = useState(false);

  const wisdomToothId = useDentalNeuroStore((s) => s.wisdomToothId);
  const setWisdomToothId = useDentalNeuroStore((s) => s.setWisdomToothId);

  const wisdomWinterType = useDentalNeuroStore((s) => s.wisdomWinterType);
  const wisdomPellGregoryClass = useDentalNeuroStore((s) => s.wisdomPellGregoryClass);
  const wisdomPellGregoryPos = useDentalNeuroStore((s) => s.wisdomPellGregoryPos);

  const wisdomSurgicalStep = useDentalNeuroStore((s) => s.wisdomSurgicalStep);
  const setWisdomSurgicalStep = useDentalNeuroStore((s) => s.setWisdomSurgicalStep);

  const wisdomShowNerves = useDentalNeuroStore((s) => s.wisdomShowNerves);
  const wisdomBoneOpacity = useDentalNeuroStore((s) => s.wisdomBoneOpacity);

  const wisdomViewMode = useDentalNeuroStore((s) => s.wisdomViewMode);
  const setWisdomViewMode = useDentalNeuroStore((s) => s.setWisdomViewMode);

  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const focusAnatomy = useDentalNeuroStore((s) => s.focusAnatomy);
  const setCameraTarget = useDentalNeuroStore((s) => s.setCameraTarget);

  const isRight = wisdomToothId === 'tooth_48';
  const activeToothFdi = isRight ? 48 : 38;

  const coords = CoordinateAlignmentValidator.CANONICAL_COORDINATES;
  const canonicalToothPos: [number, number, number] = isRight
    ? coords.tooth48.socketPos
    : coords.tooth38.socketPos;

  const currentStep =
    WISDOM_SURGICAL_DATABASE.surgicalSteps.find((s) => s.stepNumber === wisdomSurgicalStep) ||
    WISDOM_SURGICAL_DATABASE.surgicalSteps[0];

  const isOdontotomyCut = wisdomSurgicalStep >= 4;
  const isToothElevated = wisdomSurgicalStep >= 5;

  const distToCanalMm = useMemo(() => {
    let dist = 2.5;
    if (wisdomWinterType === 'mesioangular') dist = 1.1;
    else if (wisdomWinterType === 'horizontal') dist = 0.5;
    else if (wisdomWinterType === 'distoangular') dist = 1.8;
    else dist = 3.2;

    if (wisdomPellGregoryPos === 'B') dist = Math.max(0.4, dist - 0.7);
    else if (wisdomPellGregoryPos === 'C') dist = Math.max(0.2, dist - 1.4);

    return dist;
  }, [wisdomWinterType, wisdomPellGregoryPos]);

  // Responsive viewer container sizing
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 1280,
    height: 720
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setContainerSize({
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          });
        }
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // 3D Projected Labels state and context toggle
  const [rawLabels, setRawLabels] = useState<RawProjectedLabel[]>([]);
  const [showContextLabels, setShowContextLabels] = useState<boolean>(true);

  // 3D Anchors for projected Anatomy Labels
  const labelAnchors = useMemo<LabelAnchorDefinition[]>(() => {
    const isTooth48 = wisdomToothId === 'tooth_48';
    const isSelectedTooth =
      selectedAnatomyId === wisdomToothId ||
      selectedAnatomyId === 'tooth_48' ||
      selectedAnatomyId === 'tooth_38' ||
      (selectedAnatomyId?.startsWith('tooth.') && selectedAnatomyId.includes(isTooth48 ? '48' : '38'));

    const anchors: LabelAnchorDefinition[] = [
      {
        id: wisdomToothId,
        nameVi: isTooth48 ? 'R.48 (Răng khôn dưới phải)' : 'R.38 (Răng khôn dưới trái)',
        nameEn: isTooth48 ? 'Mandibular Right 3rd Molar' : 'Mandibular Left 3rd Molar',
        subtitle: isToothElevated ? 'Đã bẩy' : isOdontotomyCut ? 'Đã cắt' : 'Răng ngầm',
        worldPos: isTooth48 ? coords.tooth48.socketPos : coords.tooth38.socketPos,
        priority: isSelectedTooth ? 1 : 2,
        isSelected: isSelectedTooth
      },
      {
        id: 'nerve_ian',
        nameVi: isRight ? 'TK Huyệt răng dưới (IAN.r)' : 'TK Huyệt răng dưới (IAN.l)',
        nameEn: 'Inferior Alveolar Nerve',
        worldPos: isRight ? coords.ianRight.center : coords.ianLeft.center,
        priority: selectedAnatomyId === 'nerve_ian' ? 1 : 2,
        isSelected: selectedAnatomyId === 'nerve_ian',
        isCritical: true
      },
      {
        id: 'mandibular_canal',
        nameVi: isRight ? 'Ống hàm dưới P' : 'Ống hàm dưới T',
        nameEn: 'Mandibular Canal',
        worldPos: isRight ? coords.ianRight.center : coords.ianLeft.center,
        priority: selectedAnatomyId === 'mandibular_canal' ? 1 : 2,
        isSelected: selectedAnatomyId === 'mandibular_canal',
        isCritical: true
      },
      {
        id: 'nerve_lingual',
        nameVi: isRight ? 'TK Lưỡi (Lingual.r)' : 'TK Lưỡi (Lingual.l)',
        nameEn: 'Lingual Nerve',
        worldPos: isRight ? coords.lingualRight.center : coords.lingualLeft.center,
        priority: selectedAnatomyId === 'nerve_lingual' ? 1 : 3,
        isSelected: selectedAnatomyId === 'nerve_lingual'
      },
      {
        id: 'mental_foramen',
        nameVi: isRight ? 'Lỗ cằm P (Mental)' : 'Lỗ cằm T (Mental)',
        nameEn: 'Mental Foramen',
        worldPos: isRight ? coords.mentalRight.center : coords.mentalLeft.center,
        priority: selectedAnatomyId === 'mental_foramen' ? 1 : 3,
        isSelected: selectedAnatomyId === 'mental_foramen'
      },
      {
        id: 'mandibular_foramen',
        nameVi: isRight ? 'Lỗ hàm dưới (Gai Spix.r)' : 'Lỗ hàm dưới (Gai Spix.l)',
        nameEn: 'Mandibular Foramen (Spix)',
        worldPos: isRight ? coords.mandibularForamenRight.center : coords.mandibularForamenLeft.center,
        priority: selectedAnatomyId === 'mandibular_foramen' ? 1 : 3,
        isSelected: selectedAnatomyId === 'mandibular_foramen'
      },
      {
        id: 'bone_mandible',
        nameVi: 'Xương hàm dưới (Mandible)',
        nameEn: 'Mandible Bone',
        worldPos: coords.mandible.center,
        priority: selectedAnatomyId === 'bone_mandible' || selectedAnatomyId === 'mandible' ? 1 : 3,
        isSelected: selectedAnatomyId === 'bone_mandible' || selectedAnatomyId === 'mandible'
      }
    ];

    return anchors;
  }, [wisdomToothId, selectedAnatomyId, isToothElevated, isOdontotomyCut, isRight, coords]);

  // Compute placed labels with collision avoidance
  const placedLabels = useMemo(() => {
    const obstacles: LayoutObstacle[] = [
      {
        id: 'top-controls',
        type: 'top-controls',
        ...TopControlsManager.getBounds(containerSize.width)
      },
      {
        id: 'bottom-toolbar',
        type: 'bottom-toolbar',
        ...ToolbarSafeArea.getBounds(containerSize.width, containerSize.height)
      }
    ];

    return LabelLayoutManager.resolveLayout(rawLabels, obstacles, {
      containerWidth: containerSize.width,
      containerHeight: containerSize.height,
      showContext: showContextLabels,
      maxVisibleLabels: containerSize.width < 640 ? 3 : containerSize.width < 1024 ? 4 : 6
    });
  }, [rawLabels, containerSize, showContextLabels]);

  // Camera inspection presets calculated from canonical coordinates
  const handleCameraPreset = (preset: DentalViewPreset) => {
    const currentId = selectedAnatomyId || wisdomToothId;
    const target = DentalTargetResolver.resolveTarget(currentId, null, { isRight });
    const framing = DentalCameraFocusController.calculateCameraFraming(target, preset, 30);
    setCameraTarget(framing.position, framing.lookAt, framing.distance);
  };

  // Initial camera position centered on dental arch
  const initialCamPos: [number, number, number] = isRight
    ? [-0.045, 0.795, 0.110]
    : [0.135, 0.795, 0.110];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* 1. TOP CONTROLS STACK (Zone A: Structure Navigation + Zone B: View Controls & Presets) */}
      <div
        data-ui="top-controls-stack"
        className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[calc(100vw-32px)] sm:max-w-[calc(100%-140px)] flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-none select-none"
      >
        {/* Zone A: Structure Navigation (Row 1) */}
        <div
          className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md shadow-lg overflow-x-auto scrollbar-none flex-nowrap max-w-full pointer-events-auto ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/95 border-[#dfd5c6]'
          }`}
        >
          {[
            { id: 'tooth_48', label: 'R.48' },
            { id: 'tooth_38', label: 'R.38' },
            { id: 'bone_mandible', label: 'Xương hàm dưới' },
            { id: 'nerve_ian', label: 'TK Huyệt răng dưới' },
            { id: 'nerve_lingual', label: 'TK Lưỡi' },
            { id: 'mandibular_canal', label: 'Ống hàm dưới' },
            { id: 'mental_foramen', label: 'Lỗ cằm' }
          ].map((chip) => {
            const isSelected =
              selectedAnatomyId === chip.id ||
              (chip.id === 'tooth_48' && wisdomToothId === 'tooth_48' && (selectedAnatomyId?.startsWith('tooth_') || selectedAnatomyId?.startsWith('tooth.'))) ||
              (chip.id === 'tooth_38' && wisdomToothId === 'tooth_38' && (selectedAnatomyId?.startsWith('tooth_') || selectedAnatomyId?.startsWith('tooth.')));
            return (
              <button
                key={chip.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (chip.id === 'tooth_48' || chip.id === 'tooth_38') {
                    setWisdomToothId(chip.id as any);
                  }
                  selectAnatomy(chip.id);
                  focusAnatomy(chip.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400/40'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-700 hover:bg-[#ede3d5] hover:text-[#28231d]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}

          {/* Context Toggle (Bối cảnh: BẬT / TẮT) */}
          <div className="w-px h-3.5 bg-slate-700 mx-0.5" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowContextLabels(!showContextLabels);
            }}
            className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition cursor-pointer whitespace-nowrap border ${
              showContextLabels
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Bật/Tắt hiển thị nhãn các cấu trúc bối cảnh lân cận"
          >
            <Layers className="w-3 h-3 inline mr-1" />
            {showContextLabels ? 'Bối cảnh: BẬT' : 'Bối cảnh: TẮT'}
          </button>
        </div>

        {/* Zone B: View Presets & Modes (Row 2, guaranteed below Row 1 with 8px gap) */}
        <div
          className={`flex items-center justify-center gap-1.5 p-1 rounded-2xl border backdrop-blur-md shadow-lg overflow-x-auto scrollbar-none flex-nowrap max-w-full pointer-events-auto ${
            isDark ? 'bg-slate-900/85 border-slate-800 text-slate-200' : 'bg-[#f7f2ea]/90 border-[#dfd5c6] text-slate-700'
          } text-[10px]`}
        >
          <span className="px-1.5 font-mono text-[9px] text-amber-400 font-bold tracking-wider uppercase flex items-center gap-1 flex-shrink-0">
            <Eye className="w-3 h-3 text-amber-400" />
            Góc nhìn:
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); handleCameraPreset('occlusal'); }}
            className="px-2 py-0.5 rounded-lg font-medium transition hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 cursor-pointer whitespace-nowrap"
            title="Nhìn thẳng từ trên xuống mặt nhai"
          >
            Mặt Nhai (Occlusal)
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleCameraPreset('buccal'); }}
            className="px-2 py-0.5 rounded-lg font-medium transition hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 cursor-pointer whitespace-nowrap"
            title="Nhìn từ phía má vào thân răng"
          >
            Phía Má (Buccal)
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleCameraPreset('lingual'); }}
            className="px-2 py-0.5 rounded-lg font-medium transition hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 cursor-pointer whitespace-nowrap"
            title="Nhìn từ phía lưỡi vào mặt trong"
          >
            Phía Lưỡi (Lingual)
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleCameraPreset('closeup'); }}
            className="px-2 py-0.5 rounded-lg font-bold transition bg-amber-600/25 text-amber-300 hover:bg-amber-600/40 border border-amber-500/40 cursor-pointer whitespace-nowrap"
            title="Cận cảnh chóp răng và thần kinh IAN"
          >
            Cận Cảnh (Close-up)
          </button>

          <div className="w-px h-3.5 bg-slate-700 mx-0.5" />

          {/* View Modes */}
          <div className="flex rounded-lg p-0.5 bg-black/30">
            {[
              { id: 'standard', label: 'Chuẩn' },
              { id: 'bone_only', label: 'Xương & Răng' },
              { id: 'neural', label: 'Thần kinh' },
              { id: 'deep', label: 'Cắt lớp' }
            ].map((v) => (
              <button
                key={v.id}
                onClick={(e) => { e.stopPropagation(); setWisdomViewMode(v.id as any); }}
                className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition cursor-pointer whitespace-nowrap ${
                  wisdomViewMode === v.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-current'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="w-px h-3.5 bg-slate-700 mx-0.5" />

          {/* Skull context toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowFullSkull(!showFullSkull); }}
            className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition cursor-pointer whitespace-nowrap border ${
              showFullSkull
                ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Bật/Tắt mô hình xương sọ nền"
          >
            {showFullSkull ? 'Xương: BẬT' : 'Xương: TẮT'}
          </button>

          {/* Debug Coordinate Toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowDebugCoords(!showDebugCoords); }}
            className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold transition cursor-pointer whitespace-nowrap border ${
              showDebugCoords
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Bật/Tắt toạ độ & trục không gian 3D chuẩn"
          >
            <Compass className="w-3 h-3 inline mr-1" />
            {showDebugCoords ? 'Toạ độ: ON' : 'Toạ độ: OFF'}
          </button>
        </div>
      </div>

      {/* Floating 3D Telemetry HUD (Rendered cleanly in 2D space when enabled, outside canvas) */}
      {showDebugCoords && (
        <div className="absolute top-28 left-4 z-20 p-2.5 rounded-2xl bg-slate-950/90 border border-emerald-500/70 text-emerald-400 text-[9px] font-mono shadow-2xl backdrop-blur-md pointer-events-auto select-text animate-fade-in max-w-xs">
          <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5 border-b border-emerald-500/30 pb-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            DENTAL VIEW TELEMETRY
          </div>
          <div>🎯 Cấu trúc: {selectedAnatomyId || wisdomToothId}</div>
          <div>📍 Huyệt răng: [{canonicalToothPos.map((n) => n.toFixed(4)).join(', ')}]m</div>
          <div>⚡ Khoảng cách IAN: {distToCanalMm.toFixed(2)}mm</div>
          <div>👁️ Thần kinh: {wisdomShowNerves ? 'HIỂN THỊ' : 'ẨN'}</div>
          <div>📐 Viewport: {containerSize.width} × {containerSize.height}px</div>
        </div>
      )}

      {/* 2. 3D WEBGL CANVAS STAGE (CLEAN & UNOBSTRUCTED) */}
      <Canvas
        shadows
        camera={{ position: initialCamPos, fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<Medical3DLoadingOverlay />}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[isRight ? 0.3 : -0.3, 1.2, 0.4]} intensity={2.0} castShadow />
          <directionalLight position={[isRight ? -0.3 : 0.3, 0.6, -0.3]} intensity={0.8} />
          <pointLight position={[canonicalToothPos[0], canonicalToothPos[1] + 0.05, canonicalToothPos[2] + 0.08]} intensity={1.5} color="#fffef7" />

          {/* Canonical 3D Master Skull / Mandible Context */}
          <CanonicalSkullSurgeryContext
            showSkull={showFullSkull}
            boneOpacity={wisdomBoneOpacity}
            activeToothFdi={activeToothFdi}
          />

          {/* Surgical Site: Impacted Tooth, IAN Tube, Proximity Line, 6 Steps */}
          <MandibularSurgicalSiteMesh
            toothId={wisdomToothId}
            winterType={wisdomWinterType}
            pellClass={wisdomPellGregoryClass}
            pellPos={wisdomPellGregoryPos}
            surgicalStep={wisdomSurgicalStep}
            showNerves={wisdomShowNerves}
            showDebugCoords={showDebugCoords}
          />

          {/* 3D Anatomy Label Projector (calculates screen coordinates in real time) */}
          <DentalAnatomyLabelProjector
            anchors={labelAnchors}
            onProject={setRawLabels}
          />

          {/* Dynamic Camera Glide & Orbit Controls */}
          <WisdomCameraController controlsRef={controlsRef} />
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={0.02}
            maxDistance={0.35}
            target={canonicalToothPos}
          />
        </Suspense>
      </Canvas>

      {/* 3. ANATOMY LABELS LAYER (2D Projected with Collision Avoidance) */}
      <AnatomyLabelLayer
        labels={placedLabels}
        selectedId={selectedAnatomyId}
        onSelect={(id) => {
          if (id === 'tooth_48' || id === 'tooth_38') {
            setWisdomToothId(id as any);
          }
          selectAnatomy(id);
          focusAnatomy(id);
        }}
      />

      {/* 4. BOTTOM SLEEK SURGICAL STEP CONTROLLER (Protected Safe Area) */}
      <div
        data-ui="bottom-toolbar"
        id="medanatomy-bottom-toolbar"
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-xl pointer-events-auto bg-slate-900/90 border-slate-800 text-slate-200"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWisdomSurgicalStep(Math.max(1, wisdomSurgicalStep - 1));
          }}
          disabled={wisdomSurgicalStep <= 1}
          className="p-1 rounded-full text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          title="Bước trước"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0">
            {wisdomSurgicalStep}
          </span>
          <span className="text-xs font-semibold text-slate-200 truncate max-w-[180px] sm:max-w-xs">
            {currentStep.titleVi}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5, 6].map((st) => (
            <button
              key={st}
              onClick={(e) => {
                e.stopPropagation();
                setWisdomSurgicalStep(st);
              }}
              className={`w-4 h-4 rounded-full text-[9px] font-mono font-bold transition cursor-pointer ${
                wisdomSurgicalStep === st
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setWisdomSurgicalStep(Math.min(6, wisdomSurgicalStep + 1));
          }}
          disabled={wisdomSurgicalStep >= 6}
          className="p-1 rounded-full text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
          title="Bước tiếp theo"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// Preload master 3D assets
useGLTF.preload('/models/craniofacial/skull/skull_complete.glb', '/draco/');
useGLTF.preload('/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb', '/draco/');
useGLTF.preload('/models/dental/mandibular_third_molar_48.glb');
useGLTF.preload('/models/dental/mandibular_third_molar_38.glb');
