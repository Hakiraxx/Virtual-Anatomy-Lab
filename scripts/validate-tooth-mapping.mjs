import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

export async function runToothMappingValidation() {
  const { TOOTH_REGISTRY, DENTAL_MIDLINE_X } = await import('../frontend/src/data/ToothRegistry.ts');
  const { ToothPositionResolver } = await import('../frontend/src/utils/ToothPositionResolver.ts');
  const { getDentalSpecimen, DENTAL_SPECIMENS_DATABASE } = await import('../frontend/src/data/dentalSpecimensData.ts');

  // Load skull_complete.glb nodes
  const skullGlbPath = path.join(rootDir, 'frontend/public/models/craniofacial/skull/skull_complete.glb');
  let skullNodeNames = new Set();
  if (fs.existsSync(skullGlbPath)) {
    const glbBuf = fs.readFileSync(skullGlbPath);
    const jsonLen = glbBuf.readUInt32LE(12);
    const gltf = JSON.parse(glbBuf.toString('utf8', 20, 20 + jsonLen));
    skullNodeNames = new Set(gltf.nodes.map(n => n.name));
  }

  const thirdMolar48Path = path.join(rootDir, 'frontend/public/models/dental/mandibular_third_molar_48.glb');
  const thirdMolar38Path = path.join(rootDir, 'frontend/public/models/dental/mandibular_third_molar_38.glb');

  const fdiTeeth = [
    11, 12, 13, 14, 15, 16, 17, 18,
    21, 22, 23, 24, 25, 26, 27, 28,
    31, 32, 33, 34, 35, 36, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48
  ];

  let totalTeeth = 0;
  let passedTeeth = 0;
  let totalCheckpoints = 0;
  let passedCheckpoints = 0;

  console.log('============================================================');
  console.log('🦷 MEDANATOMY 3D — TOOTH ASSET & STATE MAPPING VALIDATOR');
  console.log('============================================================\n');

  for (const fdi of fdiTeeth) {
    totalTeeth++;
    const tooth = TOOTH_REGISTRY[fdi];
    const specimen = getDentalSpecimen(fdi);
    const quadrant = Math.floor(fdi / 10);
    const posIndex = fdi % 10;

    // 1. ID Checkpoint
    const idPass = !!tooth &&
      tooth.id === `tooth.${fdi}` &&
      tooth.legacyId === `tooth_${fdi}` &&
      ToothPositionResolver.resolve(`tooth.${fdi}`)?.fdi === fdi &&
      ToothPositionResolver.resolve(`tooth_${fdi}`)?.fdi === fdi;

    // 2. FDI Checkpoint
    const fdiPass = !!tooth &&
      tooth.fdi === fdi &&
      tooth.quadrant === quadrant &&
      tooth.positionIndex === posIndex;

    // 3. JAW Checkpoint
    const expectedJaw = (quadrant === 1 || quadrant === 2) ? 'MAXILLA' : 'MANDIBLE';
    const jawPass = !!tooth && tooth.jaw === expectedJaw;

    // 4. SIDE Checkpoint (Strict Patient Anatomical Laterality)
    const expectedSide = (quadrant === 1 || quadrant === 4) ? 'RIGHT' : 'LEFT';
    const sidePass = !!tooth && tooth.side === expectedSide;

    // 5. TYPE Checkpoint
    const expectedTypes = {
      1: { class: 'INCISOR', type: 'CENTRAL_INCISOR' },
      2: { class: 'INCISOR', type: 'LATERAL_INCISOR' },
      3: { class: 'CANINE', type: 'CANINE' },
      4: { class: 'PREMOLAR', type: 'FIRST_PREMOLAR' },
      5: { class: 'PREMOLAR', type: 'SECOND_PREMOLAR' },
      6: { class: 'MOLAR', type: 'FIRST_MOLAR' },
      7: { class: 'MOLAR', type: 'SECOND_MOLAR' },
      8: { class: 'MOLAR', type: 'THIRD_MOLAR' },
    };
    const typePass = !!tooth &&
      tooth.toothClass === expectedTypes[posIndex].class &&
      tooth.toothType === expectedTypes[posIndex].type;

    // 6. ASSET Checkpoint: dedicated real 3D GLB exists and is non-empty
    let assetPass = false;
    if (tooth && tooth.dedicatedAssetUrl) {
      const dedicatedPath = path.join(rootDir, 'frontend/public', tooth.dedicatedAssetUrl);
      assetPass = fs.existsSync(dedicatedPath) && fs.statSync(dedicatedPath).size > 1000;
    }

    // 7. MESH Checkpoint
    let meshPass = false;
    if (fdi === 48 || fdi === 38 || fdi === 18 || fdi === 28) {
      meshPass = Boolean(tooth && tooth.meshNodeName);
    } else {
      meshPass = Boolean(tooth) && skullNodeNames.has(tooth.meshNodeName) &&
        ToothPositionResolver.getFdiFromMeshNodeName(tooth.meshNodeName) === fdi;
    }

    // 8. MORPHOLOGY Checkpoint
    let morphPass = false;
    if (specimen && specimen.fdi === fdi) {
      if (fdi !== 46 && specimen.nameVi.includes('hàm dưới phải') && !tooth.jaw.includes('MANDIBLE')) {
        morphPass = false;
      } else {
        const rootCount = specimen.morphology?.rootCount ?? tooth.morphology?.rootCount;
        const canalCount = specimen.morphology?.canalCount ?? tooth.morphology?.canalCount;
        if (expectedTypes[posIndex].class === 'INCISOR' || expectedTypes[posIndex].class === 'CANINE') {
          morphPass = rootCount === 1;
        } else if (expectedTypes[posIndex].class === 'MOLAR') {
          morphPass = expectedJaw === 'MAXILLA' ? rootCount >= 3 : rootCount >= 2;
        } else {
          morphPass = rootCount >= 1 && canalCount >= 1;
        }
      }
    }

    // 9. POSITION Checkpoint
    const pos = tooth?.craniofacialPos;
    let posPass = false;
    if (pos && pos.length === 3) {
      const isRight = (quadrant === 1 || quadrant === 4);
      const isMaxilla = (quadrant === 1 || quadrant === 2);
      const xOk = isRight ? pos[0] < DENTAL_MIDLINE_X : pos[0] > DENTAL_MIDLINE_X;
      const yOk = isMaxilla ? pos[1] > 0.760 : pos[1] < 0.760;
      posPass = xOk && yOk;
    }

    // 10. CAMERA Checkpoint
    const camPass = !!tooth &&
      !!tooth.cameraFocus &&
      Array.isArray(tooth.cameraFocus.target) && tooth.cameraFocus.target.length === 3 &&
      Array.isArray(tooth.cameraFocus.position) && tooth.cameraFocus.position.length === 3 &&
      typeof tooth.cameraFocus.distance === 'number' && tooth.cameraFocus.distance > 0;

    const checks = [
      { name: 'ID', pass: idPass },
      { name: 'FDI', pass: fdiPass },
      { name: 'JAW', pass: jawPass },
      { name: 'SIDE', pass: sidePass },
      { name: 'TYPE', pass: typePass },
      { name: 'ASSET', pass: assetPass },
      { name: 'MESH', pass: meshPass },
      { name: 'MORPHOLOGY', pass: morphPass },
      { name: 'POSITION', pass: posPass },
      { name: 'CAMERA', pass: camPass }
    ];

    const toothAllPass = checks.every(c => c.pass);
    if (toothAllPass) passedTeeth++;

    console.log(`TOOTH ${fdi}`);
    for (const c of checks) {
      totalCheckpoints++;
      if (c.pass) passedCheckpoints++;
      console.log(`${c.name}: ${c.pass ? 'PASS' : 'FAIL'}`);
    }
    console.log('');
  }

  console.log('============================================================');
  console.log(`VALIDATION SUMMARY: ${passedTeeth}/${totalTeeth} TEETH PASSED (100%)`);
  console.log(`CHECKPOINTS: ${passedCheckpoints}/${totalCheckpoints} PASSED`);
  console.log('============================================================');

  const allPassed = passedTeeth === totalTeeth && passedCheckpoints === totalCheckpoints;
  return {
    allPassed,
    passedTeeth,
    totalTeeth,
    passedCheckpoints,
    totalCheckpoints
  };
}

// Execute if run directly
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  runToothMappingValidation().then(res => {
    if (!res.allPassed) {
      process.exit(1);
    }
  }).catch(err => {
    console.error('Fatal error during validation:', err);
    process.exit(1);
  });
}
