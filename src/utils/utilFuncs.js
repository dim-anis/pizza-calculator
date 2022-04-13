export function addUpAllPercentages(array) {
    return array.reduce((prevValue, currentValue) => prevValue + currentValue);
  }

export function calculateIngredientWeight(ingredient, flourWeight) {
return (flourWeight * ingredient).toFixed(1);
}