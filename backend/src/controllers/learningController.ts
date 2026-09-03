import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const getLessons = async (req: Request, res: Response) => {
  try {
    const { systemId } = req.query;
    const whereClause: any = { isPublished: true };
    if (systemId) whereClause.systemId = String(systemId);

    const lessons = await prisma.lesson.findMany({
      where: whereClause,
      include: {
        system: { select: { id: true, name: true, color: true } },
        sections: { orderBy: { orderIndex: 'asc' } }
      },
      orderBy: { orderIndex: 'asc' }
    });

    return res.json(lessons);
  } catch (error) {
    console.error('getLessons error:', error);
    return res.status(500).json({ error: 'Không thể tải bài học giải phẫu' });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        system: true,
        sections: { orderBy: { orderIndex: 'asc' } }
      }
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Bài học không tồn tại' });
    }

    return res.json(lesson);
  } catch (error) {
    console.error('getLessonById error:', error);
    return res.status(500).json({ error: 'Lỗi tải chi tiết bài học' });
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const { systemId, organId } = req.query;
    const whereClause: any = {};
    if (systemId) whereClause.systemId = String(systemId);
    if (organId) whereClause.organId = String(organId);

    const questions = await prisma.quizQuestion.findMany({
      where: whereClause,
      include: {
        system: { select: { id: true, name: true, color: true } },
        organ: { select: { id: true, name: true, nameEn: true } }
      }
    });

    // Parse options json
    const formattedQuestions = questions.map((q: any) => ({
      ...q,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
    }));

    return res.json(formattedQuestions);
  } catch (error) {
    console.error('getQuizzes error:', error);
    return res.status(500).json({ error: 'Không thể tải câu hỏi kiểm tra' });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { score, totalQuestions } = req.body;
    const userId = req.user?.id;

    if (userId) {
      const attempt = await prisma.quizAttempt.create({
        data: {
          userId,
          score: Number(score) || 0,
          totalQuestions: Number(totalQuestions) || 0
        }
      });
      return res.json({ message: 'Lưu kết quả bài kiểm tra thành công', attempt });
    }

    return res.json({ message: 'Kết quả kiểm tra (khách)', score, totalQuestions });
  } catch (error) {
    console.error('submitQuiz error:', error);
    return res.status(500).json({ error: 'Lỗi lưu kết quả bài kiểm tra' });
  }
};

export const getFlashcards = async (req: Request, res: Response) => {
  try {
    const { systemId, organId } = req.query;
    const whereClause: any = {};
    if (systemId) whereClause.systemId = String(systemId);
    if (organId) whereClause.organId = String(organId);

    const flashcards = await prisma.flashcard.findMany({
      where: whereClause,
      include: {
        system: { select: { id: true, name: true, color: true } },
        organ: { select: { id: true, name: true, nameEn: true } }
      }
    });

    return res.json(flashcards);
  } catch (error) {
    console.error('getFlashcards error:', error);
    return res.status(500).json({ error: 'Không thể tải bộ thẻ học (flashcards)' });
  }
};

// Notes API
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { organId } = req.query;

    if (!userId) {
      return res.json([]);
    }

    const whereClause: any = { userId };
    if (organId) whereClause.organId = String(organId);

    const notes = await prisma.note.findMany({
      where: whereClause,
      include: {
        organ: { select: { id: true, name: true, nameEn: true, color: true } }
      },
      orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }]
    });

    return res.json(notes);
  } catch (error) {
    console.error('getNotes error:', error);
    return res.status(500).json({ error: 'Lỗi tải ghi chú' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Vui lòng đăng nhập để lưu ghi chú' });

    const { organId, title, content, isPinned } = req.body;
    if (!organId || !title || !content) {
      return res.status(400).json({ error: 'Vui lòng nhập cơ quan, tiêu đề và nội dung ghi chú' });
    }

    const note = await prisma.note.create({
      data: {
        userId,
        organId,
        title,
        content,
        isPinned: Boolean(isPinned)
      },
      include: {
        organ: { select: { id: true, name: true, nameEn: true } }
      }
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error('createNote error:', error);
    return res.status(500).json({ error: 'Lỗi tạo ghi chú mới' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ error: 'Chưa đăng nhập' });

    await prisma.note.deleteMany({
      where: { id, userId }
    });

    return res.json({ message: 'Đã xóa ghi chú thành công' });
  } catch (error) {
    console.error('deleteNote error:', error);
    return res.status(500).json({ error: 'Lỗi khi xóa ghi chú' });
  }
};

// Bookmarks API
export const getBookmarks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.json([]);

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        organ: {
          include: {
            system: { select: { id: true, name: true, color: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json(bookmarks);
  } catch (error) {
    console.error('getBookmarks error:', error);
    return res.status(500).json({ error: 'Lỗi tải danh sách đánh dấu' });
  }
};

export const toggleBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Vui lòng đăng nhập để đánh dấu' });

    const { organId } = req.body;
    if (!organId) return res.status(400).json({ error: 'Thiếu mã cơ quan' });

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_organId: { userId, organId }
      }
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id }
      });
      return res.json({ bookmarked: false, message: 'Đã bỏ đánh dấu cơ quan' });
    } else {
      await prisma.bookmark.create({
        data: { userId, organId }
      });
      return res.json({ bookmarked: true, message: 'Đã thêm cơ quan vào mục ưa thích' });
    }
  } catch (error) {
    console.error('toggleBookmark error:', error);
    return res.status(500).json({ error: 'Lỗi xử lý đánh dấu' });
  }
};

// Progress API
export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.json({
        totalStudyMinutes: 762,
        streak: 12,
        systemProgress: [
          { systemId: 'cardiovascular', name: 'Hệ tuần hoàn', progressPercent: 85 },
          { systemId: 'respiratory', name: 'Hệ hô hấp', progressPercent: 60 },
          { systemId: 'digestive', name: 'Hệ tiêu hóa', progressPercent: 40 },
          { systemId: 'nervous', name: 'Hệ thần kinh', progressPercent: 25 },
          { systemId: 'skeletal', name: 'Hệ xương khớp', progressPercent: 90 }
        ],
        recentAttempts: []
      });
    }

    const [user, progressList, attempts] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { studyTimeMinutes: true, streak: true }
      }),
      prisma.studyProgress.findMany({
        where: { userId }
      }),
      prisma.quizAttempt.findMany({
        where: { userId },
        orderBy: { completedAt: 'desc' },
        take: 5
      })
    ]);

    return res.json({
      totalStudyMinutes: user?.studyTimeMinutes || 0,
      streak: user?.streak || 1,
      systemProgress: progressList,
      recentAttempts: attempts
    });
  } catch (error) {
    console.error('getProgress error:', error);
    return res.status(500).json({ error: 'Lỗi tải tiến độ học tập' });
  }
};
