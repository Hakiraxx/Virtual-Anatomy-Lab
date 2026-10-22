# 🫀 MedAnatomy 3D — Nền Tảng Học & Mô Phỏng Giải Phẫu Người 3D Đa Nền Tảng

> **Hệ thống mô phỏng, thực hành và đào tạo giải phẫu y khoa 3D độ chính xác cao dành cho Sinh viên Y khoa, Bác sĩ Ngoại khoa & Chuyên gia Răng Hàm Mặt.**  
> Phát triển trên nền tảng **React 18**, **Three.js / React Three Fiber (R3F)**, **TypeScript**, **Tailwind CSS**, và **Node.js / Express**.  
> Tuân thủ các chuẩn mực thiết kế nghiêm ngặt: **No-Slop UI Standards**, **Vercel Web Interface Guidelines**, và danh pháp giải phẫu quốc tế **Terminologia Anatomica 2 (TA2)**.

---

## 🌟 Các Phân Hệ & Phòng Lab 3D Chuyên Sâu

---

### 1. 🩸 Phòng Thí Nghiệm Giải Phẫu Hệ Mạch Máu 3D & 100 Chi Tiết Chuẩn TA2 (`/lab/vascular`)
Phân hệ chuyên sâu phục vụ học tập và nghiên cứu hình thái, đường đi, phân nhánh và tương quan lâm sàng của hệ tuần hoàn người:
- **Dữ liệu 3D thực tế 100% từ Z-Anatomy (CC BY-SA 4.0)**:
  - Tích hợp **676 mesh mạch máu thực tế**, phân đoạn chi tiết đến từng nhánh mạch ngoại vi.
  - Tuyệt đối không dùng mô hình AI tạo sinh hay ống hình trụ giả lập.
- **Danh mục 100 Chi tiết Giải phẫu Mạch máu Riêng biệt (TA2)**:
  - Phân loại rõ ràng qua 10 phân vùng lâm sàng:
    1. **Động mạch chủ & Mạch máu lớn** (8 chi tiết): ĐM chủ lên, cung ĐMC, ĐM chủ ngực, ĐM chủ bụng, thân cánh tay đầu, tĩnh mạch chủ trên/dưới.
    2. **Tuần hoàn vành & Tim** (10 chi tiết): ĐM vành trái (LMCA), nhánh gian thất trước (LAD), nhánh mũ (LCx), ĐM vành phải (RCA), xoang vành, các tĩnh mạch tim.
    3. **Hệ cảnh & Đầu Mặt Cổ** (11 chi tiết): ĐM cảnh chung, cảnh trong, cảnh ngoài, ĐM mặt, ĐM hàm, ĐM thái dương nông, TM cảnh trong/ngoài.
    4. **Tuần hoàn não & Vòng Willis** (11 chi tiết): ĐM thân nền, ĐM não giữa (MCA - Đoạn M1), ĐM não trước (ACA - Đoạn A1), ĐM não sau (PCA - Đoạn P1), các ĐM thông trước/sau, ĐM đốt sống (Đoạn V4).
    5. **Hệ thống xoang tĩnh mạch màng cứng** (8 chi tiết): Xoang dọc trên, xoang thẳng, xoang ngang, xoang xích-ma, xoang hang, xoang đá.
    6. **Hệ mạch máu chi trên** (12 chi tiết): ĐM dưới đòn, ĐM nách (3 đoạn), ĐM cánh tay, ĐM quay, ĐM trụ, cung gan tay nông/sâu, TM đầu, TM nền.
    7. **Mạch lồng ngực & Tuần hoàn phổi** (8 chi tiết): Thân ĐM phổi, ĐM & TM phổi, ĐM ngực trong, ĐM gian sườn, hệ tĩnh mạch đơn.
    8. **Động mạch tạng bụng & Hệ cửa** (12 chi tiết): Thân tạng (ĐM vị trái, ĐM gan chung, ĐM lách), ĐM mạc treo tràng trên (SMA), ĐM mạc treo tràng dưới (IMA), hệ tĩnh mạch cửa.
    9. **Mạch máu thận & Sau phúc mạc** (8 chi tiết): ĐM & TM thận, ĐM thượng thận, ĐM sinh dục, TM chủ dưới đoạn bụng.
    10. **Mạch máu chậu & Chi dưới** (12 chi tiết): ĐM chậu chung, chậu trong/ngoài, ĐM đùi chung, ĐM đùi sâu, ĐM khoeo (P1-P3), ĐM chày trước/sau, ĐM mác, ĐM mu chân, TM hiển lớn/bé.
