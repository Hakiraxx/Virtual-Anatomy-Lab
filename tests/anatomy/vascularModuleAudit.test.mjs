import assert from 'node:assert/strict';
import fs from 'node:fs';

export function runVascularModuleAuditTests() {
  const tests = [];
  let passed = 0;
  let failed = 0;

  function record(name, fn) {
    try {
      fn();
      passed++;
      tests.push({ name, status: 'PASS' });
    } catch (err) {
      failed++;
      tests.push({ name, status: 'FAIL', details: err.message });
    }
  }

  // 1. Asset existence
  record('Z-Anatomy vessels_complete.glb 3D asset existence and integrity', () => {
    assert.ok(fs.existsSync('frontend/public/models/anatomy/vessels_complete.glb'));
    const stat = fs.statSync('frontend/public/models/anatomy/vessels_complete.glb');
    assert.ok(stat.size > 1000000, `File size should be > 1MB, got ${stat.size}`);
  });

  // 2. Read glTF nodes from vessels_complete.glb
  const vesselsBuf = fs.readFileSync('frontend/public/models/anatomy/vessels_complete.glb');
  const vesselsJsonLen = vesselsBuf.readUInt32LE(12);
  const vesselsGltf = JSON.parse(vesselsBuf.toString('utf8', 20, 20 + vesselsJsonLen));
  const vesselNodeNames = new Set(vesselsGltf.nodes.map((n) => n.name).filter(Boolean));

  record('Vessels model contains sufficient named mesh nodes (>= 600)', () => {
    assert.ok(vesselNodeNames.size >= 600, `Expected >= 600 named nodes, got ${vesselNodeNames.size}`);
  });

  // 3. Load vascularSystemData.ts
  const dataSrc = fs.readFileSync('frontend/src/data/vascularSystemData.ts', 'utf8');

  // Extract VASCULAR_STRUCTURES JSON block
  const matchStructures = dataSrc.match(/export const VASCULAR_STRUCTURES:\s*VascularStructureData\[\]\s*=\s*(\[[\s\S]*?\n\];)/);
  assert.ok(matchStructures, 'Could not find VASCULAR_STRUCTURES in vascularSystemData.ts');
  const structuresJsonStr = matchStructures[1].replace(/;\s*$/, '');
  const structures = JSON.parse(structuresJsonStr);

  record('Exactly 100 distinct anatomical vascular structures defined', () => {
    assert.equal(structures.length, 100, `Expected exactly 100 structures, got ${structures.length}`);
  });

  record('Zero duplicate canonical IDs in 100 vascular structures', () => {
    const idSet = new Set();
    for (const s of structures) {
      assert.ok(!idSet.has(s.id), `Duplicate ID found: ${s.id}`);
      idSet.add(s.id);
    }
    assert.equal(idSet.size, 100);
  });

  record('Zero duplicate Vietnamese names across 100 structures', () => {
    const viSet = new Set();
    for (const s of structures) {
      assert.ok(!viSet.has(s.nameVi), `Duplicate Vietnamese name found: ${s.nameVi}`);
      viSet.add(s.nameVi);
    }
    assert.equal(viSet.size, 100);
  });

  // 4. Region coverage & counts
  const expectedRegionCounts = {
    aorta_great_vessels: 8,
    coronary: 10,
    carotid_head_neck: 11,
    cerebral_circle_willis: 11,
    dural_sinuses: 8,
    upper_limb: 12,
    thoracic_pulmonary: 8,
    abdominal_digestive: 14,
    renal_retroperitoneal: 8,
    pelvic_lower_limb: 10
  };

  record('All 10 anatomical vascular regions have exact expected structure counts', () => {
    const actualCounts = {};
    for (const s of structures) {
      actualCounts[s.region] = (actualCounts[s.region] || 0) + 1;
    }

    for (const [reg, expectedCount] of Object.entries(expectedRegionCounts)) {
      assert.equal(
        actualCounts[reg],
        expectedCount,
        `Region '${reg}' expected ${expectedCount} structures, got ${actualCounts[reg]}`
      );
    }

    const totalCount = Object.values(actualCounts).reduce((a, b) => a + b, 0);
    assert.equal(totalCount, 100);
  });

  // 5. 1:1 real mesh mapping verification
  record('100% of referenced 3D meshes strictly exist in vessels_complete.glb', () => {
    const missingMeshes = [];
    for (const s of structures) {
      assert.ok(s.meshNodeNames && s.meshNodeNames.length > 0, `Structure ${s.id} has no meshNodeNames`);
      for (const m of s.meshNodeNames) {
        if (!vesselNodeNames.has(m)) {
          missingMeshes.push({ vesselId: s.id, missingMesh: m });
        }
      }
    }
    assert.equal(
      missingMeshes.length,
      0,
      `Found ${missingMeshes.length} missing meshes: ${JSON.stringify(missingMeshes.slice(0, 5))}`
    );
  });

  // 6. Medical metadata completeness audit
  record('All 100 structures have non-empty bilingual names, TA2 Latin, and clinical data', () => {
    for (const s of structures) {
      assert.ok(s.nameVi && s.nameVi.trim().length > 0, `${s.id} missing nameVi`);
      assert.ok(s.nameEn && s.nameEn.trim().length > 0, `${s.id} missing nameEn`);
      assert.ok(s.nameLa && s.nameLa.trim().length > 0, `${s.id} missing nameLa (TA2)`);
      assert.ok(['artery', 'vein', 'cardiac'].includes(s.type), `${s.id} invalid type: ${s.type}`);
      assert.ok(s.dimensions && s.dimensions.trim().length > 0, `${s.id} missing dimensions`);
      assert.ok(s.originVi && s.originVi.trim().length > 0, `${s.id} missing originVi`);
      assert.ok(s.originEn && s.originEn.trim().length > 0, `${s.id} missing originEn`);
      assert.ok(s.branchesVi && s.branchesVi.length > 0, `${s.id} missing branchesVi`);
      assert.ok(s.branchesEn && s.branchesEn.length > 0, `${s.id} missing branchesEn`);
      assert.ok(s.territoryVi && s.territoryVi.trim().length > 0, `${s.id} missing territoryVi`);
      assert.ok(s.territoryEn && s.territoryEn.trim().length > 0, `${s.id} missing territoryEn`);
      assert.ok(s.anastomosesVi && s.anastomosesVi.trim().length > 0, `${s.id} missing anastomosesVi`);
      assert.ok(s.anastomosesEn && s.anastomosesEn.trim().length > 0, `${s.id} missing anastomosesEn`);
      assert.ok(s.histologyVi && s.histologyVi.trim().length > 0, `${s.id} missing histologyVi`);
      assert.ok(s.histologyEn && s.histologyEn.trim().length > 0, `${s.id} missing histologyEn`);
      assert.ok(s.clinicalNotesVi && s.clinicalNotesVi.trim().length > 0, `${s.id} missing clinicalNotesVi`);
      assert.ok(s.clinicalNotesEn && s.clinicalNotesEn.trim().length > 0, `${s.id} missing clinicalNotesEn`);
    }
  });

  // 7. Metric spatial coordinates and camera presets
  record('All 100 structures have valid metric 3D coordinates and camera presets', () => {
    for (const s of structures) {
      assert.ok(Array.isArray(s.canonicalCenter) && s.canonicalCenter.length === 3, `${s.id} invalid center`);
      const [x, y, z] = s.canonicalCenter;
      assert.ok(typeof x === 'number' && !isNaN(x), `${s.id} invalid X center`);
      assert.ok(typeof y === 'number' && !isNaN(y), `${s.id} invalid Y center`);
      assert.ok(typeof z === 'number' && !isNaN(z), `${s.id} invalid Z center`);

      // Y is anatomical height from feet/legs (-1.0m) to head (+0.85m)
      assert.ok(
        y >= -1.0 && y <= 0.95,
        `${s.id} center Y coordinate ${y} out of anatomical metric range [-1.0, 0.95]`
      );

      assert.ok(s.cameraPreset && s.cameraPreset.position && s.cameraPreset.target, `${s.id} missing cameraPreset`);
      assert.equal(s.cameraPreset.position.length, 3);
      assert.equal(s.cameraPreset.target.length, 3);
    }
  });

  // 8. Key clinical vessel presence verification
  record('Key clinical vascular landmarks (LAD, Carotid, Willis, Celiac, Radial, Femoral) present', () => {
    const requiredLandmarks = [
      'ascending_aorta',
      'aortic_arch',
      'left_coronary_artery',
      'anterior_interventricular_artery',
      'circumflex_artery',
      'right_coronary_artery',
      'coronary_sinus',
      'common_carotid_artery_left',
      'internal_carotid_artery',
      'external_carotid_artery',
      'basilar_artery',
      'middle_cerebral_artery_m1',
      'anterior_communicating_artery',
      'superior_sagittal_sinus',
      'cavernous_sinus',
      'brachial_artery',
      'radial_artery',
      'ulnar_artery',
      'pulmonary_trunk',
      'celiac_trunk',
      'superior_mesenteric_artery',
      'hepatic_portal_vein',
      'renal_artery_left',
      'common_iliac_artery',
      'femoral_artery',
      'popliteal_artery',
      'anterior_tibial_artery',
      'great_saphenous_vein'
    ];

    const structureIdSet = new Set(structures.map((s) => s.id));
    for (const key of requiredLandmarks) {
      assert.ok(structureIdSet.has(key), `Missing required landmark vessel: ${key}`);
    }
  });

  // 9. Component architecture verification
  record('All Vascular Lab components and stores exist and are properly structured', () => {
    const requiredFiles = [
      'frontend/src/data/vascularSystemData.ts',
      'frontend/src/stores/useVascularStore.ts',
      'frontend/src/components/vascular/VascularLab.tsx',
      'frontend/src/components/vascular/Vascular3DStage.tsx',
      'frontend/src/components/vascular/VascularTree.tsx',
      'frontend/src/components/vascular/VascularInfoPanel.tsx',
      'frontend/src/components/vascular/VascularToolbar.tsx',
      'frontend/src/components/vascular/VascularSectionSwitcher.tsx',
      'frontend/src/components/vascular/VascularLabelProjector.tsx',
      'frontend/src/components/vascular/VascularLabelLayer.tsx'
    ];

    for (const file of requiredFiles) {
      assert.ok(fs.existsSync(file), `Component file missing: ${file}`);
    }
  });

  return {
    suite: 'Vascular System 3D & 100 Details Medical Audit',
    passed,
    failed,
    tests
  };
}
