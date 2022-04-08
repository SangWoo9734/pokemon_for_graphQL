import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import styled from "styled-components";

import { store } from "./store/store";
import Header from "./components/Header";
import Home from "./pages/Home";

const GlobalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const App = () => {
  return (
    <GlobalContainer>
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
    </GlobalContainer>
  );
};

export default App;
