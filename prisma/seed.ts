import prisma from "@/lib/prisma";
import { defaultPizzaRecipes, customRecipes } from "../public/recipes";
import { warn } from "console";

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
  await prisma.recipe.deleteMany();
  await prisma.folder.deleteMany();
  const user = await prisma.user.findFirst();

  if (!user) return;

  console.log("Creating folders...");
  for (const folderName of folderNames) {
    await prisma.folder.create({
      data: {
        userId: user.id,
        name: folderName,
      },
    });
  }

  console.log("Creating default recipes...");
  for (const recipe of defaultPizzaRecipes) {
    const randomNum = getRandomArbitrary(1, defaultPizzaRecipes.length - 1);
    await prisma.recipe.create({
      data: {
        userId: null,
        name: recipe.name,
        doughballWeight: recipe.settings.weight_per_pizza,
        flourRatio: recipe.ingredients.flour,
        waterRatio: recipe.ingredients.water,
        saltRatio: recipe.ingredients.salt,
        yeastRatio: recipe.ingredients.yeast,
        oilRatio: recipe.ingredients.oil,
      },
    });
  }

  console.log("Creating custom recipes...");
  for (const recipe of customRecipes) {
    const randomNum = getRandomArbitrary(1, defaultPizzaRecipes.length - 1);
    await prisma.recipe.create({
      data: {
        userId: user.id,
        name: recipe.name,
        doughballWeight: recipe.settings.weight_per_pizza,
        flourRatio: recipe.ingredients.flour,
        waterRatio: recipe.ingredients.water,
        saltRatio: recipe.ingredients.salt,
        yeastRatio: recipe.ingredients.yeast,
        oilRatio: recipe.ingredients.oil,
        folders: {
          connect: [{ name: "All" }, { name: folderNames[randomNum] }],
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
