import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { CranialFossaToolbar } from './CranialFossaToolbar';
import { AnatomyAssetInspector } from '../debug/AnatomyAssetInspector';
import {
  DENTAL_NERVE_STRUCTURES,
  CRANIAL_FORAMINA,
  DENTAL_INNERVATION_DATABASE,
  CLINICAL_ANESTHESIA_TECHNIQUES
} from '../../data/dentalNeuroData';
import { ToothPositionResolver } from '../../utils/ToothPositionResolver';

// Normalizes and articulates any head mesh into the standard Craniofacial coordinate system
export function createCraniofacialOrganGroup(
  scene: THREE.Object3D,
  targetSize: number | [number, number, number],
  rotationOffset: [number, number, number] = [0, -Math.PI / 2, 0],
  positionOffset: [number, number, number] = [0, 0, 0]
): THREE.Group {
  const cloned = scene.clone(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  const centerGroup = new THREE.Group();
  cloned.position.set(-center.x, -center.y, -center.z);
  centerGroup.add(cloned);

  const rotationGroup = new THREE.Group();
  rotationGroup.rotation.set(...rotationOffset);
  rotationGroup.add(centerGroup);

  const root = new THREE.Group();
  if (Array.isArray(targetSize)) {
    root.scale.set(targetSize[0], targetSize[1], targetSize[2]);
  } else {
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? targetSize / maxDim : 1;
    root.scale.set(scale, scale, scale);
  }
  root.position.set(...positionOffset);
  root.add(rotationGroup);
  root.updateMatrixWorld(true);

  return root;
}

// Camera controller for smooth cinematic focus around head coordinate space
const DentalCameraController: React.FC<{ controlsRef: React.RefObject<any> }> = ({ controlsRef }) => {
  const { camera } = useThree();
  const cameraTarget = useDentalNeuroStore((s) => s.cameraTarget);

  const animRef = useRef({
    isAnimating: false,
    startTime: 0,
    duration: 750,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    lastTimestamp: 0
  });

  useEffect(() => {
    if (!cameraTarget || cameraTarget.timestamp === animRef.current.lastTimestamp) return;

    animRef.current.lastTimestamp = cameraTarget.timestamp;
    animRef.current.startPos.copy(camera.position);

    // If cameraTarget position was in legacy standing human space (> 1.15m), adapt to craniofacial space
    let targetPos = new THREE.Vector3(...cameraTarget.position);
    let lookPos = new THREE.Vector3(...cameraTarget.lookAt);
    if (targetPos.y > 1.15) {
      targetPos.y -= 0.60;
    }
    if (lookPos.y > 1.15) {
      lookPos.y -= 0.60;
    }

    animRef.current.endPos.copy(targetPos);

    const controls = controlsRef.current;
    if (controls) {
      animRef.current.startTarget.copy(controls.target);
      animRef.current.endTarget.copy(lookPos);
    }

    animRef.current.startTime = performance.now();
    animRef.current.isAnimating = true;
  }, [cameraTarget, camera, controlsRef]);

  useFrame(() => {
    if (animRef.current.isAnimating) {
      const elapsed = performance.now() - animRef.current.startTime;
      const progress = Math.min(1.0, elapsed / animRef.current.duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(animRef.current.startPos, animRef.current.endPos, ease);

      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(animRef.current.startTarget, animRef.current.endTarget, ease);
        controlsRef.current.update();
      }

      if (progress >= 1.0) {
        animRef.current.isAnimating = false;
      }
    }
  });

  return null;
};

// ============================================================================
// 1. REAL CRANIAL NERVES 3D MESH SYSTEM (Z-Anatomy / BodyParts3D)
// 100% Verified Anatomical Meshes. Zero procedural tube/curve geometry.
// ============================================================================
interface RealCranialNervesSystemProps {
  selectedAnatomyId: string | null;
  selectedSide?: 'right' | 'left' | null;
  lateralizationSide: 'bilateral' | 'right' | 'left';
  activeNerveTraceId: string | null;
  selectedTooth: any;
  selectedToothSide: 'right' | 'left' | null;
  isNeuralXRay?: boolean;
  isV2DentalView?: boolean;
  isFacialNerveLab?: boolean;
  highlightedToothRelations?: { innervation: boolean; vascular: boolean; canal: boolean };
  onSelect: (id: string, side?: 'right' | 'left') => void;
}

const RealCranialNervesSystem: React.FC<RealCranialNervesSystemProps> = ({
  selectedAnatomyId,
  selectedSide,
  lateralizationSide,
  activeNerveTraceId,
  selectedTooth,
  isNeuralXRay = false,
  isV2DentalView = false,
  isFacialNerveLab = false,
  highlightedToothRelations = { innervation: false, vascular: false, canal: false },
  onSelect
}) => {
  const nervesGltf = useGLTF('/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb', '/draco/');

  // Target node matching set
  const targetNodeNames = useMemo(() => {
    const targets = new Set<string>();
    if (!selectedAnatomyId && !selectedTooth && !isV2DentalView && !isFacialNerveLab && !highlightedToothRelations.innervation) {
      return targets;
    }

    const sel = selectedAnatomyId || '';

    // CN I (Olfactory)
    if (sel === 'cn_1' || sel.includes('olfactory')) {
      targets.add('Olfactory nerve (I).l');
      targets.add('Olfactory nerve (I).r');
    }
    // CN II (Optic)
    else if (sel === 'cn_2' || sel.includes('optic')) {
      targets.add('Optic nerve (II).l');
      targets.add('Optic nerve (II).r');
      targets.add('Optic chiasm');
      targets.add('Optic tract');
    }
    // CN III (Oculomotor)
    else if (sel === 'cn_3' || sel.includes('oculomotor')) {
      targets.add('Oculomotor nerve (III).l');
      targets.add('Oculomotor nerve (III).r');
      targets.add('Accessory nucleus of oculomotor nerve.l');
      targets.add('Accessory nucleus of oculomotor nerve.r');
    }
    // CN IV (Trochlear)
    else if (sel === 'cn_4' || sel.includes('trochlear')) {
      targets.add('Trochlear nerve (IV).l');
      targets.add('Trochlear nerve (IV).r');
    }
    // CN V (Trigeminal complete system)
    else if (sel === 'cn_5' || sel === 'nerve_cn_v' || sel === 'trigeminal_ganglion') {
      [
        'Trigeminal nerve (V).l', 'Trigeminal nerve (V).r',
        'Motor root of trigeminal nerve.l', 'Motor root of trigeminal nerve.r',
        'Sensory root of trigeminal nerve.l', 'Sensory root of trigeminal nerve.r',
        'Mandibular nerve.j', 'Mandibular nerve.g'
      ].forEach(n => targets.add(n));
    }
    // V1 (Ophthalmic)
    else if (sel === 'cn_5_v1' || sel.includes('v1') || sel.includes('ophthalmic')) {
      targets.add('Ophthalmic nerve.l');
      targets.add('Ophthalmic nerve.r');
    }
    // V2 (Maxillary)
    else if (sel === 'cn_5_v2' || sel.includes('v2') || sel.includes('maxillary') || isV2DentalView) {
      [
        'Maxillary nerve.l', 'Maxillary nerve.r',
        'Meningeal branch of maxillary nerve.l', 'Meningeal branch of maxillary nerve.r'
      ].forEach(n => targets.add(n));
    }
    // V3 (Mandibular)
    else if (sel === 'cn_5_v3' || sel.includes('v3') || sel.includes('mandibular')) {
      [
        'Mandibular nerve.j', 'Mandibular nerve.g',
        'Anterior division of mandibular nerve.l', 'Anterior division of mandibular nerve.r',
        'Posterior division of mandibular nerve.l', 'Posterior division of mandibular nerve.r',
        'Inferior alveolar nerve.l', 'Inferior alveolar nerve.r',
        'Lingual nerve.l', 'Lingual nerve.r',
        'Mental nerve.l', 'Mental nerve.r'
      ].forEach(n => targets.add(n));
    }
    // Inferior Alveolar Nerve (IAN)
    else if (sel === 'nerve_ian' || sel.includes('inferior_alveolar')) {
      targets.add('Inferior alveolar nerve.l');
      targets.add('Inferior alveolar nerve.r');
      targets.add('Mental nerve.l');
      targets.add('Mental nerve.r');
    }
    // Lingual Nerve
    else if (sel === 'nerve_lingual' || sel.includes('lingual')) {
      targets.add('Lingual nerve.l');
      targets.add('Lingual nerve.r');
      targets.add('Chorda tympani.l');
      targets.add('Chorda tympani.r');
    }
    // Mental Nerve
    else if (sel === 'nerve_mental' || sel.includes('mental')) {
      targets.add('Mental nerve.l');
      targets.add('Mental nerve.r');
    }
    // Buccal Nerve
    else if (sel === 'nerve_buccal' || sel.includes('buccal')) {
      targets.add('Buccal nerve.l');
      targets.add('Buccal nerve.r');
    }
    // CN VI (Abducens)
    else if (sel === 'cn_6' || sel.includes('abducens')) {
      targets.add('Abducens nerve (VI).l');
      targets.add('Abducens nerve (VI).r');
    }
    // CN VII (Facial)
    else if (sel === 'cn_7' || sel.includes('facial') || isFacialNerveLab) {
      targets.add('Facial nerve (VII).l');
      targets.add('Facial nerve (VII).r');
      targets.add('Chorda tympani.l');
      targets.add('Chorda tympani.r');
    }
    // CN VIII (Vestibulocochlear)
    else if (sel === 'cn_8' || sel.includes('vestibulocochlear')) {
      [
        'Vestibulocochlear nerve (VIII).l', 'Vestibulocochlear nerve (VIII).r',
        'Cochlear nerve.l', 'Cochlear nerve',
        'Vestibular nerve.l', 'Vestibular nerve.r'
      ].forEach(n => targets.add(n));
    }
    // CN IX (Glossopharyngeal)
    else if (sel === 'cn_9' || sel.includes('glossopharyngeal')) {
      targets.add('Glossopharyngeal nerve (IX).l');
      targets.add('Glossopharyngeal nerve (IX).r');
    }
    // CN X (Vagus)
    else if (sel === 'cn_10' || sel.includes('vagus')) {
      targets.add('Vagus nerve (X).l');
      targets.add('Vagus nerve (X).r');
    }
    // CN XI (Accessory)
    else if (sel === 'cn_11' || sel.includes('accessory')) {
      targets.add('Accessory nerve (XI).l');
      targets.add('Accessory nerve (XI).r');
    }
    // CN XII (Hypoglossal)
    else if (sel === 'cn_12' || sel.includes('hypoglossal')) {
      targets.add('Hypoglossal nerve (XII).l');
      targets.add('Hypoglossal nerve (XII).r');
    }
    // Foramen selections -> illuminate passing nerves
    else if (sel === 'foramen_ovale') {
      ['Mandibular nerve.j', 'Mandibular nerve.g', 'Posterior division of mandibular nerve.r', 'Posterior division of mandibular nerve.l'].forEach(n => targets.add(n));
    } else if (sel === 'foramen_rotundum') {
      ['Maxillary nerve.r', 'Maxillary nerve.l'].forEach(n => targets.add(n));
    } else if (sel === 'superior_orbital_fissure') {
      ['Ophthalmic nerve.r', 'Ophthalmic nerve.l', 'Trochlear nerve (IV).r', 'Trochlear nerve (IV).l', 'Abducens nerve (VI).r', 'Abducens nerve (VI).l', 'Oculomotor nerve (III).r', 'Oculomotor nerve (III).l'].forEach(n => targets.add(n));
    } else if (sel === 'optic_canal') {
      ['Optic nerve (II).l', 'Optic nerve (II).r', 'Optic chiasm'].forEach(n => targets.add(n));
    } else if (sel === 'internal_acoustic_meatus') {
      ['Facial nerve (VII).l', 'Facial nerve (VII).r', 'Vestibulocochlear nerve (VIII).l', 'Vestibulocochlear nerve (VIII).r'].forEach(n => targets.add(n));
    } else if (sel === 'jugular_foramen') {
      ['Glossopharyngeal nerve (IX).l', 'Glossopharyngeal nerve (IX).r', 'Vagus nerve (X).l', 'Vagus nerve (X).r', 'Accessory nerve (XI).l', 'Accessory nerve (XI).r'].forEach(n => targets.add(n));
    } else if (sel === 'hypoglossal_canal') {
      ['Hypoglossal nerve (XII).l', 'Hypoglossal nerve (XII).r'].forEach(n => targets.add(n));
    } else if (sel === 'stylomastoid_foramen') {
      ['Facial nerve (VII).l', 'Facial nerve (VII).r'].forEach(n => targets.add(n));
    } else if (sel === 'mandibular_foramen' || sel === 'mental_foramen') {
      ['Inferior alveolar nerve.l', 'Inferior alveolar nerve.r', 'Mental nerve.l', 'Mental nerve.r'].forEach(n => targets.add(n));
    }

    // Tooth innervation
    if (selectedTooth || highlightedToothRelations.innervation) {
      if (!selectedTooth || selectedTooth.arch === 'mandibular') {
        targets.add('Inferior alveolar nerve.r');
        targets.add('Inferior alveolar nerve.l');
        targets.add('Lingual nerve.r');
        targets.add('Lingual nerve.l');
        targets.add('Mandibular nerve.j');
      } else {
        targets.add('Maxillary nerve.r');
        targets.add('Maxillary nerve.l');
      }
    }

    return targets;
  }, [selectedAnatomyId, selectedTooth, isV2DentalView, isFacialNerveLab, highlightedToothRelations]);

  // Cloned cranial nerve scene with anatomical materials
  const clonedScene = useMemo(() => {
    const scene = nervesGltf.scene.clone(true);

    scene.traverse((child: any) => {
      if (!child.isMesh) return;

      const name = child.name || '';
      const lower = name.toLowerCase();

      // Filter: Keep ONLY cranial nerves, cranial ganglia, and cranial nuclei
      // Hide all spinal nerves, sciatic, femoral, intercostal, etc.
      const isSpinalOrBody =
        lower.includes('femoral') ||
        lower.includes('sciatic') ||
        lower.includes('tibial') ||
        lower.includes('fibular') ||
        lower.includes('saphenous') ||
        lower.includes('pudendal') ||
        lower.includes('obturator') ||
        lower.includes('gluteal') ||
        lower.includes('plantar') ||
        lower.includes('intercostal') ||
        lower.includes('lumbar') ||
        lower.includes('sacral') ||
        lower.includes('brachial') ||
        lower.includes('median') ||
        lower.includes('ulnar') ||
        lower.includes('radial') ||
        lower.includes('axillary') ||
        lower.includes('musculocutaneous') ||
        lower.includes('thoracic');

      if (isSpinalOrBody) {
        child.visible = false;
        return;
      }

      // Lateralization filter
      if (lateralizationSide === 'right' && (name.endsWith('.l') || name.includes('.001'))) {
        child.visible = false;
        return;
      }
      if (lateralizationSide === 'left' && (name.endsWith('.r') || (!name.includes('.001') && name.includes('.l')))) {
        child.visible = false;
        return;
      }

      child.visible = true;

      // Styling & highlight
      const isTargeted = targetNodeNames.has(name) || (selectedAnatomyId && lower.includes(selectedAnatomyId.replace('nerve_', '').replace('cn_', '')));
      const hasAnySelection = Boolean(selectedAnatomyId || selectedTooth || targetNodeNames.size > 0);

      let color = '#fbbf24'; // Natural neural amber
      let emissive = '#d97706';
      let emissiveIntensity = 0.15;
      let opacity = hasAnySelection ? 0.28 : 0.90;

      if (isTargeted) {
        color = '#fef08a'; // Radiant incandescent gold
        emissive = '#facc15';
        emissiveIntensity = 1.4;
        opacity = 1.0;
      } else if (isNeuralXRay) {
        color = '#fef08a';
        emissive = '#fde047';
        emissiveIntensity = 0.6;
        opacity = 0.95;
      }

      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(emissive),
        emissiveIntensity,
        roughness: 0.35,
        metalness: 0.05,
        transparent: opacity < 0.98,
        opacity,
        depthWrite: opacity > 0.60
      });

      child.castShadow = true;
    });

    return scene;
  }, [nervesGltf, targetNodeNames, lateralizationSide, selectedAnatomyId, selectedTooth, isNeuralXRay]);

  return (
    <group
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        const meshName = (e.object as THREE.Mesh).name || '';
        const lower = meshName.toLowerCase();
        if (lower.includes('trigeminal') || lower.includes('mandibular')) onSelect('cn_5_v3');
        else if (lower.includes('maxillary')) onSelect('cn_5_v2');
        else if (lower.includes('ophthalmic')) onSelect('cn_5_v1');
        else if (lower.includes('facial')) onSelect('cn_7');
        else if (lower.includes('optic')) onSelect('cn_2');
        else if (lower.includes('olfactory')) onSelect('cn_1');
        else if (lower.includes('abducens')) onSelect('cn_6');
        else if (lower.includes('vestibulocochlear')) onSelect('cn_8');
        else if (lower.includes('hypoglossal')) onSelect('cn_12');
        else if (lower.includes('vagus')) onSelect('cn_10');
        else if (lower.includes('glossopharyngeal')) onSelect('cn_9');
        else if (lower.includes('alveolar')) onSelect('nerve_ian');
        else if (lower.includes('lingual')) onSelect('nerve_lingual');
        else if (lower.includes('mental')) onSelect('nerve_mental');
        else onSelect('cn_5');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={clonedScene} />
    </group>
  );
};

