import { ChatItem, FileItem, FolderItem } from "../prompt";

export interface FolderProps {
  file: FolderItem;
  spacing: number;
}

export interface RenderFileProps {
  files: ChatItem[];
  spacing: number;
}

export interface FileProps {
  file: FileItem;
}
