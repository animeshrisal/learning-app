import { Request, Response } from "express";

import { prisma } from "../../prisma/prisma";
import { Prisma } from "@prisma/client";
import { UserClassroom } from "../../model/ClasssroomResponse";

export const listClassroom = async (req: Request, res: Response) => {
  const userId = res.locals.jwtPayload.userId;

  const result: UserClassroom[] = await prisma.$queryRaw(
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
  const result: UserClassroom = await prisma.$queryRaw(
    Prisma.sql`select
    c.*,
    e."classroomId"  is not null as enrolled
  from
    "Classroom" c
  left join "Enrollment" e on
    e."classroomId"  = c.id
	where e."classroomId" = ${id}
  `
  );

  res.send(result[0]);
};

export const enrollToClass = async (req: Request, res: Response) => {
  const classroomId: string = req.params.id;
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
              connect: { id: userId },
            },
          },
        ],
      },
    },
  });

  return res.status(204);
};
