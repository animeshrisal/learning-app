import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { prisma } from "../../prisma/prisma";
import { Classroom } from "@prisma/client";

export const createClassroom = async (req: Request, res: Response) => {
  const { subject, description } = req.body;

  const classroom: Classroom = await prisma.classroom.create({
    data: {
      subject,
      description,
    },
  });

  res.send(classroom);
};

export const listClassroom = async (req: Request, res: Response) => {
  const classrooms: Classroom[] = await prisma.classroom.findMany();
  res.send(classrooms);
};

export const getClassroom = async (req: Request, res: Response) => {
  const id: string = req.params.classroomId;
  const classroom: Classroom = await prisma.classroom.findUnique({
    where: {
      id,
    },
  });
  res.send(classroom);
};

export const updateClassroom = async (req: Request, res: Response) => {
  const { subject, description } = req.body;
  const id: string = req.params.classroomId;
  const classroom: Classroom = await prisma.classroom.update({
    where: {
      id,
    },
    data: {
      subject,
      description,
    },
  });
  res.send(classroom);
};

export const deleteClassroom = async (req: Request, res: Response) => {
  const id: string = req.params.classroomId;
  const classroom: Classroom = await prisma.classroom.delete({
    where: {
      id,
    },
  });
  res.status(204);
};