- **Hệ Thống Phân Đoạn Mạch Máu Mới (*Vascular Segment & Pathway Hierarchy System*)**:
  - **Trục phân đoạn giải phẫu (Vascular Axis)**:
    - *Trục ĐM Chủ*: Thất trái $\rightarrow$ Đoạn 1 (ĐMC Lên) $\rightarrow$ Đoạn 2 (Quai ĐMC) $\rightarrow$ Đoạn 3 (ĐMC Ngực T4-T12) $\rightarrow$ Đoạn 4 (ĐMC Bụng L1-L4) $\rightarrow$ Đoạn 5 (ĐM Chậu).
    - *Trục Cảnh - Não (Vòng Willis)*: ĐM Cảnh Chung $\rightarrow$ ĐM Cảnh Trong (C1-C7 Bouthillier) $\rightarrow$ Vòng Willis $\rightarrow$ Đoạn M1 (Đoạn ngang) $\rightarrow$ Đoạn M2.
    - *Trục Chi Trên*: ĐM Dưới Đòn $\rightarrow$ ĐM Nách (3 đoạn theo cơ ngực bé) $\rightarrow$ ĐM Cánh Tay $\rightarrow$ ĐM Quay / Trụ $\rightarrow$ Cung Gan Tay Nông / Sâu.
    - *Trục Chi Dưới*: ĐM Chậu Ngoài $\rightarrow$ ĐM Đùi Chung (Tam giác Scarpa) $\rightarrow$ ĐM Khoeo (P1-P3) $\rightarrow$ ĐM Chày Trước / Sau $\rightarrow$ ĐM Mu Chân.
    - *Trục Tạng Bụng*: ĐM Chủ Bụng $\rightarrow$ Thân Tạng (T12) / SMA (L1) / IMA (L3) $\rightarrow$ Lưới Mao Mạch $\rightarrow$ Thân Tĩnh Mạch Cửa.
    - *Trục Vành Tim*: Xoang Valsalva $\rightarrow$ Thân LMCA / RCA $\rightarrow$ LAD (Đoạn Gần - Giữa - Xa) / LCx $\rightarrow$ Xoang Vành.
  - **Component `VascularSegmentBreadcrumb`**:
    - Chuỗi dòng chảy từ tim/nguyên ủy đến tận cùng.
    - **Thanh chuỗi phân đoạn tương tác (*Segment Progression Chain*)**: Các nút đoạn liên tiếp (`[1. ĐMC Lên] ➔ [2. Quai ĐMC] ➔ [3. ĐMC Ngực] ➔ [4. ĐMC Bụng]`). Người dùng click vào bất kỳ đoạn nào, 3D camera lập tức lướt bay tới đúng tiêu cự của đoạn đó.
    - Mốc giới hạn giải phẫu (*Landmarks*), nguyên ủy, phân nhánh, vòng nối, mô học, điểm bắt mạch lâm sàng.
- **Giao diện 3D Tinh gọn (*Zero Clutter On-Demand*)**:
  - Mặc định 3D Viewer sạch 100%, không bị che khuất bởi hàng loạt nhãn nổi.
  - Nhãn 3D chỉ xuất hiện khi click (hoặc hover) vào một mạch máu cụ thể, có nút đóng `(✕)` và tự động ẩn khi click vào khoảng trống trên màn hình (`onPointerMissed`).

---

### 2. 🍏 Phòng Thí Nghiệm Hệ Tiêu Hóa 3D & Gan - Mật - Tụy (`/lab/digestive`)
Phân hệ tiêu hóa toàn diện với kiến trúc layout 3 hàng đồng nhất với Dental Neuro Lab:
- **Cấu trúc ống tiêu hóa phân đoạn hoàn chỉnh**:
  - **Miệng & Các tuyến nước bọt lớn**: Tuyến mang tai & ống Stenon, tuyến dưới hàm & ống Wharton, tuyến dưới lưỡi, lưỡi (đỉnh, thân, rễ).
  - **Hầu & Thực quản**: Tỵ hầu, khẩu hầu, thanh hầu; thực quản 3 đoạn (cổ, ngực, bụng) với 3 chỗ hẹp sinh lý.
  - **Dạ dày & Tá tràng**: Tâm vị, đáy vị, thân vị, hang môn vị, ống môn vị, cơ thắt môn vị; tá tràng chữ C 4 đoạn (D1-D4, hành tá tràng, góc Treitz).
  - **Ruột non & Ruột già**: Hỗng tràng, hồi tràng, manh tràng; ruột thừa (*McBurney point*) và mạc treo ruột thừa; đại tràng lên, đại tràng ngang, đại tràng xuống, đại tràng sigma; 3 dải cơ dọc (*Taeniae coli: libera, mesocolica, omentalis*).
