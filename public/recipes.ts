import { IngredientTypeName } from "@prisma/client";

export const defaultIngredientNames = [
  "White Flour",
  "00 Flour",
  "Bread Flour",
  "Water",
  "Salt",
  "Sugar",
  "Instant Dried Yeast",
  "Olive Oil",
  "Poolish",
] as const;

export type DefaultIngredientName = (typeof defaultIngredientNames)[number];

export type DefaultIngredient = {
  type: IngredientTypeName;
  name: DefaultIngredientName;
  userId: null;
  components: { name: DefaultIngredientName; weightInGrams: number }[];
};

export const defaultIngredients: DefaultIngredient[] = [
  {
    type: IngredientTypeName["Flour"],
    name: "White Flour",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Flour"],
    name: "00 Flour",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Flour"],
    name: "Bread Flour",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Liquid"],
    name: "Water",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Dry"],
    name: "Salt",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Dry"],
    name: "Sugar",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Yeast"],
    name: "Instant Dried Yeast",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Fat"],
    name: "Olive Oil",
    userId: null,
    components: [],
  },
  {
    type: IngredientTypeName["Preferment"],
    name: "Poolish",
    userId: null,
    components: [
      { name: "Water", weightInGrams: 500 },
      { name: "White Flour", weightInGrams: 500 },
      { name: "Instant Dried Yeast", weightInGrams: 0.4 },
    ],
  },
  // {
  //   type: IngredientTypeName["Preferment"],
  //   name: "Sourdough Starter (Stiff)",
  //   userId: null,
  //   components: [
  //     { name: "Water", weightInGrams: 250 },
  //     { name: "Bread Flour", weightInGrams: 500 },
  //     { name: "Starter", weightInGrams: 50 },
  //   ],
  // },
] as const;

type DoughType = "Sourdough" | "Flatbread" | "Pizza Doughs" | "Enriched Doughs";

type DefaultRecipe = {
  doughType: DoughType;
  name: string;
  servings: number;
  ingredients: {
    name: DefaultIngredientName;
    weightInGrams: number;
  }[];
};

export const defaultRecipes: DefaultRecipe[] = [
  {
    name: "White Bread with Poolish",
    doughType: "Sourdough",
    servings: 2,
    ingredients: [
      { name: "White Flour", weightInGrams: 500 },
      { name: "Water", weightInGrams: 250 },
      { name: "Salt", weightInGrams: 21 },
      { name: "Instant Dried Yeast", weightInGrams: 3 },
      { name: "Poolish", weightInGrams: 1000 },
    ],
  },
  {
    name: "Neapolitan Pizza (Brick Oven)",
    doughType: "Pizza Doughs",
    servings: 7,
    ingredients: [
      { name: "00 Flour", weightInGrams: 1000 },
      { name: "Water", weightInGrams: 600 },
      { name: "Salt", weightInGrams: 25 },
      { name: "Instant Dried Yeast", weightInGrams: 3 },
      { name: "Olive Oil", weightInGrams: 15 },
    ],
  },
  {
    name: "Neapolitan Pizza (Home Oven)",
    doughType: "Pizza Doughs",
    servings: 7,
    ingredients: [
      { name: "00 Flour", weightInGrams: 1000 },
      { name: "Water", weightInGrams: 680 },
      { name: "Salt", weightInGrams: 25 },
      { name: "Instant Dried Yeast", weightInGrams: 4 },
      { name: "Olive Oil", weightInGrams: 15 },
    ],
  },
  {
    name: "New York Style Pizza",
    doughType: "Pizza Doughs",
    servings: 6,
    ingredients: [
      { name: "Bread Flour", weightInGrams: 1000 },
      { name: "Water", weightInGrams: 630 },
      { name: "Salt", weightInGrams: 25 },
      { name: "Instant Dried Yeast", weightInGrams: 3 },
      { name: "Olive Oil", weightInGrams: 15 },
    ],
  },
  {
    name: "Chicago Style Pizza",
    doughType: "Pizza Doughs",
    servings: 4,
    ingredients: [
      { name: "White Flour", weightInGrams: 1000 },
      { name: "Water", weightInGrams: 530 },
      { name: "Salt", weightInGrams: 25 },
      { name: "Instant Dried Yeast", weightInGrams: 3 },
      { name: "Olive Oil", weightInGrams: 15 },
    ],
  },
  {
    name: "Detroit Style Pizza",
    doughType: "Pizza Doughs",
    servings: 3,
    ingredients: [
      { name: "Bread Flour", weightInGrams: 1000 },
      { name: "Water", weightInGrams: 620 },
      { name: "Salt", weightInGrams: 25 },
      { name: "Instant Dried Yeast", weightInGrams: 3 },
      { name: "Olive Oil", weightInGrams: 15 },
    ],
  },
  {
    name: "Pizza al Taglio (Roman Style)",
    doughType: "Pizza Doughs",
    servings: 2,
    ingredients: [
      { name: "00 Flour", weightInGrams: 1000 },
      { name: "Water", weightInGrams: 730 },
      { name: "Salt", weightInGrams: 25 },
      { name: "Instant Dried Yeast", weightInGrams: 3 },
      { name: "Olive Oil", weightInGrams: 15 },
    ],
  },
  {
    name: "Calzone (Folded Pizza)",
    doughType: "Pizza Doughs",
    servings: 6,
    ingredients: [
      { name: "00 Flour", weightInGrams: 1000 },
      { name: "Water", weightInGrams: 630 },
      { name: "Salt", weightInGrams: 25 },
      { name: "Instant Dried Yeast", weightInGrams: 3 },
      { name: "Olive Oil", weightInGrams: 15 },
    ],
  },
];
