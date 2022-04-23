import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";
import { hashPassword } from "../../helpers/auth";

class UserController {
  static listAll = async (req: Request, res: Response) => {

    const users = await prisma.user.findMany({
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

    const user = await prisma.user.findUnique({
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
      await prisma.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: hashPassword(password),
          role
        },
      });
    } catch (e) {
      res.status(409).send("Username already in use");
      return;
    }

    res.status(201).send("User created");
  };
}

export default UserController;
