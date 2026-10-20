import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import {
  DIGESTIVE_SYSTEM_DATA,
  DIGESTIVE_STRUCTURE_LIST,
  DigestiveOrganData
} from '../../data/digestiveSystemData';
import { useDigestiveStore, DigestiveCameraPreset } from '../../stores/useDigestiveStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

// ============================================================================
// CAMERA CONTROLLER: SMOOTH TRANSITION TO PRESETS OR SELECTED ORGAN BOUNDS
// ============================================================================
const CameraController: React.FC<{
  cameraPreset: DigestiveCameraPreset;
  selectedOrgan: DigestiveOrganData | null;
}> = ({ cameraPreset, selectedOrgan }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Target camera state
  const targetLookAt = useRef(new THREE.Vector3(0.045, 0.30, 0.02));
  const targetPosition = useRef(new THREE.Vector3(0.045, 0.35, 0.65));
  const isTransitioning = useRef(true);

  // Update target when preset or selected organ changes
  useEffect(() => {
    isTransitioning.current = true;
    if (selectedOrgan) {
      targetLookAt.current.set(...selectedOrgan.cameraPreset.target);
      targetPosition.current.set(...selectedOrgan.cameraPreset.position);
    } else {
      switch (cameraPreset) {
        case 'oral':
          targetLookAt.current.set(0.045, 0.74, 0.04);
          targetPosition.current.set(0.045, 0.78, 0.30);
          break;
        case 'gastroduodenal':
          targetLookAt.current.set(0.05, 0.30, 0.02);
          targetPosition.current.set(0.05, 0.34, 0.36);
          break;
        case 'small_bowel':
          targetLookAt.current.set(0.045, 0.14, 0.03);
          targetPosition.current.set(0.045, 0.18, 0.38);
          break;
        case 'colorectal':
          targetLookAt.current.set(0.05, 0.15, 0.01);
          targetPosition.current.set(0.05, 0.18, 0.45);
          break;
        case 'hepatobiliary':
          targetLookAt.current.set(0.02, 0.34, 0.04);
          targetPosition.current.set(0.02, 0.38, 0.38);
          break;
        case 'pancreas':
          targetLookAt.current.set(0.045, 0.28, 0.0);
          targetPosition.current.set(0.045, 0.31, 0.28);
          break;
        case 'posterior':
          targetLookAt.current.set(0.045, 0.30, 0.0);
          targetPosition.current.set(0.045, 0.35, -0.65);
          break;
        case 'overview':
        default:
          targetLookAt.current.set(0.045, 0.30, 0.02);
          targetPosition.current.set(0.045, 0.35, 0.65);
          break;
      }
    }
  }, [cameraPreset, selectedOrgan]);

  // Smooth lerp frame loop
  useFrame((_, delta) => {
    if (!isTransitioning.current) return;
    const factor = Math.min(1.0, delta * 4.5);
    camera.position.lerp(targetPosition.current, factor);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, factor);
      controlsRef.current.update();
    }
    if (camera.position.distanceTo(targetPosition.current) < 0.005) {
      isTransitioning.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={0.12}
      maxDistance={1.4}
      maxPolarAngle={Math.PI - 0.05}
      target={[0.045, 0.30, 0.02]}
    />
  );
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
    else if (isDimmed) opacity = 0.45;

    // Base color tones calibrated to international medical models
    let baseColor = '#e28775';
    let roughness = 0.45;
    let metalness = 0.04;

    switch (organ.category) {
      case 'hepatobiliary':
        if (organ.id === 'gallbladder') {
          baseColor = '#10b981'; // Vibrant emerald-green bile
          roughness = 0.30;
          metalness = 0.12;
        } else {
          baseColor = '#9a3412'; // Rich deep hepatic reddish-brown
          roughness = 0.42;
        }
        break;
      case 'esophagus_stomach':
        if (organ.id === 'esophagus') {
          baseColor = '#f472b6'; // Muscular esophageal pink
          roughness = 0.50;
        } else {
          baseColor = '#ea580c'; // Gastric mucous-amber warm tone
          roughness = 0.40;
        }
        break;
      case 'pancreas':
        baseColor = '#eab308'; // Lobulated pancreatic amber-yellow
        roughness = 0.55;
        metalness = 0.05;
        break;
      case 'small_intestine':
        baseColor = organ.id === 'duodenum' ? '#f97316' : '#fb923c';
        roughness = 0.48;
        break;
      case 'large_intestine':
        baseColor = organ.id === 'appendix' ? '#dc2626' : '#a16207';
        roughness = 0.52;
        break;
      case 'peritoneum':
        baseColor = '#ca8a04';
        roughness = 0.35;
        opacity = isSelected ? 0.70 : (isTransp ? 0.15 : 0.40);
        break;
      case 'oral_pharynx':
        baseColor = '#f43f5e';
        roughness = 0.45;
        break;
      default:
        baseColor = '#d97706';
        break;
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(baseColor),
      roughness,
      metalness,
      transparent: isTransp || organ.category === 'peritoneum',
      opacity,
      depthWrite: !isTransp,
      emissive: isSelected ? new THREE.Color('#fbbf24') : (isHovered ? new THREE.Color('#38bdf8') : new THREE.Color('#000000')),
      emissiveIntensity: isSelected ? 0.55 : (isHovered ? 0.30 : 0.0)
    });
  }, [organ.id, organ.category, isSelected, isHovered, isDimmed, xrayMode]);

  if (isIsolated && !isSelected) return null;
  if (geometries.length === 0) return null;

  return (
    <group
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
        <mesh
          key={`${organ.id}-mesh-${idx}`}
          geometry={geom}
          material={material}
          castShadow={isSelected}
          receiveShadow
        />
      ))}
    </group>
  );
};

