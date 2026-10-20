import React, { useMemo, useRef, useState, useEffect, Suspense, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {
  VASCULAR_STRUCTURES,
  VascularStructureData,
  getVascularStructureById,
  getVesselsByRegion
} from '../../data/vascularSystemData';
import { useVascularStore } from '../../stores/useVascularStore';
import {
  LabelLayoutManager,
  TopControlsManager,
  ToolbarSafeArea,
  LayoutObstacle,
  RawProjectedLabel,
  PlacedLabel
} from '../../utils/ViewerLayoutManager';
import { VascularLabelProjector, VascularLabelAnchor } from './VascularLabelProjector';
import { VascularLabelLayer } from './VascularLabelLayer';
import { VascularToolbar } from './VascularToolbar';

// ============================================================================
// CAMERA CONTROLLER: SMOOTH GLIDE TO PRESETS OR SELECTED VESSEL
// ============================================================================
interface CameraFocusTarget {
  position: [number, number, number];
  target: [number, number, number];
  timestamp: number;
}

const CameraController: React.FC<{
  focusTarget: CameraFocusTarget | null;
  controlsRef: React.RefObject<any>;
}> = ({ focusTarget, controlsRef }) => {
  const { camera } = useThree();

  const animRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 600,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(0.045, 0.45, 0.70),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(0.045, 0.35, 0.0),
    lastTimestamp: 0
  });

  useEffect(() => {
    if (!focusTarget || focusTarget.timestamp === animRef.current.lastTimestamp) return;
    animRef.current.lastTimestamp = focusTarget.timestamp;

    animRef.current.startPos.copy(camera.position);
    animRef.current.endPos.set(...focusTarget.position);

    if (controlsRef.current) {
      animRef.current.startTarget.copy(controlsRef.current.target);
    } else {
      animRef.current.startTarget.set(...focusTarget.target);
    }
    animRef.current.endTarget.set(...focusTarget.target);

    animRef.current.startTime = performance.now();
    animRef.current.isAnimating = true;
  }, [focusTarget, camera, controlsRef]);

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
// 3D VASCULAR SCENE MESH ENGINE
// ============================================================================
const VascularModelContent: React.FC<{
  onSelectMesh: (vesselId: string) => void;
  onHoverMesh: (vesselId: string | null) => void;
}> = ({ onSelectMesh, onHoverMesh }) => {
  const { scene } = useGLTF('/models/anatomy/vessels_complete.glb');
  const {
    selectedVesselId,
    hoveredVesselId,
    activeRegion,
    typeFilter,
    isolatedView,
    xrayMode
  } = useVascularStore();

  // Mapping from mesh node name to VascularStructureData
  const meshToStructureMap = useMemo(() => {
    const map = new Map<string, VascularStructureData>();
    for (const s of VASCULAR_STRUCTURES) {
      for (const m of s.meshNodeNames) {
        map.set(m, s);
      }
    }
    return map;
  }, []);

  // Material Pool for maximum WebGL rendering performance
  const materials = useMemo(() => {
    return {
      // Highlighted (Selected vessel)
      highlight: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f59e0b'),
        emissive: new THREE.Color('#d97706'),
        emissiveIntensity: 0.65,
        roughness: 0.22,
        metalness: 0.15,
        transparent: false,
        depthWrite: true
      }),
      // Hovered
      hover: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38bdf8'),
        emissive: new THREE.Color('#0284c7'),
        emissiveIntensity: 0.45,
        roughness: 0.28,
        metalness: 0.10
      }),
      // Arteries (Default)
      arteryNormal: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#dc2626'),
        roughness: 0.38,
        metalness: 0.08
      }),
      // Arteries (Dimmed)
      arteryDimmed: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#991b1b'),
        roughness: 0.50,
        metalness: 0.04,
        transparent: true,
        opacity: 0.16,
        depthWrite: false
      }),
      // Veins (Default)
      veinNormal: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2563eb'),
        roughness: 0.38,
        metalness: 0.08
      }),
      // Veins (Dimmed)
      veinDimmed: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1e40af'),
        roughness: 0.50,
        metalness: 0.04,
        transparent: true,
        opacity: 0.16,
        depthWrite: false
      }),
      // Heart/Cardiac (Default)
      heartNormal: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#be123c'),
        roughness: 0.42,
        metalness: 0.06
      }),
      // Heart/Cardiac (Dimmed)
      heartDimmed: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#881337'),
        roughness: 0.55,
        metalness: 0.02,
        transparent: true,
        opacity: 0.14,
        depthWrite: false
      }),
      // X-Ray Shaders
      xrayArtery: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ef4444'),
        emissive: new THREE.Color('#b91c1c'),
        emissiveIntensity: 0.2,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.25,
        depthWrite: false
      }),
      xrayVein: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3b82f6'),
        emissive: new THREE.Color('#1d4ed8'),
        emissiveIntensity: 0.2,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.25,
        depthWrite: false
      })
    };
  }, []);

  // Selected structure object
  const selectedStructure = useMemo(() => {
    return selectedVesselId ? getVascularStructureById(selectedVesselId) : null;
  }, [selectedVesselId]);

  // Selected mesh names set
  const selectedMeshSet = useMemo(() => {
    if (!selectedStructure) return new Set<string>();
    return new Set(selectedStructure.meshNodeNames);
  }, [selectedStructure]);

  // Hovered mesh names set
  const hoveredMeshSet = useMemo(() => {
    if (!hoveredVesselId) return new Set<string>();
    const struct = getVascularStructureById(hoveredVesselId);
    return struct ? new Set(struct.meshNodeNames) : new Set<string>();
  }, [hoveredVesselId]);

  // Apply materials dynamically across all 676 meshes
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const struct = meshToStructureMap.get(mesh.name);

        const isMeshSelected = selectedMeshSet.has(mesh.name);
        const isMeshHovered = hoveredMeshSet.has(mesh.name);

        // Filter checks
        let isFilteredOut = false;
        if (typeFilter !== 'all') {
          if (struct && struct.type !== typeFilter) {
            isFilteredOut = true;
          } else if (!struct) {
            const isVein = /vein|sinus/i.test(mesh.name);
            if (typeFilter === 'artery' && isVein) isFilteredOut = true;
            if (typeFilter === 'vein' && !isVein) isFilteredOut = true;
          }
        }

        // Region isolation checks
        let isRegionHidden = false;
        if (activeRegion !== 'all') {
          if (struct && struct.region !== activeRegion && !isMeshSelected) {
            isRegionHidden = true;
          }
        }

        // Visibility
        if (isolatedView) {
          mesh.visible = isMeshSelected;
        } else if (isFilteredOut) {
          mesh.visible = false;
        } else if (isRegionHidden) {
          // Dim significantly
          mesh.visible = true;
        } else {
          mesh.visible = true;
        }

        if (!mesh.visible) return;

        // Material assignment
        if (isMeshSelected) {
          mesh.material = materials.highlight;
        } else if (isMeshHovered) {
          mesh.material = materials.hover;
        } else if (xrayMode) {
          const isVein = struct ? struct.type === 'vein' : /vein|sinus/i.test(mesh.name);
          mesh.material = isVein ? materials.xrayVein : materials.xrayArtery;
        } else if (selectedVesselId || isRegionHidden) {
          // Dim other structures
          const isVein = struct ? struct.type === 'vein' : /vein|sinus/i.test(mesh.name);
          const isHeart = struct ? struct.type === 'cardiac' : /atrium|ventricle|leaflet/i.test(mesh.name);
          if (isHeart) {
            mesh.material = materials.heartDimmed;
          } else if (isVein) {
            mesh.material = materials.veinDimmed;
          } else {
            mesh.material = materials.arteryDimmed;
          }
        } else {
          // Normal mode
          const isVein = struct ? struct.type === 'vein' : /vein|sinus/i.test(mesh.name);
          const isHeart = struct ? struct.type === 'cardiac' : /atrium|ventricle|leaflet/i.test(mesh.name);
          if (isHeart) {
            mesh.material = materials.heartNormal;
          } else if (isVein) {
            mesh.material = materials.veinNormal;
          } else {
            mesh.material = materials.arteryNormal;
          }
        }
      }
    });
  }, [
    scene,
    selectedMeshSet,
    hoveredMeshSet,
    selectedVesselId,
    activeRegion,
    typeFilter,
    isolatedView,
    xrayMode,
    meshToStructureMap,
    materials
  ]);

  return (
    <primitive
      object={scene}
      onPointerDown={(e: any) => {
        e.stopPropagation();
        const meshName = e.object.name;
        const struct = meshToStructureMap.get(meshName);
        if (struct) {
          onSelectMesh(struct.id);
        }
      }}
      onPointerOver={(e: any) => {
        e.stopPropagation();
        const meshName = e.object.name;
        const struct = meshToStructureMap.get(meshName);
        if (struct) {
          onHoverMesh(struct.id);
        }
      }}
      onPointerOut={(e: any) => {
        e.stopPropagation();
        onHoverMesh(null);
      }}
    />
  );
};

