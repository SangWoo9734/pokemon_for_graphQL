import styled from "styled-components";

export const Title = styled.div`
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
