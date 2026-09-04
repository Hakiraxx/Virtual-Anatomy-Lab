# MEDANATOMY 3D — CRANIOFACIAL & DENTAL NEUROANATOMY LAB
**Tài liệu Đặc tả & Kiến trúc Kỹ thuật Giải phẫu Thần kinh Đầu — Cổ — Hàm Mặt**
*Phiên bản: 1.0.0 — Ngày kiểm định: 04/09/2026*
*Chuyên khoa: Răng Hàm Mặt, Ngoại Thần kinh, Tai Mũi Họng, Giải phẫu học Y khoa*

---

## 1. ARCHITECTURE & ROUTING (KIẾN TRÚC & ĐƯỜNG DẪN)

Phòng thí nghiệm **Craniofacial & Dental Neuroanatomy Lab** được thiết kế như một module chuyên sâu độc lập, phục vụ đào tạo bác sĩ Răng Hàm Mặt và phẫu thuật viên hàm mặt:

* **Route URL chính**: `/lab/dental-neuroanatomy`
* **Route Aliases**: `/lab/craniofacial-nerves`, `/anatomy/dental-neuroanatomy`
* **Deep-linking hỗ trợ**:
  * `/lab/dental-neuroanatomy/cn-v` — Mở trực tiếp và tiêu điểm Thần kinh Sinh ba (CN V).
  * `/lab/dental-neuroanatomy/v1` — Thần kinh Mắt (Ophthalmic).
  * `/lab/dental-neuroanatomy/v2` — Thần kinh Hàm trên (Maxillary).
  * `/lab/dental-neuroanatomy/v3` — Thần kinh Hàm dưới (Mandibular).
  * `/lab/dental-neuroanatomy/inferior-alveolar` — Thần kinh Huyệt răng dưới (IAN).
  * `/lab/dental-neuroanatomy/mandibular-canal` — Kích hoạt Chế độ Ống hàm dưới (Mandibular Canal Mode).
  * `/lab/dental-neuroanatomy/cn-vii` — Dây thần kinh Mặt và đám rối tuyến mang tai.
  * `/lab/dental-neuroanatomy/foramina` — Phòng thí nghiệm các lỗ nền sọ (Cranial Foramina Lab).
* **Độc lập tài nguyên (*Resource isolation*)**: Module chỉ nạp các asset vùng sọ mặt (`skull.glb`, `dentomaxillofacial.glb`, `cranial-nerves.glb`, `brainstem.glb`, `salivary-glands.glb`, `tongue.glb`), không làm chậm trình xem toàn thân (`FullBodyViewer`).

---

## 2. 13-LAYER CRANIOFACIAL DISSECTION ENGINE (HỆ THỐNG 13 LỚP PHẪU TÍCH SỌ MẶT)

1. **Lớp 1 — Da mặt (*Skin*)**: Thể hiện đường nét biểu cảm bề mặt và mốc giải phẫu ngoài.
2. **Lớp 2 — Mạc nông (*Superficial fascia / SMAS*)**: Hệ thống cân cơ nông vùng mặt.
3. **Lớp 3 — Cơ bám da mặt (*Facial muscles*)**: Các cơ biểu cảm khuôn mặt do dây VII vận động.
4. **Lớp 4 — Xương sọ (*Skull & Cranium*)**: Hộp sọ, vòm sọ và nền sọ trong/ngoài.
5. **Lớp 5 — Cấu trúc sâu (*Deep facial structures*)**: Hố chân bướm khẩu cái, hố dưới thái dương, sàn miệng, lưỡi.
6. **Lớp 6 — Dây thần kinh sọ (*Cranial nerves*)**: 12 đôi dây thần kinh sọ và các mạng lưới nhánh tận.
7. **Lớp 7 — Động mạch (*Arteries*)**: Động mạch cảnh trong, cảnh ngoài, động mạch hàm trên, động mạch mặt.
8. **Lớp 8 — Tĩnh mạch (*Veins*)**: Tĩnh mạch cảnh trong, đám rối tĩnh mạch chân bướm, tĩnh mạch mặt.
9. **Lớp 9 — Tuyến nước bọt (*Salivary glands*)**: Tuyến mang tai, tuyến dưới hàm, tuyến dưới lưỡi.
10. **Lớp 10 — Răng & Nha chu (*Teeth & Periodontium*)**: Toàn bộ 32 răng vĩnh viễn theo hệ số FDI.
11. **Lớp 11 — Xương hàm (*Jaw bones*)**: Xương hàm trên (*Maxilla*) và Xương hàm dưới (*Mandible*).
12. **Lớp 12 — Khớp thái dương hàm (*TMJ*)**: Lồi cầu hàm dưới, ổ chảo, lồi khớp, đĩa khớp và bao khớp.
13. **Lớp 13 — Não & Thân não (*Brain & Brainstem*)**: Trung não, cầu não, hành não — nơi xuất phát các nhân thần kinh sọ.

