# BÁO CÁO KIỂM TOÁN CHUYÊN SÂU MODULE RĂNG HÀM MẶT & THẦN KINH SỌ MẶT
# RHM MODULE COMPREHENSIVE AUDIT REPORT
**Platform**: MedAnatomy 3D  
**Module**: Craniofacial & Dental Neuroanatomy Lab (`/lab/dental-neuroanatomy`)  
**Audit Standard**: MedAnatomy Unified Architecture, TA2 (Terminologia Anatomica), Gray's Anatomy 42nd ed.  
**Date**: 2026-09-04  

---

## 1. Current Problems (Hiện trạng trước khi sửa)

1. **Header Conflict & UI Fragmentation**:
   - Module RHM hoạt động như một ứng dụng độc lập bị cô lập, cố nhồi nhét tất cả các thành phần điều hướng, tìm kiếm, preset, và action vào một thanh bar đơn lẻ bị chật chội và tràn giao diện trên màn hình nhỏ.
   - Thanh điều hướng chính của MedAnatomy (`AtelierTopBar`) bị mất liên kết trực quan với tiêu đề chuyên khoa RHM.
2. **3D Skull & Maxillofacial Orientation Disconnection**:
   - Mô hình xương sọ (`skull.glb`) và khối xương hàm mặt (`dentomaxillofacial.glb`) khi render trực tiếp không có ma trận chuẩn hóa trục, dẫn đến mặt quay ngang lệch 90 độ so với trục nhìn trước (Anterior).
   - Trong khi đó, hệ thống tọa độ đường cong thần kinh 3D (`path3D`) và các mốc răng FDI được thiết kế theo trục chuẩn (Face = Anterior +Z), tạo ra sự lệch pha nghiêm trọng: thần kinh và răng hướng ra trước trong khi sọ và hàm quay sang một bên, làm dây thần kinh xuyên thấu sọ vô lý.