// ============================================================================
// 2. REAL CRANIAL SKELETON & BRAINSTEM (Z-Anatomy Verified Meshes)
// Fully articulated at (0, 0, 0). Zero procedural skull geometry.
// ============================================================================
const RealSkullAndBrainstemSystem: React.FC<{
  boneOpacity: number;
  isNeuralXRay: boolean;
  selectedAnatomyId: string | null;
  selectedToothFdi?: number | null;
  onSelectStructure: (id: string, side?: 'right' | 'left') => void;
}> = ({ boneOpacity, isNeuralXRay, selectedAnatomyId, selectedToothFdi, onSelectStructure }) => {
  const skullGltf = useGLTF('/models/craniofacial/skull/skull_complete.glb', '/draco/');
  const brainGltf = useGLTF('/models/craniofacial/brain/brain_complete.glb', '/draco/');

  // Cleaned skull scene: keep only cranial & facial bones, mandible, and teeth
  const cleanedSkull = useMemo(() => {
    const scene = skullGltf.scene.clone(true);

    const effectiveOpacity = isNeuralXRay
      ? 0.12
      : selectedAnatomyId
      ? Math.min(boneOpacity, 0.32)
      : boneOpacity;

    scene.traverse((child: any) => {
      if (!child.isMesh) return;

      const name = child.name || '';
      const lower = name.toLowerCase();

      // Hide all non-head bones: vertebrae, ribs, sternum, pelvis, clavicle, scapula, limbs
      const isExtracranialBody =
        lower.includes('vertebra') ||
        lower.includes('rib') ||
        lower.includes('costal') ||
        lower.includes('sternum') ||
        lower.includes('pelvis') ||
        lower.includes('sacrum') ||
        lower.includes('ilium') ||
        lower.includes('ischium') ||
        lower.includes('pubis') ||
        lower.includes('femur') ||
        lower.includes('tibia') ||
        lower.includes('fibula') ||
        lower.includes('patella') ||
        lower.includes('scapula') ||
        lower.includes('clavicle') ||
        lower.includes('humerus') ||
        lower.includes('radius') ||
        lower.includes('ulna') ||
        lower.includes('tarsal') ||
        lower.includes('carpal') ||
        lower.includes('phalanx') ||
        lower.includes('metacarpal') ||
        lower.includes('metatarsal');

      if (isExtracranialBody) {
        child.visible = false;
        return;
      }

      child.visible = true;

      // Authentic 32 Tooth Mesh resolution via ToothPositionResolver
      const toothFdi = ToothPositionResolver.getFdiFromMeshNodeName(child.name);
      if (toothFdi) {
        child.userData.toothFdi = toothFdi;
        const isSelectedTooth = selectedToothFdi === toothFdi;
        const isAnyToothSelected = !!(
          selectedAnatomyId &&
          (selectedAnatomyId.startsWith('tooth.') || selectedAnatomyId.startsWith('tooth_'))
        );

        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(isSelectedTooth ? '#f59e0b' : '#fafafa'),
          emissive: new THREE.Color(isSelectedTooth ? '#d97706' : '#000000'),
          emissiveIntensity: isSelectedTooth ? 0.95 : 0.0,
          roughness: isSelectedTooth ? 0.20 : 0.32,
          metalness: isSelectedTooth ? 0.08 : 0.02,
          transparent: isAnyToothSelected && !isSelectedTooth ? true : effectiveOpacity < 0.98,
          opacity: isSelectedTooth ? 1.0 : isAnyToothSelected ? 0.65 : Math.max(effectiveOpacity, 0.85),
          depthWrite: true
        });
        return;
      }

      // Bone translucent PBR material
      const isMandible = lower.includes('mandib');
      const isMaxilla = lower.includes('maxill');
      if (isMandible) child.userData.structureId = 'bone_mandible';
      if (isMaxilla) child.userData.structureId = 'bone_maxilla';

      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f8fafc'),
        roughness: 0.55,
        metalness: 0.02,
        transparent: effectiveOpacity < 0.98,
        opacity: effectiveOpacity,
        depthWrite: effectiveOpacity > 0.65
      });
    });

    return scene;
  }, [skullGltf, boneOpacity, isNeuralXRay, selectedAnatomyId, selectedToothFdi]);

  // Cleaned brainstem scene: keep Pons, Midbrain, Medulla
  const cleanedBrainstem = useMemo(() => {
    const scene = brainGltf.scene.clone(true);

    scene.traverse((child: any) => {
      if (!child.isMesh) return;

      const name = child.name || '';
      const lower = name.toLowerCase();

      // Keep only brainstem structures: pons, midbrain, medulla, pyramid
      const isBrainstem =
        lower.includes('pons') ||
        lower.includes('midbrain') ||
        lower.includes('medulla') ||
        lower.includes('pyramid') ||
        lower.includes('olivary');

      if (!isBrainstem) {
        child.visible = false;
        return;
      }

      child.visible = true;
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fed7aa'), // Warm brainstem tint
        roughness: 0.60,
        metalness: 0.02,
        transparent: true,
        opacity: 0.85,
        depthWrite: true
      });
    });

    return scene;
  }, [brainGltf]);

  return (
    <group
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        const mesh = e.object as THREE.Mesh;
        const toothFdi = mesh.userData?.toothFdi || ToothPositionResolver.getFdiFromMeshNodeName(mesh.name);
        if (toothFdi) {
          const side = (toothFdi >= 11 && toothFdi <= 18) || (toothFdi >= 41 && toothFdi <= 48) ? 'right' : 'left';
          onSelectStructure(`tooth.${toothFdi}`, side);
          return;
        }
        if (mesh.userData?.structureId) {
          onSelectStructure(mesh.userData.structureId);
        }
      }}
      onPointerOver={(e) => {
        const mesh = e.object as THREE.Mesh;
        const toothFdi = mesh.userData?.toothFdi || ToothPositionResolver.getFdiFromMeshNodeName(mesh.name);
        if (toothFdi) {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={cleanedSkull} />
      <primitive object={cleanedBrainstem} />
    </group>
  );
};

// ============================================================================
// 3. MASTER 3D CRANIAL & DENTAL STAGE
// ============================================================================
export const DentalNeuro3DStage: React.FC = () => {
  const controlsRef = useRef<any>(null);

  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectedToothFdi = useDentalNeuroStore((s) => s.selectedToothFdi);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const lateralizationSide = useDentalNeuroStore((s) => s.lateralizationSide);
  const selectedSide = useDentalNeuroStore((s) => s.selectedSide);
  const activeNerveTraceId = useDentalNeuroStore((s) => s.activeNerveTraceId);
  const boneOpacity = useDentalNeuroStore((s) => s.boneOpacity);
  const isNeuralXRay = useDentalNeuroStore((s) => s.isNeuralXRay);
  const isV2DentalView = useDentalNeuroStore((s) => s.isV2DentalView);
  const isFacialNerveLab = useDentalNeuroStore((s) => s.isFacialNerveLab);
  const highlightedToothRelations = useDentalNeuroStore((s) => s.highlightedToothRelations);
  const quizMode = useDentalNeuroStore((s) => s.quizMode);
  const submitQuizAnswer = useDentalNeuroStore((s) => s.submitQuizAnswer);
  const isDebugOpen = useDentalNeuroStore((s) => s.isDebugOpen);
  const toggleDebug = useDentalNeuroStore((s) => s.toggleDebug);

  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  const selectedTooth = useMemo(() => {
    if (!selectedAnatomyId || !selectedAnatomyId.startsWith('tooth_')) return null;
    const fdi = parseInt(selectedAnatomyId.replace('tooth_', ''), 10);
    return DENTAL_INNERVATION_DATABASE.find((t) => t.fdi === fdi) || null;
  }, [selectedAnatomyId]);

  const selectedToothSide = useMemo<'right' | 'left' | null>(() => {
    if (!selectedTooth) return null;
    return selectedTooth.quadrant === 1 || selectedTooth.quadrant === 4 ? 'right' : 'left';
  }, [selectedTooth]);

  const handlePointerMissed = () => {
    if (!quizMode) {
      selectAnatomy(null);
    }
  };

  const handleStructureClick = (id: string, side?: 'right' | 'left') => {
    if (quizMode) {
      submitQuizAnswer(id);
    } else {
      selectAnatomy(id, side);
    }
  };

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden transition-colors duration-200 ${
        isDark
          ? 'bg-radial from-slate-900 via-[#0a0e17] to-[#05070c]'
          : 'bg-radial from-[#faf6f0] via-[#f3ede4] to-[#e8dfd2]'
      }`}
    >
      {/* Floating Cranial Fossa & Bone Opacity Toolbar */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[95vw] overflow-x-auto scrollbar-none">
        <CranialFossaToolbar />
      </div>

      {/* Asset Inspector Toggle Button */}
      <button
        onClick={toggleDebug}
        className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold hover:bg-slate-800 transition shadow-xl backdrop-blur-md flex items-center gap-1.5"
      >
        <span>🔍 ASSET INSPECTOR</span>
      </button>

      {/* Anatomy Asset Inspector Modal */}
      <AnatomyAssetInspector isOpen={isDebugOpen} onClose={toggleDebug} />

      <Canvas
        camera={{ position: [0.0451, 0.78, 0.32], fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          localClippingEnabled: true
        }}
        onPointerMissed={handlePointerMissed}
      >
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={isDark ? 0.95 : 1.2} />
        <directionalLight position={[1.5, 2.5, 2.0]} intensity={1.5} castShadow />
        <directionalLight
          position={[-2.0, 1.2, -1.0]}
          intensity={0.75}
          color={isDark ? '#38bdf8' : '#cbd5e1'}
        />
        <pointLight position={[0.0451, 0.78, 0.15]} intensity={1.2} distance={0.8} />

        {/* UNIFIED CRANIOFACIAL STAGE (All real meshes at shared [0, 0, 0] origin) */}
        <group name="CraniofacialMasterRoot">
          {/* A. Real Skull & Brainstem */}
          <React.Suspense fallback={null}>
            <RealSkullAndBrainstemSystem
              boneOpacity={boneOpacity}
              isNeuralXRay={isNeuralXRay}
              selectedAnatomyId={selectedAnatomyId}
              selectedToothFdi={selectedToothFdi}
              onSelectStructure={handleStructureClick}
            />
          </React.Suspense>

          {/* B. Real 12 Cranial Nerves System (Z-Anatomy) */}
          <React.Suspense fallback={null}>
            <RealCranialNervesSystem
              selectedAnatomyId={selectedAnatomyId}
              selectedSide={selectedSide}
              lateralizationSide={lateralizationSide}
              activeNerveTraceId={activeNerveTraceId}
              selectedTooth={selectedTooth}
              selectedToothSide={selectedToothSide}
              isNeuralXRay={isNeuralXRay}
              isV2DentalView={isV2DentalView}
              isFacialNerveLab={isFacialNerveLab}
              highlightedToothRelations={highlightedToothRelations}
              onSelect={handleStructureClick}
            />
          </React.Suspense>
        </group>

        {/* Dynamic Camera Glide & OrbitControls centered on dental arch */}
        <DentalCameraController controlsRef={controlsRef} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.85}
          minDistance={0.04}
          maxDistance={0.85}
          target={[0.0451, 0.760, 0.050]}
        />
      </Canvas>
    </div>
  );
};
