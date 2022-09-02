import styled from "styled-components";

export const QuizWrapper = styled.div`
  position: relative;
  max-width: 500px;
  margin: auto;
  font-size: 1.5rem;
`;

export const QuizInnerWrapper = styled.div`
  margin-top: 50px;
`;

export const QuizImage = styled.div<{ isEasy: boolean }>`
  max-width: 300px;
  aspect-ratio: 1;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #dadada;

  & img {
    filter: ${({ isEasy }) => (isEasy ? "brightness(100%)" : "brightness(0%)")};
  }
`;

export const QuizHeader = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: space-evenly;
  font-size: 1.7rem;
`;
export const QuizContent = styled.div`
  padding: 15px;
`;

export const QuizAnswer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;
export const QuizSelector = styled.button`
  padding: 15px 0;
  border: 2px solid #000000;
  background: #ffffff;
  border-radius: 10px;
  text-align: center;

  &:active {
    background: #ffaa0040;
    border-color: #ffaa00;
  }
`;
export const QuizIndicatior = styled.div`
  margin-top: 15px;

  & button {
    padding: 5px 15px;
    background: blue;
  }
`;

export const QuizResultWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  margin: 20px 0;
`;

export const QuizResult = styled.div<{ isCorrect: boolean }>`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background: ${({ isCorrect }) => (isCorrect ? "#c3ffc3" : "#ffd5d5")};

  & img {
    filter: ${({ isCorrect }) => (isCorrect ? "grayscale(0%)" : "grayscale(100%)")};
  }
`;

export const QuizComment = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 15px;
`;

export const QuizResultButton = styled.div`
  display: flex;
  justify-content: space-evenly;

  & * {
    width: 30%;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 10px 0 #9f9f9f;
  }
`;
