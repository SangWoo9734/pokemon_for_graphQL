import { gql } from "@apollo/client";

export const POKEMON_LIST_QUERY = gql`
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

export const POKEMON_KR_NAME_QUERY = gql`
  query pokeNameKrQuery {
    pokemon_v2_languagename_by_pk(id: 13) {
      pokemon_v2_language {
        pokemon_v2_pokemonspeciesnames {
          name
          pokemon_species_id
        }
      }
    }
  }
`;
