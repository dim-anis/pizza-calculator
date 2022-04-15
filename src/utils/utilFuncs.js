export function addUpAllPercentages(array) {
    return array.reduce((prevValue, currentValue) => parseFloat(prevValue) + parseFloat(currentValue));
  }

export function calculateIngredientWeight(ingredient, flourWeight) {
return (flourWeight * ingredient).toFixed(1);
}