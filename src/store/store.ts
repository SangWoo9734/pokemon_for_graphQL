import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./modeSlice";
import typeReducer from "./typeSlice";
import quizReducer from "./quizSlice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    type: typeReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
