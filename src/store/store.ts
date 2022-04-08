import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./modeSlice";
import typeReducer from "./typeSlice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    type: typeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
