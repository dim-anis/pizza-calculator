import styled from "styled-components";

const RecipeBackground = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  inset: 0 0 0 0;
  padding: 2rem;
  display: flex;
  color: white;
  background: hsl(0 0% 0% / 0.75);
  backdrop-filter: blur(0.3rem);
  z-index: 9999;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const RecipeHeading = styled.h2`

`;

const Table = styled.table`
  width: 100%;
  text-align: left;
`;

export default function Recipe({ children, numberOfPizzas, typeOfPizza }) {
  return (
    <RecipeBackground>
      <RecipeHeading>For {numberOfPizzas} {typeOfPizza} pizza(s) you'll need:</RecipeHeading>
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
    </RecipeBackground>
  );
}
