"use client";

import { useState } from "react";
import IngredientList from "@/components/ingredient-list";
import { calculateIngredientWeights } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultRecipesForm from "./default-recipes-form";
import { UseFormReset } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/icons";
import { BakersFormulaForm, RecipeWithIngredients } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";

type Props = {
  recipes: (RecipeWithIngredients & { servingWeight: number })[];
};

export default function Calculator({ recipes }: Props) {
  const [selectedRecipe, setSelectedRecipe] = useState<
    RecipeWithIngredients & { servingWeight: number }
  >(recipes[0]);

  function onSubmit(updatedRecipe: BakersFormulaForm) {
    setSelectedRecipe({
      ...updatedRecipe,
      ingredients: calculateIngredientWeights(
        updatedRecipe.servings * updatedRecipe.servingWeight,
        updatedRecipe.ingredients,
      ),
    });
  }

  function onSelectChange(
    recipeName: string,
    resetForm: UseFormReset<BakersFormulaForm>,
  ) {
    const selectedRecipe = recipes.find((recipe) => recipe.name === recipeName);
    if (selectedRecipe) {
      setSelectedRecipe(selectedRecipe);
      resetForm(selectedRecipe);
    }
  }

  return (
    <section
      id="calculator"
      className="container mx-auto space-y-3 py-4 md:py-6 lg:py-12"
    >
      <div className="mx-auto grid gap-6 max-w-5xl md:grid-cols-2 border-1 p-6 rounded-2xl">
        <Tabs defaultValue="basicSettings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basicSettings">Basic</TabsTrigger>
            <TabsTrigger value="advancedSettings" disabled>
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basicSettings">
            <DefaultRecipesForm
              defaultValues={selectedRecipe}
              recipes={recipes}
              handleSubmit={onSubmit}
              handleSelectChange={onSelectChange}
            />
          </TabsContent>
          {/* <TabsContent value="advancedSettings"> */}
          {/*   <CustomRecipeForm */}
          {/*     defaultValues={{ */}
          {/*       name: defaultPizzaName, */}
          {/*       settings: defaultPizzaSettings, */}
          {/*     }} */}
          {/*     handleSubmit={onSubmit} */}
          {/*   /> */}
          {/* </TabsContent> */}
        </Tabs>
        <Card className="border-none shadow-none">
          <CardHeader>
            <div className="flex flex-row justify-between truncate">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl truncate">
                {selectedRecipe.name}
              </h2>
              {/* <DropdownMenu> */}
              {/*   <DropdownMenuTrigger asChild> */}
              {/*     <Button variant="ghost" size="icon"> */}
              {/*       <Icons.more /> */}
              {/*     </Button> */}
              {/*   </DropdownMenuTrigger> */}
              {/*   <DropdownMenuContent> */}
              {/*     <DropdownMenuItem asChild> */}
              {/*       <Link href={``}> */}
              {/*         <Icons.bookmark className="mr-2 h-4 w-4" /> */}
              {/*         <span>{`Save`}</span> */}
              {/*       </Link> */}
              {/*     </DropdownMenuItem> */}
              {/*     <DropdownMenuItem asChild> */}
              {/*       <Link href={``}> */}
              {/*         <Icons.print className="mr-2 h-4 w-4" /> */}
              {/*         <span>{`Print`}</span> */}
              {/*       </Link> */}
              {/*     </DropdownMenuItem> */}
              {/*     <DropdownMenuItem asChild> */}
              {/*       <Link href={``}> */}
              {/*         <Icons.share className="mr-2 h-4 w-4" /> */}
              {/*         <span>{`Share`}</span> */}
              {/*       </Link> */}
              {/*     </DropdownMenuItem> */}
              {/*   </DropdownMenuContent> */}
              {/* </DropdownMenu> */}
            </div>
          </CardHeader>
          <CardContent>
            <IngredientList ingredients={selectedRecipe.ingredients} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
