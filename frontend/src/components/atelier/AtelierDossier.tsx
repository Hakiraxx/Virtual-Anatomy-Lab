import React, { useMemo } from 'react';
import {
  Heart,
  Stethoscope,
  Sparkles,
  Banknote,
  TriangleAlert,
  ArrowRight,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Share2,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { ATELIER_ORGANS } from '../../data/fullOrgansData';
import { DEEP_STRUCTURES_MAP, DeepStructure } from '../../data/deepStructures';

// Rich medical facts mapped by organ id
const SPECIMEN_DETAILS: Record<
  string,
  {
    subtitleVi: string;
    subtitleEn: string;
    descVi: string;
    descEn: string;
    sizeVi: string;
    sizeEn: string;
    weightVi: string;
    weightEn: string;
    dailyVi: string;
    dailyEn: string;
    locationVi: string;
    locationEn: string;
    bloodVi: string;
    bloodEn: string;
    functionVi: string;
    functionEn: string;
    medicalImportanceVi: string;
    medicalImportanceEn: string;
    didYouKnowVi: string;
    didYouKnowEn: string;
    transplantCost: string;
    illegalTrade: string;
  }
> = {
  heart: {
    subtitleVi: 'Máy bơm không bao giờ mệt mỏi',
    subtitleEn: 'The tireless pump',
    descVi: 'Cơ quan cơ rỗng co bóp nhịp nhàng để đẩy máu chứa oxy và dưỡng chất đi khắp các mô tế bào trong cơ thể.',
    descEn: 'A muscular organ that pumps blood throughout the body, delivering oxygen and nutrients to every cell.',
    sizeVi: 'Khoảng bằng kích thước một nắm tay',
    sizeEn: 'About the size of your fist',
    weightVi: '250 – 350 g',
    weightEn: '250 – 350 g',
    dailyVi: 'Đập khoảng 100.000 lần mỗi ngày',
    dailyEn: 'Beats about 100,000 times',
    locationVi: 'Sau xương ức, hơi chếch sang ngực trái',
    locationEn: 'Behind the sternum, slightly left',
    bloodVi: 'Động mạch vành trái và phải',
    bloodEn: 'Left and right coronary arteries',
    functionVi: 'Tuần hoàn máu nuôi dưỡng toàn thân',
    functionEn: 'Circulates oxygenated blood',
    medicalImportanceVi: 'Hệ dẫn truyền điện thế nội tại tự chủ phát xung điều hòa nhịp đập của tim.',
    medicalImportanceEn: 'Its electrical rhythm coordinates every heartbeat.',
    didYouKnowVi: 'Trái tim đập khoảng 2,5 tỷ lần trong suốt một đời người bình thường.',
    didYouKnowEn: 'It beats roughly 2.5 billion times in an average lifetime.',
    transplantCost: '$1,664,800',
    illegalTrade: '$90,000 to $290,000'
  },
  brain: {
    subtitleVi: 'Trung tâm điều khiển nhận thức',
    subtitleEn: 'The command center',
    descVi: 'Bộ não con người là cơ quan phức tạp nhất, chứa hơn 86 tỷ neuron chịu trách nhiệm về suy nghĩ, trí nhớ và cảm xúc.',
    descEn: 'The command center of the nervous system, enabling thought, memory, emotion, and bodily control.',
    sizeVi: 'Khoảng 1.400 cm³',
    sizeEn: 'Roughly 1,400 cm³',
    weightVi: '1.300 – 1.400 g',
    weightEn: '1,300 – 1,400 g',
    dailyVi: 'Tiêu thụ 20% tổng năng lượng toàn thân',
    dailyEn: 'Consumes 20% of resting body energy',
    locationVi: 'Nằm trong hộp sọ',
    locationEn: 'Enclosed within the cranial cavity',
    bloodVi: 'Vòng đa giác Willis (ĐM cảnh trong & ĐM đốt sống)',
    bloodEn: 'Circle of Willis (Internal carotid & vertebral)',
    functionVi: 'Xử lý nhận thức, vận động và cảm giác',
    functionEn: 'Cognition, sensory integration, and motor control',
    medicalImportanceVi: 'Tổn thương thiếu máu cục bộ trong 3-5 phút có thể gây hoại tử neuron vĩnh viễn.',
    medicalImportanceEn: 'Ischemic injury past 5 minutes leads to irreversible neuronal necrosis.',
    didYouKnowVi: 'Não chứa khoảng 86 tỷ neuron thần kinh với hàng ngàn tỷ khớp synapse liên kết.',
    didYouKnowEn: 'The brain contains 86 billion neurons connected by trillions of synapses.',
    transplantCost: 'Không khả thi (Non-transplantable)',
    illegalTrade: 'Không thể định giá (Priceless)'
  },
  skull: {
    subtitleVi: 'Khung xương bảo vệ hộp sọ và não bộ',
    subtitleEn: 'Cranial vault and facial skeleton',
    descVi: 'Gồm 22 xương liên kết chặt chẽ bảo vệ não bộ, tạo thành các hốc giác quan và cung hàm nhai.',
    descEn: '22 articulated bones forming the neurocranium and viscerocranium for brain and facial protection.',
    sizeVi: 'Thể tích hộp sọ khoảng 1.400 ml',
    sizeEn: 'Cranial capacity ~1,400 ml',
    weightVi: 'Khoảng 1.000 g (xương khô)',
    weightEn: '~1,000 g (dry bone)',
    dailyVi: 'Chịu lực va đập và bảo vệ thần kinh trung ương 24/7',
    dailyEn: 'Continuous structural protection',
    locationVi: 'Phần trên cùng của cột sống',
    locationEn: 'Mounted superiorly on vertebral column',
    bloodVi: 'ĐM màng não giữa, ĐM hàm, ĐM mặt',
    bloodEn: 'Middle meningeal, maxillary, facial arteries',
    functionVi: 'Bảo vệ não bộ và các giác quan cao cấp',
    functionEn: 'Brain and sensory organ protection',
    medicalImportanceVi: 'Vỡ xương thái dương có thể làm đứt ĐM màng não giữa gây tụ máu ngoài màng cứng cấp tính.',
    medicalImportanceEn: 'Temporal bone fracture risks middle meningeal artery laceration and epidural hematoma.',
    didYouKnowVi: 'Các đường khớp sọ ở trẻ sơ sinh chưa đóng kín hoàn toàn, tạo nên các thóp mềm.',
    didYouKnowEn: 'Infant skulls feature flexible membranous fontanelles allowing vaginal birth.',
    transplantCost: 'Tái tạo sọ nhân tạo',
    illegalTrade: 'Không áp dụng'
  },
  spine: {
    subtitleVi: 'Trục nâng đỡ và bảo vệ tủy sống',
    subtitleEn: 'The central axial pillar',
    descVi: 'Trục xương sống gồm 33 đốt sống uốn cong hình chữ S sinh lý, vừa chịu tải trọng vừa bảo vệ tủy gai.',
    descEn: 'Flexible column of 33 vertebrae with physiologic curves bearing axial load and shielding spinal cord.',
    sizeVi: 'Dài khoảng 70 cm ở nam, 60 cm ở nữ',
    sizeEn: '~70 cm in males, 60 cm in females',
    weightVi: 'Khoảng 1.500 g',
    weightEn: '~1,500 g',
    dailyVi: 'Chịu hàng ngàn chu kỳ uốn cong, xoay và chịu tải',
    dailyEn: 'Thousands of flexion and compression cycles daily',
    locationVi: 'Trục dọc giữa lưng từ nền sọ tới xương cụt',
    locationEn: 'Midline dorsal axis from skull base to coccyx',
    bloodVi: 'ĐM tủy gai trước và sau, ĐM gian sườn',
    bloodEn: 'Anterior and posterior spinal arteries',
    functionVi: 'Trụ cột nâng đỡ thân mình và bảo vệ tủy',
    functionEn: 'Axial structural support and spinal cord protection',
    medicalImportanceVi: 'Chấn thương gãy trật cột sống có nguy cơ liệt tứ chi hoặc liệt 2 chi dưới vĩnh viễn.',
    medicalImportanceEn: 'Fracture-dislocation risks complete irreversible spinal cord transection.',
    didYouKnowVi: 'Chiều cao con người vào buổi tối thường thấp hơn 1-2 cm so với buổi sáng do đĩa đệm bị nén ép.',
    didYouKnowEn: 'You are roughly 1 cm shorter in the evening due to gravitational disc compression.',
    transplantCost: 'Phẫu thuật nẹp vít cột sống',
    illegalTrade: 'Không áp dụng'
  }
};

export const AtelierDossier: React.FC = () => {
  const activeSpecimenId = useAnatomyStore((s) => s.activeSpecimenId);
  const activeStructureId = useAnatomyStore((s) => s.activeStructureId);
  const focusOnStructure = useAnatomyStore((s) => s.focusOnStructure);
  const backToPreviousFocus = useAnatomyStore((s) => s.backToPreviousFocus);
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const setActiveHotspot = useAnatomyStore((s) => s.setActiveHotspot);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);

  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  const specimen = useMemo(() => {
    return (
      ATELIER_ORGANS.find((o) => o.id === activeSpecimenId) ||
      ATELIER_ORGANS[0]
    );
  }, [activeSpecimenId]);

  // Deep hierarchy structure for current organ
  const deepHierarchy = DEEP_STRUCTURES_MAP[specimen.id];

  // Active sub-structure (if focused on a sub-part)
  const activeStructure = useMemo(() => {
    if (!deepHierarchy || !activeStructureId) return null;
    return deepHierarchy.structures.find((s) => s.id === activeStructureId) || null;
  }, [deepHierarchy, activeStructureId]);

  const detail = SPECIMEN_DETAILS[specimen.id] || {
    subtitleVi: `Tiêu bản giải phẫu ${specimen.nameVi}`,
    subtitleEn: `Anatomical specimen of ${specimen.nameEn}`,
    descVi: `Cơ quan quan trọng thuộc ${specimen.systemNameVi}, giữ vai trò thiết yếu trong việc duy trì chức năng sống và cân bằng nội môi.`,
    descEn: `A vital organ of the ${specimen.systemNameEn}, playing an essential role in homeostasis and physiology.`,
    sizeVi: 'Tương ứng giải phẫu chuẩn',
    sizeEn: 'Proportional to adult anatomy',
    weightVi: 'Biến thiên theo thể trạng',
    weightEn: 'Varies with adult morphology',
    dailyVi: 'Hoạt động liên tục 24/7',
    dailyEn: 'Continuous 24/7 physiological activity',
    locationVi: 'Định vị chính xác trong khoang cơ thể',
    locationEn: 'Precisely positioned in anatomical space',
    bloodVi: 'Hệ mạch nuôi dưỡng chuyên biệt',
    bloodEn: 'Dedicated regional vascular supply',
    functionVi: 'Chức năng giải phẫu và sinh lý học',
    functionEn: 'Anatomical and physiological maintenance',
    medicalImportanceVi: 'Có ý nghĩa lâm sàng đặc biệt trong chẩn đoán và điều trị bệnh học.',
    medicalImportanceEn: 'High clinical relevance in diagnostic and therapeutic medicine.',
    didYouKnowVi: 'Cấu trúc giải phẫu được hoàn thiện qua hàng triệu năm tiến hóa của con người.',
    didYouKnowEn: 'Highly refined anatomical architecture evolved over millions of years.',
    transplantCost: '$500,000 – $1,200,000',
    illegalTrade: '$50,000 to $150,000'
  };

  const isInfoOpen = useAnatomyStore((s) => s.isInfoOpen);
  const setIsInfoOpen = useAnatomyStore((s) => s.setIsInfoOpen);

  const organName = isVi ? specimen.nameVi : specimen.nameEn;
  const sysName = isVi ? specimen.systemNameVi : specimen.systemNameEn;

  const panelWrapperClass = `
    fixed xl:relative z-50
    inset-x-0 bottom-0 max-h-[82vh] rounded-t-3xl border-t
    md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-full md:rounded-none md:border-t-0 md:border-l md:w-80 lg:w-96
    xl:inset-auto xl:h-full
    flex flex-col overflow-y-auto select-none transition-transform duration-300
    ${isInfoOpen ? 'translate-y-0 md:translate-x-0 shadow-2xl' : 'translate-y-full md:translate-x-full xl:translate-y-0 xl:translate-x-0 hidden xl:flex'}
    ${isDark ? 'bg-[#0f141c]/95 border-slate-800 text-slate-100 backdrop-blur-xl' : 'bg-[#f7f0e7]/95 border-[#e7ded3] text-[#28231d] backdrop-blur-xl'}
  `;

  return (
    <>
      {/* Mobile / Tablet Backdrop Overlay */}
      {isInfoOpen && (
        <div
          onClick={() => setIsInfoOpen(false)}
          className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-fade-in"
        />
      )}

      <aside className={panelWrapperClass}>
        {/* iOS Bottom Sheet Drag Handle */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto my-2 md:hidden" />

        <div className="p-5 space-y-5">
          {/* CASE A: FOCUSED ON A SPECIFIC SUB-STRUCTURE */}
          {activeStructure ? (
            <div className="space-y-4 animate-fade-in">
              {/* Back to Organ Button & Close button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={backToPreviousFocus}
                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-500 transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isVi ? `Quay lại ${organName}` : `Back to ${organName}`}</span>
                </button>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="xl:hidden p-1 rounded-full text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  title="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            {/* Sub-structure Header */}
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {organName} · {isVi ? 'Cấu trúc chi tiết' : 'Sub-structure'}
              </div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-current mt-0.5">
                {isVi ? activeStructure.nameVi : activeStructure.nameEn}
              </h1>
              <div className="text-xs font-serif italic text-amber-600 dark:text-amber-400 mt-0.5">
                {activeStructure.nameLatin}
              </div>
            </div>

            {/* Structure Function */}
            <div className="p-3 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                <span>◈</span>
                <span>{isVi ? 'Chức năng giải phẫu' : 'Anatomical Function'}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {isVi ? activeStructure.functionVi : activeStructure.functionEn}
              </p>
            </div>

            {/* Clinical Notes */}
            <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/20 text-xs">
              <div className="font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{isVi ? 'Ý nghĩa lâm sàng' : 'Clinical Relevance'}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {isVi ? activeStructure.clinicalNotesVi : activeStructure.clinicalNotesEn}
              </p>
            </div>

            {/* Related Structures (Requirement #21) */}
            {activeStructure.relatedStructureIds && activeStructure.relatedStructureIds.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                  {isVi ? 'Cấu trúc liên quan' : 'Related Structures'}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeStructure.relatedStructureIds.map((relId) => {
                    const relStruct = deepHierarchy?.structures.find((s) => s.id === relId);
                    if (!relStruct) return null;
                    const relName = isVi ? relStruct.nameVi : relStruct.nameEn;

                    return (
                      <button
                        key={relId}
                        onClick={() =>
                          focusOnStructure(
                            relStruct.id,
                            relStruct.nameVi,
                            relStruct.nameEn,
                            relStruct.localOffset
                          )
                        }
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 text-amber-700 dark:text-amber-300 transition cursor-pointer"
                      >
                        <span>→ {relName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CASE B: OVERVIEW OF WHOLE SPECIMEN */
          <div className="space-y-5 animate-fade-in">
            {/* Kicker & Title Header */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <Heart className="w-3 h-3 text-[#c05a4e]" />
                  <span>{sysName}</span>
                </div>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="xl:hidden p-1 rounded-full text-slate-400 hover:text-current hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  title="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-1 flex items-start justify-between gap-3">
                <div>
                  <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-current">
                    {organName}
                  </h1>
                  <div className="text-xs font-serif italic text-amber-700 dark:text-amber-400 mt-0.5">
                    {isVi ? detail.subtitleVi : detail.subtitleEn}
                  </div>
                </div>

                {/* Specimen Stamp Thumbnail */}
                <div className="w-14 h-14 rounded-xl border p-1 shadow-sm flex-shrink-0 bg-white dark:bg-slate-800 border-[#e7ded3] dark:border-slate-700">
                  <img
                    src={specimen.thumbnail}
                    alt={organName}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                </div>
              </div>

              <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {isVi ? detail.descVi : detail.descEn}
              </p>
            </div>

            {/* DEEP STRUCTURE DRILLDOWN LIST (Requirement #7) */}
            {deepHierarchy && deepHierarchy.structures.length > 0 && (
              <div className="p-3 rounded-2xl border bg-white/50 dark:bg-slate-900/50 border-[#e7ded3] dark:border-slate-800">
                <div className="flex items-center justify-between font-serif font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isVi ? 'Cấu trúc chi tiết (Click để Focus)' : 'Detailed Structures'}</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {deepHierarchy.structures.length}
                  </span>
                </div>

                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {deepHierarchy.structures.map((st) => (
                    <button
                      key={st.id}
                      onClick={() =>
                        focusOnStructure(st.id, st.nameVi, st.nameEn, st.localOffset)
                      }
                      className="w-full flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-amber-500/50 hover:bg-amber-500/5 text-left text-xs transition cursor-pointer group"
                    >
                      <div className="truncate pr-2">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 transition truncate">
                          {isVi ? st.nameVi : st.nameEn}
                        </div>
                        <div className="text-[10px] font-serif italic text-slate-400 truncate">
                          {st.nameLatin}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 transition flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-[#e7ded3] dark:bg-slate-800" />

            {/* Key Facts Table */}
            <div>
              <h2 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                {isVi ? 'Thông số chính' : 'Key facts'}
              </h2>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-[#e7ded3]/70 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span>◇</span>
                    <span>{isVi ? 'Kích thước' : 'Size'}</span>
                  </div>
                  <div className="font-semibold mt-0.5 text-slate-800 dark:text-slate-200 text-[11px]">
                    {isVi ? detail.sizeVi : detail.sizeEn}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-[#e7ded3]/70 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span>♙</span>
                    <span>{isVi ? 'Khối lượng' : 'Weight'}</span>
                  </div>
                  <div className="font-semibold mt-0.5 text-slate-800 dark:text-slate-200 text-[11px]">
                    {isVi ? detail.weightVi : detail.weightEn}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-[#e7ded3]/70 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span>⌁</span>
                    <span>{isVi ? 'Tần suất ngày' : 'Daily'}</span>
                  </div>
                  <div className="font-semibold mt-0.5 text-slate-800 dark:text-slate-200 text-[11px]">
                    {isVi ? detail.dailyVi : detail.dailyEn}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-[#e7ded3]/70 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span>⌖</span>
                    <span>{isVi ? 'Vị trí' : 'Location'}</span>
                  </div>
                  <div className="font-semibold mt-0.5 text-slate-800 dark:text-slate-200 text-[11px] truncate">
                    {isVi ? detail.locationVi : detail.locationEn}
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Note Card */}
            <div className="p-3 rounded-xl border bg-amber-500/5 dark:bg-amber-500/10 border-amber-600/20 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 mb-1">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{isVi ? 'Ý nghĩa lâm sàng' : 'Medical importance'}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {isVi ? detail.medicalImportanceVi : detail.medicalImportanceEn}
              </p>
            </div>

            {/* Did You Know Pearl */}
            <div className="p-3 rounded-xl border bg-white/70 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#c05a4e] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isVi ? 'Bạn có biết?' : 'Did you know?'}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {isVi ? detail.didYouKnowVi : detail.didYouKnowEn}
              </p>
            </div>

            {/* Value and Cost Section */}
            <div className="p-3 rounded-xl border bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-serif font-bold text-slate-700 dark:text-slate-200">
                  <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isVi ? 'Chi phí ghép tạng (Mỹ)' : 'Transplant episode'}</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {detail.transplantCost}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg">
                <div className="flex items-center gap-1">
                  <TriangleAlert className="w-3 h-3" />
                  <span>{isVi ? 'Cảnh báo buôn bán bất hợp pháp' : 'Illegal trade alert'}</span>
                </div>
                <span className="font-mono font-bold">{detail.illegalTrade}</span>
              </div>
            </div>

            {/* Clinical Conditions with ICD-10 Codes */}
            {specimen.conditions && specimen.conditions.length > 0 && (
              <div>
                <h2 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  {isVi ? 'Bệnh lý & Mã ICD-10' : 'Clinical notes & ICD-10'}
                </h2>

                <div className="space-y-1.5">
                  {specimen.conditions.map((cond, i) => {
                    const condName = isVi ? cond.nameVi : cond.nameEn;
                    return (
                      <button
                        key={`${cond.icd10}-${i}`}
                        onClick={() => {
                          if (cond.structure) {
                            setActiveHotspot(cond.structure);
                          }
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl border text-left text-xs transition hover:border-amber-500 bg-white/60 dark:bg-slate-900/60 border-[#e7ded3] dark:border-slate-800 cursor-pointer"
                      >
                        <div className="truncate pr-2">
                          <div className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                            {condName}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {cond.structure || (isVi ? 'Lan tỏa (Diffuse)' : 'Diffuse')}
                          </div>
                        </div>
                        <code className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold">
                          {cond.icd10}
                        </code>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Action Grid Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveModal('lessons')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-medium text-xs border border-amber-600 bg-amber-600 text-white shadow-sm hover:bg-amber-700 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isVi ? 'Bài học' : 'Lesson'}</span>
          </button>

          <button
            onClick={() => setActiveModal('quiz')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-medium text-xs border border-[#e7ded3] dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-600 transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{isVi ? 'Kiểm tra' : 'Quiz'}</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
};
