import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';
import { IsInternationalPhoneNumber } from 'src/common/validators/is-phone.validator';

export class UpdateSettingsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  officeName?: LocalizedTextDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  tagline?: LocalizedTextDto;

  @IsOptional()
  @IsString()
  @IsInternationalPhoneNumber({
    message: 'Invalid extra phone phone number',
  })
  extraPhone?: string;

  @IsOptional()
  @IsString()
  @IsInternationalPhoneNumber({
      message: 'Invalid main phone number',
    })
  mainPhone?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  riyadhAddress?: LocalizedTextDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  jeddahAddress?: LocalizedTextDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  dammamAddress?: LocalizedTextDto;
}