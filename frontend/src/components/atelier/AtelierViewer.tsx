import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment, ContactShadows } from '@react-three/drei';
import { Sparkles, Volume2 } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { ATELIER_ORGANS, Hotspot } from '../../data/fullOrgansData';
import { getHotspotVi } from '../../data/hotspotsVi';
import { DEEP_STRUCTURES_MAP } from '../../data/deepStructures';
import { CameraController } from '../3d/CameraController';
import { AnatomyBreadcrumbs } from '../ui/AnatomyBreadcrumbs';
import { SmartFocusToolbar } from '../ui/SmartFocusToolbar';

// Bone organ list for osteological PBR shader tuning
const BONE_SPECIMENS = new Set([
  'skull',
  'spine',
  'ribcage',
  'pelvis',
  'knee',
  'shoulder',
  'hip',
  'hand',
  'foot',
  'long-bone',
  'dentomaxillofacial'
]);

interface SpecimenGroupProps {
  modelPath: string;
  specimenId: string;
  isHeart: boolean;
  pulseEnabled: boolean;
  clippingPlanes: THREE.Plane[];
  showHotspots: boolean;
  isModalOpen: boolean;
  isLayersActive: boolean;
  hotspots: Hotspot[];
  activeHotspotId: string | null;
  explodeFactor: number;
  onSelectHotspot: (hs: Hotspot, pos: [number, number, number]) => void;
  onMeshClick: (center: THREE.Vector3, size: THREE.Vector3) => void;
  isVi: boolean;
}

