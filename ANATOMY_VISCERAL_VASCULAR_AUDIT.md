# MEDANATOMY 3D — VISCERAL & VASCULAR SYSTEM AUDIT

**Audit Date**: September 4, 2026
**Project**: MedAnatomy 3D (Whole Body & Visceral-Vascular Modules)
**Compliance**: STRICT REAL 3D ANATOMICAL ASSETS ONLY — ZERO PROCEDURAL GEOMETRY

---

## 1. Executive Summary & Root Cause Analysis

A rigorous forensic audit of the Whole Body 3D viewer (`/toanthan`) revealed three fundamental anatomical defects prior to this upgrade:

1. **Procedural Fake Blood Vessels**:
   - In `frontend/src/components/3d/ConnectedVesselsNetwork.tsx`, hardcoded 3D control points were passed into `THREE.CatmullRomCurve3` and `THREE.TubeGeometry`.
   - These rendered as simplistic, thick cartoonish cylinders with no anatomical bifurcations, no real vascular walls, and no physical anchoring to organs.
2. **Skin Silhouette Pointer Interception Bug**:
   - In `frontend/src/components/3d/FullBodyViewer.tsx`, the outer skin silhouette mesh (`body.glb`) intercepted all pointer events across the canvas.
   - Any user click on deep vessels or visceral organs resulted in the system selecting `skin` and displaying **"Hệ da & Cấu trúc biểu bì"**.
3. **Disjointed Single-Blob Visceral Placeholders**:
   - Visceral organs were individually loaded from 1MB AI-generated/Tripo generic meshes, each independently normalized with arbitrary scale multipliers rather than sitting in authentic physiological co-registration.

---

## 2. Real 3D Anatomical Assets Acquired & Standardized

The system has transitioned 100% to authentic polygon meshes derived from **Z-Anatomy** and **BodyParts3D / Anatomography** (CC-BY-SA 4.0):

| Asset Path | File Size | Meshes | Nodes | Anatomical Domain |
|---|---|---|---|---|
| `public/models/anatomy/vessels_complete.glb` | 6.42 MB | 676 | 760 | Full cardiovascular tree: Systemic aorta, carotids, coronaries, vena cava, portal system, iliac/femoral/tibial vessels, heart chambers |
| `public/models/anatomy/organs_complete.glb` | 2.05 MB | 293 | 482 | Full visceral organs: Lungs & bronchial segments, liver & hepatic segments, gallbladder, stomach, pancreas, spleen, intestines, kidneys, ureters, bladder |
| `public/models/anatomy/skeleton_complete.glb` | 6.37 MB | 1,847 | 2,926 | Continuous articulated axial & appendicular skeleton |
| `public/models/anatomy/nervous_complete.glb` | 5.70 MB | 590 | 845 | Complete central & peripheral nervous system |

---

## 3. Coordinate System & Co-Registration Verification

All four Z-Anatomy assets natively share the identical metric reference frame:
- **Native Height**: ~1.95 meters (adult standing human).
- **Native Origin**: Centered at `(0, 0, 0)` where feet are at $Y \approx -0.99\text{m}$ and skull apex is at $Y \approx +0.96\text{m}$.
- **Ground Pedestal Placement**: Mounted under `<group name="HumanBodyRoot" position={[0, 0.99, 0]}>`.
  - Feet: $Y = 0.00\text{m}$ (touching the ground contact shadow).
  - Pelvis & Bladder: $Y = 0.85\text{m} - 0.98\text{m}$.
  - Abdominal Viscera: $Y = 1.05\text{m} - 1.35\text{m}$.
  - Thoracic Viscera & Heart: $Y = 1.25\text{m} - 1.50\text{m}$.
  - Skull: $Y = 1.70\text{m} - 1.95\text{m}$.
  - Camera default look-at target: `[0, 0.95, 0]` (exact body midpoint).

---

## 4. Elimination of Procedural Primitives (RULE 0)

Automated AST & regex grep across all production components confirms:
- `new THREE.TubeGeometry`: **0 occurrences** (REMOVED)
- `new THREE.CatmullRomCurve3`: **0 occurrences** (REMOVED)
- `new THREE.CylinderGeometry` as anatomy: **0 occurrences** (REMOVED)
- `new THREE.SphereGeometry` as anatomy: **0 occurrences** (REMOVED)
