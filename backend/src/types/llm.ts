export type ModelType =
  | "gemini-2.0-flash"
  | "gemini-2.0-flash-lite"
  | "gemini-2.0-flash-8b"
  | "gemini-1.5-flash";
export type MessageType = { role: string; content: string }[];