const SpecimenGroup: React.FC<SpecimenGroupProps> = ({
  modelPath,
  specimenId,
  isHeart,
  pulseEnabled,
  clippingPlanes,
  showHotspots,
  isModalOpen,
  isLayersActive,
  hotspots,
  activeHotspotId,
  explodeFactor,
  onSelectHotspot,
  onMeshClick,
  isVi
}) => {
  const { scene } = useGLTF(modelPath);
  const pulseGroupRef = useRef<THREE.Group>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);

  const isBone = BONE_SPECIMENS.has(specimenId);
  const deepData = DEEP_STRUCTURES_MAP[specimenId];

  // Mathematically robust centering & scaling: Guarantees (0, 0, 0) center for all models (including Brain & Skin)
  const { normalizedScene, scaleFactor, center, rawSize } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const c = new THREE.Vector3();
    box.getCenter(c);

    const maxDim = Math.max(size.x, size.y, size.z);
    const sf = maxDim > 0 ? 1.4 / maxDim : 1;

    // Put cloned into inner group offset by -c, then scale the outer wrapper
    const innerGroup = new THREE.Group();
    innerGroup.position.set(-c.x, -c.y, -c.z);
    innerGroup.add(cloned);

    const wrapper = new THREE.Group();
    wrapper.scale.set(sf, sf, sf);
    wrapper.position.set(0, 0, 0);
    wrapper.add(innerGroup);
    wrapper.updateMatrixWorld(true);

    return { normalizedScene: wrapper, scaleFactor: sf, center: c, rawSize: size };
  }, [scene]);

  // Enhanced PBR osteological, tissue, and Dissection Layers shaders
  useMemo(() => {
    normalizedScene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        // ONLY compute normals if mesh has none to avoid breaking textured normal maps
        if (!child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals();
        }

        const origMat = child.material;
        const mat = origMat.clone();
        mat.clippingPlanes = clippingPlanes;
        mat.clipShadows = true;
        mat.side = THREE.DoubleSide; // Prevents back-face hollow clipping

        if (isLayersActive) {
          // Anatomical Dissection / Muscle Fiber & Deep Vasculature Shader (Exact match to Image 2)
          mat.wireframe = true;
          mat.wireframeLinewidth = 1.2;
          mat.color = new THREE.Color(isBone ? '#8c7f73' : '#c95042');
          mat.roughness = 0.5;
          mat.metalness = 0.15;
          mat.envMapIntensity = 0.6;
        } else if (isBone) {
          // Photorealistic Medical Osteological Bone Shader
          mat.roughness = 0.52;
          mat.metalness = 0.02;
          mat.envMapIntensity = 0.8;
          if (!origMat.map) {
            mat.color = new THREE.Color('#f5eee4'); // Warm clinical bone ivory
          }
        } else if (specimenId === 'brain') {
          // Neuroanatomical Lobe & Sub-structure Color Coding (Netter / Sobotta Atlas standard)
          const nameLower = (child.name || '').toLowerCase();
          let brainColor = '#eddcd2'; // Default cortical tissue

          if (
            nameLower.includes('frontal') ||
            nameLower.includes('precentral') ||
            nameLower.includes('rectus') ||
            nameLower.includes('orbital') ||
            nameLower.includes('subcallosal')
          ) {
            // Thùy trán (Frontal Lobe) - Warm Coral Rose
            brainColor = '#e57373';
          } else if (
            nameLower.includes('temporal') ||
            nameLower.includes('hippocamp') ||
            nameLower.includes('parahippocamp') ||
            nameLower.includes('fusiform') ||
            nameLower.includes('amygdal')
          ) {
            // Thùy thái dương (Temporal Lobe) - Royal Medical Blue
            brainColor = '#64b5f6';
          } else if (
            nameLower.includes('parietal') ||
            nameLower.includes('postcentral') ||
            nameLower.includes('precuneus') ||
            nameLower.includes('supramarginal') ||
            nameLower.includes('angular') ||
            nameLower.includes('cingulate')
          ) {
            // Thùy đỉnh (Parietal Lobe) - Golden Amber
            brainColor = '#ffb74d';
          } else if (
            nameLower.includes('occipital') ||
            nameLower.includes('cuneus') ||
            nameLower.includes('lingual') ||
            nameLower.includes('calcarine')
          ) {
            // Thùy chẩm (Occipital Lobe) - Emerald / Jade Green
            brainColor = '#81c784';
          } else if (
            nameLower.includes('cerebell') ||
            nameLower.includes('lobule') ||
            nameLower.includes('culmen') ||
            nameLower.includes('declive') ||
            nameLower.includes('folium') ||
            nameLower.includes('tuber') ||
            nameLower.includes('pyramis') ||
            nameLower.includes('uvula') ||
            nameLower.includes('nodule') ||
            nameLower.includes('tonsil') ||
            nameLower.includes('flocculus')
          ) {
            // Tiểu não (Cerebellum) - Royal Violet
            brainColor = '#ba68c8';
          } else if (
            nameLower.includes('pons') ||
            nameLower.includes('medulla') ||
            nameLower.includes('midbrain') ||
            nameLower.includes('colliculus') ||
            nameLower.includes('peduncle') ||
            nameLower.includes('olive') ||
            nameLower.includes('nucleus') ||
            nameLower.includes('nerve')
          ) {
            // Thân não (Brainstem: Cầu não, Hành não, Trung não) - Terracotta Ochre
            brainColor = '#ff8a65';
          } else {
            // Thể chai, gian não & chất trắng - Ivory Cream
            brainColor = '#fff3e0';
          }

          mat.color = new THREE.Color(brainColor);
          mat.roughness = 0.38;
          mat.metalness = 0.03;
          mat.envMapIntensity = 1.1;
        } else if (origMat.map) {
          // Textured models like Skin (Da) - Preserve original textures, maps, and roughness!
          mat.roughness = origMat.roughness ?? 0.7;
          mat.metalness = origMat.metalness ?? 0.05;
          mat.envMapIntensity = 0.8;
        } else {
          // Moist Visceral Organ Tissue Shader
          mat.roughness = 0.35;
          mat.metalness = 0.04;
          mat.envMapIntensity = 1.0;
        }

        child.material = mat;
      }
    });
  }, [normalizedScene, clippingPlanes, isBone, isLayersActive, specimenId]);

  // Primary landmark hotspots filter (Select 5–6 key landmarks to avoid screen clutter, like Image 2)
  const primaryHotspots = useMemo(() => {
    if (!hotspots || hotspots.length === 0) return [];
    if (hotspots.length <= 6) return hotspots;
    return hotspots.slice(0, 6);
  }, [hotspots]);

  // Mathematically project and clamp primary hotspots directly onto the 3D model surface
  const surfaceHotspots = useMemo(() => {
    if (primaryHotspots.length === 0) return [];

    const raycaster = new THREE.Raycaster();
    const centerTarget = new THREE.Vector3(0, 0, 0);

    return primaryHotspots.map((hs) => {
      const matchingStructure = deepData?.structures.find(
        (s) => s.id === hs.id || hs.id.includes(s.id) || s.id.includes(hs.id)
      );
      const expVec = matchingStructure?.explodeVector || [0, 0, 0];

      // Cast ray from outside towards the center
      const rawPos = new THREE.Vector3(...hs.position);
      const origin = rawPos.clone().normalize().multiplyScalar(3.5);
      const dir = new THREE.Vector3().subVectors(centerTarget, origin).normalize();
      raycaster.set(origin, dir);

      const hits = raycaster.intersectObject(normalizedScene, true);

      let basePos: THREE.Vector3;
      let normalVec: THREE.Vector3;

      if (hits.length > 0) {
        // Precise hit on 3D mesh surface
        const hit = hits[0];
        normalVec = hit.face ? hit.face.normal.clone() : new THREE.Vector3(0, 1, 0);
        // Slightly offset outward along normal (2mm) so pin rests directly on exterior
        basePos = hit.point.clone().addScaledVector(normalVec, 0.02);
      } else {
        // Fallback proportional calculation centered at origin
        normalVec = rawPos.clone().normalize();
        basePos = new THREE.Vector3(
          rawPos.x * (scaleFactor * 0.35),
          rawPos.y * (scaleFactor * 0.35),
          rawPos.z * (scaleFactor * 0.35)
        );
      }

      return {
        ...hs,
        basePos,
        normalVec,
        expVec
      };
    });
  }, [primaryHotspots, normalizedScene, scaleFactor, deepData]);

  // Rhythmic cardiac contraction
  useFrame((state) => {
    if (isHeart && pulseEnabled && pulseGroupRef.current) {
      const t = state.clock.getElapsedTime();
      const beat = Math.sin(t * 7.2);
      const pulse = beat > 0.25 ? 1 + Math.pow(beat, 4) * 0.042 : 1;
      pulseGroupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const box = new THREE.Box3().setFromObject(normalizedScene);
    const c = box.getCenter(new THREE.Vector3());
    const s = box.getSize(new THREE.Vector3());
    onMeshClick(c, s);
  };

  return (
    <group ref={pulseGroupRef}>
      {/* 3D Model Mesh with Click Focus Handler */}
      <primitive object={normalizedScene} onPointerDown={handlePointerDown} />

      {/* 3D Hotspot Pins (FIXED screen-pixel size, NEVER grows giant when zooming in!) */}
      {showHotspots &&
        !isModalOpen &&
        surfaceHotspots.map((hs) => {
          const isSelected = activeHotspotId === hs.id;
          const isHovered = hoveredHotspotId === hs.id;
          const showBadge = isSelected || isHovered;

          // Compute position with radial exploded view shift
          const pinX = hs.basePos.x + (hs.expVec[0] || hs.normalVec.x) * (explodeFactor * 0.4);
          const pinY = hs.basePos.y + (hs.expVec[1] || hs.normalVec.y) * (explodeFactor * 0.4);
          const pinZ = hs.basePos.z + (hs.expVec[2] || hs.normalVec.z) * (explodeFactor * 0.4);

          const viName = getHotspotVi(hs.ta);

          return (
            <group key={hs.id} position={[pinX, pinY, pinZ]}>
              {/* Note: NO distanceFactor so pins stay FIXED at 10px on screen without blowing up! */}
              <Html center zIndexRange={[15, 0]}>
                <div
                  className="relative flex items-center justify-center cursor-pointer select-none group"
                  onMouseEnter={() => setHoveredHotspotId(hs.id)}
                  onMouseLeave={() => setHoveredHotspotId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHotspot(hs, [pinX, pinY, pinZ]);
                  }}
                >
                  {/* Subtle Radar Ring on Hover/Selected Only */}
                  {showBadge && (
                    <span
                      className="absolute w-4 h-4 rounded-full opacity-70 animate-ping pointer-events-none"
                      style={{ backgroundColor: hs.color || '#c05a4e' }}
                    />
                  )}

                  {/* Clean, Elegant Medical Pin Bead (Fixed 10px size on screen, never blows up!) */}
                  <div
                    className={`rounded-full border-[1.5px] border-white shadow-md transition-transform duration-150 ${
                      showBadge
                        ? 'w-3.5 h-3.5 ring-2 ring-amber-400 scale-125'
                        : 'w-2.5 h-2.5 opacity-90 hover:opacity-100 hover:scale-125'
                    }`}
                    style={{ backgroundColor: hs.color || '#c05a4e' }}
                  />

                  {/* Compact, Crisp Anatomical Callout Badge (Fixed width, never scales giant) */}
                  {showBadge && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#18202d]/95 text-white border border-amber-400/80 px-2.5 py-1 rounded-lg shadow-xl backdrop-blur-md whitespace-nowrap z-20 pointer-events-none text-left flex flex-col animate-fade-in max-w-[200px]">
                      <div className="text-xs font-bold text-amber-300 leading-snug">
                        {isVi ? viName : hs.ta}
                      </div>
                      <div className="text-[10px] font-serif italic text-slate-300 leading-tight">
                        {hs.ta}
                      </div>
                    </div>
                  )}
                </div>
              </Html>
            </group>
          );
        })}
    </group>
  );
};

