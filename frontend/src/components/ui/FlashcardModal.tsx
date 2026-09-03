import React, { useState, useEffect } from 'react';
import { Layers, X, RotateCw, Lightbulb, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { api } from '../../services/api';
import { Flashcard } from '../../types/anatomy';

export const FlashcardModal: React.FC = () => {
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeModal === 'flashcards') {
      setIsLoading(true);
      api
        .getFlashcards()
        .then((data) => {
          setCards(data);
          setCurrentIndex(0);
          setIsFlipped(false);
          setShowHint(false);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [activeModal]);

  if (activeModal !== 'flashcards') return null;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Thẻ Ghi Nhớ Giải Phẫu (Anatomy Flashcards)
              </h2>
              <div className="text-[11px] text-slate-400">
                Học lặp lại ngắt quãng (Spaced Repetition)
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

        {/* Card Arena */}
        <div className="p-6">
          {isLoading ? (
            <div className="py-16 text-center text-slate-400">Đang tải bộ thẻ học...</div>
          ) : currentCard ? (
            <div className="space-y-6">
              {/* Card Meta & Counter */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-amber-400">
                  Thẻ {currentIndex + 1} / {cards.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
                  {currentCard.difficulty}
                </span>
              </div>

              {/* Flippable Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative h-64 w-full bg-slate-950/80 border border-slate-700/80 hover:border-amber-500/60 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="uppercase tracking-wider font-bold text-amber-500/80">
                      {isFlipped ? 'Đáp án & Thuật ngữ Latin' : 'Câu hỏi giải phẫu'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-amber-400">
                      <RotateCw className="w-3 h-3" /> Nhấp để lật
                    </span>
                  </div>

                  {!isFlipped ? (
                    <div className="text-base sm:text-lg font-bold text-white pt-3 leading-snug">
                      {currentCard.front}
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <div className="text-sm sm:text-base font-semibold text-emerald-300 leading-relaxed whitespace-pre-line">
                        {currentCard.back}
                      </div>
                      {currentCard.latinTerm && (
                        <div className="text-xs font-serif italic text-cyan-300 bg-cyan-950/40 p-2 rounded-xl border border-cyan-500/20">
                          Latin: {currentCard.latinTerm}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Hint */}
                {currentCard.hint && !isFlipped && (
                  <div className="pt-2">
                    {showHint ? (
                      <div className="text-xs text-amber-300 bg-amber-950/30 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                        💡 Gợi ý: {currentCard.hint}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHint(true);
                        }}
                        className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        <Lightbulb className="w-3.5 h-3.5" /> Hiện gợi ý
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Spaced Repetition Buttons when Flipped */}
              {isFlipped ? (
                <div className="grid grid-cols-4 gap-2 pt-1 animate-fade-in text-xs">
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/80 font-semibold text-center transition"
                  >
                    Lặp lại (&lt;1m)
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/80 font-semibold text-center transition"
                  >
                    Khó (1d)
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 font-semibold text-center transition"
                  >
                    Tốt (3d)
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 font-semibold text-center transition"
                  >
                    Dễ (7d)
                  </button>
                </div>
              ) : (
                /* Navigation Controls */
                <div className="flex items-center justify-between">
                  <button
                    disabled={currentIndex === 0}
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Thẻ trước
                  </button>
                  <button
                    disabled={currentIndex + 1 >= cards.length}
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 disabled:opacity-40 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition"
                  >
                    Thẻ tiếp theo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">Không có thẻ flashcard nào.</div>
          )}
        </div>
      </div>
    </div>
  );
};
