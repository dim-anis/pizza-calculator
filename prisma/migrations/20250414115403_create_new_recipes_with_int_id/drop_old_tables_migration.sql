PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
DROP TABLE "recipes";
DROP TABLE "recipe_ingredients";
DROP TABLE "_FolderToRecipe";

CREATE TABLE "recipes_v2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "servings" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "recipes_v2" ("createdAt", "servings", "id", "name", "notes", "updatedAt", "userId") SELECT "createdAt", "servings", "id", "name", "notes", "updatedAt", "userId" FROM "new_recipes";
DROP TABLE "new_recipes";
ALTER TABLE "recipes_v2" RENAME TO "recipes";

-- CreateIndex
CREATE INDEX "recipes_userId_idx" ON "recipes"("userId");

-- CreateTable
CREATE TABLE "recipe_ingredients_v2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingredientId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "percentage" REAL NOT NULL DEFAULT 0,
    "weightInGrams" INTEGER NOT NULL,
    CONSTRAINT "recipe_ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipe_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "recipe_ingredients_v2" ("id", "ingredientId", "recipeId", "percentage", "weightInGrams") SELECT "id", "ingredientId", "recipeId", "percentage", "weightInGrams" FROM "new_recipe_ingredients";
DROP TABLE "new_recipe_ingredients";
ALTER TABLE "recipe_ingredients_v2" RENAME TO "recipe_ingredients";

-- CreateTable
CREATE TABLE "_FolderToRecipe_v2" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    PRIMARY KEY ("A", "B"),
    CONSTRAINT "_FolderToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "folders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FolderToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "_FolderToRecipe_v2" ("A", "B") SELECT "folderId", "recipeId" FROM "new_folder_to_recipe";
DROP TABLE "new_folder_to_recipe";
ALTER TABLE "_FolderToRecipe_v2" RENAME TO "_FolderToRecipe";

CREATE UNIQUE INDEX "_FolderToRecipe_AB_unique" ON "_FolderToRecipe"("A","B");
CREATE INDEX "_FolderToRecipe_B_index" ON "_FolderToRecipe"("B");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
