"use client";

import IngredientList from "@/app/IngredientList";
import { ingredientRatiosToQuantities } from "@/app/_utils/helpers";
import { Button } from "@/components/ui/button";
import { RecipeParsed } from "@/lib/definitions";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getArrayFromOneTo } from "@/app/_utils/helpers";

export default function RecipeDetails({ recipe }: { recipe: RecipeParsed }) {
  const [numOfDoughballs, setNumOfDoughballs] = useState(1);
  const ingredientQuantities = ingredientRatiosToQuantities(
    recipe.doughballWeight * numOfDoughballs,
    recipe.ingredientRatios,
  );

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
        <IngredientList ingredients={ingredientQuantities} />
      </div>
      <div className="space-y-2">
        {recipe.notes ? (
          <>
            <h3 className="font-semibold lg:text-lg">Notes:</h3>
            <p>Some notes about the recipe.</p>
          </>
        ) : (
          <Button>Add notes</Button>
        )}
      </div>
    </div>
  );
}