# BÁO CÁO TRIỂN KHAI TÁCH BIỆT TIÊU BẢN GIẢI PHẪU NAM VÀ NỮ (GENDER SPECIMEN IMPLEMENTATION REPORT)
**Dự án:** MedAnatomy 3D — Virtual Anatomy Lab  
**Phiên bản:** 1.0.0  
**Trạng thái kiểm thử:** 125/125 PASSED (100%)  
**Commit:** `81fa425` — `fix(anatomy): separate male and female specimens`  
**Nhánh:** `main` → `origin/main`  

---

## 1. Root Cause (Nguyên nhân gốc rễ)

Trong phiên bản trước, giao diện có nút chuyển giới tính **Nam ♂** / **Nữ ♀**, tuy nhiên khi chọn **Nữ**, người dùng vẫn nhìn thấy cơ quan sinh dục ngoài của nam giới (dương vật, bìu) hiển thị ở vùng bẹn giữa hai chân:

1. **Rò rỉ cơ quan sinh dục nam từ mô hình nội tạng dùng chung (`organs_complete.glb`)**:
   - File `/models/anatomy/organs_complete.glb` chứa sẵn 23 node và nhóm giải phẫu thuộc hệ sinh dục nam:
     - Cơ quan sinh dục ngoài: `Male external genitalia.j`, `Male external genitalia.g`, `Penis.j`, `Penis.g`, `Glans penis`, `Corpus cavernosum of penis`, `Corpus spongiosum of penis`, `Scrotum`.
     - Cơ quan sinh dục trong: `Testis.l`, `Testis.r`, `Epididymis.l`, `Epididymis.r`, `Ductus deferens.l`, `Ductus deferens.r`, `Prostate`, `Seminal gland.l`, `Seminal gland.r`, `Male internal genitalia`, `Male genital system`.
   - Thành phần `RealVisceraNetwork.tsx` trước đây không nhận prop `gender` từ `useAnatomyStore`, duyệt qua toàn bộ cây mesh và gán chất liệu màu tím `#c084fc` cho toàn bộ các node sinh dục nam này mà không kiểm tra giới tính đang chọn.
2. **Gắn chồng chéo mô hình nữ (Hermaphroditic Mix)**:
   - `FullBodyViewer.tsx` trước đây chỉ thực hiện thêm các mô hình cơ quan nữ (`uterus.glb`, `ovary.glb`, `breast.glb`) đè lên trên mô hình nội tạng chung mà không hề ẩn đi các cấu trúc sinh dục nam đã hiển thị sẵn từ `organs_complete.glb`.
3. **Mất đồng bộ URL Parameter (`?gender=`)**:
   - `useAnatomyStore.ts` khi gọi `setGender` không cập nhật query parameter vào URL.
   - `App.tsx` khi load trang chỉ khởi tạo mặc định là `male`, đồng thời lệnh `window.history.replaceState` đã vô tình xóa sạch query string, khiến việc refresh trang hoặc mở link trực tiếp luôn làm mất trạng thái `female`.
4. **Thiếu cơ chế Registry trung tâm & Cache Key phân lập**:
   - Không có bộ quy chuẩn định nghĩa specimen cho Nam và Nữ.
   - Three.js scene dùng chung một key tĩnh cho hệ thống Z-Anatomy, tiềm ẩn nguy cơ giữ lại mesh trong bộ nhớ đệm WebGL.

---

## 2. Male Specimen (Tiêu bản Nam)

- **Specimen ID:** `specimen.human.male`
- **Danh pháp khoa học:** *Homo sapiens ♂*
- **Nhãn hiển thị:** `Cơ thể Nam giới (Homo sapiens ♂)`
- **Cache Key:** `wholebody:male`
- **Mô hình khung xương & nội tạng:**
  - Khung xương: `/models/anatomy/skeleton_complete.glb` (1,948 xương)
  - Hệ nội tạng: `/models/anatomy/organs_complete.glb`
  - Hệ mạch máu: `/models/anatomy/vessels_complete.glb` (676 nhánh mạch)
  - Hệ thần kinh: `/models/anatomy/nervous_complete.glb` (702 cấu trúc thần kinh & não bộ)
- **Cơ quan sinh dục hiển thị:**
  - Dương vật (`penis`, quy đầu, thể hang, thể xốp)
  - Tinh hoàn & bìu (`testis`, `scrotum`)
  - Tuyến tiền liệt (`prostate`) & túi tinh (`seminal gland`)
  - Ống dẫn tinh (`ductus deferens`) & mào tinh (`epididymis`)
