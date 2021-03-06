# POKEDEX

#### πΉ [λ°°ν¬ νμ΄μ§ λ°λ‘κ°κΈ°](https://pokemon-for-graph-ql.vercel.app/)

## κΈ°μ  μ€ν

<div>
  <p>
    <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
    <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/react--icons-brightgreen?style=for-the-badge" />
  </p>
  <p>
    <img src="https://img.shields.io/badge/react--router--dom-CA4245?style=for-the-badge&logo=React-Router&logoColor=white" />
    <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=GraphQL&logoColor=white" />
    <img src="https://img.shields.io/badge/Apollo--GraphQL-311C87?style=for-the-badge&logo=Apollo-GraphQL&logoColor=white" />
    <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  </p>
</div>

## νλ‘μ νΈ μμ

#### `npm install`

νλ‘μ νΈμ κ΄λ ¨λ μμ‘΄μ±μ λͺ¨λ μ€μΉν©λλ€.

#### `npm start`

κ°λ° λͺ¨λλ‘ μ±μ μμν  μ μμ΅λλ€.
λͺλ Ήμ΄ μλ ₯ ν, [http://localhost:3000](http://localhost:3000)λ₯Ό μλ ₯νμ¬ λΈλΌμ°μ μμ νμΈ κ°λ₯ν©λλ€.

## GraphQL
- κΈ°μ‘΄μ REST APIμ λ¨μ μ λ³΄μν λ°μ΄ν° μ μ‘ νμ

#### *REST API λ¨μ *
- μνλ λ°μ΄ν°λ³΄λ€ λ λ§μ λ°μ΄ν°λ₯Ό λ°μμΌ νλ€. (Overfetching)  
- μνλ λ°μ΄ν°κ° μ¬λ¬ EndPointμ ν©μ΄μ Έ μλ€. (Underfetching) 

μ€μ  Pokemon REST APIμμλ μ΄λ¬ν λ¨μ μ λλ μ μμμ΅λλ€.
λ©μΈ Pokemon Cardμ νμν λ°μ΄ν°λ μ΄λ¦, μμ, νμ μ λμΈλ°, REST APIμμλ μ€μ©νμ§ μμ λ°μ΄ν°λ₯Ό λλ¬΄ λ§μ΄ ν¬ν¨νκ³  μμμ΅λλ€.  
![rest](https://user-images.githubusercontent.com/49917043/162118079-0c2a304b-12c4-4963-9784-5f8811940645.gif)  

κ·Έλ¦¬κ³  μμΈ νμ΄μ§μ ν¬ν¨ν  μ§νκ³Όμ μ λν Endpointκ° λ€λ₯Έ Endpointλ‘ μ μλμ΄ μμ΄μ 2ν μ΄μ API ν΅μ μ ν΄μΌνλ λΆνΈν¨λ μμμ΅λλ€.


#### *GraphQL μ¬μ©*
λ€μκ³Ό κ°μ΄ React Projectμμ GraphQLμ μΈνν΄μ£Όμμ΅λλ€.
```JS
// App.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import GlobalStyle from "./GlobalStyle";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root"),
);
```

κ·Έλ¦¬κ³  μλμ κ°μ΄ λ΄κ° μνλ λ°μ΄ν°λ₯Ό μΏΌλ¦¬λ‘ μλ ₯νμ¬ μ¬μ©ν  μ μμμ΅λλ€.
```JS
// ν¬μΌλͺ¬ λ¦¬μ€νΈ μ‘°ν μΏΌλ¦¬
export const POKEMON_LIST_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemonspecies {
      id
      evolution_chain_id
      pokemon_v2_pokemons {
        name
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            id
            name
          }
        }
      }
    }
  }
`;

// ν¬μΌλͺ¬ νκ΅­μ΄ μ΄λ¦ μ‘°ν μΏΌλ¦¬
export const POKEMON_KR_NAME_QUERY = gql`
  query pokeNameKrQuery {
    pokemon_v2_languagename_by_pk(id: 13) {
      pokemon_v2_language {
        pokemon_v2_pokemonspeciesnames {
          name
          pokemon_species_id
        }
      }
    }
  }
`;
```
## Redux(-Toolkit)
### λ€ν¬λͺ¨λ
λ€ν¬λͺ¨λμ κ΄λ ¨λ stateλ₯Ό μ μ­μΌλ‘ κ΄λ¦¬νμ¬ ν νμ΄μ§μμ μ μ©ν μΈνμ΄ μ΄ν λ€λ₯Έ νμ΄μ§μμλ μ μ©λ  μ μλλ‘ μ μνμμ΅λλ€.
```JS
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./modeSlice";
import typeReducer from "./typeSlice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    type: typeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// modeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface modeType {
  mode: boolean;
}

const initialState: modeType = {
  mode: false,
};

export const modeSlice = createSlice({
  name: "modeChange",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("mode", state.mode.toString());
    },
  },
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
```

## Reference
- [https://www.inflearn.com/course/%EC%96%84%ED%8C%8D%ED%95%9C-graphql-apollo](https://www.inflearn.com/course/%EC%96%84%ED%8C%8D%ED%95%9C-graphql-apollo)
- [https://graphql.org/learn/](https://graphql.org/learn/)
- [https://graphql.org/learn/https://graphql.org/learn/](https://graphql.org/learn/https://graphql.org/learn/)
