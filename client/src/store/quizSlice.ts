import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonSpecies } from "../assets/type";

interface QuestionType {
  target: PokemonSpecies;
  isCorrect: boolean;
}
interface QuizType {
  quizMode: string;
  quizDifficulty: string;
  step: number;
  quiz: QuestionType[];
  playTime: number;
  score: number;
}

interface ModeType {
  selectedQuizMode: string;
  selectedQuizDifficulty: string;
}

interface AnswerType {
  index: number;
  checkAnswer: boolean;
}

const initialState: QuizType = {
  quizMode: "",
  quizDifficulty: "",
  step: 0,
  quiz: [],
  playTime: 0,
  score: 0,
};

export const quizSlice = createSlice({
  name: "pokemonquiz",
  initialState,
  reducers: {
    settingQuiz: (state, action: PayloadAction<ModeType>) => {
      const { selectedQuizMode, selectedQuizDifficulty } = action.payload;
      state.quizMode = selectedQuizMode;
      state.quizDifficulty = selectedQuizDifficulty;
    },
    settingQuestion: (state, action: PayloadAction<{ questions: PokemonSpecies[] }>) => {
      state.quiz = action.payload.questions.map((q) => {
        return {
          target: q,
          isCorrect: false,
        };
      });
    },
    collectAnswer: (state, action: PayloadAction<AnswerType>) => {
      const { index, checkAnswer } = action.payload;
      state.quiz[index].isCorrect = checkAnswer;
      if (checkAnswer) state.score += 1;
    },
    setPlayTime: (state, action: PayloadAction<{ playtime: number }>) => {
      state.playTime = action.payload.playtime / 1000;
    },
    initScore: (state) => {
      state.score = 0;
    },
  },
});

export const { settingQuiz, settingQuestion, collectAnswer, setPlayTime, initScore } =
  quizSlice.actions;

export default quizSlice.reducer;