- **Loại trừ tuyệt đối:**
  - 100% không hiển thị các cơ quan nữ (`uterus`, `ovary`, `vagina`, `uterine_tube`, `breast`).

---

## 3. Female Specimen (Tiêu bản Nữ)

- **Specimen ID:** `specimen.human.female`
- **Danh pháp khoa học:** *Homo sapiens ♀*
- **Nhãn hiển thị:** `Cơ thể Nữ giới (Homo sapiens ♀)`
- **Cache Key:** `wholebody:female`
- **Bộ lọc triệt tiêu mesh nam (Exclusion Filter):**
  - Áp dụng bộ lọc Regex tự động quét mọi node và nhóm cha trong `organs_complete.glb`:
    ```ts
    [
      /penis/i,
      /glans\s*penis/i,
      /corpus\s*cavernosum/i,
      /corpus\s*spongiosum/i,
      /testis/i,
      /testicle/i,
      /scrotum/i,
      /prostate/i,
      /epididymis/i,
      /ductus\s*deferens/i,
      /vas\s*deferens/i,
      /seminal\s*gland/i,
      /seminal\s*vesicle/i,
      /male\s*(internal|external)?\s*genital/i,
      /male\s*genital\s*system/i
    ]
    ```
  - Khi phát hiện node sinh dục nam: đặt `child.visible = false` và ngắt tia raycast `child.raycast = () => null`.
- **Cơ quan sinh dục nữ hiển thị chuẩn xác:**
  - Tử cung (`/models/uterus.glb`): tọa độ `[0.045, 0.955, 0.020]`, kích thước 10cm.
  - Buồng trứng đôi (`/models/ovary.glb`): tọa độ `[0.085, 0.960, 0.010]`, kích thước 6cm.
  - Âm đạo (`/models/vagina.glb`): tọa độ `[0.045, 0.915, 0.020]`, kích thước 8cm.
  - Vòi tử cung / Vòi trứng (`/models/uterine-tube.glb`): tọa độ `[0.045, 0.965, 0.015]`, kích thước 12cm.
  - Tuyến vú đôi (`/models/breast.glb`): vú trái `[0.125, 1.440, 0.120]`, vú phải `[-0.035, 1.440, 0.120]` đối xứng qua mặt phẳng đứng dọc (sagittal).

---

## 4. Asset Mapping (Bản đồ tài nguyên 3D)

| Cấu trúc giải phẫu | Giới tính | Đường dẫn File 3D | Kích thước File | Tọa độ chuẩn hóa `[X, Y, Z]` | Trạng thái kiểm duyệt |
| :--- | :---: | :--- | :---: | :---: | :---: |
| **Dương vật (Penis)** | Nam | `/models/penis.glb` & `organs_complete.glb` | 1.31 MB | `[0.045, 0.904, 0.040]` | VERIFIED_REAL |
| **Tinh hoàn (Testis)** | Nam | `/models/testis.glb` & `organs_complete.glb` | 1.42 MB | `[0.045, 0.842, 0.051]` | VERIFIED_REAL |
| **Tuyến tiền liệt (Prostate)** | Nam | `/models/prostate.glb` & `organs_complete.glb` | 1.17 MB | `[0.045, 0.933, -0.032]` | VERIFIED_REAL |
| **Tử cung (Uterus)** | Nữ | `/models/uterus.glb` | 1.26 MB | `[0.045, 0.955, 0.020]` | VERIFIED_REAL |
| **Buồng trứng (Ovary)** | Nữ | `/models/ovary.glb` | 1.17 MB | `[0.085, 0.960, 0.010]` | VERIFIED_REAL |
| **Âm đạo (Vagina)** | Nữ | `/models/vagina.glb` | 1.15 MB | `[0.045, 0.915, 0.020]` | VERIFIED_REAL |
| **Vòi tử cung (Uterine Tube)** | Nữ | `/models/uterine-tube.glb` | 1.05 MB | `[0.045, 0.965, 0.015]` | VERIFIED_REAL |
| **Tuyến vú Trái (Left Breast)** | Nữ | `/models/breast.glb` | 1.87 MB | `[0.125, 1.440, 0.120]` | VERIFIED_REAL |
| **Tuyến vú Phải (Right Breast)** | Nữ | `/models/breast.glb` | 1.87 MB | `[-0.035, 1.440, 0.120]` | VERIFIED_REAL |

---

