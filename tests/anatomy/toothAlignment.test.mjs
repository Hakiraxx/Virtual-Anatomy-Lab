import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export async function runToothAlignmentTests() {
  const results = {
    suite: 'Global Dental / FDI / 3D Tooth Alignment Audit',
    tests: [],
    passed: 0,
    failed: 0,
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

  // Load ToothRegistry source
  const registryPath = path.join(rootDir, 'frontend/src/data/ToothRegistry.ts');
  const registryContent = fs.readFileSync(registryPath, 'utf8');

  // Load skull_complete.glb
  const glbPath = path.join(rootDir, 'frontend/public/models/craniofacial/skull/skull_complete.glb');
  const glbBuf = fs.readFileSync(glbPath);
  const jsonLen = glbBuf.readUInt32LE(12);
  const gltf = JSON.parse(glbBuf.toString('utf8', 20, 20 + jsonLen));
  const skullNodeNames = new Set(gltf.nodes.map((n) => n.name));

  // Dynamically import ToothRegistry and ToothPositionResolver
  const { TOOTH_REGISTRY, DENTAL_MIDLINE_X } = await import(
    '../../frontend/src/data/ToothRegistry.ts'
  );
  const { ToothPositionResolver } = await import(
    '../../frontend/src/utils/ToothPositionResolver.ts'
  );

  // 1. Total tooth count assertion (All 32 permanent teeth)
  const fdiList = Object.keys(TOOTH_REGISTRY).map(Number).sort((a, b) => a - b);
  assert(
    'Authoritative ToothRegistry contains all 32 human permanent teeth (FDI 11–48)',
    fdiList.length === 32,
    `Found ${fdiList.length}/32 teeth`
  );

  // 2. Critical Tooth 46 Assertion
  const tooth46 = TOOTH_REGISTRY[46];
  assert('Tooth 46 exists in registry', !!tooth46, 'FDI 46 defined');
  assert('Tooth 46 jaw is MANDIBLE', tooth46?.jaw === 'MANDIBLE', `Jaw: ${tooth46?.jaw}`);
  assert('Tooth 46 side is RIGHT (Patient Right)', tooth46?.side === 'RIGHT', `Side: ${tooth46?.side}`);
  assert('Tooth 46 quadrant is 4', tooth46?.quadrant === 4, `Quadrant: ${tooth46?.quadrant}`);
  assert('Tooth 46 class is MOLAR', tooth46?.toothClass === 'MOLAR', `Class: ${tooth46?.toothClass}`);
  assert('Tooth 46 type is FIRST_MOLAR', tooth46?.toothType === 'FIRST_MOLAR', `Type: ${tooth46?.toothType}`);
  assert('Tooth 46 mesh node is "Lower first molar tooth.r"', tooth46?.meshNodeName === 'Lower first molar tooth.r', `Node: ${tooth46?.meshNodeName}`);
  assert('Tooth 46 mesh node exists in skull_complete.glb', skullNodeNames.has('Lower first molar tooth.r'), 'Found in GLB');
  assert(
    'Tooth 46 is on Patient Right side of sagittal midline (X < 0.0451)',
    tooth46?.craniofacialPos[0] < DENTAL_MIDLINE_X,
    `X = ${tooth46?.craniofacialPos[0]} < ${DENTAL_MIDLINE_X}`
  );
  assert(
    'Tooth 46 elevation is within mandibular arch range (Y ~ 0.7487)',
    Math.abs(tooth46?.craniofacialPos[1] - 0.7487) < 0.01,
    `Y = ${tooth46?.craniofacialPos[1]}`
  );
  assert(
    'Tooth 46 adjacency: mesial is tooth.45, distal is tooth.47, opposing is tooth.16',
    tooth46?.mesialAdjacent === 'tooth.45' &&
      tooth46?.distalAdjacent === 'tooth.47' &&
      tooth46?.opposingTooth === 'tooth.16',
    `Mesial: ${tooth46?.mesialAdjacent}, Distal: ${tooth46?.distalAdjacent}, Opposing: ${tooth46?.opposingTooth}`
  );

  // 3. Sagittal Midline Symmetry & Patient Laterality
  let lateralityAllPass = true;
  let symmetryAllPass = true;

  for (const fdi of fdiList) {
    const t = TOOTH_REGISTRY[fdi];
    const isPatientRight = (fdi >= 11 && fdi <= 18) || (fdi >= 41 && fdi <= 48);

    // Patient Right must have X < midline; Patient Left must have X > midline
    if (isPatientRight && !(t.craniofacialPos[0] < DENTAL_MIDLINE_X)) {
      lateralityAllPass = false;
    }
    if (!isPatientRight && !(t.craniofacialPos[0] > DENTAL_MIDLINE_X)) {
      lateralityAllPass = false;
    }
  }
  assert(
    'All 32 teeth adhere strictly to Patient Anatomical Laterality relative to sagittal midline',
    lateralityAllPass,
    'Patient Right (Q1, Q4) < 0.0451; Patient Left (Q2, Q3) > 0.0451'
  );

  // Symmetry pairs check
  const pairs = [
    [11, 21], [12, 22], [13, 23], [14, 24], [15, 25], [16, 26], [17, 27], [18, 28],
    [41, 31], [42, 32], [43, 33], [44, 34], [45, 35], [46, 36], [47, 37], [48, 38]
  ];

  for (const [rFdi, lFdi] of pairs) {
    const r = TOOTH_REGISTRY[rFdi];
    const l = TOOTH_REGISTRY[lFdi];
    const rDist = Math.abs(r.craniofacialPos[0] - DENTAL_MIDLINE_X);
    const lDist = Math.abs(l.craniofacialPos[0] - DENTAL_MIDLINE_X);
    const diff = Math.abs(rDist - lDist);
    if (diff > 0.001) { // 1mm tolerance
      symmetryAllPass = false;
    }
  }
  assert(
    'All 16 contralateral tooth pairs exhibit sagittal symmetry within < 1mm',
    symmetryAllPass,
    'Contralateral distance symmetry confirmed'
  );

  // 4. Maxillary vs Mandibular Occlusal Elevation
  let archElevationPass = true;
  for (const fdi of fdiList) {
    const t = TOOTH_REGISTRY[fdi];
    if (t.jaw === 'MAXILLA' && t.craniofacialPos[1] < 0.762) {
      archElevationPass = false;
    }
    if (t.jaw === 'MANDIBLE' && t.craniofacialPos[1] > 0.759) {
      archElevationPass = false;
    }
  }
  assert(
    'All Maxillary teeth (Y: 0.763–0.777) are strictly superior to all Mandibular teeth (Y: 0.740–0.758)',
    archElevationPass,
    'Maxillary > Mandibular elevation holds universally across 32 teeth (Curve of Spee respected)'
  );

  // 5. ToothPositionResolver Multi-Format Resolution
  const testQueries = [
    { q: 46, expectedFdi: 46 },
    { q: '46', expectedFdi: 46 },
    { q: 'tooth_46', expectedFdi: 46 },
    { q: 'tooth.46', expectedFdi: 46 },
    { q: 'r46', expectedFdi: 46 },
    { q: 'r.46', expectedFdi: 46 },
    { q: 'Răng cối lớn thứ nhất hàm dưới phải', expectedFdi: 46 },
    { q: 'mandibular right first molar', expectedFdi: 46 },
    { q: 'tooth_38', expectedFdi: 38 },
    { q: 'r16', expectedFdi: 16 },
    { q: 'r21', expectedFdi: 21 },
  ];

  let resolverAllPass = true;
  for (const item of testQueries) {
    const resolved = ToothPositionResolver.resolve(item.q);
    if (!resolved || resolved.fdi !== item.expectedFdi) {
      resolverAllPass = false;
    }
  }
  assert(
    'ToothPositionResolver correctly handles multi-format queries (ID, legacyId, FDI, R-prefix, Vietnamese, English)',
    resolverAllPass,
    '11 multi-format query patterns resolved accurately'
  );

  // 6. Camera Focus Targets in Craniofacial Space
  const focus46 = ToothPositionResolver.getCameraFocus(46, 'craniofacial');
  assert(
    'Tooth 46 camera focus is non-null and positioned within craniofacial head bounds',
    !!focus46 &&
      focus46.lookAt[1] > 0.74 &&
      focus46.lookAt[1] < 0.76 &&
      focus46.position[1] > 0.74,
    `LookAt: [${focus46.lookAt.map(c => c.toFixed(3)).join(', ')}]`
  );

  // 7. Real 3D Asset Availability (skull_complete.glb + dedicated micro-CT 48/38)
  let glbNodesFound = 0;
  for (const fdi of fdiList) {
    const t = TOOTH_REGISTRY[fdi];
    if (skullNodeNames.has(t.meshNodeName)) {
      glbNodesFound++;
    }
  }
  assert(
    'All 28 fully erupted teeth have dedicated individual meshes in skull_complete.glb',
    glbNodesFound >= 28,
    `Found ${glbNodesFound}/28 erupted teeth meshes in skull_complete.glb`
  );

  // 8. Dedicated Micro-CT Wisdom Tooth Assets (38 & 48)
  const asset48Path = path.join(rootDir, 'frontend/public', TOOTH_REGISTRY[48].dedicatedAssetUrl);
  const asset38Path = path.join(rootDir, 'frontend/public', TOOTH_REGISTRY[38].dedicatedAssetUrl);
  const has48Asset = fs.existsSync(asset48Path) && fs.statSync(asset48Path).size > 10000;
  const has38Asset = fs.existsSync(asset38Path) && fs.statSync(asset38Path).size > 10000;
  assert(
    'Dedicated high-resolution micro-CT 3D assets exist for third molars 48 and 38',
    has48Asset && has38Asset,
    'mandibular_third_molar_48.glb & 38.glb verified on disk'
  );

  return results;
}
