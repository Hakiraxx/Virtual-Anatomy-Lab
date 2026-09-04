# Anatomy 3D Coordinate System Specification

Tài liệu quy định chuẩn hệ tọa độ 3D và khung tham chiếu không gian cho toàn bộ các mô hình giải phẫu trong MedAnatomy.

---

## 1. Chuẩn Không Gian & Trục Tọa Độ

MedAnatomy tuân thủ tuyệt đối quy chuẩn **glTF 2.0 / WebGL / Three.js** (Hệ tọa độ bàn tay phải - Right-Handed Cartesian Coordinate System):

| Trục Tọa Độ | Hướng Không Gian 3D | Ý Nghĩa Giải Phẫu Học |
|---|---|---|
| **+X** | Sang Phải (Right) | Hướng về bên Phải của cơ thể bệnh nhân (Patient Right) |
| **-X** | Sang Trái (Left) | Hướng về bên Trái của cơ thể bệnh nhân (Patient Left) |
| **+Y** | Lên Trên (Up) | Hướng về phía Đầu / Trên (Superior / Cranial) |
| **-Y** | Xuống Dưới (Down) | Hướng về phía Chân / Dưới (Inferior / Caudal) |
| **+Z** | Ra Trước (Forward) | Hướng về phía Mặt / Bụng (Anterior / Ventral) |
| **-Z** | Về Sau (Backward) | Hướng về phía Gáy / Lưng (Posterior / Dorsal) |

---

## 2. Đơn Vị Đo & Tỷ Lệ Giải Phẫu (Scale & Units)

- **Đơn vị chuẩn**: Mét ($1.0\text{ unit} = 1.0\text{ meter}$).
- **Chiều cao toàn thân tham chiếu**: $1.75\text{ m} \sim 2.0\text{ m}$.
- **Vị trí Vùng Đầu - Sọ Mặt (Craniofacial Complex)**:
  - Nền sọ / Đỉnh đầu: $Y \in [1.45, 1.65]\text{ m}$.
  - Khớp Thái Dương Hàm (TMJ) & Lồi cầu: $Y \approx 1.366\text{ m}$, $Z \approx 0.068\text{ m}$.
  - Cung Răng Hàm Dưới & Thần kinh IAN: $Y \in [1.31, 1.35]\text{ m}$, $Z \in [0.08, 0.15]\text{ m}$.

---

## 3. Khung Tọa Độ Chia Sẻ Đồng Bộ (Shared Global Frame)

Tất cả các tệp mô hình ngoại vi được tiếp nhận từ **Z-Anatomy / BodyParts3D**:
- `cranial_nerves_complete.glb`
- `masticatory_muscles.glb`
- `tmj_complex.glb`
- `skull_complete.glb`
- `craniofacial_vessels.glb`
- `brain_complete.glb`

Đều **chia sẻ 100% cùng một gốc tọa độ thế giới (World Origin $(0, 0, 0)$)** và tỷ lệ kích thước. Khi load đồng thời các file này vào cùng một `<group>`, các cấu trúc giải phẫu (xương hàm, đĩa khớp, cơ cắn, dây thần kinh sọ và mạch máu) tự động ăn khớp hoàn hảo với nhau mà **không cần bù trừ sai số tùy tiện (magic numbers)**.
