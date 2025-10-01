import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express, { Express } from "express";
import { templateCreate } from "./controller/template";
import { chat } from "./controller/chat";
import cors from "cors";

export type ModelType =
  | "gemini-2.0-flash"
  | "gemini-2.0-flash-lite"
  | "gemini-2.0-flash-8b"
  | "gemini-1.5-flash";

dotenv.config();
const app: Express = express();
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

export type MessageType = { role: string; content: string }[];

export const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/", (req, res) => {
  res.send("Hello World!");
  return;
});

app.post("/template", templateCreate);
app.post("/chat", chat);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port 8000");
});
