import { prisma } from "@/lib/prisma";

async function main() {
  const ingredients = await prisma.ingredient.findMany();

  await Promise.all(
    ingredients.map((ingredient) =>
      prisma.ingredient.update({
        where: { id: ingredient.id },
        data: { isFlour: ingredient.name === "Flour" ? true : false },
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
