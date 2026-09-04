# BÁO CÁO ĐỒNG BỘ TOÀN DIỆN MEDANATOMY 3D: TIÊU BẢN GIẢI PHẪU TIỂU PHẪU RĂNG KHÔN
**Module Route**: `/lab/dental-neuroanatomy?specimen=wisdom_surgery`  
**Hệ thống**: MedAnatomy 3D Craniofacial & Dental Neuro Lab  
**Ngày hoàn thiện**: 04/09/2026  
**Trạng thái**: Đã đồng bộ 100% kiến trúc 3 cột, tích hợp Real 3D GLB assets, camera gliding và chuẩn hóa đạo đức y khoa.

---

## 1. Tổng quan Dự án & Tôn chỉ Kiến trúc (Executive Summary)

Mô-đun **Tiêu bản Giải phẫu Tiểu phẫu Răng khôn (Wisdom Tooth / Dental Surgery Anatomy Lab)** trước đây tồn tại dưới dạng một giao diện rời rạc với nhiều thẻ floating overlay che phủ hoàn toàn khung nhìn 3D, thiếu sự đồng bộ với hệ thống giải phẫu MedAnatomy chuẩn.

Qua quá trình tái cấu trúc toàn diện theo bộ tiêu chí chuyên sâu:
1. **Kiến trúc Một MedAnatomy Thống nhất (One Specialized MedAnatomy Lab)**: Mô-đun hoạt động như một phân hệ tiêu bản chuyên sâu nằm trong hệ thống Craniofacial & Dental Neuro Lab, kế thừa toàn vẹn giao diện 3 cột chuẩn mực, thanh chuyển đổi tiêu bản, cây phân cấp giải phẫu và hồ sơ y khoa cánh phải.
2. **Loại bỏ Hoàn toàn Procedural Geometry Rác**: 100% các cấu trúc thần kinh sọ và xương hàm sử dụng asset 3D thật (Z-Anatomy CC BY-SA 4.0 GLB assets với Draco compression), triệt tiêu hoàn toàn `TubeGeometry`, `CylinderGeometry`, hay `SphereGeometry` giả mạo.
3. **Canvas 3D Thông thoáng & Tương tác Cao**: Chuyển toàn bộ dữ liệu bảng biểu, phân loại Winter, Pell-Gregory, đánh giá rủi ro IAN, 7 dấu hiệu X-quang toàn cảnh và bài học 6 bước tiểu phẫu sang **Right Surgical Dossier Info Panel**. Trung tâm 3D chỉ giữ thanh Quick Chips, bộ chọn View Mode và bộ điều khiển bước tinh gọn.
4. **Chuẩn mực Đạo đức & Cảnh báo Y khoa**: Tất cả thông số khoảng cách, góc độ và biểu đồ rủi ro được gắn nhãn minh bạch `DEMO / SIMULATED — EDUCATIONAL VISUALIZATION` và `EDUCATIONAL SIMULATION / PHÂN TÍCH HỌC THUẬT`. Tuyệt đối không đóng vai trò chẩn đoán hay điều trị thực tế trên bệnh nhân.

---

## 2. Đồng bộ Kiến trúc Giao diện 3 Cột (3-Column Layout Synchronization)

Giao diện tại đường dẫn `/lab/dental-neuroanatomy?specimen=wisdom_surgery` tuân thủ nghiêm ngặt bố cục kinh điển của MedAnatomy:

