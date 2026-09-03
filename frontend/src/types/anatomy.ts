export interface Structure {
  id: string;
  organId: string;
  name: string;
  nameEn: string;
  nameLatin?: string;
  description: string;
  function?: string;
  localPosX: number;
  localPosY: number;
  localPosZ: number;
}

export interface Organ {
  id: string;
  systemId: string;
  name: string;
  nameEn: string;
  nameLatin: string;
  description: string;
  function: string;
  location: string;
  clinicalNotes?: string;
  source: string;
  reviewStatus: string;
  modelUrl?: string;
  layerDepth: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  scale: number;
  color: string;
  structures?: Structure[];
  system?: {
    id: string;
    name: string;
    nameEn: string;
    color: string;
  };
}

export interface System {
  id: string;
  name: string;
  nameEn: string;
  nameLatin?: string;
  description: string;
  color: string;
  orderIndex: number;
  icon?: string;
  _count?: {
    organs: number;
    lessons: number;
    quizzes: number;
  };
}

export interface QuizQuestion {
  id: string;
  systemId: string;
  organId?: string;
  question: string;
  type: 'MULTIPLE_CHOICE' | 'IDENTIFY_ORGAN';
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  system?: { id: string; name: string; color: string };
  organ?: { id: string; name: string; nameEn: string };
}

export interface Flashcard {
  id: string;
  systemId: string;
  organId?: string;
  front: string;
  back: string;
  latinTerm?: string;
  hint?: string;
  difficulty: string;
  system?: { id: string; name: string; color: string };
  organ?: { id: string; name: string; nameEn: string };
}

export interface LessonSection {
  id: string;
  lessonId: string;
  title: string;
  content: string;
  organFocusId?: string;
  orderIndex: number;
}

export interface Lesson {
  id: string;
  systemId: string;
  title: string;
  titleEn: string;
  description: string;
  orderIndex: number;
  sections: LessonSection[];
  system?: { id: string; name: string; color: string };
}

export interface Note {
  id: string;
  userId: string;
  organId: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  organ?: { id: string; name: string; nameEn: string; color: string };
}

export interface Bookmark {
  id: string;
  userId: string;
  organId: string;
  createdAt: string;
  organ?: Organ;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  avatar?: string;
  streak: number;
  studyTimeMinutes: number;
}
