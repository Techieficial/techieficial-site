import { Body, Controller, NotImplementedException, Post } from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiPropertyOptional, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ErrorResponseDto } from "../common/error-response.dto.js";
import { RATE_LIMITS } from "../rate-limit/limits.js";

export class ChatDto {
  @ApiProperty({ maxLength: 2000 }) @IsString() @IsNotEmpty() @MaxLength(2000) message!: string;
  @ApiPropertyOptional({ maxLength: 64 }) @IsOptional() @IsString() @MaxLength(64) sessionId?: string;
}

/** Website assistant (F16). Wired up in B6; until then it answers 501. Rate limited per IP. */
@ApiTags("assistant")
@Controller("v1/assistant")
export class AssistantController {
  @Post("chat")
  @Throttle({ default: RATE_LIMITS.assistant })
  @ApiOperation({ summary: "Ask the website assistant (not switched on yet)" })
  @ApiResponse({ status: 501, type: ErrorResponseDto, description: "The assistant is not switched on yet." })
  chat(@Body() _input: ChatDto): never {
    throw new NotImplementedException("The website assistant is not switched on yet. Please book a call or use the contact form.");
  }
}
