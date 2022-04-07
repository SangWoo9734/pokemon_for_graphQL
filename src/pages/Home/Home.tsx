import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { Pokemon, PokemonSpecies } from "../../assets/type";

import * as S from "./style";
import Loading from "../../components/Loading";
import PokemonCard from "../../components/PokemonCard";
import SortPokemon from "../../components/SortPokemon";

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
  const [totalPokemon, setTotalPokemon] = useState<number>(0);
  const [page, setPage] = useState<number>(3);

  useEffect(() => {
    if (!loading) {
      setPokemon((data as Data).pokemon_v2_pokemon);
      console.log(data);
      setTotalPokemon((data as Data).pokemon_v2_pokemonspecies.length);
    }
  }, [loading]);

  return (
    <div>
      {!loading && pokemon && (
        <div>
          <S.Title>Pokedex</S.Title>
          <S.SubTitle> -- All About POKEMON -- </S.SubTitle>
          <SortPokemon />
          <S.PokemonList>
            {pokemon.slice(0, 33 * page).map((data) => {
              return <PokemonCard pokemonInfo={data} key={data.id} />;
            })}
          </S.PokemonList>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}

export default Home;
