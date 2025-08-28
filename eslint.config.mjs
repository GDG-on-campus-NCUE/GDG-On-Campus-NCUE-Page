import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // CSS 檔案
      "**/*.css",
      "src/app/globals.css",
      "src/app/tailwind-v4.css",
      // 其他資源檔案
      "public/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];

export default eslintConfig;
