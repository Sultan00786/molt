import { Request, Response } from "express";
import { gemini, ModelType } from "..";
import { getTempleteSysPrompt, SYSTEM_PROMPT } from "../prompts";
import { nextJsPrompt } from "../template/next";
import { nodePrompt } from "../template/node";
import { reactPrompt, stylingBasePrompt } from "../template/react";
import { OpenAI } from "openai";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

export const templateCreate = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({
      success: false,
      message: "No prompt provided",
    });
    return;
  }

  // const response = await gemini.models.generateContent({
  //   model: process.env.GEMINI_MODEL as ModelType,
  //   contents: prompt,
  //   config: {
  //     systemInstruction: getTempleteSysPrompt,
  //     // responseMimeType: "application/json",
  //   },
  // });

  // if (!response) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Something went wrong, LLM is not responding",
  //   });
  //   return;
  // }
  // if (!response.text) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Something went wrong, LLM is not responding",
  //   });
  //   return;
  // }
  // const ans = response.text?.trim().toLowerCase();

  // if (ans === "unknown") {
  //   res.status(400).json({
  //     success: false,
  //     message: "You prompt is not related to available programming language",
  //   });
  //   return;
  // }

  // there is still improvement needed here
  // res.json({
  //   success: true,
  //   message: "Done!!",
  //   prompts:
  //     ans === "reactjs"
  //       ? { prompt: reactPrompt, uiPrompt: stylingBasePrompt }
  //       : ans === "nodejs"
  //       ? { prompt: nodePrompt }
  //       : { prompt: nextJsPrompt, uiPrompt: stylingBasePrompt },
  // });
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
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "plan",
    //     content:
    //       "User wants to create a weather and time display app using React. I will initialize a new React project using Vite and then create components to display the weather and time.",
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "generate",
    //     content: {
    //       path: "package.json",
    //       language: "json",
    //       code: '{\n  "name": "todo-app",\n  "private": true,\n  "version": "0.0.1",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.3.1",\n    "react-dom": "^18.3.1"\n  },\n  "devDependencies": {\n    "vite": "^5.4.0",\n    "@vitejs/plugin-react": "^4.3.0",\n    "tailwindcss": "^3.4.0",\n    "postcss": "^8.4.0",\n    "autoprefixer": "^10.4.0",\n    "typescript": "^5.5.0"\n  }\n}',
    //     },
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     path: "tailwind.config.js",
    //     language: "javascript",
    //     code: "export default {\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};",
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     path: "postcss.config.js",
    //     language: "javascript",
    //     code: "export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};",
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "generate",
    //     content: {
    //       path: "src/index.css",
    //       language: "css",
    //       code: "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
    //     },
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     path: "src/main.tsx",
    //     language: "typescript",
    //     code: "import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);",
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "observe",
    //     content: "Base project structure initialized with Vite + Tailwind.",
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "plan",
    //     content:
    //       "Now I will add the core application logic. I'll create `App.tsx` to host the main layout, and two new components: `TimeDisplay.tsx` for displaying the current time and `WeatherDisplay.tsx` for fetching and showing weather data from a public API. I will use OpenWeatherMap as the weather API and include instructions for obtaining an API key.",
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "generate",
    //     content: {
    //       path: "src/App.tsx",
    //       language: "typescript",
    //       code: "import React from 'react';\nimport TimeDisplay from './components/TimeDisplay';\nimport WeatherDisplay from './components/WeatherDisplay';\n\nfunction App() {\n  return (\n    <div className=\"min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10 px-4 flex items-center justify-center\">\n      <div className=\"max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8 md:p-12 flex flex-col items-center space-y-8\">\n        <h1 className=\"text-4xl font-extrabold text-gray-800 text-center mb-6\">\n          Your Local Info Dashboard\n        </h1>\n        <TimeDisplay />\n        <WeatherDisplay />\n      </div>\n    </div>\n  );\n}\n\nexport default App;\n",
    //     },
    //   }),
    // },
  ];

  const prompts = [];

  while (true) {
    let count = 1;
    console.log("iteration: ", count);
    count++;
    
    const response = await openAi.chat.completions.create({
      model: "gemini-2.5-flash",
      response_format: { type: "json_object" },
      messages: messages,
    });

    messages.push({
      role: "assistant",
      content: response.choices[0].message.content as string,
    });

    // console.log("messages: ", messages);
    console.log("before parse res: ", response.choices[0].message);
    const parseRes = JSON.parse(response.choices[0].message.content as string);
    console.log("parse res: ", parseRes);

    if (parseRes.step === "generate") prompts.push(parseRes);

    if (parseRes.step === "output") {
      break;
    }
  }

  res.json({
    success: true,
    message: "Done!!",
    prompts: prompts,
  });
  return;
};
