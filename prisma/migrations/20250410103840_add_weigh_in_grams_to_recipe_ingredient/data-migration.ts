import { prisma } from "../../../src/lib/prisma";
import { calculateIngredientWeights } from "../../../src/lib/helpers";

async function main() {
  const recipes = await prisma.recipe.findMany({
    include: {
      recipeServing: true,
      ingredients: {
        include: {
          ingredient: { include: { type: { select: { isLiquid: true } } } },
        },
      },
    },
  });

  for (const r of recipes) {
    const ingredientsWithWeights = calculateIngredientWeights(
      r.recipeServing.quantity * r.recipeServing.weight,
      r.ingredients,
    );

    await Promise.all(
      ingredientsWithWeights.map((i) =>
        prisma.recipeIngredient.update({
          where: { id: i.id },
          data: {
            weightInGrams: i.weight,
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
