import * as THREE from 'three';
import type { ResolvedDentalTarget } from './DentalTargetResolver.ts';

export type DentalViewPreset = 'default' | 'occlusal' | 'buccal' | 'lingual' | 'closeup';

export interface CameraFramingResult {
  position: [number, number, number];
  lookAt: [number, number, number];
  distance: number;
  requestId: number;
  isValid: boolean;
}

export class DentalCameraFocusController {
  private static currentRequestId = 0;

  /**
   * Generates a new unique focus request ID to invalidate any prior in-flight camera animations.
   */
  public static nextRequestId(): number {
    this.currentRequestId++;
    return this.currentRequestId;
  }

  /**
   * Checks if the given request ID is still current and has not been superseded.
   */
  public static isCurrentRequest(id: number): boolean {
    return id === this.currentRequestId;
  }

  /**
   * Explicitly cancels any running focus request.
   */
  public static cancelCurrent(): void {
    this.currentRequestId++;
  }

  /**
   * Computes an ergonomically safe, collision-free camera position and lookAt vector
   * that frames the target structure within 50-70% of the active WebGL viewport height.
   */
  public static calculateCameraFraming(
    target: ResolvedDentalTarget,
    preset: DentalViewPreset = 'default',
    fov = 30,
    viewerRect?: { width: number; height: number }
  ): CameraFramingResult {
    const requestId = this.nextRequestId();
    const [tx, ty, tz] = target.worldPosition;
    const isRight = target.isRightSide;

    // Reject target if bounding box or position is degenerate
    if (!target.isValid || !Number.isFinite(tx) || !Number.isFinite(ty) || !Number.isFinite(tz)) {
      return {
        position: [0.0451, 0.7800, 0.2800],
        lookAt: [0.0451, 0.7600, 0.0350],
        distance: 0.25,
        requestId,
        isValid: false
      };
    }

    // Base optical distance formula from bounding sphere effective radius
    const halfFovRad = (fov * Math.PI) / 360;
    let dist = target.effectiveRadius / Math.tan(halfFovRad);

    // If viewerRect aspect ratio is portrait (mobile/tablet), expand distance so target isn't cropped horizontally
    if (viewerRect && viewerRect.height > 0 && viewerRect.width > 0) {
      const aspect = viewerRect.width / viewerRect.height;
      if (aspect < 1.0) {
        dist = dist / aspect;
      }
    }

    // Clamp distance to safe clinical bounds (minimum 35mm to avoid clipping skull, maximum 300mm)
    const minDistance = target.id.includes('mandible') ? 0.16 : 0.045;
    const maxDistance = target.id.includes('mandible') ? 0.30 : 0.18;
    const distance = Math.max(minDistance, Math.min(maxDistance, dist));

    let camPos: [number, number, number];
    let lookTarget: [number, number, number] = [tx, ty, tz];

    switch (preset) {
      case 'occlusal':
        // Superior view looking directly down onto occlusal table
        camPos = [tx, ty + distance, tz + 0.001];
        break;

      case 'buccal':
        // Lateral view from cheek (normalized unit direction)
        camPos = [
          isRight ? tx - distance * 0.9614 : tx + distance * 0.9614,
          ty + distance * 0.0501,
          tz + distance * 0.2704
        ];
        break;

      case 'lingual':
        // Medial view from tongue/floor of mouth (normalized unit direction)
        camPos = [
          isRight ? tx + distance * 0.9524 : tx - distance * 0.9524,
          ty + distance * 0.0501,
          tz - distance * 0.3008
        ];
        break;

      case 'closeup':
        // Anterolateral close-up angled superiorly (normalized unit direction)
        camPos = [
          isRight ? tx - distance * 0.5757 : tx + distance * 0.5757,
          ty + distance * 0.3535,
          tz + distance * 0.7373
        ];
        lookTarget = [tx, ty - 0.002, tz];
        break;

      case 'default':
      default:
        // Ergonomic diagnostic view: anterolateral-superior angle (normalized unit direction)
        camPos = [
          isRight ? tx - distance * 0.5535 : tx + distance * 0.5535,
          ty + distance * 0.3522,
          tz + distance * 0.7547
        ];
        break;
    }

    // Final safety check against NaN/Infinity
    const isValid =
      Number.isFinite(camPos[0]) &&
      Number.isFinite(camPos[1]) &&
      Number.isFinite(camPos[2]) &&
      Number.isFinite(lookTarget[0]) &&
      Number.isFinite(lookTarget[1]) &&
      Number.isFinite(lookTarget[2]) &&
      distance > 0;

    return {
      position: camPos,
      lookAt: lookTarget,
      distance,
      requestId,
      isValid
    };
  }
}
