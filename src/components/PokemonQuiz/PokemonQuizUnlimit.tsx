import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PokemonSpecies, PokemonLanguage, PokeNmKr } from "../../assets/type";
import { POKEMON_KR_NAME_QUERY } from "../../hooks/useGraphQL";
import PokemonQuestion from "./PokemonQuestion";
import { settingQuestion } from "../../store/quizSlice";
import PokemonQuizResult from "./PokemonQuizResult";

interface QuizResultType {
  isCorrect: boolean;
  pokemon: PokemonData;
}

interface Props {
  pokemon: PokemonSpecies[];
}

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

function PokemonQuizUnlimit({ pokemon }: Props) {
  const response = useQuery(POKEMON_KR_NAME_QUERY);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const [pokemonNM, setPokemonNM] = useState<PokeNmKr[]>([]);
  const [selector, setSelector] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const dispatch = useAppDispatch();

  const shuffle = (arr: PokemonSpecies[] | string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  };

  useEffect(() => {
    console.log(pokemon);
    dispatch(
      settingQuestion({
        questions: pokemon,
      }),
    );
  }, [pokemon]);

  useEffect(() => {
    if (!response.loading) {
      const NmData = (response.data as NameData).pokemon_v2_languagename_by_pk.pokemon_v2_language
        .pokemon_v2_pokemonspeciesnames;
      setPokemonNM(NmData);
    }
  }, [response]);

  useEffect(() => {
    console.log(step);
    if (step > -1) {
      const questionSelector: string[] = [];
      [0, 0, 0].forEach(() => {
        const nameIndex = Math.floor(Math.random() * 152);

        if (difficulty === "Hard") {
          questionSelector.push(
            pokemon.find((element) => element.id === nameIndex)?.pokemon_v2_pokemons[0]
              ?.name as string,
          );
        } else {
          questionSelector.push(
            pokemonNM.find((element) => element.pokemon_species_id === nameIndex)?.name as string,
          );
        }
      });

      const answerName: string =
        difficulty === "Hard"
          ? pokemon[step].pokemon_v2_pokemons[0].name
          : (pokemonNM.find(
              (element) => element.pokemon_species_id === pokemon[step].pokemon_v2_pokemons[0].id,
            )?.name as string);

      console.log(pokemonNM);
      questionSelector.push(answerName);
      setAnswer(answerName);
      setSelector(shuffle(questionSelector) as string[]);
    }
  }, [pokemon, step]);

  return (
    <S.QuizWrapper>
      <S.QuizInnerWrapper>
        {pokemon.length > 0 &&
          pokemon.map((question, index) => {
            return (
              step === index && (
                <div key={index}>
                  <S.QuizHeader>
                    <div>UNLIMIT MODE</div>
                    <div>{step} COMBO!!</div>
                  </S.QuizHeader>
                  <PokemonQuestion
                    question={question}
                    answer={answer}
                    selector={selector}
                    step={step}
                    setStep={setStep}
                  />
                </div>
              )
            );
          })}

        {step < 0 && <PokemonQuizResult />}
      </S.QuizInnerWrapper>
    </S.QuizWrapper>
  );
}

export default PokemonQuizUnlimit;
