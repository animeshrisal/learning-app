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
import multer, { Multer } from "multer";

const router: Router = Router();
const upload: Multer = multer({ dest: 'uploads/' })

//Get all users
router.get("/classroom", [checkJwt, checkRole(["TEACHER"])], listClassroom);

// Get one user
router.get("/classroom/:id", [checkJwt, checkRole(["TEACHER"])], getClassroom);

//Create a new classroom
router.post("/classroom/create", [checkJwt, upload.single('image'), checkRole(["TEACHER"])], createClassroom);
router.put("/classroom/:id/update", [checkJwt, checkRole(["TEACHER"])], updateClassroom);
router.delete(
  "/:id/delete",
  [checkJwt, checkRole(["TEACHER"])],
  deleteClassroom
);

export default router;
