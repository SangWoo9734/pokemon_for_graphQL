import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PokemonSpecies, PokemonLanguage, PokeNmKr } from "../../assets/type";
import { POKEMON_KR_NAME_QUERY } from "../../hooks/useGraphQL";
import { settingQuestion } from "../../store/quizSlice";
import PokemonQuestion from "./PokemonQuestion";
import PokemonQuizResult from "./PokemonQuizResult";

interface QuizResultType {
  isCorrect: boolean;
  pokemon: PokemonSpecies;
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

function PokemonQuizBasic({ pokemon }: Props) {
  const response = useQuery(POKEMON_KR_NAME_QUERY);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const [pokemonQuestion, setPokemonQuestion] = useState<PokemonSpecies[]>([]);
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
    setPokemonQuestion(pokemon.slice(0, 10));
    dispatch(
      settingQuestion({
        questions: pokemon.slice(0, 10),
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
    if (pokemonQuestion.length > 0 && step < 10) {
      console.log(pokemonQuestion);
      const questionSelector: string[] = [];
      [0, 0, 0].forEach(() => {
        const nameIndex = Math.floor(Math.random() * 151);
        console.log(nameIndex);
        if (difficulty === "Hard") {
          questionSelector.push(
            pokemonQuestion.find((element) => element.pokemon_v2_pokemons[0].id === nameIndex)
              ?.pokemon_v2_pokemons[0].name as string,
          );
        } else {
          questionSelector.push(
            pokemonNM.find((element) => element.pokemon_species_id === nameIndex)?.name as string,
          );
        }
      });

      const answerName =
        difficulty === "Hard"
          ? (pokemonQuestion.find((element) => element.id === pokemonQuestion[step].id)
              ?.pokemon_v2_pokemons[0].name as string)
          : (pokemonNM.find((element) => element.pokemon_species_id === pokemonQuestion[step].id)
              ?.name as string);

      questionSelector.push(answerName);
      console.log(questionSelector);
      console.log(shuffle(questionSelector) as string[]);
      setAnswer(answerName);
      setSelector(shuffle(questionSelector) as string[]);
    }
  }, [pokemonQuestion, step]);

  return (
    <S.QuizWrapper>
      <S.QuizInnerWrapper>
        {pokemonQuestion.length > 0 &&
          pokemonQuestion.map((question, index) => {
            return (
              step === index && (
                <div key={index}>
                  <S.QuizHeader>
                    <div>BASIC MODE</div>
                    <div>{step + 1}/ 10</div>
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
        {step > 9 && <PokemonQuizResult />}
      </S.QuizInnerWrapper>
    </S.QuizWrapper>
  );
}

export default PokemonQuizBasic;
