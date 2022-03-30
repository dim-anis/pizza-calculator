import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: ${props => props.main ? "600" : "400"};
  background-color: ${props => props.main ? "tomato" : "transparent"};
  color: ${props => props.main ? "white" : "tomato"};
  border: 1px solid tomato;
`;

export default function Button({main, text}) {
  return(
    <StyledButton main={main}>{text}</StyledButton>
  )
}