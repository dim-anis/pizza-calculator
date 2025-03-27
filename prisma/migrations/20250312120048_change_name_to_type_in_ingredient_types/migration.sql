/*
  Warnings:

  - You are about to drop the column `name` on the `ingredient_types` table. All the data in the column will be lost.
  - Added the required column `type` to the `ingredient_types` table without a default value. This is not possible if the table is not empty.

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
INSERT INTO "new_ingredient_types" ("description", "id", "isLiquid") SELECT "description", "id", "isLiquid" FROM "ingredient_types";
DROP TABLE "ingredient_types";
ALTER TABLE "new_ingredient_types" RENAME TO "ingredient_types";
CREATE UNIQUE INDEX "ingredient_types_type_key" ON "ingredient_types"("type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
