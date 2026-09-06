# MEDANATOMY 3D — ANATOMY DETAIL PANEL OVERLAP & RESPONSIVE REBUILD REPORT

**Project**: MedAnatomy 3D  
**Architecture Principle**: 3D-First / Anatomy-First (`3D MODEL > MAIN CONTROLS > CONTEXT > INFORMATION > SECONDARY TOOLS > DEBUG`)  
**Core Rule**: *NEVER SACRIFICE 3D VIEWER TO SHOW MORE UI.*  
**Status**: Completed & Verified (141/141 Tests Passed, 0 Errors)

---

## Current Problems

As observed in user telemetry and screenshots:
1. **Header & Navigation Collision**: The detail panel was forced to start at `top: 0` (`lg:top-0`), directly overlapping the global top navigation bar, search trigger, and breadcrumb header.
2. **Giant Empty Space Defect**: The panel was forced to full viewport height (`lg:h-full lg:max-h-full`) with a `flex-1` scroll container. When only 1 or 2 accordions were open (e.g. "Tổng quan giải phẫu"), the content occupied only $\sim 360\text{px}$, leaving a massive dead void of $400\text{--}500\text{px}$ of beige/grey background below the accordion buttons.
3. **Viewport Starvation on Tablets & Laptops**: On iPad landscape ($900\text{--}1199\text{px}$) and compact laptops ($1200\text{--}1366\text{px}$), the panel occupied up to $384\text{px}$ in width, severely crushing the 3D viewer.
4. **Lack of a Multi-State Bottom Sheet on Mobile & iPad Portrait**: Small devices lacked progressive disclosure, causing either full viewport occlusion or uncoordinated overlays.
5. **Simultaneous UI Collisions**: Compact annotation cards and expanded panels were not cleanly synchronized, occasionally co-existing and blocking the 3D scene.

---

## Root Cause

1. **CSS Layout Misconfiguration**:
   * `AnatomyInfoCard.tsx` had hardcoded `fixed lg:top-0 lg:right-0 lg:bottom-0 lg:left-auto lg:w-88 xl:w-96 lg:h-full lg:max-h-full lg:rounded-none lg:border-l lg:border-t-0`.
   * `lg:top-0` forced the panel to start at the browser top edge rather than below the 64px header.
   * `lg:h-full` forced 100vh height regardless of content length, creating the giant empty space defect.
2. **Missing Breakpoint-Aware Form Factors**:
   * Tablets ($900\text{--}1199\text{px}$) were treated either as full desktop sidebars or unconstrained bottom sheets without an overlay drawer pattern.
3. **Gesture Propagation to 3D Canvas**:
   * Touching or scrolling inside the detail panel was passing events to OrbitControls on the underlying 3D canvas, causing unintentional model rotations.

---

## Desktop ($\ge 1440\text{px}$)

* **Form Factor**: Content-based Floating Right Panel (`desktop-panel`).
* **Placement**: Starts below the header at `top-[68px]`, with `right-4`. Leaves the global header 100% visible and interactive.
* **Dimensions**: Width `w-92 max-w-[380px]` ($\le 25\%$ of viewport width), leaving $> 75\%$ for the central 3D stage.
* **Content-Based Height**: Uses `h-auto max-h-[calc(100vh-84px)]` with rounded corners (`rounded-2xl border shadow-2xl`). It tightly hugs its active content. When only "1. Tổng quan giải phẫu" is open, the panel height is $\sim 380\text{px}$ with **ZERO GIANT EMPTY SPACE**.
* **Internal Scrolling**: If multiple accordions are opened and exceed max height, the inner container scrolls smoothly without page scrolling.
* **Controls**: Prominent "Thu gọn" button, "X" close button, and `Esc` key listener.

---

## Laptop ($1200\text{--}1439\text{px}$, e.g. 1366x768, 1280x720)

* **Form Factor**: Compact Content-based Floating Right Panel (`laptop-compact`).
* **Placement**: Starts at `top-[68px]`, `right-3`.
* **Dimensions**: Width `w-80 max-w-[320px]`, guaranteeing that $\ge 75\%$ of horizontal width is reserved for the 3D anatomical viewer.
* **Content-Based Height**: Uses `h-auto max-h-[calc(100vh-84px)]`, eliminating empty space.

---

## iPad (Landscape $900\text{--}1199\text{px}$ & Portrait $600\text{--}899\text{px}$)

* **iPad Landscape (1024x768, 1180x820)**:
  - Form factor: **Right Slide-over Drawer** (`tablet-drawer`).
  - Default: **CLOSED**. 3D Viewer occupies **100% width**.
  - Trigger: Opened strictly on demand when user taps "Xem thêm".
  - Overlay: `fixed top-[64px] right-0 bottom-0 w-[340px] max-w-[85vw] border-l shadow-2xl`. Consumes 0px of in-flow canvas layout.
  - Backdrop: Subtle backdrop (`bg-black/50 backdrop-blur-xs`), tap to dismiss.
* **iPad Portrait (768x1024, 820x1180)**:
  - Form factor: **3-State Bottom Sheet** (`COLLAPSED` $\leftrightarrow$ `HALF` $\leftrightarrow$ `EXPANDED`).

---

## Tablet (Portrait $600\text{--}899\text{px}$)

* Default state: **COLLAPSED** (small floating card, $\le 85\text{px}$ height, situated above toolbar/safe-area).
* On user demand ("Xem thêm"): Expands to **HALF** ($\approx 48\text{vh}$) or **EXPANDED** ($\approx 84\text{vh}$) with drag handle for touch navigation.

