import React from "react";

import * as S from "./style";
import { AiFillGithub } from "react-icons/ai";

function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        Visit Developer <a href="https://github.com/SangWoo9734">Github</a>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}

export default Header;
