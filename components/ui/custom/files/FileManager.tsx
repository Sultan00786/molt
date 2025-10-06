import { ChatItem } from "@/types/prompt";
import React from "react";
import { RenderFilesv } from "./RenderFiles";

function FileManager() {
  const files: ChatItem[] = [
    {
      type: "folder",
      title: "src",
      children: [
        {
          type: "file",
          title: "App.tsx",
          path: "/src/App.tsx",
          extension: "tsx",
          language: "typescript",
          code: `import React from 'react';
  import { Header } from './components/Header';
  import { Footer } from './components/Footer';
  
  const App = () => {
    return (
      <div className="app-container">
        <Header />
        <main>
          <h1>Hello World</h1>
        </main>
        <Footer />
      </div>
    );
  };
  
  export default App;`,
        },
        {
          type: "file",
          title: "main.tsx",
          path: "/src/main.tsx",
          extension: "tsx",
          language: "typescript",
          code: `import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import './index.css';
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`,
        },
        {
          type: "folder",
          title: "components",
          children: [
            {
              type: "file",
              title: "Header.tsx",
              path: "/src/components/Header.tsx",
              extension: "tsx",
              language: "typescript",
              code: `import React from 'react';
  
  export const Header = () => {
    return (
      <header className="header">
        <h2>My App</h2>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
        </nav>
      </header>
    );
  };`,
            },
            {
              type: "file",
              title: "Footer.tsx",
              path: "/src/components/Footer.tsx",
              extension: "tsx",
              language: "typescript",
              code: `import React from 'react';
  
  export const Footer = () => {
    return (
      <footer className="footer">
        <p>© 2025 My App. All rights reserved.</p>
      </footer>
    );
  };`,
            },
          ],
        },
        {
          type: "folder",
          title: "utils",
          children: [
            {
              type: "file",
              title: "fetchData.ts",
              path: "/src/utils/fetchData.ts",
              extension: "ts",
              language: "typescript",
              code: `export const fetchData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  };`,
            },
            {
              type: "file",
              title: "formatDate.ts",
              path: "/src/utils/formatDate.ts",
              extension: "ts",
              language: "typescript",
              code: `export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };`,
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      title: "public",
      children: [
        {
          type: "file",
          title: "index.html",
          path: "/public/index.html",
          extension: "html",
          language: "html",
          code: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My React App</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`,
        },
        {
          type: "file",
          title: "favicon.ico",
          path: "/public/favicon.ico",
          extension: "ico",
          language: "binary",
          code: "",
        },
      ],
    },
    {
      type: "file",
      title: "package.json",
      path: "/package.json",
      extension: "json",
      language: "json",
      code: `{
    "name": "my-react-app",
    "version": "1.0.0",
    "private": true,
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.3.0",
      "react-dom": "^18.3.0"
    },
    "devDependencies": {
      "typescript": "^5.4.0",
      "vite": "^5.0.0"
    }
  }`,
    },
    {
      type: "file",
      title: "tsconfig.json",
      path: "/tsconfig.json",
      extension: "json",
      language: "json",
      code: `{
    "compilerOptions": {
      "target": "ESNext",
      "useDefineForClassFields": true,
      "lib": ["DOM", "DOM.Iterable", "ESNext"],
      "allowJs": false,
      "skipLibCheck": true,
      "esModuleInterop": false,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx"
    },
    "include": ["src"]
  }`,
    },
    {
      type: "file",
      title: "vite.config.ts",
      path: "/vite.config.ts",
      extension: "ts",
      language: "typescript",
      code: `import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  
  export default defineConfig({
    plugins: [react()],
  });`,
    },
  ];

  return (
    <div className="w-[30%] border-r-1 bg-richblack-900 border-richblack-800 ">
      <div className="w-full h-8 bg-richblack-900 border-b-1 border-richblack-800"></div>
      <div className="wfull h-full">
        <RenderFilesv files={files} spacing={0} />
      </div>
    </div>
  );
}

export default FileManager;
