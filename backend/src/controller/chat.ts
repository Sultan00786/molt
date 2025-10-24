import { Request, Response } from "express";
import { gemini } from "..";
import { getSystemPrompt } from "../prompts";
import { MessageType, ModelType } from "../types/llm";

export const chat = async (req: Request, res: Response) => {
  const messages: MessageType = JSON.parse(req.body.messages);
  const mltiChats = gemini.chats.create({
    model: process.env.GEMINI_MODEL as ModelType,
    history: [
      {
        role: "user",
        parts: [{ text: messages[0].content }],
      },
      {
        role: "user",
        parts: [{ text: messages[1].content }],
      },
    ],
  });

  const response = await mltiChats.sendMessage({
    message: messages[messages.length - 1].content,
    config: {
      systemInstruction: getSystemPrompt(),
      responseMimeType: "application/json",
    },
  });

  if (!response) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, LLM is not responding",
    });
    return;
  }

  if (!response.text) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, LLM is not responding",
    });
    return;
  }

  const strResponse = response.text;
  res.json({
    success: true,
    response: JSON.parse(strResponse),
  });
  return;
};
