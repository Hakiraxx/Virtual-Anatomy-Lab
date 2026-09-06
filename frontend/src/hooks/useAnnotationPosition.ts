import { useState, useEffect, useRef, useCallback } from 'react';
import {
  computeOptimalAnnotationPosition,
  ModelObstructionTarget,
  AnnotationPositionResult
} from '../utils/AnnotationPositioner';

export interface UseAnnotationPositionOptions {
  target: ModelObstructionTarget;
  isExpanded?: boolean;
}

export function useAnnotationPosition({ target, isExpanded = false }: UseAnnotationPositionOptions) {
  const [positionResult, setPositionResult] = useState<AnnotationPositionResult>(() =>
    computeOptimalAnnotationPosition(target)
  );
  const [isRotating, setIsRotating] = useState(false);
  const rotationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    // When expanded, the card manages its own fixed right-panel / bottom-sheet layout
    if (isExpanded) return;
    const next = computeOptimalAnnotationPosition(target);
    setPositionResult(next);
  }, [target, isExpanded]);

  // Recalculate on mount, target change, and window/layout mutations
  useEffect(() => {
    updatePosition();

    const handleResize = () => {
      updatePosition();
    };

    const handleOrientationChange = () => {
      setTimeout(updatePosition, 100);
    };

    const handleFullscreenChange = () => {
      setTimeout(updatePosition, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // MutationObserver to detect toolbar popups (e.g. Explode slider, Angle presets opening)
    let mutationTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      if (mutationTimer) clearTimeout(mutationTimer);
      mutationTimer = setTimeout(updatePosition, 60);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden']
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      observer.disconnect();
      if (mutationTimer) clearTimeout(mutationTimer);
    };
  }, [updatePosition]);

  // Listen to canvas pointer events for auto-dimming during heavy 3D rotation
  useEffect(() => {
    const handleCanvasPointerDown = (e: MouseEvent | TouchEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl && (targetEl.tagName === 'CANVAS' || targetEl.closest('canvas'))) {
        setIsRotating(true);
      }
    };

    const handleCanvasPointerUp = () => {
      if (rotationTimeoutRef.current) clearTimeout(rotationTimeoutRef.current);
      rotationTimeoutRef.current = setTimeout(() => {
        setIsRotating(false);
      }, 150);
    };

    window.addEventListener('mousedown', handleCanvasPointerDown, { passive: true });
    window.addEventListener('touchstart', handleCanvasPointerDown, { passive: true });
    window.addEventListener('mouseup', handleCanvasPointerUp, { passive: true });
    window.addEventListener('touchend', handleCanvasPointerUp, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleCanvasPointerDown);
      window.removeEventListener('touchstart', handleCanvasPointerDown);
      window.removeEventListener('mouseup', handleCanvasPointerUp);
      window.removeEventListener('touchend', handleCanvasPointerUp);
      if (rotationTimeoutRef.current) clearTimeout(rotationTimeoutRef.current);
    };
  }, []);

  return {
    positionResult,
    isRotating
  };
}