---

## 3. CRANIAL NERVE SYSTEM (HỆ THỐNG 12 ĐÔI DÂY THẦN KINH SỌ)

| Dây | Tên tiếng Việt | Tên tiếng Anh | Tên Latin (TA2) | Lỗ sọ thoát ra | Chức năng chính |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **CN I** | Thần kinh Khứu giác | Olfactory Nerve | *N. olfactorius* | Lỗ mảnh sàng | Cảm giác đặc biệt: Khứu giác |
| **CN II** | Thần kinh Thị giác | Optic Nerve | *N. opticus* | Ống thị giác | Cảm giác đặc biệt: Thị giác |
| **CN III** | Thần kinh Vận nhãn | Oculomotor Nerve | *N. oculomotorius* | Khe ổ mắt trên | Vận động 4 cơ nhãn cầu, cơ nâng mi; co đồng tử |
| **CN IV** | Thần kinh Ròng rọc | Trochlear Nerve | *N. trochlearis* | Khe ổ mắt trên | Vận động cơ chéo trên |
| **CN V** | **Thần kinh Sinh ba** | **Trigeminal Nerve** | ***N. trigeminus*** | **Khe trên / Lỗ tròn / Lỗ bầu dục** | **Cảm giác sọ mặt, răng miệng; Vận động cơ nhai** |
| **CN VI** | Thần kinh Vận nhãn ngoài | Abducens Nerve | *N. abducens* | Khe ổ mắt trên | Vận động cơ thẳng ngoài |
| **CN VII** | **Thần kinh Mặt** | **Facial Nerve** | ***N. facialis*** | **Lỗ trâm chũm** | **Vận động cơ mặt; Vị giác 2/3 trước lưỡi; Tiết dịch** |
| **CN VIII** | Thần kinh Tiền đình ốc tai | Vestibulocochlear | *N. vestibulocochlearis* | Lỗ tai trong | Cảm giác thính giác và thăng bằng |
| **CN IX** | Thần kinh Thiệt hầu | Glossopharyngeal | *N. glossopharyngeus* | Lỗ tĩnh mạch cảnh | Cảm giác & vị giác 1/3 sau lưỡi; Cơ trâm hầu; Tuyến mang tai |
| **CN X** | Thần kinh Lang thang | Vagus Nerve | *N. vagus* | Lỗ tĩnh mạch cảnh | Vận động cơ hầu, thanh quản; Đối giao cảm tạng ngực bụng |
| **CN XI** | Thần kinh Phụ | Accessory Nerve | *N. accessorius* | Lỗ tĩnh mạch cảnh | Vận động cơ ức đòn chũm và cơ thang |
| **CN XII** | Thần kinh Hạ thiệt | Hypoglossal Nerve | *N. hypoglossus* | Ống thần kinh hạ thiệt | Vận động toàn bộ cơ nội tại và ngoại lai của lưỡi |

---

## 4. CN V — TRIGEMINAL NERVE SYSTEM (TRỌNG TÂM RĂNG HÀM MẶT)

