-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ingredient_components" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "weightInGrams" REAL NOT NULL,
    CONSTRAINT "ingredient_components_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ingredient_components_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ingredient_components" ("id", "ingredientId", "parentId", "weightInGrams") SELECT "id", "ingredientId", "parentId", "weightInGrams" FROM "ingredient_components";
DROP TABLE "ingredient_components";
ALTER TABLE "new_ingredient_components" RENAME TO "ingredient_components";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
