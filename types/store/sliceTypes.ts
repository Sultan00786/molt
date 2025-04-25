import { ChatItem } from "../prompt";

export interface CodeState {
   codeCall: boolean;
   chatCode: ChatItem[] | null;
}
