import { createSlice } from "@reduxjs/toolkit";

const codeInitialState = {
  codeCall: false,
  templateCode: null,
};

const codeSlice = createSlice({
  name: "code",
  initialState: codeInitialState,
  reducers: {
    setCodeCall(state, value) {
      state.codeCall = value.payload;
    },
  },
});

export const {} = codeSlice.actions;
export default codeSlice.reducer;
