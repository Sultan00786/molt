import { Router } from "express";
import { chat } from "../controller/chat";
import { requireAuth } from "@clerk/express";

export const chatRouter = Router();
chatRouter.use(requireAuth());
chatRouter.post("/getChatSummery", chat);