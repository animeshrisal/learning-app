import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { prisma } from "../../prisma/prisma";
import { Classroom } from "@prisma/client";

interface MulterRequest extends Request {
  file: any;
}

export const createClassroom = async (req: Request, res: Response) => {
  const { subject, description, image, activeStatus } = req.body;
  const userId = res.locals.jwtPayload.userId;
  console.log(req.body);
  console.log((req as MulterRequest).file);

  const booleanValue = activeStatus === 'true' ? true : false;

  const classroom: Classroom = await prisma.classroom.create({
    data: {
      subject,
      description,
      activeStatus: booleanValue,
      image: (req as MulterRequest).file.filename,
      userId,
    },
  });

  res.send(classroom);
};

export const listClassroom = async (req: Request, res: Response) => {
  const classrooms: Classroom[] = await prisma.classroom.findMany();
  res.send(classrooms);
};

export const getClassroom = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const classroom: Classroom = await prisma.classroom.findUnique({
    where: {
      id,
    },
  });
  res.send(classroom);
};

export const updateClassroom = async (req: Request, res: Response) => {
  const { subject, description, activeStatus } = req.body;
  const id: string = req.params.id;
  console.log(req.body)
  const booleanValue = activeStatus === 'true' ? true : false;
  const classroom: Classroom = await prisma.classroom.update({
    where: {
      id
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

export const deleteClassroom = async (req: Request, res: Response) => {
  const id: string = req.params.classroomId;
  const classroom: Classroom = await prisma.classroom.delete({
    where: {
      id,
    },
  });
  res.status(204);
};

