import { System, Organ, QuizQuestion, Flashcard, Lesson, Note, Bookmark, User } from '../types/anatomy';

const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('medanatomy_token');
export const setAuthToken = (token: string) => localStorage.setItem('medanatomy_token', token);
export const removeAuthToken = () => localStorage.removeItem('medanatomy_token');

const authHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Systems
  async getSystems(): Promise<System[]> {
    const res = await fetch(`${API_BASE}/systems`);
    if (!res.ok) throw new Error('Failed to fetch systems');
    return res.json();
  },

  // Organs
  async getOrgans(systemId?: string): Promise<Organ[]> {
    const url = systemId ? `${API_BASE}/organs?systemId=${encodeURIComponent(systemId)}` : `${API_BASE}/organs`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch organs');
    return res.json();
  },

  async getOrganById(id: string): Promise<Organ> {
    const res = await fetch(`${API_BASE}/organs/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Failed to fetch organ');
    return res.json();
  },

  // Search
  async search(query: string): Promise<{ organs: Organ[]; systems: System[]; structures: any[] }> {
    if (!query.trim()) return { organs: [], systems: [], structures: [] };
    const res = await fetch(`${API_BASE}/organs/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  // Lessons
  async getLessons(systemId?: string): Promise<Lesson[]> {
    const url = systemId ? `${API_BASE}/lessons?systemId=${encodeURIComponent(systemId)}` : `${API_BASE}/lessons`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch lessons');
    return res.json();
  },

  // Quizzes
  async getQuizzes(systemId?: string, organId?: string): Promise<QuizQuestion[]> {
    let url = `${API_BASE}/quizzes`;
    const params = new URLSearchParams();
    if (systemId) params.append('systemId', systemId);
    if (organId) params.append('organId', organId);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch quizzes');
    return res.json();
  },

  async submitQuiz(score: number, totalQuestions: number): Promise<any> {
    const res = await fetch(`${API_BASE}/quizzes/submit`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ score, totalQuestions })
    });
    return res.json();
  },

  // Flashcards
  async getFlashcards(systemId?: string): Promise<Flashcard[]> {
    const url = systemId ? `${API_BASE}/flashcards?systemId=${encodeURIComponent(systemId)}` : `${API_BASE}/flashcards`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch flashcards');
    return res.json();
  },

  // Notes
  async getNotes(organId?: string): Promise<Note[]> {
    const url = organId ? `${API_BASE}/notes?organId=${encodeURIComponent(organId)}` : `${API_BASE}/notes`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    return res.json();
  },

  async createNote(data: { organId: string; title: string; content: string; isPinned?: boolean }): Promise<Note> {
    const res = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create note');
    return res.json();
  },

  async deleteNote(id: string): Promise<void> {
    await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
  },

  // Bookmarks
  async getBookmarks(): Promise<Bookmark[]> {
    const res = await fetch(`${API_BASE}/bookmarks`, { headers: authHeaders() });
    if (!res.ok) return [];
    return res.json();
  },

  async toggleBookmark(organId: string): Promise<{ bookmarked: boolean }> {
    const res = await fetch(`${API_BASE}/bookmarks/toggle`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ organId })
    });
    if (!res.ok) throw new Error('Failed to toggle bookmark');
    return res.json();
  },

  // Progress
  async getProgress(): Promise<any> {
    const res = await fetch(`${API_BASE}/progress`, { headers: authHeaders() });
    if (!res.ok) return null;
    return res.json();
  },

  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    return res.json();
  },

  async register(email: string, password: string, name: string, role?: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    return res.json();
  },

  async getMe(): Promise<{ user: User }> {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  }
};
