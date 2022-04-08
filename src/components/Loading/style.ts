import styled from "styled-components";

export const LoadingBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: none;
  width: 100vw;
  height: 100vh;
  background: #000000a8;
`;

export const LoadingContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    background: white;
    border-radius: 50px;
    box-shadow: 0 0 20px 0 black;
  }
`;

export const LoadingText = styled.p`
  margin: 0;
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  animation-duration: 1.5s;
  animation-name: nameColor;
  animation-iteration-count: infinite;

  @keyframes nameColor {
    0% {
      color: #ffffff;
    }
    50% {
      color: #909090;
    }
    100% {
      color: #ffffff;
    }
  }
`;
