import { prisma } from "@/lib/prisma";

const ingredientTypes = [
  {
    type: "Dry",
    description: "Flour, sugar, salt, etc.",
    isLiquid: false,
    ingredientsToConnect: [{ name: "Flour" }, { name: "Salt" }],
  },
  {
    type: "Liquid",
    description: "Water, milk, juice, etc.",
    isLiquid: true,
    ingredientsToConnect: [{ name: "Water" }],
  },
  {
    type: "Fat",
    description: "Butter, oil, shortening",
    isLiquid: true,
    ingredientsToConnect: [{ name: "Oil" }],
  },
  {
    type: "Mixed",
    description: "Eggs (contain water and fat)",
    isLiquid: true,
    ingredientsToConnect: [],
  },
  {
    type: "Yeast",
    description: "Yeast, baking powder, etc.",
    isLiquid: false,
    ingredientsToConnect: [{ name: "Yeast" }],
  },
];

async function main() {
  // create ingredient types
  // connect ingredient type to ingredient
  Promise.all(
    ingredientTypes.map(
      ({ type, description, isLiquid, ingredientsToConnect }) =>
        prisma.ingredientType.create({
          data: {
            type,
            description,
            isLiquid,
            ingredients: {
              connectOrCreate: ingredientsToConnect.map((ingredient) => ({
                where: { name: ingredient.name },
                create: { name: ingredient.name },
              })),
            },
          },
        }),
    ),
  );

  const waterIngredient = await prisma.ingredient.findFirst({
    where: {
      name: "Water",
    },
  });

  if (waterIngredient) {
    const recipes = await prisma.recipe.findMany();

    // create water recipe ingredient for each existing recipe
    Promise.all(
      recipes.map((recipe) =>
        prisma.recipeIngredient.create({
          data: {
            recipeId: recipe.id,
            ingredientId: waterIngredient.id,
            percentage: recipe.hydration,
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
