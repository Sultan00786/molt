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
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "generate",
    //     content: {
    //       path: "src/components/TimeDisplay.tsx",
    //       language: "typescript",
    //       code: "import React, { useState, useEffect } from 'react';\n\nconst TimeDisplay: React.FC = () => {\n  const [currentTime, setCurrentTime] = useState(new Date());\n\n  useEffect(() => {\n    const timerId = setInterval(() => {\n      setCurrentTime(new Date());\n    }, 1000);\n\n    return () => clearInterval(timerId);\n  }, []);\n\n  const formatTime = (date: Date) => {\n    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });\n  };\n\n  const formatDate = (date: Date) => {\n    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });\n  };\n\n  return (\n    <div className=\"text-center bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md\">\n      <p className=\"text-5xl font-bold text-gray-900 mb-2 tracking-tight\">\n        {formatTime(currentTime)}\n      </p>\n      <p className=\"text-xl text-gray-600 font-medium\">\n        {formatDate(currentTime)}\n      </p>\n    </div>\n  );\n};\n\nexport default TimeDisplay;\n",
    //     },
    //   }),
    // },
    // {
    //   role: "assistant",
    //   content: JSON.stringify({
    //     step: "generate",
    //     content: {
    //       path: "src/components/WeatherDisplay.tsx",
    //       language: "typescript",
    //       code: 'import React, { useState, useEffect } from \'react\';\n\ninterface WeatherData {\n  name: string;\n  main: { temp: number; feels_like: number; humidity: number };\n  weather: [{ description: string; icon: string }];\n  wind: { speed: number };\n}\n\nconst API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || \'YOUR_OPENWEATHER_API_KEY\'; // Replace with your actual API key\nconst DEFAULT_CITY = \'London\'; // Default city, you can change this\n\nconst WeatherDisplay: React.FC = () => {\n  const [weather, setWeather] = useState<WeatherData | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);\n\n  useEffect(() => {\n    if (API_KEY === \'YOUR_OPENWEATHER_API_KEY\') {\n      setError(\'Please obtain an OpenWeatherMap API key and set it in src/components/WeatherDisplay.tsx or as a VITE_OPENWEATHER_API_KEY environment variable.\');\n      setLoading(false);\n      return;\n    }\n\n    const fetchWeather = async () => {\n      try {\n        setLoading(true);\n        setError(null);\n        const response = await fetch(\n          `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&appid=${API_KEY}&units=metric`\n        );\n        if (!response.ok) {\n          if (response.status === 401) {\n            throw new Error(\'Invalid API Key. Please check your OpenWeatherMap API key.\');\n          } else if (response.status === 404) {\n            throw new Error(`City not found: ${DEFAULT_CITY}`);\n          } else {\n            throw new Error(`Failed to fetch weather data: ${response.statusText}`);\n          }\n        }\n        const data: WeatherData = await response.json();\n        setWeather(data);\n      } catch (err: any) {\n        console.error("Weather fetch error:", err);\n        setError(err.message || \'An unknown error occurred while fetching weather.\');\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchWeather();\n  }, []);\n\n  if (loading) {\n    return (\n      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">\n        <p className="text-lg text-gray-700">Loading weather data...</p>\n      </div>\n    );\n  }\n\n  if (error) {\n    return (\n      <div className="w-full max-w-md bg-red-50 border border-red-200 p-6 rounded-lg shadow-md text-center">\n        <p className="text-lg text-red-700 font-semibold">Error:</p>\n        <p className="text-md text-red-600">{error}</p>\n        <p className="text-sm text-red-500 mt-2">Please ensure you have a valid OpenWeatherMap API key and that the city is correctly spelled.</p>\n      </div>\n    );\n  }\n\n  if (!weather) {\n    return (\n      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">\n        <p className="text-lg text-gray-700">No weather data available.</p>\n      </div>\n    );\n  }\n\n  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;\n\n  return (\n    <div className="text-center bg-blue-50 p-6 rounded-lg shadow-md w-full max-w-md">\n      <h2 className="text-3xl font-bold text-blue-800 mb-4">Weather in {weather.name}</h2>\n      <div className="flex items-center justify-center mb-4">\n        <img src={weatherIconUrl} alt={weather.weather[0].description} className="w-20 h-20" />\n        <p className="text-6xl font-extrabold text-blue-900 ml-4">{Math.round(weather.main.temp)}°C</p>\n      </div>\n      <p className="text-xl text-blue-700 capitalize mb-2">{weather.weather[0].description}</p>\n      <div className="grid grid-cols-2 gap-4 text-left mt-4">\n        <p className="text-lg text-gray-700"><span className="font-semibold">Feels like:</span> {Math.round(weather.main.feels_like)}°C</p>\n        <p className="text-lg text-gray-700"><span className="font-semibold">Humidity:</span> {weather.main.humidity}%</p>\n        <p className="text-lg text-gray-700"><span className="font-semibold">Wind:</span> {weather.wind.speed} m/s</p>\n      </div>\n      <p className="text-sm text-gray-500 mt-6">\n        Weather data provided by OpenWeatherMap. Get your API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">openweathermap.org/api</a>.\n      </p>\n    </div>\n  );\n};\n\nexport default WeatherDisplay;\n',
    //     },
    //   }),
    // },
  ];

  const prompts = [];

  while (true) {
    try {
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
      const parseRes = JSON.parse(
        response.choices[0].message.content as string
      );
      console.log("parse res: ", parseRes);

      if (parseRes.step === "generate_file") prompts.push(parseRes);

      if (parseRes.step === "output") {
        break;
      }
    } catch (error) {
      console.log("error: ", error);
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
