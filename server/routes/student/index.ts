import { Router } from "express";
import {
    enrollToClass,
  getClassroom,
  listClassroom,
} from "../../controller/student/ClassroomController";
import { getLesson, listLessons } from "../../controller/student/LessonController";
import { checkJwt } from "../../middleware/checkJwt";

const router: Router = Router();

//Get all users
router.get("/classroom", [checkJwt], listClassroom);

// Get one user
router.get("/classroom/:id", [checkJwt], getClassroom);

// Get one user
router.get("/classroom/:id/lesson", [checkJwt], listLessons);

// Get one lesson
router.get("/classroom/:id/lesson/:id", [checkJwt], getLesson);

// Get one user
router.put("/classroom/:id/enroll", [checkJwt], enrollToClass);

export default router;