"use client";

import { useState } from "react";
import IngredientList from "@/components/ingredient-list";
import { calculateIngredientWeights } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultRecipeForm from "./default-recipe-form";
import { UseFormReset } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/icons";
import { BakersFormulaForm, RecipeWithGroupedIngredients } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";

type Props = {
  recipes: RecipeWithGroupedIngredients[];
};

export default function Calculator({ recipes }: Props) {
  const [selectedRecipe, setSelectedRecipe] =
    useState<RecipeWithGroupedIngredients>(recipes[0]);

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
      <div className="mx-auto max-w-5xl border-1 p-6 rounded-2xl ">
        <Tabs
          defaultValue="basicSettings"
          className="space-y-6"
          onValueChange={() => console.log("changed tabs")}
        >
          <TabsList className="mx-auto grid w-full grid-cols-2">
            <TabsTrigger value="basicSettings">Basic</TabsTrigger>
            <TabsTrigger value="advancedSettings">Advanced</TabsTrigger>
          </TabsList>
          <div className="grid gap-6 md:gap-4 md:grid-cols-[1fr_auto_1fr]">
            <TabsContent value="basicSettings">
              <DefaultRecipeForm
                defaultValues={selectedRecipe}
                recipes={recipes}
                handleSubmit={onSubmit}
                handleSelectChange={onSelectChange}
              />
            </TabsContent>
            <TabsContent value="advancedSettings">
              <DefaultRecipeForm
                type="advancedForm"
                defaultValues={selectedRecipe}
                recipes={recipes}
                handleSubmit={onSubmit}
                handleSelectChange={onSelectChange}
              />
            </TabsContent>
            <Separator orientation="vertical" />
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
                <IngredientList
                  ingredients={Object.values(selectedRecipe.ingredients).flat()}
                />
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