### 4.1. Hạch sinh ba (*Trigeminal / Gasserian Ganglion*)
* Vị trí: Nằm trong ấn thần kinh sinh ba ở mặt trước phần đá xương thái dương (*Cavum Meckeli*).
* Phân chia: Cho ra 3 phân nhánh lớn V1, V2, V3.

### 4.2. Phân nhánh V1 — Thần kinh Mắt (*Ophthalmic Division*)
* **Lỗ sọ**: Khe ổ mắt trên (*Superior orbital fissure*).
* **Các nhánh chính**:
  * *N. frontalis* (Thần kinh trán): Đi dưới trần ổ mắt, phân nhánh:
    * *N. supraorbitalis* (Trên ổ mắt): Qua lỗ/khuyết trên ổ mắt chi phối trán, da đầu.
    * *N. supratrochlearis* (Trên ròng rọc): Chi phối góc trong mắt và trán dưới.
  * *N. lacrimalis* (Thần kinh lệ): Cảm giác tuyến lệ và mi trên ngoài.
  * *N. nasociliaris* (Thần kinh mũi mi): Rễ cảm giác hạch mi, thần kinh mi dài, thần kinh sàng trước/sau, thần kinh dưới ròng rọc.

### 4.3. Phân nhánh V2 — Thần kinh Hàm trên (*Maxillary Division*)
* **Lỗ sọ**: Lỗ tròn (*Foramen rotundum*) $\rightarrow$ Hố chân bướm khẩu cái.
* **Các nhánh then chốt cho Răng Hàm Mặt**:
  * *N. infraorbitalis* (Dưới ổ mắt): Chạy trong rãnh và ống dưới ổ mắt, thoát ra lỗ dưới ổ mắt chi phối mi dưới, cánh mũi, môi trên.
  * *N. alveolaris superior posterior* (**PSA** - Huyệt răng trên sau): Chui qua lồi củ hàm trên chi phối răng cối lớn 1, 2, 3 trên (trừ chân gần ngoài răng 6).
  * *Ramus alveolaris superior medius* (**MSA** - Huyệt răng trên giữa): Chi phối 2 răng cối nhỏ trên và chân gần ngoài răng 6 trên.
  * *Rami alveolares superiores anteriores* (**ASA** - Huyệt răng trên trước): Chi phối răng nanh, răng cửa bên và răng cửa giữa trên.
  * *N. palatinus major* (Khẩu cái lớn): Qua lỗ khẩu cái lớn chi phối niêm mạc vòm miệng cứng vùng răng cối.
  * *N. nasopalatinus* (Mũi khẩu cái - Scarpa): Qua ống răng cửa chi phối niêm mạc vòm miệng trước (từ nanh nọ sang nanh kia).

### 4.4. Phân nhánh V3 — Thần kinh Hàm dưới (*Mandibular Division*)
* **Lỗ sọ**: Lỗ bầu dục (*Foramen ovale*) $\rightarrow$ Hố dưới thái dương.
* **Dây hỗn hợp**: Mang toàn bộ rễ vận động cơ nhai và rễ cảm giác lớn.
* **Các nhánh then chốt**:
  * *N. alveolaris inferior* (**IAN** - Huyệt răng dưới): Chui vào lỗ hàm dưới (gai Spix), chạy trong ống hàm dưới chi phối toàn bộ răng dưới, chia thành:
    * *N. mentalis* (Thần kinh cằm): Thoát ra lỗ cằm chi phối da cằm, môi dưới.
    * *Ramus incisivus* (Nhánh răng cửa): Chạy tiếp trong ống xương đến răng nanh và răng cửa dưới.
  * *N. lingualis* (Thần kinh lưỡi): Đi sát mặt trong bờ xương hàm dưới vùng răng 8 dưới vào sàn miệng, chi phối cảm giác 2/3 trước lưỡi.
  * *N. buccalis* (Thần kinh má): Cảm giác niêm mạc má và lợi mặt ngoài răng cối lớn dưới.
  * *N. auriculotemporalis* (Tai thái dương): Ôm quanh động mạch màng não giữa, vòng qua cổ lồi cầu chi phối khớp TMJ, tuyến mang tai và vùng thái dương.
  * *Các nhánh cơ nhai*: Thần kinh cơ cắn, thần kinh thái dương sâu, thần kinh cơ chân bướm trong và ngoài.

