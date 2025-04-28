/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `ingredient_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ingredient_types_type_key" ON "ingredient_types"("type");
