# MEDANATOMY 3D — DENTAL 3D VIEW TRANSITION & VISIBILITY SYNCHRONIZATION ROOT CAUSE REPORT

**Module:** `/lab/dental-neuroanatomy`  
**Critical Path:** `R48 → R38 → Mandible → IAN → Lingual Nerve → Mandibular Canal → Mental Foramen`  
**Status:** **RESOLVED & 100% VERIFIED**  
**Audit Suite Results:** **214 Passed / 0 Failed across 13 test suites**  

---

## 1. Exact Reproduction of the Issue

### Observed Symptoms
During interactive navigation on `/lab/dental-neuroanatomy` (and `/lab/dental-neuroanatomy?specimen=wisdom_surgery&structure=tooth.48`):
1. **Camera Shooting into Empty Sky ($Y \approx 1.34\text{m}$)**:
   - When the user clicked on **TK Huyệt răng dưới (IAN)** (`nerve_ian`) or **Lỗ cằm (Mental Foramen)** (`mental_foramen`), the 3D model abruptly vanished from the viewport.
   - While the UI title card, side panel, and breadcrumbs correctly indicated the selected structure, the 3D canvas became blank grey space.
2. **Clipping / Teleportation during rapid navigation**:
   - Rapidly toggling between `R48` and `R38` or between `Mandible` and `Lingual Nerve` caused the camera to stutter, jerk backwards, or stop midway between two unrelated viewpoints.
3. **Ghost / Invisible Geometry Focus**:
   - If the user was in standard exploration mode where cranial nerves or bone layers were hidden (`wisdomShowNerves: false` or `wisdomBoneOpacity: 0`), clicking on a nerve focused the camera onto empty transparent coordinates, making the user perceive that the 3D model had "disappeared".

---

## 2. Root Cause Analysis

Thorough architectural and mathematical tracing revealed **three interacting root causes**:

### Cause 1: 60cm Coordinate Space Mismatch ($Y=1.34\text{m}$ vs $Y=0.76\text{m}$)
- In MedAnatomy 3D, the canonical craniofacial/head coordinates (derived from the Master Z-Anatomy adult human space) place the skull and mandible at:
  $$\text{Mandible Centroid: } [0.0451, 0.7639, 0.0360]\text{ meters}$$
  $$\text{R48 Socket: } [0.0118, 0.7580, 0.0295]\text{ meters}$$
  $$\text{R38 Socket: } [0.0784, 0.7580, 0.0295]\text{ meters}$$
- However, in `frontend/src/stores/useDentalNeuroStore.ts`, the `focusAnatomy(id)` action handled tooth IDs and general mandible cases, but lacked dedicated branch handlers for `nerve_ian` and `mental_foramen`.
- Consequently, it fell back to legacy entries in `dentalNeuroData.ts`:
  - `DENTAL_NERVE_STRUCTURES['nerve_ian'].cameraFocus`: `position: [-0.08, 1.36, 0.18]`, `lookAt: [0.02, 1.34, 0.05]`
  - `CRANIAL_FORAMINA['mental_foramen'].cameraFocus`: `position: [-0.02, 1.33, 0.16]`, `lookAt: [0.02, 1.32, 0.07]`
- Because $Y = 1.34\text{m}$ is **60cm above the actual mandible** ($Y = 0.76\text{m}$), the camera instantly focused into empty sky 60cm above the head!

### Cause 2: Async Race Conditions & Unversioned Three.js Lerp Loops
- In both `WisdomSurgeryStage.tsx` and `DentalNeuro3DStage.tsx`, the camera controllers used `useFrame` interpolation.
- When users clicked multiple anatomical structures in rapid succession (e.g. `R48 → R38 → IAN`), every click dispatched a new state update with a new `cameraTarget`.
- The animation loop lacked request token invalidation. The in-flight lerp from the earlier click continued interpolating concurrently with the newer target, causing conflicting vector blends, jerky oscillations, or camera drift outside the viewport.

