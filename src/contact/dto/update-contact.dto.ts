// src/modules/contact/dto/update-contact-section.dto.ts
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { SocialLinksDto } from './social-links.dto';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';



export class UpdateContactSectionDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  heading?: LocalizedTextDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  body?: LocalizedTextDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  button1Text?: LocalizedTextDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  button2Text?: LocalizedTextDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  socialLinks?: SocialLinksDto;
}