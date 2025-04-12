"use client";

import IngredientList from "@/components/ingredient-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getArrayFromOneTo } from "@/lib/helpers";
import { RecipeWithIngredientsWithFolders } from "@/lib/types";
import { Label } from "@/components/ui/label";

type Params = {
  recipe: RecipeWithIngredientsWithFolders;
};

export default function RecipeDetails({ recipe }: Params) {
  const [numOfServings, setNumOfServings] = useState(recipe.servings);
  const ingredientsAdjustedForNumServings = recipe.ingredients.map((i) => ({
    ...i,
    weightInGrams: i.weightInGrams * numOfServings,
  }));

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-col items-start justify-between gap-2">
          <h3 className="font-semibold lg:text-lg">Ingredients</h3>
          <div className="flex items-center space-x-2 text-sm">
            <Label>Number of servings</Label>
            <Select
              defaultValue={numOfServings.toString()}
              onValueChange={(value) => setNumOfServings(Number(value))}
            >
              <SelectTrigger className="w-[auto]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getArrayFromOneTo(10).map((num) => (
                  <SelectItem value={`${num}`} key={num}>
                    <span className="pr-1">{num}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
