import React from "react";

import * as S from "./style";
import { useAppSelector } from "../../hooks/reduxHooks";

function PokemonQuizResult() {
  const result = useAppSelector((state) => state.quiz.quiz);
  const mode = useAppSelector((state) => state.quiz.quizMode);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);

  const basicResult = () => {
    let comment = "";
    let correct = 0;

    result.forEach((r) => {
      correct += r.isCorrect ? 1 : 0;
    });

    if (correct > 7) {
      comment = "Excellent!!";
    } else if (correct > 4) {
      comment = "Good!!";
    } else {
      comment = "Cheer UP!!";
    }

    return (
      <>
        <S.QuizResultWrapper>
          {result.map((answer) => {
            return (
              <S.QuizResult key={answer.target.id} isCorrect={answer.isCorrect}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${answer.target.id}.png`}
                  alt=""
                />
              </S.QuizResult>
            );
          })}
        </S.QuizResultWrapper>
        <S.QuizComment>
          <div>{`${correct} / ${result.length}`}</div>
          <div>{`${comment}`}</div>
        </S.QuizComment>
      </>
    );
  };

  const unlimitResult = () => {
    let correct = 0;

    for (let i = 0; i < result.length; i++) {
      if (result[i].isCorrect) {
        correct += 1;
      } else {
        break;
      }
    }

    return (
      <>
        <S.QuizResultWrapper>
          {result.slice(0, correct + 1).map((answer) => {
            return (
              <S.QuizResult key={answer.target.id} isCorrect={answer.isCorrect}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${answer.target.id}.png`}
                  alt=""
                />
              </S.QuizResult>
            );
          })}
        </S.QuizResultWrapper>
        <S.QuizComment>
          <div>{`${correct} COMBO!!`}</div>
        </S.QuizComment>
      </>
    );
  };

  return (
    <S.QuizWrapper>
      <S.QuizHeader>{`${mode} / ${difficulty}`}</S.QuizHeader>
      {mode === "basic" ? basicResult() : unlimitResult()}
      <S.QuizResultButton>
        <button>Main</button>
        {/* <button>Share</button> */}
      </S.QuizResultButton>
    </S.QuizWrapper>
  );
}

export default PokemonQuizResult;
