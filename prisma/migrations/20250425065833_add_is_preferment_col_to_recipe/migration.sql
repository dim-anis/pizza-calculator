-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "servings" INTEGER NOT NULL DEFAULT 1,
    "isPreferment" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("createdAt", "id", "name", "notes", "servings", "updatedAt", "userId") SELECT "createdAt", "id", "name", "notes", "servings", "updatedAt", "userId" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE INDEX "recipes_userId_idx" ON "recipes"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