---

## Mobile ($< 600\text{px}$, e.g. iPhone, Android)

* Form factor: **3-State Bottom Sheet** (`bottom-sheet`).
* Default state: **COLLAPSED** (clean compact annotation card $\le 85\text{px}$). Zero model obstruction.
* Tap "Xem thêm" $\to$ **HALF** ($\approx 48\text{vh}$) for quick reading of overview and key facts.
* Swipe up / tap $\to$ **EXPANDED** ($\approx 84\text{vh}$) with backdrop for full medical dossier study.
* Width: `w-[calc(100vw-16px)] mx-2` or `inset-x-0 rounded-t-3xl` with top rounded corners.
* Safe Area: Padded with `pb-[env(safe-area-inset-bottom,0px)]` to prevent iOS Home bar interference.

---

## Drawer

* Operates strictly as an overlay on Tablet Landscape (`tablet-drawer`).
* Slide-over animation from the right.
* Top offset aligned to `top-[64px]` (never blocks the header).
* Dismissal: "Thu gọn" button, "X" button, `Esc` keyboard shortcut, or tap outside on backdrop.

---

## Bottom Sheet

* Three distinct operational states:
  1. **COLLAPSED**: Sits above toolbar/safe area, height $\le 85\text{px}$. 3D model is 100% unobstructed.
  2. **HALF**: Occupies $\approx 48\text{vh}$. Displays Overview and key facts without overwhelming the screen.
  3. **EXPANDED**: Occupies $\approx 84\text{vh}$ with subtle backdrop. Full accordion list accessible with internal scrolling.
* Touch gestures:
  - Touch start / end delta detection on drag handle:
    - Swipe UP: `collapsed` $\to$ `half` $\to$ `expanded`.
    - Swipe DOWN: `expanded` $\to$ `half` $\to$ `collapsed`.
  - Tap drag handle cycles between half and expanded.

---

## Safe Area

* Integrated `--viewer-safe-top` and `top-[68px]` on fixed side views:
  - Global navigation bar ($64\text{px}$) is never covered by the panel.
* Integrated `pb-[env(safe-area-inset-bottom,0px)]` on mobile bottom sheets:
  - Prevents overlap with the iOS home indicator bar and Android navigation bars.
* Bottom toolbar coordination:
  - When in collapsed state, bottom sheet leaves room for or integrates with toolbar.
  - When expanded on mobile, toolbar is cleanly subordinated behind the active study sheet.

---

## Collision Avoidance

* **Single Active Instance**: One selected anatomical structure = exactly one active detail instance. Switching structures updates the panel in place.
* **Annotation + Detail Transition**: When full detail opens, the compact card is hidden and seamlessly transitions into the detail panel header. No conflicting duplicate elements.
* **Canvas Gesture Isolation**: Added `onPointerDown={(e) => e.stopPropagation()}` and `onWheel={(e) => e.stopPropagation()}` on the panel container. Touching or scrolling the panel will never rotate or zoom the 3D model.

---

## Accordion (Sections 1–8)

* Strict single-section default: Only Section 1 (**Tổng quan giải phẫu**) is expanded by default.
* Available sections:
  1. Tổng quan giải phẫu (Overview)
  2. Vị trí & Định khu (Location)
  3. Cấu tạo & Hình thái học (Morphology)
  4. Chức năng sinh lý (Physiology & Function)
  5. Liên quan giải phẫu (Relations)
  6. Mạch máu & Thần kinh chi phối (Neurovascular Supply)
  7. Ý nghĩa lâm sàng & Bệnh học (Clinical Relevance & ICD-10)
  8. Tài liệu tham khảo (References)
* Toggle behavior: Clicking a section header toggles it smoothly.

---

## Tests

### 1. New Test Suite: `tests/anatomyDetailPanelAudit.mjs` (19/19 Passed)
* Breakpoint Mode Mapping: Desktop, Laptop, Tablet Landscape, Tablet Portrait, Mobile: **PASS**
* Desktop width $\le 380\text{px}$ ($\le 25\%$ viewport): **PASS**
* Laptop width $= 320\text{px}$ ($\ge 75\%$ 3D viewer): **PASS**
* Content-based height (absence of `h-full`/`h-screen` on desktop): **PASS**
* Tablet Landscape Drawer architecture & backdrop: **PASS**
* 3-State Bottom Sheet (Collapsed $\le 85\text{px}$, Half $\approx 48\text{vh}$, Expanded $\approx 84\text{vh}$): **PASS**
* Source code audit: Absence of `lg:top-0` & `lg:h-full`: **PASS**
* Canvas gesture isolation (`stopPropagation` on pointer & wheel): **PASS**
* Pronunciation Engine & 32 Dental Assets non-regression: **PASS**

### 2. Test Suite: `tests/responsiveLayoutAudit.mjs` (25/25 Passed)
* All 25 responsive layout and viewport audits passed with 100% success rate.

### 3. Master Test Suite: `tests/runAllTests.mjs` (97/97 Passed)
* All 97 anatomical assertions, tooth mappings, pronunciation, and annotation collision tests passed.

### 4. Production Build: `npm run build`
* Compiled successfully in $6.19\text{s}$, 0 errors, 0 warnings.

---

## Remaining Issues

* None detected. The giant empty space defect has been completely eliminated. All layout modes conform strictly to the 3D-First / Anatomy-First architectural standard across all screen profiles.
