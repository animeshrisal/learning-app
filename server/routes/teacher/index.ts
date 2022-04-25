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
} from "../../controller/teacher/LessonController";

import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";
import multer, { Multer } from "multer";
import {
  createQuiz,
  getQuiz,
  listQuizzes,
} from "../../controller/teacher/QuizController";

const router: Router = Router();
const upload: Multer = multer({ dest: "uploads/" });

//Get all users
router.get("/classroom", [checkJwt, checkRole(["TEACHER"])], listClassroom);

// Get one user
router.get("/classroom/:id", [checkJwt, checkRole(["TEACHER"])], getClassroom);

//Create a new classroom
router.post(
  "/classroom/create",
  [checkJwt, checkRole(["TEACHER"]), upload.single("image")],
  createClassroom
);
router.put(
  "/classroom/:id/update",
  [checkJwt, checkRole(["TEACHER"]), upload.single("image")],
  updateClassroom
);
router.delete(
  "/:id/delete",
  [checkJwt, checkRole(["TEACHER"])],
  deleteClassroom
);

//Get all users
router.get(
  "/classroom/:classroomId/lesson",
  [checkJwt, checkRole(["TEACHER"])],
  listLessons
);

// Get one user
router.get(
  "/classroom/:classroomId/lesson/:id",
  [checkJwt, checkRole(["TEACHER"])],
  getLesson
);

//Create a new classroom
router.post(
  "/classroom/:classroomId/lesson/create",
  [checkJwt, checkRole(["TEACHER"])],
  createLesson
);
router.put(
  "/classroom/:classroomId/lesson/:id/update",
  [checkJwt, checkRole(["TEACHER"])],
  updateLesson
);
router.delete(
  "/classroom/:classroomId/lesson/:id/delete",
  [checkJwt, checkRole(["TEACHER"])],
  deleteLesson
);

//Get all users
router.get(
  "/classroom/:classroomId/quiz",
  [checkJwt, checkRole(["TEACHER"])],
  listQuizzes
);

// Get one user
router.get(
  "/classroom/:classroomId/quiz/:id",
  [checkJwt, checkRole(["TEACHER"])],
  getQuiz
);

//Create a new classroom
router.post(
  "/classroom/:classroomId/quiz/create",
  [checkJwt, checkRole(["TEACHER"])],
  createQuiz
);

export default router;
