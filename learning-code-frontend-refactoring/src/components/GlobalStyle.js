import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #E0E3DA;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;