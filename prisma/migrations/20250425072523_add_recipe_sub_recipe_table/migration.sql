-- CreateTable
CREATE TABLE "recipe_sub_recipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipeId" INTEGER NOT NULL,
    "subRecipeId" INTEGER NOT NULL,
    "weightInGrams" INTEGER NOT NULL,
    CONSTRAINT "recipe_sub_recipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipe_sub_recipes_subRecipeId_fkey" FOREIGN KEY ("subRecipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
