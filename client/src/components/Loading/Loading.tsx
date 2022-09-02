import React, { useEffect, useState } from "react";

import * as S from "./style";

function Loading() {
  const [imageIndex, setImageIndex] = useState<number>(0);
  useEffect(() => {
    const changeLoadingImage = setInterval(function () {
      setImageIndex(Math.floor(Math.random() * 878));
    }, 500);

    return () => clearInterval(changeLoadingImage);
  }, []);

  return (
    <S.LoadingBackground>
      <S.LoadingContentWrapper>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageIndex}.png`}
          alt=""
        />{" "}
        <S.LoadingText>Loading...</S.LoadingText>
      </S.LoadingContentWrapper>
    </S.LoadingBackground>
  );
}

export default Loading;
