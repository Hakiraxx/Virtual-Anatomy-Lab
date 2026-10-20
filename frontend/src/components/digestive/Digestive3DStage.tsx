import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {
  DIGESTIVE_SYSTEM_DATA,
  DIGESTIVE_STRUCTURE_LIST,
  DigestiveOrganData
} from '../../data/digestiveSystemData';
import { useDigestiveStore, DigestiveCameraPreset } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  LabelLayoutManager,
  TopControlsManager,
  ToolbarSafeArea,
  LayoutObstacle,
  RawProjectedLabel,
  PlacedLabel
} from '../../utils/ViewerLayoutManager';
import { DigestiveLabelProjector, DigestiveLabelAnchor } from './DigestiveLabelProjector';
import { DigestiveLabelLayer } from './DigestiveLabelLayer';

// ============================================================================
// CAMERA CONTROLLER: SMOOTH GLIDE TO PRESETS, BOUNDS OR SELECTED ORGAN
// ============================================================================
export interface CameraFocusTrigger {
  position: [number, number, number];
  target: [number, number, number];
  timestamp: number;
}

const CameraController: React.FC<{
  cameraPreset: DigestiveCameraPreset;
  selectedOrgan: DigestiveOrganData | null;
  focusTrigger: CameraFocusTrigger | null;
  controlsRef: React.RefObject<any>;
}> = ({ cameraPreset, selectedOrgan, focusTrigger, controlsRef }) => {
  const { camera } = useThree();

  const animRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 550,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(0.045, 0.35, 0.65),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(0.045, 0.30, 0.02),
    lastTriggerTimestamp: 0
  });

  // Calculate target camera positions based on preset / selected organ
  useEffect(() => {
    let nextPos: [number, number, number] = [0.045, 0.35, 0.65];
    let nextTarget: [number, number, number] = [0.045, 0.30, 0.02];

    if (focusTrigger && focusTrigger.timestamp !== animRef.current.lastTriggerTimestamp) {
      animRef.current.lastTriggerTimestamp = focusTrigger.timestamp;
      nextPos = focusTrigger.position;
      nextTarget = focusTrigger.target;
    } else if (selectedOrgan) {
      nextPos = selectedOrgan.cameraPreset.position;
      nextTarget = selectedOrgan.cameraPreset.target;
    } else {
      switch (cameraPreset) {
        case 'oral':
          nextTarget = [0.045, 0.74, 0.04];
          nextPos = [0.045, 0.78, 0.30];
          break;
        case 'gastroduodenal':
          nextTarget = [0.05, 0.30, 0.02];
          nextPos = [0.05, 0.34, 0.36];
          break;
        case 'small_bowel':
          nextTarget = [0.045, 0.14, 0.03];
          nextPos = [0.045, 0.18, 0.38];
          break;
        case 'colorectal':
          nextTarget = [0.05, 0.15, 0.01];
          nextPos = [0.05, 0.18, 0.45];
          break;
        case 'hepatobiliary':
          nextTarget = [0.02, 0.34, 0.04];
          nextPos = [0.02, 0.38, 0.38];
          break;
        case 'pancreas':
          nextTarget = [0.045, 0.28, 0.0];
          nextPos = [0.045, 0.31, 0.28];
          break;
        case 'posterior':
          nextTarget = [0.045, 0.30, 0.0];
          nextPos = [0.045, 0.35, -0.65];
          break;
        case 'overview':
        default:
          nextTarget = [0.045, 0.30, 0.02];
          nextPos = [0.045, 0.35, 0.65];
          break;
      }
    }

    animRef.current.startPos.copy(camera.position);
    animRef.current.endPos.set(...nextPos);

    if (controlsRef.current) {
      animRef.current.startTarget.copy(controlsRef.current.target);
    } else {
      animRef.current.startTarget.set(...nextTarget);
    }
    animRef.current.endTarget.set(...nextTarget);

    animRef.current.startTime = performance.now();
    animRef.current.isAnimating = true;
  }, [cameraPreset, selectedOrgan, focusTrigger, camera, controlsRef]);

  useFrame(() => {
    if (!animRef.current.isAnimating) return;

    const elapsed = performance.now() - animRef.current.startTime;
    const t = Math.min(1.0, elapsed / animRef.current.duration);
    // Smooth ease-out cubic curve
    const ease = 1 - Math.pow(1 - t, 3);

    camera.position.lerpVectors(animRef.current.startPos, animRef.current.endPos, ease);

    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(animRef.current.startTarget, animRef.current.endTarget, ease);
      controlsRef.current.update();
    }

    if (t >= 1.0) {
      animRef.current.isAnimating = false;
    }
  });

  return null;
};

