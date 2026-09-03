import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

interface CameraControllerProps {
  controlsRef: React.RefObject<any>;
}

// Smooth cubic in-out easing for natural cinematic glide
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export const CameraController: React.FC<CameraControllerProps> = ({ controlsRef }) => {
  const { camera } = useThree();

  const cameraFocusTarget = useAnatomyStore((s) => s.cameraFocusTarget);
  const cameraAnglePreset = useAnatomyStore((s) => s.cameraAnglePreset);
  const autoRotate = useAnatomyStore((s) => s.autoRotate);
  const autoRotateSpeed = useAnatomyStore((s) => s.autoRotateSpeed);
  const updateCurrentCamera = useAnatomyStore((s) => s.updateCurrentCamera);

  // Animation interpolation refs
  const animRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 800,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    lastTimestamp: 0
  });

  // Handle focus target changes
  useEffect(() => {
    if (!cameraFocusTarget) return;
    if (cameraFocusTarget.timestamp === animRef.current.lastTimestamp) return;

    animRef.current.lastTimestamp = cameraFocusTarget.timestamp;
    animRef.current.startPos.copy(camera.position);
    animRef.current.endPos.set(...cameraFocusTarget.targetPosition);

    const currentControls = controlsRef.current;
    if (currentControls) {
      animRef.current.startTarget.copy(currentControls.target);
    } else {
      animRef.current.startTarget.set(0, 0, 0);
    }
    animRef.current.endTarget.set(...cameraFocusTarget.targetLookAt);

    animRef.current.duration = cameraFocusTarget.duration || 800;
    animRef.current.startTime = performance.now();
    animRef.current.isAnimating = true;
  }, [cameraFocusTarget, camera, controlsRef]);

  // Handle anatomical angle presets (Anterior, Posterior, Superior, Inferior, Left, Right)
  useEffect(() => {
    if (!cameraAnglePreset || !controlsRef.current) return;

    const controls = controlsRef.current;
    const target = controls.target as THREE.Vector3;
    const distance = Math.max(1.2, camera.position.distanceTo(target));

    const anglePos = new THREE.Vector3();
    switch (cameraAnglePreset) {
      case 'anterior':
        anglePos.set(target.x, target.y, target.z + distance);
        break;
      case 'posterior':
        anglePos.set(target.x, target.y, target.z - distance);
        break;
      case 'superior':
        anglePos.set(target.x, target.y + distance, target.z + 0.001);
        break;
      case 'inferior':
        anglePos.set(target.x, target.y - distance, target.z + 0.001);
        break;
      case 'left':
        anglePos.set(target.x - distance, target.y, target.z);
        break;
      case 'right':
        anglePos.set(target.x + distance, target.y, target.z);
        break;
    }

    animRef.current.startPos.copy(camera.position);
    animRef.current.endPos.copy(anglePos);
    animRef.current.startTarget.copy(target);
    animRef.current.endTarget.copy(target);
    animRef.current.duration = 650;
    animRef.current.startTime = performance.now();
    animRef.current.isAnimating = true;
  }, [cameraAnglePreset, camera, controlsRef]);

  // Handle auto-rotate speed
  useEffect(() => {
    if (controlsRef.current) {
      let speed = 1.2;
      if (autoRotateSpeed === 'slow') speed = 0.6;
      else if (autoRotateSpeed === 'fast') speed = 2.6;
      controlsRef.current.autoRotateSpeed = speed;
    }
  }, [autoRotateSpeed, controlsRef]);

  // Animation frame loop
  useFrame(() => {
    const anim = animRef.current;
    const controls = controlsRef.current;

    if (anim.isAnimating) {
      const now = performance.now();
      const elapsed = now - anim.startTime;
      const progress = Math.min(1.0, elapsed / anim.duration);
      const ease = easeInOutCubic(progress);

      camera.position.lerpVectors(anim.startPos, anim.endPos, ease);

      if (controls) {
        controls.target.lerpVectors(anim.startTarget, anim.endTarget, ease);
        controls.update();
      }

      if (progress >= 1.0) {
        anim.isAnimating = false;
        camera.position.copy(anim.endPos);
        if (controls) {
          controls.target.copy(anim.endTarget);
          controls.update();
        }
      }
    }
  });

  return null;
};
