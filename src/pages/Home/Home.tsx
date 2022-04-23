import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../../hooks/reduxHooks";

import {
  PokemonSpecies,
  PokemonType,
  PokemonLanguage,
  PokemonSpeciesNmKr,
  PokeNmKr,
} from "../../assets/type";
import { POKEMON_LIST_QUERY, POKEMON_KR_NAME_QUERY } from "../../hooks/useGraphQL";

import * as S from "./style";
import Loading from "../../components/Loading";
import PokemonCard from "../../components/PokemonCard";
import FilterPokemon from "../../components/FilterPokemon";
import Detail from "../../components/Detail";
import Toggle from "../../components/Toggle";
import { Link } from "react-router-dom";

interface PokemonData {
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

interface NameData {
  pokemon_v2_languagename_by_pk: PokemonLanguage;
}

interface ResponseType {
  loading: boolean;
  data: undefined | PokemonData;
}

function Home() {
  const { loading, data }: ResponseType = useQuery(POKEMON_LIST_QUERY);
  const response = useQuery(POKEMON_KR_NAME_QUERY);
  const [pokemon, setPokemon] = useState<PokemonSpecies[]>([]);
  const [pokemonNM, setPokemonNM] = useState<PokeNmKr[]>([]);
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
    if (!response.loading) {
      const NmData = (response.data as NameData).pokemon_v2_languagename_by_pk.pokemon_v2_language
        .pokemon_v2_pokemonspeciesnames;
      setPokemonNM(NmData);
      console.log(NmData);
    }
  }, [response]);

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

  const convertNameToKr = (speciesId: number) => {
    const krName = pokemonNM.find((pokemon) => pokemon.pokemon_species_id === speciesId)?.name;
    return typeof krName == undefined ? "" : (krName as string);
  };

  return (
    <S.HomeOuterContainer mode={mode.mode}>
      {!loading && pokemon.length > 0 && (
        <div className="limitWidth">
          <S.Title>Pokedex</S.Title>
          <S.SubTitle> -- All About POKEMON -- </S.SubTitle>
          <S.Link>
            <Link to="/quiz">Let&apos;s Pokemon Quiz!</Link>
          </S.Link>
          <Toggle />
          <FilterPokemon />
          <S.PokemonList>
            {pokemon.slice(0, 30 * page).map((data, index) => {
              return (
                <PokemonCard
                  ref={index === 30 * page - 4 ? targetRef : null}
                  key={data.id}
                  pokemonInfo={data}
                  pokemonNameKr={convertNameToKr(data.id)}
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
