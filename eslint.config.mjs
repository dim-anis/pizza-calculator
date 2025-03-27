// import tailwind from "eslint-plugin-tailwindcss";
//
// import { FlatCompat } from "@eslint/eslintrc";
//
// const compat = new FlatCompat({
//   baseDirectory: import.meta.dirname,
// });
//
// const eslintConfig = [
//   ...compat.config({
//     extends: [
//       "next/core-web-vitals",
//       ...tailwind.configs["flat/recommended"],
//       "next/typescript",
//     ],
//   }),
// ];
//
// export default eslintConfig;

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
];

export default configs;
