// I want to create array files and folders of react todo application

export const data2 = [
  {
    type: "folder",
    title: "src",
    children: [
      {
        type: "file",
        title: "App.tsx",
        path: "src/App.tsx",
        extension: "tsx",
        Language: "typescript",
        code: `
import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            My Tasks
          </h1>

          <form onSubmit={addTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
              >
                <PlusCircle size={20} />
                Add
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={\`flex items-center justify-between p-4 rounded-lg \${todo.completed ? 'bg-gray-50' : 'bg-white'}
                border border-gray-200 hover:border-purple-200 transition-colors duration-200\`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={\`focus:outline-none \${todo.completed ? 'text-green-500' : 'text-gray-400'}
                    hover:text-green-600 transition-colors duration-200\`}
                  >
                    {todo.completed ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  </button>
                  <span
                    className={\`flex-1 text-gray-800 \${todo.completed ? 'line-through text-gray-500' : ''}\`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No tasks yet. Add one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
`,
      },
      {
        type: "file",
        title: "index.css",
        path: "src/index.css",
        extension: "css",
        Language: "css",
        code: "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
      },
      {
        type: "file",
        title: "main.tsx",
        path: "src/main.tsx",
        extension: "tsx",
        Language: "tsx",
        code: `import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './App.tsx';
  import './index.css';
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );`,
      },
    ],
  },
  {
    type: "file",
    title: "package.json",
    path: "package.json",
    extension: "json",
    Language: "json",
    code: `{
    "name": "vite-react-typescript-starter",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint .",
      "preview": "vite preview"
    },
    "dependencies": {
      "lucide-react": "^0.344.0",
      "react": "^18.3.1",
      "react-dom": "^18.3.1"
    },
    "devDependencies": {
      "@eslint/js": "^9.9.1",
      "@types/react": "^18.3.5",
      "@types/react-dom": "^18.3.0",
      "@vitejs/plugin-react": "^4.3.1",
      "autoprefixer": "^10.4.18",
      "eslint": "^9.9.1",
      "eslint-plugin-react-hooks": "^5.1.0-rc.0",
      "eslint-plugin-react-refresh": "^0.4.11",
      "globals": "^15.9.0",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.5.3",
      "typescript-eslint": "^8.3.0",
      "vite": "^5.4.2"
    }
  }`,
  },
  {
    type: "file",
    title: "postcss.config.js",
    path: "postcss.config.js",
    extension: "js",
    Language: "javascript",
    code: `export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };`,
  },
  {
    type: "file",
    title: "tailwind.config.js",
    path: "tailwind.config.js",
    extension: "js",
    Language: "javascript",
    code: `/** @type {import('tailwindcss').Config} */
  export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  };`,
  },
  {
    type: "file",
    title: "vite.config.ts",
    path: "vite.config.ts",
    extension: "ts",
    Language: "typescript",
    code: `import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  
  export default defineConfig({
    plugins: [react()],
  });`,
  },
  {
    type: "shell",
    command: "npm run dev",
  },
];

