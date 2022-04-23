import { Router } from "express";
import {login, changePassword} from "../controller/AuthController";
import { checkJwt } from "../middleware/checkJwt";
const multer = require("multer");

const upload = multer();
const router = Router();
//Login route
router.post("/login", upload.none(), login);

//Change my password
router.post("/change-password", [checkJwt], changePassword);

export default router;
