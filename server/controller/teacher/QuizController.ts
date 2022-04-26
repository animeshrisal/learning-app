import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import { prisma } from "../../prisma/prisma";
import { Classroom, Lesson, Quiz } from "@prisma/client";

export const createQuiz = async (req: Request, res: Response) => {
  const { name } = req.body;

  const classroomId: string = req.params.classroomId;

  const quiz: Quiz = await prisma.quiz.create({
    data: {
      name,
      classroomId
    },
  });

  res.send(quiz);
};

export const listQuizzes = async (req: Request, res: Response) => {
  const classroomId: string = req.params.classroomId;
  const quizzes: Quiz[] = await prisma.quiz.findMany({
    where: {
      classroomId: classroomId,
    },
  });
  res.send(quizzes);
};

export const getQuiz = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const quiz: Quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
  });
  res.send(quiz);
};

export const setQuizAsActive = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const quiz: Quiz = await prisma.quiz.update({
    where: {
      id,
    },
    data: {
      state: 1
    }
  });
  res.send(quiz);
};

export const setQuizAsArchived = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const quiz: Quiz = await prisma.quiz.update({
    where: {
      id,
    },
    data: {
      state: 2
    }
  });
  res.send(quiz);
};

