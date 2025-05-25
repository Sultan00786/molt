import { ChatItem, chatMessage } from "@/types/prompt";
import { CodeState } from "@/types/store/sliceTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const codeInitialState:CodeState = {
  codeCall: false,
  template: null,
  chatCode: null,
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
  },
});

export const {setChatCode, setCodeCall, setTemplate} = codeSlice.actions;
export default codeSlice.reducer;