const str =
  "[\n  {\n    \"type\": \"file\",\n    \"title\": \"package.json\",\n    \"path\": \"package.json\",\n    \"extension\": \"json\",\n    \"Language\": \"json\",\n    \"code\": \"{\\n  \\\"name\\\": \\\"react-carousel\\\",\\n  \\\"version\\\": \\\"1.0.0\\\",\\n  \\\"description\\\": \\\"React carousel slider\\\",\\n  \\\"main\\\": \\\"index.js\\\",\\n  \\\"scripts\\\": {\\n    \\\"dev\\\": \\\"vite\\\",\\n    \\\"build\\\": \\\"vite build\\\",\\n    \\\"preview\\\": \\\"vite preview\\\"\\n  },\\n  \\\"dependencies\\\": {\\n    \\\"react\\\": \\\"^18.2.0\\\",\\n    \\\"react-dom\\\": \\\"^18.2.0\\\",\\n    \\\"react-icons\\\": \\\"^4.12.0\\\"\\n  },\\n  \\\"devDependencies\\\": {\\n    \\\"@vitejs/plugin-react\\\": \\\"^4.2.0\\\",\\n    \\\"vite\\\": \\\"^5.0.0\\\"\\n  },\\n  \\\"keywords\\\": [],\\n  \\\"author\\\": \\\"\\\",\\n  \\\"license\\\": \\\"ISC\\\"\\n}\"\n  },\n  {\n    \"type\": \"folder\",\n    \"title\": \"src\",\n    \"children\": [\n      {\n        \"type\": \"file\",\n        \"title\": \"App.jsx\",\n        \"path\": \"src/App.jsx\",\n        \"extension\": \"jsx\",\n        \"Language\": \"javascript\",\n        \"code\": \"import React from 'react';\\nimport Carousel from './components/Carousel';\\n\\nconst App = () => {\\n  const slides = [\\n    {\\n      url: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',\\n      title: 'Beach',\\n    },\\n    {\\n      url: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',\\n      title: 'Mountains',\\n    },\\n    {\\n      url: 'https://images.unsplash.com/photo-1493246572136-6793c88026c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',\\n      title: 'City',\\n    },\\n    {\\n      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',\\n      title: 'Forest',\\n    },\\n  ];\\n\\n  return (\\n    <div className='container mx-auto mt-10'>\\n      <h1 className='text-2xl font-bold mb-4 text-center'>React Carousel Slider</h1>\\n      <Carousel slides={slides} />\\n    </div>\\n  );\\n};\\n\\nexport default App;\"\n      },\n      {\n        \"type\": \"folder\",\n        \"title\": \"components\",\n        \"children\": [\n          {\n            \"type\": \"file\",\n            \"title\": \"Carousel.jsx\",\n            \"path\": \"src/components/Carousel.jsx\",\n            \"extension\": \"jsx\",\n            \"Language\": \"javascript\",\n            \"code\": \"import React, { useState, useEffect } from 'react';\\nimport { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';\\n\\nconst Carousel = ({ slides }) => {\\n  const [currentSlide, setCurrentSlide] = useState(0);\\n\\n  const nextSlide = () => {\\n    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));\\n  };\\n\\n  const prevSlide = () => {\\n    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));\\n  };\\n\\n  useEffect(() => {\\n    const interval = setInterval(() => {\\n      nextSlide();\\n    }, 5000);\\n\\n    return () => clearInterval(interval);\\n  }, []);\\n\\n  return (\\n    <div className='relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg'>\\n      {slides.map((slide, index) => (\\n        <div\\n          key={index}\\n          className={`absolute h-full w-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}\\n        >\\n          <img src={slide.url} alt={slide.title} className='h-full w-full object-cover' />\\n          <div className='absolute bottom-0 left-0 w-full bg-black/50 p-4 text-white'>\\n            <h2 className='text-xl font-bold'>{slide.title}</h2>\\n          </div>\\n        </div>\\n      ))}\\n\\n      <button\\n        onClick={prevSlide}\\n        className='absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70'\\n      >\\n        <MdArrowBackIos size={24} />\\n      </button>\\n      <button\\n        onClick={nextSlide}\\n        className='absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70'\\n      >\\n        <MdArrowForwardIos size={24} />\\n      </button>\\n    </div>\\n  );\\n};\\n\\nexport default Carousel;\"\n          }\n        ]\n      },\n      {\n        \"type\": \"file\",\n        \"title\": \"index.css\",\n        \"path\": \"src/index.css\",\n        \"extension\": \"css\",\n        \"Language\": \"css\",\n        \"code\": \"/* src/index.css */\\n@tailwind base;\\n@tailwind components;\\n@tailwind utilities;\"\n      },\n      {\n        \"type\": \"file\",\n        \"title\": \"main.jsx\",\n        \"path\": \"src/main.jsx\",\n        \"extension\": \"jsx\",\n        \"Language\": \"javascript\",\n        \"code\": \"import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App';\\nimport './index.css';\\n\\nReactDOM.createRoot(document.getElementById('root')).render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);\"\n      }\n    ]\n  },\n  {\n    \"type\": \"file\",\n    \"title\": \"vite.config.js\",\n    \"path\": \"vite.config.js\",\n    \"extension\": \"js\",\n    \"Language\": \"javascript\",\n    \"code\": \"import { defineConfig } from 'vite';\\nimport react from '@vitejs/plugin-react';\\n\\nexport default defineConfig({\\n  plugins: [react()],\\n});\"\n  },\n  {\n    \"type\": \"file\",\n    \"title\": \"postcss.config.js\",\n    \"path\": \"postcss.config.js\",\n    \"extension\": \"js\",\n    \"Language\": \"javascript\",\n    \"code\": \"module.exports = {\\n  plugins: {\\n    tailwindcss: {},\\n    autoprefixer: {},\\n  },\\n}\"\n  },\n  {\n    \"type\": \"file\",\n    \"title\": \"tailwind.config.js\",\n    \"path\": \"tailwind.config.js\",\n    \"extension\": \"js\",\n    \"Language\": \"javascript\",\n    \"code\": \"/** @type {import('tailwindcss').Config} */\\nmodule.exports = {\\n  content: ['./src/**/*.{js,jsx,ts,tsx}'],\\n  theme: {\\n    extend: {},\\n  },\\n  plugins: [],\\n}\"\n  },\n  {\n    \"type\": \"shell\",\n    \"command\": \"npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p\"\n  },\n  {\n    \"type\": \"shell\",\n    \"command\": \"npm run dev\"\n  }\n]";

export const data = JSON.parse(str);
