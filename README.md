# 🫀 MedAnatomy 3D — Nền Tảng Học & Mô Phỏng Giải Phẫu Người 3D Đa Nền Tảng

> **Hệ thống mô phỏng và thực hành giải phẫu y khoa 3D độ chính xác cao dành cho Sinh viên Y khoa, Bác sĩ & Chuyên gia Răng Hàm Mặt.**  
> Phát triển trên nền tảng **React 18**, **Three.js / React Three Fiber**, **TypeScript**, **Tailwind CSS**, và **Node.js / Express**.

---

## 🌟 Các Tính Năng & Phân Hệ Trọng Tâm

### 1. 🧍 Toàn Thân 3D & Bóc Tách 8 Lớp Giải Phẫu (*Full Body Dissection*)
- Hệ thống bóc tách phân lớp (*Layer Separation Engine*) trực quan hóa 8 hệ thống giải phẫu:
  1. **Lớp 1 — Da & Bao bề mặt cơ thể** (*Integumentary & Skin Silhouette*)
  2. **Lớp 2 — Hệ cơ nông** (*Superficial Musculature*)
  3. **Lớp 3 — Hệ cơ sâu & Mạc giải phẫu** (*Deep Musculature & Fascia*)
  4. **Lớp 4 — Khung xương khớp hoàn chỉnh** (*Articulated Skeleton & Articulations*)
  5. **Lớp 5 — Tạng phủ & Hệ niệu dục** (*Viscera, Cardiopulmonary, Digestive & Urogenital*)
  6. **Lớp 6 — Mạch máu uốn lượn sinh học** (*Organic Angiology with Catmull-Rom Curves*)
  7. **Lớp 7 — Hệ thần kinh trung ương & ngoại biên** (*Central & Peripheral Nervous System*)
  8. **Lớp 8 — Hệ nội tiết & Bạch huyết** (*Endocrine & Lymphatic*)
- **Mô Hình Nam ♂ & Nữ ♀ Chuẩn Nhân Trắc Y Khoa**:
  - Tự động hoán chuyển giải phẫu học giới tính:
    - **Nữ ♀**: Tuyến vú 2 bên (*Mammary glands*), Tử cung (*Uterus*), Buồng trứng (*Ovaries*), Vòi trứng, Âm đạo, Khung chậu rộng (*Gynoid pelvis*).
    - **Nam ♂**: Tinh hoàn (*Testes*), Tuyến tiền liệt (*Prostate*), Dương vật, Khung chậu hẹp (*Android pelvis*).
- **Mạch Máu Uốn Lượn Sinh Học (`CatmullRomCurve3`)**:
  - Đường đi động mạch chủ và các nhánh mạch lớn uốn lượn tự nhiên theo giải phẫu học, ôm sát lồng ngực gù và thắt lưng ưỡn sinh lý.

---

### 2. 🦷 Phòng Lab Răng Hàm Mặt & Phẫu Thuật Răng Khôn 3D (*Craniofacial & Dental Neuro Lab*)
- **Mô phỏng Phẫu thuật Răng khôn R48 & R38 theo 6 bước chuẩn lâm sàng**:
  1. **Gây tê gai Spix**: Kim gây tê 27G định hướng vào lỗ hàm dưới (*Mandibular foramen*) từ phía răng cối nhỏ đối bên, hiển thị quầng thuốc tê phát quang.
  2. **Đường rạch & Vạt màng xương**: Vạt góc viền nướu bộc lộ xương vỏ với cây bóc tách màng xương Periosteal Elevator.
  3. **Mở xương tạo rãnh má**: Tay khoan phẫu thuật phay xương rãnh má và phía xa thân răng (*Bone guttering*).
  4. **Chia cắt thân răng (*Odontotomy*)**: Chia cắt thân - chân răng theo trục giải phẫu.
  5. **Bẩy răng khôn**: Sử dụng cây bẩy Cryer trợ lực bẩy mảnh răng khỏi huyệt ổ răng.
  6. **Bơm rửa & Khâu đóng vạt**: Khâu mũi đơn đóng vạt màng xương an toàn.
