import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font: 1rem 400 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.gray[300]};
  }

  *:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.green[500]};
  }

  body {
    background: ${(props) => props.theme.gray[900]};
  }
`
