import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, Environment, ContactShadows } from '@react-three/drei';
import { HumanModel } from './HumanModel';
import { CameraController } from './CameraController';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { EyeOff, Ruler, Scissors, RotateCcw } from 'lucide-react';

export const AnatomyViewer: React.FC = () => {
  const hoveredOrganId = useAnatomyStore((s) => s.hoveredOrganId);
  const organs = useAnatomyStore((s) => s.organs);
  const isolatedOrganId = useAnatomyStore((s) => s.isolatedOrganId);
  const isolateOrgan = useAnatomyStore((s) => s.isolateOrgan);
  const activeTool = useAnatomyStore((s) => s.activeTool);
  const isQuizActive = useAnatomyStore((s) => s.isQuizActive);
  const quizTargetOrganId = useAnatomyStore((s) => s.quizTargetOrganId);

  const hoveredOrgan = hoveredOrganId ? organs.find((o) => o.id === hoveredOrganId) : null;
  const isolatedOrgan = isolatedOrganId ? organs.find((o) => o.id === isolatedOrganId) : null;
  const controlsRef = React.useRef<any>(null);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0a0e17] via-[#0f172a] to-[#070b12] overflow-hidden select-none">
      {/* 3D Canvas Scene */}
      <Canvas
        shadows
        gl={{ antialias: true, localClippingEnabled: true }}
        camera={{ position: [0, 1.2, 3.8], fov: 45, near: 0.1, far: 50 }}
      >
        <CameraController controlsRef={controlsRef} />

        {/* Medical Environment & PBR Lighting */}
        <Environment preset="city" />
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-4, 2, 2]} intensity={0.6} color="#38bdf8" />
        <directionalLight position={[0, 4, -4]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, -1, 1]} intensity={0.3} color="#f43f5e" />

        {/* Realistic Floor Contact Shadows */}
        <ContactShadows position={[0, -0.2, 0]} opacity={0.6} scale={6} blur={2.0} far={4} />

        {/* 3D Body & Organ System */}
        <Suspense fallback={null}>
          <HumanModel />
        </Suspense>

        {/* Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={0.7}
          maxDistance={7.0}
          target={[0, 1.0, 0]}
        />

        {/* 3D Orientation Gizmo in bottom-left */}
        <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
          <GizmoViewport
            axisColors={['#f43f5e', '#10b981', '#06b6d4']}
            labelColor="#f8fafc"
          />
        </GizmoHelper>
      </Canvas>

      {/* Floating Hover Tooltip (Bottom Center) */}
      {hoveredOrgan && !isQuizActive && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-150 animate-fade-in">
          <div className="bg-slate-900/90 border border-cyan-400/40 px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: hoveredOrgan.color || '#38bdf8' }}
            />
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>{hoveredOrgan.name}</span>
                <span className="text-xs font-normal text-slate-400">({hoveredOrgan.nameEn})</span>
              </div>
              <div className="text-xs font-serif italic text-cyan-300">
                {hoveredOrgan.nameLatin}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Isolation Mode Badge Overlay */}
      {isolatedOrgan && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500/20 border border-amber-500/50 text-amber-200 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2.5 z-20">
          <EyeOff className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">
            Đang cách ly: <span className="font-bold text-amber-100">{isolatedOrgan.name}</span>
          </span>
          <button
            onClick={() => isolateOrgan(null)}
            className="ml-2 px-2 py-0.5 rounded bg-amber-500/30 hover:bg-amber-500/50 text-[11px] font-bold text-amber-100 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Thoát cách ly
          </button>
        </div>
      )}

      {/* Quiz Interactive Prompt Banner */}
      {isQuizActive && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-cyan-950/80 border border-cyan-400/60 text-cyan-200 px-5 py-2 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-3 z-20 animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span className="text-xs font-medium">
            Chế độ kiểm tra 3D: Nhấp chuột trực tiếp lên cơ quan trên mô hình để trả lời
          </span>
        </div>
      )}

      {/* Active Tool Badge */}
      {activeTool === 'measure' && (
        <div className="absolute top-4 right-4 bg-slate-900/80 border border-cyan-500/40 text-cyan-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-md">
          <Ruler className="w-3.5 h-3.5 text-cyan-400" />
          <span>Thước đo 3D: Nhấp 2 điểm trên cơ thể để đo khoảng cách</span>
        </div>
      )}

      {activeTool === 'slice' && (
        <div className="absolute top-4 right-4 bg-slate-900/80 border border-rose-500/40 text-rose-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-md">
          <Scissors className="w-3.5 h-3.5 text-rose-400" />
          <span>Mặt cắt giải phẫu: Kéo thanh trượt X, Y, Z để quan sát lớp cắt</span>
        </div>
      )}
    </div>
  );
};
