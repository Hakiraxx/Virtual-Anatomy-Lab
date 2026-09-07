import * as THREE from 'three';
import { CoordinateAlignmentValidator } from './CoordinateAlignmentValidator.ts';
import { ToothPositionResolver } from '../../utils/ToothPositionResolver.ts';
import { TOOTH_REGISTRY } from '../../data/ToothRegistry.ts';

export interface ResolvedDentalTarget {
  id: string;
  nameVi: string;
  nameEn: string;
  object: THREE.Object3D | null;
  worldPosition: [number, number, number];
  bounds: THREE.Box3;
  boundingSphere: THREE.Sphere;
  effectiveRadius: number;
  requiredContext: ('mandible' | 'teeth' | 'nerves' | 'canal')[];
  isRightSide: boolean;
  isValid: boolean;
}

export const MINIMUM_ANATOMY_RADIUS = 0.012; // 12mm minimum visual radius to prevent clipping

export class DentalTargetResolver {
  /**
   * Resolves any dental or craniofacial structure ID to authoritative canonical 3D bounds and world position.
   */
  public static resolveTarget(
    structureId: string | null | undefined,
    sceneRoot?: THREE.Object3D | null,
    options?: { isRight?: boolean }
  ): ResolvedDentalTarget {
    const coords = CoordinateAlignmentValidator.CANONICAL_COORDINATES;
    const cleanId = (structureId || 'tooth_48').toLowerCase().trim();

    // Default right side unless tooth is in left quadrant or explicitly left
    let isRight = options?.isRight ?? true;
    if (cleanId.includes('38') || cleanId.includes('.3') || cleanId.endsWith('.l') || cleanId.includes('left')) {
      isRight = false;
    } else if (cleanId.includes('48') || cleanId.includes('.4') || cleanId.endsWith('.r') || cleanId.includes('right')) {
      isRight = true;
    }

    // 1. Try to locate matching Object3D in live scene graph
    let liveObject: THREE.Object3D | null = null;
    if (sceneRoot) {
      sceneRoot.updateMatrixWorld(true);
      sceneRoot.traverse((child) => {
        if (liveObject) return;
        const name = (child.name || '').toLowerCase();
        if (child.userData?.toothFdi) {
          const targetFdi = cleanId.includes('38') ? 38 : cleanId.includes('48') ? 48 : null;
          if (targetFdi && child.userData.toothFdi === targetFdi) {
            liveObject = child;
            return;
          }
        }
        if (cleanId === 'nerve_ian' && name.includes('inferior alveolar nerve')) {
          if (isRight && name.includes('.r')) liveObject = child;
          else if (!isRight && name.includes('.l')) liveObject = child;
        } else if (cleanId === 'nerve_lingual' && name.includes('lingual nerve')) {
          if (isRight && name.includes('.r')) liveObject = child;
          else if (!isRight && name.includes('.l')) liveObject = child;
        } else if ((cleanId === 'bone_mandible' || cleanId === 'mandible') && name.includes('mandib')) {
          liveObject = child;
        }
      });
    }

    // 2. Compute bounds from live object or canonical constants
    const bounds = new THREE.Box3();
    const sphere = new THREE.Sphere();
    let worldPos: [number, number, number];
    let nameVi = '';
    let nameEn = '';
    let requiredContext: ('mandible' | 'teeth' | 'nerves' | 'canal')[] = ['mandible'];

    if (cleanId === 'tooth_48' || cleanId === 'tooth.48' || cleanId === '48') {
      nameVi = 'Răng khôn dưới phải (R.48)';
      nameEn = 'Mandibular Right Third Molar (Tooth 48)';
      worldPos = [...coords.tooth48.socketPos];
      bounds.min.set(worldPos[0] - 0.006, worldPos[1] - 0.010, worldPos[2] - 0.006);
      bounds.max.set(worldPos[0] + 0.006, worldPos[1] + 0.006, worldPos[2] + 0.006);
      requiredContext = ['mandible', 'teeth', 'nerves'];
      isRight = true;
    } else if (cleanId === 'tooth_38' || cleanId === 'tooth.38' || cleanId === '38') {
      nameVi = 'Răng khôn dưới trái (R.38)';
      nameEn = 'Mandibular Left Third Molar (Tooth 38)';
      worldPos = [...coords.tooth38.socketPos];
      bounds.min.set(worldPos[0] - 0.006, worldPos[1] - 0.010, worldPos[2] - 0.006);
      bounds.max.set(worldPos[0] + 0.006, worldPos[1] + 0.006, worldPos[2] + 0.006);
      requiredContext = ['mandible', 'teeth', 'nerves'];
      isRight = false;
    } else if (cleanId === 'bone_mandible' || cleanId === 'mandible') {
      nameVi = 'Xương hàm dưới (Mandible)';
      nameEn = 'Mandible Bone';
      worldPos = [...coords.mandible.center];
      bounds.min.set(...coords.mandible.boxMin);
      bounds.max.set(...coords.mandible.boxMax);
      requiredContext = ['mandible', 'teeth'];
    } else if (cleanId === 'nerve_ian' || cleanId === 'ian' || cleanId.includes('inferior_alveolar') || cleanId.includes('inferior-alveolar')) {
      nameVi = isRight ? 'TK Huyệt răng dưới phải (IAN.r)' : 'TK Huyệt răng dưới trái (IAN.l)';
      nameEn = isRight ? 'Inferior Alveolar Nerve Right' : 'Inferior Alveolar Nerve Left';
      const ianCoord = isRight ? coords.ianRight : coords.ianLeft;
      worldPos = [...ianCoord.center];
      bounds.min.set(...ianCoord.boxMin);
      bounds.max.set(...ianCoord.boxMax);
      requiredContext = ['mandible', 'nerves', 'canal'];
    } else if (cleanId === 'nerve_lingual' || cleanId.includes('lingual')) {
      nameVi = isRight ? 'TK Lưỡi phải (Lingual N.r)' : 'TK Lưỡi trái (Lingual N.l)';
      nameEn = isRight ? 'Lingual Nerve Right' : 'Lingual Nerve Left';
      const lingCoord = isRight ? coords.lingualRight : coords.lingualLeft;
      worldPos = [...lingCoord.center];
      bounds.min.set(worldPos[0] - 0.012, worldPos[1] - 0.020, worldPos[2] - 0.015);
      bounds.max.set(worldPos[0] + 0.012, worldPos[1] + 0.020, worldPos[2] + 0.015);
      requiredContext = ['mandible', 'nerves'];
    } else if (cleanId === 'mandibular_canal' || cleanId.includes('canal')) {
      nameVi = isRight ? 'Ống thần kinh răng dưới phải' : 'Ống thần kinh răng dưới trái';
      nameEn = isRight ? 'Mandibular Canal Right' : 'Mandibular Canal Left';
      const ianCoord = isRight ? coords.ianRight : coords.ianLeft;
      worldPos = [...ianCoord.center];
      bounds.min.set(...ianCoord.boxMin);
      bounds.max.set(...ianCoord.boxMax);
      requiredContext = ['mandible', 'canal', 'nerves'];
    } else if (cleanId === 'mental_foramen' || cleanId.includes('mental')) {
      nameVi = isRight ? 'Lỗ cằm phải (Mental Foramen.r)' : 'Lỗ cằm trái (Mental Foramen.l)';
      nameEn = isRight ? 'Mental Foramen Right' : 'Mental Foramen Left';
      const mCoord = isRight ? coords.mentalRight : coords.mentalLeft;
      worldPos = [...mCoord.center];
      bounds.min.set(worldPos[0] - 0.008, worldPos[1] - 0.008, worldPos[2] - 0.008);
      bounds.max.set(worldPos[0] + 0.008, worldPos[1] + 0.008, worldPos[2] + 0.008);
      requiredContext = ['mandible', 'nerves'];
    } else if (cleanId === 'mandibular_foramen' || cleanId.includes('spix')) {
      nameVi = isRight ? 'Lỗ hàm dưới phải (Gai Spix.r)' : 'Lỗ hàm dưới trái (Gai Spix.l)';
      nameEn = isRight ? 'Mandibular Foramen Right (Spix)' : 'Mandibular Foramen Left (Spix)';
      const sCoord = isRight ? coords.mandibularForamenRight : coords.mandibularForamenLeft;
      worldPos = [...sCoord.center];
      bounds.min.set(worldPos[0] - 0.008, worldPos[1] - 0.008, worldPos[2] - 0.008);
      bounds.max.set(worldPos[0] + 0.008, worldPos[1] + 0.008, worldPos[2] + 0.008);
      requiredContext = ['mandible', 'nerves'];
    } else {
      // General tooth or cranial structure
      const tooth = ToothPositionResolver.resolve(cleanId);
      if (tooth) {
        nameVi = tooth.nameVi;
        nameEn = tooth.nameEn;
        worldPos = [...tooth.craniofacialPos];
        bounds.min.set(worldPos[0] - 0.006, worldPos[1] - 0.008, worldPos[2] - 0.006);
        bounds.max.set(worldPos[0] + 0.006, worldPos[1] + 0.008, worldPos[2] + 0.006);
        requiredContext = ['mandible', 'teeth'];
        isRight = tooth.side === 'RIGHT';
      } else {
        // Fallback to arch center
        nameVi = 'Vùng sọ mặt & răng hàm';
        nameEn = 'Craniofacial & Dental Region';
        worldPos = [coords.midlineX, 0.7600, 0.0350];
        bounds.min.set(worldPos[0] - 0.050, worldPos[1] - 0.040, worldPos[2] - 0.040);
        bounds.max.set(worldPos[0] + 0.050, worldPos[1] + 0.040, worldPos[2] + 0.040);
      }
    }

    // If live object exists and has valid geometry, union/refine bounds
    if (liveObject) {
      const liveBox = new THREE.Box3().setFromObject(liveObject);
      if (!liveBox.isEmpty() && Number.isFinite(liveBox.min.x) && Number.isFinite(liveBox.max.x)) {
        bounds.copy(liveBox);
        const center = new THREE.Vector3();
        bounds.getCenter(center);
        worldPos = [center.x, center.y, center.z];
      }
    }

    // Compute bounding sphere and effective visual radius
    bounds.getBoundingSphere(sphere);
    const effectiveRadius = Math.max(sphere.radius || 0, MINIMUM_ANATOMY_RADIUS);

    const isValid =
      Number.isFinite(worldPos[0]) &&
      Number.isFinite(worldPos[1]) &&
      Number.isFinite(worldPos[2]) &&
      !bounds.isEmpty() &&
      Number.isFinite(bounds.min.x) &&
      Number.isFinite(bounds.max.x) &&
      effectiveRadius > 0;

    return {
      id: cleanId,
      nameVi,
      nameEn,
      object: liveObject,
      worldPosition: worldPos,
      bounds,
      boundingSphere: sphere,
      effectiveRadius,
      requiredContext,
      isRightSide: isRight,
      isValid
    };
  }
}
