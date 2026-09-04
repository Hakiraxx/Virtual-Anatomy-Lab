# Răng Hàm Mặt (RHM) Specialized Module Architecture

## 1. Architectural Vision
The RHM (Dentomaxillofacial & Stomatology) module is an integrated specialty branch within MedAnatomy 3D. Rather than existing as a disjointed silo, it shares the common design system, 3D viewport engine, and canonical anatomy registry.

## 2. Five Specialized Learning Labs
In compliance with Platform Specification Section 43, the RHM module is organized into five dedicated study environments:

1. **Lab 1: Tổng Thể Sọ Mặt (`general`)**:
   - Comprehensive osteology of neurocranium and viscerocranium.
   - Multilayer navigation through bone, nerves, vessels, and muscles.
2. **Lab 2: Thần Kinh Sọ (`cranial_nerves`)**:
   - Deep-dive into Cranial Nerves V (Trigeminal), VII (Facial), IX (Glossopharyngeal), X (Vagus), and XII (Hypoglossal).
   - Trace pathway engine following sensory and motor root courses through cranial foramina to terminal dental and cutaneous branches.
3. **Lab 3: Tiêu Bản Răng FDI (`tooth_specimen`)**:
   - Full 32-tooth permanent dentition indexed by FDI 2-digit notation (11-48).
   - High-resolution morphology: Enamel, Dentin, Pulp Chamber, Root Canals, Apical Foramen, Periodontal Ligament space.
4. **Lab 4: Khớp TDH & Cơ Nhai (`tmj_specimen`)**:
   - Dynamic biomechanics of the temporomandibular joint: Mandibular condyle, articular disc, glenoid fossa, articular eminence.
   - 4 Muscles of Mastication: Masseter, Temporalis, Medial Pterygoid, Lateral Pterygoid with origin, insertion, and innervation data.
   - Kinematic movement simulations: Opening, Protrusion, Lateral Excursion.
5. **Lab 5: Phẫu Thuật Răng Khôn (`wisdom_surgery`)**:
   - Specialized surgical anatomy of mandibular third molars (R.48 / R.38).
   - Winter & Pell-Gregory classification positioning.
   - Inferior alveolar nerve (IAN) and lingual nerve risk visualization.
   - 6-step surgical simulation with anatomical crown sectioning and root elevation.

## 3. Data Integration & State Synchronization
All 5 labs communicate through `useDentalNeuroStore.ts` and synchronize `selectedAnatomyId` with the global `AnatomyRegistry`.
