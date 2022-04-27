import { Classroom } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/prisma";

export const checkClassroom = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = res.locals.jwtPayload.userId;
    const id: string = req.params.classroomId;

    const count: number = await prisma.classroom.count({
      where: {
        id,
        userId,
      },
    });

    //Check if array of authorized roles includes the user's role
    if (count > 0) next();
    else res.status(401).send({
        "error": "You do not have permission to view this class"
    });
  };
};
