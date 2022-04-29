import { Lesson, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { UserLesson } from "../../model/LessonResponse";
import { prisma } from "../../prisma/prisma";

export const listLessons = async (req: Request, res: Response) => {
  const classroomId: string = req.params.id;
  const userId = res.locals.jwtPayload.userId;

  const result: UserLesson[] = await prisma.$queryRaw(
    Prisma.sql`select
    l.*,
    ul."lessonId" is not null as enrolled
  from
    "Lesson" l
  left join "UserLesson" ul on
    ul."lessonId" = l.id
    and ul."userId" = ${userId} where l."classroomId" = ${classroomId};
  `
  );
  res.send(result);
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
