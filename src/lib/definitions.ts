export type RecipeParsed = {
  id: string;
  name: string;
  doughballWeight: number;
  ingredientRatios: {
    flour: number;
    water: number;
    salt: number;
    yeast: number;
    oil: number;
    sugar: number;
  };
};
