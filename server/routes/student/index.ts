import { Router } from "express";
import {
    enrollToClass,
  getClassroom,
  listClassroom,
} from "../../controller/student/ClassroomController";
import { checkJwt } from "../../middleware/checkJwt";

const router: Router = Router();

//Get all users
router.get("/classroom", [checkJwt], listClassroom);

// Get one user
router.get("/classroom/:id", [checkJwt], getClassroom);

// Get one user
router.put("/classroom/:id/enroll", [checkJwt], enrollToClass);
