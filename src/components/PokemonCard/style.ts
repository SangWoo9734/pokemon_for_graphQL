import styled from "styled-components";
import { colorOfType } from "../../assets/typeColor";

export const PokemonCardWrapper = styled.div`
  max-width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #d4d4d4;

  &:hover {
    box-shadow: 0 0 10px 0 #949494;
  }
`;

export const PokemonIndex = styled.div`
  width: 80px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;

  svg {
    margin-right: 5px;
    color: red;
  }
`;
export const PokemonInfoWrapper = styled.div`
  width: 60%;
  position: relative;
  padding-right: 10px;
`;

export const PokemonInfo = styled.div``;

export const PokemonName = styled.p`
  margin: 10px 0;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
`;

export const PokemonTypeWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
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

export const PokemonImageWrapper = styled.div`
  width: 40%;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 #d4d4d4;
  background: #00000020;
`;
