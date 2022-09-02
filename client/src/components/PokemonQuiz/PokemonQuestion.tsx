import React, { useEffect, useRef } from "react";

import * as S from "./style";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { collectAnswer } from "../../store/quizSlice";

interface Props {
  image: HTMLImageElement;
  answer: string;
  selector: string[];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function PokemonQuestion({ image, answer, selector, step, setStep }: Props) {
  const mode = useAppSelector((state) => state.quiz.quizMode);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const divRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (divRef.current?.children.length != 0)
      divRef.current?.removeChild(divRef.current?.children[0]);
    if (image) divRef.current?.appendChild(image);
  }, [image]);

  useEffect(() => console.log(selector), []);

  return (
    <S.QuizContent>
      <S.QuizImage isEasy={difficulty === "easy"} ref={divRef}></S.QuizImage>
      <S.QuizAnswer>
        {selector.length > 0 &&
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
