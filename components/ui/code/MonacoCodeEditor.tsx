"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ChangeHandler, EditorDidMount } from "react-monaco-editor";
import { editor } from "monaco-editor";

// Dynamically import MonacoEditor with SSR disabled
const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

function MonacoCodeEditor() {
  const [code, setCode] = useState(`import React from 'react';
  import './App.css';
  import Button from './components/Button';
  
  export default function App() {
    return (
      <div className="app">
        <h1>Welcome to My React App</h1>
        <Button>Click Me</Button>
      </div>
    );
  }`);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const editorDidMount: EditorDidMount = (editor) => {
    console.log("editorDidMount", editor);
    editorRef.current = editor;
    editor.focus();
  };

  const onChange: ChangeHandler = (newValue, e) => {
    console.log("onChange", newValue, e);
    setCode(newValue);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={(editor, monaco) => {
        if (editor) editorDidMount(editor, monaco);
      }}
    />
  );
}

export default MonacoCodeEditor;
