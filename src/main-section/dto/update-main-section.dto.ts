import { Type } from 'class-transformer';

import { IsOptional, ValidateNested } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class UpdateMainSectionDto {
  @ApiPropertyOptional({
    type: () => LocalizedTextDto,
    example: {
      en: 'Specialized Medical Care',
      ar: 'رعاية طبية متخصصة',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  tag?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: () => LocalizedTextDto,
    example: {
      en: 'Your Health',
      ar: 'صحتك',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  headingLine1?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: () => LocalizedTextDto,
    example: {
      en: 'Our Priority',
      ar: 'أولويتنا',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  headingLine2?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: () => LocalizedTextDto,
    example: {
      en: 'We provide high-quality healthcare services.',
      ar: 'نقدم خدمات رعاية صحية عالية الجودة.',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  subtitle?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: () => LocalizedTextDto,
    example: {
      en: 'Book Appointment',
      ar: 'احجز موعد',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  button1Text?: LocalizedTextDto;

  @ApiPropertyOptional({
    type: () => LocalizedTextDto,
    example: {
      en: 'Learn More',
      ar: 'اعرف المزيد',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  button2Text?: LocalizedTextDto;
}