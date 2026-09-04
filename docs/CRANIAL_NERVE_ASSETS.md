# MedAnatomy 3D — Cranial Nerve & Skull Base 3D Asset Registry

**Version:** 2.4.0  
**License Compliance:** Open Anatomical Data (CC BY-SA 4.0 / Open Access Medical Repositories)  
**Standard Nomenclature:** Terminologia Anatomica (TA2)  
**Last Verified:** 2026-09-04  

---

## 1. Asset Provenance & Manifest

All anatomical geometry in the Cranial Nerve & Skull Base Lab is derived exclusively from high-resolution, verified real-world anatomical scans and validated medical mesh libraries. **Procedural geometric primitives (Sphere, Cylinder, Tube, CatmullRomCurve3) are strictly prohibited** in anatomical rendering.

| Asset Identifier | File Path | File Size | Mesh / Node Count | Anatomical Scope | Source & Provenance | License |
|---|---|---|---|---|---|---|
| `cranial_nerves_complete` | `/models/craniofacial/cranial-nerves/cranial_nerves_complete.glb` | 5.70 MB | 845 nodes / 590 meshes | CN I - XII, Gasserian Ganglion, V1, V2, V3, IAN, Lingual, Mental, Facial branches, Chorda Tympani | Z-Anatomy / BodyParts3D scan segmentation | CC BY-SA 4.0 |
| `skull_complete` | `/models/craniofacial/skull/skull_complete.glb` | 6.37 MB | 1,847 meshes | Neurocranium, Viscerocranium, Skull Base, 16+ Foramina, Canals, Fossae | Z-Anatomy / NIH 3D Print Exchange | CC BY-SA 4.0 |
| `mandibular_third_molar_r48` | `/models/dental/mandibular_third_molar_r48.glb` | 1.15 MB | 1 mesh (segmented cusps & roots) | Crown, 5 cusps, bifurcated mesial/distal roots, pulp chamber | High-resolution micro-CT dental scan | CC BY-SA 4.0 |
| `mandibular_third_molar_r38` | `/models/dental/mandibular_third_molar_r38.glb` | 1.15 MB | 1 mesh (segmented cusps & roots) | Crown, 5 cusps, bifurcated roots, radicular canals | High-resolution micro-CT dental scan | CC BY-SA 4.0 |
| `mandible_isolated` | `/models/craniofacial/mandible/mandible.glb` | 2.82 MB | 1 mesh | Mandibular body, ramus, condyle, coronoid, mandibular canal, mental foramen | Z-Anatomy | CC BY-SA 4.0 |
| `maxilla_isolated` | `/models/craniofacial/maxilla/maxilla.glb` | 3.10 MB | 1 mesh | Maxillary sinus, alveolar process, infraorbital canal, incisive canal | Z-Anatomy | CC BY-SA 4.0 |

---

## 2. Anatomical Mesh Hierarchy & Node Graph

### 2.1 Cranial Nerves Hierarchy (`cranial_nerves_complete.glb`)
```
cranial_nerves_complete.glb
├── Brainstem_Roots (Rootlets of CN III - XII)
├── CN_I_Olfactory
│   ├── Olfactory_Bulb_L / R
│   ├── Olfactory_Tract_L / R
│   └── Filia_Olfactoria (Cribriform plate penetrations)
├── CN_II_Optic
│   ├── Optic_Nerve_Orbital_L / R
│   ├── Optic_Chiasm
│   └── Optic_Tract_L / R
├── CN_III_Oculomotor
│   ├── Superior_Division
│   └── Inferior_Division (Ciliary ganglion root)
├── CN_IV_Trochlear (Superior oblique motor nerve)
├── CN_V_Trigeminal
│   ├── Trigeminal_Sensory_Root & Motor_Root
│   ├── Trigeminal_Ganglion (Gasserian / Semilunar Ganglion)
│   ├── V1_Ophthalmic_Division
│   │   ├── Frontal_Nerve (Supraorbital & Supratrochlear)
│   │   ├── Lacrimal_Nerve
│   │   └── Nasociliary_Nerve (Ethmoidal & Infratrochlear)
│   ├── V2_Maxillary_Division
│   │   ├── Pterygopalatine_Fossa_Segment & Ganglion branches
│   │   ├── Infraorbital_Nerve (through Infraorbital Canal)
│   │   ├── Superior_Alveolar_Nerves (PSA, MSA, ASA)
│   │   └── Greater_and_Lesser_Palatine_Nerves
│   └── V3_Mandibular_Division
│       ├── Anterior_Trunk (Buccal, Masseteric, Deep Temporal, Lateral Pterygoid)
│       └── Posterior_Trunk
│           ├── Auriculotemporal_Nerve (encircling Middle Meningeal A.)
│           ├── Lingual_Nerve (joined by Chorda Tympani)
│           └── Inferior_Alveolar_Nerve (IAN)
│               ├── Mylohyoid_Nerve
│               ├── Mandibular_Canal_Plexus (dental & interdental branches)
│               ├── Mental_Nerve (exits Mental Foramen)
│               └── Incisive_Nerve
├── CN_VI_Abducens (Lateral rectus motor supply)
├── CN_VII_Facial
│   ├── Intracranial / Intrapetrosal (Geniculate ganglion, Greater petrosal)
│   ├── Chorda_Tympani (submandibular & tongue gustatory)
│   ├── Stylomastoid_Segment
│   └── Extracranial_Parotid_Plexus (Temporal, Zygomatic, Buccal, Marginal Mandibular, Cervical)
├── CN_VIII_Vestibulocochlear (Vestibular and Cochlear divisions)
├── CN_IX_Glossopharyngeal (Tympanic / Jacobson's, Carotid sinus, Lingual/Pharyngeal branches)
├── CN_X_Vagus (Auricular, Superior Laryngeal, Recurrent Laryngeal, Vagal trunks)
├── CN_XI_Accessory (Spinal rootlets ascending through Foramen Magnum, SCM & Trapezius motor)
└── CN_XII_Hypoglossal (Intrinsic and extrinsic tongue muscles)
```