// ============================================================================
// SPLANCHNIC VASCULATURE MESH LAYER (From vessels_complete.glb)
// ============================================================================
const SplanchnicVessels: React.FC<{
  vesselsScene: THREE.Object3D;
  visible: boolean;
  xrayMode: boolean;
}> = ({ vesselsScene, visible, xrayMode }) => {
  const arteriesGeom = useMemo(() => {
    vesselsScene.updateMatrixWorld(true);
    const geoms: THREE.BufferGeometry[] = [];
    const targetArteries = new Set([
      'Coeliac trunk',
      'Common hepatic artery',
      'Proper hepatic artery',
      'Left gastric artery',
      'Splenic artery',
      'Superior mesenteric artery',
      'Right colic artery',
      'Middle colic artery',
      'Ileocolic artery',
      'Inferior mesenteric artery',
      'Left colic artery',
      'Superior anorectal artery',
      'Inferior pancreaticoduodenal artery'
    ]);

    vesselsScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && targetArteries.has(child.name)) {
        const mesh = child as THREE.Mesh;
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
    const targetVeins = new Set([
      'Hepatic portal vein',
      'Inferior mesenteric vein'
    ]);

    vesselsScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && targetVeins.has(child.name)) {
        const mesh = child as THREE.Mesh;
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
// 3D ANATOMICAL PIN LABELS OVERLAY
// ============================================================================
const Anatomical3DLabels: React.FC<{
  showLabels: boolean;
  selectedOrganId: string | null;
  onSelectOrgan: (id: string) => void;
  isVi: boolean;
}> = ({ showLabels, selectedOrganId, onSelectOrgan, isVi }) => {
  if (!showLabels) return null;

  return (
    <group name="anatomical-3d-labels">
      {DIGESTIVE_STRUCTURE_LIST.map((organ) => {
        const isSelected = selectedOrganId === organ.id;
        const name = isVi ? organ.nameVi : organ.nameEn;

        return (
          <Html
            key={`label-${organ.id}`}
            position={organ.canonicalCenter}
            center
            distanceFactor={1.2}
            zIndexRange={[10, 50]}
            style={{
              pointerEvents: 'auto',
              transition: 'transform 0.15s ease, opacity 0.15s ease'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectOrgan(organ.id);
              }}
              className={`group flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-sans font-medium whitespace-nowrap border transition-all cursor-pointer shadow-sm select-none ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-400 ring-2 ring-amber-400/50 scale-105'
                  : 'bg-slate-900/85 hover:bg-slate-900 text-slate-200 hover:text-white border-slate-700 hover:border-slate-500'
              }`}
              title={`${name} (${organ.nameLa})`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-white animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="truncate max-w-[120px]">{name}</span>
            </button>
          </Html>
        );
      })}
    </group>
  );
};

// ============================================================================
// MAIN DIGESTIVE 3D SCENE ROOT
// ============================================================================
const DigestiveScene: React.FC<{
  showLabels: boolean;
}> = ({ showLabels }) => {
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
  const language = useAnatomyStore((s) => s.language);
  const isVi = language === 'vi';

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
      <CameraController cameraPreset={cameraPreset} selectedOrgan={selectedOrganData} />

      {/* Studio Anatomical Lighting (restrained, no cyan tint slop) */}
      <ambientLight intensity={0.9} color="#ffffff" />
      <directionalLight position={[4, 8, 6]} intensity={1.3} color="#fffcf5" castShadow />
      <directionalLight position={[-4, 4, -4]} intensity={0.65} color="#f0f4f8" />
      <directionalLight position={[0, -4, 4]} intensity={0.35} color="#fef3c7" />

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

      {/* 3D Anatomical Pin Labels */}
      <Anatomical3DLabels
        showLabels={showLabels}
        selectedOrganId={selectedOrganId}
        onSelectOrgan={selectOrgan}
        isVi={isVi}
      />
    </>
  );
};

// ============================================================================
// CANVAS CONTAINER WRAPPER
// ============================================================================
export const Digestive3DStage: React.FC<{
  showLabels: boolean;
}> = ({ showLabels }) => {
  const isDark = useAnatomyStore((s) => s.atelierTheme === 'dark');

  return (
    <div className="relative w-full h-full min-h-[460px] overflow-hidden select-none">
      <Canvas
        camera={{ position: [0.045, 0.35, 0.65], fov: 42, near: 0.05, far: 20 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          isDark ? 'bg-[#0b0f17]' : 'bg-[#f4efe8]'
        }`}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-900/90 text-slate-200 border border-slate-700 text-xs shadow-lg">
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <span>Đang tải mô hình Hệ Tiêu Hóa 3D…</span>
              </div>
            </Html>
          }
        >
          <DigestiveScene showLabels={showLabels} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Pre-load assets
useGLTF.preload('/models/anatomy/organs_complete.glb');
useGLTF.preload('/models/anatomy/vessels_complete.glb');
