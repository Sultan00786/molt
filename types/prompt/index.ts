export interface chatMessage {
  role: string;
  content: CodeGenerateContent;
}

export enum ItemType {
  File = "file",
  Folder = "folder",
  Shell = "shell",
}

export type ChatItem = FolderItem | FileItem | ShellItem;

export type FolderItem = {
  type: ItemType.Folder;
  title: string;
  children: ChatItem[];
};

export type FileItem = {
  type: ItemType.File;
  title: string;
  path: string;
  extension: string;
  language: string;
  code: string;
};

export type ShellItem = {
  type: ItemType.Shell;
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
