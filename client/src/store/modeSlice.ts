import { createSlice } from "@reduxjs/toolkit";

interface modeType {
  mode: boolean;
}

const initialState: modeType = {
  mode: false,
};

export const modeSlice = createSlice({
  name: "modeChange",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("mode", state.mode.toString());
    },
  },
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