- **Phân loại Phẫu thuật Chuyên sâu**:
  - **Phân loại Winter**: Răng mọc thẳng (*Vertical*), nghiêng gần (*Mesioangular*), nằm ngang (*Horizontal*), nghiêng xa (*Distoangular*).
  - **Phân loại Pell & Gregory**: Độ ngầm Class I, II, III & Độ sâu Position A, B, C.
  - **Cảnh báo khoảng cách Thần kinh Huyệt răng dưới (IAN)**: Đo đạc và hiển thị khoảng cách thời gian thực (mm) từ chóp chân răng khôn đến ống hàm dưới, cảnh báo trực quan theo cấp độ an toàn (Xanh / Vàng / Đỏ).
- **Hệ thống Góc nhìn Phẫu thuật Chuẩn Y khoa**:
  - **Mặt Nhai (*Occlusal*)**: Quan sát từ trên xuống mặt nhai và múi răng.
  - **Phía Má (*Buccal*)**: Quan sát mặt ngoài và bản xương má.
  - **Phía Lưỡi (*Lingual*)**: Quan sát mặt trong và thần kinh lưỡi.
  - **Cận Cảnh (*Close-up*)**: Phóng to chóp chân răng và mối liên hệ với dây thần kinh IAN.
- **Tọa độ Không gian CAD Chuẩn Y khoa**:
  - Đồng bộ chuẩn xác tuyệt đối các mốc giải phẫu: Xương hàm dưới, Răng 48, Răng 38, TK Huyệt răng dưới, TK Lưỡi, TK Cằm, Lỗ cằm, Lỗ hàm dưới.

---

### 3. 🔬 Tiêu Bản Chuyên Sâu 59+ Cơ Quan (*Specimen Atelier*)
- Khám phá độc lập hơn 59 tiêu bản giải phẫu cơ quan chuyên biệt (Tim, Não, Phổi, Gan, Dạ dày, Thận, Hệ cơ quan giác quan...).
- Tích hợp mốc giải phẫu (*Anatomical Hotspots*), chế độ cắt lớp (*Cross-section Slicing*), vi thể mô học (*Histology*), và tổng quan bệnh lý học lâm sàng.

---

### 4. 📐 Hệ Thống Bố Cục Thông Minh & Vùng An Toàn (*Viewer Layout Manager*)
- **Tránh va chạm đa tầng (*Dynamic Collision Avoidance*)**:
  - Tầng điều hướng cấu trúc (Zone A) và Tầng điều khiển góc nhìn (Zone B) được xếp tầng theo cột dọc, chống đè chéo trên mọi kích thước màn hình.
  - **2D Projected Label Layer**: Nhãn giải phẫu 3D được tính toán tọa độ màn hình thời gian thực với phân cấp ưu tiên (*Selected > Critical > Context*), tự động né các thanh công cụ và né nhau.
  - **Toolbar Safe Area**: Bảo đảm khoảng cách an toàn (24–32px) phía trên thanh công cụ điều khiển phẫu thuật, loại bỏ hoàn toàn tình trạng thẻ thông tin che khuất nút bấm.
- **Tương thích Đa Thiết Bị (*Responsive Layout*)**:
  - **Desktop ($\ge 1200\text{px}$)**: Chế độ Side Panel 3 cột tiện dụng.
  - **Tablet ($768\text{px} - 1199\text{px}$)**: Slide-in Drawer thu gọn tự động.
  - **Mobile ($< 768\text{px}$)**: Bottom Sheet vuốt chạm mượt mà chuẩn di động.

---

### 5. 🔊 Phát Âm Thuật Ngữ Y Khoa & Ký Hiệu Phiên Âm Quốc Tế (IPA)
- Tra cứu và lắng nghe phát âm audio chuẩn xác của các cấu trúc giải phẫu bằng tiếng Anh Y khoa và thuật ngữ Latin.
- Hiển thị đầy đủ phiên âm quốc tế IPA (*International Phonetic Alphabet*) giúp chuẩn hóa giao tiếp y khoa quốc tế.

---