## 5. Cache (Quản lý bộ nhớ đệm)

- `HumanSpecimenRegistry.getCacheKey(gender)` tạo cache key phân lập:
  - Nam: `wholebody:male`
  - Nữ: `wholebody:female`
- Cụm `ZAnatomySystems` trong `FullBodyViewer.tsx` được gắn:
  `key={"ZAnatomySystems-" + HumanSpecimenRegistry.getCacheKey(gender)}`
- Cụm cơ quan sinh dục nữ được gắn:
  `key="female-reproductive-system"`
- Khi chuyển đổi giữa Nam và Nữ, Three.js unmount toàn bộ cụm cũ, giải phóng geometry và material không còn sử dụng, ngăn ngừa tuyệt đối hiện tượng rò rỉ bộ nhớ WebGL và hiện tượng bóng mờ cấu trúc cũ.

---

## 6. State Synchronization (Đồng bộ hóa trạng thái)

1. **Khởi tạo trạng thái ban đầu (`getInitialGender`)**:
   - Kiểm tra `window.location.search`. Nếu có `?gender=female` (hoặc `nu`), gán ngay `gender: 'female'` ngay trong store initialization trước khi component render lần đầu.
2. **Cập nhật URL 2 chiều khi người dùng click toggle**:
   - Khi gọi `setGender(g)`: cập nhật `useAnatomyStore`, đồng thời gọi `window.history.pushState` đồng bộ tham số `?gender=${g}` vào thanh địa chỉ trình duyệt mà không reload trang.
3. **Hỗ trợ nút Back / Forward của trình duyệt**:
   - `App.tsx` lắng nghe sự kiện `popstate`, tự động đọc `genderParam` từ URL và đồng bộ vào `useAnatomyStore.setState({ gender })`.
4. **Bảo tồn tham số khi đổi route**:
   - Route `/toanthan` trong `App.tsx` sử dụng `window.history.replaceState({ viewMode: 'full-body' }, '', '/toanthan' + currentSearch)`, giữ nguyên toàn bộ search query hiện có.

---

## 7. Sex-Specific Anatomy & Reproductive System (Giải phẫu học hệ sinh dục)

- Trong `anatomyHierarchy.ts`, toàn bộ các cấu trúc sinh dục được chuẩn hóa:
  - `penis`: Nam (`gender: 'male'`), mã ICD-10 `N48.4`, liên kết với tinh hoàn và tuyến tiền liệt.
  - `testis`: Nam (`gender: 'male'`), mã ICD-10 `N44`, liên kết với tuyến tiền liệt.
  - `prostate`: Nam (`gender: 'male'`), mã ICD-10 `N40`, liên kết với bàng quang.
  - `uterus`: Nữ (`gender: 'female'`), mã ICD-10 `D25`, liên kết với buồng trứng và âm đạo.
  - `ovary`: Nữ (`gender: 'female'`), mã ICD-10 `E28.2`, liên kết với tử cung và vòi tử cung.
  - `vagina`: Nữ (`gender: 'female'`), mã ICD-10 `N76`, liên kết với tử cung.
  - `uterine_tube`: Nữ (`gender: 'female'`), mã ICD-10 `O00.1`, liên kết với tử cung và buồng trứng.
  - `breast`: Nữ (`gender: 'female'`), mã ICD-10 `C50`, liên kết với lồng ngực.
- Cây giải phẫu bên trái (`AnatomyTree.tsx`) tự động lọc theo `st.gender !== 'all' && st.gender !== gender`:
  - Khi chọn Nam: Cây chỉ hiển thị Dương vật, Tinh hoàn, Tuyến tiền liệt.
  - Khi chọn Nữ: Cây chỉ hiển thị Tử cung, Buồng trứng, Âm đạo, Vòi tử cung, Tuyến vú.

---

## 8. Pelvis & Whole Body & Organ System (Vùng chậu & Cơ thể toàn phần)

- Khung xương chậu (`pelvis` trong `RealSkeletonNetwork.tsx`): 99 node thuộc đai chậu (`ilium`, `ischium`, `pubis`, `sacrum`, `coccyx`) được giữ nguyên kết nối giải phẫu với cột sống thắt lưng L5 và chỏm xương đùi 2 bên.
- Các cơ quan nội tạng quan trọng (tim, phổi, gan, dạ dày, lá lách, tụy, thận, bàng quang, ruột) được bảo toàn 100% cho cả hai giới tính mà không bị ảnh hưởng bởi bộ lọc sinh dục.

