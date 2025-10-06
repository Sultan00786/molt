export interface chatMessage {
  role: string;
  content: CodeGenerateContent;
}

export type ItemType = "folder" | "file" | "shell";

export type ChatItem = FolderItem | FileItem | ShellItem;

export type FolderItem = {
  type: "folder";
  title: string;
  children: ChatItem[];
};

export type FileItem = {
  type: "file";
  title: string;
  path: string;
  extension: string;
  language: string;
  code: string;
};

export type ShellItem = {
  type: "shell";
  command: string;
};

export interface CodeGenerate {
  step: "generate_file";
  content: CodeGenerateContent;
}

export interface CodeGenerateContent {
  path: string;
  language: string;
  code: string;
}