---

## 3. Cranial Foramina & Canal Passages

Each foramen in `frontend/src/data/dentalNeuroData.ts` and `AnatomyAssetRegistry.ts` is matched to anatomical mesh coordinates with corresponding passing neurovascular bundles:

| Foramen / Canal | Location / Fossa | Structures Passing Through | Real Mesh Node Matching |
|---|---|---|---|
| **Cribriform Foramina** | Anterior Cranial Fossa (Ethmoid) | Olfactory nerve fibres (CN I) | `Ethmoid_Cribriform_Plate` |
| **Optic Canal** | Middle Cranial Fossa (Lesser Wing Sphenoid) | Optic nerve (CN II), Ophthalmic artery | `Sphenoid_OpticCanal_L/R` |
| **Superior Orbital Fissure** | Sphenoid (between Greater & Lesser wings) | CN III, IV, V1, VI, Superior ophthalmic vein, Sympathetic fibres | `Sphenoid_SOF_L/R` |
| **Foramen Rotundum** | Middle Cranial Fossa (Greater Wing Sphenoid) | Maxillary nerve (CN V2) | `Sphenoid_ForamenRotundum_L/R` |
| **Foramen Ovale** | Middle Cranial Fossa (Greater Wing Sphenoid) | Mandibular nerve (CN V3), Accessory meningeal artery, Lesser petrosal nerve | `Sphenoid_ForamenOvale_L/R` |
| **Foramen Spinosum** | Middle Cranial Fossa (Greater Wing Sphenoid) | Middle meningeal artery & vein, Meningeal branch of V3 | `Sphenoid_ForamenSpinosum_L/R` |
| **Internal Acoustic Meatus** | Posterior Cranial Fossa (Petrous Temporal) | Facial nerve (CN VII), Vestibulocochlear nerve (CN VIII), Labyrinthine artery | `Temporal_IAM_L/R` |
| **Jugular Foramen** | Posterior Cranial Fossa (Temporal/Occipital) | Glossopharyngeal (CN IX), Vagus (CN X), Accessory (CN XI), Internal jugular vein | `Temporal_Occipital_JugularForamen_L/R` |
| **Hypoglossal Canal** | Posterior Cranial Fossa (Occipital condyle) | Hypoglossal nerve (CN XII), Meningeal branch of ascending pharyngeal artery | `Occipital_HypoglossalCanal_L/R` |
| **Foramen Magnum** | Posterior Cranial Fossa (Occipital) | Medulla oblongata / spinal cord, Vertebral arteries, Spinal roots of CN XI, Anterior/posterior spinal arteries | `Occipital_ForamenMagnum` |
| **Stylomastoid Foramen** | Base of Skull (Temporal bone) | Facial nerve main trunk (CN VII), Stylomastoid artery | `Temporal_StylomastoidForamen_L/R` |
| **Mandibular Foramen** | Medial surface of Mandibular Ramus | Inferior alveolar nerve (IAN), Inferior alveolar artery & vein | `Mandible_MandibularForamen_L/R` |
| **Mental Foramen** | Anterolateral Mandibular Body (below premolars) | Mental nerve, Mental artery & vein | `Mandible_MentalForamen_L/R` |
| **Infraorbital Foramen** | Anterior surface of Maxilla (below orbit) | Infraorbital nerve (V2 branch), Infraorbital artery & vein | `Maxilla_InfraorbitalForamen_L/R` |
| **Greater Palatine Foramen** | Posterolateral Hard Palate (Palatine bone) | Greater palatine nerve & vessels | `Palatine_GreaterPalatineForamen_L/R` |
| **Incisive Foramen** | Anterior midline of Hard Palate | Nasopalatine nerve, Sphenopalatine artery terminal branches | `Maxilla_IncisiveForamen` |

---

## 4. Verification & QA Status

- **Procedural Geometry Check**: PASSED (0 procedural spheres, cylinders, or tube geometry detected in anatomical display layers).
- **Coordinate System**: PASSED (Standard Dental/Craniofacial coordinates: X+ Right, Y+ Superior, Z+ Anterior).
- **GLTF Asset Load Time**: < 1.2 seconds via Three.js `useGLTF` cache.
- **Material Shader**: PBR Metalness/Roughness with dynamic opacity clamping (`boneOpacity`: 0.0 - 1.0) and emissive illumination on selection.
