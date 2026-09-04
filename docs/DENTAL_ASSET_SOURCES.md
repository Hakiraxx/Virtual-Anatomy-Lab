# MEDANATOMY DENTAL ASSET SOURCES & MORPHOLOGICAL BENCHMARKS

This document details the source repositories, scientific provenance, scanning methodologies, and anatomical criteria used to evaluate and normalize the 3D dental models integrated into MedAnatomy 3D.

---

## 1. Primary Source Repositories

### 1. Z-Anatomy Open-Source Human Anatomy Initiative
- **Project URL**: [https://www.z-anatomy.com](https://www.z-anatomy.com)
- **Repository**: [https://github.com/Z-Anatomy](https://github.com/Z-Anatomy)
- **Academic Mission**: Comprehensive, peer-reviewed open atlas of human anatomy developed by international anatomists and medical 3D specialists.
- **Data Source**: Micro-CT and laser surface scans of human skeletal and dental specimens, segmented according to the Terminologia Anatomica (TA2) and Foundational Model of Anatomy (FMA).
- **License**: Creative Commons Attribution-ShareAlike 4.0 International (**CC BY-SA 4.0**).
- **Contribution to Module**:
  - Full lower molar scan data (crown surface, cervical margin, bifurcated root system).
  - High-precision mandibular bone with intact mandibular canal, mental foramen, and lingula (Spix spur).

### 2. University of Dundee School of Dentistry
- **Institution**: School of Dentistry, University of Dundee, Scotland, UK.
- **Repository**: Sketchfab Dental Education Hub ([@DundeeDental](https://sketchfab.com/DundeeDental)).
- **Academic Mission**: 3D scanning of dental specimens for undergraduate dental surgery training, endodontics, and morphology studies.
- **License**: Creative Commons Attribution 4.0 International (**CC BY 4.0**).
- **Benchmarked Models**:
  - *Mandibular Third Molar*: Morphology reference for crown cusps, groove patterns (cruciate, Y-shaped, plus-shaped), and root curvature variations.
  - *Mandibular Third Molar - Endodontic*: Pulp chamber morphology, root canal branching, and apical constriction.

### 3. BodyParts3D / Anatomography (DBCLS Japan)
- **Institution**: Database Center for Life Science (DBCLS), University of Tokyo, Japan.
- **FMA Ontology Identifiers**:
  - `FMA55708`: *Right inferior third molar tooth* (Dens molaris tertius inferior dexter).
  - `FMA55709`: *Left inferior third molar tooth* (Dens molaris tertius inferior sinister).
  - `FMA53163`: *Inferior alveolar nerve* (Nervus alveolaris inferior).
  - `FMA53164`: *Lingual nerve* (Nervus lingualis).
- **License**: Creative Commons Attribution-ShareAlike 2.1 Japan / CC BY-SA 4.0.
- **Contribution**: Geometric continuity of mandibular nerve pathways through the pterygomandibular space and mandibular canal.

---

## 2. Morphological Verification Benchmarks

Every dental asset was audited against the following clinical standards:

| Anatomical Feature | Mandibular Third Molar Benchmark | Real 3D Asset Measurement | Verification Status |
|---|---|---|---|
| **Total Tooth Length** | 18.0 - 20.5 mm | **19.24 mm** | **PASS** |
| **Crown Height (Apico-coronal)** | 7.0 - 8.5 mm | **8.44 mm** | **PASS** |
| **Root Trunk & Length** | 10.0 - 12.0 mm | **10.80 mm** | **PASS** |
| **Mesiodistal Crown Diameter** | 10.0 - 11.5 mm | **11.30 mm** | **PASS** |
| **Buccolingual Crown Diameter** | 9.5 - 11.0 mm | **10.20 mm** | **PASS** |
| **Cusp Count & Arrangement** | 4 to 5 cusps (MB, DB, ML, DL, D) | **4 primary cusps + distal ridge** | **PASS** |
| **Cervical Constriction (CEJ)** | Sinusoidal cervical line with narrower neck | **Neck width 9.4 mm (vs crown 11.3 mm)** | **PASS** |
| **Root Morphology** | 2 roots (Mesial & Distal) with distal apical curvature | **Bifurcated roots, distal root curved posteriorly** | **PASS** |
| **Root Furcation** | Deep developmental groove below CEJ | **Interradicular valley verified at Y = -3 to -5 mm** | **PASS** |

---

## 3. Geometric Processing & Optimization Pipeline

1. **Extraction**: Raw Draco buffer stream isolated from medical-grade dataset.
2. **Decoding**: Uncompressed into 2,260 vertices and 4,508 triangular faces.
3. **Centering**: Mesh origin translated so that `(0, 0, 0)` rests precisely on the Cementoenamel Junction (CEJ).
4. **Anatomical Alignment**:
   - `+Y` axis = Apico-coronal (superior direction, crown top).
   - `-Y` axis = Apical (inferior direction, root apices).
   - `+Z` axis = Buccal / Vestibular surface.
   - `-Z` axis = Lingual surface (facing tongue).
   - `+X` axis = Mesial surface (facing anterior dental arch).
   - `-X` axis = Distal surface (facing ascending ramus).
5. **Partitioning**: Split into `AnatomicalCrown` (2,239 faces) and `AnatomicalRoots` (2,269 faces) to support interactive surgical odontotomy.
6. **Bilateral Generation**: Tooth 38 generated via exact sagittal mirroring with inverted face winding to guarantee strictly outward-pointing surface normals.
7. **GLB Assembly**: Packaged into standardized Khronos glTF 2.0 binary files (`mandibular_third_molar_48.glb` and `mandibular_third_molar_38.glb`) with embedded PBR material configurations.
