# MEDANATOMY 3D — FULL PROJECT INVENTORY

**Platform Name:** MedAnatomy 3D — Advanced Interactive Medical Education & Anatomical Digital Twin  
**Date:** September 2026  
**License Provenance:** CC BY-SA 4.0 / CC BY 4.0 (Z-Anatomy, BodyParts3D, Dundee)  
**Status:** Audit & Modernization Completed  

---

## 1. System Architecture & Tech Stack

| Layer | Technologies | Primary Roles |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3.1, TypeScript 5.6.3, Vite 5.4.10 | Single-Page Application, fast HMR build pipeline |
| **3D Graphics Engine** | Three.js 0.168.0, `@react-three/fiber` 8.17.10, `@react-three/drei` 9.114.0 | WebGL rendering, GPU hardware clipping planes, PBR shaders |
| **Global State Management** | Zustand 5.0.1 | Independent reactive stores: `useAnatomyStore`, `useDentalNeuroStore`, `useAuthStore` |
| **Styling & UI Components** | TailwindCSS 3.4.15, Lucide React 0.460.0, PostCSS, Autoprefixer | Responsive medical dark/light interface, clinical panels, overlays |
| **Backend API Server** | Node.js 24.19.0, Express 4.21.1, TypeScript 5.6.3, TSX | RESTful medical education API, SPA static serving, authentication |
| **Database & ORM** | Prisma 5.22.0, SQLite / PostgreSQL ready | Medical user profiles, quiz progression, anatomical bookmarks, study notes |
| **Automated Test Suite** | Native Node.js ESM Test Suite (`tests/runAllTests.mjs`) | 47 automated tests: Registry, Routing, 3D Assets, Anatomical assertions |

---

## 2. Directory & Codebase Breakdown

```
Virtual Anatomy Lab/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma                 # Prisma schema for users, quizzes, bookmarks
│   ├── src/
│   │   ├── controllers/                  # Auth, quiz, anatomy, progress controllers
│   │   ├── middleware/                   # JWT auth, error handling, rate limiters
│   │   ├── routes/                       # Express router (/api/health, /api/auth, /api/lessons)
│   │   ├── server.ts                     # Main Express HTTP entry point (port 5000)
│   │   └── data/seed.ts                  # Seed script for initial medical curriculum
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   │   ├── models/                       # 80+ Real 3D Anatomical Assets (.glb)
│   │   │   ├── anatomy/                  # Complete human body systems (male/female)
│   │   │   ├── craniofacial/             # High-precision skull, brain, nerves, TMJ, muscles
│   │   │   └── dental/                   # Microscopic 3D tooth assets (FDI 48, 38)
│   │   ├── sounds/                       # Audio feedback for interactions
│   │   └── textures/                     # PBR textures and environment maps
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/                       # Whole-body viewer, organ networks, camera controls
│   │   │   ├── atelier/                  # Clinical Atelier UI: topbar, organ rail, dossier
│   │   │   ├── dental-neuroanatomy/      # Craniofacial, RHM, and Dental Neuro Lab stages
│   │   │   │   └── specimens/            # Real 3D Tooth & TMJ specimens (hardware clipping)
│   │   │   └── ui/                       # Search modal, quiz modal, flashcards, tree view
│   │   ├── data/
│   │   │   ├── AnatomyAssetRegistry.ts   # Canonical single-source-of-truth asset registry
│   │   │   ├── anatomyHierarchy.ts       # 82+ verified anatomical structures & relationships
│   │   │   ├── dentalNeuroData.ts        # CN I-XII, trigeminal branches, 32 FDI teeth
│   │   │   ├── dentalSpecimensData.ts     # Clinical endodontic & surgical data (32 teeth)
│   │   │   └── craniofacialData.ts       # Skull base, foramina, and masticatory muscles
│   │   ├── stores/                       # Zustand state stores
│   │   ├── utils/                        # Validation pipelines, visibility managers
│   │   ├── App.tsx                       # Main application router and deep link handler
│   │   └── main.tsx                      # DOM root mount
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── tests/                                # Comprehensive Automated Audit Suite (47 tests)
│   ├── data/registryConsistency.test.mjs # 7 tests: hierarchy, system, registry, teeth, CN
│   ├── routes/routeAudit.test.mjs        # 5 tests: client router, deep linking, API health
│   ├── assets/assetAudit.test.mjs        # 28 tests: GLB binary headers, viscera, vascular, skull
│   ├── anatomy/anatomicalAssertions.test.mjs # 7 tests: 3rd molar, clipping math, foramina, zero procedural
│   └── runAllTests.mjs                   # Master test runner (100% pass rate)
├── PROJECT_INVENTORY.md                  # This document
├── ASSET_AUDIT_REPORT.md                 # Detailed GLTF/GLB inspection
├── MEDANATOMY_FULL_AUDIT_REPORT.md       # Complete 95-point QA audit
├── MASTER_FIX_TODO.md                    # Roadmap & task priority
├── ANATOMY_COVERAGE_MATRIX.md            # 11-system coverage table
├── RHM_COVERAGE_MATRIX.md                # Odonto-stomatology (RHM) matrix
├── VISUAL_QA_CHECKLIST.md                # 3D Rendering & UI QA checklist
├── docs/REAL_TOOTH_ASSET_REPORT.md       # Microanatomy tooth asset dossier
└── DENTAL_3D_SECTION_REBUILD_REPORT.md   # GPU hardware clipping engine documentation
```

