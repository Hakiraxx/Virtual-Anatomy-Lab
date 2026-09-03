import React from 'react';
import { Microscope, GitCompare, Play, BrainCircuit, ArrowRight, Sparkles } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { ATELIER_ORGANS } from '../../data/fullOrgansData';

export const AtelierCards: React.FC = () => {
  const activeSpecimenId = useAnatomyStore((s) => s.activeSpecimenId);
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);

  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  const specimen =
    ATELIER_ORGANS.find((o) => o.id === activeSpecimenId) || ATELIER_ORGANS[0];

  const organName = isVi ? specimen.nameVi : specimen.nameEn;

  return (
    <section
      className={`border-t p-6 select-none transition-colors duration-200 ${
        isDark
          ? 'bg-[#0f141c] border-slate-800 text-slate-100'
          : 'bg-[#f7f0e7] border-[#e7ded3] text-[#28231d]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
          <span>{isVi ? 'Tài nguyên học tập & Bệnh học' : 'Learning Resources & Pathologies'}</span>
          <span className="text-xs font-sans font-normal text-slate-500 dark:text-slate-400">
            · {organName}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Curiosity Card */}
          <article
            className={`p-5 rounded-2xl border flex flex-col justify-between ${
              isDark
                ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800'
                : 'bg-gradient-to-br from-[#ede3d5] to-[#fbf7f2] border-[#e7ded3]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl text-amber-600 font-serif">✿</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="my-4">
              <p className="font-serif text-lg italic leading-snug text-slate-700 dark:text-slate-200">
                {isVi
                  ? 'Học tập là một hành trình tò mò và khám phá.'
                  : 'Learning is an act of curiosity.'}
              </p>
              <em className="text-xs text-amber-700 dark:text-amber-400 font-serif not-italic mt-1 block">
                {isVi ? 'Hãy tiếp tục khám phá!' : 'Keep exploring!'}
              </em>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Anatomy Atelier · {specimen.scientificName}
            </div>
          </article>

          {/* Card 2: Microscopic View */}
          <article
            className={`p-5 rounded-2xl border flex flex-col justify-between ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white/70 border-[#e7ded3]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <em>{isVi ? 'Quan sát vi thể' : 'Microscopic view'}</em>
                <Microscope className="w-4 h-4 text-[#c05a4e]" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
                {isVi ? `Mô vi thể ${organName}` : `${organName} histology tissue`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {isVi
                  ? 'Cấu trúc tế bào học, các sợi cơ và mạng lưới mao mạch nuôi dưỡng vi tuần hoàn.'
                  : 'Cellular ultrastructure, fibers, and microvascular capillary architecture.'}
              </p>
            </div>

            <button
              onClick={() => setActiveModal('lessons')}
              className="mt-4 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline pt-2"
            >
              <span>{isVi ? 'Khám phá mô học' : 'Explore tissue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>

          {/* Card 3: Compare Specimen */}
          <article
            className={`p-5 rounded-2xl border flex flex-col justify-between ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white/70 border-[#e7ded3]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <em>{isVi ? 'So sánh cơ quan' : 'Compare organs'}</em>
                <GitCompare className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
                {isVi ? `${organName} vs Các cơ quan liên quan` : `${organName} vs Related organs`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {isVi
                  ? 'Đối chiếu tương quan không gian giải phẫu, liên hệ cung cấp máu và chi phối thần kinh.'
                  : 'Spatial anatomical relationships, shared blood supply, and reciprocal innervation.'}
              </p>
            </div>

            <button
              onClick={() => setActiveModal('flashcards')}
              className="mt-4 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline pt-2"
            >
              <span>{isVi ? 'Mở bảng so sánh' : 'Open comparison'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>

          {/* Card 4: System Connection */}
          <article
            className={`p-5 rounded-2xl border flex flex-col justify-between ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white/70 border-[#e7ded3]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <em>{isVi ? 'Vị trí trong hệ cơ quan' : 'Where it works'}</em>
                <BrainCircuit className="w-4 h-4 text-sky-600" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
                {isVi ? specimen.systemNameVi : specimen.systemNameEn}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {isVi
                  ? 'Định vị cơ quan này trong mạng lưới sinh lý toàn vẹn của cơ thể con người.'
                  : 'Understand its physiological role in the integrated human body system.'}
              </p>
            </div>

            <button
              onClick={() => setActiveModal('dashboard')}
              className="mt-4 flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400 hover:underline pt-2"
            >
              <span>{isVi ? 'Xem toàn hệ cơ quan' : 'See the system'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};
