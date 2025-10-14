import { ChatItem, chatMessage } from "@/types/prompt";
import { CodeState } from "@/types/store/sliceTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileSystemTree } from "@webcontainer/api";

const codeInitialState:CodeState = {
  codeCall: false,
  template: null,
  chatCode: null,
  webcontainFiles: null,
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
  },
});

export const {setChatCode, setCodeCall, setTemplate, setWebcontainFiles} = codeSlice.actions;
export default codeSlice.reducer;
