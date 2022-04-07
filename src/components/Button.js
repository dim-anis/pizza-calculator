import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: ${props => props.main ? "600" : "400"};
  background: ${props => props.main ? "linear-gradient(45deg, #FF6347, #F55F45)" : "transparent"};
  color: ${props => props.main ? "white" : "var(--primary-color)"};
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