import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { prisma } from "../../prisma/prisma";
import { Classroom, Prisma } from "@prisma/client";
import { UserClassroom } from "../../model/ClasssroomResponse";

export const listClassroom = async (req: Request, res: Response) => {
  const userId = res.locals.jwtPayload.userId;

  const result: UserClassroom = await prisma.$queryRaw(
    Prisma.sql`select
    c.*,
    e."classroomId"  is not null as enrolled
  from
    "Classroom" c
  left join "Enrollment" e on
    e."classroomId"  = c.id
    and e."userId"  = ${userId};
  `
  );
  res.send(result);
};

export const getClassroom = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const classroom: Classroom = await prisma.classroom.findUnique({
    where: {
      id,
    },
    include: {
      enrolledStudents: true,
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
