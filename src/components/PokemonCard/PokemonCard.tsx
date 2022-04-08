import React, { useState, forwardRef, ForwardedRef } from "react";

import { Pokemon } from "../../assets/type";

import * as S from "./style";
import { MdCatchingPokemon } from "react-icons/md";

interface Props {
  pokemonInfo: Pokemon;
}

const fillZero = (number: number) => {
  const numberToString = number.toString();
  return `${"0".repeat(3 - numberToString.length)}${numberToString}`;
};

const UpperFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

function PokemonCard({ pokemonInfo }: Props, ref: ForwardedRef<HTMLDivElement>) {
  const [focusState, setfocusState] = useState<number>(0);

  return (
    <S.PokemonCardWrapper ref={ref}>
      <S.PokemonInfoWrapper>
        <S.PokemonIndex>
          <MdCatchingPokemon />
          {`No.${fillZero(pokemonInfo.pokemon_species_id)}`}
        </S.PokemonIndex>
        <S.PokemonInfo>
          <S.PokemonName>{UpperFirstLetter(pokemonInfo.name)}</S.PokemonName>
          <S.PokemonTypeWrapper>
            {pokemonInfo.pokemon_v2_pokemontypes.map((pokemonType, index) => {
              return (
                <S.PokemonType type={pokemonType.pokemon_v2_type.name.toUpperCase()} key={index}>
                  {UpperFirstLetter(pokemonType.pokemon_v2_type.name)}
                </S.PokemonType>
              );
            })}
          </S.PokemonTypeWrapper>
        </S.PokemonInfo>
      </S.PokemonInfoWrapper>
      <S.PokemonImageWrapper
        onMouseEnter={() => {
          setfocusState(1);
        }}
        onMouseLeave={() => {
          setfocusState(0);
        }}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            focusState ? "back/" : ""
          }${pokemonInfo.id}.png`}
          alt=""
        />
      </S.PokemonImageWrapper>
    </S.PokemonCardWrapper>
  );
}

export default forwardRef(PokemonCard);
