CREATE TABLE "folders_new" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL COLLATE NOCASE,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "folders_new" ("id", "name", "userId", "createdAt", "updatedAt")
SELECT "id", "name", "userId", "createdAt", "updatedAt" FROM "folders";

DROP TABLE "folders";
ALTER TABLE "folders_new" RENAME TO "folders";

