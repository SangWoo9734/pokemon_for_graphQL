import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PokemonSpecies, PokemonLanguage, PokeNmKr } from "../../assets/type";
import { POKEMON_KR_NAME_QUERY } from "../../hooks/useGraphQL";
import PokemonQuestion from "./PokemonQuestion";
import { settingQuestion, setPlayTime } from "../../store/quizSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemon: PokemonSpecies[];
}
interface NameData {
  pokemon_v2_languagename_by_pk: PokemonLanguage;
}

function PokemonQuizUnlimit({ pokemon }: Props) {
  const response = useQuery(POKEMON_KR_NAME_QUERY);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const [pokemonNM, setPokemonNM] = useState<PokeNmKr[]>([]);
  const [selector, setSelector] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [startTime] = useState<Date>(new Date());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shuffle = (arr: PokemonSpecies[] | string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  useEffect(() => {
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
    if (step < 0) {
      const endTime = new Date().getTime();
      dispatch(
        setPlayTime({
          playtime: endTime - startTime.getTime(),
        }),
      );
      navigate("/quiz/result");
    }
    if (pokemon.length > 0 && step > -1) {
      const questionSelector: string[] = [];
      const answerIndex = [0, 0, 0];
      answerIndex.forEach((value, index) => {
        let nameIndex = 0;
        do {
          nameIndex = Math.floor(Math.random() * 151 + 1);
        } while (answerIndex.find((value) => value == nameIndex));

        answerIndex[index] = nameIndex;

        if (difficulty === "hard") {
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
        difficulty === "hard"
          ? pokemon[step].pokemon_v2_pokemons[0].name
          : (pokemonNM.find(
              (element) => element.pokemon_species_id === pokemon[step].pokemon_v2_pokemons[0].id,
            )?.name as string);

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
      </S.QuizInnerWrapper>
    </S.QuizWrapper>
  );
}

export default PokemonQuizUnlimit;
