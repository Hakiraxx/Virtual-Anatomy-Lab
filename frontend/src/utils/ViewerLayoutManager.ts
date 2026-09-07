/**
 * ============================================================================
 * MEDANATOMY 3D — VIEWER LAYOUT MANAGER
 * Unified Spatial Layout, Collision Avoidance & Safe Area Engine
 *
 * Concepts:
 * ViewerRoot
 *  ├── ViewerTopControls (TopControlsManager: Zone A + Zone B)
 *  ├── ViewerViewControls
 *  ├── AnatomyLabelsLayer (LabelLayoutManager: 3D Projection + Collision Engine)
 *  ├── AnnotationLayer (AnnotationPositioner: Safe Area + Gap Guarantee)
 *  └── ViewerBottomToolbar (ToolbarSafeArea: Protected Toolbar Zone)
 * ============================================================================
 */

import {
  measureViewerSafeArea,
  rectsIntersect,
  computeOptimalAnnotationPosition,
  getResponsiveCardDimensions
} from './AnnotationPositioner.ts';
import type {
  Rect2D,
  ViewerSafeArea
} from './AnnotationPositioner.ts';

export interface LayoutObstacle extends Rect2D {
  id: string;
  type: 'top-controls' | 'bottom-toolbar' | 'annotation-card' | 'panel' | 'label';
  priority?: number;
}

export interface RawProjectedLabel {
  id: string;
  nameVi: string;
  nameEn?: string;
  subtitle?: string;
  screenX: number;
  screenY: number;
  inFront: boolean;
  priority: number; // 1 = Selected, 2 = Critical, 3 = Context, 4 = Secondary
  width: number;
  height: number;
  isSelected?: boolean;
  isCritical?: boolean;
}

export interface PlacedLabel extends RawProjectedLabel {
  placedX: number;
  placedY: number;
  isVisible: boolean;
  isOffset: boolean;
  offsetX: number;
  offsetY: number;
}

// ============================================================================
// 1. TOP CONTROLS MANAGER (Zone A: Structure Nav + Zone B: View Controls)
// ============================================================================
export class TopControlsManager {
  public static getBounds(containerWidth: number): Rect2D {
    // Top Controls Stack: Top 10px to ~96px on desktop/tablet, centered horizontally
    const stackWidth = Math.min(containerWidth - 32, 860);
    const left = (containerWidth - stackWidth) / 2;
    return {
      left,
      right: left + stackWidth,
      top: 10,
      bottom: 96,
      width: stackWidth,
      height: 86
    };
  }
}

// ============================================================================
// 2. TOOLBAR SAFE AREA (Toolbar Always Wins, 24-32px Guaranteed Margin)
// ============================================================================
export class ToolbarSafeArea {
  public static readonly MIN_GAP = 24;
  public static readonly MAX_GAP = 32;
  public static readonly DEFAULT_GAP = 28;

  public static getBounds(containerWidth: number, containerHeight: number): Rect2D {
    // Sleek pill toolbar at bottom-3/bottom-4: height ~44px, bottom ~16px
    const toolbarHeight = 46;
    const toolbarBottom = 16;
    const top = containerHeight - toolbarBottom - toolbarHeight;
    const width = Math.min(containerWidth - 32, 520);
    const left = (containerWidth - width) / 2;

    return {
      left,
      right: left + width,
      top,
      bottom: containerHeight - toolbarBottom,
      width,
      height: toolbarHeight
    };
  }
}

