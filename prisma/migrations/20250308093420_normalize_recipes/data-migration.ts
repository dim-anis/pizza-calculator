import { prisma } from "@/lib/prisma";

async function main() {
  const oldRecipes = await prisma.recipe.findMany();

  for (const recipe of oldRecipes) {
    const ingredients = [
      recipe.flourRatio && { name: "Flour", percentage: recipe.flourRatio },
      recipe.waterRatio && { name: "Water", percentage: recipe.waterRatio },
      recipe.saltRatio && { name: "Salt", percentage: recipe.saltRatio },
      recipe.yeastRatio && { name: "Yeast", percentage: recipe.yeastRatio },
      recipe.oilRatio && { name: "Oil", percentage: recipe.oilRatio },
      recipe.sugarRatio && { name: "Sugar", percentage: recipe.sugarRatio },
    ].flatMap((ing) => (ing ? [ing] : []));

    if (ingredients.length === 0) continue; // Skip if no ingredients exist

    // Upsert ingredients to avoid duplicates
    const ingredientRecords = await Promise.all(
      ingredients.map(async (ing) =>
        prisma.ingredient.upsert({
          where: { name: ing.name },
          update: {},
          create: { name: ing.name },
        }),
      ),
    );

    // Insert recipe-ingredient relationships
    await prisma.recipeIngredient.createMany({
      data: ingredientRecords.map((ingredient, index) => ({
        recipeId: recipe.id,
        ingredientId: ingredient.id,
        percentage: ingredients[index].percentage,
      })),
    });
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
