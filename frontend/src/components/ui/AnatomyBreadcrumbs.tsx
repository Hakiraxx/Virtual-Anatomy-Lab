import React from 'react';
import { ChevronRight, Home, History, ArrowLeft } from 'lucide-react';
import { useAnatomyStore, FocusNode } from '../../stores/useAnatomyStore';

export const AnatomyBreadcrumbs: React.FC = () => {
  const focusStack = useAnatomyStore((s) => s.focusStack);
  const backToBody = useAnatomyStore((s) => s.backToBody);
  const backToPreviousFocus = useAnatomyStore((s) => s.backToPreviousFocus);
  const focusOnOrgan = useAnatomyStore((s) => s.focusOnOrgan);
  const language = useAnatomyStore((s) => s.language);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const focusHistory = useAnatomyStore((s) => s.focusHistory);

  const [showHistory, setShowHistory] = React.useState(false);

  const isVi = language === 'vi';
  const isDark = atelierTheme === 'dark';

  const handleBreadcrumbClick = (node: FocusNode, index: number) => {
    if (index === focusStack.length - 1) return; // Current node

    if (node.type === 'body') {
      backToBody();
    } else if (node.type === 'organ' && node.organId) {
      focusOnOrgan(node.organId, node.nameVi, node.nameEn, node.cameraPosition, node.cameraTarget);
    }
  };

  const isFocusedBeyondBody = focusStack.length > 1;

  return (
    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 select-none">
      {/* Back to Body Button */}
      {isFocusedBeyondBody && (
        <button
          onClick={backToBody}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-md backdrop-blur-md transition cursor-pointer ${
            isDark
              ? 'bg-amber-600/90 border-amber-500 text-white hover:bg-amber-500'
              : 'bg-[#c05a4e] border-[#c05a4e] text-white hover:bg-[#a94a3e]'
          }`}
          title={isVi ? 'Quay lại xem toàn thân' : 'Back to entire body view'}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isVi ? 'Toàn thân' : 'Body'}</span>
        </button>
      )}

      {/* Breadcrumb Trail */}
      <nav
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full border shadow-sm backdrop-blur-md text-xs font-medium transition ${
          isDark
            ? 'bg-slate-900/85 border-slate-800 text-slate-300'
            : 'bg-white/80 border-[#e7ded3] text-slate-700'
        }`}
      >
        <button
          onClick={backToBody}
          className="flex items-center gap-1 hover:text-amber-600 transition"
          title="Toàn thân"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isVi ? 'Cơ thể' : 'Body'}</span>
        </button>

        {focusStack.slice(1).map((node, i) => {
          const isLast = i === focusStack.length - 2;
          const nodeName = isVi ? node.nameVi : node.nameEn;

          return (
            <React.Fragment key={`${node.id}-${i}`}>
              <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <button
                onClick={() => handleBreadcrumbClick(node, i + 1)}
                className={`transition truncate max-w-[120px] sm:max-w-[160px] ${
                  isLast
                    ? 'font-bold text-amber-600 dark:text-amber-400'
                    : 'hover:text-amber-600 text-slate-500 dark:text-slate-400'
                }`}
                title={nodeName}
              >
                {nodeName}
              </button>
            </React.Fragment>
          );
        })}

        {/* History Dropdown Trigger */}
        {focusHistory.length > 0 && (
          <div className="relative ml-1 pl-1 border-l border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-current transition"
              title="Lịch sử xem cấu trúc"
            >
              <History className="w-3 h-3" />
            </button>

            {/* History Dropdown List */}
            {showHistory && (
              <div
                className={`absolute left-0 top-full mt-2 w-52 py-1.5 rounded-xl border shadow-xl backdrop-blur-md text-xs z-50 animate-fade-in ${
                  isDark
                    ? 'bg-slate-900/95 border-slate-800 text-slate-200'
                    : 'bg-white/95 border-[#e7ded3] text-slate-800'
                }`}
              >
                <div className="px-3 py-1 font-serif text-[11px] font-bold text-slate-400 border-b border-inherit">
                  {isVi ? 'Lịch sử đã xem' : 'Focus History'}
                </div>
                <div className="max-h-48 overflow-y-auto py-1">
                  {focusHistory.slice(-8).reverse().map((item, idx) => (
                    <button
                      key={`hist-${idx}`}
                      onClick={() => {
                        setShowHistory(false);
                        if (item.type === 'organ' && item.organId) {
                          focusOnOrgan(item.organId, item.nameVi, item.nameEn);
                        }
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-amber-500/10 hover:text-amber-500 flex items-center justify-between truncate"
                    >
                      <span className="truncate">{isVi ? item.nameVi : item.nameEn}</span>
                      <span className="text-[10px] text-slate-400 font-serif italic">
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};
