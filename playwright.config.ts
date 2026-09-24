import { defineConfig, devices } from "@playwright/test"
import * as fs from "node:fs"
import * as path from "node:path"

const envPath = path.resolve(process.cwd(), ".env")
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8")
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const [key, ...vals] = trimmed.split("=")
    if (key && vals.length) {
      const val = vals.join("=").replace(/^["']|["']$/g, "")
      process.env[key.trim()] = val.trim()
    }
  }
}

export default defineConfig({
  testDir: "./src/__tests__/e2e",
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    viewport: { width: 1600, height: 900 },
    trace: "on-first-retry",
    video: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1600, height: 900 },
      },
    },
  ],
  webServer: {
    command: "pnpm start",
    url: "http://127.0.0.1:3000",
    timeout: 60000,
    reuseExistingServer: true,
    stdout: "ignore",
    stderr: "pipe",
  },
})
