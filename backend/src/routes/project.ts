import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createProject } from "../controller/project";

export const projectRouter = Router();
projectRouter.use(requireAuth());
projectRouter.post("/createProject", createProject);
