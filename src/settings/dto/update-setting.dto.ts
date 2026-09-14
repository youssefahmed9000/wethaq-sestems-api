import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';
import { IsInternationalPhoneNumber } from 'src/common/validators/is-phone.validator';

export class UpdateSettingsDto {
  @ApiPropertyOptional({ type: () => LocalizedTextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  officeName?: LocalizedTextDto;

  @ApiPropertyOptional({ type: () => LocalizedTextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  tagline?: LocalizedTextDto;

  @ApiPropertyOptional({ example: '+966501234567' })
  @IsOptional()
  @IsString()
  @IsInternationalPhoneNumber({
    message: 'Invalid extra phone phone number',
  })
  extraPhone?: string;

  @ApiPropertyOptional({ example: '+966501234567' })
  @IsOptional()
  @IsString()
  @IsInternationalPhoneNumber({
    message: 'Invalid main phone number',
  })
  mainPhone?: string;

  @ApiPropertyOptional({ example: '+966501234567' })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({ example: 'office@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ type: () => LocalizedTextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  riyadhAddress?: LocalizedTextDto;

  @ApiPropertyOptional({ type: () => LocalizedTextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  jeddahAddress?: LocalizedTextDto;

  @ApiPropertyOptional({ type: () => LocalizedTextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  dammamAddress?: LocalizedTextDto;
}