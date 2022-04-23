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
      console.log(index, checkAnswer);
      state.quiz[index].isCorrect = checkAnswer;

      console.log(state.quiz);
    },
  },
});

export const { settingQuiz, settingQuestion, collectAnswer } = quizSlice.actions;

export default quizSlice.reducer;