### Cause 3: Visibility Desynchronization
- In Three.js, moving the camera to frame an object does not guarantee that the object is rendered.
- If `wisdomShowNerves` was `false` or layer 6 (Nerves) had `layerVisibility[6] === false`, clicking `nerve_ian` positioned the camera directly in front of an invisible object.
- The user observed a blank canvas with no anatomical reference landmarks.

---

## 3. Camera Math & Coordinate Spaces Explained

### Unified Metric Coordinate System
All coordinates are strictly defined in **meters** within the Master Craniofacial Space:
- **X-axis (Sagittal axis)**: Midline is at $X = 0.0451\text{m}$.
  - Patient Right: $X < 0.0451\text{m}$ (e.g., Tooth 48 at $X = 0.0118\text{m}$)
  - Patient Left: $X > 0.0451\text{m}$ (e.g., Tooth 38 at $X = 0.0784\text{m}$)
- **Y-axis (Vertical axis)**: Inferior-superior position relative to origin.
  - Mandible lower border: $Y \approx 0.7167\text{m}$
  - Mandibular canal / IAN: $Y \approx 0.7478\text{m}$
  - Occlusal plane: $Y \approx 0.7580\text{m}$
  - Condyle head: $Y \approx 0.8111\text{m}$
- **Z-axis (Coronal / Anterior-Posterior axis)**:
  - Posterior (Mandibular condyle & Spix): $Z \approx -0.011\text{m}$ to $+0.010\text{m}$
  - Mid-mandible (Third molar sockets): $Z \approx +0.0295\text{m}$
  - Anterior (Mental foramen & Symphysis): $Z \approx +0.0672\text{m}$ to $+0.0830\text{m}$

### Optical Framing Formula
To eliminate guessing and hardcoded camera offsets, camera distance is computed dynamically from the target bounding sphere's radius $r$ and field of view $\theta$ ($30^\circ$):
$$d = \frac{r}{\tan(\theta / 2)}$$
To guarantee clinical visibility without clipping adjacent skull structures:
$$d_{\text{clamped}} = \max(d_{\min}, \min(d_{\max}, d))$$
- For single tooth / foramen: $d \in [0.045\text{m}, 0.180\text{m}]$ (4.5cm – 18cm)
- For full mandible: $d \in [0.160\text{m}, 0.300\text{m}]$ (16cm – 30cm)

### Normalized Directional Framing Vectors
Directional view vectors $\hat{\mathbf{v}}$ are strictly normalized unit vectors ($|\hat{\mathbf{v}}| = 1.0$), ensuring the actual camera-to-target Euclidean distance exactly equals $d_{\text{clamped}}$:
- **Default (Anterolateral-superior diagnostic view)**:
  $$\hat{\mathbf{v}} = (\pm 0.5535, 0.3522, 0.7547)$$
- **Occlusal (Superior table view)**:
  $$\hat{\mathbf{v}} = (0, 1.0, 0.001)$$
- **Buccal (Lateral cheek view)**:
  $$\hat{\mathbf{v}} = (\pm 0.9614, 0.0501, 0.2704)$$
- **Lingual (Medial oral floor view)**:
  $$\hat{\mathbf{v}} = (\mp 0.9524, 0.0501, -0.3008)$$

---

## 4. Canonical Bounding Boxes & Centroids Used

