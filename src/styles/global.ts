import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.green[500]};
    border-radius: 0.5rem;
  }

  body {
    background: ${(props) => props.theme.gray[900]};
  }

  body, input, textarea, button {
    font: 400 1rem 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.gray[300]};
  }
`
