import styled from "styled-components";

const StyledRow = styled.tr`
  border-top: ${(props) => (props.borderTop ? "1px solid white" : "none")};
`;

export default function Ingredient({name, percentage, weight, borderTop}) {
  return (
    <StyledRow borderTop={borderTop}>
      <td>{name}</td>
      <td>{percentage}</td>
      <td>{weight}</td>
    </StyledRow>
  );
}