- **Hệ Gan - Mật & 8 Phân Thùy Couinaud Độc Lập**:
  - Phân thùy I (thùy đuôi), II, III, IV (thùy vuông), V, VI, VII, VIII với cuống cửa và tĩnh mạch gan riêng biệt.
  - Túi mật (đáy, thân, cổ, túi Hartmann) và ống mật chủ (*Ductus choledochus*), tam giác gan-mật Calot.
- **Tụy Tạng & Hệ Dẫn Lưu Ống Tụy**:
  - Khối đầu, mỏm móc (*Uncinate process*), cổ, thân, đuôi tụy.
  - Ống tụy chính (*Duct of Wirsung*) đổ vào bóng Vater và ống tụy phụ (*Duct of Santorini*).
- **Phúc Mạc & Mạc Nối**:
  - Mạc nối lớn (*Greater omentum - "Người cảnh sát ổ bụng"*), mạc nối nhỏ (*Lesser omentum*), mạc treo đại tràng (*Mesocolon*).
- **Tuần Hoàn Mạch Máu Tạng (*Splanchnic Vasculature*)**:
  - Hệ động mạch thân tạng, ĐM mạc treo tràng trên/dưới, hệ tĩnh mạch cửa gan.
- **Trải nghiệm 3D tinh gọn theo yêu cầu**:
  - Khối nhãn chỉ hiển thị khi click hoặc hover, tích hợp tóm tắt mô tả chức năng (`overviewVi`), nút `(✕)` tắt nhãn nhanh và click ra khoảng trống để đóng.
  - Thẻ thông tin rút gọn đáy màn hình (`AnatomyInfoCard`) và bảng hồ sơ bệnh học lâm sàng (tam chứng Charcot, nghiệm pháp Murphy, điểm McBurney, quy tắc 4F).

---

### 3. 🦷 Phòng Lab Giải Phẫu Thần Kinh - Sọ Mặt & Phẫu Thuật Răng Khôn 3D (`/lab/dental-neuroanatomy` & `/lab/craniofacial`)
Phân hệ chuyên sâu chuẩn quốc tế dành cho Nha khoa, Răng Hàm Mặt và Ngoại thần kinh sọ mặt:
- **Mô phỏng Phẫu thuật Răng khôn R48 & R38 theo 6 bước chuẩn ngoại khoa**:
  1. **Gây tê gai Spix**: Kim gây tê 27G định hướng vào lỗ hàm dưới (*Mandibular foramen*) từ phía răng cối nhỏ đối bên.
  2. **Đường rạch & Vạt màng xương**: Vạt góc viền nướu bộc lộ xương vỏ với cây bóc tách màng xương Periosteal Elevator.
  3. **Mở xương tạo rãnh má**: Tay khoan phẫu thuật phay xương rãnh má và phía xa thân răng (*Bone guttering*).
  4. **Chia cắt thân răng (*Odontotomy*)**: Chia cắt thân - chân răng theo trục giải phẫu.
  5. **Bẩy răng khôn**: Sử dụng cây bẩy Cryer trợ lực bẩy mảnh răng khỏi huyệt ổ răng.
  6. **Bơm rửa & Khâu đóng vạt**: Khâu mũi đơn đóng vạt màng xương an toàn.
- **Phân loại Phẫu thuật Lâm sàng**:
  - **Phân loại Winter**: Răng mọc thẳng (*Vertical*), nghiêng gần (*Mesioangular*), nằm ngang (*Horizontal*), nghiêng xa (*Distoangular*).
  - **Phân loại Pell & Gregory**: Độ ngầm Class I, II, III & Độ sâu Position A, B, C.
  - **Cảnh báo khoảng cách Thần kinh Huyệt răng dưới (IAN)**: Đo đạc và hiển thị khoảng cách thời gian thực (mm) từ chóp chân răng khôn đến ống hàm dưới.
