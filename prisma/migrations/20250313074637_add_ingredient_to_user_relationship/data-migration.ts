import { prisma } from "@/lib/prisma";

async function main() {
  // add userId fk on Ingregients
  const userWithRecipes = await prisma.user.findFirst({
    where: { email: null },
  });

  const anotherTestUser = await prisma.user.findFirst({
    where: { email: { not: null } },
  });

  const uniqueIngredients = await prisma.ingredient.groupBy({
    by: ["name"],
    _min: { id: true, typeId: true },
  });

  // update existing ingregients for the user with recipes (they're reference in recipe_ingredients)
  const existingUserIngredientsNotReferenced =
    await prisma.ingredient.findMany();

  for (const ingredient of existingUserIngredientsNotReferenced) {
    await prisma.ingredient.update({
      where: {
        id: ingredient.id,
      },
      data: {
        userId: userWithRecipes?.id,
      },
    });
  }

  //create ingredients for test user with no recipes
  if (anotherTestUser) {
    await prisma.ingredient.createMany({
      data: uniqueIngredients.map((ingredient) => ({
        userId: anotherTestUser.id,
        name: ingredient.name,
        typeId: ingredient._min.typeId || 0,
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