| Anatomical Structure | ID | Centroid $[X, Y, Z]$ (m) | Bounding Box $[\min_X, \min_Y, \min_Z] \to [\max_X, \max_Y, \max_Z]$ | Effective Radius (m) |
| :--- | :--- | :--- | :--- | :--- |
| **Tooth 48 (Răng khôn dưới phải)** | `tooth_48` | `[0.0118, 0.7580, 0.0295]` | `[0.0058, 0.7480, 0.0235]` $\to$ `[0.0178, 0.7640, 0.0355]` | $0.0120$ (12mm) |
| **Tooth 38 (Răng khôn dưới trái)** | `tooth_38` | `[0.0784, 0.7580, 0.0295]` | `[0.0724, 0.7480, 0.0235]` $\to$ `[0.0844, 0.7640, 0.0355]` | $0.0120$ (12mm) |
| **Mandible (Xương hàm dưới)** | `bone_mandible`| `[0.0451, 0.7639, 0.0360]` | `[-0.0142, 0.7167, -0.0110]` $\to$ `[0.1044, 0.8111, 0.0830]` | $0.0890$ (89mm) |
| **IAN Right (TK Huyệt răng dưới P)**| `nerve_ian` | `[0.0228, 0.7478, 0.0464]` | `[0.0024, 0.7219, 0.0086]` $\to$ `[0.0432, 0.7736, 0.0841]` | $0.0501$ (50mm) |
| **Lingual N. Right (TK Lưỡi P)** | `nerve_lingual`| `[0.0229, 0.7722, 0.0312]` | `[0.0109, 0.7522, 0.0162]` $\to$ `[0.0349, 0.7922, 0.0462]` | $0.0277$ (28mm) |
| **Mandibular Canal (Ống hàm dưới)** | `mandibular_canal`| `[0.0228, 0.7478, 0.0464]` | `[0.0024, 0.7219, 0.0086]` $\to$ `[0.0432, 0.7736, 0.0841]` | $0.0501$ (50mm) |
| **Mental Foramen Right (Lỗ cằm P)** | `mental_foramen`| `[0.0225, 0.7318, 0.0672]` | `[0.0145, 0.7238, 0.0592]` $\to$ `[0.0305, 0.7398, 0.0752]` | $0.0139$ (14mm) |
| **Spix / Mandibular Foramen P** | `mandibular_foramen`| `[0.0228, 0.7700, 0.0100]` | `[0.0148, 0.7620, 0.0020]` $\to$ `[0.0308, 0.7780, 0.0180]` | $0.0139$ (14mm) |

---

## 5. Visibility State Synchronization Explanation

Whenever a structure is selected via `selectAnatomy(id, side)` in `useDentalNeuroStore`:
1. **Neural Structures Guarantee**:
   - If `id` is one of `['nerve_ian', 'nerve_lingual', 'mental_foramen', 'mandibular_foramen', 'mandibular_canal']`:
     - `wisdomShowNerves` is automatically forced to `true`.
     - Layer 6 (Cranial Nerves) in `layerVisibility[6]` is set to `true`.
2. **Skeletal Structures Guarantee**:
   - If `id` is `bone_mandible` or `mandible`:
     - Layer 4 (Skull) and Layer 11 (Jaw bones) are set to `true`.
     - If `wisdomBoneOpacity < 0.25`, opacity is raised to `0.45` to ensure bone contours are visually legible.
3. **No Redundant Overrides**:
   - Existing user layer preferences for other layers (e.g. vascular, muscular) are preserved.

---

## 6. Async & Race-Condition Handling Details

A token-based request versioning mechanism was implemented in `DentalCameraFocusController`:
```typescript
class DentalCameraFocusController {
  private static currentRequestId = 0;

  public static nextRequestId(): number {
    this.currentRequestId++;
    return this.currentRequestId;
  }

  public static isCurrentRequest(id: number): boolean {
    return id === this.currentRequestId;
  }
}
```
In both `WisdomCameraController` and `DentalCameraController`:
1. When a new camera target arrives, a new token is generated: `const reqId = DentalCameraFocusController.nextRequestId()`.
2. In `useFrame`:
   ```typescript
   if (!DentalCameraFocusController.isCurrentRequest(animRef.current.requestId)) {
     animRef.current.isAnimating = false;
     return;
   }
   ```
   If a user clicks `R48` then immediately `R38`, the animation loop for `R48` is invalidated instantly on the very next frame.
3. The new animation begins smoothly from the camera's **current live position** (`camera.position`), eliminating all teleportation and backward jerks.

---

## 7. Selection State vs Camera State Separation

To prevent tight coupling between UI state and camera viewport state:
- **Selection State (`selectedAnatomyId`, `selectedToothFdi`, `activeSpecimenMode`)**:
  - Updates synchronously when clicked.
  - Updates URL search parameters, clinical information cards, procedure steps, and telemetry HUD without waiting for 3D animation.
- **Camera State (`cameraTarget`)**:
  - Contains position, lookAt, distance, and a monotonic `timestamp`.
  - Driven smoothly by the camera controller using cubic ease-out ($t = 1 - (1-p)^3$) over 500ms.
  - Controls orbit target and camera distance independently.

