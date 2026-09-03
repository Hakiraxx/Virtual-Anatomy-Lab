import * as THREE from 'three';
import { ANATOMICAL_STRUCTURES, ANATOMICAL_SYSTEMS } from '../data/anatomyHierarchy';

export interface MeshInspectionResult {
  nodeName: string;
  meshName: string;
  triangleCount: number;
  vertexCount: number;
  materialName: string;
  worldPosition: [number, number, number];
  boundingBox: {
    min: [number, number, number];
    max: [number, number, number];
    size: [number, number, number];
  };
  userData: any;
}

export class AnatomyRegistryValidator {
  /**
   * Validates integrity of anatomy registry against active models and systems.
   */
  static validate(): { valid: boolean; warnings: string[]; stats: any } {
    const warnings: string[] = [];
    const structureKeys = Object.keys(ANATOMICAL_STRUCTURES);
    const systemKeys = ANATOMICAL_SYSTEMS.map((s) => s.id);

    // 1. Check for missing systems
    for (const key of structureKeys) {
      const st = ANATOMICAL_STRUCTURES[key];
      if (!systemKeys.includes(st.systemId)) {
        warnings.push(`Structure "${key}" has invalid systemId: "${st.systemId}"`);
      }
      if (!st.modelFile) {
        warnings.push(`Structure "${key}" has no modelFile specified.`);
      }
    }

    // 2. Compute system counts
    const systemCounts: Record<string, number> = {};
    for (const sys of systemKeys) systemCounts[sys] = 0;
    for (const key of structureKeys) {
      const st = ANATOMICAL_STRUCTURES[key];
      if (systemCounts[st.systemId] !== undefined) {
        systemCounts[st.systemId]++;
      }
    }

    const stats = {
      totalStructures: structureKeys.length,
      totalSystems: systemKeys.length,
      systemCounts
    };

    console.log('[AnatomyRegistryValidator] Integrity check complete:', stats);
    if (warnings.length > 0) {
      console.warn('[AnatomyRegistryValidator] Warnings:', warnings);
    }

    // Register debug helper on window
    if (typeof window !== 'undefined') {
      (window as any).__ANATOMY_DEBUG__ = {
        structures: ANATOMICAL_STRUCTURES,
        systems: ANATOMICAL_SYSTEMS,
        validate: AnatomyRegistryValidator.validate,
        inspectGLTF: AnatomyRegistryValidator.inspectGLTF
      };
    }

    return {
      valid: warnings.length === 0,
      warnings,
      stats
    };
  }

  /**
   * Detailed inspection utility for any loaded Three.js Object3D / GLTF Scene
   */
  static inspectGLTF(scene: THREE.Object3D): MeshInspectionResult[] {
    const results: MeshInspectionResult[] = [];

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const geom = child.geometry;
        const pos = geom.attributes.position;
        const box = new THREE.Box3().setFromObject(child);
        const size = new THREE.Vector3();
        box.getSize(size);

        const worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);

        results.push({
          nodeName: child.name || 'unnamed',
          meshName: child.isMesh ? child.name : 'non-mesh',
          triangleCount: geom.index ? geom.index.count / 3 : pos.count / 3,
          vertexCount: pos ? pos.count : 0,
          materialName: child.material ? child.material.name || child.material.type : 'none',
          worldPosition: [worldPos.x, worldPos.y, worldPos.z],
          boundingBox: {
            min: [box.min.x, box.min.y, box.min.z],
            max: [box.max.x, box.max.y, box.max.z],
            size: [size.x, size.y, size.z]
          },
          userData: child.userData
        });
      }
    });

    console.table(results);
    return results;
  }
}
