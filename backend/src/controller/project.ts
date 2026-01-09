import { Request, Response } from "express";
import { OpenAI } from "openai";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { SYSTEM_PROMPT } from "../prompts";
import { TreeNode } from "../types/files";
import { addFileToTree, sortTree } from "../util/generate_files.util";

const schema = {
  type: "object",
  properties: {
    step: {
      type: "string",
      enum: ["observe", "plan", "generate_file"],
    },
    content: {
      oneOf: [
        { type: "string" },
        {
          type: "object",
          properties: {
            path: { type: "string" },
            language: { type: "string" },
            code: { type: "string" },
          },
          required: ["path", "language", "code"],
        },
      ],
    },
  },
  required: ["step", "content"],
} as const;

export const createProject = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({
      success: false,
      message: "No prompt provided",
    });
    return;
  }
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  // const openAi = new OpenAI({
  //   apiKey: process.env.GEMINI_API_KEY,
  //   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  // });

  const messages: ChatCompletionCreateParamsBase["messages"] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: JSON.stringify({ step: "user_query", content: prompt }),
    },
  ];

  const rawFiles: TreeNode[] = [];
  let count = 1;
  const MAX_ITERATIONS = 50; // Safety limit

  try {
    while (count <= MAX_ITERATIONS) {
      console.log("iteration: ", count);

      const response = await openAi.chat.completions.create({
        model: "gpt-4.1-mini",
        // model: "gemini-2.5-flash",
        messages: messages,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "StepResponse",
            schema,
          },
        },
      });
      // console.log("response: ", response);

      const rawContent = response.choices[0].message.content;
      if (!rawContent || typeof rawContent !== "string") {
        throw new Error("Invalid agent response");
      }

      // Add assistant response
      messages.push({
        role: "assistant",
        content: rawContent,
      });

      let parseRes;
      try {
        parseRes = JSON.parse(rawContent);
        console.log("parse res: ", parseRes);
      } catch (error) {
        console.log("Exception while parsing llm response");
        console.log("error: ", error);
        break;
      }

      if (typeof parseRes !== "object") {
        throw new Error("Invalid agent response");
      }

      if (parseRes.step === "generate_file") {
        addFileToTree(rawFiles, parseRes.content);
      }

      if (parseRes.step === "output" || parseRes.step === "stop") {
        console.log("rawFiles : ", rawFiles);
        sortTree(rawFiles);
        // didn't work first we need to create user login flow then after that we can do other things
        // await prisma.$transaction(async (tx) => {
        //   const currentTime = new Date();
        //   const files = await Promise.all(
        //     messages.map(async (file) => {
        //       if(file.role === "user") {
        //         return await tx.file_Message.create({
        //           data: {
        //             content: JSON.stringify(file.content),
        //             sender: "User"
        //           },
        //         });
        //       }
        //       return await tx.file_Message.create({
        //         data: {
        //           content: file.content,
        //           step: file.step,
        //         },
        //       });
        //   )
        // });
        res.json({
          success: true,
          message: parseRes.content || "Done!!",
          rawFiles: rawFiles,
        });
        return;
      }

      // ⚠️ CRITICAL FIX: Prompt AI to continue to next step
      // messages.push({
      //   role: "user",
      //   content: "Continue to the next step.",
      // });

      count++;
      // Wait 12 seconds for gemini
      // wait 2 seconds for openai
      // This is to avoid rate limits of respective llm
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Max iterations reached
    res.json({
      success: false,
      message: `Process incomplete after ${MAX_ITERATIONS} iterations. Generated ${rawFiles.length} files so far.`,
      rawFiles: rawFiles,
    });
  } catch (error) {
    console.log("error: ", error);
    res.json({
      success: false,
      error: `${error}`,
      rawFiles: rawFiles, // Return what we have so far
    });
  }
};