// ============================================================================
// SINGLE EXTRACTED DIGESTIVE ORGAN MESH CLUSTER
// ============================================================================
const OrganMeshCluster: React.FC<{
  organ: DigestiveOrganData;
  organsScene: THREE.Object3D;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  isIsolated: boolean;
  xrayMode: boolean;
  onSelect: () => void;
  onHover: () => void;
  onUnhover: () => void;
}> = ({
  organ,
  organsScene,
  isSelected,
  isHovered,
  isDimmed,
  isIsolated,
  xrayMode,
  onSelect,
  onHover,
  onUnhover
}) => {
  // Extract matching geometries with baked world transforms
  const geometries = useMemo(() => {
    organsScene.updateMatrixWorld(true);
    const geoms: THREE.BufferGeometry[] = [];
    const targetSet = new Set(organ.meshNodeNames);

    organsScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && targetSet.has(child.name)) {
        const mesh = child as THREE.Mesh;
        const clonedGeom = mesh.geometry.clone();
        clonedGeom.applyMatrix4(mesh.matrixWorld);
        clonedGeom.computeVertexNormals();
        geoms.push(clonedGeom);
      }
    });

    return geoms;
  }, [organsScene, organ.meshNodeNames]);

  // Custom anatomical PBR material per organ type
  const material = useMemo(() => {
    const isTransp = isDimmed || xrayMode;
    let opacity = 1.0;
    if (isSelected) opacity = 1.0;
    else if (xrayMode) opacity = 0.22;
    else if (isDimmed) opacity = 0.40;

    // Base color tones calibrated to international medical models
    let baseColor = '#e28775';
    let roughness = 0.45;
    let metalness = 0.04;

    switch (organ.category) {
      case 'hepatobiliary':
        if (organ.id === 'gallbladder') {
          baseColor = '#4d7c0f'; // Dark amber olive green for gallbladder
          roughness = 0.35;
        } else {
          baseColor = '#881337'; // Deep hepatic red-brown
          roughness = 0.40;
        }
        break;
      case 'pancreas':
        baseColor = '#d97706'; // Golden amber glandular tone
        roughness = 0.55;
        break;
      case 'esophagus_stomach':
        if (organ.id === 'stomach') {
          baseColor = '#e11d48'; // Rich gastric mucosal crimson
          roughness = 0.38;
        } else {
          baseColor = '#fb7185'; // Esophageal muscular pink
        }
        break;
      case 'small_intestine':
        baseColor = '#f97316'; // Enteric salmon-coral tone
        roughness = 0.50;
        break;
      case 'large_intestine':
        baseColor = '#a855f7'; // Colonic haustral lilac-purple tone
        roughness = 0.52;
        break;
      case 'oral_pharynx':
        baseColor = '#f43f5e'; // Lingual & pharyngeal muscular tone
        roughness = 0.42;
        break;
      case 'peritoneum':
        baseColor = '#eab308'; // Omental adipose golden sheen
        roughness = 0.65;
        opacity = 0.55;
        break;
    }

    // Interactive state highlights
    if (isSelected) {
      baseColor = '#f59e0b'; // Amber selection highlight
    } else if (isHovered) {
      baseColor = '#fbbf24';
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(baseColor),
      roughness,
      metalness,
      transparent: isTransp,
      opacity,
      depthWrite: !xrayMode
    });
  }, [organ.id, organ.category, isSelected, isHovered, isDimmed, xrayMode]);

  if (geometries.length === 0) return null;

  return (
    <group
      name={`organ-${organ.id}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onUnhover();
      }}
    >
      {geometries.map((geom, idx) => (
        <mesh key={`${organ.id}-${idx}`} geometry={geom} material={material} castShadow receiveShadow />
      ))}
    </group>
  );
};

// ============================================================================
// SPLANCHNIC VASCULATURE MESH LAYER (Celiac Trunk, Mesenteric & Portal Veins)
// ============================================================================
const SplanchnicVessels: React.FC<{
  vesselsScene: THREE.Object3D;
  visible: boolean;
  xrayMode: boolean;
}> = ({ vesselsScene, visible, xrayMode }) => {
  const arteriesGeom = useMemo(() => {
    vesselsScene.updateMatrixWorld(true);
    const geoms: THREE.BufferGeometry[] = [];

    vesselsScene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.name.toLowerCase().includes('arter')) {
        const cloned = mesh.geometry.clone();
        cloned.applyMatrix4(mesh.matrixWorld);
        cloned.computeVertexNormals();
        geoms.push(cloned);
      }
    });

    return geoms;
  }, [vesselsScene]);

  const veinsGeom = useMemo(() => {
    vesselsScene.updateMatrixWorld(true);
    const geoms: THREE.BufferGeometry[] = [];

    vesselsScene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (
        mesh.isMesh &&
        (mesh.name.toLowerCase().includes('vein') || mesh.name.toLowerCase().includes('vena'))
      ) {
        const cloned = mesh.geometry.clone();
        cloned.applyMatrix4(mesh.matrixWorld);
        cloned.computeVertexNormals();
        geoms.push(cloned);
      }
    });

    return geoms;
  }, [vesselsScene]);

  const arteryMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#dc2626'),
        roughness: 0.35,
        metalness: 0.10,
        transparent: xrayMode,
        opacity: xrayMode ? 0.30 : 0.95
      }),
    [xrayMode]
  );

  const veinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2563eb'),
        roughness: 0.35,
        metalness: 0.10,
        transparent: xrayMode,
        opacity: xrayMode ? 0.30 : 0.95
      }),
    [xrayMode]
  );

  if (!visible) return null;

  return (
    <group name="splanchnic-vessels">
      {arteriesGeom.map((g, i) => (
        <mesh key={`art-${i}`} geometry={g} material={arteryMat} />
      ))}
      {veinsGeom.map((g, i) => (
        <mesh key={`vein-${i}`} geometry={g} material={veinMat} />
      ))}
    </group>
  );
};

// ============================================================================
// MAIN DIGESTIVE 3D SCENE CONTENT
// ============================================================================
const DigestiveScene: React.FC<{
  labelAnchors: DigestiveLabelAnchor[];
  onProjectLabels: (labels: RawProjectedLabel[]) => void;
  focusTrigger: CameraFocusTrigger | null;
  controlsRef: React.RefObject<any>;
}> = ({ labelAnchors, onProjectLabels, focusTrigger, controlsRef }) => {
  const { scene: organsScene } = useGLTF('/models/anatomy/organs_complete.glb');
  const { scene: vesselsScene } = useGLTF('/models/anatomy/vessels_complete.glb');

  const selectedOrganId = useDigestiveStore((s) => s.selectedOrganId);
  const hoveredOrganId = useDigestiveStore((s) => s.hoveredOrganId);
  const visibleLayers = useDigestiveStore((s) => s.visibleLayers);
  const isolatedView = useDigestiveStore((s) => s.isolatedView);
  const xrayMode = useDigestiveStore((s) => s.xrayMode);
  const cameraPreset = useDigestiveStore((s) => s.cameraPreset);
  const selectOrgan = useDigestiveStore((s) => s.selectOrgan);
  const hoverOrgan = useDigestiveStore((s) => s.hoverOrgan);

  const selectedOrganData = useMemo(() => {
    return selectedOrganId ? DIGESTIVE_SYSTEM_DATA[selectedOrganId] || null : null;
  }, [selectedOrganId]);

  // Determine visibility per organ based on layer toggles
  const isOrganVisible = (organ: DigestiveOrganData) => {
    if (isolatedView) return organ.id === selectedOrganId;
    switch (organ.category) {
      case 'oral_pharynx':
        return organ.id === 'salivary_glands' ? visibleLayers.salivary : visibleLayers.giTract;
      case 'esophagus_stomach':
      case 'small_intestine':
      case 'large_intestine':
        return visibleLayers.giTract;
      case 'hepatobiliary':
        return visibleLayers.hepatobiliary;
      case 'pancreas':
        return visibleLayers.pancreas;
      case 'peritoneum':
        return visibleLayers.peritoneum;
      default:
        return true;
    }
  };

  return (
    <>
      <CameraController
        cameraPreset={cameraPreset}
        selectedOrgan={selectedOrganData}
        focusTrigger={focusTrigger}
        controlsRef={controlsRef}
      />

      {/* Studio Anatomical Lighting (natural museum grade, no fake cyan tint) */}
      <ambientLight intensity={0.9} color="#ffffff" />
      <directionalLight position={[4, 8, 6]} intensity={1.4} color="#fffcf5" castShadow />
      <directionalLight position={[-4, 4, -4]} intensity={0.7} color="#f0f4f8" />
      <directionalLight position={[0, -4, 4]} intensity={0.4} color="#fef3c7" />

      {/* Real 3D Segmented Digestive Organs */}
      <group name="digestive-organs-root">
        {DIGESTIVE_STRUCTURE_LIST.map((organ) => {
          if (!isOrganVisible(organ)) return null;
          const isSelected = selectedOrganId === organ.id;
          const isHovered = hoveredOrganId === organ.id;
          const isDimmed = Boolean(selectedOrganId && !isSelected);

          return (
            <OrganMeshCluster
              key={organ.id}
              organ={organ}
              organsScene={organsScene}
              isSelected={isSelected}
              isHovered={isHovered}
              isDimmed={isDimmed}
              isIsolated={isolatedView}
              xrayMode={xrayMode}
              onSelect={() => selectOrgan(organ.id)}
              onHover={() => hoverOrgan(organ.id)}
              onUnhover={() => hoverOrgan(null)}
            />
          );
        })}
      </group>

      {/* Splanchnic Vasculature (Celiac Trunk, SMA, IMA, Portal System) */}
      <SplanchnicVessels
        vesselsScene={vesselsScene}
        visible={visibleLayers.vasculature && !isolatedView}
        xrayMode={xrayMode}
      />

      {/* 3D Real-time Screen-space Label Projector */}
      <DigestiveLabelProjector
        anchors={labelAnchors}
        onProject={onProjectLabels}
      />

      {/* Camera Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={0.12}
        maxDistance={1.6}
        maxPolarAngle={Math.PI - 0.05}
        target={[0.045, 0.30, 0.02]}
      />
    </>
  );
};

// ============================================================================
// STAGE CONTAINER WRAPPER WITH 2D COLLISION-AVOIDING LABEL OVERLAY
// ============================================================================
export interface Digestive3DStageProps {
  showLabels?: boolean;
  focusTrigger?: CameraFocusTrigger | null;
}

export const Digestive3DStage: React.FC<Digestive3DStageProps> = ({
  showLabels = true,
  focusTrigger = null
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  const selectedOrganId = useDigestiveStore((s) => s.selectedOrganId);
  const selectOrgan = useDigestiveStore((s) => s.selectOrgan);
  const isolatedView = useDigestiveStore((s) => s.isolatedView);
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  // Track container dimensions for collision avoidance
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 });

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

  // Raw projected labels from 3D space
  const [rawLabels, setRawLabels] = useState<RawProjectedLabel[]>([]);

  // 3D Anchors for projected Anatomy Labels
  const labelAnchors = useMemo<DigestiveLabelAnchor[]>(() => {
    if (!showLabels) return [];

    return DIGESTIVE_STRUCTURE_LIST.map((organ) => {
      const isSelected = selectedOrganId === organ.id;
      // Core GI organs get priority 2, other organs get priority 3
      const isCore =
        organ.id === 'stomach' ||
        organ.id === 'liver' ||
        organ.id === 'pancreas' ||
        organ.id === 'duodenum' ||
        organ.id === 'gallbladder' ||
        organ.id === 'appendix';

      return {
        id: organ.id,
        nameVi: organ.nameVi,
        nameEn: organ.nameEn,
        subtitle: organ.nameLa,
        worldPos: organ.canonicalCenter,
        priority: isSelected ? 1 : isCore ? 2 : 3,
        isSelected,
        isCritical: isCore
      };
    });
  }, [selectedOrganId, showLabels]);

  // Compute placed labels with collision avoidance
  const placedLabels: PlacedLabel[] = useMemo(() => {
    if (!showLabels || rawLabels.length === 0) return [];

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
      showContext: !isolatedView,
      maxVisibleLabels: containerSize.width < 640 ? 3 : containerSize.width < 1024 ? 5 : 8
    });
  }, [rawLabels, containerSize, showLabels, isolatedView]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[460px] overflow-hidden select-none ${
        isDark ? 'bg-[#080c14]' : 'bg-[#f4efe8]'
      }`}
    >
      <Canvas
        camera={{ position: [0.045, 0.35, 0.65], fov: 42, near: 0.05, far: 20 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <DigestiveScene
            labelAnchors={labelAnchors}
            onProjectLabels={setRawLabels}
            focusTrigger={focusTrigger}
            controlsRef={controlsRef}
          />
        </Suspense>
      </Canvas>

      {/* 2D Collision-Avoiding Anatomy Labels Overlay */}
      {showLabels && (
        <DigestiveLabelLayer
          labels={placedLabels}
          selectedId={selectedOrganId}
          onSelect={(id) => selectOrgan(id)}
        />
      )}
    </div>
  );
};

// Pre-load assets
useGLTF.preload('/models/anatomy/organs_complete.glb');
useGLTF.preload('/models/anatomy/vessels_complete.glb');
