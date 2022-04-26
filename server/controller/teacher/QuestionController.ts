import { Request, Response } from "express";

import { prisma } from "../../prisma/prisma";
import { Question, Quiz } from "@prisma/client";

export const createQuestion = async (req: Request, res: Response) => {
  const {
    question,
    firstChoice,
    secondChoice,
    thirdChoice,
    fourthChoice,
    correctChoice,
  } = req.body;

  const classroomId: string = req.params.classroomId;
  const quizId: string = req.params.quizId;

  const previousQuestion = await prisma.question.findFirst({
    where: {
      quizId: quizId,
    },
    orderBy: {
      order: "desc",
    },
  });

  const newQuestion: Question = await prisma.question.create({
    data: {
      question,
      firstChoice,
      secondChoice,
      thirdChoice,
      fourthChoice,
      correctChoice,
      quizId,
      order: previousQuestion !== null ? previousQuestion.order + 1 : 1,
    },
  });

  if (previousQuestion !== null) {
    await prisma.lesson.update({
      where: {
        id: previousQuestion.id,
      },
      data: {
        nextId: newQuestion.id,
      },
    });
  }
  res.send(newQuestion);
};

export const listQuestions = async (req: Request, res: Response) => {
  const quizId: string = req.params.quizId;
  const questions: Question[] = await prisma.question.findMany({
    where: {
      quizId: quizId,
    },
  });
  res.send(questions);
};

export const getQuestion = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const question: Question = await prisma.question.findUnique({
    where: {
      id,
    },
  });
  res.send(question);
};
