/*
  Warnings:

  - Added the required column `recipeServingId` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipe_servings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "weight" REAL NOT NULL DEFAULT 0,
    "recipeId" TEXT NOT NULL
);
INSERT INTO "new_recipe_servings" ("id", "quantity", "recipeId", "weight") SELECT "id", "quantity", "recipeId", "weight" FROM "recipe_servings";
DROP TABLE "recipe_servings";
ALTER TABLE "new_recipe_servings" RENAME TO "recipe_servings";
CREATE TABLE "new_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "hydration" REAL NOT NULL DEFAULT 0,
    "notes" TEXT,
    "recipeServingId" INTEGER NOT NULL,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "recipes_recipeServingId_fkey" FOREIGN KEY ("recipeServingId") REFERENCES "recipe_servings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("createdAt", "hydration", "id", "name", "notes", "updatedAt", "userId") SELECT "createdAt", "hydration", "id", "name", "notes", "updatedAt", "userId" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE UNIQUE INDEX "recipes_recipeServingId_key" ON "recipes"("recipeServingId");
CREATE INDEX "recipes_userId_idx" ON "recipes"("userId");
CREATE UNIQUE INDEX "recipes_userId_name_key" ON "recipes"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
