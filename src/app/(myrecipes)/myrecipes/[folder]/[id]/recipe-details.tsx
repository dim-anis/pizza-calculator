"use client";

import IngredientList from "@/components/ingredient-list";
import {
  calculateNutritionalContent,
  ingredientRatiosToQuantities,
} from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getArrayFromOneTo } from "@/lib/helpers";
import { type RecipeWithFolders } from "@/lib/queries";
import NutrtitionFacts from "./nutrition-facts";

export default function RecipeDetails({
  recipe,
}: {
  recipe: RecipeWithFolders;
}) {
  const [numOfDoughballs, setNumOfDoughballs] = useState(1);
  const ingredientQuantities = ingredientRatiosToQuantities(
    recipe.doughballWeight * numOfDoughballs,
    {
      flourRatio: recipe.flourRatio,
      waterRatio: recipe.waterRatio,
      saltRatio: recipe.saltRatio,
      yeastRatio: recipe.yeastRatio,
      sugarRatio: recipe.sugarRatio,
      oilRatio: recipe.oilRatio,
    },
  );

  const nutritionalContent = calculateNutritionalContent(ingredientQuantities);

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-col items-start justify-between gap-2">
          <h3 className="font-semibold lg:text-lg">Ingredients</h3>
          <div className="flex items-center space-x-2 text-sm">
            <span>Number of dough balls</span>
            <Select
              defaultValue={numOfDoughballs.toString()}
              onValueChange={(value) => setNumOfDoughballs(Number(value))}
            >
              <SelectTrigger className="w-[auto]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="max-h-40">
                  {getArrayFromOneTo(16).map((num) => (
                    <SelectItem value={`${num}`} key={num}>
                      <span className="pr-1">{num}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <IngredientList ingredientAmounts={ingredientQuantities} />
      </div>
      <NutrtitionFacts {...nutritionalContent} />
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
