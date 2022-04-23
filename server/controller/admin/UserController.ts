import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";
import { hashPassword } from "../../helpers/auth";
import { User } from "@prisma/client";
import { UserResponse } from "../../model/UserResponse";

class UserController {
  static listAll = async (req: Request, res: Response) => {
    const users: UserResponse[] = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: string = res.locals.jwtPayload.userId;

    const user: UserResponse = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    res.send(user);
  };

  static newUser = async (req: Request, res: Response) => {
    let { username, password, firstName, lastName, email, role } = req.body;

    try {
      const user: UserResponse = await prisma.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: hashPassword(password),
          role,
        },
      });

      res.send(user);
    } catch (e) {
      res.status(409).send("Username already in use");
      return;
    }
  };
}

export default UserController;
