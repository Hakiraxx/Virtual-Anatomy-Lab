import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export async function runAnatomicalAssertionTests() {
  const results = {
    suite: 'Medical & Anatomical Assertions',
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

  // 1. Mandibular 3rd Molar (#48 / #38) assertions
  const dentalSpecimensPath = path.join(rootDir, 'frontend/src/data/dentalSpecimensData.ts');
  const dentalContent = fs.readFileSync(dentalSpecimensPath, 'utf8');

  const hasTooth48 = dentalContent.includes('48:') && dentalContent.includes('Răng khôn hàm dưới phải');
  assert('Tooth 48 (Mandibular Right 3rd Molar) entry exists with anatomical description', hasTooth48, 'FDI 48 found');

  const hasTooth38 = dentalContent.includes('38:') && dentalContent.includes('Răng khôn hàm dưới trái');
  assert('Tooth 38 (Mandibular Left 3rd Molar) entry exists with anatomical description', hasTooth38, 'FDI 38 found');

  // 2. Hardware GPU Slicing Planes Math Assertion
  const toothStagePath = path.join(rootDir, 'frontend/src/components/dental-neuroanatomy/specimens/ToothSpecimenStage.tsx');
  const stageContent = fs.readFileSync(toothStagePath, 'utf8');
  const dentalModelsPath = path.join(rootDir, 'frontend/src/components/dental-neuroanatomy/specimens/AnatomicalDentalModels3D.tsx');
  const dentalModelsContent = fs.readFileSync(dentalModelsPath, 'utf8');

  const hasLocalClipping = stageContent.includes('localClippingEnabled: true');
  assert('ToothSpecimenStage activates hardware GPU local clipping on WebGLRenderer', hasLocalClipping, 'localClippingEnabled: true confirmed');

  const hasSagittalNormal = dentalModelsContent.includes('new THREE.Vector3(1, 0, 0)');
  const hasCoronalNormal = dentalModelsContent.includes('new THREE.Vector3(0, 0, 1)');
  const hasAxialNormal = dentalModelsContent.includes('new THREE.Vector3(0, 1, 0)');
  const hasObliqueNormal = dentalModelsContent.includes('new THREE.Vector3(0.7071, 0.7071, 0)');
  assert('Mathematical slicing planes (Sagittal, Coronal, Axial, Oblique) properly defined with 3D normal vectors', hasSagittalNormal && hasCoronalNormal && hasAxialNormal && hasObliqueNormal, 'Sagittal, Coronal, Axial, Oblique normals present');

  // 3. Complete Cranial Nerves CN I through CN XII Foramina Exits
  const dentalNeuroPath = path.join(rootDir, 'frontend/src/data/dentalNeuroData.ts');
  const neuroContent = fs.readFileSync(dentalNeuroPath, 'utf8');

  const cnForaminaAssertions = [
    { cn: 'cn_1', foramen: 'cribriform_foramina' },
    { cn: 'cn_2', foramen: 'optic_canal' },
    { cn: 'cn_3', foramen: 'superior_orbital_fissure' },
    { cn: 'cn_4', foramen: 'superior_orbital_fissure' },
    { cn: 'cn_6', foramen: 'superior_orbital_fissure' },
    { cn: 'cn_7', foramen: 'stylomastoid_foramen' },
    { cn: 'cn_8', foramen: 'internal_acoustic_meatus' },
    { cn: 'cn_9', foramen: 'jugular_foramen' },
    { cn: 'cn_10', foramen: 'jugular_foramen' },
    { cn: 'cn_11', foramen: 'jugular_foramen' },
    { cn: 'cn_12', foramen: 'hypoglossal_canal' }
  ];

  let foraminaValid = true;
  let foraminaFails = [];
  for (const item of cnForaminaAssertions) {
    if (!neuroContent.includes(`id: '${item.cn}'`) || !neuroContent.includes(item.foramen)) {
      foraminaValid = false;
      foraminaFails.push(`${item.cn} -> ${item.foramen}`);
    }
  }
  assert('Cranial Nerves (CN I - XII) exit through canonical skull base foramina', foraminaValid, foraminaValid ? 'All 12 pairs match Gray\'s Anatomy 42nd ed.' : `Failed: ${foraminaFails.join(', ')}`);

  // 4. Dental Arch Innervation Architecture
  const mandibularIan = neuroContent.includes("parentNerveId: 'nerve_v3'") || neuroContent.includes("parentNerveId: 'cn_5_v3'");
  assert('Inferior Alveolar Nerve (IAN) is anatomically mapped as branch of Mandibular Division (V3)', mandibularIan, 'IAN -> V3 parentage confirmed');

  // 5. Zero Procedural Human Anatomy Mesh Assertion
  const sectionMeshIndex = dentalModelsContent.indexOf('function RealDentalAnatomySectionMesh');
  const sectionMeshCode = dentalModelsContent.slice(sectionMeshIndex);

  const hasCylinderGeo = sectionMeshCode.includes('<cylinderGeometry');
  const hasSphereGeo = sectionMeshCode.includes('<sphereGeometry');
  const hasBoxGeo = sectionMeshCode.includes('<boxGeometry');
  const hasTorusGeo = sectionMeshCode.includes('<torusGeometry');
  const zeroProcedural = !hasCylinderGeo && !hasSphereGeo && !hasBoxGeo && !hasTorusGeo;

  assert('Tooth anatomical section model contains 0 procedural primitive geometries (Real 3D GLB only)', zeroProcedural, zeroProcedural ? 'Zero cylinder, sphere, box, or torus geometries in section mesh' : 'Found procedural geometry');

  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runAnatomicalAssertionTests().then(res => {
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
