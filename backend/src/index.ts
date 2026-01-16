import { clerkMiddleware } from "@clerk/express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { clerkWebhook } from "./controller/auth";
import { chatRouter } from "./routes/chat";
import { projectRouter } from "./routes/project";

dotenv.config();
const app: Express = express();
app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhook
);
app.use(express.json());

// const corpsOption = {
//   origin: ["http://localhost:3000"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Accept",
//     "Origin",
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Credentials",
//   ],
// };

app.use(cors());
app.use(clerkMiddleware());

export const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/", (req, res) => {
  res.send("Hello World!");
  return;
});

app.use("/project", projectRouter);
app.use("/chat", chatRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port 8000");
});
