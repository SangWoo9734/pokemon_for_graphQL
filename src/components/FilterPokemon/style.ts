import styled from "styled-components";

import { colorOfType } from "../../assets/typeColor";

export const FilterOuterWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  margin: auto;
  padding: 15px;
  border-radius: 10px;

  & > button {
    font-size: 1.3rem;
  }
`;

export const FilterInnerWrapper = styled.div`
  padding: 0 10px;
`;

export const FilterPart = styled.div`
  margin: 10px 0;
`;

export const FilterTitle = styled.div`
  font-size: 1.3rem;
  margin-bottom: 5px;
`;
export const FilterSearch = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.1rem;
  color: black;
`;

export const TypeWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

export const TypeBlock = styled.div<{ color: string; isSelected: boolean }>`
  margin: 5px;
  padding: 3px 10px;
  border-radius: 5px;
  background: ${({ color }) => colorOfType(color)};
  color: white;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};

  &:hover {
    cursor: pointer;
  }
`;
