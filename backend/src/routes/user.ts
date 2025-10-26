import { Router } from "express";
import { requireAuth } from "@clerk/express";

export const userRouter = Router();



userRouter.use(requireAuth());
