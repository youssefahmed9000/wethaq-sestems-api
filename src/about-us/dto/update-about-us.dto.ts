import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ParseJsonField } from 'src/common/localization/decorators/transform-localized.decorator';
import { LocalizedTextDto } from 'src/common/localization/dto/localized-text.dto';

export class UpdateAboutUsDto {
  @ApiPropertyOptional({
    description: 'Localized tag as a JSON string',
    example: '{"en":"About Us","ar":"من نحن"}',
  })
  @IsOptional()
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  tag?: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized heading as a JSON string',
    example: '{"en":"Who We Are","ar":"من نحن"}',
  })
  @IsOptional()
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  heading?: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'First localized paragraph as a JSON string',
    example:
      '{"en":"We provide innovative solutions.","ar":"نقدم حلولًا مبتكرة."}',
  })
  @IsOptional()
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  paragraph1?: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Second localized paragraph as a JSON string',
    example:
      '{"en":"Our goal is customer satisfaction.","ar":"هدفنا هو رضا العملاء."}',
  })
  @IsOptional()
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  paragraph2?: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized vision as a JSON string',
    example:
      '{"en":"To become a leading company.","ar":"أن نصبح شركة رائدة."}',
  })
  @IsOptional()
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  vision?: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized mission as a JSON string',
    example:
      '{"en":"To deliver reliable solutions.","ar":"تقديم حلول موثوقة."}',
  })
  @IsOptional()
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  mission?: LocalizedTextDto;

  @ApiPropertyOptional({
    description: 'Localized values as a JSON string',
    example:
      '{"en":"Quality, Integrity, Innovation","ar":"الجودة، النزاهة، الابتكار"}',
  })
  @IsOptional()
  @ParseJsonField(LocalizedTextDto)
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  values?: LocalizedTextDto;
}