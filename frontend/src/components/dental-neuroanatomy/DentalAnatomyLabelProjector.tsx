import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RawProjectedLabel } from '../../utils/ViewerLayoutManager';

export interface LabelAnchorDefinition {
  id: string;
  nameVi: string;
  nameEn?: string;
  subtitle?: string;
  worldPos: [number, number, number];
  priority: number; // 1 = Selected, 2 = Critical, 3 = Context, 4 = Secondary
  width?: number;
  height?: number;
  isSelected?: boolean;
  isCritical?: boolean;
}

interface DentalAnatomyLabelProjectorProps {
  anchors: LabelAnchorDefinition[];
  onProject: (labels: RawProjectedLabel[]) => void;
}

export const DentalAnatomyLabelProjector: React.FC<DentalAnatomyLabelProjectorProps> = ({
  anchors,
  onProject
}) => {
  const tempVec = useRef(new THREE.Vector3());
  const lastStateRef = useRef<string>('');

  useFrame(({ camera, size }) => {
    if (!anchors || anchors.length === 0 || size.width === 0 || size.height === 0) return;

    const projected: RawProjectedLabel[] = [];
    let stateSignature = '';

    for (const anchor of anchors) {
      tempVec.current.set(...anchor.worldPos);
      tempVec.current.project(camera);

      const inFront = tempVec.current.z < 1.0;
      const screenX = ((tempVec.current.x + 1) / 2) * size.width;
      const screenY = ((-tempVec.current.y + 1) / 2) * size.height;

      const px = Math.round(screenX);
      const py = Math.round(screenY);

      stateSignature += `${anchor.id}:${px},${py},${inFront ? 1 : 0}|`;

      projected.push({
        id: anchor.id,
        nameVi: anchor.nameVi,
        nameEn: anchor.nameEn,
        subtitle: anchor.subtitle,
        screenX: px,
        screenY: py,
        inFront,
        priority: anchor.priority,
        width: anchor.width || (anchor.priority === 1 ? 160 : anchor.priority === 2 ? 140 : 110),
        height: anchor.height || (anchor.priority === 1 ? 32 : 26),
        isSelected: anchor.isSelected,
        isCritical: anchor.isCritical
      });
    }

    if (stateSignature !== lastStateRef.current) {
      lastStateRef.current = stateSignature;
      onProject(projected);
    }
  });

  return null;
};
