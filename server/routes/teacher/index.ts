import { Router } from "express";
import {
  createClassroom,
  getClassroom,
  listClassroom,
  updateClassroom,
  deleteClassroom,
} from "../../controller/teacher/ClassroomController";

import {
} from "../../controller/teacher/LessonController";

import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";
import multer, { Multer } from "multer";

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
router.get("/classroom/:id/lesson", [checkJwt, checkRole(["TEACHER"])], );

// Get one user
router.get("/classroom/:id/lesson/:id", [checkJwt, checkRole(["TEACHER"])], getClassroom);

//Create a new classroom
router.post(
  "/classroom/:id/lesson/create",
  [checkJwt, checkRole(["TEACHER"]), upload.single("image")],
  createClassroom
);
router.put(
  "/classroom/:id/lesson/:id/update",
  [checkJwt, checkRole(["TEACHER"]), upload.single("image")],
  updateClassroom
);
router.delete(
  "/classroom/:id/lesson/:id/delete",
  [checkJwt, checkRole(["TEACHER"])],
  deleteClassroom
);

export default router;