// Pedestal / Plinth
const AtelierPlinth: React.FC<{ isDark: boolean; visible: boolean }> = ({ isDark, visible }) => {
  if (!visible) return null;
  return (
    <group position={[0, -0.92, 0]}>
      {/* Plinth Cylinder Base */}
      <mesh receiveShadow position={[0, -0.06, 0]}>
        <cylinderGeometry args={[1.4, 1.5, 0.12, 64]} />
        <meshStandardMaterial
          color={isDark ? '#1a2230' : '#ece3d6'}
          roughness={0.7}
          metalness={0.08}
        />
      </mesh>
      {/* Soft Contact Shadow Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.2, 1.35, 32]} />
        <meshBasicMaterial
          color={isDark ? '#000000' : '#5c4e3e'}
          transparent
          opacity={isDark ? 0.4 : 0.12}
        />
      </mesh>
    </group>
  );
};

export const AtelierViewer: React.FC = () => {
  const activeSpecimenId = useAnatomyStore((s) => s.activeSpecimenId);
  const autoRotate = useAnatomyStore((s) => s.autoRotate);
  const toggleAutoRotate = useAnatomyStore((s) => s.toggleAutoRotate);
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const activeHotspotId = useAnatomyStore((s) => s.activeHotspotId);
  const setActiveHotspot = useAnatomyStore((s) => s.setActiveHotspot);
  const showHotspots = useAnatomyStore((s) => s.showHotspots);
  const crossSection = useAnatomyStore((s) => s.crossSection);
  const isIsolated = useAnatomyStore((s) => s.isIsolated);
  const explodeFactor = useAnatomyStore((s) => s.explodeFactor);
  const triggerCameraFocus = useAnatomyStore((s) => s.triggerCameraFocus);
  const focusOnStructure = useAnatomyStore((s) => s.focusOnStructure);
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const isLayersActive = useAnatomyStore((s) => s.isLayersActive);
  const isInfoOpen = useAnatomyStore((s) => s.isInfoOpen);
  const toggleInfoOpen = useAnatomyStore((s) => s.toggleInfoOpen);
  const setIsInfoOpen = useAnatomyStore((s) => s.setIsInfoOpen);

  const [pulseEnabled] = useState(true);
  const controlsRef = useRef<any>(null);

  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  const specimen = useMemo(() => {
    return (
      ATELIER_ORGANS.find((o) => o.id === activeSpecimenId) ||
      ATELIER_ORGANS[0]
    );
  }, [activeSpecimenId]);

  const clippingPlanes = useMemo(() => {
    if (!crossSection.enabled) return [];
    return [new THREE.Plane(new THREE.Vector3(0, -1, 0), crossSection.y || 0)];
  }, [crossSection]);

  // Click on Mesh: Compute bounding box & distance dynamically
  const handleMeshClick = (center: THREE.Vector3, size: THREE.Vector3) => {
    const maxDim = Math.max(size.x, size.y, size.z);
    const fovRad = (42 * Math.PI) / 180;
    const distance = (maxDim / (2 * Math.tan(fovRad / 2))) * 1.35;

    triggerCameraFocus({
      targetPosition: [center.x, center.y + 0.08, center.z + distance],
      targetLookAt: [center.x, center.y, center.z],
      duration: 800,
      timestamp: Date.now()
    });
  };

  // Click on Hotspot: Focus camera directly onto that specific anatomical landmark
  const handleSelectHotspot = (hs: Hotspot, pos: [number, number, number]) => {
    setActiveHotspot(hs.id);
    setIsInfoOpen(true);

    // Also push to focus stack as sub-structure
    focusOnStructure(hs.id, getHotspotVi(hs.ta), hs.ta, pos);

    triggerCameraFocus({
      targetPosition: [pos[0], pos[1] + 0.08, pos[2] + 0.65],
      targetLookAt: [pos[0], pos[1], pos[2]],
      duration: 750,
      timestamp: Date.now()
    });
  };

  return (
    <section
      className={`relative flex-1 h-full flex flex-col overflow-hidden select-none transition-colors duration-200 ${
        isDark ? 'bg-[#0a0e17]' : 'bg-[#f4ede3]'
      }`}
    >
      {/* 1. Top Breadcrumb Trail & History (Cơ thể người > Hệ cơ quan > Tiêu bản > Cấu trúc con) */}
      <AnatomyBreadcrumbs />

      {/* 2. Top-Left Value & Transplant Notice */}
      <div className="absolute top-16 left-4 z-10 pointer-events-none hidden sm:flex flex-col gap-1 animate-fade-in">
        <div className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
          {isVi ? 'CHI PHÍ ĐIỀU TRỊ / GHÉP TẠNG' : 'TRANSPLANT EPISODE'}
        </div>
        <div className="text-xl lg:text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">
          $1,664,800
        </div>
        <div className="text-[10px] text-rose-600 dark:text-rose-400 font-sans flex items-center gap-1">
          <span>⚠</span>
          <span>{isVi ? 'Ước tính chợ đen: $90,000 – $290,000' : 'ILLEGAL TRADE ESTIMATE: $90,000 to $290,000'}</span>
        </div>
      </div>

      {/* 3. Top-Right Yellow Sticky Tip (Hidden on mobile) */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden md:flex flex-col items-end gap-2">
        <div className="p-3 rounded-2xl border shadow-md bg-[#fff9e6] dark:bg-amber-950/40 border-[#f2e2a8] dark:border-amber-800/60 text-slate-700 dark:text-amber-200 text-xs w-52 leading-relaxed">
          <div className="flex items-center gap-1 font-bold text-amber-800 dark:text-amber-300 text-[11px] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isVi ? 'Gợi ý quan sát' : 'Tip'}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-amber-100/80">
            {isVi
              ? '• Kéo chuột để xoay 360°\n• Cuộn chuột để phóng to/thu nhỏ\n• Nhấp vào chấm tròn để xem giải phẫu'
              : '• Drag to rotate 360°\n• Scroll to zoom\n• Click a dot to learn more'}
          </p>
        </div>
      </div>

      {/* Floating Toggle Button for Atelier Dossier */}
      <button
        onClick={toggleInfoOpen}
        className={`fixed top-32 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md transition-all cursor-pointer ${
          isInfoOpen
            ? 'bg-amber-600 text-white shadow-amber-500/30'
            : isDark
            ? 'bg-slate-900/90 border border-slate-800 text-amber-400 hover:text-white'
            : 'bg-white/90 border border-[#e7ded3] text-amber-700 hover:text-black'
        }`}
        title="Đóng / Mở hồ sơ tiêu bản"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{isVi ? 'Hồ sơ tiêu bản' : 'Dossier'}</span>
      </button>

      {/* 4. Center 3D Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 0.4, 2.5], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15
          }}
        >
          {/* HDRI Studio Environment Reflections for Realistic Bones & Organs */}
          <Environment preset="studio" />

          {/* Key & Fill Medical Studio Lights */}
          <ambientLight intensity={isDark ? 0.6 : 0.8} />
          <directionalLight
            position={[4, 7, 5]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-4, 4, -4]} intensity={0.7} color="#38bdf8" />
          <directionalLight position={[0, -3, 2]} intensity={0.4} color="#f59e0b" />

          {/* Pedestal / Plinth Base */}
          <AtelierPlinth isDark={isDark} visible={!isIsolated} />

          {/* Soft Ground Contact Shadows */}
          {!isIsolated && (
            <ContactShadows
              position={[0, -0.91, 0]}
              opacity={0.55}
              scale={3.5}
              blur={2.0}
              far={2.2}
            />
          )}

          {/* 3D Specimen with Synchronized Hotspots, Proper Centering & Layers Dissection */}
          <React.Suspense
            fallback={
              <Html center>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border text-xs shadow-md">
                  <div className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                  <span>Đang tải tiêu bản 3D chuẩn xác…</span>
                </div>
              </Html>
            }
          >
            <SpecimenGroup
              modelPath={specimen.model}
              specimenId={specimen.id}
              isHeart={specimen.id === 'heart'}
              pulseEnabled={pulseEnabled}
              clippingPlanes={clippingPlanes}
              showHotspots={showHotspots}
              isModalOpen={activeModal !== null}
              isLayersActive={isLayersActive}
              hotspots={specimen.hotspots}
              activeHotspotId={activeHotspotId}
              explodeFactor={explodeFactor}
              onSelectHotspot={handleSelectHotspot}
              onMeshClick={handleMeshClick}
              isVi={isVi}
            />
          </React.Suspense>

          {/* Dynamic Bounding Box Camera Controller & Interpolator */}
          <CameraController controlsRef={controlsRef} />

          {/* Smooth Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={1.2}
            enableDamping
            dampingFactor={0.06}
            minDistance={0.6}
            maxDistance={6.0}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      {/* 5. Floating Smart Focus Toolbar (Focus, Isolate, Layers, Angles, Section) */}
      <SmartFocusToolbar />

      {/* 6. Museum Plinth Caption Footer */}
      <div className="h-10 border-t flex items-center justify-between px-5 text-xs font-serif z-10 bg-white/75 dark:bg-slate-900/75 border-[#e7ded3] dark:border-slate-800 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
            {isVi ? 'TIÊU BẢN 3D • NHẤP VÀO ĐIỂM ĐỂ KHÁM PHÁ CHI TIẾT' : '3D SPECIMEN • CLICK A DOT TO EXPLORE'}
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
            <span>{specimen.scientificName}</span>
            <Volume2 className="w-3.5 h-3.5 text-amber-600 cursor-pointer hover:scale-110 transition" />
          </span>
        </div>

        {/* Auto Rotate Toggle Switch */}
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