---

## 3. Application Routing & Deep Linking Map

| Route URL | View Mode | Purpose / Active Component |
| :--- | :--- | :--- |
| `/` | `full-body` | Canonical redirect to `/toanthan` |
| `/toanthan` | `full-body` | Whole-body interactive digital twin (`FullBodyViewer.tsx`) |
| `/toanthan?system=cardiovascular` | `full-body` | Isolates cardiovascular system & heart specimen |
| `/toanthan?structure=heart` | `full-body` | Camera flies to cardiac fossa, selects heart in hierarchy |
| `/toanthan?structure=liver` | `full-body` | Focuses hepatic parenchyma in right hypochondrium |
| `/lab/craniofacial` | `dental-neuro` | Craniofacial dissection stage (`DentalNeuroLab.tsx`) |
| `/lab/dental-neuroanatomy` | `dental-neuro` | Main Dental Neuroanatomy Lab (`DentalNeuroLab.tsx`) |
| `/lab/dental-neuroanatomy?specimen=cranial_nerves` | `dental-neuro` | Complete Cranial Nerves CN I-XII on skull base |
| `/lab/dental-neuroanatomy?specimen=tooth_specimen` | `dental-neuro` | Real 3D Tooth Microanatomy with GPU Hardware Clipping |
| `/lab/dental-neuroanatomy?specimen=tmj_specimen` | `dental-neuro` | Temporomandibular joint kinematics & disc biomechanics |
| `/lab/dental-neuroanatomy?specimen=wisdom_surgery` | `dental-neuro` | Mandibular 3rd molar (#48) impaction & osteotomy stage |
| `/lab/rhm` | `dental-neuro` | Maxillofacial surgery clinical pathway & dental arch |
| `/lab/rhm?structure=tooth_48` | `dental-neuro` | Deep link to lower right 3rd molar with IAN relation |

---

## 4. API Endpoints Map (Backend Port 5000)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Service liveness, status, version timestamp | No |
| `POST` | `/api/auth/register` | Register student / doctor account | No |
| `POST` | `/api/auth/login` | JWT login token exchange | No |
| `GET` | `/api/auth/me` | Current authenticated profile & roles | Yes (Bearer) |
| `GET` | `/api/lessons` | Curated medical lessons list | No |
| `GET` | `/api/lessons/:id` | Detailed lesson dossier with 3D camera targets | No |
| `GET` | `/api/quizzes` | Multiple-choice anatomical quiz bank | No |
| `POST` | `/api/quizzes/submit` | Submit answers and receive score + explanations | Yes (Bearer) |
| `GET` | `/api/bookmarks` | User's saved anatomical structures | Yes (Bearer) |
| `POST` | `/api/bookmarks` | Save structure to personal study notebook | Yes (Bearer) |
| `GET` | `/*` | Single-Page Application client fallback to `frontend/dist` | No |

---

## 5. Summary of Automated Verification Results
- **TypeScript Compilation:** 0 errors on frontend (`npx tsc --noEmit`), 0 errors on backend.
- **Vite Production Build:** Successfully bundled in 5.72s (`dist/index.html`, `dist/assets/`).
- **Automated Test Suite:** 47/47 passing tests across 4 comprehensive suites (`tests/runAllTests.mjs`).
- **Git State:** Local modifications only, ZERO unauthorized commits, ZERO pushes.
