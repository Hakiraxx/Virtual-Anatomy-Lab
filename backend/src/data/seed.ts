import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import { systemsData, organsData, quizQuestionsData, flashcardsData, lessonsData } from './seedData';

async function main() {
  console.log('🌱 Starting MedAnatomy 3D Database Seeding...');

  // 1. Seed Demo Users
  const hashedPassword = await bcrypt.hash('medical2026', 10);
  
  const student = await prisma.user.upsert({
    where: { email: 'student@medanatomy.edu.vn' },
    update: {},
    create: {
      email: 'student@medanatomy.edu.vn',
      password: hashedPassword,
      name: 'Bs. Nguyễn Nhật Minh (Sinh viên Y4)',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      streak: 12,
      studyTimeMinutes: 762
    }
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@medanatomy.edu.vn' },
    update: {},
    create: {
      email: 'teacher@medanatomy.edu.vn',
      password: hashedPassword,
      name: 'PGS. TS. Trần Hoàng Nam (Bộ môn Giải phẫu)',
      role: 'TEACHER',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
      streak: 45,
      studyTimeMinutes: 2400
    }
  });

  console.log('✅ Demo Users Seeded (student@medanatomy.edu.vn / medical2026)');

  // 2. Seed Systems
  for (const sys of systemsData) {
    await prisma.system.upsert({
      where: { id: sys.id },
      update: { ...sys },
      create: { ...sys }
    });
  }
  console.log(`✅ Seeded ${systemsData.length} Anatomical Systems.`);

  // 3. Seed Organs & Structures
  for (const org of organsData) {
    const { structures, ...organFields } = org;
    
    await prisma.organ.upsert({
      where: { id: organFields.id },
      update: { ...organFields },
      create: { ...organFields }
    });

    if (structures && structures.length > 0) {
      for (const st of structures) {
        await prisma.structure.upsert({
          where: { id: st.id },
          update: { ...st, organId: organFields.id },
          create: { ...st, organId: organFields.id }
        });
      }
    }
  }
  console.log(`✅ Seeded ${organsData.length} Organs with accurate medical sub-structures.`);

  // 4. Seed Quizzes
  for (const q of quizQuestionsData) {
    await prisma.quizQuestion.create({
      data: { ...q }
    });
  }
  console.log(`✅ Seeded ${quizQuestionsData.length} Quiz Questions.`);

  // 5. Seed Flashcards
  for (const f of flashcardsData) {
    await prisma.flashcard.create({
      data: { ...f }
    });
  }
  console.log(`✅ Seeded ${flashcardsData.length} Flashcards.`);

  // 6. Seed Lessons & Sections
  for (const l of lessonsData) {
    const { sections, ...lessonFields } = l;
    await prisma.lesson.upsert({
      where: { id: lessonFields.id },
      update: { ...lessonFields },
      create: { ...lessonFields }
    });

    for (const sec of sections) {
      await prisma.lessonSection.upsert({
        where: { id: sec.id },
        update: { ...sec, lessonId: lessonFields.id },
        create: { ...sec, lessonId: lessonFields.id }
      });
    }
  }
  console.log(`✅ Seeded ${lessonsData.length} Lessons.`);

  // 7. Seed sample initial Note & Bookmark for student
  await prisma.note.create({
    data: {
      userId: student.id,
      organId: 'heart',
      title: 'Lưu ý về vách liên thất',
      content: 'Thành thất trái dày gấp 3 lần thành thất phải do kháng trở tuần hoàn ngoại vi cao (80-120 mmHg so với 15-25 mmHg ở vòng phổi).',
      isPinned: true
    }
  });

  await prisma.bookmark.upsert({
    where: { userId_organId: { userId: student.id, organId: 'heart' } },
    update: {},
    create: { userId: student.id, organId: 'heart' }
  });

  await prisma.bookmark.upsert({
    where: { userId_organId: { userId: student.id, organId: 'brain' } },
    update: {},
    create: { userId: student.id, organId: 'brain' }
  });

  await prisma.studyProgress.upsert({
    where: { userId_systemId: { userId: student.id, systemId: 'cardiovascular' } },
    update: { progressPercent: 85 },
    create: { userId: student.id, systemId: 'cardiovascular', progressPercent: 85 }
  });

  await prisma.studyProgress.upsert({
    where: { userId_systemId: { userId: student.id, systemId: 'respiratory' } },
    update: { progressPercent: 60 },
    create: { userId: student.id, systemId: 'respiratory', progressPercent: 60 }
  });

  console.log('🎉 MedAnatomy 3D Database Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
