import { ChatItem, chatMessage } from "../prompt";

export interface CodeState {
  codeCall: boolean;
  template: chatMessage[] | null;
  chatCode: ChatItem[] | null;
}
