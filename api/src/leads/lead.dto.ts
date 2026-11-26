import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
  ValidateNested,
  registerDecorator,
  type ValidationOptions,
} from "class-validator";
import { leadSourceKeys, type LeadSource } from "../crm/crm-payload.js";

const trim = ({ value }: { value: unknown }) => (typeof value === "string" ? value.trim() : value);

/** A flat map of short strings (answers, selection), like the site's zod record. */
function IsStringRecord(maxValueLength: number, options?: ValidationOptions) {
  return (object: object, propertyName: string) =>
    registerDecorator({
      name: "isStringRecord",
      target: object.constructor,
      propertyName,
      options: { message: `${propertyName} must be an object of strings up to ${maxValueLength} characters`, ...options },
      validator: {
        validate: (value: unknown) =>
          value !== null &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          Object.keys(value).length <= 50 &&
          Object.values(value).every((v) => typeof v === "string" && v.length <= maxValueLength),
      },
    });
}

const needsName = (lead: LeadDto) => lead.source !== "newsletter" && lead.source !== "calculator";
const needsCompany = (lead: LeadDto) => lead.source === "audit" || lead.source === "test-build";
const needsPhone = (lead: LeadDto) => lead.source === "demo-callme" || lead.source === "contact" || lead.source === "audit";

export class UtmDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200) utm_source?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200) utm_medium?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200) utm_campaign?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200) utm_content?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200) utm_term?: string;
}

/** Same fields and rules as `leadSchema` in lib/lead.ts, plus optional UTM values. */
export class LeadDto {
  @ApiProperty({ enum: leadSourceKeys, description: "Which form sent the lead. Sets the CRM source and tag." })
  @IsIn(leadSourceKeys)
  source!: LeadSource;

  @ApiPropertyOptional({ maxLength: 120, description: "Required except for newsletter and calculator." })
  @Transform(trim)
  @ValidateIf((lead: LeadDto) => needsName(lead) || lead.name !== undefined)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({ maxLength: 120, description: "Required for audit and test-build." })
  @Transform(trim)
  @ValidateIf((lead: LeadDto) => needsCompany(lead) || lead.company !== undefined)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  company?: string;

  @ApiProperty({ maxLength: 254 })
  @Transform(({ value }) => (typeof value === "string" ? value.trim().toLowerCase() : value))
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiPropertyOptional({ description: "Required for demo-callme, contact and audit." })
  @Transform(trim)
  @ValidateIf((lead: LeadDto) => needsPhone(lead) || (lead.phone !== undefined && lead.phone !== ""))
  @IsString()
  @Matches(/^\+?[\d\s().-]{7,20}$/, { message: "phone must be a valid phone number" })
  phone?: string;

  @ApiPropertyOptional({ maxLength: 80 }) @Transform(trim) @IsOptional() @IsString() @MaxLength(80) businessType?: string;
  @ApiPropertyOptional({ maxLength: 120 }) @Transform(trim) @IsOptional() @IsString() @MaxLength(120) goal?: string;
  @ApiPropertyOptional({ maxLength: 60 }) @Transform(trim) @IsOptional() @IsString() @MaxLength(60) budget?: string;
  @ApiPropertyOptional({ maxLength: 4000 }) @Transform(trim) @IsOptional() @IsString() @MaxLength(4000) message?: string;

  @ApiPropertyOptional({ default: false, description: "SMS consent checkbox. Unchecked by default." })
  @IsOptional()
  @IsBoolean()
  smsConsent?: boolean;

  @ApiPropertyOptional({ type: "object", additionalProperties: { type: "string" }, description: "Extra form answers, question to answer." })
  @IsOptional()
  @IsObject()
  @IsStringRecord(1000)
  answers?: Record<string, string>;

  @ApiPropertyOptional({ type: "object", additionalProperties: { type: "string" }, description: "Engine Builder or offer selection." })
  @IsOptional()
  @IsObject()
  @IsStringRecord(300)
  selection?: Record<string, string>;

  @ApiPropertyOptional({ maxLength: 500, description: "Page the form was on." })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(500)
  page?: string;

  @ApiPropertyOptional({ type: UtmDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UtmDto)
  utm?: UtmDto;

  @ApiPropertyOptional({ description: "Honeypot. Must stay empty; real people never fill it in." })
  @IsOptional()
  @IsString()
  @MaxLength(0)
  website?: string;

  @ApiPropertyOptional({ maxLength: 4096, description: "Spam check token from the site form. Checked by the site before it calls the API." })
  @IsOptional()
  @IsString()
  @MaxLength(4096)
  turnstileToken?: string;
}

export class LeadAcceptedDto {
  @ApiProperty({ example: true }) ok!: true;
}
