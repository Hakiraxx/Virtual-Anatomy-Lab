import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import {
  Columns2,
  RotateCcw,
  Link2,
  Unlink2,
  X,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

interface ToothModelProps {
  modelUrl: string;
  isImpacted?: boolean;
  isLeft?: boolean;
}

function MolarCompareMesh({ modelUrl, isImpacted = false, isLeft = false }: ToothModelProps) {
  const { scene } = useGLTF(modelUrl);
  const cloned = React.useMemo(() => scene.clone(true), [scene]);

  const rotation: [number, number, number] = isImpacted
    ? [0.785, 0, isLeft ? -0.2 : 0.2] // 45 deg mesioangular tilt
    : [0, 0, 0];

  const position: [number, number, number] = isImpacted
    ? [0, -0.006, 0] // Position B depth
    : [0, 0, 0];

  return (
    <group position={position} rotation={rotation}>
      <primitive object={cloned} scale={1.0} />
      {/* Crown enamel material override if needed */}
    </group>
  );
}

export const AnatomyCompareViewer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const [preset, setPreset] = useState<'normal_vs_impacted' | 'r48_vs_r38' | 'male_vs_female'>('normal_vs_impacted');
  const [isSyncCamera, setIsSyncCamera] = useState<boolean>(true);

  // Synchronized camera state
  const [camAngle, setCamAngle] = useState<{ azimuth: number; polar: number; distance: number }>({
    azimuth: 0.5,
    polar: 1.2,
    distance: 0.12
  });

  const controlsLeftRef = useRef<any>(null);
  const controlsRightRef = useRef<any>(null);
  const isSyncingRef = useRef<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-xl animate-fade-in select-none">
      {/* 1. Header Toolbar */}
      <header
        className={`h-14 px-4 sm:px-6 flex items-center justify-between border-b ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-[#f7f1e7] border-[#dfd4c4] text-[#28231d]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <Columns2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-bold tracking-tight uppercase">
                So Sánh Giải Phẫu Đồng Bộ (Compare Anatomy)
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                SYNC VIEWPORT
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Hai khung nhìn song song với cơ chế đồng bộ góc xoay, phóng to và vị trí camera
            </div>
          </div>
        </div>

        {/* Preset Selector & Sync Toggle */}
        <div className="flex items-center gap-2">
          {/* Preset Buttons */}
          <div
            className={`flex items-center p-0.5 rounded-full border text-xs ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-[#eae0d2] border-[#dfd4c4]'
            }`}
          >
            <button
              onClick={() => setPreset('normal_vs_impacted')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                preset === 'normal_vs_impacted'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-current'
              }`}
            >
              Chuẩn vs Mọc Lệch (R.48)
            </button>
            <button
              onClick={() => setPreset('r48_vs_r38')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                preset === 'r48_vs_r38'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-current'
              }`}
            >
              Đối Bên R.48 vs R.38
            </button>
            <button
              onClick={() => setPreset('male_vs_female')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                preset === 'male_vs_female'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-current'
              }`}
            >
              Sọ Nam vs Sọ Nữ
            </button>
          </div>

          {/* Sync Button */}
          <button
            onClick={() => setIsSyncCamera(!isSyncCamera)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
              isSyncCamera
                ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400 shadow-sm'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Bật/Tắt đồng bộ điều khiển camera giữa 2 khung hình"
          >
            {isSyncCamera ? <Link2 className="w-3.5 h-3.5" /> : <Unlink2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSyncCamera ? 'Đã Đồng Bộ' : 'Độc Lập'}</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer ml-1"
            title="Đóng chế độ so sánh"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Dual Synchronized Viewport Area */}
      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-800 overflow-hidden relative">
        {/* VIEWPORT LEFT (Mẫu A) */}
        <div className="flex-1 h-1/2 md:h-full relative flex flex-col">
          <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-slate-700 text-slate-200 text-xs backdrop-blur-md shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold">
              {preset === 'normal_vs_impacted'
                ? 'MẪU A: RĂNG 48 BÌNH THƯỜNG (Dọc - Pos A)'
                : preset === 'r48_vs_r38'
                ? 'MẪU A: RĂNG KHÔN HÀM DƯỚI PHẢI (R.48)'
                : 'MẪU A: HỆ SỌ NAM (MALE CRANIOFACIAL)'}
            </span>
          </div>

          <Canvas
            camera={{ position: [0.03, 0.05, 0.12], fov: 35 }}
            className="w-full h-full bg-gradient-to-b from-[#090e18] to-[#04070d]"
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[2, 4, 3]} intensity={2.0} />
            <directionalLight position={[-2, -1, -2]} intensity={0.6} />
            <Suspense fallback={null}>
              {preset === 'normal_vs_impacted' ? (
                <MolarCompareMesh modelUrl="/models/dental/mandibular_third_molar_48.glb" isImpacted={false} />
              ) : preset === 'r48_vs_r38' ? (
                <MolarCompareMesh modelUrl="/models/dental/mandibular_third_molar_48.glb" isLeft={false} />
              ) : (
                <primitive object={useGLTF('/models/craniofacial/skull/skull_complete.glb').scene.clone(true)} scale={0.6} position={[0, -0.8, 0]} />
              )}
              <ContactShadows position={[0, -0.02, 0]} opacity={0.4} scale={0.2} blur={1.5} />
            </Suspense>
            <OrbitControls
              ref={controlsLeftRef}
              makeDefault
              onChange={(e) => {
                if (!isSyncCamera || isSyncingRef.current || !controlsRightRef.current) return;
                isSyncingRef.current = true;
                const camL = e?.target?.object;
                const controlsR = controlsRightRef.current;
                if (camL && controlsR) {
                  controlsR.object.position.copy(camL.position);
                  controlsR.object.quaternion.copy(camL.quaternion);
                  controlsR.target.copy(e.target.target);
                  controlsR.update();
                }
                isSyncingRef.current = false;
              }}
            />
          </Canvas>

          {/* Left Info Badge */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-10 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs backdrop-blur-md max-w-sm text-slate-300">
            <div className="font-semibold text-emerald-400 mb-0.5">
              {preset === 'normal_vs_impacted'
                ? 'Hình thái: Mọc thẳng hoàn toàn (Vertical)'
                : preset === 'r48_vs_r38'
                ? 'Cung hàm: Phân hàm 4 (Dextral / Phải)'
                : 'Đặc điểm: Cung mày nhô rõ, góc hàm vuông'}
            </div>
            <div className="text-[11px] text-slate-400">
              {preset === 'normal_vs_impacted'
                ? 'Mặt nhai ngang bằng mặt phẳng nhai R.47. Khoảng cách an toàn đến ống hàm dưới > 4.5 mm.'
                : preset === 'r48_vs_r38'
                ? '2 chân răng (chân gần & chân xa), rãnh phát triển mặt ngoài hướng về hành lang tiền đình phải.'
                : 'Xương đặc, đường khớp trán mũi dày, mỏm vẹt và lồi cầu lớn.'}
            </div>
          </div>
        </div>

        {/* VIEWPORT RIGHT (Mẫu B) */}
        <div className="flex-1 h-1/2 md:h-full relative flex flex-col">
          <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-slate-700 text-slate-200 text-xs backdrop-blur-md shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="font-bold">
              {preset === 'normal_vs_impacted'
                ? 'MẪU B: RĂNG 48 MỌC LỆCH GẦN (Mesioangular - Pos B)'
                : preset === 'r48_vs_r38'
                ? 'MẪU B: RĂNG KHÔN HÀM DƯỚI TRÁI (R.38)'
                : 'MẪU B: HỆ SỌ NỮ (FEMALE CRANIOFACIAL)'}
            </span>
          </div>

          <Canvas
            camera={{ position: [0.03, 0.05, 0.12], fov: 35 }}
            className="w-full h-full bg-gradient-to-b from-[#090e18] to-[#04070d]"
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[2, 4, 3]} intensity={2.0} />
            <directionalLight position={[-2, -1, -2]} intensity={0.6} />
            <Suspense fallback={null}>
              {preset === 'normal_vs_impacted' ? (
                <MolarCompareMesh modelUrl="/models/dental/mandibular_third_molar_48.glb" isImpacted={true} />
              ) : preset === 'r48_vs_r38' ? (
                <MolarCompareMesh modelUrl="/models/dental/mandibular_third_molar_38.glb" isLeft={true} />
              ) : (
                <primitive object={useGLTF('/models/craniofacial/skull/skull_complete.glb').scene.clone(true)} scale={0.58} position={[0, -0.78, 0]} />
              )}
              <ContactShadows position={[0, -0.02, 0]} opacity={0.4} scale={0.2} blur={1.5} />
            </Suspense>
            <OrbitControls
              ref={controlsRightRef}
              makeDefault
              onChange={(e) => {
                if (!isSyncCamera || isSyncingRef.current || !controlsLeftRef.current) return;
                isSyncingRef.current = true;
                const camR = e?.target?.object;
                const controlsL = controlsLeftRef.current;
                if (camR && controlsL) {
                  controlsL.object.position.copy(camR.position);
                  controlsL.object.quaternion.copy(camR.quaternion);
                  controlsL.target.copy(e.target.target);
                  controlsL.update();
                }
                isSyncingRef.current = false;
              }}
            />
          </Canvas>

          {/* Right Info Badge */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-10 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs backdrop-blur-md max-w-sm text-slate-300">
            <div className="font-semibold text-rose-400 mb-0.5">
              {preset === 'normal_vs_impacted'
                ? 'Hình thái: Mọc nghiêng gần 45 độ (Mesioangular)'
                : preset === 'r48_vs_r38'
                ? 'Cung hàm: Phân hàm 3 (Sinistral / Trái)'
                : 'Đặc điểm: Cung mày phẳng, xương thanh mảnh'}
            </div>
            <div className="text-[11px] text-slate-400">
              {preset === 'normal_vs_impacted'
                ? 'Rìa cắn húc vào cổ răng 47 gây giắt thức ăn, sâu răng mặt xa R.47. Chóp chân răng cách IAN < 1.2 mm.'
                : preset === 'r48_vs_r38'
                ? 'Đối xứng phản chiếu qua đường giữa dọc (sagittal plane), hình thái mặt nhai 4 núm chính.'
                : 'Góc hàm tù hơn, vòm sọ tròn trịa hơn, tỷ lệ chiều cao cành cao nhỏ hơn.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
