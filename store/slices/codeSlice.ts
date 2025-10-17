import { getLocalData } from "@/lib/localStorage";
import { ChatItem, chatMessage } from "@/types/prompt";
import { CodeState } from "@/types/store/sliceTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileSystemTree } from "@webcontainer/api";

// unable to use localstorage in server component
const molt = getLocalData<{
  chatCode: ChatItem[];
  webcontainFiles: FileSystemTree;
  webcontainUrl: string;
}>("molt");
const codeInitialState: CodeState = {
  codeCall: false,
  template: null,
  chatCode: molt?.chatCode ?? null,
  webcontainFiles: molt?.webcontainFiles ?? null,
  webcontainUrl: molt?.webcontainUrl ?? "",
};

const codeSlice = createSlice({
  name: "code",
  initialState: codeInitialState,
  reducers: {
    setCodeCall(state, action: PayloadAction<boolean>) {
      state.codeCall = action.payload;
    },
    setTemplate(state, action: PayloadAction<chatMessage[] | null>) {
      state.template = action.payload;
    },
    setChatCode(state, action: PayloadAction<ChatItem[] | null>) {
      state.chatCode = action.payload;
    },

    setWebcontainFiles(state, action: PayloadAction<FileSystemTree | null>) {
      state.webcontainFiles = action.payload;
    },
    setWebcontainUrl(state, action: PayloadAction<string>) {
      state.webcontainUrl = action.payload;
    },
  },
});

export const {
  setChatCode,
  setCodeCall,
  setTemplate,
  setWebcontainFiles,
  setWebcontainUrl,
} = codeSlice.actions;
export default codeSlice.reducer;
