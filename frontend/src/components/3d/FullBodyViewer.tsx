import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, ContactShadows } from '@react-three/drei';
import { Layers, RotateCcw, Crosshair, Sparkles, Bug, Eye, Box, GitFork, Info } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  ANATOMICAL_STRUCTURES,
  AnatomicalStructure
} from '../../data/anatomyHierarchy';
import {
  ANATOMICAL_PLACEMENTS,
  normalizeAnatomicalObject
} from '../../utils/AnatomyTransformNormalizer';
import { ANATOMICAL_LANDMARKS } from '../../utils/AnatomicalLandmarkRegistry';
import { AnatomyCalibrationService } from '../../utils/AnatomyCalibrationService';
import { CameraController } from './CameraController';
import { SmartFocusToolbar } from '../ui/SmartFocusToolbar';
import { LayerController } from '../ui/LayerController';
import { AnatomyAssetInspector } from '../debug/AnatomyAssetInspector';
import { AnatomyVisibilityManager } from '../../utils/AnatomyVisibilityManager';
import { ConnectedVesselsNetwork } from './ConnectedVesselsNetwork';
import { ConnectedNervesNetwork } from './ConnectedNervesNetwork';

interface NormalizedOrganProps {
  organKey: string;
  modelPath: string;
  structureId: string;
  layerIndex: number;
  isSelected: boolean;
  isIsolated: boolean;
  selectedId: string | null;
  layerOpacity: number;
  layerVisible: boolean;
  clippingPlanes: THREE.Plane[];
  onSelect: (structureId: string, worldCenter: [number, number, number]) => void;
}

const NormalizedOrganMesh: React.FC<NormalizedOrganProps> = ({
  organKey,
  modelPath,
  structureId,
  layerIndex,
  isSelected,
  isIsolated,
  selectedId,
  layerOpacity,
  layerVisible,
  clippingPlanes,
  onSelect
}) => {
  const { scene } = useGLTF(modelPath);

  // Use AnatomyTransformNormalizer to place and scale within standard 1.8m human body
  const normalizedGroup = useMemo(() => {
    return normalizeAnatomicalObject(scene, organKey);
  }, [scene, organKey]);

  // Section Z & "NẾU ZOOM SÂU VÀO MỚI THỂ HIỆN":
  // When this structure is specifically selected, ALWAYS reveal it at full 1.0!
  const computedOpacity = useMemo(() => {
    if (isSelected) return 1.0;
    if (!layerVisible || layerOpacity <= 0) return 0;
    return AnatomyVisibilityManager.getEffectiveOpacity(
      structureId,
      layerOpacity,
      selectedId,
      isIsolated
    );
  }, [isSelected, layerVisible, layerOpacity, structureId, selectedId, isIsolated]);

  if (computedOpacity <= 0) return null;

  // Apply PBR materials and clipping via centralized manager for visible meshes only
  normalizedGroup.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      AnatomyVisibilityManager.applyAnatomicalMaterial(
        child,
        computedOpacity,
        isSelected,
        clippingPlanes
      );
    }
  });

  return (
    <primitive
      object={normalizedGroup}
      onPointerDown={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const box = new THREE.Box3().setFromObject(normalizedGroup);
        const center = new THREE.Vector3();
        box.getCenter(center);
        onSelect(structureId, [center.x, center.y, center.z]);
      }}
    />
  );
};

// Full Translucent Human Skin Envelope
const HumanBodySilhouette: React.FC<{
  opacity: number;
  visible: boolean;
  clippingPlanes: THREE.Plane[];
  onSelect: () => void;
}> = ({ opacity, visible, clippingPlanes, onSelect }) => {
  const { scene } = useGLTF('/models/body.glb');

  const normalizedSkin = useMemo(() => {
    return normalizeAnatomicalObject(scene, 'body_skin');
  }, [scene]);

  useMemo(() => {
    normalizedSkin.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mat = (Array.isArray(child.material) ? child.material[0] : child.material) as THREE.MeshStandardMaterial;
        const isSilhouette = opacity <= 0.1;
        mat.transparent = true;
        mat.opacity = opacity;
        mat.depthWrite = !isSilhouette && opacity > 0.4;
        mat.side = isSilhouette ? THREE.FrontSide : THREE.DoubleSide;
        mat.clippingPlanes = clippingPlanes;
        mat.color.set(isSilhouette ? '#b0cbe8' : '#c5d6e8');
        mat.roughness = 0.6;
        mat.metalness = 0.05;
        mat.needsUpdate = true;
      }
    });
  }, [normalizedSkin, opacity, clippingPlanes]);

  if (!visible || opacity <= 0) return null;

  return (
    <primitive
      object={normalizedSkin}
      onPointerDown={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect();
      }}
    />
  );
};

