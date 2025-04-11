import { FlatCompat } from "@eslint/eslintrc";

const __dirname = import.meta.dirname;

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
];

export default configs;
