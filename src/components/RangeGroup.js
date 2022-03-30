import { useState } from "react";
import styled from "styled-components";

import TextInput from "./TextInput";
import Range from "./Range";
import Button from "./Button";
import Recipe from "./Recipe";
import Ingredient from "./Ingredient";

const RangeContainer = styled.div`
  width: 90%;
  border-radius: 10px;
  justify-content: space-around;
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-evenly;
  margin: 0 auto;
`;

export default function RangeGroup({option}) {
  const [flourValue, setFlourValue] = useState(0);
  const [waterValue, setWaterValue] = useState(0);
  const [saltValue, setSaltValue] = useState(0);
  const [yeastValue, setYeastValue] = useState(0);
  const [oilValue, setOilValue] = useState(0);

  const [numberOfPizzas, setNumberOfPizzas] = useState(0);
  const [pizzaSize, setPizzaSize] = useState(0);

  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    setIsCalculated(true);
    console.log(pizzaSize * numberOfPizzas * 25);
  }

  if (!isCalculated) {

    if (option === 0) {

      return (
        <RangeContainer>
          <TextInput inputs={["Neapolitan Pizza", "NYC Style Pizza", "Chicago Deep Dish Pizza"]} />
          <Range
            itemName = "Number of pizzas"
            onChange = {e => setNumberOfPizzas(e.target.value)}
            min="0"
            max="10"
            step="1"
            value={numberOfPizzas}
          />
          <Range
            itemName ="Pizza size (in inches)"
            onChange = {e => setPizzaSize(e.target.value)}
            min="0"
            max="21"
            step="1"
            value={pizzaSize}
          />
          <ButtonContainer>
            <Button text="Settings" />
            <Button text="Calculate" main={true} handleClick={handleCalculate} />
          </ButtonContainer>
        </RangeContainer>
      )
    } else if (option === 1) {
      return (
        <RangeContainer>
          <TextInput inputs={["Neapolitan Pizza", "NYC Style Pizza", "Chicago Deep Dish Pizza"]} />
          <Range
            itemName ="Hydration %"
            onChange = {e => setWaterValue(e.target.value)}
            min="0"
            max="100"
            step="1"
            value={waterValue}
          />
          <Range
            itemName ="Salt %"
            onChange = {e => setSaltValue(e.target.value)}
            min="0"
            max="10"
            step="0.5"
            value={saltValue}
          />
          <Range
            itemName ="Oil %"
            onChange = {e => setOilValue(e.target.value)}
            min="0"
            max="10"
            step="0.5"
            value={oilValue}
          />
          <ButtonContainer>
            <Button text="Settings" />
            <Button text="Calculate" main={true} handleClick={handleCalculate} />
          </ButtonContainer>
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
          <ButtonContainer>
            <Button text="Settings" />
            <Button text="Calculate" main={true} handleClick={handleCalculate} />
          </ButtonContainer>
        </RangeContainer>
      )
    }
  } else if (isCalculated) {
    return (
      <Recipe>
        <Ingredient name={"flour"} percentage={"percentage"} weight={flourValue}/>
        <Ingredient name={"water"} percentage={"percentage"} weight={waterValue}/>
        <Ingredient name={"salt"} percentage={"percentage"} weight={saltValue}/>
        <Ingredient name={"yeast"} percentage={"percentage"} weight={yeastValue}/>
      </Recipe>
    )
  }
}
