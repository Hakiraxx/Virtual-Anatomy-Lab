import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Bookmark,
  FileEdit,
  GraduationCap,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  ExternalLink,
  Save,
  Search,
  FolderPlus
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useDentalNeuroStore } from '../../stores/useDentalNeuroStore';
import { getAnatomyEntry, resolveCanonicalId, resolveLegacyId } from '../../data/AnatomyAssetRegistry';

export type StudyModeTier = 'basic' | 'intermediate' | 'advanced';

export interface UserBookmark {
  id: string;
  collection: string;
  anatomyId: string;
  nameVi: string;
  nameEn: string;
  createdAt: string;
}

export interface UserAnatomyNote {
  id: string;
  anatomyId: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface StudyPathStep {
  anatomyId: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
}

export interface StudyCurriculum {
  id: string;
  titleVi: string;
  titleEn: string;
  category: string;
  steps: StudyPathStep[];
}

export const STUDY_CURRICULA: StudyCurriculum[] = [
  {
    id: 'trigeminal_mastery',
    titleVi: 'Hệ Thống Thần Kinh Sinh Ba (CN V & Nhánh Hàm)',
    titleEn: 'Trigeminal Nerve Comprehensive Curriculum',
    category: 'Thần Kinh Sọ',
    steps: [
      {
        anatomyId: 'nerve_cn_v',
        titleVi: 'Dây V & Hạch Sinh Ba (Gasser)',
        titleEn: 'Trigeminal Nerve Trunk & Ganglion',
        descriptionVi: 'Gốc xuất phát từ cầu não và sự phân chia ba nhánh V1, V2, V3.'
      },
      {
        anatomyId: 'nerve_v3',
        titleVi: 'Thần Kinh Hàm Dưới (V3)',
        titleEn: 'Mandibular Nerve (V3)',
        descriptionVi: 'Đường thoát qua lỗ bầu dục vào hố dưới thái dương.'
      },
      {
        anatomyId: 'mandibular_foramen',
        titleVi: 'Lỗ Hàm Dưới & Gai Spix',
        titleEn: 'Mandibular Foramen & Lingula',
        descriptionVi: 'Cửa ngõ vào ống hàm dưới và mốc gây tê Spix.'
      },
      {
        anatomyId: 'nerve_ian',
        titleVi: 'Thần Kinh Răng Dưới (IAN)',
        titleEn: 'Inferior Alveolar Nerve',
        descriptionVi: 'Đường đi trong xương hàm dưới và chi phối các răng.'
      },
      {
        anatomyId: 'mental_foramen',
        titleVi: 'Lỗ Cằm & Thần Kinh Cằm',
        titleEn: 'Mental Foramen & Mental Nerve',
        descriptionVi: 'Nhánh tận cùng chi phối cảm giác cằm và môi dưới.'
      }
    ]
  },
  {
    id: 'wisdom_surgery_prep',
    titleVi: 'Giải Phẫu Phẫu Thuật Răng Khôn & Ống Hàm Dưới',
    titleEn: 'Third Molar Surgical Anatomy & IAN Risk',
    category: 'RHM Tiểu Phẫu',
    steps: [
      {
        anatomyId: 'tooth_48',
        titleVi: 'Răng Khôn Hàm Dưới Phải (R.48)',
        titleEn: 'Mandibular Right Third Molar (R.48)',
        descriptionVi: 'Hình thái học núm, rãnh, phân chia thân - chân răng.'
      },
      {
        anatomyId: 'bone_mandible',
        titleVi: 'Xương Hàm Dưới & Xương Ổ Răng',
        titleEn: 'Mandible & Alveolar Process',
        descriptionVi: 'Bản xương vỏ ngoài và mặt trong cành cao.'
      },
      {
        anatomyId: 'mandibular_canal',
        titleVi: 'Ống Hàm Dưới (Mandibular Canal)',
        titleEn: 'Mandibular Canal',
        descriptionVi: 'Mối tương quan không gian với chóp chân răng 48.'
      },
      {
        anatomyId: 'nerve_lingual',
        titleVi: 'Thần Kinh Lưỡi (Lingual Nerve)',
        titleEn: 'Lingual Nerve',
        descriptionVi: 'Đường đi sát màng xương mặt trong góc hàm.'
      }
    ]
  },
  {
    id: 'tmj_biomechanics',
    titleVi: 'Động Học Khớp Thái Dương Hàm & 4 Cơ Nhai',
    titleEn: 'TMJ Dynamics & Muscles of Mastication',
    category: 'Khớp TDH & Khớp Cắn',
    steps: [
      {
        anatomyId: 'joint_tmj',
        titleVi: 'Phức Hợp Khớp TDH & Đĩa Khớp',
        titleEn: 'TMJ Complex & Articular Disc',
        descriptionVi: 'Cấu tạo bao khớp, đĩa sụn sợi và lồi cầu.'
      },
      {
        anatomyId: 'muscle_masseter',
        titleVi: 'Cơ Cắn (Masseter)',
        titleEn: 'Masseter Muscle',
        descriptionVi: 'Cơ nâng hàm chính tạo lực nhai mạnh nhất.'
      },
      {
        anatomyId: 'muscle_temporalis',
        titleVi: 'Cơ Thái Dương (Temporalis)',
        titleEn: 'Temporalis Muscle',
        descriptionVi: 'Nâng và kéo lùi xương hàm dưới ra sau.'
      },
      {
        anatomyId: 'muscle_lateral_pterygoid',
        titleVi: 'Cơ Chân Bướm Ngoài',
        titleEn: 'Lateral Pterygoid Muscle',
        descriptionVi: 'Khởi động động tác há miệng và đưa hàm sang bên.'
      },
      {
        anatomyId: 'muscle_medial_pterygoid',
        titleVi: 'Cơ Chân Bướm Trong',
        titleEn: 'Medial Pterygoid Muscle',
        descriptionVi: 'Cùng cơ cắn tạo thành đai cơ nâng hàm.'
      }
    ]
  }
];

export const AnatomyStudyManager: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'bookmarks' | 'notes' | 'mode'>('curriculum');
  const [studyMode, setStudyMode] = useState<StudyModeTier>(() => {
    return (localStorage.getItem('medanatomy_study_mode_tier') as StudyModeTier) || 'intermediate';
  });

