import globals from "globals";
import pluginJs from "@eslint/js";
import sortRequires from "eslint-plugin-sort-requires";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "semi": ["error", "always"],
      "sort-requires/sort-requires": "error",
    },
    plugins: {
      "sort-requires": sortRequires,
    },
  },
  pluginJs.configs.recommended,
];
