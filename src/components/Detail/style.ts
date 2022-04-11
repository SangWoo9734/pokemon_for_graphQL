import styled from "styled-components";
import { colorOfType } from "../../assets/typeColor";

export const DetailBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000a8;
`;
export const DetailWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 700px;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  background: white;
`;
export const DetailInfo = styled.div`
  display: flex;
`;

export const DetailImage = styled.img`
  width: 45%;
`;

export const PokemonName = styled.div`
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bolder;
`;
export const DetailStatusWrapper = styled.div`
  padding: 10px 20px;
  width: 55%;
`;

export const DetailStatus = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;
export const PokemonType = styled.div<{ type: string }>`
  margin: 2px 0;
  padding: 2px 10px;
  background: ${({ type }) => colorOfType(type)};
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

export const PokemonAbility = styled.div`
  margin: 2px 0;
  padding: 2px 10px;
  background: gray;
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

export const DetailEvolutionWrapper = styled.div``;

export const DetailEvolution = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

export const DetailSubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
  color: gray;

  span {
    font-size: 1rem;
    font-weight: normal;
    color: black;
  }
`;

export const PokeonEvoImage = styled.img`
  width: 100px;
`;

export const EvolutionStep = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;

  & + &::before {
    content: " ";
    width: 50px;
    height: 50px;
    background-image: url("https://cdn-icons-png.flaticon.com/512/724/724927.png");
  }
`;

export const StatusTable = styled.table`
  & td:first-child {
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px 0 0 5px;
    background: gray;
  }
  & td:last-child {
    padding: 5px 20px;
    border-radius: 0 5px 5px 0;
    border: 1px solid black;
  }
`;
