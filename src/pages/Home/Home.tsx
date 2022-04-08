import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";

import { Pokemon, PokemonSpecies } from "../../assets/type";

import * as S from "./style";
import Loading from "../../components/Loading";
import PokemonCard from "../../components/PokemonCard";
import FilterPokemon from "../../components/FilterPokemon";
import Toggle from "../../components/Toggle";
import { changeMode } from "../../store/modeSlice";

const POKEMON_LIST_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon {
      id
      name
      pokemon_species_id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
          name
        }
      }
    }
    pokemon_v2_pokemonspecies {
      id
    }
  }
`;

// query samplePokeAPIquery {
//   pokemon_v2_evolutionchain_by_pk(id: 1) {
//     pokemon_v2_pokemonspecies {
//       evolution_chain_id
//       id
//       name
//       pokemon_v2_pokemons {
//         id
//         name
//         pokemon_v2_pokemontypes {
//           pokemon_v2_type {
//             name
//             id
//           }
//         }
//         pokemon_v2_pokemonstats {
//           base_stat
//           stat_id
//           pokemon_v2_stat {
//             name
//             id
//           }
//         }
//         height
//         weight
//         pokemon_v2_pokemonabilities {
//           pokemon_v2_ability {
//             id
//             name
//           }
//         }
//       }
//     }
//   }
// }

interface Data {
  pokemon_v2_pokemon: Pokemon[];
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

interface ResponseType {
  loading: boolean;
  data: undefined | Data;
}

function Home() {
  const { loading, data }: ResponseType = useQuery(POKEMON_LIST_QUERY);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const mode = useAppSelector((state) => state.mode);
  const selectedType = useAppSelector((state) => state.type.type);
  const targetRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("mode", mode.mode.toString());
    setPage(1);
    if (!loading) {
      const totalPokemonLength = (data as Data).pokemon_v2_pokemonspecies.length;

      const originPokemon = (data as Data).pokemon_v2_pokemon.slice(0, totalPokemonLength);

      if (selectedType) {
        const filteredPokemon = originPokemon.filter(
          (poke) =>
            poke.pokemon_v2_pokemontypes.filter(
              (type) => type.pokemon_v2_type.name.toUpperCase() === selectedType,
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
      {!loading && pokemon && (
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
                  pokemonInfo={data}
                  key={data.id}
                />
              );
            })}
          </S.PokemonList>
        </div>
      )}
      {loading && pokemon && <Loading />}
    </S.HomeOuterContainer>
  );
}

export default Home;
