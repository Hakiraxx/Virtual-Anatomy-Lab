/**
 * ANATOMY VIEWER CORE (Shared 3D Engine Service)
 * Provides centralized bounding box calculations, generic camera framing,
 * standard camera presets (General + RHM), raycasting helpers, clipping planes,
 * and isolation/ghosting shader managers without hardcoded positions.
 */

import * as THREE from 'three';

export type StandardCameraPreset =
  | 'front'
  | 'back'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'face'
  | 'lateral_face'
  | 'skull_base'
  | 'orbit'
  | 'oral_cavity'
  | 'maxilla'
  | 'mandible'
  | 'tmj'
  | 'mandibular_canal'
  | 'skull_whole'
  | 'skull_face'
  | 'skull_lateral'
  | 'skull_base_superior'
  | 'cranial_fossa_anterior'
  | 'cranial_fossa_middle'
  | 'cranial_fossa_posterior'
  | 'skull_orbit'
  | 'pterygopalatine_fossa'
  | 'infratemporal_fossa'
  | 'mandible_close'
  | 'maxilla_close';

export interface BoundingResult {
  box: THREE.Box3;
  sphere: THREE.Sphere;
  center: THREE.Vector3;
  size: THREE.Vector3;
}

export class AnatomyViewerCore {
  /**
   * Compute exact 3D bounding box and bounding sphere for any Object3D hierarchy.
   */
  static computeBounds(object: THREE.Object3D): BoundingResult {
    const box = new THREE.Box3().setFromObject(object);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);