// ============================================================================
// 3. LABEL LAYOUT MANAGER (Collision Avoidance & Priority Gating)
// ============================================================================
export class LabelLayoutManager {
  /**
   * Resolves screen-space placement for projected anatomical labels.
   * Enforces:
   * 1. Behind-camera culling
   * 2. Top-controls collision avoidance (pushes down)
   * 3. Bottom-toolbar collision avoidance (pushes up)
   * 4. Annotation-card collision avoidance (pushes aside or hides secondary)
   * 5. Pairwise label collision avoidance sorted by priority
   * 6. Context toggle & density limit
   */
  public static resolveLayout(
    labels: RawProjectedLabel[],
    obstacles: LayoutObstacle[],
    options: {
      containerWidth: number;
      containerHeight: number;
      showContext?: boolean;
      maxVisibleLabels?: number;
    }
  ): PlacedLabel[] {
    const { containerWidth, containerHeight, showContext = true, maxVisibleLabels = 5 } = options;

    // 1. Filter out behind-camera items
    let candidates = labels.filter((l) => l.inFront);

    // 2. If context is off, keep only Selected (1) and Critical (2)
    if (!showContext) {
      candidates = candidates.filter((l) => l.priority <= 2);
    }

    // 3. Sort by priority: 1 (Selected) > 2 (Critical) > 3 (Context) > 4 (Secondary)
    candidates.sort((a, b) => a.priority - b.priority);

    const placed: PlacedLabel[] = [];
    const placedBoxes: Rect2D[] = [];

    // Add fixed UI obstacles to collision list
    const activeObstacles: Rect2D[] = [...obstacles];

    let visibleCount = 0;

    for (const label of candidates) {
      // Density gate: if already showing maxVisibleLabels and label is not selected/critical, hide
      if (visibleCount >= maxVisibleLabels && label.priority > 2) {
        placed.push({
          ...label,
          placedX: label.screenX,
          placedY: label.screenY,
          isVisible: false,
          isOffset: false,
          offsetX: 0,
          offsetY: 0
        });
        continue;
      }

      let curX = label.screenX;
      let curY = label.screenY;
      let isOffset = false;
      let offsetX = 0;
      let offsetY = 0;

      // Keep within container padding [12px, containerWidth - 12px]
      const halfW = label.width / 2;
      const halfH = label.height / 2;
      curX = Math.max(halfW + 12, Math.min(containerWidth - halfW - 12, curX));
      curY = Math.max(halfH + 12, Math.min(containerHeight - halfH - 12, curY));

      let box: Rect2D = {
        left: curX - halfW,
        right: curX + halfW,
        top: curY - halfH,
        bottom: curY + halfH,
        width: label.width,
        height: label.height
      };

      // Check collision with top controls: push downwards
      for (const obs of activeObstacles) {
        if (rectsIntersect(box, obs, 6)) {
          if (obs.top < containerHeight * 0.25) {
            // Obstacle is in top zone: push down
            const shiftY = obs.bottom + halfH + 10 - curY;
            if (shiftY > 0) {
              curY += shiftY;
              offsetY += shiftY;
              isOffset = true;
            }
          } else if (obs.bottom > containerHeight * 0.75) {
            // Obstacle is in bottom zone: push up
            const shiftY = curY - (obs.top - halfH - 10);
            if (shiftY > 0) {
              curY -= shiftY;
              offsetY -= shiftY;
              isOffset = true;
            }
          } else {
            // Obstacle in center/side: push horizontally
            if (curX < containerWidth / 2) {
              const shiftX = curX - (obs.left - halfW - 10);
              curX -= Math.max(16, shiftX);
              offsetX -= Math.max(16, shiftX);
            } else {
              const shiftX = obs.right + halfW + 10 - curX;
              curX += Math.max(16, shiftX);
              offsetX += Math.max(16, shiftX);
            }
            isOffset = true;
          }

          // Recompute box after obstacle shift
          box = {
            left: curX - halfW,
            right: curX + halfW,
            top: curY - halfH,
            bottom: curY + halfH,
            width: label.width,
            height: label.height
          };
        }
      }

      // Check pairwise collisions with previously placed higher-priority labels
      let collidesWithPlaced = false;
      for (const pBox of placedBoxes) {
        if (rectsIntersect(box, pBox, 4)) {
          collidesWithPlaced = true;
          // Try nudging down
          const newY = pBox.bottom + halfH + 8;
          if (newY + halfH <= containerHeight - 80) {
            offsetY += newY - curY;
            curY = newY;
            box = {
              left: curX - halfW,
              right: curX + halfW,
              top: curY - halfH,
              bottom: curY + halfH,
              width: label.width,
              height: label.height
            };
            isOffset = true;
            collidesWithPlaced = false;
          }
          break;
        }
      }

      // If still collides and label is secondary/context, suppress it
      if (collidesWithPlaced && label.priority >= 3) {
        placed.push({
          ...label,
          placedX: curX,
          placedY: curY,
          isVisible: false,
          isOffset,
          offsetX,
          offsetY
        });
        continue;
      }

      // Successfully placed
      placedBoxes.push(box);
      placed.push({
        ...label,
        placedX: curX,
        placedY: curY,
        isVisible: true,
        isOffset,
        offsetX,
        offsetY
      });
      visibleCount++;
    }

    return placed;
  }
}

// ============================================================================
// 4. DRAWER & RESPONSIVE MANAGER (Desktop Panel vs Tablet/Mobile Drawer)
// ============================================================================
export class DrawerManager {
  public static getDetailMode(viewportWidth: number): 'panel' | 'drawer' | 'bottom-sheet' {
    if (viewportWidth >= 1200) return 'panel';
    if (viewportWidth >= 768) return 'drawer';
    return 'bottom-sheet';
  }
}

// ============================================================================
// 5. MASTER VIEWER LAYOUT MANAGER
// ============================================================================
export class ViewerLayoutManager {
  public static topControls = TopControlsManager;
  public static toolbar = ToolbarSafeArea;
  public static labels = LabelLayoutManager;
  public static annotation = {
    measureSafeArea: measureViewerSafeArea,
    computePosition: computeOptimalAnnotationPosition,
    getDimensions: getResponsiveCardDimensions
  };
  public static drawer = DrawerManager;
}
