import React, { useMemo } from 'react';
import * as THREE from 'three';

interface VesselCurveProps {
  points: [number, number, number][];
  radius: number;
  color: string;
  opacity?: number;
  segments?: number;
}

const VesselCurve: React.FC<VesselCurveProps> = ({
  points,
  radius,
  color,
  opacity = 1.0,
  segments = 36
}) => {
  const geometry = useMemo(() => {
    const vectors = points.map((p) => new THREE.Vector3(...p));
    // Smooth Catmull-Rom spline with centripetal parameterization (tension = 0.5)
    const curve = new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.5);
    return new THREE.TubeGeometry(curve, segments, radius, 10, false);
  }, [points, radius, segments]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.32}
        metalness={0.12}
        transparent={opacity < 0.98}
        opacity={opacity}
      />
    </mesh>
  );
};

export const ConnectedVesselsNetwork: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const red = '#ef4444'; // Vivid Arterial Crimson
  const blue = '#2563eb'; // Deep Venous Royal Blue

  // ========================================================
  // 1. ARTERIAL SYSTEM (Organic Anatomical Curves)
  // ========================================================

  // Descending Thoracic & Abdominal Aorta (follows spinal curvature: kyphosis -> lordosis)
  const aortaCurve: [number, number, number][] = [
    [-0.015, 1.28, 0.035],
    [-0.018, 1.23, 0.018],
    [-0.016, 1.15, -0.010], // Thoracic curve posterior
    [-0.013, 1.05, -0.015],
    [-0.010, 0.96, 0.002],  // Aortic hiatus
    [-0.008, 0.88, 0.014],  // Lumbar curve anterior
    [-0.005, 0.78, 0.010]   // Bifurcation at L4
  ];

  // Left Common Iliac & Femoral Artery (pelvic brim -> femoral triangle -> adductor canal -> leg)
  const leftIliacFemoralCurve: [number, number, number][] = [
    [-0.005, 0.78, 0.010],
    [-0.035, 0.74, 0.015],
    [-0.065, 0.68, 0.020],
    [-0.082, 0.60, 0.025],
    [-0.092, 0.50, 0.020],
    [-0.098, 0.42, 0.005],
    [-0.102, 0.35, -0.015], // Popliteal behind knee
    [-0.105, 0.24, 0.005],  // Anterior tibial
    [-0.105, 0.12, 0.020],
    [-0.105, 0.05, 0.040]   // Dorsalis pedis
  ];

  // Right Common Iliac & Femoral Artery
  const rightIliacFemoralCurve: [number, number, number][] = [
    [-0.005, 0.78, 0.010],
    [0.030, 0.74, 0.015],
    [0.060, 0.68, 0.020],
    [0.078, 0.60, 0.025],
    [0.088, 0.50, 0.020],
    [0.095, 0.42, 0.005],
    [0.100, 0.35, -0.015],
    [0.105, 0.24, 0.005],
    [0.105, 0.12, 0.020],
    [0.105, 0.05, 0.040]
  ];

  // Left Common Carotid Artery (graceful neck S-curve to skull base)
  const leftCarotidCurve: [number, number, number][] = [
    [-0.018, 1.28, 0.035],
    [-0.025, 1.35, 0.030],
    [-0.028, 1.43, 0.025],
    [-0.025, 1.50, 0.015],
    [-0.018, 1.56, 0.005]
  ];

  // Right Common Carotid Artery
  const rightCarotidCurve: [number, number, number][] = [
    [0.015, 1.28, 0.035],
    [0.022, 1.35, 0.030],
    [0.026, 1.43, 0.025],
    [0.024, 1.50, 0.015],
    [0.018, 1.56, 0.005]
  ];

  // Left Subclavian & Brachial Artery (arches over 1st rib, through axilla, down arm, cubital fossa to wrist)
  const leftArmArteryCurve: [number, number, number][] = [
    [-0.020, 1.28, 0.030],
    [-0.065, 1.32, 0.020],
    [-0.120, 1.33, 0.005],
    [-0.165, 1.30, -0.010],
    [-0.195, 1.22, 0.000],
    [-0.215, 1.12, 0.010],
    [-0.230, 1.02, 0.015],
    [-0.245, 0.94, 0.010],
    [-0.260, 0.85, 0.010],
    [-0.275, 0.76, 0.015],
    [-0.285, 0.70, 0.020]
  ];

  // Right Subclavian & Brachial Artery
  const rightArmArteryCurve: [number, number, number][] = [
    [0.020, 1.28, 0.030],
    [0.065, 1.32, 0.020],
    [0.120, 1.33, 0.005],
    [0.165, 1.30, -0.010],
    [0.195, 1.22, 0.000],
    [0.215, 1.12, 0.010],
    [0.230, 1.02, 0.015],
    [0.245, 0.94, 0.010],
    [0.260, 0.85, 0.010],
    [0.275, 0.76, 0.015],
    [0.285, 0.70, 0.020]
  ];

  // ========================================================
  // 2. VENOUS SYSTEM (Organic Anatomical Curves)
  // ========================================================

  // Inferior Vena Cava (IVC - alongside spine)
  const ivcCurve: [number, number, number][] = [
    [0.015, 1.20, 0.035],
    [0.018, 1.12, 0.020],
    [0.018, 1.02, 0.005],
    [0.016, 0.92, 0.010],
    [0.012, 0.82, 0.015],
    [0.010, 0.76, 0.010]
  ];

  // Superior Vena Cava (SVC)
  const svcCurve: [number, number, number][] = [
    [0.018, 1.30, 0.025],
    [0.016, 1.25, 0.030],
    [0.015, 1.20, 0.035]
  ];

  // Left Common Iliac & Femoral Vein
  const leftIliacFemoralVeinCurve: [number, number, number][] = [
    [0.010, 0.76, 0.010],
    [-0.025, 0.73, 0.015],
    [-0.055, 0.67, 0.020],
    [-0.075, 0.59, 0.025],
    [-0.085, 0.49, 0.020],
    [-0.092, 0.41, 0.005],
    [-0.098, 0.34, -0.015],
    [-0.102, 0.23, 0.005],
    [-0.102, 0.12, 0.020],
    [-0.102, 0.05, 0.040]
  ];

  // Right Common Iliac & Femoral Vein
  const rightIliacFemoralVeinCurve: [number, number, number][] = [
    [0.010, 0.76, 0.010],
    [0.025, 0.73, 0.015],
    [0.052, 0.67, 0.020],
    [0.072, 0.59, 0.025],
    [0.082, 0.49, 0.020],
    [0.090, 0.41, 0.005],
    [0.095, 0.34, -0.015],
    [0.100, 0.23, 0.005],
    [0.100, 0.12, 0.020],
    [0.100, 0.05, 0.040]
  ];

  // Left Internal Jugular Vein
  const leftJugularCurve: [number, number, number][] = [
    [-0.035, 1.56, 0.010],
    [-0.038, 1.48, 0.020],
    [-0.036, 1.39, 0.028],
    [-0.028, 1.30, 0.032],
    [-0.015, 1.25, 0.030]
  ];

  // Right Internal Jugular Vein
  const rightJugularCurve: [number, number, number][] = [
    [0.035, 1.56, 0.010],
    [0.038, 1.48, 0.020],
    [0.036, 1.39, 0.028],
    [0.028, 1.30, 0.032],
    [0.015, 1.25, 0.030]
  ];

  // Left Arm Vein (Subclavian / Basilic)
  const leftArmVeinCurve: [number, number, number][] = [
    [-0.015, 1.25, 0.030],
    [-0.060, 1.29, 0.025],
    [-0.115, 1.30, 0.010],
    [-0.160, 1.27, -0.005],
    [-0.190, 1.20, 0.005],
    [-0.210, 1.10, 0.015],
    [-0.225, 1.00, 0.020],
    [-0.240, 0.92, 0.015],
    [-0.255, 0.83, 0.015],
    [-0.270, 0.75, 0.020],
    [-0.280, 0.69, 0.025]
  ];

  // Right Arm Vein
  const rightArmVeinCurve: [number, number, number][] = [
    [0.015, 1.25, 0.030],
    [0.060, 1.29, 0.025],
    [0.115, 1.30, 0.010],
    [0.160, 1.27, -0.005],
    [0.190, 1.20, 0.005],
    [0.210, 1.10, 0.015],
    [0.225, 1.00, 0.020],
    [0.240, 0.92, 0.015],
    [0.255, 0.83, 0.015],
    [0.270, 0.75, 0.020],
    [0.280, 0.69, 0.025]
  ];

  return (
    <group name="ConnectedVesselsNetwork">
      {/* 1. ARTERIAL SYSTEM */}
      <VesselCurve points={aortaCurve} radius={0.011} color={red} opacity={opacity} segments={40} />
      <VesselCurve points={leftIliacFemoralCurve} radius={0.0065} color={red} opacity={opacity} segments={40} />
      <VesselCurve points={rightIliacFemoralCurve} radius={0.0065} color={red} opacity={opacity} segments={40} />
      <VesselCurve points={leftCarotidCurve} radius={0.0055} color={red} opacity={opacity} segments={24} />
      <VesselCurve points={rightCarotidCurve} radius={0.0055} color={red} opacity={opacity} segments={24} />
      <VesselCurve points={leftArmArteryCurve} radius={0.005} color={red} opacity={opacity} segments={40} />
      <VesselCurve points={rightArmArteryCurve} radius={0.005} color={red} opacity={opacity} segments={40} />

      {/* Renal Arteries */}
      <VesselCurve points={[[-0.010, 1.01, -0.005], [-0.035, 1.01, -0.015], [-0.065, 1.01, -0.025]]} radius={0.0045} color={red} opacity={opacity} segments={16} />
      <VesselCurve points={[[0.010, 1.01, -0.005], [0.035, 1.01, -0.015], [0.065, 1.01, -0.025]]} radius={0.0045} color={red} opacity={opacity} segments={16} />

      {/* 2. VENOUS SYSTEM */}
      <VesselCurve points={ivcCurve} radius={0.012} color={blue} opacity={opacity} segments={32} />
      <VesselCurve points={svcCurve} radius={0.011} color={blue} opacity={opacity} segments={16} />
      <VesselCurve points={leftIliacFemoralVeinCurve} radius={0.007} color={blue} opacity={opacity} segments={40} />
      <VesselCurve points={rightIliacFemoralVeinCurve} radius={0.007} color={blue} opacity={opacity} segments={40} />
      <VesselCurve points={leftJugularCurve} radius={0.006} color={blue} opacity={opacity} segments={24} />
      <VesselCurve points={rightJugularCurve} radius={0.006} color={blue} opacity={opacity} segments={24} />
      <VesselCurve points={leftArmVeinCurve} radius={0.005} color={blue} opacity={opacity} segments={40} />
      <VesselCurve points={rightArmVeinCurve} radius={0.005} color={blue} opacity={opacity} segments={40} />

      {/* Renal Veins */}
      <VesselCurve points={[[0.018, 1.01, 0.005], [-0.025, 1.01, -0.005], [-0.065, 1.01, -0.020]]} radius={0.0055} color={blue} opacity={opacity} segments={16} />
      <VesselCurve points={[[0.018, 1.01, 0.005], [0.040, 1.01, -0.005], [0.065, 1.01, -0.020]]} radius={0.0055} color={blue} opacity={opacity} segments={16} />
    </group>
  );
};
