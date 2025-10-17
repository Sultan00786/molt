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
    code: `export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`,
  },
  {
    type: "file",
    title: "postcss.config.js",
    extension: "js",
    language: "javascript",
    path: "postcss.config.js",
    code: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
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

/* small custom styles */
html, body, #root {
  height: 100%;
}
body {
  @apply bg-slate-50 text-slate-900;
}
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
            title: "TodoInput.tsx",
            extension: "tsx",
            language: "typescript",
            path: "src/components/TodoInput.tsx",
            code: `import React, { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo..."
        className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring"
        aria-label="New todo"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
`,
          },
          {
            type: "file",
            title: "TodoItem.tsx",
            extension: "tsx",
            language: "typescript",
            path: "src/components/TodoItem.tsx",
            code: `import React from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <li className="flex items-center justify-between gap-4 p-2 rounded hover:bg-slate-100">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={\`toggle-\${todo.id}\`}
        />
        <EditableText text={todo.text} onSave={(newText) => onEdit(todo.id, newText)} completed={todo.completed} />
      </div>
      <div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-sm px-2 py-1 rounded border hover:bg-red-50"
          aria-label={\`delete-\${todo.id}\`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

const EditableText: React.FC<{ text: string; onSave: (t: string) => void; completed: boolean }> = ({ text, onSave, completed }) => {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(text);
  React.useEffect(() => setValue(text), [text]);

  const save = () => {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      setValue(text);
    } else {
      onSave(trimmed);
    }
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === 'Enter') save();
          if (e.key === 'Escape') {
            setValue(text);
            setEditing(false);
          }
        }}
        className="px-2 py-1 rounded border"
        autoFocus
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={\`text-left truncate \${completed ? 'line-through text-slate-400' : ''}\`}
      aria-label="edit-text"
    >
      {text}
    </button>
  );
};

export default TodoItem;
`,
          },
          {
            type: "file",
            title: "TodoList.tsx",
            extension: "tsx",
            language: "typescript",
            path: "src/components/TodoList.tsx",
            code: `import React from 'react';
import TodoItem, { Todo } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return <div className="p-4 text-center text-slate-500">No todos yet — add your first one!</div>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TodoList;
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
        code: `import React, { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import type { Todo } from './components/TodoItem';

const LOCAL_KEY = 'todo_app_v1';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const initialTodos = (): Todo[] => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Todo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  const add = (text: string) => {
    const newTodo: Todo = { id: uid(), text, completed: false };
    setTodos((s) => [newTodo, ...s]);
  };

  const toggle = (id: string) => {
    setTodos((s) => s.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const remove = (id: string) => {
    setTodos((s) => s.filter(t => t.id !== id));
  };

  const edit = (id: string, newText: string) => {
    setTodos((s) => s.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const clearCompleted = () => {
    setTodos((s) => s.filter(t => !t.completed));
  };

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Todo App</h1>
          <p className="text-sm text-slate-500">A simple todo app — saves to localStorage</p>
        </header>

        <section className="mb-4">
          <TodoInput onAdd={add} />
        </section>

        <section className="mb-4">
          <TodoList todos={todos} onToggle={toggle} onDelete={remove} onEdit={edit} />
        </section>

        <footer className="flex items-center justify-between text-sm text-slate-600">
          <div>{remaining} left</div>
          <div className="flex gap-2">
            <button onClick={() => setTodos([])} className="px-3 py-1 rounded border hover:bg-red-50">Clear all</button>
            <button onClick={clearCompleted} className="px-3 py-1 rounded border hover:bg-slate-50">Clear completed</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
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
    <title>Todo App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  },
];
