import { Router } from "express";
import {
  createClassroom,
  getClassroom,
  listClassroom,
  updateClassroom,
  deleteClassroom,
} from "../../controller/teacher/ClassroomController";

import {
  createLesson,
  deleteLesson,
  getLesson,
  listLessons,
  updateLesson,
  updateLessonOrder,
} from "../../controller/teacher/LessonController";

import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";
import multer, { Multer } from "multer";
import {
  createQuiz,
  getQuiz,
  listQuizzes,
  setQuizAsActive,
  setQuizAsArchived,
} from "../../controller/teacher/QuizController";
import {
  createQuestion,
  getQuestion,
  listQuestions,
} from "../../controller/teacher/QuestionController";
import { checkClassroom } from "../../middleware/checkClass";
import * as path from 'path';

const router: Router = Router();

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

const upload: Multer = multer({
  storage: storage
});


//Get all users
router.get(
  "/classroom",
  [checkJwt, checkRole(["TEACHER"])],
  listClassroom
);

// Get one user
router.get(
  "/classroom/:id",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  getClassroom
);

//Create a new classroom
router.post(
  "/classroom/create",
  [checkJwt, checkRole(["TEACHER"]), upload.single("image")],
  createClassroom
);
router.put(
  "/classroom/:id/update",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"]), upload.single("image")],
  updateClassroom
);
router.delete(
  "/:id/delete",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  deleteClassroom
);

//Get all users
router.get(
  "/classroom/:classroomId/lesson",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  listLessons
);

// Get one user
router.get(
  "/classroom/:classroomId/lesson/:id",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  getLesson
);

//Create a new classroom
router.post(
  "/classroom/:classroomId/lesson/create",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  createLesson
);
router.put(
  "/classroom/:classroomId/lesson/:id/update",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  updateLesson
);
router.delete(
  "/classroom/:classroomId/lesson/:id/delete",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  deleteLesson
);

//Get all users
router.get(
  "/classroom/:classroomId/quiz",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  listQuizzes
);

// Get one user
router.get(
  "/classroom/:classroomId/quiz/:quizId",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  getQuiz
);

//Create a new classroom
router.post(
  "/classroom/:classroomId/quiz/create",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  createQuiz
);

//Create a new classroom
router.put(
  "/classroom/:classroomId/quiz/:quizId/active",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  setQuizAsActive
);

//Create a new classroom
router.put(
  "/classroom/:classroomId/quiz/:quizId/archive",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  setQuizAsArchived
);

//Get all users
router.get(
  "/classroom/:classroomId/quiz/:quizId/question",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  listQuestions
);

// Get one user
router.get(
  "/classroom/:classroomId/quiz/:quizId/question/:questionId",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  getQuestion
);

//Create a new classroom
router.post(
  "/classroom/:classroomId/quiz/:quizId/create",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  createQuestion
);

//Get all users
router.put(
  "/classroom/:classroomId/lesson/update_lesson_order",
  [checkJwt, checkClassroom(), checkRole(["TEACHER"])],
  updateLessonOrder
);



export default router;
