import styled from "styled-components";

export const HomeOuterContainer = styled.div<{ mode: boolean }>`
  position: relative;
  background: ${({ mode }) => (mode ? "#282641" : "white")};
  color: ${({ mode }) => (mode ? "white" : "")};

  .limitWidth {
    max-width: 900px;
    margin: auto;
  }
`;

export const Link = styled.div`
  width: 30%;
  margin: 30px auto 10px auto;
  padding: 5px 15px;
  border-radius: 10px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 200% 200%;
  color: white;
  animation: Gradiant 5s linear infinite;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bolder;

  @keyframes Gradiant {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const PokemonList = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: auto;
  padding: 10px 10px;

  @media only screen and (max-width: 630px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const MoveTop = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  width: 30%;
  padding: 5px 0;
  font-size: 1.3rem;
  text-align: center;
  border: 2px dashed black;
  border-radius: 10px 10px 0 0;

  background: lime; ;
`;
