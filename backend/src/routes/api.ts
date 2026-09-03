import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import {
  getSystems,
  getSystemById,
  getOrgans,
  getOrganById,
  searchAnatomy,
  getStructureById,
  getStructureChildren,
  getStructureRelations,
  getModelsByGender,
  getModelsByGenderAndSystem
} from '../controllers/anatomyController';
import {
  getLessons,
  getLessonById,
  getQuizzes,
  submitQuiz,
  getFlashcards,
  getNotes,
  createNote,
  deleteNote,
  getBookmarks,
  toggleBookmark,
  getProgress
} from '../controllers/learningController';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authenticate, getMe);

// Anatomy routes
router.get('/systems', getSystems);
router.get('/systems/:id', getSystemById);
router.get('/organs', getOrgans);
router.get('/organs/search', searchAnatomy);
router.get('/organs/:id', getOrganById);

// Prompt Specification compliant /api/anatomy/ routes
router.get('/anatomy/systems', getSystems);
router.get('/anatomy/systems/:id', getSystemById);
router.get('/anatomy/structures/:id', getStructureById);
router.get('/anatomy/structures/:id/children', getStructureChildren);
router.get('/anatomy/structures/:id/relations', getStructureRelations);
router.get('/anatomy/search', searchAnatomy);
router.get('/anatomy/models/:gender', getModelsByGender);
router.get('/anatomy/models/:gender/:system', getModelsByGenderAndSystem);

// Learning routes
router.get('/lessons', getLessons);
router.get('/lessons/:id', getLessonById);
router.get('/quizzes', getQuizzes);
router.post('/quizzes/submit', optionalAuth, submitQuiz);
router.get('/flashcards', getFlashcards);

// User specific notes, bookmarks, progress
router.get('/notes', optionalAuth, getNotes);
router.post('/notes', authenticate, createNote);
router.delete('/notes/:id', authenticate, deleteNote);

router.get('/bookmarks', optionalAuth, getBookmarks);
router.post('/bookmarks/toggle', authenticate, toggleBookmark);

router.get('/progress', optionalAuth, getProgress);

export default router;
