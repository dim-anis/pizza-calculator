import styled from "styled-components";
import NavItem from "./NavItem";

import { ReactComponent as CloseIcon } from "../static/close-outline.svg";

const RecipeBackground = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  inset: 0 0 0 0;
  padding: 1rem;
  display: flex;
  color: white;
  background: hsl(0 0% 0% / 0.75);
  backdrop-filter: blur(0.3rem);
  z-index: 9999;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const TextContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TextHighlight = styled.em`
  background-image: linear-gradient(45deg, #f3ec78, #af4261);
  background-clip: text;
  font-style: normal;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
`;

export default function Recipe({
  children,
  numberOfPizzas,
  typeOfPizza,
  pizzaSize,
  handleClick
}) {
  return (
    <RecipeBackground>
      <NavItem icon={ <CloseIcon /> } onClick={handleClick}/>
      <TextContainer>
        <h2>
          For {numberOfPizzas} ({pizzaSize + "″"} sized) <TextHighlight>{typeOfPizza}</TextHighlight> pizza(s) you'll
          need:
        </h2>
        <Table>
          <tbody>
            <tr>
              <th>Ingredient</th>
              <th>Percentage</th>
              <th>Weight</th>
            </tr>
            {children}
          </tbody>
        </Table>
      </TextContainer>
    </RecipeBackground>
  );
}
