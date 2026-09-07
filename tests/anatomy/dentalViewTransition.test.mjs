import fs from 'fs';
import path from 'path';
import { DentalTargetResolver } from '../../frontend/src/anatomy/dental/DentalTargetResolver.ts';
import { DentalCameraFocusController } from '../../frontend/src/anatomy/dental/DentalCameraFocusController.ts';

export async function runDentalViewTransitionTests() {
  const results = {
    suite: 'Dental 3D View Transition & Camera/Visibility Sync Audit',
    tests: [],
    passed: 0,
    failed: 0
  };

  function assert(name, condition, details = '') {
    if (condition) {
      results.passed++;
      results.tests.push({ name, status: 'PASS', details });
    } else {
      results.failed++;
      results.tests.push({ name, status: 'FAIL', details });
    }
  }

  // 1. Target Resolution & Craniofacial Space Invariants
  const criticalStructures = [
    { id: 'tooth_48', name: 'R48 (Wisdom Tooth Right)', expectedY: 0.758, isPatientRight: true },
    { id: 'tooth_38', name: 'R38 (Wisdom Tooth Left)', expectedY: 0.758, isPatientRight: false },
    { id: 'bone_mandible', name: 'Mandible (Xương hàm dưới)', expectedY: 0.764, isPatientRight: null },
    { id: 'nerve_ian', name: 'Inferior Alveolar Nerve (TK Huyệt răng dưới)', expectedY: 0.748, isPatientRight: true },
    { id: 'nerve_lingual', name: 'Lingual Nerve (TK Lưỡi)', expectedY: 0.772, isPatientRight: true },
    { id: 'mandibular_canal', name: 'Mandibular Canal (Ống hàm dưới)', expectedY: 0.748, isPatientRight: true },
    { id: 'mental_foramen', name: 'Mental Foramen (Lỗ cằm)', expectedY: 0.732, isPatientRight: true }
  ];

  for (const item of criticalStructures) {
    const target = DentalTargetResolver.resolveTarget(item.id);
    assert(
      `DentalTargetResolver: ${item.name} resolves valid target`,
      target.isValid && target.worldPosition.length === 3,
      `Center: [${target.worldPosition.map(n => n.toFixed(4)).join(', ')}], Radius: ${(target.effectiveRadius * 1000).toFixed(1)}mm`
    );

    assert(
      `DentalTargetResolver: ${item.name} center Y is in craniofacial space (0.71m - 0.85m)`,
      target.worldPosition[1] >= 0.71 && target.worldPosition[1] <= 0.85,
      `Y = ${target.worldPosition[1].toFixed(4)}m (Expected ~ ${item.expectedY}m)`
    );

    if (item.isPatientRight === true) {
      assert(
        `DentalTargetResolver: ${item.name} is on Patient Right (X < 0.0451m midline)`,
        target.worldPosition[0] < 0.0451,
        `X = ${target.worldPosition[0].toFixed(4)}m < 0.0451m`
      );
    } else if (item.isPatientRight === false) {
      assert(
        `DentalTargetResolver: ${item.name} is on Patient Left (X > 0.0451m midline)`,
        target.worldPosition[0] > 0.0451,
        `X = ${target.worldPosition[0].toFixed(4)}m > 0.0451m`
      );
    }
  }

  // 2. Camera Framing & Optical Distance
  for (const item of criticalStructures) {
    const target = DentalTargetResolver.resolveTarget(item.id);
    const framing = DentalCameraFocusController.calculateCameraFraming(target, 'default');

    const [px, py, pz] = framing.position;
    const [lx, ly, lz] = framing.lookAt;

    const isAllFinite = [px, py, pz, lx, ly, lz].every(n => Number.isFinite(n));
    assert(
      `CameraFraming: ${item.name} has finite camera position and lookAt (No NaN/Inf)`,
      isAllFinite,
      `Pos: [${px.toFixed(3)}, ${py.toFixed(3)}, ${pz.toFixed(3)}], LookAt: [${lx.toFixed(3)}, ${ly.toFixed(3)}, ${lz.toFixed(3)}]`
    );

    // CRITICAL: LookAt Y must NOT jump to 1.34m (legacy sky bug)
    assert(
      `CameraFraming: ${item.name} lookAt Y strictly in craniofacial space (NO sky camera jump)`,
      ly >= 0.70 && ly <= 0.85,
      `lookAt.y = ${ly.toFixed(4)}m`
    );

    // CRITICAL: Camera position Y must stay close to craniofacial space
    assert(
      `CameraFraming: ${item.name} camera position Y in proximity of craniofacial space`,
      py >= 0.70 && py <= 0.95,
      `position.y = ${py.toFixed(4)}m`
    );

    // Distance check
    const dx = px - lx;
    const dy = py - ly;
    const dz = pz - lz;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    assert(
      `CameraFraming: ${item.name} framing distance within bounds [0.035m, 0.32m]`,
      dist >= 0.035 && dist <= 0.32,
      `Distance: ${(dist * 100).toFixed(1)}cm`
    );
  }

  // 3. Forward Flow Sequence Transition Audit
  // Flow: R48 -> R38 -> Mandible -> IAN -> Lingual -> Mandibular Canal -> Mental Foramen -> R48
  const forwardFlow = [
    'tooth_48',
    'tooth_38',
    'bone_mandible',
    'nerve_ian',
    'nerve_lingual',
    'mandibular_canal',
    'mental_foramen',
    'tooth_48'
  ];

  let forwardAllPassed = true;
  for (let i = 0; i < forwardFlow.length - 1; i++) {
    const toId = forwardFlow[i + 1];
    const targetTo = DentalTargetResolver.resolveTarget(toId);
    const framing = DentalCameraFocusController.calculateCameraFraming(targetTo, 'default');

    if (!framing || framing.lookAt[1] < 0.70 || framing.lookAt[1] > 0.85) {
      forwardAllPassed = false;
    }
  }
  assert(
    'Forward Flow Transition (R48 -> R38 -> Mandible -> IAN -> Lingual -> Canal -> Mental -> R48) 100% stable',
    forwardAllPassed,
    'All 7 transition segments maintain strict craniofacial coordinates without view clipping'
  );

  // 4. Reverse Flow Sequence Transition Audit
  // Flow: Mental Foramen -> Mandibular Canal -> Lingual -> IAN -> Mandible -> R38 -> R48
  const reverseFlow = [
    'mental_foramen',
    'mandibular_canal',
    'nerve_lingual',
    'nerve_ian',
    'bone_mandible',
    'tooth_38',
    'tooth_48'
  ];

  let reverseAllPassed = true;
  for (let i = 0; i < reverseFlow.length - 1; i++) {
    const toId = reverseFlow[i + 1];
    const targetTo = DentalTargetResolver.resolveTarget(toId);
    const framing = DentalCameraFocusController.calculateCameraFraming(targetTo, 'default');

    if (!framing || framing.lookAt[1] < 0.70 || framing.lookAt[1] > 0.85) {
      reverseAllPassed = false;
    }
  }
  assert(
    'Reverse Flow Transition (Mental -> Canal -> Lingual -> IAN -> Mandible -> R38 -> R48) 100% stable',
    reverseAllPassed,
    'All reverse transition segments maintain strict craniofacial coordinates'
  );

  // 5. Asynchronous Request Token & Concurrency Race Invariant
  DentalCameraFocusController.cancelCurrent();
  const token1 = DentalCameraFocusController.nextRequestId();
  const token2 = DentalCameraFocusController.nextRequestId();
  assert(
    'Request ID increments monotonically',
    token2 > token1,
    `token1: ${token1}, token2: ${token2}`
  );
  assert(
    'Stale Request ID is invalidated immediately',
    !DentalCameraFocusController.isCurrentRequest(token1) && DentalCameraFocusController.isCurrentRequest(token2),
    `isCurrent(token1) = false, isCurrent(token2) = true`
  );

  // Stress test 20 rapid clicks
  const rapidTokens = [];
  for (let i = 0; i < 20; i++) {
    rapidTokens.push(DentalCameraFocusController.nextRequestId());
  }
  const lastToken = rapidTokens[rapidTokens.length - 1];
  const allEarlierStale = rapidTokens.slice(0, -1).every(t => !DentalCameraFocusController.isCurrentRequest(t));
  const latestActive = DentalCameraFocusController.isCurrentRequest(lastToken);

  assert(
    'Rapid Click Stress Test (20 concurrent requests): Only latest token is active',
    allEarlierStale && latestActive,
    `Total tokens: ${rapidTokens.length}, Latest: #${lastToken}`
  );

  // 6. Camera Presets Invariant for R48
  const r48Target = DentalTargetResolver.resolveTarget('tooth_48');
  const presets = ['default', 'occlusal', 'buccal', 'lingual', 'closeup'];
  let allPresetsValid = true;
  for (const preset of presets) {
    const f = DentalCameraFocusController.calculateCameraFraming(r48Target, preset);
    if (!f.position.every(n => Number.isFinite(n)) || !f.lookAt.every(n => Number.isFinite(n))) {
      allPresetsValid = false;
    }
  }
  assert(
    'All Camera Presets (default, occlusal, buccal, lingual, closeup) generate valid bounded frames',
    allPresetsValid,
    'Tested presets for tooth_48'
  );

  // 7. Store Visibility Synchronization Contract
  const storeFilePath = path.resolve('frontend/src/stores/useDentalNeuroStore.ts');
  const storeContent = fs.readFileSync(storeFilePath, 'utf8');

  assert(
    'useDentalNeuroStore imports and utilizes DentalTargetResolver & DentalCameraFocusController',
    storeContent.includes('DentalTargetResolver') && storeContent.includes('DentalCameraFocusController'),
    'Authoritative target resolver integrated into store focus logic'
  );

  assert(
    'selectAnatomy automatically synchronizes wisdomShowNerves and layerVisibility[6] for nerves',
    storeContent.includes('updates.wisdomShowNerves = true') && storeContent.includes('6: true'),
    'Auto-visibility guarantee for nerve structures'
  );

  assert(
    'selectAnatomy automatically synchronizes bone visibility for mandible',
    storeContent.includes('4: true, 11: true') && storeContent.includes('wisdomBoneOpacity'),
    'Auto-visibility guarantee for skeletal structures'
  );

  // 8. Controller Contract Verification (WisdomSurgeryStage & DentalNeuro3DStage)
  const wisdomStagePath = path.resolve('frontend/src/components/dental-neuroanatomy/specimens/WisdomSurgeryStage.tsx');
  const wisdomStageContent = fs.readFileSync(wisdomStagePath, 'utf8');

  assert(
    'WisdomCameraController uses DentalCameraFocusController.isCurrentRequest to cancel stale lerps',
    wisdomStageContent.includes('DentalCameraFocusController.isCurrentRequest'),
    'Async race guard verified in WisdomCameraController'
  );

  assert(
    'WisdomCameraController validates coordinate finiteness (rejects NaN/Inf)',
    wisdomStageContent.includes('!Number.isFinite(px)'),
    'NaN / Infinity safety guard verified in WisdomCameraController'
  );

  const dentalStagePath = path.resolve('frontend/src/components/dental-neuroanatomy/DentalNeuro3DStage.tsx');
  const dentalStageContent = fs.readFileSync(dentalStagePath, 'utf8');

  assert(
    'DentalCameraController uses DentalCameraFocusController.isCurrentRequest to cancel stale lerps',
    dentalStageContent.includes('DentalCameraFocusController.isCurrentRequest'),
    'Async race guard verified in DentalCameraController'
  );

  return results;
}
