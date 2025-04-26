"use client";

import IngredientList from "@/components/ingredient-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { calculateIngredientRatios } from "@/lib/helpers";
import { RecipeWithIngredientsWithFolders } from "@/lib/types";
import { Icons } from "@/components/icons";

type Params = {
  recipe: RecipeWithIngredientsWithFolders;
};

export default function RecipeDetails({ recipe }: Params) {
  const [numOfServings, setNumOfServings] = useState(recipe.servings);

  function onClick(inc: number) {
    setNumOfServings(Math.max(1, numOfServings + inc));
  }

  const totalFlourWeight = recipe.ingredients.reduce(
    (total, { ingredient, weightInGrams }) =>
      total + (ingredient.type.type === "Flour" ? weightInGrams : 0),
    0,
  );
  const recipeWithPercentages = calculateIngredientRatios(
    recipe.ingredients,
    totalFlourWeight,
  );
  const ingredientsAdjustedForNumServings = recipeWithPercentages.map((i) => ({
    ...i,
    weightInGrams: i.weightInGrams * numOfServings,
  }));

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col space-y-2">
        <h3 className="font-semibold lg:text-lg">Ingredients</h3>
        <div className="flex items-center space-x-4">
          <h4 className="font-medium text-sm lg:text-md">Number of servings</h4>
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onClick(-1)}
              disabled={numOfServings <= 1}
            >
              <Icons.subtract />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="font-bold tracking-tighter">{numOfServings}</div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onClick(1)}
            >
              <Icons.add />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <IngredientList ingredients={ingredientsAdjustedForNumServings} />
      </div>
      <div className="space-y-2">
        {recipe.notes ? (
          <>
            <h3 className="font-semibold lg:text-lg">Notes:</h3>
            <p>{recipe.notes}</p>
          </>
        ) : (
          <Button>Add notes</Button>
        )}
      </div>
    </div>
  );
}
