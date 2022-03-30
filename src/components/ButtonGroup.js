import styled from "styled-components";

import OptionsButton from "./OptionsButton";

const ButtonGroupContainer = styled.div`
  display: flex;
  width: auto;
  justify-content: center;
  width: auto;
  border-radius: 5px;
`;

export default function ButtonGroup({ buttons, handleClick, btnClass }) {
  return (
    <ButtonGroupContainer>
      {buttons.map((buttonLabel, index) => (
        <OptionsButton
          name = {buttonLabel}
          key = {index}
          onClick = {(e) => handleClick(e, index)}
          className = {index === btnClass ? true : false}
        />
      ))}
    </ButtonGroupContainer>
  );
}
