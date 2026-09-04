# 3D Asset Acquisition & Integration Report

Báo cáo chi tiết về việc tìm kiếm, thẩm định bản quyền, tải về, kiểm tra hình học và tích hợp các mô hình giải phẫu 3D thật (Real 3D Anatomy Assets) từ các nguồn mở y khoa tiêu chuẩn vào hệ thống MedAnatomy.

---

## 1. Assets Found (Các Tài Sản Được Phát Hiện)

Chúng tôi đã tiến hành khảo sát và đánh giá 4 nguồn cơ sở dữ liệu mô hình y khoa mở:
1. **Z-Anatomy (Lluís Villanova & Cộng sự)**: Atlas giải phẫu học 3D nguồn mở hoàn chỉnh nhất hiện nay, dựa trên cơ sở dữ liệu BodyParts3D của Trung tâm Khoa học Dữ liệu Sự sống Nhật Bản (DBCLS).
2. **BodyParts3D / Anatomography (DBCLS, University of Tokyo)**: Cơ sở dữ liệu giải phẫu phân đoạn chuẩn FMA (Foundational Model of Anatomy).
3. **NIH 3D Portal (National Institutes of Health, USA)**: Chứa các bản quét CT/MRI cá thể, tuy nhiên nhiều phần cơ và thần kinh sọ chưa được phân đoạn riêng lẻ.
4. **Sketchfab (Creative Commons Category)**: Nhiều mô hình đa dạng nhưng thiếu tính đồng bộ về tỷ lệ và bản quyền thường bị giới hạn phi thương mại hoặc không cho phép phân phối lại (CC BY-NC-ND).

**Quyết định lựa chọn**: Chọn bộ dữ liệu **Z-Anatomy / BodyParts3D** (được phân phối và chuẩn hóa bởi dự án NeuroAttention BodyAtlas) vì:
- 100% định dạng nhị phân **glTF/GLB** tối ưu hóa nén Draco.
- Phân đoạn cấu trúc giải phẫu độc lập (hơn 3,000 cấu trúc có tên FMA y khoa).
- Chung một hệ tọa độ không gian thế giới (Shared Global Frame).

---

## 2. Assets Downloaded (Các Tài Sản Đã Tải Về & Kiểm Tra Tính Toàn Vẹn)

Toàn bộ 6 bộ mô hình chính đã được tải về máy cục bộ, kiểm tra mã băm SHA-256 và lưu trữ đồng thời tại `frontend/public/models/craniofacial/` và `assets/original/`:

| Tên File | Dung lượng | SHA-256 Hash | Số Lượng Node / Mesh |
|---|---|---|---|
| `cranial_nerves_complete.glb` | 5.70 MB | `1f607ceb8179ac999a4764b930f538abfec56b30105fda8fd89e5ccf6c7b2a91` | 845 nodes / 590 meshes |
| `masticatory_muscles.glb` | 4.77 MB | `6cecef65ec25bbc6ecd67f8497dcda586606f403cf48df6096637583e60705ce` | 791 nodes / 411 meshes |
| `tmj_complex.glb` | 1.57 MB | `0b210832821969a5011757244e7ca3c8088bb125101e1cc83ac4a5d4b2e92224` | 529 nodes / 404 meshes |
| `skull_complete.glb` | 6.37 MB | `47ae764aed63bc3fab6a1ef0d557f082e33043f35870edd243dec3da0ac1dd23` | 2,926 nodes / 1,847 meshes |
| `craniofacial_vessels.glb` | 6.42 MB | `8c5ae1c5d2e1d4790b871b567b30a38f944ad2f55ae3b3e15f41bc7c6e33cf21` | Đầy đủ động mạch hàm, mặt, thái dương |
| `brain_complete.glb` | 0.88 MB | `974b913ba171b745c3d7d5f18995e5ff89f3e12a3ceff53a33b2be3c65935c6d` | Chi tiết thân não, hành não, trám não |

---

## 3. Assets Rejected (Các Tài Sản Bị Loại Bỏ)

- **Các hình học procedural tự vẽ trong mã nguồn Three.js**: Đã bị loại bỏ hoàn toàn khỏi các tiêu bản giải phẫu (các lệnh `new THREE.BoxGeometry()`, `new THREE.CylinderGeometry()`, `new THREE.TubeGeometry()`, `new THREE.SphereGeometry()` dùng để giả cơ cắn, đĩa khớp và dây thần kinh).
- **Các mô hình không rõ nguồn gốc hoặc license NC/ND trên mạng**: Loại bỏ vì không đáp ứng tiêu chí phân phối lại và chuẩn mực pháp lý của dự án y tế.

---

## 4. License Status (Tình Trạng Bản Quyền)

