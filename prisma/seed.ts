import { prisma } from "@/lib/prisma";
import { defaultPizzaRecipes, customRecipes } from "../public/recipes";

async function createDefaultRecipes() {
  const ingredients = await prisma.ingredient.findMany();

  await Promise.all(
    defaultPizzaRecipes.map((recipe) =>
      prisma.recipe.create({
        data: {
          user: undefined,
          name: recipe.name,
          ingredients: {
            create: recipe.ingredients.map((ir) => ({
              ingredientId: ingredients.find((i) => i.name === ir.name).id,
              percentage: ir.percentage,
            })),
          },
          recipeServing: {
            create: {
              weight: recipe.settings.weight_per_pizza,
              quantity: recipe.settings.number_of_pizzas,
            },
          },
        },
      }),
    ),
  );
}

async function main() {
  await createDefaultRecipes();

  // const DATABASE_VERSION = 2;
  //
  // // await prisma.$executeRawUnsafe(`PRAGMA user_version = ${DATABASE_VERSION}`);
  //
  // const [{ user_version }] = (await prisma.$queryRaw`PRAGMA user_version`) as [
  //   {
  //     user_version: number;
  //   },
  // ];
  //
  // const currentDbVersion = user_version ?? 0;
  //
  // if (currentDbVersion >= DATABASE_VERSION) {
  //   return;
  // }
  //
  // await prisma.$executeRaw`PRAGMA journal_mode = 'wal';`;
  //
  // await prisma.recipe.deleteMany();
  // await prisma.folder.deleteMany();
  //
  // console.log("Adding ingredients...");
  // for (const { name } of ingredients) {
  //   await prisma.ingredient.create({
  //     data: {
  //       name,
  //     },
  //   });
  // }
  //
  // console.log("Creating default recipes...");
  // await Promise.all(
  //   defaultPizzaRecipes.map(({ name, settings, ingredients }) => {
  //     return prisma.recipe.create({
  //       data: {
  //         userId: null,
  //         name,
  //         doughballWeight: settings.weight_per_pizza,
  //         ingredients: {
  //           create: ingredients.map(({ id, percentage }) => ({
  //             percentage,
  //             ingredientId: id,
  //           })),
  //         },
  //       },
  //     });
  //   }),
  // );
  //
  // console.log(`Creating users...`);
  // for (const { name, folders } of users) {
  //   const { id: userId } = await prisma.user.create({
  //     data: {
  //       name,
  //     },
  //   });
  //
  //   if (folders) {
  //     await Promise.all(
  //       folders.map(({ name, recipes }) =>
  //         prisma.folder.create({
  //           data: {
  //             name,
  //             userId,
  //             ...(recipes && {
  //               recipes: {
  //                 create: recipes.map((recipe) => ({
  //                   userId,
  //                   name: recipe.name,
  //                   doughballWeight: recipe.settings.weight_per_pizza,
  //                   ingredients: {
  //                     create: recipe.ingredients.map(({ id, percentage }) => ({
  //                       percentage,
  //                       ingredientId: id,
  //                     })),
  //                   },
  //                 })),
  //               },
  //             }),
  //           },
  //         }),
  //       ),
  //     );
  //   }
  // }
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
