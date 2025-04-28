/*
  Warnings:

  - You are about to drop the `IngredientComponent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IngredientComponent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ingredient_components" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "weightInGrams" REAL NOT NULL,
    CONSTRAINT "ingredient_components_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ingredient_components_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
