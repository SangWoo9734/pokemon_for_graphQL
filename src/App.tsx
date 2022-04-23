import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import styled from "styled-components";

import { store } from "./store/store";
import Header from "./components/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

const GlobalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  margin: auto;
`;

const App = () => {
  return (
    <GlobalContainer>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Provider>
    </GlobalContainer>
  );
};

export default App;