const MuscularBodyLayer: React.FC<{
  opacity: number;
  visible: boolean;
  isSelected: boolean;
  clippingPlanes: THREE.Plane[];
  onSelect: () => void;
}> = ({ opacity, visible, isSelected, clippingPlanes, onSelect }) => {
  const { scene } = useGLTF('/models/body.glb');

  const normalizedMuscle = useMemo(() => {
    return normalizeAnatomicalObject(scene, 'body_skin');
  }, [scene]);

  useMemo(() => {
    normalizedMuscle.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;
        const mat = (Array.isArray(child.material) ? child.material[0] : child.material) as THREE.MeshStandardMaterial;
        const isSolid = opacity >= 0.95;
        mat.transparent = !isSolid;
        mat.opacity = opacity;
        mat.depthWrite = isSolid;
        mat.depthTest = true;
        mat.side = THREE.DoubleSide;
        mat.clippingPlanes = clippingPlanes;
        mat.roughness = 0.7;
        mat.metalness = 0.05;

        if (isSelected) {
          mat.color.set('#b91c1c'); // Active muscular crimson
          if (!mat.emissive) mat.emissive = new THREE.Color('#f59e0b');
          else mat.emissive.set('#f59e0b');
          mat.emissiveIntensity = 0.5;
        } else {
          mat.color.set('#881337'); // Deep striated anatomical muscle red
          if (mat.emissive) {
            mat.emissive.set('#000000');
            mat.emissiveIntensity = 0.0;
          }
        }
        mat.needsUpdate = true;
      }
    });
  }, [normalizedMuscle, opacity, isSelected, clippingPlanes]);

  if (!visible || opacity <= 0) return null;

  return (
    <primitive
      object={normalizedMuscle}
      onPointerDown={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect();
      }}
    />
  );
};

