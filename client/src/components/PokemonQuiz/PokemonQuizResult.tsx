import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as S from "./style";
import { useAppSelector } from "../../hooks/reduxHooks";
import Portal from "../Modal/Portal";
import Modal from "../Modal";
import { RankType, RankInitType, fetchRank, updateRank } from "../../api/rank";

function PokemonQuizResult() {
  const result = useAppSelector((state) => state.quiz.quiz);
  const mode = useAppSelector((state) => state.quiz.quizMode);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const playtime = useAppSelector((state) => state.quiz.playTime);
  const score = useAppSelector((state) => state.quiz.score);
  const [id, setId] = useState<string>("");
  const [currentRank, setCurrentRank] = useState<RankInitType[]>([]);
  const [newRankIndex, setNewRankIndex] = useState<number>(0);
  const [modalState, setModalState] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (result.length === 0) {
      navigate("/quiz");
    } else {
      const isNew = async () => await checkNewRecord();

      void isNew().then((result) => {
        if (result) setModalState(result);
      });
    }
  }, [result]);

  const checkNewRecord = async () => {
    return await fetchRank(mode, difficulty).then((response) => {
      response = response as RankType;

      const rankList = response.rank;
      setId(response._id);
      setCurrentRank(rankList);

      for (let i = 0; i < rankList.length; i++) {
        if (
          score > rankList[i].score ||
          (score == rankList[i].score && playtime < rankList[i].playtime)
        ) {
          setNewRankIndex(i);
          return true;
        }
      }

      if (rankList.length < 10) {
        setNewRankIndex(rankList.length);
        return true;
      }
      return false;
    });
  };

  const updateWithNewRank = async (name: string) => {
    let newRankList: RankInitType[] = [];

    newRankList = currentRank.slice(0, newRankIndex);
    newRankList.push({
      createdAt: new Date().toISOString(),
      name,
      playtime,
      score,
    });
    newRankList = [...newRankList, ...currentRank.slice(newRankIndex, 9)];

    await updateRank(mode, difficulty, id, newRankList).then(() => {
      setModalState(false);
    });
  };

  const basicResult = () => {
    let comment = "";

    if (score > 7) {
      comment = "Excellent!!";
    } else if (score > 4) {
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
          <div>{`${score} / ${result.length}`}</div>
          <div>{`${comment}`}</div>
        </S.QuizComment>
      </>
    );
  };

  const unlimitResult = () => {
    return (
      <>
        <S.QuizResultWrapper>
          {result.slice(0, score + 1).map((answer) => {
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
          <div>{`${score} COMBO!!`}</div>
        </S.QuizComment>
      </>
    );
  };

  return (
    <S.QuizWrapper>
      <S.QuizHeader>{`${mode} / ${difficulty}`}</S.QuizHeader>
      {mode === "basic" ? basicResult() : unlimitResult()}
      <S.QuizResultButton>
        <Link to="/quiz">Main</Link>
      </S.QuizResultButton>
      <div>
        <Portal isOpen={modalState}>
          <Modal updateWithNewRank={updateWithNewRank} />
        </Portal>
      </div>
    </S.QuizWrapper>
  );
}

export default PokemonQuizResult;
