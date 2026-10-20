# MEDANATOMY 3D — DIGESTIVE SYSTEM 3D ASSETS PROVENANCE & MEDICAL REFERENCE

## 1. Asset Provenance & Licensing

All 3D anatomical structures for the MedAnatomy 3D Digestive System module are sourced from **Z-Anatomy** and integrated via the authoritative whole-body anatomical model (`frontend/public/models/anatomy/organs_complete.glb` and `vessels_complete.glb`).

- **Source**: Z-Anatomy (Open Source Human Anatomy Atlas)
- **Base Scientific Data**: BodyParts3D (Database Center for Life Science - DBCLS, University of Tokyo) & Z-Anatomy Anatomical Contributor Community.
- **License**: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
- **Coordinate Reference Frame**: Metric anatomical coordinate system aligned with MedAnatomy 3D's standard reference ($X=0.0451\text{m}$ sagittal midline, $+Y$ superior, $+Z$ anterior).

## 2. Segmented Anatomical Structures Catalog

### A. Oral Cavity & Major Salivary Glands
- **Tongue** (`Tongue`, Mesh 261, $Y \approx 0.7418\text{m}$)
- **Parotid Gland & Parotid Duct (Stensen's duct)** (`Parotid gland.l`, `Parotid gland.r`, `Parotid duct.l`, `Parotid duct.r`, Mesh 251-254)
- **Submandibular Gland & Duct (Wharton's duct)** (`Submandibular gland.l`, `Submandibular gland.r`, `Submandibular duct.l`, `Submandibular duct.r`, Mesh 256-258)
- **Sublingual Gland** (`Sublingual gland.l`, `Sublingual gland.r`, Mesh 255)
- **Soft Palate & Uvula** (`Soft palate`, `Uvula of palate`, Mesh 260, 262)

### B. Pharynx & Esophagus
- **Oropharynx & Laryngopharynx** (`Oropharynx`, `Laryngopharynx`, Mesh 280, 282, $Y \approx 0.7019 - 0.7557\text{m}$)
- **Esophagus** (`Oesophagus`, Mesh 167, $Y \approx 0.5314\text{m}$, cervical, thoracic, and abdominal segments; total length $\approx 32.3\text{cm}$)

### C. Gastroduodenal & Small Intestine
- **Stomach** (`Stomach`, Mesh 182, $Y \approx 0.3383\text{m}$, centered in Left Upper Quadrant / Epigastrium)
  - Segmented features: Cardia, Fundus, Body, Pyloric antrum, Pyloric canal, Lesser curvature, Greater curvature, Angular incisure
- **Duodenum** (`Duodenum`, Mesh 168, $Y \approx 0.2553\text{m}$, C-loop embracing pancreatic head)
- **Jejunum & Ileum** (`Jejunum`, Mesh 169, $Y \approx 0.1307\text{m}$, convoluted loops occupying umbilical and hypogastric regions)

### D. Large Intestine (Colon & Appendix)
- **Vermiform Appendix** (`Vermiform appendix`, Mesh 165, $Y \approx 0.0894\text{m}$, posteromedial aspect of cecum, McBurney's point)
- **Ascending Colon** (`Ascending colon`, Mesh 156, $Y \approx 0.1684\text{m}$, right paracolic gutter)
- **Transverse Colon** (`Transverse colon`, Mesh 164, $Y \approx 0.2632\text{m}$, suspended via transverse mesocolon)
- **Descending Colon** (`Descending colon`, Mesh 158, $Y \approx 0.1507\text{m}$, left paracolic gutter)
- **Sigmoid Colon** (`Sigmoid colon`, Mesh 159, $Y \approx -0.0074\text{m}$, pelvic inlet)
- **Taeniae Coli** (`Free taenia`, `Mesocolic taenia`, `Omental taenia`, Mesh 160-163)

### E. Hepatobiliary System & Couinaud Liver Segments
- **Liver** (`Liver`, Mesh 244, $Y \approx 0.3476\text{m}$, Right Upper Quadrant)
  - Segment I: Caudate Lobe (`Posterior segment of liver (I)`, Mesh 229)
  - Segment II: Left Superior Lateral (`Left posterior lateral segment of liver (II)`, Mesh 218)
  - Segment III: Left Inferior Lateral (`Left anterior lateral segment of liver (III)`, Mesh 210)
  - Segment IV: Left Medial / Quadrate (`Left medial segment of liver (IV)`, Mesh 216)
  - Segment V: Right Anterior Inferior (`Anterior medial segment of liver (V)`, Mesh 195)
  - Segment VI: Right Posterior Inferior (`Anterior lateral segment of liver (VI)`, Mesh 192)
  - Segment VII: Right Posterior Superior (`Posterior lateral segment of liver (VII)`, Mesh 225)
  - Segment VIII: Right Anterior Superior (`Posterior medial segment of liver (VIII)`, Mesh 226)
- **Gallbladder** (`Gallbladder`, Mesh 191, $Y \approx 0.3047\text{m}$, Fundus, Body, Infundibulum / Hartmann's pouch, Neck)
- **Bile Duct (Ductus Choledochus)** (`Bile duct`, Mesh 184, $Y \approx 0.2919\text{m}$)

### F. Pancreas & Ductal System
- **Pancreas** (`Pancreas`, Mesh 279, $Y \approx 0.2805\text{m}$, retroperitoneal organ, Head, Uncinate process, Neck, Body, Tail)
- **Main Pancreatic Duct (Duct of Wirsung)** (`Pancreatic duct`, Mesh 273, $Y \approx 0.2826\text{m}$)
- **Accessory Pancreatic Duct (Duct of Santorini)** (`Accessory pancreatic duct`, Mesh 263)

### G. Peritoneal Structures & Mesenteries
- **Greater Omentum** (`Greater omentum`, Mesh 285)
- **Lesser Omentum (Hepatogastric & Hepatoduodenal ligaments)** (`Lesser omentum`, Mesh 286)
- **Mesocolon** (`Mesocolon`, Mesh 288)
- **Meso-appendix** (`Meso-appendix`, Mesh 287)

### H. Splanchnic Vasculature (from vessels_complete.glb)
- Celiac Trunk & branches (Common hepatic, Left gastric, Splenic arteries)
- Superior Mesenteric Artery & branches
- Inferior Mesenteric Artery & branches
- Hepatic Portal System (Portal vein, Splenic vein, Superior mesenteric vein)

## 3. Medical References & Standards
1. *Terminologia Anatomica (TA2)*, Federative International Programme on Anatomical Terminologies (FIPAT), International Federation of Associations of Anatomists (IFAA).
2. *Gray's Anatomy: The Anatomical Basis of Clinical Practice*, 42nd Edition, Elsevier, 2020.
3. *Netter Atlas of Human Anatomy: Classic Regional Approach*, 8th Edition, Frank H. Netter, Elsevier, 2022.
4. *Giải Phẫu Người*, GS.BS. Nguyễn Quang Quyền, NXB Y Học.