export const FullBodyViewer: React.FC = () => {
  const gender = useAnatomyStore((s) => s.gender);
  const layerVisibility = useAnatomyStore((s) => s.layerVisibility);
  const layerOpacity = useAnatomyStore((s) => s.layerOpacity);
  const selectedStructureId = useAnatomyStore((s) => s.selectedStructureId);
  const selectStructure = useAnatomyStore((s) => s.selectStructure);
  const triggerCameraFocus = useAnatomyStore((s) => s.triggerCameraFocus);
  const autoRotate = useAnatomyStore((s) => s.autoRotate);
  const autoRotateSpeed = useAnatomyStore((s) => s.autoRotateSpeed);
  const toggleAutoRotate = useAnatomyStore((s) => s.toggleAutoRotate);
  const language = useAnatomyStore((s) => s.language);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');
  const isIsolated = useAnatomyStore((s) => s.isIsolated);
  const setIsIsolated = useAnatomyStore((s) => s.setIsIsolated);
  const crossSection = useAnatomyStore((s) => s.crossSection);
  const resetAllToDefault = useAnatomyStore((s) => s.resetAllToDefault);
  const visualizationMode = useAnatomyStore((s) => s.visualizationMode);
  const setVisualizationMode = useAnatomyStore((s) => s.setVisualizationMode);
  const isTreeOpen = useAnatomyStore((s) => s.isTreeOpen);
  const toggleTreeOpen = useAnatomyStore((s) => s.toggleTreeOpen);
  const isInfoOpen = useAnatomyStore((s) => s.isInfoOpen);
  const toggleInfoOpen = useAnatomyStore((s) => s.toggleInfoOpen);

  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [showAlignmentMode, setShowAlignmentMode] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const controlsRef = useRef<any>(null);

  const isVi = language === 'vi';

  // Real 3D Cross Section Clipping Planes (Section 20)
  const clippingPlanes = useMemo(() => {
    if (!crossSection.enabled) return [];
    const planes: THREE.Plane[] = [];
    if (crossSection.x !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(1, 0, 0), crossSection.x));
    }
    if (crossSection.y !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, 1, 0), crossSection.y));
    }
    if (crossSection.z !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, 0, 1), crossSection.z));
    }
    return planes;
  }, [crossSection]);

  // Dynamic Vessel Network Opacity (softly dims when non-vascular organ is focused)
  const vesselNetworkOpacity = useMemo(() => {
    const base = layerOpacity[6] ?? 1.0;
    if (selectedStructureId) {
      if (
        selectedStructureId.includes('vessel') ||
        selectedStructureId.includes('artery') ||
        selectedStructureId.includes('vein') ||
        selectedStructureId.includes('aorta') ||
        selectedStructureId === 'heart'
      ) {
        return base;
      }
      return Math.min(0.20, base);
    }
    return base;
  }, [selectedStructureId, layerOpacity]);

  // Selection & Camera glide using mathematical FOV framing (Section 10 & 11)
  const handleSelectStructure = (structureId: string, worldCenter: [number, number, number]) => {
    selectStructure(structureId);

    const placement = ANATOMICAL_PLACEMENTS[structureId] || { targetSize: 0.2 };
    // Dynamic distance calculation based on object size and camera FOV
    const fovRad = (42 * Math.PI) / 180;
    const dynamicDist = Math.max(0.38, (placement.targetSize / (2 * Math.tan(fovRad / 2))) * 1.35);

    triggerCameraFocus({
      targetPosition: [worldCenter[0], worldCenter[1] + 0.02, worldCenter[2] + dynamicDist],
      targetLookAt: [worldCenter[0], worldCenter[1], worldCenter[2]],
      duration: 850,
      timestamp: Date.now()
    });
  };

  // Restore Body (Section 8 & 16)
  const handleRestoreBody = () => {
    resetAllToDefault();
  };

  // Professional PC & Laptop Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === '[' || e.key === 't' || e.key === 'T') {
        e.preventDefault();
        toggleTreeOpen();
      } else if (e.key === ']' || e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        toggleInfoOpen();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestoreBody();
      } else if (e.key === ' ' && !e.repeat) {
        e.preventDefault();
        toggleAutoRotate();
      } else if (e.key === 'Escape') {
        selectStructure(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTreeOpen, toggleInfoOpen, handleRestoreBody, toggleAutoRotate, selectStructure]);

  const selectedStructure = selectedStructureId
    ? ANATOMICAL_STRUCTURES[selectedStructureId]
    : null;

  return (
    <section
      className={`relative flex-1 h-full flex flex-col overflow-hidden select-none transition-colors duration-200 ${
        isDark ? 'bg-[#090d16]' : 'bg-[#f5ede3]'
      }`}
    >
      {/* Unified Top Control Bar — Single Flex Container (Guarantees Zero Overlap) */}
      <header className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
        {/* Left Utility Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Universal Sidebar Toggle: Anatomy Tree */}
          <button
            onClick={toggleTreeOpen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all cursor-pointer ${
              isTreeOpen
                ? 'bg-amber-600 text-white shadow-amber-500/20'
                : isDark
                ? 'bg-slate-900/90 border border-slate-800 text-amber-400 hover:text-white'
                : 'bg-white/90 border border-[#e7ded3] text-amber-700 hover:text-black'
            }`}
            title="Đóng / Mở Cây giải phẫu (Phím tắt: [ hoặc T)"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isVi ? 'Cây' : 'Tree'}</span>
          </button>

          {/* Universal Sidebar Toggle: Info Panel */}
          <button
            onClick={toggleInfoOpen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all cursor-pointer ${
              isInfoOpen
                ? 'bg-sky-600 text-white shadow-sky-500/20'
                : isDark
                ? 'bg-slate-900/90 border border-slate-800 text-sky-400 hover:text-white'
                : 'bg-white/90 border border-[#e7ded3] text-sky-700 hover:text-black'
            }`}
            title="Đóng / Mở Bảng thông tin y khoa (Phím tắt: ] hoặc I)"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isVi ? 'Chi tiết' : 'Info'}</span>
          </button>

          <button
            onClick={handleRestoreBody}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold shadow-md backdrop-blur-md transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white/90 border border-[#e7ded3] text-slate-700 hover:text-black'
            }`}
            title="Khôi phục góc nhìn toàn thân"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden xl:inline">{isVi ? 'Khôi phục' : 'Restore'}</span>
          </button>

          {/* 8 Lớp — Hidden on mobile to prevent overlapping mode switcher */}
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all cursor-pointer ${
              showLayerPanel
                ? 'bg-amber-600 text-white shadow-amber-500/20'
                : isDark
                ? 'bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white'
                : 'bg-white/90 border border-[#e7ded3] text-slate-800 hover:text-black'
            }`}
            title="Bóc tách 8 lớp giải phẫu"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{isVi ? '8 Lớp' : 'Layers'}</span>
          </button>

          {/* Mốc giải phẫu — Hidden on small screens */}
          <button
            onClick={() => setShowAlignmentMode(!showAlignmentMode)}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all cursor-pointer ${
              showAlignmentMode
                ? 'bg-sky-600 text-white shadow-sky-500/20'
                : isDark
                ? 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white/90 border border-[#e7ded3] text-slate-700 hover:text-black'
            }`}
            title="Bật/Tắt mốc giải phẫu học"
          >
            <Crosshair className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xl:inline">{isVi ? 'Mốc' : 'Landmarks'}</span>
          </button>

          {/* Inspector — Hidden on small screens */}
          <button
            onClick={() => setShowInspector(!showInspector)}
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all cursor-pointer ${
              showInspector
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : isDark
                ? 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white/90 border border-[#e7ded3] text-slate-700 hover:text-black'
            }`}
            title="Mở bảng thanh tra node 3D"
          >
            <Box className="w-3.5 h-3.5 text-emerald-500" />
            <span>Inspector</span>
          </button>
        </div>

        {/* Right: Primary Visualization Mode Switcher with horizontal swipe scroll on mobile */}
        <div className="flex items-center gap-0.5 p-0.5 sm:p-1 rounded-full shadow-lg backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border border-[#e7ded3] dark:border-slate-800 text-xs select-none pointer-events-auto overflow-x-auto max-w-[62vw] sm:max-w-none scrollbar-none flex-nowrap shrink-0">
          {(
            [
              { id: 'default', labelVi: 'Toàn thân', labelEn: 'Whole' },
              { id: 'skeleton', labelVi: 'Xương', labelEn: 'Skeleton' },
              { id: 'muscles', labelVi: 'Cơ', labelEn: 'Muscles' },
              { id: 'organs', labelVi: 'Nội tạng', labelEn: 'Organs' },
              { id: 'vascular', labelVi: 'Mạch máu', labelEn: 'Vascular' },
              { id: 'nervous', labelVi: 'Thần kinh', labelEn: 'Nerves' }
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setVisualizationMode(m.id)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                visualizationMode === m.id
                  ? 'bg-amber-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {isVi ? m.labelVi : m.labelEn}
            </button>
          ))}
        </div>

        {showLayerPanel && (
          <div className="absolute top-12 left-0 w-64 z-30 animate-fade-in pointer-events-auto">
            <LayerController />
          </div>
        )}
      </header>

      {showInspector && <AnatomyAssetInspector onClose={() => setShowInspector(false)} />}

      {/* Debug HUD Overlay (Section 42) */}
      {debugMode && (
        <div className="absolute bottom-14 left-4 z-20 p-3 rounded-xl bg-black/85 text-emerald-400 font-mono text-[10px] space-y-1 max-w-xs pointer-events-none border border-emerald-500/30">
          <div className="font-bold text-white border-b border-emerald-500/20 pb-1">
            ANATOMY DEBUG MONITOR
          </div>
          <div>Gender: {gender.toUpperCase()}</div>
          <div>Selected ID: {selectedStructureId || 'None (Full Body)'}</div>
          {selectedStructure && (
            <>
              <div>Structure: {selectedStructure.nameVi} ({selectedStructure.nameEn})</div>
              <div>System: {selectedStructure.systemId}</div>
              <div>Layer: {selectedStructure.layerIndex}</div>
              <div>Asset Status: {selectedStructure.assetStatus}</div>
              <div>Cavity Pos: [{selectedStructure.position.join(', ')}]</div>
            </>
          )}
          <div>Cross-Section: {crossSection.enabled ? 'Active' : 'Disabled'}</div>
        </div>
      )}

      {/* Anatomical Calibration HUD (Section 38 & 39) */}
      {showAlignmentMode && (
        <div className="absolute top-14 left-4 z-20 p-3 rounded-xl bg-slate-950/90 border border-sky-500/40 text-sky-200 text-[11px] font-mono shadow-2xl backdrop-blur-md max-w-xs space-y-1.5 animate-fade-in">
          <div className="font-bold text-white border-b border-sky-500/30 pb-1 flex items-center justify-between">
            <span>MASTER ALIGNMENT MONITOR</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
              1.75m MODEL
            </span>
          </div>
          <div>X: Left ↔ Right (Transverse)</div>
          <div>Y: Inferior ↔ Superior (0.0 to 1.75m)</div>
          <div>Z: Posterior ↔ Anterior (+Z Front)</div>
          <div className="border-t border-slate-800 pt-1 text-[10px] space-y-1 text-slate-300">
            <div className="text-emerald-400">✓ Skeleton: Cranium atop C1 Atlas</div>
            <div className="text-emerald-400">✓ Thorax: Heart & Lungs inside Ribcage</div>
            <div className="text-emerald-400">✓ Abdomen: Liver (RUQ) / Stomach (LUQ)</div>
            <div className="text-emerald-400">✓ Pelvis: Viscera behind Pubic Symphysis</div>
          </div>
        </div>
      )}

      {/* 3D Canvas Viewport */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows={typeof window !== 'undefined' ? window.innerWidth >= 768 : true}
          dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.5 : 2]}
          camera={{ position: [0, 0.95, 3.1], fov: 38 }}
          gl={{
            powerPreference: 'high-performance',
            antialias: typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
            alpha: true,
            preserveDrawingBuffer: false,
            localClippingEnabled: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15
          }}
        >
          <Environment preset="studio" />

          <ambientLight intensity={isDark ? 0.7 : 0.9} />
          <directionalLight
            position={[4, 7, 5]}
            intensity={1.7}
            castShadow={typeof window !== 'undefined' ? window.innerWidth >= 768 : true}
            shadow-mapSize={typeof window !== 'undefined' && window.innerWidth < 768 ? [512, 512] : [1024, 1024]}
          />
          <directionalLight position={[-4, 4, -4]} intensity={0.65} color="#38bdf8" />
          <directionalLight position={[0, -2, 2]} intensity={0.4} color="#f59e0b" />

          {/* Pedestal Shadow under feet */}
          <ContactShadows
            position={[0, -0.02, 0]}
            opacity={0.5}
            scale={3.0}
            blur={2.0}
            far={2.0}
          />

          {/* Complete 3D Human Body Anatomy Architecture */}
          <React.Suspense
            fallback={
              <Html center>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 border text-xs shadow-xl backdrop-blur-md">
                  <div className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                  <span className="font-medium">
                    {isVi ? 'Đang chuẩn hóa mô hình cơ thể người 3D…' : 'Normalizing 3D Human Anatomy…'}
                  </span>
                </div>
              </Html>
            }
          >
            {/* HUMAN BODY ROOT — Single Source of Truth for Body Coordinate System (Section 59) */}
            <group name="HumanBodyRoot" position={[0, 0, 0]}>
              {/* LAYER 1: Full Body Skin Silhouette (Envelopes skeleton and organs head-to-toe) */}
              <HumanBodySilhouette
                opacity={
                  selectedStructureId
                    ? 0.08
                    : layerOpacity[1] !== undefined
                    ? layerOpacity[1]
                    : 0.85
                }
                visible={layerVisibility[1] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={() => handleSelectStructure('skin', [0, 1.0, 0])}
              />

              {/* LAYER 3: Muscular System (True Anatomical Whole-Body Muscular Physique) */}
              <MuscularBodyLayer
                opacity={
                  selectedStructureId === 'muscle'
                    ? 1.0
                    : layerOpacity[3] !== undefined
                    ? layerOpacity[3]
                    : 1.0
                }
                visible={layerVisibility[3] ?? false}
                isSelected={selectedStructureId === 'muscle'}
                clippingPlanes={clippingPlanes}
                onSelect={() => handleSelectStructure('muscle', [0, 1.10, 0])}
              />

              {/* Biceps Brachii: Anatomically attached to the anterior upper arm - Rendered when specifically inspected */}
              {selectedStructureId === 'biceps' && (
                <NormalizedOrganMesh
                  organKey="biceps"
                  modelPath="/models/muscle.glb"
                  structureId="biceps"
                  layerIndex={3}
                  isSelected={true}
                  isIsolated={isIsolated}
                  selectedId={selectedStructureId}
                  layerOpacity={layerOpacity[3] ?? 1.0}
                  layerVisible={layerVisibility[3] ?? true}
                  clippingPlanes={clippingPlanes}
                  onSelect={handleSelectStructure}
                />
              )}

              {/* Respiratory Diaphragm separating thoracic and abdominal cavities - Rendered when specifically inspected */}
              {selectedStructureId === 'diaphragm' && (
                <NormalizedOrganMesh
                  organKey="diaphragm"
                  modelPath="/models/diaphragm.glb"
                  structureId="diaphragm"
                  layerIndex={3}
                  isSelected={true}
                  isIsolated={isIsolated}
                  selectedId={selectedStructureId}
                  layerOpacity={layerOpacity[3] ?? 1.0}
                  layerVisible={layerVisibility[3] ?? true}
                  clippingPlanes={clippingPlanes}
                  onSelect={handleSelectStructure}
                />
              )}

              {/* LAYER 4: Skeletal System (Continuous Axial Skeleton) */}
              <NormalizedOrganMesh
                organKey="skull"
                modelPath="/models/skull.glb"
                structureId="skull"
                layerIndex={4}
                isSelected={selectedStructureId === 'skull'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="spine"
                modelPath="/models/spine.glb"
                structureId="spine"
                layerIndex={4}
                isSelected={selectedStructureId === 'spine'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="ribcage"
                modelPath="/models/ribcage.glb"
                structureId="ribcage"
                layerIndex={4}
                isSelected={selectedStructureId === 'ribcage'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="pelvis"
                modelPath="/models/pelvis.glb"
                structureId="pelvis"
                layerIndex={4}
                isSelected={selectedStructureId === 'pelvis'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              {/* LAYER 4: Appendicular Skeleton — Bilateral Limbs & Articulations */}
              {/* Shoulder Joints (Left & Right) */}
              <NormalizedOrganMesh
                organKey="shoulder_left"
                modelPath="/models/shoulder.glb"
                structureId="shoulder_joint"
                layerIndex={4}
                isSelected={selectedStructureId === 'shoulder_joint' || selectedStructureId === 'shoulder_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="shoulder_right"
                modelPath="/models/shoulder.glb"
                structureId="shoulder_joint"
                layerIndex={4}
                isSelected={selectedStructureId === 'shoulder_joint' || selectedStructureId === 'shoulder_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Arm Bones / Humerus (Left & Right) */}
              <NormalizedOrganMesh
                organKey="humerus_left"
                modelPath="/models/long-bone.glb"
                structureId="humerus"
                layerIndex={4}
                isSelected={selectedStructureId === 'humerus' || selectedStructureId === 'humerus_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="humerus_right"
                modelPath="/models/long-bone.glb"
                structureId="humerus"
                layerIndex={4}
                isSelected={selectedStructureId === 'humerus' || selectedStructureId === 'humerus_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Forearm Bones / Radius & Ulna (Left & Right) */}
              <NormalizedOrganMesh
                organKey="forearm_left"
                modelPath="/models/long-bone.glb"
                structureId="forearm"
                layerIndex={4}
                isSelected={selectedStructureId === 'forearm' || selectedStructureId === 'forearm_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="forearm_right"
                modelPath="/models/long-bone.glb"
                structureId="forearm"
                layerIndex={4}
                isSelected={selectedStructureId === 'forearm' || selectedStructureId === 'forearm_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Hand & Wrist Skeletons (Left & Right) */}
              <NormalizedOrganMesh
                organKey="hand_left"
                modelPath="/models/hand.glb"
                structureId="hand_skeleton"
                layerIndex={4}
                isSelected={selectedStructureId === 'hand_skeleton' || selectedStructureId === 'hand_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="hand_right"
                modelPath="/models/hand.glb"
                structureId="hand_skeleton"
                layerIndex={4}
                isSelected={selectedStructureId === 'hand_skeleton' || selectedStructureId === 'hand_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Hip Joints (Left & Right) */}
              <NormalizedOrganMesh
                organKey="hip_left"
                modelPath="/models/hip.glb"
                structureId="hip_joint"
                layerIndex={4}
                isSelected={selectedStructureId === 'hip_joint' || selectedStructureId === 'hip_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="hip_right"
                modelPath="/models/hip.glb"
                structureId="hip_joint"
                layerIndex={4}
                isSelected={selectedStructureId === 'hip_joint' || selectedStructureId === 'hip_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Femurs / Thigh Bones (Left & Right) */}
              <NormalizedOrganMesh
                organKey="femur_left"
                modelPath="/models/long-bone.glb"
                structureId="femur"
                layerIndex={4}
                isSelected={selectedStructureId === 'femur' || selectedStructureId === 'femur_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="femur_right"
                modelPath="/models/long-bone.glb"
                structureId="femur"
                layerIndex={4}
                isSelected={selectedStructureId === 'femur' || selectedStructureId === 'femur_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Knee Joints & Patella (Left & Right) */}
              <NormalizedOrganMesh
                organKey="knee_left"
                modelPath="/models/knee.glb"
                structureId="knee_joint"
                layerIndex={4}
                isSelected={selectedStructureId === 'knee_joint' || selectedStructureId === 'knee_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="knee_right"
                modelPath="/models/knee.glb"
                structureId="knee_joint"
                layerIndex={4}
                isSelected={selectedStructureId === 'knee_joint' || selectedStructureId === 'knee_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Lower Leg Bones / Tibia & Fibula (Left & Right) */}
              <NormalizedOrganMesh
                organKey="tibia_left"
                modelPath="/models/long-bone.glb"
                structureId="tibia"
                layerIndex={4}
                isSelected={selectedStructureId === 'tibia' || selectedStructureId === 'tibia_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="tibia_right"
                modelPath="/models/long-bone.glb"
                structureId="tibia"
                layerIndex={4}
                isSelected={selectedStructureId === 'tibia' || selectedStructureId === 'tibia_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* Feet & Ankles (Left & Right) */}
              <NormalizedOrganMesh
                organKey="foot_left"
                modelPath="/models/foot.glb"
                structureId="foot_skeleton"
                layerIndex={4}
                isSelected={selectedStructureId === 'foot_skeleton' || selectedStructureId === 'foot_left'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="foot_right"
                modelPath="/models/foot.glb"
                structureId="foot_skeleton"
                layerIndex={4}
                isSelected={selectedStructureId === 'foot_skeleton' || selectedStructureId === 'foot_right'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[4] ?? 1.0}
                layerVisible={layerVisibility[4] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* LAYER 5: Visceral Organs (Cardiopulmonary, Digestive, Renal) */}
              <NormalizedOrganMesh
                organKey="heart"
                modelPath="/models/heart-v7.glb"
                structureId="heart"
                layerIndex={5}
                isSelected={selectedStructureId === 'heart'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="lungs"
                modelPath="/models/lungs.glb"
                structureId="lungs"
                layerIndex={5}
                isSelected={selectedStructureId === 'lungs'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="liver"
                modelPath="/models/liver.glb"
                structureId="liver"
                layerIndex={5}
                isSelected={selectedStructureId === 'liver'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="stomach"
                modelPath="/models/stomach.glb"
                structureId="stomach"
                layerIndex={5}
                isSelected={selectedStructureId === 'stomach'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="kidneys"
                modelPath="/models/kidneys.glb"
                structureId="kidneys"
                layerIndex={5}
                isSelected={selectedStructureId === 'kidneys'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="bladder"
                modelPath="/models/bladder.glb"
                structureId="bladder"
                layerIndex={5}
                isSelected={selectedStructureId === 'bladder'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="larynx"
                modelPath="/models/larynx.glb"
                structureId="larynx"
                layerIndex={5}
                isSelected={selectedStructureId === 'larynx'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="gallbladder"
                modelPath="/models/gallbladder.glb"
                structureId="gallbladder"
                layerIndex={5}
                isSelected={selectedStructureId === 'gallbladder'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="pancreas"
                modelPath="/models/pancreas.glb"
                structureId="pancreas"
                layerIndex={5}
                isSelected={selectedStructureId === 'pancreas'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="intestine"
                modelPath="/models/intestine.glb"
                structureId="intestine"
                layerIndex={5}
                isSelected={selectedStructureId === 'intestine'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[5] ?? 1.0}
                layerVisible={layerVisibility[5] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* LAYER 6: Cardiovascular System & Full-Body Angiology Network */}
              {layerVisibility[6] && (
                <ConnectedVesselsNetwork opacity={vesselNetworkOpacity} />
              )}
              {/* Cardiac Pump Central Anchor when in Vascular Mode */}
              {layerVisibility[6] && !layerVisibility[5] && (
                <NormalizedOrganMesh
                  organKey="heart"
                  modelPath="/models/heart-v7.glb"
                  structureId="heart"
                  layerIndex={6}
                  isSelected={selectedStructureId === 'heart'}
                  isIsolated={isIsolated}
                  selectedId={selectedStructureId}
                  layerOpacity={0.65}
                  layerVisible={true}
                  clippingPlanes={clippingPlanes}
                  onSelect={handleSelectStructure}
                />
              )}
              <NormalizedOrganMesh
                organKey="aorta_arch"
                modelPath="/models/aortic-arch.glb"
                structureId="aorta_arch"
                layerIndex={6}
                isSelected={selectedStructureId === 'aorta_arch'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[6] ?? 1.0}
                layerVisible={layerVisibility[6] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="coronary_arteries"
                modelPath="/models/coronary-arteries.glb"
                structureId="coronary_arteries"
                layerIndex={6}
                isSelected={selectedStructureId === 'coronary_arteries'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[6] ?? 1.0}
                layerVisible={layerVisibility[6] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="circle_of_willis"
                modelPath="/models/circle-of-willis.glb"
                structureId="circle_of_willis"
                layerIndex={6}
                isSelected={selectedStructureId === 'circle_of_willis'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[6] ?? 1.0}
                layerVisible={layerVisibility[6] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="portal_vein"
                modelPath="/models/portal-vein.glb"
                structureId="portal_vein"
                layerIndex={6}
                isSelected={selectedStructureId === 'portal_vein'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[6] ?? 1.0}
                layerVisible={layerVisibility[6] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              {/* Bilateral Leg Veins (Left and Right Legs) */}
              <NormalizedOrganMesh
                organKey="leg_veins_left"
                modelPath="/models/leg-veins.glb"
                structureId="leg_veins"
                layerIndex={6}
                isSelected={selectedStructureId === 'leg_veins'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[6] ?? 1.0}
                layerVisible={layerVisibility[6] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="leg_veins_right"
                modelPath="/models/leg-veins.glb"
                structureId="leg_veins"
                layerIndex={6}
                isSelected={selectedStructureId === 'leg_veins'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[6] ?? 1.0}
                layerVisible={layerVisibility[6] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* LAYER 7: Nervous System (Brain, Brainstem, Spinal Cord, Plexuses & Nerve Network) */}
              {layerVisibility[7] && (
                <ConnectedNervesNetwork opacity={layerOpacity[7] ?? 1.0} />
              )}
              <NormalizedOrganMesh
                organKey="brain"
                modelPath="/models/brain.glb"
                structureId="brain"
                layerIndex={7}
                isSelected={selectedStructureId === 'brain'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[7] ?? 1.0}
                layerVisible={layerVisibility[7] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="brainstem"
                modelPath="/models/brainstem.glb"
                structureId="brainstem"
                layerIndex={7}
                isSelected={selectedStructureId === 'brainstem'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[7] ?? 1.0}
                layerVisible={layerVisibility[7] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="spinal_cord"
                modelPath="/models/spinal-cord.glb"
                structureId="spinal_cord"
                layerIndex={7}
                isSelected={selectedStructureId === 'spinal_cord'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[7] ?? 1.0}
                layerVisible={layerVisibility[7] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="cranial_nerves"
                modelPath="/models/cranial-nerves.glb"
                structureId="cranial_nerves"
                layerIndex={7}
                isSelected={selectedStructureId === 'cranial_nerves'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[7] ?? 1.0}
                layerVisible={layerVisibility[7] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="brachial_plexus"
                modelPath="/models/brachial-plexus.glb"
                structureId="brachial_plexus"
                layerIndex={7}
                isSelected={selectedStructureId === 'brachial_plexus'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[7] ?? 1.0}
                layerVisible={layerVisibility[7] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="lumbosacral_plexus"
                modelPath="/models/lumbosacral-plexus.glb"
                structureId="lumbosacral_plexus"
                layerIndex={7}
                isSelected={selectedStructureId === 'lumbosacral_plexus'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[7] ?? 1.0}
                layerVisible={layerVisibility[7] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="nerves_system"
                modelPath="/models/nerves-md.glb"
                structureId="nerves_system"
                layerIndex={7}
                isSelected={selectedStructureId === 'nerves_system'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[7] ?? 1.0}
                layerVisible={layerVisibility[7] ?? false}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* LAYER 8: Endocrine System (Pituitary, Adrenals) */}
              <NormalizedOrganMesh
                organKey="pituitary"
                modelPath="/models/pituitary.glb"
                structureId="pituitary"
                layerIndex={8}
                isSelected={selectedStructureId === 'pituitary'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[8] ?? 1.0}
                layerVisible={layerVisibility[8] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="adrenal"
                modelPath="/models/adrenal.glb"
                structureId="adrenal"
                layerIndex={8}
                isSelected={selectedStructureId === 'adrenal'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[8] ?? 1.0}
                layerVisible={layerVisibility[8] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />

              {/* REPRODUCTIVE SYSTEM (Male vs Female Real Models) */}
              {gender === 'male' ? (
                <>
                  <NormalizedOrganMesh
                    organKey="testis"
                    modelPath="/models/testis.glb"
                    structureId="testis"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'testis'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                  <NormalizedOrganMesh
                    organKey="prostate"
                    modelPath="/models/prostate.glb"
                    structureId="prostate"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'prostate'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                  <NormalizedOrganMesh
                    organKey="penis"
                    modelPath="/models/penis.glb"
                    structureId="penis"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'penis'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                </>
              ) : (
                <>
                  <NormalizedOrganMesh
                    organKey="uterus"
                    modelPath="/models/uterus.glb"
                    structureId="uterus"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'uterus'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                  <NormalizedOrganMesh
                    organKey="ovary"
                    modelPath="/models/ovary.glb"
                    structureId="ovary"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'ovary'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                  <NormalizedOrganMesh
                    organKey="breast_left"
                    modelPath="/models/breast.glb"
                    structureId="breast"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'breast'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                  <NormalizedOrganMesh
                    organKey="breast_right"
                    modelPath="/models/breast.glb"
                    structureId="breast"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'breast'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                  <NormalizedOrganMesh
                    organKey="vagina"
                    modelPath="/models/vagina.glb"
                    structureId="vagina"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'vagina'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                  <NormalizedOrganMesh
                    organKey="uterine_tube"
                    modelPath="/models/uterine-tube.glb"
                    structureId="uterine_tube"
                    layerIndex={5}
                    isSelected={selectedStructureId === 'uterine_tube'}
                    isIsolated={isIsolated}
                    selectedId={selectedStructureId}
                    layerOpacity={layerOpacity[5] ?? 1.0}
                    layerVisible={layerVisibility[5] ?? true}
                    clippingPlanes={clippingPlanes}
                    onSelect={handleSelectStructure}
                  />
                </>
              )}

              {/* LAYER 8: Endocrine & Lymphatic */}
              <NormalizedOrganMesh
                organKey="thyroid"
                modelPath="/models/thyroid.glb"
                structureId="thyroid"
                layerIndex={8}
                isSelected={selectedStructureId === 'thyroid'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[8] ?? 1.0}
                layerVisible={layerVisibility[8] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
              <NormalizedOrganMesh
                organKey="spleen"
                modelPath="/models/spleen.glb"
                structureId="spleen"
                layerIndex={8}
                isSelected={selectedStructureId === 'spleen'}
                isIsolated={isIsolated}
                selectedId={selectedStructureId}
                layerOpacity={layerOpacity[8] ?? 1.0}
                layerVisible={layerVisibility[8] ?? true}
                clippingPlanes={clippingPlanes}
                onSelect={handleSelectStructure}
              />
            </group>
          </React.Suspense>

          {/* Single Precision Landmark Badge for the Currently Selected Structure */}
          {selectedStructure && (
            <group position={selectedStructure.position}>
              <Html center zIndexRange={[20, 0]}>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-200 border border-amber-500 shadow-xl backdrop-blur-md whitespace-nowrap animate-bounce-subtle pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[11px] font-bold">
                    {isVi ? selectedStructure.nameVi : selectedStructure.nameEn}
                  </span>
                </div>
              </Html>
            </group>
          )}

          {/* Anatomical Landmarks & Master Axes Overlay (Section 38 & 39) */}
          {showAlignmentMode && (
            <group>
              <axesHelper args={[1.0]} position={[0, 0.88, 0]} />
              {Object.values(ANATOMICAL_LANDMARKS).map((lm) => (
                <group key={lm.id} position={lm.position}>
                  <mesh>
                    <sphereGeometry args={[0.01, 16, 16]} />
                    <meshBasicMaterial color="#38bdf8" />
                  </mesh>
                  <Html center zIndexRange={[25, 0]}>
                    <div className="text-[9px] font-mono bg-sky-950/90 text-sky-200 border border-sky-400/80 px-1.5 py-0.5 rounded shadow pointer-events-none -translate-y-3 whitespace-nowrap">
                      {lm.nameEn}
                    </div>
                  </Html>
                </group>
              ))}

              {/* Anatomical Midline Guide Line (Section 48) */}
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([0, 0, 0, 0, 1.85, 0])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#38bdf8" transparent opacity={0.65} />
              </line>
            </group>
          )}

          <CameraController controlsRef={controlsRef} />

          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed === 'slow' ? 0.75 : autoRotateSpeed === 'fast' ? 2.4 : 1.2}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.85}
            minDistance={0.3}
            maxDistance={5.0}
            target={[0, 0.875, 0]}
          />
        </Canvas>
      </div>

      {/* Floating Smart Focus Toolbar */}
      <SmartFocusToolbar />

      {/* Footer Status Bar — Hidden on mobile to prevent overlapping SmartFocusToolbar */}
      <div className="hidden md:flex h-10 border-t items-center justify-between px-5 text-xs font-serif z-10 bg-white/75 dark:bg-slate-900/75 border-[#e7ded3] dark:border-slate-800 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
            {isVi ? 'HỆ THỐNG GIẢI PHẪU' : 'ANATOMY SYSTEM'}
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {gender === 'male'
              ? isVi
                ? 'Cơ thể Nam giới (Homo sapiens ♂)'
                : 'Male Body (Homo sapiens ♂)'
              : isVi
              ? 'Cơ thể Nữ giới (Homo sapiens ♀)'
              : 'Female Body (Homo sapiens ♀)'}
          </span>
          {selectedStructure && (
            <>
              <span className="text-slate-400">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-sans font-medium">
                {isVi ? 'Đang chọn:' : 'Selected:'} {selectedStructure.nameVi}
              </span>
            </>
          )}
        </div>

        {/* Auto Rotate Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-sans text-slate-500">
            {isVi ? 'Tự động xoay' : 'Auto rotate'}
          </span>
          <button
            onClick={toggleAutoRotate}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
              autoRotate ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                autoRotate ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
