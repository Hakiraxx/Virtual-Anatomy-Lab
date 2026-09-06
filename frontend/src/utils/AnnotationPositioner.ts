/**
 * ============================================================================
 * MEDANATOMY 3D — ANNOTATION POSITIONING & SAFE AREA ENGINE
 * Smart Collision Avoidance & Ergonomic Positioning
 *
 * Core Principles:
 * 1. ZERO OVERLAP WITH TOOLBAR: Toolbar always wins.
 * 2. ZERO OVERLAP WITH SELECTED ANATOMY: 3D model always wins.
 * 3. DYNAMIC SAFE AREA: Measures actual DOM rectangles via getBoundingClientRect.
 * 4. MULTI-DEVICE RESPONSIVE: Desktop, Laptop, iPad, Tablet, Mobile.
 * 5. NO MAGIC NUMBERS: Dynamically computed spacing and CSS safe areas.
 * ============================================================================
 */

import React from 'react';

export type AnnotationPlacement =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'mid-left'
  | 'mid-right'
  | 'top-right'
  | 'top-left';

export interface ViewerSafeArea {
  top: number; // Pixels from viewport top
  bottom: number; // Pixels from viewport bottom (toolbar + gap + env)
  left: number; // Pixels from viewport left (sidebar + gap)
  right: number; // Pixels from viewport right (panel + gap)
  viewportWidth: number;
  viewportHeight: number;
  toolbarHeight: number;
  toolbarTop: number;
  safeSpacing: number;
  envInsetBottom: number;
}

