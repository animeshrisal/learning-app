import { Router } from "express";
import {
  createClassroom,
  getClassroom,
  listClassroom,
  updateClassroom,
  deleteClassroom,
} from "../../controller/teacher/TeacherController";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

//Get all users
router.get("/classrooms", [checkJwt, checkRole(["TEACHER"])], listClassroom);

// Get one user
router.get("/:id", [checkJwt, checkRole(["TEACHER"])], getClassroom);

//Create a new classroom
router.post("/create", [checkJwt, checkRole(["TEACHER"])], createClassroom);
router.put("/:id/update", [checkJwt, checkRole(["TEACHER"])], updateClassroom);
router.delete(
  "/:id/delete",
  [checkJwt, checkRole(["TEACHER"])],
  deleteClassroom
);

export default router;
