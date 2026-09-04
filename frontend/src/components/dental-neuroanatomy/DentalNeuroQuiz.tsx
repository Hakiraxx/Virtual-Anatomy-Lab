import React from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  Lightbulb
} from 'lucide-react';
import {
  useDentalNeuroStore,
  CRANIOFACIAL_QUIZ_QUESTIONS
} from '../../stores/useDentalNeuroStore';

export const DentalNeuroQuiz: React.FC = () => {
  const quizMode = useDentalNeuroStore((s) => s.quizMode);
  const currentQuizIndex = useDentalNeuroStore((s) => s.currentQuizIndex);
  const quizScore = useDentalNeuroStore((s) => s.quizScore);
  const quizAnswered = useDentalNeuroStore((s) => s.quizAnswered);
  const quizFeedback = useDentalNeuroStore((s) => s.quizFeedback);
  const nextQuizQuestion = useDentalNeuroStore((s) => s.nextQuizQuestion);
  const exitQuiz = useDentalNeuroStore((s) => s.exitQuiz);
  const startQuiz = useDentalNeuroStore((s) => s.startQuiz);

  if (!quizMode) return null;

  const currentQ = CRANIOFACIAL_QUIZ_QUESTIONS[currentQuizIndex];
  const isLastQuestion = currentQuizIndex >= CRANIOFACIAL_QUIZ_QUESTIONS.length - 1;

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-auto select-none animate-fade-in">
      <div className="bg-slate-950/95 border border-amber-500/50 rounded-xl shadow-2xl p-4 backdrop-blur-md text-slate-100">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              3D Interactive Anatomy Quiz
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">
              Câu {currentQuizIndex + 1}/{CRANIOFACIAL_QUIZ_QUESTIONS.length}
            </span>
            <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/30">
              Điểm: {quizScore}
            </span>
            <button
              onClick={exitQuiz}
              className="text-slate-400 hover:text-rose-400 text-xs ml-2 font-sans"
            >
              ✕ Thoát
            </button>
          </div>
        </div>

        {/* Question content */}
        {currentQ ? (
          <div>
            <div className="text-sm font-semibold text-slate-100 mb-2 leading-relaxed">
              {currentQ.questionVi}
            </div>
            <div className="text-xs font-serif italic text-slate-400 mb-3">
              {currentQ.questionEn}
            </div>

            {/* Instruction prompt */}
            {!quizAnswered && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-950/40 border border-sky-600/40 text-sky-200 text-xs animate-pulse">
                <Lightbulb className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>
                  👉 <strong>Chỉ điểm trực tiếp:</strong> Nhấp vào cấu trúc chính xác trên mô hình 3D sọ mặt để trả lời!
                </span>
              </div>
            )}

            {/* Feedback box */}
            {quizAnswered && quizFeedback && (
              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed mt-2 ${
                  quizFeedback.correct
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {quizFeedback.correct ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>CHÍNH XÁC!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>CHƯA CHÍNH XÁC</span>
                    </>
                  )}
                </div>
                <p>{quizFeedback.messageVi}</p>
              </div>
            )}

            {/* Next / Finish action button */}
            {quizAnswered && (
              <div className="mt-3 flex justify-end">
                {isLastQuestion ? (
                  <button
                    onClick={startQuiz}
                    className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại bài kiểm tra</span>
                  </button>
                ) : (
                  <button
                    onClick={nextQuizQuestion}
                    className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Finished summary */
          <div className="text-center py-4 space-y-3">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-amber-300">
              Chúc mừng bạn đã hoàn thành bài kiểm tra!
            </h3>
            <p className="text-sm text-slate-300">
              Kết quả của bạn: <strong className="text-amber-400">{quizScore}/{CRANIOFACIAL_QUIZ_QUESTIONS.length}</strong> câu đúng.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={startQuiz}
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
              >
                Làm lại từ đầu
              </button>
              <button
                onClick={exitQuiz}
                className="px-4 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