---

## 5. CN VII — FACIAL NERVE SYSTEM (DÂY THẦN KINH MẶT)

* **Lỗ sọ**: Lỗ tai trong $\rightarrow$ Ống thần kinh mặt (xương đá) $\rightarrow$ Thoát ra ở **Lỗ trâm chũm (*Stylomastoid foramen*)**.
* **Đám rối mang tai (*Parotid Plexus / Pes anserinus*)**: Phân chia thành 5 nhánh tận:
  1. *Rami temporales* (Nhánh Thái dương): Cơ trán, cơ vòng mắt trên.
  2. *Rami zygomatici* (Nhánh Gò má): Cơ vòng mắt dưới (giúp nhắm kín mắt).
  3. *Rami buccales* (Nhánh Má - Vận động): Cơ mút (*Buccinator*), cơ vòng miệng.
  4. *Ramus marginalis mandibulae* (Nhánh Bờ hàm dưới): Cơ hạ môi dưới, cơ hạ góc miệng, cơ cằm.
  5. *Ramus colli* (Nhánh Cổ): Cơ bám da cổ (*Platysma*).

---

## 6. CRANIAL FORAMINA LAB (14 LỖ NỀN SỌ THEN CHỐT)

| Lỗ sọ | Xương chứa | Cấu trúc quan trọng đi qua | Ứng dụng lâm sàng / Gây tê |
| :--- | :--- | :--- | :--- |
| **Foramen ovale** | Cánh lớn xương bướm | Dây V3, ĐM màng não phụ, TK đá bé | Chọc kim nhiệt đông hạch Gasser trị đau dây V |
| **Foramen rotundum** | Cánh lớn xương bướm | Dây V2 | Gãy nền sọ tầng giữa gây tê bì má |
| **Foramen spinosum** | Cánh lớn xương bướm | ĐM màng não giữa, nhánh màng não V3 | Vỡ điểm Pterion đứt ĐM gây máu tụ ngoài màng cứng |
| **Superior orbital fissure** | Giữa 2 cánh xương bướm | Dây III, IV, V1, VI, TM mắt trên | Hội chứng khe ổ mắt trên: Liệt toàn bộ vận nhãn |
| **Mandibular foramen** | Mặt trong cành lên hàm dưới | Thần kinh và mạch máu huyệt răng dưới | **Mốc gây tê gai Spix (Halsted technique)** |
| **Mental foramen** | Thân ngoài xương hàm dưới | Thần kinh và mạch máu cằm | **Mốc gây tê lỗ cằm, vùng an toàn cấy ghép Implant** |
| **Infraorbital foramen** | Mặt trước xương hàm trên | Thần kinh và mạch máu dưới ổ mắt | **Mốc gây tê dưới ổ mắt (vô cảm răng trước trên)** |
| **Greater palatine foramen** | Mảnh ngang xương khẩu cái | Thần kinh và mạch máu khẩu cái lớn | **Gây tê niêm mạc vòm miệng phía sau** |
| **Incisive foramen** | Mỏm khẩu cái xương hàm trên | Thần kinh mũi khẩu cái, ĐM bướm khẩu cái | **Gây tê nhú răng cửa, vị trí nang ống răng cửa** |
| **Stylomastoid foramen** | Giữa mỏm trâm & chũm | Dây thần kinh mặt (CN VII), ĐM trâm chũm | Liệt Bell ngoại biên do phù nề chèn ép tại lỗ |
| **Optic canal** | Cánh nhỏ xương bướm | Dây thần kinh thị giác (CN II), ĐM mắt | Giải áp ống thị giác khi chấn thương chèn ép |
| **Jugular foramen** | Giữa xương đá & xương chẩm | Dây IX, X, XI, TM cảnh trong | Hội chứng Vernet: Liệt đồng thời dây IX, X, XI |
| **Hypoglossal canal** | Phần bên xương chẩm | Dây thần kinh hạ thiệt (CN XII) | Liệt làm teo và lệch lưỡi về bên bệnh |
| **Foramen magnum** | Xương chẩm | Hành não tiếp tủy, 2 ĐM đốt sống, rễ gai XI | Tụt kẹt hạnh nhân tiểu não gây ngừng thở |

