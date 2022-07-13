import React from "react";

import * as S from "./style";
import { PokemonSpecies } from "../../assets/type";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { collectAnswer } from "../../store/quizSlice";

interface Props {
  question: PokemonSpecies;
  answer: string;
  selector: string[];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function PokemonQuestion({ question, answer, selector, step, setStep }: Props) {
  const mode = useAppSelector((state) => state.quiz.quizMode);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const dispatch = useAppDispatch();

  const checked = (name: string) => {
    dispatch(
      collectAnswer({
        index: step,
        checkAnswer: answer === name,
      }),
    );
    mode === "basic" ? setStep(step + 1) : setStep(answer === name ? step + 1 : -1);
  };

  return (
    <S.QuizContent>
      <S.QuizImage isEasy={difficulty === "easy"}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${question.id}.png`}
          alt="quiz-question"
        />
      </S.QuizImage>
      <S.QuizAnswer>
        {selector.length &&
          selector.map((name, index) => {
            return (
              <S.QuizSelector key={index} onClick={() => checked(name)}>
                {name}
              </S.QuizSelector>
            );
          })}
      </S.QuizAnswer>
    </S.QuizContent>
  );
}

export default PokemonQuestion;
