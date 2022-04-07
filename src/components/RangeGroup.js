import { useState } from "react";
import styled from "styled-components";

import pizzaOptions from "../utils/pizzaOptions";

import TextInput from "./TextInput";
import Range from "./Range";
import Button from "./Button";
import Recipe from "./Recipe";
import Ingredient from "./Ingredient";

const RangeContainer = styled.div`
  width: 90%;
  border-radius: 10px;
  justify-content: space-evenly;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

export default function RangeGroup({ option }) {

  const [numberOfPizzas, setNumberOfPizzas] = useState(0);
  const [pizzaSize, setPizzaSize] = useState(0);
  const [typeOfPizza, setTypeOfPizza] = useState("nyc");

  const [isCalculated, setIsCalculated] = useState(false);

  let currentPizza = pizzaOptions.find(x => x.label === typeOfPizza);
  let ingredients = currentPizza.ingredients;
  let ingredientNames = Object.keys(ingredients);
  let ingredientValues = Object.values(ingredients);
  let totalPercentages = calculateFlour(ingredientValues);
  let totalWeight = calculateTotalWeight(
    currentPizza,
    numberOfPizzas,
    pizzaSize
  );
  let flourWeight = (totalWeight / totalPercentages).toFixed(1);

  function calculateTotalWeight(pizzaType, numberOfPizzas, pizzaSize) {
    return pizzaType.sizeRatio * numberOfPizzas * pizzaSize;
  }

  function calculateFlour(array) {
    return array.reduce(
      (prevValue, currentValue) => prevValue + currentValue
    );
  }

  function calculateIngredient(ingredient) {
    return (flourWeight * ingredient).toFixed(1);
  }

  const handleCalculate = (e) => {
    e.preventDefault();
    setIsCalculated(!isCalculated);
  };

  const [values, setValues] = useState({
    flour: ingredients.flour * 100,
    water: ingredients.water * 100,
    salt: ingredients.salt * 100,
    yeast: ingredients.yeast * 100,
    sugar: ingredients.sugar * 100,
    oil: ingredients.oil * 100
  });

  function handleRange(event) {
    setValues({...values, [event.target.id]: event.target.value});
    console.log(values);
  };

  if (!isCalculated) {
    if (option === 0) {
      return (
        <RangeContainer>
          <TextInput
            options={pizzaOptions}
            typeOfPizza={typeOfPizza}
            handleChange={(e) => setTypeOfPizza(e.target.value)}
          />
          <Range
            itemName="Number of pizzas"
            onChange={(e) => setNumberOfPizzas(e.target.value)}
            min="0"
            max="10"
            step="1"
            value={numberOfPizzas}
          />
          <Range
            itemName="Pizza size (in inches)"
            onChange={(e) => setPizzaSize(e.target.value)}
            min="0"
            max="21"
            step="1"
            value={pizzaSize}
          />
          <Button
              text="Calculate"
              main={true}
              handleClick={handleCalculate}
          />
        </RangeContainer>
      );
    } else if (option === 1) {
      return (
        <RangeContainer>
          <TextInput
            options={pizzaOptions}
            typeOfPizza={typeOfPizza}
            handleChange={(e) => setTypeOfPizza(e.target.value)}
          />
          {Object.keys(ingredients).filter(value => value !== "flour").map((value, index) => (
            <Range
              id={value}
              key={value}
              itemName={value[0].toUpperCase() + value.slice(1)}
              onChange={handleRange}
              min={0}
              max={ingredients[value] > 0.1 ? "100" : "10"}
              step={ingredients[value] > 0.1 ? "1" : "0.5"}
              value={values[value]}
            />
          ))}
          <Button
              text="Calculate"
              main={true}
              handleClick={handleCalculate}
          />
        </RangeContainer>
      );
    } else if (option === 2) {
      return (
        <RangeContainer>
          {Object.keys(ingredients).filter(value => value !== "flour").map((value, index) => (
            <Range
              id={value}
              key={value}
              itemName={value[0].toUpperCase() + value.slice(1)}
              onChange={handleRange}
              min={0}
              max={ingredients[value] > 0.1 ? "100" : "10"}
              step={ingredients[value] > 0.1 ? "1" : "0.5"}
              value={values[value]}
            />
          ))}
          <Button
              text="Calculate"
              main={true}
              handleClick={handleCalculate}
          />
        </RangeContainer>
      );
    }
  } else if (isCalculated) {
    return (
      <Recipe
        numberOfPizzas={numberOfPizzas}
        pizzaSize={pizzaSize}
        typeOfPizza={currentPizza.name}
        handleClick={handleCalculate}
      >
        {ingredientNames.map((ingredient) => (
          <Ingredient
            key={ingredient}
            name={ingredient}
            percentage={(ingredients[ingredient] * 100).toFixed(1) + "%"}
            weight={
              ingredient === "flour"
                ? flourWeight + "g"
                : calculateIngredient(ingredients[ingredient]) + "g"
            }
          />
        ))}
        <Ingredient
          name={"TOTAL:"}
          weight={"≈ " +  totalWeight + "g"}
          isFooter={true}
        />
      </Recipe>
    );
  }
}
