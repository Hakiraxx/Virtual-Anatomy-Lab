import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RawProjectedLabel } from '../../utils/ViewerLayoutManager';

export interface VascularLabelAnchor {
  id: string;
  nameVi: string;
  nameEn?: string;
  subtitle?: string;
  worldPos: [number, number, number];
  priority: number; // 1 = Selected, 2 = Major Vessel, 3 = Secondary Branch
  width?: number;
  height?: number;
  isSelected?: boolean;
  isCritical?: boolean;
}

interface VascularLabelProjectorProps {
  anchors: VascularLabelAnchor[];
  onProject: (labels: RawProjectedLabel[]) => void;
}

export const VascularLabelProjector: React.FC<VascularLabelProjectorProps> = ({
  anchors,
  onProject
}) => {
  const tempVec = useRef(new THREE.Vector3());
  const lastSignatureRef = useRef<string>('');

  useFrame(({ camera, size }) => {
    if (!anchors || anchors.length === 0 || size.width === 0 || size.height === 0) return;

    const projected: RawProjectedLabel[] = [];
    let signature = '';

    for (const anchor of anchors) {
      tempVec.current.set(...anchor.worldPos);
      tempVec.current.project(camera);

      // z between -1 and 1 indicates point is within viewing frustum
      const inFront = tempVec.current.z < 1.0 && tempVec.current.z > -1.0;
      const screenX = ((tempVec.current.x + 1) / 2) * size.width;
      const screenY = ((-tempVec.current.y + 1) / 2) * size.height;

      const px = Math.round(screenX);
      const py = Math.round(screenY);

      signature += `${anchor.id}:${px},${py},${inFront ? 1 : 0}|`;

      projected.push({
        id: anchor.id,
        nameVi: anchor.nameVi,
        nameEn: anchor.nameEn,
        subtitle: anchor.subtitle,
        screenX: px,
        screenY: py,
        inFront,
        priority: anchor.priority,
        width: anchor.width || (anchor.priority === 1 ? 180 : anchor.priority === 2 ? 150 : 130),
        height: anchor.height || (anchor.priority === 1 ? 38 : 32),
        isSelected: anchor.isSelected,
        isCritical: anchor.isCritical
      });
    }

    if (signature !== lastSignatureRef.current) {
      lastSignatureRef.current = signature;
      onProject(projected);
    }
  });

  return null;
};
