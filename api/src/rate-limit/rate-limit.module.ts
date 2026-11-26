import { Injectable, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule, ThrottlerStorageService, type ThrottlerStorage } from "@nestjs/throttler";
import { APP_CONFIG, type AppConfig } from "../config/env.js";
import { RATE_LIMITS } from "./limits.js";

/** Counts by the real visitor IP when behind Cloudflare, else by the socket address. */
@Injectable()
export class IpThrottlerGuard extends ThrottlerGuard {
  protected override async getTracker(req: Record<string, unknown>): Promise<string> {
    const headers = (req.headers ?? {}) as Record<string, string | undefined>;
    return headers["cf-connecting-ip"] ?? (req.ip as string | undefined) ?? "unknown";
  }
}

/**
 * Storage seam for B4. Today counters live in memory (one process). When
 * UPSTASH_REDIS_REST_URL is set, B4 returns a Redis-backed ThrottlerStorage here so every
 * instance shares the same counters. Until then the in-memory store is used either way.
 */
export function createThrottlerStorage(config: AppConfig): ThrottlerStorage {
  if (config.UPSTASH_REDIS_REST_URL) {
    // B4: return new UpstashThrottlerStorage(config.UPSTASH_REDIS_REST_URL, config.UPSTASH_REDIS_REST_TOKEN)
  }
  return new ThrottlerStorageService();
}

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [APP_CONFIG],
      useFactory: (config: AppConfig) => ({
        throttlers: [{ name: "default", ...RATE_LIMITS.default }],
        storage: createThrottlerStorage(config),
        errorMessage: "Too many requests. Please wait a moment and try again.",
      }),
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: IpThrottlerGuard }],
})
export class RateLimitModule {}
