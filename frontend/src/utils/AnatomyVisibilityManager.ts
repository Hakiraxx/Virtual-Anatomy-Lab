import * as THREE from 'three';

export interface StructureVisualState {
  visible: boolean;
  opacity: number;
  highlighted: boolean;
  dimmed: boolean;
}

export class AnatomyVisibilityManager {
  private static structureStates: Map<string, StructureVisualState> = new Map();
  private static layerVisibility: Map<number, boolean> = new Map([
    [1, true], // Skin
    [2, false], // Fascia
    [3, true], // Muscles
    [4, true], // Skeleton
    [5, true], // Visceral Organs
    [6, true], // Blood Vessels
    [7, true], // Nervous System
    [8, true]  // Endocrine & Deep
  ]);
  private static layerOpacity: Map<number, number> = new Map([
    [1, 0.20],
    [2, 0.50],
    [3, 0.40],
    [4, 1.00],
    [5, 1.00],
    [6, 1.00],
    [7, 1.00],
    [8, 1.00]
  ]);

  /**
   * Set visibility of a specific anatomical structure
   */
  static setVisible(structureId: string, visible: boolean): void {
    const current = this.getState(structureId);
    this.structureStates.set(structureId, { ...current, visible });
  }

  /**
   * Set opacity of a specific anatomical structure (0.0 to 1.0)
   */
  static setOpacity(structureId: string, opacity: number): void {
    const current = this.getState(structureId);
    this.structureStates.set(structureId, {
      ...current,
      opacity: Math.max(0, Math.min(1, opacity))
    });
  }

  /**
   * Set visibility for an entire anatomical dissection layer
   */
  static setLayerVisible(layerIndex: number, visible: boolean): void {
    this.layerVisibility.set(layerIndex, visible);
  }

  /**
   * Set default base opacity for an entire layer
   */
  static setLayerOpacity(layerIndex: number, opacity: number): void {
    this.layerOpacity.set(layerIndex, Math.max(0, Math.min(1, opacity)));
  }

  /**
   * Check if a structure is visible considering both its individual state and its layer
   */
  static isStructureVisible(structureId: string, layerIndex?: number): boolean {
    const structState = this.structureStates.get(structureId);
    if (structState && !structState.visible) return false;
    if (layerIndex !== undefined) {
      return this.layerVisibility.get(layerIndex) ?? true;
    }
    return true;
  }

  /**
   * Computes effective opacity for a structure given base layer opacity, isolation, and focus context
   */
  static getEffectiveOpacity(
    structureId: string,
    baseLayerOpacity: number,
    selectedId: string | null,
    isIsolated: boolean
  ): number {
    if (baseLayerOpacity <= 0) return 0;

    const structState = this.structureStates.get(structureId);
    if (structState && !structState.visible) return 0;
    const individualOpacity = structState ? structState.opacity : 1.0;

    if (isIsolated) {
      if (selectedId === structureId) return 1.0;
      return 0.0; // Completely hidden in isolation mode
    }

    if (selectedId) {
      if (selectedId === structureId) return 1.0;
      // Dim surrounding structures gracefully instead of abrupt global traverse
      return Math.min(0.18, baseLayerOpacity * individualOpacity);
    }

    return baseLayerOpacity * individualOpacity;
  }

  /**
   * Retrieve state or fallback to default
   */
  static getState(structureId: string): StructureVisualState {
    return (
      this.structureStates.get(structureId) || {
        visible: true,
        opacity: 1.0,
        highlighted: false,
        dimmed: false
      }
    );
  }

  /**
   * Apply consistent PBR materials without blind traverse
   */
  static applyAnatomicalMaterial(
    mesh: THREE.Mesh,
    opacity: number,
    isSelected: boolean,
    clippingPlanes: THREE.Plane[]
  ): void {
    if (!mesh.material) return;
    const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;

    const isSolid = opacity >= 0.98;
    mat.transparent = !isSolid;
    mat.opacity = opacity;
    mat.depthWrite = isSolid;
    mat.depthTest = true;
    mat.clippingPlanes = clippingPlanes;
    mat.side = THREE.DoubleSide;

    if (isSelected) {
      mat.emissive = new THREE.Color('#f59e0b');
      mat.emissiveIntensity = 0.55;
    } else {
      mat.emissive = new THREE.Color('#000000');
      mat.emissiveIntensity = 0.0;
    }

    mesh.material = mat;
  }

  /**
   * Reset all visual states to standard anatomical baseline
   */
  static reset(): void {
    this.structureStates.clear();
    this.layerVisibility = new Map([
      [1, true],
      [2, false],
      [3, true],
      [4, true],
      [5, true],
      [6, true],
      [7, true],
      [8, true]
    ]);
    this.layerOpacity = new Map([
      [1, 0.20],
      [2, 0.50],
      [3, 0.40],
      [4, 1.00],
      [5, 1.00],
      [6, 1.00],
      [7, 1.00],
      [8, 1.00]
    ]);
  }
}
