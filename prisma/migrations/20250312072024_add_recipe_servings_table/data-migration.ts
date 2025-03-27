import { prisma } from "@/lib/prisma";

async function main() {
  const recipes = await prisma.recipe.findMany();
  console.log(recipes);

  Promise.all(
    recipes.map((recipe) =>
      prisma.recipeServing.create({
        data: {
          recipeId: recipe.id,
          weight: recipe.doughballWeight,
          quantity: 2,
        },
      }),
    ),
  );
  console.log("success");
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