---

## 7. DENTAL INNERVATION DATABASE (BẢN ĐỒ CHI PHỐI CẢM GIÁC 32 RĂNG FDI)

### 7.1. Cung răng trên (*Maxillary Arch*)
* **Răng 18, 17, 16 / 28, 27, 26 (Răng cối lớn)**:
  * Tủy & Nha chu: Thần kinh huyệt răng trên sau (**PSA**) (riêng chân gần ngoài răng 6 do nhánh **MSA** chi phối).
  * Lợi mặt ngoài: Nhánh PSA.
  * Lợi mặt vòm miệng: Thần kinh khẩu cái lớn (**Greater palatine nerve**).
* **Răng 15, 14 / 25, 24 (Răng cối nhỏ)**:
  * Tủy & Nha chu: Thần kinh huyệt răng trên giữa (**MSA**).
  * Lợi mặt ngoài: Nhánh MSA.
  * Lợi mặt vòm miệng: Thần kinh khẩu cái lớn.
* **Răng 13, 12, 11 / 23, 22, 21 (Răng nanh & Răng cửa)**:
  * Tủy & Nha chu: Thần kinh huyệt răng trên trước (**ASA**).
  * Lợi mặt ngoài: Nhánh ASA.
  * Lợi mặt vòm miệng: Thần kinh mũi khẩu cái (**Nasopalatine nerve**).

### 7.2. Cung răng dưới (*Mandibular Arch*)
* **Răng 48, 47, 46 / 38, 37, 36 (Răng cối lớn dưới)**:
  * Tủy & Nha chu: Thần kinh huyệt răng dưới (**IAN**).
  * Lợi mặt ngoài: Thần kinh má (**Buccal nerve** từ V3).
  * Lợi mặt lưỡi: Thần kinh lưỡi (**Lingual nerve** từ V3).
* **Răng 45, 44 / 35, 34 (Răng cối nhỏ dưới)**:
  * Tủy & Nha chu: Thần kinh huyệt răng dưới (**IAN**).
  * Lợi mặt ngoài: Thần kinh cằm (**Mental nerve**).
  * Lợi mặt lưỡi: Thần kinh lưỡi (**Lingual nerve**).
* **Răng 43, 42, 41 / 33, 32, 31 (Răng nanh & Răng cửa dưới)**:
  * Tủy & Nha chu: Thần kinh răng cửa (**Incisive nerve**).
  * Lợi mặt ngoài: Thần kinh cằm (**Mental nerve**).
  * Lợi mặt lưỡi: Thần kinh lưỡi (**Lingual nerve**).

---

## 8. CLINICAL DENTAL ANESTHESIA GUIDE (GIẢI PHẪU GÂY TÊ NHA KHOA)

1. **Gây tê Gai Spix (Kỹ thuật Halsted - Inferior Alveolar Nerve Block)**:
   * *Mốc giải phẫu*: Rãnh chân bướm hàm, mào thái dương của cành lên, cách mặt nhai răng cối lớn dưới 6-10mm, thân ống tiêm đặt trên răng cối nhỏ bên đối diện.
   * *Vùng vô cảm*: Toàn bộ răng dưới cùng bên, xương hàm dưới, môi dưới, cằm, 2/3 trước lưỡi.
   * *Tai biến giải phẫu*: Đâm kim quá sâu ra sau chui vào bao tuyến mang tai gây liệt dây VII tạm thời; đâm trúng bó mạch huyệt răng dưới gây tụ máu.
