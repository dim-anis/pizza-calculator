-- CreateTable
CREATE TABLE "new_recipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "servings" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "new_recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "new_recipe_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingredientId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "percentage" REAL NOT NULL DEFAULT 0,
    "weightInGrams" INTEGER NOT NULL,
    CONSTRAINT "new_recipe_ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "new_recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "new_recipe_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "new_folder_to_recipe" (
    "folderId" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,

    PRIMARY KEY ("folderId", "recipeId"),
    CONSTRAINT "new_folder_to_recipe_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "new_folder_to_recipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "new_recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "new_recipes_userId_idx" ON "new_recipes"("userId");
