import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import config from "../config/config";
import { prisma } from "../prisma/prisma";
import {
  checkIfUnencryptedPasswordIsValid,
  hashPassword,
} from "../helpers/auth";
import { User } from "@prisma/client";

class AuthController {
  static login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    //Get user from database
    let user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    try {
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!checkIfUnencryptedPasswordIsValid(password, user.password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    let user: User = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!checkIfUnencryptedPasswordIsValid(oldPassword, user.password)) {
      res.status(401).send();
      return;
    }

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const password: string = hashPassword(newPassword);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    res.status(204).send();
  };
}
export default AuthController;
