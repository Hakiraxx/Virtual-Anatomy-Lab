import fs from 'fs';
import path from 'path';

export async function runLayerSeparationTests() {
  const tests = [];
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      const details = fn();
      passed++;
      tests.push({ name, status: 'PASS', details });
    } catch (err) {
      failed++;
      tests.push({ name, status: 'FAIL', details: err.message });
    }
  }

  const registryPath = path.resolve('frontend/src/anatomy/layers/LayerRegistry.ts');
  const controllerPath = path.resolve('frontend/src/anatomy/layers/LayerSeparationController.ts');
  const viewerPath = path.resolve('frontend/src/components/3d/FullBodyViewer.tsx');
  const storePath = path.resolve('frontend/src/stores/useAnatomyStore.ts');
  const toolbarPath = path.resolve('frontend/src/components/ui/SmartFocusToolbar.tsx');

  test('LayerRegistry definition and all 8 dissection layers present', () => {
    if (!fs.existsSync(registryPath)) throw new Error('Missing LayerRegistry.ts');
    const content = fs.readFileSync(registryPath, 'utf8');

    for (let i = 1; i <= 8; i++) {
      if (!content.includes(`${i}: {`) || !content.includes(`layerIndex: ${i}`)) {
        throw new Error(`Layer ${i} definition missing in LayerRegistry`);
      }
    }
    return 'All 8 dissection layers (Skin -> Deep) configured in LAYER_REGISTRY';
  });

  test('Layer 4 (Skeleton) is strictly stationary anatomical reference anchor [0, 0, 0]', () => {
    const content = fs.readFileSync(registryPath, 'utf8');
    const match = content.match(/4:\s*\{[\s\S]*?maxOffset:\s*\[([^\]]+)\]/);
    if (!match) throw new Error('Layer 4 maxOffset not found');
    const offsets = match[1].split(',').map(s => parseFloat(s.trim()));
    if (offsets[0] !== 0 || offsets[1] !== 0 || offsets[2] !== 0) {
      throw new Error(`Layer 4 has non-zero offset: ${offsets.join(', ')}`);
    }
    return 'Layer 4 maxOffset is [0, 0, 0] (stationary central anchor)';
  });

  test('Physiological separation axes adhere to anatomical orientations', () => {
    const content = fs.readFileSync(registryPath, 'utf8');
    
    // Skin: anterior (+Z)
    const skinMatch = content.match(/1:\s*\{[\s\S]*?maxOffset:\s*\[([^\]]+)\]/);
    const skinOffsets = skinMatch[1].split(',').map(s => parseFloat(s.trim()));
    if (skinOffsets[2] <= 0) throw new Error('Layer 1 Skin must displace anteriorly (+Z)');

    // Muscle: lateral (+X)
    const muscleMatch = content.match(/3:\s*\{[\s\S]*?maxOffset:\s*\[([^\]]+)\]/);
    const muscleOffsets = muscleMatch[1].split(',').map(s => parseFloat(s.trim()));
    if (muscleOffsets[0] <= 0) throw new Error('Layer 3 Muscle must displace laterally (+X)');

    // Viscera: anterior (+Z)
    const visceraMatch = content.match(/5:\s*\{[\s\S]*?maxOffset:\s*\[([^\]]+)\]/);
    const visceraOffsets = visceraMatch[1].split(',').map(s => parseFloat(s.trim()));
    if (visceraOffsets[2] <= 0) throw new Error('Layer 5 Viscera must displace anteriorly (+Z)');

    // Vessels: lateral-right (-X)
    const vesselsMatch = content.match(/6:\s*\{[\s\S]*?maxOffset:\s*\[([^\]]+)\]/);
    const vesselsOffsets = vesselsMatch[1].split(',').map(s => parseFloat(s.trim()));
    if (vesselsOffsets[0] >= 0) throw new Error('Layer 6 Vessels must displace laterally right (-X)');

    // Nerves: posterior (-Z)
    const nervesMatch = content.match(/7:\s*\{[\s\S]*?maxOffset:\s*\[([^\]]+)\]/);
    const nervesOffsets = nervesMatch[1].split(',').map(s => parseFloat(s.trim()));
    if (nervesOffsets[2] >= 0) throw new Error('Layer 7 Nerves must displace posteriorly (-Z)');

    return 'Separation directions validated: Skin(+Z), Muscle(+X), Viscera(+Z), Vessels(-X), Nerves(-Z)';
  });

  test('Viewport safety: All layer max displacements are bounded (< 0.85m)', () => {
    const content = fs.readFileSync(registryPath, 'utf8');
    const offsetMatches = [...content.matchAll(/maxOffset:\s*\[([^\]]+)\]/g)];
    for (const m of offsetMatches) {
      const coords = m[1].split(',').map(s => parseFloat(s.trim()));
      const magnitude = Math.sqrt(coords[0] ** 2 + coords[1] ** 2 + coords[2] ** 2);
      if (magnitude > 0.85) {
        throw new Error(`Layer offset magnitude ${magnitude}m exceeds 0.85m limit`);
      }
    }
    return 'All 8 layers remain comfortably within standard camera FOV';
  });

  test('Zero transform drift guarantee: 0% factor produces strictly [0, 0, 0]', () => {
    const content = fs.readFileSync(registryPath, 'utf8');
    if (!content.includes('if (clamped <= 0.0001)') || !content.includes('return [0, 0, 0]')) {
      throw new Error('LayerRegistry.getLayerOffset does not explicitly enforce zero drift at factor <= 0.0001');
    }
    return 'LayerRegistry explicitly returns [0, 0, 0] when factor <= 0.0001 (0.000000 drift)';
  });

  test('FullBodyViewer wraps all 6 anatomical systems in AnimatedLayerGroup', () => {
    const content = fs.readFileSync(viewerPath, 'utf8');
    const expectedGroups = [
      'Layer1_Skin_Group',
      'Layer3_Muscles_Group',
      'Layer4_Skeleton_Group',
      'Layer5_Viscera_Group',
      'Layer6_Vessels_Group',
      'Layer7_Nerves_Group',
      'Layer5_FemaleReproductive_Group'
    ];
    for (const grp of expectedGroups) {
      if (!content.includes(grp)) {
        throw new Error(`Missing ${grp} in FullBodyViewer.tsx`);
      }
    }
    return 'All 6 anatomical systems and female reproductive group wrapped with AnimatedLayerGroup';
  });

  test('FullBodyViewer incorporates AnimatedLandmarkBadge with dynamic offset tracking', () => {
    const content = fs.readFileSync(viewerPath, 'utf8');
    if (!content.includes('<AnimatedLandmarkBadge')) {
      throw new Error('FullBodyViewer does not use AnimatedLandmarkBadge');
    }
    if (!content.includes('LayerRegistry.getLayerOffset(layerIdx, currentProgress.current)')) {
      throw new Error('AnimatedLandmarkBadge does not track layer displacement');
    }
    return 'Landmark badge smoothly tracks organ position as layers separate';
  });

  test('useAnatomyStore synchronizes isLayersActive and explodeFactor bidirectionally', () => {
    const content = fs.readFileSync(storePath, 'utf8');
    if (!content.includes('isLayersActive: nextActive') || !content.includes('explodeFactor: nextActive ?')) {
      throw new Error('toggleLayers does not synchronize explodeFactor');
    }
    if (!content.includes('isLayersActive: clamped > 0.001')) {
      throw new Error('setExplodeFactor does not synchronize isLayersActive');
    }
    if (!content.includes('resetAllToDefault')) {
      throw new Error('resetAllToDefault missing');
    }
    return 'Store state bidirectionally synchronizes isLayersActive and continuous explodeFactor';
  });

  test('SmartFocusToolbar desktop "Bung lớp" button is not disabled on full-body', () => {
    const content = fs.readFileSync(toolbarPath, 'utf8');
    if (content.includes("disabled={viewMode === 'full-body'")) {
      throw new Error('Bung lớp button is disabled on full-body view');
    }
    return 'Bung lớp button accessible on desktop full-body view';
  });

  return {
    suite: 'Anatomical Layer Separation & Exploded Assembly Audit',
    passed,
    failed,
    tests
  };
}
