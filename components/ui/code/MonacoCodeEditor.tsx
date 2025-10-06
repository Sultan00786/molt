"use client";
import { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import { RefObject, useRef } from "react";

// Dynamically import MonacoEditor with SSR disabled
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

function MonacoCodeEditor() {
  const code =
    "import React, { useState, useEffect, useRef, useCallback } from 'react';\n\nconst BOARD_SIZE = 20; // 20x20 grid\nconst CELL_SIZE = 20; // pixels\nconst INITIAL_SPEED = 200; // milliseconds\n\ninterface Coordinate { \n  x: number; \n  y: number; \n}\n\nconst SnakeGame: React.FC = () => {\n  const [snake, setSnake] = useState<Coordinate[]>([{ x: 10, y: 10 }]);\n  const [food, setFood] = useState<Coordinate>({ x: 5, y: 5 });\n  const [direction, setDirection] = useState<Coordinate>({ x: 0, y: 1 }); // initial direction: down\n  const [gameOver, setGameOver] = useState<boolean>(true);\n  const [score, setScore] = useState<number>(0);\n  const [gameStarted, setGameStarted] = useState<boolean>(false);\n  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);\n\n  const gameLoopRef = useRef<number | null>(null);\n\n  const generateFood = useCallback(() => {\n    let newFood: Coordinate;\n    do {\n      newFood = {\n        x: Math.floor(Math.random() * BOARD_SIZE),\n        y: Math.floor(Math.random() * BOARD_SIZE),\n      };\n    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));\n    setFood(newFood);\n  }, [snake]);\n\n  const resetGame = useCallback(() => {\n    setSnake([{ x: 10, y: 10 }]);\n    setDirection({ x: 0, y: 1 });\n    setScore(0);\n    setGameOver(false);\n    setGameStarted(true);\n    setSpeed(INITIAL_SPEED);\n    generateFood();\n  }, [generateFood]);\n\n  const handleKeyDown = useCallback((e: KeyboardEvent) => {\n    if (!gameStarted && e.key === ' ' && gameOver) {\n      resetGame();\n      return;\n    }\n    if (gameOver || !gameStarted) return;\n\n    const newDirection = { ...direction }; // Create a copy to avoid state update issues\n    switch (e.key) {\n      case 'ArrowUp':\n        if (direction.y !== 1) newDirection.x = 0, newDirection.y = -1;\n        break;\n      case 'ArrowDown':\n        if (direction.y !== -1) newDirection.x = 0, newDirection.y = 1;\n        break;\n      case 'ArrowLeft':\n        if (direction.x !== 1) newDirection.x = -1, newDirection.y = 0;\n        break;\n      case 'ArrowRight':\n        if (direction.x !== -1) newDirection.x = 1, newDirection.y = 0;\n        break;\n    }\n    setDirection(newDirection);\n  }, [direction, gameOver, gameStarted, resetGame]);\n\n  useEffect(() => {\n    document.addEventListener('keydown', handleKeyDown);\n    return () => {\n      document.removeEventListener('keydown', handleKeyDown);\n    };\n  }, [handleKeyDown]);\n\n  useEffect(() => {\n    if (gameOver || !gameStarted) {\n      if (gameLoopRef.current) clearInterval(gameLoopRef.current);\n      return;\n    }\n\n    gameLoopRef.current = setInterval(() => {\n      setSnake(prevSnake => {\n        const newSnake = [...prevSnake];\n        const head = { ...newSnake[0] };\n\n        head.x += direction.x;\n        head.y += direction.y;\n\n        // Wall collision\n        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {\n          setGameOver(true);\n          if (gameLoopRef.current) clearInterval(gameLoopRef.current);\n          return prevSnake; // Return previous state to stop rendering further movement\n        }\n\n        // Self-collision\n        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {\n          setGameOver(true);\n          if (gameLoopRef.current) clearInterval(gameLoopRef.current);\n          return prevSnake;\n        }\n\n        newSnake.unshift(head);\n\n        // Food eating\n        if (head.x === food.x && head.y === food.y) {\n          setScore(prevScore => prevScore + 1);\n          generateFood();\n          // Increase speed slightly\n          setSpeed(prevSpeed => Math.max(50, prevSpeed - 5)); \n        } else {\n          newSnake.pop();\n        }\n\n        return newSnake;\n      });\n    }, speed);\n\n    return () => {\n      if (gameLoopRef.current) clearInterval(gameLoopRef.current);\n    };\n  }, [gameOver, direction, food, generateFood, gameStarted, speed]);\n\n  return (\n    <div className=\"flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4\">\n      <h1 className=\"text-5xl font-extrabold mb-8 tracking-tight\">SNAKE</h1>\n      <div className=\"flex justify-between w-full max-w-md mb-4 px-2\">\n        <p className=\"text-2xl font-semibold\">Score: {score}</p>\n        <p className=\"text-2xl font-semibold\">Speed: {Math.round((INITIAL_SPEED - speed + 50) / 10)}</p>\n      </div>\n      <div\n        className=\"relative border-4 border-gray-700 bg-gray-800\"\n        style={{\n          width: BOARD_SIZE * CELL_SIZE,\n          height: BOARD_SIZE * CELL_SIZE,\n        }}\n      >\n        {snake.map((segment, index) => (\n          <div\n            key={index}\n            className={`absolute rounded-sm ${index === 0 ? 'bg-green-500' : 'bg-green-600'}`}\n            style={{\n              left: segment.x * CELL_SIZE,\n              top: segment.y * CELL_SIZE,\n              width: CELL_SIZE,\n              height: CELL_SIZE,\n            }}\n          ></div>\n        ))}\n        <div\n          className=\"absolute bg-red-500 rounded-full\"\n          style={{\n            left: food.x * CELL_SIZE,\n            top: food.y * CELL_SIZE,\n            width: CELL_SIZE,\n            height: CELL_SIZE,\n          }}\n        ></div>\n\n        {(!gameStarted || gameOver) && (\n          <div className=\"absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-10\">\n            <p className=\"text-4xl font-bold text-white mb-4\">{gameOver && gameStarted ? 'Game Over!' : 'Press Space to Start'}</p>\n            {gameOver && gameStarted && <p className=\"text-xl text-white\">Final Score: {score}</p>}\n            <button\n              onClick={resetGame}\n              className=\"mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg shadow-lg transition duration-200\"\n            >\n              {gameOver && gameStarted ? 'Play Again' : 'Start Game'}\n            </button>\n          </div>\n        )}\n      </div>\n    </div>\n  );\n};\n\nexport default SnakeGame;\n";

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
      },
    });

    monaco.editor.setTheme("myCustomTheme");
  };

  return (
    <div className="w-full h-[calc(100%-32px)] bg-richblack-990 overflow-hidden">
      <Editor
        language="typescript"
        theme="vs-dark"
        defaultValue={code}
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
        path="SnakeGame.tsx"
      />
    </div>
  );
}

export default MonacoCodeEditor;
