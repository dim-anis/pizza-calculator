/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ingredients_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_userId_name_key" ON "ingredients"("userId", "name");
