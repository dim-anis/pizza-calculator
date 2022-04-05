import styled from "styled-components";

const StyledRow = styled.tr`
  border-top: ${(props) => (props.isFooter ? "1.5px solid white" : "none")};
`;

export default function Ingredient({name, percentage, weight, isFooter}) {
  return (
    <StyledRow isFooter={isFooter}>
      <td>{name}</td>
      <td>{percentage}</td>
      <td>{weight}</td>
    </StyledRow>
  );
}