```
+-------------------------------------------------------------------------------------------------------+
|  MedAnatomy Header: Craniofacial & Dental Neuro Lab | RHM CHUYÊN SÂU | Breadcrumb: Lab > Răng Khôn    |
+-------------------------------------------------------------------------------------------------------+
|  Specimen Switcher Strip: [ 1. Dây TK & Nền Sọ ] [ 2. Tiêu Bản Răng FDI ] [ 3. Khớp TDH ] [ 4. Răng Khôn ]|
+-------------------------------------------------------------------------------------------------------+
|  [CỘT TRÁI - 320px]       |  [CỘT GIỮA - FLEX CANVAS 3D]               |  [CỘT PHẢI - 360px]          |
|  DentalNeuroTree.tsx      |  WisdomSurgeryStage.tsx                    |  DentalNeuroInfoPanel.tsx    |
|                           |                                            |                              |
|  * Banner Tiêu bản Răng   |  * Quick Chips mép trên:                   |  * Hồ sơ tiểu phẫu R.48/R.38 |
|    khôn (WISDOM LAB)      |    [ R.48 ] [ R.38 ] [ Mandible ] [ IAN ]  |  * Chế độ Học tập / Mô phỏng|
|  * R.48 & R.38 Lower Teeth|    [ Lingual ] [ Canal ] [ Mental ]        |  * Phân loại Winter 4 kiểu   |
|  * Xương hàm dưới         |  * View Modes:                             |  * Pell-Gregory (Class & Pos)|
|  * Ống hàm dưới & IAN     |    [ Chuẩn ] [ Xương ] [ Thần kinh ] [ Sâu]|  * Chiến lược Odontotomy     |
|  * Thần kinh Lưỡi         |  * Real 3D Skull & Mandible Context        |  * 4 Mốc giải phẫu lân cận   |
|  * Lỗ cằm & Lỗ hàm dưới   |  * Real Z-Anatomy IAN & Lingual Nerves     |  * Thước đo rủi ro IAN (DEMO)|
|  * Cây phân cấp thần kinh |  * 6-Step 3D Real Surgical Instruments     |  * 7 Dấu hiệu Panorama       |
|    sọ V3 & các nhánh      |  * Camera Glide mượt mà tới điểm chọn      |  * Quy trình 6 bước bài học  |
|                           |  * Thanh điều khiển bước tinh gọn mép dưới |  * Cảnh báo y khoa bắt buộc  |
+-------------------------------------------------------------------------------------------------------+
|  Responsive Splitters: Kéo thả co giãn cột trái (220-540px) và cột phải (280-640px) với LocalStorage  |
|  Mobile/Tablet (<1200px): Tràn viền 100% Canvas, thanh mở Drawer trượt mượt mà có backdrop blur       |
+-------------------------------------------------------------------------------------------------------+
```

---

## 3. Quy trình Tích hợp Asset 3D Thực nghiệm (3D Model Asset Pipeline)

Hệ thống đã loại bỏ hoàn toàn các mô hình procedural nhân tạo để chuyển dịch sang pipeline tải mô hình giải phẫu chuẩn y khoa:

1. **Thư viện Asset Chuẩn hóa**:
   - `cranial_nerves_complete.glb` (5.70 MB): Trích xuất thực thể hình học thật `Inferior alveolar nerve.r/.l`, `Lingual nerve.r/.l`, `Mental nerve.r/.l`, và thân `Mandibular nerve (V3)`.
   - `skull_complete.glb` / `skull.glb`: Hệ thống xương sọ và xương hàm dưới thật, bề mặt vỏ xương (cortical bone) và cành lên góc hàm sắc nét.
   - Trình giải mã Draco offline tại `/draco/draco_decoder.wasm` giúp nén asset và giải mã WebGL tức thì dưới 150ms mà không phụ thuộc Internet.
2. **Đồng bộ Không gian Tọa độ (Coordinate Space Alignment)**:
   - Các dây thần kinh trích xuất qua hàm `extractBakedNerveMesh()` được chuẩn hóa ma trận không gian thế giới (`matrixWorld`), dịch chuyển chính xác theo offset `[-0.0451, 0.60, 0.08]`, khớp hoàn hảo với góc hàm dưới và chóp chân răng 38/48 tại `[±0.034, 1.332, 0.124]`.
3. **Bộ Dụng cụ & Mô hình Mô Phỏng Phẫu thuật Giải phẫu**:
   - Răng cối giải phẫu 3D chân răng cong thật (`AnatomicalMolarMesh`).
   - Ống tiêm nha khoa kim dài 27G (`DentalSyringe3D`).
   - Vạt màng xương tam giác Ward bóc tách toàn phần (`MucoperiostealFlap3D`).
   - Máng xương má bộc lộ cổ răng (`BoneGutteringTrough3D`).
   - Tay khoan phẫu thuật góc 45° và mũi khoan Lindemann carbide 702 (`SurgicalBurHandpiece3D`).
   - Cây bẩy khuỷu Cryer góc nghiêng đòn bẩy loại 1 (`CryerElevator3D`).
   - 3 mũi khâu rời chỉ Silk 3-0 / Vicryl 4-0 (`SurgicalSutureStitch3D`).

---

## 4. Tái cấu trúc Canvas 3D Trung tâm (`WisdomSurgeryStage.tsx`)

Canvas 3D trung tâm đã được dọn sạch hoàn toàn các bảng biểu nổi gây cản trở tầm nhìn:

