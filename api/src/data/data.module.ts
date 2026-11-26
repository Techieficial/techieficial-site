import { Global, Module } from "@nestjs/common";
import { APP_CONFIG, type AppConfig } from "../config/env.js";
import { MemoryStore } from "./memory.repository.js";
import { SupabaseStore } from "./supabase.repository.js";
import { LEADS_REPOSITORY, PORTAL_REPOSITORY } from "./types.js";

export const DATA_STORE = Symbol("DATA_STORE");

/** Picks the store once: Supabase when SUPABASE_URL is set, otherwise in memory. */
@Global()
@Module({
  providers: [
    {
      provide: DATA_STORE,
      inject: [APP_CONFIG],
      useFactory: (config: AppConfig) => (config.SUPABASE_URL ? new SupabaseStore(config) : new MemoryStore()),
    },
    { provide: LEADS_REPOSITORY, useExisting: DATA_STORE },
    { provide: PORTAL_REPOSITORY, useExisting: DATA_STORE },
  ],
  exports: [DATA_STORE, LEADS_REPOSITORY, PORTAL_REPOSITORY],
})
export class DataModule {}
