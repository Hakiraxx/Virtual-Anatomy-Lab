/**
 * DetailPanelPositioner.ts
 *
 * Intelligent positioning and layout mode engine for the Anatomy Detail Panel.
 * Enforces 3D-first viewport primacy across Desktop, Laptop, iPad, Tablet, and Mobile devices.
 *
 * Rules:
 * 1. Desktop (>= 1440px): Floating right panel (w: 368px, max-w: 380px, top: 68px, content-based height)
 * 2. Laptop (1200-1439px): Compact right panel (w: 320px, top: 68px, content-based height)
 * 3. Tablet Landscape (900-1199px): Overlay slide-over drawer from right (w: 340px, top: 64px)
 * 4. Tablet Portrait (600-899px) & Mobile (< 600px): 3-State Bottom Sheet (collapsed, half, expanded)
 * 5. NO GIANT EMPTY SPACE: Content-based height calculation ensures panel hugs content when compact.
 * 6. NO OVERLAP WITH HEADER: Top margin >= 64px on all fixed side views.
 */

export type DetailPanelMode = 'desktop-panel' | 'laptop-compact' | 'tablet-drawer' | 'bottom-sheet';

export type BottomSheetState = 'collapsed' | 'half' | 'expanded';

export interface DetailPanelMetrics {
  mode: DetailPanelMode;
  width: number;
  widthCss: string;
  maxHeightCss: string;
  topOffset: number;
  bottomOffset: number;
  isOverlay: boolean;
  hasBackdrop: boolean;
  canTouchDrag: boolean;
}

/**
 * Resolves the ergonomic detail panel layout mode based on viewport width.
 */
export function resolveDetailPanelMode(viewportWidth: number): DetailPanelMode {
  if (viewportWidth >= 1440) {
    return 'desktop-panel';
  }
  if (viewportWidth >= 1200) {
    return 'laptop-compact';
  }
  if (viewportWidth >= 900) {
    return 'tablet-drawer';
  }
  return 'bottom-sheet';
}

/**
 * Computes exact dimensions and safe bounds for the Anatomy Detail Panel.
 */
export function computeDetailPanelMetrics(
  viewportWidth: number,
  viewportHeight: number,
  sheetState: BottomSheetState = 'collapsed'
): DetailPanelMetrics {
  const mode = resolveDetailPanelMode(viewportWidth);
  const headerHeight = 64;
  const safeTop = headerHeight + 4; // 68px top margin on desktop/laptop

  switch (mode) {
    case 'desktop-panel':
      return {
        mode,
        width: Math.min(380, Math.round(viewportWidth * 0.25)),
        widthCss: 'w-92 max-w-[380px]',
        maxHeightCss: `max-h-[calc(100vh-${safeTop + 16}px)]`,
        topOffset: safeTop,
        bottomOffset: 16,
        isOverlay: false,
        hasBackdrop: false,
        canTouchDrag: false
      };

    case 'laptop-compact':
      return {
        mode,
        width: 320,
        widthCss: 'w-80 max-w-[320px]',
        maxHeightCss: `max-h-[calc(100vh-${safeTop + 16}px)]`,
        topOffset: safeTop,
        bottomOffset: 16,
        isOverlay: false,
        hasBackdrop: false,
        canTouchDrag: false
      };

    case 'tablet-drawer':
      return {
        mode,
        width: Math.min(360, Math.round(viewportWidth * 0.38)),
        widthCss: 'w-[340px] max-w-[85vw]',
        maxHeightCss: `h-[calc(100vh-${headerHeight}px)]`,
        topOffset: headerHeight,
        bottomOffset: 0,
        isOverlay: true,
        hasBackdrop: true,
        canTouchDrag: false
      };

    case 'bottom-sheet':
    default: {
      const isMobile = viewportWidth < 600;
      const widthCss = isMobile ? 'w-[calc(100vw-16px)] mx-2' : 'w-[calc(100vw-32px)] max-w-lg mx-auto';
      
      let maxHeightCss = 'max-h-[85px]'; // Collapsed state
      if (sheetState === 'half') {
        maxHeightCss = 'max-h-[48vh]';
      } else if (sheetState === 'expanded') {
        maxHeightCss = 'max-h-[84vh]';
      }

      return {
        mode: 'bottom-sheet',
        width: isMobile ? viewportWidth - 16 : Math.min(512, viewportWidth - 32),
        widthCss,
        maxHeightCss,
        topOffset: 0,
        bottomOffset: 0,
        isOverlay: sheetState !== 'collapsed',
        hasBackdrop: sheetState === 'expanded',
        canTouchDrag: true
      };
    }
  }
}
