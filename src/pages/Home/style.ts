import styled from "styled-components";

export const HomeOuterContainer = styled.div<{ mode: boolean }>`
  position: relative;
  margin: auto;
  background: ${({ mode }) => (mode ? "#282641" : "white")};
  color: ${({ mode }) => (mode ? "white" : "")};

  .limitWidth {
    max-width: 900px;
    margin: auto;
  }
`;

export const Title = styled.div`
  padding: 0 15px;
  font-family: "KARMATIC ARCADE";
  font-size: 3rem;
  text-align: center;
`;

export const SubTitle = styled.div`
  font-size: 1.3rem;
  text-align: center;
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