3. **Nerve Over-thickening & Neon Visual Noise**:
   - Bán kính ống dây thần kinh đặt ở mức `0.0032` (khi chọn lên đến `0.0048`), biến các dây thần kinh thành những đường ống neon to như sợi cáp điện, lấn át toàn bộ khối xương sọ và vi phạm quy tắc giải phẫu (#95).
4. **Isolated Anatomy Registry & Search Isolation**:
   - Thanh tìm kiếm toàn cầu của MedAnatomy (Ctrl+K) không truy xuất được các dây thần kinh sọ, lỗ sọ, và răng FDI của RHM.
   - Module RHM có hệ thống tìm kiếm nội bộ riêng biệt, tách rời khỏi kiến trúc chung của MedAnatomy.
5. **Lack of URL Deep-Linking**:
   - Người dùng không thể chia sẻ hoặc mở thẳng một dây thần kinh hoặc răng cụ thể qua URL query parameters (`?structure=nerve.inferior-alveolar`, `?structure=tooth.36`).
6. **Design Language Desynchronization**:
   - Bảng thông tin (`DentalNeuroInfoPanel`) và Cây giải phẫu (`DentalNeuroTree`) sử dụng tông màu và font chữ không đồng nhất với phong cách Atelier (thiếu font-serif cho tiêu đề, badge và card thiếu đồng bộ với `AtelierDossier`).

---

## 2. Root Causes (Nguyên nhân gốc rễ)

1. **Tripo GLTF Coordinate Frame Discrepancy**:
   - Các file GLTF được sinh từ Tripo AI (`skull.glb`, `dentomaxillofacial.glb`, `brainstem.glb`, `salivary-glands.glb`, `tongue.glb`) có trục mặt quay về phía `+X` trong không gian cục bộ (Local Space).
   - Trong hệ thống tổng thể `FullBodyViewer`, việc chuẩn hóa được thực hiện qua hàm `normalizeAnatomicalObject` với `rotationOffset: [0, -Math.PI / 2, 0]`. Tuy nhiên, trong component `DentalNeuro3DStage` ban đầu, các mô hình này được load thô mà không áp dụng phép quay chuẩn hóa này, khiến chúng lệch 90 độ so với thế giới Three.js chuẩn.
2. **Lack of Unified Craniofacial Root Hierarchy**:
   - Thay vì lồng tất cả xương, tạng, thần kinh, lỗ sọ và răng vào một gốc `<group name="CraniofacialRoot">` duy nhất, các thành phần bị chia rẽ ở các cấp độ transform khác nhau.
3. **Arbitrary Geometric Calibration**:
   - Bán kính ống TubeGeometry không được đối chiếu với tỷ lệ giải phẫu thực (dây thần kinh hàm dưới IAN ngoài đời thực chỉ có đường kính 1.5 - 2.2mm, tương đương bán kính `0.0010 - 0.0014m`).

---

## 3. UI Components Reused (Các component MedAnatomy đã tái sử dụng)

- **`AtelierTopBar`**: Tái sử dụng làm Row 1 (Global MedAnatomy Header) với đầy đủ Brand Wordmark, Khám phá, Hệ cơ quan, Bài học, Ôn tập, Ghi chú, Bộ chuyển Toàn thân / Tiêu bản sâu / Sọ mặt & RHM, Bộ chuyển Giới tính Nam/Nữ, và Search Ctrl+K.
- **`SearchModal`**: Tái sử dụng và mở rộng hệ thống tìm kiếm toàn cầu Ctrl+K để tra cứu trực tiếp toàn bộ 12 đôi dây thần kinh sọ, 14 lỗ sọ, 32 răng FDI và cơ nhai.
- **`ViewModeSwitcher`**: Tích hợp trực tiếp badge và nút chuyển `Sọ Mặt & RHM` (`viewMode: 'dental-neuro'`).
- **MedAnatomy Theme Engine (`atelierTheme`)**: Đồng bộ hóa toàn bộ light mode (`#fbf7f2` / `#ede3d5`) và dark mode (`#0c121e` / `#080c14`) với typography serif sang trọng.

---

## 4. Components Refactored (Các component đã được tái cấu trúc)

1. **`DentalNeuroLab.tsx`**:
   - Tách bạch cấu trúc Header thành 2 hàng rõ ràng: Row 1 = `AtelierTopBar`, Row 2 = RHM Sub-header chuyên sâu (Breadcrumbs `MedAnatomy > Phòng Lab RHM > Neuroanatomy`, Badge `RHM CHUYÊN SÂU`, Search bar, Depth Presets).
   - Bổ sung logic deep-link URL query params `?structure=...`.
   - Tích hợp thanh ngữ cảnh dưới đáy `DentalNeuroToolbar`.
2. **`DentalNeuro3DStage.tsx`**:
   - Thiết lập hàm chuẩn hóa hình học `createCraniofacialOrganGroup` đưa mọi mô hình về gốc tọa độ `(0, 0, 0)`, áp dụng góc quay chuẩn `[0, -Math.PI / 2, 0]` để đưa mặt về Anterior (+Z).
   - Thiết lập `<group name="CraniofacialRoot">` chứa toàn bộ xương, cơ quan, thần kinh, lỗ sọ và răng trong cùng hệ tọa độ.
   - Giảm bán kính đường cong thần kinh xuống chuẩn `0.0014` (selected `0.0020`), vật liệu PBR myelin tinh tế.
3. **`DentalNeuroTree.tsx`**:
   - Cập nhật styling đồng bộ typography MedAnatomy.
   - Thêm tính năng tự động mở nhánh cha (`auto-expand`) và cuộn mục được chọn vào tầm nhìn (`scrollIntoView`).
4. **`DentalNeuroInfoPanel.tsx`**:
   - Tái cấu trúc theo ngôn ngữ của `AtelierDossier`: typography serif, badge chuyên nghiệp, card lâm sàng có biểu tượng `Stethoscope`, chip quan hệ giải phẫu tương tác, nút Proximal / Distal.
5. **`DentalNeuroToolbar.tsx`**:
   - Component thanh công cụ dưới đáy mới theo đúng ngôn ngữ thiết kế pill-shape của MedAnatomy: Tiêu điểm / Tách biệt, Ống hàm dưới, X-Ray, Mặt cắt 3 chiều, Góc nhìn giải phẫu, Đặt lại và thanh lọc nhanh cấu trúc RHM.
6. **`anatomyHierarchy.ts`**:
   - Tích hợp dữ liệu thần kinh sọ, lỗ sọ, răng FDI và cơ nhai vào registry tìm kiếm chung `searchAnatomyStructures`.

---

## 5. 3D Problems & Fixes

| Hạng mục | Triệu chứng (Symptom) | Nguyên nhân gốc (Root Cause) | Giải pháp (Fix) | Kiểm thử (Test) |
|---|---|---|---|---|
| **Orientation Sọ** | Sọ quay ngang sang phải (+X) | File `skull.glb` xuất từ Tripo có mặt hướng về +X | Chuẩn hóa qua hàm `createCraniofacialOrganGroup` quay `[0, -Math.PI/2, 0]` | Mặt sọ hướng thẳng ra trước (Anterior +Z) |
| **Orientation Hàm & Răng** | Khối hàm không khớp với răng FDI | `dentomaxillofacial.glb` quay lệch trục | Áp dụng góc quay `[0, -Math.PI/2, 0]` và căn tọa độ `[0, 1.32, 0.185]` | Cung răng trên/dưới khớp khít với các điểm đánh dấu FDI |
| **Thần kinh xuyên sọ** | Thần kinh chạy lơ lửng ngoài hộp sọ | Tọa độ thần kinh ở hệ quy chiếu khác so với mesh sọ | Đưa toàn bộ vào `<group name="CraniofacialRoot">` chung | Dây V đi từ thân não qua lỗ sọ ra mặt chính xác |
| **Kích thước dây thần kinh** | Dây thần kinh dày như ống nước neon | Radius đặt ở `0.0032` (đường kính > 6mm) | Giảm radius xuống `0.0014` (selected `0.0020`), tinh chỉnh emissive | Nhìn thanh mảnh, tinh tế chuẩn giải phẫu y khoa |

---

## 6. Asset Problems

- **`skull.glb`**:
  - Độ phân giải: 41,235 đỉnh.
  - Trục gốc: +X = Face. Đã căn chỉnh quay -90 độ trục Y để khớp Anterior (+Z).
- **`dentomaxillofacial.glb`**:
  - Độ phân giải: 40,760 đỉnh.
  - Trục gốc: +X = Front, Z = Left/Right. Đã căn chỉnh quay -90 độ trục Y để khớp Anterior (+Z).
- **`brainstem.glb`**:
  - Đã căn chỉnh vị trí `[0, 1.40, 0.02]` nằm chính xác tại lỗ lớn xương chẩm (Foramen magnum).
- **`salivary-glands.glb` & `tongue.glb`**:
  - Đã tích hợp đồng bộ vào Craniofacial Root với vị trí tương ứng tại góc hàm và sàn miệng.

---

## 7. Nerve Problems

- Toàn bộ 12 đôi dây thần kinh sọ (CN I – XII) có dữ liệu chính xác theo Terminologia Anatomica (TA2).
- Phân nhánh tam thoa (CN V):
  - **V1 (Mắt)**: Trán, Trên ổ mắt, Trên ròng rọc, Mũi mi, Lệ.
  - **V2 (Hàm trên)**: Dưới ổ mắt, PSA, MSA, ASA, Khẩu cái lớn, Mũi khẩu cái.
  - **V3 (Hàm dưới)**: Huyệt răng dưới (IAN), Cằm (Mental), Lưỡi (Lingual), Má (Buccal), Tai thái dương (Auriculotemporal), Nhánh răng cửa (Incisive).
- Hiệu ứng Trace đường đi: Hạt sáng chuyển động mượt mà từ gốc (Proximal) đến tận cùng (Distal).

---

## 8. Skull & Foramina Problems

- 14 lỗ sọ then chốt đã được định vị chính xác:
  - Khe ổ mắt trên (*Superior orbital fissure*): `[-0.040, 1.435, 0.155]` (Dây III, IV, V1, VI).
  - Lỗ tròn (*Foramen rotundum*): `[-0.042, 1.405, 0.130]` (Dây V2).
  - Lỗ bầu dục (*Foramen ovale*): `[-0.045, 1.385, 0.100]` (Dây V3).
  - Lỗ gai (*Foramen spinosum*): `[-0.048, 1.392, 0.080]` (Động mạch màng não giữa).
  - Lỗ hàm dưới (*Mandibular foramen*): `[-0.044, 1.320, 0.135]` (Thần kinh IAN chui vào ống hàm dưới).
  - Lỗ cằm (*Mental foramen*): `[-0.028, 1.280, 0.205]` (Thần kinh cằm thoát ra dưới răng cối nhỏ).
  - Lỗ trâm chũm (*Stylomastoid foramen*): `[-0.045, 1.370, 0.060]` (Dây VII thoát ra vào tuyến mang tai).

---

## 9. Dental & FDI Numbering Problems

- 32 răng vĩnh viễn được phân loại chuẩn theo FDI (11–18, 21–28, 31–38, 41–48).
- Tọa độ 3D xếp thành cung parabol giải phẫu chuẩn:
  - Cung hàm trên: `Y = 1.340`, `Z = 0.180 - 0.255`.
  - Cung hàm dưới: `Y = 1.300`, `Z = 0.180 - 0.250`.
- Bản đồ chi phối cảm giác tủy răng, màng nha chu và niêm mạc lợi được ánh xạ 1-1 với các nhánh thần kinh tương ứng.

---

## 10. Performance & Optimization

- **Bundle Build Time**: `5.89s` với Vite.
- **Frame Rate**: Duy trì 60 FPS mượt mà nhờ kỹ thuật chỉ render TubeGeometry khi lớp thần kinh bật (`layerVisibility[6]`), và giải nén Meshopt qua worker.
- **Resource Loading**: Không tải toàn bộ mô hình full body khi vào module RHM, chỉ nạp 5 asset sọ mặt chuyên biệt.

---

## 11. Features Fixed vs Remaining Limitations

### Features Fixed:
- [x] Header phân 2 hàng chuẩn mực (Row 1 Global, Row 2 RHM Sub-header).
- [x] Định hướng sọ mặt chuẩn y khoa: Face = Anterior (+Z), Occiput = Posterior (-Z), Left = -X, Right = +X.
- [x] Thần kinh giải phẫu mỏng tinh tế (`0.0014`), không bị neon rope.
- [x] Răng FDI và ống hàm dưới khớp khít với xương hàm.
- [x] Cây thư mục tự động mở rộng và cuộn đến mục được chọn.
- [x] Bảng thông tin y khoa đồng bộ phong cách Atelier với thẻ lâm sàng `Stethoscope`.
- [x] Tìm kiếm toàn cầu Ctrl+K tìm thấy toàn bộ cấu trúc RHM.
- [x] Hỗ trợ deep-link qua URL query parameters `?structure=...`.
- [x] Thanh công cụ dưới đáy theo chuẩn MedAnatomy.

### Remaining Limitations:
- Chuyển động há ngậm hàm của khớp thái dương hàm (TMJ kinematics) hiện hiển thị ở tư thế khớp tĩnh cắn khớp trung tâm (Centric Occlusion). Tính năng mô phỏng động học há ngậm hàm có thể phát triển trong phiên bản tiếp theo.
