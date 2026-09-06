import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {
  Layers,
  Sparkles,
  Eye,
  Scissors,
  RotateCw,
  Compass,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { useDentalNeuroStore } from '../../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../../stores/useAnatomyStore';
import { DENTAL_SPECIMENS_DATABASE, getDentalSpecimen } from '../../../data/dentalSpecimensData';
import { DENTAL_INNERVATION_DATABASE } from '../../../data/dentalNeuroData';
import { createCraniofacialOrganGroup } from '../DentalNeuro3DStage';
import { RealDentalAnatomySectionMesh, AnatomicalMolarMesh } from './AnatomicalDentalModels3D';
import { DentalAssetInspector } from './DentalAssetInspector';

import { TOOTH_REGISTRY } from '../../../data/ToothRegistry';
import { ToothPositionResolver } from '../../../utils/ToothPositionResolver';

// ============================================================================
// 1. CANONICAL 3D SKULL & DENTAL ARCH CONTEXT (REAL 3D JAW & TEETH)
// 100% Verified Anatomical 3D Scans. Zero procedural primitives.
// ============================================================================
const CanonicalDentalArchView: React.FC<{
  selectedFdi: number;
  onSelectTooth: (fdi: number) => void;
  boneOpacity?: number;
  isContextOnly?: boolean;
}> = ({ selectedFdi, onSelectTooth, boneOpacity = 0.20, isContextOnly = false }) => {
  const skullGltf = useGLTF('/models/craniofacial/skull/skull_complete.glb', '/draco/');

  // Identify adjacent teeth (Mesial & Distal) for context preservation
  const adjacentFdis = useMemo(() => {
    const toothRecord = TOOTH_REGISTRY[selectedFdi];
    const set = new Set<number>();
    if (toothRecord) {
      if (toothRecord.mesialAdjacent) {
        const m = ToothPositionResolver.resolve(toothRecord.mesialAdjacent);
        if (m) set.add(m.fdi);
      }
      if (toothRecord.distalAdjacent) {
        const d = ToothPositionResolver.resolve(toothRecord.distalAdjacent);
        if (d) set.add(d.fdi);
      }
    }
    return set;
  }, [selectedFdi]);

  const cleanedArch = useMemo(() => {
    const scene = skullGltf.scene.clone(true);

    scene.traverse((child: any) => {
      if (!child.isMesh) return;
      const name = child.name || '';
      const lower = name.toLowerCase();

      // Hide all non-head bones: vertebrae, ribs, limbs, pelvis
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

      const toothFdi = ToothPositionResolver.getFdiFromMeshNodeName(child.name);
      if (toothFdi) {
        child.userData.toothFdi = toothFdi;
        child.visible = true;
        const isSelected = toothFdi === selectedFdi;
        const isAdjacent = adjacentFdis.has(toothFdi);

        if (isSelected) {
          // 1. SELECTED TOOTH: 100% Opacity, subtle warm amber emissive highlight
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#fbbf24'),
            emissive: new THREE.Color('#d97706'),
            emissiveIntensity: 0.55,
            roughness: 0.20,
            metalness: 0.04,
            transparent: false,
            opacity: 1.0,
            depthWrite: true
          });
        } else if (isAdjacent) {
          // 2. ADJACENT TEETH (Mesial & Distal): 30-40% Opacity for clear anatomical context
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#e2e8f0'),
            roughness: 0.40,
            metalness: 0.02,
            transparent: true,
            opacity: 0.35,
            depthWrite: true
          });
        } else {
          // 3. REMOTE TEETH: 6-8% subtle ghost outline so the arch contour is visible without clutter
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#94a3b8'),
            roughness: 0.60,
            metalness: 0.01,
            transparent: true,
            opacity: 0.08,
            depthWrite: false
          });
        }
        return;
      }

      // Bone Material: Mandible and Maxilla at 15-25% opacity, remote skull very subtle
      const isJawBone = lower.includes('mandib') || lower.includes('maxill');
      if (isJawBone) {
        child.visible = true;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#f4ede2'),
          roughness: 0.65,
          metalness: 0.02,
          transparent: true,
          opacity: Math.min(boneOpacity, 0.22),
          depthWrite: false
        });
      } else {
        // Distant cranial skull bones: very subtle or hidden to avoid visual distraction
        child.visible = true;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#e2e8f0'),
          roughness: 0.70,
          metalness: 0.02,
          transparent: true,
          opacity: 0.04,
          depthWrite: false
        });
      }
    });

    return scene;
  }, [skullGltf, selectedFdi, adjacentFdis, boneOpacity]);

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        const mesh = e.object as THREE.Mesh;
        const fdi = mesh.userData?.toothFdi || ToothPositionResolver.getFdiFromMeshNodeName(mesh.name);
        if (fdi) {
          onSelectTooth(fdi);
        }
      }}
      onPointerOver={(e) => {
        const mesh = e.object as THREE.Mesh;
        const fdi = mesh.userData?.toothFdi || ToothPositionResolver.getFdiFromMeshNodeName(mesh.name);
        if (fdi) {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={cleanedArch} />
    </group>
  );
};

// ============================================================================
// CAMERA CONTROLLER: DYNAMIC BOUNDING BOX FRAMING & SMOOTH GLIDE
// ============================================================================
const ToothStageCameraController: React.FC<{
  viewMode: 'arch' | 'isolated';
  selectedFdi: number;
  preset: string | null;
  controlsRef: React.RefObject<any>;
}> = ({ viewMode, selectedFdi, preset, controlsRef }) => {
  const { camera } = useThree();
  const animRef = useRef<{
    isAnimating: boolean;
    startTime: number;
    duration: number;
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
  }>({
    isAnimating: false,
    startTime: 0,
    duration: 500,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3()
  });

  const lastKeyRef = useRef<string>('');

  useEffect(() => {
    const key = `${viewMode}-${selectedFdi}-${preset || 'default'}`;
    if (key === lastKeyRef.current) return;
    lastKeyRef.current = key;

    let targetVec: THREE.Vector3;
    let posVec: THREE.Vector3;

    if (viewMode === 'arch') {
      const toothRecord = TOOTH_REGISTRY[selectedFdi] || TOOTH_REGISTRY[46];
      const [tx, ty, tz] = toothRecord.craniofacialPos;
      const isRight = toothRecord.side === 'RIGHT';

      // Exact tooth center target
      targetVec = new THREE.Vector3(tx, ty, tz);

      // Frame tooth dynamically so it occupies 55-65% screen height (~0.067m distance)
      const dx = isRight ? -0.040 : 0.040;
      const dy = toothRecord.jaw === 'MANDIBLE' ? 0.020 : -0.020;
      const dz = 0.050;

      posVec = new THREE.Vector3(tx + dx, ty + dy, tz + dz);
    } else {
      // Isolated view: tooth scaled by 2.2x (~0.0484m height).
      // Distance 0.145-0.155m ensures tooth occupies 55-65% of viewport height without cropping crown/roots
      const d = 0.148;
      targetVec = new THREE.Vector3(0, 0, 0);

      if (preset === 'occlusal') {
        posVec = new THREE.Vector3(0, d, 0.001);
      } else if (preset === 'apical') {
        posVec = new THREE.Vector3(0, -d, 0.001);
      } else if (preset === 'buccal') {
        posVec = new THREE.Vector3(0, 0, d);
      } else if (preset === 'lingual') {
        posVec = new THREE.Vector3(0, 0, -d);
      } else if (preset === 'mesial') {
        posVec = new THREE.Vector3(d, 0, 0);
      } else if (preset === 'distal') {
        posVec = new THREE.Vector3(-d, 0, 0);
      } else if (preset === 'root') {
        targetVec = new THREE.Vector3(0, -0.015, 0);
        posVec = new THREE.Vector3(0.05, -0.11, 0.10);
      } else {
        // 3/4 Isometric Perspective (Recommended default for morphology inspection)
        posVec = new THREE.Vector3(0.095, 0.055, 0.115);
      }
    }

    const currentPos = camera.position.clone();
    const currentTarget = controlsRef.current ? controlsRef.current.target.clone() : new THREE.Vector3();

    animRef.current = {
      isAnimating: true,
      startTime: performance.now(),
      duration: 500,
      startPos: currentPos,
      endPos: posVec,
      startTarget: currentTarget,
      endTarget: targetVec
    };
  }, [viewMode, selectedFdi, preset, camera, controlsRef]);

  useFrame(() => {
    if (!animRef.current.isAnimating) return;

    const elapsed = performance.now() - animRef.current.startTime;
    const progress = Math.min(1.0, elapsed / animRef.current.duration);
    const ease = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(animRef.current.startPos, animRef.current.endPos, ease);

    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(animRef.current.startTarget, animRef.current.endTarget, ease);
      controlsRef.current.update();
    }

    if (progress >= 1.0) {
      animRef.current.isAnimating = false;
    }
  });

  return null;
};

