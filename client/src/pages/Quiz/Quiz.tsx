import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./style";
import PokemonQuiz from "../../components/PokemonQuiz";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { settingQuiz, initScore } from "../../store/quizSlice";

type quizDescType = {
  [index: string]: string;
  basic: string;
  unlimit: string;
  easy: string;
  normal: string;
  hard: string;
};

function Quiz() {
  const quizDesc: quizDescType = {
    basic: "10개의 문제를 풀 수 있습니다.",
    unlimit: "틀릴 때까지 문제를 풀 수 있습니다.",
    easy: "포켓몬 이름이 한글로 제시되고, 포켓몬 이미지가 주어집니다.",
    normal: "포켓몬 이름이 한글로 제시되고, 포켓몬 그림자가 주어집니다.",
    hard: "포켓몬 이름이 영어로 제시되고, 포켓몬 그림자가 주어집니다.",
  };

  const [desc, setDesc] = useState<string>("");
  const [quizType, setQuizType] = useState<string>("");
  const [quizDifficulty, setQuizDifficulty] = useState<string>("");
  const [quizState, setQuizState] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initScore());
  }, []);

  return (
    <S.QuizWrapper>
      {!quizState && (
        <S.QuizInnerWrapper>
          <S.QuizMenu>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              📕 POKOMON 📕
            </button>
            <button
              onClick={() => {
                navigate("/rank");
              }}
            >
              🏆 RANK 🏆
            </button>
          </S.QuizMenu>
          <S.QuizImage
            src="https://opgg-com-image.akamaized.net/attach/images/20200209094105.994854.jpg"
            alt=""
          />
          <S.QuizPageTitle>오늘의 포켓몬은 뭘까요?</S.QuizPageTitle>
          <S.QuizPageDesc>-- 제시된 포켓몬 사진을 보고 이름을 맞춰보세요! --</S.QuizPageDesc>
          <S.QuizButtonWrapper>
            {["basic", "unlimit"].map((type: string) => {
              return (
                <S.QuizButton
                  key={type}
                  isSelected={quizType === type}
                  onMouseOver={() => {
                    setDesc(quizDesc[type]);
                  }}
                  onMouseOut={() => {
                    setDesc("");
                  }}
                  onClick={() => {
                    setQuizType(type);
                  }}
                >
                  {type} Quiz
                </S.QuizButton>
              );
            })}
          </S.QuizButtonWrapper>

          <S.QuizButtonWrapper>
            {["easy", "normal", "hard"].map((difficulty: string) => {
              return (
                <S.QuizButton
                  key={difficulty}
                  isSelected={quizDifficulty === difficulty}
                  onMouseOver={() => {
                    setDesc(quizDesc[difficulty]);
                  }}
                  onMouseOut={() => {
                    setDesc("");
                  }}
                  onClick={() => {
                    setQuizDifficulty(difficulty);
                  }}
                >
                  {difficulty}
                </S.QuizButton>
              );
            })}
          </S.QuizButtonWrapper>
          <S.QuizTypeDifficulty>
            {quizType ? quizType : "????"} / {quizDifficulty ? quizDifficulty : "????"}
          </S.QuizTypeDifficulty>
          <S.QuizStart
            disabled={quizType === "" || quizDifficulty === ""}
            onClick={() => {
              dispatch(
                settingQuiz({
                  selectedQuizMode: quizType,
                  selectedQuizDifficulty: quizDifficulty,
                }),
              );
              setQuizState(true);
            }}
          >
            START!!!!
          </S.QuizStart>
          <S.QuizDescribe isShow={desc === ""}>
            <p>{desc}</p>
          </S.QuizDescribe>
        </S.QuizInnerWrapper>
      )}
      {quizState && <PokemonQuiz />}
    </S.QuizWrapper>
  );
}

export default Quiz;
