import { Request, Response } from "express";
import { gemini, MessageType, ModelType } from "..";
import { getSystemPrompt } from "../prompts";

export const chat = async (req: Request, res: Response) => {
  const messages: MessageType = req.body.messages;
  const mltiChats = gemini.chats.create({
    model: process.env.GEMINI_MODEL as ModelType,
    history: [
      {
        role: "user",
        parts: [{ text: messages[0].content }],
      },
      {
        role: "user",
        parts: [{ text: messages[0].content }],
      },
    ],
    config: {
      systemInstruction: getSystemPrompt(),
    },
  });

  const response = await mltiChats.sendMessage({
    message: messages[messages.length - 1].content,
    config: {
      systemInstruction: getSystemPrompt(),
    },
  });

  // console.log(response.text);

  res.json({
    success: true,
    response: response.text,
  });
  return;
};
