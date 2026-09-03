import React, { useState, useEffect } from 'react';
import { FileText, X, Plus, Pin, Trash2, Check, AlertCircle } from 'lucide-react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { api } from '../../services/api';
import { Note } from '../../types/anatomy';

export const NotesDrawer: React.FC = () => {
  const activeModal = useAnatomyStore((s) => s.activeModal);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const selectedOrganId = useAnatomyStore((s) => s.selectedOrganId);
  const organs = useAnatomyStore((s) => s.organs);
  const { user } = useAuthStore();

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const selectedOrgan = organs.find((o) => o.id === selectedOrganId);

  useEffect(() => {
    if (activeModal === 'notes') {
      api
        .getNotes(selectedOrganId || undefined)
        .then((data) => setNotes(data))
        .catch(() => setNotes([]));
    }
  }, [activeModal, selectedOrganId]);

  if (activeModal !== 'notes') return null;

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrganId || !title.trim() || !content.trim()) return;

    try {
      const created = await api.createNote({
        organId: selectedOrganId,
        title,
        content,
        isPinned
      });
      setNotes([created, ...notes]);
      setTitle('');
      setContent('');
      setIsCreating(false);
      setMsg('Đã lưu ghi chú giải phẫu thành công!');
      setTimeout(() => setMsg(null), 3000);
    } catch (err: any) {
      setMsg(err.message || 'Vui lòng đăng nhập để lưu ghi chú');
      setTimeout(() => setMsg(null), 3000);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch {
      // Local fallback
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-end z-50 animate-fade-in select-none">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Ghi Chú Cá Nhân (Anatomy Notes)</h2>
              <div className="text-[11px] text-slate-400">
                {selectedOrgan ? `Ghi chú cho: ${selectedOrgan.name}` : 'Tất cả ghi chú'}
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

        {msg && (
          <div className="mx-4 mt-3 p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-xs text-cyan-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{msg}</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Viết ghi chú mới cho {selectedOrgan?.name || 'cơ quan'}</span>
            </button>
          ) : (
            <form
              onSubmit={handleCreateNote}
              className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3"
            >
              <div className="text-xs font-bold text-slate-200">Ghi chú mới:</div>
              <input
                type="text"
                placeholder="Tiêu đề ghi chú..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
              <textarea
                placeholder="Nội dung lâm sàng, chi tiết giải phẫu cần nhớ..."
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500"
                  />
                  <span>Ghim lên đầu</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Notes List */}
          <div className="space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 transition space-y-1.5 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    {note.isPinned && <Pin className="w-3.5 h-3.5 text-amber-400" />}
                    <span className="text-xs font-bold text-white">{note.title}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {note.content}
                </p>
                {note.organ && (
                  <div className="text-[10px] text-cyan-400 font-medium pt-1">
                    Cơ quan: {note.organ.name}
                  </div>
                )}
              </div>
            ))}

            {notes.length === 0 && !isCreating && (
              <div className="py-12 text-center text-slate-500 text-xs">
                Chưa có ghi chú nào cho cơ quan này.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
