import { prisma } from "../../../src/lib/prisma";

async function main() {
  const oldRecipes = await prisma.recipe.findMany({
    include: { ingredients: true, folders: true },
  });

  for (const oldRecipe of oldRecipes) {
    const newRecipe = await prisma.newRecipe.create({
      data: {
        userId: oldRecipe.userId,
        createdAt: oldRecipe.createdAt,
        updatedAt: oldRecipe.updatedAt,
        name: oldRecipe.name,
        servings: oldRecipe.servings,
        notes: oldRecipe.notes,
      },
    });

    const newIngredients = oldRecipe.ingredients.map((r) => ({
      ingredientId: r.ingredientId,
      weightInGrams: r.weightInGrams,
      percentage: r.percentage,
      recipeId: newRecipe.id,
    }));

    await prisma.newRecipeIngredient.createMany({ data: newIngredients });
    await Promise.all(
      oldRecipe.folders.map((f) =>
        prisma.newFolderToRecipe.create({
          data: {
            folderId: f.id,
            recipeId: newRecipe.id,
          },
        }),
      ),
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
