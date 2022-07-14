import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { changeMode } from "../../store/modeSlice";

import * as S from "./style";

function Toggle() {
  const mode = useAppSelector((state) => state.mode.mode);
  const dispatch = useAppDispatch();

  return (
    <S.ToggleOuterWrapper
      onClick={() => {
        dispatch(changeMode());
      }}
    >
      <S.ToggleCircle mode={mode}></S.ToggleCircle>
      <S.ToggleContent>🌛</S.ToggleContent>
      <S.ToggleContent>🌞</S.ToggleContent>
    </S.ToggleOuterWrapper>
  );
}

export default Toggle;
