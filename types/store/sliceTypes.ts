import { FileSystemTree } from "@webcontainer/api";
import { ChatItem, chatMessage } from "../prompt";

export interface CodeState {
  codeCall: boolean;
  template: chatMessage[] | null;
  chatCode: ChatItem[] | null;
  webcontainFiles: FileSystemTree | null;
}
