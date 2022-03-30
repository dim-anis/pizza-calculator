import { useState } from "react";
import styled from "styled-components";

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

export default function Calculator() {

  const [btnClass, setBtnClass] = useState(0);
  const selectOption = (e, id) => {
    e.preventDefault();
    setBtnClass(id);
  }

  return (
    <Container>
      <ButtonGroup buttons={["easy", "moderate", "hard"]} handleClick={selectOption} btnClass={btnClass} />
      <RangeGroup option={btnClass}/>
    </Container>
  );
}
