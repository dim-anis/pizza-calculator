import { prisma } from "@/lib/prisma";

async function main() {
  const waterIngredient = await prisma.ingredient.findFirst({
    where: {
      name: "Water",
    },
  });

  if (waterIngredient) {
    const recipeIngredients = await prisma.recipeIngredient.findMany({
      where: {
        ingredientId: waterIngredient.id,
      },
    });

    await prisma.recipe.findUnique({
      where: { id: recipeIngredients[0].recipeId },
    });

    await Promise.all(
      recipeIngredients.map((ingredient) => {
        return prisma.recipe.update({
          where: { id: ingredient.recipeId },
          data: { hydration: ingredient.percentage },
        });
      }),
    );

    console.log("Rows successfully updated");

    await prisma.ingredient
      .delete({
        where: { id: waterIngredient.id },
      })
      .then(() =>
        console.log(`Removed ${waterIngredient.name} from Ingredients`),
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
