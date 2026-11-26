import { Body, Controller, Get, HttpCode, Inject, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiPropertyOptional, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { CurrentUser, SupabaseAuthGuard } from "../common/auth.js";
import { ErrorResponseDto } from "../common/error-response.dto.js";
import { PORTAL_REPOSITORY, projectStatuses, ticketPriorities, type AuthUser, type PortalRepository, type TicketPriority } from "../data/types.js";
import { RATE_LIMITS } from "../rate-limit/limits.js";

const trim = ({ value }: { value: unknown }) => (typeof value === "string" ? value.trim() : value);

export class ProjectDto {
  @ApiProperty({ format: "uuid" }) id!: string;
  @ApiProperty({ format: "uuid" }) clientId!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: projectStatuses, description: "Delivery stage: kickoff, build, review, live, operate." }) status!: string;
  @ApiProperty({ nullable: true, type: String }) summary!: string | null;
  @ApiProperty({ nullable: true, type: String, format: "date" }) startedOn!: string | null;
  @ApiProperty({ nullable: true, type: String, format: "date" }) liveOn!: string | null;
  @ApiProperty({ format: "date-time" }) updatedAt!: string;
}

export class NewTicketDto {
  @ApiPropertyOptional({ format: "uuid", description: "Project the ticket is about." })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiProperty({ maxLength: 160 }) @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(160) subject!: string;
  @ApiProperty({ maxLength: 5000 }) @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(5000) body!: string;

  @ApiPropertyOptional({ enum: ticketPriorities, default: "normal" })
  @IsOptional()
  @IsIn(ticketPriorities)
  priority?: TicketPriority;
}

export class TicketDto {
  @ApiProperty({ format: "uuid" }) id!: string;
  @ApiProperty({ format: "uuid" }) clientId!: string;
  @ApiProperty({ format: "uuid", nullable: true, type: String }) projectId!: string | null;
  @ApiProperty({ format: "uuid" }) createdBy!: string;
  @ApiProperty() subject!: string;
  @ApiProperty() body!: string;
  @ApiProperty({ enum: ticketPriorities }) priority!: string;
  @ApiProperty({ enum: ["open", "in_progress", "waiting", "closed"] }) status!: string;
  @ApiProperty({ format: "date-time" }) createdAt!: string;
}

@ApiTags("portal")
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: ErrorResponseDto, description: "Missing, expired or invalid access token." })
@UseGuards(SupabaseAuthGuard)
@Throttle({ default: RATE_LIMITS.portal })
@Controller("v1/portal")
export class PortalController {
  constructor(@Inject(PORTAL_REPOSITORY) private readonly portal: PortalRepository) {}

  @Get("projects")
  @ApiOperation({ summary: "List the signed-in client's projects", description: "Clients see their own business's projects. Staff and admins see all." })
  @ApiOkResponse({ type: [ProjectDto] })
  listProjects(@CurrentUser() user: AuthUser) {
    return this.portal.listProjects(user);
  }

  @Get("projects/:id")
  @ApiOperation({ summary: "One project, if the signed-in user may see it" })
  @ApiOkResponse({ type: ProjectDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  async getProject(@CurrentUser() user: AuthUser, @Param("id", new ParseUUIDPipe()) id: string) {
    const project = await this.portal.getProject(user, id);
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  @Post("tickets")
  @HttpCode(201)
  @ApiOperation({ summary: "Open a support ticket" })
  @ApiCreatedResponse({ type: TicketDto })
  createTicket(@CurrentUser() user: AuthUser, @Body() input: NewTicketDto) {
    return this.portal.createTicket(user, input);
  }
}
