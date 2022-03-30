import { useState } from "react";
import styled from "styled-components";

import TextInput from "./TextInput.js";
import Range from "./Range";

const RangeContainer = styled.div`
  width: 90%;
  //border: 1px solid #d3d3d3;
  border-radius: 10px;
  justify-content: space-evenly;
  height: auto;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

export default function RangeGroup({option}) {
  const [flourValue, setFlourValue] = useState(0);
  const [waterValue, setWaterValue] = useState(0);
  const [saltValue, setSaltValue] = useState(0);
  const [yeastValue, setYeastValue] = useState(0);

  if (option === 0) {

    return (
      <RangeContainer>
        <TextInput inputs={["Neapolitan Pizza", "NYC Style Pizza", "Chicago Deep Dish Pizza"]} />
        <Range
          itemName = "Number of pizzas"
          onChange = {e => setFlourValue(e.target.value)}
          min="0"
          max="100"
          step="1"
          value={flourValue}
        />
        <Range
          itemName ="Pizza size (in inches)"
          onChange = {e => setWaterValue(e.target.value)}
          min="0"
          max="21"
          step="1"
          value={waterValue}
        />
      </RangeContainer>
    )
  } else if (option === 1) {
    return (
      <RangeContainer>
        <Range
          itemName = "Flour"
          onChange = {e => setFlourValue(e.target.value)}
          min="0"
          max="100"
          step="1"
          value={flourValue}
        />
        <Range
          itemName ="Water"
          onChange = {e => setWaterValue(e.target.value)}
          min="0"
          max="21"
          step="1"
          value={waterValue}
        />
        <Range
          itemName ="Salt"
          onChange = {e => setSaltValue(e.target.value)}
          min="0"
          max="21"
          step="1"
          value={saltValue}
        />
        <Range
          itemName ="Yeast"
          onChange = {e => setYeastValue(e.target.value)}
          min="0"
          max="21"
          step="1"
          value={yeastValue}
        />
      </RangeContainer>
    )
  } else if (option === 2) {
    return (
      <RangeContainer>
        <Range
          itemName = "Flour"
          onChange = {e => setFlourValue(e.target.value)}
          min="0"
          max="100"
          step="1"
          value={flourValue}
        />
        <Range
          itemName ="Water"
          onChange = {e => setWaterValue(e.target.value)}
          min="0"
          max="21"
          step="1"
          value={waterValue}
        />
      </RangeContainer>
    )
  }
}
