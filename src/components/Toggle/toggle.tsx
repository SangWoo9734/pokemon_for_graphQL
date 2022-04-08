import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { changeMode } from "../../store/modeSlice";

import * as S from "./style";

function toggle() {
  const mode = useAppSelector((state) => state.mode);
  const dispatch = useAppDispatch();

  return (
    <S.ToggleOuterWrapper
      onClick={() => {
        dispatch(changeMode());
      }}
    >
      <S.ToggleCircle mode={mode.mode}></S.ToggleCircle>
      <S.ToggleContent>🌛</S.ToggleContent>
      <S.ToggleContent>🌞</S.ToggleContent>
    </S.ToggleOuterWrapper>
  );
}

export default toggle;
