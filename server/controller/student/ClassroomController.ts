import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { prisma } from "../../prisma/prisma";
import { Classroom } from "@prisma/client";

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

export const enrollToClass = async (req: Request, res: Response) => {
  const classroomId: string = req.params.classroomId;
  const userId = res.locals.jwtPayload.userId;
  await prisma.classroom.update({
    where: {
      id: classroomId,
    },
    data: {
      enrolledStudents: {
        create: [
          {
            user: {
              connect: userId,
            },
          },
        ],
      },
    },
  });

  return res.status(401);
};
