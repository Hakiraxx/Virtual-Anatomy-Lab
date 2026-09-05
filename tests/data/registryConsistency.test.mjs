import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export async function runRegistryConsistencyTests() {
  const results = {
    suite: 'Registry & Hierarchy Consistency',
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

  // Test 1: anatomyHierarchy.ts structure parsing
  const hierarchyPath = path.join(rootDir, 'frontend/src/data/anatomyHierarchy.ts');
  const hierarchyContent = fs.readFileSync(hierarchyPath, 'utf8');

  const idMatches = [...hierarchyContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  assert('ANATOMICAL_STRUCTURES has valid entries', idMatches.length >= 40, `Found ${idMatches.length} structures`);

  // Check for unique IDs
  const uniqueIds = new Set(idMatches);
  assert('ANATOMICAL_STRUCTURES has unique IDs', uniqueIds.size === idMatches.length, `Unique: ${uniqueIds.size}, Total: ${idMatches.length}`);

  // Test 2: Verify essential human organ systems in ANATOMICAL_SYSTEMS
  const expectedSystems = ['skeletal', 'muscular', 'cardiovascular', 'nervous_cns', 'digestive', 'respiratory', 'urinary'];
  const allSystemsFound = expectedSystems.every(sys => hierarchyContent.includes(`id: '${sys}'`));
  assert('All essential human organ systems represented in ANATOMICAL_SYSTEMS', allSystemsFound, expectedSystems.join(', '));

  // Test 3: AnatomyAssetRegistry.ts model files check
  const registryPath = path.join(rootDir, 'frontend/src/data/AnatomyAssetRegistry.ts');
  const registryContent = fs.readFileSync(registryPath, 'utf8');
  const modelUrlMatches = [...registryContent.matchAll(/["']?modelUrl["']?:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

  let allFilesExist = true;
  let missingFiles = [];
  const uniqueUrls = [...new Set(modelUrlMatches)];

  for (const fp of uniqueUrls) {
    const cleanPath = fp.startsWith('/') ? fp.slice(1) : fp;
    const absPath = path.join(rootDir, 'frontend/public', cleanPath);
    if (!fs.existsSync(absPath)) {
      allFilesExist = false;
      missingFiles.push(fp);
    }
  }
  assert('All registered GLB assets exist in public folder', allFilesExist && uniqueUrls.length > 0, missingFiles.length === 0 ? `All ${uniqueUrls.length} distinct assets found on disk` : `Missing: ${missingFiles.join(', ')}`);

  // Test 4: Dental innervation database has all 32 teeth
  const dentalNeuroPath = path.join(rootDir, 'frontend/src/data/dentalNeuroData.ts');
  const dentalNeuroContent = fs.readFileSync(dentalNeuroPath, 'utf8');
  const fdiMatches = [...dentalNeuroContent.matchAll(/fdi:\s*([1-4][1-8])/g)].map(m => parseInt(m[1]));
  const uniqueFdis = new Set(fdiMatches);
  assert('DENTAL_INNERVATION_DATABASE contains all 32 adult teeth (FDI 11-48)', uniqueFdis.size === 32, `Found ${uniqueFdis.size}/32 teeth`);

  // Test 5: Cranial nerves CN I - CN XII exist in dentalNeuroData / registry
  const cranialNervesFound = [...dentalNeuroContent.matchAll(/type:\s*['"]cranial_nerve['"]/g)].length;
  assert('All 12 Cranial Nerves pairs exist in neuroanatomy definitions', cranialNervesFound >= 12, `Found ${cranialNervesFound} cranial nerve structures`);

  // Test 6: Verify relationship graph integrity (relationships target valid structures)
  const relTargets = [...hierarchyContent.matchAll(/targetId:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const missingTargets = relTargets.filter(t => !uniqueIds.has(t));
  assert('All relationships in hierarchy target valid existing structures', missingTargets.length === 0, missingTargets.length === 0 ? `All ${relTargets.length} relationship targets resolve` : `Unresolved targets: ${missingTargets.slice(0, 5).join(', ')}`);

  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runRegistryConsistencyTests().then(res => {
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
