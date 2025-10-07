import { ChatItem, FileItem, FolderItem } from "../prompt";
import { Dispatch, SetStateAction } from "react";

export interface FileManagerProps {
  files: ChatItem[];
  setSelectedFile: Dispatch<SetStateAction<FileItem>>;
}

export interface FolderProps {
  file: FolderItem;
  spacing: number;
  setSelectedFile: Dispatch<SetStateAction<FileItem>>;
}

export interface RenderFileProps {
  files: ChatItem[];
  spacing: number;
  setSelectedFile: Dispatch<SetStateAction<FileItem>>;
}

export interface FileProps {
  file: FileItem;
  spacing: number;
  setSelectedFile: Dispatch<SetStateAction<FileItem>>;
}
