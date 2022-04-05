import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: ${props => props.main ? "600" : "400"};
  background-color: ${props => props.main ? "tomato" : "transparent"};
  color: ${props => props.main ? "white" : "tomato"};
  border: 1px solid tomato;
  transition: 250ms all ease-in-out;

  &:hover {
    background-color: var(--primary-hover-color);
  }
`;

export default function Button({main, text, handleClick}) {
  return(
    <StyledButton main={main} onClick={handleClick}>{text}</StyledButton>
  )
}