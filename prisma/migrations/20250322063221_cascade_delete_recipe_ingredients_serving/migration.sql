-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipe_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingredientId" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "percentage" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "recipe_ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipe_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipe_ingredients" ("id", "ingredientId", "percentage", "recipeId") SELECT "id", "ingredientId", "percentage", "recipeId" FROM "recipe_ingredients";
DROP TABLE "recipe_ingredients";
ALTER TABLE "new_recipe_ingredients" RENAME TO "recipe_ingredients";
CREATE TABLE "new_recipe_servings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "weight" REAL NOT NULL DEFAULT 0,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "recipe_servings_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipe_servings" ("id", "quantity", "recipeId", "weight") SELECT "id", "quantity", "recipeId", "weight" FROM "recipe_servings";
DROP TABLE "recipe_servings";
ALTER TABLE "new_recipe_servings" RENAME TO "recipe_servings";
CREATE UNIQUE INDEX "recipe_servings_recipeId_key" ON "recipe_servings"("recipeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
