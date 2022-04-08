import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 30px;
  text-align: center;
  font-size: 1.3rem;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 200% 200%;
  color: white;
  animation: Gradiant 10s ease infinite;

  @keyframes Gradiant {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
export const HeaderContent = styled.p`
  line-height: 30px;

  a:hover {
    color: lightblue;
    text-decoration: underline;
  }
`;
