# MEDANATOMY 3D — ODONTO-STOMATOLOGY (RĂNG HÀM MẶT) COVERAGE MATRIX

**Specialty:** Maxillofacial Surgery, Endodontics, Dental Neuroanatomy  
**Clinical Standards:** FDI Two-Digit System, Vertucci Pulp Canal Classification, Pell-Gregory & Winter Impaction Systems  
**Auditor:** DeepMind Antigravity Advanced Medical AI  

---

## 1. 32 Adult FDI Teeth Clinical Matrix

| Quadrant | FDI Range | Tooth Classes | Typical Root Count | Typical Canal Count | Innervation Nerve | Vertucci Pulp Canal Morphology |
| :--- | :---: | :--- | :---: | :---: | :--- | :--- |
| **Q1 (Maxillary Right)** | 11 - 18 | Central Incisor to 3rd Molar | 1 to 3 | 1 to 4 | ASAN, MSAN, PSAN (CN V2) | Type I (Incisors) to Type IV/VI (Molars, MB2 present 70%) |
| **Q2 (Maxillary Left)** | 21 - 28 | Central Incisor to 3rd Molar | 1 to 3 | 1 to 4 | ASAN, MSAN, PSAN (CN V2) | Type I (Incisors) to Type IV/VI (Molars, MB2 present 70%) |
| **Q3 (Mandibular Left)** | 31 - 38 | Central Incisor to 3rd Molar | 1 to 2 | 1 to 3 | IAN & Incisive Nerve (CN V3)| Type I/III (Incisors) to Type II/IV (Molars, Mesial 2, Distal 1-2) |
| **Q4 (Mandibular Right)**| 41 - 48 | Central Incisor to 3rd Molar | 1 to 2 | 1 to 3 | IAN & Incisive Nerve (CN V3)| Type I/III (Incisors) to Type II/IV (Molars, Mesial 2, Distal 1-2) |

---

## 2. Specialized Surgical & Anatomical Modules

### A. Mandibular Third Molar (#48 / #38) Specimen Module
- **Micro-CT 3D Asset:** `dental/mandibular_third_molar_48.glb` & `dental/mandibular_third_molar_38.glb`
- **Anatomical Crown:** 2,239 polygonal faces. PBR Enamel shader with high transmission.
- **Anatomical Roots:** 2,269 polygonal faces. Mesial and distal roots with distal apex curvature.
- **GPU Slicing Modes:**
  - Sagittal (Mesiodistal cut)
  - Coronal (Buccolingual cut)
  - Axial (Horizontal occlusal-apical cut)
  - Oblique ($45^\circ$ cut)
- **Clinical Impaction Metrics:**
  - Pell & Gregory Classification: Class II, Position B
  - Winter Classification: Mesioangular ($45^\circ$ tilt)
  - IAN Proximity: $1.5\text{ mm}$ clearance to mandibular canal cortical roof
  - Root Hook Hazard: Distal root tip hooking lingually towards submandibular space

### B. Mandibular Canal & Trigeminal Network Module
- **Trigeminal Nerve (CN V):**
  - Trigeminal ganglion (Gasser) in Meckel's cave
  - Ophthalmic division (V1) exiting via Superior Orbital Fissure
  - Maxillary division (V2) exiting via Foramen Rotundum into Pterygopalatine Fossa
  - Mandibular division (V3) exiting via Foramen Ovale into Infratemporal Fossa
- **Inferior Alveolar Nerve (IAN):**
  - Trajectory: Enters Mandibular Foramen on medial ramus, guarded by Lingula (Gai Spix)
  - Travel: Courses inside Mandibular Canal below tooth apices
  - Bifurcation: At Mental Foramen into Mental Nerve and Incisive Nerve
- **Lingual Nerve:**
  - Courses anterior-medial to IAN in pterygomandibular space
  - Closely adheres to lingual plate at third molar region ($< 2\text{ mm}$ depth, high risk during flap release)
- **Local Anesthesia Injection Landmarks:**
  - **Spix / IAN Block:** $1\text{ cm}$ above occlusal plane, needle angle from opposite premolars hitting bone at sulcus colli mandibulae
  - **Gow-Gates Technique:** Anesthetizes entire V3 at neck of condyle; avoids low bifurcations
  - **Vazirani-Akinosi (Closed-Mouth):** Useful in trismus patients with muscle spasm

### C. Temporomandibular Joint (TMJ) Biomechanics Module
- **3D Asset:** `craniofacial/tmj/tmj_complex.glb`
- **Components:**
  - Mandibular condyle (Caput mandibulae)
  - Articular fossa (Fossa mandibularis) and Articular eminence of temporal bone
  - Biconcave fibrocartilaginous Articular Disc (Discus articularis)
  - Retrodiscal tissue (Bilaminar zone with rich neurovascular supply)
  - Lateral pterygoid muscle upper belly inserting into disc capsule
- **Kinematic Simulation:**
  - Initial 20mm jaw opening: Pure rotation in lower joint cavity (condyle-disc complex)
  - >20mm maximum opening: Translation anterior-inferior along articular eminence in upper joint cavity
  - Anterior Disc Displacement with Reduction (Clicking / Reciprocal click)
  - Anterior Disc Displacement without Reduction (Closed lock / Trismus)
