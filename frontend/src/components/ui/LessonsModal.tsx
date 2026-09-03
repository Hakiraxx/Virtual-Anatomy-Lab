import React, { useState, useEffect } from 'react';
import { BookOpen, X, ChevronRight, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { api } from '../../services/api';
import { Lesson, LessonSection } from '../../types/anatomy';

export const LessonsModal: React.FC = () => {
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const selectOrgan = useAnatomyStore((s) => s.selectOrgan);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeSection, setActiveSection] = useState<LessonSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeModal === 'lessons') {
      setIsLoading(true);
      api
        .getLessons()
        .then((data) => {
          setLessons(data);
          if (data.length > 0) {
            setActiveLesson(data[0]);
            if (data[0].sections.length > 0) {
              setActiveSection(data[0].sections[0]);
            }
          }
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [activeModal]);

  // Synchronize 3D camera & organ highlight when lesson section changes
  const handleSectionClick = (sec: LessonSection) => {
    setActiveSection(sec);
    if (sec.organFocusId) {
      selectOrgan(sec.organFocusId);
    }
  };

  if (activeModal !== 'lessons') return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div className="w-full max-w-4xl h-[80vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Chương Trình Học Giải Phẫu 3D (Anatomy Curriculum)
              </h2>
              <div className="text-[11px] text-slate-400">
                Bài giảng chuẩn y khoa đồng bộ hóa mô hình 3D
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Lesson Directory */}
          <div className="w-72 sm:w-80 border-r border-slate-800 bg-slate-950/40 p-4 overflow-y-auto space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Danh mục bài học
            </div>
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => {
                  setActiveLesson(lesson);
                  if (lesson.sections.length > 0) {
                    handleSectionClick(lesson.sections[0]);
                  }
                }}
                className={`p-3 rounded-2xl border cursor-pointer transition ${
                  activeLesson?.id === lesson.id
                    ? 'bg-slate-800/90 border-cyan-500/50 shadow-md'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white mb-0.5">{lesson.title}</div>
                <div className="text-[10px] text-slate-400">{lesson.titleEn}</div>
                <div className="mt-2 text-[10px] text-cyan-400 flex items-center gap-1 font-semibold">
                  <span>{lesson.sections.length} phần học</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Section Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeLesson && activeSection ? (
              <div className="space-y-6 max-w-2xl">
                {/* Lesson Title & System badge */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                    {activeLesson.system?.name || 'Hệ cơ quan'}
                  </span>
                  <h3 className="text-xl font-black text-white mt-2">
                    {activeSection.title}
                  </h3>
                </div>

                {/* Section Content */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-sm text-slate-200 leading-relaxed space-y-4">
                  <p>{activeSection.content}</p>

                  {activeSection.organFocusId && (
                    <div className="pt-2 flex items-center gap-2 text-xs text-cyan-300 font-semibold">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span>Mô hình 3D đã tự động hướng góc nhìn vào cấu trúc này.</span>
                    </div>
                  )}
                </div>

                {/* Section Timeline selector */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400">Các phần trong bài:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeLesson.sections.map((sec, idx) => (
                      <button
                        key={sec.id}
                        onClick={() => handleSectionClick(sec)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                          activeSection.id === sec.id
                            ? 'bg-cyan-950/60 border-cyan-400/80 text-cyan-200 shadow-sm'
                            : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span>{sec.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500">Đang tải nội dung...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
