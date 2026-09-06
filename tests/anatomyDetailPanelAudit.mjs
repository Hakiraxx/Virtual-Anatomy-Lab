// ============================================================================
// TEST SUITE: ANATOMY DETAIL PANEL & RESPONSIVE DRAWER / SHEET AUDIT
// Validates 3D-First primacy, content-based sizing, zero empty space,
// safe areas, collision avoidance, and multi-device modes.
// ============================================================================

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

async function runTests() {
  console.log('\n============================================================');
  console.log('🔬 MEDANATOMY 3D — DETAIL PANEL & RESPONSIVE AUDIT');
  console.log('============================================================\n');

  const {
    resolveDetailPanelMode,
    computeDetailPanelMetrics
  } = await import('../frontend/src/utils/DetailPanelPositioner.ts');

  const { getAnatomicalPronunciation } = await import('../frontend/src/data/anatomyPronunciationData.ts');
  const { TOOTH_REGISTRY } = await import('../frontend/src/data/ToothRegistry.ts');

  let passed = 0;
  let failed = 0;

  function test(suite, name, fn) {
    try {
      fn();
      passed++;
      console.log(`  ✅ [PASS] ${name}`);
    } catch (err) {
      failed++;
      console.error(`  ❌ [FAIL] ${name}`);
      console.error(`     ↳ ${err.message}\n`);
    }
  }

  // --------------------------------------------------------------------------
  // SUITE 1: Layout Mode Determination across Viewport Widths
  // --------------------------------------------------------------------------
  console.log('📦 SUITE 1: Layout Mode Determination across Breakpoints');

  test('SUITE 1', 'Desktop (>= 1440px): maps strictly to desktop-panel mode', () => {
    assert.strictEqual(resolveDetailPanelMode(1920), 'desktop-panel');
    assert.strictEqual(resolveDetailPanelMode(1600), 'desktop-panel');
    assert.strictEqual(resolveDetailPanelMode(1440), 'desktop-panel');
  });

  test('SUITE 1', 'Laptop (1200-1439px): maps strictly to laptop-compact mode', () => {
    assert.strictEqual(resolveDetailPanelMode(1366), 'laptop-compact');
    assert.strictEqual(resolveDetailPanelMode(1280), 'laptop-compact');
    assert.strictEqual(resolveDetailPanelMode(1200), 'laptop-compact');
  });

  test('SUITE 1', 'Tablet Landscape (900-1199px): maps strictly to tablet-drawer mode', () => {
    assert.strictEqual(resolveDetailPanelMode(1180), 'tablet-drawer'); // iPad Pro Landscape
    assert.strictEqual(resolveDetailPanelMode(1024), 'tablet-drawer'); // iPad Air Landscape
    assert.strictEqual(resolveDetailPanelMode(900), 'tablet-drawer');
  });

  test('SUITE 1', 'Tablet Portrait (600-899px): maps strictly to bottom-sheet mode', () => {
    assert.strictEqual(resolveDetailPanelMode(820), 'bottom-sheet'); // iPad Air Portrait
    assert.strictEqual(resolveDetailPanelMode(768), 'bottom-sheet'); // iPad Mini Portrait
    assert.strictEqual(resolveDetailPanelMode(600), 'bottom-sheet');
  });

  test('SUITE 1', 'Mobile (< 600px): maps strictly to bottom-sheet mode', () => {
    assert.strictEqual(resolveDetailPanelMode(430), 'bottom-sheet'); // iPhone 16 Pro Max
    assert.strictEqual(resolveDetailPanelMode(390), 'bottom-sheet'); // iPhone 15 Standard
    assert.strictEqual(resolveDetailPanelMode(360), 'bottom-sheet'); // Android Standard
  });

  // --------------------------------------------------------------------------
  // SUITE 2: Desktop & Laptop Dimensions & Content-Based Height (Zero Empty Space)
  // --------------------------------------------------------------------------
  console.log('\n📦 SUITE 2: Desktop & Laptop Dimensions & Content-Based Height');

  test('SUITE 2', 'Desktop (1920x1080): Panel width <= 380px (<= 25% of screen width)', () => {
    const metrics = computeDetailPanelMetrics(1920, 1080);
    assert(metrics.width <= 380, `Width (${metrics.width}px) must be <= 380px`);
    assert(metrics.width / 1920 <= 0.25, `Width must not exceed 25% of viewport width`);
    assert.strictEqual(metrics.topOffset >= 64, true, 'Top offset must start below 64px header');
  });

  test('SUITE 2', 'Laptop (1366x768): Panel width = 320px to leave >= 75% width for 3D viewer', () => {
    const metrics = computeDetailPanelMetrics(1366, 768);
    assert.strictEqual(metrics.width, 320, 'Laptop compact panel width should be 320px');
    const remainingWidthRatio = (1366 - metrics.width) / 1366;
    assert(remainingWidthRatio >= 0.75, '3D viewer width ratio must be >= 75%');
  });

  test('SUITE 2', 'Content-Based Height: Panel uses max-h instead of fixed 100vh', () => {
    const desktopMetrics = computeDetailPanelMetrics(1440, 900);
    assert(desktopMetrics.maxHeightCss.includes('max-h-'), 'Must use max-h to allow natural content-based height');
    assert(!desktopMetrics.maxHeightCss.includes('h-screen'), 'Must not force h-screen');
    assert(!desktopMetrics.maxHeightCss.includes('h-full'), 'Must not force h-full');
  });

  // --------------------------------------------------------------------------
  // SUITE 3: Tablet Landscape Drawer Architecture (900-1199px)
  // --------------------------------------------------------------------------
  console.log('\n📦 SUITE 3: Tablet Landscape Slide-over Drawer');

  test('SUITE 3', 'iPad Landscape (1024x768): Panel operates as overlay drawer with backdrop', () => {
    const metrics = computeDetailPanelMetrics(1024, 768);
    assert.strictEqual(metrics.mode, 'tablet-drawer');
    assert.strictEqual(metrics.isOverlay, true, 'Drawer must be an overlay (0 in-flow width)');
    assert.strictEqual(metrics.hasBackdrop, true, 'Drawer must have a backdrop to tap-to-dismiss');
    assert(metrics.width <= 360, `Drawer width (${metrics.width}px) must be <= 360px`);
  });

  test('SUITE 3', 'iPad Pro Landscape (1180x820): Drawer leaves > 65% width visible even when opened', () => {
    const metrics = computeDetailPanelMetrics(1180, 820);
    const visibleWidthRatio = (1180 - metrics.width) / 1180;
    assert(visibleWidthRatio >= 0.65, `Visible width ratio (${visibleWidthRatio.toFixed(2)}) must be >= 0.65`);
  });

  // --------------------------------------------------------------------------
  // SUITE 4: Tablet Portrait & Mobile 3-State Bottom Sheet
  // --------------------------------------------------------------------------
  console.log('\n📦 SUITE 4: 3-State Bottom Sheet (Collapsed, Half, Expanded)');

  test('SUITE 4', 'Mobile (390x844) Collapsed State: Sits low, height <= 85px, does not obscure 3D model', () => {
    const metrics = computeDetailPanelMetrics(390, 844, 'collapsed');
    assert.strictEqual(metrics.mode, 'bottom-sheet');
    assert.strictEqual(metrics.maxHeightCss, 'max-h-[85px]');
    assert.strictEqual(metrics.isOverlay, false);
    assert.strictEqual(metrics.hasBackdrop, false);
  });

  test('SUITE 4', 'Mobile (390x844) Half State: Occupies ~48vh, provides overview without full coverage', () => {
    const metrics = computeDetailPanelMetrics(390, 844, 'half');
    assert.strictEqual(metrics.maxHeightCss, 'max-h-[48vh]');
    assert.strictEqual(metrics.isOverlay, true);
    assert.strictEqual(metrics.hasBackdrop, false);
  });

  test('SUITE 4', 'Mobile (390x844) Expanded State: Occupies ~84vh with backdrop for focused reading', () => {
    const metrics = computeDetailPanelMetrics(390, 844, 'expanded');
    assert.strictEqual(metrics.maxHeightCss, 'max-h-[84vh]');
    assert.strictEqual(metrics.isOverlay, true);
    assert.strictEqual(metrics.hasBackdrop, true);
  });

  test('SUITE 4', 'Touch Drag capability enabled on mobile & tablet portrait', () => {
    const mobileMetrics = computeDetailPanelMetrics(390, 844);
    assert.strictEqual(mobileMetrics.canTouchDrag, true, 'Touch drag must be enabled for bottom sheet');
    const desktopMetrics = computeDetailPanelMetrics(1440, 900);
    assert.strictEqual(desktopMetrics.canTouchDrag, false, 'Touch drag disabled on desktop');
  });

  // --------------------------------------------------------------------------
  // SUITE 5: Source Code Audit for Overlap and Empty Space Elimination
  // --------------------------------------------------------------------------
  console.log('\n📦 SUITE 5: Source Code Audit for Overlap & Empty Space Elimination');

  test('SUITE 5', 'AnatomyInfoCard does NOT use lg:top-0 (starts at top-[68px] or top-[64px])', () => {
    const cardContent = fs.readFileSync('frontend/src/components/ui/AnatomyInfoCard.tsx', 'utf8');
    assert(!cardContent.includes('lg:top-0'), 'Must not contain lg:top-0 (covers navigation header)');
    assert(cardContent.includes('top-[68px]') || cardContent.includes('top-[64px]'), 'Must start below 64px header');
  });

  test('SUITE 5', 'AnatomyInfoCard does NOT force lg:h-full or lg:max-h-full (eliminates giant empty space)', () => {
    const cardContent = fs.readFileSync('frontend/src/components/ui/AnatomyInfoCard.tsx', 'utf8');
    assert(!cardContent.includes('lg:h-full'), 'Must not force lg:h-full');
    assert(!cardContent.includes('lg:max-h-full'), 'Must not force lg:max-h-full');
    assert(cardContent.includes('h-auto'), 'Must use h-auto to hug natural content');
  });

  test('SUITE 5', 'AnatomyInfoCard isolates pointer and wheel events to prevent 3D canvas rotation', () => {
    const cardContent = fs.readFileSync('frontend/src/components/ui/AnatomyInfoCard.tsx', 'utf8');
    assert(cardContent.includes('onPointerDown={(e) => e.stopPropagation()}'), 'Must stop pointer event propagation');
    assert(cardContent.includes('onWheel={(e) => e.stopPropagation()}'), 'Must stop wheel event propagation');
  });

  // --------------------------------------------------------------------------
  // SUITE 6: Preservation of Pronunciation Engine & 32 Dental Assets
  // --------------------------------------------------------------------------
  console.log('\n📦 SUITE 6: Preservation of Pronunciation Engine & 32 Dental Assets');

  test('SUITE 6', 'Pronunciation engine resolves academic IPA for organ, nerve, and tooth terms', () => {
    const heart = getAnatomicalPronunciation('heart', 'Heart');
    assert(heart?.ipa.length > 0, 'Heart must resolve valid IPA');
    const skeleton = getAnatomicalPronunciation('skeleton', 'Skeleton');
    assert(skeleton?.ipa.length > 0, 'Skeleton must resolve valid IPA');
    const tooth = getAnatomicalPronunciation('tooth.46', 'Permanent Mandibular Right First Molar');
    assert(tooth?.ipa.length > 0, 'Tooth 46 must resolve valid IPA');
  });

  test('SUITE 6', 'All 32 authentic dental GLB assets remain 100% intact', () => {
    const teethKeys = Object.keys(TOOTH_REGISTRY);
    assert(teethKeys.length >= 32, 'All 32 teeth must be registered');
    for (const [fdi, record] of Object.entries(TOOTH_REGISTRY)) {
      if (record.assetPath) {
        const assetPath = path.join('frontend/public', record.assetPath);
        assert(fs.existsSync(assetPath), `Asset file ${record.assetPath} must exist on disk`);
      }
    }
  });

  console.log('\n========================================================================');
  console.log(`🏁 AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED (${passed + failed} total)`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