// ============================================================================
// MASTER 3D VASCULAR STAGE
// ============================================================================
export const Vascular3DStage: React.FC = () => {
  const {
    selectedVesselId,
    activeRegion,
    isolatedView,
    showLabels,
    cameraTrigger,
    selectVessel,
    hoverVessel,
    getSelectedVesselData
  } = useVascularStore();

  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Projected 2D labels state
  const [placedLabels, setPlacedLabels] = useState<PlacedLabel[]>([]);
  const [focusTarget, setFocusTarget] = useState<CameraFocusTarget | null>(null);

  // Trigger camera move when selected vessel or cameraTrigger updates
  useEffect(() => {
    const vessel = getSelectedVesselData();
    if (vessel) {
      setFocusTarget({
        position: vessel.cameraPreset.position,
        target: vessel.cameraPreset.target,
        timestamp: Date.now()
      });
    }
  }, [selectedVesselId, cameraTrigger, getSelectedVesselData]);

  // Set camera angle manually
  const handleSetCameraAngle = (angle: 'front' | 'back' | 'left' | 'right' | 'top') => {
    const vessel = getSelectedVesselData();
    const center: [number, number, number] = vessel ? vessel.canonicalCenter : [0.045, 0.35, 0.0];
    const dist = vessel ? 0.22 : 0.65;

    let pos: [number, number, number];
    switch (angle) {
      case 'front':
        pos = [center[0], center[1], center[2] + dist];
        break;
      case 'back':
        pos = [center[0], center[1], center[2] - dist];
        break;
      case 'left':
        pos = [center[0] - dist, center[1], center[2]];
        break;
      case 'right':
        pos = [center[0] + dist, center[1], center[2]];
        break;
      case 'top':
        pos = [center[0], center[1] + dist, center[2] + 0.02];
        break;
    }

    setFocusTarget({
      position: pos,
      target: center,
      timestamp: Date.now()
    });
  };

  // Build active label anchors
  const labelAnchors = useMemo<VascularLabelAnchor[]>(() => {
    if (!showLabels) return [];

    const anchors: VascularLabelAnchor[] = [];
    const selected = getSelectedVesselData();

    // 1. Selected Vessel is always priority 1
    if (selected) {
      anchors.push({
        id: selected.id,
        nameVi: selected.nameVi,
        nameEn: selected.nameEn,
        subtitle: selected.nameLa.split(' ')[0],
        worldPos: selected.canonicalCenter,
        priority: 1,
        isSelected: true,
        isCritical: true
      });
    }

    // 2. Add candidates from active region or top landmarks
    let candidates: VascularStructureData[] = [];
    if (activeRegion !== 'all') {
      candidates = getVesselsByRegion(activeRegion);
    } else {
      // Pick key anatomical landmarks across regions
      const landmarkIds = [
        'ascending_aorta',
        'brachiocephalic_trunk',
        'anterior_interventricular_artery',
        'right_coronary_artery',
        'common_carotid_artery_left',
        'middle_cerebral_artery_m1',
        'superior_sagittal_sinus',
        'brachial_artery',
        'radial_artery',
        'pulmonary_trunk',
        'celiac_trunk',
        'superior_mesenteric_artery',
        'renal_artery_left',
        'femoral_artery',
        'anterior_tibial_artery',
        'great_saphenous_vein'
      ];
      candidates = VASCULAR_STRUCTURES.filter((v) => landmarkIds.includes(v.id));
    }

    for (const v of candidates) {
      if (v.id === selectedVesselId) continue;
      anchors.push({
        id: v.id,
        nameVi: v.nameVi,
        nameEn: v.nameEn,
        subtitle: v.nameLa.split(' ')[0],
        worldPos: v.canonicalCenter,
        priority: 2,
        isSelected: false,
        isCritical: false
      });
    }

    return anchors;
  }, [showLabels, selectedVesselId, activeRegion, getSelectedVesselData]);

  // Handle projected 2D labels and run collision avoidance
  const handleProjectedLabels = useCallback(
    (rawLabels: RawProjectedLabel[]) => {
      if (!containerRef.current || rawLabels.length === 0) {
        setPlacedLabels([]);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = rect.width;
      const viewportHeight = rect.height;

      // Define obstacles (floating toolbar at bottom, etc.)
      const obstacles: LayoutObstacle[] = [
        {
          id: 'bottom-toolbar',
          type: 'bottom-toolbar',
          ...ToolbarSafeArea.getBounds(viewportWidth, viewportHeight)
        }
      ];

      const placed = LabelLayoutManager.resolveLayout(rawLabels, obstacles, {
        containerWidth: viewportWidth,
        containerHeight: viewportHeight,
        showContext: !isolatedView,
        maxVisibleLabels: viewportWidth < 640 ? 3 : viewportWidth < 1024 ? 5 : 8
      });

      setPlacedLabels(placed);
    },
    [isolatedView]
  );

  return (
    <div
      ref={containerRef}
      data-ui="vascular-3d-stage-container"
      className="relative flex-1 w-full h-full min-h-[460px] overflow-hidden bg-gradient-to-b from-[#070b12] to-[#0a0f1d] select-none"
    >
      <Canvas
        camera={{ position: [0.045, 0.45, 0.70], fov: 45, near: 0.01, far: 20 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={['#070b12']} />

        {/* Ambient & Directional Medical Studio Lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 4]} intensity={1.8} />
        <directionalLight position={[-2, 1, 2]} intensity={1.0} />
        <directionalLight position={[0, -2, -2]} intensity={0.6} />

        {/* Orbit Controls with bounded damping */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={0.06}
          maxDistance={3.0}
        />

        {/* Camera glide controller */}
        <CameraController focusTarget={focusTarget} controlsRef={controlsRef} />

        {/* 3D Vascular Models */}
        <Suspense fallback={null}>
          <VascularModelContent
            onSelectMesh={(id) => selectVessel(id)}
            onHoverMesh={(id) => hoverVessel(id)}
          />

          {/* 3D to 2D Anchor Projector */}
          {showLabels && (
            <VascularLabelProjector
              anchors={labelAnchors}
              onProject={handleProjectedLabels}
            />
          )}
        </Suspense>
      </Canvas>

      {/* 2D Collision-Free Projected Label Overlay */}
      {showLabels && (
        <VascularLabelLayer
          labels={placedLabels}
          selectedId={selectedVesselId}
          onSelect={(id) => selectVessel(id)}
        />
      )}

      {/* Floating Bottom Toolbar */}
      <VascularToolbar onSetCameraAngle={handleSetCameraAngle} />
    </div>
  );
};
