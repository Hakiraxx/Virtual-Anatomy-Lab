import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  X,
  Flame,
  Clock,
  Award,
  CheckCircle,
  Bookmark as BookmarkIcon,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { api } from '../../services/api';
import { Bookmark } from '../../types/anatomy';

export const DashboardModal: React.FC = () => {
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const selectOrgan = useAnatomyStore((s) => s.selectOrgan);
  const { user } = useAuthStore();

  const [progressData, setProgressData] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeModal === 'dashboard') {
      setIsLoading(true);
      Promise.all([api.getProgress(), api.getBookmarks()])
        .then(([prog, bms]) => {
          setProgressData(prog);
          setBookmarks(bms);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [activeModal]);

  if (activeModal !== 'dashboard') return null;

  const handleJumpToOrgan = (organId: string) => {
    selectOrgan(organId);
    setActiveModal(null);
  };

  const streak = progressData?.streak || user?.streak || 12;
  const studyMinutes = progressData?.totalStudyMinutes || user?.studyTimeMinutes || 762;
  const hours = Math.floor(studyMinutes / 60);
  const mins = studyMinutes % 60;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Tiến Độ Học Tập Giải Phẫu (Study Dashboard)
              </h2>
              <div className="text-[11px] text-slate-400">
                Theo dõi quá trình ghi nhớ và mức độ thuần thục các hệ cơ quan
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Greeting */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/30 border border-cyan-500/30 rounded-2xl p-5">
            <h3 className="text-lg font-extrabold text-white">
              Chào buổi tối, {user?.name || 'Bác sĩ tương lai'} 👋
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Bạn đang duy trì thói quen quan sát giải phẫu 3D rất tốt. Hãy tiếp tục ôn tập hệ thần kinh hôm nay!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* Streak */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Chuỗi học tập</div>
                <div className="text-lg font-black text-amber-400">{streak} ngày 🔥</div>
              </div>
            </div>

            {/* Study Time */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Thời gian học</div>
                <div className="text-lg font-black text-cyan-400">{hours}h {mins}m</div>
              </div>
            </div>

            {/* Quiz Average */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Điểm kiểm tra</div>
                <div className="text-lg font-black text-emerald-400">87%</div>
              </div>
            </div>
          </div>

          {/* Systems Mastery Progress */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Tiến độ thuần thục theo Hệ Cơ Quan</span>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Hệ tuần hoàn (Tim mạch)', percent: 85, color: '#e11d48' },
                { name: 'Hệ xương khớp (Skeletal)', percent: 90, color: '#94a3b8' },
                { name: 'Hệ hô hấp (Respiratory)', percent: 60, color: '#06b6d4' },
                { name: 'Hệ tiêu hóa (Digestive)', percent: 40, color: '#f59e0b' },
                { name: 'Hệ thần kinh (Nervous)', percent: 25, color: '#8b5cf6' }
              ].map((sys) => (
                <div key={sys.name} className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200">{sys.name}</span>
                    <span className="font-mono text-cyan-400">{sys.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${sys.percent}%`, backgroundColor: sys.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarks Section */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookmarkIcon className="w-4 h-4 text-amber-400" />
              <span>Cơ quan đã đánh dấu (Bookmarks)</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'heart', name: 'Tim (Heart)', latin: 'Cor' },
                { id: 'brain', name: 'Não bộ (Brain)', latin: 'Encephalon' },
                { id: 'lungs', name: 'Phổi (Lungs)', latin: 'Pulmones' },
                { id: 'liver', name: 'Gan (Liver)', latin: 'Hepar' }
              ].map((bm) => (
                <button
                  key={bm.id}
                  onClick={() => handleJumpToOrgan(bm.id)}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-amber-500/50 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300">
                      {bm.name}
                    </div>
                    <div className="text-[10px] font-serif italic text-cyan-400">
                      {bm.latin}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
