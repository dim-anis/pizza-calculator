/*
  Warnings:

  - A unique constraint covering the columns `[recipeId]` on the table `recipe_servings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipe_servings_recipeId_key" ON "recipe_servings"("recipeId");
