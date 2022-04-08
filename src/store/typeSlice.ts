import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sortType {
  type: string;
}

const initialState: sortType = {
  type: "",
};

export const typeSlice = createSlice({
  name: "filterWithType",
  initialState,
  reducers: {
    settingSortType: (state, action: PayloadAction<sortType>) => {
      const { type } = action.payload;
      state.type = type;
    },
  },
});

export const { settingSortType } = typeSlice.actions;

export default typeSlice.reducer;