- **Hệ thống Góc nhìn Phẫu thuật Chuẩn Y khoa**:
  - **Mặt Nhai (*Occlusal*)**: Quan sát từ trên xuống mặt nhai và múi răng.
  - **Phía Má (*Buccal*)**: Quan sát mặt ngoài và bản xương má.
  - **Phía Lưỡi (*Lingual*)**: Quan sát mặt trong và thần kinh lưỡi.
  - **Cận Cảnh (*Close-up*)**: Phóng to chóp chân răng và mối liên hệ với dây thần kinh IAN.
- **Giải phẫu Sọ mặt Hoàn chỉnh**:
  - 32 răng vĩnh viễn chuẩn FDI (11–48) với cơ chế chi phối thần kinh từng răng.
  - 12 đôi dây thần kinh sọ (Cranial Nerves I–XII).
  - Khớp thái dương hàm (TMJ) và hệ cơ nhai (cơ cắn, cơ thái dương, cơ chân bướm trong/ngoài).

---

### 4. 🧍 Toàn Thân 3D & Bóc Tách 8 Lớp Giải Phẫu (`/toanthan`)
- **Hệ thống bóc tách phân lớp (*Layer Separation Engine*) trực quan hóa 8 hệ thống**:
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
    - **Nữ ♀**: Tuyến vú 2 bên, Tử cung, Buồng trứng, Vòi trứng, Âm đạo, Khung chậu rộng (*Gynoid pelvis*).
    - **Nam ♂**: Tinh hoàn, Tuyến tiền liệt, Dương vật, Khung chậu hẹp (*Android pelvis*).

---

### 5. 🔬 Tiêu Bản Chuyên Sâu 59+ Cơ Quan (*Specimen Atelier*)
- Khám phá độc lập hơn 59 tiêu bản giải phẫu cơ quan chuyên biệt (Tim, Não, Phổi, Gan, Dạ dày, Thận, Hệ giác quan...).
- Tích hợp mốc giải phẫu (*Anatomical Hotspots*), chế độ cắt lớp (*Cross-section Slicing*), vi thể mô học (*Histology*), và tổng quan bệnh lý học lâm sàng.

---

### 6. 📐 Hệ Thống Bố Cục Không Gian & Tránh Va Chạm 3D (*Viewer Layout Manager*)
- **Tránh va chạm đa tầng (*Dynamic Collision Avoidance*)**:
  - Tầng điều hướng cấu trúc (Zone A) và Tầng điều khiển góc nhìn (Zone B) được xếp tầng theo cột dọc, chống đè chéo trên mọi kích thước màn hình.
  - **2D Projected Label Layer**: Nhãn giải phẫu 3D được tính toán tọa độ màn hình thời gian thực với phân cấp ưu tiên (*Selected > Critical > Context*), tự động né các thanh công cụ và né nhau.
  - **Toolbar Safe Area**: Bảo đảm khoảng cách an toàn (24–32px) phía trên thanh công cụ điều khiển phẫu thuật, loại bỏ hoàn toàn tình trạng thẻ thông tin che khuất nút bấm.
- **Tương thích Đa Thiết Bị (*Responsive Layout*)**:
  - **Desktop ($\ge 1200\text{px}$)**: Chế độ Side Panel 3 cột với thanh kéo điều chỉnh độ rộng (*Resizable Splitters*).
  - **Tablet ($768\text{px} - 1199\text{px}$)**: Slide-in Drawer thu gọn tự động mở rộng 100% không gian 3D.
  - **Mobile ($< 768\text{px}$)**: Bottom Sheet vuốt chạm mượt mà chuẩn di động.

---

### 7. 🔊 Phát Âm Thuật Ngữ Y Khoa & Ký Hiệu Phiên Âm Quốc Tế (IPA)
- Tra cứu và lắng nghe phát âm audio chuẩn xác của các cấu trúc giải phẫu bằng tiếng Anh Y khoa và thuật ngữ Latin (TA2).
- Hiển thị đầy đủ phiên âm quốc tế IPA (*International Phonetic Alphabet*) giúp chuẩn hóa giao tiếp y khoa quốc tế.

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

