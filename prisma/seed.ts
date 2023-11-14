import prisma from "@/lib/prisma";
import { defaultPizzaRecipes } from "../public/recipes";

const folderNames = [
  "All",
  "Neapolitan Pizza Recipes",
  "My favourites",
  "Grandma's Recipes",
  "This Slaps",
  "Greasy Pizzas",
  "Experimental Recipes",
];

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  await prisma.folder.deleteMany();
  await prisma.recipe.deleteMany();

  const user = await prisma.user.findFirst();

  if (!user) return;

  for (const folderName of folderNames) {
    await prisma.folder.create({
      data: {
        userId: user.id,
        name: folderName,
      },
    });
  }

  for (const recipe of defaultPizzaRecipes) {
    const randomNum = getRandomArbitrary(1, defaultPizzaRecipes.length - 1);
    await prisma.recipe.create({
      data: {
        userId: user.id,
        name: recipe.name,
        folders: {
          connect: [
            { userId: user.id, name: "All" },
            { userId: user.id, name: folderNames[randomNum] },
          ],
        },
        ingredients: {
          create: Object.entries(recipe.ingredients).map(
            ([name, proportion]) => ({
              ingredient: {
                connectOrCreate: {
                  where: { name },
                  create: { name },
                },
              },
              proportion,
            }),
          ),
        },
      },
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
