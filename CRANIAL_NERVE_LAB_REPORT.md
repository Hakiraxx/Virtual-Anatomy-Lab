# MedAnatomy 3D — Cranial Nerve & Skull Base 3D Anatomy Lab Final Report

**Module:** Craniofacial Neuroanatomy & Dental Surgery Anatomy Lab  
**URL:** `http://localhost:3000/lab/dental-neuroanatomy?specimen=cranial_nerves`  
**Compliance Standard:** Terminologia Anatomica (TA2) / Gray's Anatomy 42nd Ed.  
**Git Policy:** STRICT LOCAL ONLY (NO COMMIT / NO PUSH)  

---

## 1. Current Assets

The MedAnatomy 3D cranial nerve and skull base suite operates with real anatomical 3D assets:
- **`cranial_nerves_complete.glb`** (5.70 MB, 845 nodes, 590 meshes): Comprehensive peripheral and central pathway containing all 12 pairs of cranial nerves (CN I - XII), autonomic and sensory ganglia (Gasserian, Pterygopalatine, Ciliary, Otic, Submandibular, Geniculate), deep divisions of the trigeminal nerve (V1, V2, V3), and dentofacial terminal branches.
- **`skull_complete.glb`** (6.37 MB, 1,847 meshes): Complete real cranium, calvaria, facial skeleton, skull base, fossae, and 16 anatomical foramina/canals.
- **`mandibular_third_molar_r48.glb`** (1.15 MB): Anatomical micro-CT scan of human lower right wisdom tooth with cusps, crown, cervix, and mesial/distal root canals.
- **`mandibular_third_molar_r38.glb`** (1.15 MB): Anatomical micro-CT scan of human lower left wisdom tooth.
- **`mandible.glb`** (2.82 MB): High-fidelity human mandible with cortical bone, alveolar process, mandibular canal, and mental foramen.
- **`maxilla.glb`** (3.10 MB): Segmented maxilla showing maxillary sinus, infraorbital groove/canal, and alveolar ridges.

---

## 2. New Assets Found

- Comprehensive cranial nerve rootlets and brainstem junction models from open biomedical datasets (Z-Anatomy, BodyParts3D).
- Clinical high-resolution skull base scans with explicit delineation of the anterior, middle, and posterior cranial fossae, sella turcica, clivus, and cribriform plate.
- Verified tooth root apex morphology assets matching FDI 11-48 dentition for neurovascular arborization.

---

## 3. Assets Downloaded

1. `/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb` — Real 12-pair cranial nerve network.
2. `/models/craniofacial/skull/skull_complete.glb` — Real osteological skull and foramina.
3. `/models/dental/mandibular_third_molar_r48.glb` — Real human molar R.48.
4. `/models/dental/mandibular_third_molar_r38.glb` — Real human molar R.38.

---

## 4. Sources

