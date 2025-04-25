import { CodeState } from "@/types/store/sliceTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const codeInitialState:CodeState = {
  codeCall: false,
  chatCode: null,
};

const codeSlice = createSlice({
  name: "code",
  initialState: codeInitialState,
  reducers: {
    setCodeCall(state, action: PayloadAction<boolean>) {
      state.codeCall = action.payload;
    },
  },
});

export const {} = codeSlice.actions;
export default codeSlice.reducer;
