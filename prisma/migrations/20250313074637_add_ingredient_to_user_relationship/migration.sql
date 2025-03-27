-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,
    CONSTRAINT "ingredients_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ingredient_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ingredients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ingredients" ("id", "name", "typeId") SELECT "id", "name", "typeId" FROM "ingredients";
DROP TABLE "ingredients";
ALTER TABLE "new_ingredients" RENAME TO "ingredients";
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