---

## 8. Summary of Code Changes

1. **`frontend/src/anatomy/dental/DentalTargetResolver.ts` (NEW)**:
   - Central authority resolving any dental or craniofacial structure ID to canonical 3D bounding boxes, centroids, and minimum visual radii.
2. **`frontend/src/anatomy/dental/DentalCameraFocusController.ts` (NEW)**:
   - Computes optical camera framing from target bounding spheres.
   - Normalizes camera preset direction vectors.
   - Manages cancelable async request tokens.
3. **`frontend/src/stores/useDentalNeuroStore.ts` (MODIFIED)**:
   - Upgraded `focusAnatomy` to use `DentalTargetResolver` and `DentalCameraFocusController`.
   - Added automatic visibility synchronization in `selectAnatomy`.
   - Adapted `selectForamen` to canonical craniofacial space.
4. **`frontend/src/components/dental-neuroanatomy/specimens/WisdomSurgeryStage.tsx` (MODIFIED)**:
   - Integrated `DentalCameraFocusController` cancelable tokens and NaN safety in `WisdomCameraController`.
   - Added real-time 3D telemetry HUD in scene space.
5. **`frontend/src/components/dental-neuroanatomy/DentalNeuro3DStage.tsx` (MODIFIED)**:
   - Upgraded `DentalCameraController` with cancelable tokens and NaN safety.
6. **`tests/anatomy/dentalViewTransition.test.mjs` (NEW)**:
   - Automated 60-assertion test suite covering all transitions, forward and reverse flows, rapid click stress tests, and visibility contracts.
7. **`scripts/test-dental-view-transition.mjs` (NEW)** & **`tests/runAllTests.mjs` (MODIFIED)**:
   - Test runner and registration into master test pipeline.

---

## 9. Diagnostic & Debug Tools Added

### In-Canvas 3D Telemetry HUD (`WisdomSurgeryStage.tsx`)
When `showDebugCoords` is active:
- Shows 3D axes at the active tooth socket, Spix foramen, and mental foramen.
- Renders an interactive WebGL HTML floating badge showing:
  - Active ID (e.g. `tooth.48`, `nerve_ian`, `mental_foramen`)
  - Tooth socket position in meters
  - IAN target position in meters
  - Measured anatomical distance in mm (e.g., $0.60\text{mm}$)
  - Visibility status of cranial nerves and Spix coordinates

---

## 10. Test Results & Verification

### Test Suite Execution
```bash
node scripts/test-dental-view-transition.mjs
```
**Results:** **60 Passed, 0 Failed (3ms)**.

### Master QA Suite Execution
```bash
node tests/runAllTests.mjs
```
**Results:** **214 Passed, 0 Failed (85ms) across all 13 suites**:
- Registry Consistency: 16/16 ✅
- Route Audit: 12/12 ✅
- Asset Audit: 10/10 ✅
- Anatomical Assertions: 15/15 ✅
- Tooth Alignment: 16/16 ✅
- Tooth Mapping Audit: 14/14 ✅
- Pronunciation Audit: 8/8 ✅
- Annotation Positioning: 14/14 ✅
- Anatomy Position: 11/11 ✅
- Gender Specimen: 7/7 ✅
- Layer Separation: 11/11 ✅
- Dental Coordinate Alignment: 20/20 ✅
- Dental View Transition & Sync: 60/60 ✅

### Production Build Verification
```bash
npm run build:frontend
```
**Result:** **Exit code 0 — 2246 modules transformed, zero TypeScript or build errors.**

---

## 11. Remaining Edge Cases & Future Recommendations
- **Dynamic Mobile Aspect Ratios**: The framing formula accepts `viewerRect` to widen framing on vertical mobile screens ($<1.0$ aspect ratio), ensuring structures like the full mandible aren't clipped on smartphones.
- **Custom Patient CT/DICOM Loading**: The `DentalTargetResolver` pattern can be trivially extended in future releases to parse patient-specific STL/DICOM bounding boxes without modifying the camera controllers.
