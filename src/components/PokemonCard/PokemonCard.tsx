import React, { useState, forwardRef, ForwardedRef } from "react";

import { Pokemon, PokemonSpecies } from "../../assets/type";

import * as S from "./style";
import { MdCatchingPokemon } from "react-icons/md";

interface Props {
  pokemonInfo: PokemonSpecies;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  pokemonNameKr: string;
  setPokemonDetailId: React.Dispatch<React.SetStateAction<number>>;
  setPokmonChainId: React.Dispatch<React.SetStateAction<number>>;
}

function PokemonCard(
  { pokemonInfo, setModal, pokemonNameKr, setPokemonDetailId, setPokmonChainId }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [focusState, setfocusState] = useState<number>(0);
  const pokemonData: Pokemon = pokemonInfo.pokemon_v2_pokemons[0];

  const fillZero = (number: number) => {
    const numberToString = number.toString();
    return `${"0".repeat(3 - numberToString.length)}${numberToString}`;
  };

  const UpperFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <S.PokemonCardWrapper
      ref={ref}
      onClick={() => {
        setModal(true);
        setPokemonDetailId(pokemonInfo.id);
        setPokmonChainId(pokemonInfo.evolution_chain_id);
      }}
    >
      <S.PokemonInfoWrapper>
        <S.PokemonIndex>
          <MdCatchingPokemon />
          {`No.${fillZero(pokemonInfo.id)}`}
        </S.PokemonIndex>
        <S.PokemonInfo>
          <S.PokemonName>{`${pokemonNameKr} / ${UpperFirstLetter(
            pokemonData.name,
          )}`}</S.PokemonName>
          <S.PokemonTypeWrapper>
            {pokemonData.pokemon_v2_pokemontypes.map((pokemonType, index) => {
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
