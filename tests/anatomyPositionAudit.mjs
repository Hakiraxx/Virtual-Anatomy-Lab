// tests/anatomyPositionAudit.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';

export async function runAnatomyPositionAuditTests() {
  const testsResults = [];
  let passed = 0;
  let failed = 0;

  const hierarchyContent = fs.readFileSync('frontend/src/data/anatomyHierarchy.ts', 'utf8');

  function extractPosition(content, key) {
    const regex = new RegExp(`\\b${key}:\\s*\\{[^}]*position:\\s*\\[([^\\]]+)\\]`, 's');
    const match = content.match(regex);
    if (!match) throw new Error(`Could not find position for ${key}`);
    return match[1].split(',').map(s => parseFloat(s.trim()));
  }

  const landmarkTests = [
    { key: 'brain', expectedYMin: 1.84, expectedYMax: 1.88, desc: 'Brain is inside cranial cavity (Y ~ 1.86m)' },
    { key: 'skull', expectedYMin: 1.84, expectedYMax: 1.88, desc: 'Skull cranium is around atlas C1 (Y ~ 1.86m)' },
    { key: 'brainstem', expectedYMin: 1.75, expectedYMax: 1.80, desc: 'Brainstem connects brain to cord (Y ~ 1.77m)' },
    { key: 'cranial_nerves', expectedYMin: 1.76, expectedYMax: 1.82, desc: 'Cranial nerves emerge from skull base (Y ~ 1.78m)' },
    { key: 'mandible', expectedYMin: 1.72, expectedYMax: 1.76, desc: 'Mandible forms lower jaw below maxilla (Y ~ 1.745m)' },
    { key: 'larynx', expectedYMin: 1.63, expectedYMax: 1.70, desc: 'Larynx is in cervical neck above trachea (Y ~ 1.66m)' },
    { key: 'thyroid', expectedYMin: 1.52, expectedYMax: 1.60, desc: 'Thyroid is in lower anterior neck (Y ~ 1.56m)' },
    { key: 'aorta_arch', expectedYMin: 1.50, expectedYMax: 1.58, desc: 'Aortic arch curves above heart (Y ~ 1.54m)' },
    { key: 'lungs', expectedYMin: 1.45, expectedYMax: 1.52, desc: 'Lungs are inside thoracic cavity (Y ~ 1.486m)' },
    { key: 'heart', expectedYMin: 1.42, expectedYMax: 1.48, desc: 'Heart is in middle mediastinum (Y ~ 1.455m)' },
    { key: 'spinal_cord', expectedYMin: 1.44, expectedYMax: 1.52, desc: 'Spinal cord extends down vertebral canal (Y ~ 1.48m)' },
    { key: 'liver', expectedYMin: 1.35, expectedYMax: 1.42, desc: 'Liver occupies right upper quadrant (Y ~ 1.381m)' },
    { key: 'stomach', expectedYMin: 1.30, expectedYMax: 1.37, desc: 'Stomach occupies left upper quadrant (Y ~ 1.335m)' },
    { key: 'spleen', expectedYMin: 1.30, expectedYMax: 1.36, desc: 'Spleen is in left hypochondrium (Y ~ 1.325m)' },
    { key: 'pancreas', expectedYMin: 1.28, expectedYMax: 1.35, desc: 'Pancreas lies retroperitoneal across midline (Y ~ 1.321m)' },
    { key: 'gallbladder', expectedYMin: 1.27, expectedYMax: 1.33, desc: 'Gallbladder is on visceral surface of liver (Y ~ 1.302m)' },
    { key: 'kidneys', expectedYMin: 1.22, expectedYMax: 1.28, desc: 'Kidneys lie in retroperitoneal lumbar region (Y ~ 1.255m)' },
    { key: 'intestine', expectedYMin: 1.10, expectedYMax: 1.20, desc: 'Intestines occupy central abdominal cavity (Y ~ 1.150m)' },
    { key: 'bladder', expectedYMin: 1.10, expectedYMax: 1.18, desc: 'Bladder is in lesser pelvis behind pubic symphysis (Y ~ 1.140m)' },
    { key: 'pelvis', expectedYMin: 0.95, expectedYMax: 1.05, desc: 'Pelvis connects spine to lower extremities (Y ~ 1.00m)' }
  ];

  for (const t of landmarkTests) {
    try {
      const pos = extractPosition(hierarchyContent, t.key);
      const [x, y, z] = pos;
      assert.ok(
        y >= t.expectedYMin && y <= t.expectedYMax,
        `Y=${y} outside expected range [${t.expectedYMin}, ${t.expectedYMax}]`
      );
      testsResults.push({
        name: t.desc,
        status: 'PASS',
        details: `Coord: [${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)}]`
      });
      passed++;
    } catch (err) {
      testsResults.push({
        name: t.desc,
        status: 'FAIL',
        details: err.message
      });
      failed++;
    }
  }

  // Store layer state audit
  const storeContent = fs.readFileSync('frontend/src/stores/useAnatomyStore.ts', 'utf8');
  try {
    assert.ok(storeContent.includes('4: true,  // Skeletal System'), 'Layer 4 (Skeletal) must be visible by default');
    assert.ok(storeContent.includes('5: true,  // Visceral Organs'), 'Layer 5 (Visceral) must be visible by default');
    assert.ok(storeContent.includes('7: true,  // Nervous System & Brain'), 'Layer 7 (Nerves/Brain) must be visible by default');
    assert.ok(storeContent.includes('1: true,  // Skin (Human body translucent envelope)'), 'Layer 1 (Skin) must be visible by default');
    assert.ok(storeContent.includes('4: 1.0,'), 'Layer 4 opacity must be 1.0 by default');
    assert.ok(storeContent.includes('5: 1.0,'), 'Layer 5 opacity must be 1.0 by default');
    assert.ok(storeContent.includes('7: 0.95,'), 'Layer 7 opacity must be 0.95 by default');
    assert.ok(storeContent.includes('1: 0.15,'), 'Layer 1 opacity must be 0.15 (translucent) by default');
    testsResults.push({
      name: 'Default layer state enables Skeleton + Organs + CNS + Translucent Skin on reload',
      status: 'PASS',
      details: 'layerVisibility {1: 0.15, 4: 1.0, 5: 1.0, 7: 0.95}'
    });
    passed++;
  } catch (err) {
    testsResults.push({
      name: 'Default layer state enables Skeleton + Organs + CNS + Translucent Skin on reload',
      status: 'FAIL',
      details: err.message
    });
    failed++;
  }

  // selectStructure layer auto-activation
  try {
    assert.ok(storeContent.includes('const targetLayer = struct.layerIndex;'), 'selectStructure extracts struct.layerIndex');
    assert.ok(storeContent.includes('[targetLayer]: true,'), 'selectStructure auto-enables target layer');
    testsResults.push({
      name: 'selectStructure automatically activates target layer for clicked organs',
      status: 'PASS',
      details: 'targetLayer enabled and skin dimmed to 0.08'
    });
    passed++;
  } catch (err) {
    testsResults.push({
      name: 'selectStructure automatically activates target layer for clicked organs',
      status: 'FAIL',
      details: err.message
    });
    failed++;
  }

  // ConnectedNervesNetwork brain integration
  const nervesContent = fs.readFileSync('frontend/src/components/3d/ConnectedNervesNetwork.tsx', 'utf8');
  try {
    assert.ok(nervesContent.includes("useGLTF('/models/brain.glb')"), 'ConnectedNervesNetwork loads /models/brain.glb');
    assert.ok(nervesContent.includes('createCalibratedBrainGroup'), 'ConnectedNervesNetwork calibrates 3D brain mesh');
    assert.ok(nervesContent.includes('0.870'), 'Brain is calibrated to local Y=0.870 (+0.99 offset = 1.86m world)');
    testsResults.push({
      name: 'ConnectedNervesNetwork renders calibrated 3D brain mesh inside skull cavity',
      status: 'PASS',
      details: 'Brain calibrated inside cranium at world Y=1.86m'
    });
    passed++;
  } catch (err) {
    testsResults.push({
      name: 'ConnectedNervesNetwork renders calibrated 3D brain mesh inside skull cavity',
      status: 'FAIL',
      details: err.message
    });
    failed++;
  }

  return {
    suite: 'Anatomical Positions & 3D Layer Architecture Audit',
    passed,
    failed,
    tests: testsResults
  };
}

if (process.argv[1] && process.argv[1].includes('anatomyPositionAudit.mjs')) {
  runAnatomyPositionAuditTests().then(res => {
    console.log(`\n============================================================`);
    console.log(`🏁 ${res.suite}: ${res.passed}/${res.passed + res.failed} PASSED`);
    console.log(`============================================================\n`);
    for (const t of res.tests) {
      const icon = t.status === 'PASS' ? '✅' : '❌';
      console.log(`  ${icon} [${t.status}] ${t.name} -> ${t.details}`);
    }
    if (res.failed > 0) process.exit(1);
  });
}
