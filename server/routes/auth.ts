import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middleware/checkJwt";
const multer = require("multer");

const upload = multer();
const router = Router();
//Login route
router.post("/login", upload.none(), AuthController.login);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
