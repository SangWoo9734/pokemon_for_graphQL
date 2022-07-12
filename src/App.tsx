import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import styled from "styled-components";

import { store } from "./store/store";
import Header from "./components/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Rank from "./pages/Rank";
import PokemonQuizResult from "./components/PokemonQuiz/PokemonQuizResult";

const GlobalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  margin: auto;
`;

const Title = styled.div`
  padding: 0 15px;
  padding-top: 20px;
  font-family: "KARMATIC ARCADE";
  font-size: 3rem;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 1.3rem;
  text-align: center;
`;

const App = () => {
  return (
    <GlobalContainer>
      <Provider store={store}>
        <Header />
        <Title>Pokedex</Title>
        <SubTitle> -- All About POKEMON -- </SubTitle>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/result" element={<PokemonQuizResult />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </Provider>
    </GlobalContainer>
  );
};

export default App;
