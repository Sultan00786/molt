"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import MonacoEditor with SSR disabled
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

function MonacoCodeEditor() {
  // const [code, setCode] = useState(`import React from 'react';
  // import './App.css';
  // import Button from './components/Button';

  // export default function App() {
  //   return (
  //     <div className="app">
  //       <h1>Welcome to My React App</h1>
  //       <Button>Click Me</Button>
  //     </div>
  //   );
  // }`);

  const code =
    '\nimport React, { useState } from \'react\';\nimport { PlusCircle, CheckCircle2, XCircle, Trash2 } from \'lucide-react\';\n\ninterface Todo {\n  id: number;\n  text: string;\n  completed: boolean;\n}\n\nfunction App() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  const [input, setInput] = useState(\'\');\n\n  const addTodo = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (input.trim()) {\n      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);\n      setInput(\'\');\n    }\n  };\n\n  const toggleTodo = (id: number) => {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n\n  const deleteTodo = (id: number) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  return (\n    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-8 px-4">\n      <div className="max-w-2xl mx-auto">\n        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">\n          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">\n            My Tasks\n          </h1>\n\n          <form onSubmit={addTodo} className="mb-6">\n            <div className="flex gap-2">\n              <input\n                type="text"\n                value={input}\n                onChange={(e) => setInput(e.target.value)}\n                placeholder="Add a new task..."\n                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"\n              />\n              <button\n                type="submit"\n                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"\n              >\n                <PlusCircle size={20} />\n                Add\n              </button>\n            </div>\n          </form>\n\n          <div className="space-y-3">\n            {todos.map(todo => (\n              <div\n                key={todo.id}\n                className={`flex items-center justify-between p-4 rounded-lg ${\n                  todo.completed ? \'bg-gray-50\' : \'bg-white\'\n                } border border-gray-200 hover:border-purple-200 transition-colors duration-200`}\n              >\n                <div className="flex items-center gap-3 flex-1">\n                  <button\n                    onClick={() => toggleTodo(todo.id)}\n                    className={`focus:outline-none ${\n                      todo.completed ? \'text-green-500\' : \'text-gray-400\'\n                    } hover:text-green-600 transition-colors duration-200`}\n                  >\n                    {todo.completed ? <CheckCircle2 size={24} /> : <XCircle size={24} />}\n                  </button>\n                  <span\n                    className={`flex-1 text-gray-800 ${\n                      todo.completed ? \'line-through text-gray-500\' : \'\'\n                    }`}\n                  >\n                    {todo.text}\n                  </span>\n                </div>\n                <button\n                  onClick={() => deleteTodo(todo.id)}\n                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"\n                >\n                  <Trash2 size={20} />\n                </button>\n              </div>\n            ))}\n          </div>\n\n          {todos.length === 0 && (\n            <div className="text-center text-gray-500 mt-8">\n              No tasks yet. Add one to get started!\n            </div>\n          )}\n        </div>\n      </div>\n    </div>\n  );\n}\n\nexport default App;\n';
    
  return <Editor language="typescript" theme="vs-dark" defaultValue={code} />;
}

export default MonacoCodeEditor;
