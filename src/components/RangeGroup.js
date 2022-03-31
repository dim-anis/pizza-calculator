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

  const [typeOfPizza, setTypeOfPizza] = useState("nyc");

  const pizza = {

    neapolitan: {
      name: "Neapolitan",
      flour: 1,
      water: 0.6,
      salt: 0.02,
      yeast: 0.01,
      sizeRatio: 25,
    },

    nyc: {
      name: "New York",
      flour: 1,
      water: 0.65,
      salt: 0.02,
      sugar: 0.02,
      oil: 0.02,
      yeast: 0.01,
      sizeRatio: 25
    },

    chicago: {
      name: "Chicago Deep Dish",
      flour: 1,
      water: 0.55,
      salt: 0.02,
      sugar: 0.02,
      oil: 0.2,
      yeast: 0.01,
      sizeRatio: 45
    }
  }

  const pizzaOptions = [
    {
      label: "New York Style",
      value: "nyc"
    },
    {
      label: "Neapolitan",
      value: "neapolitan"
    },
    {
      label: "Chicago Deep Dish",
      value: "chicago"
    }
  ]

  function calculateTotalWeight(pizzaType, numberOfPizzas, pizzaSize) {
    return pizzaType.sizeRatio * numberOfPizzas * pizzaSize;
  }

  const handleCalculate = (e) => {
    e.preventDefault();
    setIsCalculated(true);
  }

  const handlePizzaTypeChange = (e) => {
    console.log(e.target.value);
    setTypeOfPizza(e.target.value);
    console.log(typeOfPizza);
  }
  if (!isCalculated) {
    if (option === 0) {
      return (
        <RangeContainer>
          <TextInput options={pizzaOptions} typeOfPizza={typeOfPizza} handleChange={e => setTypeOfPizza(e.target.value)} />
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
          <TextInput options={pizzaOptions} typeOfPizza={typeOfPizza} handleChange={handlePizzaTypeChange} />
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
      <Recipe numberOfPizzas={numberOfPizzas} typeOfPizza={pizza[typeOfPizza].name}>
        <Ingredient name={"Flour"} percentage={Math.round(pizza[typeOfPizza].flour * 100) + "%"} weight={flourValue}/>
        <Ingredient name={"Water"} percentage={Math.round(pizza[typeOfPizza].water * 100) + "%"} weight={waterValue}/>
        <Ingredient name={"Salt"} percentage={Math.round(pizza[typeOfPizza].salt * 100) + "%"} weight={saltValue}/>
        <Ingredient name={"Yeast"} percentage={Math.round(pizza[typeOfPizza].yeast * 100) + "%"} weight={yeastValue}/>
        <Ingredient name={"TOTAL:"} percentage={""} weight={calculateTotalWeight(pizza.chicago, numberOfPizzas, pizzaSize)}/>
      </Recipe>
    )
  }
}

