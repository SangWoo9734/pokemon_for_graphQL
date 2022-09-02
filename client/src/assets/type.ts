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
  pokemon_v2_pokemontypes: PokemonType[];
  __typename: string;
}

export interface PokemonSpecies {
  __typename: string;
  id: number;
  evolution_chain_id: number;
  pokemon_v2_pokemons: Pokemon[];
}

interface Stats {
  name: string;
  id: number;
}

export interface PokemonStats {
  __typename: string;
  base_stat: string;
  pokemon_v2_stat: Stats;
}

interface Ability {
  name: string;
  id: number;
}
export interface PokemonAbility {
  __typename: string;
  pokemon_v2_ability: Ability;
}

export interface PokemonSpeciesDetail {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: PokemonType[];
  __typename: string;
}

export interface PokemonEvolution {
  __typename: string;
  evolution_chain_id: number;
  pokemon_v2_pokemons: PokemonSpeciesDetail[];
}

export interface PokemonEvolutionChain {
  __typename: string;
  pokemon_v2_pokemonspecies: PokemonEvolution[];
}

export interface PokemonInfo {
  __typename: string;
  id: number;
  name: string;
  pokemon_species_id: number;
  height: number;
  weight: number;
  pokemon_v2_pokemonstats: PokemonStats[];
  pokemon_v2_pokemonabilities: PokemonAbility[];
  pokemon_v2_pokemontypes: PokemonType[];
}

export interface PokemonEvolution {
  __typename: string;
  pokemon_v2_evolutionchain_by_pk: PokemonEvolutionChain;
  pokemon_v2_pokemon_by_pk: PokemonInfo;
}

export interface PokemonLanguage {
  __typename: string;
  pokemon_v2_language: PokemonSpeciesNmKr;
}

export interface PokemonSpeciesNmKr {
  __typename: string;
  pokemon_v2_pokemonspeciesnames: PokeNmKr[];
}
export interface PokeNmKr {
  __typename: string;
  name: string;
  pokemon_species_id: number;
}
