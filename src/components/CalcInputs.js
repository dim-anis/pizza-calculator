import { useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import RangeGroup from "./RangeGroup";

const Container = styled.div`
  margin: auto auto;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  width: 90%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-evenly;
`;

export default function Calculator() {

  const [btnClass, setBtnClass] = useState(0);
  const handleClick = (e, id) => {
    e.preventDefault();
    setBtnClass(id);
  }

  return (
    <Container>
      <ButtonGroup buttons={["easy", "moderate", "hard"]} handleClick={handleClick} btnClass={btnClass} />
      <RangeGroup option={btnClass}/>
      <ButtonContainer>
        <Button text="Settings" />
        <Button text="Calculate" main={true} />
      </ButtonContainer>
    </Container>
  );
}