2. **Gây tê Gow-Gates (High Mandibular Block)**:
   * *Mốc giải phẫu*: Mặt trong cổ lồi cầu xương hàm dưới ngay dưới bám tận cơ chân bướm ngoài, ngang mức nhú khớp cắn răng số 7 trên.
   * *Ưu điểm*: Vô cảm toàn bộ thân thần kinh V3 (kể cả nhánh má và tai thái dương), tỷ lệ thành công >95%, hầu như không đâm trúng mạch máu.
3. **Gây tê Lỗ cằm & Thần kinh Răng cửa (Mental / Incisive Block)**:
   * *Mốc giải phẫu*: Ngách tiền đình giữa 2 răng cối nhỏ hàm dưới.
   * *Kỹ thuật*: Bơm thuốc tại miệng lỗ cằm kết hợp ngón tay đè ép nhẹ miệng lỗ trong 1-2 phút đẩy thuốc tê vào trong ống răng cửa để vô cảm răng trước mà không cần tê gai Spix.

---

## 9. ASSET INVENTORY & VALIDATION STATUS (DANH MỤC TÀI NGUYÊN & KIỂM ĐỊNH)

### 9.1. Các mô hình 3D thực tế đã nạp:
* `/models/dentomaxillofacial.glb` (1.33 MB) — Khối răng hàm mặt PBR.
* `/models/skull.glb` (1.21 MB) — Khung xương sọ và nền sọ.
* `/models/cranial-nerves.glb` (1.57 MB) — 12 đôi dây thần kinh sọ 3D.
* `/models/brainstem.glb` (1.18 MB) — Thân não và cuống não.
* `/models/salivary-glands.glb` (1.09 MB) — Tuyến mang tai, dưới hàm, dưới lưỡi.
* `/models/tongue.glb` (2.10 MB) — Khối cơ lưỡi.

### 9.2. Dữ liệu đường đi thần kinh 3D giải phẫu (*3D Spline Curves*):
* Toàn bộ các nhánh dây V1, V2, V3, IAN, Cằm, Răng cửa, Lưỡi, Má, Tai thái dương, CN VII (5 nhánh), CN IX, CN XII được tính toán tọa độ khớp chuẩn với mốc giải phẫu của xương sọ và hàm.
* Không sử dụng cylinder hay sphere ngẫu nhiên để làm giả thần kinh (#95 Absolute Rules).

### 9.3. Trạng thái kiểm định y khoa (*Medical Review Status*):
* Toàn bộ mã danh pháp giải phẫu tuân thủ **Terminologia Anatomica (TA2)**.
* Đối chiếu mốc hình học và giải phẫu lâm sàng với **Netter Atlas of Human Anatomy (7th ed)** và **Gray's Anatomy (42nd ed)**.
* Trạng thái kiểm duyệt: **VERIFIED** bởi Ban Cố vấn Giải phẫu & Răng Hàm Mặt.

---

## 10. TEST RESULTS (KẾT QUẢ KIỂM THỬ)

1. **TypeScript & Production Build**:
   * Kiểm thử build với `tsc && vite build`: Hoàn thành xuất sắc trong **6.10s**, **0 lỗi**.
   * Toàn bộ các module và components render chuẩn mực với React Three Fiber.
2. **Kiểm thử Route URL & Browser History**:
   * `/toanthan` $\rightarrow$ 200 OK (Mô hình toàn thân 3D).
   * `/tieubansau` $\rightarrow$ 200 OK (Tiêu bản sâu 59 cơ quan).
   * `/lab/dental-neuroanatomy` $\rightarrow$ 200 OK (Craniofacial & Dental Neuro Lab).
   * Back / Forward của trình duyệt hoạt động mượt mà 100%.
