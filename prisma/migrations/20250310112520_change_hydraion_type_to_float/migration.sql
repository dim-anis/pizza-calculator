/*
  Warnings:

  - You are about to alter the column `hydration` on the `recipes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

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
    "doughballWeight" INTEGER NOT NULL,
    "hydration" REAL NOT NULL DEFAULT 0,
    "notes" TEXT,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("createdAt", "doughballWeight", "hydration", "id", "name", "notes", "updatedAt", "userId") SELECT "createdAt", "doughballWeight", "hydration", "id", "name", "notes", "updatedAt", "userId" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE INDEX "recipes_userId_idx" ON "recipes"("userId");
CREATE UNIQUE INDEX "recipes_userId_name_key" ON "recipes"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
