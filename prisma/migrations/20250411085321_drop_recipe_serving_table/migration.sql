/*
  Warnings:

  - You are about to drop the `recipe_servings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `recipeServingId` on the `recipes` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "recipe_servings";
PRAGMA foreign_keys=on;

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
    "servings" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("createdAt", "id", "name", "notes", "servings", "updatedAt", "userId") SELECT "createdAt", "id", "name", "notes", "servings", "updatedAt", "userId" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE INDEX "recipes_userId_idx" ON "recipes"("userId");
CREATE UNIQUE INDEX "recipes_userId_name_key" ON "recipes"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