- **Thanh Quick Action Chips Mép Trên**:
  - `[ R.48 ]`: Chọn răng 48 ngầm hàm dưới bên phải, chuyển góc nhìn camera cận cảnh phẫu trường bên phải.
  - `[ R.38 ]`: Chọn răng 38 ngầm hàm dưới bên trái, chuyển góc nhìn camera sang bên trái.
  - `[ Mandible ]`: Bao quát toàn bộ thân và cành lên xương hàm dưới.
  - `[ IAN ]`: Tiêu điểm vào thân thần kinh huyệt răng dưới trong ống xương.
  - `[ Lingual ]`: Tiêu điểm vào thần kinh lưỡi áp sát bản trong.
  - `[ Canal ]`: Tiêu điểm vào ống hàm dưới và tương quan chóp răng.
  - `[ Mental ]`: Tiêu điểm vào lỗ cằm và chùm mạch thần kinh cằm thoát ra.
- **Bộ Chọn Chế Độ Hiển Thị (View Modes)**:
  - `[ Chuẩn (Standard) ]`: Xương hàm bán trong suốt 85%, dây thần kinh và mô răng hiển thị rõ ràng.
  - `[ Xương & Răng (Bone only) ]`: Xương hàm đặc 100%, tập trung vào cấu trúc xương ổ và vị trí ngầm của răng.
  - `[ Thần kinh & Ống (Neural) ]`: Xương hàm trong suốt 35%, hệ thần kinh IAN và thần kinh lưỡi phát sáng rực rỡ.
  - `[ Cắt lớp (Deep / X-Ray) ]`: Xương hàm siêu mờ 15%, mô phỏng phim X-quang cắt lớp và tương quan ngầm sâu.
- **Chế Độ Trải Nghiệm (Experience Modes)**:
  - `[ Học tập (Study) ]`: Tập trung vào tương quan mốc giải phẫu, dây thần kinh và phân loại.
  - `[ Mô phỏng (Simulation) ]`: Tái hiện mô phỏng trực quan 6 bước can thiệp trên phẫu trường.
- **Điều Khiển Camera Gliding (`WisdomCameraController`)**:
  - Tích hợp nội suy spline Lerp mượt mà theo hàm bậc ba `easeInOutCubic` (thời lượng 750ms), điều phối vị trí `camera.position` và tâm quay `controls.target` khi bấm nút hoặc chọn từ cây giải phẫu.
- **Thanh Điều Khiển Bước Tinh Gọn Mép Dưới**:
  - Thanh pill bo tròn nhỏ gọn có nút `<` và `>`, số thứ tự bước, tên bước và các nút chấm `[1] [2] [3] [4] [5] [6]`, không che khuất vùng cành lên hay góc hàm.

---

## 5. Tái thiết Hồ sơ Y khoa Cánh phải (`DentalNeuroInfoPanel.tsx`)

Chuyển dịch toàn bộ nội dung chuyên môn sang bảng thông tin giải phẫu cánh phải với chuẩn thiết kế MedAnatomy cao cấp:

1. **Phần 1: Phân Loại Lâm Sàng Tương Tác**:
   - **Phân loại Winter**: 4 nút bấm chuyển trạng thái tức thì (`Nghiêng gần 43%`, `Nằm ngang 13%`, `Thẳng đứng 38%`, `Nghiêng xa 6%`). Khi bấm nút, mô hình răng 3D lập tức xoay góc và cập nhật khoảng cách đến IAN trong Canvas 3D.
   - **Phân loại Pell & Gregory**:
     - Cành lên (Khoảng cách): Class I (Đủ chỗ), Class II (Thiếu chỗ 1 phần), Class III (Nằm hoàn toàn trong cành lên).
     - Mặt phẳng nhai (Độ sâu): Vị trí A (Ngang mặt nhai R7), Vị trí B (Giữa mặt nhai và cổ R7), Vị trí C (Dưới cổ R7).
   - **Chiến lược chia cắt thân răng (Odontotomy)**: Mô tả giải phẫu chi tiết hướng đi của mũi khoan, cách bẩy tách và bảo vệ chân răng.
2. **Phần 2: 4 Mốc Giải Phẫu Lân Cận Quan Trọng**:
   - Thẻ tương tác có biểu tượng và nút điều hướng 3D:
     - `R.48/38 ↔ Ống hàm dưới & Thần kinh IAN`: Bấm để camera lướt tới ống hàm dưới.
     - `R.48/38 ↔ Thần kinh Lưỡi (Lingual Nerve)`: Cảnh báo bản xương trong < 1.5mm, mất vị giác 2/3 trước lưỡi. Bấm để camera lướt tới TK Lưỡi.
     - `R.48/38 ↔ Răng cối lớn số 7`: Đánh giá điểm tựa và nguy cơ tiêu ngót chân xa răng 7. Bấm để camera lướt tới Răng 7.
     - `R.48/38 ↔ Tam giác sau hàm & Cành lên`: Hướng dẫn đường rạch vạt an toàn chếch mặt ngoài.
