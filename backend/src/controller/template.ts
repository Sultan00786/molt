import { Request, Response } from "express";
import { gemini, ModelType } from "..";
import { getTempleteSysPrompt } from "../prompts";
import { nextJsPrompt } from "../template/next";
import { nodePrompt } from "../template/node";
import { reactPrompt, stylingBasePrompt } from "../template/react";

export const templateCreate = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({
      success: false,
      message: "No prompt provided",
    });
    return;
  }

  const response = await gemini.models.generateContent({
    model: process.env.GEMINI_MODEL as ModelType,
    contents: prompt,
    config: {
      systemInstruction: getTempleteSysPrompt,
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
  const ans = response.text?.trim().toLowerCase();

  if (ans === "unknown") {
    res.status(400).json({
      success: false,
      message: "You prompt is not related to available programming language",
    });
    return;
  }

  // there is still improvement needed here
  res.json({
    success: true,
    message: "Done!!",
    prompts:
      ans === "reactjs"
        ? { prompt: reactPrompt, uiPrompt: stylingBasePrompt }
        : ans === "nodejs"
        ? { prompt: nodePrompt }
        : { prompt: nextJsPrompt, uiPrompt: stylingBasePrompt },
  });
  return;
};
