import styled from "styled-components";

export const RankingWrapper = styled.div`
  padding: 20px;
  max-width: 900px;
  width: 100%;
  margin: auto;
`;

export const GoBack = styled.button`
  margin: 10px 0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.5rem;
`;

export const RankingControlWrapper = styled.div`
  display: flex;
  padding: 15px;
  border: 2px dashed black;
  border-radius: 10px;
`;

export const RankingDiffiiculty = styled.div<{ isSelected: boolean }>`
  width: 50%;
  text-align: center;

  & p {
    font-size: 1.5rem;
  }
`;

export const RankingSearchBtn = styled.button<{ isSelected: boolean }>`
  width: 110px;
  margin: 10px;
  padding: 10px 5px;
  border: 2px solid black;
  border-radius: 10px;
  background: ${({ isSelected }) => (isSelected ? "#feb23660" : "#ffffff")};
  font-size: 1.3rem;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #feb23660;
  }
`;

export const RankingListWrapper = styled.div`
  margin-top: 20px;
  border-top: 2px solid black;
`;

export const RankingHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1.5fr 1.5fr;
  width: 100%;
  max-width: 700px;
  margin: 5px auto;
  padding: 15px 5px;
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
`;

export const RankingTopScore = styled.div<{ isFirst: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1.5fr 1.5fr;
  width: 100%;
  max-width: 700px;
  height: 70px;
  line-height: 60px;
  margin: 15px auto;
  border: 5px solid transparent;
  border-radius: 15px;
  background-image: ${({ isFirst }) =>
    isFirst
      ? "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab), linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
      : "linear-gradient(#fff, #fff), linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"};
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 0 0 10px 0 #7c7c7c;
  text-align: center;
  color: ${({ isFirst }) => (isFirst ? "white" : "black")};
  font-size: 1.3rem;

  & .rank-name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const RankingNormal = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1.5fr 1.5fr;
  width: 100%;
  max-width: 700px;
  margin: 15px auto;
  padding: 15px 0;
  border: 2px solid black;
  border-radius: 15px;
  text-align: center;
  font-size: 1.3rem;
`;

export const RankingButtion = styled.button`
  width: 100%;
  margin: 15px 0;
  padding: 10px 0;
  border-radius: 10px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  color: white;
  font-size: 1.4rem;
`;

export const RankNew = styled.p`
  font-weight: bolder;
  color: red;
`;

export const RankingNotice = styled.p`
  margin: 15px;
  text-align: center;
  font-size: 1.5rem;
  text-transform: capitalize;
`;
