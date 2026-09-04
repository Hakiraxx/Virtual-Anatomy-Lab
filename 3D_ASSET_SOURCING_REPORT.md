# 3D Asset Sourcing & Ingestion Report

## 1. Sourcing Strategy

In strict adherence to project mandates, **no procedural geometries or AI-generated primitives** are permitted for anatomical representations. All anatomical structures are sourced from reputable open-access academic and biomedical repositories.

### Primary Repositories:
1. **Z-Anatomy (Open Human Anatomy Project)**:
   - Based on BodyParts3D (University of Tokyo / DBCLS).
   - High-fidelity anatomical segmentation of osteology, nervous system, musculature, and vasculature.
   - License: CC BY-SA 4.0.
2. **BodyParts3D / DBCLS (Database Center for Life Science, Japan)**:
   - Anatomical segmentation from MRI/CT human volumetric datasets.
   - License: CC BY-SA 2.1 JP / CC BY-SA 4.0.
3. **University of Dundee 3D Dental Education**:
   - Accurate clinical morphological micro-CT scans of human dentition.
   - License: CC BY 4.0.

---

## 2. Asset Ingestion Pipeline

```
Source (Blender/Z-Anatomy/CT)
       │
       ▼
Inspection (inspect-anatomy-assets.mjs)
       │
       ▼
Normalization (Coordinate Frame, Scale = 1.0m, Origin Alignment)
       │
       ▼
Optimization (Draco geometry compression, Meshopt indexing)
       │
       ▼
GLB Packaging (Single-file self-contained binary)
       │
       ▼
Validation (AnatomyValidationPipeline & AnatomyRegistryValidator)
```

---

## 3. Inventory of Verified Assets

| Asset Name | Relative Path | File Size | Source | Status |
|---|---|---|---|---|
| Complete Skull | `models/craniofacial/skull/skull_complete.glb` | 6.68 MB | Z-Anatomy | VERIFIED |
| Cranial Nerves | `models/craniofacial/cranial-nerves/cranial_nerves_complete.glb` | 5.98 MB | Z-Anatomy | VERIFIED |
| Masticatory Muscles | `models/craniofacial/muscles/masticatory_muscles.glb` | 5.00 MB | Z-Anatomy | VERIFIED |
| Craniofacial Vessels | `models/craniofacial/vessels/craniofacial_vessels.glb` | 6.73 MB | Z-Anatomy | VERIFIED |
| TMJ Complex | `models/craniofacial/tmj/tmj_complex.glb` | 1.65 MB | Z-Anatomy | VERIFIED |
| Craniofacial Brain | `models/craniofacial/brain/brain_complete.glb` | 0.93 MB | Z-Anatomy | VERIFIED |
| Mandibular Molar 48 | `models/dental/mandibular_third_molar_48.glb` | 113.2 KB | Dundee / Z-Anatomy | VERIFIED |
| Mandibular Molar 38 | `models/dental/mandibular_third_molar_38.glb` | 113.2 KB | Dundee / Z-Anatomy | VERIFIED |
| 59 Deep Specimen Organs | `models/[organ].glb` | 0.8 - 12 MB | MedAnatomy Library | VERIFIED |
| Male/Female 10 Systems | `models/anatomy/[male|female]/[system].glb` | 0.8 - 7.5 MB | MedAnatomy Library | VERIFIED |
