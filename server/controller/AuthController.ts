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
import { UserResponse } from "../model/UserResponse";

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const username: string = req.body.username;
  let password: string = req.body.password;
  console.log(req.body);

  if (!(username && password)) {
    res.status(400).send();
  }

  let user: User = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  try {
  } catch (error) {
    res.status(401).send();
  }

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

  const userResponse: UserResponse = await getUserResponse(user);

  res.send({
    ...userResponse,
    token,
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;

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

export const getUserResponse = async (user: User): Promise<UserResponse> => {
  const { password, classroomStudentId, classroomTeacherId, ...userResponse } =
    user;
  return userResponse;
};
