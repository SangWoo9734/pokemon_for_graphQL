import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { PokemonEvolutionChain, PokemonInfo, PokemonEvolution } from "../../assets/type";

import * as S from "./style";
import Loading from "../../components/Loading";

interface ResponseType {
  loading: boolean;
  data: undefined | PokemonEvolution;
}

interface Props {
  pokemonId: number;
  pokemonChainId: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const statusRename = (status: string) => {
  switch (status) {
    case "hp":
      return "HP";
    case "attack":
      return "ATT";
    case "defense":
      return "DEF";
    case "special-attack":
      return "SP-ATT";
    case "special-defense":
      return "SP-DEF";
    case "speed":
      return "SPD";
    default:
      return status.toUpperCase();
  }
};

function Detail({ pokemonId, pokemonChainId, setModal }: Props) {
  const POKEMON_DETAIL_QUERY = gql`
    query samplePokeAPIquery {
      pokemon_v2_evolutionchain_by_pk(id: ${pokemonChainId}) {
        pokemon_v2_pokemonspecies {
          evolution_chain_id
          pokemon_v2_pokemons {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
                id
              }
            }
          }
        }
      }
      pokemon_v2_pokemon_by_pk(id: ${pokemonId}) {
        id
        name
        pokemon_species_id
        height
        weight
        pokemon_v2_pokemonstats {
          base_stat
          id
          pokemon_v2_stat {
            id
            name
          }
        }
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
            id
          }
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            id
            name
          }
        }
      }
    }
  `;

  const { loading, data }: ResponseType = useQuery(POKEMON_DETAIL_QUERY);
  const [pokemonDetailInfo, setPokemonDeatilInfo] = useState<PokemonInfo>();
  const [pokemonEvolution, setPokemonEvolution] = useState<PokemonEvolutionChain>();

  const fillZero = (number: number) => {
    const numberToString = number.toString();
    return `${"0".repeat(3 - numberToString.length)}${numberToString}`;
  };

  const UpperFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    if (!loading) {
      setPokemonDeatilInfo(data?.pokemon_v2_pokemon_by_pk);
      setPokemonEvolution(data?.pokemon_v2_evolutionchain_by_pk);
    }
  }, [loading]);
  return (
    <S.DetailBackground
      onClick={() => {
        setModal(false);
      }}
    >
      {pokemonDetailInfo && pokemonEvolution && (
        <S.DetailWrapper>
          <S.DetailInfo>
            <S.DetailImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetailInfo.id}.png`}
              alt=""
            />
            <S.DetailStatusWrapper>
              <div>{`No.${fillZero(pokemonDetailInfo.id)}`}</div>
              <S.PokemonName>{UpperFirstLetter(pokemonDetailInfo.name)}</S.PokemonName>
              <S.DetailStatus>
                <div>
                  <S.DetailSubTitle>
                    Height: <span>{pokemonDetailInfo.height}</span>
                  </S.DetailSubTitle>
                  <S.DetailSubTitle>
                    Weight: <span>{pokemonDetailInfo.weight}</span>
                  </S.DetailSubTitle>
                  <div>
                    <S.DetailSubTitle>Type</S.DetailSubTitle>
                    {pokemonDetailInfo.pokemon_v2_pokemontypes.map((type) => {
                      return (
                        <S.PokemonTag
                          key={type.pokemon_v2_type.id}
                          tag={type.pokemon_v2_type.name.toUpperCase()}
                        >
                          {type.pokemon_v2_type.name.toUpperCase()}
                        </S.PokemonTag>
                      );
                    })}
                  </div>
                  <div>
                    <S.DetailSubTitle>Ability</S.DetailSubTitle>
                    {pokemonDetailInfo.pokemon_v2_pokemonabilities.map((ability) => {
                      return (
                        <S.PokemonTag key={ability.pokemon_v2_ability.id} tag={""}>
                          {UpperFirstLetter(ability.pokemon_v2_ability.name)}
                        </S.PokemonTag>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <S.DetailSubTitle>Status</S.DetailSubTitle>
                  <S.StatusTable>
                    {pokemonDetailInfo.pokemon_v2_pokemonstats.map((stats) => {
                      return (
                        <tr key={stats.pokemon_v2_stat.id}>
                          <td>{statusRename(stats.pokemon_v2_stat.name)}</td>
                          <td>{stats.base_stat}</td>
                        </tr>
                      );
                    })}
                  </S.StatusTable>
                </div>
              </S.DetailStatus>
            </S.DetailStatusWrapper>
          </S.DetailInfo>
          <S.DetailEvolutionWrapper>
            <div>Evolution</div>
            <S.DetailEvolution>
              {pokemonEvolution.pokemon_v2_pokemonspecies.map((evo) => {
                return (
                  <S.EvolutionStep key={evo.pokemon_v2_pokemons[0].id}>
                    <S.PokeonEvoImage
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.pokemon_v2_pokemons[0].id}.png`}
                      alt=""
                    />
                    <div>
                      <div>{evo.pokemon_v2_pokemons[0].name}</div>
                      <div>
                        {evo.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map((type) => {
                          return (
                            <S.PokemonTag
                              key={type.pokemon_v2_type.id}
                              tag={type.pokemon_v2_type.name.toUpperCase()}
                            >
                              {type.pokemon_v2_type.name.toUpperCase()}
                            </S.PokemonTag>
                          );
                        })}
                      </div>
                    </div>
                  </S.EvolutionStep>
                );
              })}
            </S.DetailEvolution>
          </S.DetailEvolutionWrapper>
        </S.DetailWrapper>
      )}
      {loading && <Loading />}
    </S.DetailBackground>
  );
}

export default Detail;
