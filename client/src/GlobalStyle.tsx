import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* reset */
@font-face {
  font-family: "PKMN RBYGSC";
  src: url("./assets/static/font/PKMN RBYGSC.ttf") format("truetype");
}

@font-face {
  font-family: "KARMATIC ARCADE";
  src: url("./assets/static/font/KARMATIC ARCADE.ttf") format("truetype");
}

  *{margin:0;padding:0;font:inherit;color:inherit;}
  *,:after, :before {box-sizing:border-box;flex-shrink:0;}
  :root {-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%;text-size-adjust:100%;cursor:default;line-height:1.5;overflow-wrap:break-word;-moz-tab-size:4;tab-size:4}
  html {font-size: 62.5%; scroll-behavior: smooth;}
  html, body {width: 100%; height:100%; margin: 0 auto; color: black}
  img, picture, video, canvas {display: block;max-width:100%;};
  li {list-style: none};
  p {margin: 0};
  button {background:none;border:0;cursor:pointer;}
  a {text-decoration:none}
  table {border-collapse:collapse;border-spacing:0}

  * { font-family: 'PKMN RBYGSC'; }
`;

export default GlobalStyle;
