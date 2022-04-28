import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./admin";
import teacher from "./teacher";
import student from "./student";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/teacher", teacher);
routes.use("/student", student);

export default routes;