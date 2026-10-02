import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .optional()
    .default("https://clubkey.io"),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_TENANT: z.string().optional().default("clubkey"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
})

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_TENANT: process.env.NEXT_PUBLIC_TENANT,
  NODE_ENV: process.env.NODE_ENV,
})

if (!parsedEnv.success) {
  const errors = parsedEnv.error.flatten().fieldErrors
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(errors, null, 2)}`
  )
}

export const env = parsedEnv.data
