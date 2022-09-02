import { useEffect, useRef, useState } from "react";

import * as S from "./style";

interface Props {
  updateWithNewRank: (arg: string) => Promise<void>;
}

function Modal({ updateWithNewRank }: Props) {
  const [userInput, setUsetInput] = useState<string>("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setUsetInput(event.target.value);
      timer.current = null;
    }, 300);
  };

  return (
    <S.ModalBackground>
      <S.ModalWrapper>
        <S.ModalTitle>⭐️ NEW RANKER ⭐️</S.ModalTitle>
        <S.ModalContent>
          <p>- Enter Your Name -</p>
          <S.ModalInput
            type="text"
            autoFocus
            onChange={(event) => {
              onChange(event);
            }}
          />
        </S.ModalContent>
        <S.ModalBtn onClick={() => void updateWithNewRank(userInput)}>Save</S.ModalBtn>
      </S.ModalWrapper>
    </S.ModalBackground>
  );
}

export default Modal;
