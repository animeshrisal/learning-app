import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { prisma } from "../../prisma/prisma";
import { Classroom, Lesson } from "@prisma/client";

export const createLesson = async (req: Request, res: Response) => {
  const { name, description, body } = req.body;

  const classroomId: string = req.params.classroomId;

  const previousLesson = await prisma.lesson.findFirst({
    where: {
      classroomId: classroomId,
    },
    orderBy: {
      order: "desc",
    },
  });

  const lesson: Lesson = await prisma.lesson.create({
    data: {
      name,
      description,
      body,
      classroomId: classroomId,
      order: previousLesson !== null ? previousLesson.order + 1 : 1,
      previousId: previousLesson !== null ? previousLesson.id : null,
    },
  });

  if (previousLesson !== null) {
    await prisma.lesson.update({
      where: {
        id: previousLesson.id,
      },
      data: {
        nextId: lesson.id,
      },
    });
  }
  res.send(lesson);
};

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

export const updateLesson = async (req: Request, res: Response) => {
  const { name, description, body } = req.body;
  const id: string = req.params.id;
  const lesson: Lesson = await prisma.lesson.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      body,
    },
  });
  res.send(lesson);
};

export const updateLessonOrder = async (req: Request, res: Response) => {
  try {
    const { ids }: { ids: string[] } = req.body;

    const updateDataList = ids.map((id, index, arr) =>
      prisma.lesson.update({
        where: { id },
        data: {
          id: id,
          previousId: index !== 0 ? arr[index - 1] : null,
          nextId: index !== arr.length - 1 ? arr[index + 1] : null,
          order: index,
        },
      })
    );

    await prisma.$transaction(updateDataList);

    res.status(200).send({ data: "updated" });
  } catch (e) {
    console.log(e);
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  const id: string = req.params.classroomId;
  await prisma.lesson.delete({
    where: {
      id,
    },
  });
  res.status(204);
};
