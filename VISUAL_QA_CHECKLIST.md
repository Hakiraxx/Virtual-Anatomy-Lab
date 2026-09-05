# MEDANATOMY 3D — VISUAL QA CHECKLIST

**Platform:** MedAnatomy 3D  
**Rendering Pipeline:** Three.js WebGL / `@react-three/fiber` / `@react-three/drei`  
**Hardware Features:** GPU Local Clipping, Depth Testing, PBR Transmission, Instanced Markers  

---

## 1. 3D Viewport & Rendering Quality

| Verification Item | Acceptance Criteria | Observed Status | Verdict |
| :--- | :--- | :--- | :---: |
| **GPU Hardware Clipping** | Slicing through tooth/organ meshes shows solid cut faces without hollow black artifacts or surface tearing | `THREE.Plane` with `localClippingEnabled = true` cuts meshes cleanly with PBR lighting | **PASS** |
| **Clipping Depth Slider** | Adjusting offset slider smoothly translates cut plane from $-15\text{ mm}$ to $+15\text{ mm}$ | Real-time GPU plane translation with zero frame drop | **PASS** |
| **Invert Plane Toggle** | Inverting clipping plane immediately displays the opposite anatomical hemisphere | Normal vector inverted via `normal.negate()` | **PASS** |
| **PBR Material Translucency** | Enamel displays natural translucency ($15\%$ transmission, roughness $0.18$); dentin/cementum displays opaque ivory | Correctly rendered with Three.js MeshPhysicalMaterial properties | **PASS** |
| **360° Orbit Navigation** | Free rotation, panning, and zooming allowed during active clipping | OrbitControls maintains smooth camera movement without resetting clipping state | **PASS** |
| **Clinical View Presets** | Clicking Occlusal, Buccal, Lingual, Mesial, Distal, Apical smoothly animates camera | Camera snaps to canonical clinical vectors within 400ms | **PASS** |
| **Z-Fighting Prevention** | No flickering or z-fighting between alveolar bone socket and tooth roots | Material `polygonOffset` enabled where bone and root surfaces meet | **PASS** |
| **Internal Cavity Illumination**| Inside of pulp chamber and root canals illuminated when sectioned | Soft ambient fill light ($0.65$) prevents pure pitch black interior | **PASS** |
| **32 FDI Hotspots** | Circular beacons positioned accurately over teeth in the dental arch | Correctly mapped in 3D world space with amber highlight on selected tooth | **PASS** |
| **Layer Opacity Controls** | Bone and tooth layer opacity sliders adjust transparency between $10\%$ and $100\%$ | Material `transparent = true` and `opacity` update reactively | **PASS** |

---

## 2. User Interface & Layout Responsiveness

| UI Component | Expected Behavior | Observed Status | Verdict |
| :--- | :--- | :--- | :---: |
| **Atelier TopBar** | Brand title, mode indicators, search trigger, theme switcher, and auth button | Fixed at top, crisp SVG icons, clean responsive layout | **PASS** |
| **Atelier Organ Rail** | Quick navigation icons for all 11 organ systems | Smooth horizontal/vertical scroll, active system highlighted | **PASS** |
| **Section Control Panel** | Floating panel over 3D canvas with plane selector buttons, depth slider, and layer toggles | Compact backdrop-blur panel, does not obstruct tooth view | **PASS** |
| **Clinical Dossier Card** | Collapsible drawer showing tooth FDI, root counts, canal counts, and surgical risks | Clean typography, trilingual labels, scientific references | **PASS** |
| **Search Modal (`Cmd+K`)** | Live fuzzy search across 82 structures and 32 teeth with instant camera focus | Instant search results, arrow key navigation, keyboard focus | **PASS** |
| **Dark / Light Theme** | Smooth transition between high-contrast medical dark and clean surgical light | Palette switches cleanly with appropriate CSS variables | **PASS** |
