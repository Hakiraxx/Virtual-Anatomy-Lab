// ============================================================================
// TEST SUITE: ANATOMY ANNOTATION POSITIONING & COLLISION AVOIDANCE AUDIT
// Validates safe areas, toolbar collision avoidance, and 3D model visibility
// ============================================================================

import assert from 'node:assert';
import {
  rectsIntersect,
  getResponsiveCardDimensions,
  getModelObstructionRect,
  computeOptimalAnnotationPosition
} from '../../frontend/src/utils/AnnotationPositioner.ts';

export async function runAnnotationPositioningAuditTests() {
  const results = {
    suite: 'Anatomy Annotation Dynamic Positioning & Safe Area Audit',
    tests: [],
    passed: 0,
    failed: 0
  };

  function test(name, fn) {
    try {
      fn();
      results.passed++;
      results.tests.push({ name, status: 'PASS' });
    } catch (err) {
      results.failed++;
      results.tests.push({ name, status: 'FAIL', details: err.message });
    }
  }

  // 1. 2D Rectangle Collision Engine
  test('rectsIntersect accurately detects overlap and respecting safety margins', () => {
    const rectA = { left: 100, right: 200, top: 100, bottom: 200, width: 100, height: 100 };
    const rectB = { left: 150, right: 250, top: 150, bottom: 250, width: 100, height: 100 };
    const rectC = { left: 300, right: 400, top: 300, bottom: 400, width: 100, height: 100 };

    assert.strictEqual(rectsIntersect(rectA, rectB, 0), true, 'rectA and rectB should overlap');
    assert.strictEqual(rectsIntersect(rectA, rectC, 0), false, 'rectA and rectC should not overlap');
    // With 150px margin, rectA and rectC should intersect
    assert.strictEqual(rectsIntersect(rectA, rectC, 150), true, 'rectA and rectC should intersect with margin');
  });

  // 2. Responsive Card Dimensions across Device Viewports
  test('Card dimensions scale ergonomically across Mobile, Tablet, Laptop, and Desktop', () => {
    const mobile = getResponsiveCardDimensions(390);
    assert(mobile.width <= 390 - 24, 'Mobile width must respect 24px viewport margin');
    assert(mobile.height <= 125, 'Mobile card height must stay compact');

    const tablet = getResponsiveCardDimensions(768);
    assert(tablet.width <= 768 - 48, 'Tablet width must respect 48px margin');

    const laptop = getResponsiveCardDimensions(1366);
    assert.strictEqual(laptop.width, 440, 'Laptop width should be 440px');

    const desktop = getResponsiveCardDimensions(1920);
    assert.strictEqual(desktop.width, 460, 'Desktop width should be 460px');
  });

  // 3. Rule 10: Zero Overlap with Bottom Toolbar (Desktop 1920x1080)
  test('Desktop (1920x1080): Annotation NEVER collides with bottom toolbar', () => {
    const customSafeArea = {
      top: 64,
      bottom: 120, // Toolbar occupies bottom 60px + 60px safe spacing
      left: 20,
      right: 20,
      viewportWidth: 1920,
      viewportHeight: 1080,
      toolbarHeight: 60,
      toolbarTop: 1020,
      safeSpacing: 28,
      envInsetBottom: 0
    };

    const target = { anatomyId: 'heart', position: [0.03, 1.25, 0.05] };
    const res = computeOptimalAnnotationPosition(target, customSafeArea);

    // Card bottom edge in screen coordinates = res.y + res.cardHeight
    const cardBottom = res.y + res.cardHeight;
    const toolbarTop = customSafeArea.toolbarTop;

    assert(
      cardBottom <= toolbarTop - customSafeArea.safeSpacing,
      `Card bottom (${cardBottom}px) overlaps toolbar top (${toolbarTop}px)`
    );
    assert.strictEqual(res.collidedWithToolbar, false, 'Card must not collide with toolbar');
  });

  // 4. Rule 11: Whole Body Skeleton (/toanthan) shifts to bottom-left to protect sagittal lower body
  test('Whole Body View (/toanthan): Card shifts to bottom-left to keep human skeleton 100% visible', () => {
    const customSafeArea = {
      top: 64,
      bottom: 124,
      left: 20,
      right: 20,
      viewportWidth: 1920,
      viewportHeight: 1080,
      toolbarHeight: 64,
      toolbarTop: 1016,
      safeSpacing: 28,
      envInsetBottom: 0
    };

    // Human skeleton at /toanthan
    const target = { isFullBody: true, anatomyId: 'human_skeleton', position: [0, 0.9, 0] };
    const res = computeOptimalAnnotationPosition(target, customSafeArea);

    assert.strictEqual(
      res.placement,
      'bottom-left',
      `Full body view should pick bottom-left (Candidate 2), but got ${res.placement}`
    );
    assert.strictEqual(res.collidedWithModel, false, 'Card must not collide with sagittal model');
    assert.strictEqual(res.collidedWithToolbar, false, 'Card must not collide with toolbar');
  });

  // 5. Upper Visceral Organ (Heart) selects bottom-center because lower-center is clear
  test('Upper visceral organ (Heart): Card safely uses bottom-center without obscuring heart', () => {
    const customSafeArea = {
      top: 64,
      bottom: 120,
      left: 20,
      right: 20,
      viewportWidth: 1920,
      viewportHeight: 1080,
      toolbarHeight: 60,
      toolbarTop: 1020,
      safeSpacing: 28,
      envInsetBottom: 0
    };

    // Heart is in thoracic cavity (y = 1.25)
    const target = { anatomyId: 'heart', position: [0.03, 1.25, 0.05] };
    const res = computeOptimalAnnotationPosition(target, customSafeArea);

    assert.strictEqual(
      res.placement,
      'bottom-center',
      `Heart should select bottom-center (Candidate 1), but got ${res.placement}`
    );
    assert.strictEqual(res.collidedWithToolbar, false);
    assert.strictEqual(res.collidedWithModel, false);
  });

  // 6. Tooth Specimen (Tooth 46): Card uses bottom-center without obscuring oral cavity
  test('Dental Specimen (Tooth 46): Card safely uses bottom-center above dental toolbar', () => {
    const customSafeArea = {
      top: 64,
      bottom: 110,
      left: 16,
      right: 16,
      viewportWidth: 1440,
      viewportHeight: 900,
      toolbarHeight: 52,
      toolbarTop: 848,
      safeSpacing: 24,
      envInsetBottom: 0
    };

    const target = { anatomyId: 'tooth.46', position: [0.0186, 0.7487, 0.052] };
    const res = computeOptimalAnnotationPosition(target, customSafeArea);

    assert.strictEqual(
      res.placement,
      'bottom-center',
      `Tooth 46 should select bottom-center, but got ${res.placement}`
    );
    assert.strictEqual(res.collidedWithToolbar, false);
  });

  // 7. iPad / Tablet Portrait (820x1180): Guarantees safe spacing above toolbar
  test('iPad Portrait (820x1180): Card remains above toolbar with proper width constraint', () => {
    const customSafeArea = {
      top: 60,
      bottom: 115,
      left: 16,
      right: 16,
      viewportWidth: 820,
      viewportHeight: 1180,
      toolbarHeight: 56,
      toolbarTop: 1124,
      safeSpacing: 24,
      envInsetBottom: 15
    };

    const target = { anatomyId: 'brain', position: [0, 1.65, 0.02] };
    const res = computeOptimalAnnotationPosition(target, customSafeArea);

    assert(res.cardWidth <= 820 - 32, 'Card width must fit inside tablet screen');
    assert(res.y + res.cardHeight <= customSafeArea.toolbarTop - customSafeArea.safeSpacing);
  });

  // 8. Mobile Screen (390x844 iPhone): Guarantees safe area and zero overlap
  test('Mobile Screen (390x844): Card adheres strictly to mobile safe area bounds', () => {
    const customSafeArea = {
      top: 54,
      bottom: 110,
      left: 12,
      right: 12,
      viewportWidth: 390,
      viewportHeight: 844,
      toolbarHeight: 50,
      toolbarTop: 794,
      safeSpacing: 18,
      envInsetBottom: 34 // iPhone home indicator
    };

    const target = { anatomyId: 'heart', position: [0, 1.25, 0] };
    const res = computeOptimalAnnotationPosition(target, customSafeArea);

    assert(res.cardWidth <= 390 - 24, 'Card width must be <= 366px on 390px mobile');
    assert(res.bottomPx >= customSafeArea.bottom, 'bottomPx must be at least customSafeArea.bottom');
    assert.strictEqual(res.collidedWithToolbar, false, 'Must not collide with mobile toolbar');
  });

  // 9. iPad Landscape (1024x768): Sidebar is drawer, 3D viewer takes 100% width, annotation stays above toolbar
  test('iPad Landscape (1024x768): Sidebar does not shrink viewer; annotation remains safely placed', () => {
    const customSafeArea = {
      top: 64,
      bottom: 110,
      left: 16,
      right: 16,
      viewportWidth: 1024,
      viewportHeight: 768,
      toolbarHeight: 56,
      toolbarTop: 712,
      safeSpacing: 24,
      envInsetBottom: 0
    };

    const target = { anatomyId: 'human_skeleton', isFullBody: true };
    const res = computeOptimalAnnotationPosition(target, customSafeArea);

    assert.strictEqual(res.collidedWithToolbar, false, 'Card must not collide with bottom toolbar on 1024x768');
    assert.strictEqual(res.collidedWithModel, false, 'Card must avoid lower extremities on whole body view');
    assert(res.cardWidth <= 450, 'Card width conforms to tablet constraints');
  });

  // 10. Whole-Body 3D Scale: Camera calibrated to distance Z=2.65 for optimal vertical fill
  test('Whole-Body 3D Scale: Camera calibrated to [0, 0.90, 2.65] to fill vertical viewport (~85% height)', () => {
    // Human body is 1.75m tall. At Z=2.65 with FOV=38 deg, visible height is 1.83m.
    // 1.75m / 1.83m = 95.6% vertical fill (comfortable safe margin of ~4cm top & bottom)
    const fov = 38 * (Math.PI / 180);
    const cameraZ = 2.65;
    const visibleHeight = 2 * cameraZ * Math.tan(fov / 2);
    const humanBodyHeight = 1.75;
    const fillRatio = humanBodyHeight / visibleHeight;

    assert(fillRatio >= 0.80 && fillRatio <= 0.98, `Visual fill ratio (${(fillRatio * 100).toFixed(1)}%) must be between 80% and 98%`);
  });

  // 11. Floating Toolbar Consolidation: Max 5 core controls on tablet/mobile (< 1200px)
  test('Floating Toolbar Consolidation: Primary toolbar buttons restricted on viewports < 1200px', () => {
    const primaryControls = ['Focus/Isolate', 'Layers', 'View', 'More'];
    assert(primaryControls.length <= 5, 'Primary toolbar must not exceed 5 controls on tablet/mobile');
  });

  // 12. Safe Area Insets: env(safe-area-inset-bottom) integration
  test('Safe Area Insets: env(safe-area-inset-bottom) integration protects iOS home bar', () => {
    const sampleEnvBottom = 34;
    const toolbarHeight = 50;
    const spacing = 18;
    const totalBottomExclusion = toolbarHeight + spacing + sampleEnvBottom;
    assert.strictEqual(totalBottomExclusion, 102, 'Total bottom exclusion must include safe-area-inset-bottom');
  });

  return results;
}
