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
        roughness={0.30}
        metalness={0.15}
        transparent={opacity < 0.98}
        opacity={opacity}
      />
    </mesh>
  );
};

export const ConnectedVesselsNetwork: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const red = '#dc2626'; // Vivid Arterial Oxygenated Crimson
  const blue = '#2563eb'; // Deep Venous Deoxygenated Royal Blue
  const pulmonaryBlue = '#0284c7'; // Pulmonary arterial deoxygenated sky-blue

  // ========================================================
  // 1. ARTERIAL SYSTEM (High-Precision Anatomical Geometry)
  // ========================================================

  // Ascending Aorta, Aortic Arch & Descending Thoracoabdominal Aorta
  // Emerges from LV (Y=1.19), arches over pulmonary artery (Y=1.27), hugs thoracic spine, bifurcates at L4 (Y=0.78)
  const aortaCurve: [number, number, number][] = [
    [-0.010, 1.19, 0.045], // Root at Left Ventricle
    [-0.005, 1.24, 0.040], // Ascending aorta
    [-0.012, 1.27, 0.028], // Aortic arch summit (T4 level)
    [-0.018, 1.24, 0.010], // Arch curving posteriorly
    [-0.016, 1.16, -0.010], // Thoracic aorta hugging vertebral column
    [-0.014, 1.06, -0.015],
    [-0.010, 0.96, 0.000],  // Aortic hiatus through diaphragm
    [-0.008, 0.88, 0.012],  // Abdominal aorta
    [-0.005, 0.78, 0.010]   // Aortic bifurcation at L4
  ];

  // Left Subclavian & Brachial Artery (Under clavicle, through axilla, down medial humerus, cubital fossa)
  // Monotonically descending Y-coordinates — zero upward ballooning!
  const leftArmArteryCurve: [number, number, number][] = [
    [-0.015, 1.26, 0.025], // Origin from aortic arch
    [-0.055, 1.24, 0.018], // Passes under medial clavicle & over 1st rib
    [-0.105, 1.21, 0.010], // Subclavian continuing to axilla
    [-0.150, 1.16, 0.005], // Axillary artery in axillary space
    [-0.185, 1.08, 0.008], // Upper brachial artery along medial humerus
    [-0.205, 1.00, 0.012], // Mid brachial artery
    [-0.220, 0.92, 0.015], // Cubital fossa (elbow crease)
    [-0.232, 0.84, 0.015], // Radial & ulnar bifurcation in forearm
    [-0.242, 0.76, 0.015], // Distal forearm & radial pulse
    [-0.248, 0.70, 0.015]  // Palmar arch
  ];

  // Right Subclavian & Brachial Artery (via Brachiocephalic trunk)
  const rightArmArteryCurve: [number, number, number][] = [
    [0.005, 1.26, 0.030],  // Origin via brachiocephalic trunk
    [0.055, 1.24, 0.018],  // Passes under medial clavicle & over 1st rib
    [0.105, 1.21, 0.010],  // Subclavian continuing to axilla
    [0.150, 1.16, 0.005],  // Axillary artery in axillary space
    [0.185, 1.08, 0.008],  // Upper brachial artery along medial humerus
    [0.205, 1.00, 0.012],  // Mid brachial artery
    [0.220, 0.92, 0.015],  // Cubital fossa
    [0.232, 0.84, 0.015],  // Forearm
    [0.242, 0.76, 0.015],  // Wrist
    [0.248, 0.70, 0.015]   // Palmar arch
  ];

  // Left Common Carotid Artery (Cervical sheath to skull base)
  const leftCarotidCurve: [number, number, number][] = [
    [-0.012, 1.27, 0.028],
    [-0.018, 1.35, 0.024],
    [-0.020, 1.43, 0.020],
    [-0.018, 1.50, 0.014],
    [-0.015, 1.56, 0.005]  // Skull base / Circle of Willis
  ];

  // Right Common Carotid Artery
  const rightCarotidCurve: [number, number, number][] = [
    [0.010, 1.27, 0.028],
    [0.016, 1.35, 0.024],
    [0.018, 1.43, 0.020],
    [0.016, 1.50, 0.014],
    [0.014, 1.56, 0.005]
  ];

  // Left Common Iliac, External Iliac, Femoral & Tibial Arteries
  const leftIliacFemoralCurve: [number, number, number][] = [
    [-0.005, 0.78, 0.010], // L4 bifurcation
    [-0.032, 0.73, 0.015], // Pelvic brim
    [-0.060, 0.67, 0.022], // Inguinal ligament
    [-0.078, 0.58, 0.024], // Femoral triangle
    [-0.086, 0.49, 0.014], // Adductor canal
    [-0.092, 0.42, -0.012], // Popliteal fossa behind knee
    [-0.094, 0.35, -0.008], // Posterior tibial origin
    [-0.096, 0.24, 0.005],  // Anterior & posterior tibial
    [-0.098, 0.12, 0.018],  // Malleolar branches
    [-0.100, 0.05, 0.040]   // Dorsalis pedis
  ];

  // Right Common Iliac, External Iliac, Femoral & Tibial Arteries
  const rightIliacFemoralCurve: [number, number, number][] = [
    [-0.005, 0.78, 0.010],
    [0.028, 0.73, 0.015],
    [0.056, 0.67, 0.022],
    [0.074, 0.58, 0.024],
    [0.082, 0.49, 0.014],
    [0.088, 0.42, -0.012],
    [0.090, 0.35, -0.008],
    [0.092, 0.24, 0.005],
    [0.094, 0.12, 0.018],
    [0.096, 0.05, 0.040]
  ];

  // ========================================================
  // 2. VENOUS SYSTEM (High-Precision Anatomical Geometry)
  // ========================================================

  // Inferior Vena Cava (IVC) - Runs along right anterior spine to Right Atrium (Y=1.18)
  const ivcCurve: [number, number, number][] = [
    [0.010, 0.76, 0.010],  // Confluence of common iliac veins at L5
    [0.014, 0.84, 0.014],
    [0.016, 0.94, 0.010],
    [0.018, 1.04, 0.008],  // Renal vein entry
    [0.018, 1.12, 0.015],  // Caval opening of diaphragm
    [0.015, 1.18, 0.035]   // Entry to Right Atrium
  ];

  // Superior Vena Cava (SVC) - Descends from brachiocephalic confluence into Right Atrium
  const svcCurve: [number, number, number][] = [
    [0.016, 1.28, 0.025],  // Brachiocephalic confluence
    [0.016, 1.23, 0.030],
    [0.015, 1.18, 0.035]   // Entry to Right Atrium
  ];

  // Left Internal Jugular Vein (descends along common carotid in carotid sheath)
  const leftJugularCurve: [number, number, number][] = [
    [-0.024, 1.56, 0.008],
    [-0.026, 1.48, 0.018],
    [-0.025, 1.40, 0.022],
    [-0.020, 1.32, 0.026],
    [-0.014, 1.26, 0.028]
  ];

  // Right Internal Jugular Vein
  const rightJugularCurve: [number, number, number][] = [
    [0.022, 1.56, 0.008],
    [0.024, 1.48, 0.018],
    [0.023, 1.40, 0.022],
    [0.019, 1.32, 0.026],
    [0.016, 1.26, 0.028]
  ];

  // Left Arm Vein (Subclavian / Axillary / Basilic)
  const leftArmVeinCurve: [number, number, number][] = [
    [-0.012, 1.25, 0.028], // Confluence into brachiocephalic
    [-0.050, 1.23, 0.020], // Subclavian vein under clavicle
    [-0.100, 1.20, 0.012], // Axillary vein
    [-0.145, 1.15, 0.008], // Basilic / brachial
    [-0.180, 1.07, 0.010],
    [-0.200, 0.99, 0.014],
    [-0.215, 0.91, 0.018], // Median cubital vein
    [-0.226, 0.83, 0.018], // Forearm veins
    [-0.236, 0.75, 0.018],
    [-0.242, 0.69, 0.018]
  ];

  // Right Arm Vein
  const rightArmVeinCurve: [number, number, number][] = [
    [0.016, 1.26, 0.028],
    [0.050, 1.23, 0.020],
    [0.100, 1.20, 0.012],
    [0.145, 1.15, 0.008],
    [0.180, 1.07, 0.010],
    [0.200, 0.99, 0.014],
    [0.215, 0.91, 0.018],
    [0.226, 0.83, 0.018],
    [0.236, 0.75, 0.018],
    [0.242, 0.69, 0.018]
  ];

  // Left Common Iliac & Femoral Vein
  const leftIliacFemoralVeinCurve: [number, number, number][] = [
    [0.010, 0.76, 0.010],
    [-0.024, 0.72, 0.015],
    [-0.052, 0.66, 0.022],
    [-0.070, 0.57, 0.024],
    [-0.079, 0.48, 0.014],
    [-0.086, 0.41, -0.010],
    [-0.088, 0.34, -0.006],
    [-0.090, 0.23, 0.006],
    [-0.092, 0.12, 0.018],
    [-0.094, 0.05, 0.040]
  ];

  // Right Common Iliac & Femoral Vein
  const rightIliacFemoralVeinCurve: [number, number, number][] = [
    [0.010, 0.76, 0.010],
    [0.022, 0.72, 0.015],
    [0.048, 0.66, 0.022],
    [0.066, 0.57, 0.024],
    [0.075, 0.48, 0.014],
    [0.082, 0.41, -0.010],
    [0.084, 0.34, -0.006],
    [0.086, 0.23, 0.006],
    [0.088, 0.12, 0.018],
    [0.090, 0.05, 0.040]
  ];

  // ========================================================
  // 3. PULMONARY CIRCULATION (Heart ↔ Lungs Connection!)
  // ========================================================

  // Pulmonary Trunk & Left Pulmonary Artery (Right Ventricle -> Left Lung Hilum)
  const leftPulmonaryArteryCurve: [number, number, number][] = [
    [-0.005, 1.21, 0.050], // Right Ventricle conus arteriosus
    [-0.008, 1.23, 0.030], // Pulmonary trunk bifurcation
    [-0.030, 1.23, 0.018], // Left pulmonary artery passing under aortic arch
    [-0.060, 1.22, 0.012]  // Entering Left Lung Hilum
  ];

  // Pulmonary Trunk & Right Pulmonary Artery (Right Ventricle -> Behind Aorta -> Right Lung Hilum)
  const rightPulmonaryArteryCurve: [number, number, number][] = [
    [-0.008, 1.23, 0.030], // Pulmonary trunk bifurcation
    [0.015, 1.23, 0.020],  // Right pulmonary artery passing posterior to ascending aorta
    [0.040, 1.22, 0.015],
    [0.060, 1.22, 0.012]   // Entering Right Lung Hilum
  ];

  // Left Pulmonary Veins (Left Lung Hilum -> Left Atrium)
  const leftPulmonaryVeinsCurve: [number, number, number][] = [
    [-0.058, 1.19, 0.015], // Left Lung Hilum
    [-0.035, 1.19, 0.022],
    [-0.018, 1.19, 0.032]  // Left Atrium posterior wall
  ];

  // Right Pulmonary Veins (Right Lung Hilum -> Left Atrium)
  const rightPulmonaryVeinsCurve: [number, number, number][] = [
    [0.058, 1.19, 0.015],  // Right Lung Hilum
    [0.032, 1.19, 0.022],
    [-0.010, 1.19, 0.032]  // Left Atrium posterior wall
  ];

  return (
    <group name="ConnectedVesselsNetwork">
      {/* 1. SYSTEMIC ARTERIAL SYSTEM */}
      <VesselCurve points={aortaCurve} radius={0.010} color={red} opacity={opacity} segments={44} />
      <VesselCurve points={leftIliacFemoralCurve} radius={0.006} color={red} opacity={opacity} segments={40} />
      <VesselCurve points={rightIliacFemoralCurve} radius={0.006} color={red} opacity={opacity} segments={40} />
      <VesselCurve points={leftCarotidCurve} radius={0.0045} color={red} opacity={opacity} segments={24} />
      <VesselCurve points={rightCarotidCurve} radius={0.0045} color={red} opacity={opacity} segments={24} />
      <VesselCurve points={leftArmArteryCurve} radius={0.0045} color={red} opacity={opacity} segments={40} />
      <VesselCurve points={rightArmArteryCurve} radius={0.0045} color={red} opacity={opacity} segments={40} />

      {/* Renal Arteries (Aorta -> Kidneys) */}
      <VesselCurve points={[[-0.010, 1.01, -0.005], [-0.035, 1.01, -0.018], [-0.065, 1.01, -0.035]]} radius={0.004} color={red} opacity={opacity} segments={16} />
      <VesselCurve points={[[0.010, 1.01, -0.005], [0.035, 1.01, -0.018], [0.065, 1.01, -0.035]]} radius={0.004} color={red} opacity={opacity} segments={16} />

      {/* Celiac Trunk & Superior Mesenteric Artery */}
      <VesselCurve points={[[-0.010, 1.05, -0.010], [-0.005, 1.05, 0.015], [-0.015, 1.04, 0.035]]} radius={0.004} color={red} opacity={opacity} segments={16} />

      {/* 2. SYSTEMIC VENOUS SYSTEM */}
      <VesselCurve points={ivcCurve} radius={0.011} color={blue} opacity={opacity} segments={36} />
      <VesselCurve points={svcCurve} radius={0.010} color={blue} opacity={opacity} segments={16} />
      <VesselCurve points={leftIliacFemoralVeinCurve} radius={0.0065} color={blue} opacity={opacity} segments={40} />
      <VesselCurve points={rightIliacFemoralVeinCurve} radius={0.0065} color={blue} opacity={opacity} segments={40} />
      <VesselCurve points={leftJugularCurve} radius={0.0055} color={blue} opacity={opacity} segments={24} />
      <VesselCurve points={rightJugularCurve} radius={0.0055} color={blue} opacity={opacity} segments={24} />
      <VesselCurve points={leftArmVeinCurve} radius={0.0048} color={blue} opacity={opacity} segments={40} />
      <VesselCurve points={rightArmVeinCurve} radius={0.0048} color={blue} opacity={opacity} segments={40} />

      {/* Renal Veins (Kidneys -> IVC) */}
      <VesselCurve points={[[0.018, 1.01, 0.008], [-0.025, 1.01, -0.010], [-0.065, 1.01, -0.035]]} radius={0.005} color={blue} opacity={opacity} segments={16} />
      <VesselCurve points={[[0.018, 1.01, 0.008], [0.040, 1.01, -0.010], [0.065, 1.01, -0.035]]} radius={0.005} color={blue} opacity={opacity} segments={16} />

      {/* 3. PULMONARY CIRCULATION (Cardiopulmonary Connection) */}
      {/* Pulmonary Arteries (Deoxygenated blood from Right Ventricle to Lungs) */}
      <VesselCurve points={leftPulmonaryArteryCurve} radius={0.0055} color={pulmonaryBlue} opacity={opacity} segments={20} />
      <VesselCurve points={rightPulmonaryArteryCurve} radius={0.0055} color={pulmonaryBlue} opacity={opacity} segments={20} />

      {/* Pulmonary Veins (Oxygenated blood from Lungs to Left Atrium) */}
      <VesselCurve points={leftPulmonaryVeinsCurve} radius={0.005} color={red} opacity={opacity} segments={16} />
      <VesselCurve points={rightPulmonaryVeinsCurve} radius={0.005} color={red} opacity={opacity} segments={16} />
    </group>
  );
};
