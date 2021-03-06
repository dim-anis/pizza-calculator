import { useEffect, useState } from "react";
import styled from "styled-components";

import pizzaOptions from "../utils/pizzaRecipes";
import {
  addUpAllPercentages,
  calculateIngredientWeight,
} from "../utils/utilFuncs";

import SelectOption from "./SelectOption";
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
  const [doughBallWeight, setDoughBallWeight] = useState(0);

  const [isCalculated, setIsCalculated] = useState(false);

  let currentPizza = pizzaOptions.find((x) => x.label === typeOfPizza);
  let ingredients = currentPizza.ingredients;
  let ingredientNames = Object.keys(ingredients);
  let ingredientValues = Object.values(ingredients);
  let totalPercentages = addUpAllPercentages(ingredientValues);
  let totalDoughWeight = currentPizza.sizeRatio * numberOfPizzas * pizzaSize;
  let flourWeight = (totalDoughWeight / totalPercentages).toFixed(1);

  const [values, setValues] = useState({ ...ingredients });

  let ingredientValuesFromBall = Object.values(values);
  let ingredientKeysFromBall = Object.keys(values);
  let flourTotalFromBall = (
    (doughBallWeight * numberOfPizzas) /
    addUpAllPercentages(ingredientValuesFromBall)
  ).toFixed(1);

  const handleCalculate = (e) => {
    e.preventDefault();
    setIsCalculated(!isCalculated);
  };

  function handleRange(event) {
    setValues({ ...values, [event.target.id]: parseFloat(event.target.value) });
  }

  function handleOptionSelect(event) {
    setTypeOfPizza(event.target.value);
  }

  useEffect(() => {
    setValues({ ...ingredients });
  }, [ingredients]);

  const [hardValues, setHardValues] = useState({
    flour: 0,
    water: 0,
    salt: 0,
    yeast: 0,
    sugar: 0,
    oil: 0
  });

  if (option === 0) {
    if (!isCalculated) {
      return (
        <RangeContainer>
          <SelectOption
            options={pizzaOptions}
            typeOfPizza={typeOfPizza}
            handleChange={handleOptionSelect}
          />
          <Range
            itemName="Number of pizzas"
            handleChange={(e) => setNumberOfPizzas(e.target.value)}
            min="0"
            max="10"
            step="1"
            value={numberOfPizzas}
          />
          <Range
            itemName="Pizza size (in inches)"
            handleChange={(e) => setPizzaSize(e.target.value)}
            min="0"
            max="21"
            step="1"
            value={pizzaSize}
          />
          <Button text="Calculate" main={true} handleClick={handleCalculate} />
        </RangeContainer>
      );
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
                  : calculateIngredientWeight(
                      ingredients[ingredient],
                      flourWeight
                    ) + "g"
              }
            />
          ))}
          <Ingredient
            name={"TOTAL:"}
            weight={"??? " + totalDoughWeight + "g"}
            isFooter={true}
          />
        </Recipe>
      );
    }
  } else if (option === 1) {
    if (!isCalculated) {
      return (
        <RangeContainer>
          <SelectOption
            options={pizzaOptions}
            typeOfPizza={typeOfPizza}
            handleChange={handleOptionSelect}
          />
          <Range
            itemName="Weight of a doughball"
            handleChange={(e) => setDoughBallWeight(e.target.value)}
            min="0"
            max="500"
            step="10"
            value={doughBallWeight}
          />
          <Range
            itemName="Number of pizzas"
            handleChange={(e) => setNumberOfPizzas(e.target.value)}
            min="0"
            max="20"
            value={numberOfPizzas}
          />
          <Range
            itemName="Hydration (%)"
            id={"water"}
            handleChange={handleRange}
            min="0"
            max="1"
            step="0.05"
            value={values.water}
          />
          <Button text="Calculate" main={true} handleClick={handleCalculate} />
        </RangeContainer>
      );
    } else if (isCalculated) {
      return (
        <Recipe
          numberOfPizzas={numberOfPizzas}
          doughBallWeight={doughBallWeight}
          typeOfPizza={currentPizza.name}
          handleClick={handleCalculate}
        >
          {ingredientKeysFromBall.map((ingredient) => (
            <Ingredient
              key={ingredient}
              name={ingredient}
              percentage={(values[ingredient] * 100).toFixed(1) + "%"}
              weight={
                ingredient === "flour"
                  ? flourTotalFromBall + "g"
                  : calculateIngredientWeight(
                      values[ingredient],
                      flourTotalFromBall
                    ) + "g"
              }
            />
          ))}
          <Ingredient
            name={"TOTAL:"}
            weight={"??? " + doughBallWeight * numberOfPizzas + "g"}
            isFooter={true}
          />
        </Recipe>
      );
    }
  } else if (option === 2) {
    if (!isCalculated) {
      return (
        <RangeContainer>
          {Object.keys(hardValues).map((ingredient, index) => (
            <Range
              id={ingredient}
              itemName={
                ingredient === "flour"
                  ? ingredient.slice(0, 1).toUpperCase() +
                    ingredient.slice(1) +
                    " (g)"
                  : ingredient.slice(0, 1).toUpperCase() +
                    ingredient.slice(1) +
                    " (%)"
              }
              key={ingredient + index}
              handleChange={(e) =>
                setHardValues({
                  ...hardValues,
                  [e.target.id]: e.target.value,
                })
              }
              min="0"
              max={
                ingredient === "water"
                  ? "100"
                  : ingredient === "flour"
                  ? "1000"
                  : ingredient === "yeast"
                  ? "1"
                  : "10"
              }
              step={
                ingredient === "water"
                  ? "5"
                  : ingredient === "flour"
                  ? "50"
                  : ingredient === "yeast"
                  ? "0.1"
                  : "0.5"
              }
              value={hardValues[ingredient]}
            />
          ))}
          <Button text="Calculate" main={true} handleClick={handleCalculate} />
        </RangeContainer>
      );
    } else if (isCalculated) {
      return (
        <Recipe
          numberOfPizzas={"?"}
          typeOfPizza={"Custom"}
          handleClick={handleCalculate}
        >
          {Object.keys(hardValues).map((ingredient) => (
            <Ingredient
              key={ingredient}
              name={ingredient}
              percentage={
                ingredient === "flour" ? "100%" : hardValues[ingredient] + "%"
              }
              weight={
                ingredient === "flour"
                  ? hardValues.flour + "g"
                  : calculateIngredientWeight(
                      hardValues[ingredient] / 100,
                      hardValues.flour
                    ) + "g"
              }
            />
          ))}
          <Ingredient
            name={"TOTAL:"}
            weight={"??? " +
              (parseFloat(hardValues.flour) +
              (addUpAllPercentages(Object.values(hardValues).slice(1)) / 100) *
                hardValues.flour).toFixed() +
              "g"
            }
            isFooter={true}
          />
        </Recipe>
      );
    }
  }
}
