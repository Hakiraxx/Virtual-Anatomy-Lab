import { Request, Response } from 'express';
import prisma from '../prisma';

export const getSystems = async (req: Request, res: Response) => {
  try {
    const systems = await prisma.system.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: {
          select: { organs: true, lessons: true, quizzes: true }
        }
      }
    });
    return res.json(systems);
  } catch (error) {
    console.error('getSystems error:', error);
    return res.status(500).json({ error: 'Không thể tải danh sách hệ cơ quan' });
  }
};

export const getSystemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const system = await prisma.system.findUnique({
      where: { id },
      include: {
        organs: {
          include: { structures: true }
        },
        lessons: true
      }
    });

    if (!system) {
      return res.status(404).json({ error: 'Hệ cơ quan không tồn tại' });
    }

    return res.json(system);
  } catch (error) {
    console.error('getSystemById error:', error);
    return res.status(500).json({ error: 'Lỗi khi tải chi tiết hệ cơ quan' });
  }
};

export const getOrgans = async (req: Request, res: Response) => {
  try {
    const { systemId, q } = req.query;

    const whereClause: any = {};
    if (systemId) {
      whereClause.systemId = String(systemId);
    }

    if (q) {
      const searchTerm = String(q).toLowerCase();
      whereClause.OR = [
        { name: { contains: searchTerm } },
        { nameEn: { contains: searchTerm } },
        { nameLatin: { contains: searchTerm } },
        { description: { contains: searchTerm } }
      ];
    }

    const organs = await prisma.organ.findMany({
      where: whereClause,
      include: {
        system: {
          select: { id: true, name: true, nameEn: true, color: true }
        },
        structures: true
      }
    });

    return res.json(organs);
  } catch (error) {
    console.error('getOrgans error:', error);
    return res.status(500).json({ error: 'Không thể tải danh sách cơ quan' });
  }
};

export const getOrganById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const organ = await prisma.organ.findUnique({
      where: { id },
      include: {
        system: true,
        structures: true,
        quizQuestions: true,
        flashcards: true
      }
    });

    if (!organ) {
      return res.status(404).json({ error: 'Cơ quan giải phẫu không tồn tại' });
    }

    return res.json(organ);
  } catch (error) {
    console.error('getOrganById error:', error);
    return res.status(500).json({ error: 'Lỗi khi tải thông tin cơ quan' });
  }
};

export const searchAnatomy = async (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) {
      return res.json({ organs: [], structures: [], systems: [] });
    }

    const [organs, structures, systems] = await Promise.all([
      prisma.organ.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { nameEn: { contains: q } },
            { nameLatin: { contains: q } },
            { description: { contains: q } }
          ]
        },
        include: {
          system: { select: { id: true, name: true, color: true } }
        },
        take: 8
      }),
      prisma.structure.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { nameEn: { contains: q } },
            { nameLatin: { contains: q } }
          ]
        },
        include: {
          organ: { select: { id: true, name: true, nameEn: true, systemId: true } }
        },
        take: 8
      }),
      prisma.system.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { nameEn: { contains: q } },
            { nameLatin: { contains: q } }
          ]
        },
        take: 5
      })
    ]);

    return res.json({ organs, structures, systems });
  } catch (error) {
    console.error('searchAnatomy error:', error);
    return res.status(500).json({ error: 'Lỗi khi tìm kiếm dữ liệu giải phẫu' });
  }
};

export const getStructureById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const structure = await prisma.structure.findUnique({
      where: { id },
      include: {
        organ: {
          include: { system: true }
        }
      }
    });

    if (!structure) {
      return res.status(404).json({ error: 'Cấu trúc giải phẫu không tồn tại' });
    }

    return res.json(structure);
  } catch (error) {
    console.error('getStructureById error:', error);
    return res.status(500).json({ error: 'Lỗi khi tải chi tiết cấu trúc' });
  }
};

export const getStructureChildren = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const structure = await prisma.structure.findUnique({
      where: { id },
      include: { organ: true }
    });

    if (!structure) {
      return res.status(404).json({ error: 'Cấu trúc giải phẫu không tồn tại' });
    }

    // In current relational model, structures are children of Organ or sub-structures
    const children = await prisma.structure.findMany({
      where: { organId: structure.organId }
    });

    return res.json(children.filter(c => c.id !== id));
  } catch (error) {
    console.error('getStructureChildren error:', error);
    return res.status(500).json({ error: 'Lỗi khi tải cấu trúc con' });
  }
};

export const getStructureRelations = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const structure = await prisma.structure.findUnique({
      where: { id },
      include: {
        organ: {
          include: {
            outgoingRel: { include: { toOrgan: true } },
            incomingRel: { include: { fromOrgan: true } }
          }
        }
      }
    });

    if (!structure) {
      return res.status(404).json({ error: 'Cấu trúc không tồn tại' });
    }

    const relations = [
      ...(structure.organ.outgoingRel || []).map(r => ({
        type: r.relationType,
        targetId: r.toOrganId,
        targetName: r.toOrgan.name,
        targetNameEn: r.toOrgan.nameEn,
        description: r.description
      })),
      ...(structure.organ.incomingRel || []).map(r => ({
        type: 'incoming_' + r.relationType,
        targetId: r.fromOrganId,
        targetName: r.fromOrgan.name,
        targetNameEn: r.fromOrgan.nameEn,
        description: r.description
      }))
    ];

    return res.json(relations);
  } catch (error) {
    console.error('getStructureRelations error:', error);
    return res.status(500).json({ error: 'Lỗi khi tải mối quan hệ cấu trúc' });
  }
};

export const getModelsByGender = async (req: Request, res: Response) => {
  const { gender } = req.params;
  const isFemale = gender.toLowerCase() === 'female';

  const models = [
    { systemId: 'body', layer: 1, modelPath: `/models/anatomy/${gender}/body.glb`, label: 'Skin / Whole Body' },
    { systemId: 'muscular', layer: 3, modelPath: `/models/anatomy/${gender}/muscular.glb`, label: 'Muscular System' },
    { systemId: 'skeletal', layer: 4, modelPath: `/models/anatomy/${gender}/skeletal.glb`, label: 'Skeletal System' },
    { systemId: 'cardiovascular', layer: 6, modelPath: `/models/anatomy/${gender}/cardiovascular.glb`, label: 'Cardiovascular' },
    { systemId: 'nervous', layer: 7, modelPath: `/models/anatomy/${gender}/nervous.glb`, label: 'Nervous System' },
    { systemId: 'respiratory', layer: 5, modelPath: `/models/anatomy/${gender}/respiratory.glb`, label: 'Respiratory System' },
    { systemId: 'digestive', layer: 5, modelPath: `/models/anatomy/${gender}/digestive.glb`, label: 'Digestive System' },
    { systemId: 'urinary', layer: 5, modelPath: `/models/anatomy/${gender}/urinary.glb`, label: 'Urinary System' },
    { systemId: 'endocrine', layer: 8, modelPath: `/models/anatomy/${gender}/endocrine.glb`, label: 'Endocrine System' },
    {
      systemId: 'reproductive',
      layer: 5,
      modelPath: `/models/anatomy/${gender}/reproductive.glb`,
      label: isFemale ? 'Female Reproductive (Uterus, Ovaries)' : 'Male Reproductive (Testes, Penis)'
    }
  ];

  return res.json({ gender, models });
};

export const getModelsByGenderAndSystem = async (req: Request, res: Response) => {
  const { gender, system } = req.params;
  const modelPath = `/models/anatomy/${gender}/${system}.glb`;
  return res.json({ gender, system, modelPath });
};
