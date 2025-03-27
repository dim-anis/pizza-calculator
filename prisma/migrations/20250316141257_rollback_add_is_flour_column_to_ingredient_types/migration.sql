/*
  Warnings:

  - You are about to drop the column `isFlour` on the `ingredient_types` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ingredient_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isLiquid" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_ingredient_types" ("description", "id", "isLiquid", "type") SELECT "description", "id", "isLiquid", "type" FROM "ingredient_types";
DROP TABLE "ingredient_types";
ALTER TABLE "new_ingredient_types" RENAME TO "ingredient_types";
CREATE UNIQUE INDEX "ingredient_types_type_key" ON "ingredient_types"("type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
