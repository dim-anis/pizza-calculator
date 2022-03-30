import styled from "styled-components";

const RecipeBackground = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Recipe({ children }) {
  return (
    <RecipeBackground>
      {children}
    </RecipeBackground>
  );
}
