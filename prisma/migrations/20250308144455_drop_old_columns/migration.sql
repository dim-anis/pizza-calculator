/*
  Warnings:

  - You are about to drop the column `flourRatio` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `oilRatio` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `saltRatio` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `sugarRatio` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `waterRatio` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `yeastRatio` on the `recipes` table. All the data in the column will be lost.

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
    "notes" TEXT,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("createdAt", "doughballWeight", "id", "name", "notes", "updatedAt", "userId") SELECT "createdAt", "doughballWeight", "id", "name", "notes", "updatedAt", "userId" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE INDEX "recipes_userId_idx" ON "recipes"("userId");
CREATE UNIQUE INDEX "recipes_userId_name_key" ON "recipes"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
