import React, { useState } from "react";

import * as S from "./style";
import PokemonQuiz from "../../components/PokemonQuiz";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { PokemonSpecies, PokemonLanguage } from "../../assets/type";
import { settingQuiz } from "../../store/quizSlice";

type quizDescType = {
  [index: string]: string;
  Basic: string;
  Unlimit: string;
  Easy: string;
  Medium: string;
  Hard: string;
};

interface PokemonData {
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

interface NameData {
  pokemon_v2_languagename_by_pk: PokemonLanguage;
}

interface ResponseType {
  loading: boolean;
  data: undefined | PokemonData;
}

function Quiz() {
  const quizDesc: quizDescType = {
    Basic: "10개의 문제를 풀 수 있습니다.",
    Unlimit: "틀릴 때까지 문제를 풀 수 있습니다.",
    Easy: "포켓몬 이름이 한글로 제시되고, 포켓몬 이미지가 주어집니다.",
    Medium: "포켓몬 이름이 한글로 제시되고, 포켓몬 그림자가 주어집니다.",
    Hard: "포켓몬 이름이 영어로 제시되고, 포켓몬 그림자가 주어집니다.",
  };

  const [desc, setDesc] = useState<string>("");
  const [quizType, setQuizType] = useState<string>("");
  const [quizDifficulty, setQuizDifficulty] = useState<string>("");
  const [quiz, setQuiz] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <S.QuizWrapper>
      <S.Title>Pokedex</S.Title>
      <S.SubTitle> -- All About POKEMON -- </S.SubTitle>
      {!quiz && (
        <S.QuizInnerWrapper>
          <S.QuizImage
            src="https://opgg-com-image.akamaized.net/attach/images/20200209094105.994854.jpg"
            alt=""
          />
          <S.QuizPageTitle>오늘의 포켓몬은 뭘까요?</S.QuizPageTitle>
          <S.QuizButtonWrapper>
            {["Basic", "Unlimit"].map((type: string) => {
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
            {["Easy", "Medium", "Hard"].map((difficulty: string) => {
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
              setQuiz(true);
            }}
          >
            START!!!!
          </S.QuizStart>
          <S.QuizDescribe isShow={desc === ""}>{desc}</S.QuizDescribe>
        </S.QuizInnerWrapper>
      )}
      {quiz && <PokemonQuiz />}
    </S.QuizWrapper>
  );
}

export default Quiz;
