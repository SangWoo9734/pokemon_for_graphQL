import styled from "styled-components";

export const QuizWrapper = styled.div`
  position: relative;
  max-width: 900px;
  height: calc(100vh - 30px);
  margin: auto;
`;

export const Title = styled.div`
  padding: 0 15px;
  padding-top: 20px;
  font-family: "KARMATIC ARCADE";
  font-size: 3rem;
  text-align: center;
`;

export const SubTitle = styled.div`
  font-size: 1.3rem;
  text-align: center;
`;

export const QuizInnerWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: auto;
  padding: 15px 10px;
  text-align: center;
`;

export const QuizImage = styled.img`
  width: 230px;
  margin: 30px auto 10px auto;
  border-radius: 10px;
`;

export const QuizPageTitle = styled.div`
  font-size: 3rem;
`;
export const QuizPageDesc = styled.p`
  font-size: 1.4rem;
`;
export const QuizButtonWrapper = styled.div`
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  grid-gap: 10px;
`;
export const QuizButton = styled.div<{ isSelected: boolean }>`
  margin: 10px 0;
  padding: 20px 0;
  border: 2px solid black;
  border-radius: 10px;
  background: ${({ isSelected }) => (isSelected ? "#feb23660" : "#ffffff")};
  font-size: 2rem;
  transition: all 0.3s ease;
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
    background: #feb23660;
  }
`;

export const QuizTypeDifficulty = styled.div`
  font-size: 1.5rem;
  margin: 10px 0;
  text-transform: capitalize;
`;
export const QuizDescribe = styled.div<{ isShow: boolean }>`
  width: 100%;
  height: 50px;
  font-size: 1.5rem;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background: lightgray;
  display: table;
  visibility: ${({ isShow }) => (isShow ? "hidden" : "visible")};

  & p {
    text-align: center;
    vertical-align: middle;
    display: table-cell;
  }
`;

export const QuizStart = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  color: white;
  font-size: 1.4rem;
`;

export const QuizMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & button {
    width: 45%;
    margin-top: 10px;
    padding: 10px 0;
    border-radius: 10px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    color: white;
    font-size: 1.4rem;
  }
`;
