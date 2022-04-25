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
      classroomId,
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
      classroomId,
      order: 1,
      previousId: previousLesson.id,
    },
  });

  await prisma.lesson.update({
    where: {
      classroomId
    },
    data: {
      nextId: lesson.classroomId,
    },
  });

  res.send(lesson);
};

export const listLessons = async (req: Request, res: Response) => {
  const classrooms: Classroom[] = await prisma.classroom.findMany();
  res.send(classrooms);
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
  console.log(req.body);
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
