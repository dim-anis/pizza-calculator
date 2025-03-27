/*
  Warnings:

  - You are about to drop the column `hydration` on the `recipes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "recipeServingId" INTEGER NOT NULL,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "recipes_recipeServingId_fkey" FOREIGN KEY ("recipeServingId") REFERENCES "recipe_servings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("createdAt", "id", "name", "notes", "recipeServingId", "updatedAt", "userId") SELECT "createdAt", "id", "name", "notes", "recipeServingId", "updatedAt", "userId" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE UNIQUE INDEX "recipes_recipeServingId_key" ON "recipes"("recipeServingId");
CREATE INDEX "recipes_userId_idx" ON "recipes"("userId");
CREATE UNIQUE INDEX "recipes_userId_name_key" ON "recipes"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
