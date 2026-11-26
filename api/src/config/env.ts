import * as z from "zod";

const optionalUrl = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .pipe(z.url().optional())
  .optional();

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

/** Every setting the API reads. Validated once at startup; the process stops on a bad value. */
export const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().min(1).max(65535).default(3001),
    /** Comma-separated list of browser origins allowed to call the API. */
    CORS_ORIGINS: z
      .string()
      .default("http://localhost:3000")
      .transform((value) =>
        value
          .split(",")
          .map((origin) => origin.trim())
          .filter(Boolean),
      )
      .pipe(z.array(z.url()).min(1)),
    LOG_LEVEL: z.enum(["silent", "info", "debug"]).default("info"),
    SUPABASE_URL: optionalUrl,
    SUPABASE_ANON_KEY: optionalText,
    SUPABASE_SERVICE_ROLE_KEY: optionalText,
    SUPABASE_JWT_SECRET: optionalText,
    CRM_WEBHOOK_URL: optionalUrl,
    UPSTASH_REDIS_REST_URL: optionalUrl,
    UPSTASH_REDIS_REST_TOKEN: optionalText,
    SENTRY_DSN: optionalUrl,
  })
  .superRefine((env, ctx) => {
    if (env.SUPABASE_URL && (!env.SUPABASE_ANON_KEY || !env.SUPABASE_SERVICE_ROLE_KEY)) {
      ctx.addIssue({ code: "custom", path: ["SUPABASE_URL"], message: "SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are required when SUPABASE_URL is set" });
    }
    if (Boolean(env.UPSTASH_REDIS_REST_URL) !== Boolean(env.UPSTASH_REDIS_REST_TOKEN)) {
      ctx.addIssue({ code: "custom", path: ["UPSTASH_REDIS_REST_URL"], message: "Set both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, or neither" });
    }
    if (env.SUPABASE_JWT_SECRET && env.SUPABASE_JWT_SECRET.length < 32) {
      ctx.addIssue({ code: "custom", path: ["SUPABASE_JWT_SECRET"], message: "SUPABASE_JWT_SECRET must be at least 32 characters" });
    }
    if (env.NODE_ENV === "production") {
      for (const key of ["SUPABASE_URL", "SUPABASE_JWT_SECRET"] as const) {
        if (!env[key]) ctx.addIssue({ code: "custom", path: [key], message: `${key} is required in production` });
      }
    }
  });

export type AppConfig = z.output<typeof envSchema>;

/** Parses settings and throws one readable error listing every problem (values are never printed). */
export function loadConfig(source: Record<string, string | undefined> = process.env): AppConfig {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    const problems = parsed.error.issues.map((issue) => `- ${issue.path.join(".") || "env"}: ${issue.message}`).join("\n");
    throw new Error(`Invalid API configuration:\n${problems}`);
  }
  return parsed.data;
}

export const APP_CONFIG = Symbol("APP_CONFIG");
