# 🫀 MedAnatomy 3D — Nền Tảng Học Giải Phẫu Người 3D Đa Nền Tảng

> **Hệ thống mô phỏng giải phẫu người 3D độ chính xác cao dành cho sinh viên Y khoa & Bác sĩ**  
> Xây dựng với **React 18**, **Three.js / React Three Fiber**, **Tailwind CSS**, và **Node.js / Express**.

---

## 🌟 Tính Năng Nổi Bật

- **Toàn Thân 3D & Bóc Tách 8 Lớp Giải Phẫu**:
  1. *Lớp 1*: Da & Bao bề mặt cơ thể (*Integumentary & Skin Silhouette*)
  2. *Lớp 2*: Hệ cơ nông (*Superficial Musculature*)
  3. *Lớp 3*: Hệ cơ sâu (*Deep Musculature & Fascia*)
  4. *Lớp 4*: Khung xương khớp hoàn chỉnh (*Articulated Skeleton & Joints*)
  5. *Lớp 5*: Tạng phủ & Hệ sinh sản (*Viscera, Cardiopulmonary, Digestive & Reproductive*)
  6. *Lớp 6*: Hệ tuần hoàn & Mạch máu uốn lượn sinh học (*Organic Angiology with Catmull-Rom Curves*)
  7. *Lớp 7*: Hệ thần kinh trung ương & ngoại biên (*Nervous System, Plexuses & Sciatic Nerves*)
  8. *Lớp 8*: Hệ nội tiết & Bạch huyết (*Endocrine & Lymphatic*)

- **Mô Hình Nam ♂ & Nữ ♀ Chuẩn Y Khoa**:
  - Tự động thay đổi giải phẫu học đặc trưng:
    - *Nữ ♀*: Tuyến vú 2 bên (*Mammary glands*), Tử cung, Buồng trứng, Vòi trứng, Âm đạo, Khung chậu rộng (*Gynoid*).
    - *Nam ♂*: Tinh hoàn, Tuyến tiền liệt, Dương vật, Khung chậu hẹp (*Android*).

- **Hệ Thống Mạch Máu Uốn Lượn Sinh Học (`CatmullRomCurve3`)**:
  - Thay thế hoàn toàn ống thẳng cơ học bằng đường cong giải phẫu tự nhiên ôm sát lồng ngực gù và thắt lưng ưỡn.

- **Tiêu Bản Sâu (59+ Specimen Atelier)**:
  - Khám phá độc lập 59 cơ quan riêng lẻ (Tim, Não, Phổi, Gan, Thận, Xương...) với các điểm mốc giải phẫu (*Hotspots*), mặt cắt (*Cross-section*), và dữ liệu bệnh học lâm sàng.

- **Tối Ưu Đa Thiết Bị (Responsive Across All Devices)**:
  - **Mobile (iPhone Pro/Max, Android)**: Giao diện tràn viền 100%, Native iOS Bottom Sheet trượt mượt mà.
  - **Laptop (13" – 15.6")**: Thu gọn/mở rộng thanh bên linh hoạt, giải phóng không gian 3D.
  - **PC / Desktop (FHD, 2K, 4K)**: 3 cột toàn diện, hỗ trợ bộ phím tắt chuyên nghiệp (`[`, `]`, `R`, `Space`, `Esc`).

---

## 🚀 Cài Đặt & Chạy Cục Bộ (Local Development)

### 1. Yêu cầu hệ thống:
- [Node.js](https://nodejs.org) (phiên bản 18+ hoặc 20+)
- npm hoặc yarn / pnpm

### 2. Cài đặt các gói phụ thuộc:
```bash
# Cài đặt đồng thời cả Frontend và Backend
npm run install:all
```

### 3. Khởi động môi trường phát triển:
```bash
# Chạy Frontend (Vite)
cd frontend
npm run dev

# Chạy Backend (Express)
cd ../backend
npm run dev
```
Truy cập trình duyệt tại: **`http://localhost:3000`**

---

## 🌐 Hướng Dẫn Triển Khai (Deployment)

### Cách 1: Deploy lên Vercel (Khuyên Dùng cho Frontend)
1. Import repository này vào [Vercel](https://vercel.com).
2. Thiết lập **Root Directory**: `frontend`.
3. Vercel sẽ tự nhận diện preset **Vite** và chạy lệnh build tự động.

### Cách 2: Deploy Fullstack lên Render / Railway
File cấu hình `render.yaml` và `Dockerfile` đã được cấu hình sẵn trong mã nguồn.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 18, TypeScript, Three.js, @react-three/fiber, @react-three/drei, Zustand, Tailwind CSS, Lucide React, Canvas Confetti.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, JWT, Bcrypt.
- **Tài liệu tham khảo Y khoa**: Netter's Atlas of Human Anatomy, Gray's Anatomy, Moore Clinically Oriented Anatomy, Williams Obstetrics.

---

## 📄 Bản Quyền & Giấy Phép

Dự án phục vụ mục đích học tập, nghiên cứu và phát triển giáo dục y khoa phi lợi nhuận.
