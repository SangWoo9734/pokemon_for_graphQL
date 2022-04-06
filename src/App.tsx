import React from "react";
import { Route, Routes } from "react-router";
import styled from "styled-components";

import Header from "./components/Header";
import Home from "./pages/Home";

const GlobalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const App = () => {
  return (
    <GlobalContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </GlobalContainer>
  );
};

export default App;
