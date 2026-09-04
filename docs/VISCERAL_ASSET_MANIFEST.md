# VISCERAL ANATOMY 3D ASSET MANIFEST

**Asset File**: `frontend/public/models/anatomy/organs_complete.glb`
**Dataset Source**: Z-Anatomy (Lluís Villanova et al.) based on BodyParts3D / Anatomography (DBCLS)
**License**: Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA 4.0)
**Format**: glTF 2.0 Binary (GLB) with Draco compression
**Total Meshes**: 293
**Total Nodes**: 482
**File Size**: 2,148,996 bytes (~2.05 MB)

---

## 1. Organ Classification & Anatomical Breakdown

### A. Respiratory System (119 Nodes)
- **Lungs**: Left lung (superior & inferior lobes), Right lung (superior, middle, inferior lobes).
- **Bronchopulmonary Segments**:
  - Left Lung: Apicoposterior (SI+II), Anterior (SIII), Superior lingular (SIV), Inferior lingular (SV), Superior basal (SVI), Medial basal (SVII), Anterior basal (SVIII), Lateral basal (SIX), Posterior basal (SX).
  - Right Lung: Apical (SI), Posterior (SII), Anterior (SIII), Lateral (SIV), Medial (SV), Superior basal (SVI), Medial basal (SVII), Anterior basal (SVIII), Lateral basal (SIX), Posterior basal (SX).
- **Pleura**: Visceral & parietal pleura.
- **Airways**: Trachea, main bronchi, lobar bronchi, segmental bronchi.

### B. Hepatobiliary System (91 Nodes)
- **Liver**: Left lobe, right lobe, caudate lobe, quadrate lobe; Couinaud segments I through VIII.
- **Gallbladder**: Fundus, body, infundibulum, neck.
- **Biliary Ducts**: Common hepatic duct, cystic duct, bile duct (choledochus).

### C. Digestive Canal (40 Nodes)
- **Oesophagus**: Cervical, thoracic, and abdominal segments.
- **Stomach**: Cardia, fundus, body, antrum, pylorus, lesser and greater curvatures.
- **Small Intestine**: Duodenum (superior, descending, horizontal, ascending parts), Jejunum, Ileum.
- **Large Intestine**: Caecum, Vermiform appendix, Ascending colon, Transverse colon, Descending colon, Sigmoid colon, Rectum, Anal canal.

### D. Pancreas & Spleen (30 Nodes)
- **Pancreas**: Head, uncinate process, neck, body, tail; main pancreatic duct (Wirsung) and accessory duct (Santorini).
- **Spleen**: Diaphragmatic and visceral surfaces, splenic hilum.

### E. Urinary System (59 Nodes)
- **Kidneys**: Left & right kidneys, anterior & posterior surfaces, superior & inferior poles, hilum.
- **Renal Pelvis & Calyces**: Major and minor calyces, renal pelvis.
- **Ureters**: Abdominal and pelvic parts.
- **Urinary Bladder**: Apex, body, fundus, trigone, uvula.
- **Urethra**: Internal and external sphincters.

### F. Endocrine & Genital Systems (47 Nodes)
- **Thyroid & Parathyroids**: Left/right lobes, isthmus, pyramidal lobe, superior/inferior parathyroids.
- **Suprarenal (Adrenal) Glands**: Left & right adrenal cortex and medulla.
- **Reproductive (Male)**: Testes, epididymis, ductus deferens, seminal vesicles, prostate, penis.

---

## 2. Rendering & PBR Material Specification
- **Lungs**: Rose-pink (`#f472b6`), roughness 0.55.
- **Liver**: Terracotta reddish-brown (`#9a3412`), roughness 0.45.
- **Gallbladder**: Biliary emerald green (`#047857`), roughness 0.35.
- **Stomach**: Visceral warm amber-rose (`#f97316`), roughness 0.45.
- **Pancreas**: Glandular pale amber (`#eab308`), roughness 0.50.
- **Spleen**: Deep purple-wine (`#701a75`), roughness 0.40.
- **Intestines**: Enteric salmon-tan (`#fb923c`), roughness 0.50.
- **Kidneys**: Deep renal burgundy (`#881337`), roughness 0.42.
- **Bladder**: Translucent urinary amber (`#fef08a`), roughness 0.30.
