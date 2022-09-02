import styled from "styled-components";

export const ToggleOuterWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: fit-content;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-radius: 20px;
  box-shadow: inset 0px 0px 5px 0px #909090;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
`;
export const ToggleCircle = styled.div<{ mode: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ mode }) => (mode ? "38px" : "3px")};
  aspect-ratio: 1;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 50%;
  background: white;
  transition: all 0.5s;
`;

export const ToggleContent = styled.div`
  width: 35px;
  font-size: 2.2rem;
  text-align: center;
`;