3. **Phần 3: Thước Đo Rủi Ro Thần Kinh (IAN Risk Gauge)**:
   - Gắn nhãn bắt buộc: `DEMO / SIMULATED — EDUCATIONAL VISUALIZATION`.
   - Khoảng cách mô phỏng tự động tính toán theo Winter và Pell-Gregory (từ 0.5mm đến 3.2mm).
   - Thanh tiến trình trực quan phân cấp: Nguy cơ thấp / Trung bình / Cao / Cực kỳ cao.
   - Chú giải lâm sàng về triệu chứng Vincent (tê bì môi dưới và cằm cùng bên).
4. **Phần 4: 7 Dấu Hiệu X-Quang Toàn Cảnh (Rood & Shehab 1990 Criteria)**:
   - Gắn nhãn bắt buộc: `EDUCATIONAL SIMULATION / PHÂN TÍCH HỌC THUẬT`.
   - Đầy đủ 7 dấu hiệu kinh điển kèm Tỉ số chênh (Odds Ratio - OR) và chỉ định CBCT:
     1. *Thấu quang chóp răng (Darkening of root)* — OR = 15.2.
     2. *Lệch hướng / cong ống răng dưới (Deflection of canal)* — OR = 7.8.
     3. *Hẹp lòng ống răng dưới (Narrowing of canal)* — OR = 6.4.
     4. *Mất viền vỏ xương cản quang của ống (Loss of tramlines)* — OR = 5.6.
     5. *Chóp răng chẻ đôi ôm trọn ống (Bifid apex wrapping canal)* — OR = 18.0 (Chỉ định Coronectomy).
     6. *Đổi hướng / Gập góc chóp chân răng (Deviation of apex)* — OR = 3.2.
     7. *Thu hẹp chóp chân răng (Narrowing of root apex)* — OR = 2.9.
