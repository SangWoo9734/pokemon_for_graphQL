import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PokemonSpecies, PokemonLanguage, PokeNmKr } from "../../assets/type";
import { POKEMON_KR_NAME_QUERY } from "../../hooks/useGraphQL";
import { settingQuestion, setPlayTime } from "../../store/quizSlice";
import PokemonQuestion from "./PokemonQuestion";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemon: PokemonSpecies[];
}

interface NameData {
  pokemon_v2_languagename_by_pk: PokemonLanguage;
}

function PokemonQuizBasic({ pokemon }: Props) {
  const response = useQuery(POKEMON_KR_NAME_QUERY);
  const difficulty = useAppSelector((state) => state.quiz.quizDifficulty);
  const [pokemonQuestion, setPokemonQuestion] = useState<PokemonSpecies[]>([]);
  const [pokemonImage, setPokemonImage] = useState<HTMLImageElement[]>([]);
  const [pokemonNM, setPokemonNM] = useState<PokeNmKr[]>([]);
  const [selector, setSelector] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [startTime] = useState<Date>(new Date());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shuffle = (arr: string[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  useEffect(() => {
    const pokemonSlice = pokemon.slice(0, 10);
    setPokemonQuestion(pokemonSlice);
    dispatch(
      settingQuestion({
        questions: pokemon.slice(0, 10),
      }),
    );

    const imageList: HTMLImageElement[] = [];
    pokemonSlice.forEach((question) => {
      const image = new Image();
      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${question.id}.png`;
      imageList.push(image);
    });

    setPokemonImage(imageList);
  }, [pokemon]);

  useEffect(() => {
    if (!response.loading) {
      const NmData = (response.data as NameData).pokemon_v2_languagename_by_pk.pokemon_v2_language
        .pokemon_v2_pokemonspeciesnames;
      setPokemonNM(NmData);
    }
  }, [response]);

  useEffect(() => {
    if (step >= 10) {
      const endTime = new Date().getTime();
      dispatch(
        setPlayTime({
          playtime: endTime - startTime.getTime(),
        }),
      );
      navigate("/quiz/result");
    }
    if (pokemonQuestion.length > 0 && step < 10) {
      const questionSelector: string[] = [];
      const answerIndex = [0, 0, 0];
      answerIndex.forEach((value, index) => {
        let nameIndex = 0;
        do {
          nameIndex = Math.floor(Math.random() * 151 + 1);
        } while (nameIndex == pokemonQuestion[step].id);

        answerIndex[index] = nameIndex;

        if (difficulty === "hard") {
          const poke = pokemon.find((element) => element.pokemon_v2_pokemons[0].id === nameIndex);
          questionSelector.push(poke?.pokemon_v2_pokemons[0].name as string);
        } else {
          questionSelector.push(
            pokemonNM.find((element) => element.pokemon_species_id === nameIndex)?.name as string,
          );
        }
      });

      const answerName =
        difficulty === "hard"
          ? (pokemonQuestion.find((element) => element.id === pokemonQuestion[step].id)
              ?.pokemon_v2_pokemons[0].name as string)
          : (pokemonNM.find((element) => element.pokemon_species_id === pokemonQuestion[step].id)
              ?.name as string);

      questionSelector.push(answerName);
      setAnswer(answerName);
      setSelector(shuffle(questionSelector));
    }
  }, [pokemonQuestion, step]);

  return (
    <S.QuizWrapper>
      {pokemonQuestion.length * pokemonImage.length > 0 ? (
        step <= 9 && (
          <S.QuizInnerWrapper>
            <S.QuizHeader>
              <div>BASIC MODE</div>
              <div>{step + 1}/ 10</div>
            </S.QuizHeader>
            <PokemonQuestion
              image={pokemonImage[step]}
              answer={answer}
              selector={selector}
              step={step}
              setStep={setStep}
            />
          </S.QuizInnerWrapper>
        )
      ) : (
        <Loading />
      )}
    </S.QuizWrapper>
  );
}

export default PokemonQuizBasic;
