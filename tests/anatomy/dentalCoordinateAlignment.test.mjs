import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export async function runDentalCoordinateAlignmentTests() {
  const results = {
    suite: 'Dental & Neurovascular 3D Coordinate Alignment Audit',
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

  // Dynamically import ToothRegistry and CoordinateAlignmentValidator
  const { TOOTH_REGISTRY, DENTAL_MIDLINE_X } = await import(
    '../../frontend/src/data/ToothRegistry.ts'
  );
  const { CoordinateAlignmentValidator } = await import(
    '../../frontend/src/anatomy/dental/CoordinateAlignmentValidator.ts'
  );

  const coords = CoordinateAlignmentValidator.CANONICAL_COORDINATES;

  // 1. Full Alignment Validator Suite
  const validationReport = CoordinateAlignmentValidator.validateAll();
  for (const item of validationReport.items) {
    assert(
      `Validator: ${item.name}`,
      item.passed,
      `Expected: ${item.expected} | Actual: ${item.actual}`
    );
  }
  assert(
    'CoordinateAlignmentValidator overallPassed is TRUE',
    validationReport.overallPassed,
    'All anatomical invariants passed'
  );

  // 2. Metric Scale Consistency (Mandible Width ~ 11.8cm)
  const mandWidth = coords.mandible.boxMax[0] - coords.mandible.boxMin[0];
  assert(
    'Mandible dimensions strictly in metric units (meters)',
    mandWidth >= 0.10 && mandWidth <= 0.14,
    `Mandible width = ${mandWidth.toFixed(4)}m (~${(mandWidth * 100).toFixed(1)}cm)`
  );

  // 3. Sagittal Midline Consistency
  assert(
    'Sagittal midline X equals 0.0451m (Z-Anatomy Master Space)',
    coords.midlineX === 0.0451 && DENTAL_MIDLINE_X === 0.0451,
    `Midline X: ${coords.midlineX}m`
  );

  // 4. Bilateral Symmetry (R48 vs R38)
  const distR48 = Math.abs(coords.midlineX - coords.tooth48.socketPos[0]);
  const distR38 = Math.abs(coords.tooth38.socketPos[0] - coords.midlineX);
  const symmetryDelta = Math.abs(distR48 - distR38);
  assert(
    'R48 and R38 bilateral sagittal symmetry within < 0.5mm',
    symmetryDelta < 0.0005,
    `Delta = ${(symmetryDelta * 1000).toFixed(3)}mm (R48 dist: ${distR48.toFixed(4)}m, R38 dist: ${distR38.toFixed(4)}m)`
  );

  // 5. Bilateral Symmetry (IAN.r vs IAN.l)
  const distIanR = Math.abs(coords.midlineX - coords.ianRight.center[0]);
  const distIanL = Math.abs(coords.ianLeft.center[0] - coords.midlineX);
  const ianSymmetryDelta = Math.abs(distIanR - distIanL);
  assert(
    'IAN bilateral sagittal symmetry within < 0.5mm',
    ianSymmetryDelta < 0.0005,
    `Delta = ${(ianSymmetryDelta * 1000).toFixed(3)}mm`
  );

  // 6. ToothRegistry Sync
  const t48 = TOOTH_REGISTRY[48];
  const t38 = TOOTH_REGISTRY[38];
  assert(
    'ToothRegistry FDI 48 craniofacialPos synchronized with canonical socket',
    t48 &&
      Math.abs(t48.craniofacialPos[0] - coords.tooth48.socketPos[0]) < 0.0001 &&
      Math.abs(t48.craniofacialPos[1] - coords.tooth48.socketPos[1]) < 0.0001 &&
      Math.abs(t48.craniofacialPos[2] - coords.tooth48.socketPos[2]) < 0.0001,
    `Registry: [${t48?.craniofacialPos.join(', ')}]`
  );
  assert(
    'ToothRegistry FDI 38 craniofacialPos synchronized with canonical socket',
    t38 &&
      Math.abs(t38.craniofacialPos[0] - coords.tooth38.socketPos[0]) < 0.0001 &&
      Math.abs(t38.craniofacialPos[1] - coords.tooth38.socketPos[1]) < 0.0001 &&
      Math.abs(t38.craniofacialPos[2] - coords.tooth38.socketPos[2]) < 0.0001,
    `Registry: [${t38?.craniofacialPos.join(', ')}]`
  );

  // 7. Foramen Spix Positioning
  assert(
    'Mandibular Foramen (Gai Spix) is posterior to third molar',
    coords.mandibularForamenRight.center[2] < coords.tooth48.socketPos[2],
    `Spix Z: ${coords.mandibularForamenRight.center[2]}m < Molar Z: ${coords.tooth48.socketPos[2]}m`
  );

  // 8. Camera Preset Generation Tests
  const targetR48 = coords.tooth48.socketPos;
  const occlusalPreset = CoordinateAlignmentValidator.calculateViewPreset(targetR48, 'occlusal', true);
  assert(
    'Camera Occlusal preset is superior to molar',
    occlusalPreset.position[1] > targetR48[1] + 0.04,
    `Y delta: ${(occlusalPreset.position[1] - targetR48[1]).toFixed(3)}m`
  );

  const buccalPreset = CoordinateAlignmentValidator.calculateViewPreset(targetR48, 'buccal', true);
  assert(
    'Camera Buccal preset is lateral (negative X for patient right)',
    buccalPreset.position[0] < targetR48[0],
    `X delta: ${(buccalPreset.position[0] - targetR48[0]).toFixed(3)}m`
  );

  const lingualPreset = CoordinateAlignmentValidator.calculateViewPreset(targetR48, 'lingual', true);
  assert(
    'Camera Lingual preset is medial (positive X toward midline)',
    lingualPreset.position[0] > targetR48[0],
    `X delta: ${(lingualPreset.position[0] - targetR48[0]).toFixed(3)}m`
  );

  return results;
}
