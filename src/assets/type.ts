export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface Type {
  id: number;
  name: string;
  __typename: string;
}

export interface PokemonType {
  __typename: string;
  pokemon_v2_type: Type;
}

export interface Pokemon {
  id: number;
  name: string;
  pokemon_species_id: number;
  pokemon_v2_pokemontypes: PokemonType[];
  __typename: string;
}

export interface PokemonSpecies {
  __typename: string;
  id: number;
}
