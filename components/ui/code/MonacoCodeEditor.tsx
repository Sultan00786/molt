"use client";
import { MonacoEditorProps } from "@/types/props/codeEditor";
import { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import { RefObject, useRef } from "react";

// Dynamically import MonacoEditor with SSR disabled
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

function MonacoCodeEditor({ selectedFile }: MonacoEditorProps) {
  const editorRef: RefObject<null | editor.IStandaloneCodeEditor> =
    useRef(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // configure TypeScript to allow JSX
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React, // enables JSX
      reactNamespace: "React",
      allowJs: true,
      skipLibCheck: true,
    });

    // configure for .tsx files
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // custom color
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs-dark", // or "vs", "hc-black"
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#181818",
        "editor.selectionHighlightBorder": "#00000000", // 👈 Add this
      },
    });

    monaco.editor.setTheme("myCustomTheme");
  };

  return (
    <div className="w-full h-[calc(100%-32px)] bg-richblack-990 overflow-hidden">
      <Editor
        language="typescript"
        theme="vs-dark"
        loading={null}
        defaultValue={selectedFile.code}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          tabSize: 2,
          wordWrap: "on",
          stickyScroll: { enabled: false },
          scrollBeyondLastLine: true,
          padding: { top: 0, bottom: 100 },
          scrollbar: {
            alwaysConsumeMouseWheel: false, // Optional: better scroll behavior
          },
          readOnly: true,
          domReadOnly: true,
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', monospace",
          fontLigatures: true,
        }}
        path={selectedFile.path}
      />
    </div>
  );
}

export default MonacoCodeEditor;
