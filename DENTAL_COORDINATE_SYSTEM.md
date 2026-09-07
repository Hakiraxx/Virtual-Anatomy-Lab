# QUY CHUẨN HỆ TỌA ĐỘ GIẢI PHẪU NHA KHOA & SỌ MẶT
# CANONICAL CRANIOFACIAL & DENTAL 3D COORDINATE SYSTEM

Tài liệu đặc tả chuẩn kỹ thuật tọa độ không gian 3D cho toàn bộ hệ thống giải phẫu Sọ Mặt, Xương hàm dưới (Mandible), Răng (Dentition), và Mạng lưới Thần kinh Sọ (Cranial Nerves) trong dự án **MedAnatomy 3D**.

---

## 1. Nguồn Gốc & Quy Chuẩn (Provenance & Reference Standard)
- **Chuẩn nguồn (Source Model)**: Z-Anatomy (CC BY-SA 4.0 / Glasgow Anatomical Repository).
- **Hệ quy chiếu (Reference System)**: Universal Craniofacial Metric Coordinate Frame.
- **Tính bất biến (Invariance)**: Tất cả cấu trúc (Xương, Răng, Dây thần kinh, Ống xương, Lỗ giải phẫu) được xuất xưởng từ cùng một không gian CAD chuẩn. Không dùng hệ số co giãn tùy biến (No arbitrary scale factor) và không dùng offset phỏng đoán (No manual visual guessing).

---

## 2. Hệ Trục Tọa Độ (Coordinate Axes & Handedness)
Hệ tọa độ Three.js tuân thủ chuẩn **Right-Handed Cartesian System** với tỷ lệ đo lường chuẩn mét ($1.0 = 1\text{m}$):

| Trục (Axis) | Chiều Giải Phẫu (Anatomical Direction) | Ý Nghĩa Lâm Sàng & Định Hướng |
| :--- | :--- | :--- |
| **Trục X** | **Mặt phẳng Đứng dọc (Sagittal Plane)** | - Đường giữa sọ mặt (Sagittal Midline): $X = 0.0451\text{m}$.<br>- Phía Phải bệnh nhân (Patient Right): $X < 0.0451\text{m}$ (ví dụ R.48 tại $X = 0.0118\text{m}$).<br>- Phía Trái bệnh nhân (Patient Left): $X > 0.0451\text{m}$ (ví dụ R.38 tại $X = 0.0784\text{m}$).<br>- Hướng về $X = 0.0451\text{m}$ là phía Trong/Lưỡi (Medial/Lingual).<br>- Hướng ra xa là phía Ngoài/Má (Lateral/Buccal). |
| **Trục Y** | **Mặt phẳng Đứng ngang (Coronal Plane / Superior-Inferior)** | - $+Y$: Phía Trên (Superior / Cranial / Occlusal).<br>- $-Y$: Phía Dưới (Inferior / Caudal / Apical).<br>- Vùng thân xương hàm dưới nằm trong khoảng $Y \in [0.7167\text{m}, 0.8111\text{m}]$.<br>- Đỉnh múi răng R48 tại $Y \approx 0.766\text{m}$, chóp chân răng tại $Y \approx 0.747\text{m}$. |
| **Trục Z** | **Mặt phẳng Ngang (Axial Plane / Anterior-Posterior)** | - $+Z$: Phía Trước (Anterior / Ventral / Mesial). Khớp cằm & môi nằm ở $+Z$ (ví dụ $Z \approx 0.083\text{m}$).<br>- $-Z$: Phía Sau (Posterior / Dorsal / Distal). Ngành lên xương hàm & lỗ chẩm nằm ở $-Z$ (ví dụ $Z \approx -0.011\text{m}$). |

---

## 3. Đơn Vị Đo Lường (Unit System)
- **Đơn vị chuẩn (Application Unit)**: **Mét (Meter - m)**.
- **Quy đổi kích thước giải phẫu**:
  - $1.0\text{ unit} = 1.0\text{ m} = 100\text{ cm} = 1000\text{ mm}$.
  - Chiều rộng xương hàm dưới (Mandible Width): $0.103\text{m} = 10.3\text{cm}$.
  - Chiều cao răng cối lớn thứ ba (R48/R38 Total Height): $0.021\text{m} = 21\text{mm}$.
  - Đường kính ống hàm dưới (Mandibular Canal Diameter): $0.003\text{m} = 3\text{mm}$.
  - Khoảng cách chóp chân răng tới thần kinh IAN: $0.0011\text{m} = 1.1\text{mm}$.

---

## 4. Tọa Độ Trọng Tâm Các Cấu Trúc (Canonical Centroids)

