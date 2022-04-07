#### 🕹 [배포 페이지 바로가기](https://pokemon-for-graph-ql.vercel.app/)

## 기술 스택

<p>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/react--icons-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/react--router--dom-CA4245?style=for-the-badge&logo=React-Router&logoColor=white" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=GraphQL&logoColor=white" />
</p>

## 프로젝트 시작

#### `npm install`

프로젝트와 관련된 의존성을 모두 설치합니다.

#### `npm start`

개발 모드로 앱을 시작할 수 있습니다.
명령어 입력 후, [http://localhost:3000](http://localhost:3000)를 입력하여 브라우저에서 확인 가능합니다.

## GraphQL
- 기존의 REST API의 단점을 보완한 데이터 전송 형식

#### *REST API 단점*
- 원하는 데이터보다 더 많은 데이터를 받아야 한다. (Overfetching)  
- 원하는 데이터가 여러 EndPoint에 흩어져 있다. (Underfetching) 

실제 Pokemon REST API에서도 이러한 단점을 느낄 수 있었습니다.
메인 Pokemon Card에 필요한 데이터는 이름, 순서, 타입 정도인데, REST API에서는 샤용하지 않을 데이터를 너무 많이 포함하고 있었습니다.  
![rest](https://user-images.githubusercontent.com/49917043/162118079-0c2a304b-12c4-4963-9784-5f8811940645.gif)  

그리고 상세 페이지에 포함할 진화과정에 대한 Endpoint가 다른 Endpoint로 정의되어 있어서 2회 이상 API 통신을 해야하는 불편함도 있었습니다.


#### *GraphQL 사용*
다음과 같이 React Project에서 GraphQL을 세팅해주었습니다.
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

그리고 아래와 같이 내가 원하는 데이터를 쿼리로 입력하여 사용할 수 있었습니다.
```JS
const POKEMON_LIST_QUERY = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon {
      id
      name
      pokemon_species_id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
          name
        }
      }
    }
  }
`;
```

## Reference
- [https://www.inflearn.com/course/%EC%96%84%ED%8C%8D%ED%95%9C-graphql-apollo](https://www.inflearn.com/course/%EC%96%84%ED%8C%8D%ED%95%9C-graphql-apollo)
- [https://graphql.org/learn/](https://graphql.org/learn/)
- [https://graphql.org/learn/https://graphql.org/learn/](https://graphql.org/learn/https://graphql.org/learn/)