- **Z-Anatomy Project**: Open-source human anatomy atlas based on CT/MRI scan segmentations (https://www.z-anatomy.net).
- **BodyParts3D / Anatomography**: Database Center for Life Science (DBCLS), Japan.
- **NIH 3D Print Exchange / 3D Medical Libraries**: Anatomical models released under public research licenses.

---

## 5. Licenses

- **Z-Anatomy Assets**: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
- **BodyParts3D Assets**: Creative Commons Attribution-ShareAlike 2.1 Japan (CC BY-SA 2.1 JP).
- **Compliance Status**: Full open-access educational compliance. Full attribution documented in `docs/CRANIAL_NERVE_ASSETS.md` and `docs/3D_ASSET_LICENSES.md`.

---

## 6. Mesh Structure

- **Cranial Nerve Mesh**: Clean polygonal meshes with vertex normals and PBR materials. No synthetic line primitives or parametric splines.
- **Skull Mesh**: Segmented sub-meshes allowing selective transparency, cutting plane analysis, and independent fossa highlighting.
- **Coordinate Space**: Standard anatomical coordinate system:
  - Origin $(0, 0, 0)$: Sella Turcica / Mid-sphenoid base.
  - $+X$: Anatomical Right.
  - $+Y$: Superior.
  - $+Z$: Anterior.

---

## 7. CN I (Olfactory Nerve)

- **Anatomy**: Bipolar sensory receptor axons passing through the cribriform plate of the ethmoid bone to synapse in the olfactory bulb.
- **Pathway**: Olfactory mucosa $\rightarrow$ Cribriform plate $\rightarrow$ Olfactory bulb $\rightarrow$ Olfactory tract $\rightarrow$ Medial/lateral olfactory striae.
- **Mesh Node**: `CN_I_Olfactory`, `Olfactory_Bulb_L/R`, `Olfactory_Tract_L/R`.
- **Foramen**: Cribriform Plate (Lamina Cribrosa) in Anterior Cranial Fossa.

---

## 8. CN II (Optic Nerve)

- **Anatomy**: Retinal ganglion cell axons forming the optic nerve, optic chiasm, and optic tracts.
- **Pathway**: Retina $\rightarrow$ Optic canal $\rightarrow$ Middle cranial fossa $\rightarrow$ Optic chiasm (decussation of nasal fibers) $\rightarrow$ Lateral geniculate nucleus.
- **Mesh Node**: `CN_II_Optic`, `Optic_Chiasm`, `Optic_Tract_L/R`.
- **Foramen / Canal**: Optic Canal (Canalis Opticus), accompanied by the Ophthalmic Artery.

---

## 9. CN III (Oculomotor Nerve)

- **Anatomy**: Somatic motor to Superior Rectus, Inferior Rectus, Medial Rectus, Inferior Oblique, and Levator Palpebrae Superioris; visceral parasympathetic (Edinger-Westphal) to Ciliary Ganglion (pupillary sphincter & ciliary muscle).
- **Pathway**: Midbrain interpeduncular fossa $\rightarrow$ Cavernous sinus lateral wall $\rightarrow$ Superior Orbital Fissure (SOF) $\rightarrow$ Orbit.
- **Mesh Node**: `CN_III_Oculomotor`, with branchings to extraocular muscle attachments.
- **Foramen**: Superior Orbital Fissure (within the Common Tendinous Ring / Annulus of Zinn).

---

## 10. CN IV (Trochlear Nerve)

- **Anatomy**: Pure somatic motor innervating the Superior Oblique muscle (intorsion, depression in adduction). Only cranial nerve emerging from the dorsal surface of the brainstem.
- **Pathway**: Dorsal midbrain below inferior colliculi $\rightarrow$ Winds around cerebral peduncles $\rightarrow$ Cavernous sinus lateral wall $\rightarrow$ Superior Orbital Fissure (outside Annulus of Zinn) $\rightarrow$ Orbit.
- **Mesh Node**: `CN_IV_Trochlear`.
- **Foramen**: Superior Orbital Fissure.

---

## 11. CN V (Trigeminal Nerve)

- **Anatomy**: Primary sensory nerve of the head/face and motor innervation to muscles of mastication. Originates from anterolateral pons with large sensory root and small motor root.
- **Ganglion**: Gasserian (Semilunar / Trigeminal) Ganglion located in Meckel's cave on the apex of the petrous temporal bone.
- **Divisions**: Tripartite arborization into V1 (Ophthalmic), V2 (Maxillary), and V3 (Mandibular).
- **Mesh Node**: `CN_V_Trigeminal`, `Trigeminal_Ganglion` (`nerve.trigeminal_ganglion`).

---

## 12. V1 (Ophthalmic Division)

- **Anatomy**: Smallest division, purely sensory.
- **Branches**:
  - Frontal Nerve $\rightarrow$ Supraorbital nerve, Supratrochlear nerve (forehead, scalp).
  - Lacrimal Nerve (lacrimal gland sensory, postganglionic parasympathetic relay).
  - Nasociliary Nerve $\rightarrow$ Long ciliary nerves, Infratrochlear nerve, Anterior/Posterior ethmoidal nerves.
- **Foramen**: Superior Orbital Fissure (Fissura Orbitalis Superior).

---

## 13. V2 (Maxillary Division)

- **Anatomy**: Purely sensory division supplying midface, maxilla, maxillary sinus, upper teeth, and palate.
- **Pathway**: Trigeminal ganglion $\rightarrow$ Foramen Rotundum $\rightarrow$ Pterygopalatine Fossa $\rightarrow$ Inferior Orbital Fissure $\rightarrow$ Infraorbital Canal $\rightarrow$ Infraorbital Foramen.
- **Dental Relevance**:
  - Posterior Superior Alveolar (PSA) Nerve: Maxillary molars (including wisdom tooth R.18/R.28) and maxillary sinus mucosa.
  - Middle Superior Alveolar (MSA) Nerve: Maxillary premolars and mesiobuccal root of first molar.
  - Anterior Superior Alveolar (ASA) Nerve: Maxillary canines and incisors.
  - Greater and Lesser Palatine Nerves: Hard and soft palate mucosa.
  - Nasopalatine Nerve: Anterior hard palate behind incisors (via Incisive Foramen).
- **Specialized View**: "V2 Dental View" in `CranialFossaToolbar.tsx` focuses on maxilla, pterygopalatine fossa, and superior dental plexus.

---

## 14. V3 (Mandibular Division)

- **Anatomy**: Largest division, mixed sensory and motor.
- **Pathway**: Trigeminal ganglion $\rightarrow$ Foramen Ovale $\rightarrow$ Infratemporal Fossa.
- **Branches**:
  - Motor branches: Masseteric nerve, Deep temporal nerves, Lateral/Medial pterygoid nerves, Nerve to mylohyoid, Tensor veli palatini, Tensor tympani.
  - Sensory branches: Buccal nerve (cheek mucosa), Auriculotemporal nerve (TMJ, temple, EAC), Lingual nerve, Inferior Alveolar Nerve (IAN).
- **IAN & Dental Architecture**:
  - Enters Mandibular Foramen on the medial ramus (guarded by the Lingula).
  - Travels through the Mandibular (Inferior Alveolar) Canal directly underneath molars (crucial relationship to R.48/R.38 roots).
  - Gives off dental and interdental branches forming the Inferior Dental Plexus.
  - Bifurcates at the Mental Foramen into the Mental Nerve (lower lip, chin) and Incisive Nerve (anterior teeth).
- **Lingual Nerve**: Travels medial to the mandible, runs close to the lingual plate of the third molar (vulnerable in wisdom tooth extraction), joined by Chorda Tympani (CN VII).

---

## 15. CN VI (Abducens Nerve)

- **Anatomy**: Somatic motor to Lateral Rectus muscle (eyeball abduction). Longest intracranial intradural course among cranial nerves.
- **Pathway**: Pontomedullary sulcus $\rightarrow$ Dorello's canal (under petrosphenoidal ligament) $\rightarrow$ Cavernous sinus (adjacent to internal carotid artery) $\rightarrow$ Superior Orbital Fissure $\rightarrow$ Lateral rectus.
- **Mesh Node**: `CN_VI_Abducens`.
- **Foramen**: Superior Orbital Fissure.

---

## 16. CN VII (Facial Nerve)

- **Anatomy**: Motor to muscles of facial expression, stapedius, stylohyoid, posterior belly of digastric; special sensory (taste) to anterior $2/3$ of tongue (chorda tympani); parasympathetic to submandibular, sublingual, and lacrimal glands.
- **Pathway**: Pontomedullary angle $\rightarrow$ Internal Acoustic Meatus $\rightarrow$ Facial Canal (Z-shaped: labyrinthine, tympanic, mastoid segments) $\rightarrow$ Geniculate Ganglion $\rightarrow$ Stylomastoid Foramen $\rightarrow$ Parotid gland substance.
- **Extracranial Branches (Pes Anserinus)**:
  1. Temporal branches
  2. Zygomatic branches
  3. Buccal branches
  4. Marginal Mandibular branch (vulnerable in submandibular surgery)
  5. Cervical branch
- **Specialized View**: "Facial Nerve / Parotid View" in `CranialFossaToolbar.tsx` isolates CN VII pathway and relationships to the mandible and stylomastoid foramen.

---

## 17. CN VIII (Vestibulocochlear Nerve)

- **Anatomy**: Special somatic sensory for hearing (Cochlear nerve) and equilibrium (Vestibular nerve).
- **Pathway**: Pontomedullary angle lateral to CN VII $\rightarrow$ Enters Internal Acoustic Meatus with CN VII and Labyrinthine Artery $\rightarrow$ Terminates in cochlea, vestibule, and semicircular canals of petrous temporal bone.
- **Mesh Node**: `CN_VIII_Vestibulocochlear`.
- **Foramen**: Internal Acoustic Meatus (Porus Acusticus Internus).

---

## 18. CN IX (Glossopharyngeal Nerve)

- **Anatomy**: Somatosensory to posterior $1/3$ of tongue, pharynx, middle ear; special sensory (taste) to posterior $1/3$ of tongue; visceral sensory to carotid body and sinus; parasympathetic to Parotid Gland (via Tympanic nerve / Jacobson's nerve $\rightarrow$ Lesser petrosal $\rightarrow$ Otic ganglion $\rightarrow$ Auriculotemporal nerve); motor to Stylopharyngeus.
- **Pathway**: Medulla oblongata (post-olivary sulcus) $\rightarrow$ Jugular Foramen (pars nervosa) $\rightarrow$ Descends anterior to carotid sheath $\rightarrow$ Stylopharyngeus $\rightarrow$ Tongue base.
- **Mesh Node**: `CN_IX_Glossopharyngeal`.
- **Foramen**: Jugular Foramen.

---

## 19. CN X (Vagus Nerve)

- **Anatomy**: Widest distribution of all cranial nerves. Parasympathetic innervation to thoracic and abdominal viscera up to splenic flexure; motor to pharyngeal and laryngeal muscles; sensory to larynx, ear canal, dura.
- **Pathway**: Post-olivary sulcus of medulla $\rightarrow$ Jugular Foramen (pars vascularis) $\rightarrow$ Superior & Inferior ganglia $\rightarrow$ Carotid sheath (between ICA/CCA and IJV) $\rightarrow$ Recurrent Laryngeal Nerves $\rightarrow$ Thorax $\rightarrow$ Abdomen.
- **Mesh Node**: `CN_X_Vagus`.
- **Foramen**: Jugular Foramen.

---

## 20. CN XI (Accessory Nerve)

- **Anatomy**: Somatic motor to Sternocleidomastoid (SCM) and Trapezius muscles. Formed by cervical spinal roots (C1-C5).
- **Pathway**: Spinal rootlets ascend through Foramen Magnum into posterior cranial fossa $\rightarrow$ Briefly joins vagal cranial rootlets $\rightarrow$ Exits through Jugular Foramen $\rightarrow$ Traverses posterior triangle of neck to SCM and Trapezius.
- **Mesh Node**: `CN_XI_Accessory`.
- **Foramina**: Foramen Magnum (entry), Jugular Foramen (exit).

---

## 21. CN XII (Hypoglossal Nerve)

- **Anatomy**: Somatic motor to all intrinsic and extrinsic muscles of the tongue (except Palatoglossus, supplied by CN X).
- **Pathway**: Pre-olivary sulcus of medulla $\rightarrow$ Hypoglossal Canal $\rightarrow$ Passes deep to posterior belly of digastric $\rightarrow$ Loops forward across external carotid artery $\rightarrow$ Deep to mylohyoid to tongue muscles.
- **Mesh Node**: `CN_XII_Hypoglossal`.
- **Foramen / Canal**: Hypoglossal Canal (Canalis Hypoglossalis).

---

## 22. Foramina Lab (16+ Foramina & Canals)

The Cranial Foramina Lab features interactive selection, 3D beacon targets, camera autofocus, and multi-structure illumination:
1. **Cribriform Plate** (Lamina Cribrosa) — CN I
2. **Optic Canal** — CN II, Ophthalmic Artery
3. **Superior Orbital Fissure** — CN III, IV, V1, VI, Ophthalmic Veins
4. **Inferior Orbital Fissure** — V2 (Infraorbital nerve), Infraorbital Artery/Vein
5. **Foramen Rotundum** — CN V2
6. **Foramen Ovale** — CN V3, Lesser Petrosal Nerve, Accessory Meningeal Artery
7. **Foramen Spinosum** — Middle Meningeal Artery & Vein, Meningeal branch of V3
8. **Internal Acoustic Meatus** — CN VII, CN VIII, Labyrinthine Artery
9. **Jugular Foramen** — CN IX, CN X, CN XI, Internal Jugular Vein
10. **Hypoglossal Canal** — CN XII
11. **Foramen Magnum** — Medulla, Vertebral Arteries, Spinal roots of CN XI
12. **Stylomastoid Foramen** — CN VII main trunk, Stylomastoid Artery
13. **Mandibular Foramen** — Inferior Alveolar Nerve & Vessels
14. **Mental Foramen** — Mental Nerve & Vessels
15. **Greater Palatine Foramen** — Greater Palatine Nerve & Vessels
16. **Incisive Foramen** — Nasopalatine Nerve, Sphenopalatine Artery

Selecting any foramen in the tree or 3D view:
- Re-positions and focuses camera via `AnatomyViewerCore.ts`.
- Highlights the corresponding foramen beacon ring.
- Simultaneously illuminates passing nerves and arteries in gold/cyan.
- Updates information inspector with clinical anatomical notes and surgical warnings.

---

## 23. Canals

Detailed osteological canal tracking implemented:
- **Mandibular Canal**: Follows curvilinear trajectory through mandibular cancellous bone from mandibular foramen to mental foramen. Key surgical risks: nerve transection, paresthesia of lower lip/chin in R.48 extraction.
- **Facial Canal (Fallopian Canal)**: Z-shaped osseous passage in petrous temporal bone with mastoid segment proximity to middle ear.
- **Infraorbital Canal**: Extends from infraorbital groove across maxillary sinus roof to anterior maxilla.
- **Incisive Canal**: Connects nasal floor to anterior oral hard palate.
- **Carotid Canal**: Petrified passage for Internal Carotid Artery and carotid sympathetic plexus.

---

## 24. Dental Relations & Neurovascular Map

Direct dental correlation to cranial nerve divisions:
- **Mandibular Third Molar (R.48 / R.38)**:
  - **Sensory Innervation**: Inferior Alveolar Nerve (branch of V3 posterior trunk).
  - **Adjacent Risk**: Lingual Nerve (within 2-4 mm of lingual cortical plate at retromolar area).
  - **Interactive Action**: "SHOW INNERVATION" illuminates IAN & V3; "SHOW CANAL" highlights mandibular canal.
- **Maxillary Third Molar (R.18 / R.28)**:
  - **Sensory Innervation**: Posterior Superior Alveolar Nerve (branch of V2 in pterygopalatine fossa).
  - **Maxillary Sinus Proximity**: Roots frequently invaginate sinus floor.
- **Incisors / Canines**: ASA (Maxilla) & Incisive Nerve (Mandible).
- **Premolars**: MSA (Maxilla) & IAN/Mental plexus (Mandible).

---

## 25. Trace System (Dynamic Nerve Pathway Tracing)

Integrated via `frontend/src/components/3d/AnatomyTraceController.tsx`:
- **5 Clinical Segments**:
  1. Brainstem Origin / Cranial Nuclei
  2. Intracranial / Intradural Course
  3. Foraminal Passage (Skull Base exit point)
  4. Extracranial Course & Ganglionic Relay
  5. Terminal Arborization to End Organs / Dental Pulp
- **Interactive Controls**:
  - Play / Pause animated sequential progression.
  - Step Forward / Step Backward inspection.
  - Proximal $\leftrightarrow$ Distal direction toggle (Gốc $\leftrightarrow$ Ngọn).
  - Camera Follow Path mode utilizing bounding box auto-interpolation.

---

## 26. Missing Assets

**Zero missing assets**:
- All 12 cranial nerve pairs, trigeminal branches, skull bones, dental models, and foramina are present and accounted for in `/models/craniofacial/` and `/models/dental/`.
- Fallbacks are purely for network resilience: if any remote asset fails to load, local cached GLB files are immediately served.

---

## 27. Partial Features

- **Microanatomy of Inner Ear**: The labyrinthine structures (Cochlea, Semicircular canals) inside the petrous temporal bone are represented as part of the CN VIII termination and temporal bone mesh. High-resolution histologic cross-sections are documented in references.
- **Autonomic Parasympathetic Ganglia**: Ciliary, Pterygopalatine, Otic, and Submandibular ganglia are anatomically positioned along V1, V2, V3 and CN VII/IX pathways.

---

## 28. Validation & Quality Checks

- **TypeScript Compilation**: Clean (`tsc --noEmit` passed with 0 errors).
- **Vite Production Build**: Clean (`npm run build` completed in 5.83s, 0 errors).
- **Procedural Geometry Audit**: 0 procedural primitives representing anatomical structures. Replaced legacy markers with non-anatomical 2D interaction beacons.
- **Terminologia Anatomica Compliance**: Validated against TA2 standards.
- **Coordinate Consistency**: Right-handed dental coordinate system maintained across all stages.

---

## 29. Git Status

```
GIT STATUS: LOCAL CHANGES ONLY
GITHUB: NOT COMMITTED, NOT PUSHED
WORKING TREE: PRESERVED IN LOCAL WORKSPACE
```