| Cấu Trúc Giải Phẫu | Asset Nguồn | Tọa Độ Thực Tế $[X, Y, Z]$ | Mối Quan Hệ Không Gian |
| :--- | :--- | :--- | :--- |
| **Xương hàm dưới (Mandible)** | `skull_complete.glb` (Node 462, Mesh 285) | $[0.0451, 0.7639, 0.0360]$ | Khung xương nền nâng đỡ toàn bộ hệ cung răng dưới |
| **Răng 48 (Mandibular Right 3rd Molar)** | `mandibular_third_molar_48.glb` | $[0.0118, 0.7580, 0.0295]$ | Nằm ngay phía xa (Distal) của R.47 ($[0.0150, 0.7527, 0.0394]$) |
| **Răng 38 (Mandibular Left 3rd Molar)** | `mandibular_third_molar_38.glb` | $[0.0784, 0.7580, 0.0295]$ | Đối xứng gương qua đường giữa $X = 0.0451\text{m}$ với R.48 |
| **TK Huyệt răng dưới Phải (IAN.r)** | `cranial_nerves_complete.glb` (Node 580, Mesh 354) | $[0.0228, 0.7478, 0.0464]$ | Chạy hoàn toàn bên trong ống xương hàm dưới Phải |
| **TK Huyệt răng dưới Trái (IAN.l)** | `cranial_nerves_complete.glb` (Node 575, Mesh 349) | $[0.0674, 0.7478, 0.0464]$ | Chạy hoàn toàn bên trong ống xương hàm dưới Trái |
| **TK Lưỡi Phải (Lingual Nerve.r)** | `cranial_nerves_complete.glb` (Node 581, Mesh 355) | $[0.0229, 0.7722, 0.0312]$ | Nằm ở phía trong/lưỡi so với thân răng R.48 |
| **TK Lưỡi Trái (Lingual Nerve.l)** | `cranial_nerves_complete.glb` (Node 576, Mesh 350) | $[0.0673, 0.7722, 0.0312]$ | Nằm ở phía trong/lưỡi so với thân răng R.38 |
| **Lỗ cằm & TK Cằm Phải (Mental Foramen.r)** | `cranial_nerves_complete.glb` (Node 578, Mesh 352) | $[0.0225, 0.7318, 0.0672]$ | Nằm ở mặt ngoài thân xương hàm dưới vùng chóp răng cối nhỏ |
| **Lỗ cằm & TK Cằm Trái (Mental Foramen.l)** | `cranial_nerves_complete.glb` (Node 573, Mesh 347) | $[0.0677, 0.7318, 0.0672]$ | Nằm ở mặt ngoài thân xương hàm dưới vùng chóp răng cối nhỏ |
| **Lỗ hàm dưới / Gai Spix Phải** | Bờ trong ngành lên Mandible | $[0.0228, 0.7700, 0.0100]$ | Nơi thần kinh IAN chui vào xương hàm dưới |

---

## 5. Kiến Trúc Cây Cấu Trúc Đơn Nhất (Single Root Transform)
```text
DentalSpecimenRoot (Position: [0, 0, 0], Rotation: [0, 0, 0], Scale: [1, 1, 1])
 ├── Mandible & Craniofacial Skeleton (skull_complete.glb at [0, 0, 0])
 │    ├── Mandible (Bone Opacity, Mesh 285)
 │    ├── Mandibular Dental Arch & Context Teeth (R.47, R.37, etc.)
 │    └── Cranial Vault (Context translucency at 0.15)
 ├── Craniofacial Nerves (cranial_nerves_complete.glb at [0, 0, 0])
 │    ├── Inferior Alveolar Nerve (.r for R48 / .l for R38)
 │    ├── Lingual Nerve (.r for R48 / .l for R38)
 │    └── Mental Nerve (.r for R48 / .l for R38)
 ├── Impacted Third Molar (AnatomicalMolarMesh)
 │    ├── Anchor Socket: [0.0118, 0.7580, 0.0295] for R48
 │    ├── Winter Angulation Transform
 │    └── Pell-Gregory Depth Offset
 └── Clinical Instruments & Simulation
      ├── Dental Syringe (Pointed at Gai Spix [0.0228, 0.7700, 0.0100])
      └── Flap, Bur, Suture (Relative to R48/R38 Crown)
```

---

## 6. Quy Tắc Chống Lỗi (Guarantees & Constraints)
1. **Zero Double Transforms**: Không áp dụng `applyMatrix4` chồng lên `group.position/rotation`.
2. **Zero Drift**: Khi chuyển đổi các góc nhìn hoặc thao tác bóc tách, việc trở về ban đầu luôn bảo toàn chính xác $[0, 0, 0]$ sai số $< 10^{-6}$.
3. **No Magic Offsets**: Không dịch chuyển tự do các mesh bằng các giá trị phỏng đoán thị giác.
4. **Draco Suspense Safe**: Tất cả component 3D sử dụng `useGLTF` đều có boundary `<React.Suspense fallback={...}>` để ngăn chặn màn hình đen.
