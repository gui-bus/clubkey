import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
    settings: {
      next: {
        rootDir: ["apps/web/", "apps/admin/"],
      },
    },
  },
  globalIgnores([
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/dist/**",
    "**/.turbo/**",
    "**/next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
