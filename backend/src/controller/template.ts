import { Request, Response } from "express";
import { OpenAI } from "openai";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { SYSTEM_PROMPT } from "../prompts";

export const templateCreate = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({
      success: false,
      message: "No prompt provided",
    });
    return;
  }

  const openAi = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  const messages: ChatCompletionCreateParamsBase["messages"] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: JSON.stringify({ step: "user_query", content: prompt }),
    },
  ];

  const prompts = [];

  let count = 1;

  try {
    while (true) {
      console.log("iteration: ", count);
      count++;

      const response = await openAi.chat.completions.create({
        model: "gemini-2.5-flash",
        response_format: { type: "json_object" },
        messages: messages,
      });

      console.log("response: ", response);

      const rawContent = response.choices[0].message.content;
      if (!rawContent || typeof rawContent !== "string") {
        throw new Error("Invalid agent response");
      }
      messages.push({
        role: "assistant",
        content: response.choices[0].message.content as string,
      });

      // console.log("messages: ", messages);
      // console.log("before parse res: ", response.choices[0].message);
      const parseRes = JSON.parse(rawContent);
      console.log("parse res: ", parseRes);

      if (typeof parseRes !== "object") {
        throw new Error("Invalid agent response");
      }

      if (parseRes.step === "generate_file") prompts.push(parseRes);

      if (parseRes.step === "output") {
        res.json({
          success: true,
          message: "Done!!",
          prompts: prompts,
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 6000));
    }
  } catch (error) {
    console.log("error: ", error);
    if (error)
      res.json({
        success: false,
        error: `${error}`,
      });
    return;
  }
  console.log("prompts : ", prompts);
  res.json({
    success: false,
    message: "Something went wrong",
  });
};
