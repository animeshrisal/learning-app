import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { prisma } from "../../prisma/prisma";
import { Classroom, Lesson } from "@prisma/client";

interface MulterRequest extends Request {
  file: any;
}

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
  const classroom: Classroom = await prisma.classroom.findUnique({
    where: {
      id,
    },
  });
  res.send(classroom);
};

export const updateLesson = async (req: Request, res: Response) => {
  const { subject, description, activeStatus } = req.body;
  const id: string = req.params.id;
  const booleanValue = activeStatus === "true" ? true : false;
  const classroom: Classroom = await prisma.classroom.update({
    where: {
      id,
    },
    data: {
      subject,
      description,
      activeStatus: booleanValue,
      image: (req as MulterRequest).file.filename,
    },
  });
  res.send(classroom);
};

export const deleteLesson = async (req: Request, res: Response) => {
  const id: string = req.params.classroomId;
  const classroom: Classroom = await prisma.classroom.delete({
    where: {
      id,
    },
  });
  res.status(204);
};