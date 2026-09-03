import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  X,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  MousePointerClick
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { api } from '../../services/api';
import { QuizQuestion } from '../../types/anatomy';

export const QuizModal: React.FC = () => {
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const setQuizListener = useAnatomyStore((s) => s.setQuizListener);
  const selectOrgan = useAnatomyStore((s) => s.selectOrgan);
  const organs = useAnatomyStore((s) => s.organs);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch quizzes when modal opens
  useEffect(() => {
    if (activeModal === 'quiz') {
      setIsLoading(true);
      api
        .getQuizzes()
        .then((data) => {
          setQuestions(data);
          setCurrentIndex(0);
          setScore(0);
          setIsAnswered(false);
          setSelectedOption(null);
          setIsCompleted(false);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setQuizListener(null);
    }
  }, [activeModal, setQuizListener]);

  const currentQ = questions[currentIndex];

  // Set up 3D click listener if current question is IDENTIFY_ORGAN
  useEffect(() => {
    if (currentQ && currentQ.type === 'IDENTIFY_ORGAN' && !isAnswered && !isCompleted) {
      setQuizListener(currentQ.correctAnswer, (clickedOrganId: string) => {
        handleOptionSelect(clickedOrganId);
      });
    } else {
      setQuizListener(null);
    }
  }, [currentQ, isAnswered, isCompleted, setQuizListener]);

  if (activeModal !== 'quiz') return null;

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option.toLowerCase() === currentQ.correctAnswer.toLowerCase();
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQ.organId) {
      selectOrgan(currentQ.organId);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Save score
      api.submitQuiz(score + (selectedOption === currentQ.correctAnswer ? 1 : 0), questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Kiểm Tra Giải Phẫu Y Khoa (Medical Anatomy Quiz)
              </h2>
              <div className="text-[11px] text-slate-400">
                Đánh giá kiến thức định khu, cấu trúc và chức năng sinh lý
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

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="py-16 text-center text-slate-400">Đang tải đề thi giải phẫu...</div>
          ) : isCompleted ? (
            /* Quiz Completed Summary */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Hoàn Thành Bài Kiểm Tra!</h3>
              <p className="text-sm text-slate-300">
                Kết quả của bạn:{' '}
                <span className="text-xl font-mono font-bold text-emerald-400">
                  {score} / {questions.length}
                </span>{' '}
                câu đúng ({Math.round((score / questions.length) * 100)}%)
              </p>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại đề này</span>
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Tiếp tục học 3D</span>
                </button>
              </div>
            </div>
          ) : currentQ ? (
            /* Question Active View */
            <div className="space-y-6">
              {/* Progress & Badge */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-400">
                  Câu hỏi {currentIndex + 1} / {questions.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
                  {currentQ.difficulty}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                <div className="text-base font-bold text-white leading-relaxed">
                  {currentQ.question}
                </div>
                {currentQ.type === 'IDENTIFY_ORGAN' && (
                  <div className="mt-2 text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                    <MousePointerClick className="w-4 h-4 animate-bounce" />
                    <span>
                      Nhấp trực tiếp lên cơ quan trên mô hình 3D (hoặc chọn đáp án bên dưới)
                    </span>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.type === 'IDENTIFY_ORGAN' ? (
                  // For 3D identify questions, show organs list as alternative buttons
                  organs.slice(0, 4).map((org) => {
                    const isSelected = selectedOption === org.id;
                    const isCorrect = org.id === currentQ.correctAnswer;
                    let style = 'bg-slate-800/60 border-slate-700/80 hover:border-cyan-400/60 text-slate-200';

                    if (isAnswered) {
                      if (isCorrect) {
                        style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={org.id}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(org.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between ${style}`}
                      >
                        <span>{org.name} ({org.nameEn})</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })
                ) : (
                  currentQ.options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentQ.correctAnswer;
                    let style = 'bg-slate-800/60 border-slate-700/80 hover:border-cyan-400/60 text-slate-200';

                    if (isAnswered) {
                      if (isCorrect) {
                        style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(opt)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 animate-fade-in space-y-3">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Giải thích giải phẫu:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-md shadow-cyan-500/20"
                    >
                      <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
