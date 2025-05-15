import { prisma } from "../src/lib/prisma";
import { defaultRecipes, defaultIngredients } from "../public/recipes";

async function createDefaultIngredients() {
  const ingredientTypes = await prisma.ingredientType.findMany();
  const nameToIdMap = new Map<string, number>();

  for (const ing of defaultIngredients) {
    const res = await prisma.ingredient.create({
      data: {
        name: ing.name,
        typeId: ingredientTypes.find((it) => it.type === ing.type)!.id,
      },
    });

    nameToIdMap.set(ing.name, res.id);
  }

  for (const ing of defaultIngredients) {
    if (ing.components?.length) {
      const parentId = nameToIdMap.get(ing.name)!;

      for (const comp of ing.components) {
        const componentId = nameToIdMap.get(comp.name);

        if (!componentId) {
          console.warn(
            `Component ${comp.name} not found for ingredient ${ing.name}`,
          );
          continue;
        }

        await prisma.ingredientComponent.create({
          data: {
            ingredientId: componentId,
            parentId,
            weightInGrams: comp.weightInGrams,
          },
        });
      }
    }
  }

  return nameToIdMap;
}

async function createDefaultRecipes() {
  const ingredients = await createDefaultIngredients();

  await Promise.all(
    defaultRecipes.map((recipe) =>
      prisma.recipe.create({
        data: {
          name: recipe.name,
          ingredients: {
            createMany: {
              data: recipe.ingredients.map((ir) => ({
                ingredientId: ingredients.get(ir.name)!,
                weightInGrams: ir.weightInGrams,
              })),
            },
          },
          servings: recipe.servings,
        },
      }),
    ),
  );
}

async function main() {
  await prisma.ingredient.deleteMany({ where: { userId: null } });
  await prisma.recipe.deleteMany({ where: { userId: null } });
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