### 6. 📚 Công Cụ Học Tập & Kiểm Tra Toàn Diện
- **Bài học Y khoa (*Lessons*)**: Giáo trình giải phẫu hệ thống được biên soạn cô đọng.
- **Flashcards 3D**: Luyện tập ghi nhớ vị trí và chức năng giải phẫu nhanh chóng.
- **Trắc nghiệm Y khoa (*Quiz Mode*)**: Đánh giá kiến thức tương tác trực tiếp trên mô hình 3D.
- **Ghi chú & Bookmark (*Study Notes*)**: Lưu trữ ghi chú cá nhân hóa theo từng ca học và cấu trúc.

---

## 🚀 Cài Đặt & Khởi Chạy Cục Bộ (Local Development)

### 1. Yêu cầu môi trường:
- [Node.js](https://nodejs.org) (phiên bản 18+ hoặc 20+)
- Trình quản lý gói `npm` (hoặc `yarn` / `pnpm`)

### 2. Cài đặt các gói phụ thuộc:
```bash
# Cài đặt đồng thời cho cả Frontend và Backend
npm run install:all
```

### 3. Chạy môi trường phát triển:
```bash
# Chạy Frontend (Vite, cổng 3000)
npm run dev --prefix frontend

# Chạy Backend (Express API, cổng 5000)
npm run dev --prefix backend
```
Mở trình duyệt và truy cập: **`http://localhost:3000`**

### 4. Build Production:
```bash
# Build mã nguồn Frontend
npm run build:frontend

# Build mã nguồn Backend
npm run build:backend
```

---

## 🧪 Hệ Thống Kiểm Thử Tự Động (QA & Audit Suite)

MedAnatomy 3D trang bị bộ kiểm thử tự động toàn diện gồm **14 suites** với **239 test assertions** nghiêm ngặt:

```bash
node tests/runAllTests.mjs
```

### Danh mục các Suite kiểm thử tự động:
1. `Registry Consistency`: Tính toàn vẹn của danh mục cấu trúc và danh mục tạng phủ.
2. `Route Audit`: Kiểm tra điều hướng sâu, query parameters và API health.
3. `Asset Integrity`: Kiểm tra sự tồn tại và tính hợp lệ của toàn bộ mô hình GLB/GLTF.
4. `Anatomical Assertion`: Kiểm định các ràng buộc kích thước và vị trí giải phẫu chuẩn.
5. `Tooth Alignment`: Kiểm tra vị trí hàm răng FDI 11-48.
6. `Tooth Mapping Audit`: Đối chiếu nhãn răng và dữ liệu dây thần kinh chi phối.
7. `Pronunciation Audit`: Kiểm định dữ liệu phiên âm IPA và audio phát âm.
8. `Annotation Dynamic Positioning`: Kiểm định tính toán vị trí nhãn và vùng an toàn thanh công cụ.
9. `Anatomy 3D Position Coordinates`: Độ chính xác tọa độ các cơ quan toàn thân.
10. `Gender Specimen Audit`: Tính độc lập và chuẩn xác của mô hình giải phẫu Nam/Nữ.
11. `Layer Separation Audit`: Kiểm thử logic bóc tách 8 lớp cơ thể.
12. `Dental Coordinate Alignment`: Kiểm định không gian metric sọ mặt và răng khôn.
13. `Dental 3D View Transition & Camera Sync`: Kiểm thử chống giật lag camera và đồng bộ góc nhìn.
14. `Dental 3D Viewer Layout & Safe Area`: Kiểm định chống va chạm lớp phủ giao diện, safe area 24-32px, và responsive drawer.

---

## 🛠️ Công Nghệ Phát Triển (Tech Stack)

- **Frontend Core**: React 18, TypeScript, Vite
- **3D Graphics Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **State Management**: Zustand
- **Styling & UI**: Tailwind CSS, Lucide React, Cormorant Garamond / DM Sans / JetBrains Mono typography
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, JWT, Bcrypt
- **Tài liệu tham khảo Y khoa**: Netter's Atlas of Human Anatomy, Gray's Anatomy, Moore Clinically Oriented Anatomy, Z-Anatomy (CC BY-SA 4.0), FDI World Dental Federation.

---

## 📄 Bản Quyền & Giấy Phép

Dự án được xây dựng phục vụ mục đích học tập, nghiên cứu và phát triển giáo dục y khoa phi lợi nhuận.
