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
  color: var(--primary-text-color);
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
  width: 100%;

  @media (min-width: 768px) {
    width: 60%;
  }
`;

const TitleH2 = styled.h2`
  line-height: 2.2rem;
  font-weight: normal;
`;

const PizzaNameHighlight = styled.em`
  background-image: linear-gradient(90deg, #f3ec78, var(--color-tomato));
  background-clip: text;
  font-size: 2.2rem;
  font-weight: bold;
  //border-top: 2px dashed var(--primary-text-color);
  //border-bottom: 2px dashed var(--primary-text-color);
  display: block;
  font-style: normal;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PizzaQuantityHighlight = styled.em`
  font-size: 2.5rem;
  font-style: normal;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  border-collapse: collapse;
`;

export default function Recipe({
  children,
  numberOfPizzas,
  typeOfPizza,
  pizzaSize,
  handleClick,
  doughBallWeight
}) {
  return (
    <RecipeBackground>
      <NavItem icon={<CloseIcon />} onClick={handleClick} />
      <TextContainer>
        <TitleH2>
          for <PizzaQuantityHighlight>{numberOfPizzas}</PizzaQuantityHighlight>{" "}
          ({pizzaSize ? pizzaSize + "″" : doughBallWeight + "gr"} sized)
          <PizzaNameHighlight>
            {typeOfPizza} {numberOfPizzas > 1 ? "Pizzas" : "Pizza"}
          </PizzaNameHighlight>{" "}
          you'll need:
        </TitleH2>
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
