import { Router } from "express";
import {
  enrollToClass,
  getClassroom,
  listClassroom,
} from "../../controller/student/ClassroomController";
import {
  completeLesson,
  getLesson,
  listLessons,
} from "../../controller/student/LessonController";
import { checkJwt } from "../../middleware/checkJwt";

const router: Router = Router();

//Get all classrooms
router.get("/classroom", [checkJwt], listClassroom);

// Get one classroom
router.get("/classroom/:id", [checkJwt], getClassroom);

// Get classroom lessons
router.get("/classroom/:id/lesson", [checkJwt], listLessons);

// Get one lesson
router.get("/classroom/:classroomId/lesson/:id", [checkJwt], getLesson);

// Enroll to class
router.put("/classroom/:id/enroll", [checkJwt], enrollToClass);

// Get classroom lessons
router.put(
  "/classroom/:id/lesson/:lessonId/complete",
  [checkJwt],
  completeLesson
);

export default router;