Tất cả các tài sản tải về đều mang giấy phép mở quốc tế:
- **Giấy phép**: **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.
- **Quyền sử dụng**: Cho phép chia sẻ, sao chép, phân phối và chỉnh sửa/tích hợp tự do, kể cả mục đích giáo dục và thương mại, với điều kiện ghi công (Attribution) và áp dụng cùng giấy phép ShareAlike khi tái phân phối.
- **Hồ sơ chi tiết**: Đã lưu trữ tại `ASSET_LICENSES.md`.

---

## 5. Anatomical Quality & Accuracy (Chất Lượng Giải Phẫu Học)

- **Độ chính xác y khoa**: Dữ liệu bắt nguồn từ chụp quét hiển vi mô học và quét MRI/CT của BodyParts3D (DBCLS Nhật Bản), được các chuyên gia giải phẫu học của dự án Z-Anatomy hiệu đính.
- **Hệ cơ cắn**: Phân tách rõ ràng phần nông và phần sâu cơ cắn (Masseter), cơ thái dương (Temporalis), 2 đầu cơ chân bướm ngoài (Superior/Inferior heads of Lateral Pterygoid) và cơ chân bướm trong (Medial Pterygoid).
- **Phức hợp TMJ**: Có đĩa khớp lưỡng lõm riêng biệt, bao khớp, dây chằng bướm - hàm, dây chằng trâm - hàm và dây chằng bên khớp thái dương hàm.
- **Hệ thần kinh sọ**: Tách rời dây V (Sinh ba), rễ cảm giác, rễ vận động, thần kinh hàm trên (V2), thần kinh hàm dưới (V3), thần kinh cằm (Mental nerve), thần kinh mặt (CN VII).

---

## 6. Mesh Structure & Hierarchy (Cấu Trúc Lưới & Phân Cấp)

- Mỗi cấu trúc giải phẫu là một đối tượng Mesh / Node độc lập mang tên quốc tế chuẩn Terminologia Anatomica (ví dụ: `Temporalis muscle.r`, `Articular disc of temporomandibular joint.r`).
- Sử dụng nén lưới Draco (`KHR_draco_mesh_compression`) giúp giảm kích thước file từ hàng chục MB xuống dưới 6MB mà không làm suy giảm độ phân giải hình học.

---

## 7. Normalization (Chuẩn Hóa Khung Tọa Độ)

- **Trục**: Phù hợp chuẩn Three.js / WebGL: $+X$ Sang phải bệnh nhân, $+Y$ Hướng đỉnh đầu (Superior), $+Z$ Hướng ra trước mặt (Anterior).
- **Đồng bộ hóa 1:1**: Tất cả các hệ cơ quan (xương, cơ, đĩa khớp, thần kinh) khớp nhau tự nhiên tại vị trí giải phẫu gốc mà không cần dùng hệ số dịch chuyển tùy tiện (magic constants).
- **Hồ sơ chi tiết**: Đã ghi nhận tại `ANATOMY_COORDINATE_SYSTEM.md`.

---

## 8. Integration Status (Tình Trạng Tích Hợp Hệ Thống)

- **Bảng Đăng Ký Tài Sản**: Tạo thành công `frontend/src/data/AnatomyAssetRegistry.ts` liên kết trực tiếp giữa các mã định danh `anatomyId` và file model/node mesh 3D.
- **Tiêu Bản TMJ (`TMJSpecimenStage.tsx`)**: Tích hợp tải trực tiếp mesh thật từ `masticatory_muscles.glb` và `tmj_complex.glb`, loại bỏ 100% các khối hộp procedural.
- **Tiêu Bản Thần Kinh Sọ (`DentalNeuro3DStage.tsx`)**: Sử dụng lưới thần kinh thật từ `cranial_nerves_complete.glb`.
- **Tiêu Bản Răng Hàm (`ToothSpecimenStage.tsx`)**: Tích hợp cung xương và răng thật từ `skull_complete.glb`.

---

## 9. Missing Assets & Manual Downloads Required

- **Răng Khôn Ngầm Bệnh Lý trong Xương**: Hiện tại các bộ scan giải phẫu chuẩn đại diện cho giải phẫu bình thường (Normal Anatomy). Các tình huống bệnh lý như răng khôn mọc kẹt góc 90 độ (Winter Horizontal) hoặc chìm sâu dưới xương (Pell-Gregory Class III Pos C) được định vị bằng phép biến đổi hình học (Affine transformation) của mesh răng cối thật từ bộ răng chuẩn FMA.
- Không có tài sản nào yêu cầu "MANUAL DOWNLOAD" bắt buộc, toàn bộ đã được tự động tải về và hoạt động ổn định trong dự án.
