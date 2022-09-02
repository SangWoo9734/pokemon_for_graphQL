import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { settingSortType } from "../../store/typeSlice";

import * as S from "./style";
import { TYPE } from "../../assets/typeColor";

interface Props {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

function FilterPokemon({ setSearchWord }: Props) {
  const [openState, setOpenState] = useState<boolean>(false);
  const selectedType = useAppSelector((state) => state.type.type);
  const dispatch = useAppDispatch();

  const isTypeSelected = (type: string) => {
    return selectedType ? selectedType === type : true;
  };
  return (
    <S.FilterOuterWrapper>
      <button
        onClick={() => {
          setOpenState(!openState);
        }}
      >
        {openState ? "▲" : "▼"} Filter
      </button>
      {openState && (
        <S.FilterInnerWrapper>
          <S.FilterPart>
            <S.FilterTitle>&lt; SEARCH &gt;</S.FilterTitle>
            <S.FilterSearch
              type="text"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchWord(event.target.value);
              }}
            />
          </S.FilterPart>
          <S.FilterPart>
            <S.FilterTitle>&lt; TYPE &gt;</S.FilterTitle>
            <S.TypeWrapper>
              {TYPE.map((type, index) => {
                return (
                  <S.TypeBlock
                    color={type}
                    isSelected={isTypeSelected(type)}
                    key={index}
                    onClick={() => {
                      dispatch(settingSortType({ type: selectedType === type ? "" : type }));
                    }}
                  >
                    {type}
                  </S.TypeBlock>
                );
              })}
            </S.TypeWrapper>
          </S.FilterPart>
        </S.FilterInnerWrapper>
      )}
    </S.FilterOuterWrapper>
  );
}

export default FilterPokemon;
