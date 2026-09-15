import { Type } from 'class-transformer';
import {
  IsOptional,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SocialLinksDto } from './social-links.dto';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class UpdateContactSectionDto {
  @ApiPropertyOptional({
    type: LocalizedTextDto,
    description: 'Localized heading',
    example: { en: 'Get in touch', ar: 'تواصل معنا' },
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  heading?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: LocalizedTextDto,
    description: 'Localized body text',
    example: { en: 'We would love to hear from you.', ar: 'يسعدنا التواصل معكم.' },
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  body?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: LocalizedTextDto,
    description: 'Localized text for the first button',
    example: { en: 'Contact Us', ar: 'تواصل معنا' },
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  button1Text?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: LocalizedTextDto,
    description: 'Localized text for the second button',
    example: { en: 'Learn More', ar: 'اعرف المزيد' },
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  button2Text?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: SocialLinksDto,
    description: 'Social media links',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  socialLinks?: SocialLinksDto;
}