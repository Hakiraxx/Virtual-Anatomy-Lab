import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const modelsDir = path.join(rootDir, 'frontend/public/models');

function validateGlbFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { valid: false, error: 'File does not exist' };
  }
  const stat = fs.statSync(filePath);
  if (stat.size < 1024) {
    return { valid: false, error: `File too small (${stat.size} bytes)` };
  }

  // Read first 20 bytes (Header: magic 4B, version 4B, length 4B, chunk0Length 4B, chunk0Type 4B)
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(20);
  fs.readSync(fd, buffer, 0, 20, 0);
  fs.closeSync(fd);

  const magic = buffer.toString('utf8', 0, 4);
  if (magic !== 'glTF') {
    return { valid: false, error: `Invalid magic header: ${magic}` };
  }

  const version = buffer.readUInt32LE(4);
  if (version !== 2) {
    return { valid: false, error: `Unsupported glTF version: ${version}` };
  }

  const length = buffer.readUInt32LE(8);
  const chunk0Type = buffer.toString('utf8', 16, 20);
  if (chunk0Type !== 'JSON') {
    return { valid: false, error: `Chunk 0 type is not JSON: ${chunk0Type}` };
  }

  return { valid: true, sizeBytes: stat.size, version, totalLength: length };
}

export async function runAssetAuditTests() {
  const results = {
    suite: '3D Anatomical Assets Audit',
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

  // 1. Dental Specimen Real 3D Assets
  const dentalAssets = [
    'dental/mandibular_third_molar_48.glb',
    'dental/mandibular_third_molar_38.glb',
    'skull.glb'
  ];

  for (const asset of dentalAssets) {
    const fullPath = path.join(modelsDir, asset);
    const val = validateGlbFile(fullPath);
    assert(`Dental asset ${asset} is valid GLB binary`, val.valid, val.valid ? `Size: ${(val.sizeBytes / 1024).toFixed(1)} KB, glTF v${val.version}` : val.error);
  }

  // 2. Visceral Organs Real 3D Assets
  const visceraAssets = [
    'heart.glb',
    'lungs.glb',
    'liver.glb',
    'stomach.glb',
    'kidneys.glb',
    'brain.glb',
    'eyeball.glb',
    'pancreas.glb',
    'spleen.glb',
    'intestine.glb'
  ];

  for (const asset of visceraAssets) {
    const fullPath = path.join(modelsDir, asset);
    const val = validateGlbFile(fullPath);
    assert(`Visceral asset ${asset} is valid GLB binary`, val.valid, val.valid ? `Size: ${(val.sizeBytes / 1024).toFixed(1)} KB` : val.error);
  }

  // 3. Vascular Trees & Complete Anatomical Systems Real 3D Assets
  const vascularAssets = [
    'anatomy/vessels_complete.glb',
    'anatomy/organs_complete.glb',
    'anatomy/nervous_complete.glb',
    'anatomy/skeleton_complete.glb',
    'aortic-arch.glb',
    'coronary-arteries.glb',
    'circle-of-willis.glb',
    'portal-vein.glb',
    'leg-veins.glb'
  ];

  for (const asset of vascularAssets) {
    const fullPath = path.join(modelsDir, asset);
    const val = validateGlbFile(fullPath);
    assert(`Vascular/System asset ${asset} is valid GLB binary`, val.valid, val.valid ? `Size: ${(val.sizeBytes / 1024).toFixed(1)} KB` : val.error);
  }

  // 4. Craniofacial Real 3D Assets
  const craniofacialAssets = [
    'craniofacial/cranial-nerves/cranial_nerves_complete.glb',
    'craniofacial/skull/skull_complete.glb',
    'craniofacial/tmj/tmj_complex.glb',
    'craniofacial/muscles/masticatory_muscles.glb',
    'craniofacial/vessels/craniofacial_vessels.glb',
    'craniofacial/brain/brain_complete.glb'
  ];

  for (const asset of craniofacialAssets) {
    const fullPath = path.join(modelsDir, asset);
    const val = validateGlbFile(fullPath);
    assert(`Craniofacial asset ${asset} is valid GLB binary`, val.valid, val.valid ? `Size: ${(val.sizeBytes / 1024).toFixed(1)} KB` : val.error);
  }

  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runAssetAuditTests().then(res => {
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
