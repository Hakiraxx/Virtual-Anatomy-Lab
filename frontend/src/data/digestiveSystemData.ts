/**
 * MedAnatomy 3D — Comprehensive Digestive System Anatomical Data
 * Standardized to Terminologia Anatomica (TA2) & International Medical Curricula
 * All 3D nodes correspond directly to segmented meshes in Z-Anatomy organs_complete.glb & vessels_complete.glb
 */

export type DigestiveCategory =
  | 'oral_pharynx'
  | 'esophagus_stomach'
  | 'small_intestine'
  | 'large_intestine'
  | 'hepatobiliary'
  | 'pancreas'
  | 'peritoneum'
  | 'vasculature';

export interface DigestiveSubdivision {
  id: string;
  nameVi: string;
  nameEn: string;
  nameLa: string;
  nodeName: string;
  descriptionVi: string;
  descriptionEn: string;
}

export interface DigestiveOrganData {
  id: string;
  nameVi: string;
  nameEn: string;
  nameLa: string; // Terminologia Anatomica 2
  category: DigestiveCategory;
  primaryNodeName: string;
  meshNodeNames: string[];
  canonicalCenter: [number, number, number]; // [X, Y, Z] in meters (Metric space: X midline = 0.0451m)
  approximateDimensions: string;
  anatomicalQuadrant: string;
  embryologicalOrigin: string; // Foregut, Midgut, Hindgut
  overviewVi: string;
  overviewEn: string;
  subdivisions: DigestiveSubdivision[];
  bloodSupply: {
    arterialVi: string;
    arterialEn: string;
    venousVi: string;
    venousEn: string;
    lymphaticVi: string;
    lymphaticEn: string;
  };
  innervation: {
    parasympatheticVi: string;
    parasympatheticEn: string;
    sympatheticVi: string;
    sympatheticEn: string;
    sensoryVi: string;
    sensoryEn: string;
  };
  functionVi: string[];
  functionEn: string[];
  histologyVi: string;
  histologyEn: string;
  clinicalNotesVi: string[];
  clinicalNotesEn: string[];
  cameraPreset: {
    target: [number, number, number];
    position: [number, number, number];
  };
}

