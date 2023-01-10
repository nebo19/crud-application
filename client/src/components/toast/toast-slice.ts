import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    content: "",
    severity: null,
    summary: "",
  },
  reducers: {
    showToast: (state, action) => {
      state.content = action.payload.content;
      state.summary = action.payload.summary;
      state.severity = action.payload.severity;
    },
    hideToast: (state) => {
      state.content = "";
      state.severity = null;
      state.summary = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