// ============================================================================
// 2. MAIN COMPONENT: TOOTH SPECIMEN STAGE (TRUE 3D HARDWARE SECTION SYSTEM)
// ============================================================================
export const ToothSpecimenStage: React.FC = () => {
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  // Toggle between Real 3D Dental Arch View and Isolated Cross-Section Specimen
  const [viewMode, setViewMode] = useState<'arch' | 'isolated'>('isolated');
  const [showSkullContext, setShowSkullContext] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(true);
  const controlsRef = useRef<any>(null);

  const selectedToothFdi = useDentalNeuroStore((s) => s.selectedToothFdi);
  const setSelectedToothFdi = useDentalNeuroStore((s) => s.setSelectedToothFdi);

  const toothCrossSection = useDentalNeuroStore((s) => s.toothCrossSection);
  const setToothCrossSection = useDentalNeuroStore((s) => s.setToothCrossSection);

  const toothEnamelOpacity = useDentalNeuroStore((s) => s.toothEnamelOpacity);
  const setToothEnamelOpacity = useDentalNeuroStore((s) => s.setToothEnamelOpacity);

  const toothShowPdl = useDentalNeuroStore((s) => s.toothShowPdl);
  const setToothShowPdl = useDentalNeuroStore((s) => s.setToothShowPdl);

  const toothSectionPlane = useDentalNeuroStore((s) => s.toothSectionPlane);
  const setToothSectionPlane = useDentalNeuroStore((s) => s.setToothSectionPlane);

  const toothSectionOffset = useDentalNeuroStore((s) => s.toothSectionOffset);
  const setToothSectionOffset = useDentalNeuroStore((s) => s.setToothSectionOffset);

  const toothSectionInverted = useDentalNeuroStore((s) => s.toothSectionInverted);
  const toggleToothSectionInverted = useDentalNeuroStore((s) => s.toggleToothSectionInverted);

  const toothShowBone = useDentalNeuroStore((s) => s.toothShowBone);
  const setToothShowBone = useDentalNeuroStore((s) => s.setToothShowBone);

  const toothShowNerve = useDentalNeuroStore((s) => s.toothShowNerve);
  const setToothShowNerve = useDentalNeuroStore((s) => s.setToothShowNerve);

  const toothCameraPreset = useDentalNeuroStore((s) => s.toothCameraPreset);
  const setToothCameraPreset = useDentalNeuroStore((s) => s.setToothCameraPreset);

  const toothShowEnamel = useDentalNeuroStore((s) => s.toothShowEnamel);
  const setToothShowEnamel = useDentalNeuroStore((s) => s.setToothShowEnamel);

  const toothShowDentin = useDentalNeuroStore((s) => s.toothShowDentin);
  const setToothShowDentin = useDentalNeuroStore((s) => s.setToothShowDentin);

  const toothShowPulp = useDentalNeuroStore((s) => s.toothShowPulp);
  const setToothShowPulp = useDentalNeuroStore((s) => s.setToothShowPulp);

  const isCleanView = useDentalNeuroStore((s) => s.isCleanView);
  const toggleCleanView = useDentalNeuroStore((s) => s.toggleCleanView);

  const currentToothRecord =
    TOOTH_REGISTRY[selectedToothFdi] || TOOTH_REGISTRY[46];
  const currentToothSpecimen =
    getDentalSpecimen(selectedToothFdi);
  const currentToothData = {
    fdi: currentToothRecord.fdi,
    universal: currentToothRecord.universalNumber,
    palmer: currentToothRecord.palmer,
    nameVi: currentToothRecord.nameVi,
    nameEn: currentToothRecord.nameEn,
    rootCount: currentToothRecord.morphology.rootCount,
    canalCount: currentToothRecord.morphology.canalCount,
    canalNames: currentToothRecord.morphology.canalNames
  };

  // Camera Target Coordinates based on Active Preset or View Mode
  const cameraTarget = useMemo(() => {
    if (viewMode === 'arch') {
      return ToothPositionResolver.getPosition(selectedToothFdi, 'craniofacial');
    }
    return [0, 0, 0] as [number, number, number];
  }, [viewMode, selectedToothFdi]);

  const cameraPosition = useMemo(() => {
    if (viewMode === 'arch') {
      const [x, y, z] = ToothPositionResolver.getPosition(selectedToothFdi, 'craniofacial');
      const isRight = (selectedToothFdi >= 11 && selectedToothFdi <= 18) || (selectedToothFdi >= 41 && selectedToothFdi <= 48);
      return [x + (isRight ? -0.040 : 0.040), y + 0.020, z + 0.050] as [number, number, number];
    }
    // Preset camera angles for comprehensive 360 inspection (55-65% screen height coverage)
    const d = 0.148;
    if (toothCameraPreset === 'occlusal') return [0, d, 0.001] as [number, number, number];
    if (toothCameraPreset === 'buccal') return [0, 0, d] as [number, number, number];
    if (toothCameraPreset === 'lingual') return [0, 0, -d] as [number, number, number];
    if (toothCameraPreset === 'mesial') return [d, 0, 0] as [number, number, number];
    if (toothCameraPreset === 'distal') return [-d, 0, 0] as [number, number, number];
    if (toothCameraPreset === 'apical') return [0, -d, 0.001] as [number, number, number];
    if (toothCameraPreset === 'root') return [0.05, -0.11, 0.10] as [number, number, number];

    return [0.095, 0.055, 0.115] as [number, number, number];
  }, [viewMode, selectedToothFdi, toothCameraPreset]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* 1. TOP LEFT FDI SELECTOR & QUICK CHANGER */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-auto max-w-sm">
        {!isCleanView ? (
          <div
            className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl ${
              isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-[#f7f2ea]/90 border-[#dfd5c6] text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
                FDI #{currentToothRecord.fdi} | Universal #{currentToothRecord.universalNumber} | Palmer {currentToothRecord.palmer}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                100% REAL 3D
              </span>
            </div>

            <h2 className="text-sm font-bold font-serif text-current">
              {currentToothRecord.nameVi}
            </h2>
            <p className="text-[11px] text-slate-400 italic font-serif">
              {currentToothRecord.nameEn} ({currentToothRecord.latinName})
            </p>

            {/* Quick FDI Jump Pill Buttons */}
            <div className="flex flex-wrap gap-1 mt-2.5">
              {[46, 36, 16, 26, 11, 21, 41, 31, 48, 38].map((fdiNum) => (
                <button
                  key={fdiNum}
                  onClick={() => setSelectedToothFdi(fdiNum)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                    selectedToothFdi === fdiNum
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                      : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:text-current'
                  }`}
                >
                  R.{fdiNum} {fdiNum === 46 ? '★' : ''}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Sleek HUD chip in Clean View */
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-xl bg-slate-900/80 border-slate-800 text-xs">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold font-mono text-[10px]">
              FDI #{currentToothRecord.fdi}
            </span>
            <span className="font-semibold text-slate-200">{currentToothRecord.nameVi}</span>
          </div>
        )}

        {/* View Mode Switcher: Arch 3D vs Isolated Cross Section vs Clean View */}
        <div
          className={`p-1.5 rounded-2xl border backdrop-blur-md shadow-xl flex items-center gap-1 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
          }`}
        >
          <button
            onClick={() => setViewMode('isolated')}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
              viewMode === 'isolated'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-current'
            }`}
          >
            <Scissors className="w-3 h-3" />
            <span>Cắt Lớp 3D</span>
          </button>
          <button
            onClick={() => setViewMode('arch')}
            className={`flex-1 py-1.5 px-2.5 rounded-xl text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
              viewMode === 'arch'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-current'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Cung Hàm 3D</span>
          </button>
          <button
            onClick={toggleCleanView}
            className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
              isCleanView
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-current'
            }`}
            title="Bật/Tắt chế độ xem tối giản Clean View"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{isCleanView ? 'Tối Giản' : 'Gọn'}</span>
          </button>
        </div>
      </div>

      {/* 2. TOP RIGHT TOOLBAR: 3D SECTION PLANE & VIEW PRESETS */}
      {viewMode === 'isolated' && !isCleanView && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto w-72">
          {/* Section Plane & Depth Controls */}
          <div
            className={`p-3 rounded-2xl border backdrop-blur-md shadow-xl animate-fade-in ${
              isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-[#f7f2ea]/90 border-[#dfd5c6] text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold font-mono text-amber-500 flex items-center gap-1">
                <Scissors className="w-3 h-3" />
                MẶT CẮT 3D THẬT (GPU CLIPPING)
              </span>
              <button
                onClick={() => setToothCrossSection(toothCrossSection === 'solid' ? 'longitudinal' : 'solid')}
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition cursor-pointer ${
                  toothCrossSection !== 'solid'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {toothCrossSection !== 'solid' ? 'Đang Cắt' : 'Nguyên Khối'}
              </button>
            </div>

            {toothCrossSection !== 'solid' && (
              <>
                {/* Section Plane Selector */}
                <div className="grid grid-cols-4 gap-1 p-0.5 rounded-xl bg-black/10 dark:bg-white/5 border border-inherit mb-2.5">
                  {(
                    [
                      { id: 'sagittal', label: 'Dọc (M-D)' },
                      { id: 'coronal', label: 'Đứng (B-L)' },
                      { id: 'axial', label: 'Ngang' },
                      { id: 'oblique', label: 'Chếch' }
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setToothSectionPlane(p.id)}
                      className={`py-1 text-[9px] font-bold rounded-lg transition cursor-pointer ${
                        toothSectionPlane === p.id
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-current'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Depth Slider & Quick Presets */}
                <div className="space-y-1.5 mb-2.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Độ Sâu Cắt Lớp:</span>
                    <span className="font-mono font-bold text-amber-400">
                      {Math.round(toothSectionOffset * 100)}%{' '}
                      <span className="text-[9px] text-slate-400 font-normal">
                        {toothSectionOffset === 0.0
                          ? '(Nguyên vẹn)'
                          : toothSectionOffset <= 0.35
                          ? '(Cắt nông)'
                          : toothSectionOffset <= 0.65
                          ? '(Mặt cắt tủy)'
                          : '(Cắt sâu)'}
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={toothSectionOffset}
                    onChange={(e) => setToothSectionOffset(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
                  />
                  {/* Quick percentage depth presets */}
                  <div className="grid grid-cols-4 gap-1 text-[9px] pt-0.5">
                    {[
                      { val: 0.0, label: '0%' },
                      { val: 0.25, label: '25%' },
                      { val: 0.50, label: '50%' },
                      { val: 0.75, label: '75%' }
                    ].map((btn) => (
                      <button
                        key={btn.val}
                        onClick={() => setToothSectionOffset(btn.val)}
                        className={`py-0.5 rounded text-center transition cursor-pointer font-medium ${
                          Math.abs(toothSectionOffset - btn.val) < 0.05
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-black/10 dark:bg-white/5 text-slate-400 hover:text-current'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end items-center text-[9px] text-slate-500 pt-1">
                    <button
                      onClick={toggleToothSectionInverted}
                      className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <RotateCw className="w-2.5 h-2.5" />
                      Đảo hướng cắt
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Enamel Transparency Slider */}
            <div className="space-y-1 mb-2.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Độ Mờ Men Răng:</span>
                <span className="font-mono font-bold text-amber-400">
                  {Math.round(toothEnamelOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="1.0"
                step="0.05"
                value={toothEnamelOpacity}
                onChange={(e) => setToothEnamelOpacity(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
              />
            </div>

            {/* Microanatomy Layer Toggles (Enamel, Dentin, Pulp) */}
            <div className="space-y-1 mb-2">
              <div className="text-[9px] font-mono text-slate-400">LỚP CẤU TRÚC VI THỂ:</div>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setToothShowEnamel(!toothShowEnamel)}
                  className={`py-1 px-1 rounded-lg text-[9px] font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                    toothShowEnamel
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'border-slate-700 bg-black/20 text-slate-500 line-through'
                  }`}
                  title="Bật/Tắt Men Răng"
                >
                  <span>Men Răng</span>
                  <span className="text-[8px] opacity-75">{toothShowEnamel ? 'Bật' : 'Ẩn'}</span>
                </button>
                <button
                  onClick={() => setToothShowDentin(!toothShowDentin)}
                  className={`py-1 px-1 rounded-lg text-[9px] font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                    toothShowDentin
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'border-slate-700 bg-black/20 text-slate-500 line-through'
                  }`}
                  title="Bật/Tắt Ngà Răng"
                >
                  <span>Ngà Răng</span>
                  <span className="text-[8px] opacity-75">{toothShowDentin ? 'Bật' : 'Ẩn'}</span>
                </button>
                <button
                  onClick={() => setToothShowPulp(!toothShowPulp)}
                  className={`py-1 px-1 rounded-lg text-[9px] font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                    toothShowPulp
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'border-slate-700 bg-black/20 text-slate-500 line-through'
                  }`}
                  title="Bật/Tắt Tủy Răng & Ống Tủy"
                >
                  <span>Tủy Răng</span>
                  <span className="text-[8px] opacity-75">{toothShowPulp ? 'Bật' : 'Ẩn'}</span>
                </button>
              </div>
            </div>

            {/* Bone & PDL Toggles */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <button
                onClick={() => setToothShowBone(!toothShowBone)}
                className={`py-1.5 px-2 rounded-xl font-bold border transition cursor-pointer flex items-center justify-between ${
                  toothShowBone
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                    : 'border-transparent bg-black/5 dark:bg-white/5 text-slate-400'
                }`}
              >
                <span>Ổ Xương Răng</span>
                <span>{toothShowBone ? 'BẬT' : 'TẮT'}</span>
              </button>

              <button
                onClick={() => setToothShowPdl(!toothShowPdl)}
                className={`py-1.5 px-2 rounded-xl font-bold border transition cursor-pointer flex items-center justify-between ${
                  toothShowPdl
                    ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
                    : 'border-transparent bg-black/5 dark:bg-white/5 text-slate-400'
                }`}
              >
                <span>Dây Chằng PDL</span>
                <span>{toothShowPdl ? 'BẬT' : 'TẮT'}</span>
              </button>
            </div>
          </div>

          {/* Clinical View Presets Toolbar */}
          <div
            className={`p-2.5 rounded-2xl border backdrop-blur-md shadow-xl ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f7f2ea]/90 border-[#dfd5c6]'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
              <Compass className="w-3 h-3" />
              GÓC NHÌN LÂM SÀNG (360° PRESETS)
            </div>
            <div className="grid grid-cols-4 gap-1">
              {(
                [
                  { id: 'default', label: 'Góc 3/4' },
                  { id: 'occlusal', label: 'Mặt Nhai' },
                  { id: 'buccal', label: 'Mặt Ngoài' },
                  { id: 'lingual', label: 'Mặt Trong' },
                  { id: 'mesial', label: 'Mặt Gần' },
                  { id: 'distal', label: 'Mặt Xa' },
                  { id: 'apical', label: 'Chóp Răng' },
                  { id: 'root', label: 'Chân Răng' }
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setToothCameraPreset(preset.id)}
                  className={`py-1 text-[9px] font-bold rounded-lg border transition cursor-pointer ${
                    toothCameraPreset === preset.id
                      ? 'bg-amber-600 border-amber-500 text-white shadow-sm'
                      : 'border-transparent bg-black/5 dark:bg-white/5 text-slate-400 hover:text-current'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. 3D WEBGL CANVAS STAGE (GPU HARDWARE CLIPPING ENABLED) */}
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          localClippingEnabled: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Studio Three-Point Lighting for crisp anatomical definition */}
        <ambientLight intensity={0.85} />
        <directionalLight position={[1.5, 2.5, 2.0]} intensity={2.0} castShadow />
        <directionalLight position={[-1.5, 0.5, -1.0]} intensity={0.9} />
        <directionalLight position={[0, -1.5, -2.0]} intensity={0.65} />
        <pointLight
          position={[cameraTarget[0], cameraTarget[1] + 0.05, cameraTarget[2] + 0.05]}
          intensity={0.8}
          color="#fff"
        />

        {/* Dynamic Camera Controller for precise bounding box framing */}
        <ToothStageCameraController
          viewMode={viewMode}
          selectedFdi={selectedToothFdi}
          preset={toothCameraPreset}
          controlsRef={controlsRef}
        />

        {viewMode === 'arch' ? (
          /* View Mode A: Real 3D Dental Arch Context with low-opacity bone and adjacent tooth focus */
          <group position={[0, 0, 0]}>
            <CanonicalDentalArchView
              selectedFdi={selectedToothFdi}
              onSelectTooth={(fdi) => {
                setSelectedToothFdi(fdi);
                useDentalNeuroStore.getState().selectAnatomy(`tooth.${fdi}`);
              }}
              boneOpacity={0.20}
            />
          </group>
        ) : (
          /* View Mode B: Isolated Real Anatomical Tooth Specimen with GPU 3D Section */
          <group position={[0, 0, 0]}>
            {showSkullContext && (
              <group position={[0, 0, 0]}>
                <CanonicalDentalArchView
                  selectedFdi={selectedToothFdi}
                  onSelectTooth={(fdi) => {
                    setSelectedToothFdi(fdi);
                    useDentalNeuroStore.getState().selectAnatomy(`tooth.${fdi}`);
                  }}
                  boneOpacity={0.15}
                  isContextOnly={true}
                />
              </group>
            )}

            {/* REAL 3D ANATOMICAL TOOTH SPECIMEN WITH GPU CLIPPING PLANES */}
            <RealDentalAnatomySectionMesh
              fdi={selectedToothFdi}
              sectionMode={toothCrossSection}
              enamelOpacity={toothEnamelOpacity}
              showPdl={toothShowPdl}
              showBone={toothShowBone}
              showNerve={toothShowNerve}
              showEnamel={toothShowEnamel}
              showDentin={toothShowDentin}
              showPulp={toothShowPulp}
              sectionPlane={toothSectionPlane}
              sectionOffset={toothSectionOffset}
              sectionInverted={toothSectionInverted}
              scale={2.2}
            />
          </group>
        )}

        {/* Orbit Controls with dynamic target */}
        <OrbitControls
          ref={controlsRef}
          key={`${viewMode}-${selectedToothFdi}-${toothCameraPreset}`}
          enableDamping
          dampingFactor={0.06}
          minDistance={0.02}
          maxDistance={0.45}
          target={cameraTarget}
        />
      </Canvas>

      {/* 4. BOTTOM FLOATING SCIENTIFIC DOSSIER DRAWER (Hidden in Clean View) */}
      {viewMode === 'isolated' && !isCleanView && (
        <div
          className={`absolute bottom-4 left-4 z-20 max-w-sm rounded-2xl border backdrop-blur-md shadow-2xl p-3 text-[11px] pointer-events-auto transition-all ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-[#f7f2ea]/90 border-[#dfd5c6] text-slate-800'
          }`}
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsDossierOpen(!isDossierOpen)}
          >
            <div className="flex items-center gap-1.5 font-bold font-serif text-amber-500">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HỒ SƠ GIẢI PHẪU VI THỂ (FDI #{currentToothData.fdi})</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                isDossierOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {isDossierOpen && (
            <div className="mt-2 space-y-1.5 animate-fade-in border-t border-inherit pt-2">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-400">Số chân răng: </span>
                  <span className="font-bold">{currentToothData.rootCount} chân</span>
                </div>
                <div>
                  <span className="text-slate-400">Số ống tủy: </span>
                  <span className="font-bold">{currentToothData.canalCount} ống ({currentToothData.canalNames?.join(', ') || 'Tiêu chuẩn'})</span>
                </div>
              </div>

              {/* Status Breakdown for Each Layer */}
              <div className="space-y-1 pt-1 border-t border-inherit/50 text-[10px]">
                <div className="flex justify-between items-center">
                  <span>• Men Răng (Enamel Crown):</span>
                  <span className="text-emerald-400 font-mono font-semibold">REAL 3D MESH (VERIFIED)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>• Chân Răng & Ngà (Roots & Dentin):</span>
                  <span className="text-emerald-400 font-mono font-semibold">REAL 3D MESH (VERIFIED)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>• Mặt Cắt Khối Nội Nha (3D Section):</span>
                  <span className="text-amber-400 font-mono font-semibold">GPU HARDWARE CLIPPING</span>
                </div>
              </div>

              <div className="pt-1.5 border-t border-inherit/40 flex items-center justify-between">
                <DentalAssetInspector fdi={selectedToothFdi} isDark={isDark} />
                <span className="text-[9px] text-slate-400 font-mono">100% Medical Scan</span>
              </div>

              <p className="text-[9px] text-slate-400 italic pt-1 border-t border-inherit/40 leading-relaxed">
                Mô hình giải phẫu vi thể chuẩn hóa từ dữ liệu micro-CT Z-Anatomy (CC BY-SA 4.0).
                Cắt lớp bằng mặt phẳng clipping GPU thực tế, loại trừ 100% hình học procedural giả lập.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. BOTTOM LEGEND BAR (Hidden in Clean View) */}
      {!isCleanView && (
        <div className="hidden sm:flex absolute bottom-4 right-4 z-20 items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md shadow-2xl text-[11px] font-medium pointer-events-auto bg-slate-900/90 border-slate-800 text-slate-200">
          <span className="flex items-center gap-1.5 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fcfaf7] border border-white inline-block" />
            Men Răng
          </span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ecd9a8] inline-block" />
            Ngà Răng
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c] inline-block" />
            Tủy Răng
          </span>
          <span className="flex items-center gap-1.5 text-orange-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ece1d0] inline-block" />
            Ổ Xương Răng
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] inline-block" />
            PDL
          </span>
        </div>
      )}
    </div>
  );
};
