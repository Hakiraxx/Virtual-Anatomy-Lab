import React from 'react';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export const MeasurementTool: React.FC = () => {
  const points = useAnatomyStore((s) => s.measurementPoints);
  const distance = useAnatomyStore((s) => s.measuredDistance);
  const activeTool = useAnatomyStore((s) => s.activeTool);

  if (activeTool !== 'measure' || points.length === 0) {
    return null;
  }

  const p1 = points[0];
  const p2 = points[1] || null;

  // Midpoint for HTML distance label
  const midPoint: [number, number, number] | null = p2
    ? [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2 + 0.08, (p1[2] + p2[2]) / 2]
    : null;

  return (
    <group>
      {/* Point 1 Marker */}
      <mesh position={p1}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
      </mesh>

      {/* Point 2 Marker and connecting line */}
      {p2 && (
        <>
          <mesh position={p2}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.8} />
          </mesh>

          {/* 3D Measurement Line */}
          <Line
            points={[p1, p2]}
            color="#38bdf8"
            lineWidth={3}
            dashed
            dashScale={20}
            dashSize={0.05}
            gapSize={0.03}
          />

          {/* Distance Callout */}
          {midPoint && distance !== null && (
            <Html position={midPoint} center distanceFactor={6}>
              <div className="bg-slate-900/95 border border-cyan-400 text-cyan-300 font-mono text-xs px-2.5 py-1 rounded-full shadow-lg shadow-cyan-950/50 whitespace-nowrap pointer-events-none flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span>{distance} cm</span>
              </div>
            </Html>
          )}
        </>
      )}
    </group>
  );
};
