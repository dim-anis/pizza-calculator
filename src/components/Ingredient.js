import styled from "styled-components";

const IngredientContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

`;

export default function Ingredient({name, percentage, weight}) {
  return (
    <IngredientContainer>
      <p>{name}</p>
      <p>{percentage}</p>
      <p>{weight}</p>
    </IngredientContainer>
  );
}
