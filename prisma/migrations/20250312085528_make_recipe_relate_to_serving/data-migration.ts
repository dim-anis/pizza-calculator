import { prisma } from "@/lib/prisma";

async function main() {
  const recipeServings = await prisma.recipeServing.findMany();

  Promise.all(
    recipeServings.map((serving) =>
      prisma.recipe.update({
        where: { id: serving.recipeId },
        data: {
          recipeServingId: serving.id,
        },
      }),
    ),
  );
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
