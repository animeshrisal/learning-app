import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./admin";
import teacher from "./teacher";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/teacher", teacher);

export default routes;