import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";

import { Pokemon, PokemonSpecies, PokemonType, Type } from "../../assets/type";

import * as S from "./style";
import Loading from "../../components/Loading";
import PokemonCard from "../../components/PokemonCard";
import FilterPokemon from "../../components/FilterPokemon";
import Toggle from "../../components/Toggle";
import Detail from "../../components/Detail";

const POKEMON_LIST_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemonspecies {
      id
      evolution_chain_id
      pokemon_v2_pokemons {
        name
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            id
            name
          }
        }
      }
    }
  }
`;

interface Data {
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

interface ResponseType {
  loading: boolean;
  data: undefined | Data;
}

function Home() {
  const { loading, data }: ResponseType = useQuery(POKEMON_LIST_QUERY);
  const [pokemon, setPokemon] = useState<PokemonSpecies[]>([]);
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [pokemonDetailId, setPokemonDetailId] = useState<number>(0);
  const [pokemonChainId, setPokmonChainId] = useState<number>(0);
  const mode = useAppSelector((state) => state.mode);
  const selectedType = useAppSelector((state) => state.type.type);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("mode", mode.mode.toString());
    setPage(1);
    if (!loading) {
      const originPokemon = [...(data?.pokemon_v2_pokemonspecies as PokemonSpecies[])].sort(
        (a, b) => {
          return a.id - b.id;
        },
      );

      if (selectedType) {
        const filteredPokemon = originPokemon.filter(
          (poke: PokemonSpecies) =>
            poke.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.filter(
              (type: PokemonType) => type.pokemon_v2_type.name.toUpperCase() === selectedType,
            ).length > 0,
        );

        setPokemon(filteredPokemon);
      } else {
        setPokemon(originPokemon);
      }
    }
  }, [loading, selectedType]);

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionObserver);
    targetRef.current && observer.observe(targetRef.current);
  });

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setPage(page + 1);
      }
    });
  };

  return (
    <S.HomeOuterContainer mode={mode.mode}>
      {!loading && pokemon.length > 0 && (
        <div className="limitWidth">
          <S.Title>Pokedex</S.Title>
          <S.SubTitle> -- All About POKEMON -- </S.SubTitle>
          <Toggle />
          <FilterPokemon />
          <S.PokemonList>
            {pokemon.slice(0, 30 * page).map((data, index) => {
              return (
                <PokemonCard
                  ref={index === 30 * page - 4 ? targetRef : null}
                  key={data.id}
                  pokemonInfo={data}
                  setModal={setModal}
                  setPokemonDetailId={setPokemonDetailId}
                  setPokmonChainId={setPokmonChainId}
                />
              );
            })}
          </S.PokemonList>
        </div>
      )}
      {modal && (
        <Detail pokemonId={pokemonDetailId} pokemonChainId={pokemonChainId} setModal={setModal} />
      )}
      {loading && pokemon && <Loading />}
    </S.HomeOuterContainer>
  );
}

export default Home;