    return { box, sphere, center, size };
  }

  /**
   * Dynamically calculate ideal camera distance and position to frame any bounding box.
   * Eliminates hardcoded magic camera positions.
   */
  static computeCameraFrame(
    bounds: THREE.Box3 | BoundingResult,
    viewDirection: THREE.Vector3 = new THREE.Vector3(0, 0, 1),
    fov = 45,
    aspect = 1.0,
    margin = 1.25
  ): { position: THREE.Vector3; target: THREE.Vector3; distance: number } {
    const box = 'box' in bounds ? bounds.box : bounds;
    const center = new THREE.Vector3();
    box.getCenter(center);

    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    const radius = Math.max(sphere.radius, 0.05);

    // Calculate distance required to fit the sphere inside FOV
    const fovRad = (fov * Math.PI) / 180;
    const horizontalFov = 2 * Math.atan(Math.tan(fovRad / 2) * aspect);
    const minFov = Math.min(fovRad, horizontalFov);
    const distance = (radius / Math.sin(minFov / 2)) * margin;

    const normDir = viewDirection.clone().normalize();
    const position = center.clone().add(normDir.multiplyScalar(distance));

    return { position, target: center, distance };
  }

  /**
   * Generic Camera Preset Positioning.
   * Dynamically aligns to bounding box center or standard craniofacial coordinate space.
   */
  static getPresetCoordinates(
    preset: StandardCameraPreset,
    customBounds?: THREE.Box3,
    fov = 45
  ): { position: [number, number, number]; target: [number, number, number] } {
    // Default head center in metric space: [0, 0, 0]
    const defaultCenter = new THREE.Vector3(0, 0, 0);
    const defaultSize = new THREE.Vector3(0.18, 0.22, 0.22);
    const center = customBounds ? customBounds.getCenter(new THREE.Vector3()) : defaultCenter;
    const size = customBounds ? customBounds.getSize(new THREE.Vector3()) : defaultSize;
    const maxDim = Math.max(size.x, size.y, size.z, 0.18);

    let dir = new THREE.Vector3(0, 0, 1);
    let distMultiplier = 1.8;
    let targetOffset = new THREE.Vector3(0, 0, 0);

    switch (preset) {
      case 'front':
        dir.set(0, 0, 1);
        distMultiplier = 1.8;
        break;
      case 'back':
        dir.set(0, 0, -1);
        distMultiplier = 1.8;
        break;
      case 'left':
        dir.set(-1, 0, 0);
        distMultiplier = 1.8;
        break;
      case 'right':
        dir.set(1, 0, 0);
        distMultiplier = 1.8;
        break;
      case 'top':
        dir.set(0, 1, 0.01);
        distMultiplier = 1.8;
        break;
      case 'bottom':
        dir.set(0, -1, 0.01);
        distMultiplier = 1.8;
        break;

      // RHM Specialized Presets
      case 'face':
        dir.set(0, 0.05, 1);
        targetOffset.set(0, -0.02, 0.04);
        distMultiplier = 1.5;
        break;
      case 'lateral_face':
        dir.set(0.85, 0.08, 0.52);
        targetOffset.set(0.02, -0.04, 0.03);
        distMultiplier = 1.4;
        break;
      case 'skull_base':
        dir.set(0, -0.92, 0.38);
        targetOffset.set(0, 0.05, 0.01);
        distMultiplier = 1.5;
        break;
      case 'orbit':
        dir.set(0.2, 0.05, 0.98);
        targetOffset.set(0.025, 0.06, 0.05);
        distMultiplier = 0.9;
        break;
      case 'oral_cavity':
        dir.set(0, -0.15, 0.98);
        targetOffset.set(0, -0.06, 0.05);
        distMultiplier = 0.85;
        break;
      case 'maxilla':
        dir.set(0, -0.1, 0.99);
        targetOffset.set(0, -0.03, 0.05);
        distMultiplier = 0.9;
        break;
      case 'mandible':
        dir.set(0.15, -0.25, 0.95);
        targetOffset.set(0, -0.07, 0.04);
        distMultiplier = 1.0;
        break;
      case 'tmj':
        dir.set(0.85, 0.1, 0.5);
        targetOffset.set(0.045, -0.03, 0.02);
        distMultiplier = 0.9;
        break;
      case 'mandibular_canal':
        dir.set(0.75, -0.15, 0.64);
        targetOffset.set(0.03, -0.065, 0.03);
        distMultiplier = 0.85;
        break;

      case 'skull_whole':
        dir.set(0, 0.1, 1);
        targetOffset.set(0, -0.02, 0.02);
        distMultiplier = 1.8;
        break;
      case 'skull_face':
        dir.set(0, 0.05, 1);
        targetOffset.set(0, -0.02, 0.04);
        distMultiplier = 1.35;
        break;
      case 'skull_lateral':
        dir.set(1, 0.05, 0.1);
        targetOffset.set(0.02, -0.02, 0.02);
        distMultiplier = 1.45;
        break;
      case 'skull_base_superior':
        dir.set(0, 0.95, 0.15);
        targetOffset.set(0, -0.02, 0.02);
        distMultiplier = 1.25;
        break;
      case 'cranial_fossa_anterior':
        dir.set(0, 0.92, 0.35);
        targetOffset.set(0, 0.02, 0.08);
        distMultiplier = 0.95;
        break;
      case 'cranial_fossa_middle':
        dir.set(0, 0.95, 0.15);
        targetOffset.set(0, 0.0, 0.03);
        distMultiplier = 0.95;
        break;
      case 'cranial_fossa_posterior':
        dir.set(0, 0.92, -0.25);
        targetOffset.set(0, -0.02, -0.02);
        distMultiplier = 0.95;
        break;
      case 'skull_orbit':
        dir.set(0.15, 0.05, 0.98);
        targetOffset.set(0.02, 0.05, 0.05);
        distMultiplier = 0.85;
        break;
      case 'pterygopalatine_fossa':
        dir.set(0.45, 0.15, 0.85);
        targetOffset.set(0.015, -0.01, 0.04);
        distMultiplier = 0.75;
        break;
      case 'infratemporal_fossa':
        dir.set(0.85, 0.15, 0.45);
        targetOffset.set(0.035, -0.03, 0.02);
        distMultiplier = 0.8;
        break;
      case 'mandible_close':
        dir.set(0.1, -0.25, 0.95);
        targetOffset.set(0, -0.07, 0.04);
        distMultiplier = 0.85;
        break;
      case 'maxilla_close':
        dir.set(0, -0.1, 0.99);
        targetOffset.set(0, -0.02, 0.05);
        distMultiplier = 0.85;
        break;
    }

    const finalTarget = center.clone().add(targetOffset);
    const distance = maxDim * distMultiplier;
    const finalPos = finalTarget.clone().add(dir.normalize().multiplyScalar(distance));

    return {
      position: [finalPos.x, finalPos.y, finalPos.z],
      target: [finalTarget.x, finalTarget.y, finalTarget.z]
    };
  }

  /**
   * Generates a semi-transparent ghost material for non-isolated structures.
   */
  static getGhostMaterial(color = '#64748b', opacity = 0.12): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      roughness: 0.6,
      transmission: 0.75,
      thickness: 0.5,
      depthWrite: true
    });
  }

  /**
   * Applies selective isolation to scene hierarchies.
   */
  static setSceneIsolation(
    root: THREE.Object3D,
    activeIds: string[] | Set<string>,
    isGhosted = true
  ): void {
    const idSet = activeIds instanceof Set ? activeIds : new Set(activeIds);
    if (idSet.size === 0) {
      // Restore all
      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          if (m.userData.__origMaterial) {
            m.material = m.userData.__origMaterial;
          }
          m.visible = true;
        }
      });
      return;
    }

    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh;
        if (!m.userData.__origMaterial) {
          m.userData.__origMaterial = m.material;
        }

        const isMatch =
          (m.userData.anatomyId && idSet.has(m.userData.anatomyId)) ||
          idSet.has(m.name);

        if (isMatch) {
          m.material = m.userData.__origMaterial;
          m.visible = true;
        } else {
          if (isGhosted) {
            m.material = AnatomyViewerCore.getGhostMaterial();
            m.visible = true;
          } else {
            m.visible = false;
          }
        }
      }
    });
  }

  /**
   * Create clipping plane for cross-section slicing.
   */
  static createClippingPlane(
    axis: 'x' | 'y' | 'z',
    offset: number,
    inverted = false
  ): THREE.Plane {
    const normal = new THREE.Vector3();
    if (axis === 'x') normal.set(inverted ? 1 : -1, 0, 0);
    else if (axis === 'y') normal.set(0, inverted ? 1 : -1, 0);
    else normal.set(0, 0, inverted ? 1 : -1);

    return new THREE.Plane(normal, offset);
  }

  /**
   * Optimize raycaster thresholds for thin anatomical structures (nerves, vessels).
   */
  static optimizeRaycaster(raycaster: THREE.Raycaster): void {
    raycaster.params.Line = { threshold: 0.015 };
    raycaster.params.Points = { threshold: 0.02 };
  }
}