  const [bookmarks, setBookmarks] = useState<UserBookmark[]>(() => {
    try {
      const saved = localStorage.getItem('medanatomy_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<UserAnatomyNote[]>(() => {
    try {
      const saved = localStorage.getItem('medanatomy_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>('trigeminal_mastery');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const selectedAnatomyId = useDentalNeuroStore((s) => s.selectedAnatomyId);
  const selectAnatomy = useDentalNeuroStore((s) => s.selectAnatomy);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const isDark = atelierTheme === 'dark';

  // Persist study mode
  const handleSetStudyMode = (mode: StudyModeTier) => {
    setStudyMode(mode);
    localStorage.setItem('medanatomy_study_mode_tier', mode);
  };

  // Add current structure to bookmarks
  const handleAddBookmark = () => {
    if (!selectedAnatomyId) return;
    const entry = getAnatomyEntry(selectedAnatomyId);
    const nameVi = entry?.nameVi || selectedAnatomyId;
    const nameEn = entry?.nameEn || selectedAnatomyId;

    const newBookmark: UserBookmark = {
      id: `bm_${Date.now()}`,
      collection: 'Mặc định',
      anatomyId: selectedAnatomyId,
      nameVi,
      nameEn,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    const updated = [newBookmark, ...bookmarks.filter((b) => b.anatomyId !== selectedAnatomyId)];
    setBookmarks(updated);
    localStorage.setItem('medanatomy_bookmarks', JSON.stringify(updated));
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('medanatomy_bookmarks', JSON.stringify(updated));
  };

  // Save or update note
  const handleSaveNote = () => {
    if (!noteTitle.trim() && !noteContent.trim()) return;

    if (activeNoteId) {
      const updated = notes.map((n) =>
        n.id === activeNoteId
          ? { ...n, title: noteTitle, content: noteContent, updatedAt: new Date().toLocaleString('vi-VN') }
          : n
      );
      setNotes(updated);
      localStorage.setItem('medanatomy_notes', JSON.stringify(updated));
    } else {
      const newNote: UserAnatomyNote = {
        id: `note_${Date.now()}`,
        anatomyId: selectedAnatomyId || 'general',
        title: noteTitle || `Ghi chú ${selectedAnatomyId}`,
        content: noteContent,
        updatedAt: new Date().toLocaleString('vi-VN')
      };
      const updated = [newNote, ...notes];
      setNotes(updated);
      setActiveNoteId(newNote.id);
      localStorage.setItem('medanatomy_notes', JSON.stringify(updated));
    }
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem('medanatomy_notes', JSON.stringify(updated));
    if (activeNoteId === id) {
      setActiveNoteId(null);
      setNoteTitle('');
      setNoteContent('');
    }
  };

  if (!isOpen) return null;

  const currentCurriculum =
    STUDY_CURRICULA.find((c) => c.id === selectedCurriculumId) || STUDY_CURRICULA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in select-none">
      <div
        className={`w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl border overflow-hidden ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-[#faf6f0] border-[#dfd4c4] text-[#28231d]'
        }`}
      >
        {/* Header with Tabs */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-inherit bg-black/5 dark:bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-serif text-sm font-bold uppercase tracking-tight">
              Trung Tâm Học Tập & Nghiên Cứu (Study Manager)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-current hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-inherit px-5 gap-1 overflow-x-auto">
          {[
            { id: 'curriculum', label: 'Lộ Trình Học', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'bookmarks', label: `Dấu Trang (${bookmarks.length})`, icon: <Bookmark className="w-3.5 h-3.5" /> },
            { id: 'notes', label: `Ghi Chú (${notes.length})`, icon: <FileEdit className="w-3.5 h-3.5" /> },
            { id: 'mode', label: 'Cấp Độ Học', icon: <GraduationCap className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-slate-400 hover:text-current'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Curriculum / Study Paths */}
        {activeTab === 'curriculum' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Chọn Giáo Trình:</span>
              <select
                value={selectedCurriculumId}
                onChange={(e) => setSelectedCurriculumId(e.target.value)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none flex-1 truncate ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-[#dfd4c4] text-slate-800'
                }`}
              >
                {STUDY_CURRICULA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.titleVi}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              {currentCurriculum.steps.map((step, idx) => (
                <div
                  key={step.anatomyId}
                  onClick={() => {
                    selectAnatomy(step.anatomyId);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition cursor-pointer ${
                    isDark ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800' : 'bg-white border-[#e6ded2] hover:bg-[#ede4d6]'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-current truncate">{step.titleVi}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-serif italic truncate">
                        {step.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                        {step.descriptionVi}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Bookmarks */}
        {activeTab === 'bookmarks' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-inherit">
              <span className="text-xs text-slate-500">
                Đang chọn: <strong>{selectedAnatomyId}</strong>
              </span>
              <button
                onClick={handleAddBookmark}
                className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-amber-500 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Lưu Cấu Trúc Này</span>
              </button>
            </div>

            {bookmarks.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Chưa có cấu trúc nào được lưu. Nhấn "Lưu Cấu Trúc Này" để tạo bộ ôn tập.
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarks.map((b) => (
                  <div
                    key={b.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                      isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-[#e6ded2]'
                    }`}
                  >
                    <div
                      onClick={() => {
                        selectAnatomy(b.anatomyId);
                        onClose();
                      }}
                      className="cursor-pointer min-w-0 flex-1 pr-2"
                    >
                      <div className="font-semibold text-xs truncate">{b.nameVi}</div>
                      <div className="text-[10px] text-slate-500 font-serif italic truncate">{b.nameEn}</div>
                      <div className="text-[9px] font-mono text-slate-400 mt-0.5">Lưu ngày: {b.createdAt}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(b.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                      title="Xóa dấu trang"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === 'notes' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1 flex flex-col">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Tiêu đề ghi chú y khoa..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className={`w-full text-xs px-3 py-2 rounded-xl border font-semibold focus:outline-none ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-[#dfd4c4]'
                }`}
              />
              <textarea
                rows={4}
                placeholder="Nội dung ghi chú, dấu hiệu lâm sàng, lưu ý phẫu thuật liên quan đến cấu trúc..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className={`w-full text-xs p-3 rounded-xl border leading-relaxed focus:outline-none resize-none ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-[#dfd4c4]'
                }`}
              />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-mono">
                  Gắn với: {selectedAnatomyId}
                </span>
                <button
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-amber-500 transition cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Ghi Chú</span>
                </button>
              </div>
            </div>

            {/* Saved Notes List */}
            <div className="pt-3 border-t border-inherit space-y-2 flex-1 overflow-y-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Danh Sách Ghi Chú Đã Lưu</span>
              {notes.map((n) => (
                <div
                  key={n.id}
                  className={`p-2.5 rounded-xl border text-xs leading-relaxed transition ${
                    isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-[#e6ded2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-600 dark:text-amber-400">{n.title}</span>
                    <button
                      onClick={() => handleDeleteNote(n.id)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] whitespace-pre-wrap">{n.content}</p>
                  <div className="text-[9px] font-mono text-slate-400 mt-1">Cập nhật: {n.updatedAt}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Study Mode Tier */}
        {activeTab === 'mode' && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            <div className="text-xs text-slate-500 leading-relaxed">
              Chọn mức độ chi tiết giải phẫu học hiển thị trên bảng hồ sơ và mô hình 3D:
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'basic',
                  labelVi: 'Cơ Bản (Basic)',
                  descVi: 'Tên cấu trúc tiếng Việt, tiếng Anh, vị trí giải phẫu tổng quát và chức năng sinh lý chính.'
                },
                {
                  id: 'intermediate',
                  labelVi: 'Trung Cấp (Intermediate)',
                  descVi: 'Bổ sung các lỗ nền sọ, nguyên ủy bám tận cơ, nhánh tận cùng thần kinh và mạch máu đồng hành.'
                },
                {
                  id: 'advanced',
                  labelVi: 'Chuyên Sâu (Advanced)',
                  descVi: 'Chi tiết mối tương quan không gian, biến thể giải phẫu, nguy cơ phẫu thuật, gây tê vùng và tài liệu y khoa dẫn chiếu.'
                }
              ].map((m) => {
                const isSelected = studyMode === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => handleSetStudyMode(m.id as StudyModeTier)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10'
                        : isDark
                        ? 'border-slate-700 bg-slate-800/40 hover:bg-slate-800'
                        : 'border-[#dfd4c4] bg-white hover:bg-[#f2ece2]'
                    }`}
                  >
                    <div className="pt-0.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-400'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-xs text-current">{m.labelVi}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {m.descVi}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
