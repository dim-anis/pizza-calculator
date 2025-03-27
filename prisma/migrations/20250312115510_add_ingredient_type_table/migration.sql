-- CreateTable
CREATE TABLE "ingredient_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isLiquid" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ingredients_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ingredient_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ingredients" ("id", "name") SELECT "id", "name" FROM "ingredients";
DROP TABLE "ingredients";
ALTER TABLE "new_ingredients" RENAME TO "ingredients";
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_types_name_key" ON "ingredient_types"("name");
