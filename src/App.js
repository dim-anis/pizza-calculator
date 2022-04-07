import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Banner from "./components/Banner";
import CalcInputs from "./components/CalcInputs";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-tomato-light: hsl(9 100% 97%);
    --color-tomato: hsl(9 100% 64%);
    --color-tomato-dark: hsl(9 100% 54%);
    --color-snowwhite: hsl(0 100% 99%);
    --color-slategray: hsl(204 19% 26%);
    --color-lightgray: hsl(0 0% 83%);

    --primary-color: var(--color-tomato);
    --primary-hover-color: var(--color-tomato-dark);
    --primary-selected: var(--color-tomato-light);
    --primary-text-color: var(--color-snowwhite);
    --secondary-text-color: var(--color-slategray);
    --gray-inactive-color: var(--color-lightgray);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: 'Poppins', sans-serif;
  }

  img, picture, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
  isolation: isolate;
}
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Banner />
        <CalcInputs />
      </Container>
    </>
  );
}

export default App;
