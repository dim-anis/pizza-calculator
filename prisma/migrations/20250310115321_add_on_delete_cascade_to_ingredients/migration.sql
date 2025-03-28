-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipe_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingredientId" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "percentage" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "recipe_ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "recipe_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipe_ingredients" ("id", "ingredientId", "percentage", "recipeId") SELECT "id", "ingredientId", "percentage", "recipeId" FROM "recipe_ingredients";
DROP TABLE "recipe_ingredients";
ALTER TABLE "new_recipe_ingredients" RENAME TO "recipe_ingredients";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
