import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./apps/web/src/__tests__/setup.tsx"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/e2e/**",
      "**/*.spec.ts",
      "**/*.spec.tsx",
    ],
    server: {
      deps: {
        inline: ["@bloomui-react/components", "next"],
      },
    },
  },
  resolve: {
    alias: {
      "@/src/components/ui": path.resolve(
        __dirname,
        "./packages/ui/src/components/ui"
      ),
      "@/src/types": path.resolve(__dirname, "./packages/types/src"),
      "@/src/schemas": path.resolve(__dirname, "./packages/schemas/src"),
      "@/src/lib/designSystem": path.resolve(
        __dirname,
        "./packages/ui/src/lib/designSystem.ts"
      ),
      "@/src/lib/design-system": path.resolve(
        __dirname,
        "./packages/ui/src/lib/designSystem.ts"
      ),
      "@/src/lib/utils": path.resolve(
        __dirname,
        "./packages/utils/src/utils.ts"
      ),
      "@/src/lib/formatters": path.resolve(
        __dirname,
        "./packages/utils/src/formatters.ts"
      ),
      "@/src/lib/masks": path.resolve(
        __dirname,
        "./packages/utils/src/masks.ts"
      ),
      "@/src/lib/validators": path.resolve(
        __dirname,
        "./packages/utils/src/validators.ts"
      ),
      "@/src": path.resolve(__dirname, "./apps/web/src"),
      "@": path.resolve(__dirname, "./apps/web"),
      "@clubkey/ui": path.resolve(__dirname, "./packages/ui/src/index.ts"),
      "@clubkey/types": path.resolve(
        __dirname,
        "./packages/types/src/index.ts"
      ),
      "@clubkey/schemas": path.resolve(
        __dirname,
        "./packages/schemas/src/index.ts"
      ),
      "@clubkey/utils": path.resolve(
        __dirname,
        "./packages/utils/src/index.ts"
      ),
    },
  },
})