export const DIGESTIVE_SYSTEM_DATA: Record<string, DigestiveOrganData> = {
  tongue: {
    id: 'tongue',
    nameVi: 'Lưỡi',
    nameEn: 'Tongue',
    nameLa: 'Lingua',
    category: 'oral_pharynx',
    primaryNodeName: 'Tongue',
    meshNodeNames: ['Tongue'],
    canonicalCenter: [0.045, 0.7418, 0.065],
    approximateDimensions: '10 cm x 5 cm x 4 cm',
    anatomicalQuadrant: 'Vùng miệng — Hầu (Oral Cavity)',
    embryologicalOrigin: 'Cung mang I (2/3 trước), Cung mang III & IV (1/3 sau)',
    overviewVi: 'Lưỡi là một khối cơ vân đặc biệt được bao phủ bởi niêm mạc, đảm nhiệm chức năng nhai, nuốt, phát âm và vị giác. Lưỡi được chia thành phần trước (thân và đỉnh lưỡi) và phần sau (rễ lưỡi) bởi rãnh tận (sulcus terminalis).',
    overviewEn: 'The tongue is a mass of skeletal muscle covered by mucous membrane, essential for mastication, deglutition, articulation, and gustation. It is divided into an anterior two-thirds (body and apex) and a posterior third (root) by the sulcus terminalis.',
    subdivisions: [
      { id: 'apex', nameVi: 'Đỉnh lưỡi', nameEn: 'Apex of tongue', nameLa: 'Apex linguae', nodeName: 'Tongue', descriptionVi: 'Đầu trước tự do tiếp xúc với mặt trong các răng cửa.', descriptionEn: 'Anterior pointed tip resting against incisor teeth.' },
      { id: 'body', nameVi: 'Thân lưỡi', nameEn: 'Body of tongue', nameLa: 'Corpus linguae', nodeName: 'Tongue', descriptionVi: 'Phần di động chiếm 2/3 trước, mang các nhú đài, nhú chỉ, nhú nấm.', descriptionEn: 'Mobile anterior two-thirds bearing lingual papillae.' },
      { id: 'root', nameVi: 'Rễ lưỡi', nameEn: 'Root of tongue', nameLa: 'Radix linguae', nodeName: 'Tongue', descriptionVi: 'Gắn vào xương móng và xương hàm dưới, chứa hạnh nhân lưỡi.', descriptionEn: 'Fixed posterior third containing lingual tonsils.' }
    ],
    bloodSupply: {
      arterialVi: 'Động mạch lưỡi (nhánh của ĐM cảnh ngoài).',
      arterialEn: 'Lingual artery (branch of the external carotid artery).',
      venousVi: 'Các tĩnh mạch lưỡi đổ về tĩnh mạch cảnh trong.',
      venousEn: 'Lingual veins draining into the internal jugular vein.',
      lymphaticVi: 'Hạch dưới cằm (đỉnh), hạch dưới hàm (thân), hạch cảnh sâu (rễ).',
      lymphaticEn: 'Submental (apex), submandibular (body), and deep cervical nodes (root).'
    },
    innervation: {
      parasympatheticVi: 'Thừng nhĩ (dây VII qua dây V3) chi phối tiết dịch cho tuyến lưỡi.',
      parasympatheticEn: 'Chorda tympani (CN VII hitchhiking on V3) for lingual glands.',
      sympatheticVi: 'Từ hạch cổ trên qua đám rối động mạch lưỡi.',
      sympatheticEn: 'Postganglionic fibers from superior cervical ganglion via lingual arterial plexus.',
      sensoryVi: 'Cảm giác chung: 2/3 trước (TK lưỡi - V3), 1/3 sau (TK thiệt hầu - IX). Vị giác: 2/3 trước (Thừng nhĩ - VII), 1/3 sau (TK IX), nắp thanh môn (TK X).',
      sensoryEn: 'General sensation: anterior 2/3 (lingual nerve - V3), posterior 1/3 (glossopharyngeal - IX). Taste: anterior 2/3 (chorda tympani - VII), posterior 1/3 (CN IX), epiglottic vallecula (CN X).'
    },
    functionVi: ['Cảm nhận vị giác', 'Nhào trộn và định hình viên thức ăn', 'Tham gia giai đoạn đầu của động tác nuốt', 'Điều âm ngôn ngữ'],
    functionEn: ['Gustatory perception', 'Mastication bolus formation', 'Initiation of voluntary deglutition', 'Speech articulation'],
    histologyVi: 'Biểu mô lát tầng không sừng hóa ở mặt dưới, biểu mô lát tầng có sừng hóa một phần ở mặt trên nơi có các nhú lưỡi (filiform, fungiform, vallate, foliate). Lớp cơ vân đan chéo ba chiều phong phú.',
    histologyEn: 'Stratified squamous non-keratinized epithelium on ventral surface; partially keratinized dorsal surface with lingual papillae containing taste buds. Complex 3D interwoven bundles of intrinsic and extrinsic skeletal muscles.',
    clinicalNotesVi: [
      'Ung thư lưỡi (chiếm 30% ung thư khoang miệng) có xu hướng di căn sớm vào chuỗi hạch cảnh sâu.',
      'Dính thắng lưỡi (Ankyloglossia) hạn chế vận động lưỡi ở trẻ sơ sinh, cần cắt dải hãm lưỡi.'
    ],
    clinicalNotesEn: [
      'Squamous cell carcinoma of the tongue metastasizes early to deep cervical lymph nodes.',
      'Ankyloglossia (tongue-tie) can impede infant feeding and speech articulation.'
    ],
    cameraPreset: {
      target: [0.045, 0.74, 0.06],
      position: [0.045, 0.82, 0.28]
    }
  },

  salivary_glands: {
    id: 'salivary_glands',
    nameVi: 'Các Tuyến Nước Bọt Lớn',
    nameEn: 'Major Salivary Glands',
    nameLa: 'Glandulae salivariae majores',
    category: 'oral_pharynx',
    primaryNodeName: 'Parotid gland.r',
    meshNodeNames: [
      'Parotid gland.l',
      'Parotid gland.r',
      'Parotid duct.l',
      'Parotid duct.r',
      'Submandibular gland.l',
      'Submandibular gland.r',
      'Submandibular duct.l',
      'Submandibular duct.r',
      'Sublingual gland.l',
      'Sublingual gland.r'
    ],
    canonicalCenter: [0.045, 0.75, 0.02],
    approximateDimensions: 'Tuyến mang tai: 25g; Tuyến dưới hàm: 10g; Tuyến dưới lưỡi: 3g',
    anatomicalQuadrant: 'Vùng bên mặt & dưới hàm',
    embryologicalOrigin: 'Ngoại bì miệng (Tuyến mang tai) và Nội bì khoang miệng (Tuyến dưới hàm & dưới lưỡi)',
    overviewVi: 'Ba cặp tuyến nước bọt lớn gồm tuyến mang tai, tuyến dưới hàm và tuyến dưới lưỡi sản xuất khoảng 1.0 - 1.5 lít nước bọt mỗi ngày, chứa enzym amylase tiêu hóa tinh bột, chất nhầy bôi trơn và globulin miễn dịch (IgA).',
    overviewEn: 'Three pairs of major salivary glands (parotid, submandibular, and sublingual) produce 1.0-1.5 liters of saliva daily, containing salivary amylase (ptyalin), protective mucins, and secretory IgA.',
    subdivisions: [
      { id: 'parotid', nameVi: 'Tuyến mang tai & Ống Stenon', nameEn: 'Parotid gland & Stensen duct', nameLa: 'Glandula parotidea', nodeName: 'Parotid gland.r', descriptionVi: 'Tuyến tiết thanh dịch hoàn toàn, nằm ở hố sau hàm. Ống Stenon xuyên qua cơ mút đổ vào tiền đình miệng ngang răng cối lớn thứ hai hàm trên.', descriptionEn: 'Purely serous gland. Stensen duct pierces buccinator opposite maxillary 2nd molar.' },
      { id: 'submandibular', nameVi: 'Tuyến dưới hàm & Ống Wharton', nameEn: 'Submandibular gland & Wharton duct', nameLa: 'Glandula submandibularis', nodeName: 'Submandibular gland.r', descriptionVi: 'Tuyến hỗn hợp (ưu thế thanh dịch), uốn quanh bờ sau cơ hàm móng. Ống Wharton đổ vào cục dưới lưỡi.', descriptionEn: 'Mixed gland (predominantly serous). Wharton duct opens at sublingual caruncle.' },
      { id: 'sublingual', nameVi: 'Tuyến dưới lưỡi', nameEn: 'Sublingual gland', nameLa: 'Glandula sublingualis', nodeName: 'Sublingual gland.r', descriptionVi: 'Tuyến nhỏ nhất, chủ yếu tiết nhầy, nằm trên cơ hàm móng dưới nếp dưới lưỡi.', descriptionEn: 'Smallest major gland, predominantly mucous, resting on mylohyoid muscle.' }
    ],
    bloodSupply: {
      arterialVi: 'ĐM cảnh ngoài, ĐM mặt, ĐM thái dương nông và ĐM lưỡi.',
      arterialEn: 'External carotid, facial, superficial temporal, and lingual arteries.',
      venousVi: 'Tĩnh mạch sau hàm, tĩnh mạch mặt đổ vào TM cảnh trong.',
      venousEn: 'Retromandibular and facial veins into internal jugular vein.',
      lymphaticVi: 'Hạch mang tai nông/sâu và hạch dưới hàm.',
      lymphaticEn: 'Parotid and submandibular lymph nodes.'
    },
    innervation: {
      parasympatheticVi: 'Tuyến mang tai: TK IX qua hạch tai và TK tai-thái dương (V3). Tuyến dưới hàm/dưới lưỡi: TK VII (thừng nhĩ) qua hạch dưới hàm.',
      parasympatheticEn: 'Parotid: CN IX via otic ganglion & auriculotemporal nerve (V3). Submandibular/sublingual: CN VII via chorda tympani & submandibular ganglion.',
      sympatheticVi: 'Từ hạch cổ trên qua các đám rối quanh động mạch.',
      sympatheticEn: 'Superior cervical ganglion postganglionic plexuses along arteries.',
      sensoryVi: 'TK tai lớn (C2-C3) và TK tai-thái dương (V3).',
      sensoryEn: 'Great auricular nerve (C2-C3) and auriculotemporal nerve (V3).'
    },
    functionVi: ['Tiết nước bọt làm ẩm và bôi trơn thức ăn', 'Khởi đầu tiêu hóa tinh bột nhờ men amylase', 'Kháng khuẩn và bảo vệ men răng bằng lysozyme và IgA', 'Hòa tan các phân tử vị giác'],
    functionEn: ['Salivation for bolus lubrication', 'Enzymatic starch hydrolysis via alpha-amylase', 'Oral antimicrobial defense (lysozyme, lactoferrin, secretory IgA)', 'Solubilization of tastants'],
    histologyVi: 'Tuyến nang phân nhánh (compound tubuloacinar). Tuyến mang tai thuần thanh dịch chứa các hạt zymogen; tuyến dưới hàm hỗn hợp thanh-nhầy; tuyến dưới lưỡi ưu thế tuyến nang nhầy có liềm thanh dịch Giannuzzi.',
    histologyEn: 'Compound tubuloacinar gland architecture. Parotid is serous with zymogen granules; submandibular is mixed seromucous; sublingual is predominantly mucous with Giannuzzi serous demilunes.',
    clinicalNotesVi: [
      'Viêm tuyến mang tai do virus quai bị (Mumps) gây sưng đau và có thể biến chứng viêm tinh hoàn.',
      'Sỏi tuyến nước bọt (Sialolithiasis) gặp nhiều nhất ở ống Wharton của tuyến dưới hàm (80%) do dịch nhầy đậm đặc và ống dẫn chạy dốc ngược.',
      'Phẫu thuật tuyến mang tai đòi hỏi bộc lộ và bảo tồn 5 nhánh của thần kinh Mặt (CN VII).'
    ],
    clinicalNotesEn: [
      'Mumps parotitis causes painful parotid swelling and carries a risk of orchitis.',
      'Sialolithiasis most frequently affects Wharton duct (80%) due to viscous mucous content and uphill drainage.',
      'Parotidectomy mandates identification and preservation of the five facial nerve (CN VII) branches.'
    ],
    cameraPreset: {
      target: [0.045, 0.75, 0.03],
      position: [0.18, 0.80, 0.22]
    }
  },

  pharynx: {
    id: 'pharynx',
    nameVi: 'Hầu (Họng)',
    nameEn: 'Pharynx',
    nameLa: 'Pharynx',
    category: 'oral_pharynx',
    primaryNodeName: 'Oropharynx',
    meshNodeNames: ['Nasopharynx', 'Oropharynx', 'Laryngopharynx'],
    canonicalCenter: [0.045, 0.73, -0.01],
    approximateDimensions: 'Dài khoảng 12 - 14 cm',
    anatomicalQuadrant: 'Vùng sau mũi — miệng — thanh quản',
    embryologicalOrigin: 'Nội bì ruột trước và các cung mang I - VI',
    overviewVi: 'Hầu là một ống cơ-màng hình phễu dài khoảng 12-14 cm nối từ nền sọ đến bờ dưới sụn nhẫn (ngang mức đốt sống C6), nơi nó liên tiếp với thực quản. Hầu là ngã tư giữa đường thở và đường tiêu hóa.',
    overviewEn: 'The pharynx is a fibromuscular funnel-shaped tube approximately 12-14 cm long extending from the cranial base to the inferior border of the cricoid cartilage (C6), where it becomes continuous with the esophagus.',
    subdivisions: [
      { id: 'nasopharynx', nameVi: 'Tỵ hầu (Hầu mũi)', nameEn: 'Nasopharynx', nameLa: 'Nasopharynx', nodeName: 'Nasopharynx', descriptionVi: 'Nằm sau hốc mũi, chứa lỗ vòi nhĩ (vòi Eustache) và hạnh nhân hầu (VA). Hoàn toàn thuộc hệ hô hấp.', descriptionEn: 'Posterior to nasal cavities; contains pharyngeal tonsil (adenoid) and auditory tube orifice.' },
      { id: 'oropharynx', nameVi: 'Khẩu hầu (Hầu miệng)', nameEn: 'Oropharynx', nameLa: 'Pars oralis pharyngis', nodeName: 'Oropharynx', descriptionVi: 'Từ khẩu cái mềm đến bờ trên sụn nắp thanh môn. Chứa hạnh nhân khẩu cái (Amydal) giữa hai cung khẩu cái.', descriptionEn: 'Extends from soft palate to epiglottis superior border; houses palatine tonsils.' },
      { id: 'laryngopharynx', nameVi: 'Thanh hầu (Hầu thanh quản)', nameEn: 'Laryngopharynx (Hypopharynx)', nameLa: 'Pars laryngea pharyngis', nodeName: 'Laryngopharynx', descriptionVi: 'Từ nắp thanh môn đến bờ dưới sụn nhẫn (C6), phía trước thông với thanh quản, hai bên có ngách hình lê.', descriptionEn: 'From epiglottis to inferior border of cricoid (C6); features lateral piriform fossae.' }
    ],
    bloodSupply: {
      arterialVi: 'ĐM hầu lên, ĐM khẩu cái lên, ĐM khẩu cái xuống, nhánh hầu của ĐM giáp dưới.',
      arterialEn: 'Ascending pharyngeal, ascending palatine, descending palatine, and inferior thyroid arteries.',
      venousVi: 'Đám rối tĩnh mạch hầu đổ về tĩnh mạch cảnh trong.',
      venousEn: 'Pharyngeal venous plexus draining into internal jugular vein.',
      lymphaticVi: 'Chuỗi hạch sau hầu và chuỗi hạch cổ sâu.',
      lymphaticEn: 'Retropharyngeal and deep cervical lymph nodes.'
    },
    innervation: {
      parasympatheticVi: 'Thần kinh lang thang (CN X) qua đám rối hầu.',
      parasympatheticEn: 'Vagus nerve (CN X) via pharyngeal plexus.',
      sympatheticVi: 'Từ hạch cổ trên theo các mạch máu hầu.',
      sympatheticEn: 'Superior cervical ganglion via perivascular plexuses.',
      sensoryVi: 'Tỵ hầu: TK V2 (nhánh hầu). Khẩu hầu: TK IX (thiệt hầu). Thanh hầu: TK X (nhánh thanh quản trong).',
      sensoryEn: 'Nasopharynx: CN V2 (pharyngeal branch). Oropharynx: CN IX. Laryngopharynx: CN X (internal laryngeal nerve).'
    },
    functionVi: ['Dẫn truyền thức ăn từ khoang miệng vào thực quản', 'Ngăn dị vật vào đường thở nhờ phản xạ nâng khẩu cái mềm và đóng nắp thanh môn', 'Miễn dịch bảo vệ nhờ vòng bạch huyết Waldeyer', 'Cộng hưởng âm thanh khi phát âm'],
    functionEn: ['Bolus propulsion toward the esophagus', 'Airway protection via soft palate elevation and epiglottic closure', 'Immune surveillance via Waldeyer lymphatic ring', 'Vocal resonance'],
    histologyVi: 'Tỵ hầu lót bởi biểu mô trụ giả tầng có lông chuyển (hô hấp). Khẩu hầu và thanh hầu lót bởi biểu mô lát tầng không sừng hóa chịu ma sát cơ học. Lớp cơ gồm 3 cơ khít hầu (trên, giữa, dưới) và các cơ dọc hầu.',
    histologyEn: 'Nasopharynx is lined by pseudostratified ciliated columnar epithelium. Oropharynx and laryngopharynx have protective stratified squamous non-keratinized epithelium. Muscular layer has 3 circular constrictors (superior, middle, inferior) and 3 longitudinal muscles.',
    clinicalNotesVi: [
      'Phì đại sùi vòm (VA) ở trẻ em gây nghẹt mũi, thở miệng kéo dài dẫn đến "bộ mặt VA" và viêm tai giữa tái phát.',
      'Ngách hình lê (Piriform recess) là vị trí dị vật sắc nhọn (như xương cá) hay mắc kẹt và dễ gây thủng hầu.'
    ],
    clinicalNotesEn: [
      'Adenoid hypertrophy causes chronic nasal obstruction, "adenoid facies", and recurrent serous otitis media.',
      'Piriform fossae are frequent sites of foreign body entrapment (e.g., fish bones) with risk of perforation.'
    ],
    cameraPreset: {
      target: [0.045, 0.73, -0.01],
      position: [0.045, 0.75, 0.25]
    }
  },

  esophagus: {
    id: 'esophagus',
    nameVi: 'Thực Quản',
    nameEn: 'Esophagus',
    nameLa: 'Oesophagus',
    category: 'esophagus_stomach',
    primaryNodeName: 'Oesophagus',
    meshNodeNames: ['Oesophagus'],
    canonicalCenter: [0.045, 0.5314, -0.038],
    approximateDimensions: 'Dài khoảng 25 cm, đường kính 2 cm',
    anatomicalQuadrant: 'Vùng Cổ, Trung thất sau và Thượng vị (C6 đến T11)',
    embryologicalOrigin: 'Ruột trước (Foregut)',
    overviewVi: 'Thực quản là ống cơ dẫn thức ăn dài khoảng 25 cm, bắt đầu từ sụn nhẫn (C6), chạy qua trung thất sau của lồng ngực, chui qua lỗ thực quản của cơ hoành (ngang mức T10) và tận cùng tại tâm vị dạ dày (T11). Thực quản có ba chỗ hẹp sinh lý quan trọng trong nội soi.',
    overviewEn: 'The esophagus is a muscular tube about 25 cm long, extending from the cricoid cartilage (C6) through the posterior mediastinum, traversing the diaphragm via the esophageal hiatus at T10, and opening into the gastric cardia at T11. It exhibits three anatomical constrictions critical in endoscopy.',
    subdivisions: [
      { id: 'cervical', nameVi: 'Đoạn cổ', nameEn: 'Cervical part', nameLa: 'Pars cervicalis oesophagi', nodeName: 'Oesophagus', descriptionVi: 'Dài khoảng 4-5 cm, từ C6 đến ngực trên (T1), nằm ngay sau khí quản.', descriptionEn: '4-5 cm long, C6 to T1, situated directly behind trachea.' },
      { id: 'thoracic', nameVi: 'Đoạn ngực', nameEn: 'Thoracic part', nameLa: 'Pars thoracica oesophagi', nodeName: 'Oesophagus', descriptionVi: 'Dài khoảng 18-20 cm, chạy trong trung thất trên rồi trung thất sau, bắt chéo sau phế quản gốc trái và cung động mạch chủ.', descriptionEn: '18-20 cm, courses in posterior mediastinum, crossed by aortic arch and left main bronchus.' },
      { id: 'abdominal', nameVi: 'Đoạn bụng', nameEn: 'Abdominal part', nameLa: 'Pars abdominalis oesophagi', nodeName: 'Oesophagus', descriptionVi: 'Dài ngắn khoảng 2-3 cm dưới cơ hoành, nối vào tâm vị dạ dày ở góc His.', descriptionEn: 'Short 2-3 cm infra-diaphragmatic segment entering gastric cardia at the angle of His.' }
    ],
    bloodSupply: {
      arterialVi: 'Đoạn cổ: ĐM giáp dưới. Đoạn ngực: các nhánh phế quản và nhánh thực quản của ĐM chủ ngực. Đoạn bụng: ĐM vị trái và ĐM hoành dưới trái.',
      arterialEn: 'Cervical: inferior thyroid artery. Thoracic: bronchial and esophageal branches of thoracic aorta. Abdominal: left gastric and left inferior phrenic arteries.',
      venousVi: 'Đoạn cổ đổ về TM giáp dưới; đoạn ngực đổ về hệ TM đơn và bán đơn; đoạn bụng đổ về TM vị trái (hệ cửa) tạo nên vòng nối cửa-chủ quan trọng.',
      venousEn: 'Cervical: inferior thyroid veins. Thoracic: azygos and hemiazygos veins. Abdominal: left gastric vein (portal tributary), forming a vital porto-systemic anastomosis.',
      lymphaticVi: 'Hạch cổ sâu, hạch trung thất sau, hạch dạ dày trái và hạch tạng.',
      lymphaticEn: 'Deep cervical, posterior mediastinal, left gastric, and celiac lymph nodes.'
    },
    innervation: {
      parasympatheticVi: 'Dây thần kinh lang thang (CN X) tạo đám rối thực quản, điều hòa nhu động và mở cơ thắt thực quản dưới.',
      parasympatheticEn: 'Vagus nerve (CN X) via esophageal plexus, stimulating peristalsis and relaxing lower esophageal sphincter.',
      sympatheticVi: 'Từ chuỗi hạch giao cảm ngực (T1-T5) qua các dây tạng lớn.',
      sympatheticEn: 'Thoracic sympathetic trunk (T1-T5) via splanchnic fibers.',
      sensoryVi: 'Cảm giác đau dẫn truyền theo các sợi giao cảm về tủy sống T1-T4 (gây đau ngực giống nhồi máu cơ tim).',
      sensoryEn: 'Visceral nociception tracks sympathetic afferents to T1-T4 spinal levels (explains cardiac-like chest pain).'
    },
    functionVi: ['Vận chuyển tích cực viên thức ăn từ hầu xuống dạ dày bằng sóng nhu động', 'Ngăn chặn luồng trào ngược acid từ dạ dày nhờ cơ thắt thực quản dưới (LES)', 'Tạo chất nhầy bảo vệ bề mặt niêm mạc'],
    functionEn: ['Primary and secondary peristaltic propulsion of bolus to stomach', 'Prevention of gastric acid reflux via physiological lower esophageal sphincter (LES)', 'Mucosal surface lubrication'],
    histologyVi: 'Niêm mạc lót bởi biểu mô lát tầng không sừng hóa dày. Lớp cơ có đặc điểm chuyển tiếp độc đáo: 1/3 trên là cơ vân hoàn toàn, 1/3 giữa pha trộn cơ vân và cơ trơn, 1/3 dưới là cơ trơn hoàn toàn.',
    histologyEn: 'Lined by stratified squamous non-keratinized epithelium. Muscularis externa displays a unique zonal transition: upper 1/3 is purely skeletal muscle, middle 1/3 is mixed, and lower 1/3 is purely smooth muscle.',
    clinicalNotesVi: [
      'Bệnh trào ngược dạ dày thực quản (GERD) lâu ngày có thể biến đổi niêm mạc lát tầng thành biểu mô trụ ruột (Thực quản Barrett), nguy cơ tiến triển thành ung thư biểu mô tuyến.',
      'Tăng áp lực tĩnh mạch cửa (trong xơ gan) gây giãn vỡ tĩnh mạch thực quản đoạn dưới, dẫn đến nôn ra máu ồ ạt nguy kịch.',
      'Ba vị trí hẹp sinh lý: (1) Nhẫn hầu (cách răng cửa 15 cm), (2) Bắt chéo quai ĐM chủ & phế quản trái (25 cm), (3) Lỗ cơ hoành (40 cm).'
    ],
    clinicalNotesEn: [
      'Gastroesophageal reflux disease (GERD) causes metaplastic transformation to intestinal columnar epithelium (Barrett esophagus), predisposing to adenocarcinoma.',
      'Portal hypertension leads to esophageal varices at the lower portocaval anastomosis, prone to catastrophic hematemesis.',
      'Three anatomical constrictions: (1) Pharyngoesophageal junction at C6 (15 cm from incisors), (2) Aortobronchial crossing at T4/T5 (25 cm), (3) Diaphragmatic hiatus at T10 (40 cm).'
    ],
    cameraPreset: {
      target: [0.045, 0.53, -0.04],
      position: [0.045, 0.58, 0.35]
    }
  },

  stomach: {
    id: 'stomach',
    nameVi: 'Dạ Dày',
    nameEn: 'Stomach',
    nameLa: 'Gaster (Ventriculus)',
    category: 'esophagus_stomach',
    primaryNodeName: 'Stomach',
    meshNodeNames: ['Stomach'],
    canonicalCenter: [0.05, 0.3383, 0.02],
    approximateDimensions: 'Dài 25 cm, rộng 12 cm, dung tích 1.2 - 1.5 L',
    anatomicalQuadrant: 'Vùng Thượng vị (Epigastrium) & Hạ sườn trái (LUQ)',
    embryologicalOrigin: 'Ruột trước (Foregut) xoay 90 độ theo chiều kim đồng hồ quanh trục dọc',
    overviewVi: 'Dạ dày là phần phình to nhất của ống tiêu hóa, hình chữ J, nằm ở tầng trên mạc treo đại tràng ngang. Nó nhận thức ăn từ thực quản, tiết acid dịch vị và men pepsin để phân giải protein, nhào nặn thành vị trấp (chyme) rồi đẩy từng đợt xuống tá tràng qua lỗ môn vị.',
    overviewEn: 'The stomach is the most dilated, J-shaped segment of the alimentary canal, located in the epigastric and left hypochondriac regions. It serves as a reservoir, produces gastric acid and pepsin to digest proteins, churns contents into chyme, and metered release into the duodenum.',
    subdivisions: [
      { id: 'cardia', nameVi: 'Tâm vị', nameEn: 'Cardia', nameLa: 'Cardia', nodeName: 'Stomach', descriptionVi: 'Vùng bao quanh lỗ tâm vị nối tiếp thực quản, không có cơ thắt giải phẫu riêng.', descriptionEn: 'Surrounds the opening of the esophagus into stomach.' },
      { id: 'fundus', nameVi: 'Đáy vị', nameEn: 'Fundus of stomach', nameLa: 'Fundus gastricus', nodeName: 'Stomach', descriptionVi: 'Vòm hình chỏm cầu nằm trên mặt phẳng ngang qua tâm vị, thường chứa bóng hơi dạ dày trên phim X-quang.', descriptionEn: 'Dome-shaped upper portion projecting above the gastroesophageal junction, containing gas bubble.' },
      { id: 'body', nameVi: 'Thân vị', nameEn: 'Body of stomach', nameLa: 'Corpus gastricum', nodeName: 'Stomach', descriptionVi: 'Phần lớn nhất chiếm giữa đáy vị và hang môn vị, là nơi tập trung các tuyến tiết acid HCl và men pepsin.', descriptionEn: 'Main central portion between fundus and antrum, rich in acid-secreting parietal cells.' },
      { id: 'pylorus', nameVi: 'Phần môn vị & Cơ thắt môn vị', nameEn: 'Pyloric part & Sphincter', nameLa: 'Pars pylorica', nodeName: 'Stomach', descriptionVi: 'Gồm hang vị (antrum) và ống môn vị (canal), kết thúc bằng cơ thắt môn vị bằng cơ trơn dày kiểm soát xả vị trấp.', descriptionEn: 'Consists of antrum and canal, ending at the muscular pyloric sphincter.' },
      { id: 'curvatures', nameVi: 'Bờ cong nhỏ & Bờ cong lớn', nameEn: 'Lesser & Greater Curvatures', nameLa: 'Curvatura gastrica minor / major', nodeName: 'Stomach', descriptionVi: 'Bờ cong nhỏ hướng sang phải đính mạc nối nhỏ; bờ cong lớn hướng sang trái đính mạc nối lớn.', descriptionEn: 'Lesser curvature anchors lesser omentum; greater curvature anchors greater omentum.' }
    ],
    bloodSupply: {
      arterialVi: 'Xuất phát từ Động mạch Thân tạng (Celiac Trunk): ĐM vị trái, ĐM vị phải (từ ĐM gan riêng), ĐM vị-mạc nối phải (từ ĐM vị-tá tràng), ĐM vị-mạc nối trái và các ĐM vị ngắn (từ ĐM lách).',
      arterialEn: 'Exclusively from Celiac Trunk branches: Left gastric artery, Right gastric (proper hepatic), Right gastro-omental (gastroduodenal), Left gastro-omental and short gastric arteries (splenic artery).',
      venousVi: 'TM vị trái và vị phải đổ trực tiếp vào Tĩnh mạch Cửa; TM vị-mạc nối trái và các TM vị ngắn đổ vào TM lách; TM vị-mạc nối phải đổ vào TM mạc treo tràng trên.',
      venousEn: 'Right and left gastric veins directly into Portal Vein; left gastro-omental and short gastrics into Splenic vein; right gastro-omental into Superior Mesenteric vein.',
      lymphaticVi: 'Dẫn lưu về hạch bờ cong nhỏ, hạch bờ cong lớn, hạch môn vị và cuối cùng tụ về hạch thân tạng (Celiac nodes).',
      lymphaticEn: 'Drains to gastric, gastro-omental, and pyloric nodes, converging into the celiac lymph nodes.'
    },
    innervation: {
      parasympatheticVi: 'Thân thần kinh lang thang trước và sau (CN X) làm tăng tiết acid dịch vị và kích thích nhu động đẩy.',
      parasympatheticEn: 'Anterior and posterior vagal trunks (CN X), stimulating gastric acid secretion and motility.',
      sympatheticVi: 'Từ các đốt tủy T6-T9 qua thần kinh tạng lớn đến hạch thân tạng, ức chế co bóp và co thắt mạch máu.',
      sympatheticEn: 'T6-T9 thoracic splanchnic nerves via celiac plexus, inhibiting peristalsis and mediating vasoconstriction.',
      sensoryVi: 'Các sợi cảm giác đau tạng theo dây giao cảm về tủy sống ngực (gây đau bỏng rát vùng thượng vị).',
      sensoryEn: 'Visceral afferents travel with sympathetics, causing epigastric pain projection.'
    },
    functionVi: ['Chứa thức ăn tạm thời (dung tích lên đến 2-3 L)', 'Tiết acid clohydric (HCl) diệt khuẩn và kích hoạt pepsinogen', 'Tiết yếu tố nội tại (Intrinsic Factor) cần thiết để hấp thu vitamin B12 ở hồi tràng', 'Nhào trộn cơ học thức ăn thành vị trấp mịn'],
    functionEn: ['Temporary reservoir with receptive relaxation', 'HCl secretion for sterilization and pepsin activation', 'Intrinsic factor secretion essential for terminal ileal B12 absorption', 'Mechanical churning and enzymatic protein proteolysis'],
    histologyVi: 'Biểu mô trụ đơn tiết nhầy trung tính bảo vệ. Lớp đệm chứa các hố dạ dày (gastric pits) và tuyến dạ dày gồm: tế bào thành (tiết HCl và IF), tế bào chính (tiết pepsinogen), tế bào G (tiết gastrin). Tầng cơ đặc biệt có 3 lớp: chéo trong, vòng giữa, dọc ngoài.',
    histologyEn: 'Simple columnar epithelium with surface mucous cells. Gastric pits lead to branched glands containing parietal (oxyntic) cells (HCl & Intrinsic Factor), chief (zymogenic) cells (pepsinogen), and enteroendocrine G cells (gastrin). Muscularis externa uniquely has 3 layers: inner oblique, middle circular, outer longitudinal.',
    clinicalNotesVi: [
      'Viêm loét dạ dày - tá tràng thường do vi khuẩn Helicobacter pylori (HP) hoặc lạm dụng thuốc chống viêm không steroid (NSAIDs). Biến chứng nguy hiểm gồm xuất huyết tiêu hóa trên và thủng dạ dày.',
      'Ung thư dạ dày là một trong những ung thư đường tiêu hóa phổ biến nhất ở Đông Á, thường di căn đến hạch Virchow (hạch thượng đòn trái) và buồng trứng (u Krukenberg).',
      'Hẹp phì đại môn vị ở trẻ sơ sinh (Pyloric stenosis) gây nôn vọt sau ăn, cần phẫu thuật mở cơ môn vị (phẫu thuật Ramstedt).'
    ],
    clinicalNotesEn: [
      'Peptic ulcer disease is primarily caused by Helicobacter pylori colonization or chronic NSAID use, risking upper GI bleeding and perforation.',
      'Gastric adenocarcinoma often metastasizes to the left supraclavicular lymph node (Virchow node) or bilateral ovaries (Krukenberg tumor).',
      'Infantile hypertrophic pyloric stenosis causes projectile non-bilious vomiting, treated by Ramstedt pyloromyotomy.'
    ],
    cameraPreset: {
      target: [0.05, 0.34, 0.02],
      position: [0.05, 0.38, 0.38]
    }
  },

  duodenum: {
    id: 'duodenum',
    nameVi: 'Tá Tràng',
    nameEn: 'Duodenum',
    nameLa: 'Duodenum',
    category: 'small_intestine',
    primaryNodeName: 'Duodenum',
    meshNodeNames: ['Duodenum'],
    canonicalCenter: [0.05, 0.2553, 0.01],
    approximateDimensions: 'Dài 25 cm (12 khoát ngón tay), đường kính 3.5 - 4 cm',
    anatomicalQuadrant: 'Vùng Thượng vị & Rốn (Ôm quanh đầu tụy)',
    embryologicalOrigin: 'Nửa trên từ Ruột trước (Foregut), nửa dưới từ Ruột giữa (Midgut)',
    overviewVi: 'Tá tràng là đoạn đầu tiên, ngắn nhất, rộng nhất và cố định nhất của ruột non. Tá tràng uốn cong thành hình chữ C ôm sát lấy đầu tụy. Đây là trung tâm giao thoa nơi dịch mật và dịch tụy đổ vào nhũ tương hóa chất béo và trung hòa acid dạ dày.',
    overviewEn: 'The duodenum is the initial, shortest (25 cm), widest, and most retroperitoneal segment of the small intestine. Its C-shaped curve embraces the head of the pancreas and receives both bile and pancreatic juice at the major duodenal papilla.',
    subdivisions: [
      { id: 'part1', nameVi: 'Đoạn trên (Hành tá tràng - D1)', nameEn: 'Superior part (Duodenal bulb)', nameLa: 'Pars superior duodeni', nodeName: 'Duodenum', descriptionVi: 'Dài 5 cm, di động trong phúc mạc, vị trí phổ biến nhất của ổ loét tá tràng.', descriptionEn: 'First 5 cm, mobile intraperitoneal bulb, most common site of peptic ulceration.' },
      { id: 'part2', nameVi: 'Đoạn xuống (D2)', nameEn: 'Descending part', nameLa: 'Pars descendens duodeni', nodeName: 'Duodenum', descriptionVi: 'Dài 7-8 cm, chạy dọc bờ phải cột sống L1-L3, thành trong có Nhú tá lớn (bóng Vater) và Nhú tá bé.', descriptionEn: 'Runs vertically (L1-L3); houses the major duodenal papilla (ampulla of Vater) and minor papilla.' },
      { id: 'part3', nameVi: 'Đoạn ngang (D3)', nameEn: 'Horizontal (Inferior) part', nameLa: 'Pars horizontalis duodeni', nodeName: 'Duodenum', descriptionVi: 'Dài 10 cm, chạy ngang trước tĩnh mạch chủ dưới và động mạch chủ bụng, bị bó mạch mạc treo tràng trên bắt chéo phía trước.', descriptionEn: 'Crosses IVC and aorta horizontally; crossed anteriorly by superior mesenteric vessels.' },
      { id: 'part4', nameVi: 'Đoạn lên (D4)', nameEn: 'Ascending part', nameLa: 'Pars ascendens duodeni', nodeName: 'Duodenum', descriptionVi: 'Dài 2.5 cm, đi lên bên trái cột sống đến góc tá-hỗng tràng (Góc Treitz) được treo bởi dây chằng Treitz.', descriptionEn: 'Ascends to duodenojejunal flexure, suspended by the ligament of Treitz.' }
    ],
    bloodSupply: {
      arterialVi: 'Đặc điểm tuần hoàn kép (Ranh giới ruột trước/giữa): ĐM tá-tụy trên (nhánh của ĐM vị-tá tràng thuộc thân tạng) tiếp nối với ĐM tá-tụy dưới (nhánh của ĐM mạc treo tràng trên).',
      arterialEn: 'Dual vascular transition: Superior pancreaticoduodenal artery (from celiac trunk via gastroduodenal) anastomoses with Inferior pancreaticoduodenal artery (from SMA).',
      venousVi: 'Các tĩnh mạch tá-tụy đổ về Tĩnh mạch Cửa và Tĩnh mạch Mạc treo tràng trên.',
      venousEn: 'Pancreaticoduodenal veins drain into Portal Vein and Superior Mesenteric Vein.',
      lymphaticVi: 'Đổ về hạch tá-tụy, hạch môn vị và hạch mạc treo tràng trên.',
      lymphaticEn: 'Pancreaticoduodenal, pyloric, and superior mesenteric lymph nodes.'
    },
    innervation: {
      parasympatheticVi: 'Thần kinh lang thang (CN X) kích thích bài tiết enzyme và nhu động ruột.',
      parasympatheticEn: 'Vagus nerve (CN X) stimulating secretomotor activity and motility.',
      sympatheticVi: 'Từ hạch thân tạng và hạch mạc treo tràng trên (T8-T10).',
      sympatheticEn: 'Celiac and superior mesenteric plexuses (T8-T10).',
      sensoryVi: 'Dẫn truyền cảm giác căng trướng và đau qua các sợi tạng về tủy sống.',
      sensoryEn: 'Visceral afferents tracking sympathetic pathways.'
    },
    functionVi: ['Trung hòa acid clohydric của dịch vị nhờ chất nhầy kiềm từ tuyến Brunner', 'Nhận dịch tụy chứa enzym tiêu hóa (trypsin, lipase, amylase)', 'Nhận dịch mật nhũ tương hóa lipid', 'Hấp thu một phần sắt, calci và dưỡng chất'],
    functionEn: ['Acid neutralization via alkaline secretions of Brunner glands', 'Reception of pancreatic digestive enzymes (trypsin, chymotrypsin, lipase, amylase)', 'Reception of hepatic bile for lipid emulsification', 'Site of primary iron and calcium absorption'],
    histologyVi: 'Biểu mô trụ đơn có diềm bàn chải (microvilli). Đặc điểm mô học nhận diện độc nhất là sự hiện diện của các Tuyến Brunner (tuyến tá tràng) phân nhánh tiết nhầy kiềm phong phú trong tầng dưới niêm mạc.',
    histologyEn: 'Simple columnar epithelium with prominent microvilli brush border. Histologically characterized by abundant alkaline mucus-secreting Brunner glands located within the submucosa.',
    clinicalNotesVi: [
      'Thủng ổ loét hành tá tràng mặt trước gây viêm phúc mạc toàn thể, thấy liềm hơi dưới cơ hoành trên X-quang bụng đứng.',
      'Ổ loét mặt sau hành tá tràng có thể ăn mòn vào Động mạch vị-tá tràng (Gastroduodenal artery) gây xuất huyết tiêu hóa ồ ạt đe dọa tính mạng.',
      'Hội chứng Động mạch mạc treo tràng trên (Wilkie syndrome): Đoạn D3 tá tràng bị kẹp ép giữa động mạch chủ và ĐM mạc treo tràng trên gây tắc tá tràng.'
    ],
    clinicalNotesEn: [
      'Anterior duodenal bulb ulcers perforate into peritoneal cavity, creating free air under the diaphragm (pneumoperitoneum).',
      'Posterior duodenal ulcers erode into the gastroduodenal artery, causing life-threatening massive upper GI hemorrhage.',
      'Superior Mesenteric Artery (SMA) syndrome (Wilkie): extrinsic compression of D3 duodenum between SMA and abdominal aorta.'
    ],
    cameraPreset: {
      target: [0.05, 0.26, 0.01],
      position: [0.05, 0.29, 0.28]
    }
  },

  small_intestine: {
    id: 'small_intestine',
    nameVi: 'Hỗng Tràng & Hồi Tràng',
    nameEn: 'Jejunum & Ileum',
    nameLa: 'Jejunum et Ileum',
    category: 'small_intestine',
    primaryNodeName: 'Jejunum',
    meshNodeNames: ['Jejunum'],
    canonicalCenter: [0.045, 0.1307, 0.04],
    approximateDimensions: 'Dài 5 - 6 m (Hỗng tràng chiếm 2/5, Hồi tràng chiếm 3/5)',
    anatomicalQuadrant: 'Vùng Quanh rốn, Hạ vị, Hố chậu phải & Hố chậu trái',
    embryologicalOrigin: 'Ruột giữa (Midgut) xoay 270 độ ngược chiều kim đồng hồ quanh bó mạch mạc treo tràng trên',
    overviewVi: 'Hỗng tràng và hồi tràng tạo nên phần di động lớn nhất của ruột non, cuộn thành 14-16 quai ruột chiếm hầu hết khoang bụng dưới và khung chậu. Toàn bộ ruột non được treo vào thành bụng sau bởi Rễ mạc treo ruột non (Radix mesenterii). Đây là cơ quan chính hấp thu nước và toàn bộ dưỡng chất.',
    overviewEn: 'The jejunum and ileum form the highly mobile loops of the small intestine, suspended by the fan-shaped mesentery proper from the posterior abdominal wall. They are the primary site for enzymatic nutrient digestion and absorption.',
    subdivisions: [
      { id: 'jejunum', nameVi: 'Hỗng tràng (2/5 trên)', nameEn: 'Jejunum', nameLa: 'Jejunum', nodeName: 'Jejunum', descriptionVi: 'Thành dày, lòng rộng, màu đỏ tươi do giàu mạch máu, có nhiều nếp gấp van Kerckring cao dày, quai mạch mạc treo thưa đơn giản.', descriptionEn: 'Thicker wall, wider lumen, deeper red color with prominent plicae circulares and simple vascular arcades.' },
      { id: 'ileum', nameVi: 'Hồi tràng (3/5 dưới)', nameEn: 'Ileum', nameLa: 'Ileum', nodeName: 'Jejunum', descriptionVi: 'Thành mỏng hơn, ít nếp gấp, quai mạch mạc treo nhiều tầng phức tạp, chứa nhiều mảng Peyer bạch huyết, kết thúc tại van hồi-manh tràng.', descriptionEn: 'Thinner wall, complex multiple vascular arcades, abundant Peyer patches, terminating at ileocecal valve.' }
    ],
    bloodSupply: {
      arterialVi: 'Các nhánh động mạch hỗng tràng và hồi tràng (12-15 nhánh) phát xuất từ bờ trái Động mạch Mạc treo tràng trên (SMA), tạo thành các cung mạch (arcades) và động mạch thẳng (vasa recta).',
      arterialEn: 'Jejunal and ileal branches (12-15) from the left side of Superior Mesenteric Artery (SMA), forming arcades and straight vasa recta.',
      venousVi: 'Tĩnh mạch Mạc treo tràng trên (SMV) hợp với Tĩnh mạch Lách tạo nên Tĩnh mạch Cửa đưa dưỡng chất về gan chuyển hóa.',
      venousEn: 'Superior Mesenteric Vein (SMV) joining splenic vein to form the Portal Vein, carrying absorbed nutrients to liver.',
      lymphaticVi: 'Đổ vào các hạch mạc treo, bạch mạch ruột dẫn nhũ trấp (chyle) đổ vào bể dưỡng chấp (Cisterna chyli) và ống ngực.',
      lymphaticEn: 'Mesenteric lymph nodes; lacteals carry lipid-rich chyle to the cisterna chyli and thoracic duct.'
    },
    innervation: {
      parasympatheticVi: 'Thần kinh lang thang (CN X) làm tăng nhu động ruột và kích thích tiết men.',
      parasympatheticEn: 'Vagus nerve (CN X), stimulating propulsive motility and secretion.',
      sympatheticVi: 'Từ các đốt tủy T9-T11 qua các dây tạng nhỏ đến hạch mạc treo tràng trên.',
      sympatheticEn: 'T9-T11 thoracic splanchnics via superior mesenteric ganglion.',
      sensoryVi: 'Cảm giác đau tạng do căng giãn quá mức dẫn truyền theo dây giao cảm quy chiếu về vùng quanh rốn.',
      sensoryEn: 'Visceral stretch afferents project pain typically to periumbilical region.'
    },
    functionVi: ['Tiêu hóa hoàn tất carbohydrate, protein và lipid nhờ enzym màng bàn chải', 'Hấp thu hơn 90% nước, điện giải và chất dinh dưỡng', 'Hấp thu chuyên biệt vitamin B12 gắn IF và muối mật tại đoạn cuối hồi tràng', 'Phòng thủ miễn dịch niêm mạc mạnh mẽ nhờ các mảng Peyer và tế bào M'],
    functionEn: ['Complete digestion via brush-border disaccharidases and peptidases', 'Absorption of 90%+ water, electrolytes, amino acids, monosaccharides, and micellar lipids', 'Specific absorption of vitamin B12-intrinsic factor complexes and conjugated bile salts at terminal ileum', 'Mucosal gut-associated lymphoid tissue (GALT) defense via Peyer patches'],
    histologyVi: 'Biểu mô trụ đơn có diềm bàn chải dày đặc (microvilli). Niêm mạc có các nếp gấp vòng (van Kerckring) và các nhung mao (villi) làm tăng diện tích tiếp xúc lên gấp 600 lần (~200 m²). Các tuyến Lieberkühn chứa tế bào Paneth tiết lysozyme và tế bào nội tiết ruột.',
    histologyEn: 'Simple columnar epithelium with dense brush border. Surface area is multiplied ~600-fold by plicae circulares (valves of Kerckring), villi, and microvilli (~200 m² total surface). Crypts of Lieberkühn contain antimicrobial Paneth cells and enteroendocrine cells.',
    clinicalNotesVi: [
      'Túi thừa Meckel (Meckel diverticulum) là dị tật bẩm sinh do ống noãn hoàng không teo hết, tuân theo "quy tắc số 2": gặp ở 2% dân số, cách van hồi-manh tràng 2 feet (~60 cm), dài 2 inch, có thể chứa niêm mạc dạ dày lạc chỗ gây loét xuất huyết.',
      'Bệnh Crohn là viêm ruột mạn tính dạng tổn thương nhảy cóc (skip lesions), thường gặp nhất ở đoạn cuối hồi tràng (terminal ileitis).',
      'Nhồi máu mạc treo cấp do huyết khối ĐM mạc treo tràng trên gây hoại tử ruột non diện rộng với tỷ lệ tử vong rất cao nếu không mổ kịp thời.'
    ],
    clinicalNotesEn: [
      'Meckel diverticulum: remnant of vitelline duct adhering to rule of 2s (2% population, 2 feet from ileocecal valve, 2 inches long, contains 2 types of ectopic tissue: gastric/pancreatic).',
      'Crohn disease frequently manifests as transmural inflammation and stricturing in the terminal ileum.',
      'Acute mesenteric ischemia from SMA thromboembolism causes catastrophic small bowel necrosis requiring urgent revascularization.'
    ],
    cameraPreset: {
      target: [0.045, 0.13, 0.04],
      position: [0.045, 0.16, 0.36]
    }
  },

  large_intestine: {
    id: 'large_intestine',
    nameVi: 'Đại Tràng (Ruột Già)',
    nameEn: 'Large Intestine (Colon)',
    nameLa: 'Intestinum crassum (Colon)',
    category: 'large_intestine',
    primaryNodeName: 'Ascending colon',
    meshNodeNames: [
      'Ascending colon',
      'Transverse colon',
      'Descending colon',
      'Sigmoid colon',
      'Free taenia',
      'Mesocolic taenia',
      'Omental taenia'
    ],
    canonicalCenter: [0.05, 0.15, -0.01],
    approximateDimensions: 'Dài khoảng 1.5 m, đường kính 6 - 8 cm (giảm dần về phía sau)',
    anatomicalQuadrant: 'Vây quanh chu vi ổ bụng: Hố chậu phải, Hông phải, Thượng vị, Hông trái, Hố chậu trái và Chậu hông',
    embryologicalOrigin: 'Ruột giữa (từ manh tràng đến 2/3 phải đại tràng ngang) và Ruột sau (1/3 trái đại tràng ngang đến trực tràng)',
    overviewVi: 'Đại tràng bao quanh các quai ruột non như một chiếc khung. Đại tràng được phân biệt với ruột non nhờ ba đặc điểm giải phẫu đặc trưng: (1) Ba dải cơ dọc (Taeniae coli), (2) Các bướu phình đại tràng (Haustra), (3) Các túi thừa mạc nối chứa mỡ (Appendices epiploicae). Đại tràng có chức năng chính là tái hấp thu nước, cô đặc chất bã và lên men chất xơ.',
    overviewEn: 'The large intestine frames the small intestinal loops. It is definitively distinguished by three anatomical hallmarks: (1) Three longitudinal bands (taeniae coli), (2) Sacculations (haustra), (3) Fatty peritoneal projections (omental/epiploic appendages). Its primary functions are water resorption, fecal compaction, and symbiotic bacterial fermentation.',
    subdivisions: [
      { id: 'ascending', nameVi: 'Đại tràng lên & Góc gan', nameEn: 'Ascending colon & Hepatic flexure', nameLa: 'Colon ascendens', nodeName: 'Ascending colon', descriptionVi: 'Dài 15 cm, chạy dọc rãnh đại tràng phải, dính vào thành bụng sau (mạc dính Toldt I). Tận cùng ở góc đại tràng phải dưới gan.', descriptionEn: 'Retroperitoneal ascending segment, turns at right colic (hepatic) flexure.' },
      { id: 'transverse', nameVi: 'Đại tràng ngang & Góc lách', nameEn: 'Transverse colon & Splenic flexure', nameLa: 'Colon transversum', nodeName: 'Transverse colon', descriptionVi: 'Dài 45-50 cm, di động nhờ mạc treo đại tràng ngang, vắt ngang ổ bụng từ góc gan sang góc lách.', descriptionEn: 'Longest, mobile segment suspended by transverse mesocolon, turns at acute left colic (splenic) flexure.' },
      { id: 'descending', nameVi: 'Đại tràng xuống', nameEn: 'Descending colon', nameLa: 'Colon descendens', nodeName: 'Descending colon', descriptionVi: 'Dài 25-30 cm, dính vào thành bụng sau rãnh đại tràng trái (mạc dính Toldt II), chạy từ góc lách đến mào chậu.', descriptionEn: 'Fixed retroperitoneal segment running along left flank from splenic flexure to pelvic brim.' },
      { id: 'sigmoid', nameVi: 'Đại tràng sigma', nameEn: 'Sigmoid colon', nameLa: 'Colon sigmoideum', nodeName: 'Sigmoid colon', descriptionVi: 'Hình chữ S dài 40 cm, di động có mạc treo đại tràng sigma, nằm trong hố chậu trái và chậu hông bé, liên tiếp với trực tràng ở S3.', descriptionEn: 'S-shaped mobile loop in left iliac fossa and pelvis, continuous with rectum at S3 vertebral level.' },
      { id: 'taeniae', nameVi: 'Dải cơ dọc (Taeniae coli)', nameEn: 'Taeniae coli', nameLa: 'Taeniae coli', nodeName: 'Free taenia', descriptionVi: 'Gồm 3 dải: dải tự do (taenia libera), dải mạc treo (taenia mesocolica) và dải mạc nối (taenia omentalis).', descriptionEn: 'Three bands: free taenia, mesocolic taenia, and omental taenia; their tone creates haustra.' }
    ],
    bloodSupply: {
      arterialVi: '2/3 phải đại tràng: ĐM hồi-đại tràng, ĐM đại tràng phải, ĐM đại tràng giữa (nhánh ĐM mạc treo tràng trên - SMA). 1/3 trái đại tràng: ĐM đại tràng trái, các ĐM sigma (nhánh ĐM mạc treo tràng dưới - IMA). Động mạch viền Drummond (Marginal artery) nối thông toàn bộ.',
      arterialEn: 'Proximal 2/3: Ileocolic, right colic, middle colic arteries (SMA). Distal 1/3: Left colic, sigmoid arteries (IMA). Continuous peripheral arc of Drummond (marginal artery of colon).',
      venousVi: 'TM mạc treo tràng trên và TM mạc treo tràng dưới đều đổ về hệ Tĩnh mạch Cửa.',
      venousEn: 'Superior and Inferior Mesenteric Veins draining into the Portal Vein network.',
      lymphaticVi: 'Đổ qua các hạch trên thành, cạnh đại tràng, trung gian và hạch chính quanh gốc SMA / IMA.',
      lymphaticEn: 'Epicolic, paracolic, intermediate colic, and pre-aortic mesenteric nodes.'
    },
    innervation: {
      parasympatheticVi: 'Đoạn ruột giữa (đến 2/3 phải đại tràng ngang): TK lang thang (CN X). Đoạn ruột sau (1/3 trái đại tràng ngang đến trực tràng): TK tạng chậu hông (S2-S4).',
      parasympatheticEn: 'Midgut colon: Vagus nerve (CN X). Hindgut colon: Pelvic splanchnic nerves (S2-S4 nervi erigentes).',
      sympatheticVi: 'Từ các đốt tủy T10-L2 qua hạch mạc treo tràng trên và hạch mạc treo tràng dưới.',
      sympatheticEn: 'T10-L2 sympathetic chain via superior and inferior mesenteric plexuses.',
      sensoryVi: 'Cảm giác đau tạng theo các sợi giao cảm tương ứng với từng vùng phát triển phôi học.',
      sensoryEn: 'Visceral afferents tracking sympathetic pathways.'
    },
    functionVi: ['Tái hấp thu nước (~1.5 L/ngày) và chất điện giải (Na+, Cl-)', 'Chứa và cô đặc chất bã hình thành phân', 'Hệ vi sinh vật đường ruột (microbiota) lên men chất xơ và tổng hợp vitamin K, vitamin B', 'Tiết chất nhầy bôi trơn phân qua lòng đại tràng'],
    functionEn: ['Reabsorption of water (~1.5 L/day) and electrolytes (sodium, chloride)', 'Fecal storage and compaction', 'Bacterial fermentation of non-digestible carbs and synthesis of vitamin K and B complex', 'Mucin secretion for luminal lubrication'],
    histologyVi: 'Biểu mô trụ đơn với mật độ tế bào hình đài (goblet cells) tiết chất nhầy rất cao. Không có nhung mao (villi), chỉ có các tuyến Lieberkühn thẳng dài hình ống. Lớp cơ dọc tập trung thành 3 dải cơ dọc (taeniae).',
    histologyEn: 'Simple columnar epithelium with an exceptionally high density of mucus-secreting goblet cells. Completely lacks villi; features tall straight crypts of Lieberkühn. Outer longitudinal muscular layer is aggregated into three taeniae coli bands.',
    clinicalNotesVi: [
      'Ung thư đại trực tràng (Colorectal carcinoma) là một trong những ung thư phổ biến hàng đầu. Khối u đại tràng phải thường gây thiếu máu thiếu sắt âm ỉ, khối u đại tràng trái dễ gây tắc ruột và thay đổi thói quen đại tiện.',
      'Bệnh viêm túi thừa đại tràng (Diverticulitis) phổ biến ở đại tràng sigma do thoát vị niêm mạc qua chỗ yếu của thành cơ nơi mạch máu xuyên qua.',
      'Xoắn đại tràng sigma (Sigmoid volvulus) xảy ra ở người già do quai sigma dài có chân mạc treo hẹp, hình ảnh "hạt cà phê" trên X-quang bụng.'
    ],
    clinicalNotesEn: [
      'Colorectal carcinoma: right-sided tumors present with occult bleeding and iron deficiency anemia; left-sided tumors cause altered bowel habits and obstruction.',
      'Diverticulitis: false diverticula herniating at sites of penetrating nutrient vessels, most frequently in sigmoid colon.',
      'Sigmoid volvulus: closed-loop obstruction on a redundant mesocolon, demonstrating characteristic "coffee-bean" sign on abdominal radiography.'
    ],
    cameraPreset: {
      target: [0.05, 0.15, -0.01],
      position: [0.05, 0.18, 0.42]
    }
  },

  appendix: {
    id: 'appendix',
    nameVi: 'Ruột Thừa',
    nameEn: 'Vermiform Appendix',
    nameLa: 'Appendix vermiformis',
    category: 'large_intestine',
    primaryNodeName: 'Vermiform appendix',
    meshNodeNames: ['Vermiform appendix', 'Meso-appendix'],
    canonicalCenter: [0.0894, 0.0894, 0.02],
    approximateDimensions: 'Dài trung bình 6 - 9 cm (dao động 2 - 20 cm), đường kính 6 mm',
    anatomicalQuadrant: 'Hố chậu phải (Right Iliac Fossa - RIF) / Điểm McBurney',
    embryologicalOrigin: 'Ruột giữa (Midgut) - mầm manh tràng',
    overviewVi: 'Ruột thừa là một ống hình giun bịt kín phát xuất từ bờ sau-trong của manh tràng, cách van hồi manh tràng khoảng 2-3 cm dưới chỗ hội tụ của 3 dải cơ dọc (taeniae coli). Gốc ruột thừa tương ứng trên thành bụng với điểm McBurney (1/3 ngoài đường nối gai chậu trước trên phải đến rốn).',
    overviewEn: 'The vermiform appendix is a blind-ended muscular pouch arising from the posteromedial cecal wall ~2-3 cm inferior to the ileocecal valve, precisely at the confluence of the three taeniae coli. Its base maps surface-anatomically to McBurney point.',
    subdivisions: [
      { id: 'base', nameVi: 'Gốc ruột thừa', nameEn: 'Base of appendix', nameLa: 'Ostium appendicis vermiformis', nodeName: 'Vermiform appendix', descriptionVi: 'Cố định tại điểm hội tụ của ba dải cơ dọc ở manh tràng.', descriptionEn: 'Fixed base at the convergence of the three taeniae coli.' },
      { id: 'tip', nameVi: 'Đầu ruột thừa & Các vị trí giải phẫu', nameEn: 'Tip positions', nameLa: 'Apex appendicis vermiformis', nodeName: 'Vermiform appendix', descriptionVi: 'Di động tự do: sau manh tràng (65%), tiểu khung (30%), dưới manh tràng (2%), trước/sau hồi tràng (1%).', descriptionEn: 'Highly variable: retrocecal (65%), pelvic (30%), subcecal (2%), pre/post-ileal (1%).' },
      { id: 'mesoappendix', nameVi: 'Mạc treo ruột thừa', nameEn: 'Meso-appendix', nameLa: 'Mesoappendix', nodeName: 'Meso-appendix', descriptionVi: 'Nếp phúc mạc hình tam giác mang động mạch ruột thừa chạy đến nuôi đầu ruột thừa.', descriptionEn: 'Triangular peritoneal fold transmitting the appendicular artery.' }
    ],
    bloodSupply: {
      arterialVi: 'Động mạch ruột thừa (Appendicular artery), nhánh tận của ĐM hồi-đại tràng (nhánh của SMA). Là động mạch tận (end-artery), tắc mạch sẽ gây hoại tử ruột thừa nhanh chóng.',
      arterialEn: 'Appendicular artery, an end-artery branch of the ileocolic artery (from SMA); occlusion rapidly causes ischemic necrosis.',
      venousVi: 'Tĩnh mạch ruột thừa đi kèm động mạch đổ về TM hồi-đại tràng rồi vào TM mạc treo tràng trên.',
      venousEn: 'Appendicular vein drains via ileocolic vein into the Superior Mesenteric Vein.',
      lymphaticVi: 'Đổ về chuỗi hạch hồi-đại tràng và hạch mạc treo tràng trên.',
      lymphaticEn: 'Drains to ileocolic and superior mesenteric lymph nodes.'
    },
    innervation: {
      parasympatheticVi: 'Thần kinh lang thang (CN X).',
      parasympatheticEn: 'Vagus nerve (CN X).',
      sympatheticVi: 'Từ đoạn tủy ngực T10 qua hạch mạc treo tràng trên.',
      sympatheticEn: 'T10 sympathetic spinal segments via superior mesenteric plexus.',
      sensoryVi: 'Cảm giác đau tạng khởi phát quy chiếu theo sợi cảm giác T10 về vùng rốn; khi viêm lan đến phúc mạc thành mới khu trú về hố chậu phải (điểm McBurney).',
      sensoryEn: 'Visceral afferents travel to T10, producing referred periumbilical pain initially before somatic localization to RIF.'
    },
    functionVi: ['Cơ quan miễn dịch thứ cấp chứa mô bạch huyết phong phú (được ví như "amydal của ổ bụng")', 'Kho dự trữ vi khuẩn có lợi giúp tái lập hệ vi sinh đường ruột sau các đợt tiêu chảy cấp', 'Tham gia dung nạp miễn dịch đường tiêu hóa'],
    functionEn: ['Secondary lymphoid organ rich in mucosal follicles ("abdominal tonsil")', 'Safe-house reservoir for commensal gut microbiome replenishment', 'Maintenance of intestinal immune tolerance'],
    histologyVi: 'Biểu mô trụ đơn và các tuyến Lieberkühn. Đặc điểm mô học nổi bật nhất là lớp đệm và tầng dưới niêm mạc chứa đầy các nang bạch huyết (lymphoid follicles) phát triển mạnh ở người trẻ tuổi.',
    histologyEn: 'Lined by simple columnar epithelium and crypts of Lieberkühn. Characterized by prominent lymphoid follicles expanding throughout the lamina propria and submucosa, particularly active in youth.',
    clinicalNotesVi: [
      'Viêm ruột thừa cấp (Acute Appendicitis) là cấp cứu ngoại khoa ổ bụng phổ biến nhất. Khởi đầu đau mơ hồ quanh rốn (T10), sau 4-6 giờ chuyển đau khu trú rõ rệt ở hố chậu phải kèm sốt nhẹ và phản ứng thành bụng.',
      'Dấu hiệu lâm sàng kinh điển: Dấu McBurney, Dấu Blumberg (phản ứng dội), Dấu Rovsing (ấn hố chậu trái đau hố chậu phải), Dấu cơ thắt lưng chậu (Psoas sign) trong ruột thừa sau manh tràng.',
      'Tắc nghẽn lòng ruột thừa do sỏi phân (fecalith) hoặc phì đại nang bạch huyết là nguyên nhân khởi phát hàng đầu dẫn đến ứ đọng, thiếu máu hoại tử và vỡ gây viêm phúc mạc.'
    ],
    clinicalNotesEn: [
      'Acute appendicitis is the most common surgical abdominal emergency, presenting with migratory pain from periumbilical (T10) to right lower quadrant.',
      'Classic clinical signs: McBurney point tenderness, Blumberg sign (rebound tenderness), Rovsing sign, Psoas sign (retrocecal), Obturator sign (pelvic).',
      'Appendiceal lumen obstruction by a fecalith or lymphoid hyperplasia triggers luminal distension, bacterial proliferation, ischemia, and perforation peritonitis.'
    ],
    cameraPreset: {
      target: [0.089, 0.09, 0.02],
      position: [0.12, 0.12, 0.22]
    }
  },

  liver: {
    id: 'liver',
    nameVi: 'Gan',
    nameEn: 'Liver',
    nameLa: 'Hepar',
    category: 'hepatobiliary',
    primaryNodeName: 'Liver',
    meshNodeNames: [
      'Liver',
      'Posterior segment of liver (I)',
      'Left posterior lateral segment of liver (II)',
      'Left anterior lateral segment of liver (III)',
      'Left medial segment of liver (IV)',
      'Anterior medial segment of liver (V)',
      'Anterior lateral segment of liver (VI)',
      'Posterior lateral segment of liver (VII)',
      'Posterior medial segment of liver (VIII)'
    ],
    canonicalCenter: [0.02, 0.3476, 0.04],
    approximateDimensions: 'Nặng 1.4 - 1.8 kg (tạng lớn nhất trong ổ bụng), rộng 25-28 cm, cao 15-20 cm',
    anatomicalQuadrant: 'Toàn bộ Hạ sườn phải (RUQ), Thượng vị và lấn một phần Hạ sườn trái (LUQ)',
    embryologicalOrigin: 'Nội bì ruột trước (Mầm gan phát triển vào mạc treo vị bụng / vách ngang)',
    overviewVi: 'Gan là cơ quan nội tạng lớn nhất và tuyến tiêu hóa lớn nhất của cơ thể con người. Gan nằm ngay dưới vòm hoành phải, được bảo vệ bởi lồng ngực. Gan được chia thành 8 phân thùy độc lập theo phân loại Couinaud dựa trên sự phân nhánh của bộ ba cửa (Tĩnh mạch cửa, Động mạch gan riêng, Ống mật) và tĩnh mạch gan.',
    overviewEn: 'The liver is the largest internal organ and metabolic gland in the human body, sheltered under the right hemidiaphragm. It is architecturally divided into eight functionally independent segments according to the Couinaud classification, each possessing its own portal triad pedicle and hepatic venous drainage.',
    subdivisions: [
      { id: 'seg1', nameVi: 'Phân thùy I (Thùy đuôi)', nameEn: 'Segment I (Caudate lobe)', nameLa: 'Lobus caudatus', nodeName: 'Posterior segment of liver (I)', descriptionVi: 'Nằm sau rốn gan, nhận máu từ cả hai nhánh ĐM gan và TM cửa, đổ thẳng vào Tĩnh mạch chủ dưới.', descriptionEn: 'Posterior autonomous segment draining directly into the inferior vena cava.' },
      { id: 'seg2', nameVi: 'Phân thùy II (Hạ phân thùy sau-bên trái)', nameEn: 'Segment II (Left posterosuperior lateral)', nameLa: 'Segmentum posterius laterale sinistrum', nodeName: 'Left posterior lateral segment of liver (II)', descriptionVi: 'Phần trên bên trái thùy gan trái, nằm sát cơ hoành.', descriptionEn: 'Superior lateral segment of left functional liver.' },
      { id: 'seg3', nameVi: 'Phân thùy III (Hạ phân thùy trước-bên trái)', nameEn: 'Segment III (Left anteroinferior lateral)', nameLa: 'Segmentum anterius laterale sinistrum', nodeName: 'Left anterior lateral segment of liver (III)', descriptionVi: 'Phần dưới bên trái thùy gan trái.', descriptionEn: 'Inferior lateral segment of left functional liver.' },
      { id: 'seg4', nameVi: 'Phân thùy IV (Thùy vuông & Thùy giữa trái)', nameEn: 'Segment IV (Left medial / Quadrate)', nameLa: 'Segmentum mediale sinistrum', nodeName: 'Left medial segment of liver (IV)', descriptionVi: 'Nằm giữa rãnh dây chằng tròn và giường túi mật; chia thành IVa (trên) và IVb (dưới).', descriptionEn: 'Medial left segment; sub-classified into IVa (superior) and IVb (inferior/quadrate).' },
      { id: 'seg5', nameVi: 'Phân thùy V (Trước-dưới phải)', nameEn: 'Segment V (Right anteroinferior)', nameLa: 'Segmentum anterius mediale dextrum', nodeName: 'Anterior medial segment of liver (V)', descriptionVi: 'Nằm ở bờ dưới thùy phải, kề sát túi mật.', descriptionEn: 'Inferior anterior segment of right functional liver.' },
      { id: 'seg6', nameVi: 'Phân thùy VI (Sau-dưới phải)', nameEn: 'Segment VI (Right posteroinferior)', nameLa: 'Segmentum anterius laterale dextrum', nodeName: 'Anterior lateral segment of liver (VI)', descriptionVi: 'Nằm ở góc dưới ngoài phía sau gan phải, liên quan thận phải.', descriptionEn: 'Posteroinferior segment of right functional liver resting on right kidney.' },
      { id: 'seg7', nameVi: 'Phân thùy VII (Sau-trên phải)', nameEn: 'Segment VII (Right posterosuperior)', nameLa: 'Segmentum posterius laterale dextrum', nodeName: 'Posterior lateral segment of liver (VII)', descriptionVi: 'Nằm ở phần sau trên gan phải, tiếp giáp vùng trần của gan.', descriptionEn: 'Posterosuperior segment of right functional liver near bare area.' },
      { id: 'seg8', nameVi: 'Phân thùy VIII (Trước-trên phải)', nameEn: 'Segment VIII (Right anterosuperior)', nameLa: 'Segmentum posterius mediale dextrum', nodeName: 'Posterior medial segment of liver (VIII)', descriptionVi: 'Nằm ở vòm hoành cao nhất của gan phải.', descriptionEn: 'Anterosuperior dome segment of right functional liver.' }
    ],
    bloodSupply: {
      arterialVi: 'Tuần hoàn kép đặc biệt: (1) Động mạch gan riêng (chiếm 20-25% lưu lượng, cung cấp 50% oxy); (2) Tĩnh mạch Cửa (chiếm 75-80% lưu lượng, mang dưỡng chất và độc chất từ ống tiêu hóa).',
      arterialEn: 'Dual vascular inflow: (1) Proper Hepatic Artery (20-25% flow, 50% oxygenation); (2) Portal Vein (75-80% flow, nutrient- and metabolite-rich).',
      venousVi: 'Ba tĩnh mạch gan lớn (phải, giữa, trái) thu gom máu từ các xoang gan đổ thẳng vào Tĩnh mạch Chủ Dưới (IVC).',
      venousEn: 'Three major hepatic veins (right, middle, left) drain liver sinusoids directly into Inferior Vena Cava (IVC).',
      lymphaticVi: 'Gan sản xuất tới 50% lượng bạch huyết cơ thể, dẫn lưu về hạch rốn gan, hạch thân tạng và hạch hoành.',
      lymphaticEn: 'Produces up to 50% of systemic lymph, draining to hepatic hilar, celiac, and phrenic nodes.'
    },
    innervation: {
      parasympatheticVi: 'Thần kinh lang thang (CN X) qua đám rối gan.',
      parasympatheticEn: 'Vagus nerve (CN X) via hepatic plexus.',
      sympatheticVi: 'Từ các đốt tủy T7-T10 qua đám rối thân tạng.',
      sympatheticEn: 'T7-T10 sympathetic outflow through celiac ganglion.',
      sensoryVi: 'Bao Glisson gan được chi phối cảm giác bởi thần kinh hoành phải (C3-C5), giải thích hiện tượng đau gan lan lên vai phải.',
      sensoryEn: 'Fibrous capsule of Glisson is innervated by right phrenic nerve (C3-C5), producing referred right shoulder pain.'
    },
    functionVi: ['Sản xuất và bài tiết dịch mật (600 - 1000 mL/ngày) tiêu hóa chất béo', 'Chuyển hóa glucose thành glycogen dự trữ và tân tạo đường', 'Tổng hợp hầu hết protein huyết tương (Albumin, các yếu tố đông máu I, II, V, VII, IX, X)', 'Khử độc thuốc, cồn và chuyển hóa amoniac (NH3) độc thành ure', 'Dự trữ vitamin (A, D, B12) và sắt dưới dạng ferritin'],
    functionEn: ['Bile synthesis and secretion (600-1000 mL/day) for lipid digestion', 'Carbohydrate homeostasis (glycogenesis, glycogenolysis, gluconeogenesis)', 'Synthesis of essential plasma proteins (albumin, coagulation factors I, II, V, VII, IX, X)', 'Biotransformation and detoxification of xenobiotics, drugs, and ammonia to urea', 'Storage of fat-soluble vitamins (A, D, K, B12) and iron as ferritin'],
    histologyVi: 'Tiểu thùy gan cổ điển hình lục lăng với tĩnh mạch trung tâm ở giữa và các khoảng cửa (portal triads) ở các góc. Khoảng cửa chứa nhánh ĐM gan, nhánh TM cửa và ống mật. Các bè tế bào gan (hepatocytes) xếp nan hoa xen kẽ các xoang mao mạch gan lót bởi tế bào nội mô có lỗ thủng và đại thực bào Kupffer.',
    histologyEn: 'Hexagonal classical hepatic lobules centered around central veins, bordered by portal triads (hepatic arteriole, portal venule, bile ductule). Radiating hepatocyte plates separated by fenestrated sinusoids containing resident macrophages (Kupffer cells) and stellate cells of Ito in the Space of Disse.',
    clinicalNotesVi: [
      'Xơ gan (Liver Cirrhosis) do viêm gan virus B/C hoặc nghiện rượu gây tăng áp lực tĩnh mạch cửa, báng bụng (cổ trướng) và hội chứng suy tế bào gan.',
      'Ung thư biểu mô tế bào gan (HCC) thường phát triển trên nền gan xơ. Phân chia 8 phân thùy Couinaud là cơ sở sống còn cho phẫu thuật cắt gan bảo tồn chức năng.',
      'Nghiệm pháp Murphy dương tính trong viêm túi mật cấp khi khám ấn sâu vào hạ sườn phải làm bệnh nhân ngưng thở vì đau.'
    ],
    clinicalNotesEn: [
      'Cirrhosis leads to portal hypertension, portocaval collateral development, ascites, and hepatic encephalopathy.',
      'Hepatocellular carcinoma (HCC): Couinaud anatomical segmentectomy is the gold-standard curative resection approach preserving functional hepatic reserve.',
      'Vascular control at porta hepatis during trauma via Pringle maneuver (clamping hepatoduodenal ligament) arrests hepatic inflow.'
    ],
    cameraPreset: {
      target: [0.02, 0.35, 0.04],
      position: [0.02, 0.38, 0.38]
    }
  },

  gallbladder: {
    id: 'gallbladder',
    nameVi: 'Túi Mật & Đường Dẫn Mật',
    nameEn: 'Gallbladder & Extrahepatic Bile Ducts',
    nameLa: 'Vesica biliaris et Ductus biliares',
    category: 'hepatobiliary',
    primaryNodeName: 'Gallbladder',
    meshNodeNames: ['Gallbladder', 'Bile duct'],
    canonicalCenter: [0.015, 0.3047, 0.06],
    approximateDimensions: 'Túi mật: dài 7-10 cm, rộng 3 cm, dung tích 30-50 mL; Ống mật chủ: dài 7.5 cm, đường kính 6 mm',
    anatomicalQuadrant: 'Mặt dưới thùy gan phải, giao điểm bờ sườn phải và bờ ngoài cơ thẳng bụng',
    embryologicalOrigin: 'Nội bì ruột trước - mầm túi mật từ cuống gan',
    overviewVi: 'Túi mật là một tạng rỗng hình quả lê nằm trong hố túi mật ở mặt tạng của gan. Túi mật có nhiệm vụ cô đặc và dự trữ mật do gan sản xuất. Khi thức ăn giàu chất béo vào tá tràng, hormone CCK kích thích túi mật co bóp tống mật qua ống túi mật vào ống mật chủ (Ductus choledochus) rồi đổ vào tá tràng qua bóng Vater.',
    overviewEn: 'The gallbladder is a pear-shaped intraperitoneal reservoir occupying the gallbladder fossa on the visceral surface of the liver. It concentrates and stores hepatic bile. Cholecystokinin (CCK) released by duodenal mucosa triggers gallbladder contraction, expelling bile down the common bile duct into the major duodenal papilla.',
    subdivisions: [
      { id: 'fundus', nameVi: 'Đáy túi mật', nameEn: 'Fundus of gallbladder', nameLa: 'Fundus vesicae biliaris', nodeName: 'Gallbladder', descriptionVi: 'Phần đầu tròn nhô ra khỏi bờ dưới gan, tiếp xúc thành bụng trước ở sụn sườn 9 phải.', descriptionEn: 'Rounded anterior projection extending beyond the inferior liver border at right 9th costal cartilage.' },
      { id: 'body', nameVi: 'Thân túi mật', nameEn: 'Body of gallbladder', nameLa: 'Corpus vesicae biliaris', nodeName: 'Gallbladder', descriptionVi: 'Nằm áp sát vào nhu mô gan trong hố túi mật.', descriptionEn: 'Main central portion resting in the gallbladder fossa.' },
      { id: 'neck', nameVi: 'Cổ túi mật & Túi Hartmann', nameEn: 'Neck & Hartmann pouch', nameLa: 'Collum vesicae biliaris', nodeName: 'Gallbladder', descriptionVi: 'Thắt hẹp, uốn cong hình chữ S, nơi dễ kẹt sỏi mật (túi Hartmann).', descriptionEn: 'Narrow tapered portion continuous with cystic duct; common site of calculus impaction.' },
      { id: 'bile_duct', nameVi: 'Ống mật chủ (Choledochus)', nameEn: 'Common bile duct', nameLa: 'Ductus choledochus', nodeName: 'Bile duct', descriptionVi: 'Được hình thành do sự hợp nhất giữa Ống gan chung và Ống túi mật, dài ~7.5 cm, đổ vào D2 tá tràng.', descriptionEn: 'Formed by union of common hepatic and cystic ducts, enters second part of duodenum at ampulla of Vater.' }
    ],
    bloodSupply: {
      arterialVi: 'Động mạch túi mật (Cystic artery), thường là nhánh của ĐM gan phải, nằm trong Tam giác gan-mật Calot.',
      arterialEn: 'Cystic artery, usually arising from the right hepatic artery within the hepatobiliary triangle of Calot.',
      venousVi: 'Tĩnh mạch túi mật đổ trực tiếp vào các xoang gan hoặc vào Tĩnh mạch Cửa.',
      venousEn: 'Cystic veins drain directly into liver sinusoids or the Portal Vein.',
      lymphaticVi: 'Đổ về hạch cổ túi mật (hạch Lund/Mascagni) rồi về hạch rốn gan.',
      lymphaticEn: 'Drains to cystic lymph node (Lund/Mascagni node) and hepatic hilar nodes.'
    },
    innervation: {
      parasympatheticVi: 'Thần kinh lang thang (CN X) kích thích co bóp túi mật và giãn cơ vòng Oddi.',
      parasympatheticEn: 'Vagus nerve (CN X), stimulating gallbladder contraction and relaxation of the sphincter of Oddi.',
      sympatheticVi: 'Từ hạch thân tạng (T7-T9) gây ức chế co bóp.',
      sympatheticEn: 'Celiac plexus (T7-T9) mediating relaxation.',
      sensoryVi: 'Dây thần kinh hoành phải (C3-C5) chi phối phúc mạc bao túi mật, giải thích đau lan lên bả vai phải (dấu Boas).',
      sensoryEn: 'Right phrenic nerve afferents explain referred pain to the right shoulder blade (Boas sign).'
    },
    functionVi: ['Dự trữ mật liên tục được gan tổng hợp', 'Cô đặc mật gấp 5 - 10 lần nhờ tái hấp thu nước và ion qua niêm mạc', 'Co bóp đồng thì với việc giãn cơ vòng Oddi khi có kích thích của cholecystokinin (CCK)', 'Bài xuất mật nhũ tương hóa lipid thức ăn'],
    functionEn: ['Storage of continuously synthesized hepatic bile', 'Concentration of bile 5-10 fold via active epithelial water and salt absorption', 'Coordinated CCK-mediated contraction and sphincter of Oddi relaxation', 'Regulated delivery of bile acids for micellar fat emulsification'],
    histologyVi: 'Biểu mô trụ đơn có nhiều vi nhung mao ngắn. Niêm mạc xếp thành nhiều nếp gấp phức tạp. Thành túi mật KHÔNG có tầng dưới niêm mạc (submucosa) và không có lớp cơ niêm, chỉ gồm lớp biểu mô, lớp cơ trơn đan chéo và lớp thanh mạc/dưới thanh mạc.',
    histologyEn: 'Lined by simple tall columnar epithelium with surface microvilli. Deeply folded mucosa. Unique histology: completely lacks a submucosa and muscularis mucosae; comprises mucosa, fibromuscular layer, and perimuscular adventitia/serosa.',
    clinicalNotesVi: [
      'Sỏi túi mật (Cholelithiasis) rất phổ biến (quy tắc 4F: Female, Forty, Fat, Fertile). Sỏi kẹt cổ túi mật gây cơn đau quặn mật và viêm túi mật cấp.',
      'Tam giác Calot (Hepatocystic Triangle of Calot) giới hạn bởi: Ống túi mật, Ống gan chung và Bờ dưới gan. Là mốc phẫu thuật bắt buộc nhận diện rõ ràng để tránh biến chứng cắt nhầm ống mật chủ trong mổ nội soi cắt túi mật.',
      'Sỏi ống mật chủ gây tắc nghẽn đường mật biểu hiện bằng tam chứng Charcot (Đau - Sốt - Vàng da) hoặc ngũ chứng Reynolds nguy cơ nhiễm trùng đường mật sốc nhiễm khuẩn.'
    ],
    clinicalNotesEn: [
      'Cholelithiasis classically adheres to the "4Fs" (Female, Fat, Fertile, Forty); impacted cystic duct calculi precipitate acute cholecystitis.',
      'Triangle of Calot (bounded by cystic duct, common hepatic duct, and inferior liver surface) is the anatomical key for safe cholecystectomy to prevent catastrophic bile duct injury.',
      'Choledocholithiasis manifests as Charcot triad (RUQ pain, jaundice, fever) or Reynolds pentad with septic shock.'
    ],
    cameraPreset: {
      target: [0.015, 0.30, 0.06],
      position: [0.08, 0.32, 0.22]
    }
  },

  pancreas: {
    id: 'pancreas',
    nameVi: 'Tụy',
    nameEn: 'Pancreas',
    nameLa: 'Pancreas',
    category: 'pancreas',
    primaryNodeName: 'Pancreas',
    meshNodeNames: ['Pancreas', 'Pancreatic duct', 'Accessory pancreatic duct'],
    canonicalCenter: [0.045, 0.2805, -0.01],
    approximateDimensions: 'Dài 12 - 15 cm, cao 3 - 4 cm, dày 1.5 - 2 cm, nặng 70 - 100 g',
    anatomicalQuadrant: 'Vùng Thượng vị & Hạ sườn trái (Nằm ngang sau phúc mạc thành sau)',
    embryologicalOrigin: 'Nội bì ruột trước (Nụ tụy bụng và Nụ tụy lưng xoay và hợp nhất)',
    overviewVi: 'Tụy là một tuyến hỗn hợp vừa ngoại tiết vừa nội tiết nằm vắt ngang thành bụng sau, sau dạ dày, kéo dài từ khung tá tràng bên phải sang đến rốn lách bên trái. Tụy ngoại tiết tiết các enzym tiêu hóa mạnh nhất đổ vào tá tràng; tụy nội tiết (tiểu đảo Langerhans) tiết insulin và glucagon điều hòa đường huyết sống còn.',
    overviewEn: 'The pancreas is an elongated, retroperitoneal dual exocrine and endocrine gland stretching horizontally across the posterior abdominal wall from the C-loop of the duodenum to the splenic hilum. Exocrine acini synthesize vital digestive proenzymes, while islets of Langerhans secrete insulin and glucagon.',
    subdivisions: [
      { id: 'head', nameVi: 'Đầu tụy & Mỏm móc', nameEn: 'Head & Uncinate process', nameLa: 'Caput pancreatis / Processus uncinatus', nodeName: 'Pancreas', descriptionVi: 'Đầu tụy dẹt nằm gọn trong lòng chữ C tá tràng. Mỏm móc là phần thò ra từ góc dưới trái, nằm sau bó mạch mạc treo tràng trên.', descriptionEn: 'Flattened head lodged in duodenal curve; uncinate process projects behind superior mesenteric vessels.' },
      { id: 'neck', nameVi: 'Cổ tụy', nameEn: 'Neck of pancreas', nameLa: 'Collum pancreatis', nodeName: 'Pancreas', descriptionVi: 'Đoạn thắt hẹp dài ~2 cm nằm ngay trước nơi hợp lưu giữa TM mạc treo tràng trên và TM lách để tạo nên Tĩnh mạch Cửa.', descriptionEn: 'Constricted 2 cm bridge lying directly anterior to the formation of the Portal Vein.' },
      { id: 'body', nameVi: 'Thân tụy', nameEn: 'Body of pancreas', nameLa: 'Corpus pancreatis', nodeName: 'Pancreas', descriptionVi: 'Hình lăng trụ tam giác chạy chếch lên trên sang trái trước cột sống và động mạch chủ bụng.', descriptionEn: 'Prismatic segment coursing superolaterally across aorta and left renal vessels.' },
      { id: 'tail', nameVi: 'Đuôi tụy', nameEn: 'Tail of pancreas', nameLa: 'Cauda pancreatis', nodeName: 'Pancreas', descriptionVi: 'Phần đầu mút di động duy nhất, nằm trong dây chằng lách-thận cùng với bó mạch lách tiếp cận rốn lách.', descriptionEn: 'Narrow mobile tip entering splenorenal ligament at the splenic hilum; rich in endocrine islets.' },
      { id: 'ducts', nameVi: 'Hệ thống ống tụy (Wirsung & Santorini)', nameEn: 'Pancreatic ducts (Wirsung & Santorini)', nameLa: 'Ductus pancreaticus major / accessorius', nodeName: 'Pancreatic duct', descriptionVi: 'Ống tụy chính (Wirsung) cùng ống mật chủ đổ vào bóng Vater (nhú tá lớn); ống tụy phụ (Santorini) đổ vào nhú tá bé.', descriptionEn: 'Main duct (Wirsung) unites with common bile duct at ampulla of Vater; accessory duct (Santorini) opens at minor papilla.' }
    ],
    bloodSupply: {
      arterialVi: 'Mạng lưới phong phú từ cả thân tạng và SMA: ĐM tá-tụy trên trước/sau (từ ĐM vị-tá tràng), ĐM tá-tụy dưới trước/sau (từ SMA), ĐM tụy lưng, ĐM tụy lớn và ĐM đuôi tụy (từ ĐM lách).',
      arterialEn: 'Rich anastomotic supply from Celiac and SMA: Superior pancreaticoduodenal arteries (gastroduodenal), Inferior pancreaticoduodenal arteries (SMA), Dorsal, Great, and Caudal pancreatic arteries (splenic artery).',
      venousVi: 'Đổ về Tĩnh mạch Lách, TM mạc treo tràng trên và trực tiếp vào Tĩnh mạch Cửa.',
      venousEn: 'Drains to Splenic Vein, Superior Mesenteric Vein, and directly into Portal Vein.',
      lymphaticVi: 'Đổ về các hạch tụy-lách, hạch thân tạng và hạch mạc treo tràng trên.',
      lymphaticEn: 'Pancreaticosplenic, celiac, and superior mesenteric lymph nodes.'
    },
    innervation: {
      parasympatheticVi: 'Thần kinh lang thang (CN X) kích thích bài tiết enzyme tiêu hóa và tiết insulin.',
      parasympatheticEn: 'Vagus nerve (CN X), stimulating exocrine acinar secretion and insulin release.',
      sympatheticVi: 'Từ các đốt tủy T6-T10 qua đám rối thân tạng và mạc treo tràng trên, ức chế bài tiết và co thắt mạch máu.',
      sympatheticEn: 'T6-T10 sympathetic fibers via celiac plexus, mediating vasoconstriction.',
      sensoryVi: 'Các sợi cảm giác đau tạng theo thần kinh giao cảm về tủy sống T6-T10, tạo cơn đau xuyên thấu ra sau lưng điển hình.',
      sensoryEn: 'Visceral afferents travel to T6-T10 levels, causing classic epigastric pain boring through to the back.'
    },
    functionVi: ['Chức năng ngoại tiết: Tiết 1 - 2 lít dịch tụy kiềm (giàu bicarbonate) trung hòa acid dạ dày', 'Tiết các men phân giải mạnh: Trypsinogen, Chymotrypsinogen, Amylase, Lipase tụy', 'Chức năng nội tiết: Tế bào Beta tiết Insulin hạ đường huyết', 'Tế bào Alpha tiết Glucagon nâng đường huyết, tế bào Delta tiết Somatostatin'],
    functionEn: ['Exocrine: daily secretion of 1-2 L alkaline bicarbonate-rich juice neutralizing gastric acid', 'Secretion of proteolytic zymogens (trypsinogen, chymotrypsinogen) and active amylase and lipase', 'Endocrine: Beta cells produce insulin (glycemic reduction)', 'Alpha cells produce glucagon; Delta cells produce somatostatin'],
    histologyVi: 'Tụy ngoại tiết là tuyến nang kiểu túi chùm (tubuloacinar) với các tế bào trung tâm nang (centroacinar cells) đặc trưng. Tụy nội tiết gồm các tiểu đảo Langerhans hình cầu nằm rải rác giữa các nang tụy ngoại tiết, tập trung mật độ cao nhất ở vùng đuôi tụy.',
    histologyEn: 'Exocrine component consists of serous acini with pathognomonic centroacinar cells lining the intercalated duct origin. Endocrine islets of Langerhans are round vascular clusters scattered throughout the parenchyma, heavily concentrated in the tail.',
    clinicalNotesVi: [
      'Viêm tụy cấp (Acute Pancreatitis) thường do sỏi kẹt bóng Vater hoặc nghiện rượu nặng, dẫn đến hiện tượng "tự tiêu" mô tụy bởi men tụy hoạt hóa sớm, biểu hiện đau thượng vị dữ dội xuyên ra sau lưng kèm amylase/lipase máu tăng vọt.',
      'Ung thư đầu tụy (Pancreatic adenocarcinoma) thường xâm lấn chèn ép ống mật chủ gây vàng da tắc mật không đau (Dấu Courvoisier: túi mật to căng không đau kèm vàng da tăng dần).',
      'Đái tháo đường typ 1 do phá hủy tự miễn tế bào Beta tiểu đảo Langerhans dẫn đến thiếu hụt insulin tuyệt đối.'
    ],
    clinicalNotesEn: [
      'Acute pancreatitis (predominantly gallstones or alcohol) involves premature intra-acinar zymogen autoactivation, severe epigastric pain radiating to back, and elevated lipase/amylase.',
      'Head of pancreas carcinoma classically causes painless obstructive jaundice with a palpable non-tender gallbladder (Courvoisier law).',
      'Type 1 diabetes mellitus stems from autoimmune destruction of islet beta cells.'
    ],
    cameraPreset: {
      target: [0.045, 0.28, -0.01],
      position: [0.045, 0.31, 0.26]
    }
  },

  peritoneum: {
    id: 'peritoneum',
    nameVi: 'Mạc Nối & Mạc Treo (Phúc Mạc)',
    nameEn: 'Omenta, Mesenteries & Peritoneum',
    nameLa: 'Peritoneum, Omenta et Mesenteria',
    category: 'peritoneum',
    primaryNodeName: 'Greater omentum',
    meshNodeNames: ['Greater omentum', 'Lesser omentum', 'Mesocolon', 'Meso-appendix'],
    canonicalCenter: [0.045, 0.20, 0.05],
    approximateDimensions: 'Diện tích bề mặt tương đương diện tích da cơ thể (~1.7 - 2.0 m²)',
    anatomicalQuadrant: 'Bao bọc toàn bộ các tạng trong khoang ổ bụng và chậu hông',
    embryologicalOrigin: 'Trung bì bên (Phúc mạc thành từ trung bì lá thành; Phúc mạc tạng từ trung bì lá tạng)',
    overviewVi: 'Phúc mạc là màng thanh mạc lớn nhất cơ thể, lót mặt trong thành bụng (phúc mạc thành) và bọc ngoài các cơ quan nội tạng (phúc mạc tạng). Giữa hai lá là một khoang ảo chứa lớp thanh dịch bôi trơn. Phúc mạc tạo nên các mạc nối (mạc nối lớn, mạc nối nhỏ) và các mạc treo mang mạch máu nuôi dưỡng ruột.',
    overviewEn: 'The peritoneum is the largest serous membrane of the body, lining the abdominopelvic cavity (parietal) and investing the viscera (visceral). It forms specialized functional reflections: the greater omentum ("policeman of the abdomen"), the lesser omentum, and vascular-transmitting mesenteries.',
    subdivisions: [
      { id: 'greater_omentum', nameVi: 'Mạc nối lớn ("Người cảnh sát ổ bụng")', nameEn: 'Greater omentum', nameLa: 'Omentum majus', nodeName: 'Greater omentum', descriptionVi: 'Tấm tạp dề mỡ 4 lớp buông từ bờ cong lớn dạ dày phủ lên ruột non, có khả năng di chuyển bao bọc ổ viêm.', descriptionEn: 'Four-layered fatty apron hanging from greater curvature, capable of walling off intra-abdominal infection.' },
      { id: 'lesser_omentum', nameVi: 'Mạc nối nhỏ', nameEn: 'Lesser omentum', nameLa: 'Omentum minus', nodeName: 'Lesser omentum', descriptionVi: 'Nối từ bờ cong nhỏ dạ dày và tá tràng đến gan; gồm dây chằng gan-vị và dây chằng gan-tá tràng chứa bộ ba cửa.', descriptionEn: 'Spans between lesser curvature/duodenum and liver; comprises hepatogastric and hepatoduodenal ligaments.' },
      { id: 'mesocolon', nameVi: 'Mạc treo đại tràng ngang & sigma', nameEn: 'Transverse & Sigmoid mesocolon', nameLa: 'Mesocolon transversum / sigmoideum', nodeName: 'Mesocolon', descriptionVi: 'Treo đại tràng ngang và đại tràng sigma vào thành bụng sau, chia ổ bụng thành tầng trên và tầng dưới mạc treo.', descriptionEn: 'Peritoneal folds suspending transverse and sigmoid colon, defining supramesocolic and inframesocolic compartments.' }
    ],
    bloodSupply: {
      arterialVi: 'Phúc mạc thành nhận máu từ mạch máu thành bụng tương ứng (ĐM hoành, ĐM liên sườn, ĐM thượng vị). Phúc mạc tạng nhận máu từ các động mạch nuôi tạng tương ứng.',
      arterialEn: 'Parietal peritoneum supplied by somatic abdominal wall arteries; visceral peritoneum supplied by visceral visceral vessels.',
      venousVi: 'Phúc mạc thành đổ về hệ tĩnh mạch chủ; phúc mạc tạng đổ về hệ Tĩnh mạch Cửa.',
      venousEn: 'Parietal drains to systemic venous system; visceral drains to Portal system.',
      lymphaticVi: 'Đổ về các chuỗi hạch thành bụng và hạch tạng; hấp thu dịch màng bụng mạnh nhất ở vòm hoành.',
      lymphaticEn: 'Extensive subperitoneal lymphatic network draining primarily toward subdiaphragmatic stomata.'
    },
    innervation: {
      parasympatheticVi: 'Không có chi phối cảm giác đối giao cảm trực tiếp.',
      parasympatheticEn: 'No direct parasympathetic sensory innervation.',
      sympatheticVi: 'Sợi thần kinh giao cảm vận mạch.',
      sympatheticEn: 'Vasomotor sympathetic fibers.',
      sensoryVi: 'Sự khác biệt sống còn: Phúc mạc thành rất nhạy cảm với đau, nhiệt, áp lực (qua các dây thần kinh gai sống ngực T7-L1); phúc mạc tạng chỉ nhạy cảm với căng giãn và thiếu máu cục bộ.',
      sensoryEn: 'Crucial distinction: Parietal peritoneum is acutely pain-sensitive (somatic T7-L1 nerves); visceral peritoneum is insensitive to touch/cut, only responding to ischemia and stretch.'
    },
    functionVi: ['Bôi trơn giảm ma sát cho các tạng tiêu hóa chuyển động nhu động tự do', 'Treo và cố định các cơ quan trong khi vẫn cho phép di động sinh lý', 'Dẫn truyền bó mạch máu, thần kinh và bạch huyết đến các quai ruột', 'Khu trú và chống lan tràn nhiễm trùng (đặc biệt nhờ mạc nối lớn bọc ổ áp xe)'],
    functionEn: ['Friction-free gliding of contracting viscera via serous fluid lubrication', 'Suspension of mobile viscera via organized mesenteries', 'Vascular, neural, and lymphatic conduits to the gut', 'Immune containment and infection isolation (greater omentum adherence)'],
    histologyVi: 'Gồm một lớp tế bào biểu mô vảy đơn (trung biểu mô - mesothelium) nằm trên một màng đáy mỏng và lớp đệm mô liên kết dưới thanh mạc giàu vi mạch, mạch bạch huyết và các tế bào mỡ.',
    histologyEn: 'Consists of a monolayer of flattened polyhedral mesothelial cells resting on a thin basal lamina and submesothelial loose fibroelastic connective tissue with rich microvascular beds and adipocytes.',
    clinicalNotesVi: [
      'Viêm phúc mạc toàn thể (Generalized Peritonitis) là tình trạng cấp cứu tối khẩn cấp do thủng tạng rỗng (dạ dày, ruột thừa), biểu hiện bụng co cứng như gỗ (board-like rigidity).',
      'Dính ruột sau mổ (Postoperative peritoneal adhesions) là nguyên nhân hàng đầu gây tắc ruột cơ học ở người có tiền sử phẫu thuật ổ bụng.',
      'Mạc nối nhỏ chứa dây chằng gan-tá tràng, nơi thực hiện nghiệm pháp Pringle (kẹp bó mạch cuống gan trong phẫu thuật chấn thương gan vỡ).'
    ],
    clinicalNotesEn: [
      'Generalized peritonitis from visceral perforation (ulcer, ruptured appendix) produces severe somatic pain and board-like abdominal rigidity.',
      'Peritoneal adhesions are the leading cause of small bowel obstruction following abdominal surgeries.',
      'Pringle maneuver compresses the hepatoduodenal ligament within the lesser omentum to control hepatic bleeding.'
    ],
    cameraPreset: {
      target: [0.045, 0.20, 0.05],
      position: [0.045, 0.24, 0.45]
    }
  }
};

export const DIGESTIVE_STRUCTURE_LIST = Object.values(DIGESTIVE_SYSTEM_DATA);
