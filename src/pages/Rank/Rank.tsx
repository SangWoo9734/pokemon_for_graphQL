import React, { useEffect, useState } from "react";

import * as S from "./style";
import { RankType, RankInitType, fetchRank } from "../../api/rank";
import { useNavigate } from "react-router-dom";

function Rank() {
  const [type, setType] = useState("basic");
  const [difficulty, setDifficulty] = useState("easy");
  const [rankList, setRankList] = useState<RankInitType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    void fetchRank(type, difficulty).then((response) => {
      const currentRank = (response as RankType).rank;
      setRankList(currentRank);
    });
  }, [type, difficulty]);

  const isNew = (date: string) => {
    return new Date().getDate() - Date.parse(date) < 3600000;
  };

  return (
    <S.RankingWrapper>
      <S.GoBack onClick={() => navigate("/quiz")}>⇠ 돌아가기</S.GoBack>
      <S.RankingControlWrapper>
        <S.RankingDiffiiculty isSelected={false}>
          <p>&lt; Type &gt;</p>
          <div>
            {["basic", "unlimit"].map((name) => {
              return (
                <S.RankingSearchBtn
                  key={name}
                  onClick={() => setType(name)}
                  isSelected={type === name}
                >
                  {name.toUpperCase()}
                </S.RankingSearchBtn>
              );
            })}
          </div>
        </S.RankingDiffiiculty>
        <S.RankingDiffiiculty isSelected={true}>
          <p>&lt; Difficulty &gt;</p>
          <div>
            {["easy", "normal", "hard"].map((diff) => {
              return (
                <S.RankingSearchBtn
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  isSelected={difficulty === diff}
                >
                  {diff.toUpperCase()}
                </S.RankingSearchBtn>
              );
            })}
          </div>
        </S.RankingDiffiiculty>
      </S.RankingControlWrapper>
      <S.RankingListWrapper>
        {rankList.length ? (
          <>
            <S.RankingNotice>{`< ${type} / ${difficulty} TOP Scorer >`}</S.RankingNotice>
            <S.RankingHeader>
              <div>Rank</div>
              <div></div>
              <div>Name</div>
              <div>Time</div>
              <div>Score</div>
            </S.RankingHeader>
            {rankList.map((rank: RankInitType, index: number) => {
              return index < 3 ? (
                <S.RankingTopScore isFirst={index === 0} key={index}>
                  <div>{index + 1}</div>
                  <S.RankNew>{isNew(rank.createdAt) ? "new" : ""}</S.RankNew>
                  <div className="rank-name">{rank.name}</div>
                  <div>{rank.playtime}</div>
                  <div>{rank.score}</div>
                </S.RankingTopScore>
              ) : (
                <S.RankingNormal key={index}>
                  <div>{index + 1}</div>
                  <S.RankNew>{isNew(rank.createdAt) ? "new" : ""}</S.RankNew>
                  <div>{rank.name}</div>
                  <div>{rank.playtime}</div>
                  <div>{rank.score}</div>
                </S.RankingNormal>
              );
            })}
          </>
        ) : (
          <S.RankingNotice> -- 검색을 원하는 게임 타입으로 검색해주세요 -- </S.RankingNotice>
        )}
      </S.RankingListWrapper>
    </S.RankingWrapper>
  );
}

export default Rank;
