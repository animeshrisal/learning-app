import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/prisma";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        role: true,
      },
      where: {
        id,
      },
    });

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};