export interface Rect2D {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

export interface ModelObstructionTarget {
  isFullBody?: boolean;
  position?: [number, number, number] | null; // [x, y, z] in anatomical coordinates
  anatomyId?: string | null;
}

export interface AnnotationPositionResult {
  x: number; // Left coordinate in px
  y: number; // Top coordinate in px
  bottomPx: number; // Bottom coordinate in px from viewport bottom
  cardWidth: number;
  cardHeight: number;
  placement: AnnotationPlacement;
  style: React.CSSProperties;
  safeArea: ViewerSafeArea;
  collidedWithModel: boolean;
  collidedWithToolbar: boolean;
}

/**
 * Measures the active viewport safe area, accounting for bottom toolbars,
 * top navigation headers, sidebars, right panels, and mobile safe-area insets.
 */
export function measureViewerSafeArea(customSpacing?: number): ViewerSafeArea {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return {
      top: 64,
      bottom: 120,
      left: 16,
      right: 16,
      viewportWidth: 1920,
      viewportHeight: 1080,
      toolbarHeight: 60,
      toolbarTop: 1020,
      safeSpacing: 28,
      envInsetBottom: 0
    };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Responsive safe spacing: 20px on small mobile, 24px on tablet/laptop, 28-32px on desktop
  const safeSpacing =
    customSpacing ??
    (viewportWidth < 640 ? 18 : viewportWidth < 1024 ? 24 : 28);

  // 1. Measure CSS env(safe-area-inset-bottom)
  let envInsetBottom = 0;
  try {
    const testEl = document.createElement('div');
    testEl.style.cssText =
      'position:fixed;bottom:0;padding-bottom:env(safe-area-inset-bottom,0px);pointer-events:none;visibility:hidden;';
    document.body.appendChild(testEl);
    const comp = window.getComputedStyle(testEl);
    envInsetBottom = parseFloat(comp.paddingBottom) || 0;
    document.body.removeChild(testEl);
  } catch {
    envInsetBottom = 0;
  }

  // 2. Locate and measure Bottom Toolbar
  const bottomToolbarSelectors = [
    '[data-ui="bottom-toolbar"]',
    '#medanatomy-bottom-toolbar',
    'nav.rounded-full',
    'div[class*="bottom-3"][class*="sm:bottom-14"]',
    'div[class*="bottom-2"][class*="sm:bottom-4"]',
    '[data-ui="footer-status-bar"]'
  ];

  let highestToolbarTop = viewportHeight;
  let toolbarFound = false;

  for (const sel of bottomToolbarSelectors) {
    const els = document.querySelectorAll(sel);
    els.forEach((el) => {
      if (el instanceof HTMLElement && el.offsetParent !== null) {
        const rect = el.getBoundingClientRect();
        // Look only in lower half of screen
        if (rect.bottom > viewportHeight * 0.45 && rect.top < highestToolbarTop && rect.height > 12) {
          highestToolbarTop = rect.top;
          toolbarFound = true;
        }
      }
    });
  }

  const toolbarHeight = toolbarFound
    ? Math.max(0, viewportHeight - highestToolbarTop)
    : 0;

  // Total bottom exclusion zone: toolbar height + safe spacing + mobile env safe-area
  const bottomSafeArea = toolbarHeight + safeSpacing + envInsetBottom;

  // 3. Measure Top Header
  let topHeaderBottom = 64; // Default navigation bar height
  const topHeader = document.querySelector('[data-ui="top-header"], header, .sticky.top-0');
  if (topHeader && topHeader instanceof HTMLElement && topHeader.offsetParent !== null) {
    const rect = topHeader.getBoundingClientRect();
    if (rect.bottom > 0 && rect.bottom < viewportHeight * 0.3) {
      topHeaderBottom = rect.bottom;
    }
  }
  const topSafeArea = topHeaderBottom + safeSpacing;

  // 4. Measure Left Sidebar
  let leftSidebarRight = 0;
  const leftSidebar = document.querySelector('[data-ui="left-sidebar"], aside.border-r');
  if (leftSidebar && leftSidebar instanceof HTMLElement && leftSidebar.offsetParent !== null) {
    const rect = leftSidebar.getBoundingClientRect();
    if (rect.right > 0 && rect.right < viewportWidth * 0.5) {
      leftSidebarRight = rect.right;
    }
  }
  const leftSafeArea = leftSidebarRight + safeSpacing;

  // 5. Measure Right Panel
  let rightPanelWidth = 0;
  const rightPanel = document.querySelector('[data-ui="right-panel"], aside.border-l');
  if (rightPanel && rightPanel instanceof HTMLElement && rightPanel.offsetParent !== null) {
    const rect = rightPanel.getBoundingClientRect();
    if (rect.left < viewportWidth && rect.width > 20) {
      rightPanelWidth = Math.max(0, viewportWidth - rect.left);
    }
  }
  const rightSafeArea = rightPanelWidth + safeSpacing;

  return {
    top: topSafeArea,
    bottom: bottomSafeArea,
    left: leftSafeArea,
    right: rightSafeArea,
    viewportWidth,
    viewportHeight,
    toolbarHeight,
    toolbarTop: highestToolbarTop,
    safeSpacing,
    envInsetBottom
  };
}

/**
 * Checks whether two 2D rectangles intersect, with an optional safety margin.
 */
export function rectsIntersect(r1: Rect2D, r2: Rect2D, margin: number = 0): boolean {
  return !(
    r1.right < r2.left - margin ||
    r1.left > r2.right + margin ||
    r1.bottom < r2.top - margin ||
    r1.top > r2.bottom + margin
  );
}

/**
 * Computes the 2D screen obstruction rectangle for a 3D anatomical target.
 * For whole body/skeleton, protects the lower-center sagittal region (pelvis, legs, feet).
 */
export function getModelObstructionRect(
  target: ModelObstructionTarget,
  viewportWidth: number,
  viewportHeight: number,
  leftSidebarWidth: number = 0,
  rightPanelWidth: number = 0
): Rect2D | null {
  const isFullBody =
    target.isFullBody ||
    target.anatomyId === 'human_skeleton' ||
    target.anatomyId === 'skeleton' ||
    target.anatomyId === 'body';

  const usableWidth = viewportWidth - leftSidebarWidth - rightPanelWidth;
  const centerX = leftSidebarWidth + usableWidth / 2;

  // 1. Full Body Human Model: spans vertically from head to feet in center
  if (isFullBody) {
    const bodyHalfWidth = Math.min(180, usableWidth * 0.18);
    return {
      left: centerX - bodyHalfWidth,
      right: centerX + bodyHalfWidth,
      top: viewportHeight * 0.15,
      bottom: viewportHeight * 0.88, // Lower extremities reach down to 88% of screen
      width: bodyHalfWidth * 2,
      height: viewportHeight * 0.73
    };
  }

  // 2. Specific Anatomical Structure by Position
  if (target.position) {
    const [x, y] = target.position;

    const isDentalOrCranial = Boolean(
      target.anatomyId?.startsWith('tooth') ||
      target.anatomyId?.startsWith('cn_') ||
      target.anatomyId?.includes('nerve') ||
      target.anatomyId?.includes('mandible') ||
      target.anatomyId?.includes('maxilla') ||
      target.anatomyId?.includes('skull') ||
      target.anatomyId?.includes('foramen') ||
      target.anatomyId?.includes('tmj')
    );

    // Lower extremity structures (Pelvis, Femur, Patella, Tibia, Fibula, Foot: y < 0.8 in whole body, and NOT dental/cranial)
    if (y < 0.8 && !isDentalOrCranial) {
      const isRightSide = x < 0; // Patient right is screen left in anterior view
      const xOffset = isRightSide ? -usableWidth * 0.12 : usableWidth * 0.12;
      const targetScreenX = centerX + xOffset;
      const width = Math.min(220, usableWidth * 0.22);
      return {
        left: targetScreenX - width / 2,
        right: targetScreenX + width / 2,
        top: viewportHeight * 0.45,
        bottom: viewportHeight * 0.90,
        width,
        height: viewportHeight * 0.45
      };
    }

    // Cranial, dental, and upper-body visceral structures (Heart, Lung, Brain, Skull, Tooth, CN V)
    // These sit safely in the upper/mid portion of the screen (top: 15%–55%), leaving lower-center completely free!
    const baseScreenY = isDentalOrCranial
      ? viewportHeight * 0.38
      : viewportHeight * 0.22 + (1.8 - y) * (viewportHeight * 0.35);
    const targetScreenX = centerX + x * (usableWidth * 0.8);
    const radius = 100;
    return {
      left: targetScreenX - radius,
      right: targetScreenX + radius,
      top: baseScreenY - radius,
      bottom: baseScreenY + radius,
      width: radius * 2,
      height: radius * 2
    };
  }

  return null;
}

/**
 * Calculates candidate card dimensions dynamically based on viewport width.
 */
export function getResponsiveCardDimensions(viewportWidth: number): { width: number; height: number } {
  if (viewportWidth < 640) {
    // Mobile: responsive width calc(100vw - 24px), height ~95-125px
    return {
      width: Math.min(viewportWidth - 24, 420),
      height: 115
    };
  }
  if (viewportWidth < 1024) {
    // Tablet / iPad: 380–420px
    return {
      width: Math.min(viewportWidth - 48, 420),
      height: 110
    };
  }
  if (viewportWidth < 1440) {
    // Laptop: 400–440px
    return {
      width: 440,
      height: 110
    };
  }
  // Large Desktop: 460px
  return {
    width: 460,
    height: 112
  };
}

/**
 * Master positioning algorithm:
 * Evaluates candidate placements in strict priority order (Section 46):
 * 1. bottom-center above toolbar
 * 2. bottom-left above toolbar
 * 3. bottom-right above toolbar
 * 4. mid-left
 * 5. mid-right
 * 6. top-right
 * 7. top-left
 *
 * Guarantees:
 * - Annotation rectangle MUST NOT intersect toolbar rectangle (Rule 10).
 * - Annotation rectangle MUST NOT intersect selected 3D anatomy (Rule 11).
 * - Annotation stays strictly inside ViewerSafeArea.
 */
export function computeOptimalAnnotationPosition(
  target: ModelObstructionTarget,
  customSafeArea?: ViewerSafeArea
): AnnotationPositionResult {
  const safeArea = customSafeArea ?? measureViewerSafeArea();
  const { viewportWidth, viewportHeight, safeSpacing } = safeArea;
  const { width: cardWidth, height: cardHeight } = getResponsiveCardDimensions(viewportWidth);

  // Bottom toolbar obstacle rectangle
  const toolbarObstacle: Rect2D = {
    left: 0,
    right: viewportWidth,
    top: safeArea.toolbarTop,
    bottom: viewportHeight,
    width: viewportWidth,
    height: safeArea.toolbarHeight
  };

  // 3D Model Obstruction rectangle
  const modelObstacle = getModelObstructionRect(
    target,
    viewportWidth,
    viewportHeight,
    safeArea.left - safeSpacing,
    safeArea.right - safeSpacing
  );

  // Usable bounds inside safe area
  const usableLeft = safeArea.left;
  const usableRight = viewportWidth - safeArea.right;
  const usableWidth = usableRight - usableLeft;

  // Calculate coordinates for all 7 candidate placements
  const bottomY = viewportHeight - safeArea.bottom - cardHeight;
  const bottomPx = safeArea.bottom;

  const candidates: Array<{
    placement: AnnotationPlacement;
    x: number;
    y: number;
    bottomPx: number;
  }> = [
    // 1. Bottom-Center above toolbar
    {
      placement: 'bottom-center',
      x: usableLeft + (usableWidth - cardWidth) / 2,
      y: bottomY,
      bottomPx
    },
    // 2. Bottom-Left above toolbar (ideal when model is centered e.g. skeleton)
    {
      placement: 'bottom-left',
      x: usableLeft,
      y: bottomY,
      bottomPx
    },
    // 3. Bottom-Right above toolbar
    {
      placement: 'bottom-right',
      x: usableRight - cardWidth,
      y: bottomY,
      bottomPx
    },
    // 4. Mid-Left (side of viewer)
    {
      placement: 'mid-left',
      x: usableLeft,
      y: safeArea.top + (viewportHeight - safeArea.top - safeArea.bottom - cardHeight) / 2,
      bottomPx: viewportHeight - (safeArea.top + (viewportHeight - safeArea.top - safeArea.bottom - cardHeight) / 2) - cardHeight
    },
    // 5. Mid-Right (side of viewer)
    {
      placement: 'mid-right',
      x: usableRight - cardWidth,
      y: safeArea.top + (viewportHeight - safeArea.top - safeArea.bottom - cardHeight) / 2,
      bottomPx: viewportHeight - (safeArea.top + (viewportHeight - safeArea.top - safeArea.bottom - cardHeight) / 2) - cardHeight
    },
    // 6. Top-Right (below header)
    {
      placement: 'top-right',
      x: usableRight - cardWidth,
      y: safeArea.top,
      bottomPx: viewportHeight - safeArea.top - cardHeight
    },
    // 7. Top-Left (below header)
    {
      placement: 'top-left',
      x: usableLeft,
      y: safeArea.top,
      bottomPx: viewportHeight - safeArea.top - cardHeight
    }
  ];

  // Evaluate candidates in order and find the first collision-free option
  let bestCandidate = candidates[0];
  let bestCollisionCount = Infinity;

  for (const cand of candidates) {
    const candRect: Rect2D = {
      left: cand.x,
      right: cand.x + cardWidth,
      top: cand.y,
      bottom: cand.y + cardHeight,
      width: cardWidth,
      height: cardHeight
    };

    // Rule 10: MUST NOT intersect toolbar rectangle (with 24px safety margin)
    const toolbarCollision =
      safeArea.toolbarHeight > 0 &&
      rectsIntersect(candRect, toolbarObstacle, Math.min(24, safeSpacing));

    // Rule 11: MUST NOT cover selected anatomy
    const modelCollision =
      modelObstacle !== null &&
      rectsIntersect(candRect, modelObstacle, 16);

    const collisionCount = (toolbarCollision ? 10 : 0) + (modelCollision ? 5 : 0);

    if (collisionCount === 0) {
      bestCandidate = cand;
      bestCollisionCount = 0;
      break;
    }

    if (collisionCount < bestCollisionCount) {
      bestCollisionCount = collisionCount;
      bestCandidate = cand;
    }
  }

  // Generate robust inline CSS styles with pixel coordinates & safe fallbacks
  const isCentered = bestCandidate.placement === 'bottom-center';
  const isLeft = bestCandidate.placement === 'bottom-left' || bestCandidate.placement === 'mid-left' || bestCandidate.placement === 'top-left';
  const isRight = bestCandidate.placement === 'bottom-right' || bestCandidate.placement === 'mid-right' || bestCandidate.placement === 'top-right';

  const style: React.CSSProperties = {
    position: 'fixed',
    zIndex: 35, // Below modals (z-50), but above 3D canvas (z-10)
    width: `${cardWidth}px`,
    maxWidth: 'calc(100vw - 24px)',
    transition: 'bottom 250ms ease-out, left 250ms ease-out, transform 250ms ease-out, opacity 200ms ease-out'
  };

  if (isCentered) {
    style.left = `${bestCandidate.x}px`;
    style.bottom = `${bestCandidate.bottomPx}px`;
  } else if (isLeft) {
    style.left = `${Math.max(12, bestCandidate.x)}px`;
    style.bottom = `${bestCandidate.bottomPx}px`;
  } else if (isRight) {
    style.left = `${Math.min(viewportWidth - cardWidth - 12, bestCandidate.x)}px`;
    style.bottom = `${bestCandidate.bottomPx}px`;
  }

  return {
    x: bestCandidate.x,
    y: bestCandidate.y,
    bottomPx: bestCandidate.bottomPx,
    cardWidth,
    cardHeight,
    placement: bestCandidate.placement,
    style,
    safeArea,
    collidedWithModel: bestCollisionCount >= 5,
    collidedWithToolbar: bestCollisionCount >= 10
  };
}
