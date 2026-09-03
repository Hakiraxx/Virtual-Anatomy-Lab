import React, { useMemo } from 'react';
import * as THREE from 'three';

interface NerveCurveProps {
  points: [number, number, number][];
  radius: number;
  color?: string;
  opacity?: number;
  segments?: number;
}

const NerveCurve: React.FC<NerveCurveProps> = ({
  points,
  radius,
  color = '#f59e0b', // Luminous Amber Gold
  opacity = 1.0,
  segments = 36
}) => {
  const geometry = useMemo(() => {
    const vectors = points.map((p) => new THREE.Vector3(...p));
    const curve = new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.5);
    return new THREE.TubeGeometry(curve, segments, radius, 10, false);
  }, [points, radius, segments]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.25}
        roughness={0.4}
        metalness={0.1}
        transparent={opacity < 0.98}
        opacity={opacity}
      />
    </mesh>
  );
};

export const ConnectedNervesNetwork: React.FC<{ opacity?: number }> = ({ opacity = 1.0 }) => {
  const nerveGold = '#f59e0b';
  const nerveLight = '#fbbf24';

  // Bilateral Sciatic Nerves (Organic S-curves down posterior thighs, popliteal fossa, to feet)
  const leftSciaticCurve: [number, number, number][] = [
    [-0.035, 0.82, -0.025], // Lumbosacral plexus
    [-0.055, 0.74, -0.035], // Greater sciatic foramen
    [-0.075, 0.64, -0.030], // Deep to gluteus maximus
    [-0.088, 0.52, -0.020], // Mid-thigh between hamstrings
    [-0.096, 0.42, -0.015], // Popliteal fossa behind knee
    [-0.102, 0.28, -0.010], // Tibial nerve descending calf
    [-0.105, 0.14, 0.005],  // Lower leg
    [-0.105, 0.06, 0.025]   // Medial & lateral plantar nerves of foot
  ];

  const rightSciaticCurve: [number, number, number][] = [
    [0.035, 0.82, -0.025],
    [0.055, 0.74, -0.035],
    [0.075, 0.64, -0.030],
    [0.088, 0.52, -0.020],
    [0.096, 0.42, -0.015],
    [0.102, 0.28, -0.010],
    [0.105, 0.14, 0.005],
    [0.105, 0.06, 0.025]
  ];

  // Bilateral Brachial Plexus Extensions (Radial, Median & Ulnar nerves through arm and forearm)
  const leftArmNerveCurve: [number, number, number][] = [
    [-0.170, 1.32, -0.010], // Brachial plexus
    [-0.190, 1.22, -0.005], // Spiral groove around humerus
    [-0.210, 1.12, 0.005],  // Lateral arm
    [-0.225, 1.02, 0.010],  // Cubital fossa
    [-0.240, 0.92, 0.010],  // Forearm flexors
    [-0.255, 0.82, 0.015],  // Distal forearm
    [-0.270, 0.72, 0.020]   // Digital nerves of hand
  ];

  const rightArmNerveCurve: [number, number, number][] = [
    [0.170, 1.32, -0.010],
    [0.190, 1.22, -0.005],
    [0.210, 1.12, 0.005],
    [0.225, 1.02, 0.010],
    [0.240, 0.92, 0.010],
    [0.255, 0.82, 0.015],
    [0.270, 0.72, 0.020]
  ];

  // Bilateral Sympathetic Trunks (Paravertebral bead-chain curving along vertebrae)
  const leftSympatheticCurve: [number, number, number][] = [
    [-0.018, 1.45, -0.015],
    [-0.020, 1.35, -0.012],
    [-0.018, 1.25, -0.010],
    [-0.016, 1.15, -0.010],
    [-0.015, 1.02, -0.005],
    [-0.014, 0.90, 0.005],
    [-0.012, 0.82, 0.005]
  ];

  const rightSympatheticCurve: [number, number, number][] = [
    [0.018, 1.45, -0.015],
    [0.020, 1.35, -0.012],
    [0.018, 1.25, -0.010],
    [0.016, 1.15, -0.010],
    [0.015, 1.02, -0.005],
    [0.014, 0.90, 0.005],
    [0.012, 0.82, 0.005]
  ];

  return (
    <group name="ConnectedNervesNetwork">
      {/* Sciatic Nerves */}
      <NerveCurve points={leftSciaticCurve} radius={0.005} color={nerveGold} opacity={opacity} segments={36} />
      <NerveCurve points={rightSciaticCurve} radius={0.005} color={nerveGold} opacity={opacity} segments={36} />

      {/* Arm Nerves */}
      <NerveCurve points={leftArmNerveCurve} radius={0.004} color={nerveGold} opacity={opacity} segments={36} />
      <NerveCurve points={rightArmNerveCurve} radius={0.004} color={nerveGold} opacity={opacity} segments={36} />

      {/* Sympathetic Trunks */}
      <NerveCurve points={leftSympatheticCurve} radius={0.0028} color={nerveLight} opacity={opacity} segments={30} />
      <NerveCurve points={rightSympatheticCurve} radius={0.0028} color={nerveLight} opacity={opacity} segments={30} />
    </group>
  );
};
