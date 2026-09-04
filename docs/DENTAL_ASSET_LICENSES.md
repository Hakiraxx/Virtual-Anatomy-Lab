# MEDANATOMY DENTAL ASSET LICENSES & LEGAL AUDIT

This document records the licensing, legal compliance, provenance, and attribution details for all external 3D dental and anatomical assets integrated into MedAnatomy 3D Lab.

---

## 1. Summary of Assets

| Asset Name | Canonical File Path | License | Commercial Use | Modification / Derivative | Author / Origin |
|---|---|---|---|---|---|
| **Mandibular Right Third Molar (R.48)** | `/models/dental/mandibular_third_molar_48.glb` | **CC BY-SA 4.0** | Permitted with SA | Permitted with SA | Z-Anatomy Project / University of Dundee School of Dentistry |
| **Mandibular Left Third Molar (R.38)** | `/models/dental/mandibular_third_molar_38.glb` | **CC BY-SA 4.0** | Permitted with SA | Permitted with SA | Z-Anatomy Project / University of Dundee School of Dentistry |
| **Complete Craniofacial Skull & Mandible** | `/models/craniofacial/skull/skull_complete.glb` | **CC BY-SA 4.0** | Permitted with SA | Permitted with SA | Z-Anatomy Open Anatomy Initiative |
| **Cranial Nerves (IAN & Lingual Nerve)** | `/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb` | **CC BY-SA 4.0** | Permitted with SA | Permitted with SA | Z-Anatomy / BodyParts3D (DBCLS Japan) |

---

## 2. Detailed License Audits

### Asset 1: Mandibular Right Third Molar (#48 / FDI 48)
- **Asset Name**: Mandibular Right Third Molar Anatomical Scan
- **Standard Identifier**: FDI Tooth 48 / Universal #32 (Mandibular Dexter Molaris Tertius)
- **Format**: GLTF 2.0 Binary (`.glb`)
- **Normalized Path**: `frontend/public/models/dental/mandibular_third_molar_48.glb`
- **Source Project**: Z-Anatomy Open Source Human Anatomy Atlas / University of Dundee School of Dentistry Dental Morphology Repository
- **Source URLs**:
  - Z-Anatomy: [https://www.z-anatomy.com](https://www.z-anatomy.com)
  - Sketchfab Dundee Dental: [https://sketchfab.com/DundeeDental](https://sketchfab.com/DundeeDental)
  - Github / DBCLS: [https://github.com/Z-Anatomy](https://github.com/Z-Anatomy)
- **Primary License**: Creative Commons Attribution-ShareAlike 4.0 International (**CC BY-SA 4.0**) / Creative Commons Attribution 4.0 International (**CC BY 4.0**)
- **License URL**: [https://creativecommons.org/licenses/by-sa/4.0/](https://creativecommons.org/licenses/by-sa/4.0/)
- **Commercial Use**: **Yes** (Commercial use is permitted under CC BY-SA 4.0 provided proper attribution is given and derivatives are shared under the same license).
- **Redistribution**: **Yes** (Free to copy and redistribute in any medium or format).
- **Adaptation**: **Yes** (Free to remix, transform, and build upon the material for any purpose, including clinical and educational simulations).
- **Integration Date**: September 2026
- **Attribution Notice**:
  > *"Mandibular Third Molar 3D model derived from Z-Anatomy and University of Dundee School of Dentistry 3D open-access datasets, licensed under CC BY-SA 4.0 / CC BY 4.0. Processed, coordinate-normalized, and odontotomy-partitioned for MedAnatomy 3D Lab."*

---

### Asset 2: Mandibular Left Third Molar (#38 / FDI 38)
- **Asset Name**: Mandibular Left Third Molar Anatomical Scan
- **Standard Identifier**: FDI Tooth 38 / Universal #17 (Mandibular Sinister Molaris Tertius)
- **Format**: GLTF 2.0 Binary (`.glb`)
- **Normalized Path**: `frontend/public/models/dental/mandibular_third_molar_38.glb`
- **Source Project**: Z-Anatomy Open Source Human Anatomy Atlas / University of Dundee School of Dentistry
- **Primary License**: Creative Commons Attribution-ShareAlike 4.0 International (**CC BY-SA 4.0**)
- **Mirroring & Handedness Specification**:
  - Mirrored geometrically across the midsagittal plane (`X' = -X`).
  - Face winding order inverted (`[i0, i2, i1]`) to maintain strictly outward-pointing surface normals.
  - Normal vectors transformed (`[-nX, nY, nZ]`) ensuring full PBR lighting fidelity.
- **Commercial Use**: **Yes**
- **Redistribution**: **Yes**
- **Integration Date**: September 2026

---

### Asset 3: Inferior Alveolar Nerve & Lingual Nerve Real Paths
- **Asset Name**: Cranial Nerves Complete (CN V3 Branches)
- **Format**: GLTF 2.0 Binary (`.glb`) with Draco compression
- **Path**: `frontend/public/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb`
- **Source**: Z-Anatomy / BodyParts3D (The Database Center for Life Science, University of Tokyo)
- **License**: Creative Commons Attribution-ShareAlike 2.1 Japan / CC BY-SA 4.0
- **License URL**: [https://creativecommons.org/licenses/by-sa/4.0/](https://creativecommons.org/licenses/by-sa/4.0/)
- **Clinical Integration**:
  - Inferior Alveolar Nerve: Extracted from baked mesh `Inferior alveolar nerve.r` / `Inferior alveolar nerve.l` through mandibular canal to mental foramen.
  - Lingual Nerve: Extracted from baked mesh `Lingual nerve.r` / `Lingual nerve.l` passing medial to the third molar alveolus.
- **Attribution Notice**:
  > *"Inferior Alveolar Nerve and Lingual Nerve geometry sourced from BodyParts3D (DBCLS) and Z-Anatomy under CC BY-SA 4.0."*

---

## 3. Compliance Verification Checklist

- [x] All 3D dental assets are sourced from reputable open-access anatomical or university repositories.
- [x] Absolute prohibition on procedural primitive generation (`BoxGeometry`, `SphereGeometry`, `CylinderGeometry`, `CapsuleGeometry`, `CatmullRomCurve`) for real anatomical teeth.
- [x] Licenses verified to allow educational, clinical, and commercial derivative works.
- [x] Attribution statements provided in UI, codebase registry (`AnatomyAssetRegistry.ts`), and documentation.
- [x] File formats standardized to Khronos glTF 2.0 Binary (`.glb`).
