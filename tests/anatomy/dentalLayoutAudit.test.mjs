import fs from 'fs';
import path from 'path';
import {
  TopControlsManager,
  ToolbarSafeArea,
  LabelLayoutManager,
  DrawerManager
} from '../../frontend/src/utils/ViewerLayoutManager.ts';

export async function runDentalLayoutAuditTests() {
  const results = {
    suite: 'Dental 3D Viewer Layout, Safe Area & Collision Avoidance Audit',
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

  // ==========================================================================
  // 1. TOP CONTROLS MANAGER BOUNDS & INTEGRITY
  // ==========================================================================
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    const topBounds = TopControlsManager.getBounds(vp.width);
    assert(
      `TopControlsManager: Valid bounds for ${vp.name} (${vp.width}x${vp.height})`,
      topBounds.top >= 0 && topBounds.bottom > topBounds.top && topBounds.width > 0,
      `Bounds: top=${topBounds.top}, bottom=${topBounds.bottom}, width=${topBounds.width}, height=${topBounds.height}`
    );

    assert(
      `TopControlsManager: Bounded within viewport width on ${vp.name}`,
      topBounds.left >= 0 && topBounds.right <= vp.width,
      `left=${topBounds.left}, right=${topBounds.right}, vpWidth=${vp.width}`
    );
  }

  // ==========================================================================
  // 2. TOOLBAR SAFE AREA (Toolbar Always Wins, 24-32px Guaranteed Margin)
  // ==========================================================================
  for (const vp of viewports) {
    const tbBounds = ToolbarSafeArea.getBounds(vp.width, vp.height);
    assert(
      `ToolbarSafeArea: Valid bounds for ${vp.name}`,
      tbBounds.top > 0 && tbBounds.bottom <= vp.height && tbBounds.height >= 40,
      `Bounds: top=${tbBounds.top}, bottom=${tbBounds.bottom}, height=${tbBounds.height}`
    );

    // Guaranteed safe margin: between 24 and 32px
    assert(
      `ToolbarSafeArea: Safe gap constant within [${ToolbarSafeArea.MIN_GAP}px, ${ToolbarSafeArea.MAX_GAP}px]`,
      ToolbarSafeArea.DEFAULT_GAP >= ToolbarSafeArea.MIN_GAP &&
      ToolbarSafeArea.DEFAULT_GAP <= ToolbarSafeArea.MAX_GAP,
      `Default safe gap = ${ToolbarSafeArea.DEFAULT_GAP}px`
    );
  }

  // ==========================================================================
  // 3. LABEL LAYOUT MANAGER — COLLISION AVOIDANCE & PRIORITY GATING
  // ==========================================================================
  const containerW = 1200;
  const containerH = 800;
  const topObs = TopControlsManager.getBounds(containerW);
  const bottomObs = ToolbarSafeArea.getBounds(containerW, containerH);

  const obstacles = [
    { id: 'top-controls', type: 'top-controls', ...topObs },
    { id: 'bottom-toolbar', type: 'bottom-toolbar', ...bottomObs }
  ];

  // Test 3.1: Behind-camera culling
  const behindLabel = {
    id: 'tooth_48',
    nameVi: 'R.48',
    screenX: 600,
    screenY: 400,
    inFront: false,
    priority: 1,
    width: 120,
    height: 32
  };
  const cullingResult = LabelLayoutManager.resolveLayout([behindLabel], obstacles, {
    containerWidth: containerW,
    containerHeight: containerH
  });
  assert(
    'LabelLayoutManager: Behind-camera labels are filtered out',
    cullingResult.length === 0 || !cullingResult[0].isVisible,
    `Culling count: ${cullingResult.filter(l => l.isVisible).length}`
  );

  // Test 3.2: Top Controls Collision Avoidance (Push Downwards)
  const topCollidingLabel = {
    id: 'nerve_ian',
    nameVi: 'TK Huyệt Răng Dưới',
    screenX: 600,
    screenY: 40, // Directly in middle of top controls (top: 10, bottom: 96)
    inFront: true,
    priority: 2,
    width: 140,
    height: 28
  };
  const topAvoidanceResult = LabelLayoutManager.resolveLayout([topCollidingLabel], obstacles, {
    containerWidth: containerW,
    containerHeight: containerH
  });
  const placedTop = topAvoidanceResult.find(l => l.id === 'nerve_ian');
  assert(
    'LabelLayoutManager: Top-colliding label pushed down safely below top controls',
    placedTop && placedTop.placedY > topObs.bottom,
    `Placed Y: ${placedTop?.placedY}px > topObs.bottom: ${topObs.bottom}px`
  );

  // Test 3.3: Bottom Toolbar Collision Avoidance (Push Upwards)
  const bottomCollidingLabel = {
    id: 'mental_foramen',
    nameVi: 'Lỗ Cằm',
    screenX: 600,
    screenY: containerH - 25, // Directly inside bottom toolbar
    inFront: true,
    priority: 2,
    width: 120,
    height: 28
  };
  const bottomAvoidanceResult = LabelLayoutManager.resolveLayout([bottomCollidingLabel], obstacles, {
    containerWidth: containerW,
    containerHeight: containerH
  });
  const placedBottom = bottomAvoidanceResult.find(l => l.id === 'mental_foramen');
  assert(
    'LabelLayoutManager: Bottom-colliding label pushed up safely above bottom toolbar',
    placedBottom && placedBottom.placedY < bottomObs.top,
    `Placed Y: ${placedBottom?.placedY}px < bottomObs.top: ${bottomObs.top}px`
  );

  // Test 3.4: Priority Gating & Pairwise Label Collision
  // Two labels at exact same position: Priority 1 (Selected) vs Priority 3 (Context)
  const overlappingLabels = [
    {
      id: 'tooth_48',
      nameVi: 'R.48 (Selected)',
      screenX: 500,
      screenY: 350,
      inFront: true,
      priority: 1,
      width: 140,
      height: 32,
      isSelected: true
    },
    {
      id: 'lingual_nerve',
      nameVi: 'TK Lưỡi (Context)',
      screenX: 500,
      screenY: 350,
      inFront: true,
      priority: 3,
      width: 120,
      height: 26
    }
  ];
  const pairwiseResult = LabelLayoutManager.resolveLayout(overlappingLabels, obstacles, {
    containerWidth: containerW,
    containerHeight: containerH
  });
  const placedSelected = pairwiseResult.find(l => l.id === 'tooth_48');
  const placedContext = pairwiseResult.find(l => l.id === 'lingual_nerve');

  assert(
    'LabelLayoutManager: Priority 1 (Selected) remains visible and retains primary position',
    placedSelected && placedSelected.isVisible,
    `Selected: placedY=${placedSelected?.placedY}`
  );

  assert(
    'LabelLayoutManager: Pairwise collision nudges or suppresses lower priority label without overlap',
    placedContext && (!placedContext.isVisible || Math.abs(placedContext.placedY - placedSelected.placedY) >= 25),
    `Context placedY=${placedContext?.placedY}, Selected placedY=${placedSelected?.placedY}`
  );

  // Test 3.5: Context Toggle Suppression
  const contextToggleResult = LabelLayoutManager.resolveLayout(overlappingLabels, obstacles, {
    containerWidth: containerW,
    containerHeight: containerH,
    showContext: false
  });
  const contextToggled = contextToggleResult.find(l => l.id === 'lingual_nerve');
  assert(
    'LabelLayoutManager: showContext=false suppresses context labels (priority 3)',
    !contextToggled || !contextToggled.isVisible,
    'Context label properly filtered out when showContext=false'
  );

  // ==========================================================================
  // 4. DRAWER & RESPONSIVE BREAKPOINT MANAGER
  // ==========================================================================
  assert(
    'DrawerManager: >= 1200px resolves to panel mode',
    DrawerManager.getDetailMode(1440) === 'panel' && DrawerManager.getDetailMode(1200) === 'panel',
    'Desktop resolves to panel'
  );

  assert(
    'DrawerManager: 768px - 1199px resolves to drawer mode',
    DrawerManager.getDetailMode(1024) === 'drawer' && DrawerManager.getDetailMode(768) === 'drawer',
    'Tablet resolves to drawer'
  );

  assert(
    'DrawerManager: < 768px resolves to bottom-sheet mode',
    DrawerManager.getDetailMode(480) === 'bottom-sheet' && DrawerManager.getDetailMode(375) === 'bottom-sheet',
    'Mobile resolves to bottom-sheet'
  );

  // ==========================================================================
  // 5. CODEBASE INTEGRATION & DOM STRUCTURE INTEGRITY
  // ==========================================================================
  const wisdomStagePath = path.resolve('frontend/src/components/dental-neuroanatomy/specimens/WisdomSurgeryStage.tsx');
  const wisdomStageContent = fs.readFileSync(wisdomStagePath, 'utf8');

  assert(
    'WisdomSurgeryStage: Top controls arranged in flex column stack (Zone A + Zone B)',
    wisdomStageContent.includes('flex flex-col items-center gap-2') &&
    wisdomStageContent.includes('Zone A: Structure Navigation') &&
    wisdomStageContent.includes('Zone B: View Presets'),
    'Top controls flex stack verified'
  );

  assert(
    'WisdomSurgeryStage: Bottom surgical controller tagged with data-ui="bottom-toolbar"',
    wisdomStageContent.includes('data-ui="bottom-toolbar"') &&
    wisdomStageContent.includes('id="medanatomy-bottom-toolbar"'),
    'Bottom toolbar selector verified for safe area calculation'
  );

  assert(
    'WisdomSurgeryStage: Integrates DentalAnatomyLabelProjector and AnatomyLabelLayer',
    wisdomStageContent.includes('<DentalAnatomyLabelProjector') &&
    wisdomStageContent.includes('<AnatomyLabelLayer'),
    'Canvas 3D projection separated cleanly into 2D HTML overlay layer'
  );

  assert(
    'WisdomSurgeryStage: In-mesh scattered HTML overlays removed from MandibularSurgicalSiteMesh',
    !wisdomStageContent.includes('<Html distanceFactor={12}') &&
    !wisdomStageContent.includes('Gai Spix (Mandibular foramen)'),
    'Uncontrolled 3D in-mesh HTML overlays eliminated'
  );

  return results;
}
