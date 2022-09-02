import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #58585842;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 250px;
  background: white;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 black;
  text-align: center;
`;

export const ModalContent = styled.div`
  font-size: 1.3rem;
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-size: 1.7rem;
  font-weight: bold;
  color: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
`;

export const ModalInput = styled.input`
  margin-top: 10px;
  padding: 5px 10px;
  width: 100%;
  border: 2px solid black;
  border-radius: 10px;
`;

export const ModalBtn = styled.button`
  padding: 10px 20px;
  border: 2px solid black;
  border-radius: 10px;
`;
