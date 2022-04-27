import { Lesson } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";

export const listLessons = async (req: Request, res: Response) => {
  const classroomId: string = req.params.classroomId;
  const lessons: Lesson[] = await prisma.lesson.findMany({
    where: {
      classroomId: classroomId,
    },
    orderBy: {
      order: "asc",
    },
  });
  res.send(lessons);
};

export const getLesson = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const lesson: Lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });
  res.send(lesson);
};

export const completeLesson = async (req: Request, res: Response) => {
  const lessonId: string = req.params.lessonId;
  const userId = res.locals.jwtPayload.userId;

  await prisma.lesson.update({
    where: {
      id: lessonId,
    },
    data: {
      userLesson: {
        create: [
          {
            user: {
              connect: userId,
            },
            completed: true,
          },
        ],
      },
    },
  });
};
