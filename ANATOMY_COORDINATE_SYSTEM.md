# Anatomy 3D Coordinate System Specification

Tài liệu quy định chuẩn hệ tọa độ 3D, khung tham chiếu không gian và quy chuẩn định hướng giải phẫu học cho MedAnatomy 3D.

---

## 1. Chuẩn Không Gian & Trục Tọa Độ (Three.js / glTF 2.0)

MedAnatomy tuân thủ tuyệt đối quy chuẩn **glTF 2.0 / WebGL / Three.js** (Hệ tọa độ Descartes bàn tay phải - Right-Handed Coordinate System, Y-Up):

| Trục | Chiều Không Gian | Định Hướng Giải Phẫu Học Người |
|:---:|:---:|:---|
| **+X** | Sang Phải | Hướng về bên Phải của bệnh nhân (*Patient Right / Dextral*) |
| **-X** | Sang Trái | Hướng về bên Trái của bệnh nhân (*Patient Left / Sinistral*) |
| **+Y** | Lên Trên | Hướng về phía Đỉnh Đầu (*Superior / Cranial*) |
| **-Y** | Xuống Dưới | Hướng về phía Gót Chân (*Inferior / Caudal*) |
| **+Z** | Ra Trước | Hướng về phía Bụng / Khuôn Mặt (*Anterior / Ventral*) |
| **-Z** | Về Sau | Hướng về phía Lưng / Gáy (*Posterior / Dorsal*) |

---

## 2. Đơn Vị Đo & Kích Thước Giải Phẫu (Metric Scale)

- **Đơn vị hệ thống**: Mét ($1.0\text{ unit} = 1.0\text{ meter}$).
- **Kích thước mẫu toàn thân chuẩn**: Chiều cao $1.78\text{ m}$, sải tay $1.80\text{ m}$.
- **Tọa độ Craniofacial Complex (Gốc sọ & Hàm mặt)**:
  - Đỉnh sọ (Vertex): $Y \approx 1.75\text{ m}$.
  - Nền sọ & Lỗ lớn (Foramen magnum): $Y \approx 1.48\text{ m}$.
  - Khớp Thái Dương Hàm (Lồi cầu): $Y \approx 1.366\text{ m}, Z \approx 0.068\text{ m}$.
  - Thần kinh IAN & Ống hàm dưới: $Y \in [1.31, 1.35]\text{ m}, Z \in [0.08, 0.15]\text{ m}$.
  - Cung Răng Hàm Dưới (R.31 - R.48): $Y \approx 1.335\text{ m}$.

---

## 3. Khung Tọa Độ Đồng Quy (Shared Global World Frame)

Tất cả các tệp mô hình ngoại vi tiếp nhận từ **Z-Anatomy / BodyParts3D**:
- `models/craniofacial/skull/skull_complete.glb`
- `models/craniofacial/cranial-nerves/cranial_nerves_complete.glb`
- `models/craniofacial/muscles/masticatory_muscles.glb`
- `models/craniofacial/vessels/craniofacial_vessels.glb`
- `models/craniofacial/tmj/tmj_complex.glb`
- `models/craniofacial/brain/brain_complete.glb`

Đều **chia sẻ 100% cùng một gốc tọa độ thế giới (World Origin $(0, 0, 0)$)**. Không áp dụng ma trận dịch chuyển tùy tiện khi ghép nối các hệ cơ quan này.

---

## 4. Định Hướng Cung Răng & Răng Cối (Dental Axes & Symmetry)

- **Mặt Ngoài (Buccal/Facial)**: Hướng về phía má/môi ($+Z$ hoặc lệch ngoài theo cung hàm).
- **Mặt Trong (Lingual/Palatal)**: Hướng về phía khoang miệng/lưỡi ($-Z$ hoặc lệch trong).
- **Phía Gần (Mesial)**: Hướng về đường giữa cung răng.
- **Phía Xa (Distal)**: Hướng về phía lồi củ xương hàm trên hoặc cành cao xương hàm dưới.
- **Răng Đối Bên (Contralateral Symmetry)**: Răng 38 (hàm dưới trái) được tạo ra từ phép đối xứng qua mặt phẳng dọc giữa (Sagittal Plane $X=0$) với ma trận phản chiếu:
  $$M_{\text{mirror}} = \begin{bmatrix} -1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$
  đồng thời đảo ngược thứ tự đỉnh tam giác (*reversed winding order*) để giữ pháp tuyến mặt (*face normals*) hướng ra ngoài chính xác.
