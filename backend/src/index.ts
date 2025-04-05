import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express, { Express } from "express";
import { templateCreate } from "./controller/template";
import { chat } from "./controller/chat";

dotenv.config();
const app: Express = express();
app.use(express.json());

export type ModelType =
  | "gemini-2.0-flash"
  | "gemini-2.0-flash-lite"
  | "gemini-2.0-flash-8b"
  | "gemini-1.5-flash";

export type MessageType = { role: string; content: string }[];

export const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/", (req, res) => {
  res.send("Hello World!");
  return;
});

app.post("/template", templateCreate);
app.post("/chat", chat);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