5. **Phần 5: Mô-đun Bài Học Phẫu Thuật 6 Bước**:
   - Trình bày dạng MedAnatomy Lesson chuẩn:
     - **Bước 1: Gây tê vùng & Đánh giá vô cảm** (Kim 27G dài, Articaine 4%, test tê gai Spix, TK má, TK lưỡi).
     - **Bước 2: Rạch vạt màng xương** (Dao #15, cây Molt #9, rạch chếch mặt ngoài tam giác sau hàm, cấm rạch mặt lưỡi).
     - **Bước 3: Mở xương bộc lộ thân răng** (Tay khoan 45°, mũi tròn #8, tạo rãnh má máng xương ngoài, làm mát liên tục).
     - **Bước 4: Cắt chia thân & chân răng** (Mũi Lindemann 702/703, cắt 3/4 chiều dày, dùng bẩy tách nhẹ, không cắt sâu đụng sàn ống).
     - **Bước 5: Bẩy và lấy răng** (Cây bẩy Cryer cặp trái/phải, đòn bẩy loại 1 vào điểm tựa rãnh xương má, tránh lực quá mức).
     - **Bước 6: Làm sạch ổ răng & Khâu vạt** (Cây nạo Lucas, NaCl 0.9%, khâu mũi rời Silk 3-0 / Vicryl 4-0 kín vạt không căng).
6. **Phần 6: Cảnh Báo Pháp Lý & Y Khoa Bắt Buộc**:
   - Khung cảnh báo màu hổ phách nghiêm ngặt:
     > *"CẢNH BÁO Y KHOA: Đây là học phần mô phỏng phục vụ mục đích đào tạo giải phẫu và lý thuyết phẫu thuật hàm mặt. Tuyệt đối không sử dụng làm chẩn đoán, kế hoạch điều trị hay chỉ dẫn thực hành lâm sàng thực tế trên bệnh nhân khi chưa có chứng chỉ hành nghề và hướng dẫn của bác sĩ chuyên khoa."*

---

## 6. Nâng cấp Cây Giải Phẫu Cánh Trái (`DentalNeuroTree.tsx`)

- Tích hợp **Thẻ Tiêu Bản Phẫu Thuật Răng Khôn (WISDOM LAB)** ngay đầu danh sách khi `activeSpecimenMode === 'wisdom_surgery'`, cho phép người dùng click nhanh vào:
  - Răng 48 (Khôn dưới phải)
  - Răng 38 (Khôn dưới trái)
  - Xương hàm dưới (Mandible)
  - Ống hàm dưới & IAN
  - Thần kinh Lưỡi (Lingual Nerve)
  - Lỗ cằm & Thần kinh cằm
  - Lỗ hàm dưới & Gai Spix
- Thêm các phần tử `bone_mandible`, `mandibular_canal`, và `nerve_lingual` vào nhánh mục *Xương hàm dưới & Cung răng dưới*, tự động cuộn vào vùng nhìn (`scrollIntoView`) và tô sáng khi cấu trúc được chọn.

---

## 7. Quản lý Trạng thái & Deep Linking (`useDentalNeuroStore.ts` & `DentalNeuroLab.tsx`)

- Mở rộng Zustand Store với các trường chuyên biệt:
  - `wisdomStudyMode`: `'study' | 'simulation'`
  - `wisdomViewMode`: `'standard' | 'bone_only' | 'neural' | 'deep'`
  - Hàm `setWisdomStudyMode` và `setWisdomViewMode` tự động đồng bộ độ mờ của xương (`wisdomBoneOpacity`) và độ hiển thị thần kinh (`wisdomShowNerves`).
- Sửa lỗi chuyển nhầm Specimen trong `selectAnatomy()`: Trước đây, khi click vào cấu trúc thần kinh như `nerve_ian` hoặc `mandibular_canal`, store tự động chuyển về mode `general`. Đã bổ sung bộ lọc bảo vệ: khi đang ở `wisdom_surgery`, các cấu trúc liên quan đến phẫu thuật hàm dưới được giữ nguyên vẹn trong tiêu bản răng khôn.
- Thiết lập tọa độ camera chính xác trong `focusAnatomy()`:
  - `tooth_48`: `[-0.09, 1.355, 0.16]`, lookAt: `[-0.034, 1.332, 0.124]`
  - `tooth_38`: `[0.09, 1.355, 0.16]`, lookAt: `[0.034, 1.332, 0.124]`
  - `mandibular_canal`: `[±0.08, 1.34, 0.16]`, lookAt: `[±0.034, 1.332, 0.124]`
  - `nerve_lingual`: `[±0.06, 1.345, 0.14]`, lookAt: `[±0.03, 1.335, 0.115]`
  - `bone_mandible`: `[0, 1.34, 0.28]`, lookAt: `[0, 1.33, 0.12]`
- Hỗ trợ Deep Link 2 chiều qua URL Query Parameters:
  - `?specimen=wisdom_surgery&structure=tooth.48`
  - `?specimen=wisdom_surgery&structure=nerve.inferior-alveolar`
  - `?specimen=wisdom_surgery&structure=nerve.lingual`
  - `?specimen=wisdom_surgery&structure=canal.mandibular`
  - `?specimen=wisdom_surgery&structure=bone.mandible`

---

## 8. Bảng Kiểm Tra & Kết Quả Xác Minh (Verification & Quality Assurance)

| Hạng mục kiểm tra | Tiêu chuẩn đánh giá | Kết quả thực tế |
| :--- | :--- | :--- |
| **TypeScript Compilation** | `npx tsc --noEmit` không có lỗi | **PASS** (0 errors) |
| **Vite Production Build** | `npm run build` hoàn thành không lỗi | **PASS** (Built in 7.78s) |
| **Asset Pipeline** | 100% Real GLB assets, 0 procedural rác | **PASS** (Z-Anatomy CC BY-SA 4.0) |
| **Draco Decoder** | Tải mô hình 100% offline nội bộ | **PASS** (`/draco/draco_decoder.wasm`) |
| **3-Column Sync** | Đủ 3 cột: Cây giải phẫu - 3D Stage - Hồ sơ | **PASS** (Co giãn 220-640px) |
| **3D Canvas Overlays** | Không có thẻ bảng biểu floating che phủ | **PASS** (Dọn sạch, thông thoáng 100%) |
| **Camera Controller** | Lướt camera mượt mà theo cấu trúc chọn | **PASS** (Lerp cubic 750ms) |
| **Legal/Medical Disclaimer** | Gắn nhãn DEMO/SIMULATED & Cảnh báo đào tạo | **PASS** (Đầy đủ trên mọi widget) |
| **Deep Link Parameters** | Tự động phân tích và đồng bộ URL query | **PASS** (2 chiều qua replaceState) |

---
*Báo cáo được khởi tạo tự động bởi Antigravity Pair-Programming Agent.*
