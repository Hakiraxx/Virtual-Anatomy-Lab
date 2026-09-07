/**
 * LayerSeparationController.ts
 *
 * Central Controller for 3D Layer Separation and Exploded View Assembly
 * Provides unified API to toggle, adjust progress, and evaluate spatial transforms
 * across all anatomical systems in MedAnatomy 3D.
 */

import { LayerRegistry } from './LayerRegistry';
import { useAnatomyStore } from '../../stores/useAnatomyStore';

export class LayerSeparationController {
  /**
   * Default separation factor applied when user clicks "Bóc tách lớp" (45% optimal anatomical separation).
   */
  static readonly DEFAULT_EXPLODE_FACTOR = 0.45;

  /**
   * Returns true if layer separation / exploded view is currently active.
   */
  static isEnabled(): boolean {
    const s = useAnatomyStore.getState();
    return s.isLayersActive || s.explodeFactor > 0.001;
  }

  /**
   * Gets current explode progress factor (0.0 to 1.0).
   */
  static getProgress(): number {
    return useAnatomyStore.getState().explodeFactor;
  }

  /**
   * Enables layer separation with a default or custom explode factor.
   */
  static enable(factor: number = LayerSeparationController.DEFAULT_EXPLODE_FACTOR): void {
    const clamped = Math.max(0.1, Math.min(1.0, factor));
    useAnatomyStore.setState({
      isLayersActive: true,
      explodeFactor: clamped
    });
  }

  /**
   * Disables layer separation and smoothly resets explode progress to 0.
   */
  static disable(): void {
    useAnatomyStore.setState({
      isLayersActive: false,
      explodeFactor: 0.0
    });
  }

  /**
   * Toggles layer separation between active (45%) and collapsed (0%).
   */
  static toggle(): void {
    if (this.isEnabled()) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * Sets continuous explode progress factor (0.0 to 1.0) from slider or touch gestures.
   */
  static setProgress(value: number): void {
    const clamped = Math.max(0.0, Math.min(1.0, value));
    useAnatomyStore.setState({
      explodeFactor: clamped,
      isLayersActive: clamped > 0.001
    });
  }

  /**
   * Fully resets separation and transforms back to origin.
   */
  static reset(): void {
    this.disable();
  }

  /**
   * Computes spatial offset vector [dx, dy, dz] for a specific layer.
   */
  static getLayerOffset(layerIndex: number, customFactor?: number): [number, number, number] {
    const factor = customFactor !== undefined ? customFactor : this.getProgress();
    return LayerRegistry.getLayerOffset(layerIndex, factor);
  }
}
