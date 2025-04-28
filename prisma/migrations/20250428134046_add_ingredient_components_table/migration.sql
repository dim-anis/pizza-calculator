-- CreateTable
CREATE TABLE "IngredientComponent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "weightInGrams" REAL NOT NULL,
    CONSTRAINT "IngredientComponent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IngredientComponent_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