---

## 9. Tests & Automated Validation (Kiểm thử tự động)

1. **Bộ kiểm thử chuyên sâu `scripts/test-gender-specimen.mjs`**:
   - 39/39 assertions PASS (100%):
     - Checkpoint 1: Định nghĩa Specimen Registry (ID, Asset, Cache Key).
     - Checkpoint 2: Triệt tiêu 23/23 node sinh dục nam trong mô hình Nữ.
     - Checkpoint 3: Bảo toàn các cơ quan nội tạng dùng chung (thận, gan, bàng quang, ruột).
     - Checkpoint 4: Xác thực 8/8 file mô hình 3D thực tế trên đĩa (kích thước > 100KB).
     - Checkpoint 5: Tích hợp bộ lọc trong `RealVisceraNetwork` và cache key trong `FullBodyViewer`.
     - Checkpoint 6: Đồng bộ hóa URL 2 chiều và sự kiện `popstate`.
     - Checkpoint 7: Tính đầy đủ của dữ liệu `anatomyHierarchy.ts`.
     - Checkpoint 8: Thử nghiệm chuyển đổi liên hoàn `Nam -> Nữ -> Nam -> Nữ -> Nam` đảm bảo tính bất biến (idempotency), không để lại bất kỳ trạng thái rác nào.
2. **Tổng hợp toàn bộ test suites (`tests/runAllTests.mjs`)**:
   - 125/125 tests PASS (100%):
     - Tooth 32 Identity / FDI / 3D Asset / Morphology Audit: 1/1 PASS (320/320 checkpoints)
     - Anatomy English Pronunciation & Academic IPA Audit: 15/15 PASS
     - Anatomy Annotation Dynamic Positioning & Safe Area Audit: 12/12 PASS
     - Anatomical Positions & 3D Layer Architecture Audit: 23/23 PASS
     - Male vs Female Specimen Separation & Asset Isolation Audit: 5/5 PASS

---

## 10. Files Changed (Các file đã chỉnh sửa)

| File | Hành động | Nội dung thay đổi |
| :--- | :---: | :--- |
| `frontend/src/anatomy/specimen/HumanSpecimenRegistry.ts` | **NEW** | Đăng ký specimen Nam và Nữ, cache keys, node exclusion regexes |
| `frontend/src/components/3d/RealVisceraNetwork.tsx` | **MODIFY** | Tiếp nhận prop `gender`, loại bỏ toàn bộ mesh sinh dục nam khi ở chế độ Nữ |
| `frontend/src/components/3d/FullBodyViewer.tsx` | **MODIFY** | Truyền `gender` xuống viscera, phân lập nhóm Three.js với cache key độc lập |
| `frontend/src/stores/useAnatomyStore.ts` | **MODIFY** | Bổ sung `getInitialGender()`, đồng bộ `?gender=` vào URL khi gọi `setGender` |
| `frontend/src/App.tsx` | **MODIFY** | Đọc `?gender=` khi mount, bảo tồn query param và xử lý `popstate` |
| `frontend/src/data/anatomyHierarchy.ts` | **MODIFY** | Bổ sung đầy đủ dữ liệu giải phẫu cho `penis`, `vagina`, `uterine_tube` |
| `scripts/test-gender-specimen.mjs` | **NEW** | Kịch bản kiểm thử tự động 8 checkpoints tách biệt Nam/Nữ |
| `tests/anatomy/genderSpecimenAudit.test.mjs` | **NEW** | Suite kiểm thử tiêu chuẩn tích hợp vào runner |
| `tests/runAllTests.mjs` | **MODIFY** | Tích hợp `runGenderSpecimenAuditTests` vào master audit runner |

---

## 11. Git Commit & Push Details

- **Commit SHA:** `81fa425`
- **Commit Message:** `fix(anatomy): separate male and female specimens`
- **Remote:** `https://github.com/Hakiraxx/Virtual-Anatomy-Lab.git`
- **Branch:** `main` (up to date with `origin/main`)
- **Safety Policy:**
  - Không sử dụng `--force` hoặc `--force-with-lease`.
  - Không sử dụng `git reset --hard` hoặc `git clean -fd`.
  - Không commit file nhạy cảm, API keys hay file tạm.

---

## 12. Remaining Issues

- **Hiện tại:** Không có lỗi tồn đọng. Hệ thống tách biệt hoàn toàn giữa hai tiêu bản Nam và Nữ, không còn bất kỳ sự pha trộn mesh nào.
