import { ChatItem } from "@/types/prompt";

export const files: ChatItem[] = [
  {
    type: "file",
    title: "package.json",
    extension: "json",
    language: "json",
    path: "package.json",
    code: `{
"name": "code-editor-app",
"private": true,
"version": "0.0.1",
"type": "module",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
},
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.5.0",
  "vite": "^5.4.0"
}
}`,
  },
  {
    type: "file",
    title: "vite.config.ts",
    extension: "ts",
    language: "typescript",
    path: "vite.config.ts",
    code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()]
});
`,
  },
  {
    type: "file",
    title: "tsconfig.json",
    extension: "json",
    language: "json",
    path: "tsconfig.json",
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
"include": ["src"],
"references": [{"path": "./tsconfig.node.json"}]
}
`,
  },
  {
    type: "file",
    title: "tsconfig.node.json",
    extension: "json",
    language: "json",
    path: "tsconfig.node.json",
    code: `{
"compilerOptions": {
  "composite": true,
  "module": "ESNext",
  "moduleResolution": "Node",
  "target": "ESNext"
},
"include": ["vite.config.ts"]
}
`,
  },
  {
    type: "file",
    title: "tailwind.config.js",
    extension: "js",
    language: "javascript",
    path: "tailwind.config.js",
    code: `/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
theme: {
  extend: {}
},
plugins: []
};
`,
  },
  {
    type: "file",
    title: "postcss.config.js",
    extension: "js",
    language: "javascript",
    path: "postcss.config.js",
    code: `module.exports = {
plugins: {
  tailwindcss: {},
  autoprefixer: {}
}
};
`,
  },
  {
    type: "folder",
    title: "src",
    children: [
      {
        type: "file",
        title: "index.css",
        extension: "css",
        language: "css",
        path: "src/index.css",
        code: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
      },
      {
        type: "file",
        title: "main.tsx",
        extension: "tsx",
        language: "typescript",
        path: "src/main.tsx",
        code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<React.StrictMode>
  <App />
</React.StrictMode>
);
`,
      },
      {
        type: "folder",
        title: "components",
        children: [
          {
            type: "file",
            title: "FileManager.tsx",
            extension: "tsx",
            language: "typescript",
            path: "src/components/FileManager.tsx",
            code: `import React, { useState } from 'react';

export interface FileNode {
id: string;
name: string;
type: 'file' | 'folder';
children?: FileNode[];
}

interface FileManagerProps {
files: FileNode[];
selectedFileId: string | null;
onSelectFile: (id: string) => void;
}

const FileNodeComponent: React.FC<{ node: FileNode; level: number; onSelectFile: (id: string) => void; selectedFileId: string | null }> = ({ node, level, onSelectFile, selectedFileId }) => {
const [expanded, setExpanded] = useState(false);

const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

return (
  <div style={{ paddingLeft: level * 16 }}>
    {hasChildren ? (
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? 'Collapse folder' : 'Expand folder'}
        className="mr-1"
        >
        {expanded ? '📂' : '📁'}
      </button>
    ) : <span className="mr-4">📄</span>}
    <button
      onClick={() => node.type === 'file' && onSelectFile(node.id)}
      className={\`text-left w-full truncate \${selectedFileId === node.id ? 'font-bold underline' : 'hover:underline'}\`}
    >
      {node.name}
    </button>
    {expanded && hasChildren && (
      <div>
        {node.children!.map(child => (
          <FileNodeComponent key={child.id} node={child} level={level + 1} onSelectFile={onSelectFile} selectedFileId={selectedFileId} />
        ))}
      </div>
    )}
  </div>
);
};

const FileManager: React.FC<FileManagerProps> = ({ files, selectedFileId, onSelectFile }) => {
return (
  <div className="p-2 overflow-y-auto h-full border-r border-gray-300">
    {files.map(file => (
      <FileNodeComponent key={file.id} node={file} level={0} onSelectFile={onSelectFile} selectedFileId={selectedFileId} />
    ))}
  </div>
);
};

export default FileManager;
`,
          },
          {
            type: "file",
            title: "CodeEditor.tsx",
            extension: "tsx",
            language: "typescript",
            path: "src/components/CodeEditor.tsx",
            code: `import React, { useEffect, useRef } from 'react';

interface CodeEditorProps {
code: string;
language?: string;
onChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language = 'javascript', onChange }) => {
const textareaRef = useRef<HTMLTextAreaElement>(null);

useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.value = code;
  }
}, [code]);

return (
  <textarea
    ref={textareaRef}
    className="w-full h-full p-2 font-mono text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring focus:ring-blue-400"
    spellCheck={false}
    onChange={e => onChange(e.target.value)}
    aria-label="Code editor"
  />
);
};

export default CodeEditor;
`,
          },
        ],
      },
      {
        type: "file",
        title: "App.tsx",
        extension: "tsx",
        language: "typescript",
        path: "src/App.tsx",
        code: `import React, { useState } from 'react';
import FileManager, { FileNode } from './components/FileManager';
import CodeEditor from './components/CodeEditor';

const initialFiles: FileNode[] = [
{
  id: '1',
  name: 'src',
  type: 'folder',
  children: [
    {
      id: '2',
      name: 'index.tsx',
      type: 'file'
    },
    {
      id: '3',
      name: 'App.tsx',
      type: 'file'
    }
  ]
},
{
  id: '4',
  name: 'package.json',
  type: 'file'
}
];

const initialFileContents: Record<string, string> = {
'2': "import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App';\\n\\nReactDOM.createRoot(document.getElementById('root')!).render(<App />);",
'3': "import React from 'react';\\n\\nfunction App() {\\n  return <div>Hello from App</div>;\\n}\\n\\nexport default App;"
};

function App() {
const [files] = useState<FileNode[]>(initialFiles);
const [selectedFileId, setSelectedFileId] = useState<string | null>('2');
const [codeContents, setCodeContents] = useState<Record<string, string>>(initialFileContents);

const handleSelectFile = (id: string) => {
  setSelectedFileId(id);
};

const handleCodeChange = (newCode: string) => {
  if (selectedFileId) {
    setCodeContents(prev => ({ ...prev, [selectedFileId]: newCode }));
  }
};

return (
  <div className="h-screen flex">
    <div className="w-64 bg-gray-100">
      <FileManager files={files} selectedFileId={selectedFileId} onSelectFile={handleSelectFile} />
    </div>
    <div className="flex-1 bg-white">
      {selectedFileId ? (
        <CodeEditor code={codeContents[selectedFileId] || ''} onChange={handleCodeChange} />
      ) : (
        <div className="p-4 text-gray-500">Select a file to start editing</div>
      )}
    </div>
  </div>
);
}

export default App;
`,
      },
    ],
  },
  {
    type: "file",
    title: "index.html",
    extension: "html",
    language: "html",
    path: "index.html",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Code Editor with File Manager</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="src/main.tsx"></script>
</body>
</html>
`,
  },
];
