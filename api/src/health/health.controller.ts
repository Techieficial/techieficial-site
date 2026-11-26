import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { APP_CONFIG, type AppConfig } from "../config/env.js";

export class HealthDto {
  @ApiProperty({ example: "ok" }) status!: "ok";
  @ApiProperty({ enum: ["memory", "supabase"], description: "Where data is stored." }) dataStore!: "memory" | "supabase";
  @ApiProperty({ description: "Whether leads are forwarded to the CRM." }) crmForwarding!: boolean;
  @ApiProperty({ description: "Seconds since the process started." }) uptime!: number;
}

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(@Inject(APP_CONFIG) private readonly config: AppConfig) {}

  @Get()
  @ApiOperation({ summary: "Liveness check" })
  @ApiOkResponse({ type: HealthDto })
  get(): HealthDto {
    return {
      status: "ok",
      dataStore: this.config.SUPABASE_URL ? "supabase" : "memory",
      crmForwarding: Boolean(this.config.CRM_WEBHOOK_URL),
      uptime: Math.round(process.uptime()),
    };
  }
}
