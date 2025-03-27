-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipe_servings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "weight" REAL NOT NULL DEFAULT 0,
    "recipeId" TEXT
);
INSERT INTO "new_recipe_servings" ("id", "quantity", "recipeId", "weight") SELECT "id", "quantity", "recipeId", "weight" FROM "recipe_servings";
DROP TABLE "recipe_servings";
ALTER TABLE "new_recipe_servings" RENAME TO "recipe_servings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
