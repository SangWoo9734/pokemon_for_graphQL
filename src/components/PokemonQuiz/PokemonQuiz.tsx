import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import * as S from "./style";
import { useAppSelector } from "../../hooks/reduxHooks";
import { PokemonSpecies } from "../../assets/type";
import { POKEMON_LIST_QUERY } from "../../hooks/useGraphQL";
import PokemonQuizBasic from "./PokemonQuizBasic";
import PokemonQuizUnlimit from "./PokemonQuizUnlimit";

interface PokemonData {
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

interface ResponseType {
  loading: boolean;
  data: undefined | PokemonData;
}

function PokemonQuiz() {
  const mode = useAppSelector((state) => state.quiz.quizMode);
  const { loading, data }: ResponseType = useQuery(POKEMON_LIST_QUERY);
  const [pokemon, setPokemon] = useState<PokemonSpecies[]>([]);

  const shuffle = (arr: PokemonSpecies[] | string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  useEffect(() => {
    if (!loading) {
      const originPokemon: PokemonSpecies[] = shuffle([
        ...(data?.pokemon_v2_pokemonspecies as PokemonSpecies[]).filter(
          (element) => element.id < 152,
        ),
      ]) as PokemonSpecies[];

      setPokemon(originPokemon);
    }
  }, [loading]);

  return (
    <S.QuizWrapper>
      {mode === "basic" ? (
        <PokemonQuizBasic pokemon={pokemon} />
      ) : (
        <PokemonQuizUnlimit pokemon={pokemon} />
      )}
    </S.QuizWrapper>
  );
}

export default PokemonQuiz;
