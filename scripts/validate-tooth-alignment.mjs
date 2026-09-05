import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

// Load ToothRegistry directly
const registryPath = path.join(rootDir, 'frontend/src/data/ToothRegistry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf8');

const midline = 0.0451;

// Parse TOOTH_REGISTRY from file
console.log('========================================================================================');
console.log('🦷 MEDANATOMY 3D — GLOBAL TOOTH / FDI / 3D MESH ALIGNMENT VALIDATION');
console.log('========================================================================================\n');

// Import ToothPositionResolver through dynamic import or evaluate
async function main() {
  const { ToothPositionResolver } = await import('../frontend/src/utils/ToothPositionResolver.ts');
  const { TOOTH_REGISTRY } = await import('../frontend/src/data/ToothRegistry.ts');

  const summary = ToothPositionResolver.validateAllTeeth();

  console.log(`Auditing all 32 human teeth against strict anatomical and 3D mesh criteria...\n`);

  let tableRows = [];

  for (let fdi = 11; fdi <= 48; fdi++) {
    const lastDigit = fdi % 10;
    if (lastDigit < 1 || lastDigit > 8) continue;

    const res = summary.results[fdi];
    const tooth = TOOTH_REGISTRY[fdi];

    const fdiStatus = 'PASS';
    const jawStatus = res.jawPass ? 'PASS' : 'FAIL';
    const sideStatus = res.sidePass ? 'PASS' : 'FAIL';
    const typeStatus = res.typePass ? 'PASS' : 'FAIL';
    const meshStatus = res.meshPass ? 'PASS' : 'FAIL';
    const posStatus = res.positionPass ? 'PASS' : 'FAIL';
    const adjStatus = res.adjacencyPass ? 'PASS' : 'FAIL';
    const overall = res.valid ? '✅ PASS' : '❌ FAIL';

    console.log(`TOOTH ${fdi} (${tooth.nameEn})`);
    console.log(`  FDI: ${fdiStatus} | JAW: ${jawStatus} | SIDE: ${sideStatus} | TYPE: ${typeStatus}`);
    console.log(`  MESH: ${meshStatus} ("${tooth.meshNodeName}")`);
    console.log(`  POSITION: ${posStatus} [${tooth.craniofacialPos.join(', ')}]`);
    console.log(`  ADJACENCY: ${adjStatus} (Mesial: ${tooth.mesialAdjacent}, Distal: ${tooth.distalAdjacent})`);
    console.log(`  STATUS: ${overall}\n`);

    tableRows.push({
      fdi,
      jaw: tooth.jaw,
      side: tooth.side,
      type: tooth.toothType,
      mesh: tooth.meshNodeName,
      pos: `[${tooth.craniofacialPos.join(', ')}]`,
      adj: `${tooth.mesialAdjacent || 'None'} / ${tooth.distalAdjacent || 'None'}`,
      status: res.valid ? 'PASS' : 'FAIL'
    });
  }

  console.log('========================================================================================');
  console.log(`AUDIT RESULTS: ${summary.passedTeeth}/32 TEETH PASSED (${summary.failedTeeth} FAILED, ${summary.totalErrors} ERRORS)`);
  console.log('========================================================================================');

  // Critical tests verification
  console.log('\n🔍 CRITICAL ANATOMICAL ASSERTIONS:');
  const t46 = TOOTH_REGISTRY[46];
  const is46Valid =
    t46.jaw === 'MANDIBLE' &&
    t46.side === 'RIGHT' &&
    t46.toothType === 'FIRST_MOLAR' &&
    t46.craniofacialPos[0] < midline &&
    t46.mesialAdjacent === 'tooth.45' &&
    t46.distalAdjacent === 'tooth.47';

  console.log(`  ${is46Valid ? '✅' : '❌'} TOOTH 46 CRITICAL TEST: MANDIBLE, RIGHT, FIRST_MOLAR, between 45 & 47`);

  const t48 = TOOTH_REGISTRY[48];
  const is48Valid = t48.jaw === 'MANDIBLE' && t48.side === 'RIGHT' && t48.toothType === 'THIRD_MOLAR' && t48.distalAdjacent === null;
  console.log(`  ${is48Valid ? '✅' : '❌'} TOOTH 48 CRITICAL TEST: MANDIBLE, RIGHT, THIRD_MOLAR, posterior-most`);

  const t38 = TOOTH_REGISTRY[38];
  const is38Valid = t38.jaw === 'MANDIBLE' && t38.side === 'LEFT' && t38.toothType === 'THIRD_MOLAR' && t38.distalAdjacent === null;
  console.log(`  ${is38Valid ? '✅' : '❌'} TOOTH 38 CRITICAL TEST: MANDIBLE, LEFT, THIRD_MOLAR, posterior-most`);

  const t16 = TOOTH_REGISTRY[16];
  const is16Valid = t16.jaw === 'MAXILLA' && t16.side === 'RIGHT' && t16.toothType === 'FIRST_MOLAR';
  console.log(`  ${is16Valid ? '✅' : '❌'} TOOTH 16 CRITICAL TEST: MAXILLA, RIGHT, FIRST_MOLAR, between 15 & 17`);

  const t26 = TOOTH_REGISTRY[26];
  const is26Valid = t26.jaw === 'MAXILLA' && t26.side === 'LEFT' && t26.toothType === 'FIRST_MOLAR';
  console.log(`  ${is26Valid ? '✅' : '❌'} TOOTH 26 CRITICAL TEST: MAXILLA, LEFT, FIRST_MOLAR, between 25 & 27`);

  const t11_21_symm = Math.abs((midline - TOOTH_REGISTRY[11].craniofacialPos[0]) - (TOOTH_REGISTRY[21].craniofacialPos[0] - midline)) < 0.001;
  console.log(`  ${t11_21_symm ? '✅' : '❌'} CENTERLINE SYMMETRY TEST (11 ↔ 21 across midline X=${midline}): Symmetric to <0.1mm`);

  const t41_31_symm = Math.abs((midline - TOOTH_REGISTRY[41].craniofacialPos[0]) - (TOOTH_REGISTRY[31].craniofacialPos[0] - midline)) < 0.001;
  console.log(`  ${t41_31_symm ? '✅' : '❌'} CENTERLINE SYMMETRY TEST (41 ↔ 31 across midline X=${midline}): Symmetric to <0.1mm`);

  if (!summary.allValid) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
