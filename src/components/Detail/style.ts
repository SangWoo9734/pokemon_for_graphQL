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
  max-width: 600px;
  width: 80%;
  max-height: 600px;
  padding: 20px;
  border-radius: 10px;
  background: white;
  overflow: auto;
`;
export const DetailInfo = styled.div`
  display: flex;

  @media only screen and (max-width: 650px) {
    display: block;
  }
`;

export const DetailImage = styled.img`
  max-width: 300px;
  width: 45%;
  margin: auto;

  @media only screen and (max-width: 650px) {
    width: 100%;
  }
`;

export const PokemonName = styled.div`
  margin-bottom: 10px;
  font-size: 2rem;
  font-weight: bolder;
`;
export const DetailStatusWrapper = styled.div`
  width: 55%;
  margin: auto;
  padding: 0 15px;

  @media only screen and (max-width: 650px) {
    width: 100%;
  }
`;

export const DetailStatus = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 450px) {
    display: block;
  }
`;
export const PokemonTag = styled.div<{ tag: string }>`
  max-width: 100px;
  margin: 2px 0;
  padding: 2px 10px;
  background: ${({ tag }) => colorOfType(tag)};
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

export const PokemonAbility = styled.div`
  max-width: 100px;
  margin: 2px 0;
  padding: 2px 10px;
  background: gray;
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

export const DetailEvolutionWrapper = styled.div`
  margin-top: 15px;
  padding: 0 15px;

  & > div:first-child {
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

export const DetailEvolution = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media only screen and (max-width: 450px) {
    display: block;
  }
`;

export const DetailSubTitle = styled.div`
  margin: 10px 0;
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
  max-width: 150px;
  width: 30%;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;

  & * {
    margin: auto;
  }

  @media only screen and (max-width: 450px) {
    max-width: 100%;
    display: flex;
    width: 100%;
    margin: 10px 0;
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
