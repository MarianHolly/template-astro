import { z } from "zod";

const envSchema = z.object({
  PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

// Validate at runtime
const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
