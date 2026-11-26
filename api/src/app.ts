import "reflect-metadata";
import { HttpStatus, Module, ValidationPipe, type DynamicModule, type INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule, type OpenAPIObject } from "@nestjs/swagger";
import helmet from "helmet";
import { AssistantController } from "./assistant/assistant.controller.js";
import { SupabaseAuthGuard } from "./common/auth.js";
import { ErrorFilter, FieldsException, flattenValidationErrors, requestId, requestLogger } from "./common/http.js";
import { APP_CONFIG, type AppConfig } from "./config/env.js";
import { CrmService } from "./crm/crm.service.js";
import { DataModule } from "./data/data.module.js";
import { HealthController } from "./health/health.controller.js";
import { LeadsController } from "./leads/leads.controller.js";
import { PortalController } from "./portal/portal.controller.js";
import { RateLimitModule } from "./rate-limit/rate-limit.module.js";

@Module({})
export class AppModule {
  static forRoot(config: AppConfig): DynamicModule {
    const configModule: DynamicModule = { module: class ConfigModule {}, global: true, providers: [{ provide: APP_CONFIG, useValue: config }], exports: [APP_CONFIG] };
    return {
      module: AppModule,
      imports: [configModule, DataModule, RateLimitModule],
      controllers: [HealthController, LeadsController, PortalController, AssistantController],
      providers: [CrmService, SupabaseAuthGuard],
    };
  }
}

export function buildOpenApi(app: INestApplication): OpenAPIObject {
  const doc = new DocumentBuilder()
    .setTitle("Techieficial API")
    .setDescription(
      "Backend for the client portal, the website lead log and the AI assistant. Every route is rate limited per IP. Errors always use the ErrorResponse shape.",
    )
    .setVersion("0.1.0")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT", description: "Supabase access token of a signed-in portal user." })
    .build();
  return SwaggerModule.createDocument(app, doc);
}

/** Creates the app with every cross-cutting setting. Used by main.ts, the tests and the OpenAPI script. */
export async function createApp(config: AppConfig): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule.forRoot(config), { logger: config.LOG_LEVEL === "silent" ? false : ["error", "warn"], bodyParser: false });
  // Cloudflare or the host's load balancer sits in front; trust one proxy hop for req.ip.
  app.set("trust proxy", 1);
  app.useBodyParser("json", { limit: "100kb" });
  app.use(requestId, requestLogger(config));
  app.use(helmet({ contentSecurityPolicy: { directives: { "script-src": ["'self'", "'unsafe-inline'"], "img-src": ["'self'", "data:", "https:"] } } }));
  app.enableCors({
    origin: config.CORS_ORIGINS,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    exposedHeaders: ["X-Request-Id", "Retry-After"],
    maxAge: 600,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new FieldsException(flattenValidationErrors(errors)),
    }),
  );
  app.useGlobalFilters(new ErrorFilter());
  app.enableShutdownHooks();
  SwaggerModule.setup("docs", app, () => buildOpenApi(app), { jsonDocumentUrl: "docs-json" });
  return app;
}