### 3. Khởi chạy môi trường phát triển:
```bash
# 1. Khởi chạy Backend API (Express API, cổng 5000)
node backend/dist/server.js
# Hoặc chế độ dev watcher:
npm run dev --prefix backend

# 2. Khởi chạy Frontend (Vite dev server, cổng 3000)
npm run dev --prefix frontend
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

## 🧪 Hệ Thống Kiểm Thử Tự Động (QA & Medical Audit Suite)

MedAnatomy 3D trang bị bộ kiểm thử tự động toàn diện gồm **16 suites** với **276 test assertions** nghiêm ngặt (**100% Pass Rate**):

```bash
node tests/runAllTests.mjs
```

### Danh mục 16 Suite kiểm thử tự động:
1. `Registry Consistency`: Tính toàn vẹn của danh mục cấu trúc và danh mục tạng phủ (85 cấu trúc).
2. `Route Audit`: Kiểm tra điều hướng sâu, query parameters và API health (`/api/health`).
3. `Asset Integrity`: Kiểm tra sự tồn tại và tính hợp lệ của toàn bộ 28 file mô hình GLB/GLTF.
4. `Anatomical Assertion`: Kiểm định các ràng buộc kích thước và vị trí giải phẫu chuẩn.
5. `Tooth Alignment`: Kiểm tra vị trí hàm răng FDI 11-48.
6. `Tooth Mapping Audit`: Đối chiếu nhãn răng và dữ liệu dây thần kinh chi phối (32/32 răng).
7. `Pronunciation Audit`: Kiểm định dữ liệu phiên âm IPA và audio phát âm.
8. `Annotation Dynamic Positioning`: Kiểm định tính toán vị trí nhãn và vùng an toàn thanh công cụ.
9. `Anatomy 3D Position Coordinates`: Độ chính xác tọa độ các cơ quan toàn thân.
10. `Gender Specimen Audit`: Tính độc lập và chuẩn xác của mô hình giải phẫu Nam/Nữ.
11. `Layer Separation Audit`: Kiểm thử logic bóc tách 8 lớp cơ thể.
12. `Dental Coordinate Alignment`: Kiểm định không gian metric sọ mặt và răng khôn.
13. `Dental 3D View Transition & Camera Sync`: Kiểm thử chống giật lag camera và đồng bộ góc nhìn.
14. `Dental 3D Viewer Layout & Safe Area`: Kiểm định chống va chạm lớp phủ giao diện, safe area 24-32px, và responsive drawer.
15. `3D Digestive System & Clinical Audit`: Kiểm tra phân đoạn giải phẫu tiêu hóa Z-Anatomy, 8 phân thùy Couinaud, hệ mạch máu mạc treo và cấp phép CC BY-SA 4.0.
16. `Vascular System 3D & 100 Details Medical Audit`: Kiểm định 100 chi tiết mạch máu TA2, 676 mesh nodes, 10 phân vùng lâm sàng, tính độc nhất của ID và tên tiếng Việt, tọa độ metric 3D, và camera presets.

---

## 🛠️ Công Nghệ Phát Triển (Tech Stack)

| Lớp Kiến Trúc | Công Nghệ & Thư Viện Sử Dụng |
|---|---|
| **Frontend Core** | React 18, TypeScript, Vite |
| **3D Graphics Engine** | Three.js, `@react-three/fiber` (R3F), `@react-three/drei` |
| **State Management** | Zustand (với URL Synchronization & LocalStorage Persistence) |
| **Styling & Design System** | Tailwind CSS, Lucide React, Cormorant Garamond, DM Sans, JetBrains Mono |
| **Backend API** | Node.js, Express, TypeScript, Prisma ORM, JWT, Bcrypt |
| **3D Assets & Segmentations** | Z-Anatomy (CC BY-SA 4.0), NIH 3D Print Exchange, Authentic Medical Segmentations |
| **Tài liệu tham khảo Y khoa** | Terminologia Anatomica 2 (TA2), Netter's Atlas of Human Anatomy, Gray's Anatomy, Moore Clinically Oriented Anatomy, FDI World Dental Federation, Phân loại Winter & Pell-Gregory, Phân loại Bouthillier ICA (C1-C7) |

---

## 📄 Bản Quyền & Giấy Phép

Dự án được xây dựng phục vụ mục đích học tập, nghiên cứu và phát triển giáo dục y khoa phi lợi nhuận.  
Mô hình 3D hệ tạng phủ, xương khớp, thần kinh và mạch máu được phân phối theo giấy phép [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) từ cộng đồng Z-Anatomy.
