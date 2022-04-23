import React, { useEffect, useState } from "react";

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
  const [selected, setSelected] = useState<number>(5);
  const mode = useAppSelector((state) => state.quiz.quizMode);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const dispatch = useAppDispatch();

  return (
    <S.QuizContent>
      <S.QuizImage isEasy={difficulty === "Easy"}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${question.id}.png`}
          alt=""
        />
      </S.QuizImage>
      <S.QuizAnswer>
        {selector.map((name, index) => {
          console.log(answer, name);
          return (
            <S.QuizSelector
              key={index}
              selected={index === selected}
              onClick={() => {
                setSelected(index);
                dispatch(
                  collectAnswer({
                    index: step,
                    checkAnswer: answer === name,
                  }),
                );
                setTimeout(() => {
                  if (mode === "basic") {
                    setStep(step + 1);
                    setSelected(5);
                  } else {
                    setStep(answer === name ? step + 1 : -1);
                    setSelected(5);
                  }
                }, 500);
              }}
            >
              {name}
            </S.QuizSelector>
          );
        })}
      </S.QuizAnswer>
    </S.QuizContent>
  );
}

export default PokemonQuestion;
