import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/** Every error the API returns has this shape. */
export class ErrorResponseDto {
  @ApiProperty({ example: 422 }) statusCode!: number;
  @ApiProperty({ example: "validation_failed", description: "Stable machine-readable code." }) error!: string;
  @ApiProperty({ example: "Some fields are missing or invalid." }) message!: string;
  @ApiPropertyOptional({ type: [String], example: ["email"], description: "Fields that failed validation." }) fields?: string[];
  @ApiProperty({ example: "5f0c6e1e-8a7b-4a43-9a52-1f2d3c4b5a69" }) requestId!: string;
}
